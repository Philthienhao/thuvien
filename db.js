const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const ANALYTICS_FILE = path.join(DATA_DIR, 'analytics.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const VISITORS_FILE = path.join(DATA_DIR, 'visitors.json');
const REQUESTS_FILE = path.join(DATA_DIR, 'book-requests.json');
const REFLECTIONS_FILE = path.join(DATA_DIR, 'reflections.json');
const ADMINS_FILE = path.join(DATA_DIR, 'admins.json');
const TEACHERS_FILE = path.join(DATA_DIR, 'teachers.json');
const NOTIFICATIONS_FILE = path.join(DATA_DIR, 'teacher-notifications.json');

// Ensure data directory exists for local fallback
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Read JSON helper
function readJSON(filePath, defaultVal = []) {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultVal, null, 2), 'utf8');
      return defaultVal;
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`[DB Local] Error reading ${filePath}:`, err.message);
    return defaultVal;
  }
}

// Write JSON helper
function writeJSON(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`[DB Local] Error writing ${filePath}:`, err.message);
    return false;
  }
}

// -----------------------------------------------------------------------------
// NETLIFY BLOBS (LƯU TRỮ VĨNH VIỄN TRÊN NETLIFY KHÔNG CẦN DATABASE NGOÀI)
// -----------------------------------------------------------------------------
let netlifyBlobs = null;
try {
  netlifyBlobs = require('@netlify/blobs');
} catch (e) {
  // @netlify/blobs chưa cài hoặc đang chạy môi trường thuần Node
}

let cachedStore = undefined;

function getNetlifyStore() {
  if (cachedStore !== undefined) return cachedStore;
  if (!netlifyBlobs) {
    try {
      netlifyBlobs = require('@netlify/blobs');
    } catch (e) {
      cachedStore = null;
      return null;
    }
  }
  try {
    const store = netlifyBlobs.getStore('skyline-library-prod');
    cachedStore = store;
    return store;
  } catch (e) {
    console.warn('[DB] Netlify Blobs getStore warning:', e.message);
    cachedStore = null;
    return null;
  }
}

const isNetlify = Boolean(process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT || process.env.AWS_LAMBDA_FUNCTION_NAME);

async function getBlobOrJSON(key, fileFallback, defaultVal) {
  const store = getNetlifyStore();
  if (store) {
    try {
      const data = await store.get(key, { type: 'json' });
      if (data !== null && data !== undefined) return data;
      // Seed ban đầu từ file JSON vào Netlify Blobs lần đầu chạy
      const initial = readJSON(fileFallback, defaultVal);
      await store.setJSON(key, initial);
      return initial;
    } catch (e) {
      console.error(`[DB Netlify Blobs] Error reading ${key}:`, e.message);
    }
  }
  return readJSON(fileFallback, defaultVal);
}

async function setBlobOrJSON(key, fileFallback, data) {
  const store = getNetlifyStore();
  if (store) {
    try {
      await store.setJSON(key, data);
      return true;
    } catch (e) {
      console.error(`[DB Netlify Blobs] Error writing ${key}:`, e.message);
    }
  }
  return writeJSON(fileFallback, data);
}

// -----------------------------------------------------------------------------
// SUPABASE CLIENT / REST HELPER (TÙY CHỌN NẾU CÓ CẤU HÌNH)
// -----------------------------------------------------------------------------
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

if (isNetlify) {
  console.log('☁️ [DB] Running on Netlify (Netlify Blobs storage enabled)');
} else if (isSupabaseConfigured) {
  console.log('⚡ [DB] Connected to Supabase:', SUPABASE_URL);
} else {
  console.log('📁 [DB] Running in Local JSON mode (Data stored in ./data)');
}

// Direct fetch wrapper for Supabase REST API (zero npm dependency requirement)
async function supabaseRest(endpoint, options = {}) {
  const url = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/${endpoint}`;
  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const res = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Supabase REST [${res.status} ${res.statusText}]: ${errText}`);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// -----------------------------------------------------------------------------
// UNIFIED DATABASE API
// -----------------------------------------------------------------------------

const db = {
  isSupabase: isSupabaseConfigured,
  isNetlify,

  // --- ANALYTICS ---
  async getAnalytics() {
    if (isSupabaseConfigured) {
      try {
        const rows = await supabaseRest('analytics?id=eq.global&select=*');
        if (rows && rows.length > 0) return rows[0];
        const defaultAnalytics = { id: 'global', totalVisits: 0, uniqueVisitors: 0, totalUsers: 0, createdDate: '2026-11-04', lastVisitDate: new Date().toISOString() };
        await supabaseRest('analytics', { method: 'POST', body: defaultAnalytics });
        return defaultAnalytics;
      } catch (err) {
        console.error('[DB] getAnalytics Supabase error:', err.message);
      }
    }
    return await getBlobOrJSON('analytics', ANALYTICS_FILE, { totalVisits: 0, uniqueVisitors: 0, totalUsers: 0, createdDate: "2026-11-04" });
  },

  async updateAnalytics(updateFn) {
    const current = await this.getAnalytics();
    const updated = updateFn({ ...current });
    updated.id = 'global';
    updated.lastVisitDate = new Date().toISOString();

    if (isSupabaseConfigured) {
      try {
        await supabaseRest('analytics', {
          method: 'POST',
          headers: { 'Prefer': 'resolution=merge-duplicates,return=representation' },
          body: updated
        });
        return updated;
      } catch (err) {
        console.error('[DB] updateAnalytics Supabase error:', err.message);
      }
    }
    await setBlobOrJSON('analytics', ANALYTICS_FILE, updated);
    return updated;
  },

  // --- VISITORS ---
  async getVisitors() {
    if (isSupabaseConfigured) {
      try {
        const rows = await supabaseRest('visitors?select=*&order=lastVisit.desc&limit=100');
        return rows || [];
      } catch (err) {
        console.error('[DB] getVisitors Supabase error:', err.message);
      }
    }
    return await getBlobOrJSON('visitors', VISITORS_FILE, []);
  },

  async recordVisit({ visitorId, userAgent, studentName, studentClass, avatar, ip }) {
    const now = new Date().toISOString();
    let isNewVisitor = false;

    if (isSupabaseConfigured) {
      try {
        const existing = await supabaseRest(`visitors?visitorId=eq.${encodeURIComponent(visitorId)}&select=*`);
        if (existing && existing.length > 0) {
          const v = existing[0];
          await supabaseRest(`visitors?visitorId=eq.${encodeURIComponent(visitorId)}`, {
            method: 'PATCH',
            body: {
              lastVisit: now,
              visitCount: (v.visitCount || 1) + 1,
              ...(studentName ? { studentName } : {}),
              ...(studentClass ? { studentClass } : {}),
              ...(avatar ? { avatar } : {})
            }
          });
        } else {
          isNewVisitor = true;
          await supabaseRest('visitors', {
            method: 'POST',
            body: {
              visitorId,
              firstVisit: now,
              lastVisit: now,
              visitCount: 1,
              ip: ip || 'unknown',
              userAgent: userAgent || '',
              studentName: studentName || null,
              studentClass: studentClass || null,
              avatar: avatar || null
            }
          });
        }

        await this.updateAnalytics(a => {
          a.totalVisits = (a.totalVisits || 0) + 1;
          if (isNewVisitor) a.uniqueVisitors = (a.uniqueVisitors || 0) + 1;
          return a;
        });
        return { isNewVisitor };
      } catch (err) {
        console.error('[DB] recordVisit Supabase error:', err.message);
      }
    }

    // Netlify Blobs / Local JSON
    const visitors = await this.getVisitors();
    const found = visitors.find(v => v.visitorId === visitorId);
    if (!found) {
      isNewVisitor = true;
      visitors.unshift({
        visitorId,
        firstVisit: now,
        lastVisit: now,
        visitCount: 1,
        ip: ip || 'unknown',
        userAgent: userAgent || '',
        studentName: studentName || null,
        studentClass: studentClass || null,
        avatar: avatar || null
      });
    } else {
      found.lastVisit = now;
      found.visitCount = (found.visitCount || 1) + 1;
      if (studentName) found.studentName = studentName;
      if (studentClass) found.studentClass = studentClass;
      if (avatar) found.avatar = avatar;
    }
    await setBlobOrJSON('visitors', VISITORS_FILE, visitors);

    await this.updateAnalytics(a => {
      a.totalVisits = (a.totalVisits || 0) + 1;
      if (isNewVisitor) a.uniqueVisitors = (a.uniqueVisitors || 0) + 1;
      return a;
    });

    return { isNewVisitor };
  },

  // --- USERS / HỌC SINH ---
  async getUsers() {
    if (isSupabaseConfigured) {
      try {
        const rows = await supabaseRest('users?select=*&order=stars.desc');
        return rows || [];
      } catch (err) {
        console.error('[DB] getUsers Supabase error:', err.message);
      }
    }
    return await getBlobOrJSON('users', USERS_FILE, []);
  },

  async findUser(nickname, campus) {
    if (isSupabaseConfigured) {
      try {
        const cleanNick = (nickname || '').trim().toLowerCase();
        const cleanCamp = (campus || '').trim();
        const rows = await supabaseRest(`users?nickname=ilike.${encodeURIComponent(cleanNick)}&campus=eq.${encodeURIComponent(cleanCamp)}&select=*`);
        if (rows && rows.length > 0) return rows[0];
        return null;
      } catch (err) {
        console.error('[DB] findUser Supabase error:', err.message);
      }
    }
    const users = await this.getUsers();
    return users.find(u => (u.nickname || u.name || '').trim().toLowerCase() === (nickname || '').trim().toLowerCase() && u.campus === campus);
  },

  async saveUser(user) {
    if (isSupabaseConfigured) {
      try {
        await supabaseRest('users', {
          method: 'POST',
          headers: { 'Prefer': 'resolution=merge-duplicates,return=representation' },
          body: user
        });
        return user;
      } catch (err) {
        console.error('[DB] saveUser Supabase error:', err.message);
      }
    }
    const users = await this.getUsers();
    const idx = users.findIndex(u => u.id === user.id || (((u.nickname || u.name || '').trim().toLowerCase() === (user.nickname || user.name || '').trim().toLowerCase()) && u.campus === user.campus));
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...user };
    } else {
      users.push(user);
    }
    await setBlobOrJSON('users', USERS_FILE, users);
    return user;
  },

  async addStars(nickname, campus, count, type = 'star') {
    const user = await this.findUser(nickname, campus);
    if (!user) return null;

    user.stars = (user.stars || 0) + count;
    user.points = user.stars;
    if (type === 'quiz') user.quizStars = (user.quizStars || 0) + count;
    if (type === 'review') user.reviewStars = (user.reviewStars || 0) + count;
    if (type === 'request') user.requestStars = (user.requestStars || 0) + count;
    user.lastActivity = new Date().toISOString();

    await this.saveUser(user);
    return user;
  },

  // --- LEADERBOARD ---
  async getLeaderboard(limit = 10) {
    const users = await this.getUsers();
    return [...users]
      .sort((a, b) => (b.stars || 0) - (a.stars || 0))
      .slice(0, limit)
      .map((u, i) => ({
        rank: i + 1,
        nickname: u.nickname || u.name,
        campus: u.campus || 'Sky-Line',
        avatar: u.avatar || '🪐',
        stars: u.stars || 0,
        badges: u.badges || 0
      }));
  },

  // --- BOOK REQUESTS ---
  async getBookRequests() {
    if (isSupabaseConfigured) {
      try {
        const rows = await supabaseRest('book_requests?select=*&order=timestamp.desc');
        return rows || [];
      } catch (err) {
        console.error('[DB] getBookRequests Supabase error:', err.message);
      }
    }
    return await getBlobOrJSON('book_requests', REQUESTS_FILE, []);
  },

  async addBookRequest(req) {
    if (isSupabaseConfigured) {
      try {
        await supabaseRest('book_requests', { method: 'POST', body: req });
        return req;
      } catch (err) {
        console.error('[DB] addBookRequest Supabase error:', err.message);
      }
    }
    const requests = await this.getBookRequests();
    requests.unshift(req);
    await setBlobOrJSON('book_requests', REQUESTS_FILE, requests);
    return req;
  },

  async updateBookRequestStatus(id, status) {
    if (isSupabaseConfigured) {
      try {
        await supabaseRest(`book_requests?id=eq.${encodeURIComponent(id)}`, {
          method: 'PATCH',
          body: { status }
        });
        return true;
      } catch (err) {
        console.error('[DB] updateBookRequestStatus Supabase error:', err.message);
      }
    }
    const requests = await this.getBookRequests();
    const req = requests.find(r => r.id === id);
    if (req) {
      req.status = status;
      await setBlobOrJSON('book_requests', REQUESTS_FILE, requests);
      return true;
    }
    return false;
  },

  // --- REFLECTIONS / CẢM NHẬN SÁCH ---
  async getReflections() {
    if (isSupabaseConfigured) {
      try {
        const rows = await supabaseRest('reflections?select=*&order=timestamp.desc');
        return rows || [];
      } catch (err) {
        console.error('[DB] getReflections Supabase error:', err.message);
      }
    }
    return await getBlobOrJSON('reflections', REFLECTIONS_FILE, []);
  },

  async addReflection(reflection) {
    if (isSupabaseConfigured) {
      try {
        await supabaseRest('reflections', { method: 'POST', body: reflection });
        return reflection;
      } catch (err) {
        console.error('[DB] addReflection Supabase error:', err.message);
      }
    }
    const reflections = await this.getReflections();
    reflections.unshift(reflection);
    await setBlobOrJSON('reflections', REFLECTIONS_FILE, reflections);
    return reflection;
  },

  async gradeReflection(id, { starsAwarded, adminFeedback, gradedBy }) {
    const patch = {
      status: 'Đã chấm điểm',
      starsAwarded,
      adminFeedback,
      gradedBy,
      gradedAt: new Date().toISOString()
    };

    if (isSupabaseConfigured) {
      try {
        await supabaseRest(`reflections?id=eq.${encodeURIComponent(id)}`, {
          method: 'PATCH',
          body: patch
        });
      } catch (err) {
        console.error('[DB] gradeReflection Supabase error:', err.message);
      }
    } else {
      const reflections = await this.getReflections();
      const item = reflections.find(r => r.id === id);
      if (item) {
        Object.assign(item, patch);
        await setBlobOrJSON('reflections', REFLECTIONS_FILE, reflections);
      }
    }

    const reflections = await this.getReflections();
    const target = reflections.find(r => r.id === id);
    if (target && target.studentName && target.campus) {
      await this.addStars(target.studentName, target.campus, starsAwarded, 'review');
    }
    return true;
  },

  // --- ADMINS ---
  async getAdmins() {
    const defaultSuperAdmin = [
      {
        id: "admin_super_1",
        email: "quyenntn@skylineschool.edu.vn",
        name: "Admin Tổng (Cô Quyên)",
        role: "super_admin",
        password: "123456",
        campus: "Tất cả cơ sở",
        createdAt: "2026-11-04T00:00:00.000Z",
        status: "active"
      }
    ];

    if (isSupabaseConfigured) {
      try {
        const rows = await supabaseRest('admins?select=*');
        if (rows && rows.length > 0) return rows;
        return defaultSuperAdmin;
      } catch (err) {
        console.error('[DB] getAdmins Supabase error:', err.message);
      }
    }
    return await getBlobOrJSON('admins', ADMINS_FILE, defaultSuperAdmin);
  },

  async saveAdmin(admin) {
    if (isSupabaseConfigured) {
      try {
        await supabaseRest('admins', {
          method: 'POST',
          headers: { 'Prefer': 'resolution=merge-duplicates,return=representation' },
          body: admin
        });
        return admin;
      } catch (err) {
        console.error('[DB] saveAdmin Supabase error:', err.message);
      }
    }
    const admins = await this.getAdmins();
    const idx = admins.findIndex(a => a.id === admin.id || a.email.toLowerCase() === admin.email.toLowerCase());
    if (idx !== -1) admins[idx] = { ...admins[idx], ...admin };
    else admins.push(admin);
    await setBlobOrJSON('admins', ADMINS_FILE, admins);
    return admin;
  },

  async removeAdmin(id) {
    if (isSupabaseConfigured) {
      try {
        await supabaseRest(`admins?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE' });
        return true;
      } catch (err) {
        console.error('[DB] removeAdmin Supabase error:', err.message);
      }
    }
    let admins = await this.getAdmins();
    admins = admins.filter(a => a.id !== id);
    await setBlobOrJSON('admins', ADMINS_FILE, admins);
    return true;
  },

  // --- TEACHERS ---
  async getTeachers() {
    if (isSupabaseConfigured) {
      try {
        const rows = await supabaseRest('teachers?select=*&order=name.asc');
        return rows || [];
      } catch (err) {
        console.error('[DB] getTeachers Supabase error:', err.message);
      }
    }
    return await getBlobOrJSON('teachers', TEACHERS_FILE, []);
  },

  async saveTeacher(teacher) {
    if (isSupabaseConfigured) {
      try {
        await supabaseRest('teachers', {
          method: 'POST',
          headers: { 'Prefer': 'resolution=merge-duplicates,return=representation' },
          body: teacher
        });
        return teacher;
      } catch (err) {
        console.error('[DB] saveTeacher Supabase error:', err.message);
      }
    }
    const teachers = await this.getTeachers();
    const idx = teachers.findIndex(t => t.id === teacher.id || (t.email && t.email.toLowerCase() === teacher.email.toLowerCase()));
    if (idx !== -1) teachers[idx] = { ...teachers[idx], ...teacher };
    else teachers.push(teacher);
    await setBlobOrJSON('teachers', TEACHERS_FILE, teachers);
    return teacher;
  },

  async removeTeacher(id) {
    if (isSupabaseConfigured) {
      try {
        await supabaseRest(`teachers?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE' });
        return true;
      } catch (err) {
        console.error('[DB] removeTeacher Supabase error:', err.message);
      }
    }
    let teachers = await this.getTeachers();
    teachers = teachers.filter(t => t.id !== id);
    await setBlobOrJSON('teachers', TEACHERS_FILE, teachers);
    return true;
  },

  // --- NOTIFICATIONS ---
  async getTeacherNotifications() {
    if (isSupabaseConfigured) {
      try {
        const rows = await supabaseRest('teacher_notifications?select=*&order=timestamp.desc&limit=50');
        return rows || [];
      } catch (err) {
        console.error('[DB] getTeacherNotifications Supabase error:', err.message);
      }
    }
    return await getBlobOrJSON('teacher_notifications', NOTIFICATIONS_FILE, []);
  },

  async addTeacherNotification(notif) {
    if (isSupabaseConfigured) {
      try {
        await supabaseRest('teacher_notifications', { method: 'POST', body: notif });
        return notif;
      } catch (err) {
        console.error('[DB] addTeacherNotification Supabase error:', err.message);
      }
    }
    const notifs = await this.getTeacherNotifications();
    notifs.unshift(notif);
    await setBlobOrJSON('teacher_notifications', NOTIFICATIONS_FILE, notifs);
    return notif;
  },

  async clearTeacherNotifications() {
    if (isSupabaseConfigured) {
      try {
        await supabaseRest('teacher_notifications?id=neq.none', { method: 'DELETE' });
        return true;
      } catch (err) {
        console.error('[DB] clearTeacherNotifications Supabase error:', err.message);
      }
    }
    await setBlobOrJSON('teacher_notifications', NOTIFICATIONS_FILE, []);
    return true;
  },

  // --- RESET ALL DATA ---
  async resetAll() {
    if (isSupabaseConfigured) {
      try {
        await supabaseRest('analytics', {
          method: 'POST',
          headers: { 'Prefer': 'resolution=merge-duplicates' },
          body: { id: 'global', totalVisits: 0, uniqueVisitors: 0, totalUsers: 0, createdDate: new Date().toISOString() }
        });
        await supabaseRest('users?id=neq.none', { method: 'DELETE' });
        await supabaseRest('visitors?visitorId=neq.none', { method: 'DELETE' });
        await supabaseRest('reflections?id=neq.none', { method: 'DELETE' });
        await supabaseRest('book_requests?id=neq.none', { method: 'DELETE' });
        await supabaseRest('teacher_notifications?id=neq.none', { method: 'DELETE' });
        return true;
      } catch (err) {
        console.error('[DB] resetAll Supabase error:', err.message);
      }
    }

    await setBlobOrJSON('analytics', ANALYTICS_FILE, { totalVisits: 0, uniqueVisitors: 0, totalUsers: 0, createdDate: new Date().toISOString() });
    await setBlobOrJSON('users', USERS_FILE, []);
    await setBlobOrJSON('visitors', VISITORS_FILE, []);
    await setBlobOrJSON('reflections', REFLECTIONS_FILE, []);
    await setBlobOrJSON('book_requests', REQUESTS_FILE, []);
    await setBlobOrJSON('teacher_notifications', NOTIFICATIONS_FILE, []);
    return true;
  }
};

module.exports = db;
