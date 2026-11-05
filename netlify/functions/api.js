// ==============================================================================
// NETLIFY SERVERLESS FUNCTION ENTRY POINT
// Định tuyến các yêu cầu /api/* đến bộ xử lý trung tâm trong server.js
// ==============================================================================

const handleRequest = require('../../server.js');
const { EventEmitter } = require('events');

exports.handler = async (event, context) => {
  // 1. CORS Preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Passcode, X-Gemini-Key'
      },
      body: ''
    };
  }

  // 2. Chuyển đổi Netlify Event sang Node.js (req, res) chuẩn
  return new Promise((resolve) => {
    const req = new EventEmitter();
    req.method = event.httpMethod;

    // Chuẩn hóa path về /api/...
    let pathname = event.path || '';
    if (pathname.startsWith('/.netlify/functions/api')) {
      pathname = pathname.replace('/.netlify/functions/api', '/api');
    }
    if (!pathname.startsWith('/api')) {
      pathname = '/api' + pathname;
    }

    // Gắn Query string
    const qs = event.rawQuery || (event.queryStringParameters ? new URLSearchParams(event.queryStringParameters).toString() : '');
    req.url = pathname + (qs ? '?' + qs : '');
    req.headers = { host: 'netlify-site', ...(event.headers || {}) };
    req.socket = { remoteAddress: (event.headers && (event.headers['x-forwarded-for'] || event.headers['client-ip'])) || '127.0.0.1' };

    const res = new EventEmitter();
    res.headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Passcode, X-Gemini-Key'
    };
    res.statusCode = 200;
    res.body = '';

    res.setHeader = (k, v) => {
      res.headers[k.toLowerCase()] = v;
    };

    res.writeHead = (status, headers = {}) => {
      res.statusCode = status;
      for (const [k, v] of Object.entries(headers)) {
        res.headers[k.toLowerCase()] = v;
      }
    };

    res.end = (chunk) => {
      if (chunk) res.body += chunk;
      resolve({
        statusCode: res.statusCode,
        headers: res.headers,
        body: res.body
      });
    };

    process.nextTick(() => {
      if (event.body) {
        req.emit('data', Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8'));
      }
      req.emit('end');
    });

    handleRequest(req, res).catch(err => {
      console.error('[Netlify Function API Error]:', err);
      resolve({
        statusCode: 500,
        headers: res.headers,
        body: JSON.stringify({ success: false, error: err.message })
      });
    });
  });
};
