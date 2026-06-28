import mssql from 'mssql';

// ============================================================================
// MICROSOFT SQL SERVER CONFIGURATION
// ============================================================================
const mssqlConfig: mssql.config = {
  user: process.env.SQL_SERVER_USER || process.env.SQL_USER || 'sa',
  password: process.env.SQL_SERVER_PASSWORD || process.env.SQL_PASSWORD || '',
  server: process.env.SQL_SERVER_HOST || process.env.SQL_HOST || 'localhost',
  database: process.env.SQL_SERVER_DB_NAME || process.env.SQL_DB_NAME || 'PawHome',
  port: parseInt(process.env.SQL_SERVER_PORT || process.env.SQL_PORT || '1433'),
  options: {
    encrypt: process.env.SQL_SERVER_ENCRYPT === 'true',
    trustServerCertificate: true, // For self-signed certificates in local setups
  },
  connectionTimeout: 8000,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

let pool: mssql.ConnectionPool | null = null;
let isUsingFallback = false;

// Lazy initialize and return the SQL Server connection pool
export async function getSqlPool(): Promise<mssql.ConnectionPool | null> {
  if (isUsingFallback) return null;
  if (pool) return pool;

  try {
    console.log(`Attempting to connect to SQL Server at ${mssqlConfig.server}:${mssqlConfig.port}...`);
    pool = await mssql.connect(mssqlConfig);
    console.log('Successfully connected to Microsoft SQL Server database.');
    return pool;
  } catch (err) {
    console.warn('Could not connect to MS SQL Server. Falling back to robust in-memory database.');
    console.warn('Reason:', (err as Error).message);
    isUsingFallback = true;
    return null;
  }
}

// ============================================================================
// IN-MEMORY DATABASE FALLBACK (Pre-seeded with pawhome_full_database.sql data)
// ============================================================================
const memoryDb = {
  customers: [
    {
      id: 1,
      email: 'thuy.nguyen@gmail.com',
      password_hash: '$2b$10$placeholderHashValueAbc123456789xyz',
      full_name: 'Nguyễn Thị Thúy',
      phone: '0901234567',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      address: '123 Đường Ba Tháng Hai, Quận 10, TP. Hồ Chí Minh',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      email: 'hoang.pham@gmail.com',
      password_hash: '$2b$10$placeholderHashValueHoangPham123456',
      full_name: 'Phạm Minh Hoàng',
      phone: '0912345678',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      address: '456 Lê Duẩn, Quận 1, TP. Hồ Chí Minh',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      email: 'mai.le@gmail.com',
      password_hash: '$2b$10$placeholderHashValueMaiLe789012',
      full_name: 'Lê Thị Tuyết Mai',
      phone: '0923456789',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      address: '789 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ],
  admins: [
    {
      id: 1,
      email: 'admin@pawhome.vn',
      password_hash: '$2b$10$placeholderAdminHashValueAdmin123456',
      full_name: 'Quản Trị Viên PawHome',
      phone: '0900000000',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      permission_level: 'super_admin',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ],
  experts: [
    {
      id: 'exp1',
      email: 'minhtuan.expert@pawhome.vn',
      password_hash: '$2b$10$placeholderExpertHashValueMinhTuan123',
      name: 'Dr. Minh Tuấn',
      title: 'Chuyên gia tâm lý thú cưng',
      phone: '0934111222',
      rating: 4.9,
      reviews_count: 124,
      image: 'https://lh3.googleusercontent.com/aida-public/exp1.png',
      tags: ['Tâm lý học', 'Huấn luyện chuyên sâu', 'Chó', 'Mèo'],
      is_active: true
    },
    {
      id: 'exp2',
      email: 'lanhuong.expert@pawhome.vn',
      password_hash: '$2b$10$placeholderExpertHashValueLanHuong456',
      name: 'Chị Lan Hương',
      title: 'Grooming & Spa Artist',
      phone: '0934222333',
      rating: 5.0,
      reviews_count: 89,
      image: 'https://lh3.googleusercontent.com/aida-public/exp2.png',
      tags: ['Tắm rửa', 'Chăm sóc lông', 'Tạo kiểu thẩm mỹ', 'Mèo', 'Chó'],
      is_active: true
    },
    {
      id: 'exp3',
      email: 'quocbao.expert@pawhome.vn',
      password_hash: '$2b$10$placeholderExpertHashValueQuocBao789',
      name: 'Anh Quốc Bảo',
      title: 'Huấn luyện viên K9',
      phone: '0934333444',
      rating: 4.8,
      reviews_count: 210,
      image: 'https://lh3.googleusercontent.com/aida-public/exp3.png',
      tags: ['Huấn luyện K9', 'Kỷ luật & Phản xạ', 'Chó'],
      is_active: true
    },
    {
      id: 'exp4',
      email: null,
      password_hash: null,
      name: 'Bác sĩ Mỹ Linh',
      title: 'Nội khoa & Dinh dưỡng',
      phone: '0934444555',
      rating: 4.9,
      reviews_count: 156,
      image: 'https://lh3.googleusercontent.com/aida-public/exp4.png',
      tags: ['Nội khoa', 'Khám tổng quát', 'Khẩu phần ăn', 'Tất cả các loài'],
      is_active: true
    }
  ],
  services: [
    {
      id: 'ser1',
      name: 'Cắt Tỉa Thẩm Mỹ',
      description: 'Quy trình 7 bước bao gồm tắm, sấy, vệ sinh tai và tạo kiểu chuyên nghiệp theo yêu cầu.',
      base_price: 250000,
      image: 'https://lh3.googleusercontent.com/aida-public/ser1.png',
      tagline: 'DỊCH VỤ TIÊU ĐIỂM PAWHOME',
      subtitle: '& Spa Nghệ Thuật',
      hero_description: 'Hệ thống trị liệu tái tạo rực rỡ từ cội nguồn vạn vật – Nơi trao gửi yêu thương toàn mỹ bằng quy trình 7 bước thư giãn và tinh hoa tạo kiểu đỉnh cao từ thợ lành nghề chuyên nghiệp bậc nhất.',
      rating: 5.0,
      reviews_count: 1420,
      cta_primary: { label: 'Đặt lịch Spa ngay', action: 'book_service:ser1' },
      cta_secondary: { label: 'Bảng giá chi tiết', action: 'scroll_to_pricing' },
      highlights: [
        { icon: 'shield', title: 'Mỹ Phẩm Cao Cấp Hữu Cơ', description: '100% sữa tắm, gel dưỡng lông đạt chứng nhận hữu cơ cao cấp nhập khẩu từ châu Âu. Không gây cay mắt bé, dịu nhẹ tối đa cho làn da nhạy cảm nhất.' },
        { icon: 'clock', title: 'Làm Đẹp Không Gây Stress', description: 'Quy trình áp dụng liệu pháp âm nhạc thư giãn sóng Alpha cùng kỹ thuật dỗ dành thấu hiểu tâm lý thú cưng, giúp giảm 90% sự lo âu căng thẳng cho bé cưng.' },
        { icon: 'user-check', title: 'Nghệ Nhân Artist Tận Tâm', description: 'Đội ngũ thợ tỉa chuyên nghiệp trải qua hơn 400 giờ đào tạo nâng cao. Am hiểu chi tiết các đường tỉa nghệ thuật như tỉa tròn Hàn Quốc, tỉa nơ thắt eo hoàng gia.' }
      ],
      process_steps: [
        { step: '01', title: 'Kiểm tra da & lông', description: 'Bác sĩ hoặc chuyên viên sẽ kiểm tra bề mặt da, lông của bé để phát hiện nấm, ve rận hoặc các kích ứng nhạy cảm nhằm tư vấn loại dầu tắm phù hợp.' },
        { step: '02', title: 'Vệ sinh tai & Cắt móng', description: 'Vặt tuyến hôi, làm sạch bụi bẩn tích tụ trong tai để ngừa viêm nhiễm, mài mịn móng tránh cào xước da khi bé đùa nghịch.' },
        { step: '03', title: 'Chải gỡ rối & Loại lông chết', description: 'Sử dụng lược chuyên dụng chải chuốt nhẹ nhàng giúp gỡ bỏ hoàn toàn những phần lông xơ, rối và mát-xa tuần hoàn da nuôi dưỡng lông mới.' },
        { step: '04', title: 'Tắm massage & Spa tinh dầu', description: 'Tắm 2 lần nước ấm với sữa tắm thảo dược dưỡng lông cao cấp nhập khẩu từ Nhật Bản/Pháp kết hợp kỹ thuật massage thư giãn sâu.' },
        { step: '05', title: 'Sấy ion âm khử tĩnh điện', description: 'Sấy nhiệt độ vừa phải kết hợp thổi gió ion âm chuyên nghiệp giữ cho các sợi lông có độ phồng quyến rũ và không bị xơ khô gãy rụng.' },
        { step: '06', title: 'Cắt tỉa & Tạo kiểu nghệ thuật', description: 'Được trực tiếp thực hiện bởi các Artist tay nghề cao (như chị Lan Hương) cắt tỉa phom tròn Hàn Quốc, gấu Teddy, bông tuyết xòe điệu đà theo yêu cầu.' },
        { step: '07', title: 'Thoa xịt dưỡng & Nước hoa thảo mộc', description: 'Phủ lớp dầu dưỡng tăng độ bóng mượt vượt trội và xịt nước hoa hữu cơ chiết xuất hoa hồng/oải hương dịu nhẹ lưu hương thơm mát suốt cả tuần.' }
      ],
      process_note: 'Mát-xa chuyên sâu miễn phí: Tất cả các gói tắm đều đi kèm với 10 phút xoa bóp huyệt và xả mệt mỏi toàn thân.',
      pricing: {
        'Bé nhỏ (Dưới 5kg)': [
          { name: 'TẮM SPA THƯ GIÃN', price: 200000, duration_minutes: 60, features: ['Tắm mát-xa tiêu chuẩn', 'Sấy khô chải lông', 'Cắt tỉa móng cơ bản', 'Vắt tuyến hôi'], cta: 'Chọn gói cơ bản' },
          { name: 'VIP TẬP TRUNG TẠO KIỂU', price: 350000, duration_minutes: 90, features: ['Spa tinh dầu organic phục hồi', 'Sấy suôn phồng ion âm', 'Vệ sinh tai chuyên sâu', 'Cắt tỉa tạo kiểu nghệ thuật Hàn Quốc', 'Dưỡng ẩm phủ bóng tơ tằm', 'Xịt nước hoa lưu hương 7 ngày'], cta: 'Đặt lịch gói VIP Art' }
        ],
        'Bé vừa (5-12kg)': [
          { name: 'TẮM SPA THƯ GIÃN', price: 250000, duration_minutes: 70, features: ['Tắm mát-xa tiêu chuẩn', 'Sấy khô chải lông', 'Cắt tỉa móng cơ bản', 'Vắt tuyến hôi'], cta: 'Chọn gói cơ bản' },
          { name: 'VIP TẬP TRUNG TẠO KIỂU', price: 420000, duration_minutes: 100, features: ['Spa tinh dầu organic phục hồi', 'Sấy suôn phồng ion âm', 'Vệ sinh tai chuyên sâu', 'Cắt tỉa tạo kiểu nghệ thuật Hàn Quốc', 'Dưỡng ẩm phủ bóng tơ tằm', 'Xịt nước hoa lưu hương 7 ngày'], cta: 'Đặt lịch gói VIP Art' }
        ],
        'Bé lớn (Trên 12kg)': [
          { name: 'TẮM SPA THƯ GIÃN', price: 300000, duration_minutes: 80, features: ['Tắm mát-xa tiêu chuẩn', 'Sấy khô chải lông', 'Cắt tỉa móng cơ bản', 'Vắt tuyến hôi'], cta: 'Chọn gói cơ bản' },
          { name: 'VIP TẬP TRUNG TẠO KIỂU', price: 500000, duration_minutes: 110, features: ['Spa tinh dầu organic phục hồi', 'Sấy suôn phồng ion âm', 'Vệ sinh tai chuyên sâu', 'Cắt tỉa tạo kiểu nghệ thuật Hàn Quốc', 'Dưỡng ẩm phủ bóng tơ tằm', 'Xịt nước hoa lưu hương 7 ngày'], cta: 'Đặt lịch gói VIP Art' }
        ]
      }
    },
    {
      id: 'ser2',
      name: 'Lưu Trú Cao Cấp',
      description: 'Phòng máy lạnh, camera 24/7, thực đơn tùy chỉnh và thời gian vui chơi mỗi ngày.',
      base_price: 350000,
      image: 'https://lh3.googleusercontent.com/aida-public/ser2.png',
      tagline: 'DỊCH VỤ TIÊU ĐIỂM PAWHOME',
      subtitle: '& Nghỉ Dưỡng Cao Cấp',
      hero_description: 'Không gian nghỉ dưỡng 5 sao dành riêng cho thú cưng – Nơi bé vui chơi, nghỉ ngơi và được yêu thương như ở nhà, dù bạn đang ở bất cứ đâu.',
      rating: 5.0,
      reviews_count: 980,
      cta_primary: { label: 'Đặt lịch lưu trú', action: 'book_service:ser2' },
      cta_secondary: { label: 'Bảng giá chi tiết', action: 'scroll_to_pricing' },
      highlights: [
        { icon: 'shield', title: 'Phòng Nghỉ Tiêu Chuẩn Khách Sạn', description: 'Phòng máy lạnh 24/7, cách âm, khử khuẩn hàng ngày, nệm êm và đồ chơi riêng cho từng bé.' },
        { icon: 'clock', title: 'Camera Giám Sát Trực Tiếp', description: 'Theo dõi bé mọi lúc qua app, nhận thông báo ăn-ngủ-chơi để bạn an tâm tuyệt đối dù ở xa.' },
        { icon: 'user-check', title: 'Nhân Viên Chăm Sóc Tận Tâm', description: 'Đội ngũ chăm sóc trải qua hơn 300 giờ đào tạo, tỷ lệ 1 nhân viên / 5 bé để đảm bảo sự quan tâm sát sao.' }
      ],
      process_steps: [
        { step: '01', title: 'Tiếp nhận & Kiểm tra sức khỏe', description: 'Nhân viên kiểm tra tình trạng sức khỏe, lịch sử tiêm phòng và ghi nhận thói quen ăn uống, sinh hoạt của bé.' },
        { step: '02', title: 'Bố trí phòng nghỉ', description: 'Bé được dẫn vào phòng phù hợp with kích thước, tính cách và nhu cầu riêng (yên tĩnh, năng động, hoặc cần chăm sóc đặc biệt).' },
        { step: '03', title: 'Thiết lập lịch ăn & vận động', description: 'Thiết lập khung giờ ăn theo đúng thực đơn/thói quen tại nhà, kết hợp 2 buổi vận động ngoài sân mỗi ngày.' },
        { step: '04', title: 'Giám sát 24/7', description: 'Camera AI và nhân viên trực ca theo dõi liên tục, phát hiện sớm dấu hiệu bất thường về sức khỏe hoặc hành vi.' },
        { step: '05', title: 'Vui chơi & tương tác', description: 'Bé được tham gia các hoạt động nhóm, đồ chơi vận động và thời gian tương tác riêng với nhân viên mỗi ngày.' },
        { step: '06', title: 'Báo cáo & trả bé', description: 'Gửi báo cáo hình ảnh/video hàng ngày qua app; khi đón bé, nhân viên bàn giao kèm nhận xét tình trạng sức khỏe và sinh hoạt.' }
      ],
      process_note: 'Cập nhật hình ảnh miễn phí: Mỗi ngày lưu trú đều kèm 2 lần gửi ảnh/video cập nhật tình trạng của bé qua Zalo hoặc app.',
      pricing: {
        'Bé nhỏ (Dưới 5kg)': [
          { name: 'PHÒNG TIÊU CHUẨN', price: 180000, features: ['Phòng máy lạnh 24/7', 'Khử khuẩn hàng ngày', '2 bữa ăn tiêu chuẩn', '1 lần dạo/ngày', 'Cập nhật ảnh mỗi ngày'], cta: 'Chọn gói tiêu chuẩn' },
          { name: 'PHÒNG VIP', price: 320000, features: ['Tất cả tiện ích Tiêu chuẩn', 'Camera giám sát riêng qua app', '3 bữa ăn tiêu chuẩn', 'Đồ chơi & nệm cao cấp', 'Vận động 2 lần/ngày', 'Ưu tiên đặt lịch lễ tết'], cta: 'Đặt lịch gói VIP' }
        ],
        'Bé vừa (5-12kg)': [
          { name: 'PHÒNG TIÊU CHUẨN', price: 230000, features: ['Phòng máy lạnh 24/7', 'Khử khuẩn hàng ngày', '2 bữa ăn tiêu chuẩn', '1 lần dạo/ngày', 'Cập nhật ảnh mỗi ngày'], cta: 'Chọn gói tiêu chuẩn' },
          { name: 'PHÒNG VIP', price: 380000, features: ['Tất cả tiện ích Tiêu chuẩn', 'Camera giám sát riêng qua app', '3 bữa ăn tiêu chuẩn', 'Đồ chơi & nệm cao cấp', 'Vận động 2 lần/ngày', 'Ưu tiên đặt lịch lễ tết'], cta: 'Đặt lịch gói VIP' }
        ],
        'Bé lớn (Trên 12kg)': [
          { name: 'PHÒNG TIÊU CHUẨN', price: 280000, features: ['Phòng máy lạnh 24/7', 'Khử khuẩn hàng ngày', '2 bữa ăn tiêu chuẩn', '1 lần dạo/ngày', 'Cập nhật ảnh mỗi ngày'], cta: 'Chọn gói tiêu chuẩn' },
          { name: 'PHÒNG VIP', price: 450000, features: ['Tất cả tiện ích Tiêu chuẩn', 'Camera giám sát riêng qua app', '3 bữa ăn tiêu chuẩn', 'Đồ chơi & nệm cao cấp', 'Vận động 2 lần/ngày', 'Ưu tiên đặt lịch lễ tết'], cta: 'Đặt lịch gói VIP' }
        ]
      }
    },
    {
      id: 'ser3',
      name: 'Khám Tổng Quát',
      description: 'Kiểm tra toàn diện sức khỏe, tầm soát bệnh lý và tư vấn dinh dưỡng cùng chuyên gia.',
      base_price: 500000,
      image: 'https://lh3.googleusercontent.com/aida-public/ser3.png',
      tagline: 'DỊCH VỤ TIÊU ĐIỂM PAWHOME',
      subtitle: '& Tư Vấn Dinh Dưỡng',
      hero_description: 'Chăm sóc sức khỏe toàn diện cho thú cưng cùng đội ngũ bác sĩ thú y giàu kinh nghiệm – Phát hiện sớm, điều trị đúng, an tâm lâu dài.',
      rating: 4.9,
      reviews_count: 1560,
      cta_primary: { label: 'Đặt lịch khám ngay', action: 'book_service:ser3' },
      cta_secondary: { label: 'Bảng giá chi tiết', action: 'scroll_to_pricing' },
      highlights: [
        { icon: 'shield', title: 'Trang Thiết Bị Y Tế Hiện Đại', description: 'Máy xét nghiệm máu, siêu âm và X-quang chuẩn quốc tế giúp chẩn đoán nhanh và chính xác.' },
        { icon: 'clock', title: 'Đặt Lịch Linh Hoạt, Ít Chờ Đợi', description: 'Hệ thống đặt lịch theo khung giờ giúp giảm thời gian chờ, hạn chế stress cho thú cưng khi đến khám.' },
        { icon: 'user-check', title: 'Bác Sĩ Thú Y Tận Tâm', description: 'Đội ngũ bác sĩ có chứng chỉ chuyên môn, trên 5 năm kinh nghiệm điều trị nội khoa và dinh dưỡng thú cưng.' }
      ],
      process_steps: [
        { step: '01', title: 'Khai báo tiền sử bệnh', description: 'Chủ nuôi cung cấp thông tin về thói quen ăn uống, tiền sử bệnh lý và các dấu hiệu bất thường gần đây của bé.' },
        { step: '02', title: 'Khám tổng quát', description: 'Bác sĩ kiểm tra cân nặng, nhiệt độ, nhịp tim, tình trạng da-lông, mắt-tai-miệng để đánh giá sức khỏe tổng thể.' },
        { step: '03', title: 'Xét nghiệm chuyên sâu (nếu cần)', description: 'Thực hiện xét nghiệm máu, siêu âm hoặc X-quang để tầm soát các bệnh lý tiềm ẩn theo chỉ định của bác sĩ.' },
        { step: '04', title: 'Tư vấn kết quả & dinh dưỡng', description: 'Bác sĩ giải thích chi tiết kết quả khám, đưa ra phác đồ điều trị (nếu có) và tư vấn chế độ ăn phù hợp.' },
        { step: '05', title: 'Kê đơn & hẹn tái khám', description: 'Cập nhật đơn thuốc (nếu cần điều trị) và lên lịch tái khám để theo dõi tiến triển sức khỏe của bé.' }
      ],
      process_note: 'Tư vấn dinh dưỡng miễn phí: Mỗi lượt khám tổng quát đều kèm 15 phút tư vấn chế độ ăn theo độ tuổi và tình trạng sức khỏe.',
      pricing: {
        'Bé nhỏ (Dưới 5kg)': [
          { name: 'KHÁM CƠ BẢN', price: 200000, duration_minutes: 30, features: ['Khám tổng quát', 'Đo cân nặng & nhiệt độ', 'Tư vấn dinh dưỡng cơ bản', 'Sổ khám sức khỏe điện tử'], cta: 'Chọn gói cơ bản' },
          { name: 'KHÁM CHUYÊN SÂU', price: 500000, duration_minutes: 60, features: ['Tất cả hạng mục Cơ bản', 'Xét nghiệm máu tổng quát', 'Siêu âm bụng tổng quát', 'Tư vấn dinh dưỡng chuyên sâu', 'Hẹn tái khám miễn phí (trong 7 ngày)'], cta: 'Đặt lịch khám chuyên sâu' }
        ],
        'Bé vừa (5-12kg)': [
          { name: 'KHÁM CƠ BẢN', price: 250000, duration_minutes: 35, features: ['Khám tổng quát', 'Đo cân nặng & nhiệt độ', 'Tư vấn dinh dưỡng cơ bản', 'Sổ khám sức khỏe điện tử'], cta: 'Chọn gói cơ bản' },
          { name: 'KHÁM CHUYÊN SÂU', price: 600000, duration_minutes: 70, features: ['Tất cả hạng mục Cơ bản', 'Xét nghiệm máu tổng quát', 'Siêu âm bụng tổng quát', 'Tư vấn dinh dưỡng chuyên sâu', 'Hẹn tái khám miễn phí (trong 7 ngày)'], cta: 'Đặt lịch khám chuyên sâu' }
        ],
        'Bé lớn (Trên 12kg)': [
          { name: 'KHÁM CƠ BẢN', price: 300000, duration_minutes: 40, features: ['Khám tổng quát', 'Đo cân nặng & nhiệt độ', 'Tư vấn dinh dưỡng cơ bản', 'Sổ khám sức khỏe điện tử'], cta: 'Chọn gói cơ bản' },
          { name: 'KHÁM CHUYÊN SÂU', price: 700000, duration_minutes: 80, features: ['Tất cả hạng mục Cơ bản', 'Xét nghiệm máu tổng quát', 'Siêu âm bụng tổng quát', 'Tư vấn dinh dưỡng chuyên sâu', 'Hẹn tái khám miễn phí (trong 7 ngày)'], cta: 'Đặt lịch khám chuyên sâu' }
        ]
      }
    },
    {
      id: 'ser4',
      name: 'Huấn Luyện',
      description: 'Xây dựng thói quen tốt thông qua các bài tập tương tác tích cực, không la mắng, không roi vọt.',
      base_price: 300000,
      image: 'https://lh3.googleusercontent.com/aida-public/ser4.png',
      tagline: 'DỊCH VỤ TIÊU ĐIỂM PAWHOME',
      subtitle: '& Uốn Nắn Hành Vi',
      hero_description: 'Xây dựng thói quen tốt và sự gắn kết bền chặt giữa bé và gia đình – Thông qua phương pháp huấn luyện tích cực, không la mắng, không roi vọt.',
      rating: 4.8,
      reviews_count: 640,
      cta_primary: { label: 'Đặt lịch huấn luyện', action: 'book_service:ser4' },
      cta_secondary: { label: 'Bảng giá chi tiết', action: 'scroll_to_pricing' },
      highlights: [
        { icon: 'shield', title: 'Phương Pháp Khoa Học', description: 'Áp dụng kỹ thuật Positive Reinforcement (khen thưởng tích cực) được chứng nhận quốc tế, an toàn cho tâm lý bé.' },
        { icon: 'clock', title: 'Lộ Trình Cá Nhân Hóa', description: 'Mỗi bé có giáo án riêng theo độ tuổi, giống loài và tính cách, tiến độ rõ ràng theo từng buổi.' },
        { icon: 'user-check', title: 'Huấn Luyện Viên K9 Chuyên Nghiệp', description: 'Đội ngũ HLV được đào tạo bài bản, từng huấn luyện chó nghiệp vụ và chó cảnh các cấp độ.' }
      ],
      process_steps: [
        { step: '01', title: 'Đánh giá tính cách & hành vi', description: 'HLV quan sát và đánh giá mức độ phản xạ, tính cách (nhút nhát/hung hăng/năng động) để xây dựng giáo án phù hợp.' },
        { step: '02', title: 'Xây dựng lộ trình huấn luyện', description: 'Lập kế hoạch buổi học theo mục tiêu cụ thể: vâng lời cơ bản, sửa hành vi xấu, hoặc kỹ năng nâng cao.' },
        { step: '03', title: 'Huấn luyện lệnh cơ bản', description: 'Dạy các lệnh nền tảng: ngồi, nằm, đứng yên, đi cạnh chân – kết hợp khen thưởng ngay khi bé thực hiện đúng.' },
        { step: '04', title: 'Sửa hành vi & kỷ luật phản xạ', description: 'Áp dụng bài tập chuyên biệt để khắc phục hành vi không mong muốn như sủa quá mức, cắn phá, kéo dây xích.' },
        { step: '05', title: 'Tổng kết & hướng dẫn chủ nuôi', description: 'HLV hướng dẫn chủ nuôi cách duy trì kết quả huấn luyện tại nhà, đảm bảo bé giữ được thói quen tốt lâu dài.' }
      ],
      process_note: 'Cam kết tiến độ: Nếu sau 5 buổi không thấy cải thiện rõ rệt, PawHome hỗ trợ thêm 2 buổi miễn phí.',
      pricing: {
        'Bé nhỏ (Dưới 5kg)': [
          { name: 'CƠ BẢN (1 buổi)', price: 300000, duration_minutes: 45, features: ['Huấn luyện lệnh cơ bản', 'Đánh giá tính cách ban đầu', 'Hướng dẫn chủ nuôi sau buổi học'], cta: 'Đặt 1 buổi trải nghiệm' },
          { name: 'TRỌN GÓI NÂNG CAO (8 buổi)', price: 2000000, duration_minutes: 45, features: ['Tất cả nội dung Cơ bản', 'Sửa hành vi chuyên sâu', 'Giáo án cá nhân hóa theo bé', 'Theo dõi tiến độ qua app', 'Hỗ trợ thêm buổi nếu chưa đạt mục tiêu'], cta: 'Đặt lịch gói trọn khóa' }
        ],
        'Bé vừa (5-12kg)': [
          { name: 'CƠ BẢN (1 buổi)', price: 350000, duration_minutes: 50, features: ['Huấn luyện lệnh cơ bản', 'Đánh giá tính cách ban đầu', 'Hướng dẫn chủ nuôi sau buổi học'], cta: 'Đặt 1 buổi trải nghiệm' },
          { name: 'TRỌN GÓI NÂNG CAO (8 buổi)', price: 2400000, duration_minutes: 50, features: ['Tất cả nội dung Cơ bản', 'Sửa hành vi chuyên sâu', 'Giáo án cá nhân hóa theo bé', 'Theo dõi tiến độ qua app', 'Hỗ trợ thêm buổi nếu chưa đạt mục tiêu'], cta: 'Đặt lịch gói trọn khóa' }
        ],
        'Bé lớn (Trên 12kg)': [
          { name: 'CƠ BẢN (1 buổi)', price: 400000, duration_minutes: 60, features: ['Huấn luyện lệnh cơ bản', 'Đánh giá tính cách ban đầu', 'Hướng dẫn chủ nuôi sau buổi học'], cta: 'Đặt 1 buổi trải nghiệm' },
          { name: 'TRỌN GÓI NÂNG CAO (8 buổi)', price: 2800000, duration_minutes: 60, features: ['Tất cả nội dung Cơ bản', 'Sửa hành vi chuyên sâu', 'Giáo án cá nhân hóa theo bé', 'Theo dõi tiến độ qua app', 'Hỗ trợ thêm buổi nếu chưa đạt mục tiêu'], cta: 'Đặt lịch gói trọn khóa' }
        ]
      }
    },
    {
      id: 'ser5',
      name: 'Dắt Chó Đi Dạo',
      description: 'Giúp bé vận động và giải tỏa năng lượng với lộ trình an toàn, thú vị.',
      base_price: 100000,
      image: 'https://lh3.googleusercontent.com/aida-public/ser5.png',
      tagline: 'DỊCH VỤ TIÊU ĐIỂM PAWHOME',
      subtitle: 'Đi Dạo Mỗi Ngày',
      hero_description: 'Giúp bé giải tỏa năng lượng, vận động lành mạnh và khám phá thế giới bên ngoài cùng người dẫn dắt chuyên nghiệp, an toàn trên từng lộ trình.',
      rating: 4.9,
      reviews_count: 1120,
      cta_primary: { label: 'Đặt lịch đi dạo', action: 'book_service:ser5' },
      cta_secondary: { label: 'Bảng giá chi tiết', action: 'scroll_to_pricing' },
      highlights: [
        { icon: 'shield', title: 'Lộ Trình An Toàn Đã Khảo Sát', description: 'Các tuyến đi dạo được chọn lọc kỹ, tránh khu vực đông xe cộ, đảm bảo an toàn tuyệt đối cho bé.' },
        { icon: 'clock', title: 'Theo Dõi Hành Trình Real-time', description: 'Chủ nuôi có thể theo dõi vị trí và lộ trình đi dạo của bé trực tiếp qua app trong suốt buổi đi.' },
        { icon: 'user-check', title: 'Người Dắt Am Hiểu Tâm Lý Chó', description: 'Đội ngũ pet sitter được huấn luyện xử lý tình huống, kiểm soát dây xích và phản ứng của bé với môi trường lạ.' }
      ],
      process_steps: [
        { step: '01', title: 'Đặt lịch & chọn khung giờ', description: 'Chủ nuôi chọn thời gian, địa điểm đón bé và lộ trình đi dạo mong muốn (công viên, khu dân cư, ven sông...).' },
        { step: '02', title: 'Đón bé & kiểm tra dây xích/vòng cổ', description: 'Người dắt đến đón bé tại nhà, kiểm tra dây xích, vòng cổ và tình trạng sức khỏe trước khi xuất phát.' },
        { step: '03', title: 'Khởi động nhẹ', description: 'Cho bé đi chậm 5 phút đầu để làm nóng cơ, tránh chấn thương trước khi vào lộ trình chính.' },
        { step: '04', title: 'Đi dạo theo lộ trình', description: 'Dẫn bé đi dạo theo tuyến đã chọn, kết hợp các điểm dừng để bé hít thở, quan sát và giải tỏa năng lượng.' },
        { step: '05', title: 'Trả bé & báo cáo hành trình', description: 'Bàn giao bé về nhà an toàn, gửi báo cáo quãng đường, thời gian và tình trạng bé sau buổi đi dạo.' }
      ],
      process_note: 'An toàn là ưu tiên số 1: Mỗi buổi đi dạo đều có bảo hiểm tai nạn cho thú cưng trong suốt hành trình.',
      pricing: {
        'Bé nhỏ (Dưới 5kg)': [
          { name: 'DẠO NGẮN', price: 100000, duration_minutes: 30, features: ['Lộ trình gần nhà', 'Theo dõi vị trí qua app', 'Báo cáo sau buổi đi'], cta: 'Chọn gói dạo ngắn' },
          { name: 'DẠO DÀI KHÁM PHÁ', price: 180000, duration_minutes: 60, features: ['Tất cả tiện ích Dạo ngắn', 'Lộ trình đa dạng (công viên, ven sông)', 'Nghỉ giữa chừng cho bé khám phá', 'Vệ sinh chân/lông sau khi về', 'Ưu tiên đặt lịch cố định hàng tuần'], cta: 'Đặt lịch dạo dài' }
        ],
        'Bé vừa (5-12kg)': [
          { name: 'DẠO NGẮN', price: 120000, duration_minutes: 30, features: ['Lộ trình gần nhà', 'Theo dõi vị trí qua app', 'Báo cáo sau buổi đi'], cta: 'Chọn gói dạo ngắn' },
          { name: 'DẠO DÀI KHÁM PHÁ', price: 200000, duration_minutes: 60, features: ['Tất cả tiện ích Dạo ngắn', 'Lộ trình đa dạng (công viên, ven sông)', 'Nghỉ giữa chừng cho bé khám phá', 'Vệ sinh chân/lông sau khi về', 'Ưu tiên đặt lịch cố định hàng tuần'], cta: 'Đặt lịch dạo dài' }
        ],
        'Bé lớn (Trên 12kg)': [
          { name: 'DẠO NGẮN', price: 150000, duration_minutes: 30, features: ['Lộ trình gần nhà', 'Theo dõi vị trí qua app', 'Báo cáo sau buổi đi'], cta: 'Chọn gói dạo ngắn' },
          { name: 'DẠO DÀI KHÁM PHÁ', price: 230000, duration_minutes: 60, features: ['Tất cả tiện ích Dạo ngắn', 'Lộ trình đa dạng (công viên, ven sông)', 'Nghỉ giữa chừng cho bé khám phá', 'Vệ sinh chân/lông sau khi về', 'Ưu tiên đặt lịch cố định hàng tuần'], cta: 'Đặt lịch dạo dài' }
        ]
      }
    },
    {
      id: 'ser6',
      name: 'Chăm Sóc Tại Nhà',
      description: 'Chăm sóc tận nơi khi bạn vắng nhà, đảm bảo bé luôn cảm thấy an tâm.',
      base_price: 150000,
      image: 'https://lh3.googleusercontent.com/aida-public/ser6.png',
      tagline: 'DỊCH VỤ TIÊU ĐIỂM PAWHOME',
      subtitle: 'Thú Cưng Tại Nhà',
      hero_description: 'Chăm sóc tận nơi khi bạn vắng nhà – Đảm bảo bé luôn được ăn đúng giờ, vui chơi đầy đủ và cảm thấy an tâm trong không gian quen thuộc.',
      rating: 4.9,
      reviews_count: 870,
      cta_primary: { label: 'Đặt lịch chăm sóc', action: 'book_service:ser6' },
      cta_secondary: { label: 'Bảng giá chi tiết', action: 'scroll_to_pricing' },
      highlights: [
        { icon: 'shield', title: 'Pet Sitter Được Xác Minh', description: 'Đội ngũ chăm sóc viên trải qua kiểm tra lý lịch và đào tạo nghiệp vụ trước khi nhận lịch tại nhà khách hàng.' },
        { icon: 'clock', title: 'Lịch Trình Linh Hoạt', description: 'Đặt lịch theo giờ, theo ngày hoặc trọn gói nhiều ngày khi gia đình đi công tác, du lịch dài hạn.' },
        { icon: 'user-check', title: 'Cập Nhật Tình Trạng Liên Tục', description: 'Gửi hình ảnh, video và báo cáo chi tiết sau mỗi lượt chăm sóc qua Zalo hoặc ứng dụng PawHome.' }
      ],
      process_steps: [
        { step: '01', title: 'Khảo sát nhu cầu & thói quen', description: 'Chủ nuôi cung cấp thông tin về giờ ăn, loại thức ăn, thói quen sinh hoạt và các lưu ý đặc biệt của bé.' },
        { step: '02', title: 'Ghép pet sitter phù hợp', description: 'PawHome chọn nhân viên chăm sóc phù hợp với loại thú cưng và khu vực sinh sống của khách hàng.' },
        { step: '03', title: 'Chăm sóc theo lịch đã đặt', description: 'Pet sitter đến đúng giờ, cho bé ăn, dọn vệ sinh khu vực sinh hoạt và chơi cùng bé theo thời gian đã đăng ký.' },
        { step: '04', title: 'Theo dõi sức khỏe & hành vi', description: 'Quan sát các dấu hiệu bất thường về ăn uống, tâm trạng; báo ngay cho chủ nuôi nếu phát hiện vấn đề.' },
        { step: '05', title: 'Gửi báo cáo sau mỗi lượt', description: 'Gửi hình ảnh/video kèm ghi chú chi tiết về tình trạng bé ngay sau khi hoàn thành buổi chăm sóc.' }
      ],
      process_note: 'Linh hoạt theo nhu cầu: Có thể đặt thêm dịch vụ tưới cây, nhận thư hoặc dọn nhà cơ bản trong cùng lượt ghé.',
      pricing: {
        'Bé nhỏ (Dưới 5kg)': [
          { name: 'THEO LƯỢT', price: 150000, duration_minutes: 45, features: ['Cho ăn đúng giờ', 'Dọn vệ sinh khu vực ở', 'Chơi cùng bé 15 phút', 'Gửi ảnh xác nhận'], cta: 'Đặt theo lượt' },
          { name: 'TRỌN GÓI THEO NGÀY', price: 450000, features: ['Tất cả tiện ích Theo lượt', '3 lượt ghé cố định mỗi ngày', 'Theo dõi sức khỏe liên tục', 'Báo cáo tổng kết cuối ngày', 'Ưu tiên hỗ trợ khẩn cấp 24/7'], cta: 'Đặt trọn gói theo ngày' }
        ],
        'Bé vừa (5-12kg)': [
          { name: 'THEO LƯỢT', price: 170000, duration_minutes: 45, features: ['Cho ăn đúng giờ', 'Dọn vệ sinh khu vực ở', 'Chơi cùng bé 15 phút', 'Gửi ảnh xác nhận'], cta: 'Đặt theo lượt' },
          { name: 'TRỌN GÓI THEO NGÀY', price: 500000, features: ['Tất cả tiện ích Theo lượt', '3 lượt ghé cố định mỗi ngày', 'Theo dõi sức khỏe liên tục', 'Báo cáo tổng kết cuối ngày', 'Ưu tiên hỗ trợ khẩn cấp 24/7'], cta: 'Đặt trọn gói theo ngày' }
        ],
        'Bé lớn (Trên 12kg)': [
          { name: 'THEO LƯỢT', price: 200000, duration_minutes: 45, features: ['Cho ăn đúng giờ', 'Dọn vệ sinh khu vực ở', 'Chơi cùng bé 15 phút', 'Gửi ảnh xác nhận'], cta: 'Đặt theo lượt' },
          { name: 'TRỌN GÓI THEO NGÀY', price: 550000, features: ['Tất cả tiện ích Theo lượt', '3 lượt ghé cố định mỗi ngày', 'Theo dõi sức khỏe liên tục', 'Báo cáo tổng kết cuối ngày', 'Ưu tiên hỗ trợ khẩn cấp 24/7'], cta: 'Đặt trọn gói theo ngày' }
        ]
      }
    },
    {
      id: 'ser7',
      name: 'Trị Liệu & Phục Hồi',
      description: 'Các liệu pháp vật lý trị liệu giúp bé nhanh chóng hồi phục sức khỏe.',
      base_price: 350000,
      image: 'https://lh3.googleusercontent.com/aida-public/ser7.png',
      tagline: 'DỊCH VỤ TIÊU ĐIỂM PAWHOME',
      subtitle: '& Phục Hồi Vận Động',
      hero_description: 'Hỗ trợ phục hồi nhanh sau chấn thương, phẫu thuật hoặc tuổi già – Các liệu pháp vật lý trị liệu chuyên sâu giúp bé khỏe mạnh và vận động tự tin trở lại.',
      rating: 4.9,
      reviews_count: 320,
      cta_primary: { label: 'Đặt lịch trị liệu', action: 'book_service:ser7' },
      cta_secondary: { label: 'Bảng giá chi tiết', action: 'scroll_to_pricing' },
      highlights: [
        { icon: 'shield', title: 'Thiết Bị Trị Liệu Chuyên Dụng', description: 'Bể thủy trị liệu, máy laser cấp độ thấp và thiết bị massage chuyên sâu hỗ trợ phục hồi cơ-xương-khớp.' },
        { icon: 'clock', title: 'Phác Đồ Theo Từng Giai Đoạn', description: 'Lộ trình trị liệu được điều chỉnh theo tiến độ phục hồi thực tế, đánh giá lại sau mỗi 3-5 buổi.' },
        { icon: 'user-check', title: 'Chuyên Viên Phục Hồi Chức Năng', description: 'Đội ngũ có chuyên môn vật lý trị liệu thú y, phối hợp chặt chẽ với bác sĩ điều trị chính của bé.' }
      ],
      process_steps: [
        { step: '01', title: 'Đánh giá tình trạng vận động', description: 'Chuyên viên kiểm tra khả năng vận động, mức độ đau và nguyên nhân (chấn thương, phẫu thuật, tuổi già, thoái hóa khớp).' },
        { step: '02', title: 'Xây dựng phác đồ trị liệu', description: 'Lập kế hoạch trị liệu phù hợp: thủy trị liệu, laser, massage trị liệu hoặc kết hợp nhiều phương pháp.' },
        { step: '03', title: 'Thực hiện liệu pháp vật lý', description: 'Tiến hành các bài tập và liệu pháp theo phác đồ, theo dõi sát phản ứng và mức độ chịu đựng của bé.' },
        { step: '04', title: 'Theo dõi tiến triển', description: 'Đánh giá lại khả năng vận động sau mỗi 3-5 buổi để điều chỉnh phác đồ phù hợp với tốc độ hồi phục.' },
        { step: '05', title: 'Hướng dẫn chăm sóc tại nhà', description: 'Hướng dẫn chủ nuôi các bài tập nhẹ và lưu ý sinh hoạt để duy trì hiệu quả trị liệu giữa các buổi.' }
      ],
      process_note: 'Phối hợp cùng bác sĩ điều trị: PawHome nhận hồ sơ bệnh án từ bệnh viện thú y để xây dựng phác đồ trị liệu phù hợp nhất.',
      pricing: {
        'Bé nhỏ (Dưới 5kg)': [
          { name: 'TRỊ LIỆU CƠ BẢN', price: 350000, duration_minutes: 40, features: ['Massage trị liệu cơ bản', 'Đánh giá vận động ban đầu', 'Hướng dẫn bài tập tại nhà'], cta: 'Đặt buổi trị liệu cơ bản' },
          { name: 'PHỤC HỒI CHUYÊN SÂU', price: 600000, duration_minutes: 60, features: ['Tất cả nội dung Cơ bản', 'Thủy trị liệu chuyên sâu', 'Trị liệu laser cấp độ thấp', 'Theo dõi tiến độ định kỳ', 'Báo cáo phối hợp với bác sĩ điều trị'], cta: 'Đặt lịch phục hồi chuyên sâu' }
        ],
        'Bé vừa (5-12kg)': [
          { name: 'TRỊ LIỆU CƠ BẢN', price: 400000, duration_minutes: 45, features: ['Massage trị liệu cơ bản', 'Đánh giá vận động ban đầu', 'Hướng dẫn bài tập tại nhà'], cta: 'Đặt buổi trị liệu cơ bản' },
          { name: 'PHỤC HỒI CHUYÊN SÂU', price: 700000, duration_minutes: 70, features: ['Tất cả nội dung Cơ bản', 'Thủy trị liệu chuyên sâu', 'Trị liệu laser cấp độ thấp', 'Theo dõi tiến độ định kỳ', 'Báo cáo phối hợp với bác sĩ điều trị'], cta: 'Đặt lịch phục hồi chuyên sâu' }
        ],
        'Bé lớn (Trên 12kg)': [
          { name: 'TRỊ LIỆU CƠ BẢN', price: 450000, duration_minutes: 50, features: ['Massage trị liệu cơ bản', 'Đánh giá vận động ban đầu', 'Hướng dẫn bài tập tại nhà'], cta: 'Đặt buổi trị liệu cơ bản' },
          { name: 'PHỤC HỒI CHUYÊN SÂU', price: 800000, duration_minutes: 80, features: ['Tất cả nội dung Cơ bản', 'Thủy trị liệu chuyên sâu', 'Trị liệu laser cấp độ thấp', 'Theo dõi tiến độ định kỳ', 'Báo cáo phối hợp with bác sĩ điều trị'], cta: 'Đặt lịch phục hồi chuyên sâu' }
        ]
      }
    },
    {
      id: 'ser8',
      name: 'Cửa Hàng Phụ Kiện',
      description: 'Cung cấp thức ăn, đồ chơi và phụ kiện cao cấp cho người bạn nhỏ.',
      base_price: 25000,
      image: 'https://lh3.googleusercontent.com/aida-public/ser8.png',
      tagline: 'DỊCH VỤ TIÊU ĐIỂM PAWHOME',
      subtitle: '& Dinh Dưỡng Cao Cấp',
      hero_description: 'Cung cấp thức ăn, đồ chơi và phụ kiện cao cấp được tuyển chọn kỹ lưỡng – Mọi điều tốt nhất dành cho người bạn nhỏ của bạn.',
      rating: 4.8,
      reviews_count: 2300,
      cta_primary: { label: 'Mua sắm ngay', action: 'browse_shop' },
      cta_secondary: { label: 'Xem danh mục sản phẩm', action: 'scroll_to_pricing' },
      highlights: [
        { icon: 'shield', title: 'Hàng Chính Hãng, Kiểm Định Chất Lượng', description: '100% sản phẩm nhập khẩu/phân phối chính hãng, có giấy kiểm định an toàn cho thú cưng.' },
        { icon: 'clock', title: 'Giao Hàng Nhanh Trong Ngày', description: 'Đặt hàng trước 14h, nhận hàng trong ngày tại khu vực nội thành – tiện lợi khi cần gấp.' },
        { icon: 'user-check', title: 'Tư Vấn Sản Phẩm Theo Nhu Cầu', description: 'Đội ngũ tư vấn am hiểu dinh dưỡng, giúp chọn đúng sản phẩm theo độ tuổi, giống loài và tình trạng sức khỏe.' }
      ],
      process_steps: [
        { step: '01', title: 'Tư vấn nhu cầu', description: 'Khách hàng chia sẻ thông tin về thú cưng (độ tuổi, giống, tình trạng sức khỏe) để được gợi ý sản phẩm phù hợp.' },
        { step: '02', title: 'Chọn sản phẩm', description: 'Duyệt danh mục thức ăn, đồ chơi, phụ kiện theo từng nhu cầu cụ thể: dinh dưỡng, vệ sinh, vận động, làm đẹp.' },
        { step: '03', title: 'Đặt hàng & thanh toán', description: 'Xác nhận đơn hàng và lựa chọn phương thức thanh toán linh hoạt (tiền mặt, chuyển khoản, ví điện tử).' },
        { step: '04', title: 'Đóng gói & giao hàng', description: 'Sản phẩm được kiểm tra kỹ và đóng gói cẩn thận trước khi giao đến tay khách hàng trong ngày.' },
        { step: '05', title: 'Hỗ trợ sau mua hàng', description: 'Hỗ trợ đổi trả trong 7 ngày nếu sản phẩm không phù hợp, kèm tư vấn sử dụng sau khi nhận hàng.' }
      ],
      process_note: 'Ưu đãi thành viên: Khách hàng đặt lịch dịch vụ tại PawHome được giảm 10% cho mọi đơn hàng phụ kiện.',
      pricing: {
        'Thức ăn & Dinh dưỡng': [
          { name: 'Hạt khô cao cấp', price: 180000, unit: 'kg', note: 'Nhập khẩu, theo độ tuổi & giống loài', cta: 'Xem danh mục thức ăn' },
          { name: 'Pate/Súp dinh dưỡng', price: 25000, unit: 'hộp', note: 'Bổ sung dưỡng chất, hỗ trợ tiêu hóa', cta: 'Xem danh mục thức ăn' }
        ],
        'Phụ kiện & Đồ chơi': [
          { name: 'Đồ chơi gặm cao cấp', price: 90000, unit: 'cái', note: 'An toàn, không hóa chất độc hại', cta: 'Xem phụ kiện cao cấp' },
          { name: 'Vòng cổ/Dây dắt cao cấp', price: 150000, unit: 'bộ', note: 'Chất liệu da/vải bền, chống nước', cta: 'Xem phụ kiện cao cấp' }
        ]
      }
    }
  ],
  articles: [
    {
      id: 'british-shorthair-care',
      title: 'Cẩm Nang Chăm Sóc Mèo Anh Lông Ngắn',
      summary: 'Những điều cần biết về dinh dưỡng, vận động và chăm sóc lông cho mèo Anh lông ngắn.',
      content: 'Mèo Anh lông ngắn (British Shorthair) là giống mèo có thân hình chắc khỏe, tính cách điềm tĩnh và dễ thích nghi. Để chăm sóc tốt, chủ nuôi cần chú trọng chế độ ăn giàu protein, kiểm soát cân nặng vì giống mèo này dễ béo phì, đồng thời chải lông định kỳ 1-2 lần mỗi tuần để hạn chế rụng lông và bết lông. Ngoài ra nên đưa mèo đi khám sức khỏe định kỳ 6 tháng/lần.',
      image: 'https://lh3.googleusercontent.com/aida-public/article1.png',
      author_admin_id: 1,
      published_at: new Date('2026-05-10T09:00:00Z')
    },
    {
      id: 'dog-training-basics',
      title: 'Hướng Dẫn Huấn Luyện Chó Cơ Bản Cho Người Mới',
      summary: 'Các bước nền tảng giúp thú cưng nghe lời và hình thành thói quen tốt từ sớm.',
      content: 'Huấn luyện chó cơ bản nên bắt đầu từ những lệnh đơn giản như ngồi, nằm, và đứng yên trước khi chuyển sang các bài tập phức tạp hơn. Việc sử dụng phần thưởng (thức ăn, lời khen) đúng thời điểm sẽ giúp thú cưng ghi nhớ hành vi nhanh hơn. Kiên nhẫn và lặp lại đều đặn mỗi ngày trong 10-15 phút là yếu tố quan trọng nhất.',
      image: 'https://lh3.googleusercontent.com/aida-public/article2.png',
      author_admin_id: 1,
      published_at: new Date('2026-05-18T10:30:00Z')
    },
    {
      id: 'pet-nutrition-guide',
      title: 'Dinh Dưỡng Cho Thú Cưng Theo Từng Giai Đoạn',
      summary: 'So sánh nhu cầu dinh dưỡng giữa thú cưng con, trưởng thành và cao tuổi.',
      content: 'Nhu cầu dinh dưỡng của thú cưng thay đổi theo từng giai đoạn phát triển. Thú cưng con cần lượng protein và canxi cao để hỗ trợ phát triển xương và cơ bắp, trong khi thú cưng trưởng thành cần chế độ ăn cân bằng để duy trì cân nặng lý tưởng. Đối với thú cưng cao tuổi, nên ưu tiên thực phẩm dễ tiêu hóa và bổ sung glucosamine cho khớp.',
      image: 'https://lh3.googleusercontent.com/aida-public/article3.png',
      author_admin_id: 1,
      published_at: new Date('2026-06-01T08:15:00Z')
    }
  ],
  bookings: [
    {
      id: 1,
      customer_id: 1,
      pet_type: 'Chó',
      pet_name: 'Mít',
      service_id: 'ser1',
      expert_id: 'exp2',
      booking_date: '2026-07-02',
      time_slot: '09:30',
      price: 250000,
      status: 'upcoming',
      notes: 'Bé khá nhạy cảm với tiếng máy sấy, vui lòng nhẹ tay.',
      contact_phone: '0901234567',
      created_at: new Date()
    },
    {
      id: 2,
      customer_id: 1,
      pet_type: 'Mèo',
      pet_name: 'Kẹo',
      service_id: 'ser3',
      expert_id: 'exp4',
      booking_date: '2026-07-05',
      time_slot: '14:00',
      price: 500000,
      status: 'upcoming',
      notes: 'Khám sức khỏe định kỳ 6 tháng.',
      contact_phone: '0901234567',
      created_at: new Date()
    },
    {
      id: 3,
      customer_id: 2,
      pet_type: 'Chó',
      pet_name: 'Lu',
      service_id: 'ser2',
      expert_id: null,
      booking_date: '2026-06-20',
      time_slot: '08:00',
      price: 350000,
      status: 'completed',
      notes: 'Lưu trú 3 ngày trong lúc gia đình đi công tác.',
      contact_phone: '0912345678',
      created_at: new Date()
    },
    {
      id: 4,
      customer_id: 2,
      pet_type: 'Chó',
      pet_name: 'Lu',
      service_id: 'ser1',
      expert_id: 'exp3',
      booking_date: '2026-06-10',
      time_slot: '10:00',
      price: 250000,
      status: 'completed',
      notes: null,
      contact_phone: '0912345678',
      created_at: new Date()
    }
  ],
  pets: [
    {
      id: 1,
      customer_id: 1,
      name: 'Mochi',
      pet_type: 'Chó',
      breed: 'Corgi',
      age_label: '2 tuổi',
      weight_kg: 12.5,
      health_status: 'Sức khỏe tốt',
      next_vaccination_date: '2026-10-15',
      image: 'https://lh3.googleusercontent.com/aida-public/mochi.png',
      notes: 'Bé thích ăn gà ác nấu nhừ.',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      customer_id: 1,
      name: 'LuLu',
      pet_type: 'Mèo',
      breed: 'Mèo Anh lông ngắn',
      age_label: '3 tuổi',
      weight_kg: 4.2,
      health_status: 'Đến lịch tiêm',
      next_vaccination_date: '2026-06-24',
      image: 'https://lh3.googleusercontent.com/aida-public/lulu.png',
      notes: 'Bé lười uống nước, hay dỗi hờn.',
      created_at: new Date(),
      updated_at: new Date()
    }
  ],
  pet_reminders: [
    {
      id: 1,
      pet_id: 2, // Lulu
      reminder_type: 'vaccination',
      title: 'Tiêm phòng dại',
      reminder_date: '2026-08-25',
      reminder_time: '10:30',
      is_completed: 0,
      booking_id: null,
      created_at: new Date()
    },
    {
      id: 2,
      pet_id: 1, // Mochi
      reminder_type: 'grooming',
      title: 'Cắt tỉa lông',
      reminder_date: '2026-08-28',
      reminder_time: '14:00',
      is_completed: 0,
      booking_id: null,
      created_at: new Date()
    }
  ]
};

// ============================================================================
// UNIFIED SQL SERVER & FALLBACK API WRAPPER
// ============================================================================
export const db = {
  // 1. GET ALL SERVICES
  async getServices(): Promise<any[]> {
    const sqlPool = await getSqlPool();
    if (sqlPool) {
      try {
        const result = await sqlPool.request().query('SELECT * FROM services');
        return result.recordset.map(row => ({
          ...row,
          cta_primary: row.cta_primary ? JSON.parse(row.cta_primary) : null,
          cta_secondary: row.cta_secondary ? JSON.parse(row.cta_secondary) : null,
          highlights: row.highlights ? JSON.parse(row.highlights) : [],
          process_steps: row.process_steps ? JSON.parse(row.process_steps) : [],
          pricing: row.pricing ? JSON.parse(row.pricing) : {}
        }));
      } catch (err) {
        console.error('SQL Server error in getServices:', err);
      }
    }
    // Fallback
    return memoryDb.services;
  },

  // 2. GET SERVICE BY ID
  async getServiceById(id: string): Promise<any | null> {
    const sqlPool = await getSqlPool();
    if (sqlPool) {
      try {
        const result = await sqlPool.request()
          .input('id', mssql.VarChar(50), id)
          .query('SELECT * FROM services WHERE id = @id');
        if (result.recordset.length === 0) return null;
        const row = result.recordset[0];
        return {
          ...row,
          cta_primary: row.cta_primary ? JSON.parse(row.cta_primary) : null,
          cta_secondary: row.cta_secondary ? JSON.parse(row.cta_secondary) : null,
          highlights: row.highlights ? JSON.parse(row.highlights) : [],
          process_steps: row.process_steps ? JSON.parse(row.process_steps) : [],
          pricing: row.pricing ? JSON.parse(row.pricing) : {}
        };
      } catch (err) {
        console.error('SQL Server error in getServiceById:', err);
      }
    }
    // Fallback
    return memoryDb.services.find(s => s.id === id) || null;
  },

  // 3. GET ALL EXPERTS
  async getExperts(): Promise<any[]> {
    const sqlPool = await getSqlPool();
    if (sqlPool) {
      try {
        const result = await sqlPool.request().query('SELECT * FROM experts WHERE is_active = 1');
        return result.recordset.map(row => ({
          ...row,
          tags: row.tags ? JSON.parse(row.tags) : []
        }));
      } catch (err) {
        console.error('SQL Server error in getExperts:', err);
      }
    }
    // Fallback
    return memoryDb.experts.map(e => ({
      ...e,
      // Drizzle compatibility mappings for frontend representation
      fullName: e.name,
      role: 'expert'
    }));
  },

  // 4. GET ALL ARTICLES
  async getArticles(): Promise<any[]> {
    const sqlPool = await getSqlPool();
    if (sqlPool) {
      try {
        const result = await sqlPool.request().query('SELECT * FROM articles ORDER BY published_at DESC');
        return result.recordset.map(row => ({
          ...row,
          publishedAt: row.published_at
        }));
      } catch (err) {
        console.error('SQL Server error in getArticles:', err);
      }
    }
    // Fallback
    return memoryDb.articles.map(a => ({
      ...a,
      publishedAt: a.published_at
    }));
  },

  // 5. GET USER BY EMAIL (Searches customers, admins, then experts)
  async getUserByEmail(email: string): Promise<any | null> {
    const trimmedEmail = email.trim().toLowerCase();
    const sqlPool = await getSqlPool();
    if (sqlPool) {
      try {
        // Try customer first
        const custRes = await sqlPool.request()
          .input('email', mssql.VarChar(255), trimmedEmail)
          .query('SELECT *, \'client\' as role FROM customers WHERE email = @email');
        if (custRes.recordset.length > 0) {
          const u = custRes.recordset[0];
          return { id: u.id, email: u.email, fullName: u.full_name, phone: u.phone, role: u.role, passwordHash: u.password_hash };
        }

        // Try admin
        const adminRes = await sqlPool.request()
          .input('email', mssql.VarChar(255), trimmedEmail)
          .query('SELECT *, \'admin\' as role FROM admins WHERE email = @email');
        if (adminRes.recordset.length > 0) {
          const u = adminRes.recordset[0];
          return { id: u.id, email: u.email, fullName: u.full_name, phone: u.phone, role: u.role, passwordHash: u.password_hash };
        }

        // Try expert
        const expRes = await sqlPool.request()
          .input('email', mssql.VarChar(255), trimmedEmail)
          .query('SELECT *, \'expert\' as role FROM experts WHERE email = @email');
        if (expRes.recordset.length > 0) {
          const u = expRes.recordset[0];
          return { id: u.id, email: u.email, fullName: u.name, phone: u.phone, role: u.role, passwordHash: u.password_hash, stringId: u.id };
        }
      } catch (err) {
        console.error('SQL Server error in getUserByEmail:', err);
      }
    }

    // Fallback
    const c = memoryDb.customers.find(u => u.email.toLowerCase() === trimmedEmail);
    if (c) return { id: c.id, email: c.email, fullName: c.full_name, phone: c.phone, role: 'client', passwordHash: c.password_hash };

    const a = memoryDb.admins.find(u => u.email.toLowerCase() === trimmedEmail);
    if (a) return { id: a.id, email: a.email, fullName: a.full_name, phone: a.phone, role: 'admin', passwordHash: a.password_hash };

    const e = memoryDb.experts.find(u => u.email && u.email.toLowerCase() === trimmedEmail);
    if (e) return { id: e.id, email: e.email, fullName: e.name, phone: e.phone, role: 'expert', passwordHash: e.password_hash, stringId: e.id };

    return null;
  },

  // 6. SYNC OR CREATE USER FROM FIREBASE
  async getOrCreateUser(uid: string, email: string, fullName?: string): Promise<any> {
    const trimmedEmail = email.trim().toLowerCase();
    
    // Determine default role based on keyword
    let defaultRole = 'client';
    if (trimmedEmail.includes('admin')) {
      defaultRole = 'admin';
    } else if (trimmedEmail.includes('expert')) {
      defaultRole = 'expert';
    }

    const sqlPool = await getSqlPool();
    if (sqlPool) {
      try {
        // Query across roles
        let userRecord = await this.getUserByEmail(trimmedEmail);
        
        if (!userRecord) {
          // Insert into appropriate table
          if (defaultRole === 'admin') {
            const insertRes = await sqlPool.request()
              .input('email', mssql.VarChar(255), trimmedEmail)
              .input('fullName', mssql.NVarChar(100), fullName || 'Admin')
              .query('INSERT INTO admins (email, password_hash, full_name, permission_level) VALUES (@email, \'\', @fullName, \'staff\'); SELECT SCOPE_IDENTITY() as id;');
            const newId = insertRes.recordset[0].id;
            return { id: newId, email: trimmedEmail, fullName: fullName || 'Admin', role: 'admin', uid };
          } else if (defaultRole === 'expert') {
            const randomId = `exp_${Date.now()}`;
            await sqlPool.request()
              .input('id', mssql.VarChar(50), randomId)
              .input('email', mssql.VarChar(255), trimmedEmail)
              .input('name', mssql.NVarChar(100), fullName || 'Expert')
              .query('INSERT INTO experts (id, email, password_hash, name, title) VALUES (@id, @email, \'\', @name, N\'Chuyên gia mới\');');
            return { id: randomId, email: trimmedEmail, fullName: fullName || 'Expert', role: 'expert', uid };
          } else {
            const insertRes = await sqlPool.request()
              .input('email', mssql.VarChar(255), trimmedEmail)
              .input('fullName', mssql.NVarChar(100), fullName || trimmedEmail.split('@')[0])
              .query('INSERT INTO customers (email, password_hash, full_name) VALUES (@email, \'\', @fullName); SELECT SCOPE_IDENTITY() as id;');
            const newId = insertRes.recordset[0].id;
            return { id: newId, email: trimmedEmail, fullName: fullName || trimmedEmail.split('@')[0], role: 'client', uid };
          }
        }
        
        return { ...userRecord, uid };
      } catch (err) {
        console.error('SQL Server error in getOrCreateUser:', err);
      }
    }

    // Fallback
    let existing = await this.getUserByEmail(trimmedEmail);
    if (!existing) {
      if (defaultRole === 'admin') {
        const newAdmin = {
          id: memoryDb.admins.length + 1,
          email: trimmedEmail,
          password_hash: '',
          full_name: fullName || 'Admin',
          phone: '',
          avatar: '',
          permission_level: 'staff',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        };
        memoryDb.admins.push(newAdmin);
        return { id: newAdmin.id, email: newAdmin.email, fullName: newAdmin.full_name, role: 'admin', uid };
      } else if (defaultRole === 'expert') {
        const newExp = {
          id: `exp${memoryDb.experts.length + 1}`,
          email: trimmedEmail,
          password_hash: '',
          name: fullName || 'Expert',
          title: 'Chuyên gia mới',
          phone: '',
          rating: 5.0,
          reviews_count: 0,
          image: '',
          tags: [],
          is_active: true
        };
        memoryDb.experts.push(newExp);
        return { id: newExp.id, email: newExp.email, fullName: newExp.name, role: 'expert', uid };
      } else {
        const newCust = {
          id: memoryDb.customers.length + 1,
          email: trimmedEmail,
          password_hash: '',
          full_name: fullName || trimmedEmail.split('@')[0],
          phone: '',
          avatar: '',
          address: '',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        };
        memoryDb.customers.push(newCust);
        return { id: newCust.id, email: newCust.email, fullName: newCust.full_name, role: 'client', uid };
      }
    }

    return { ...existing, uid };
  },

  // 7. GET BOOKINGS FOR USER BY ID OR EMAIL/ROLE
  async getBookings(dbUserId: any, email?: string, role?: string): Promise<any[]> {
    const sqlPool = await getSqlPool();
    if (sqlPool) {
      try {
        let query = `
          SELECT b.id, b.customer_id as customerId, b.pet_type as petType, b.pet_name as petName,
                 b.booking_date as bookingDate, b.time_slot as timeSlot, b.price, b.status, b.notes,
                 b.contact_phone as contactPhone, b.service_id as serviceId, s.name as serviceName,
                 b.expert_id as expertId, e.name as expertName, b.created_at as createdAt
          FROM bookings b
          LEFT JOIN services s ON b.service_id = s.id
          LEFT JOIN experts e ON b.expert_id = e.id
        `;
        
        let req = sqlPool.request();
        
        if (role === 'admin') {
          // Admin gets everything
          query += ' ORDER BY b.created_at DESC';
        } else if (role === 'expert') {
          // Expert gets assigned bookings
          query += ' WHERE b.expert_id = @expertId ORDER BY b.created_at DESC';
          req.input('expertId', mssql.VarChar(50), dbUserId.toString());
        } else {
          // Customers (client) gets their own
          query += ' WHERE b.customer_id = @customerId ORDER BY b.created_at DESC';
          req.input('customerId', mssql.Int, parseInt(dbUserId, 10));
        }

        const result = await req.query(query);
        return result.recordset.map(row => ({
          ...row,
          bookingDate: row.bookingDate ? new Date(row.bookingDate).toISOString().split('T')[0] : null
        }));
      } catch (err) {
        console.error('SQL Server error in getBookings:', err);
      }
    }

    // Fallback
    const uRole = role || 'client';
    let filtered = memoryDb.bookings;
    if (uRole === 'expert') {
      filtered = memoryDb.bookings.filter(b => b.expert_id === dbUserId);
    } else if (uRole === 'client') {
      const parsedId = parseInt(dbUserId, 10);
      filtered = memoryDb.bookings.filter(b => b.customer_id === parsedId);
    } // admin gets all

    return filtered.map(b => {
      const svc = memoryDb.services.find(s => s.id === b.service_id);
      const exp = memoryDb.experts.find(e => e.id === b.expert_id);
      return {
        id: b.id,
        customerId: b.customer_id,
        petType: b.pet_type,
        petName: b.pet_name,
        bookingDate: b.booking_date,
        timeSlot: b.time_slot,
        price: b.price,
        status: b.status,
        notes: b.notes,
        contactPhone: b.contact_phone,
        serviceId: b.service_id,
        serviceName: svc ? svc.name : 'Dịch vụ khác',
        expertId: b.expert_id,
        expertName: exp ? exp.name : 'Chưa phân công',
        createdAt: b.created_at
      };
    }).sort((a: any, b: any) => b.createdAt.getTime() - a.createdAt.getTime());
  },

  // 8. ADD NEW BOOKING
  async createBooking(data: any): Promise<any> {
    const sqlPool = await getSqlPool();
    if (sqlPool) {
      try {
        const result = await sqlPool.request()
          .input('customerId', mssql.Int, data.userId ? parseInt(data.userId, 10) : null)
          .input('petType', mssql.NVarChar(50), data.petType)
          .input('petName', mssql.NVarChar(100), data.petName)
          .input('serviceId', mssql.VarChar(50), data.serviceId)
          .input('expertId', mssql.VarChar(50), data.expertId || null)
          .input('bookingDate', mssql.Date, data.bookingDate)
          .input('timeSlot', mssql.VarChar(10), data.timeSlot)
          .input('price', mssql.Int, data.price)
          .input('notes', mssql.NVarChar(mssql.MAX), data.notes || null)
          .input('contactPhone', mssql.VarChar(20), data.contactPhone)
          .query(`
            INSERT INTO bookings (customer_id, pet_type, pet_name, service_id, expert_id, booking_date, time_slot, price, status, notes, contact_phone)
            VALUES (@customerId, @petType, @petName, @serviceId, @expertId, @bookingDate, @timeSlot, @price, 'upcoming', @notes, @contactPhone);
            SELECT SCOPE_IDENTITY() as id;
          `);
        const newId = result.recordset[0].id;
        return {
          id: newId,
          ...data,
          status: 'upcoming',
          createdAt: new Date()
        };
      } catch (err) {
        console.error('SQL Server error in createBooking:', err);
      }
    }

    // Fallback
    const newBooking = {
      id: memoryDb.bookings.length + 1,
      customer_id: data.userId ? parseInt(data.userId, 10) : null,
      pet_type: data.petType,
      pet_name: data.petName,
      service_id: data.serviceId,
      expert_id: data.expertId || null,
      booking_date: data.bookingDate,
      time_slot: data.timeSlot,
      price: data.price,
      status: 'upcoming',
      notes: data.notes || null,
      contact_phone: data.contactPhone,
      created_at: new Date()
    };
    memoryDb.bookings.push(newBooking);
    
    const svc = memoryDb.services.find(s => s.id === data.serviceId);
    const exp = memoryDb.experts.find(e => e.id === data.expertId);

    return {
      id: newBooking.id,
      petType: newBooking.pet_type,
      petName: newBooking.pet_name,
      bookingDate: newBooking.booking_date,
      timeSlot: newBooking.time_slot,
      price: newBooking.price,
      status: newBooking.status,
      notes: newBooking.notes,
      contactPhone: newBooking.contact_phone,
      serviceId: newBooking.service_id,
      serviceName: svc ? svc.name : 'Dịch vụ khác',
      expertId: newBooking.expert_id,
      expertName: exp ? exp.name : 'Chưa phân công',
      createdAt: newBooking.created_at
    };
  },

  // 9. CANCEL BOOKING BY ID
  async cancelBooking(bookingId: number): Promise<any | null> {
    const sqlPool = await getSqlPool();
    if (sqlPool) {
      try {
        const result = await sqlPool.request()
          .input('id', mssql.Int, bookingId)
          .query('UPDATE bookings SET status = \'cancelled\' WHERE id = @id; SELECT * FROM bookings WHERE id = @id;');
        if (result.recordset.length === 0) return null;
        return result.recordset[0];
      } catch (err) {
        console.error('SQL Server error in cancelBooking:', err);
      }
    }

    // Fallback
    const b = memoryDb.bookings.find(bk => bk.id === bookingId);
    if (!b) return null;
    b.status = 'cancelled';
    return {
      id: b.id,
      status: 'cancelled',
      petType: b.pet_type,
      petName: b.pet_name
    };
  },

  // 10. GET PETS FOR USER
  async getPets(dbUserId: number): Promise<any[]> {
    const sqlPool = await getSqlPool();
    if (sqlPool) {
      try {
        const result = await sqlPool.request()
          .input('customerId', mssql.Int, dbUserId)
          .query('SELECT * FROM pets WHERE customer_id = @customerId');
        return result.recordset.map(row => ({
          id: row.id,
          userId: row.customer_id,
          name: row.name,
          petType: row.pet_type,
          breed: row.breed,
          ageLabel: row.age_label,
          weightKg: row.weight_kg,
          healthStatus: row.health_status,
          nextVaccinationDate: row.next_vaccination_date ? new Date(row.next_vaccination_date).toISOString().split('T')[0] : null,
          image: row.image,
          notes: row.notes
        }));
      } catch (err) {
        console.error('SQL Server error in getPets:', err);
      }
    }

    // Fallback
    return memoryDb.pets.filter(p => p.customer_id === dbUserId).map(p => ({
      id: p.id,
      userId: p.customer_id,
      name: p.name,
      petType: p.pet_type,
      breed: p.breed,
      ageLabel: p.age_label,
      weightKg: p.weight_kg,
      healthStatus: p.health_status,
      nextVaccinationDate: p.next_vaccination_date,
      image: p.image,
      notes: p.notes
    }));
  },

  // 11. ADD A NEW PET
  async createPet(data: any): Promise<any> {
    const sqlPool = await getSqlPool();
    if (sqlPool) {
      try {
        const result = await sqlPool.request()
          .input('customerId', mssql.Int, parseInt(data.userId, 10))
          .input('name', mssql.NVarChar(100), data.name)
          .input('petType', mssql.NVarChar(20), data.petType)
          .input('breed', mssql.NVarChar(100), data.breed || null)
          .input('ageLabel', mssql.NVarChar(50), data.ageLabel || null)
          .input('weightKg', mssql.Decimal(5, 2), data.weightKg ? parseFloat(data.weightKg) : null)
          .input('healthStatus', mssql.NVarChar(20), data.healthStatus)
          .input('nextVaccinationDate', mssql.Date, data.nextVaccinationDate || null)
          .input('image', mssql.VarChar(512), data.image || null)
          .input('notes', mssql.NVarChar(mssql.MAX), data.notes || null)
          .query(`
            INSERT INTO pets (customer_id, name, pet_type, breed, age_label, weight_kg, health_status, next_vaccination_date, image, notes)
            VALUES (@customerId, @name, @petType, @breed, @ageLabel, @weightKg, @healthStatus, @nextVaccinationDate, @image, @notes);
            SELECT SCOPE_IDENTITY() as id;
          `);
        const newId = result.recordset[0].id;
        return {
          id: newId,
          ...data
        };
      } catch (err) {
        console.error('SQL Server error in createPet:', err);
      }
    }

    // Fallback
    const newPet = {
      id: memoryDb.pets.length + 1,
      customer_id: parseInt(data.userId, 10),
      name: data.name,
      pet_type: data.petType,
      breed: data.breed || null,
      age_label: data.ageLabel || null,
      weight_kg: data.weightKg ? parseFloat(data.weightKg) : null,
      health_status: data.healthStatus,
      next_vaccination_date: data.nextVaccinationDate || null,
      image: data.image || null,
      notes: data.notes || null,
      created_at: new Date(),
      updated_at: new Date()
    };
    memoryDb.pets.push(newPet);
    return {
      id: newPet.id,
      userId: newPet.customer_id,
      name: newPet.name,
      petType: newPet.pet_type,
      breed: newPet.breed,
      ageLabel: newPet.age_label,
      weightKg: newPet.weight_kg,
      healthStatus: newPet.health_status,
      nextVaccinationDate: newPet.next_vaccination_date,
      image: newPet.image,
      notes: newPet.notes
    };
  },

  // 12. DELETE A PET
  async deletePet(petId: number): Promise<any | null> {
    const sqlPool = await getSqlPool();
    if (sqlPool) {
      try {
        const result = await sqlPool.request()
          .input('id', mssql.Int, petId)
          .query('SELECT * FROM pets WHERE id = @id; DELETE FROM pets WHERE id = @id;');
        if (result.recordset.length === 0) return null;
        return result.recordset[0];
      } catch (err) {
        console.error('SQL Server error in deletePet:', err);
      }
    }

    // Fallback
    const idx = memoryDb.pets.findIndex(p => p.id === petId);
    if (idx === -1) return null;
    const deleted = memoryDb.pets.splice(idx, 1)[0];
    return deleted;
  },

  // 13. GET REMINDERS FOR PET ID
  async getRemindersForPet(petId: number): Promise<any[]> {
    const sqlPool = await getSqlPool();
    if (sqlPool) {
      try {
        const result = await sqlPool.request()
          .input('petId', mssql.Int, petId)
          .query('SELECT * FROM pet_reminders WHERE pet_id = @petId');
        return result.recordset.map(row => ({
          id: row.id,
          petId: row.pet_id,
          reminderType: row.reminder_type,
          title: row.title,
          reminderDate: row.reminder_date ? new Date(row.reminder_date).toISOString().split('T')[0] : null,
          reminderTime: row.reminder_time,
          isCompleted: row.is_completed === true || row.is_completed === 1
        }));
      } catch (err) {
        console.error('SQL Server error in getRemindersForPet:', err);
      }
    }

    // Fallback
    return memoryDb.pet_reminders.filter(r => r.pet_id === petId).map(r => ({
      id: r.id,
      petId: r.pet_id,
      reminderType: r.reminder_type,
      title: r.title,
      reminderDate: r.reminder_date,
      reminderTime: r.reminder_time,
      isCompleted: r.is_completed === 1
    }));
  },

  // 14. ADD REMINDER
  async createPetReminder(data: any): Promise<any> {
    const sqlPool = await getSqlPool();
    if (sqlPool) {
      try {
        const result = await sqlPool.request()
          .input('petId', mssql.Int, parseInt(data.petId, 10))
          .input('reminderType', mssql.VarChar(30), data.reminderType)
          .input('title', mssql.NVarChar(150), data.title)
          .input('reminderDate', mssql.Date, data.reminderDate)
          .input('reminderTime', mssql.VarChar(10), data.reminderTime || null)
          .input('isCompleted', mssql.Bit, data.isCompleted ? 1 : 0)
          .query(`
            INSERT INTO pet_reminders (pet_id, reminder_type, title, reminder_date, reminder_time, is_completed)
            VALUES (@petId, @reminderType, @title, @reminderDate, @reminderTime, @isCompleted);
            SELECT SCOPE_IDENTITY() as id;
          `);
        const newId = result.recordset[0].id;
        return {
          id: newId,
          ...data
        };
      } catch (err) {
        console.error('SQL Server error in createPetReminder:', err);
      }
    }

    // Fallback
    const newReminder = {
      id: memoryDb.pet_reminders.length + 1,
      pet_id: parseInt(data.petId, 10),
      reminder_type: data.reminderType,
      title: data.title,
      reminder_date: data.reminderDate,
      reminder_time: data.reminderTime || null,
      is_completed: data.isCompleted ? 1 : 0,
      booking_id: null,
      created_at: new Date()
    };
    memoryDb.pet_reminders.push(newReminder);
    return {
      id: newReminder.id,
      petId: newReminder.pet_id,
      reminderType: newReminder.reminder_type,
      title: newReminder.title,
      reminderDate: newReminder.reminder_date,
      reminderTime: newReminder.reminder_time,
      isCompleted: newReminder.is_completed === 1
    };
  }
};
