import React from 'react';
import { HERO_IMAGE, EXPERTS, SERVICES } from '../data';

export default function AboutUs({ isDarkMode, onOpenBooking, onBackToHome }) {
  // Lan Hương, Quốc Bảo, Mỹ Linh
  const displayTeam = [
    {
      name: EXPERTS?.find(e => e.name === "Bác sĩ Mỹ Linh")?.name || "Bác sĩ Mỹ Linh",
      image: EXPERTS?.find(e => e.name === "Bác sĩ Mỹ Linh")?.image || HERO_IMAGE,
      title: EXPERTS?.find(e => e.name === "Bác sĩ Mỹ Linh")?.title || "Trưởng khoa Nội trú",
      rating: EXPERTS?.find(e => e.name === "Bác sĩ Mỹ Linh")?.rating || "4.9",
      reviewsCount: EXPERTS?.find(e => e.name === "Bác sĩ Mỹ Linh")?.reviewsCount || "156",
      role: "Bác sĩ thú y",
      desc: "Hơn 12 năm kinh nghiệm trong lĩnh vực nội khoa thú nhỏ. Chuyên gia hàng đầu về các bệnh truyền nhiễm và dinh dưỡng thú cưng."
    },
    {
      name: EXPERTS?.find(e => e.name === "Chị Lan Hương")?.name || "Chị Lan Hương",
      image: EXPERTS?.find(e => e.name === "Chị Lan Hương")?.image || HERO_IMAGE,
      title: EXPERTS?.find(e => e.name === "Chị Lan Hương")?.title || "Grooming & Spa Artist",
      rating: EXPERTS?.find(e => e.name === "Chị Lan Hương")?.rating || "5.0",
      reviewsCount: EXPERTS?.find(e => e.name === "Chị Lan Hương")?.reviewsCount || "89",
      role: "Grooming",
      desc: "Nghệ sĩ grooming với khả năng thấu hiểu tâm lý thú cưng tuyệt vời. Chuyên về cắt tỉa tạo hình cho các giống chó lông dài."
    },
    {
      name: EXPERTS?.find(e => e.name === "Anh Quốc Bảo")?.name || "Anh Quốc Bảo",
      image: EXPERTS?.find(e => e.name === "Anh Quốc Bảo")?.image || HERO_IMAGE,
      title: EXPERTS?.find(e => e.name === "Anh Quốc Bảo")?.title || "Huấn luyện viên K9",
      rating: EXPERTS?.find(e => e.name === "Anh Quốc Bảo")?.rating || "4.8",
      reviewsCount: EXPERTS?.find(e => e.name === "Anh Quốc Bảo")?.reviewsCount || "210",
      role: "Huấn luyện viên",
      desc: "Chuyên gia huấn luyện chó nghiệp vụ và sửa đổi hành vi. Sử dụng phương pháp khích lệ tích cực hiệu quả 100%."
    }
  ];

  const storyImage = (SERVICES && SERVICES[0]?.image) || "https://lh3.googleusercontent.com/aida-public/AB6AXuAVg038C1S-OPObclZGHuesFBHtRULLARP49ybrxG9ID3E3Orf0Sgu3AnZVzm8IQX0pAROOQnUqxSnAbJpwq8Xd9MjieOiVzhcMeKX-OqrmbCR7MuVcnjUg5B6gMugRZ-GO_fY57QwpnCvGjTkwnsHGDExE-Ymw91xHgZwJbIINMVJ6M56aNMpGZ9lEVlXtp_I0sLSKogUDr9PbrF7BDYua2fLi5_J67jqXp1G-tDDxYX0Oum7cWDlJ3w";

  return (
    <div className={`fade-in pb-5 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-dark'}`}>
      {/* Hero Section */}
      <section className="position-relative overflow-hidden py-5 py-md-10" style={{ minHeight: '80vh' }}>
        <div className="position-absolute h-100 w-100 top-0 start-0 z-0">
          <img 
            alt="Pet Care Center" 
            className="w-100 h-100 object-fit-cover opacity-25 opacity-md-75"
            src={HERO_IMAGE}
            referrerPolicy="no-referrer"
            style={{ objectPosition: 'center right' }}
          />
          <div 
            className="position-absolute h-100 w-100 top-0 start-0" 
            style={{ background: isDarkMode ? 'linear-gradient(to right, #0d1c2f 0%, rgba(13, 28, 47, 0.95) 55%, transparent 100%)' : 'linear-gradient(to right, #f8f9ff 0%, rgba(248, 249, 255, 0.9) 55%, transparent 100%)' }}
          ></div>
        </div>

        <div className="container position-relative z-1 px-4 px-md-5 py-5 py-md-10 mt-5">
          <div className="row align-items-center">
            <div className="col-12 col-lg-7">
              <span className="text-uppercase fw-bold tracking-widest small mb-3 d-block" style={{ color: '#F97316' }}>Chào mừng đến với PawHome</span>
              <h1 className="fw-extrabold display-3 mb-4 tracking-tighter" style={{ color: isDarkMode ? '#ffffff' : '#00236f', lineHeight: 1.1 }}>
                Sứ mệnh mang đến <br/>
                <span className="position-relative d-inline-block">
                  ngôi nhà thứ hai
                  <span className="position-absolute bottom-0 start-0 w-100 h-25" style={{ backgroundColor: 'rgba(249, 115, 22, 0.2)', zIndex: -1 }}></span>
                </span> hoàn hảo.
              </h1>
              <p className="lead mb-5 opacity-75" style={{ maxWidth: '600px', color: isDarkMode ? '#cbd5e1' : '#334155' }}>
                Tại PawHome, chúng tôi không chỉ chăm sóc thú cưng; chúng tôi nuôi dưỡng tâm hồn và niềm vui của chúng thông qua sự thấu hiểu sâu sắc và tình yêu vô điều kiện.
              </p>
              
              <div className="d-flex flex-wrap gap-4 align-items-center">
                <button 
                  onClick={() => onOpenBooking('dog', 'Cắt Tỉa Thẩm Mỹ')}
                  className="btn btn-primary-custom px-5 py-3 d-flex align-items-center gap-2"
                >
                  Khám phá dịch vụ
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                
                <div className={`glass p-3 rounded-24 d-flex align-items-center gap-3 border shadow-sm ${isDarkMode ? 'bg-slate-800/50 border-white/10' : 'bg-white/80 border-primary-custom/10'}`}>
                  <div className="d-flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="rounded-circle border-2 border-white bg-slate-300 shadow-sm" style={{ width: '36px', height: '36px' }}></div>
                    ))}
                    <div className="rounded-circle border-2 border-white bg-primary-custom text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: '36px', height: '36px', fontSize: '10px' }}>+5k</div>
                  </div>
                  <div className="small fw-bold">
                    Tin dùng bởi <br/> 5,000+ chủ nuôi
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5 d-none d-lg-block">
              <div className={`glass p-5 rounded-40 shadow-lg border position-relative ${isDarkMode ? 'bg-slate-800/50 border-white/20' : 'bg-white/80 border-primary-custom/10'}`}>
                <div className="d-flex align-items-center gap-4 mb-4">
                  <div className="rounded-3 d-flex align-items-center justify-content-center text-white shadow-sm" style={{ width: '56px', height: '56px', backgroundColor: '#F97316' }}>
                    <span className="material-symbols-outlined fs-2">verified</span>
                  </div>
                  <div>
                    <h3 className="h4 fw-bold mb-0">Chuẩn Quốc Tế</h3>
                    <p className="small text-muted mb-0">Chứng nhận an toàn sinh học</p>
                  </div>
                </div>
                <div className="progress rounded-pill mb-2" style={{ height: '8px' }}>
                  <div className="progress-bar" style={{ width: '98%', backgroundColor: '#F97316' }}></div>
                </div>
                <div className="d-flex justify-content-between small fw-bold">
                  <span>Chỉ số hài lòng</span>
                  <span>98%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-5 py-md-10" style={{ backgroundColor: isDarkMode ? '#0d1c2f' : '#ffffff' }}>
        <div className="container px-4 px-md-5">
          <div className="row g-5 align-items-center mb-5">
            <div className="col-12 col-lg-6">
              <div className="position-relative">
                <div className="position-absolute top-0 start-0 translate-middle-y mt-n5 ms-n4 display-1 font-black opacity-5 select-none" style={{ fontSize: '140px', color: isDarkMode ? '#ffffff' : '#00236f', zIndex: 0 }}>2014</div>
                <span className="text-uppercase fw-bold tracking-widest small mb-2 d-block" style={{ color: '#F97316' }}>Hành trình của chúng tôi</span>
                <h2 className="display-4 fw-extrabold fst-italic mb-4" style={{ color: isDarkMode ? '#ffffff' : '#00236f' }}>
                  Câu chuyện của <span className="text-secondary-custom fw-normal not-italic">chúng tôi</span>
                </h2>
                <p className="lead mb-4 opacity-75">
                  Khởi nguồn từ khao khát nâng tầm trải nghiệm cho những người bạn bốn chân, PawHome được xây dựng dựa trên triết lý <span className="text-secondary-custom fw-bold">"Chăm sóc cao cấp từ sự thấu hiểu"</span>.
                </p>
                <p className="lead opacity-75">
                  Chúng tôi hiểu rằng mỗi thú cưng là một thành viên gia đình duy nhất, xứng đáng có được sự tôn trọng và điều kiện chăm sóc tối ưu nhất. Suốt hơn một thập kỷ qua, chúng tôi không ngừng cải thiện cơ sở vật chất và đào tạo đội ngũ để hiện thực hóa cam kết đó.
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="position-relative">
                <div className={`rounded-40 overflow-hidden shadow-2xl border-8 rotate-2 transition-all ${isDarkMode ? 'border-slate-800' : 'border-white'}`}>
                  <img src={storyImage} alt="Our Story" className="w-100 h-100 object-fit-cover" style={{ minHeight: '400px' }} />
                </div>
                <div className="position-absolute bottom-0 end-0 translate-middle p-5 rounded-circle bg-secondary-custom opacity-10 blur-3xl" style={{ width: '200px', height: '200px', zIndex: -1 }}></div>
              </div>
            </div>
          </div>

          <div className="row g-4 mt-5">
            {[
              { icon: 'hotel_class', title: 'Cơ sở vật chất 5 sao', color: '#00236f', desc: 'Không gian được thiết kế chuyên biệt để giảm căng thẳng cho thú cưng với hệ thống kiểm soát khí hậu 24/7.' },
              { icon: 'volunteer_activism', title: 'Yêu thương vô điều kiện', color: '#F97316', desc: 'Đội ngũ của chúng tôi coi thú cưng của bạn như người thân, đảm bảo chúng luôn cảm thấy an toàn và hạnh phúc.' },
              { icon: 'health_and_safety', title: 'An toàn là trên hết', color: '#1e3a8a', desc: 'Giám sát liên tục và quy trình khử khuẩn nghiêm ngặt bảo vệ sức khỏe cho mọi người bạn nhỏ.' }
            ].map((item, idx) => (
              <div key={idx} className="col-12 col-md-4">
                <div className={`glass p-5 rounded-32 shadow-sm border h-100 transition-all hover:-translate-y-1 ${isDarkMode ? 'bg-slate-800/30 border-white/10' : 'bg-white border-light'}`}>
                  <div className="rounded-3 d-flex align-items-center justify-content-center text-white shadow mb-4" style={{ width: '56px', height: '56px', backgroundColor: item.color }}>
                    <span className="material-symbols-outlined fs-2">{item.icon}</span>
                  </div>
                  <h3 className="h5 fw-bold mb-3">{item.title}</h3>
                  <p className="small text-muted mb-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Why Trust Section */}
      <section className="py-5 py-md-10" style={{ backgroundColor: isDarkMode ? '#11223e' : '#e6eeff' }}>
        <div className="container px-4 px-md-5">
          <div className="mb-5">
            <h2 className="display-5 fw-extrabold mb-2" style={{ color: '#00236f' }}>Tại sao tin tưởng PawHome?</h2>
            <p className="text-muted">Xây dựng niềm tin thông qua chất lượng và sự tận tâm.</p>
          </div>

          <div className="row g-4">
            <div className="col-12 col-lg-6">
              <div className="bg-primary text-white p-5 rounded-32 h-100 d-flex flex-column justify-content-between shadow-lg">
                <div>
                  <span className="material-symbols-outlined fs-1 mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
                  <h3 className="h3 fw-bold mb-3 tracking-tight">24/7 Veterinary Support</h3>
                  <p className="opacity-80">Hệ thống hỗ trợ y tế luôn túc trực, kết nối trực tiếp với các bệnh viện thú y hàng đầu.</p>
                </div>
                <div className="mt-5 d-flex align-items-baseline gap-2">
                  <span className="display-4 fw-bold">100%</span>
                  <span className="text-uppercase tracking-wider small fw-bold opacity-70">Phản hồi khẩn cấp</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="bg-white p-5 rounded-32 shadow-sm h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="rounded-circle mb-4 d-flex align-items-center justify-content-center bg-secondary-custom bg-opacity-10 text-secondary-custom" style={{ width: '48px', height: '48px' }}>
                    <span className="material-symbols-outlined">verified_user</span>
                  </div>
                  <h4 className="h5 fw-bold mb-2">Certified Specialists</h4>
                  <p className="small text-muted mb-0">100% đội ngũ có chứng chỉ hành nghề quốc tế.</p>
                </div>
                <div className="mt-4 pt-3 border-top">
                  <a href="#" className="small fw-bold text-decoration-none d-flex align-items-center gap-1 text-primary">
                    Xem hồ sơ <span className="material-symbols-outlined fs-6">open_in_new</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="bg-white p-5 rounded-32 shadow-sm h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="rounded-circle mb-4 d-flex align-items-center justify-content-center bg-secondary-custom bg-opacity-10 text-secondary-custom" style={{ width: '48px', height: '48px' }}>
                    <span className="material-symbols-outlined">history</span>
                  </div>
                  <h4 className="h5 fw-bold mb-2">10+ Years Exp</h4>
                  <p className="small text-muted mb-0">Hơn một thập kỷ dẫn đầu thị trường chăm sóc thú cưng cao cấp.</p>
                </div>
                <div className="mt-4 d-flex -space-x-1">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="rounded-circle border-2 border-white bg-slate-200" style={{ width: '32px', height: '32px' }}></div>
                  ))}
                  <div className="rounded-circle border-2 border-white bg-primary text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: '32px', height: '32px', fontSize: '9px' }}>+5k</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialist Team Section */}
      <section className="py-5 py-md-10" style={{ backgroundColor: isDarkMode ? '#0d1c2f' : '#ffffff' }}>
        <div className="container px-4 px-md-5">
          <div className="text-center mb-5 pb-5">
            <h2 className="display-4 fw-extrabold mb-3" style={{ color: isDarkMode ? '#ffffff' : '#00236f' }}>Đội ngũ chuyên gia của chúng tôi</h2>
            <p className="lead text-muted max-w-2xl mx-auto" style={{ fontSize: '1.1rem' }}>
              Gặp gỡ những người đồng hành tận tâm, kết hợp giữa kiến thức chuyên môn sâu rộng và tình yêu vô điều kiện dành cho thú cưng của bạn.
            </p>
          </div>

          <div className="row g-4">
            {displayTeam.map((member, idx) => (
              <div key={idx} className="col-12 col-md-4">
                <div className={`card border-0 rounded-40 overflow-hidden shadow-sm h-100 transition-all hover:-translate-y-2 ${isDarkMode ? 'bg-slate-800/50 border-white/10' : 'bg-white border-light'}`}>
                  <div className="position-relative overflow-hidden" style={{ height: '320px' }}>
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-100 h-100 object-fit-cover transition-all"
                    />
                    <div className="position-absolute top-0 end-0 m-4 bg-secondary-custom text-white px-3 py-1 rounded-pill small fw-bold shadow-sm">
                      {member.role}
                    </div>
                  </div>
                  <div className="card-body p-4 p-md-5">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h3 className="h4 fw-bold mb-0" style={{ color: isDarkMode ? '#ffffff' : '#00236f' }}>{member.name}</h3>
                      <div className="d-flex align-items-center text-secondary-custom">
                        <span className="material-symbols-outlined fs-6 me-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="small fw-bold">{member.rating} ({member.reviewsCount})</span>
                      </div>
                    </div>
                    <p className="small text-muted fw-bold mb-3">{member.title}</p>
                    <p className="small text-muted mb-4 line-clamp-3" style={{ lineHeight: '1.6' }}>
                      {member.desc}
                    </p>
                    <div className="d-flex flex-column gap-2 mt-auto">
                      <button 
                        onClick={() => onOpenBooking('dog', 'Cắt Tỉa Thẩm Mỹ', member.name)}
                        className="btn btn-primary-custom w-100 py-3 rounded-pill fw-bold"
                      >
                        Đặt lịch với {((member.name || "").split(' ') || []).slice(-2).join(' ')}
                      </button>
                      <button className="btn btn-link text-primary-custom fw-bold text-decoration-none small">
                        Xem hồ sơ chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Recruitment CTA */}
      <section className="py-5 py-md-10" style={{ backgroundColor: isDarkMode ? '#0d1c2f' : '#ffffff' }}>
        <div className="container px-4 px-md-5">
          <div className="bg-primary text-white rounded-40 p-5 p-md-10 text-center position-relative overflow-hidden shadow-2xl">
            <div className="position-absolute top-0 end-0 p-5 opacity-10 pointer-events-none">
              <span className="material-symbols-outlined" style={{ fontSize: '160px' }}>pets</span>
            </div>
            <div className="position-relative z-1">
              <h2 className="display-4 fw-extrabold mb-4">Bạn có đam mê với thú cưng?</h2>
              <p className="lead mb-5 opacity-80 max-w-lg mx-auto">
                Chúng tôi luôn tìm kiếm những chuyên gia tài năng để cùng xây dựng ngôi nhà hạnh phúc cho thú cưng.
              </p>
              <button className="btn btn-secondary-custom px-5 py-3 rounded-pill shadow-lg hover-scale-105 transition-all">
                Gia nhập đội ngũ PawHome
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Commitments & Stats Section */}
      <section className="py-5 py-md-10 bg-primary text-white position-relative overflow-hidden">
        <div className="container px-4 px-md-5 position-relative z-1">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-6">
              <h2 className="display-5 fw-extrabold mb-5 opacity-90">Cam kết chất lượng tại PawHome</h2>
              <div className="d-flex flex-column gap-5">
                {[
                  { title: "Minh bạch tuyệt đối", desc: "Gửi báo cáo hình ảnh/video mỗi 4 giờ về tình trạng thú cưng." },
                  { title: "Dinh dưỡng chuẩn hóa", desc: "Chế độ ăn được cá nhân hóa bởi chuyên gia dinh dưỡng." },
                  { title: "Vệ sinh 3 lớp", desc: "Khử trùng bằng tia UV và các hoạt chất hữu cơ an toàn cho khứu giác." }
                ].map((item, idx) => (
                  <div key={idx} className="d-flex align-items-start gap-4">
                    <div className="bg-secondary-custom rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px' }}>
                      <span className="material-symbols-outlined text-white fs-6">check</span>
                    </div>
                    <div>
                      <p className="fw-bold mb-1 fs-5">{item.title}</p>
                      <p className="text-white text-opacity-70 small">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="row g-4">
                {[
                  { val: "98%", label: "Khách hàng quay lại", mt: false },
                  { val: "15k+", label: "Thú cưng phục vụ", mt: true },
                  { val: "4.9/5", label: "Đánh giá Google", mt: false },
                  { val: "24/7", label: "Hỗ trợ khẩn cấp", mt: true }
                ].map((stat, i) => (
                  <div key={i} className={`col-6 ${stat.mt ? 'mt-md-5' : ''}`}>
                    <div className="bg-white bg-opacity-10 backdrop-blur p-4 p-md-5 rounded-32 border border-white border-opacity-10 text-center h-100">
                      <span className="display-5 fw-bold d-block mb-2">{stat.val}</span>
                      <p className="text-uppercase tracking-wider small fw-bold opacity-60 mb-0">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer link to home */}
      <div className="text-center py-5">
        <button onClick={onBackToHome} className="btn btn-outline-primary border-0 fw-bold">
           Quay về Trang chủ
        </button>
      </div>

    </div>
  );
}
