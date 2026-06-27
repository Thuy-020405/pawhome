import React, { useState } from 'react';
import { LOGO_IMAGE } from '../data';
import { auth, googleAuthProvider } from '../lib/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

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

  const getErrorMessageContent = () => {
    if (!errorMsg) return null;
    const isSpecialError = typeof errorMsg === 'string' && (
      errorMsg.includes('auth/operation-not-allowed') || 
      errorMsg.includes('operation-not-allowed')
    );

    if (isSpecialError) {
      return (
        <div className="text-start">
          <div className="fw-bold text-danger mb-1.5 d-flex align-items-center gap-1.5" style={{ fontSize: '13.5px' }}>
            <span className="material-symbols-outlined text-danger fs-5" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            Đăng nhập bằng Email chưa được kích hoạt!
          </div>
          <p className="mb-2 text-dark small" style={{ fontSize: '12.5px', fontWeight: '500', lineHeight: '1.4' }}>
            Hệ thống Firebase của ứng dụng hiện tại chưa kích hoạt nhà cung cấp <strong>Email/Password</strong> trong cấu hình Authentication. Để khắc phục và sử dụng các tài khoản mẫu ở dưới:
          </p>
          <ol className="ps-3 mb-2.5 small text-muted d-flex flex-column gap-1" style={{ fontSize: '11.5px', lineHeight: '1.4' }}>
            <li>Mở trang quản trị <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-decoration-underline fw-bold text-primary">Firebase Console</a>.</li>
            <li>Chọn dự án của bạn (Project ID: <strong className="text-dark">232253991900</strong>).</li>
            <li>Đi đến mục <strong>Build &gt; Authentication &gt; Sign-in method</strong>.</li>
            <li>Bấm <strong>Add new provider</strong>, chọn <strong>Email/Password</strong>, gạt nút <strong>Enable</strong> và bấm <strong>Save</strong>.</li>
          </ol>
          <div className="p-2 rounded bg-white border border-danger-subtle small text-dark mb-1" style={{ fontSize: '11px', lineHeight: '1.4' }}>
            💡 <strong>Cách thay thế nhanh:</strong> Bạn có thể bấm nút <strong>Tiếp tục với Google</strong> ở bên dưới để đăng nhập ngay lập tức mà không cần cấu hình thêm!
          </div>
        </div>
      );
    }

    return (
      <div className="d-flex align-items-center gap-2 fw-bold">
        <span className="material-symbols-outlined fs-5">error</span>
        <span>{typeof errorMsg === 'object' ? JSON.stringify(errorMsg) : errorMsg}</span>
      </div>
    );
  };

  const handleDemoLogin = async (role) => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const idToken = `demo-${role}`;
      const res = await fetch('/api/auth/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        }
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Đăng nhập thử nghiệm thất bại.');
      }

      const dbUser = await res.json();
      onLoginSuccess({
        id: dbUser.id,
        name: dbUser.fullName || dbUser.email.split('@')[0],
        email: dbUser.email,
        phone: dbUser.phone || '',
        role: dbUser.role,
        uid: dbUser.uid,
        token: idToken
      });
    } catch (error) {
      console.error('Demo login error:', error);
      setErrorMsg(error.message || 'Đăng nhập thử nghiệm thất bại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      if (!email.trim() || password.length < 6) {
        throw new Error('Mật khẩu tối thiểu phải từ 6 ký tự.');
      }

      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const idToken = await userCredential.user.getIdToken();
      
      const res = await fetch('/api/auth/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        }
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Đăng nhập thành công nhưng không thể đồng bộ với hệ thống dữ liệu.');
      }

      const dbUser = await res.json();
      onLoginSuccess({
        id: dbUser.id,
        name: dbUser.fullName || dbUser.email.split('@')[0],
        email: dbUser.email,
        phone: dbUser.phone || '',
        role: dbUser.role,
        uid: dbUser.uid,
        token: idToken
      });
    } catch (error) {
      console.error('Login error:', error);
      setErrorMsg(error.message || 'Tài khoản hoặc mật khẩu không chính xác.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const userCredential = await signInWithPopup(auth, googleAuthProvider);
      const idToken = await userCredential.user.getIdToken();

      const res = await fetch('/api/auth/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        }
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Đăng nhập bằng Google thành công nhưng đồng bộ dữ liệu thất bại.');
      }

      const dbUser = await res.json();
      onLoginSuccess({
        id: dbUser.id,
        name: dbUser.fullName || dbUser.email.split('@')[0],
        email: dbUser.email,
        phone: dbUser.phone || '',
        role: dbUser.role,
        uid: dbUser.uid,
        token: idToken
      });
    } catch (error) {
      console.error('Google Login error:', error);
      setErrorMsg(error.message || 'Đăng nhập Google thất bại hoặc bị hủy bỏ.');
    } finally {
      setIsSubmitting(false);
    }
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
              <div className="alert alert-danger rounded-3 p-3 text-start small mb-4 border-0" style={{ backgroundColor: '#fef2f2', color: '#ef4444' }}>
                {getErrorMessageContent()}
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

            {/* Pre-seeded credentials helper box */}
            <div 
              className="card border-0 mt-4 p-3.5 text-start"
              style={{ 
                backgroundColor: '#f8fafc',
                borderRadius: '18px',
                border: '1px solid #f1f5f9'
              }}
            >
              <h4 className="fw-bold text-dark mb-2 d-flex align-items-center gap-1.5" style={{ fontSize: '13px' }}>
                <span className="material-symbols-outlined text-primary-custom" style={{ fontSize: '16px' }}>key</span>
                Đăng nhập nhanh không cần mật khẩu (Bypass):
              </h4>
              <p className="text-muted mb-3" style={{ fontSize: '11px', lineHeight: '1.4' }}>
                Bấm trực tiếp vào các tài khoản dưới đây để đăng nhập chạy thử nhanh mà không cần cấu hình Firebase:
              </p>
              <div className="d-flex flex-column gap-2 small" style={{ fontSize: '12px' }}>
                <button 
                  type="button"
                  onClick={() => handleDemoLogin('admin')}
                  className="p-2.5 bg-white rounded border border-light-subtle text-start w-100 transition-all hover-shadow-sm d-flex flex-column gap-0.5"
                  style={{ cursor: 'pointer', transition: 'all 0.2s ease-in-out' }}
                >
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="badge bg-danger" style={{ fontSize: '9px' }}>QUẢN TRỊ VIÊN (ADMIN)</span>
                    <span className="text-primary-custom small fw-bold">👉 Click để vào</span>
                  </div>
                  <div className="text-muted mt-1">Email: <strong className="text-dark">admin@pawhome.vn</strong></div>
                </button>

                <button 
                  type="button"
                  onClick={() => handleDemoLogin('customer')}
                  className="p-2.5 bg-white rounded border border-light-subtle text-start w-100 transition-all hover-shadow-sm d-flex flex-column gap-0.5"
                  style={{ cursor: 'pointer', transition: 'all 0.2s ease-in-out' }}
                >
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="badge bg-success" style={{ fontSize: '9px' }}>KHÁCH HÀNG (CUSTOMER)</span>
                    <span className="text-primary-custom small fw-bold">👉 Click để vào</span>
                  </div>
                  <div className="text-muted mt-1">Email: <strong className="text-dark">customer@pawhome.vn</strong></div>
                </button>

                <button 
                  type="button"
                  onClick={() => handleDemoLogin('expert')}
                  className="p-2.5 bg-white rounded border border-light-subtle text-start w-100 transition-all hover-shadow-sm d-flex flex-column gap-0.5"
                  style={{ cursor: 'pointer', transition: 'all 0.2s ease-in-out' }}
                >
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span className="badge bg-primary" style={{ fontSize: '9px' }}>CHUYÊN GIA (EXPERT)</span>
                    <span className="text-primary-custom small fw-bold">👉 Click để vào</span>
                  </div>
                  <div className="text-muted mt-1">Email: <strong className="text-dark">expert@pawhome.vn</strong></div>
                </button>
              </div>
              <p className="mt-3 mb-0 text-muted" style={{ fontSize: '10.5px', lineHeight: '1.4' }}>
                💡 <strong>Lưu ý:</strong> Cách này giúp bạn trải nghiệm đầy đủ vai trò một cách cực kỳ tiện lợi!
              </p>
            </div>

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
