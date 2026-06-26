import React, { useState } from 'react';
import { 
  Scissors, Home, Shield, Award, MapPin, 
  Heart, Sparkles, Activity, Search, Phone, CalendarCheck2, CheckCircle2,
  BookmarkCheck, ArrowRight, UserCheck
} from 'lucide-react';
import SERVICES_HERO_IMAGE from "../assets/images/pet_family_header_1782054161990.jpg";

export default function ServicesPage({ onOpenBookingWithDetails, onViewGroomingDetail, isDarkMode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Chó', value: 'dog' },
    { label: 'Mèo', value: 'cat' },
    { label: 'Chim', value: 'bird' },
    { label: 'Chuột Hamster', value: 'hamster' },
    { label: 'Thỏ', value: 'rabbit' }
  ];

  const services = [
    {
      id: 'grooming',
      title: 'Cắt tỉa & Spa',
      desc: 'Dịch vụ làm đẹp chuyên nghiệp, từ tắm massage đến tạo kiểu theo yêu cầu.',
      category: ['dog', 'cat'],
      icon: Scissors,
      color: 'bg-primary-custom',
      petType: 'dog',
      serviceName: 'Cắt Tỉa Thẩm Mỹ'
    },
    {
      id: 'boarding',
      title: 'Lưu trú cao cấp',
      desc: 'Hệ thống phòng nghỉ hiện đại, điều hòa 24/7 và camera giám sát.',
      category: ['dog', 'cat', 'rabbit'],
      icon: Home,
      color: 'bg-primary-custom',
      petType: 'dog',
      serviceName: 'Lưu Trú Cao Cấp'
    },
    {
      id: 'clinic',
      title: 'Khám sức khỏe',
      desc: 'Kiểm tra định kỳ và tư vấn dinh dưỡng bởi đội ngũ bác sĩ thú y tận tâm.',
      category: ['dog', 'cat', 'bird', 'hamster', 'rabbit'],
      icon: Shield,
      color: 'bg-primary-custom',
      petType: 'dog',
      serviceName: 'Khám Tổng Quát'
    },
    {
      id: 'training',
      title: 'Huấn luyện',
      desc: 'Xây dựng thói quen tốt thông qua các bài tập tương tác tích cực.',
      category: ['dog', 'cat'],
      icon: Sparkles,
      color: 'bg-primary-custom',
      petType: 'dog',
      serviceName: 'Huấn luyện cơ bản'
    },
    {
      id: 'walking',
      title: 'Dắt chó đi dạo',
      desc: 'Giúp bé vận động và giải tỏa năng lượng với lộ trình an toàn, thú vị.',
      category: ['dog'],
      icon: MapPin,
      color: 'bg-primary-custom',
      petType: 'dog',
      serviceName: 'Dắt chó đi dạo'
    },
    {
      id: 'sitting',
      title: 'Chăm sóc tại nhà',
      desc: 'Chăm sóc tận nơi khi bạn vắng nhà, đảm bảo bé luôn cảm thấy an tâm.',
      category: ['dog', 'cat', 'bird', 'hamster', 'rabbit'],
      icon: Heart,
      color: 'bg-primary-custom',
      petType: 'cat',
      serviceName: 'Chăm sóc tại nhà'
    },
    {
      id: 'therapy',
      title: 'Trị liệu & Phục hồi',
      desc: 'Các liệu pháp vật lý trị liệu giúp bé nhanh chóng hồi phục sức khỏe.',
      category: ['dog', 'cat'],
      icon: Activity,
      color: 'bg-primary-custom',
      petType: 'dog',
      serviceName: 'Trị liệu & Phục hồi'
    },
    {
      id: 'shop',
      title: 'Cửa hàng phụ kiện',
      desc: 'Cung cấp thức ăn, đồ chơi và phụ kiện cao cấp cho người bạn nhỏ.',
      category: ['dog', 'cat', 'bird', 'hamster', 'rabbit'],
      icon: BookmarkCheck,
      color: 'bg-primary-custom',
      petType: 'dog',
      serviceName: 'Mua Sắm Phụ Kiện'
    }
  ];

  // Filter logic
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          service.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`fade-in pb-5 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-dark'}`}>
      {/* Style tag for modern beautiful neon gradient glow animations */}
      <style>{`
        @keyframes neon-gradient-blueish {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes neon-glow-blueish {
          0%, 100% {
            filter: drop-shadow(0 0 3px rgba(30, 58, 138, 0.4)) drop-shadow(0 0 8px rgba(30, 58, 138, 0.2));
          }
          50% {
            filter: drop-shadow(0 0 8px rgba(30, 58, 138, 0.7)) drop-shadow(0 0 16px rgba(96, 165, 250, 0.45));
          }
        }
        @keyframes neon-gradient-orangey {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes neon-glow-orangey {
          0%, 100% {
            filter: drop-shadow(0 0 3px rgba(249, 115, 22, 0.4)) drop-shadow(0 0 8px rgba(249, 115, 22, 0.2));
          }
          50% {
            filter: drop-shadow(0 0 8px rgba(249, 115, 22, 0.8)) drop-shadow(0 0 16px rgba(251, 146, 60, 0.5));
          }
        }
        .text-neon-blue-light {
          background: linear-gradient(135deg, #1E3A8A 0%, #2563eb 25%, #3b82f6 50%, #1d4ed8 75%, #1E3A8A 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: neon-gradient-blueish 3s ease infinite, neon-glow-blueish 2s infinite ease-in-out;
          display: inline-block;
        }
        .text-neon-blue-dark {
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 25%, #93c5fd 50%, #2563eb 75%, #60a5fa 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: neon-gradient-blueish 3s ease infinite, neon-glow-blueish 2s infinite ease-in-out;
          display: inline-block;
        }
        .text-neon-orange {
          background: linear-gradient(135deg, #F97316 0%, #ea580c 25%, #fb923c 50%, #f97316 75%, #F97316 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: neon-gradient-orangey 3s ease infinite, neon-glow-orangey 2s infinite ease-in-out;
          display: inline-block;
        }
      `}</style>

      
      {/* 1. HERO SECTION */}
      <section 
        className="position-relative overflow-hidden d-flex align-items-center py-5 py-md-5"
        style={{
          minHeight: '82vh',
          backgroundImage: `url(${SERVICES_HERO_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginTop: '0px'
        }}
      >
        {/* Dark/Warm gradient overlay to ensure text contrast and readability */}
        <div 
          className="position-absolute inset-0" 
          style={{
            background: isDarkMode 
              ? 'linear-gradient(to right, rgba(13, 28, 47, 0.95) 0%, rgba(13, 28, 47, 0.7) 50%, rgba(13, 28, 47, 0.3) 100%)' 
              : 'linear-gradient(to right, rgba(0, 35, 111, 0.85) 0%, rgba(0, 35, 111, 0.6) 50%, rgba(0, 35, 111, 0.25) 100%)',
            zIndex: 1
          }} 
        />

        <div className="container position-relative px-4 px-md-5 py-4" style={{ zIndex: 2, maxWidth: '1200px' }}>
          <div className="row">
            <div className="col-12 col-md-8 col-lg-7 text-start text-white">
              <span 
                className="badge rounded-pill text-uppercase px-3 py-2 mb-4 animate-bounce"
                style={{ backgroundColor: 'var(--secondary-color)', fontSize: '11px', fontWeight: '800', letterSpacing: '1px' }}
              >
                Chào mừng đến với PawHome
              </span>
              <h1 className="display-4 fw-extrabold mb-3 tracking-tight text-white leading-tight">
                <span className={isDarkMode ? "text-neon-blue-dark" : "text-neon-blue-light"}>Dịch Vụ Chăm Sóc</span> <br />
                <span className="text-neon-orange">Toàn Diện</span> <span className={isDarkMode ? "text-neon-blue-dark" : "text-neon-blue-light"}>Cho Thú Cưng</span>
              </h1>
              <p className="lead mb-4 mt-2 fs-6" style={{ maxWidth: '580px', lineHeight: '1.7', color: '#ffffff', fontWeight: '500', textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 4px 20px rgba(0, 0, 0, 0.7)' }}>
                Trải nghiệm Spa & Lưu trú 5 sao hoàn mỹ – Nơi tình yêu thương đong đầy trong từng chi tiết chăm sóc dành riêng cho bé yêu của bạn.
              </p>
              <div className="d-flex flex-wrap gap-3 pt-2">
                <button 
                  onClick={() => scrollToSection('featured-services')}
                  className="btn btn-secondary-custom rounded-pill text-white px-4 py-3 fw-bold d-flex align-items-center gap-2"
                >
                  Khám phá ngay
                  <ArrowRight size={18} />
                </button>
                <button 
                  onClick={() => scrollToSection('pricing-section')}
                  className="btn btn-outline-light rounded-pill px-4 py-3 fw-bold"
                  style={{ borderWidth: '2px' }}
                >
                  Xem bảng giá
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE SERVICES MATRIX WITH LIVE FILTERS */}
      <section id="featured-services" className="py-5 px-3 px-md-5">
        <div className="container my-4" style={{ maxWidth: '1200px' }}>
          
          {/* Header */}
          <div className="text-center mb-5">
            <h2 className="display-6 fw-extrabold text-primary-custom mb-3">Các Gói Dịch Vụ Nổi Bật</h2>
            <div className="mx-auto rounded-pill" style={{ width: '80px', height: '5px', backgroundColor: 'var(--secondary-color)' }} />
          </div>

          {/* Search Inputs and Category Pills */}
          <div className="row justify-content-center mb-5">
            <div className="col-12 col-md-8 col-lg-6 mb-4">
              <div className="position-relative">
                <input 
                  type="text" 
                  className={`form-control rounded-pill py-3 px-4 shadow` + (isDarkMode ? ' bg-dark border-secondary text-white' : ' bg-white border-0')}
                  placeholder="Tìm kiếm dịch vụ chăm sóc..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ fontSize: '15px' }}
                />
                <Search className="position-absolute text-muted" size={20} style={{ right: '20px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div className="col-12 text-center">
              <div className="d-flex flex-wrap gap-2 justify-content-center">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`btn rounded-pill px-4 py-2 text-decoration-none shadow-sm fw-bold border-0 transition-all`}
                    style={{
                      fontSize: '13.5px',
                      backgroundColor: selectedCategory === cat.value ? 'var(--primary-color)' : (isDarkMode ? '#1e293b' : '#ffffff'),
                      color: selectedCategory === cat.value ? '#ffffff' : (isDarkMode ? '#cbd5e1' : '#475569')
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid of cards */}
          {filteredServices.length > 0 ? (
            <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-4 justify-content-center">
              {filteredServices.map((srv) => {
                const IconComponent = srv.icon;
                return (
                  <div key={srv.id} className="col">
                    <div 
                      className={`card h-100 p-4 border rounded-32 shadow-sm transition-all hover-translate-y d-flex flex-column text-start`}
                      style={{
                        backgroundColor: isDarkMode ? '#11223e' : '#ffffff',
                        borderColor: isDarkMode ? '#1b3154' : 'rgba(0, 35, 111, 0.06)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-6px)';
                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 35, 111, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {/* Circle visual header logo */}
                      <div 
                        className="rounded-24 d-flex align-items-center justify-content-center mb-4 transition-all"
                        style={{
                          width: '60px',
                          height: '60px',
                          backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.1)' : 'rgba(0, 35, 111, 0.05)',
                          color: isDarkMode ? '#60a5fa' : 'var(--primary-color)'
                        }}
                      >
                        <IconComponent size={30} strokeWidth={2.2} />
                      </div>

                      {/* Info components */}
                      <h4 className="fw-extrabold text-primary-custom mb-3" style={{ fontSize: '19px' }}>
                        {srv.title}
                      </h4>
                      <p className="text-muted small mb-4 flex-grow-1" style={{ lineHeight: '1.6' }}>
                        {srv.desc}
                      </p>

                      {/* Link buttons */}
                      <button 
                        onClick={() => {
                          if (srv.id === 'grooming' && onViewGroomingDetail) {
                            onViewGroomingDetail();
                          } else {
                            onOpenBookingWithDetails(srv.petType, srv.serviceName);
                          }
                        }}
                        className="btn p-0 border-0 fw-bold text-secondary-custom d-flex align-items-center gap-2 hover-secondary-custom text-start shadow-none mt-auto"
                        style={{ background: 'none', fontSize: '14.5px' }}
                      >
                        Xem chi tiết 
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted fs-5">Không tìm thấy dịch vụ nào phù hợp với từ khóa của bạn.</p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }} 
                className="btn btn-primary-custom rounded-pill mt-3"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 3. PHILOSOPHY / WHY CHOOSE US */}
      <section className="py-5 px-3 px-md-5">
        <div className="container py-4" style={{ maxWidth: '1200px' }}>
          <div className="row align-items-center g-5">
            
            {/* Mascot and graphics row */}
            <div className="col-12 col-md-6 text-center text-md-start position-relative">
              <div className="position-relative d-inline-block">
                {/* Visual pet portrait matching upscale golden retriever photo described in HTML instructions */}
                <img 
                  src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=600"
                  alt="Chăm sóc chó mèo hoàn hảo" 
                  className="rounded-40 shadow-xl border-5 img-fluid"
                  style={{
                    maxWidth: '450px',
                    borderColor: isDarkMode ? '#1b3154' : '#ffffff',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)'
                  }}
                />
                
                {/* Custom animated absolute badge floating on top */}
                <div 
                  className="position-absolute bg-white text-dark p-3 rounded-24 shadow-lg d-flex align-items-center gap-3 animate-bounce"
                  style={{
                    bottom: '20px',
                    left: '-15px',
                    border: '1px solid rgba(0,0,0,0.05)',
                    maxWidth: '190px'
                  }}
                >
                  <div className="rounded-circle bg-warning p-2 text-white">
                    <Heart size={20} fill="#ffffff" />
                  </div>
                  <div className="text-start">
                    <p className="fw-extrabold m-0 lh-1 text-primary-custom" style={{ fontSize: '13px' }}>100% Tận Tâm</p>
                    <p className="text-muted m-0 small" style={{ fontSize: '11px' }}>Treat like family</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content list */}
            <div className="col-12 col-md-6 text-start">
              <h2 className="display-6 fw-extrabold text-primary-custom mb-4 font-sans leading-tight">
                Tình Yêu & Trách Nhiệm - Triết Lý Tại PawHome
              </h2>
              <p className="text-muted mb-4 lead fs-6" style={{ lineHeight: '1.7' }}>
                Chúng tôi không chỉ cung cấp dịch vụ, chúng tôi xây dựng một ngôi nhà thứ hai cho thú cưng của bạn. 
                Mỗi nhân viên tại PawHome đều là những người yêu động vật thực thụ.
              </p>

              <div className="d-flex flex-column gap-4">
                <div className="d-flex gap-3 text-start">
                  <div className="rounded-3 bg-primary-custom text-white d-flex align-items-center justify-content-center p-2" style={{ height: '48px', width: '48px', minWidth: '48px' }}>
                    <UserCheck size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1 text-primary-custom">Chất lượng 5 sao</h5>
                    <p className="text-muted small mb-0">Cơ sở vật chất đạt chuẩn quốc tế, đảm bảo an toàn tuyệt đối cho bé cưng.</p>
                  </div>
                </div>

                <div className="d-flex gap-3 text-start">
                  <div className="rounded-3 bg-primary-custom text-white d-flex align-items-center justify-content-center p-2" style={{ height: '48px', width: '48px', minWidth: '48px' }}>
                    <Award size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1 text-primary-custom">Đội ngũ chuyên nghiệp</h5>
                    <p className="text-muted small mb-0">Chứng chỉ chuyên môn cao cấp từ các hiệp hội hỗ trợ chăm sóc lông và y khoa thú cưng.</p>
                  </div>
                </div>

                <div className="d-flex gap-3 text-start">
                  <div className="rounded-3 bg-primary-custom text-white d-flex align-items-center justify-content-center p-2" style={{ height: '48px', width: '48px', minWidth: '48px' }}>
                    <Activity size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1 text-primary-custom">Hỗ trợ 24/7</h5>
                    <p className="text-muted small mb-0">Luôn túc trực mỗi khi bạn bận rộn hay đi xa, báo cáo thông tin cập nhật liên tục.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. PROCESS ROADMAP banner */}
      <section id="process-section" className={`py-5 border-top border-bottom`} style={{ backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
        {/* Style tag for custom movement animations for transition chevrons */}
        <style>{`
          @keyframes slide-right-pulse {
            0%, 100% {
              transform: translateX(0) scale(1);
              opacity: 0.55;
              color: #cbd5e1;
            }
            50% {
              transform: translateX(8px) scale(1.15);
              opacity: 1;
              color: #F97316;
            }
          }
          .animate-arrow-transition {
            animation: slide-right-pulse 1.8s infinite ease-in-out;
          }
        `}</style>
        
        <div className="container py-4 text-center position-relative" style={{ maxWidth: '1140px' }}>
          <div className="text-center mb-5">
            <h2 className="mb-2" style={{ color: isDarkMode ? '#ffffff' : '#1E3A8A', fontWeight: '850', fontSize: 'calc(1.8rem + 1.2vw)', letterSpacing: '-0.03em' }}>
              Quy Trình Đặt Lịch Đơn Giản
            </h2>
            <p className="text-muted small mx-auto" style={{ maxWidth: '500px', fontSize: '14.5px', lineHeight: '1.6' }}>
              Chỉ với 3 bước đơn giản, người bạn bốn chân của bạn đã sẵn sàng trải nghiệm kỳ nghỉ dưỡng tuyệt mĩ!
            </p>
          </div>

          <div className="row g-4 text-center justify-content-center position-relative">
            
            {/* Step 1 */}
            <div className="col-12 col-md-4 position-relative">
              <div className="card h-100 p-4 border-0 d-flex flex-column align-items-start text-start"
                   style={{
                     backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                     borderRadius: '32px',
                     boxShadow: isDarkMode ? '0 10px 30px rgba(0, 0, 0, 0.2)' : '0 10px 30px rgba(30, 58, 138, 0.05)',
                     transition: 'all 0.3s ease',
                     minHeight: '390px',
                     position: 'relative',
                     overflow: 'hidden',
                     border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(30, 58, 138, 0.04)'
                   }}>
                {/* Big watermark number */}
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '15px',
                  fontSize: '110px',
                  fontWeight: '900',
                  color: isDarkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(30, 58, 138, 0.03)',
                  lineHeight: '1',
                  pointerEvents: 'none',
                  userSelect: 'none'
                }}>1</div>

                {/* Badge */}
                <span className="badge mb-3 px-3 py-2 rounded-pill" 
                      style={{ 
                        backgroundColor: isDarkMode ? 'rgba(30, 58, 138, 0.25)' : 'rgba(30, 58, 138, 0.08)', 
                        color: isDarkMode ? '#60a5fa' : '#1E3A8A',
                        fontSize: '11px',
                        fontWeight: '800',
                        letterSpacing: '0.05em'
                      }}>
                  BƯỚC 1
                </span>

                {/* Simulated visual block */}
                <div className="w-100 p-3 rounded-4 mb-4 d-flex flex-column gap-2" 
                     style={{ 
                       backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.02)' : '#f8fafc', 
                       border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #f1f5f9',
                       borderRadius: '24px',
                       height: '140px',
                       justifyContent: 'center'
                     }}>
                  {/* Search bar simulation */}
                  <div className="p-2 rounded-3 d-flex align-items-center gap-2 border shadow-sm"
                       style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#ffffff', borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1' }}>
                    <span className="material-symbols-outlined text-muted" style={{ fontSize: '15px' }}>search</span>
                    <div style={{ width: '40%', height: '8px', backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : '#e2e8f0', borderRadius: '4px' }} />
                  </div>
                  {/* Info badges row */}
                  <div className="row g-2 mt-1">
                    <div className="col-6">
                      <div className="py-2 px-2.5 rounded-pill d-flex align-items-center gap-1.5 border shadow-sm"
                           style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#ffffff', borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#1E3A8A' }}>location_on</span>
                        <div style={{ width: '25px', height: '6px', backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : '#cbd5e1', borderRadius: '3px' }} />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="py-2 px-2.5 rounded-pill d-flex align-items-center gap-1.5 border shadow-sm"
                           style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#ffffff', borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#F97316' }}>star</span>
                        <div style={{ width: '25px', height: '6px', backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : '#cbd5e1', borderRadius: '3px' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="fw-bold mb-2" style={{ color: isDarkMode ? '#ffffff' : '#1E3A8A', fontSize: '18px', letterSpacing: '-0.02em' }}>Chọn Dịch Vụ</h3>
                <p className="text-muted small mb-0" style={{ lineHeight: '1.5', fontSize: '13.5px' }}>
                  Lựa chọn gói dịch vụ chăm sóc hoàn mĩ thông qua ứng dụng hoặc website chính thức PawHome.
                </p>
              </div>

              {/* Connector Chevron Arrow Step 1 to 2 */}
              <div className="d-none d-md-flex position-absolute align-items-center justify-content-center animate-arrow-transition"
                   style={{
                     width: '32px',
                     height: '32px',
                     right: '-16px',
                     top: '40%',
                     zIndex: '15',
                     pointerEvents: 'none'
                   }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 17L11 12L6 7M13 17L18 12L13 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Step 2 */}
            <div className="col-12 col-md-4 position-relative">
              <div className="card h-100 p-4 border-0 d-flex flex-column align-items-start text-start"
                   style={{
                     backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                     borderRadius: '32px',
                     boxShadow: isDarkMode ? '0 10px 30px rgba(0, 0, 0, 0.2)' : '0 10px 30px rgba(30, 58, 138, 0.05)',
                     transition: 'all 0.3s ease',
                     minHeight: '390px',
                     position: 'relative',
                     overflow: 'hidden',
                     border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(30, 58, 138, 0.04)'
                   }}>
                {/* Big watermark number */}
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '15px',
                  fontSize: '110px',
                  fontWeight: '900',
                  color: isDarkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(249, 115, 22, 0.03)',
                  lineHeight: '1',
                  pointerEvents: 'none',
                  userSelect: 'none'
                }}>2</div>

                {/* Badge */}
                <span className="badge mb-3 px-3 py-2 rounded-pill" 
                      style={{ 
                        backgroundColor: isDarkMode ? 'rgba(249, 115, 22, 0.25)' : 'rgba(249, 115, 22, 0.08)', 
                        color: isDarkMode ? '#ffedd5' : '#F97316',
                        fontSize: '11px',
                        fontWeight: '800',
                        letterSpacing: '0.05em'
                      }}>
                  BƯỚC 2
                </span>

                {/* Simulated visual block */}
                <div className="w-100 p-3 rounded-4 mb-4 d-flex flex-column gap-2" 
                     style={{ 
                       backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.02)' : '#f8fafc', 
                       border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #f1f5f9',
                       borderRadius: '24px',
                       height: '140px',
                       justifyContent: 'center'
                     }}>
                  {/* Time slots simulation */}
                  <div className="row g-1 mb-1" style={{ fontSize: '9px', fontWeight: '800' }}>
                    <div className="col-4">
                      <div className="text-center py-1 rounded border shadow-sm" style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#ffffff', color: isDarkMode ? '#cbd5e1' : '#0f172a', borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1' }}>09:00</div>
                    </div>
                    <div className="col-4">
                      <div className="text-center py-1 rounded border shadow-sm" style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#ffffff', color: isDarkMode ? '#cbd5e1' : '#0f172a', borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1' }}>10:00</div>
                    </div>
                    <div className="col-4">
                      <div className="text-white text-center py-1 rounded shadow-sm" style={{ background: 'linear-gradient(135deg, #F97316 0%, #fb923c 100%)' }}>11:00</div>
                    </div>
                  </div>
                  <div className="row g-1 mb-1" style={{ fontSize: '9px', fontWeight: '800' }}>
                    <div className="col-4">
                      <div className="text-center py-1 rounded border shadow-sm" style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#ffffff', color: isDarkMode ? '#cbd5e1' : '#0f172a', borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1' }}>14:00</div>
                    </div>
                    <div className="col-4">
                      <div className="text-center py-1 rounded border shadow-sm" style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#ffffff', color: isDarkMode ? '#cbd5e1' : '#0f172a', borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1' }}>15:00</div>
                    </div>
                    <div className="col-4">
                      <div className="text-center py-1 rounded border shadow-sm" style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#ffffff', color: isDarkMode ? '#cbd5e1' : '#0f172a', borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1' }}>16:00</div>
                    </div>
                  </div>
                  {/* Action button simulation */}
                  <div className="w-100 py-1.5 mt-1 rounded-pill text-center text-white d-flex align-items-center justify-content-center gap-1.5 shadow-sm"
                       style={{ backgroundColor: isDarkMode ? '#1e293b' : '#1E3A8A', fontSize: '9px', fontWeight: '800', letterSpacing: '0.04em' }}>
                    <div style={{ width: '5px', height: '5px', backgroundColor: '#22c55e', borderRadius: '50%' }}></div>
                    XÁC NHẬN LỊCH
                  </div>
                </div>

                {/* Content */}
                <h3 className="fw-bold mb-2" style={{ color: isDarkMode ? '#ffffff' : '#1E3A8A', fontSize: '18px', letterSpacing: '-0.02em' }}>Xác Nhận & Đưa Đón</h3>
                <p className="text-muted small mb-0" style={{ lineHeight: '1.5', fontSize: '13.5px' }}>
                  Chuyên viên nhanh chóng liên hệ hẹn đặt, điều phối xe đưa đón bé cưng tại nhà theo yêu cầu.
                </p>
              </div>

              {/* Connector Chevron Arrow Step 2 to 3 */}
              <div className="d-none d-md-flex position-absolute align-items-center justify-content-center animate-arrow-transition"
                   style={{
                     width: '32px',
                     height: '32px',
                     right: '-16px',
                     top: '40%',
                     zIndex: '15',
                     pointerEvents: 'none'
                   }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 17L11 12L6 7M13 17L18 12L13 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Step 3 */}
            <div className="col-12 col-md-4 position-relative">
              <div className="card h-100 p-4 border-0 d-flex flex-column align-items-start text-start"
                   style={{
                     backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                     borderRadius: '32px',
                     boxShadow: isDarkMode ? '0 10px 30px rgba(0, 0, 0, 0.2)' : '0 10px 30px rgba(30, 58, 138, 0.05)',
                     transition: 'all 0.3s ease',
                     minHeight: '390px',
                     position: 'relative',
                     overflow: 'hidden',
                     border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(30, 58, 138, 0.04)'
                   }}>
                {/* Big watermark number */}
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '15px',
                  fontSize: '110px',
                  fontWeight: '900',
                  color: isDarkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(30, 58, 138, 0.03)',
                  lineHeight: '1',
                  pointerEvents: 'none',
                  userSelect: 'none'
                }}>3</div>

                {/* Badge */}
                <span className="badge mb-3 px-3 py-2 rounded-pill" 
                      style={{ 
                        backgroundColor: isDarkMode ? 'rgba(30, 58, 138, 0.25)' : 'rgba(30, 58, 138, 0.08)', 
                        color: isDarkMode ? '#60a5fa' : '#1E3A8A',
                        fontSize: '11px',
                        fontWeight: '800',
                        letterSpacing: '0.05em'
                      }}>
                  BƯỚC 3
                </span>

                {/* Simulated visual block */}
                <div className="w-100 p-3 rounded-4 mb-4 d-flex flex-column gap-2 align-items-center" 
                     style={{ 
                       backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.02)' : '#f8fafc', 
                       border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #f1f5f9',
                       borderRadius: '24px',
                       height: '140px',
                       justifyContent: 'center'
                     }}>
                  {/* Glowing stars */}
                  <div className="d-flex gap-1 mb-1 justify-content-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1', fontSize: '15px', color: '#F97316' }}>star</span>
                    ))}
                  </div>
                  {/* Custom feedback box simulation */}
                  <div className="p-2 rounded-3 d-flex gap-2 border shadow-sm w-100 align-items-center"
                       style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#ffffff', borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1' }}>
                    <div style={{ width: '22px', height: '22px', backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : '#cbd5e1', borderRadius: '50%' }} />
                    <div className="d-flex flex-column gap-1 flex-grow-1">
                      <div style={{ width: '40px', height: '6px', backgroundColor: isDarkMode ? '#94a3b8' : '#718096', borderRadius: '3px' }} />
                      <div style={{ width: '75px', height: '4px', backgroundColor: isDarkMode ? '#475569' : '#cbd5e1', borderRadius: '2px' }} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="fw-bold mb-2" style={{ color: isDarkMode ? '#ffffff' : '#1E3A8A', fontSize: '18px', letterSpacing: '-0.02em' }}>Tận Hưởng & Nhận Bé</h3>
                <p className="text-muted small mb-0" style={{ lineHeight: '1.5', fontSize: '13.5px' }}>
                  Bé cưng tận hưởng liệu trình tắm spa chuẩn 5 sao và giao lại rạng ngời tươi trẻ hạnh phúc!
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. PRICING TABLE MATRIX */}
      <section id="pricing-section" className="py-5 px-3 px-md-5">
        <div className="container py-3" style={{ maxWidth: '900px' }}>
          
          <div className="text-center mb-5">
            <h2 className="display-6 fw-extrabold text-primary-custom mb-3">Bảng Giá Tham Khảo</h2>
            <p className="text-muted mb-4 small mx-auto" style={{ maxWidth: '500px' }}>
              Chi phí hỗ trợ có thể thay đổi hợp lý tùy theo kích thước, giống loài trọng lượng thực tế và tình trạng thể chất của bé cưng nhà bạn.
            </p>
            <div className="mx-auto rounded-pill" style={{ width: '60px', height: '4px', backgroundColor: 'var(--secondary-color)' }} />
          </div>

          <div 
            className="card border-0 shadow-2xl rounded-32 overflow-hidden mx-auto"
            style={{
              backgroundColor: isDarkMode ? '#11223e' : '#ffffff',
              border: isDarkMode ? '1px solid #1b3154' : '1px solid rgba(0, 35, 111, 0.05)'
            }}
          >
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 text-start" style={{ minWidth: '550px' }}>
                <thead>
                  <tr className={isDarkMode ? 'table-dark text-white' : 'table-light'} style={{ backgroundColor: isDarkMode ? '#1e304f' : '#f1f5f9' }}>
                    <th scope="col" className="p-4 fw-extrabold text-primary-custom" style={{ borderBottom: 'none' }}>Gói dịch vụ</th>
                    <th scope="col" className="p-4 fw-extrabold text-primary-custom" style={{ borderBottom: 'none' }}>Cỡ thú cưng nhỏ (&lt;10kg)</th>
                    <th scope="col" className="p-4 fw-extrabold text-primary-custom" style={{ borderBottom: 'none' }}>Cỡ thú cưng lớn (&gt;10kg)</th>
                  </tr>
                </thead>
                <tbody className={isDarkMode ? 'text-white' : 'text-dark'}>
                  <tr style={{ borderColor: isDarkMode ? '#1b3154' : 'rgba(0,0,0,0.06)' }}>
                    <td className="p-4 fw-bold text-decoration-none">Grooming & Spa Cơ Bản</td>
                    <td className="p-4 font-monospace fw-extrabold text-secondary-custom">250.000đ</td>
                    <td className="p-4 font-monospace fw-extrabold text-secondary-custom">450.000đ</td>
                  </tr>
                  <tr style={{ borderColor: isDarkMode ? '#1b3154' : 'rgba(0,0,0,0.06)' }}>
                    <td className="p-4 fw-bold">Cắt Tỉa Tạo Kiểu Chi Tiết</td>
                    <td className="p-4 font-monospace fw-extrabold text-secondary-custom">400.000đ</td>
                    <td className="p-4 font-monospace fw-extrabold text-secondary-custom">750.000đ</td>
                  </tr>
                  <tr style={{ borderColor: isDarkMode ? '#1b3154' : 'rgba(0,0,0,0.06)' }}>
                    <td className="p-4 fw-bold">Lưu Trú Cao Cấp (1 Đêm)</td>
                    <td className="p-4 font-monospace fw-extrabold text-secondary-custom">200.000đ</td>
                    <td className="p-4 font-monospace fw-extrabold text-secondary-custom">350.000đ</td>
                  </tr>
                  <tr style={{ borderColor: isDarkMode ? '#1b3154' : 'rgba(0,0,0,0.06)' }}>
                    <td className="p-4 fw-bold">Khám Sức Khỏe Tổng Quát</td>
                    <td className="p-4 font-monospace fw-extrabold text-secondary-custom" colSpan={2}>
                      300.000đ <span className="badge bg-warning text-dark px-2 ms-2 small">Đồng Giá</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* 6. CALL TO ACTION CONTAINER */}
      <section className="py-5 px-3 px-md-5">
        <div 
          className="container rounded-40 text-center p-5 shadow position-relative overflow-hidden" 
          style={{ 
            maxWidth: '1100px',
            backgroundColor: isDarkMode ? 'rgba(30, 58, 138, 0.15)' : 'rgba(0, 35, 111, 0.03)',
            border: isDarkMode ? '1px solid #1b3154' : '1px solid rgba(0, 35, 111, 0.05)'
          }}
        >
          {/* Abstract backdrop blur shape */}
          <div className="position-absolute translate-middle-y rounded-circle bg-secondary-custom opacity-10" style={{ width: '150px', height: '150px', top: '0', right: '10%' }} />
          
          <h2 className="display-6 fw-extrabold text-primary-custom mb-3 relative" style={{ zIndex: 1 }}>
            Sẵn sàng để chúng tôi chăm sóc bé yêu của bạn?
          </h2>
          <p className="text-muted mb-4 small mx-auto leading-relaxed" style={{ maxWidth: '650px', fontSize: '15.5px' }}>
            Đừng để những người bạn nhỏ phải chờ đợi mệt mỏi hay cô đơn. Hãy đặt lịch hẹn chăm sóc ngay hôm nay để nhận được ưu đãi giảm giá vô song lên đến <span className="fw-bold text-secondary-custom font-sans">10%</span> đón chào mùa hội ngộ!
          </p>
          
          <div className="d-flex flex-wrap justify-content-center gap-3 relative align-items-center" style={{ zIndex: 1 }}>
            <button 
              onClick={() => onOpenBookingWithDetails('dog', 'Cắt Tỉa Thẩm Mỹ')}
              className="btn btn-primary-custom rounded-pill px-4 py-3 d-flex align-items-center gap-2"
            >
              <CalendarCheck2 size={18} />
              Đặt Lịch Ngay
            </button>
            <a 
              href="tel:1900888999" 
              className="btn btn-outline-primary rounded-pill px-4 py-3 d-flex align-items-center gap-2"
              style={{
                borderColor: 'var(--primary-color)',
                color: 'var(--primary-color)',
                fontWeight: 'bold',
                textDecoration: 'none'
              }}
            >
              <Phone size={18} />
              1900 888 999
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
