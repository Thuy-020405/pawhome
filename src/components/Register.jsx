import React, { useState } from 'react';
import { LOGO_IMAGE } from '../data';

// Custom cute white & black cat image matching the design
const CAT_COVER_IMAGE = "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&q=80&w=1200";

export default function Register({
  onRegisterSuccess,
  onNavigateToLogin,
  onBackToHome,
}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Mật khẩu xác nhận không khớp.');
      setIsSubmitting(false);
      return;
    }

    if (!agreeTerms) {
      setErrorMsg('Vui lòng đồng ý với các Điều khoản & Chính sách.');
      setIsSubmitting(false);
      return;
    }

    // Simulate register success
    setTimeout(() => {
      const user = {
        name: fullName.trim() || 'Nguyễn Văn A',
        email: email.trim(),
        phone: phone.trim() || '0901234567',
        address: address.trim() || 'Số 1 Võ Văn Ngân, Thủ Đức'
      };
      onRegisterSuccess(user);
    }, 900);
  };

  return (
    <main className="container-fluid p-0 min-vh-100 d-flex flex-column flex-md-row" style={{ overflowX: 'hidden' }}>
      
      {/* 1. Left Decorative Side with beautiful White & Black Cat */}
      <section 
        className="col-12 col-md-6 col-lg-6 d-none d-md-flex flex-column justify-content-between p-5 position-relative overflow-hidden"
        style={{
          backgroundImage: `url(${CAT_COVER_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          zIndex: 1
        }}
      >
        {/* Transparent dark gradient overlay for high contrast text */}
        <div 
          className="position-absolute top-0 start-0 end-0 bottom-0"
          style={{
            zIndex: -1,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.75) 100%)'
          }}
        />

        {/* Top Header - Logo and Community brand */}
        <div className="d-flex align-items-center justify-content-between position-relative" style={{ zIndex: 10 }}>
          <div className="d-flex align-items-center gap-2 cursor-pointer animate-fade-in" onClick={onBackToHome}>
            <img 
              alt="Logo" 
              src={LOGO_IMAGE} 
              style={{ height: '38px', width: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.8)' }} 
              referrerPolicy="no-referrer"
            />
            <span className="text-white fw-extrabold fs-4 font-sans tracking-tight" style={{ letterSpacing: '-0.02em' }}>
              PawHome
            </span>
            <span className="badge rounded-pill bg-white bg-opacity-20 text-white border-0 py-1.5 px-2.5 ms-1 text-uppercase fw-extrabold" style={{ fontSize: '9px', tracking: '1px' }}>
              COMMUNITY
            </span>
          </div>
        </div>

        {/* Bottom Hero Texts */}
        <div className="position-relative mt-auto pt-5" style={{ zIndex: 10, maxWidth: '520px' }}>
          <h1 className="text-white fw-extrabold mb-3" 
              style={{ 
                fontSize: 'calc(2.2rem + 1.2vw)', 
                lineHeight: '1.15', 
                letterSpacing: '-0.04em',
                fontFamily: '"Plus Jakarta Sans", sans-serif'
              }}>
            Yêu thương từ những <br />điều nhỏ nhất.
          </h1>
          <p className="text-white opacity-90 mb-4 fs-6" style={{ lineHeight: '1.6', fontWeight: '400' }}>
            Trở thành thành viên của cộng đồng yêu thú cưng lớn nhất, nhận ngay đặc quyền đặt lịch, tích điểm và theo dõi camera 24/7.
          </p>

          <div className="d-flex align-items-center gap-4 text-white border-top border-white border-opacity-20 pt-4 mt-2">
            <div className="d-flex align-items-center gap-2 small">
              <span className="material-symbols-outlined text-warning" style={{ fontSize: '18px' }}>shield</span>
              <span className="fw-bold opacity-90">Uy tín tuyệt đối</span>
            </div>
            <div className="d-flex align-items-center gap-2 small">
              <span className="material-symbols-outlined text-warning" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="fw-bold opacity-90">+10,000 Thành viên</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Right Form Side with elegant soft elements */}
      <section 
        className="col-12 col-md-6 col-lg-6 d-flex flex-column justify-content-center align-items-center p-3 p-md-5 position-relative overflow-hidden"
        style={{ 
          minHeight: '100vh', 
          backgroundColor: '#f8fafc', // Soft designer gray-blue background
          zIndex: 1
        }}
      >
        <div className="w-100" style={{ maxWidth: '540px', zIndex: 10 }}>
          
          {/* Back button at top matching screen layout */}
          <div className="mb-4 text-start">
            <span 
              onClick={onBackToHome}
              className="d-inline-flex align-items-center gap-2 text-secondary-custom cursor-pointer fw-extrabold hover-up"
              style={{ fontSize: '13px', textDecoration: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              <span 
                className="d-flex align-items-center justify-content-center rounded-circle bg-white border shadow-sm btn-back-hover" 
                style={{ width: '32px', height: '32px', transition: 'all 0.2s' }}
              >
                <i className="material-symbols-outlined" style={{ fontSize: '15px' }}>arrow_back</i>
              </span>
              Quay lại trang chủ
            </span>
          </div>

          {/* Core Register Card */}
          <div 
            className="card border-0 shadow-xl rounded-48 bg-white p-4 p-md-5 text-start"
            style={{ 
              boxShadow: '0 20px 50px rgba(15, 23, 42, 0.04)',
              borderRadius: '40px'
            }}
          >
            <div className="text-start mb-4">
              <h2 className="fw-black text-primary-custom mb-1 d-flex align-items-center gap-2"
                  style={{ 
                    fontSize: '28px', 
                    letterSpacing: '-1px', 
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontWeight: '850'
                  }}>
                Đăng ký thành viên ✨
              </h2>
              <p className="text-muted small mb-0 fw-medium">
                Khởi đầu hành trình chăm sóc thú cưng chuyên nghiệp
              </p>
            </div>

            {/* Error notifications */}
            {errorMsg && (
              <div className="alert alert-danger rounded-3 p-3 text-start small fw-bold mb-4 border-0 d-flex align-items-center gap-2" style={{ backgroundColor: '#fef2f2', color: '#ef4444' }}>
                <span className="material-symbols-outlined fs-5">error</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Registration Input Form */}
            <form className="d-flex flex-column gap-3.5" onSubmit={handleSubmit}>
              
              {/* Row 1: Full Name & Phone Number */}
              <div className="row g-3">
                <div className="col-12 col-sm-6">
                  <label className="form-label text-uppercase fw-extrabold text-muted mb-1.5" style={{ fontSize: '11px', letterSpacing: '0.5px' }} htmlFor="regName">
                    Họ và tên
                  </label>
                  <div className="position-relative">
                    <span className="material-symbols-outlined position-absolute start-0 top-50 translate-middle-y ms-3 text-muted" style={{ fontSize: '18px' }}>
                      person
                    </span>
                    <input 
                      id="regName"
                      type="text"
                      className="form-control rounded-pill border bg-light bg-opacity-20 border-light-subtle py-2.5"
                      style={{ paddingLeft: '44px', fontSize: '13.5px', height: '46px' }}
                      placeholder="Nguyễn Văn A" 
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <label className="form-label text-uppercase fw-extrabold text-muted mb-1.5" style={{ fontSize: '11px', letterSpacing: '0.5px' }} htmlFor="regPhone">
                    Số ĐT
                  </label>
                  <div className="position-relative">
                    <span className="material-symbols-outlined position-absolute start-0 top-50 translate-middle-y ms-3 text-muted" style={{ fontSize: '18px' }}>
                      call
                    </span>
                    <input 
                      id="regPhone"
                      type="tel"
                      className="form-control rounded-pill border bg-light bg-opacity-20 border-light-subtle py-2.5"
                      style={{ paddingLeft: '44px', fontSize: '13.5px', height: '46px' }}
                      placeholder="0912345678" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Email */}
              <div>
                <label className="form-label text-uppercase fw-extrabold text-muted mb-1.5" style={{ fontSize: '11px', letterSpacing: '0.5px' }} htmlFor="regEmail">
                  Địa chỉ email
                </label>
                <div className="position-relative">
                  <span className="material-symbols-outlined position-absolute start-0 top-50 translate-middle-y ms-3 text-muted" style={{ fontSize: '18px' }}>
                    mail
                  </span>
                  <input 
                    id="regEmail"
                    type="email"
                    className="form-control rounded-pill border bg-light bg-opacity-20 border-light-subtle py-2.5"
                    style={{ paddingLeft: '44px', fontSize: '13.5px', height: '46px' }}
                    placeholder="customer@example.com" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Row 3: Address */}
              <div>
                <label className="form-label text-uppercase fw-extrabold text-muted mb-1.5" style={{ fontSize: '11px', letterSpacing: '0.5px' }} htmlFor="regAddress">
                  Địa chỉ
                </label>
                <div className="position-relative">
                  <span className="material-symbols-outlined position-absolute start-0 top-50 translate-middle-y ms-3 text-muted" style={{ fontSize: '18px' }}>
                    location_on
                  </span>
                  <input 
                    id="regAddress"
                    type="text"
                    className="form-control rounded-pill border bg-light bg-opacity-20 border-light-subtle py-2.5"
                    style={{ paddingLeft: '44px', fontSize: '13.5px', height: '46px' }}
                    placeholder="Số 1 Võ Văn Ngân, Thủ Đức" 
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              {/* Row 4: Password & Confirm Password */}
              <div className="row g-3">
                <div className="col-12 col-sm-6">
                  <label className="form-label text-uppercase fw-extrabold text-muted mb-1.5" style={{ fontSize: '11px', letterSpacing: '0.5px' }} htmlFor="regPass">
                    Mật khẩu
                  </label>
                  <div className="position-relative">
                    <span className="material-symbols-outlined position-absolute start-0 top-50 translate-middle-y ms-3 text-muted" style={{ fontSize: '18px' }}>
                      lock
                    </span>
                    <input 
                      id="regPass"
                      type="password"
                      className="form-control rounded-pill border bg-light bg-opacity-20 border-light-subtle py-2.5"
                      style={{ paddingLeft: '44px', fontSize: '13.5px', height: '46px' }}
                      placeholder="••••••••" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <label className="form-label text-uppercase fw-extrabold text-muted mb-1.5" style={{ fontSize: '11px', letterSpacing: '0.5px' }} htmlFor="regConfirm">
                    Nhập lại
                  </label>
                  <div className="position-relative">
                    <span className="material-symbols-outlined position-absolute start-0 top-50 translate-middle-y ms-3 text-muted" style={{ fontSize: '18px' }}>
                      lock
                    </span>
                    <input 
                      id="regConfirm"
                      type="password"
                      className="form-control rounded-pill border bg-light bg-opacity-20 border-light-subtle py-2.5"
                      style={{ paddingLeft: '44px', fontSize: '13.5px', height: '46px' }}
                      placeholder="••••••••" 
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Checkbox agreement */}
              <div className="form-check d-flex align-items-start gap-1 py-1 mt-1">
                <input 
                  id="regTerms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="form-check-input mt-1.5 accent-primary"
                  style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                />
                <label htmlFor="regTerms" className="form-check-label ms-2 small text-muted" style={{ cursor: 'pointer', fontSize: '12px', lineHeight: '1.4' }}>
                  Tôi đồng ý với các <span className="fw-bold text-dark">Điều khoản dịch vụ</span> và <span className="fw-bold text-dark">Chính sách bảo mật.</span>
                </label>
              </div>

              {/* Primary Signup execution button */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="btn text-white w-100 py-3 rounded-pill fw-extrabold mt-3 d-flex align-items-center justify-content-center gap-2 transition-all hover-up"
                style={{ 
                  backgroundColor: '#161e38', // Deep stylish navy slate matching image
                  fontSize: '13.5px', 
                  letterSpacing: '0.8px',
                  boxShadow: '0 8px 24px rgba(22, 30, 56, 0.2)',
                  height: '48px'
                }}
              >
                <span>{isSubmitting ? 'ĐANG ĐĂNG KÝ...' : 'ĐĂNG KÝ THÀNH VIÊN'}</span>
                <span className="material-symbols-outlined fs-6">arrow_right_alt</span>
              </button>
            </form>
          </div>

          {/* Bottom Footnote links matching the visual layout exactly */}
          <div className="mt-4 text-center">
            <p className="small text-muted mb-1" style={{ fontSize: '13.5px' }}>
              Bạn đã có tài khoản?{' '}
              <button 
                onClick={onNavigateToLogin}
                className="btn btn-link p-0 text-decoration-none fw-bold text-primary-custom ms-1 shadow-none"
                style={{ fontSize: '13.5px' }}
              >
                Đăng nhập tại đây →
              </button>
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
