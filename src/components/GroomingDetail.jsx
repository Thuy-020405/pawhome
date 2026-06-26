import React, { useState } from 'react';
import { 
  ChevronLeft, Scissors, Star, ShieldCheck, Clock, UserCheck, 
  MapPin, CheckCircle2, Award, Calendar, Heart, ArrowRight,
  Info, Sparkles, MessageSquare, ThumbsUp
} from 'lucide-react';
import { EXPERTS } from '../data';

import GROOMING_IMAGE from '../assets/images/dog_grooming_tools_1782089643504.jpg';

export default function GroomingDetail({ onBack, onOpenBooking, isDarkMode }) {
  const [petSize, setPetSize] = useState('small'); // small, medium, large
  const [selectedTab, setSelectedTab] = useState('process'); // process, pricing, reviews
  const [likedReviews, setLikedReviews] = useState({});

  // Locate our experts in Grooming
  const groomingExperts = [
    {
      ...(EXPERTS.find(e => e.id === 'exp2') || {
        name: "Chị Lan Hương",
        title: "Grooming & Spa Artist",
        rating: 5.0,
        reviewsCount: 89,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB19A2mdNTuBbZTWKMZEd0FAfpacHlvJg5Ug1fJwoQwDRQAwCkO-_LZm1q1K1zpDDIi6kWRHDnX2dxltpC72dGvIrFbzdmQvEaywxyxc0qQ_gkxy2VWVTZmZkH_vL0gHe9VQzLHlvC-E7iRaJFUbn_2Es_xTSxOljrNdUEfy6bsZMf4O--3JI19_haDU-eJ1L_3bfRduxcLFJNOhQXglVXF0Bv9gZwvaXCm6-Tj8NEoe4hpmn1G-5TBtg",
        tags: ["Tắm rửa", "Chăm sóc lông", "Tạo kiểu thẩm mỹ", "Mèo", "Chó"]
      }),
      description: "Chị Lan Hương có hơn 6 năm gắn bó sâu đậm trong ngành tạo mẫu lông nghệ thuật. Đạt vô số chứng chỉ quốc tế uy tín tại Singapore và Đài Loan về kỹ thuật tỉa phom tỉ mỉ từng thớt lông giúp tôn lên trọn vẹn điểm cộng ngộ nghĩnh của bé cưng."
    },
    {
      name: "Anh Minh Tuấn",
      title: "Chuyên Gia Exotic Grooming",
      rating: 4.9,
      reviewsCount: 156,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwoVBdy7HAsCYO7bYy_6uA1QoONt6mQWz_KvRsQaU77BLfbeQpGdxrIpUAOAFpj4F4vuZy3NVYiXYBWZFh3viDtPVoW7W6YLAfiBtcXH0cfIJEqzIP6Sqfk_lShBL6edPcsHM78JWjtbpbm2deS5E1QNEd3DXMYaeFYnVV4pmUk3uBeZZsQY8P3t7ohzWU_sDZb9haw0KwQxreooFumFDs3ZdLxX2C8d-PTRl6SH4E0U3cRubWdAB3hg",
      tags: ["Vệ sinh đặc biệt", "Cắt tỉa an toàn", "Thỏ", "Bò sát", "Chim"],
      description: "Anh Minh Tuấn chuyên trị những ca khó với các giống thú cưng ngoại lai (exotic pets) và các bé mèo tính khí nhạy cảm. Thao tác nhẹ nhàng, am hiểu đặc tính từng loài giúp bé hoàn toàn yên tâm thư giãn."
    },
    {
      name: "Chị Ngọc Mai",
      title: "Senior Pet Stylist",
      rating: 4.8,
      reviewsCount: 204,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD37qytkNRc_Icwq-4pRwpV1APltKkyYHGNPSlSedPkwGul8iP7hDF80QR1yO9f0H2FqSoMlwZpAeGkaFbCfmToYF5Dji3gSWLMB8_dFcm7363moYkh8olAb5mEh8rGgYjdbNI3eeFKw0DOxE9D9kFCRCX4IvteQ9TcsaBR0X3jPExXTmrDeeb4KsFZ7ru3xSp190uz1HGlSCBbLwF8Z_cQ4KCw9mWY7c-dfg6lNmHV-xKxWmhjq1haHg",
      tags: ["Tạo kiểu Poodle", "Spa y tế", "Chó", "Cá", "Hamster"],
      description: "Bàn tay vàng trong làng tạo kiểu Poodle và Corgi. Chị Ngọc Mai còn có kinh nghiệm chăm sóc spa mini cho hamster và tư vấn vệ sinh bể chuyên nghiệp cho cá cảnh."
    }
  ];

  // 7-step premium process list
  const steps = [
    {
      num: '01',
      title: 'Kiểm tra da & lông',
      desc: 'Bác sĩ hoặc chuyên viên sẽ kiểm tra bề mặt da, lông của bé để phát hiện nấm, ve rận hoặc các kích ứng nhạy cảm nhằm tư vấn loại dầu tắm phù hợp.'
    },
    {
      num: '02',
      title: 'Vệ sinh tai & Cắt móng',
      desc: 'Vắt tuyến hôi, làm sạch bụi bẩn tích tụ trong tai để ngừa viêm nhiễm, mài mịn móng tránh cào xước da khi bé đùa nghịch.'
    },
    {
      num: '03',
      title: 'Chải gỡ rối & Loại lông chết',
      desc: 'Sử dụng lược chuyên dụng chải chuốt nhẹ nhàng giúp gỡ bỏ hoàn toàn những phần lông xơ, rối và mát-xa tuần hoàn da nuôi dưỡng lông mới.'
    },
    {
      num: '04',
      title: 'Tắm massage & Spa tinh dầu',
      desc: 'Tắm 2 lần nước ấm với sữa tắm thảo dược dưỡng lông cao cấp nhập khẩu từ Nhật Bản/Pháp kết hợp kỹ thuật massage thư giãn sâu.'
    },
    {
      num: '05',
      title: 'Sấy ion âm khử tĩnh điện',
      desc: 'Sấy nhiệt độ vừa phải kết hợp thổi gió ion âm chuyên nghiệp giữ cho các sợi lông có độ phồng quyến rũ và không bị xơ khô gãy rụng.'
    },
    {
      num: '06',
      title: 'Cắt tỉa & Tạo kiểu nghệ thuật',
      desc: 'Được trực tiếp thực hiện bởi các Artist tay nghề cao (như chị Lan Hương) cắt tỉa phom tròn Hàn Quốc, gấu Teddy, bông tuyết xòe điệu đà theo yêu cầu.'
    },
    {
      num: '07',
      title: 'Thoa xịt dưỡng & Nước hoa thảo mộc',
      desc: 'Phủ lớp dầu dưỡng tăng độ bóng mượt vượt trội và xịt nước hoa hữu cơ chiết xuất hoa hồng/oải hương dịu nhẹ lưu hương thơm mát suốt cả tuần.'
    }
  ];

  // Specific pricing options for interactive demo
  const pricingData = {
    small: {
      basic: { price: '200,000đ', duration: '60 phút', features: ['Tắm mát-xa tiêu chuẩn', 'Sấy khô chải lông', 'Cắt tỉa móng cơ bản', 'Vắt tuyến hôi'] },
      premium: { price: '350,000đ', duration: '90 phút', features: ['Spa tinh dầu organic phục hồi', 'Sấy sưởi phồng ion âm', 'Vệ sinh tai chuyên sâu', 'Cắt tỉa tạo kiểu nghệ thuật Hàn Quốc', 'Dưỡng ẩm phủ bóng tơ tằm', 'Xịt nước hoa lưu hương 7 ngày'] }
    },
    medium: {
      basic: { price: '300,000đ', duration: '75 phút', features: ['Tắm mát-xa tiêu chuẩn', 'Sấy khô chải lông', 'Cắt tỉa móng cơ bản', 'Vắt tuyến hôi'] },
      premium: { price: '480,000đ', duration: '110 phút', features: ['Spa tinh dầu organic phục hồi', 'Sấy sưởi phồng ion âm', 'Vệ sinh tai chuyên sâu', 'Cắt tỉa tạo kiểu nghệ thuật Hàn Quốc', 'Dưỡng ẩm phủ bóng tơ tằm', 'Xịt nước hoa lưu hương 7 ngày'] }
    },
    large: {
      basic: { price: '450,000đ', duration: '90 phút', features: ['Tắm mát-xa tiêu chuẩn', 'Sấy khô chải lông', 'Cắt tỉa móng cơ bản', 'Vắt tuyến hôi'] },
      premium: { price: '650,000đ', duration: '140 phút', features: ['Spa tinh dầu organic phục hồi', 'Sấy sưởi phồng ion âm', 'Vệ sinh tai chuyên sâu', 'Cắt tỉa tạo kiểu nghệ thuật Hàn Quốc', 'Dưỡng ẩm phủ bóng tơ tằm', 'Xịt nước hoa lưu hương 7 ngày'] }
    }
  };

  const currentPrices = pricingData[petSize];

  // Internal visual testimonials
  const groomingReviews = [
    {
      id: 1,
      author: 'Chị Minh Anh',
      pet: 'Lucky (Poodle)',
      rating: 5,
      content: 'Chị Lan Hương cắt tỉa cực kỳ khéo tay và có tâm luôn í, Lucky nhà mình kén thợ lắm mà ở đây nằm yên tận hưởng luôn. Phom đầu tròn gấu Teddy trông yêu xỉu up xỉu down ❤️!',
      date: '10/06/2026',
      likes: 24
    },
    {
      id: 2,
      author: 'Anh Quang Huy',
      pet: 'Nunu (Mèo Anh Lông Dài)',
      rating: 5,
      content: 'Dịch vụ Spa tắm bồn sục của bên này quá đỉnh, lông bé xơm phức bóng mượt, sấy phồng tuyệt đối không bị ngột ngạt tí nào. Đáng đồng tiền bát gạo.',
      date: '18/06/2026',
      likes: 12
    },
    {
      id: 3,
      author: 'Chị Bảo Thy',
      pet: 'Kem (Corgi mông đào)',
      rating: 5,
      content: 'Lần đầu tiên đem Kem đi cắt mông quả đào ở PawHome mà ưng quá chừng. Thợ lành nghề cười nói siêu cute, cưng thú cưng như con ruột.',
      date: '21/06/2026',
      likes: 8
    }
  ];

  const handleLike = (id) => {
    setLikedReviews(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className={`fade-in pb-5 min-h-screen grooming-detail-container ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-dark'}`}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&display=swap');
          .grooming-detail-container {
            font-family: 'Bricolage Grotesque', sans-serif;
          }
          
          /* Neon Effects */
          .neon-text-white {
            text-shadow: 0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3);
          }
          .neon-text-secondary {
            text-shadow: 0 0 10px rgba(253,118,26,0.8), 0 0 20px rgba(253,118,26,0.5);
          }
          .btn-outline-neon {
            border: 2px solid white;
            background: transparent;
            color: white;
            box-shadow: 0 0 5px rgba(255,255,255,0.3) inset, 0 0 5px rgba(255,255,255,0.3);
            transition: all 0.3s ease;
          }
          .btn-outline-neon:hover {
            background: rgba(255,255,255,0.1);
            color: white;
            box-shadow: 0 0 10px rgba(255,255,255,0.6) inset, 0 0 10px rgba(255,255,255,0.6);
          }
          .btn-neon-secondary {
            background-color: #fd761a;
            color: white;
            border: none;
            box-shadow: 0 0 10px rgba(253,118,26,0.6), 0 0 20px rgba(253,118,26,0.4);
            transition: all 0.3s ease;
          }
          .btn-neon-secondary:hover {
            background-color: #e05e0c;
            color: white;
            box-shadow: 0 0 15px rgba(253,118,26,0.8), 0 0 25px rgba(253,118,26,0.6);
          }
          .btn-back-prominent {
            border: 1px solid rgba(255,255,255,0.3);
            background: rgba(0, 35, 111, 0.6);
            backdrop-filter: blur(10px);
            color: white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
          }
          .btn-back-prominent:hover {
            background: rgba(0, 35, 111, 0.85);
            border-color: rgba(255,255,255,0.8);
            box-shadow: 0 4px 15px rgba(0,0,0,0.25);
            color: white;
            transform: translateY(-1px);
          }
        `}
      </style>

      {/* 1. TOP HERO CONTAINER WITH HIGH CONTRAST */}
      <section 
        className="position-relative overflow-hidden d-flex align-items-center"
        style={{
          minHeight: '62vh',
          background: 'linear-gradient(135deg, #1E3A8A 0%, #334155 100%)',
          paddingTop: '100px',
          paddingBottom: '50px'
        }}
      >
        {/* Dynamic neon particle highlights */}
        <div className="position-absolute rounded-circle blur-3xl opacity-10" style={{ backgroundColor: '#F1F5F9', width: '350px', height: '350px', top: '-10%', left: '-5%' }} />
        <div className="position-absolute rounded-circle blur-3xl opacity-10" style={{ backgroundColor: '#F97316', width: '300px', height: '300px', bottom: '-5%', right: '-5%' }} />

        <div className="container px-4 px-md-5" style={{ zIndex: 10 }}>
          {/* Back Navigation Bar */}
          <button 
            onClick={onBack}
            className="btn rounded-pill mb-4 px-4 py-2 fs-7 d-inline-flex align-items-center gap-2 btn-back-prominent"
          >
            <ChevronLeft size={16} />
            Quay lại trang dịch vụ
          </button>

          <div className="row align-items-center g-5 text-start">
            <div className="col-12 col-md-7 text-white">
              <span 
                className="badge rounded-pill text-uppercase px-3 py-2 mb-3 align-middle bg-secondary-custom"
                style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '1px' }}
              >
                Dịch vụ tiêu điểm PawHome
              </span>
              
              <h1 className="display-4 fw-extrabold mb-3 tracking-tight text-white leading-tight neon-text-white">
                Dịch Vụ Cắt Tỉa <br />
                <span className="text-secondary-custom neon-text-secondary">
                  &amp; Spa Nghệ Thuật
                </span>
              </h1>

              <p className="lead mb-4 fs-6 text-neutral-300" style={{ maxWidth: '600px', lineHeight: '1.7', fontWeight: '400' }}>
                Hệ thống trị liệu tái tạo rực rỡ từ cội nguồn vạn vật – Nơi trao gửi yêu thương toàn mỹ bằng quy trình 7 bước thư giãn và tinh hoa tạo kiểu đỉnh cao từ thợ lành nghề chuyên nghiệp bậc nhất.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <button 
                  onClick={() => onOpenBooking('dog', 'Cắt Tỉa Thẩm Mỹ')}
                  className="btn rounded-pill px-4 py-3 fw-bold d-flex align-items-center gap-2 btn-neon-secondary"
                >
                  Đặt lịch Spa ngay
                  <ArrowRight size={18} />
                </button>
                <a 
                  href="#pricing"
                  className="btn rounded-pill px-4 py-3 fw-bold btn-outline-neon"
                >
                  Bảng giá chi tiết
                </a>
              </div>
            </div>

            {/* Hero Image Section */}
            <div className="col-12 col-md-5">
              <div className="position-relative p-2 rounded-24 overflow-hidden border border-white/10 shadow-2xl glass-card bg-white/5">
                <img 
                  src={GROOMING_IMAGE} 
                  alt="Spa thú cưng nghệ thuật" 
                  className="img-fluid rounded-24 w-100 object-fit-cover"
                  style={{ maxHeight: '310px', height: '310px' }}
                />
                <div className="position-absolute bottom-0 start-0 w-100 p-3 bg-gradient-to-t from-black/80 to-transparent text-white text-center">
                  <div className="d-flex justify-content-center align-items-center gap-1 text-secondary-custom fs-7 fw-bold">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <span className="text-white ml-2">5.0 (1,420+ bé đã làm đẹp)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HIGHLIGHTS BENTO SHEET Grid */}
      <section className="py-5 px-3 px-md-5 container" style={{ maxWidth: '1200px' }}>
        <div className="text-center mb-5 mt-4">
          <h2 className={`fw-extrabold fs-2 ${isDarkMode ? 'text-white' : 'text-[#0d1c2f]'}`}>
            Trải Nghiệm Spa Đẳng Cấp 5 Sao
          </h2>
          <p className="text-muted mt-2">Sự chỉn chu hoàn mỹ mang lại nụ cười rạng ngời cho thú nuôi</p>
        </div>

        <div className="row g-4 text-start">
          {/* Card 1 */}
          <div className="col-12 col-md-4">
            <div className={`p-4 rounded-24 h-100 border transition-all hover:translate-y-[-4px] ${isDarkMode ? 'bg-slate-900/60 border-white/10' : 'bg-light border-transparent shadow-sm'}`}>
              <div className="d-flex align-items-center justify-content-center text-primary-custom rounded-16 bg-white mb-4 shadow-sm" style={{ width: '50px', height: '50px' }}>
                <ShieldCheck size={28} className="text-primary-custom" />
              </div>
              <h4 className="fw-bold mb-3 fs-5 text-primary-custom">Mỹ Phẩm Cao Cấp Hữu Cơ</h4>
              <p className="text-muted small" style={{ lineHeight: '1.6' }}>
                100% sữa tắm, gel dưỡng lông đạt chứng nhận hữu cơ cao cấp nhập khẩu từ châu Âu. Không gây cay mắt bé, dịu nhẹ tối đa cho làn da nhạy cảm nhất.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-12 col-md-4">
            <div className={`p-4 rounded-24 h-100 border transition-all hover:translate-y-[-4px] ${isDarkMode ? 'bg-slate-900/60 border-white/10' : 'bg-light border-transparent shadow-sm'}`}>
              <div className="d-flex align-items-center justify-content-center text-secondary-custom rounded-16 bg-white mb-4 shadow-sm" style={{ width: '50px', height: '50px' }}>
                <Clock size={28} className="text-secondary-custom" />
              </div>
              <h4 className="fw-bold mb-3 fs-5 text-primary-custom">Làm Đẹp Không Gây Stress</h4>
              <p className="text-muted small" style={{ lineHeight: '1.6' }}>
                Quy trình áp dụng liệu pháp âm nhạc thư giãn sóng Alpha cùng kỹ thuật dỗ dành thấu hiểu tâm lý thú cưng, giúp giảm 90% sự lo âu căng thẳng cho bé cưng.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-12 col-md-4">
            <div className={`p-4 rounded-24 h-100 border transition-all hover:translate-y-[-4px] ${isDarkMode ? 'bg-slate-900/60 border-white/10' : 'bg-light border-transparent shadow-sm'}`}>
              <div className="d-flex align-items-center justify-content-center text-primary-custom rounded-16 bg-white mb-4 shadow-sm" style={{ width: '50px', height: '50px' }}>
                <UserCheck size={28} className="text-primary-custom" />
              </div>
              <h4 className="fw-bold mb-3 fs-5 text-primary-custom">Nghệ Nhân Artist Tận Tâm</h4>
              <p className="text-muted small" style={{ lineHeight: '1.6' }}>
                Đội ngũ thợ tỉa chuyên nghiệp trải qua hơn 400 giờ đào tạo nâng cao. Am hiểu chi tiết các đường tỉa nghệ thuật như tỉa tròn Hàn Quốc, tỉa nơ thắt eo hoàng gia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MIDDLE DETAILED TABS SECTION */}
      <section className="py-5 px-3 px-md-5 bg-white/10">
        <div className="container" style={{ maxWidth: '1200px' }}>
          
          {/* Navigation Tab Selector */}
          <div className="d-flex justify-content-center mb-5">
            <div className={`d-inline-flex p-1 rounded-pill ${isDarkMode ? 'bg-slate-900 border border-white/5' : 'bg-light shadow-sm'}`}>
              <button 
                onClick={() => setSelectedTab('process')}
                className={`px-4 py-2 rounded-pill fw-bold border-0 transition-all ${selectedTab === 'process' ? 'bg-primary-custom text-white shadow-sm' : 'text-muted bg-transparent'}`}
                style={{ fontSize: '14px' }}
              >
                Quy Trình 7 Bước
              </button>
              <button 
                onClick={() => setSelectedTab('pricing')}
                className={`px-4 py-2 rounded-pill fw-bold border-0 transition-all ${selectedTab === 'pricing' ? 'bg-primary-custom text-white shadow-sm' : 'text-muted bg-transparent'}`}
                style={{ fontSize: '14px' }}
              >
                Gói Giá &amp; Kích Thước
              </button>
              <button 
                onClick={() => setSelectedTab('reviews')}
                className={`px-4 py-2 rounded-pill fw-bold border-0 transition-all ${selectedTab === 'reviews' ? 'bg-primary-custom text-white shadow-sm' : 'text-muted bg-transparent'}`}
                style={{ fontSize: '14px' }}
              >
                Đánh Giá từ Sen
              </button>
            </div>
          </div>

          {/* TAB 1: 7-STEP DETAILED SERVICES PROCESS */}
          {selectedTab === 'process' && (
            <div className="row g-5 align-items-center">
              <div className="col-12 col-lg-5 text-start">
                <span className="text-secondary-custom fw-bold text-uppercase tracking-wider small">Chu trình toàn diện</span>
                <h3 className="fw-extrabold display-6 mt-2 mb-4 text-primary-custom">Các bước chuẩn Spa Quốc Tế</h3>
                <p className="text-muted mb-4" style={{ lineHeight: '1.7' }}>
                  Tại PawHome, mỗi bước trong quy trình đều nhằm mục đích bảo bọc toàn vẹn cả ngoại hình lẫn tâm hồn. Chúng tôi sử dụng các thiết bị tiên tiến cùng không gian bồn tắm mát-xa tia lọc đặc biệt giúp bé trọn vẹn cảm xúc thỏa thê vui khỏe.
                </p>
                <div className="p-4 rounded-24 bg-light border-0">
                  <div className="d-flex gap-3 align-items-center">
                    <div className="text-primary-custom"><Sparkles size={24} /></div>
                    <div className="text-start">
                      <h6 className="fw-extrabold mb-1 text-primary-custom">Mát-xa chuyên sâu miễn phí</h6>
                      <p className="text-muted small mb-0">Tất cả các gói tắm đều đi kèm với 10 phút xoa bóp huyệt và xả mệt mỏi toàn thân.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-7 text-start">
                <div className="d-flex flex-column gap-3">
                  {steps.map((st, i) => (
                    <div 
                      key={i}
                      className={`p-3 rounded-20 border transition-all d-flex gap-4 align-items-start ${isDarkMode ? 'bg-slate-900/40 border-white/5 hover:border-white/10' : 'bg-white border-light hover:border-primary-custom shadow-sm'}`}
                    >
                      <div className="fs-3 fw-extrabold text-primary-custom font-sans">{st.num}</div>
                      <div>
                        <h5 className="fw-bold fs-6 mb-1 text-primary-custom">{st.title}</h5>
                        <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>{st.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE PRICING BY SIZE */}
          {selectedTab === 'pricing' && (
            <div id="pricing" className="row g-4 justify-content-center text-start">
              <div className="col-12 text-center mb-4">
                <h3 className="fw-extrabold fs-3 text-primary-custom">Bảng Giá Chăm Sóc Trực Quan</h3>
                <p className="text-muted">Chọn cân nặng của bé để xem chi tiết chi phí dịch vụ phù hợp</p>
                
                {/* Pet weight toggle pills */}
                <div className="d-inline-flex p-1 rounded-pill bg-light dark:bg-slate-900 border border-primary-custom mt-2">
                  <button 
                    onClick={() => setPetSize('small')}
                    className={`px-3 py-1.5 rounded-pill fs-7 border-0 fw-bold transition-all ${petSize === 'small' ? 'bg-secondary-custom text-white shadow-sm' : 'text-muted bg-transparent'}`}
                  >
                    Bé nhỏ (Dưới 5kg)
                  </button>
                  <button 
                    onClick={() => setPetSize('medium')}
                    className={`px-3 py-1.5 rounded-pill fs-7 border-0 fw-bold transition-all ${petSize === 'medium' ? 'bg-secondary-custom text-white shadow-sm' : 'text-muted bg-transparent'}`}
                  >
                    Bé vừa (5 - 12kg)
                  </button>
                  <button 
                    onClick={() => setPetSize('large')}
                    className={`px-3 py-1.5 rounded-pill fs-7 border-0 fw-bold transition-all ${petSize === 'large' ? 'bg-secondary-custom text-white shadow-sm' : 'text-muted bg-transparent'}`}
                  >
                    Bé lớn (Trên 12kg)
                  </button>
                </div>
              </div>

              {/* Basic Package Card */}
              <div className="col-12 col-md-6 col-lg-5">
                <div className={`p-4 rounded-24 h-100 border transition-all ${isDarkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-primary-custom shadow-sm'}`}>
                  <span className="badge bg-light text-muted rounded-pill px-3 py-1 mb-3 text-uppercase fw-bold" style={{ fontSize: '10px' }}>Tắm Spa Thư Giãn</span>
                  <h4 className="fw-extrabold fs-2 mb-1 text-primary-custom">{currentPrices.basic.price}</h4>
                  <p className="text-muted fs-7 mb-4">Thời gian chăm ước lượng: {currentPrices.basic.duration}</p>
                  
                  <hr className="opacity-10 mb-4 border-primary-custom" />
                  
                  <ul className="list-unstyled d-flex flex-column gap-3 mb-4">
                    {currentPrices.basic.features.map((f, i) => (
                      <li key={i} className="d-flex align-items-center gap-2 small">
                        <CheckCircle2 size={16} className="text-primary-custom flex-shrink-0" />
                        <span className="text-muted">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => onOpenBooking('dog', 'Tắm & Sấy Vệ Sinh')}
                    className="btn btn-outline-dark border-primary-custom text-primary-custom rounded-pill w-100 mt-auto py-2.5 fw-bold"
                  >
                    Chọn gói cơ bản
                  </button>
                </div>
              </div>

              {/* Premium Package Card */}
              <div className="col-12 col-md-6 col-lg-5">
                <div className="p-4 rounded-24 h-100 border border-secondary-custom relative overflow-hidden" 
                  style={{
                    background: isDarkMode 
                      ? 'linear-gradient(to bottom, #111e3b 0%, #0d122b 100%)' 
                      : 'linear-gradient(to bottom, #F1F5F9 0%, #ffffff 100%)',
                    boxShadow: '0 10px 30px rgba(249, 115, 22, 0.1)'
                  }}
                >
                  <span className="badge bg-secondary-custom text-white rounded-pill px-3 py-1 mb-3 text-uppercase fw-extrabold" style={{ fontSize: '10px' }}>VIP TẬP TRUNG TẠO KIỂU</span>
                  <h4 className="fw-extrabold fs-2 text-secondary-custom mb-1">{currentPrices.premium.price}</h4>
                  <p className="text-muted fs-7 mb-4">Thời gian chăm ước lượng: {currentPrices.premium.duration}</p>
                  
                  <hr className="opacity-10 mb-4 border-secondary-custom" />
                  
                  <ul className="list-unstyled d-flex flex-column gap-3 mb-4">
                    {currentPrices.premium.features.map((f, i) => (
                      <li key={i} className="d-flex align-items-center gap-2 small">
                        <CheckCircle2 size={16} className="text-secondary-custom flex-shrink-0" />
                        <span className="fw-semibold text-primary-custom">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => onOpenBooking('dog', 'Cắt Tỉa Thẩm Mỹ')}
                    className="btn btn-secondary-custom text-white rounded-pill w-100 mt-auto py-2.5 fw-extrabold shadow"
                  >
                    Đặt lịch gói VIP Art
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: REAL REVIEWS FROM CUSTOMERS */}
          {selectedTab === 'reviews' && (
            <div className="text-start">
              <div className="row g-4 align-items-center mb-5">
                <div className="col-12 col-md-4 text-center text-md-start">
                  <h3 className="display-3 fw-extrabold text-secondary-custom m-0">5.0</h3>
                  <div className="d-flex justify-content-center justify-content-md-start my-2 text-secondary-custom">
                    <Star fill="currentColor" size={20} />
                    <Star fill="currentColor" size={20} />
                    <Star fill="currentColor" size={20} />
                    <Star fill="currentColor" size={20} />
                    <Star fill="currentColor" size={20} />
                  </div>
                  <p className="text-muted small mb-0">Tính trên 89 lượt bầu chọn tạo kiểu trong 30 ngày qua</p>
                </div>
                <div className="col-12 col-md-8">
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex align-items-center gap-3">
                      <span className="small fw-semibold text-muted" style={{ width: '40px' }}>5 sao</span>
                      <div className="progress flex-grow-1" style={{ height: '8px' }}>
                        <div className="progress-bar bg-secondary-custom" style={{ width: '100%' }} />
                      </div>
                      <span className="small text-muted" style={{ width: '35px' }}>100%</span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <span className="small fw-semibold text-muted" style={{ width: '40px' }}>4 sao</span>
                      <div className="progress flex-grow-1" style={{ height: '8px' }}>
                        <div className="progress-bar bg-secondary-custom" style={{ width: '0%' }} />
                      </div>
                      <span className="small text-muted" style={{ width: '35px' }}>0%</span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <span className="small fw-semibold text-muted" style={{ width: '40px' }}>3 sao</span>
                      <div className="progress flex-grow-1" style={{ height: '8px' }}>
                        <div className="progress-bar bg-secondary-custom" style={{ width: '0%' }} />
                      </div>
                      <span className="small text-muted" style={{ width: '35px' }}>0%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add New Review Section */}
              <div className={`p-4 rounded-24 border mb-4 ${isDarkMode ? 'bg-slate-900 border-white/5' : 'bg-light border-transparent shadow-sm'}`}>
                <h5 className="fw-bold mb-3 text-primary-custom">Đánh giá dịch vụ tạo kiểu</h5>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span className="small text-muted fw-semibold">Mức độ hài lòng:</span>
                  <div className="d-flex gap-1 text-neutral-300" style={{ cursor: 'pointer' }}>
                    {[1,2,3,4,5].map(star => (
                       <Star key={star} size={22} className="hover:text-secondary-custom transition-colors" />
                    ))}
                  </div>
                </div>
                <div className="mb-3">
                  <textarea 
                    className={`form-control rounded-16 shadow-none ${isDarkMode ? 'bg-slate-800 text-white border-white/10' : 'bg-white border-neutral-200'}`}
                    rows="3" 
                    placeholder="Chia sẻ trải nghiệm của bạn về dịch vụ cắt tỉa tạo kiểu..."
                    style={{ fontSize: '14px', resize: 'none' }}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-secondary-custom text-white rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2 hover:scale-105 transition-all">
                    Gửi đánh giá <MessageSquare size={16} />
                  </button>
                </div>
              </div>

              {/* Individual reviews */}
              <div className="d-flex flex-column gap-4">
                {groomingReviews.map((rev) => (
                  <div 
                    key={rev.id}
                    className={`p-4 rounded-24 border ${isDarkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-primary-custom shadow-sm'}`}
                  >
                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
                      <div className="d-flex gap-3 align-items-center">
                        <div className="avatar bg-primary-custom text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '45px', height: '45px' }}>
                          {rev.author[0] || 'K'}
                        </div>
                        <div>
                          <h6 className="fw-bold mb-0 text-primary-custom">{rev.author}</h6>
                          <small className="text-secondary-custom fw-semibold">{rev.pet}</small>
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="text-secondary-custom flex gap-0.5">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} size={14} fill="currentColor" className="inline text-secondary-custom" />
                          ))}
                        </div>
                        <small className="text-muted d-block mt-1">{rev.date}</small>
                      </div>
                    </div>
                    <p className="text-muted small mb-3" style={{ lineHeight: '1.6' }}>{rev.content}</p>
                    
                    <div className="d-flex gap-3 text-muted align-items-center border-top pt-3 border-primary-custom dark:border-white/5">
                      <button 
                        onClick={() => handleLike(rev.id)}
                        className={`btn btn-link p-0 text-decoration-none d-flex align-items-center gap-1.5 small shadow-none ${likedReviews[rev.id] ? 'text-secondary-custom' : 'text-muted'}`}
                      >
                        <ThumbsUp size={14} />
                        Hữu ích ({likedReviews[rev.id] ? rev.likes + 1 : rev.likes})
                      </button>
                      <span className="text-neutral-300">|</span>
                      <span className="small text-muted d-flex align-items-center gap-1">
                        <MessageSquare size={14} />
                        Thảo luận (0)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 4. MEET THE DEDICATED ARTISTS */}
      <section className="py-5 px-3 px-md-5">
        <div className="container" style={{ maxWidth: '1140px' }}>
          <div className="text-center mb-5">
            <span className="badge bg-secondary-custom text-white rounded-pill px-3 py-1 mb-2 fw-bold text-xs">Đội Ngũ Chuyên Gia</span>
            <h3 className="fw-extrabold text-primary-custom display-6">Các Nghệ Nhân Của PawHome</h3>
            <p className="text-muted mt-2">Dày dạn kinh nghiệm và tận tâm với mọi bạn nhỏ từ quen thuộc đến ngoại lai.</p>
          </div>

          <div className="row g-4 justify-content-center">
            {groomingExperts.map((expert, idx) => (
              <div key={idx} className="col-12 col-md-6 col-lg-4 d-flex">
                <div className={`p-4 rounded-24 border transition-all hover:-translate-y-1 hover:shadow-lg d-flex flex-column text-start w-100 ${isDarkMode ? 'bg-gradient-to-br from-slate-900 to-black/80 border-primary-custom' : 'bg-light border-primary-custom shadow-sm'}`}>
                  
                  <div className="text-center mb-4">
                    <div className="position-relative d-inline-block">
                      <img 
                        src={expert.image} 
                        alt={expert.name}
                        className="rounded-circle border border-primary-custom p-1"
                        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                      />
                      <div className="position-absolute bottom-0 end-0 bg-secondary-custom text-white text-xs fw-extrabold rounded-circle d-flex align-items-center justify-content-center shadow" style={{ width: '32px', height: '32px' }}>
                        <Award size={16} />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="fw-extrabold mb-1 text-primary-custom text-center fs-4">{expert.name}</h3>
                  <p className="text-secondary-custom fw-bold mb-3 fs-7 text-center">{expert.title}</p>
                  
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                    <div className="text-secondary-custom d-flex align-items-center gap-1">
                      <Star size={16} fill="currentColor" />
                      <span className="fw-bold fs-7 text-dark dark:text-white">{expert.rating?.toFixed(1) || "5.0"}</span>
                    </div>
                    <span className="text-muted small fw-semibold">({expert.reviewsCount} đánh giá)</span>
                  </div>

                  <p className="text-muted small mb-4 flex-grow-1 text-center" style={{ lineHeight: '1.6' }}>
                    {expert.description}
                  </p>

                  <div className="d-flex flex-wrap justify-content-center gap-2 mt-auto">
                    {expert.tags?.map((tag, i) => (
                      <span key={i} className="badge bg-white dark:bg-slate-800 text-muted rounded-pill px-2.5 py-1.5 font-semibold text-xs border border-primary-custom dark:border-white/5">{tag}</span>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA BANNER */}
      <section 
        className="py-5 px-3 px-md-5 text-white text-center position-relative overflow-hidden rounded-24 mx-3 mx-md-5 my-4"
        style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #334155 100%)' }}
      >
        {/* Decorative circle glow */}
        <div className="position-absolute rounded-circle bg-white/5 blur-2xl" style={{ width: '250px', height: '250px', top: '-50px', right: '-50px' }} />
        
        <div className="position-relative" style={{ zIndex: 10 }}>
          <h2 className="display-6 fw-extrabold text-white mb-3">Tỏa Sáng Rực Rỡ Cùng Bạn Thân Cưng</h2>
          <p className="lead mx-auto mb-4 text-light" style={{ maxWidth: '650px', fontSize: '16.5px', lineHeight: '1.7' }}>
            Đặt lịch làm đẹp hôm nay tại PawHome để trao cho bé yêu trải nghiệm thư sục sang chảnh tuyệt hảo và khoác lên bộ áo mới đầy kiêu hãnh.
          </p>
          
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <button 
              onClick={() => onOpenBooking('dog', 'Cắt Tỉa Thẩm Mỹ')}
              className="btn btn-secondary-custom rounded-pill px-4 py-3 fw-extrabold hover:scale-105 transition-transform"
            >
              Đặt chỗ ngay (Giảm 10% lần đầu)
            </button>
            <button 
              onClick={onBack}
              className="btn btn-outline-light rounded-pill px-4 py-3 fw-bold border-2"
            >
              Khám phá dịch vụ khác
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
