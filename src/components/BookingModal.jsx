import React, { useState } from 'react';
import { SERVICES, EXPERTS } from '../data';
import { AnimalLogo } from './AnimalIcons';

export default function BookingModal({
  isOpen,
  onClose,
  onAddBooking,
  defaultPetType = 'dog',
  defaultServiceName = 'Cắt Tỉa Thẩm Mỹ',
  defaultExpertName = '',
  userPhone = '',
}) {
  const [step, setStep] = useState(1);
  const [petType, setPetType] = useState(defaultPetType);
  const [petName, setPetName] = useState('');
  const [serviceName, setServiceName] = useState(defaultServiceName);
  const [chosenExpert, setChosenExpert] = useState(defaultExpertName || (EXPERTS && EXPERTS.length > 0 ? EXPERTS[0].name : ''));
  const [date, setDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // default to tomorrow
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('09:30');
  const [notes, setNotes] = useState('');
  const [phone, setPhone] = useState(userPhone || '0987654321');
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync state with props when modal opens or props change
  React.useEffect(() => {
    if (isOpen) {
      setPetType(defaultPetType);
      setServiceName(defaultServiceName);
      if (defaultExpertName) {
        setChosenExpert(defaultExpertName);
      } else if (EXPERTS && EXPERTS.length > 0) {
        setChosenExpert(EXPERTS[0].name);
      }
      setStep(1);
      setIsSuccess(false);
    }
  }, [isOpen, defaultPetType, defaultServiceName, defaultExpertName]);

  if (!isOpen) return null;

  const currentService = SERVICES.find(s => s.name === serviceName) || SERVICES[0];

  const timeSlots = [
    '08:00', '09:30', '11:00', '13:30', '15:00', '16:30', '18:00'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new booking object
    const newBooking = {
      id: "b_" + Date.now().toString(),
      petType: petType === 'dog' ? 'Chó' : petType === 'cat' ? 'Mèo' : petType === 'rabbit' ? 'Thỏ' : 'Thú cưng khác',
      petName: petName || 'Bé cưng',
      serviceName,
      expertName: chosenExpert,
      date,
      timeSlot,
      price: (currentService.basePrice / 1000).toString() + "k",
      status: 'upcoming',
      notes,
      contactPhone: phone,
      companionName: chosenExpert,
    };

    onAddBooking(newBooking);
    setIsSuccess(true);
  };

  const handleResetAndClose = () => {
    setStep(1);
    setPetType('dog');
    setPetName('');
    setServiceName('Cắt Tỉa Thẩm Mỹ');
    if (EXPERTS && EXPERTS.length > 0) {
      setChosenExpert(EXPERTS[0].name);
    }
    setNotes('');
    setIsSuccess(false);
    onClose();
  };

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3 overflow-auto" 
      style={{ zIndex: 1050, backgroundColor: 'rgba(13, 28, 47, 0.65)', backdropFilter: 'blur(4px)' }}
    >
      {/* Backdrop area click handler */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100"
        onClick={handleResetAndClose}
        style={{ zIndex: 1 }}
      />

      {/* Modal dialog core component */}
      <div 
        className="card rounded-32 shadow-lg border-0 w-100 position-relative bg-white"
        style={{ zIndex: 2, maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto' }}
      >
        
        {/* Success Screen */}
        {isSuccess ? (
          <div className="card-body p-4 p-md-5 text-center d-flex flex-column align-items-center justify-content-center">
            <div 
              className="rounded-circle bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center mb-4" 
              style={{ width: '80px', height: '80px' }}
            >
              <span className="material-symbols-outlined fs-1 fw-bold">check_circle</span>
            </div>
            
            <h3 className="fs-3 fw-extrabold text-primary-custom mb-3">
              Đặt Lịch Thành Công!
            </h3>
            
            <p className="text-muted small max-w-md mx-auto mb-4" style={{ lineHeight: '1.6' }}>
              Tuyệt vời! Lịch hẹn chăm sóc cho bé <strong className="text-secondary-custom">{petName || 'Bé cưng'}</strong> đã được ghi nhận. 
              Chúng tôi sẽ liên hệ trong ít phút để kiểm tra xác nhận qua số điện thoại <strong>{phone}</strong>.
            </p>

            <div className="p-4 bg-light rounded-24 text-start border border-light-subtle mb-4 w-100">
              <div className="row g-3 small">
                <div className="col-5 text-muted">Dịch vụ:</div>
                <div className="col-7 fw-bold text-primary-custom">{serviceName}</div>

                <div className="col-5 text-muted">Chuyên gia:</div>
                <div className="col-7 fw-bold text-dark">{chosenExpert}</div>

                <div className="col-5 text-muted">Thời gian:</div>
                <div className="col-7 fw-bold text-secondary-custom">{timeSlot} - {date}</div>

                <div className="col-5 text-muted">Thú cưng:</div>
                <div className="col-7 fw-bold text-dark">
                  {petName || 'Bé cưng'} ({petType === 'dog' ? 'Chó' : petType === 'cat' ? 'Mèo' : petType === 'rabbit' ? 'Thỏ' : 'Khác'})
                </div>

                <div className="col-5 text-muted">Chi phí dự kiến:</div>
                <div className="col-7 fw-extrabold text-success fs-6">{(currentService.basePrice).toLocaleString('vi-VN')} VNĐ</div>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="btn btn-primary-custom rounded-pill px-5 fw-bold"
              style={{ fontSize: '13px' }}
            >
              Trở về Trang Chủ
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="card-header bg-light bg-opacity-50 border-0 p-4 d-flex align-items-center justify-content-between">
              <div>
                <h3 className="fs-5 fw-extrabold text-primary-custom mb-1 col-11">
                  Đặt Lịch Chăm Sóc Thú Cưng
                </h3>
                <p className="text-muted small mb-0 font-monospace" style={{ fontSize: '11px' }}>Bước {step} trên 4: Hãy điền đầy đủ các thông tin</p>
              </div>
              <button 
                onClick={handleResetAndClose}
                className="btn btn-link link-secondary p-2 d-flex align-items-center justify-content-center text-decoration-none shadow-none"
              >
                <span className="material-symbols-outlined fs-4">close</span>
              </button>
            </div>

            {/* Stepper Progress */}
            <div className="bg-light-subtle" style={{ height: '4px', width: '100%' }}>
              <div 
                className="bg-secondary-custom h-100 transition-all" 
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit} className="card-body p-4 d-flex flex-column gap-4" style={{ overflowY: 'auto' }}>
              
              {/* STEP 1: PET INFO */}
              {step === 1 && (
                <div className="d-flex flex-column gap-4 fade-in">
                  <div>
                    <label className="form-label fw-bold text-primary-custom mb-3" style={{ fontSize: '14px' }}>
                      1. Chọn loài thú cưng của bạn
                    </label>
                    <div className="row g-2">
                      {[
                        { id: 'dog', name: 'Chó' },
                        { id: 'cat', name: 'Mèo' },
                        { id: 'rabbit', name: 'Thỏ' },
                        { id: 'other', name: 'Khác' },
                      ].map((type) => (
                        <div key={type.id} className="col-3">
                          <button
                            type="button"
                            onClick={() => setPetType(type.id)}
                            className="btn w-100 p-3 rounded-24 d-flex flex-column align-items-center gap-2 border-2 transition-all fw-bold text-decoration-none shadow-none"
                            style={{
                              borderColor: petType === type.id ? 'var(--secondary-color)' : 'var(--border-btn-unselected)',
                              backgroundColor: petType === type.id ? 'rgba(253, 118, 26, 0.05)' : 'var(--bg-btn-unselected)',
                              color: petType === type.id ? 'var(--secondary-color)' : 'var(--text-btn-unselected)'
                            }}
                          >
                            <span className="mb-2 d-flex align-items-center justify-content-center">
                              <AnimalLogo type={type.id} size={36} />
                            </span>
                            <span style={{ fontSize: '11px' }}>{type.name}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="petNameInput" className="form-label fw-bold text-dark small">
                      2. Tên thú cưng của bạn
                    </label>
                    <input
                      id="petNameInput"
                      type="text"
                      className="form-control rounded-3 py-2 px-3 border-lightbg-light bg-opacity-50"
                      placeholder="Ví dụ: Lucky, Bơ, Miu Miu..."
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                      required
                      style={{ fontSize: '13px' }}
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: CHOOSE SERVICE */}
              {step === 2 && (
                <div className="d-flex flex-column gap-3 fade-in">
                  <label className="form-label fw-bold text-primary-custom mb-1" style={{ fontSize: '14px' }}>
                    Chọn loại dịch vụ mong muốn cho bé
                  </label>
                  <div className="d-flex flex-column gap-3">
                    {SERVICES.map((serv) => (
                      <button
                        key={serv.id}
                        type="button"
                        onClick={() => setServiceName(serv.name)}
                        className="btn text-start p-3 rounded-24 d-flex align-items-start gap-3 border-2 transition-all text-decoration-none shadow-none"
                        style={{
                          borderColor: serviceName === serv.name ? 'var(--secondary-color)' : 'var(--border-btn-unselected)',
                          backgroundColor: serviceName === serv.name ? 'rgba(253, 118, 26, 0.04)' : 'var(--bg-btn-unselected)'
                        }}
                      >
                        <img 
                          alt={serv.name} 
                          className="rounded-3" 
                          src={serv.image}
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <span className="fw-extrabold text-primary-custom" style={{ fontSize: '14px' }}>{serv.name}</span>
                            <span className="fw-bold text-secondary-custom small">{(serv.basePrice).toLocaleString('vi-VN')} đ</span>
                          </div>
                          <p className="text-muted small mb-0" style={{ fontSize: '12px', lineHeight: '1.4' }}>
                            {serv.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: CHOOSE EXPERT */}
              {step === 3 && (
                <div className="d-flex flex-column gap-3 fade-in">
                  <label className="form-label fw-bold text-primary-custom mb-1" style={{ fontSize: '14px' }}>
                    Chọn Chuyên Gia đồng hành cùng bé
                  </label>
                  <div className="row g-2">
                    {EXPERTS.map((expert) => (
                      <div key={expert.id} className="col-12 col-md-6">
                        <button
                          type="button"
                          onClick={() => setChosenExpert(expert.name)}
                          className="btn text-start w-100 p-3 rounded-24 d-flex align-items-center gap-3 border-2 transition-all text-decoration-none shadow-none h-100"
                          style={{
                            borderColor: chosenExpert === expert.name ? 'var(--secondary-color)' : 'var(--border-btn-unselected)',
                            backgroundColor: chosenExpert === expert.name ? 'rgba(253, 118, 26, 0.04)' : 'var(--bg-btn-unselected)'
                          }}
                        >
                          <img 
                            alt={expert.name} 
                            className="rounded-circle border" 
                            src={expert.image}
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            referrerPolicy="no-referrer" 
                          />
                          <div className="flex-grow-1">
                            <h4 className="fw-extrabold text-primary-custom mb-0" style={{ fontSize: '13px' }}>{expert.name}</h4>
                            <p className="text-muted mb-1" style={{ fontSize: '11px' }}>{expert.title}</p>
                            <div className="d-flex align-items-center gap-1" style={{ fontSize: '11px' }}>
                              <span className="material-symbols-outlined text-warning fs-6">star</span>
                              <span className="fw-bold text-dark">{expert.rating}</span>
                              <span className="text-muted">({expert.reviewsCount} reviews)</span>
                            </div>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: TIME & CONTACT */}
              {step === 4 && (
                <div className="d-flex flex-column gap-3 fade-in">
                  <div>
                    <label className="form-label fw-bold text-primary-custom mb-2">
                      Chọn Ngày & Giờ Hẹn
                    </label>
                    <div className="row g-2">
                      <div className="col-12 col-md-5">
                        <input
                          type="date"
                          className="form-control rounded-3 py-2 px-3 border-lightbg-light bg-opacity-50"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          style={{ fontSize: '13px', height: '38px' }}
                        />
                      </div>
                      <div className="col-12 col-md-7">
                        <div className="d-flex flex-wrap gap-1">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setTimeSlot(slot)}
                              className="btn btn-sm rounded-lg"
                              style={{
                                fontSize: '11px',
                                fontWeight: 600,
                                border: '1px solid var(--border-btn-unselected)',
                                backgroundColor: timeSlot === slot ? 'var(--secondary-color)' : 'var(--bg-btn-unselected)',
                                color: timeSlot === slot ? '#ffffff' : 'var(--text-btn-unselected)'
                              }}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row g-2">
                    <div className="col-12 col-sm-6">
                      <label htmlFor="modalPhoneInput" className="form-label fw-bold text-dark small">
                        Số điện thoại liên hệ
                      </label>
                      <input
                        id="modalPhoneInput"
                        type="tel"
                        className="form-control rounded-3 py-2 px-3 border-lightbg-light bg-opacity-50"
                        placeholder="Số di dộng của bạn..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        style={{ fontSize: '13px' }}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label htmlFor="modalNotesInput" className="form-label fw-bold text-dark small">
                        Ghi chú (sức khỏe/tính cách bé)
                      </label>
                      <input
                        id="modalNotesInput"
                        type="text"
                        className="form-control rounded-3 py-2 px-3 border-lightbg-light bg-opacity-50"
                        placeholder="Bé sợ nước, năng động..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        style={{ fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-light rounded-24 border border-light-subtle mt-2">
                    <h5 className="fw-extrabold text-primary-custom mb-1" style={{ fontSize: '13px' }}>Tóm tắt dịch vụ đặt lịch</h5>
                    <div className="d-flex justify-content-between small">
                      <span className="text-muted">{serviceName} ({petName || 'Bé cưng'})</span>
                      <strong className="text-secondary-custom">{(currentService.basePrice).toLocaleString('vi-VN')} VNĐ</strong>
                    </div>
                  </div>
                </div>
              )}

            </form>

            {/* Footer */}
            <div className="card-footer bg-light bg-opacity-50 border-0 p-4 d-flex align-items-center justify-content-between">
              <button
                type="button"
                className="btn btn-sm btn-link text-muted fw-bold text-decoration-none shadow-none"
                style={{ visibility: step === 1 ? 'hidden' : 'visible' }}
                onClick={() => setStep(step - 1)}
              >
                Quay Lại
              </button>

              <div className="d-flex gap-2">
                {step < 4 ? (
                  <button
                    type="button"
                    disabled={step === 1 && !petName}
                    className="btn btn-primary-custom rounded-pill fw-bold btn-sm fs-7"
                    style={{ opacity: (step === 1 && !petName) ? 0.5 : 1 }}
                    onClick={() => setStep(step + 1)}
                  >
                    Tiếp Tục
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="btn btn-secondary-custom rounded-pill fw-bold btn-sm fs-7 shadow-sm"
                  >
                    Xác Nhận Đặt Lịch
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
