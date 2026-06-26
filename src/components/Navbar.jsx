import React, { useState } from 'react';
import { LOGO_IMAGE } from '../data';
import { safeScrollTo } from '../lib/storage';

export default function Navbar({
  currentView,
  onViewChange,
  isDarkMode,
  onToggleDarkMode,
  user,
  onLogout,
  bookingCount,
  onOpenBookingModal,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Dịch vụ', value: 'services', id: 'services-section' },
    { label: 'Thú nuôi', value: 'pets', id: 'pets-section' },
    { label: 'Tại sao PawHome', value: 'why-pawhome', id: 'why-pawhome-section' },
    { label: 'Về chúng tôi', value: 'about', id: 'about-section' },
    { label: 'Blog', value: 'blog', id: 'blog-section' },
  ];

  const handleNavClick = (value, id) => {
    setMobileMenuOpen(false);
    if (value === 'services' || value === 'pets' || value === 'why-pawhome' || value === 'about' || value === 'blog') {
      onViewChange(value);
      safeScrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onViewChange('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <header 
      className={`navbar navbar-expand-lg fixed-top shadow-sm transition-all px-3 px-md-5 d-flex align-items-center justify-content-between`}
      style={{
        height: '80px',
        backgroundColor: isDarkMode ? 'rgba(13, 28, 47, 0.6)' : 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 35, 111, 0.05)',
        zIndex: 1030
      }}
    >
      {/* Brand logo */}
      <button 
        onClick={() => onViewChange('home')}
        className="btn p-0 border-0 d-flex align-items-center gap-2 text-decoration-none shadow-none text-start"
        style={{ background: 'none' }}
      >
        <img 
          alt="PawHome" 
          src={LOGO_IMAGE} 
          style={{ height: '44px', width: '44px', borderRadius: '50%', objectFit: 'cover' }} 
          referrerPolicy="no-referrer"
        />
        <span 
          className="fs-3 fw-extrabold tracking-tight"
          style={{ color: isDarkMode ? '#60a5fa' : 'var(--primary-color)', letterSpacing: '-0.5px' }}
        >
          PawHome
        </span>
      </button>

      {/* Desktop Navigation */}
      <nav className="d-none d-lg-flex align-items-center gap-4">
        {navLinks.map((link) => {
          const isActive = 
            currentView === link.value || 
            (link.value === 'services' && currentView === 'service-grooming');
          return (
            <button
              key={link.value}
              onClick={() => handleNavClick(link.value, link.id)}
              className="btn border-0 fw-bold px-3 py-2 text-decoration-none shadow-none transition-all"
              style={{ 
                color: isActive 
                  ? '#F97316' // Secondary color from the new color palette
                  : (isDarkMode ? '#cbd5e1' : '#334155'), // Neutral color
                fontSize: '15px'
              }}
              onMouseOver={(e) => {
                if (!isActive) e.currentTarget.style.color = '#F97316';
              }}
              onMouseOut={(e) => {
                if (!isActive) e.currentTarget.style.color = isDarkMode ? '#cbd5e1' : '#334155';
              }}
            >
              {link.label}
            </button>
          );
        })}
        {user && (
          <button
            onClick={() => onViewChange('bookings')}
            className={`btn border-0 fw-bold px-3 py-2 d-flex align-items-center gap-2 text-decoration-none shadow-none transition-all`}
            style={{ 
              color: currentView === 'bookings' 
                ? '#F97316' 
                : (isDarkMode ? '#cbd5e1' : '#334155'),
              fontSize: '15px'
            }}
            onMouseOver={(e) => {
              if (currentView !== 'bookings') e.currentTarget.style.color = '#F97316';
            }}
            onMouseOut={(e) => {
              if (currentView !== 'bookings') e.currentTarget.style.color = isDarkMode ? '#cbd5e1' : '#334155';
            }}
          >
            Lịch trình của tôi
            {bookingCount > 0 && (
              <span className="badge rounded-pill bg-danger animate-pulse">
                {bookingCount}
              </span>
            )}
          </button>
        )}
      </nav>

      {/* Control Actions & Auth */}
      <div className="d-none d-sm-flex align-items-center gap-3">
        {/* Toggle dark mode */}
        <button 
          onClick={onToggleDarkMode}
          className="btn p-2 rounded-circle border-0 d-flex align-items-center justify-content-center shadow-none"
          style={{
            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 35, 111, 0.05)',
            color: isDarkMode ? '#60a5fa' : 'var(--primary-color)'
          }}
          title={isDarkMode ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
        >
          <span className="material-symbols-outlined fs-5">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        {user ? (
          <div className="d-flex align-items-center gap-3 ps-3 border-start" style={{ borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)' }}>
            <button 
              onClick={() => onViewChange('bookings')}
              className="btn p-0 border-0 d-flex align-items-center gap-2 text-start text-decoration-none shadow-none"
              style={{ background: 'none' }}
            >
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm"
                style={{
                  width: '38px',
                  height: '38px',
                  backgroundColor: 'var(--primary-color)',
                  color: '#ffffff',
                  fontSize: '14px'
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="d-none d-md-block">
                <div className="fw-bold lh-sm text-truncate" style={{ fontSize: '13px', maxWidth: '120px', color: isDarkMode ? '#60a5fa' : 'var(--primary-color)' }}>
                  {user.name}
                </div>
                <div className="text-muted lh-1" style={{ fontSize: '11px' }}>Khách hàng</div>
              </div>
            </button>
            <button
              onClick={onLogout}
              className="btn p-2 rounded-3 border-0 d-flex align-items-center justify-content-center text-muted"
              title="Đăng xuất"
              onMouseOver={(e) => e.currentTarget.style.color = '#ef4444'}
              onMouseOut={(e) => e.currentTarget.style.color = '#5c6270'}
            >
              <span className="material-symbols-outlined fs-5">logout</span>
            </button>
          </div>
        ) : (
          <div className="d-flex align-items-center gap-2">
            <button 
              onClick={() => onViewChange('login')}
              className="btn btn-outline-primary rounded-pill fw-bold"
              style={{
                fontSize: '13px',
                borderColor: 'rgba(0, 35, 111, 0.3)',
                color: isDarkMode ? '#60a5fa' : 'var(--primary-color)',
                padding: '8px 18px'
              }}
            >
              Đăng nhập
            </button>
            <button 
              onClick={() => onViewChange('register')}
              className="btn btn-secondary-custom rounded-pill fw-bold"
              style={{ fontSize: '13px', padding: '8px 18px' }}
            >
              Đăng ký
            </button>
          </div>
        )}

        <button 
          onClick={onOpenBookingModal}
          className="btn btn-primary-custom rounded-pill d-flex align-items-center gap-2 shadow-sm"
          style={{ fontSize: '13px', padding: '9px 18px' }}
        >
          <span className="material-symbols-outlined fs-6">calendar_month</span>
          Đặt Lịch Chăm Sóc
        </button>
      </div>

      {/* Mobile action toggles */}
      <div className="d-flex d-sm-none align-items-center gap-2">
        <button 
          onClick={onToggleDarkMode}
          className="btn p-2 rounded-circle border-0 d-flex align-items-center justify-content-center text-primary-custom"
          style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 35, 111, 0.05)' }}
        >
          <span className="material-symbols-outlined fs-5">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="btn p-2 rounded-circle border-0 d-flex align-items-center justify-content-center text-primary-custom"
          style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 35, 111, 0.05)' }}
        >
          <span className="material-symbols-outlined fs-4">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div 
          className="position-absolute w-100 left-0 p-4 shadow-lg d-flex flex-column gap-3 d-sm-none"
          style={{
            top: '80px',
            backgroundColor: isDarkMode ? '#0d1c2f' : '#ffffff',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            zIndex: 1020
          }}
        >
          {navLinks.map((link) => {
            const isActive = 
              currentView === link.value || 
              (link.value === 'services' && currentView === 'service-grooming');
            return (
              <button
                key={link.value}
                onClick={() => handleNavClick(link.value, link.id)}
                className="btn border-0 py-2 text-start fw-bold"
                style={{ color: isActive ? '#F97316' : (isDarkMode ? '#ffffff' : '#334155') }}
              >
                {link.label}
              </button>
            );
          })}
          {user && (
            <button
              onClick={() => {
                onViewChange('bookings');
                setMobileMenuOpen(false);
              }}
              className="btn border-0 py-2 text-start fw-bold d-flex align-items-center justify-content-between"
              style={{ color: currentView === 'bookings' ? '#F97316' : (isDarkMode ? '#ffffff' : '#334155') }}
            >
              Lịch trình của tôi
              {bookingCount > 0 && (
                <span className="badge rounded-pill bg-danger">
                  {bookingCount}
                </span>
              )}
            </button>
          )}

          <div className="border-top pt-3 d-flex flex-column gap-2">
            {user ? (
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style={{ width: '38px', height: '38px', backgroundColor: 'var(--primary-color)' }}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="fw-bold" style={{ fontSize: '13px', color: isDarkMode ? '#60a5fa' : 'var(--primary-color)' }}>{user.name}</div>
                    <div className="text-muted" style={{ fontSize: '11px' }}>{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-sm btn-outline-danger fw-bold rounded-pill"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="row g-2">
                <div className="col-6">
                  <button 
                    onClick={() => {
                      onViewChange('login');
                      setMobileMenuOpen(false);
                    }}
                    className="btn btn-outline-primary rounded-pill w-100 fw-bold"
                  >
                    Đăng nhập
                  </button>
                </div>
                <div className="col-6">
                  <button 
                    onClick={() => {
                      onViewChange('register');
                      setMobileMenuOpen(false);
                    }}
                    className="btn btn-secondary-custom rounded-pill w-100 fw-bold"
                  >
                    Đăng ký
                  </button>
                </div>
              </div>
            )}

            <button 
              onClick={() => {
                onOpenBookingModal();
                setMobileMenuOpen(false);
              }}
              className="btn btn-primary-custom w-100 rounded-pill mt-2 d-flex align-items-center justify-content-center gap-2"
            >
              <span className="material-symbols-outlined fs-6">calendar_month</span>
              Đặt Lịch Chăm Sóc
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
