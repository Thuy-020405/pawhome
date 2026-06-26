import React, { useEffect, useRef } from 'react';
import { Shield, Star, Video, CheckCircle, ArrowRight } from 'lucide-react';
import heroImage from '../assets/images/vet_with_golden_retriever_1782093415857.jpg';

export default function WhyPawHomePage({ isDarkMode }) {
  const observerRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    };

    try {
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      }, observerOptions);

      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => {
        el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
        observerRef.current.observe(el);
      });
    } catch (e) {}

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className={`why-pawhome-container ${isDarkMode ? 'dark-mode-active bg-slate-900 text-white' : 'bg-slate-50 text-dark'}`} style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px', fontFamily: '"Bricolage Grotesque", sans-serif' }}>
      <style>
        {`
          .translate-y-10 { transform: translateY(40px); }
          .translate-y-0 { transform: translateY(0); }
          .opacity-0 { opacity: 0; }
          .opacity-100 { opacity: 1; }
          .duration-700 { transition-duration: 700ms; }
          .transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
        `}
      </style>

      {/* Hero Section */}
      <section className="position-relative w-100 d-flex align-items-center overflow-hidden mb-5" style={{ height: '600px' }}>
        <div className="position-absolute top-0 bottom-0 start-0 end-0 z-0">
          <img 
            className="w-100 h-100 object-fit-cover" 
            alt="A professional pet caregiver" 
            src={heroImage} 
          />
          <div className="position-absolute top-0 bottom-0 start-0 end-0" style={{ backgroundColor: 'rgba(0, 35, 111, 0.3)', mixBlendMode: 'multiply' }}></div>
          <div className="position-absolute top-0 bottom-0 start-0 end-0" style={{ background: 'linear-gradient(to right, rgba(0, 35, 111, 0.8), transparent)' }}></div>
        </div>
        
        <div className="position-relative z-1 px-4 px-md-5 mx-auto animate-on-scroll" style={{ maxWidth: '1280px', width: '100%' }}>
          <div style={{ maxWidth: '768px' }}>
            <h1 className="display-4 fw-extrabold text-white mb-4" style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}>
              Tại sao hàng ngàn chủ nuôi tin tưởng PawHome?
            </h1>
            <p className="fs-5 text-white mb-5 opacity-75" style={{ maxWidth: '600px' }}>
              Chúng tôi không chỉ chăm sóc thú cưng, chúng tôi tạo ra một ngôi nhà thứ hai đầy yêu thương, an toàn và đẳng cấp cho những người bạn bốn chân.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <button className="btn btn-secondary-custom px-4 py-3 shadow">
                Khám phá ngay
              </button>
              <button className="btn fw-bold px-4 py-3 rounded-pill text-white border border-light border-opacity-25" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
                Xem video giới thiệu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Bento Grid */}
      <section className="py-5 px-3 px-md-5 mx-auto animate-on-scroll" style={{ maxWidth: '1280px' }}>
        <div className="text-center mb-5">
          <h2 className="fw-bold text-primary-custom mb-3" style={{ fontSize: '2rem' }}>Giá Trị Cốt Lõi Của Chúng Tôi</h2>
          <div className="mx-auto rounded-pill bg-secondary-custom" style={{ height: '4px', width: '80px' }}></div>
        </div>
        
        <div className="row g-4">
          <div className="col-12 col-md-6 col-lg-3">
            <div className={`p-4 rounded-4 shadow-sm border h-100 transition-all hover:-translate-y-1 ${isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-white border-light'}`}>
              <div className="rounded-3 d-flex align-items-center justify-content-center mb-4 bg-primary-custom bg-opacity-10 text-primary-custom" style={{ width: '48px', height: '48px' }}>
                <span className="material-symbols-outlined fs-3">medical_services</span>
              </div>
              <h3 className="fw-bold text-primary-custom fs-5 mb-3">Chuyên gia tận tâm</h3>
              <p className="text-muted fs-6 m-0">Đội ngũ bác sĩ và nhân viên được đào tạo quốc tế, giàu kinh nghiệm và tình yêu thương vô bờ bến.</p>
            </div>
          </div>
          
          <div className="col-12 col-md-6 col-lg-3">
            <div className={`p-4 rounded-4 shadow-sm border h-100 transition-all hover:-translate-y-1 ${isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-white border-light'}`}>
              <div className="rounded-3 d-flex align-items-center justify-content-center mb-4 bg-secondary-custom bg-opacity-10 text-secondary-custom" style={{ width: '48px', height: '48px' }}>
                <Star size={24} fill="currentColor" />
              </div>
              <h3 className="fw-bold text-primary-custom fs-5 mb-3">Tiêu chuẩn 5 sao</h3>
              <p className="text-muted fs-6 m-0">Cơ sở vật chất hiện đại, vệ sinh tuyệt đối và không gian vui chơi rộng rãi chuẩn quốc tế.</p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className={`p-4 rounded-4 shadow-sm border h-100 transition-all hover:-translate-y-1 ${isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-white border-light'}`}>
              <div className="rounded-3 d-flex align-items-center justify-content-center mb-4 bg-primary-custom bg-opacity-10 text-primary-custom" style={{ width: '48px', height: '48px' }}>
                <Video size={24} />
              </div>
              <h3 className="fw-bold text-primary-custom fs-5 mb-3">Cập nhật liên tục</h3>
              <p className="text-muted fs-6 m-0">Báo cáo hình ảnh và video trực tiếp mỗi giờ để bạn luôn an tâm về trạng thái của bé.</p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className={`p-4 rounded-4 shadow-sm border h-100 transition-all hover:-translate-y-1 ${isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-white border-light'}`}>
              <div className="rounded-3 d-flex align-items-center justify-content-center mb-4 bg-secondary-custom bg-opacity-10 text-secondary-custom" style={{ width: '48px', height: '48px' }}>
                <Shield size={24} />
              </div>
              <h3 className="fw-bold text-primary-custom fs-5 mb-3">An toàn tuyệt đối</h3>
              <p className="text-muted fs-6 m-0">Quy trình kiểm soát dịch bệnh nghiêm ngặt và hệ thống an ninh 24/7 bảo vệ thú cưng của bạn.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The PawHome Difference: Comparison */}
      <section className={`py-5 animate-on-scroll ${isDarkMode ? 'bg-slate-800/50' : 'bg-light'}`}>
        <div className="container" style={{ maxWidth: '1140px' }}>
          <div className="text-center mb-5">
            <h2 className="fw-bold text-primary-custom fs-2">Sự Khác Biệt Tại PawHome</h2>
          </div>
          
          <div className="row g-4 align-items-stretch">
            {/* Standard Care */}
            <div className="col-12 col-md-6">
              <div className={`rounded-4 overflow-hidden border shadow-sm d-flex flex-column h-100 opacity-75 ${isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-white border-light'}`}>
                <div className="p-4 text-center bg-light">
                  <h4 className="fw-bold text-muted m-0 fs-4">Dịch Vụ Thông Thường</h4>
                </div>
                <div className="p-4 flex-grow-1 d-flex flex-column gap-4">
                  <div className="d-flex align-items-start gap-3">
                    <span className="material-symbols-outlined text-danger">close</span>
                    <p className="fs-6 m-0 text-muted">Lồng chuồng hẹp, thiếu không gian vận động.</p>
                  </div>
                  <div className="d-flex align-items-start gap-3">
                    <span className="material-symbols-outlined text-danger">close</span>
                    <p className="fs-6 m-0 text-muted">Ít tương tác và thiếu sự giám sát y tế chuyên nghiệp.</p>
                  </div>
                  <div className="d-flex align-items-start gap-3">
                    <span className="material-symbols-outlined text-danger">close</span>
                    <p className="fs-6 m-0 text-muted">Chỉ cập nhật tình hình khi được yêu cầu.</p>
                  </div>
                  <div className="d-flex align-items-start gap-3">
                    <span className="material-symbols-outlined text-danger">close</span>
                    <p className="fs-6 m-0 text-muted">Không có lịch trình vui chơi và huấn luyện bài bản.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* PawHome Premium */}
            <div className="col-12 col-md-6" style={{ transform: 'translateY(-16px)' }}>
              <div className={`rounded-4 overflow-hidden border border-secondary-custom shadow-lg d-flex flex-column h-100 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`} style={{ borderWidth: '2px !important' }}>
                <div className="p-4 text-center text-white bg-secondary-custom">
                  <div className="d-inline-block px-3 py-1 bg-white bg-opacity-25 rounded-pill mb-2 fw-bold text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Premium Experience</div>
                  <h4 className="fw-bold m-0 fs-3">PawHome Premium</h4>
                </div>
                <div className="p-4 flex-grow-1 d-flex flex-column gap-4">
                  <div className="d-flex align-items-start gap-3">
                    <CheckCircle size={24} className="text-secondary-custom flex-shrink-0" />
                    <p className="fs-6 fw-bold text-primary-custom m-0">Phòng suite rộng rãi, điều hòa trung tâm 24/7.</p>
                  </div>
                  <div className="d-flex align-items-start gap-3">
                    <CheckCircle size={24} className="text-secondary-custom flex-shrink-0" />
                    <p className="fs-6 fw-bold text-primary-custom m-0">Bác sĩ thú y túc trực và tham khám hàng ngày.</p>
                  </div>
                  <div className="d-flex align-items-start gap-3">
                    <CheckCircle size={24} className="text-secondary-custom flex-shrink-0" />
                    <p className="fs-6 fw-bold text-primary-custom m-0">Livestream và báo cáo tự động qua ứng dụng.</p>
                  </div>
                  <div className="d-flex align-items-start gap-3">
                    <CheckCircle size={24} className="text-secondary-custom flex-shrink-0" />
                    <p className="fs-6 fw-bold text-primary-custom m-0">Chương trình giáo dục và phát triển kỹ năng xã hội.</p>
                  </div>
                </div>
                <div className="p-4 pt-0 mt-auto">
                  <button className="btn btn-primary-custom w-100 py-3 shadow-sm">
                    Lựa chọn hàng đầu cho bé
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-5 bg-primary-custom text-white animate-on-scroll">
        <div className="container" style={{ maxWidth: '1140px' }}>
          <div className="row g-4 text-center">
            <div className="col-12 col-md-4">
              <div className="display-4 fw-extrabold mb-2 text-secondary-custom">10,000+</div>
              <div className="fw-bold text-uppercase opacity-75" style={{ fontSize: '13px', letterSpacing: '2px' }}>Bé đã được chăm sóc</div>
            </div>
            <div className="col-12 col-md-4">
              <div className="display-4 fw-extrabold mb-2 text-secondary-custom">99%</div>
              <div className="fw-bold text-uppercase opacity-75" style={{ fontSize: '13px', letterSpacing: '2px' }}>Khách hàng hài lòng</div>
            </div>
            <div className="col-12 col-md-4">
              <div className="display-4 fw-extrabold mb-2 text-secondary-custom">24/7</div>
              <div className="fw-bold text-uppercase opacity-75" style={{ fontSize: '13px', letterSpacing: '2px' }}>Giám sát & Hỗ trợ</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Highlight */}
      <section className="py-5 px-4 px-md-5 mx-auto animate-on-scroll" style={{ maxWidth: '1140px' }}>
        <div className={`rounded-4 p-4 p-md-5 d-flex flex-column flex-md-row align-items-center gap-5 shadow-sm border position-relative overflow-hidden ${isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-white border-light'}`}>
          <div className="position-absolute top-0 end-0 p-4 opacity-10 text-primary-custom">
            <span className="material-symbols-outlined" style={{ fontSize: '120px' }}>format_quote</span>
          </div>
          <div className="rounded-circle overflow-hidden flex-shrink-0" style={{ width: '200px', height: '200px', border: '4px solid #fd761a' }}>
            <img 
              className="w-100 h-100 object-fit-cover" 
              alt="Portrait of satisfied customer" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrfB39pEavyXEwuOMInEnjH7l33NGc9JzRShaQLaQPMZ10CZ2WRu9Wyn970tKYvIZ7Pf2gkyHHJLvNFN3ZNZnlpY6f8Nnw1_4IEu6YnJDb4Wh-A5hDhKMg24A9g__0bBYVHJcpfrEt8bTO0aOAPHHt5ucoU0UZtHrQ5BR_o7XK3LzF3NNksreKETA3TcDw3ikS0KtWaE0kZY0cWKWAPZl2isYi42qZfZjwAbpQCoHAFHPdPwyAQSUG5w" 
            />
          </div>
          <div className="flex-grow-1">
            <div className="d-flex gap-1 mb-4 text-secondary-custom">
              {[1,2,3,4,5].map(s => <Star key={s} size={20} fill="currentColor" />)}
            </div>
            <blockquote className="fs-3 fw-bold text-primary-custom fst-italic mb-4" style={{ lineHeight: '1.4' }}>
              "Tôi đã trải qua nhiều dịch vụ trông giữ thú cưng nhưng PawHome thực sự ở một đẳng cấp khác. Sự tỉ mỉ trong từng bữa ăn, giấc ngủ của bé Milo khiến tôi hoàn toàn yên tâm mỗi khi đi công tác dài ngày."
            </blockquote>
            <cite className="fst-normal d-block">
              <span className="fw-bold fs-5 text-dark dark:text-white d-block">Chị Minh Anh</span>
              <span className="fs-6 text-muted opacity-75 d-block">Khách hàng thành viên 2 năm</span>
            </cite>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className={`py-5 position-relative overflow-hidden animate-on-scroll ${isDarkMode ? 'bg-slate-900' : 'bg-light'}`}>
        <div className="container position-relative z-1 text-center py-5" style={{ maxWidth: '1140px' }}>
          <h2 className="display-5 fw-extrabold text-primary-custom mb-3">Trải nghiệm sự khác biệt ngay hôm nay</h2>
          <p className="fs-5 text-muted mb-5 mx-auto" style={{ maxWidth: '700px' }}>
            Đừng để thú cưng của bạn phải cô đơn. Hãy để PawHome mang đến những giây phút hạnh phúc nhất cho bé.
          </p>
          <button className="btn btn-secondary-custom px-5 py-3 shadow-lg fw-bold transition-all" style={{ fontSize: '1.25rem' }}>
            Đặt lịch ngay
          </button>
        </div>
        
        {/* Subtle Background Accents */}
        <div className="position-absolute rounded-circle" style={{ bottom: '-6rem', left: '-6rem', width: '16rem', height: '16rem', backgroundColor: 'rgba(0, 35, 111, 0.05)', filter: 'blur(3xl)' }}></div>
        <div className="position-absolute rounded-circle" style={{ top: '-6rem', right: '-6rem', width: '16rem', height: '16rem', backgroundColor: 'rgba(253, 118, 26, 0.1)', filter: 'blur(3xl)' }}></div>
      </section>
    </div>
  );
}
