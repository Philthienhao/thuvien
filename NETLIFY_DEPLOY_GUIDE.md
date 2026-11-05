# 🚀 HƯỚNG DẪN PUBLIC THƯ VIỆN ẢO LÊN NETLIFY (KHÔNG CẦN CƠ SỞ DỮ LIỆU NGOÀI)

Dự án hiện đã được tích hợp đầy đủ để lưu trữ và hoạt động 100% trên **Netlify**:
- **Giao diện web tĩnh**: Phục vụ qua mạng lưới CDN toàn cầu của Netlify.
- **Serverless API**: Tự động xử lý qua Netlify Functions (`/.netlify/functions/api`).
- **Lưu trữ dữ liệu vĩnh viễn (Netlify Blobs)**: Dữ liệu học sinh, điểm số, lượt truy cập, bài cảm nhận và đề xuất sách được lưu trữ trực tiếp bên trong hạ tầng của Netlify thông qua `@netlify/blobs`, **hoàn toàn không cần tạo tài khoản Supabase hay bất kỳ database bên ngoài nào!**

---

## 🌟 CÁCH 1: DEPLOY BẰNG GITHUB (KHUYẾN NGHỊ - TỰ ĐỘNG CẬP NHẬT)

1. Đẩy toàn bộ thư mục dự án lên một kho lưu trữ **GitHub** (chế độ Public hoặc Private đều được).
2. Đăng nhập vào [https://app.netlify.com](https://app.netlify.com).
3. Bấm nút **"Add new site"** -> Chọn **"Import an existing project"**.
4. Chọn **GitHub** và cấp quyền chọn Repository của dự án `thuvien`.
5. Tại màn hình cấu hình Deploy:
   - **Publish directory**: để trống hoặc gõ `.` (Netlify sẽ tự động nhận diện file `netlify.toml` đã tạo sẵn).
   - **Functions directory**: `netlify/functions` (đã cấu hình sẵn trong `netlify.toml`).
6. Thêm biến môi trường (Environment Variables) trong phần **Site configuration** -> **Environment variables**:
   - `ADMIN_PASSCODE`: `skyline2026`
   - `GEMINI_API_KEY`: *(Tùy chọn nếu muốn AI Chat thông minh với nhân vật văn học)*
7. Bấm nút **"Deploy skyline-virtual-library"**.
8. Sau 30 - 60 giây, Netlify sẽ cấp cho bạn tên miền trực tuyến miễn phí dạng:  
   👉 **`https://ten-cua-ban.netlify.app`**

---

## ⚡ CÁCH 2: DEPLOY BẰNG NETLIFY CLI (TRỰC TIẾP TỪ TERMINAL)

Nếu bạn muốn deploy trực tiếp từ máy tính:
```bash
cd /Users/mac/Downloads/Antigravity/thuvien
npx netlify deploy --prod
```
Làm theo các bước xác nhận trên terminal, trang web sẽ được public ngay lập tức!

---

## 🔒 DỮ LIỆU ĐƯỢC LƯU TRỮ NHƯ THẾ NÀO TRÊN NETLIFY?
- Khi bạn deploy lên Netlify, tính năng **Netlify Blobs** tự động kích hoạt cho site của bạn.
- Trong lần truy cập đầu tiên, hệ thống sẽ tự động khởi tạo dữ liệu từ các tệp mẫu (`data/users.json`, `data/analytics.json`, v.v.) vào Netlify Blobs.
- Tất cả các thao tác tiếp theo (học sinh đăng nhập, làm bài tích lũy ⭐, gửi đề xuất sách, giáo viên chấm điểm) sẽ được ghi vĩnh viễn vào đám mây của Netlify mà không bao giờ bị mất!
- Mật khẩu Quản trị viên mặc định: `skyline2026` (hoặc Email Admin Tổng `quyenntn@skylineschool.edu.vn` / `123456`).
