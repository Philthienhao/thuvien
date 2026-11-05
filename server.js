const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { resolveSmartLiteratureResponse } = require('./data/literatureKnowledge');
const db = require('./db');

const PORT = process.env.PORT || 3000;
const SUPER_ADMIN_EMAIL = "quyenntn@skylineschool.edu.vn";
const DEFAULT_ADMIN_PASSCODE = "123456";
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || DEFAULT_ADMIN_PASSCODE;
const DATA_DIR = path.join(__dirname, 'data');

const ANALYTICS_FILE = path.join(DATA_DIR, 'analytics.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const VISITORS_FILE = path.join(DATA_DIR, 'visitors.json');
const REQUESTS_FILE = path.join(DATA_DIR, 'book-requests.json');
const REFLECTIONS_FILE = path.join(DATA_DIR, 'reflections.json');
const ADMINS_FILE = path.join(DATA_DIR, 'admins.json');
const TEACHERS_FILE = path.join(DATA_DIR, 'teachers.json');
const TEACHER_NOTIFICATIONS_FILE = path.join(DATA_DIR, 'teacher-notifications.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper to safely read JSON
function readJSON(filePath, defaultVal = []) {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultVal, null, 2), 'utf8');
      return defaultVal;
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return defaultVal;
  }
}

// Helper to safely write JSON
function writeJSON(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
}

// Helper to get admins list with Super Admin quyenntn@skylineschool.edu.vn
async function getAdmins() {
  return await db.getAdmins();
}
function getAdminsSync() {
  const defaultAdmins = [
    {
      id: "admin_super_1",
      email: SUPER_ADMIN_EMAIL,
      name: "Admin Tổng (Cô Quyên)",
      role: "super_admin",
      password: DEFAULT_ADMIN_PASSCODE,
      campus: "Tất cả cơ sở",
      createdAt: "2026-11-04T00:00:00.000Z",
      status: "active"
    }
  ];
  return readJSON(ADMINS_FILE, defaultAdmins);
}

// Helper to authenticate admin credentials (Email & Password or Passcode)
async function verifyAdminAuth(req, parsedUrl) {
  const passcode = req.headers['x-admin-passcode'] || parsedUrl.searchParams.get('passcode');
  const email = (req.headers['x-admin-email'] || parsedUrl.searchParams.get('email') || parsedUrl.searchParams.get('adminEmail') || '').trim().toLowerCase();
  const password = req.headers['x-admin-password'] || parsedUrl.searchParams.get('password') || parsedUrl.searchParams.get('adminPassword');

  const admins = await getAdmins();

  // Super Admin check
  if ((email === SUPER_ADMIN_EMAIL.toLowerCase() && (password === DEFAULT_ADMIN_PASSCODE || password === 'skyline2026')) ||
      passcode === DEFAULT_ADMIN_PASSCODE || passcode === 'skyline2026') {
    const superAdmin = admins.find(a => a.role === 'super_admin') || admins[0];
    return { authorized: true, admin: superAdmin, isSuperAdmin: true };
  }

  // Sub-Admin check
  if (email && password) {
    const found = admins.find(a => a.email.toLowerCase() === email && a.password === password && a.status === 'active');
    if (found) {
      return { authorized: true, admin: found, isSuperAdmin: found.role === 'super_admin' };
    }
  }

  return { authorized: false, admin: null, isSuperAdmin: false };
}

// Character definitions & Fallback knowledge
const characterKnowledge = {
  deman: {
    name: "Dế Mèn",
    responses: [
      {
        keys: ["chào", "hello", "hi"],
        reply: "Chào bạn nhỏ! Rất vui được gặp bạn trong thư viện ảo Sky-Line. Mình là Dế Mèn đây, bạn đang đọc cuốn sách nào thế?"
      },
      {
        keys: ["bài học", "sai lầm", "học được", "trưởng thành"],
        reply: "Bài học lớn nhất đời mình là: Không bao giờ được kiêu căng, ngạo mạn. Sự ân hận vì trêu chị Cốc khiến Dế Choắt bị hại đã theo mình suốt cả đời. Phải biết quý trọng sinh mạng và tôn trọng những người xung quanh."
      },
      {
        keys: ["dế choắt", "choắt"],
        reply: "Mỗi lần nghĩ về Dế Choắt, lòng mình lại thắt lại. Mình ân hận vô cùng. Choắt ốm yếu nhưng rất hiền lành. Lời khuyên cuối cùng của Choắt đã thức tỉnh mình: ở đời mà có thói hung hăng bậy bạ, có óc mà không biết nghĩ, sớm muộn cũng rước họa vào thân!"
      },
      {
        keys: ["chị cốc", "cốc"],
        reply: "Đó là một sai lầm nông nổi của tuổi trẻ! Mình hát trêu chị Cốc rồi chui tọt vào hang, để Dế Choắt ở ngoài chịu trận đòn oan nghiệt. Đó là hành vi hèn nhát mà mình khắc cốt ghi tâm để không bao giờ lặp lại."
      },
      {
        keys: ["dế trũi", "kết nghĩa", "bạn bè", "tình bạn"],
        reply: "Dế Trũi là người anh em kết nghĩa tuyệt vời của mình! Tụi mình cùng vượt thác, phiêu lưu bốn phương, sống chết có nhau. Tình bạn chân chính cần sự sẻ chia, tin tưởng và bảo vệ nhau lúc hiểm nguy."
      },
      {
        keys: ["đố", "câu đố", "thử thách"],
        reply: "Đố bạn câu này nhé: Theo bạn, khi mắc một sai lầm lớn với bạn bè, điều đầu tiên chúng ta nên làm là gì? Hãy bình tĩnh suy ngẫm và trả lời mình nghe nhé!"
      }
    ],
    fallback: "Câu hỏi của bạn rất đáng suy ngẫm! Dưới góc nhìn của một người bạn văn học, mình nghĩ mỗi tác phẩm đều chứa đựng những tầng ý nghĩa nhân văn sâu sắc. Bạn có muốn mình phân tích thêm về nhân vật, cốt truyện hay bài học rút ra không?"
  },
  tam: {
    name: "Tấm",
    responses: [
      {
        keys: ["chào", "hello", "hi"],
        reply: "Chào bạn nhỏ ngoan ngoãn! Mình là Tấm. Rất vui được trò chuyện cùng bạn tại thư viện Sky-Line. Bạn có thích những câu chuyện cổ tích dân gian không?"
      },
      {
        keys: ["bài học", "ý nghĩa", "thiện", "ác"],
        reply: "Bài học sâu sắc nhất trong câu chuyện của mình là 'Ở hiền gặp lành'. Dù gặp phải bao gian nan, bất công từ mẹ con Cám, lòng lương thiện, kiên trì và đức tính chịu thương chịu khó sẽ luôn tìm thấy ánh sáng hạnh phúc."
      },
      {
        keys: ["cá bống", "bống"],
        reply: "Bống bống bang bang, lên ăn cơm vàng cơm bạc nhà ta... Chú cá bống là người bạn thân thiết duy nhất lắng nghe tâm sự của mình bên bờ giếng. Tình cảm ấm áp ấy nhắc nhở chúng ta luôn biết yêu thương vạn vật xung quanh."
      },
      {
        keys: ["cám", "dì ghẻ", "mẹ con cám", "thử thách"],
        reply: "Những thử thách ấy từng khiến mình tủi thân rơi nước mắt. Nhưng qua mỗi lần hóa thân - chim Vàng Anh, cây xoan đào, khung cửi, quả thị - mình nhận ra ta phải luôn dũng cảm vươn lên, không khuất phục trước cái xấu."
      },
      {
        keys: ["hạnh phúc", "ước mơ"],
        reply: "Hạnh phúc không tự nhiên đến, mà được dệt nên từ lòng nhân ái, sự nỗ lực lao động chân chính và niềm tin vào điều thiện lành."
      },
      {
        keys: ["đố", "câu đố"],
        reply: "Đố em: Chi tiết quả thị rụng vào bị bà lão hàng nước mang thông điệp gì về lòng biết ơn và sự đền đáp? Em thử đoán xem!"
      }
    ],
    fallback: "Cảm ơn em đã chia sẻ cùng chị Tấm! Dù trong hoàn cảnh nào, hãy luôn giữ một trái tim ấm áp, lương thiện và tinh thần học hỏi em nhé."
  },
  fox: {
    name: "Cáo",
    responses: [
      {
        keys: ["chào", "hello", "hi"],
        reply: "Chào bạn nhỏ! Ta là Cáo đây. Bạn đến thăm sa mạc của ta cùng Hoàng tử bé đấy ư? Rất vui được gặp một tâm hồn yêu sách như bạn!"
      },
      {
        keys: ["bí mật", "nhìn", "trái tim", "mắt"],
        reply: "Đây là bí mật của ta, rất giản dị: 'Người ta chỉ nhìn thấy thật rõ ràng bằng trái tim. Những gì cốt yếu thì vô hình trong mắt trần.' Bạn có hiểu câu nói này không?"
      },
      {
        keys: ["thuần hóa", "cảm hóa", "tình bạn", "gắn bó"],
        reply: "Thuần hóa nghĩa là gì? Đó là 'tạo nên những mối ràng buộc'. Với ta, bạn chỉ là một chú bé như trăm nghìn chú bé khác. Nhưng nếu bạn cảm hóa ta, chúng ta sẽ cần đến nhau. Bạn sẽ là duy nhất trên đời đối với ta."
      },
      {
        keys: ["hoàng tử bé", "bông hồng", "hoa hồng"],
        reply: "Chính thời gian mà Hoàng tử bé đã dành cho bông hồng mới làm cho bông hồng của cậu trở nên quan trọng đến thế! Bạn phải có trách nhiệm mãi mãi với những gì bạn đã cảm hóa."
      },
      {
        keys: ["đố", "câu đố"],
        reply: "Ta đố bạn: Điều gì làm cho sa mạc trở nên tuyệt đẹp đến thế? Hoàng tử bé từng nói: 'Chính vì nó giấu một giếng nước ở đâu đó...' Bạn có đồng ý không?"
      }
    ],
    fallback: "Đó là một câu hỏi đầy chất thơ và suy tư. Tình bạn và sự thấu cảm cần thời gian để lớn lên. Hãy kể cho ta nghe cảm nhận của bạn nhé!"
  }
};

/**
 * Gọi Google Gemini API để nhân vật trả lời tự nhiên cho mọi câu hỏi tự do
 */
function callGeminiAPI(apiKey, charKey, userMessage, history = []) {
  return new Promise((resolve, reject) => {
    const charProfiles = {
      deman: {
        name: "Dế Mèn",
        persona: "Chú dế hiệp nghĩa, cường tráng, dũng cảm, từng trải qua sai lầm nông nổi và đúc rút bài học đường đời đầu tiên. Xưng hô: xưng 'mình', gọi học sinh là 'bạn' hoặc 'người bạn nhỏ'."
      },
      tam: {
        name: "Tấm",
        persona: "Cô Tấm dịu hiền, nhân hậu, hiếu thảo, giàu nghị lực, kiên cường vượt qua thử thách để bảo vệ lẽ phải và hạnh phúc. Xưng hô: xưng 'chị' hoặc 'mình', gọi học sinh là 'em' hoặc 'bạn nhỏ'."
      },
      fox: {
        name: "Cáo",
        persona: "Chú Cáo thông thái giữa sa mạc cát vàng, người bạn của Hoàng tử bé, có cái nhìn triết lý, sâu sắc về tình bạn, sự cảm hóa và tình yêu thương. Xưng hô: xưng 'ta', gọi học sinh là 'bạn nhỏ'."
      }
    };

    const charInfo = charProfiles[charKey] || charProfiles.deman;
    const systemPrompt = `Bạn là nhân vật văn học ${charInfo.name} trong Thư viện ảo Sky-Line dành cho học sinh phổ thông.
ĐẶC ĐIỂM NHẬP VAI:
- ${charInfo.persona}
- Giọng văn: Ấm áp, truyền cảm hứng, chuẩn mực sư phạm, khơi gợi tình yêu sách và tư duy văn học.
NHIỆM VỤ CỐT LÕI:
- Trả lời ĐẦY ĐỦ, CHÍNH XÁC, SÂU SẮC cho MỌI câu hỏi của học sinh: phân tích nhân vật văn học, tóm tắt cốt truyện, giải thích ý nghĩa nghệ thuật, hướng dẫn viết văn, đố vui hay tâm sự học đường.
- Khi được hỏi về nhân vật tác phẩm khác (ví dụ Dế Mèn được hỏi về Tấm hay Hoàng tử bé), hãy trả lời mạch lạc, đúng chuẩn kiến thức văn học dưới góc nhìn của một người bạn văn học am hiểu.
- Trình bày rõ ràng, sử dụng gạch đầu dòng, in đậm các luận điểm chính để học sinh dễ học và ghi nhớ.`;

    const contents = [];
    if (Array.isArray(history)) {
      history.slice(-6).forEach(item => {
        if (item.content && item.role) {
          contents.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.content }]
          });
        }
      });
    }
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    const payload = JSON.stringify({
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1200
      }
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      port: 443,
      path: `/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      },
      timeout: 12000
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.candidates && json.candidates[0] && json.candidates[0].content && json.candidates[0].content.parts) {
            const reply = json.candidates[0].content.parts.map(p => p.text).join('\n');
            resolve(reply);
          } else if (json.error) {
            reject(new Error(json.error.message || 'Gemini API Error'));
          } else {
            reject(new Error('Invalid response structure from Gemini API'));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Gemini API timeout'));
    });
    req.write(payload);
    req.end();
  });
}

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
  });
}

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

async function handleRequest(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Admin-Passcode, X-Gemini-Key');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // ==========================================
  // API: TRACK VISITOR (LƯU VĨNH VIỄN LƯỢT TRUY CẬP)
  // ==========================================
  if (pathname === '/api/track-visit' && req.method === 'POST') {
    try {
      const { visitorId, userAgent, studentName, studentClass, avatar } = await parseRequestBody(req);
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
      await db.recordVisit({ visitorId, userAgent, studentName, studentClass, avatar, ip });
      const analytics = await db.getAnalytics();
      sendJSON(res, 200, { success: true, analytics });
      return;
    } catch (err) {
      sendJSON(res, 400, { success: false, error: err.message });
      return;
    }
  }

  // ==========================================
  // API: STUDENT LOGIN (NICKNAME & CƠ SỞ BẢO MẬT)
  // ==========================================
  if ((pathname === '/api/auth/student-login' || pathname === '/api/auth/login') && req.method === 'POST') {
    try {
      const { nickname, name, campus, studentClass, avatar, visitorId } = await parseRequestBody(req);
      const cleanNickname = (nickname || name || '').trim();
      if (!cleanNickname) {
        sendJSON(res, 400, { success: false, error: 'Vui lòng nhập Nickname (Biệt danh) của em' });
        return;
      }

      const VALID_CAMPUSES = ['Cơ sở 1', 'Cơ sở 2', 'Cơ sở 3', 'Cơ sở 4', 'Cơ sở 5'];
      let cleanCampus = (campus || studentClass || 'Cơ sở 1').trim();
      if (!VALID_CAMPUSES.includes(cleanCampus)) {
        cleanCampus = 'Cơ sở 1';
      }
      const cleanAvatar = avatar || '🪐';
      const now = new Date().toISOString();

      let user = await db.findUser(cleanNickname, cleanCampus);
      if (!user) {
        user = {
          id: 'u_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
          visitorId: visitorId || null,
          name: cleanNickname,
          nickname: cleanNickname,
          campus: cleanCampus,
          studentClass: cleanCampus,
          avatar: cleanAvatar,
          stars: 0,
          points: 0,
          quizStars: 0,
          reviewStars: 0,
          requestStars: 0,
          badges: 0,
          challenges: 0,
          streak: 1,
          firstLogin: now,
          lastLogin: now,
          visitCount: 1,
          lastActivity: now
        };
      } else {
        user.lastLogin = now;
        user.visitCount = (user.visitCount || 1) + 1;
        user.avatar = cleanAvatar;
        user.nickname = cleanNickname;
        user.campus = cleanCampus;
        user.studentClass = cleanCampus;
        if (typeof user.stars !== 'number') user.stars = user.points || 0;
        if (typeof user.quizStars !== 'number') user.quizStars = 0;
        if (typeof user.reviewStars !== 'number') user.reviewStars = 0;
        if (typeof user.requestStars !== 'number') user.requestStars = 0;
        if (visitorId) user.visitorId = visitorId;
        user.lastActivity = now;
      }

      await db.saveUser(user);

      if (visitorId) {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
        await db.recordVisit({ visitorId, studentName: cleanNickname, studentClass: cleanCampus, avatar: cleanAvatar, ip });
      }

      const users = await db.getUsers();
      await db.updateAnalytics(a => {
        a.totalUsers = users.length;
        return a;
      });

      const analytics = await db.getAnalytics();
      sendJSON(res, 200, { success: true, user, analytics });
      return;
    } catch (err) {
      sendJSON(res, 400, { success: false, error: err.message });
      return;
    }
  }

  // ==========================================
  // API: ĐĂNG NHẬP GIÁO VIÊN & QUẢN TRỊ VIÊN
  // (ADMIN TỔNG: quyenntn@skylineschool.edu.vn / 123456)
  // (GIÁO VIÊN: Email cá nhân -> Báo Admin Tổng để cấp quyền Admin Cấp 2)
  // ==========================================
  if ((pathname === '/api/auth/admin-login' || pathname === '/api/auth/staff-login') && req.method === 'POST') {
    try {
      const { email, password, name, campus } = await parseRequestBody(req);
      const cleanEmail = (email || '').trim().toLowerCase();
      const cleanPass = (password || '').trim();
      const cleanName = (name || '').trim();
      const cleanCampus = campus || 'Cơ sở 1';

      if (!cleanEmail || !cleanPass) {
        sendJSON(res, 400, { success: false, error: 'Vui lòng nhập Email và Mật khẩu' });
        return;
      }

      const admins = await getAdmins();

      // 1. Kiểm tra Admin Tổng tối cao (quyenntn@skylineschool.edu.vn / 123456)
      if (cleanEmail === SUPER_ADMIN_EMAIL.toLowerCase() && (cleanPass === DEFAULT_ADMIN_PASSCODE || cleanPass === 'skyline2026')) {
        const superAdmin = admins.find(a => a.role === 'super_admin') || {
          id: 'admin_super_1',
          email: SUPER_ADMIN_EMAIL,
          name: 'Admin Tổng (Cô Quyên)',
          role: 'super_admin',
          campus: 'Tất cả cơ sở'
        };

        sendJSON(res, 200, {
          success: true,
          role: 'super_admin',
          isSuperAdmin: true,
          message: 'Đăng nhập thành công với quyền Admin Tổng (Cô Quyên)',
          admin: {
            id: superAdmin.id,
            email: superAdmin.email,
            name: superAdmin.name,
            role: 'super_admin',
            campus: 'Tất cả cơ sở'
          }
        });
        return;
      }

      // 2. Kiểm tra nếu đã được cấp quyền Admin Cấp 2 trong admins.json
      const foundAdmin = admins.find(a => a.email.toLowerCase() === cleanEmail && a.password === cleanPass);
      if (foundAdmin) {
        if (foundAdmin.status !== 'active') {
          sendJSON(res, 403, { success: false, error: 'Tài khoản quản trị viên này hiện đang bị tạm khóa' });
          return;
        }

        sendJSON(res, 200, {
          success: true,
          role: foundAdmin.role,
          isSuperAdmin: foundAdmin.role === 'super_admin',
          message: foundAdmin.role === 'super_admin' ? 'Đăng nhập thành công với quyền Admin Tổng' : 'Đăng nhập thành công với quyền Admin Cấp 2',
          admin: {
            id: foundAdmin.id,
            email: foundAdmin.email,
            name: foundAdmin.name,
            role: foundAdmin.role,
            campus: foundAdmin.campus || 'Tất cả cơ sở'
          }
        });
        return;
      }

      // 3. Giáo viên đăng nhập bằng Email cá nhân
      const teachers = readJSON(TEACHERS_FILE, []);
      let teacher = teachers.find(t => t.email.toLowerCase() === cleanEmail);
      const now = new Date().toISOString();
      const timeStr = new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN');

      if (!teacher) {
        teacher = {
          id: 'teacher_' + Date.now(),
          email: cleanEmail,
          name: cleanName || cleanEmail.split('@')[0],
          campus: cleanCampus,
          password: cleanPass,
          role: 'teacher',
          isSubAdmin: false,
          firstLogin: now,
          lastLogin: now,
          visitCount: 1,
          status: 'active'
        };
        teachers.push(teacher);
      } else {
        if (teacher.password && teacher.password !== cleanPass) {
          sendJSON(res, 401, { success: false, error: 'Mật khẩu giáo viên không chính xác' });
          return;
        }
        if (!teacher.password) teacher.password = cleanPass;
        teacher.lastLogin = now;
        teacher.visitCount = (teacher.visitCount || 1) + 1;
        if (cleanName) teacher.name = cleanName;
        if (campus) teacher.campus = cleanCampus;
      }
      writeJSON(TEACHERS_FILE, teachers);

      // Gửi thông báo đến Admin Tổng
      const notifs = readJSON(TEACHER_NOTIFICATIONS_FILE, []);
      const newNotif = {
        id: 'notif_' + Date.now(),
        type: 'teacher_login',
        teacherEmail: teacher.email,
        teacherName: teacher.name,
        campus: teacher.campus,
        timestamp: now,
        timeStr: timeStr,
        message: `Giáo viên ${teacher.name} (${teacher.email}) - ${teacher.campus} vừa đăng nhập hệ thống`,
        isRead: false
      };
      notifs.unshift(newNotif);
      if (notifs.length > 100) notifs.length = 100;
      writeJSON(TEACHER_NOTIFICATIONS_FILE, notifs);

      // Nếu giáo viên này đã được duyệt là Admin Cấp 2
      if (teacher.isSubAdmin) {
        sendJSON(res, 200, {
          success: true,
          role: 'sub_admin',
          isSuperAdmin: false,
          message: 'Đăng nhập thành công với quyền Admin Cấp 2!',
          admin: {
            id: teacher.id,
            email: teacher.email,
            name: teacher.name,
            role: 'sub_admin',
            campus: teacher.assignedCampus || teacher.campus || 'Tất cả cơ sở'
          }
        });
        return;
      }

      // Chưa được cấp quyền Admin Cấp 2 -> thông báo chờ Admin Tổng duyệt
      sendJSON(res, 200, {
        success: true,
        role: 'teacher',
        isSuperAdmin: false,
        message: `Kính chào Thầy/Cô ${teacher.name}! Hệ thống đã thông báo cho Admin Tổng (quyenntn@skylineschool.edu.vn) để chọn cấp quyền Admin Cấp 2.`,
        teacher: {
          id: teacher.id,
          email: teacher.email,
          name: teacher.name,
          campus: teacher.campus,
          role: 'teacher',
          isSubAdmin: false
        }
      });
      return;
    } catch (err) {
      sendJSON(res, 400, { success: false, error: err.message });
      return;
    }
  }

  // ==========================================
  // API: ADMIN TỔNG CHỌN GIÁO VIÊN LÀM ADMIN CẤP 2
  // ==========================================
  if (pathname === '/api/admin/promote-teacher' && req.method === 'POST') {
    try {
      const auth = await verifyAdminAuth(req, parsedUrl);
      const body = await parseRequestBody(req);
      const reqEmail = (body.requesterEmail || body.email || auth.admin?.email || '').trim().toLowerCase();
      const reqPass = (body.requesterPassword || body.password || body.passcode || '').trim();

      const isSuper = (reqEmail === SUPER_ADMIN_EMAIL.toLowerCase() && (reqPass === DEFAULT_ADMIN_PASSCODE || reqPass === 'skyline2026')) ||
                      (auth.isSuperAdmin);

      if (!isSuper) {
        sendJSON(res, 403, { success: false, error: 'Chỉ Admin Tổng (Cô Quyên) mới có quyền cấp quyền Admin Cấp 2 cho giáo viên' });
        return;
      }

      const teacherEmail = (body.teacherEmail || '').trim().toLowerCase();
      const assignedCampus = body.assignedCampus || body.campus || 'Tất cả cơ sở';

      const teachers = readJSON(TEACHERS_FILE, []);
      const teacher = teachers.find(t => t.email.toLowerCase() === teacherEmail);

      const admins = await getAdmins();
      let adminItem = admins.find(a => a.email.toLowerCase() === teacherEmail);

      if (teacher) {
        teacher.isSubAdmin = true;
        teacher.role = 'sub_admin';
        teacher.assignedCampus = assignedCampus;
        writeJSON(TEACHERS_FILE, teachers);
      }

      if (!adminItem) {
        adminItem = {
          id: 'admin_sub_' + Date.now(),
          email: teacherEmail,
          name: teacher ? teacher.name : (body.teacherName || 'Giáo viên Admin Cấp 2'),
          role: 'sub_admin',
          password: teacher ? teacher.password : '123456',
          campus: assignedCampus,
          status: 'active',
          createdAt: new Date().toISOString(),
          addedBy: SUPER_ADMIN_EMAIL
        };
        admins.push(adminItem);
      } else {
        adminItem.role = 'sub_admin';
        adminItem.campus = assignedCampus;
        adminItem.status = 'active';
      }
      writeJSON(ADMINS_FILE, admins);

      sendJSON(res, 200, {
        success: true,
        message: `Đã chọn và cấp quyền Admin Cấp 2 thành công cho giáo viên ${teacherEmail} (${assignedCampus})!`,
        admin: adminItem
      });
      return;
    } catch (err) {
      sendJSON(res, 400, { success: false, error: err.message });
      return;
    }
  }

  // ==========================================
  // API: ADMIN TỔNG THU HỒI QUYỀN ADMIN CẤP 2 CỦA GIÁO VIÊN
  // ==========================================
  if (pathname === '/api/admin/demote-teacher' && req.method === 'POST') {
    try {
      const auth = await verifyAdminAuth(req, parsedUrl);
      const body = await parseRequestBody(req);
      const reqEmail = (body.requesterEmail || body.email || auth.admin?.email || '').trim().toLowerCase();
      const reqPass = (body.requesterPassword || body.password || body.passcode || '').trim();

      const isSuper = (reqEmail === SUPER_ADMIN_EMAIL.toLowerCase() && (reqPass === DEFAULT_ADMIN_PASSCODE || reqPass === 'skyline2026')) ||
                      (auth.isSuperAdmin);

      if (!isSuper) {
        sendJSON(res, 403, { success: false, error: 'Chỉ Admin Tổng (Cô Quyên) mới có quyền thu hồi quyền Admin Cấp 2' });
        return;
      }

      const teacherEmail = (body.teacherEmail || '').trim().toLowerCase();

      const teachers = readJSON(TEACHERS_FILE, []);
      const teacher = teachers.find(t => t.email.toLowerCase() === teacherEmail);
      if (teacher) {
        teacher.isSubAdmin = false;
        teacher.role = 'teacher';
        writeJSON(TEACHERS_FILE, teachers);
      }

      const admins = await getAdmins();
      const adminIdx = admins.findIndex(a => a.email.toLowerCase() === teacherEmail);
      if (adminIdx !== -1 && admins[adminIdx].role !== 'super_admin') {
        admins.splice(adminIdx, 1);
        writeJSON(ADMINS_FILE, admins);
      }

      sendJSON(res, 200, {
        success: true,
        message: `Đã thu hồi quyền Admin Cấp 2 của giáo viên ${teacherEmail}.`
      });
      return;
    } catch (err) {
      sendJSON(res, 400, { success: false, error: err.message });
      return;
    }
  }

  // ==========================================
  // API: LẤY DANH SÁCH GIÁO VIÊN & THÔNG BÁO CHO ADMIN TỔNG
  // ==========================================
  if (pathname === '/api/admin/teachers' && req.method === 'GET') {
    const auth = await verifyAdminAuth(req, parsedUrl);
    if (!auth.authorized) {
      sendJSON(res, 401, { success: false, error: 'Yêu cầu quyền Quản trị viên' });
      return;
    }
    const teachers = await db.getTeachers();
    const notifs = await db.getTeacherNotifications();
    sendJSON(res, 200, {
      success: true,
      teachers,
      notifications: notifs,
      unreadCount: notifs.filter(n => !n.isRead).length
    });
    return;
  }

  // ==========================================
  // API: ĐÁNH DẤU ĐÃ ĐỌC THÔNG BÁO GIÁO VIÊN
  // ==========================================
  if (pathname === '/api/admin/clear-notifications' && req.method === 'POST') {
    const auth = await verifyAdminAuth(req, parsedUrl);
    if (!auth.authorized) {
      sendJSON(res, 401, { success: false, error: 'Yêu cầu quyền Quản trị viên' });
      return;
    }
    await db.clearTeacherNotifications();
    sendJSON(res, 200, { success: true, message: 'Đã xóa tất cả thông báo' });
    return;
  }

  // ==========================================
  // API: ADMIN TỔNG SHARE QUYỀN CHO ADMIN CẤP 2
  // ==========================================
  if (pathname === '/api/admin/share-permission' && req.method === 'POST') {
    try {
      const body = await parseRequestBody(req);
      const reqEmail = (body.requesterEmail || body.email || '').trim().toLowerCase();
      const reqPass = (body.requesterPassword || body.password || body.passcode || '').trim();

      const admins = await getAdmins();
      const requester = admins.find(a => 
        (a.email.toLowerCase() === reqEmail && a.password === reqPass) ||
        (reqPass === ADMIN_PASSCODE && a.role === 'super_admin')
      );

      if (!requester || requester.role !== 'super_admin') {
        sendJSON(res, 403, { success: false, error: 'Chỉ Admin Tổng mới có quyền cấp và chia sẻ quyền cho Admin cấp 2' });
        return;
      }

      const targetEmail = (body.subAdminEmail || body.targetEmail || (body.requesterEmail ? body.email : '') || '').trim().toLowerCase();
      if (!targetEmail || !targetEmail.includes('@')) {
        sendJSON(res, 400, { success: false, error: 'Vui lòng nhập địa chỉ Gmail hợp lệ' });
        return;
      }

      const targetName = (body.subAdminName || body.targetName || body.name || 'Admin Cấp 2').trim();
      const targetCampus = body.campus || 'Tất cả cơ sở';
      const targetPass = (body.initialPassword || body.subAdminPassword || 'skyline2026').trim();

      let existing = admins.find(a => a.email.toLowerCase() === targetEmail);
      if (existing) {
        if (existing.role === 'super_admin') {
          sendJSON(res, 400, { success: false, error: 'Tài khoản này đã là Admin Tổng' });
          return;
        }
        existing.name = targetName;
        existing.campus = targetCampus;
        if (targetPass) existing.password = targetPass;
        existing.status = 'active';
        existing.updatedAt = new Date().toISOString();
      } else {
        const newSubAdmin = {
          id: 'admin_sub_' + Date.now(),
          email: targetEmail,
          name: targetName,
          role: 'sub_admin',
          password: targetPass,
          campus: targetCampus,
          status: 'active',
          createdAt: new Date().toISOString(),
          addedBy: requester.email
        };
        admins.push(newSubAdmin);
      }

      writeJSON(ADMINS_FILE, admins);

      const safeAdmins = admins.map(a => ({
        id: a.id,
        email: a.email,
        name: a.name,
        role: a.role,
        campus: a.campus,
        status: a.status,
        createdAt: a.createdAt,
        addedBy: a.addedBy
      }));

      sendJSON(res, 200, {
        success: true,
        message: `Đã phân quyền Admin Cấp 2 thành công cho Gmail: ${targetEmail}`,
        admin: admins.find(a => a.email.toLowerCase() === targetEmail),
        admins: safeAdmins
      });
      return;
    } catch (err) {
      sendJSON(res, 400, { success: false, error: err.message });
      return;
    }
  }

  // ==========================================
  // API: ADMIN TỔNG THU HỒI QUYỀN ADMIN CẤP 2
  // ==========================================
  if (pathname === '/api/admin/revoke-permission' && req.method === 'POST') {
    try {
      const body = await parseRequestBody(req);
      const reqEmail = (body.requesterEmail || body.email || '').trim().toLowerCase();
      const reqPass = (body.requesterPassword || body.password || body.passcode || '').trim();
      const adminId = body.adminId;

      const admins = await getAdmins();
      const requester = admins.find(a => 
        (a.email.toLowerCase() === reqEmail && a.password === reqPass) ||
        (reqPass === ADMIN_PASSCODE && a.role === 'super_admin')
      );

      if (!requester || requester.role !== 'super_admin') {
        sendJSON(res, 403, { success: false, error: 'Chỉ Admin Tổng mới có quyền thu hồi quyền quản trị' });
        return;
      }

      const targetIndex = admins.findIndex(a => a.id === adminId);
      if (targetIndex === -1) {
        sendJSON(res, 404, { success: false, error: 'Không tìm thấy tài khoản quản trị viên này' });
        return;
      }

      if (admins[targetIndex].role === 'super_admin') {
        sendJSON(res, 400, { success: false, error: 'Không thể thu hồi quyền của tài khoản Admin Tổng' });
        return;
      }

      const revokedEmail = admins[targetIndex].email;
      admins.splice(targetIndex, 1);
      writeJSON(ADMINS_FILE, admins);

      const safeAdmins = admins.map(a => ({
        id: a.id,
        email: a.email,
        name: a.name,
        role: a.role,
        campus: a.campus,
        status: a.status,
        createdAt: a.createdAt,
        addedBy: a.addedBy
      }));

      sendJSON(res, 200, {
        success: true,
        message: `Đã thu hồi quyền quản trị của Gmail: ${revokedEmail}`,
        admins: safeAdmins
      });
      return;
    } catch (err) {
      sendJSON(res, 400, { success: false, error: err.message });
      return;
    }
  }

  // ==========================================
  // API: LẤY DANH SÁCH TÀI KHOẢN ADMIN (CHỈ ADMIN TỔNG)
  // ==========================================
  if (pathname === '/api/admin/admins' && req.method === 'GET') {
    const auth = await verifyAdminAuth(req, parsedUrl);
    if (!auth.authorized) {
      sendJSON(res, 401, { success: false, error: 'Yêu cầu đăng nhập quản trị' });
      return;
    }

    const admins = await getAdmins();
    const safeAdmins = admins.map(a => ({
      id: a.id,
      email: a.email,
      name: a.name,
      role: a.role,
      campus: a.campus,
      status: a.status,
      createdAt: a.createdAt,
      addedBy: a.addedBy
    }));

    sendJSON(res, 200, {
      success: true,
      isSuperAdmin: auth.isSuperAdmin,
      admins: safeAdmins
    });
    return;
  }

  // ==========================================
  // API: CỘNG NGÔI SAO / ĐIỂM THI ĐUA (REWARD STARS)
  // ==========================================
  if (pathname === '/api/user/add-stars' && req.method === 'POST') {
    try {
      const { nickname, name, campus, studentClass, starsToAdd, count, reason, type } = await parseRequestBody(req);
      const cleanNickname = (nickname || name || '').trim();
      const cleanCampus = (campus || studentClass || 'Cơ sở 1').trim();
      const amount = parseInt(starsToAdd || count || 1, 10);
      if (!cleanNickname) {
        sendJSON(res, 400, { success: false, error: 'Nickname không hợp lệ' });
        return;
      }

      const user = await db.addStars(cleanNickname, cleanCampus, amount, type || 'quiz');
      sendJSON(res, 200, { success: true, user });
      return;
    } catch (err) {
      sendJSON(res, 400, { success: false, error: err.message });
      return;
    }
  }

  // ==========================================
  // API: SYNC USER PROGRESS
  // ==========================================
  if (pathname === '/api/user/sync-progress' && req.method === 'POST') {
    try {
      const { nickname, campus, studentClass, stars, points, badges, challenges, streak, avatar } = await parseRequestBody(req);
      const cleanNickname = (nickname || '').trim();
      const cleanCampus = (campus || studentClass || 'Cơ sở 1').trim();
      let user = await db.findUser(cleanNickname, cleanCampus);
      if (user) {
        if (typeof stars === 'number') user.stars = stars;
        if (typeof points === 'number') user.points = points;
        if (typeof badges === 'number') user.badges = badges;
        if (typeof challenges === 'number') user.challenges = challenges;
        if (typeof streak === 'number') user.streak = streak;
        if (avatar) user.avatar = avatar;
        user.lastActivity = new Date().toISOString();
        await db.saveUser(user);
      }
      sendJSON(res, 200, { success: true, user });
      return;
    } catch (err) {
      sendJSON(res, 400, { success: false, error: err.message });
      return;
    }
  }

  // ==========================================
  // API: LEADERBOARD (BẢNG VÀNG THỰC TẾ - CÔNG KHAI 5 CƠ SỞ HOẶC TOÀN HỆ THỐNG)
  // ==========================================
  if (pathname === '/api/leaderboard' && req.method === 'GET') {
    try {
      const limit = parseInt(parsedUrl.searchParams.get('limit') || '10', 10);
      const leaderboard = await db.getLeaderboard(limit);
      sendJSON(res, 200, { success: true, leaderboard });
      return;
    } catch (err) {
      sendJSON(res, 400, { success: false, error: err.message });
      return;
    }
  }

  // ==========================================
  // API: REFLECTIONS (CẢM NHẬN SÁCH)
  // ==========================================
  if (pathname === '/api/reflections') {
    if (req.method === 'GET') {
      const reflections = await db.getReflections();
      sendJSON(res, 200, { success: true, reflections });
      return;
    }

    if (req.method === 'POST') {
      try {
        const body = await parseRequestBody(req);
        const { studentId, student, studentName, campus, avatar, text, wordCount, badge } = body;
        const now = new Date();
        const dateStr = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();
        const newRef = {
          id: 'ref_' + Date.now(),
          studentId: studentId || null,
          student: student || (studentName ? (studentName + ' (' + (campus || '') + ')') : 'Ẩn danh'),
          studentName: studentName || student || 'Ẩn danh',
          campus: campus || 'Sky-Line',
          avatar: avatar || '🪐',
          text: (text || '').trim(),
          wordCount: wordCount || 0,
          badge: badge || '✨ Cảm nhận sách',
          status: 'Chờ duyệt',
          starsAwarded: 0,
          adminFeedback: '',
          date: dateStr,
          timestamp: now.toISOString()
        };
        await db.addReflection(newRef);
        sendJSON(res, 200, { success: true, reflection: newRef });
        return;
      } catch (err) {
        sendJSON(res, 400, { success: false, error: err.message });
        return;
      }
    }
  }

  // ==========================================
  // API: ADMIN CHẤM ĐIỂM BÀI CẢM NHẬN (1 - 5 ⭐ DO ADMIN QUYẾT ĐỊNH)
  // ==========================================
  if (pathname === '/api/admin/grade-reflection' && req.method === 'POST') {
    try {
      const auth = await verifyAdminAuth(req, parsedUrl);
      if (!auth.authorized) {
        sendJSON(res, 401, { success: false, error: 'Yêu cầu quyền Quản trị viên' });
        return;
      }
      const { reflectionId, id, starsAwarded, adminFeedback } = await parseRequestBody(req);
      const targetId = reflectionId || id;
      await db.gradeReflection(targetId, {
        starsAwarded: parseInt(starsAwarded || 5, 10),
        adminFeedback: adminFeedback || 'Bài viết rất xuất sắc!',
        gradedBy: auth.admin ? auth.admin.email : 'Admin'
      });
      sendJSON(res, 200, { success: true, message: 'Đã chấm điểm và cộng sao thành công!' });
      return;
    } catch (err) {
      sendJSON(res, 400, { success: false, error: err.message });
      return;
    }
  }

  // ==========================================
  // ==========================================
  // API: BOOK REQUESTS (ĐỀ XUẤT SÁCH - BẢO MẬT CHỈ ADMIN NẮM)
  // ==========================================
  if (pathname === '/api/book-requests') {
    if (req.method === 'GET') {
      const requests = await db.getBookRequests();
      sendJSON(res, 200, { success: true, requests });
      return;
    }

    if (req.method === 'POST') {
      try {
        const body = await parseRequestBody(req);
        const now = new Date();
        const dateStr = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();
        const newReq = {
          id: String(Date.now()),
          title: (body.title || '').trim(),
          author: (body.author || '').trim(),
          grade: (body.grade || 'THCS').trim(),
          genre: (body.genre || 'Khác').trim(),
          reason: (body.reason || '').trim(),
          student: body.student || ((body.studentName || 'Ẩn danh') + ' (' + (body.campus || '') + ')'),
          studentName: body.studentName || body.student || 'Ẩn danh',
          campus: body.campus || 'Sky-Line',
          studentClass: body.studentClass || body.campus || '',
          date: dateStr,
          timestamp: now.toISOString(),
          status: 'Chờ duyệt'
        };
        await db.addBookRequest(newReq);
        if (body.studentName && body.campus) {
          await db.addStars(body.studentName, body.campus, 5, 'request');
        }
        sendJSON(res, 200, { success: true, request: newReq });
        return;
      } catch (err) {
        sendJSON(res, 400, { success: false, error: err.message });
        return;
      }
    }
  }

  // ==========================================
  // API: ADMIN CẬP NHẬT TRẠNG THÁI ĐỀ XUẤT SÁCH
  // ==========================================
  if (pathname === '/api/admin/book-request/status' && req.method === 'POST') {
    try {
      const auth = await verifyAdminAuth(req, parsedUrl);
      if (!auth.authorized) {
        sendJSON(res, 401, { success: false, error: 'Yêu cầu quyền Quản trị viên' });
        return;
      }
      const { requestId, id, status } = await parseRequestBody(req);
      await db.updateBookRequestStatus(requestId || id, status || 'Đã duyệt');
      sendJSON(res, 200, { success: true, message: 'Cập nhật trạng thái thành công' });
      return;
    } catch (err) {
      sendJSON(res, 400, { success: false, error: err.message });
      return;
    }
  }

  // ==========================================
  // API: ADMIN DASHBOARD (THỐNG KÊ TOÀN DIỆN & TỔNG HỢP TRAO THƯỞNG)
  // ==========================================
  if (pathname === '/api/admin/stats' && req.method === 'GET') {
    const auth = await verifyAdminAuth(req, parsedUrl);
    if (!auth.authorized) {
      sendJSON(res, 401, { success: false, error: 'Yêu cầu quyền Quản trị viên' });
      return;
    }
    const analytics = await db.getAnalytics();
    const allUsers = await db.getUsers();
    const visitors = await db.getVisitors();
    const allBookRequests = await db.getBookRequests();
    const reflections = await db.getReflections();
    const allTeachers = await db.getTeachers();
    const teacherNotifs = await db.getTeacherNotifications();

    const campusFilter = parsedUrl.searchParams.get('campus');
    let users = allUsers;
    let bookRequests = allBookRequests;
    let teachers = allTeachers;
    let filteredReflections = reflections;

    if (campusFilter && campusFilter !== 'all' && campusFilter !== 'Tất cả cơ sở') {
      users = allUsers.filter(u => u.campus === campusFilter || u.studentClass === campusFilter);
      teachers = allTeachers.filter(t => t.campus === campusFilter || t.assignedCampus === campusFilter);
      filteredReflections = reflections.filter(r => r.campus === campusFilter);
      bookRequests = allBookRequests.filter(r => 
        (r.campus === campusFilter) || 
        (r.student && r.student.includes(campusFilter)) || 
        (r.studentClass && r.studentClass.includes(campusFilter))
      );
    }

    // 5 Cơ sở Sky-Line Breakdown
    const campuses = ['Cơ sở 1', 'Cơ sở 2', 'Cơ sở 3', 'Cơ sở 4', 'Cơ sở 5'];
    const campusBreakdown = campuses.map(c => {
      const cUsers = allUsers.filter(u => u.campus === c || u.studentClass === c);
      const cTeachers = allTeachers.filter(t => t.campus === c || t.assignedCampus === c);
      return {
        campus: c,
        userCount: cUsers.length,
        teacherCount: cTeachers.length,
        totalStars: cUsers.reduce((sum, u) => sum + (u.stars || u.points || 0), 0),
        requestsCount: allBookRequests.filter(r => r.campus === c || (r.student && r.student.includes(c))).length,
        reflectionsCount: reflections.filter(r => r.campus === c).length
      };
    });

    // Bảng tổng hợp thi đua xếp hạng theo số sao ⭐
    const rewardsRanking = [...users].map(u => ({
      id: u.id,
      name: u.name,
      nickname: u.nickname || u.name,
      campus: u.campus || u.studentClass || 'Cơ sở 1',
      studentClass: u.campus || u.studentClass || 'Cơ sở 1',
      avatar: u.avatar || '🪐',
      stars: u.stars || u.points || 0,
      quizStars: u.quizStars || 0,
      reviewStars: u.reviewStars || 0,
      requestStars: u.requestStars || 0,
      challenges: u.challenges || 0,
      visitCount: u.visitCount || 1,
      lastActivity: u.lastActivity || u.lastLogin
    })).sort((a, b) => b.stars - a.stars);

    // Gán danh hiệu trao thưởng
    rewardsRanking.forEach((item, index) => {
      item.rank = index + 1;
      if (item.rank === 1 && item.stars > 0) item.prizeTier = '🥇 Giải Nhất - Quán quân Đọc sách Tháng';
      else if (item.rank === 2 && item.stars > 0) item.prizeTier = '🥈 Giải Nhì - Độc giả Xuất sắc Tháng';
      else if (item.rank === 3 && item.stars > 0) item.prizeTier = '🥉 Giải Ba - Độc giả Tích cực Tháng';
      else if (item.stars > 0) item.prizeTier = '🌟 Giải Khuyến khích';
      else item.prizeTier = 'Chưa có điểm';
    });

    const pendingReflectionsCount = reflections.filter(r => r.status === 'Chờ admin chấm điểm').length;

    sendJSON(res, 200, {
      success: true,
      currentAdmin: {
        id: auth.admin.id,
        email: auth.admin.email,
        name: auth.admin.name,
        role: auth.admin.role,
        campus: auth.admin.campus
      },
      isSuperAdmin: auth.isSuperAdmin,
      campusBreakdown,
      analytics: {
        totalVisits: analytics.totalVisits || 0,
        uniqueVisitors: analytics.uniqueVisitors || 0,
        totalUsers: allUsers.length,
        filteredUsers: users.length,
        totalTeachers: allTeachers.length,
        createdDate: analytics.createdDate || "2026-11-04",
        lastVisitDate: analytics.lastVisitDate || null
      },
      users,
      teachers,
      allTeachers,
      teacherNotifications: teacherNotifs,
      unreadTeacherNotificationsCount: teacherNotifs.filter(n => !n.isRead).length,
      rewardsRanking,
      bookRequests, // CHỈ ADMIN MỚI NHẬN ĐƯỢC DANH SÁCH NÀY
      recentVisitors: visitors.slice(0, 50),
      bookRequestsCount: bookRequests.length,
      reflections: filteredReflections,
      allReflections: reflections,
      reflectionsCount: reflections.length,
      pendingReflectionsCount
    });
    return;
  }

  // ==========================================
  // API: ADMIN RESET (RESET TOÀN BỘ VỀ 0)
  // ==========================================
  if (pathname === '/api/admin/reset' && req.method === 'POST') {
    try {
      const body = await parseRequestBody(req);
      const pass = (body.passcode || body.password || '').trim();
      const email = (body.email || '').trim().toLowerCase();
      
      const admins = await getAdmins();
      const adminMatch = admins.find(a => 
        (a.email.toLowerCase() === email && (a.password === pass || !pass)) ||
        (a.password === pass && a.status === 'active')
      );

      const isSuper = (email === SUPER_ADMIN_EMAIL.toLowerCase() && (pass === DEFAULT_ADMIN_PASSCODE || pass === 'skyline2026' || pass === ADMIN_PASSCODE || !pass)) ||
                      (pass === ADMIN_PASSCODE || pass === DEFAULT_ADMIN_PASSCODE || pass === 'skyline2026' || pass === '123456') ||
                      Boolean(adminMatch);
      
      if (!isSuper) {
        sendJSON(res, 401, { success: false, error: 'Mật khẩu quản trị viên không chính xác (Chấp nhận: 123456 hoặc skyline2026)' });
        return;
      }

      await db.resetAll();
      sendJSON(res, 200, { success: true, message: 'Đã reset toàn bộ dữ liệu hệ thống về 0 thành công!' });
      return;
    } catch (err) {
      sendJSON(res, 400, { success: false, error: err.message });
      return;
    }
  }

  // ==========================================
  // API: CHAT VỚI NHÂN VẬT VĂN HỌC (GEMINI AI + SMART KNOWLEDGE ENGINE)
  // ==========================================
  if (pathname === '/api/chat' && req.method === 'POST') {
    try {
      const { message, character, apiKey, history } = await parseRequestBody(req);
      const charKey = (character && characterKnowledge[character]) ? character : 'deman';
      const charData = characterKnowledge[charKey];
      const userKey = apiKey || process.env.GEMINI_API_KEY;

      // 1. Thử gọi Google Gemini API nếu có key
      if (userKey && userKey.trim()) {
        try {
          const aiReply = await callGeminiAPI(userKey.trim(), charKey, message, history);
          sendJSON(res, 200, {
            success: true,
            reply: aiReply,
            character: charData.name,
            mode: 'gemini-ai'
          });
          return;
        } catch (aiErr) {
          console.warn("Gemini API call failed, falling back to smart literature engine:", aiErr.message);
        }
      }

      // 2. Sử dụng Bộ Tri thức Văn học Chuyên sâu (Smart Literature Engine)
      const smartReply = resolveSmartLiteratureResponse(charKey, message);
      if (smartReply) {
        sendJSON(res, 200, {
          success: true,
          reply: smartReply,
          character: charData.name,
          mode: 'smart-engine'
        });
        return;
      }

      // 3. Khớp từ khóa cụ thể trong characterKnowledge
      const lower = (message || '').toLowerCase();
      let found = charData.responses.find(r => r.keys.some(k => lower.includes(k)));
      let reply = found ? found.reply : charData.fallback;

      sendJSON(res, 200, {
        success: true,
        reply: reply,
        character: charData.name,
        mode: 'character-rule'
      });
      return;
    } catch (e) {
      sendJSON(res, 400, { success: false, error: 'Invalid JSON' });
      return;
    }
  }

  // ==========================================
  // STATIC FILE SERVING
  // ==========================================
  let filePath = path.join(__dirname, 'public', pathname === '/' ? 'index.html' : pathname);
  
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const ext = path.extname(pathname);
      if (!ext) {
        const indexPath = path.join(__dirname, 'index.html');
        if (fs.existsSync(indexPath)) {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          fs.createReadStream(indexPath).pipe(res);
          return;
        }
      }
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer(handleRequest);

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`✨ Sky-Line Virtual Library server running at http://localhost:${PORT}`);
    console.log(`🛡️ Admin Passcode configured: ${ADMIN_PASSCODE}`);
  });
}

module.exports = handleRequest;
module.exports.server = server;
