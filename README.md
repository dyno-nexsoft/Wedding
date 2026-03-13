# Wedding Invitation Web App

Ứng dụng web mời cưới hiện đại, được xây dựng bằng React, Vite, TailwindCSS và Motion.

## Lưu ý quan trọng về hình ảnh (Hosting trên GitHub Pages)

Khi cấu hình đường dẫn hình ảnh trong `src/config.ts` hoặc khi sử dụng trực tiếp trong các component:

- **KHÔNG** sử dụng dấu gạch chéo `/` ở phía trước tên file ảnh.
- Ví dụ đúng: `bg_1.webp`
- Ví dụ sai: `/bg_1.webp`

Lý do: Khi host trên GitHub Pages (thường là một subpath như `username.github.io/wedding/`), việc sử dụng `/` ở phía trước sẽ làm trình duyệt tìm file ở root domain (`username.github.io/bg_1.webp`) thay vì trong thư mục dự án.

## Công nghệ sử dụng

- **Frontend**: React (Vite)
- **Styling**: TailwindCSS 4.0
- **Animations**: Motion (framer-motion)
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Playfair Display, Great Vibes, Be Vietnam Pro)

## Cấu chuẩn bị hình ảnh

Tất cả hình ảnh nên được đặt trong thư mục `public/`.
Khuyến khích sử dụng định dạng `.webp` để tối ưu hóa dung lượng và tốc độ tải trang.

## Cài đặt và Chạy Layout

1. Clone repo
2. Cài đặt dependencies: `npm install`
3. Chạy dev server: `npm run dev`
4. Build sản phẩm: `npm run build`
