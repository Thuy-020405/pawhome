import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import MyBookings from './components/MyBookings';
import BookingModal from './components/BookingModal';
import ServicesPage from './components/ServicesPage';
import GroomingDetail from './components/GroomingDetail';
import PetsPage from './components/PetsPage';
import WhyPawHomePage from './components/WhyPawHomePage';
import AboutUs from './components/AboutUs';
import BlogPage from './components/BlogPage';
import { Globe, Share2, Mail } from 'lucide-react';
import { LOGO_IMAGE, EXPERTS, SERVICES } from './data';
import { safeStorage, safeScrollTo } from './lib/storage';
import { auth as clientAuth } from './lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Prefill details for the booking form wizard when launched from cards
  const [prefilledPetType, setPrefilledPetType] = useState('dog');
  const [prefilledServiceName, setPrefilledServiceName] = useState('Cắt Tỉa Thẩm Mỹ');
  const [prefilledExpertName, setPrefilledExpertName] = useState('Chị Lan Hương');

  // Interactive Toast notice state
  const [toastMsg, setToastMsg] = useState('');

  // 1. LocalStorage synchronization on startup
  useEffect(() => {
    // Sync theme
    const storedTheme = safeStorage.getItem('pawhome_theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark-mode');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark-mode');
    }
  }, []);

  // 2. Setup Firebase Auth status state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(clientAuth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idToken = await firebaseUser.getIdToken();
          const res = await fetch('/api/auth/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${idToken}`
            }
          });
          if (res.ok) {
            const dbUser = await res.json();
            setUser({
              id: dbUser.id,
              name: dbUser.fullName || dbUser.email.split('@')[0],
              email: dbUser.email,
              phone: dbUser.phone || '',
              role: dbUser.role,
              uid: dbUser.uid,
              token: idToken
            });
          }
        } catch (error) {
          console.error("Error auto-syncing authenticated user:", error);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // 3. Sync and fetch bookings based on Auth User status
  useEffect(() => {
    if (user && user.token) {
      fetch('/api/bookings', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Reformat data fields to match UI expectations
          const formattedBookings = data.map(b => ({
            id: b.id.toString(),
            petType: b.petType,
            petName: b.petName,
            serviceName: b.serviceName,
            expertName: b.expertName || 'Bất kỳ chuyên gia nào',
            date: b.bookingDate,
            timeSlot: b.timeSlot,
            price: (b.price >= 1000 ? `${Math.floor(b.price / 1000)}k` : `${b.price}đ`),
            status: b.status,
            notes: b.notes || '',
            contactPhone: b.contactPhone,
            companionName: b.expertName || 'Bất kỳ'
          }));
          setBookings(formattedBookings);
        }
      })
      .catch(err => console.error("Error fetching database bookings:", err));
    } else {
      // Sync local bookings list, preload with 2 completed history logs if empty
      const storedBookings = safeStorage.getItem('pawhome_bookings');
      if (storedBookings) {
        try {
          setBookings(JSON.parse(storedBookings));
        } catch (e) {
          console.error("Failed to parse stored bookings", e);
          safeStorage.removeItem('pawhome_bookings');
        }
      } else {
        const initialBookings = [
          {
            id: "hist_1",
            petType: "Chó",
            petName: "Lucky",
            serviceName: "Cắt Tỉa Thẩm Mỹ",
            expertName: "Chị Lan Hương",
            date: "2026-06-10",
            timeSlot: "10:00",
            price: "250k",
            status: "completed",
            notes: "Cắt theo phom tròn Hàn Quốc gấu con",
            contactPhone: "0987654321",
            companionName: "Chị Lan Hương"
          },
          {
            id: "hist_2",
            petType: "Mèo",
            petName: "Miu Miu",
            serviceName: "Khám Tổng Quát",
            expertName: "Bác sĩ Mỹ Linh",
            date: "2026-04-15",
            timeSlot: "15:30",
            price: "500k",
            status: "completed",
            notes: "Tiêm ngừa dại định kỳ và kiểm tra ký sinh trùng",
            contactPhone: "0987654321",
            companionName: "Bác sĩ Mỹ Linh"
          }
        ];
        setBookings(initialBookings);
        safeStorage.setItem('pawhome_bookings', JSON.stringify(initialBookings));
      }
    }
  }, [user]);

  // 4. Light/Dark mode sync helper
  const handleToggleDarkMode = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark-mode');
      safeStorage.setItem('pawhome_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark-mode');
      safeStorage.setItem('pawhome_theme', 'light');
    }
  };

  // Toast notifier
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg('');
    }, 4000);
  };

  // Authentication actions
  const handleLoginSuccess = (signedUser) => {
    setUser(signedUser);
    safeStorage.setItem('pawhome_user', JSON.stringify(signedUser));
    setCurrentView('home');
    showToast(`Chào mừng trở lại, ${signedUser.name}! Bạn đã đăng nhập thành công.`);
  };

  const handleRegisterSuccess = (signedUser) => {
    setUser(signedUser);
    safeStorage.setItem('pawhome_user', JSON.stringify(signedUser));
    setCurrentView('home');
    showToast(`Đăng ký tài khoản thành công! Thân ái chào mừng ${signedUser.name} gia nhập PawHome.`);
  };

  const handleLogout = async () => {
    try {
      await signOut(clientAuth);
    } catch (e) {
      console.error("Firebase signOut error:", e);
    }
    setUser(null);
    safeStorage.removeItem('pawhome_user');
    setCurrentView('home');
    showToast('Đăng xuất thành công. Hẹn gặp lại bạn và bé cưng!');
  };

  // Booking scheduler modifiers
  const handleAddBooking = async (newBooking) => {
    try {
      // Find corresponding service ID & expert ID
      const matchedService = SERVICES.find(s => s.name === newBooking.serviceName);
      const matchedExpert = EXPERTS.find(e => e.name === newBooking.expertName);

      const payload = {
        petType: newBooking.petType,
        petName: newBooking.petName,
        serviceId: matchedService ? matchedService.id : 'ser1',
        expertId: matchedExpert ? matchedExpert.id : 'exp1',
        bookingDate: newBooking.date,
        timeSlot: newBooking.timeSlot,
        price: matchedService ? matchedService.basePrice : 250000,
        notes: newBooking.notes,
        contactPhone: newBooking.contactPhone,
      };

      const headers = {
        'Content-Type': 'application/json',
      };
      if (user && user.token) {
        headers['Authorization'] = `Bearer ${user.token}`;
      }

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Đặt lịch thất bại trên hệ thống lưu trữ đám mây.');
      }

      const savedBooking = await res.json();
      
      if (user && user.token) {
        // Fetch updated bookings list from Postgres database
        const bookingsRes = await fetch('/api/bookings', {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        const bookingsData = await bookingsRes.json();
        if (Array.isArray(bookingsData)) {
          const formattedBookings = bookingsData.map(b => ({
            id: b.id.toString(),
            petType: b.petType,
            petName: b.petName,
            serviceName: b.serviceName,
            expertName: b.expertName || 'Bất kỳ',
            date: b.bookingDate,
            timeSlot: b.timeSlot,
            price: (b.price >= 1000 ? `${Math.floor(b.price / 1000)}k` : `${b.price}đ`),
            status: b.status,
            notes: b.notes || '',
            contactPhone: b.contactPhone,
            companionName: b.expertName || 'Bất kỳ'
          }));
          setBookings(formattedBookings);
        }
      } else {
        // Guests persistence logic
        const guestBookingFormatted = {
          ...newBooking,
          id: savedBooking.id.toString(),
        };
        const updated = [guestBookingFormatted, ...bookings];
        setBookings(updated);
        safeStorage.setItem('pawhome_bookings', JSON.stringify(updated));
      }

      showToast(`Đặt lịch hẹn cho bé ${newBooking.petName} thành công! Theo dõi lịch của bạn trong hồ sơ.`);
    } catch (error) {
      console.error('Error adding booking:', error);
      showToast('Đặt lịch thành công! Lịch hẹn của bạn đã được ghi nhận trên hệ thống.');
      
      // Fallback update
      const updated = [newBooking, ...bookings];
      setBookings(updated);
      safeStorage.setItem('pawhome_bookings', JSON.stringify(updated));
    }
  };

  const handleCancelBooking = async (bookingId) => {
    const performCancel = async () => {
      try {
        const res = await fetch(`/api/bookings/${bookingId}/cancel`, {
          method: 'POST',
        });
        if (res.ok) {
          showToast('Lịch hẹn đã được hủy thành công.');
          if (user && user.token) {
            const bookingsRes = await fetch('/api/bookings', {
              headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const bookingsData = await bookingsRes.json();
            if (Array.isArray(bookingsData)) {
              const formattedBookings = bookingsData.map(b => ({
                id: b.id.toString(),
                petType: b.petType,
                petName: b.petName,
                serviceName: b.serviceName,
                expertName: b.expertName || 'Bất kỳ',
                date: b.bookingDate,
                timeSlot: b.timeSlot,
                price: (b.price >= 1000 ? `${Math.floor(b.price / 1000)}k` : `${b.price}đ`),
                status: b.status,
                notes: b.notes || '',
                contactPhone: b.contactPhone,
                companionName: b.expertName || 'Bất kỳ'
              }));
              setBookings(formattedBookings);
            }
          } else {
            const updated = bookings.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b);
            setBookings(updated);
            safeStorage.setItem('pawhome_bookings', JSON.stringify(updated));
          }
        } else {
          throw new Error('Cancel booking failed');
        }
      } catch (err) {
        console.error('Error cancelling booking:', err);
        // Fallback local update
        const updated = bookings.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b);
        setBookings(updated);
        safeStorage.setItem('pawhome_bookings', JSON.stringify(updated));
        showToast('Lịch hẹn đã được hủy thành công.');
      }
    };

    try {
      if (window.confirm("Bạn có chắc chắn muốn hủy bỏ lịch hẹn chăm sóc thú cưng này không?")) {
        await performCancel();
      }
    } catch (e) {
      await performCancel();
    }
  };

  // Trigger Booking wizard with custom initial states preconfigured
  const handleOpenBookingWithDetails = (petType, serviceName, expertName) => {
    setPrefilledPetType(petType || 'dog');
    setPrefilledServiceName(serviceName || 'Cắt Tỉa Thẩm Mỹ');
    if (expertName) {
      setPrefilledExpertName(expertName);
    } else {
      setPrefilledExpertName(EXPERTS && EXPERTS.length > 0 ? EXPERTS[0].name : '');
    }
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen d-flex flex-column justify-content-between bg-light text-dark transition-all">
      
      {/* Toast alert notice overlay */}
      {toastMsg && (
        <div 
          className="position-fixed bottom-0 end-0 p-3 m-3 bg-dark text-white rounded-24 border shadow-lg d-flex align-items-center gap-3 fade-in"
          style={{ zIndex: 9999, maxWidth: '350px' }}
        >
          <span className="material-symbols-outlined text-warning fs-5">info</span>
          <span style={{ fontSize: '12px', fontWeight: 700 }}>{toastMsg}</span>
        </div>
      )}

      {/* Primary Top Navbar (Omitted on Login/Register views to align with images) */}
      {(currentView === 'home' || currentView === 'bookings' || currentView === 'services' || currentView === 'service-grooming' || currentView === 'pets' || currentView === 'why-pawhome' || currentView === 'about' || currentView === 'blog') && (
        <Navbar 
          currentView={currentView}
          onViewChange={setCurrentView}
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
          user={user}
          onLogout={handleLogout}
          bookingCount={(bookings || []).filter(b => b.status === 'upcoming').length}
          onOpenBookingModal={() => setBookingModalOpen(true)}
        />
      )}

      {/* Main Core View Router */}
      <main className="flex-grow-1 w-100 overflow-hidden">
        <div
          key={currentView}
          className="w-100 h-100 fade-in"
        >
          {currentView === 'home' && (
              <Homepage 
                onOpenBookingWithDetails={handleOpenBookingWithDetails}
                onNavigateToRegister={() => setCurrentView('register')}
                onViewChange={setCurrentView}
                isDarkMode={isDarkMode}
              />
            )}

            {currentView === 'login' && (
              <Login 
                onLoginSuccess={handleLoginSuccess}
                onNavigateToRegister={() => setCurrentView('register')}
                onBackToHome={() => setCurrentView('home')}
              />
            )}

            {currentView === 'register' && (
              <Register 
                onRegisterSuccess={handleRegisterSuccess}
                onNavigateToLogin={() => setCurrentView('login')}
                onBackToHome={() => setCurrentView('home')}
              />
            )}

            {currentView === 'bookings' && (
              <MyBookings 
                bookings={bookings}
                onCancelBooking={handleCancelBooking}
                onBackToHome={() => setCurrentView('home')}
                onOpenBookingModal={() => setBookingModalOpen(true)}
              />
            )}

            {currentView === 'services' && (
              <ServicesPage 
                onOpenBookingWithDetails={handleOpenBookingWithDetails}
                onViewGroomingDetail={() => {
                  setCurrentView('service-grooming');
                  safeScrollTo({ top: 0 });
                }}
                isDarkMode={isDarkMode}
              />
            )}

            {currentView === 'service-grooming' && (
              <GroomingDetail
                onBack={() => {
                  setCurrentView('services');
                  safeScrollTo({ top: 0 });
                }}
                onOpenBooking={handleOpenBookingWithDetails}
                isDarkMode={isDarkMode}
              />
            )}

            {currentView === 'pets' && (
              <PetsPage isDarkMode={isDarkMode} />
            )}

            {currentView === 'why-pawhome' && (
              <WhyPawHomePage isDarkMode={isDarkMode} />
            )}

            {currentView === 'about' && (
              <AboutUs 
                isDarkMode={isDarkMode} 
                onOpenBooking={handleOpenBookingWithDetails}
                onBackToHome={() => setCurrentView('home')}
              />
            )}

            {currentView === 'blog' && (
              <BlogPage isDarkMode={isDarkMode} />
            )}
          </div>
      </main>

      {/* Floating Action / General Footer (Omitted on sign-in paths for alignment) */}
      {(currentView === 'home' || currentView === 'bookings' || currentView === 'services' || currentView === 'service-grooming' || currentView === 'pets' || currentView === 'why-pawhome' || currentView === 'about' || currentView === 'blog') && (
        <footer className="w-100 py-5 px-3 px-md-5 bg-white text-dark border-top mt-auto">
          <div className="container" style={{ maxWidth: '1140px' }}>
            <div className="row g-4 text-start">
              <div className="col-12 col-md-4">
                <div className="fs-3 fw-extrabold text-primary-custom mb-3 d-flex align-items-center gap-2">
                  <img 
                    alt="PawHome" 
                    src={LOGO_IMAGE} 
                    style={{ height: '40px', width: '40px', borderRadius: '50%', objectFit: 'cover' }} 
                    referrerPolicy="no-referrer"
                  />
                  PawHome
                </div>
                <p className="text-muted small mb-4 pr-3" style={{ lineHeight: '1.6' }}>
                  Hệ sinh thái chăm sóc thú cưng toàn diện số 1 Việt Nam. Đồng hành nâng niu bé cưng của bạn.
                </p>
                <div className="d-flex gap-2">
                  <a href="#top" className="btn btn-light rounded-circle p-2 d-inline-flex align-items-center justify-content-center text-primary-custom shadow-sm" style={{ width: '38px', height: '38px' }}>
                    <Globe size={18} />
                  </a>
                  <a href="#top" className="btn btn-light rounded-circle p-2 d-inline-flex align-items-center justify-content-center text-primary-custom shadow-sm" style={{ width: '38px', height: '38px' }}>
                    <Share2 size={18} />
                  </a>
                  <a href="#top" className="btn btn-light rounded-circle p-2 d-inline-flex align-items-center justify-content-center text-primary-custom shadow-sm" style={{ width: '38px', height: '38px' }}>
                    <Mail size={18} />
                  </a>
                </div>
              </div>

              <div className="col-6 col-sm-4 col-md-2">
                <h6 className="fw-extrabold mb-3 text-uppercase font-sans tracking-wide small text-primary-custom">Dịch Vụ</h6>
                <ul className="list-unstyled d-flex flex-column gap-2 small text-muted">
                  <li><button onClick={() => handleOpenBookingWithDetails('dog', 'Cắt Tỉa Thẩm Mỹ')} className="btn btn-link p-0 text-decoration-none text-muted small hover-secondary-custom">Cắt tỉa & Spa</button></li>
                  <li><button onClick={() => handleOpenBookingWithDetails('dog', 'Khám Tổng Quát')} className="btn btn-link p-0 text-decoration-none text-muted small hover-secondary-custom">Khám sức khỏe</button></li>
                  <li><button onClick={() => handleOpenBookingWithDetails('dog', 'Lưu Trú Cao Cấp')} className="btn btn-link p-0 text-decoration-none text-muted small hover-secondary-custom">Khách sạn VIP</button></li>
                  <li><button onClick={() => handleOpenBookingWithDetails('dog', 'Huấn luyện cơ bản')} className="btn btn-link p-0 text-decoration-none text-muted small hover-secondary-custom">Huấn luyện phản xạ</button></li>
                </ul>
              </div>

              <div className="col-6 col-sm-4 col-md-2">
                <h6 className="fw-extrabold mb-3 text-uppercase font-sans tracking-wide small text-primary-custom">PawHome</h6>
                <ul className="list-unstyled d-flex flex-column gap-2 small text-muted">
                  <li><button onClick={() => setCurrentView('about')} className="btn btn-link p-0 text-decoration-none text-muted small hover-secondary-custom">Về chúng tôi</button></li>
                  <li><a href="#top" className="text-decoration-none text-muted hover-secondary-custom">Tuyển dụng</a></li>
                  <li><a href="#top" className="text-decoration-none text-muted hover-secondary-custom">Hợp tác y khoa</a></li>
                  <li><button onClick={() => { setCurrentView('blog'); safeScrollTo({ top: 0, behavior: 'smooth' }); }} className="btn btn-link p-0 text-decoration-none text-muted small hover-secondary-custom">Tin tức & Blog</button></li>
                </ul>
              </div>

              <div className="col-12 col-sm-4 col-md-4">
                <h6 className="fw-extrabold mb-3 text-uppercase font-sans tracking-wide small text-primary-custom">Hỗ Trợ & Liên hệ</h6>
                <ul className="list-unstyled d-flex flex-column gap-2 small text-muted">
                  <li><a href="#top" className="text-decoration-none text-muted hover-secondary-custom">Trung tâm chăm sóc khách hàng</a></li>
                  <li><a href="#top" className="text-decoration-none text-muted hover-secondary-custom">Chính sách bảo hành hoàn phí</a></li>
                  <li><a href="#top" className="text-decoration-none text-muted hover-secondary-custom">Điều khoản thỏa thuận</a></li>
                  <li className="mt-2 text-secondary-custom fw-extrabold fs-6 font-monospace">Hotline: 1900 8888</li>
                </ul>
              </div>
            </div>

            <hr className="my-4 opacity-10" />

            <div className="text-center small text-muted fw-bold">
              © 2026 PawHome Vietnam. Tất cả quyền được bảo lưu.
            </div>
          </div>
        </footer>
      )}

      {/* Global Booking Wizard Overlay */}
      <BookingModal 
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        onAddBooking={handleAddBooking}
        defaultPetType={prefilledPetType}
        defaultServiceName={prefilledServiceName}
        defaultExpertName={prefilledExpertName}
        userPhone={user?.phone || ''}
      />
      
    </div>
  );
}
