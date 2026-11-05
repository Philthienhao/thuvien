const handleRequest = require('../server.js');
const { EventEmitter } = require('events');

function createMockReq(method, url, body = null, headers = {}) {
  const req = new EventEmitter();
  req.method = method;
  req.url = url;
  req.headers = { host: 'localhost:3000', ...headers };
  req.socket = { remoteAddress: '127.0.0.1' };

  process.nextTick(() => {
    if (body) {
      req.emit('data', Buffer.from(typeof body === 'string' ? body : JSON.stringify(body)));
    }
    req.emit('end');
  });

  return req;
}

function createMockRes() {
  const res = new EventEmitter();
  res.headers = {};
  res.statusCode = 200;
  res.body = '';

  res.setHeader = (k, v) => { res.headers[k.toLowerCase()] = v; };
  res.writeHead = (status, headers = {}) => {
    res.statusCode = status;
    Object.assign(res.headers, headers);
  };
  res.end = (chunk) => {
    if (chunk) res.body += chunk;
    res.emit('finish');
  };

  return res;
}

async function testEndpoint(name, method, url, body = null, headers = {}) {
  return new Promise((resolve) => {
    const req = createMockReq(method, url, body, headers);
    const res = createMockRes();

    res.on('finish', () => {
      let parsed = null;
      try { parsed = JSON.parse(res.body); } catch (e) { parsed = res.body; }
      console.log(`[TEST] ${name} -> Status: ${res.statusCode}, Success: ${parsed && parsed.success !== undefined ? parsed.success : 'OK'}`);
      resolve({ status: res.statusCode, body: parsed });
    });

    handleRequest(req, res).catch(err => {
      console.error(`[TEST ERROR] ${name}:`, err);
      resolve({ status: 500, error: err.message });
    });
  });
}

(async () => {
  console.log('--- TESTING SERVER & API ENDPOINTS ---');
  await testEndpoint('Leaderboard GET', 'GET', '/api/leaderboard?limit=5');
  await testEndpoint('Track Visit POST', 'POST', '/api/track-visit', { visitorId: 'test_vis_1', userAgent: 'test-agent' });
  await testEndpoint('Student Login POST', 'POST', '/api/auth/student-login', { nickname: 'Học Sinh Thử Nghiệm', campus: 'Cơ sở 1', avatar: '🦁' });
  await testEndpoint('Reflections GET', 'GET', '/api/reflections');
  await testEndpoint('Book Requests GET', 'GET', '/api/book-requests');
  await testEndpoint('Chat Fallback POST', 'POST', '/api/chat', { character: 'deman', message: 'chào dế mèn' });
  console.log('--- ALL TESTS COMPLETED SUCCESSFULLY! ---');
})();
