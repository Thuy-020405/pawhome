-- ============================================================
-- PAWHOME DATABASE - PostgreSQL Schema & Seed Data
-- ============================================================
-- Mô tả: File khởi tạo toàn bộ cơ sở dữ liệu cho nền tảng
--        đặt lịch dịch vụ chăm sóc thú cưng PawHome.
-- Engine: PostgreSQL (sử dụng SERIAL, TEXT[], ARRAY)
-- ============================================================

BEGIN;

-- ============================================================
-- DỌN DẸP (Tuỳ chọn) - Bỏ comment nếu muốn chạy lại từ đầu
-- ============================================================
-- DROP TABLE IF EXISTS bookings CASCADE;
-- DROP TABLE IF EXISTS articles CASCADE;
-- DROP TABLE IF EXISTS experts CASCADE;
-- DROP TABLE IF EXISTS services CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;

-- ============================================================
-- 1. BẢNG NGƯỜI DÙNG (Users)
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    phone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'client', -- 'client' hoặc 'admin'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 2. BẢNG DỊCH VỤ (Services)
-- ============================================================
-- Lưu ý: Các cột JSONB dưới đây phục vụ cho trang chi tiết dịch vụ
-- (giống cấu trúc trang "Dịch Vụ Cắt Tỉa & Spa Nghệ Thuật"):
--   tagline          -> nhãn nhỏ phía trên tiêu đề (ví dụ: "DỊCH VỤ TIÊU ĐIỂM PAWHOME")
--   subtitle         -> dòng tiêu đề phụ màu cam trong Hero (ví dụ: "& Spa Nghệ Thuật")
--   hero_description -> đoạn mô tả ngắn trong Hero
--   cta_primary      -> { "label": "...", "action": "..." } nút CTA chính
--   cta_secondary    -> { "label": "...", "action": "..." } nút CTA phụ
--   highlights       -> mảng 3 điểm nổi bật: [{ "icon", "title", "description" }, ...]
--   process_steps    -> mảng các bước quy trình: [{ "step", "title", "description" }, ...]
--   process_note     -> ghi chú nhỏ (gói tip / cam kết) hiển thị dưới quy trình
--   pricing          -> bảng giá theo cân nặng: { "Bé nhỏ (Dưới 5kg)": [{...}], "Bé vừa (5-12kg)": [...], "Bé lớn (Trên 12kg)": [...] }
CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(50) PRIMARY KEY, -- Ví dụ: 'ser1', 'ser2'
    name VARCHAR(100) NOT NULL,
    description TEXT,
    base_price INT NOT NULL, -- Giá cơ bản (đơn vị: VNĐ)
    image VARCHAR(512),
    tagline VARCHAR(100) DEFAULT 'DỊCH VỤ TIÊU ĐIỂM PAWHOME',
    subtitle VARCHAR(255),
    hero_description TEXT,
    rating NUMERIC(3, 2) DEFAULT 5.0,
    reviews_count INT DEFAULT 0,
    cta_primary JSONB,
    cta_secondary JSONB,
    highlights JSONB,
    process_steps JSONB,
    process_note TEXT,
    pricing JSONB
);

-- ============================================================
-- 3. BẢNG CHUYÊN GIA (Experts)
-- ============================================================
CREATE TABLE IF NOT EXISTS experts (
    id VARCHAR(50) PRIMARY KEY, -- Ví dụ: 'exp1', 'exp2'
    name VARCHAR(100) NOT NULL,
    title VARCHAR(150),
    rating NUMERIC(3, 2) DEFAULT 5.0,
    reviews_count INT DEFAULT 0,
    image VARCHAR(512),
    tags TEXT[] -- Danh sách chuyên môn (ví dụ: ARRAY['Tâm lý học', 'Chó'])
);

-- ============================================================
-- 4. BẢNG ĐẶT LỊCH HẸN (Bookings)
-- ============================================================
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE SET NULL, -- Liên kết với người dùng (nếu có đăng nhập)
    pet_type VARCHAR(50) NOT NULL, -- 'Chó', 'Mèo', 'Thỏ', 'Khác'
    pet_name VARCHAR(100) NOT NULL,
    service_id VARCHAR(50) REFERENCES services(id),
    expert_id VARCHAR(50) REFERENCES experts(id),
    booking_date DATE NOT NULL,
    time_slot VARCHAR(10) NOT NULL, -- Ví dụ: '09:30'
    price INT NOT NULL, -- Giá thực tế tại thời điểm đặt
    status VARCHAR(20) DEFAULT 'upcoming', -- 'upcoming', 'completed', 'cancelled'
    notes TEXT,
    contact_phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 5. BẢNG TIN TỨC & CẨM NANG (Articles)
-- ============================================================
CREATE TABLE IF NOT EXISTS articles (
    id VARCHAR(100) PRIMARY KEY, -- Ví dụ: 'british-shorthair-care'
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    content TEXT,
    image VARCHAR(512),
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- TỐI ƯU HÓA HIỆU NĂNG BẰNG CÁC CHỈ MỤC (Indexes)
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_service_id ON bookings(service_id);
CREATE INDEX IF NOT EXISTS idx_bookings_expert_id ON bookings(expert_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at);
CREATE INDEX IF NOT EXISTS idx_services_pricing ON services USING GIN (pricing);

-- ============================================================
-- DỮ LIỆU MẪU (SEED DATA)
-- ============================================================

-- ------------------------------------------------------------
-- Chèn dữ liệu Dịch vụ (đầy đủ nội dung trang chi tiết: Hero,
-- 3 điểm nổi bật, Quy trình các bước, Bảng giá theo cân nặng)
-- ------------------------------------------------------------
-- Ghi chú: dùng dollar-quoting (dollar-sign + json + dollar-sign) thay cho nháy đơn
-- để tránh phải escape dấu nháy đơn (') xuất hiện trong văn bản tiếng Việt.

INSERT INTO services (
    id, name, description, base_price, image,
    tagline, subtitle, hero_description, rating, reviews_count,
    cta_primary, cta_secondary, highlights, process_steps, process_note, pricing
) VALUES

-- ============================================================
-- SER1: CẮT TỈA & SPA
-- ============================================================
(
    'ser1', 'Cắt Tỉa Thẩm Mỹ',
    'Quy trình 7 bước bao gồm tắm, sấy, vệ sinh tai và tạo kiểu chuyên nghiệp theo yêu cầu.',
    250000, 'https://lh3.googleusercontent.com/aida-public/ser1.png',
    'DỊCH VỤ TIÊU ĐIỂM PAWHOME',
    '& Spa Nghệ Thuật',
    'Hệ thống trị liệu tái tạo rực rỡ từ cội nguồn vạn vật – Nơi trao gửi yêu thương toàn mỹ bằng quy trình 7 bước thư giãn và tinh hoa tạo kiểu đỉnh cao từ thợ lành nghề chuyên nghiệp bậc nhất.',
    5.0, 1420,
    $json${"label": "Đặt lịch Spa ngay", "action": "book_service:ser1"}$json$,
    $json${"label": "Bảng giá chi tiết", "action": "scroll_to_pricing"}$json$,
    $json$[
        {"icon": "shield", "title": "Mỹ Phẩm Cao Cấp Hữu Cơ", "description": "100% sữa tắm, gel dưỡng lông đạt chứng nhận hữu cơ cao cấp nhập khẩu từ châu Âu. Không gây cay mắt bé, dịu nhẹ tối đa cho làn da nhạy cảm nhất."},
        {"icon": "clock", "title": "Làm Đẹp Không Gây Stress", "description": "Quy trình áp dụng liệu pháp âm nhạc thư giãn sóng Alpha cùng kỹ thuật dỗ dành thấu hiểu tâm lý thú cưng, giúp giảm 90% sự lo âu căng thẳng cho bé cưng."},
        {"icon": "user-check", "title": "Nghệ Nhân Artist Tận Tâm", "description": "Đội ngũ thợ tỉa chuyên nghiệp trải qua hơn 400 giờ đào tạo nâng cao. Am hiểu chi tiết các đường tỉa nghệ thuật như tỉa tròn Hàn Quốc, tỉa nơ thắt eo hoàng gia."}
    ]$json$,
    $json$[
        {"step": "01", "title": "Kiểm tra da & lông", "description": "Bác sĩ hoặc chuyên viên sẽ kiểm tra bề mặt da, lông của bé để phát hiện nấm, ve rận hoặc các kích ứng nhạy cảm nhằm tư vấn loại dầu tắm phù hợp."},
        {"step": "02", "title": "Vệ sinh tai & Cắt móng", "description": "Vặt tuyến hôi, làm sạch bụi bẩn tích tụ trong tai để ngừa viêm nhiễm, mài mịn móng tránh cào xước da khi bé đùa nghịch."},
        {"step": "03", "title": "Chải gỡ rối & Loại lông chết", "description": "Sử dụng lược chuyên dụng chải chuốt nhẹ nhàng giúp gỡ bỏ hoàn toàn những phần lông xơ, rối và mát-xa tuần hoàn da nuôi dưỡng lông mới."},
        {"step": "04", "title": "Tắm massage & Spa tinh dầu", "description": "Tắm 2 lần nước ấm với sữa tắm thảo dược dưỡng lông cao cấp nhập khẩu từ Nhật Bản/Pháp kết hợp kỹ thuật massage thư giãn sâu."},
        {"step": "05", "title": "Sấy ion âm khử tĩnh điện", "description": "Sấy nhiệt độ vừa phải kết hợp thổi gió ion âm chuyên nghiệp giữ cho các sợi lông có độ phồng quyến rũ và không bị xơ khô gãy rụng."},
        {"step": "06", "title": "Cắt tỉa & Tạo kiểu nghệ thuật", "description": "Được trực tiếp thực hiện bởi các Artist tay nghề cao (như chị Lan Hương) cắt tỉa phom tròn Hàn Quốc, gấu Teddy, bông tuyết xòe điệu đà theo yêu cầu."},
        {"step": "07", "title": "Thoa xịt dưỡng & Nước hoa thảo mộc", "description": "Phủ lớp dầu dưỡng tăng độ bóng mượt vượt trội và xịt nước hoa hữu cơ chiết xuất hoa hồng/oải hương dịu nhẹ lưu hương thơm mát suốt cả tuần."}
    ]$json$,
    'Mát-xa chuyên sâu miễn phí: Tất cả các gói tắm đều đi kèm với 10 phút xoa bóp huyệt và xả mệt mỏi toàn thân.',
    $json${
        "Bé nhỏ (Dưới 5kg)": [
            {"name": "TẮM SPA THƯ GIÃN", "price": 200000, "duration_minutes": 60, "features": ["Tắm mát-xa tiêu chuẩn", "Sấy khô chải lông", "Cắt tỉa móng cơ bản", "Vắt tuyến hôi"], "cta": "Chọn gói cơ bản"},
            {"name": "VIP TẬP TRUNG TẠO KIỂU", "price": 350000, "duration_minutes": 90, "features": ["Spa tinh dầu organic phục hồi", "Sấy suôn phồng ion âm", "Vệ sinh tai chuyên sâu", "Cắt tỉa tạo kiểu nghệ thuật Hàn Quốc", "Dưỡng ẩm phủ bóng tơ tằm", "Xịt nước hoa lưu hương 7 ngày"], "cta": "Đặt lịch gói VIP Art"}
        ],
        "Bé vừa (5-12kg)": [
            {"name": "TẮM SPA THƯ GIÃN", "price": 250000, "duration_minutes": 70, "features": ["Tắm mát-xa tiêu chuẩn", "Sấy khô chải lông", "Cắt tỉa móng cơ bản", "Vắt tuyến hôi"], "cta": "Chọn gói cơ bản"},
            {"name": "VIP TẬP TRUNG TẠO KIỂU", "price": 420000, "duration_minutes": 100, "features": ["Spa tinh dầu organic phục hồi", "Sấy suôn phồng ion âm", "Vệ sinh tai chuyên sâu", "Cắt tỉa tạo kiểu nghệ thuật Hàn Quốc", "Dưỡng ẩm phủ bóng tơ tằm", "Xịt nước hoa lưu hương 7 ngày"], "cta": "Đặt lịch gói VIP Art"}
        ],
        "Bé lớn (Trên 12kg)": [
            {"name": "TẮM SPA THƯ GIÃN", "price": 300000, "duration_minutes": 80, "features": ["Tắm mát-xa tiêu chuẩn", "Sấy khô chải lông", "Cắt tỉa móng cơ bản", "Vắt tuyến hôi"], "cta": "Chọn gói cơ bản"},
            {"name": "VIP TẬP TRUNG TẠO KIỂU", "price": 500000, "duration_minutes": 110, "features": ["Spa tinh dầu organic phục hồi", "Sấy suôn phồng ion âm", "Vệ sinh tai chuyên sâu", "Cắt tỉa tạo kiểu nghệ thuật Hàn Quốc", "Dưỡng ẩm phủ bóng tơ tằm", "Xịt nước hoa lưu hương 7 ngày"], "cta": "Đặt lịch gói VIP Art"}
        ]
    }$json$
),

-- ============================================================
-- SER2: LƯU TRÚ CAO CẤP
-- ============================================================
(
    'ser2', 'Lưu Trú Cao Cấp',
    'Phòng máy lạnh, camera 24/7, thực đơn tùy chỉnh và thời gian vui chơi mỗi ngày.',
    350000, 'https://lh3.googleusercontent.com/aida-public/ser2.png',
    'DỊCH VỤ TIÊU ĐIỂM PAWHOME',
    '& Nghỉ Dưỡng Cao Cấp',
    'Không gian nghỉ dưỡng 5 sao dành riêng cho thú cưng – Nơi bé vui chơi, nghỉ ngơi và được yêu thương như ở nhà, dù bạn đang ở bất cứ đâu.',
    5.0, 980,
    $json${"label": "Đặt lịch lưu trú", "action": "book_service:ser2"}$json$,
    $json${"label": "Bảng giá chi tiết", "action": "scroll_to_pricing"}$json$,
    $json$[
        {"icon": "shield", "title": "Phòng Nghỉ Tiêu Chuẩn Khách Sạn", "description": "Phòng máy lạnh 24/7, cách âm, khử khuẩn hàng ngày, nệm êm và đồ chơi riêng cho từng bé."},
        {"icon": "clock", "title": "Camera Giám Sát Trực Tiếp", "description": "Theo dõi bé mọi lúc qua app, nhận thông báo ăn-ngủ-chơi để bạn an tâm tuyệt đối dù ở xa."},
        {"icon": "user-check", "title": "Nhân Viên Chăm Sóc Tận Tâm", "description": "Đội ngũ chăm sóc trải qua hơn 300 giờ đào tạo, tỷ lệ 1 nhân viên / 5 bé để đảm bảo sự quan tâm sát sao."}
    ]$json$,
    $json$[
        {"step": "01", "title": "Tiếp nhận & Kiểm tra sức khỏe", "description": "Nhân viên kiểm tra tình trạng sức khỏe, lịch sử tiêm phòng và ghi nhận thói quen ăn uống, sinh hoạt của bé."},
        {"step": "02", "title": "Bố trí phòng nghỉ", "description": "Bé được dẫn vào phòng phù hợp với kích thước, tính cách và nhu cầu riêng (yên tĩnh, năng động, hoặc cần chăm sóc đặc biệt)."},
        {"step": "03", "title": "Thiết lập lịch ăn & vận động", "description": "Thiết lập khung giờ ăn theo đúng thực đơn/thói quen tại nhà, kết hợp 2 buổi vận động ngoài sân mỗi ngày."},
        {"step": "04", "title": "Giám sát 24/7", "description": "Camera AI và nhân viên trực ca theo dõi liên tục, phát hiện sớm dấu hiệu bất thường về sức khỏe hoặc hành vi."},
        {"step": "05", "title": "Vui chơi & tương tác", "description": "Bé được tham gia các hoạt động nhóm, đồ chơi vận động và thời gian tương tác riêng với nhân viên mỗi ngày."},
        {"step": "06", "title": "Báo cáo & trả bé", "description": "Gửi báo cáo hình ảnh/video hàng ngày qua app; khi đón bé, nhân viên bàn giao kèm nhận xét tình trạng sức khỏe và sinh hoạt."}
    ]$json$,
    'Cập nhật hình ảnh miễn phí: Mỗi ngày lưu trú đều kèm 2 lần gửi ảnh/video cập nhật tình trạng của bé qua Zalo hoặc app.',
    $json${
        "Bé nhỏ (Dưới 5kg)": [
            {"name": "PHÒNG TIÊU CHUẨN", "price": 180000, "unit": "đêm", "features": ["Phòng máy lạnh 24/7", "Khử khuẩn hàng ngày", "2 bữa ăn tiêu chuẩn", "1 lần dạo/ngày", "Cập nhật ảnh mỗi ngày"], "cta": "Chọn gói tiêu chuẩn"},
            {"name": "PHÒNG VIP", "price": 320000, "unit": "đêm", "features": ["Tất cả tiện ích Tiêu chuẩn", "Camera giám sát riêng qua app", "3 bữa ăn tiêu chuẩn", "Đồ chơi & nệm cao cấp", "Vận động 2 lần/ngày", "Ưu tiên đặt lịch lễ tết"], "cta": "Đặt lịch gói VIP"}
        ],
        "Bé vừa (5-12kg)": [
            {"name": "PHÒNG TIÊU CHUẨN", "price": 230000, "unit": "đêm", "features": ["Phòng máy lạnh 24/7", "Khử khuẩn hàng ngày", "2 bữa ăn tiêu chuẩn", "1 lần dạo/ngày", "Cập nhật ảnh mỗi ngày"], "cta": "Chọn gói tiêu chuẩn"},
            {"name": "PHÒNG VIP", "price": 380000, "unit": "đêm", "features": ["Tất cả tiện ích Tiêu chuẩn", "Camera giám sát riêng qua app", "3 bữa ăn tiêu chuẩn", "Đồ chơi & nệm cao cấp", "Vận động 2 lần/ngày", "Ưu tiên đặt lịch lễ tết"], "cta": "Đặt lịch gói VIP"}
        ],
        "Bé lớn (Trên 12kg)": [
            {"name": "PHÒNG TIÊU CHUẨN", "price": 280000, "unit": "đêm", "features": ["Phòng máy lạnh 24/7", "Khử khuẩn hàng ngày", "2 bữa ăn tiêu chuẩn", "1 lần dạo/ngày", "Cập nhật ảnh mỗi ngày"], "cta": "Chọn gói tiêu chuẩn"},
            {"name": "PHÒNG VIP", "price": 450000, "unit": "đêm", "features": ["Tất cả tiện ích Tiêu chuẩn", "Camera giám sát riêng qua app", "3 bữa ăn tiêu chuẩn", "Đồ chơi & nệm cao cấp", "Vận động 2 lần/ngày", "Ưu tiên đặt lịch lễ tết"], "cta": "Đặt lịch gói VIP"}
        ]
    }$json$
),

-- ============================================================
-- SER3: KHÁM SỨC KHỎE
-- ============================================================
(
    'ser3', 'Khám Tổng Quát',
    'Kiểm tra toàn diện sức khỏe, tầm soát bệnh lý và tư vấn dinh dưỡng cùng chuyên gia.',
    500000, 'https://lh3.googleusercontent.com/aida-public/ser3.png',
    'DỊCH VỤ TIÊU ĐIỂM PAWHOME',
    '& Tư Vấn Dinh Dưỡng',
    'Chăm sóc sức khỏe toàn diện cho thú cưng cùng đội ngũ bác sĩ thú y giàu kinh nghiệm – Phát hiện sớm, điều trị đúng, an tâm lâu dài.',
    4.9, 1560,
    $json${"label": "Đặt lịch khám ngay", "action": "book_service:ser3"}$json$,
    $json${"label": "Bảng giá chi tiết", "action": "scroll_to_pricing"}$json$,
    $json$[
        {"icon": "shield", "title": "Trang Thiết Bị Y Tế Hiện Đại", "description": "Máy xét nghiệm máu, siêu âm và X-quang chuẩn quốc tế giúp chẩn đoán nhanh và chính xác."},
        {"icon": "clock", "title": "Đặt Lịch Linh Hoạt, Ít Chờ Đợi", "description": "Hệ thống đặt lịch theo khung giờ giúp giảm thời gian chờ, hạn chế stress cho thú cưng khi đến khám."},
        {"icon": "user-check", "title": "Bác Sĩ Thú Y Tận Tâm", "description": "Đội ngũ bác sĩ có chứng chỉ chuyên môn, trên 5 năm kinh nghiệm điều trị nội khoa và dinh dưỡng thú cưng."}
    ]$json$,
    $json$[
        {"step": "01", "title": "Khai báo tiền sử bệnh", "description": "Chủ nuôi cung cấp thông tin về thói quen ăn uống, tiền sử bệnh lý và các dấu hiệu bất thường gần đây của bé."},
        {"step": "02", "title": "Khám tổng quát", "description": "Bác sĩ kiểm tra cân nặng, nhiệt độ, nhịp tim, tình trạng da-lông, mắt-tai-miệng để đánh giá sức khỏe tổng thể."},
        {"step": "03", "title": "Xét nghiệm chuyên sâu (nếu cần)", "description": "Thực hiện xét nghiệm máu, siêu âm hoặc X-quang để tầm soát các bệnh lý tiềm ẩn theo chỉ định của bác sĩ."},
        {"step": "04", "title": "Tư vấn kết quả & dinh dưỡng", "description": "Bác sĩ giải thích chi tiết kết quả khám, đưa ra phác đồ điều trị (nếu có) và tư vấn chế độ ăn phù hợp."},
        {"step": "05", "title": "Kê đơn & hẹn tái khám", "description": "Cấp đơn thuốc (nếu cần điều trị) và lên lịch tái khám để theo dõi tiến triển sức khỏe của bé."}
    ]$json$,
    'Tư vấn dinh dưỡng miễn phí: Mỗi lượt khám tổng quát đều kèm 15 phút tư vấn chế độ ăn theo độ tuổi và tình trạng sức khỏe.',
    $json${
        "Bé nhỏ (Dưới 5kg)": [
            {"name": "KHÁM CƠ BẢN", "price": 200000, "duration_minutes": 30, "features": ["Khám tổng quát", "Đo cân nặng & nhiệt độ", "Tư vấn dinh dưỡng cơ bản", "Sổ khám sức khỏe điện tử"], "cta": "Chọn gói cơ bản"},
            {"name": "KHÁM CHUYÊN SÂU", "price": 500000, "duration_minutes": 60, "features": ["Tất cả hạng mục Cơ bản", "Xét nghiệm máu tổng quát", "Siêu âm bụng tổng quát", "Tư vấn dinh dưỡng chuyên sâu", "Hẹn tái khám miễn phí (trong 7 ngày)"], "cta": "Đặt lịch khám chuyên sâu"}
        ],
        "Bé vừa (5-12kg)": [
            {"name": "KHÁM CƠ BẢN", "price": 250000, "duration_minutes": 35, "features": ["Khám tổng quát", "Đo cân nặng & nhiệt độ", "Tư vấn dinh dưỡng cơ bản", "Sổ khám sức khỏe điện tử"], "cta": "Chọn gói cơ bản"},
            {"name": "KHÁM CHUYÊN SÂU", "price": 600000, "duration_minutes": 70, "features": ["Tất cả hạng mục Cơ bản", "Xét nghiệm máu tổng quát", "Siêu âm bụng tổng quát", "Tư vấn dinh dưỡng chuyên sâu", "Hẹn tái khám miễn phí (trong 7 ngày)"], "cta": "Đặt lịch khám chuyên sâu"}
        ],
        "Bé lớn (Trên 12kg)": [
            {"name": "KHÁM CƠ BẢN", "price": 300000, "duration_minutes": 40, "features": ["Khám tổng quát", "Đo cân nặng & nhiệt độ", "Tư vấn dinh dưỡng cơ bản", "Sổ khám sức khỏe điện tử"], "cta": "Chọn gói cơ bản"},
            {"name": "KHÁM CHUYÊN SÂU", "price": 700000, "duration_minutes": 80, "features": ["Tất cả hạng mục Cơ bản", "Xét nghiệm máu tổng quát", "Siêu âm bụng tổng quát", "Tư vấn dinh dưỡng chuyên sâu", "Hẹn tái khám miễn phí (trong 7 ngày)"], "cta": "Đặt lịch khám chuyên sâu"}
        ]
    }$json$
),

-- ============================================================
-- SER4: HUẤN LUYỆN
-- ============================================================
(
    'ser4', 'Huấn Luyện',
    'Xây dựng thói quen tốt thông qua các bài tập tương tác tích cực, không la mắng, không roi vọt.',
    300000, 'https://lh3.googleusercontent.com/aida-public/ser4.png',
    'DỊCH VỤ TIÊU ĐIỂM PAWHOME',
    '& Uốn Nắn Hành Vi',
    'Xây dựng thói quen tốt và sự gắn kết bền chặt giữa bé và gia đình – Thông qua phương pháp huấn luyện tích cực, không la mắng, không roi vọt.',
    4.8, 640,
    $json${"label": "Đặt lịch huấn luyện", "action": "book_service:ser4"}$json$,
    $json${"label": "Bảng giá chi tiết", "action": "scroll_to_pricing"}$json$,
    $json$[
        {"icon": "shield", "title": "Phương Pháp Khoa Học", "description": "Áp dụng kỹ thuật Positive Reinforcement (khen thưởng tích cực) được chứng nhận quốc tế, an toàn cho tâm lý bé."},
        {"icon": "clock", "title": "Lộ Trình Cá Nhân Hóa", "description": "Mỗi bé có giáo án riêng theo độ tuổi, giống loài và tính cách, tiến độ rõ ràng theo từng buổi."},
        {"icon": "user-check", "title": "Huấn Luyện Viên K9 Chuyên Nghiệp", "description": "Đội ngũ HLV được đào tạo bài bản, từng huấn luyện chó nghiệp vụ và chó cảnh các cấp độ."}
    ]$json$,
    $json$[
        {"step": "01", "title": "Đánh giá tính cách & hành vi", "description": "HLV quan sát và đánh giá mức độ phản xạ, tính cách (nhút nhát/hung hăng/năng động) để xây dựng giáo án phù hợp."},
        {"step": "02", "title": "Xây dựng lộ trình huấn luyện", "description": "Lập kế hoạch buổi học theo mục tiêu cụ thể: vâng lời cơ bản, sửa hành vi xấu, hoặc kỹ năng nâng cao."},
        {"step": "03", "title": "Huấn luyện lệnh cơ bản", "description": "Dạy các lệnh nền tảng: ngồi, nằm, đứng yên, đi cạnh chân – kết hợp khen thưởng ngay khi bé thực hiện đúng."},
        {"step": "04", "title": "Sửa hành vi & kỷ luật phản xạ", "description": "Áp dụng bài tập chuyên biệt để khắc phục hành vi không mong muốn như sủa quá mức, cắn phá, kéo dây xích."},
        {"step": "05", "title": "Tổng kết & hướng dẫn chủ nuôi", "description": "HLV hướng dẫn chủ nuôi cách duy trì kết quả huấn luyện tại nhà, đảm bảo bé giữ được thói quen tốt lâu dài."}
    ]$json$,
    'Cam kết tiến độ: Nếu sau 5 buổi không thấy cải thiện rõ rệt, PawHome hỗ trợ thêm 2 buổi miễn phí.',
    $json${
        "Bé nhỏ (Dưới 5kg)": [
            {"name": "CƠ BẢN (1 buổi)", "price": 300000, "duration_minutes": 45, "features": ["Huấn luyện lệnh cơ bản", "Đánh giá tính cách ban đầu", "Hướng dẫn chủ nuôi sau buổi học"], "cta": "Đặt 1 buổi trải nghiệm"},
            {"name": "TRỌN GÓI NÂNG CAO (8 buổi)", "price": 2000000, "duration_minutes": 45, "features": ["Tất cả nội dung Cơ bản", "Sửa hành vi chuyên sâu", "Giáo án cá nhân hóa theo bé", "Theo dõi tiến độ qua app", "Hỗ trợ thêm buổi nếu chưa đạt mục tiêu"], "cta": "Đặt lịch gói trọn khóa"}
        ],
        "Bé vừa (5-12kg)": [
            {"name": "CƠ BẢN (1 buổi)", "price": 350000, "duration_minutes": 50, "features": ["Huấn luyện lệnh cơ bản", "Đánh giá tính cách ban đầu", "Hướng dẫn chủ nuôi sau buổi học"], "cta": "Đặt 1 buổi trải nghiệm"},
            {"name": "TRỌN GÓI NÂNG CAO (8 buổi)", "price": 2400000, "duration_minutes": 50, "features": ["Tất cả nội dung Cơ bản", "Sửa hành vi chuyên sâu", "Giáo án cá nhân hóa theo bé", "Theo dõi tiến độ qua app", "Hỗ trợ thêm buổi nếu chưa đạt mục tiêu"], "cta": "Đặt lịch gói trọn khóa"}
        ],
        "Bé lớn (Trên 12kg)": [
            {"name": "CƠ BẢN (1 buổi)", "price": 400000, "duration_minutes": 60, "features": ["Huấn luyện lệnh cơ bản", "Đánh giá tính cách ban đầu", "Hướng dẫn chủ nuôi sau buổi học"], "cta": "Đặt 1 buổi trải nghiệm"},
            {"name": "TRỌN GÓI NÂNG CAO (8 buổi)", "price": 2800000, "duration_minutes": 60, "features": ["Tất cả nội dung Cơ bản", "Sửa hành vi chuyên sâu", "Giáo án cá nhân hóa theo bé", "Theo dõi tiến độ qua app", "Hỗ trợ thêm buổi nếu chưa đạt mục tiêu"], "cta": "Đặt lịch gói trọn khóa"}
        ]
    }$json$
),

-- ============================================================
-- SER5: DẮT CHÓ ĐI DẠO
-- ============================================================
(
    'ser5', 'Dắt Chó Đi Dạo',
    'Giúp bé vận động và giải tỏa năng lượng với lộ trình an toàn, thú vị.',
    100000, 'https://lh3.googleusercontent.com/aida-public/ser5.png',
    'DỊCH VỤ TIÊU ĐIỂM PAWHOME',
    'Đi Dạo Mỗi Ngày',
    'Giúp bé giải tỏa năng lượng, vận động lành mạnh và khám phá thế giới bên ngoài cùng người dẫn dắt chuyên nghiệp, an toàn trên từng lộ trình.',
    4.9, 1120,
    $json${"label": "Đặt lịch đi dạo", "action": "book_service:ser5"}$json$,
    $json${"label": "Bảng giá chi tiết", "action": "scroll_to_pricing"}$json$,
    $json$[
        {"icon": "shield", "title": "Lộ Trình An Toàn Đã Khảo Sát", "description": "Các tuyến đi dạo được chọn lọc kỹ, tránh khu vực đông xe cộ, đảm bảo an toàn tuyệt đối cho bé."},
        {"icon": "clock", "title": "Theo Dõi Hành Trình Real-time", "description": "Chủ nuôi có thể theo dõi vị trí và lộ trình đi dạo của bé trực tiếp qua app trong suốt buổi đi."},
        {"icon": "user-check", "title": "Người Dắt Am Hiểu Tâm Lý Chó", "description": "Đội ngũ pet sitter được huấn luyện xử lý tình huống, kiểm soát dây xích và phản ứng của bé với môi trường lạ."}
    ]$json$,
    $json$[
        {"step": "01", "title": "Đặt lịch & chọn khung giờ", "description": "Chủ nuôi chọn thời gian, địa điểm đón bé và lộ trình đi dạo mong muốn (công viên, khu dân cư, ven sông...)."},
        {"step": "02", "title": "Đón bé & kiểm tra dây xích/vòng cổ", "description": "Người dắt đến đón bé tại nhà, kiểm tra dây xích, vòng cổ và tình trạng sức khỏe trước khi xuất phát."},
        {"step": "03", "title": "Khởi động nhẹ", "description": "Cho bé đi chậm 5 phút đầu để làm nóng cơ, tránh chấn thương trước khi vào lộ trình chính."},
        {"step": "04", "title": "Đi dạo theo lộ trình", "description": "Dẫn bé đi dạo theo tuyến đã chọn, kết hợp các điểm dừng để bé hít thở, quan sát và giải tỏa năng lượng."},
        {"step": "05", "title": "Trả bé & báo cáo hành trình", "description": "Bàn giao bé về nhà an toàn, gửi báo cáo quãng đường, thời gian và tình trạng bé sau buổi đi dạo."}
    ]$json$,
    'An toàn là ưu tiên số 1: Mỗi buổi đi dạo đều có bảo hiểm tai nạn cho thú cưng trong suốt hành trình.',
    $json${
        "Bé nhỏ (Dưới 5kg)": [
            {"name": "DẠO NGẮN", "price": 100000, "duration_minutes": 30, "features": ["Lộ trình gần nhà", "Theo dõi vị trí qua app", "Báo cáo sau buổi đi"], "cta": "Chọn gói dạo ngắn"},
            {"name": "DẠO DÀI KHÁM PHÁ", "price": 180000, "duration_minutes": 60, "features": ["Tất cả tiện ích Dạo ngắn", "Lộ trình đa dạng (công viên, ven sông)", "Nghỉ giữa chừng cho bé khám phá", "Vệ sinh chân/lông sau khi về", "Ưu tiên đặt lịch cố định hàng tuần"], "cta": "Đặt lịch dạo dài"}
        ],
        "Bé vừa (5-12kg)": [
            {"name": "DẠO NGẮN", "price": 120000, "duration_minutes": 30, "features": ["Lộ trình gần nhà", "Theo dõi vị trí qua app", "Báo cáo sau buổi đi"], "cta": "Chọn gói dạo ngắn"},
            {"name": "DẠO DÀI KHÁM PHÁ", "price": 200000, "duration_minutes": 60, "features": ["Tất cả tiện ích Dạo ngắn", "Lộ trình đa dạng (công viên, ven sông)", "Nghỉ giữa chừng cho bé khám phá", "Vệ sinh chân/lông sau khi về", "Ưu tiên đặt lịch cố định hàng tuần"], "cta": "Đặt lịch dạo dài"}
        ],
        "Bé lớn (Trên 12kg)": [
            {"name": "DẠO NGẮN", "price": 150000, "duration_minutes": 30, "features": ["Lộ trình gần nhà", "Theo dõi vị trí qua app", "Báo cáo sau buổi đi"], "cta": "Chọn gói dạo ngắn"},
            {"name": "DẠO DÀI KHÁM PHÁ", "price": 230000, "duration_minutes": 60, "features": ["Tất cả tiện ích Dạo ngắn", "Lộ trình đa dạng (công viên, ven sông)", "Nghỉ giữa chừng cho bé khám phá", "Vệ sinh chân/lông sau khi về", "Ưu tiên đặt lịch cố định hàng tuần"], "cta": "Đặt lịch dạo dài"}
        ]
    }$json$
),

-- ============================================================
-- SER6: CHĂM SÓC TẠI NHÀ
-- ============================================================
(
    'ser6', 'Chăm Sóc Tại Nhà',
    'Chăm sóc tận nơi khi bạn vắng nhà, đảm bảo bé luôn cảm thấy an tâm.',
    150000, 'https://lh3.googleusercontent.com/aida-public/ser6.png',
    'DỊCH VỤ TIÊU ĐIỂM PAWHOME',
    'Thú Cưng Tại Nhà',
    'Chăm sóc tận nơi khi bạn vắng nhà – Đảm bảo bé luôn được ăn đúng giờ, vui chơi đầy đủ và cảm thấy an tâm trong không gian quen thuộc.',
    4.9, 870,
    $json${"label": "Đặt lịch chăm sóc", "action": "book_service:ser6"}$json$,
    $json${"label": "Bảng giá chi tiết", "action": "scroll_to_pricing"}$json$,
    $json$[
        {"icon": "shield", "title": "Pet Sitter Được Xác Minh", "description": "Đội ngũ chăm sóc viên trải qua kiểm tra lý lịch và đào tạo nghiệp vụ trước khi nhận lịch tại nhà khách hàng."},
        {"icon": "clock", "title": "Lịch Trình Linh Hoạt", "description": "Đặt lịch theo giờ, theo ngày hoặc trọn gói nhiều ngày khi gia đình đi công tác, du lịch dài hạn."},
        {"icon": "user-check", "title": "Cập Nhật Tình Trạng Liên Tục", "description": "Gửi hình ảnh, video và báo cáo chi tiết sau mỗi lượt chăm sóc qua Zalo hoặc ứng dụng PawHome."}
    ]$json$,
    $json$[
        {"step": "01", "title": "Khảo sát nhu cầu & thói quen", "description": "Chủ nuôi cung cấp thông tin về giờ ăn, loại thức ăn, thói quen sinh hoạt và các lưu ý đặc biệt của bé."},
        {"step": "02", "title": "Ghép pet sitter phù hợp", "description": "PawHome chọn nhân viên chăm sóc phù hợp với loại thú cưng và khu vực sinh sống của khách hàng."},
        {"step": "03", "title": "Chăm sóc theo lịch đã đặt", "description": "Pet sitter đến đúng giờ, cho bé ăn, dọn vệ sinh khu vực sinh hoạt và chơi cùng bé theo thời gian đã đăng ký."},
        {"step": "04", "title": "Theo dõi sức khỏe & hành vi", "description": "Quan sát các dấu hiệu bất thường về ăn uống, tâm trạng; báo ngay cho chủ nuôi nếu phát hiện vấn đề."},
        {"step": "05", "title": "Gửi báo cáo sau mỗi lượt", "description": "Gửi hình ảnh/video kèm ghi chú chi tiết về tình trạng bé ngay sau khi hoàn thành buổi chăm sóc."}
    ]$json$,
    'Linh hoạt theo nhu cầu: Có thể đặt thêm dịch vụ tưới cây, nhận thư hoặc dọn nhà cơ bản trong cùng lượt ghé.',
    $json${
        "Bé nhỏ (Dưới 5kg)": [
            {"name": "THEO LƯỢT", "price": 150000, "unit": "lượt", "duration_minutes": 45, "features": ["Cho ăn đúng giờ", "Dọn vệ sinh khu vực ở", "Chơi cùng bé 15 phút", "Gửi ảnh xác nhận"], "cta": "Đặt theo lượt"},
            {"name": "TRỌN GÓI THEO NGÀY", "price": 450000, "unit": "ngày", "features": ["Tất cả tiện ích Theo lượt", "3 lượt ghé cố định mỗi ngày", "Theo dõi sức khỏe liên tục", "Báo cáo tổng kết cuối ngày", "Ưu tiên hỗ trợ khẩn cấp 24/7"], "cta": "Đặt trọn gói theo ngày"}
        ],
        "Bé vừa (5-12kg)": [
            {"name": "THEO LƯỢT", "price": 170000, "unit": "lượt", "duration_minutes": 45, "features": ["Cho ăn đúng giờ", "Dọn vệ sinh khu vực ở", "Chơi cùng bé 15 phút", "Gửi ảnh xác nhận"], "cta": "Đặt theo lượt"},
            {"name": "TRỌN GÓI THEO NGÀY", "price": 500000, "unit": "ngày", "features": ["Tất cả tiện ích Theo lượt", "3 lượt ghé cố định mỗi ngày", "Theo dõi sức khỏe liên tục", "Báo cáo tổng kết cuối ngày", "Ưu tiên hỗ trợ khẩn cấp 24/7"], "cta": "Đặt trọn gói theo ngày"}
        ],
        "Bé lớn (Trên 12kg)": [
            {"name": "THEO LƯỢT", "price": 200000, "unit": "lượt", "duration_minutes": 45, "features": ["Cho ăn đúng giờ", "Dọn vệ sinh khu vực ở", "Chơi cùng bé 15 phút", "Gửi ảnh xác nhận"], "cta": "Đặt theo lượt"},
            {"name": "TRỌN GÓI THEO NGÀY", "price": 550000, "unit": "ngày", "features": ["Tất cả tiện ích Theo lượt", "3 lượt ghé cố định mỗi ngày", "Theo dõi sức khỏe liên tục", "Báo cáo tổng kết cuối ngày", "Ưu tiên hỗ trợ khẩn cấp 24/7"], "cta": "Đặt trọn gói theo ngày"}
        ]
    }$json$
),

-- ============================================================
-- SER7: TRỊ LIỆU & PHỤC HỒI
-- ============================================================
(
    'ser7', 'Trị Liệu & Phục Hồi',
    'Các liệu pháp vật lý trị liệu giúp bé nhanh chóng hồi phục sức khỏe.',
    350000, 'https://lh3.googleusercontent.com/aida-public/ser7.png',
    'DỊCH VỤ TIÊU ĐIỂM PAWHOME',
    '& Phục Hồi Vận Động',
    'Hỗ trợ phục hồi nhanh sau chấn thương, phẫu thuật hoặc tuổi già – Các liệu pháp vật lý trị liệu chuyên sâu giúp bé khỏe mạnh và vận động tự tin trở lại.',
    4.9, 320,
    $json${"label": "Đặt lịch trị liệu", "action": "book_service:ser7"}$json$,
    $json${"label": "Bảng giá chi tiết", "action": "scroll_to_pricing"}$json$,
    $json$[
        {"icon": "shield", "title": "Thiết Bị Trị Liệu Chuyên Dụng", "description": "Bể thủy trị liệu, máy laser cấp độ thấp và thiết bị massage chuyên sâu hỗ trợ phục hồi cơ-xương-khớp."},
        {"icon": "clock", "title": "Phác Đồ Theo Từng Giai Đoạn", "description": "Lộ trình trị liệu được điều chỉnh theo tiến độ phục hồi thực tế, đánh giá lại sau mỗi 3-5 buổi."},
        {"icon": "user-check", "title": "Chuyên Viên Phục Hồi Chức Năng", "description": "Đội ngũ có chuyên môn vật lý trị liệu thú y, phối hợp chặt chẽ với bác sĩ điều trị chính của bé."}
    ]$json$,
    $json$[
        {"step": "01", "title": "Đánh giá tình trạng vận động", "description": "Chuyên viên kiểm tra khả năng vận động, mức độ đau và nguyên nhân (chấn thương, phẫu thuật, tuổi già, thoái hóa khớp)."},
        {"step": "02", "title": "Xây dựng phác đồ trị liệu", "description": "Lập kế hoạch trị liệu phù hợp: thủy trị liệu, laser, massage trị liệu hoặc kết hợp nhiều phương pháp."},
        {"step": "03", "title": "Thực hiện liệu pháp vật lý", "description": "Tiến hành các bài tập và liệu pháp theo phác đồ, theo dõi sát phản ứng và mức độ chịu đựng của bé."},
        {"step": "04", "title": "Theo dõi tiến triển", "description": "Đánh giá lại khả năng vận động sau mỗi 3-5 buổi để điều chỉnh phác đồ phù hợp với tốc độ hồi phục."},
        {"step": "05", "title": "Hướng dẫn chăm sóc tại nhà", "description": "Hướng dẫn chủ nuôi các bài tập nhẹ và lưu ý sinh hoạt để duy trì hiệu quả trị liệu giữa các buổi."}
    ]$json$,
    'Phối hợp cùng bác sĩ điều trị: PawHome nhận hồ sơ bệnh án từ bệnh viện thú y để xây dựng phác đồ trị liệu phù hợp nhất.',
    $json${
        "Bé nhỏ (Dưới 5kg)": [
            {"name": "TRỊ LIỆU CƠ BẢN", "price": 350000, "unit": "buổi", "duration_minutes": 40, "features": ["Massage trị liệu cơ bản", "Đánh giá vận động ban đầu", "Hướng dẫn bài tập tại nhà"], "cta": "Đặt buổi trị liệu cơ bản"},
            {"name": "PHỤC HỒI CHUYÊN SÂU", "price": 600000, "unit": "buổi", "duration_minutes": 60, "features": ["Tất cả nội dung Cơ bản", "Thủy trị liệu chuyên sâu", "Trị liệu laser cấp độ thấp", "Theo dõi tiến độ định kỳ", "Báo cáo phối hợp với bác sĩ điều trị"], "cta": "Đặt lịch phục hồi chuyên sâu"}
        ],
        "Bé vừa (5-12kg)": [
            {"name": "TRỊ LIỆU CƠ BẢN", "price": 400000, "unit": "buổi", "duration_minutes": 45, "features": ["Massage trị liệu cơ bản", "Đánh giá vận động ban đầu", "Hướng dẫn bài tập tại nhà"], "cta": "Đặt buổi trị liệu cơ bản"},
            {"name": "PHỤC HỒI CHUYÊN SÂU", "price": 700000, "unit": "buổi", "duration_minutes": 70, "features": ["Tất cả nội dung Cơ bản", "Thủy trị liệu chuyên sâu", "Trị liệu laser cấp độ thấp", "Theo dõi tiến độ định kỳ", "Báo cáo phối hợp với bác sĩ điều trị"], "cta": "Đặt lịch phục hồi chuyên sâu"}
        ],
        "Bé lớn (Trên 12kg)": [
            {"name": "TRỊ LIỆU CƠ BẢN", "price": 450000, "unit": "buổi", "duration_minutes": 50, "features": ["Massage trị liệu cơ bản", "Đánh giá vận động ban đầu", "Hướng dẫn bài tập tại nhà"], "cta": "Đặt buổi trị liệu cơ bản"},
            {"name": "PHỤC HỒI CHUYÊN SÂU", "price": 800000, "unit": "buổi", "duration_minutes": 80, "features": ["Tất cả nội dung Cơ bản", "Thủy trị liệu chuyên sâu", "Trị liệu laser cấp độ thấp", "Theo dõi tiến độ định kỳ", "Báo cáo phối hợp với bác sĩ điều trị"], "cta": "Đặt lịch phục hồi chuyên sâu"}
        ]
    }$json$
),

-- ============================================================
-- SER8: CỬA HÀNG PHỤ KIỆN
-- ============================================================
(
    'ser8', 'Cửa Hàng Phụ Kiện',
    'Cung cấp thức ăn, đồ chơi và phụ kiện cao cấp cho người bạn nhỏ.',
    25000, 'https://lh3.googleusercontent.com/aida-public/ser8.png',
    'DỊCH VỤ TIÊU ĐIỂM PAWHOME',
    '& Dinh Dưỡng Cao Cấp',
    'Cung cấp thức ăn, đồ chơi và phụ kiện cao cấp được tuyển chọn kỹ lưỡng – Mọi điều tốt nhất dành cho người bạn nhỏ của bạn.',
    4.8, 2300,
    $json${"label": "Mua sắm ngay", "action": "browse_shop"}$json$,
    $json${"label": "Xem danh mục sản phẩm", "action": "scroll_to_pricing"}$json$,
    $json$[
        {"icon": "shield", "title": "Hàng Chính Hãng, Kiểm Định Chất Lượng", "description": "100% sản phẩm nhập khẩu/phân phối chính hãng, có giấy kiểm định an toàn cho thú cưng."},
        {"icon": "clock", "title": "Giao Hàng Nhanh Trong Ngày", "description": "Đặt hàng trước 14h, nhận hàng trong ngày tại khu vực nội thành – tiện lợi khi cần gấp."},
        {"icon": "user-check", "title": "Tư Vấn Sản Phẩm Theo Nhu Cầu", "description": "Đội ngũ tư vấn am hiểu dinh dưỡng, giúp chọn đúng sản phẩm theo độ tuổi, giống loài và tình trạng sức khỏe."}
    ]$json$,
    $json$[
        {"step": "01", "title": "Tư vấn nhu cầu", "description": "Khách hàng chia sẻ thông tin về thú cưng (độ tuổi, giống, tình trạng sức khỏe) để được gợi ý sản phẩm phù hợp."},
        {"step": "02", "title": "Chọn sản phẩm", "description": "Duyệt danh mục thức ăn, đồ chơi, phụ kiện theo từng nhu cầu cụ thể: dinh dưỡng, vệ sinh, vận động, làm đẹp."},
        {"step": "03", "title": "Đặt hàng & thanh toán", "description": "Xác nhận đơn hàng và lựa chọn phương thức thanh toán linh hoạt (tiền mặt, chuyển khoản, ví điện tử)."},
        {"step": "04", "title": "Đóng gói & giao hàng", "description": "Sản phẩm được kiểm tra kỹ và đóng gói cẩn thận trước khi giao đến tay khách hàng trong ngày."},
        {"step": "05", "title": "Hỗ trợ sau mua hàng", "description": "Hỗ trợ đổi trả trong 7 ngày nếu sản phẩm không phù hợp, kèm tư vấn sử dụng sau khi nhận hàng."}
    ]$json$,
    'Ưu đãi thành viên: Khách hàng đặt lịch dịch vụ tại PawHome được giảm 10% cho mọi đơn hàng phụ kiện.',
    $json${
        "Thức ăn & Dinh dưỡng": [
            {"name": "Hạt khô cao cấp", "price": 180000, "unit": "kg", "note": "Nhập khẩu, theo độ tuổi & giống loài", "cta": "Xem danh mục thức ăn"},
            {"name": "Pate/Súp dinh dưỡng", "price": 25000, "unit": "hộp", "note": "Bổ sung dưỡng chất, hỗ trợ tiêu hóa", "cta": "Xem danh mục thức ăn"}
        ],
        "Phụ kiện & Đồ chơi": [
            {"name": "Đồ chơi gặm cao cấp", "price": 90000, "unit": "cái", "note": "An toàn, không hóa chất độc hại", "cta": "Xem phụ kiện cao cấp"},
            {"name": "Vòng cổ/Dây dắt cao cấp", "price": 150000, "unit": "bộ", "note": "Chất liệu da/vải bền, chống nước", "cta": "Xem phụ kiện cao cấp"}
        ]
    }$json$
)

ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    base_price = EXCLUDED.base_price,
    image = EXCLUDED.image,
    tagline = EXCLUDED.tagline,
    subtitle = EXCLUDED.subtitle,
    hero_description = EXCLUDED.hero_description,
    rating = EXCLUDED.rating,
    reviews_count = EXCLUDED.reviews_count,
    cta_primary = EXCLUDED.cta_primary,
    cta_secondary = EXCLUDED.cta_secondary,
    highlights = EXCLUDED.highlights,
    process_steps = EXCLUDED.process_steps,
    process_note = EXCLUDED.process_note,
    pricing = EXCLUDED.pricing;

-- ------------------------------------------------------------
-- Chèn dữ liệu Chuyên Gia
-- ------------------------------------------------------------
INSERT INTO experts (id, name, title, rating, reviews_count, image, tags) VALUES
('exp1', 'Dr. Minh Tuấn', 'Chuyên gia tâm lý thú cưng', 4.9, 124, 'https://lh3.googleusercontent.com/aida-public/exp1.png', ARRAY['Tâm lý học', 'Huấn luyện chuyên sâu', 'Chó', 'Mèo']),
('exp2', 'Chị Lan Hương', 'Grooming & Spa Artist', 5.0, 89, 'https://lh3.googleusercontent.com/aida-public/exp2.png', ARRAY['Tắm rửa', 'Chăm sóc lông', 'Tạo kiểu thẩm mỹ', 'Mèo', 'Chó']),
('exp3', 'Anh Quốc Bảo', 'Huấn luyện viên K9', 4.8, 210, 'https://lh3.googleusercontent.com/aida-public/exp3.png', ARRAY['Huấn luyện K9', 'Kỷ luật & Phản xạ', 'Chó']),
('exp4', 'Bác sĩ Mỹ Linh', 'Nội khoa & Dinh dưỡng', 4.9, 156, 'https://lh3.googleusercontent.com/aida-public/exp4.png', ARRAY['Nội khoa', 'Khám tổng quát', 'Khẩu phần ăn', 'Tất cả các loài'])
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------
-- Chèn dữ liệu Người Dùng
-- Lưu ý: password_hash dưới đây chỉ là dữ liệu mẫu (placeholder),
-- khi triển khai thực tế cần hash bằng bcrypt/argon2 ở phía backend.
-- ------------------------------------------------------------
INSERT INTO users (email, password_hash, full_name, phone, role) VALUES
('admin@pawhome.vn', '$2b$10$placeholderAdminHashValue1234567890abcdef', 'Quản Trị Viên (Admin)', '0900000000', 'admin'),
('customer@pawhome.vn', '$2b$10$placeholderHashValueCustomer123', 'Khách Hàng Thân Thiết (Customer)', '0911111111', 'client'),
('expert@pawhome.vn', '$2b$10$placeholderHashValueExpert123', 'Chuyên Gia PawHome (Expert)', '0922222222', 'expert'),
('thuy.nguyen@gmail.com', '$2b$10$placeholderHashValueAbc123456789xyz', 'Nguyễn Thị Thúy', '0901234567', 'client'),
('hoang.pham@gmail.com', '$2b$10$placeholderHashValueDef456789012uvw', 'Phạm Văn Hoàng', '0912345678', 'client'),
('mai.le@gmail.com', '$2b$10$placeholderHashValueGhi789012345rst', 'Lê Thị Mai', '0923456789', 'client')
ON CONFLICT (email) DO NOTHING;

-- ------------------------------------------------------------
-- Chèn dữ liệu Đặt Lịch Hẹn
-- ------------------------------------------------------------
INSERT INTO bookings (user_id, pet_type, pet_name, service_id, expert_id, booking_date, time_slot, price, status, notes, contact_phone) VALUES
(2, 'Chó', 'Mít', 'ser1', 'exp2', '2026-07-02', '09:30', 250000, 'upcoming', 'Bé khá nhạy cảm với tiếng máy sấy, vui lòng nhẹ tay.', '0901234567'),
(2, 'Mèo', 'Kẹo', 'ser3', 'exp4', '2026-07-05', '14:00', 500000, 'upcoming', 'Khám sức khỏe định kỳ 6 tháng.', '0901234567'),
(3, 'Chó', 'Lu', 'ser2', NULL, '2026-06-20', '08:00', 350000, 'completed', 'Lưu trú 3 ngày trong lúc gia đình đi công tác.', '0912345678'),
(3, 'Chó', 'Lu', 'ser1', 'exp3', '2026-06-10', '10:00', 250000, 'completed', NULL, '0912345678'),
(4, 'Thỏ', 'Bông', 'ser3', 'exp4', '2026-06-15', '11:30', 500000, 'cancelled', 'Khách hủy do trùng lịch cá nhân.', '0923456789'),
(NULL, 'Mèo', 'Miu', 'ser1', 'exp2', '2026-07-10', '15:30', 250000, 'upcoming', 'Đặt lịch không cần đăng nhập (khách vãng lai).', '0934567890');

-- ------------------------------------------------------------
-- Chèn dữ liệu Tin Tức & Cẩm Nang
-- ------------------------------------------------------------
INSERT INTO articles (id, title, summary, content, image, published_at) VALUES
('british-shorthair-care', 'Cẩm Nang Chăm Sóc Mèo Anh Lông Ngắn', 'Những điều cần biết về dinh dưỡng, vận động và chăm sóc lông cho mèo Anh lông ngắn.', 'Mèo Anh lông ngắn (British Shorthair) là giống mèo có thân hình chắc khỏe, tính cách điềm tĩnh và dễ thích nghi. Để chăm sóc tốt, chủ nuôi cần chú trọng chế độ ăn giàu protein, kiểm soát cân nặng vì giống mèo này dễ béo phì, đồng thời chải lông định kỳ 1-2 lần mỗi tuần để hạn chế rụng lông và bết lông. Ngoài ra nên đưa mèo đi khám sức khỏe định kỳ 6 tháng/lần.', 'https://lh3.googleusercontent.com/aida-public/article1.png', '2026-05-10 09:00:00'),
('dog-training-basics', 'Hướng Dẫn Huấn Luyện Chó Cơ Bản Cho Người Mới', 'Các bước nền tảng giúp thú cưng nghe lời và hình thành thói quen tốt từ sớm.', 'Huấn luyện chó cơ bản nên bắt đầu từ những lệnh đơn giản như ngồi, nằm, và đứng yên trước khi chuyển sang các bài tập phức tạp hơn. Việc sử dụng phần thưởng (thức ăn, lời khen) đúng thời điểm sẽ giúp thú cưng ghi nhớ hành vi nhanh hơn. Kiên nhẫn và lặp lại đều đặn mỗi ngày trong 10-15 phút là yếu tố quan trọng nhất.', 'https://lh3.googleusercontent.com/aida-public/article2.png', '2026-05-18 10:30:00'),
('pet-nutrition-guide', 'Dinh Dưỡng Cho Thú Cưng Theo Từng Giai Đoạn', 'So sánh nhu cầu dinh dưỡng giữa thú cưng con, trưởng thành và cao tuổi.', 'Nhu cầu dinh dưỡng của thú cưng thay đổi theo từng giai đoạn phát triển. Thú cưng con cần lượng protein và canxi cao để hỗ trợ phát triển xương và cơ bắp, trong khi thú cưng trưởng thành cần chế độ ăn cân bằng để duy trì cân nặng lý tưởng. Đối với thú cưng cao tuổi, nên ưu tiên thực phẩm dễ tiêu hóa và bổ sung glucosamine cho khớp.', 'https://lh3.googleusercontent.com/aida-public/article3.png', '2026-06-01 08:15:00')
ON CONFLICT (id) DO NOTHING;

COMMIT;

-- ============================================================
-- KIỂM TRA NHANH SAU KHI CHẠY (Có thể chạy riêng để verify)
-- ============================================================
-- SELECT * FROM users;
-- SELECT * FROM services;
-- SELECT * FROM experts;
-- SELECT * FROM bookings;
-- SELECT * FROM articles;
