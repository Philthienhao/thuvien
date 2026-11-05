// ==============================================================================
// VERCEL SERVERLESS FUNCTION ENTRY POINT
// Chuyển tiếp các yêu cầu /api/* vào bộ xử lý trung tâm trong server.js
// ==============================================================================

const handleRequest = require('../server.js');

module.exports = async (req, res) => {
  // Đảm bảo URL luôn có tiền tố /api khi được Vercel định tuyến
  if (req.url && !req.url.startsWith('/api') && req.url !== '/') {
    req.url = '/api' + req.url;
  }
  return handleRequest(req, res);
};
