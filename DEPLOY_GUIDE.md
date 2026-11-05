# 🚀 HƯỚNG DẪN PUBLIC THƯ VIỆN ẢO LÊN VERCEL & SUPABASE

Tài liệu này hướng dẫn bạn từng bước đưa dự án **Trợ lý Thư viện ảo Sky-Line** lên Internet hoàn toàn miễn phí với cơ sở dữ liệu vĩnh viễn trên **Supabase** và máy chủ Serverless trên **Vercel**.

---

## 📑 BƯỚC 1: TẠO BẢNG DỮ LIỆU TRÊN SUPABASE (2 PHÚT)

1. Đăng nhập vào [https://supabase.com](https://supabase.com) và chọn/tạo một **New Project** (ví dụ: `skyline-thuvien`).
2. Ở thanh menu bên trái, chọn **SQL Editor** (biểu tượng `>_`).
3. Mở file [supabase_schema.sql](file:///Users/mac/Downloads/Antigravity/thuvien/supabase_schema.sql) trong thư mục dự án này, copy toàn bộ nội dung.
4. Dán vào khung SQL Editor của Supabase và bấm **RUN** (chạy).
   > 🎉 *Toàn bộ 8 bảng (`analytics`, `users`, `visitors`, `book_requests`, `reflections`, `admins`, `teachers`, `teacher_notifications`), chính sách bảo mật RLS và dữ liệu khởi tạo đã được tạo thành công!*

---

## 🔑 BƯỚC 2: LẤY THÔNG TIN KẾT NỐI SUPABASE

1. Tại Dashboard dự án Supabase, vào **Project Settings** (biểu tượng bánh răng ⚙️ ở dưới cùng menu trái).
2. Chọn mục **API** (hoặc Data API):
   - **Project URL**: dạng `https://xxxxxxxxxxxxxxxxxxxx.supabase.co`
   - **anon public key**: bắt đầu bằng `eyJhbGciOi...`
   - **service_role secret key**: (Khuyến nghị bấm *Reveal* để copy khóa này cho Vercel backend để thao tác không bị chặn)

---

## 🌐 BƯỚC 3: PUBLIC DỰ ÁN LÊN VERCEL (3 PHÚT)

### Cách 1: Đẩy qua GitHub (Khuyên dùng - tự động cập nhật khi đổi code)
1. Đẩy thư mục này lên một repository GitHub (Private hoặc Public).
2. Vào [https://vercel.com](https://vercel.com) -> Bấm **Add New...** -> **Project**.
3. Chọn Repository vừa tạo và bấm **Import**.
4. Mở phần **Environment Variables** (Biến môi trường) và thêm các giá trị:
   - `SUPABASE_URL` = `<URL Supabase ở Bước 2>`
   - `SUPABASE_ANON_KEY` = `<Anon Key ở Bước 2>`
   - `SUPABASE_SERVICE_ROLE_KEY` = `<Service Role Key ở Bước 2>`
   - `ADMIN_PASSCODE` = `skyline2026`
   - `GEMINI_API_KEY` = *(Tùy chọn nếu muốn AI Chat thông minh hơn bằng key Google AI Studio)*
5. Bấm **Deploy**. Sau khoảng 30 - 60 giây, Vercel sẽ cung cấp tên miền dạng `https://ten-du-an.vercel.app`!

---

### Cách 2: Deploy trực tiếp bằng lệnh Vercel CLI (Từ máy tính)
Nếu bạn đã cài Vercel CLI:
```bash
cd /Users/mac/Downloads/Antigravity/thuvien
npx vercel
```
Làm theo hướng dẫn trên màn hình, sau đó vào Dashboard của Vercel thêm các Environment Variables như Bước 3 ở trên và Redeploy.

---

## ✅ KIỂM TRA SAU KHI DEPLOY
- Truy cập domain Vercel cấp.
- Đăng nhập thử với một Nickname học sinh bất kỳ.
- Mở bảng Supabase -> Table Editor -> `users`, bạn sẽ thấy tên học sinh xuất hiện ngay lập tức trong cơ sở dữ liệu đám mây.
- Đăng nhập Quản trị viên bằng nút **🛡️ Quản trị** (mật khẩu: `skyline2026` hoặc email `quyenntn@skylineschool.edu.vn` / `123456`).
