import React, { useState, useEffect } from 'react';
import { PlusCircle, Info, Calendar, Scissors, X, Upload, Check, Trash2 } from 'lucide-react';
import { safeStorage } from '../lib/storage';

const defaultPets = [
  {
    id: 1,
    name: "Mochi",
    breed: "Corgi",
    type: "Chó",
    age: "2 tuổi",
    weight: "12.5",
    status: "good", // 'good' or 'warning'
    vaccineDate: "15/10/2024",
    vaccineAlert: "",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtZxe8AtlBddSx-ZF1bX0BgpiCeDbsyCjclx1QeSTs641zreyRClqCOXIEx0lrSRzGFQ0H3Br3RVg4QCXe12okIaIjmV16296us0Fb6iOruBQVX3gvaf3QYyfjRzhSGmwckUB6W9OUKyAfHYlSLaTAOiT7zGikilZTekCYgaGxxi20p4PixMlKD8WZ8EohIqIXJdcgOnhCvnKGvPPBUDF-MblJwA0JcNbXi2HaC9wHjJxMMsZxDDRWHw"
  },
  {
    id: 2,
    name: "LuLu",
    breed: "Mèo Anh lông ngắn",
    type: "Mèo",
    age: "3 tuổi",
    weight: "4.2",
    status: "warning", // 'good' or 'warning'
    vaccineDate: "",
    vaccineAlert: "Đã quá hạn tiêm chủng 3 ngày",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcu_PAUGZ4PXKI7rDjj9TTCMbE0r4ihCfGdCDAuReubUMiDa6rWBLF6MXVjJvnxF1QpEpRDJV5tI_hnVWCHwMbr9e7Vzr_9u050h7mmcMxKgbX8xbwuPoK2gJlsQn4m9_fjcUROM-PavfSHABDCQaqG_iavvwQBJ0TF48fonTXzheaDjJ8x5PnchVoV3fCAVuTKkZUZTBL-XneZWF3tsDqTPjgjeXtFH70Pao_xFXhHL4lwTHKoYMG-w"
  }
];

export default function PetsPage({ isDarkMode, user }) {
  const [pets, setPets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  // New pet form state
  const [newPet, setNewPet] = useState({
    name: "",
    type: "Chó",
    breed: "",
    age: "",
    weight: "",
    status: "good",
    vaccineDate: "",
    vaccineAlert: "",
    image: ""
  });

  const [imagePreview, setImagePreview] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const fetchPets = async () => {
    try {
      const headers = {};
      if (user && user.token) {
        headers['Authorization'] = `Bearer ${user.token}`;
      }
      const response = await fetch('/api/pets', { headers });
      if (response.ok) {
        const data = await response.json();
        setPets(data);
      }
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [user]);

  // Collect all reminders dynamically from the pets list
  const allReminders = pets.flatMap(pet => 
    (pet.reminders || []).map(r => ({
      ...r,
      petName: pet.name,
      petImage: pet.image
    }))
  );

  // Trigger file selection and read image as Base64 string for direct preview & persistence
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewPet(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePet = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!newPet.name.trim()) {
      setFormErrors({ name: "Vui lòng nhập tên thú cưng của bạn." });
      return;
    }

    // Set fallback image based on type if empty
    let finalImage = newPet.image;
    if (!finalImage) {
      if (newPet.type === 'Chó') {
        finalImage = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60";
      } else if (newPet.type === 'Mèo') {
        finalImage = "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop&q=60";
      } else if (newPet.type === 'Thỏ') {
        finalImage = "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=500&auto=format&fit=crop&q=60";
      } else {
        finalImage = "https://images.unsplash.com/photo-1535268647977-a403b69fc756?w=500&auto=format&fit=crop&q=60";
      }
    }

    const petToAdd = {
      name: newPet.name.trim(),
      breed: newPet.breed.trim() || "Không xác định",
      type: newPet.type,
      age: newPet.age.trim() ? (newPet.age.includes("tuổi") || newPet.age.includes("tháng") ? newPet.age : `${newPet.age} tuổi`) : "Chưa cập nhật tuổi",
      weight: newPet.weight || "0",
      status: newPet.status,
      vaccineDate: newPet.status === 'good' ? (newPet.vaccineDate.trim() || "") : "",
      vaccineAlert: newPet.status === 'warning' ? (newPet.vaccineAlert.trim() || "") : "",
      image: finalImage
    };

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (user && user.token) {
        headers['Authorization'] = `Bearer ${user.token}`;
      }
      
      const response = await fetch('/api/pets', {
        method: 'POST',
        headers,
        body: JSON.stringify(petToAdd)
      });

      if (response.ok) {
        await fetchPets(); // Refresh pet list from database
        
        // Reset and close
        setNewPet({
          name: "",
          type: "Chó",
          breed: "",
          age: "",
          weight: "",
          status: "good",
          vaccineDate: "",
          vaccineAlert: "",
          image: ""
        });
        setImagePreview("");
        setFormErrors({});
        setShowModal(false);

        // Show beautiful toast notification
        setToastMessage(`Đã thêm thành công bé ${petToAdd.name}! 🐾`);
        setTimeout(() => setToastMessage(""), 4000);
      } else {
        const errData = await response.json();
        alert(errData.error || "Không thể thêm thú cưng. Vui lòng thử lại.");
      }
    } catch (err) {
      console.error('Error saving pet:', err);
    }
  };

  const handleDeletePet = async (id, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa bé ${name} khỏi danh sách thú cưng?`)) {
      try {
        const headers = {};
        if (user && user.token) {
          headers['Authorization'] = `Bearer ${user.token}`;
        }

        const response = await fetch(`/api/pets/${id}`, {
          method: 'DELETE',
          headers
        });

        if (response.ok) {
          await fetchPets(); // Refresh from DB

          setToastMessage(`Đã xóa bé ${name} thành công.`);
          setTimeout(() => setToastMessage(""), 4000);
        } else {
          const errData = await response.json();
          alert(errData.error || "Không thể xóa thú cưng.");
        }
      } catch (err) {
        console.error('Error deleting pet:', err);
      }
    }
  };

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

          /* Modal Styling */
          .custom-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(15, 23, 42, 0.65);
            backdrop-filter: blur(5px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1060;
            padding: 20px;
            animation: modalFadeIn 0.25s ease-out;
          }
          .custom-modal-container {
            width: 100%;
            max-width: 550px;
            max-height: 90vh;
            overflow-y: auto;
            border-radius: 24px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            animation: modalSlideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes modalSlideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes toastPopUp {
            from { transform: translateY(20px) scale(0.9); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
          }
          .toast-animation {
            animation: toastPopUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
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
          <button 
            onClick={() => setShowModal(true)}
            className="btn btn-gradient-secondary rounded-3 px-4 py-3 fw-bold d-inline-flex align-items-center gap-2 shadow-sm transition-all" 
            style={{ width: 'fit-content' }}
          >
            <PlusCircle size={20} />
            Thêm thú cưng mới
          </button>
        </div>

        <div className="row g-4">
          {/* Left Side: Pet Grid */}
          <div className="col-12 col-lg-8">
            <div className="row g-4">
              
              {pets.length === 0 ? (
                <div className="col-12 text-center py-5">
                  <div className={`rounded-4 p-5 border border-dashed text-center ${isDarkMode ? 'bg-slate-800 border-white/20' : 'bg-white border-secondary-custom border-opacity-30'}`}>
                    <span className="material-symbols-outlined text-muted fs-1 mb-3">pets</span>
                    <h4 className="fw-bold text-primary-custom mb-2">Chưa có thú cưng nào</h4>
                    <p className="text-muted mb-4 max-w-md mx-auto">Hãy thêm thông tin thú cưng đầu tiên của bạn để theo dõi sức khỏe và lịch chăm sóc bé một cách thông minh nhất!</p>
                    <button 
                      onClick={() => setShowModal(true)}
                      className="btn btn-gradient-secondary rounded-3 px-4 py-2 fw-bold d-inline-flex align-items-center gap-2"
                    >
                      <PlusCircle size={18} />
                      Thêm ngay
                    </button>
                  </div>
                </div>
              ) : (
                pets.map((pet) => (
                  <div key={pet.id} className="col-12 col-md-6 d-flex flex-column">
                    <div className={`rounded-4 overflow-hidden border pet-card-hover d-flex flex-column h-100 position-relative shadow-sm ${isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-white border-light'}`}>
                      <div className="position-relative w-100" style={{ height: '220px' }}>
                        <img 
                          alt={pet.name} 
                          src={pet.image}
                          className="w-100 h-100 object-fit-cover"
                        />
                        
                        {/* Dynamic Health Status and Action overlays */}
                        <div className="position-absolute top-0 start-0 end-0 p-3 d-flex justify-content-between align-items-center">
                          <div className={`px-3 py-1 rounded-pill d-flex align-items-center gap-2 shadow-sm ${pet.status === 'good' ? 'bg-white text-dark' : 'bg-danger bg-opacity-90 text-white'}`}>
                            {pet.status === 'good' ? (
                              <>
                                <span className="bg-success rounded-circle d-inline-block animate-pulse" style={{ width: '8px', height: '8px' }}></span>
                                <span className="fw-bold" style={{ fontSize: '13px' }}>Sức khỏe tốt</span>
                              </>
                            ) : (
                              <>
                                <Info size={14} />
                                <span className="fw-bold" style={{ fontSize: '13px' }}>Đến lịch tiêm</span>
                              </>
                            )}
                          </div>

                          <button 
                            onClick={() => handleDeletePet(pet.id, pet.name)}
                            className="btn btn-light btn-sm rounded-circle p-2 d-inline-flex align-items-center justify-content-center shadow-sm border-0 hover:bg-danger hover:text-white transition-all text-danger"
                            title="Xóa thú cưng"
                            style={{ width: '34px', height: '34px', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4 flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div>
                            <h3 className="fw-bold text-primary-custom mb-1 fs-3">{pet.name}</h3>
                            <p className="text-muted m-0 fs-6">{pet.breed} • {pet.age}</p>
                          </div>
                          <div className="bg-primary-custom bg-opacity-10 p-2 rounded-3 text-primary-custom d-flex align-items-center">
                             <span className="material-symbols-outlined">pets</span>
                          </div>
                        </div>
                        
                        <div className="d-flex flex-column gap-2 mt-3">
                          {pet.status === 'good' ? (
                            <div className="d-flex align-items-center gap-2 text-muted">
                              <Calendar size={18} className="text-secondary-custom" />
                              <span className="fw-semibold fs-7">Tiêm chủng tiếp theo: {pet.vaccineDate || 'Chưa có lịch'}</span>
                            </div>
                          ) : (
                            <div className="d-flex align-items-center gap-2 text-danger fw-bold">
                              <Info size={18} />
                              <span className="fs-7">{pet.vaccineAlert || 'Có lịch hẹn cần chú ý'}</span>
                            </div>
                          )}
                          <div className="d-flex align-items-center gap-2 text-muted">
                            <span className="material-symbols-outlined text-secondary-custom" style={{ fontSize: '18px' }}>weight</span>
                            <span className="fw-semibold fs-7">Cân nặng: {pet.weight} kg</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 pt-0 d-flex gap-3">
                        <button className={`btn flex-grow-1 fw-bold py-2 rounded-3 border ${isDarkMode ? 'border-white/20 text-white hover:bg-slate-700' : 'border-primary-custom text-primary-custom hover:bg-light'}`}>Xem hồ sơ</button>
                        <button className={`btn flex-grow-1 fw-bold py-2 rounded-3 ${pet.status === 'good' ? 'btn-primary-custom' : 'btn-gradient-secondary'}`}>
                          {pet.status === 'good' ? 'Đặt chăm sóc' : 'Tiêm chủng ngay'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}

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
                {allReminders.length === 0 ? (
                  <p className="text-white text-opacity-75 small m-0">Chưa có lịch nhắc nhở sức khỏe nào cho các bé cưng.</p>
                ) : (
                  allReminders.map((rem) => (
                    <div key={rem.id} className="d-flex gap-3 p-3 rounded-3" style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)' }}>
                      <div className="p-2 rounded-2 d-flex align-items-center justify-content-center h-100" style={{ backgroundColor: 'rgba(255,255,255,0.2)', minWidth: '36px' }}>
                        {rem.type === 'vaccination' ? (
                          <span className="material-symbols-outlined text-white">vaccines</span>
                        ) : (
                          <Scissors size={20} className="text-white" />
                        )}
                      </div>
                      <div>
                        <p className="fw-bold mb-1 m-0">{rem.title}</p>
                        <p className="fs-7 m-0 opacity-75">
                          {rem.petName} • {rem.time || 'Cả ngày'}{rem.date ? `, ${new Date(rem.date).toLocaleDateString('vi-VN')}` : ''}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <button className="btn btn-link text-white text-decoration-none w-100 mt-4 border-bottom border-white border-opacity-25 rounded-0 pb-2">
                Xem toàn bộ lịch
              </button>
            </div>

            {/* Health Alerts Summary */}
            <div className={`p-4 p-lg-5 rounded-4 ${isDarkMode ? 'bg-slate-800' : 'bg-light'}`}>
              <h4 className="fw-bold text-primary-custom mb-4 fs-4">Tóm tắt sức khỏe</h4>
              
              <div className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-between align-items-center pb-3 border-bottom border-secondary-custom border-opacity-10">
                  <span className="text-muted fw-semibold">Tình trạng chung</span>
                  <span className="text-primary-custom fw-bold text-uppercase">
                    {pets.some(p => p.status === 'warning') ? 'Cần chú ý' : 'Tốt'}
                  </span>
                </div>
                
                <div className="d-flex justify-content-between align-items-center pb-3 border-bottom border-secondary-custom border-opacity-10">
                  <span className="text-muted fw-semibold">Cảnh báo</span>
                  {pets.filter(p => p.status === 'warning').length > 0 ? (
                    <span className="bg-danger bg-opacity-10 px-2 py-1 rounded-2 text-danger fw-bold fs-7">
                      {pets.filter(p => p.status === 'warning').length} Cần chú ý
                    </span>
                  ) : (
                    <span className="bg-success bg-opacity-10 px-2 py-1 rounded-2 text-success fw-bold fs-7">
                      Tất cả tốt
                    </span>
                  )}
                </div>

                <div className="d-flex justify-content-between align-items-center pt-2">
                  <span className="text-muted fw-semibold">Thành viên đăng ký</span>
                  <span className="text-secondary-custom fw-bold">{pets.length} bé cưng</span>
                </div>
              </div>

              <div className="mt-4 pt-3">
                <div className="d-flex justify-content-between fs-7 mb-2 fw-semibold">
                  <span className="text-muted">Chỉ số tiêm chủng</span>
                  <span className="text-primary-custom fw-bold">
                    {pets.length > 0 
                      ? Math.round((pets.filter(p => p.status === 'good').length / pets.length) * 100) 
                      : 0}%
                  </span>
                </div>
                <div className="progress rounded-pill bg-white" style={{ height: '8px' }}>
                  <div 
                    className="progress-bar bg-secondary-custom" 
                    style={{ 
                      width: `${pets.length > 0 ? (pets.filter(p => p.status === 'good').length / pets.length) * 100 : 0}%`,
                      transition: 'width 0.5s ease-out'
                    }}
                  />
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

      {/* ADD PET MODAL DIALOG */}
      {showModal && (
        <div className="custom-modal-overlay">
          <div className={`custom-modal-container shadow-2xl ${isDarkMode ? 'bg-slate-900 border border-white/10 text-white' : 'bg-white border text-dark'}`}>
            
            {/* Modal Header */}
            <div className={`p-4 border-bottom d-flex align-items-center justify-content-between ${isDarkMode ? 'border-white/10' : 'border-light'}`}>
              <div>
                <h3 className="fw-bold m-0 text-primary-custom fs-4">Thêm thú cưng mới</h3>
                <p className="text-muted m-0 small mt-1">Cung cấp các thông tin cơ bản về bé cưng của bạn</p>
              </div>
              <button 
                onClick={() => {
                  setShowModal(false);
                  setFormErrors({});
                }}
                className="btn btn-link text-secondary p-1 border-0 shadow-none hover:text-danger"
                style={{ textDecoration: 'none' }}
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Modal Body / Form */}
            <form onSubmit={handleSavePet} className="p-4 d-flex flex-column gap-4">
              
              {/* Pet Name input */}
              <div>
                <label className="form-label fw-bold small mb-2 d-block text-start">Tên thú cưng *</label>
                <input 
                  type="text" 
                  className={`form-control rounded-3 py-2 px-3 ${isDarkMode ? 'bg-slate-800 border-white/10 text-white' : 'bg-light border-light-subtle'}`}
                  placeholder="Ví dụ: Cacao, Bánh Bao, Lu..."
                  value={newPet.name}
                  onChange={(e) => {
                    setNewPet({ ...newPet, name: e.target.value });
                    if (formErrors.name) setFormErrors({ ...formErrors, name: "" });
                  }}
                  required
                />
                {formErrors.name && (
                  <span className="text-danger small mt-1 d-block text-start">{formErrors.name}</span>
                )}
              </div>

              {/* Pet Type Select (With Beautiful Pill Style) */}
              <div>
                <label className="form-label fw-bold small mb-2 d-block text-start">Loài thú cưng</label>
                <div className="row g-2">
                  {['Chó', 'Mèo', 'Thỏ', 'Khác'].map((type) => (
                    <div key={type} className="col-3">
                      <button
                        type="button"
                        onClick={() => setNewPet({ ...newPet, type })}
                        className={`btn w-100 py-2 rounded-3 fw-bold border-2 transition-all text-center shadow-none`}
                        style={{
                          fontSize: '13px',
                          borderColor: newPet.type === type ? '#fd761a' : 'rgba(120, 120, 120, 0.15)',
                          backgroundColor: newPet.type === type ? 'rgba(253, 118, 26, 0.1)' : 'transparent',
                          color: newPet.type === type ? '#fd761a' : (isDarkMode ? '#e2e8f0' : '#475569')
                        }}
                      >
                        {type}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Breed & Age */}
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label fw-bold small mb-2 d-block text-start">Giống loài</label>
                  <input 
                    type="text" 
                    className={`form-control rounded-3 py-2 px-3 ${isDarkMode ? 'bg-slate-800 border-white/10 text-white' : 'bg-light border-light-subtle'}`}
                    placeholder="Ví dụ: Golden, Alaska..."
                    value={newPet.breed}
                    onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label fw-bold small mb-2 d-block text-start">Tuổi</label>
                  <input 
                    type="text" 
                    className={`form-control rounded-3 py-2 px-3 ${isDarkMode ? 'bg-slate-800 border-white/10 text-white' : 'bg-light border-light-subtle'}`}
                    placeholder="Ví dụ: 1 tuổi, 6 tháng..."
                    value={newPet.age}
                    onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
                  />
                </div>
              </div>

              {/* Weight & Status */}
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label fw-bold small mb-2 d-block text-start">Cân nặng (kg)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    min="0"
                    className={`form-control rounded-3 py-2 px-3 ${isDarkMode ? 'bg-slate-800 border-white/10 text-white' : 'bg-light border-light-subtle'}`}
                    placeholder="Ví dụ: 8.5"
                    value={newPet.weight}
                    onChange={(e) => setNewPet({ ...newPet, weight: e.target.value })}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label fw-bold small mb-2 d-block text-start">Trạng thái sức khỏe</label>
                  <select 
                    className={`form-select rounded-3 py-2 px-3 ${isDarkMode ? 'bg-slate-800 border-white/10 text-white' : 'bg-light border-light-subtle'}`}
                    value={newPet.status}
                    onChange={(e) => setNewPet({ ...newPet, status: e.target.value })}
                  >
                    <option value="good">Sức khỏe tốt</option>
                    <option value="warning">Đến lịch tiêm / Cần chú ý</option>
                  </select>
                </div>
              </div>

              {/* Vaccine info dependent on status */}
              <div>
                {newPet.status === 'good' ? (
                  <>
                    <label className="form-label fw-bold small mb-2 d-block text-start">Ngày tiêm phòng tiếp theo</label>
                    <input 
                      type="text" 
                      className={`form-control rounded-3 py-2 px-3 ${isDarkMode ? 'bg-slate-800 border-white/10 text-white' : 'bg-light border-light-subtle'}`}
                      placeholder="Ví dụ: 15/10/2026"
                      value={newPet.vaccineDate}
                      onChange={(e) => setNewPet({ ...newPet, vaccineDate: e.target.value })}
                    />
                  </>
                ) : (
                  <>
                    <label className="form-label fw-bold small mb-2 d-block text-start">Nội dung cảnh báo sức khỏe</label>
                    <input 
                      type="text" 
                      className={`form-control rounded-3 py-2 px-3 ${isDarkMode ? 'bg-slate-800 border-white/10 text-white' : 'bg-light border-light-subtle'}`}
                      placeholder="Ví dụ: Đã quá hạn tiêm phòng dại 5 ngày"
                      value={newPet.vaccineAlert}
                      onChange={(e) => setNewPet({ ...newPet, vaccineAlert: e.target.value })}
                    />
                  </>
                )}
              </div>

              {/* Image upload preview */}
              <div>
                <label className="form-label fw-bold small mb-2 d-block text-start">Hình ảnh thú cưng</label>
                <div className="d-flex align-items-center gap-3">
                  <div 
                    className={`border rounded-4 overflow-hidden d-flex align-items-center justify-content-center shadow-inner`} 
                    style={{ 
                      width: '80px', 
                      height: '80px', 
                      backgroundColor: isDarkMode ? '#1e293b' : '#f1f5f9',
                      borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#cbd5e1'
                    }}
                  >
                    {imagePreview ? (
                      <img src={imagePreview} className="w-100 h-100 object-fit-cover" alt="Preview" />
                    ) : (
                      <span className="material-symbols-outlined text-muted fs-2">pets</span>
                    )}
                  </div>
                  <div className="flex-grow-1 text-start">
                    <label className="btn btn-outline-secondary btn-sm rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2 cursor-pointer shadow-none">
                      <Upload size={14} />
                      <span className="fw-bold">Tải ảnh lên</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="d-none" 
                        onChange={handleImageUpload} 
                      />
                    </label>
                    <p className="text-muted m-0 mt-1" style={{ fontSize: '11px' }}>Hỗ trợ JPG, PNG, WEBP. Hệ thống sẽ tự tạo ảnh minh họa nếu bỏ trống.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex gap-3 mt-2">
                <button 
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setFormErrors({});
                  }}
                  className={`btn w-50 py-2.5 fw-bold rounded-3 border ${isDarkMode ? 'border-white/10 text-white hover:bg-slate-800' : 'btn-light hover:bg-light-subtle'}`}
                >
                  Hủy bỏ
                </button>
                <button 
                  type="submit"
                  className="btn btn-gradient-secondary w-50 py-2.5 fw-bold rounded-3"
                >
                  Lưu thú cưng
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Floating Success Toast Message */}
      {toastMessage && (
        <div className="position-fixed bottom-0 end-0 m-4 p-3 bg-success text-white rounded-3 shadow-lg z-50 d-flex align-items-center gap-2 toast-animation" style={{ zIndex: 9999 }}>
          <Check size={18} />
          <span className="fw-bold" style={{ fontSize: '14px' }}>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
