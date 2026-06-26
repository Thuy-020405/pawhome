import React, { useState } from 'react';
import { LOGO_IMAGE } from '../data';

const LOGIN_COVER_IMAGE = "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?auto=format&fit=crop&q=80&w=1200";

export default function Login({
  onLoginSuccess,
  onNavigateToRegister,
  onBackToHome,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeRole, setActiveRole] = useState('customer'); // 'customer' | 'store'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    // Simulate login validation
    setTimeout(() => {
      if (email.trim() && password.length >= 6) {
        const mockName = email.split('@')[0];
        const formattedName = mockName.charAt(0).toUpperCase() + mockName.slice(1);
        const user = {
          name: formattedName || 'Nguyễn Văn A',
          email: email.trim(),
          phone: '0912345678',
          role: activeRole,
          address: 'Số 1 Võ Văn Ngân, Thủ Đức'
        };
        onLoginSuccess(user);
      } else {
        setErrorMsg('Mật khẩu tối thiểu phải từ 6 ký tự.');
        setIsSubmitting(false);
      }
    }, 850);
  };

  const handleGoogleLogin = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const user = {
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@gmail.com',
        phone: '0912345678',
        role: activeRole,
        address: 'Số 1 Võ Văn Ngân, Thủ Đức'
      };
      onLoginSuccess(user);
    }, 700);
  };

  return (
    <main className="container-fluid p-0 min-vh-100 d-flex flex-column flex-md-row" style={{ overflowX: 'hidden' }}>
      
      {/* 1. Left Decorative Side with beautiful Bulldog profile in yellow hoodie */}
      <section 
        className="col-12 col-md-6 col-lg-6 d-none d-md-flex flex-column justify-content-between p-5 position-relative overflow-hidden"
        style={{
          backgroundImage: `url(${LOGIN_COVER_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          zIndex: 1
        }}
      >
        {/* Transparent dark gradient overlay for high contrast text and deep blue-ish tint */}
        <div 
          className="position-absolute top-0 start-0 end-0 bottom-0"
          style={{
            zIndex: -1,
            background: 'linear-gradient(to bottom, rgba(13,28,47,0.35) 0%, rgba(13,28,47,0.1) 40%, rgba(13,28,47,0.65) 100%)'
          }}
        />

        {/* Top Header - Logo and Customer brand */}
        <div className="d-flex align-items-center justify-content-between position-relative" style={{ zIndex: 10 }}>
          <div className="d-flex align-items-center gap-2 cursor-pointer" onClick={onBackToHome}>
            <img 
              alt="Logo" 
              src={LOGO_IMAGE} 
              style={{ height: '38px', width: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.8)' }} 
              referrerPolicy="no-referrer"
            />
            <span className="text-white fw-extrabold fs-4 font-sans tracking-tight" style={{ letterSpacing: '-0.02em' }}>
              PetEye
            </span>
            <span className="badge rounded-pill bg-white bg-opacity-20 text-white border-0 py-1.5 px-2.5 ms-1 text-uppercase fw-extrabold" style={{ fontSize: '9px', tracking: '1px' }}>
              CUSTOMER
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
            Nơi thú cưng được chăm <br />sóc như gia đình.
          </h1>
          <p className="text-white opacity-90 mb-4 fs-6" style={{ lineHeight: '1.6', fontWeight: '400' }}>
            Khám phá giải pháp công nghệ toàn diện giúp bạn quản lý và chăm sóc thú cưng dễ dàng hơn bao giờ hết.
          </p>

          <div className="d-flex align-items-center gap-4 text-white border-top border-white border-opacity-20 pt-4 mt-2">
            <div className="d-flex align-items-center gap-2 small">
              <span className="material-symbols-outlined text-warning" style={{ fontSize: '18px' }}>shield</span>
              <span className="fw-bold opacity-90">Uy tín tuyệt đối</span>
            </div>
            <div className="d-flex align-items-center gap-2 small">
              <span className="material-symbols-outlined text-warning" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="fw-bold opacity-90">10,000+ Khách hàng</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Right Form Side */}
      <section 
        className="col-12 col-md-6 col-lg-6 d-flex flex-column justify-content-center align-items-center p-3 p-md-5 position-relative"
        style={{ 
          minHeight: '100vh', 
          backgroundColor: '#f8fafc',
          zIndex: 1
        }}
      >
        <div className="w-100" style={{ maxWidth: '540px', zIndex: 10 }}>
          
          {/* Back button at top */}
          <div className="mb-4 text-start">
            <span 
              onClick={onBackToHome}
              className="d-inline-flex align-items-center gap-2 text-secondary-custom cursor-pointer fw-extrabold hover-up"
              style={{ fontSize: '13px', textDecoration: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              <span 
                className="d-flex align-items-center justify-content-center rounded-circle bg-white border shadow-sm" 
                style={{ width: '32px', height: '32px', transition: 'all 0.2s' }}
              >
                <i className="material-symbols-outlined" style={{ fontSize: '15px' }}>arrow_back</i>
              </span>
              Quay lại trang chủ
            </span>
          </div>

          {/* Core Login Card */}
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
                Chào mừng trở lại 👋
              </h2>
              <p className="text-muted small mb-0 fw-medium">
                Đăng nhập bằng tài khoản Khách hàng
              </p>
            </div>

            {/* Error notifications */}
            {errorMsg && (
              <div className="alert alert-danger rounded-3 p-3 text-start small fw-bold mb-4 border-0 d-flex align-items-center gap-2" style={{ backgroundColor: '#fef2f2', color: '#ef4444' }}>
                <span className="material-symbols-outlined fs-5">error</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Login Input Form */}
            <form className="d-flex flex-column gap-3.5" onSubmit={handleSubmit}>
              
              {/* Field 1: Email */}
              <div>
                <label className="form-label text-uppercase fw-extrabold text-muted mb-1.5" style={{ fontSize: '11px', letterSpacing: '0.5px' }} htmlFor="loginEmail">
                  Địa chỉ email
                </label>
                <div className="position-relative">
                  <span className="material-symbols-outlined position-absolute start-0 top-50 translate-middle-y ms-3 text-muted" style={{ fontSize: '18px' }}>
                    mail
                  </span>
                  <input 
                    id="loginEmail"
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

              {/* Field 2: Password */}
              <div>
                <div className="d-flex justify-content-between align-items-center mb-1.5">
                  <label className="form-label text-uppercase fw-extrabold text-muted mb-0" style={{ fontSize: '11px', letterSpacing: '0.5px' }} htmlFor="loginPassword">
                    Mật khẩu
                  </label>
                  <button 
                    type="button"
                    className="btn btn-link p-0 text-decoration-none fw-bold text-muted shadow-none"
                    style={{ fontSize: '11px', letterSpacing: '0.5px', color: '#64748b' }}
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                
                <div className="position-relative">
                  <span className="material-symbols-outlined position-absolute start-0 top-50 translate-middle-y ms-3 text-muted" style={{ fontSize: '18px' }}>
                    lock
                  </span>
                  <input 
                    id="loginPassword"
                    type={showPassword ? 'text' : 'password'}
                    className="form-control rounded-pill border bg-light bg-opacity-20 border-light-subtle py-2.5"
                    style={{ paddingLeft: '44px', paddingRight: '48px', fontSize: '13.5px', height: '46px' }}
                    placeholder="••••••••" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn p-0 border-0 position-absolute end-0 top-50 translate-middle-y me-3 text-muted d-flex align-items-center shadow-none"
                  >
                    <span className="material-symbols-outlined fs-5">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Primary login button */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="btn text-white w-100 py-3 rounded-pill fw-extrabold mt-3 d-flex align-items-center justify-content-center gap-2 transition-all hover-up"
                style={{ 
                  backgroundColor: '#161e38', 
                  fontSize: '13.5px', 
                  letterSpacing: '0.8px',
                  boxShadow: '0 8px 24px rgba(22, 30, 56, 0.2)',
                  height: '48px'
                }}
              >
                <span>{isSubmitting ? 'ĐANG ĐĂNG NHẬP...' : 'ĐĂNG NHẬP NGAY'}</span>
                <span className="material-symbols-outlined fs-6">arrow_right_alt</span>
              </button>
            </form>

            <div className="d-flex align-items-center my-4 text-muted">
              <hr className="flex-grow-1 opacity-20" />
              <span className="px-3 small fw-bold text-uppercase text-muted" style={{ letterSpacing: '1px', fontSize: '10px' }}>Hoặc đăng nhập bằng</span>
              <hr className="flex-grow-1 opacity-20" />
            </div>

            {/* Google provider login */}
            <button 
              type="button"
              onClick={handleGoogleLogin}
              className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2 py-2.5 rounded-pill"
              style={{
                borderColor: '#e2e8f0',
                color: '#334155',
                fontSize: '13.5px',
                fontWeight: 700,
                backgroundColor: '#ffffff',
                height: '46px'
              }}
            >
              <img 
                alt="Google sign-in logo" 
                className="object-contain" 
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                style={{ width: '18px', height: '18px' }}
                referrerPolicy="no-referrer"
              />
              <span>Tiếp tục với Google</span>
            </button>

          </div>

          {/* Bottom Footnote signup check link */}
          <div className="mt-4 text-center">
            <p className="small text-muted mb-1" style={{ fontSize: '13.5px' }}>
              Chưa có tài khoản?{' '}
              <button 
                onClick={onNavigateToRegister}
                className="btn btn-link p-0 text-decoration-none fw-bold text-primary-custom ms-1 shadow-none"
                style={{ fontSize: '13.5px' }}
              >
                Đăng ký miễn phí →
              </button>
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
