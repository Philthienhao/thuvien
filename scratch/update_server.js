const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

// 1. /api/reflections
const oldReflections = code.match(/if \(pathname === '\/api\/reflections'\) \{[\s\S]*?return;\s*\}\s*\}\s*\}/);
if (oldReflections) {
  const newReflections = `if (pathname === '/api/reflections') {
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
  }`;
  code = code.replace(oldReflections[0], newReflections);
  console.log('Updated /api/reflections');
}

// 2. /api/admin/grade-reflection
const oldGrade = code.match(/if \(pathname === '\/api\/admin\/grade-reflection' && req\.method === 'POST'\) \{[\s\S]*?return;\s*\}\s*\}/);
if (oldGrade) {
  const newGrade = `if (pathname === '/api/admin/grade-reflection' && req.method === 'POST') {
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
  }`;
  code = code.replace(oldGrade[0], newGrade);
  console.log('Updated /api/admin/grade-reflection');
}

// 3. /api/book-requests
const oldRequests = code.match(/if \(pathname === '\/api\/book-requests'\) \{[\s\S]*?return;\s*\}\s*\}\s*\}/);
if (oldRequests) {
  const newRequests = `if (pathname === '/api/book-requests') {
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
  }`;
  code = code.replace(oldRequests[0], newRequests);
  console.log('Updated /api/book-requests');
}

// 4. /api/admin/book-request/status
const oldReqStatus = code.match(/if \(pathname === '\/api\/admin\/book-request\/status' && req\.method === 'POST'\) \{[\s\S]*?return;\s*\}\s*\}/);
if (oldReqStatus) {
  const newReqStatus = `if (pathname === '/api/admin/book-request/status' && req.method === 'POST') {
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
  }`;
  code = code.replace(oldReqStatus[0], newReqStatus);
  console.log('Updated /api/admin/book-request/status');
}

// 5. /api/admin/stats
const oldStats = code.match(/if \(pathname === '\/api\/admin\/stats' && req\.method === 'GET'\) \{[\s\S]*?return;\s*\}/);
if (oldStats) {
  const newStats = `if (pathname === '/api/admin/stats' && req.method === 'GET') {
    const auth = await verifyAdminAuth(req, parsedUrl);
    if (!auth.authorized) {
      sendJSON(res, 401, { success: false, error: 'Yêu cầu quyền Quản trị viên' });
      return;
    }
    const analytics = await db.getAnalytics();
    const users = await db.getUsers();
    const reflections = await db.getReflections();
    const requests = await db.getBookRequests();
    const visitors = await db.getVisitors();
    const teachers = await db.getTeachers();
    const teacherNotifications = await db.getTeacherNotifications();

    sendJSON(res, 200, {
      success: true,
      stats: {
        totalVisits: analytics.totalVisits || visitors.length,
        uniqueVisitors: analytics.uniqueVisitors || visitors.length,
        totalUsers: users.length,
        totalReflections: reflections.length,
        totalRequests: requests.length,
        totalTeachers: teachers.length,
        createdDate: analytics.createdDate,
        lastVisitDate: analytics.lastVisitDate
      },
      users,
      visitors: visitors.slice(0, 100),
      reflections,
      requests,
      teachers,
      teacherNotifications
    });
    return;
  }`;
  code = code.replace(oldStats[0], newStats);
  console.log('Updated /api/admin/stats');
}

// 6. /api/admin/teachers
const oldTeachers = code.match(/if \(pathname === '\/api\/admin\/teachers' && req\.method === 'GET'\) \{[\s\S]*?return;\s*\}/);
if (oldTeachers) {
  const newTeachers = `if (pathname === '/api/admin/teachers' && req.method === 'GET') {
    const auth = await verifyAdminAuth(req, parsedUrl);
    if (!auth.authorized) {
      sendJSON(res, 401, { success: false, error: 'Yêu cầu quyền Quản trị viên' });
      return;
    }
    const teachers = await db.getTeachers();
    const notifs = await db.getTeacherNotifications();
    sendJSON(res, 200, { success: true, teachers, notifications: notifs });
    return;
  }`;
  code = code.replace(oldTeachers[0], newTeachers);
  console.log('Updated /api/admin/teachers');
}

// 7. /api/admin/clear-notifications
const oldClearNotif = code.match(/if \(pathname === '\/api\/admin\/clear-notifications' && req\.method === 'POST'\) \{[\s\S]*?return;\s*\}/);
if (oldClearNotif) {
  const newClearNotif = `if (pathname === '/api/admin/clear-notifications' && req.method === 'POST') {
    const auth = await verifyAdminAuth(req, parsedUrl);
    if (!auth.authorized) {
      sendJSON(res, 401, { success: false, error: 'Yêu cầu quyền Quản trị viên' });
      return;
    }
    await db.clearTeacherNotifications();
    sendJSON(res, 200, { success: true, message: 'Đã xóa tất cả thông báo' });
    return;
  }`;
  code = code.replace(oldClearNotif[0], newClearNotif);
  console.log('Updated /api/admin/clear-notifications');
}

fs.writeFileSync('server.js', code, 'utf8');
console.log('All remaining endpoints updated successfully!');
