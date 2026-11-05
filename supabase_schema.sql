-- ==============================================================================
-- 📚 SKY-LINE VIRTUAL LIBRARY (THƯ VIỆN ẢO SKY-LINE) - SUPABASE DATABASE SCHEMA
-- Hướng dẫn: Mở Supabase -> Chọn Project -> SQL Editor -> Dán toàn bộ nội dung này và nhấn Run
-- ==============================================================================

-- 1. BẢNG THỐNG KÊ TOÀN HỆ THỐNG (analytics)
CREATE TABLE IF NOT EXISTS analytics (
  id TEXT PRIMARY KEY DEFAULT 'global',
  "totalVisits" INTEGER DEFAULT 0,
  "uniqueVisitors" INTEGER DEFAULT 0,
  "totalUsers" INTEGER DEFAULT 0,
  "createdDate" TEXT,
  "lastVisitDate" TEXT
);

-- 2. BẢNG HỌC SINH / ĐỘC GIẢ (users)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  "visitorId" TEXT,
  name TEXT,
  nickname TEXT,
  campus TEXT,
  "studentClass" TEXT,
  avatar TEXT DEFAULT '🪐',
  stars INTEGER DEFAULT 0,
  points INTEGER DEFAULT 0,
  "quizStars" INTEGER DEFAULT 0,
  "reviewStars" INTEGER DEFAULT 0,
  "requestStars" INTEGER DEFAULT 0,
  badges INTEGER DEFAULT 0,
  challenges INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 1,
  "firstLogin" TEXT,
  "lastLogin" TEXT,
  "visitCount" INTEGER DEFAULT 1,
  "lastActivity" TEXT
);

CREATE INDEX IF NOT EXISTS idx_users_nickname_campus ON users (nickname, campus);
CREATE INDEX IF NOT EXISTS idx_users_stars ON users (stars DESC);

-- 3. BẢNG KHÁCH TRUY CẬP (visitors)
CREATE TABLE IF NOT EXISTS visitors (
  "visitorId" TEXT PRIMARY KEY,
  "firstVisit" TEXT,
  "lastVisit" TEXT,
  "visitCount" INTEGER DEFAULT 1,
  ip TEXT,
  "userAgent" TEXT,
  "studentName" TEXT,
  "studentClass" TEXT,
  avatar TEXT
);

-- 4. BẢNG ĐỀ XUẤT SÁCH (book_requests)
CREATE TABLE IF NOT EXISTS book_requests (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT,
  grade TEXT,
  genre TEXT,
  reason TEXT,
  student TEXT,
  "studentName" TEXT,
  campus TEXT,
  "studentClass" TEXT,
  date TEXT,
  timestamp TEXT,
  status TEXT DEFAULT 'Chờ duyệt'
);

CREATE INDEX IF NOT EXISTS idx_book_requests_timestamp ON book_requests (timestamp DESC);

-- 5. BẢNG CẢM NHẬN SÁCH & BÀI VIẾT (reflections)
CREATE TABLE IF NOT EXISTS reflections (
  id TEXT PRIMARY KEY,
  "studentId" TEXT,
  student TEXT,
  "studentName" TEXT,
  campus TEXT,
  avatar TEXT,
  text TEXT,
  "wordCount" INTEGER DEFAULT 0,
  badge TEXT,
  status TEXT DEFAULT 'Chờ duyệt',
  "starsAwarded" INTEGER DEFAULT 0,
  "adminFeedback" TEXT,
  "gradedBy" TEXT,
  "gradedAt" TEXT,
  date TEXT,
  timestamp TEXT
);

CREATE INDEX IF NOT EXISTS idx_reflections_timestamp ON reflections (timestamp DESC);

-- 6. BẢNG QUẢN TRỊ VIÊN (admins)
CREATE TABLE IF NOT EXISTS admins (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  password TEXT NOT NULL,
  campus TEXT DEFAULT 'Tất cả cơ sở',
  "createdAt" TEXT,
  status TEXT DEFAULT 'active'
);

-- 7. BẢNG GIÁO VIÊN ĐỒNG QUẢN TRỊ (teachers)
CREATE TABLE IF NOT EXISTS teachers (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  campus TEXT,
  password TEXT DEFAULT '123456',
  role TEXT DEFAULT 'sub_admin',
  "isSubAdmin" BOOLEAN DEFAULT true,
  "firstLogin" TEXT,
  "lastLogin" TEXT,
  "visitCount" INTEGER DEFAULT 1,
  status TEXT DEFAULT 'active',
  "assignedCampus" TEXT
);

-- 8. BẢNG THÔNG BÁO GIÁO VIÊN (teacher_notifications)
CREATE TABLE IF NOT EXISTS teacher_notifications (
  id TEXT PRIMARY KEY,
  type TEXT,
  "teacherEmail" TEXT,
  "teacherName" TEXT,
  campus TEXT,
  timestamp TEXT,
  "timeStr" TEXT,
  message TEXT,
  "isRead" BOOLEAN DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_teacher_notif_timestamp ON teacher_notifications (timestamp DESC);

-- ==============================================================================
-- CẤU HÌNH ROW LEVEL SECURITY (RLS) & QUYỀN TRUY CẬP
-- Cho phép Vercel Serverless Function (và Frontend) tương tác an toàn
-- ==============================================================================
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE reflections ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_notifications ENABLE ROW LEVEL SECURITY;

-- Tạo chính sách (Policies) cho phép đọc và ghi đầy đủ qua API Key
DROP POLICY IF EXISTS "Public access for analytics" ON analytics;
CREATE POLICY "Public access for analytics" ON analytics FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access for users" ON users;
CREATE POLICY "Public access for users" ON users FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access for visitors" ON visitors;
CREATE POLICY "Public access for visitors" ON visitors FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access for book_requests" ON book_requests;
CREATE POLICY "Public access for book_requests" ON book_requests FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access for reflections" ON reflections;
CREATE POLICY "Public access for reflections" ON reflections FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access for admins" ON admins;
CREATE POLICY "Public access for admins" ON admins FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access for teachers" ON teachers;
CREATE POLICY "Public access for teachers" ON teachers FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access for teacher_notifications" ON teacher_notifications;
CREATE POLICY "Public access for teacher_notifications" ON teacher_notifications FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- DỮ LIỆU KHỞI TẠO (SEED DATA)
-- ==============================================================================

-- 1. Khởi tạo Thống kê ban đầu
INSERT INTO analytics (id, "totalVisits", "uniqueVisitors", "totalUsers", "createdDate", "lastVisitDate")
VALUES ('global', 30, 3, 4, '2026-11-04', NOW()::text)
ON CONFLICT (id) DO NOTHING;

-- 2. Khởi tạo Tài khoản Super Admin mặc định
INSERT INTO admins (id, email, name, role, password, campus, "createdAt", status)
VALUES (
  'admin_super_1',
  'quyenntn@skylineschool.edu.vn',
  'Admin Tổng (Cô Quyên)',
  'super_admin',
  '123456',
  'Tất cả cơ sở',
  '2026-11-04T00:00:00.000Z',
  'active'
)
ON CONFLICT (email) DO NOTHING;

-- 3. Khởi tạo Giáo viên mẫu (Thầy Nam - Môn Toán)
INSERT INTO teachers (id, email, name, campus, password, role, "isSubAdmin", "firstLogin", "lastLogin", "visitCount", status, "assignedCampus")
VALUES (
  'teacher_1793763592642',
  'thaynam.toan@gmail.com',
  'Thầy Nam (Môn Toán)',
  'Cơ sở 3',
  '123456',
  'sub_admin',
  true,
  '2026-11-04T03:39:52.601Z',
  '2026-11-04T03:39:52.601Z',
  1,
  'active',
  'Cơ sở 3'
)
ON CONFLICT (id) DO NOTHING;

-- 4. Khởi tạo Đề xuất sách mẫu
INSERT INTO book_requests (id, title, author, grade, genre, reason, student, "studentName", campus, "studentClass", date, timestamp, status)
VALUES (
  '1793764831407',
  'Harry Potter và Hòn Đá Phù Thủy',
  'J.K. Rowling',
  'THCS',
  'Kỳ ảo',
  'Thư viện nên bổ sung thêm bộ truyện này để các bạn say mê đọc sách tiếng Anh và tiếng Việt',
  'Thần Đồng Đọc Sách 1373 (Cơ sở 3)',
  'Thần Đồng Đọc Sách 1373',
  'Cơ sở 3',
  'Cơ sở 3',
  '4/11/2026',
  '2026-11-04T04:00:31.407Z',
  'Chờ duyệt'
)
ON CONFLICT (id) DO NOTHING;

-- 5. Khởi tạo Cảm nhận sách mẫu
INSERT INTO reflections (id, "studentId", student, "studentName", campus, avatar, text, "wordCount", badge, status, "starsAwarded", "adminFeedback", "gradedBy", "gradedAt", date, timestamp)
VALUES (
  'ref_1793764831390',
  'u_1793764831385_uixdi',
  'Thần Đồng Đọc Sách 1373 (Cơ sở 3)',
  'Thần Đồng Đọc Sách 1373',
  'Cơ sở 3',
  '🦊',
  'Cuốn sách Dế Mèn Phiêu Lưu Ký của nhà văn Tô Hoài là một tác phẩm văn học vô cùng sâu sắc và tràn đầy bài học cuộc sống dành cho thiếu nhi. Tác phẩm đã giúp em nhận ra rằng tính kiêu ngạo, xốc nổi và hống hách chỉ dẫn đến những hậu quả đáng tiếc như cái chết thương tâm của Dế Choắt. Qua từng chặng đường phiêu lưu đầy thử thách của Dế Mèn, em học được tinh thần trượng nghĩa, luôn giúp đỡ kẻ yếu như chị Nhà Trò, và khát vọng hòa bình, tình hữu ái kết nối muôn loài. Đây thực sự là tác phẩm em vô cùng trân quý trong thư viện Sky-Line.',
  120,
  '✨ Cảm nhận sách',
  'Đã chấm điểm',
  5,
  'Bài viết rất cảm xúc, phân tích sâu sắc bài học nhân văn của tác phẩm. Xứng đáng 5 sao!',
  'quyenntn@skylineschool.edu.vn',
  '2026-11-04T04:00:31.405Z',
  '4/11/2026',
  '2026-11-04T04:00:31.402Z'
)
ON CONFLICT (id) DO NOTHING;
