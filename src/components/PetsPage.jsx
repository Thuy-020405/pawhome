import React from 'react';
import { PlusCircle, Info, Calendar, Scissors } from 'lucide-react';

export default function PetsPage({ isDarkMode }) {
  return (
    <div className={`pets-page-container ${isDarkMode ? 'dark-mode-active bg-slate-900 text-white' : 'bg-slate-50 text-dark'}`} style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px', fontFamily: '"Bricolage Grotesque", sans-serif' }}>
      <style>
        {`
          .pet-card-hover {
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
          }
          .pet-card-hover:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 25px -5px rgba(0, 35, 111, 0.1), 0 8px 10px -6px rgba(0, 35, 111, 0.1);
          }
          
          .btn-gradient-secondary {
             background: linear-gradient(135deg, #fd761a 0%, #ea580c 100%);
             color: white;
             border: none;
          }
          .btn-gradient-secondary:hover {
             transform: translateY(-2px);
             box-shadow: 0 4px 12px rgba(253, 118, 26, 0.3);
          }
        `}
      </style>

      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-4 mb-5">
          <div>
            <h1 className="fw-extrabold text-primary-custom mb-3" style={{ fontSize: '3rem', letterSpacing: '-0.02em' }}>Thú cưng của bạn</h1>
            <p className="text-muted fs-5 m-0" style={{ maxWidth: '600px' }}>
              Quản lý hồ sơ, theo dõi sức khỏe và đặt lịch chăm sóc cho những người bạn bốn chân của bạn một cách dễ dàng.
            </p>
          </div>
          <button className="btn btn-gradient-secondary rounded-3 px-4 py-3 fw-bold d-inline-flex align-items-center gap-2 shadow-sm transition-all" style={{ width: 'fit-content' }}>
            <PlusCircle size={20} />
            Thêm thú cưng mới
          </button>
        </div>

        <div className="row g-4">
          {/* Left Side: Pet Grid */}
          <div className="col-12 col-lg-8">
            <div className="row g-4">
              
              {/* Pet Card 1 */}
              <div className="col-12 col-md-6 d-flex flex-column">
                <div className={`rounded-4 overflow-hidden border pet-card-hover d-flex flex-column h-100 position-relative shadow-sm ${isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-white border-light'}`}>
                  <div className="position-relative w-100" style={{ height: '220px' }}>
                    <img 
                      alt="Mochi" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtZxe8AtlBddSx-ZF1bX0BgpiCeDbsyCjclx1QeSTs641zreyRClqCOXIEx0lrSRzGFQ0H3Br3RVg4QCXe12okIaIjmV16296us0Fb6iOruBQVX3gvaf3QYyfjRzhSGmwckUB6W9OUKyAfHYlSLaTAOiT7zGikilZTekCYgaGxxi20p4PixMlKD8WZ8EohIqIXJdcgOnhCvnKGvPPBUDF-MblJwA0JcNbXi2HaC9wHjJxMMsZxDDRWHw"
                      className="w-100 h-100 object-fit-cover"
                    />
                    <div className="position-absolute top-0 end-0 m-3 px-3 py-1 bg-white rounded-pill d-flex align-items-center gap-2 shadow-sm text-dark">
                      <span className="bg-success rounded-circle d-inline-block" style={{ width: '8px', height: '8px' }}></span>
                      <span className="fw-bold" style={{ fontSize: '13px' }}>Sức khỏe tốt</span>
                    </div>
                  </div>
                  
                  <div className="p-4 flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h3 className="fw-bold text-primary-custom mb-1 fs-3">Mochi</h3>
                        <p className="text-muted m-0 fs-6">Corgi • 2 tuổi</p>
                      </div>
                      <div className="bg-primary-custom bg-opacity-10 p-2 rounded-3 text-primary-custom d-flex align-items-center">
                         <span className="material-symbols-outlined">pets</span>
                      </div>
                    </div>
                    
                    <div className="d-flex flex-column gap-2 mt-3">
                      <div className="d-flex align-items-center gap-2 text-muted">
                        <Calendar size={18} />
                        <span className="fw-semibold fs-7">Tiêm chủng tiếp theo: 15/10/2024</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 text-muted">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>weight</span>
                        <span className="fw-semibold fs-7">Cân nặng: 12.5 kg</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 pt-0 d-flex gap-3">
                    <button className="btn border-primary-custom text-primary-custom flex-grow-1 fw-bold py-2 rounded-3">Xem hồ sơ</button>
                    <button className="btn btn-primary-custom flex-grow-1 fw-bold py-2 rounded-3">Đặt chăm sóc</button>
                  </div>
                </div>
              </div>

              {/* Pet Card 2 */}
              <div className="col-12 col-md-6 d-flex flex-column">
                <div className={`rounded-4 overflow-hidden border pet-card-hover d-flex flex-column h-100 position-relative shadow-sm ${isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-white border-light'}`}>
                  <div className="position-relative w-100" style={{ height: '220px' }}>
                    <img 
                      alt="LuLu" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcu_PAUGZ4PXKI7rDjj9TTCMbE0r4ihCfGdCDAuReubUMiDa6rWBLF6MXVjJvnxF1QpEpRDJV5tI_hnVWCHwMbr9e7Vzr_9u050h7mmcMxKgbX8xbwuPoK2gJlsQn4m9_fjcUROM-PavfSHABDCQaqG_iavvwQBJ0TF48fonTXzheaDjJ8x5PnchVoV3fCAVuTKkZUZTBL-XneZWF3tsDqTPjgjeXtFH70Pao_xFXhHL4lwTHKoYMG-w"
                      className="w-100 h-100 object-fit-cover"
                    />
                    <div className="position-absolute top-0 end-0 m-3 px-3 py-1 bg-danger bg-opacity-10 text-danger rounded-pill d-flex align-items-center gap-2 shadow-sm">
                      <Info size={16} />
                      <span className="fw-bold" style={{ fontSize: '13px' }}>Đến lịch tiêm</span>
                    </div>
                  </div>
                  
                  <div className="p-4 flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h3 className="fw-bold text-primary-custom mb-1 fs-3">LuLu</h3>
                        <p className="text-muted m-0 fs-6">Mèo Anh lông ngắn • 3 tuổi</p>
                      </div>
                      <div className="bg-primary-custom bg-opacity-10 p-2 rounded-3 text-primary-custom d-flex align-items-center">
                         <span className="material-symbols-outlined">pets</span>
                      </div>
                    </div>
                    
                    <div className="d-flex flex-column gap-2 mt-3">
                      <div className="d-flex align-items-center gap-2 text-danger fw-bold">
                        <Info size={18} />
                        <span className="fs-7">Đã quá hạn tiêm chủng 3 ngày</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 text-muted">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>weight</span>
                        <span className="fw-semibold fs-7">Cân nặng: 4.2 kg</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 pt-0 d-flex gap-3">
                    <button className="btn border-primary-custom text-primary-custom flex-grow-1 fw-bold py-2 rounded-3">Xem hồ sơ</button>
                    <button className="btn btn-gradient-secondary flex-grow-1 fw-bold py-2 rounded-3">Tiêm chủng ngay</button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Sidebar: Health Summary */}
          <div className="col-12 col-lg-4 d-flex flex-column gap-4">
            
            {/* Upcoming Appointments */}
            <div className="bg-primary-custom p-4 p-lg-5 rounded-4 position-relative overflow-hidden shadow-lg border-0 text-white">
              <div className="position-absolute top-0 end-0 opacity-10" style={{ transform: 'rotate(-12deg) translate(20px, -20px)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '120px' }}>medical_services</span>
              </div>
              <h4 className="fw-bold fs-6 text-uppercase mb-4 opacity-75">Lịch sắp tới</h4>
              
              <div className="d-flex flex-column gap-3 position-relative z-1">
                <div className="d-flex gap-3 p-3 rounded-3" style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)' }}>
                  <div className="p-2 rounded-2 d-flex align-items-center justify-content-center h-100" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                    <span className="material-symbols-outlined text-white">vaccines</span>
                  </div>
                  <div>
                    <p className="fw-bold mb-1 m-0">Tiêm phòng dại</p>
                    <p className="fs-7 m-0 opacity-75">LuLu • 10:30, 25/08</p>
                  </div>
                </div>

                <div className="d-flex gap-3 p-3 rounded-3" style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)' }}>
                  <div className="p-2 rounded-2 d-flex align-items-center justify-content-center h-100" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                    <Scissors size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="fw-bold mb-1 m-0">Cắt tỉa lông</p>
                    <p className="fs-7 m-0 opacity-75">Mochi • 14:00, 28/08</p>
                  </div>
                </div>
              </div>
              
              <button className="btn btn-link text-white text-decoration-none w-100 mt-4 border-bottom border-white border-opacity-25 rounded-0 pb-2">
                Xem toàn bộ lịch
              </button>
            </div>

            {/* Health Alerts */}
            <div className={`p-4 p-lg-5 rounded-4 ${isDarkMode ? 'bg-slate-800' : 'bg-light'}`}>
              <h4 className="fw-bold text-primary-custom mb-4 fs-4">Tóm tắt sức khỏe</h4>
              
              <div className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-between align-items-center pb-3 border-bottom border-secondary-custom border-opacity-10">
                  <span className="text-muted fw-semibold">Tình trạng chung</span>
                  <span className="text-primary-custom fw-bold text-uppercase">Tốt</span>
                </div>
                
                <div className="d-flex justify-content-between align-items-center pb-3 border-bottom border-secondary-custom border-opacity-10">
                  <span className="text-muted fw-semibold">Cảnh báo</span>
                  <span className="bg-danger bg-opacity-10 px-2 py-1 rounded-2 text-danger fw-bold fs-7">1 Cần chú ý</span>
                </div>

                <div className="d-flex justify-content-between align-items-center pt-2">
                  <span className="text-muted fw-semibold">Thành viên mới</span>
                  <span className="text-secondary-custom fw-bold">+2 thú cưng</span>
                </div>
              </div>

              <div className="mt-4 pt-3">
                <div className="d-flex justify-content-between fs-7 mb-2 fw-semibold">
                  <span className="text-muted">Chỉ số tiêm chủng</span>
                  <span className="text-primary-custom fw-bold">85%</span>
                </div>
                <div className="progress rounded-pill bg-white" style={{ height: '8px' }}>
                  <div className="progress-bar bg-secondary-custom" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className={`p-4 p-md-5 rounded-4 border-2 text-center border-dashed ${isDarkMode ? 'border-white/10' : 'border-secondary-custom border-opacity-20'}`} style={{ borderStyle: 'dashed !important' }}>
              <span className="material-symbols-outlined fs-2 mb-3 text-secondary-custom">format_quote</span>
              <p className="text-muted fst-italic m-0" style={{ lineHeight: '1.6' }}>
                "Thú cưng không phải là tất cả cuộc sống của chúng ta, nhưng chúng làm cho cuộc sống của chúng ta trở nên vẹn tròn."
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
