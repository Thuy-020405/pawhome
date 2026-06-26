import React from 'react';

export default function MyBookings({
  bookings,
  onCancelBooking,
  onBackToHome,
  onOpenBookingModal,
}) {
  
  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const pastBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

  return (
    <div className="min-vh-screen py-5 px-3 px-md-5 transition-all" style={{ marginTop: '54px' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        
        {/* Navigation Breadcrumb */}
        <div className="d-flex align-items-center gap-2 mb-4">
          <button 
            onClick={onBackToHome}
            className="btn btn-link p-0 text-decoration-none small text-muted hover:text-primary d-flex align-items-center gap-1 shadow-none"
            style={{ fontSize: '13px', fontWeight: 600 }}
          >
            <span className="material-symbols-outlined fs-6">arrow_back</span>
            Trở lại trang chủ
          </button>
          <span className="text-muted small">/</span>
          <span className="text-muted small fw-semibold">Lịch trình của tôi</span>
        </div>

        {/* Heading */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-5">
          <div>
            <h2 className="fs-2 fw-extrabold text-primary-custom mb-1">
              Quản Lý Lịch Hẹn Chăm Sóc
            </h2>
            <p className="text-muted small mb-0">
              Xem chi tiết tình trạng, thời gian và dịch vụ đồng hành cùng thú cưng của bạn.
            </p>
          </div>
          <button
            onClick={onOpenBookingModal}
            className="btn btn-secondary-custom rounded-pill fw-bold shadow-sm d-flex align-items-center gap-2"
            style={{ fontSize: '13px' }}
          >
            <span className="material-symbols-outlined fs-6">add_circle</span>
            Đặt Lịch Mới
          </button>
        </div>

        {/* UPCOMING EVENTS */}
        <div className="mb-5">
          <h3 className="fs-5 fw-bold text-dark mb-3 d-flex align-items-center gap-2">
            <span className="rounded-circle bg-primary animate-pulse" style={{ width: '10px', height: '10px', display: 'inline-block' }}></span>
            Lịch hẹn sắp diễn ra ({upcomingBookings.length})
          </h3>

          {upcomingBookings.length === 0 ? (
            <div className="card text-center p-5 rounded-24 border-light shadow-sm">
              <div className="card-body">
                <span className="material-symbols-outlined text-muted fs-1 mb-3">calendar_today</span>
                <p className="text-muted mb-4 small mx-auto" style={{ maxWidth: '380px' }}>
                  Bạn chưa có lịch hẹn nào sắp diễn ra. Hãy lên lịch trình chăm sóc để bé cưng được bảo bọc tốt nhất!
                </p>
                <button
                  onClick={onOpenBookingModal}
                  className="btn btn-outline-primary rounded-pill fw-bold px-4 py-2"
                  style={{ fontSize: '12px' }}
                >
                  Đặt dịch vụ ngay
                </button>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {upcomingBookings.map((b) => (
                <div key={b.id} className="col-12 col-md-6">
                  <div className="card h-100 rounded-24 border-light shadow-sm overflow-hidden position-relative" style={{ borderLeft: '6px solid var(--primary-color) !important' }}>
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <span className="badge rounded-pill text-primary bg-primary bg-opacity-10 py-1.5 px-3 fw-bold uppercase tracking-wider" style={{ fontSize: '10px' }}>
                            Đang Chờ Xác Nhận
                          </span>
                          <h4 className="card-title fw-extrabold text-primary-custom mt-2 mb-0" style={{ fontSize: '17px' }}>
                            {b.serviceName}
                          </h4>
                        </div>
                        <span className="fw-extrabold text-secondary-custom fs-5">{b.price}</span>
                      </div>

                      <div className="small text-muted d-flex flex-column gap-2 mb-4">
                        <div className="d-flex align-items-center gap-2">
                          <span className="material-symbols-outlined fs-6 text-muted">pets</span>
                          <span>Thú cưng: <strong className="text-dark fw-bold">{b.petName}</strong> ({b.petType})</span>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                          <span className="material-symbols-outlined fs-6 text-muted">schedule</span>
                          <span>Khung giờ: <strong className="text-secondary-custom fw-bold">{b.timeSlot}</strong> ngày <strong className="text-dark fw-bold">{b.date}</strong></span>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                          <span className="material-symbols-outlined fs-6 text-muted">support_agent</span>
                          <span>Người chăm sóc: <strong className="text-dark fw-bold">{b.companionName}</strong></span>
                        </div>

                        {b.notes && (
                          <div className="p-3 bg-light rounded-3 italic border border-light-subtle text-muted mt-2 small" style={{ fontSize: '12px' }}>
                            "{b.notes}"
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="card-footer bg-light border-0 d-flex justify-content-between align-items-center px-4 py-3">
                      <span className="small text-muted" style={{ fontSize: '11px' }}>SĐT: {b.contactPhone}</span>
                      <button
                        onClick={() => onCancelBooking(b.id)}
                        className="btn btn-sm btn-outline-danger px-3 py-1.5 rounded-3 fw-bold small"
                        style={{ fontSize: '12px' }}
                      >
                        Hủy Lịch Hẹn
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PAST EVENTS */}
        <div>
          <h3 className="fs-5 fw-bold text-muted mb-3 d-flex align-items-center gap-2">
            Đã hoàn thành hoặc đã hủy ({pastBookings.length})
          </h3>

          <div className="d-flex flex-column gap-3">
            {pastBookings.map((b) => (
              <div 
                key={b.id}
                className="card rounded-24 border-light shadow-sm hover-shadow transition-all bg-white bg-opacity-70"
              >
                <div className="card-body p-3 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
                  <div className="d-flex align-items-center gap-3">
                    <div className="rounded-3 d-flex align-items-center justify-content-center bg-light text-muted" style={{ width: '40px', height: '40px' }}>
                      <span className="material-symbols-outlined fs-5">
                        {b.status === 'completed' ? 'check_circle' : 'cancel'}
                      </span>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1" style={{ fontSize: '15px' }}>
                        {b.serviceName}
                      </h5>
                      <p className="text-muted mb-0 small" style={{ fontSize: '12px' }}>
                        Bé: {b.petName} | Ngày: {b.date} | Người làm: {b.companionName}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3 w-100 w-sm-auto justify-content-between justify-content-sm-start mt-2 mt-sm-0">
                    <span className="fw-bold text-muted" style={{ fontSize: '14px' }}>{b.price}</span>
                    <span className={`badge rounded-pill py-1.5 px-3 uppercase tracking-wider ${
                      b.status === 'completed' 
                        ? 'bg-success bg-opacity-10 text-success' 
                        : 'bg-danger bg-opacity-10 text-danger'
                    }`} style={{ fontSize: '10px' }}>
                      {b.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
