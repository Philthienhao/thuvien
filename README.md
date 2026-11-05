# 📚 Trợ lý Thư viện ảo Sky-Line (Sky-Line Virtual Library)

Website tương tác thư viện ảo cho học sinh Sky-Line với đầy đủ tính năng:
- **📊 Hệ thống lưu trữ vĩnh viễn lượt truy cập & học sinh**:
  - Tự động ghi nhận số lượng người truy cập duy nhất (Unique Visitors) và tổng lượt xem (Total Visits) vào `data/analytics.json` và `data/visitors.json`.
  - Khi học sinh đăng nhập, hệ thống tự động lưu vĩnh viễn họ tên, lớp, avatar, điểm số, số lần truy cập vào `data/users.json`.
  - Dữ liệu luôn an toàn, không bị mất kể cả khi khởi động lại máy chủ hoặc trình duyệt.
- **🛡️ Bảng điều khiển Quản Trị Viên (Admin Dashboard)**:
  - Bấm nút **"🛡️ Quản trị"** ở thanh tiêu đề (hoặc dưới chân trang).
  - Mật khẩu quản trị mặc định: `skyline2026`
  - Xem báo cáo trực quan 4 thẻ KPI: Tổng người truy cập duy nhất, Tổng lượt xem, Số học sinh đã đăng nhập, Tổng đề xuất & cảm nhận.
  - Bảng danh sách chi tiết toàn bộ học sinh kèm tìm kiếm thời gian thực theo tên, lớp.
  - Hỗ trợ xuất dữ liệu ra file Excel / CSV (UTF-8) chỉ với 1 click.
  - Nút khẩn cấp: Reset toàn bộ dữ liệu về 0 (yêu cầu mật khẩu).
- **💬 Chat Roleplay với nhân vật văn học**: Dế Mèn, Chị Tấm, Cáo (tích hợp hệ thống phản hồi thông minh, typing indicator, quick prompt gợi ý câu hỏi).
- **🎯 Thử thách hiểu sách (Quiz Game)**: Đầy đủ 3 bộ câu hỏi trắc nghiệm tương tác cho *Dế Mèn phiêu lưu ký*, *Tấm Cám*, *Hoàng tử bé* với giải thích chi tiết, thanh tiến trình, cộng điểm, thưởng huy hiệu và hiệu ứng pháo hoa (Confetti celebration).
- **🏆 Bảng vàng độc giả (Leaderboard)**: Hiển thị bảng vàng độc giả thực tế dựa trên điểm tích lũy của các học sinh đã tham gia.
- **✍️ Góc cảm nhận sách**: Viết nhận xét, chia sẻ cảm xúc sau khi đọc sách, hiển thị feed đánh giá của cộng đồng độc giả.
- **🌟 Nhiệm vụ thư viện tuần này**: Hệ thống quest tương tác tự động ghi nhận khi làm bài, hỏi nhân vật, đọc sách hoặc chia sẻ với bạn bè.
- **📬 Góc đề xuất sách mới**: Gửi gợi ý sách mới với phân loại khối lớp, thể loại, lý do đề xuất, lưu trữ và cập nhật danh sách đề xuất.
- **👤 Hồ sơ độc giả cá nhân**: Đăng nhập, đổi tên, lớp và tùy chọn Avatar linh vật (🪐, 🌻, 🚀, 🌈, 🦁, 🦊, 👑, 🦗, 🦉, v.v.).
- **🌙 Chế độ Sáng / Tối (Dark & Light Mode)** cùng **🔊 Bật/Tắt hiệu ứng âm thanh** (sử dụng Web Audio API tổng hợp âm thanh không cần tải file ngoài).

---

## 🚀 Hướng dẫn khởi chạy

### Khởi chạy Server Node.js (Khuyến nghị để lưu trữ vĩnh viễn):
```bash
cd /Users/mac/Downloads/Antigravity/thuvien
node server.js
```
Truy cập trình duyệt tại: **http://localhost:3000**

- Server Node.js thuần không cần cài đặt thêm `node_modules`.
- Cổng mặc định: `3000`
- Mật khẩu Quản trị viên mặc định: `skyline2026`
