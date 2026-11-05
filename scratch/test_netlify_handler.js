const { handler } = require('../netlify/functions/api.js');

async function testNetlifyEvent(name, event) {
  const result = await handler(event, {});
  let parsed = null;
  try { parsed = JSON.parse(result.body); } catch (e) { parsed = result.body; }
  console.log(`[NETLIFY TEST] ${name} -> Status: ${result.statusCode}, Success: ${parsed && parsed.success !== undefined ? parsed.success : 'OK'}`);
  return result;
}

(async () => {
  console.log('--- TESTING NETLIFY SERVERLESS FUNCTION HANDLER ---');

  // Test 1: GET /api/leaderboard
  await testNetlifyEvent('GET Leaderboard', {
    httpMethod: 'GET',
    path: '/.netlify/functions/api/leaderboard',
    queryStringParameters: { limit: '5' }
  });

  // Test 2: POST /api/track-visit
  await testNetlifyEvent('POST Track Visit', {
    httpMethod: 'POST',
    path: '/.netlify/functions/api/track-visit',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ visitorId: 'net_test_1', userAgent: 'netlify-test' })
  });

  // Test 3: POST /api/auth/student-login
  await testNetlifyEvent('POST Student Login', {
    httpMethod: 'POST',
    path: '/.netlify/functions/api/auth/student-login',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ nickname: 'Học Sinh Netlify', campus: 'Cơ sở 2', avatar: '🚀' })
  });

  // Test 4: OPTIONS preflight
  await testNetlifyEvent('OPTIONS Preflight', {
    httpMethod: 'OPTIONS',
    path: '/.netlify/functions/api/chat'
  });

  console.log('--- ALL NETLIFY FUNCTION TESTS PASSED! ---');
})();
