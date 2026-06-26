import React, { useState, useEffect } from "react";
import {
  Heart,
  Search,
  Star,
  Sparkles,
  MapPin,
  ChevronRight,
  CheckCircle,
  Users,
  Scissors,
  ShieldAlert,
  Calendar,
  Check,
  Shield,
  Award,
} from "lucide-react";
import {
  SERVICES,
  EXPERTS,
  SPECIES,
  TESTIMONIALS,
  HERO_IMAGE,
  AVATARS,
} from "../data";
import { AnimalLogo } from "./AnimalIcons";

export default function Homepage({
  onOpenBookingWithDetails,
  onNavigateToRegister,
  onViewChange,
  isDarkMode,
}) {
  const EXTENDED_TESTIMONIALS_DYNAMIC = [
    {
      name: "Chị Minh Anh",
      role: "Chủ của Lucky (Poodle)",
      avatar:
        AVATARS && AVATARS[0]
          ? AVATARS[0]
          : "https://lh3.googleusercontent.com/aida-public/AB6AXuD37qytkNRc_Icwq-4pRwpV1APltKkyYHGNPSlSedPkwGul8iP7hDF80QR1yO9f0H2FqSoMlwZpAeGkaFbCfmToYF5Dji3gSWLMB8_dFcm7363moYkh8olAb5mEh8rGgYjdbNI3eeFKw0DOxE9D9kFCRCX4IvteQ9TcsaBR0X3jPExXTmrDeeb4KsFZ7ru3xSp190uz1HGlSCBbLwF8Z_cQ4KCw9mWY7c-dfg6lNmHV-xKxWmhjq1haHg",
      rating: 5,
      content:
        "Dịch vụ cắt tỉa ở đây rất chuyên nghiệp. Lucky nhà mình vốn rất nhát nhưng các bạn nhân viên cực kỳ kiên nhẫn và khéo léo. Bé về nhà trông xinh xắn và thơm tho hẳn!",
      badgeIcon: "♥",
      badgeText: "TIN CẬY 100%",
      badgeColor: "#F97316",
      badgeBg: "rgba(249, 115, 22, 0.08)",
    },
    {
      name: "Anh Hoàng Nam",
      role: "Chủ của Bơ (Golden)",
      avatar:
        AVATARS && AVATARS[1]
          ? AVATARS[1]
          : "https://lh3.googleusercontent.com/aida-public/AB6AXuCQErM5IklLs97od6E7DExadqpJ9gLrpqZ69LjUoA6CZRvd2ZbqqrSOaWYIHD8cSex_4l-4LGzHIQh-_CjUOeqY2ZIHEGTt3NKlDmBusQrnScwRIjJvXDDlpuC3JJjkdyKIsGcxuYbmpUe02pqfjp4wS69S6KY1uFCmXtYXGB05d_ZvsalTzFCHXSARYQ9m_QsnoImGTKYrGuR70oaY7YXhvTvH82NGii01H-S0xfGkEKkj0ERA7j4akw",
      rating: 5,
      content:
        "Mình thường xuyên gửi Bơ ở đây mỗi khi đi công tác. Phòng ốc sạch sẽ, có camera theo dõi nên rất yên tâm. Các bạn còn cập nhật tình hình ăn uống của bé mỗi ngày nữa.",
      badgeIcon: "✔",
      badgeText: "TIỆN LỢI",
      badgeColor: "#3b82f6",
      badgeBg: "rgba(59, 130, 246, 0.08)",
    },
    {
      name: "Chị Thu Trang",
      role: "Chủ của Miu (Mèo Anh)",
      avatar:
        AVATARS && AVATARS[2]
          ? AVATARS[2]
          : "https://lh3.googleusercontent.com/aida-public/AB6AXuCxGN22ILOiZcKEMoWHN429DOF0_sBeBChmTlBTkwHyIzNyycM634iTZARSHhvDFbdPv1gRGx82w9kb-8RzqN3RdtJTZb4-f1eeD5rePmSwY3Z0H5kRGMDQtEqY3K3mi-I56R5AH0FSJwsYfCMDe9NmWFAEChW14oSOFA-WTYCgAyMgAKAN_yNNvXOz7E3Il_BdfS2_DnoqarVy8dPiOZUDf6YCgvtmuewFLZOSOx9mjn6b69_-cDBdTg",
      rating: 5,
      content:
        "Dịch vụ khám tổng quát rất kỹ lượng. Bác sĩ tư vấn chế độ dinh dưỡng rất chi tiết giúp Miu cải thiện tình trạng biếng ăn rõ rệt. Cảm ơn PawHome rất nhiều!",
      badgeIcon: "★",
      badgeText: "CHẤT LƯỢNG 5 SAO",
      badgeColor: "#a855f7",
      badgeBg: "rgba(168, 85, 247, 0.08)",
    },
    {
      name: "Chị Ngọc Lan",
      role: "Mẹ 2 bé Poodle",
      avatar:
        AVATARS && AVATARS[0]
          ? AVATARS[0]
          : "https://lh3.googleusercontent.com/aida-public/AB6AXuD37qytkNRc_Icwq-4pRwpV1APltKkyYHGNPSlSedPkwGul8iP7hDF80QR1yO9f0H2FqSoMlwZpAeGkaFbCfmToYF5Dji3gSWLMB8_dFcm7363moYkh8olAb5mEh8rGgYjdbNI3eeFKw0DOxE9D9kFCRCX4IvteQ9TcsaBR0X3jPExXTmrDeeb4KsFZ7ru3xSp190uz1HGlSCBbLwF8Z_cQ4KCw9mWY7c-dfg6lNmHV-xKxWmhjq1haHg",
      rating: 5,
      content:
        "Các đánh giá trên nền tảng rất chân thực. Voucher giảm giá cũng nhiều. Chắc chắn sẽ sử dụng PawHome lâu dài!",
      badgeIcon: "★",
      badgeText: "CHẤT LƯỢNG 5 SAO",
      badgeColor: "#8b5cf6",
      badgeBg: "rgba(139, 92, 246, 0.08)",
    },
    {
      name: "Anh Quốc Hưng",
      role: "Chủ 3 bé mèo",
      avatar:
        AVATARS && AVATARS[1]
          ? AVATARS[1]
          : "https://lh3.googleusercontent.com/aida-public/AB6AXuCQErM5IklLs97od6E7DExadqpJ9gLrpqZ69LjUoA6CZRvd2ZbqqrSOaWYIHD8cSex_4l-4LGzHIQh-_CjUOeqY2ZIHEGTt3NKlDmBusQrnScwRIjJvXDDlpuC3JJjkdyKIsGcxuYbmpUe02pqfjp4wS69S6KY1uFCmXtYXGB05d_ZvsalTzFCHXSARYQ9m_QsnoImGTKYrGuR70oaY7YXhvTvH82NGii01H-S0xfGkEKkj0ERA7j4akw",
      rating: 5,
      content:
        "Giá cả minh bạch, đặt lịch nhanh gọn. Không cần phải gọi điện thoại hỏi từng phòng khám xem có rảnh lịch mới đặt được.",
      badgeIcon: "✔",
      badgeText: "MINH BẠCH",
      badgeColor: "#F97316",
      badgeBg: "rgba(249, 115, 22, 0.08)",
    },
    {
      name: "Chị Kiều Vy",
      role: "Chủ bé Bánh Bao",
      avatar:
        AVATARS && AVATARS[2]
          ? AVATARS[2]
          : "https://lh3.googleusercontent.com/aida-public/AB6AXuCxGN22ILOiZcKEMoWHN429DOF0_sBeBChmTlBTkwHyIzNyycM634iTZARSHhvDFbdPv1gRGx82w9kb-8RzqN3RdtJTZb4-f1eeD5rePmSwY3Z0H5kRGMDQtEqY3K3mi-I56R5AH0FSJwsYfCMDe9NmWFAEChW14oSOFA-WTYCgAyMgAKAN_yNNvXOz7E3Il_BdfS2_DnoqarVy8dPiOZUDf6YCgvtmuewFLZOSOx9mjn6b69_-cDBdTg",
      rating: 5,
      content:
        "Chăm sóc khách hàng siêu tốt, quy trình tiếp nhận bài bản chuyên nghiệp. Mình sẽ tiếp tục đồng hành lâu dài cùng ứng dụng PawHome!",
      badgeIcon: "♥",
      badgeText: "CHĂM SÓC 24/7",
      badgeColor: "#ef4444",
      badgeBg: "rgba(239, 68, 68, 0.08)",
    },
  ];

  const BLOG_POSTS = [
    {
      title: "Chế độ dinh dưỡng hoàn hảo cho bé Poodle mọi lứa tuổi",
      summary:
        "Tìm hiểu chi tiết lượng calo, protein và các nhóm dưỡng chất cần thiết giúp bé chó nhà bạn luôn khỏe mạnh, lông xoăn mượt bóng khỏe.",
      content:
        "Để nuôi một chú Poodle phát triển tốt nhất và giữ được màu lông lâu phai, bạn cần thiết lập một kế hoạch ăn uống bài bản. Poodle sơ sinh từ 0 đến 2 tháng tuổi hoàn toàn hấp thụ sữa mẹ. Từ 2 đến 6 tháng tuổi, hệ tiêu hóa của Poodle còn non nớt, hãy ưu tiên các loại pate hoặc hạt ngâm nước ấm cho mềm bụng. Đến giai đoạn 6 tháng tuổi trở lên, hãy bổ sung canxi và các dòng đạm chất lượng cao kèm các viên dưỡng lông chứa Omega-3 giúp bộ lông xoăn quý phái luôn bóng mượt. Đừng quên thiết lập lịch tiêm phòng đều đặn!",
      category: "Dinh dưỡng",
      date: "18 Tháng 6, 2026",
      readTime: "5 phút đọc",
      image:
        "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400",
      author: "BS. Nguyễn Văn Hùng",
    },
    {
      title: "Làm sao để nhận biết các dấu hiệu trầm cảm ở mèo cưng?",
      summary:
        "Trầm cảm và lo âu ở mèo rất khó nhận biết. Hãy cùng các bác sĩ chuyên khoa tâm lý động vật phân tích các hành vi thường gặp.",
      content:
        "Mèo là loại động vật vô cùng nhạy cảm và hướng nội. Khác với chó thường bộc lộ cảm xúc rõ rệt, mèo khi buồn chán hay trầm cảm lại chọn phương án thu mình lại. Những biểu hiện dễ thấy bao gồm: lười chải chuốt rỉ rả, bỏ ăn đột ngột, trốn vào góc tối không chịu ra, hoặc kêu gào liên tục không rõ nguyên nhân. Ngoài ra, việc tiểu tiện bừa bãi ngoài khay cát cũng là dấu hiệu chứng minh bé đang cảm thấy không an toàn. Hãy dành ít nhất 15 phút mỗi ngày chơi đùa cùng bé giải tỏa căng thẳng nhé!",
      category: "Tâm lý thú cưng",
      date: "15 Tháng 6, 2026",
      readTime: "4 phút đọc",
      image:
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400",
      author: "ThS. Trần Thị Kim Anh",
    },
    {
      title: "Cẩm nang tiêm vắc-xin và tẩy giun định kỳ đúng phác đồ",
      summary:
        "Bảo vệ sức khỏe bé yêu chủ động bằng phác đồ tiêm ngừa 5-trong-1, 7-trong-1 và phân phối lịch tẩy giun khoa học khuyên dùng.",
      content:
        "Kế hoạch tiêm chủng đóng vai trò sinh tử quyết định tuổi thọ của vật nuôi. Các chuyên gia tại PawHome khuyên chủ nuôi thực hiện liệu trình tiêm chủng mũi 1 từ 6 - 8 tuần tuổi. Các mũi tiêm nhắc lại lần 2 và 3 cách nhau 3 - 4 tuần. Tiêm ngừa bệnh dại bắt buộc thực hiện sau khi bé đủ 3 tháng tuổi. Lịch tẩy giun định kỳ cũng quan trọng không kém: mỗi tháng một lần khi bé còn dưới 6 tháng tuổi, lặp lại mỗi 3 - 6 tháng một lần khi bé trưởng thành.",
      category: "Sức khỏe chủ động",
      date: "12 Tháng 6, 2026",
      readTime: "7 phút đọc",
      image:
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=400",
      author: "BS. Lê Hoàng Nam",
    },
  ];

  const [selectedBlogPost, setSelectedBlogPost] = useState(null);

  // Booking filter state
  const [searchPetType, setSearchPetType] = useState("dog");
  const [searchService, setSearchService] = useState("Cắt Tỉa Thẩm Mỹ");
  const [searchLocation, setSearchLocation] = useState("");

  // Species highlight tracker
  const [selectedSpecies, setSelectedSpecies] = useState("dog");

  // Experts filter and search state
  const [expertSearchQuery, setExpertSearchQuery] = useState("");
  const [expertSortBy, setExpertSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");

  // Pricing duration state
  const [pricingPeriod, setPricingPeriod] = useState("session");

  // Interactive counters
  const [petCounter, setPetCounter] = useState(0);
  const [expertCounter, setExpertCounter] = useState(0);
  const [rateCounter, setRateCounter] = useState(1.0);

  useEffect(() => {
    // Fast counter roll animation on load
    let currentPet = 0;
    let currentExpert = 0;
    let currentRate = 1.0;
    
    const countInterval = setInterval(() => {
      currentPet = Math.min(currentPet + 250, 5000);
      currentExpert = Math.min(currentExpert + 10, 200);
      currentRate = Math.min(currentRate + 0.2, 4.9);
      
      setPetCounter(currentPet);
      setExpertCounter(currentExpert);
      setRateCounter(parseFloat(currentRate.toFixed(1)));
      
      if (currentPet >= 5000 && currentExpert >= 200 && currentRate >= 4.9) {
        clearInterval(countInterval);
      }
    }, 45);

    return () => clearInterval(countInterval);
  }, []);

  // Filter experts list dynamically on typing or sorting parameter changes
  const filteredExperts = EXPERTS.filter(
    (exp) =>
      exp.name.toLowerCase().includes(expertSearchQuery.toLowerCase()) ||
      exp.title.toLowerCase().includes(expertSearchQuery.toLowerCase()) ||
      exp.tags.some((tag) =>
        tag.toLowerCase().includes(expertSearchQuery.toLowerCase()),
      ),
  ).sort((a, b) => {
    if (expertSortBy === "rating") return b.rating - a.rating;
    if (expertSortBy === "reviews") return b.reviewsCount - a.reviewsCount;
    return 0; // default stability
  });

  // Action: Fast search button click
  const handleFastSearchSubmit = (e) => {
    e.preventDefault();
    onOpenBookingWithDetails(searchPetType, searchService);
  };

  // Pricing Table Content
  const pricingData = {
    session: [
      {
        tier: "CƠ BẢN",
        price: "250k",
        period: "/ buổi",
        features: [
          "Tắm rửa chuyên sâu",
          "Vệ sinh móng & tai",
          "Sấy tơi tưng bừng",
        ],
        restricted: ["Cắt tỉa tạo kiểu", "Spa tinh dầu cao cấp"],
        actionText: "Chọn Gói",
        badge: null,
      },
      {
        tier: "TIÊU CHUẨN",
        price: "450k",
        period: "/ buổi",
        features: [
          "Tắm rửa chuyên sâu",
          "Vệ sinh móng & tai",
          "Cắt tỉa & Spa tinh dầu",
          "Chải phồng gỡ rối",
        ],
        restricted: ["Đưa đón bé tận nhà", "Khám sức khỏe tổng quát"],
        actionText: "Chọn Gói",
        badge: "PHỔ BIẾN NHẤT",
      },
      {
        tier: "THƯỢNG HẠNG",
        price: "850k",
        period: "/ buổi",
        features: [
          "Dịch vụ chuẩn Spa 5 sao",
          "Khám sức khỏe nội khoa",
          "Đưa đón bé tận nhà",
          "Tạo kiểu độc quyền Stylist",
        ],
        restricted: [],
        actionText: "Chọn Gói",
        badge: null,
      },
    ],
    monthly: [
      {
        tier: "CƠ BẢN (GÓI THÁNG)",
        price: "2.100k",
        period: "/ tháng (10 buổi)",
        features: [
          "Quản lý sức khỏe cơ bản",
          "Tắm gội định kỳ theo tuần",
          "Vệ sinh tai & móng",
          "Ưu đãi 15% khi phát sinh",
        ],
        restricted: ["Vận chuyển miễn phí", "Tạo kiểu chuyên gia"],
        actionText: "Đăng Ký Khóa",
        badge: "TIẾT KIỆM 15%",
      },
      {
        tier: "TIÊU CHUẨN (GÓI THÁNG)",
        price: "3.800k",
        period: "/ tháng (10 buổi)",
        features: [
          "Tắm rửa định kỳ tuần 2 lần",
          "Vệ sinh móng & tai",
          "Cắt tỉa tạo kiểu theo tháng",
          "Khám sức khỏe cơ bản miễn phí",
          "Tặng 1 đồ chơi cao cấp",
        ],
        restricted: ["Đưa đón 2 chiều hoàn toàn"],
        actionText: "Đăng Ký Khóa",
        badge: "UY TÍN HÀNG ĐẦU",
      },
      {
        tier: "THƯỢNG HẠNG (GÓI THÁNG)",
        price: "7.200k",
        period: "/ tháng (12 buổi)",
        features: [
          "Chăm sóc 5 sao không giới hạn",
          "Khám sức khỏe toàn diện định kỳ",
          "Vận chuyển đưa đón 2 chiều",
          "Huấn luyện thói quen cơ bản",
          "Grooming không lặp lại mẫu",
        ],
        restricted: [],
        actionText: "Đăng Ký Khóa",
        badge: "SIÊU CẤP ĐẶC QUYỀN",
      },
    ],
  };

  return (
    <div
      className="bg-light bg-opacity-70 transition-all"
      style={{ marginTop: "54px" }}
    >
      {/* Style tag for modern beautiful neon gradient glow animations */}
      <style>{`
        @keyframes neon-gradient-blueish {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes neon-glow-blueish {
          0%, 100% {
            filter: drop-shadow(0 0 3px rgba(30, 58, 138, 0.4)) drop-shadow(0 0 8px rgba(30, 58, 138, 0.2));
          }
          50% {
            filter: drop-shadow(0 0 8px rgba(30, 58, 138, 0.7)) drop-shadow(0 0 16px rgba(96, 165, 250, 0.45));
          }
        }
        @keyframes neon-gradient-orangey {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes neon-glow-orangey {
          0%, 100% {
            filter: drop-shadow(0 0 3px rgba(249, 115, 22, 0.4)) drop-shadow(0 0 8px rgba(249, 115, 22, 0.2));
          }
          50% {
            filter: drop-shadow(0 0 8px rgba(249, 115, 22, 0.8)) drop-shadow(0 0 16px rgba(251, 146, 60, 0.5));
          }
        }
        .text-neon-blue-light {
          background: linear-gradient(135deg, #1E3A8A 0%, #2563eb 25%, #3b82f6 50%, #1d4ed8 75%, #1E3A8A 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: neon-gradient-blueish 3s ease infinite, neon-glow-blueish 2s infinite ease-in-out;
          display: inline-block;
        }
        .text-neon-blue-dark {
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 25%, #93c5fd 50%, #2563eb 75%, #60a5fa 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: neon-gradient-blueish 3s ease infinite, neon-glow-blueish 2s infinite ease-in-out;
          display: inline-block;
        }
        .text-neon-orange {
          background: linear-gradient(135deg, #F97316 0%, #ea580c 25%, #fb923c 50%, #f97316 75%, #F97316 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: neon-gradient-orangey 3s ease infinite, neon-glow-orangey 2s infinite ease-in-out;
          display: inline-block;
        }
      `}</style>

      {/* 1. Hero & Fast Booking visual layout */}
      <section
        className="position-relative d-flex align-items-center px-4 md:px-5 justify-content-start overflow-hidden"
        style={{
          minHeight: "82vh",
          width: "100vw",
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Transparent gradient covering behind elements */}
        <div
          className="position-absolute top-0 start-0 bottom-0 end-0"
          style={{
            background: "var(--hero-gradient)",
            zIndex: 1,
          }}
        />

        <div
          className="container position-relative"
          style={{ zIndex: 2, maxWidth: "1140px" }}
        >
          <div className="row">
            <div className="col-12 col-md-8 col-lg-6">
              <div
                className="glass p-3.5 p-md-4 rounded-40 border-0 shadow-lg my-3 animate-fade-in"
                style={{ maxWidth: "480px" }}
              >
                <div
                  className="d-inline-flex align-items-center gap-2 py-1.5 px-3 mb-3 rounded-pill border"
                  style={{
                    backgroundColor: isDarkMode
                      ? "rgba(255, 255, 255, 0.06)"
                      : "rgba(13, 28, 47, 0.04)",
                    color: isDarkMode ? "#f8f9ff" : "#0d1c2f",
                    borderColor: isDarkMode
                      ? "rgba(255, 255, 255, 0.15)"
                      : "rgba(0, 35, 111, 0.08)",
                    fontSize: "11px",
                    fontWeight: "800",
                    letterSpacing: "0.08em",
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    textTransform: "uppercase",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#4361ee",
                    }}
                  ></span>
                  Hệ sinh thái thú y toàn diện
                </div>

                <h1
                  className="mb-3"
                  style={{
                    fontSize: "calc(2.0rem + 1.4vw)",
                    fontWeight: "850",
                    lineHeight: "1.08",
                    letterSpacing: "-0.04em",
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                  }}
                >
                  <span
                    className={
                      isDarkMode
                        ? "text-neon-blue-dark"
                        : "text-neon-blue-light"
                    }
                  >
                    Chăm sóc
                  </span>{" "}
                  <br />
                  <span className="text-neon-orange">Thú cưng</span> <br />
                  <span
                    className={
                      isDarkMode
                        ? "text-neon-blue-dark"
                        : "text-neon-blue-light"
                    }
                  >
                    thời đại số.
                  </span>
                </h1>

                <p
                  className="mb-3 text-muted"
                  style={{
                    fontSize: "13.5px",
                    lineHeight: "1.5",
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                  }}
                >
                  Kết nối với mạng lưới chuyên gia, đặt lịch khám nhanh chóng và
                  theo dõi bé yêu mọi lúc qua Live Camera 24/7.
                </p>

                <div className="d-flex flex-column flex-sm-row gap-2.5 align-items-start align-items-sm-center">
                  <div className="d-flex" style={{ marginLeft: "12px" }}>
                    {AVATARS.map((av, idx) => (
                      <img
                        key={idx}
                        className="rounded-circle border border-2 border-white"
                        src={av}
                        style={{
                          width: "30px",
                          height: "30px",
                          objectFit: "cover",
                          marginLeft: "-12px",
                        }}
                        alt="Reviewer avatar"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                  <div
                    className="small text-muted fw-bold"
                    style={{ fontSize: "11.5px" }}
                  >
                    <span
                      className="text-secondary-custom fw-extrabold fs-6 d-inline d-sm-block me-1"
                      style={{ fontSize: "13px" }}
                    >
                      200+
                    </span>
                    Chuyên gia hàng đầu sẵn sàng đồng hành
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Advanced Search & Filter Bar Section */}
      <section
        className="py-4 bg-white position-relative shadow-sm"
        style={{ zIndex: 10 }}
      >
        <div
          className="container"
          style={{ maxWidth: "1140px", marginTop: "-80px" }}
        >
          <div className="card p-4 rounded-32 shadow-lg border-0 bg-white">
            <form
              onSubmit={handleFastSearchSubmit}
              className="row g-3 align-items-end"
            >
              {/* Pet Type selectors */}
              <div className="col-12 col-md-6 col-lg-4">
                <label
                  className="form-label fw-bold text-uppercase text-secondary-custom tracking-wider mb-2"
                  style={{ fontSize: "11px" }}
                >
                  1. Chọn Loại Thú Cưng
                </label>
                <div className="row g-1">
                  {[
                    { id: "dog", name: "Chó" },
                    { id: "cat", name: "Mèo" },
                    { id: "rabbit", name: "Thỏ" },
                    { id: "other", name: "Khác" },
                  ].map((type) => (
                    <div key={type.id} className="col-3">
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSearchPetType(type.id)}
                        className="btn w-100 py-3 rounded-3 border-2 d-flex flex-column align-items-center justify-content-center shadow-none text-decoration-none"
                        style={{
                          borderColor:
                            searchPetType === type.id
                              ? "var(--secondary-color)"
                              : "var(--border-btn-unselected)",
                          backgroundColor:
                            searchPetType === type.id
                              ? "rgba(253, 118, 26, 0.04)"
                              : "var(--bg-btn-unselected)",
                          color:
                            searchPetType === type.id
                              ? "var(--secondary-color)"
                              : "var(--text-btn-unselected)",
                        }}
                      >
                        <span className="mb-2 d-flex align-items-center justify-content-center">
                          <AnimalLogo type={type.id} size={28} />
                        </span>
                        <span style={{ fontSize: "10px", fontWeight: 700 }}>
                          {type.name}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service selects */}
              <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                <label
                  htmlFor="searchServiceSelect"
                  className="form-label fw-bold text-uppercase text-secondary-custom tracking-wider mb-2"
                  style={{ fontSize: "11px" }}
                >
                  2. Dịch vụ mong muốn
                </label>
                <select
                  id="searchServiceSelect"
                  className="form-select py-3 border-light bg-light rounded-3 fw-bold text-dark"
                  style={{ fontSize: "13px" }}
                  value={searchService}
                  onChange={(e) => setSearchService(e.target.value)}
                >
                  <option value="Cắt Tỉa Thẩm Mỹ">
                    Cắt tỉa & Spa tinh dầu
                  </option>
                  <option value="Lưu Trú Cao Cấp">Lưu trú khách sạn VIP</option>
                  <option value="Khám Tổng Quát">
                    Khám sức khỏe tổng quát
                  </option>
                </select>
              </div>

              {/* Location Input */}
              <div className="col-12 col-sm-6 col-md-8 col-lg-3">
                <label
                  htmlFor="searchLocationInput"
                  className="form-label fw-bold text-uppercase text-secondary-custom tracking-wider mb-2"
                  style={{ fontSize: "11px" }}
                >
                  3. Khu vực của bạn
                </label>
                <div className="position-relative">
                  <span className="material-symbols-outlined position-absolute text-muted start-0 top-50 translate-middle-y ms-3 fs-5">
                    location_on
                  </span>
                  <input
                    id="searchLocationInput"
                    className="form-control rounded-3 border-light bg-light py-3 ps-5 text-dark"
                    style={{ fontSize: "13px" }}
                    placeholder="Nhập địa chỉ, quận huyện..."
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
              </div>

              {/* Button trigger */}
              <div className="col-12 col-md-4 col-lg-2">
                <button
                  type="submit"
                  className="btn btn-primary-custom w-100 py-3 rounded-3 text-uppercase fw-bold shadow-sm"
                  style={{ fontSize: "12px", letterSpacing: "0.4px" }}
                >
                  Tìm Lịch Trống
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 3. Core Stats Metrics counters with Bricolage Grotesque display */}
      <section id="why-pawhome-section" className="py-5 bg-white">
        <div className="container" style={{ maxWidth: "1140px" }}>
          <div className="row g-4 justify-content-center">
            <div className="col-6 col-md-3">
              <div className="text-center p-3 bg-light rounded-24 border border-light-subtle">
                <div className="fs-1 fw-extrabold text-primary-custom mb-1 font-monospace">
                  {petCounter.toLocaleString()}
                </div>
                <div
                  className="text-muted text-uppercase font-sans tracking-wide small"
                  style={{ fontSize: "11px", fontWeight: 700 }}
                >
                  Thú cưng hạnh phúc
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="text-center p-3 bg-light rounded-24 border border-light-subtle">
                <div className="fs-1 fw-extrabold text-primary-custom mb-1 font-monospace">
                  8
                </div>
                <div
                  className="text-muted text-uppercase font-sans tracking-wide small"
                  style={{ fontSize: "11px", fontWeight: 700 }}
                >
                  Loài thú nuôi chăm sóc
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="text-center p-3 bg-light rounded-24 border border-light-subtle">
                <div className="fs-1 fw-extrabold text-primary-custom mb-1 font-monospace">
                  {expertCounter}+
                </div>
                <div
                  className="text-muted text-uppercase font-sans tracking-wide small"
                  style={{ fontSize: "11px", fontWeight: 700 }}
                >
                  Chuyên gia dẫn đầu
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="text-center p-3 bg-light rounded-24 border border-light-subtle">
                <div className="fs-1 fw-extrabold text-primary-custom mb-1 font-monospace">
                  {rateCounter}
                </div>
                <div
                  className="text-muted text-uppercase font-sans tracking-wide small"
                  style={{ fontSize: "11px", fontWeight: 700 }}
                >
                  Đánh giá trung bình
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Pet Species Grid section with animated highlight indicator */}
      <section id="pets-section" className="py-5 bg-light">
        <div className="container" style={{ maxWidth: "1140px" }}>
          <div className="text-center mb-5">
            <h2 className="fs-2 fw-extrabold text-primary-custom mb-1">
              Bạn cần phục vụ cho ai?
            </h2>
            <p
              className="text-muted small mx-auto"
              style={{ maxWidth: "420px" }}
            >
              Chọn loài thú cưng thích hợp để lọc và hiển thị chính xác các
              chuyên gia cùng phác đồ chăm sóc đặc biệt.
            </p>
          </div>

          <div className="row row-cols-2 row-cols-sm-4 row-cols-lg-8 g-3 justify-content-center">
            {SPECIES.map((spec) => (
              <div key={spec.id} className="col">
                <button
                  onClick={() => {
                    setSelectedSpecies(spec.id);
                    setSearchPetType(spec.id);
                    setExpertSearchQuery(spec.name); // Filter expert list too!
                  }}
                  className="btn w-100 p-3 rounded-24 border-2 text-center d-flex flex-column align-items-center gap-2 shadow-none transition-all text-decoration-none"
                  style={{
                    borderColor:
                      selectedSpecies === spec.id
                        ? "var(--secondary-color)"
                        : "var(--border-btn-unselected)",
                    backgroundColor:
                      selectedSpecies === spec.id
                        ? "rgba(253, 118, 26, 0.05)"
                        : "var(--bg-btn-unselected)",
                    color:
                      selectedSpecies === spec.id
                        ? "var(--secondary-color)"
                        : "var(--text-btn-unselected)",
                  }}
                >
                  <span className="mb-2 d-flex align-items-center justify-content-center">
                    <AnimalLogo type={spec.id} size={40} />
                  </span>
                  <span style={{ fontSize: "11px", fontWeight: 750 }}>
                    {spec.name}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Expert searching block & detailed filtering */}
      <section id="about-section" className="py-5 bg-white">
        <div className="container" style={{ maxWidth: "1140px" }}>
          <div className="text-center mb-5">
            <span
              className="badge rounded-pill text-uppercase py-2 px-3 mb-2"
              style={{
                backgroundColor: "rgba(253, 118, 26, 0.1)",
                color: "var(--secondary-color)",
              }}
            >
              Đội ngũ tinh hoa
            </span>
            <h3 className="fs-2 fw-extrabold text-primary-custom mb-1">
              Tìm Kiếm Chuyên Gia
            </h3>
            <p
              className="text-muted small mx-auto"
              style={{ maxWidth: "480px" }}
            >
              Tất cả y bác sĩ, kỹ thuật viên tại PawHome được tuyển chọn cực kì
              khắt khe với tối thiểu 3 năm kinh nghiệm thực chiến.
            </p>
          </div>

          {/* Detailed Filter controls */}
          <div className="p-3 bg-light rounded-32 border mb-4 d-flex flex-column md:flex-row gap-3 align-items-center justify-content-between shadow-sm">
            {/* Query search input */}
            <div
              className="position-relative w-100"
              style={{ maxWidth: "400px" }}
            >
              <Search
                className="position-absolute text-muted start-0 top-50 translate-middle-y ms-3"
                style={{ width: "18px", height: "18px" }}
              />
              <input
                className="form-control rounded-pill bg-white border-light py-2 px-3 ps-5 text-dark"
                style={{ fontSize: "13px" }}
                placeholder="Nhập tên b.sĩ, kỹ năng (ví dụ: Spa, K9)..."
                type="text"
                value={expertSearchQuery}
                onChange={(e) => setExpertSearchQuery(e.target.value)}
              />
              {expertSearchQuery && (
                <button
                  onClick={() => setExpertSearchQuery("")}
                  className="btn btn-sm p-0 border-0 position-absolute end-0 top-50 translate-middle-y me-3 small text-muted shadow-none"
                >
                  Xóa
                </button>
              )}
            </div>

            {/* Quick Sort Options */}
            <div className="d-flex flex-wrap gap-2 align-items-center justify-content-center">
              <span
                className="small text-muted fw-bold text-uppercase mr-1"
                style={{ fontSize: "11px" }}
              >
                Xếp theo:
              </span>
              {[
                { id: "default", label: "Tất cả" },
                { id: "rating", label: "Xếp hạng sao" },
                { id: "reviews", label: "Lượt đánh giá" },
              ].map((sort) => (
                <button
                  key={sort.id}
                  onClick={() => setExpertSortBy(sort.id)}
                  className="btn btn-sm rounded-pill fw-bold px-3 py-1.5"
                  style={{
                    fontSize: "11px",
                    backgroundColor:
                      expertSortBy === sort.id
                        ? "var(--primary-color)"
                        : "var(--bg-btn-unselected)",
                    color:
                      expertSortBy === sort.id
                        ? "#ffffff"
                        : "var(--text-btn-unselected)",
                    border: "1px solid var(--border-btn-unselected)",
                  }}
                >
                  {sort.label}
                </button>
              ))}
            </div>

            {/* Grid vs list layout toggle */}
            <div className="d-none d-sm-flex bg-white rounded-3 p-1 border">
              <button
                onClick={() => setViewMode("grid")}
                className="btn btn-sm py-1 px-2 border-0 shadow-none"
                style={{
                  color:
                    viewMode === "grid" ? "var(--primary-color)" : "#94a3b8",
                }}
              >
                <span className="material-symbols-outlined fs-5">
                  grid_view
                </span>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className="btn btn-sm py-1 px-2 border-0 shadow-none"
                style={{
                  color:
                    viewMode === "list" ? "var(--primary-color)" : "#94a3b8",
                }}
              >
                <span className="material-symbols-outlined fs-5">
                  view_agenda
                </span>
              </button>
            </div>
          </div>

          {/* Dynamic Experts Grid / List View rendering */}
          {filteredExperts.length === 0 ? (
            <div className="p-5 text-center bg-light rounded-24 border border-dashed text-muted">
              <span className="material-symbols-outlined fs-1 text-muted mb-2">
                search_off
              </span>
              <p className="small">
                Không thấy chuyên gia nào tương xứng với yêu cầu khám của bạn.
              </p>
              <button
                onClick={() => setExpertSearchQuery("")}
                className="btn btn-link small text-primary p-0 text-decoration-none fw-bold"
              >
                Tải lại danh sách đầy đủ
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="row g-4">
              {filteredExperts.map((exp) => (
                <div key={exp.id} className="col-12 col-sm-6 col-lg-3">
                  <div className="card h-100 p-4 rounded-32 border-light shadow-sm d-flex flex-column justify-content-between text-start position-relative">
                    {exp.rating === 5.0 && (
                      <span
                        className="position-absolute badge bg-danger rounded-pill uppercase font-monospace shadow-sm"
                        style={{ top: "20px", right: "20px", fontSize: "9px" }}
                      >
                        TOP STARS
                      </span>
                    )}

                    <div>
                      <img
                        alt={exp.name}
                        className="rounded-3 mb-3 border"
                        src={exp.image}
                        style={{
                          width: "64px",
                          height: "64px",
                          objectFit: "cover",
                        }}
                        referrerPolicy="no-referrer"
                      />

                      <h4
                        className="fw-extrabold text-primary-custom mb-1"
                        style={{ fontSize: "15px" }}
                      >
                        {exp.name}
                      </h4>

                      <p
                        className="text-muted mb-3"
                        style={{ fontSize: "12px" }}
                      >
                        {exp.title}
                      </p>

                      <div className="d-flex align-items-center gap-1.5 mb-3">
                        <Star
                          className="fill-amber-400 text-amber-400"
                          style={{ width: "15px", height: "15px" }}
                        />
                        <span className="fw-bold text-dark small">
                          {exp.rating}
                        </span>
                        <span
                          className="text-muted"
                          style={{ fontSize: "11px" }}
                        >
                          ({exp.reviewsCount} reviews)
                        </span>
                      </div>

                      {/* Custom tag chips */}
                      <div className="d-flex flex-wrap gap-1 mb-4">
                        {exp.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="badge rounded-pill bg-light text-muted fw-bold font-sans"
                            style={{ fontSize: "9px", color: "#64748b" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        onOpenBookingWithDetails(
                          searchPetType,
                          "Cắt Tỉa Thẩm Mỹ",
                          exp.name,
                        )
                      }
                      className="btn btn-primary-custom w-100 py-2.5 rounded-3 fw-bold uppercase"
                      style={{ fontSize: "11px" }}
                    >
                      Đặt hẹn với {exp.name.split(" ").pop()}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List layout representation
            <div className="d-flex flex-column gap-3">
              {filteredExperts.map((exp) => (
                <div
                  key={exp.id}
                  className="card p-3 rounded-24 border-light shadow-sm d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3 text-start bg-white"
                >
                  <div className="d-flex align-items-center gap-3">
                    <img
                      alt={exp.name}
                      className="rounded-3 border"
                      src={exp.image}
                      style={{
                        width: "56px",
                        height: "56px",
                        objectFit: "cover",
                      }}
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4
                        className="fw-extrabold text-primary-custom mb-1"
                        style={{ fontSize: "15px" }}
                      >
                        {exp.name}
                      </h4>
                      <p className="text-muted mb-1 small">{exp.title}</p>
                      <div className="d-flex align-items-center gap-1">
                        <Star
                          className="fill-amber-400 text-amber-400"
                          style={{ width: "13px", height: "13px" }}
                        />
                        <span className="fw-bold text-dark small">
                          {exp.rating}
                        </span>
                        <span
                          className="text-muted"
                          style={{ fontSize: "11px" }}
                        >
                          ({exp.reviewsCount} assessments)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex flex-wrap gap-1 max-w-sm">
                    {exp.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="badge bg-light text-muted rounded-pill py-1.5 px-2.5"
                        style={{ fontSize: "10px" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      onOpenBookingWithDetails(
                        searchPetType,
                        "Cắt Tỉa Thẩm Mỹ",
                        exp.name,
                      )
                    }
                    className="btn btn-primary-custom px-4 py-2 rounded-3 fw-bold text-uppercase"
                    style={{ fontSize: "11px" }}
                  >
                    Liên Hệ Đặt Lịch
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. Popular Services Gallery with high density image backgrounds */}
      <section id="services-section" className="py-5 bg-light">
        <div className="container" style={{ maxWidth: "1140px" }}>
          <div className="text-center mb-5">
            <span
              className="badge rounded-pill text-uppercase py-2 px-3 mb-2"
              style={{
                backgroundColor: "rgba(253, 118, 26, 0.1)",
                color: "var(--secondary-color)",
              }}
            >
              Chuyên nghiệp - Tận tâm
            </span>
            <h2 className="fs-2 fw-extrabold text-primary-custom mb-1">
              Dịch Vụ Nổi Bật Hàng Đầu
            </h2>
            <p
              className="text-muted small mx-auto"
              style={{ maxWidth: "420px" }}
            >
              Hợp tác khép kín cùng những thương hiệu dinh dưỡng hàng đầu, mang
              đến liệu trình chăm sóc tốt nhất.
            </p>
          </div>

          <div className="row g-4">
            {SERVICES.map((serv) => (
              <div key={serv.id} className="col-12 col-md-4">
                <div
                  className="card rounded-40 border-0 shadow-lg overflow-hidden position-relative"
                  style={{ height: "380px" }}
                >
                  <img
                    className="position-absolute w-100 h-100"
                    src={serv.image}
                    alt={serv.name}
                    style={{ objectFit: "cover", top: 0, left: 0 }}
                    referrerPolicy="no-referrer"
                  />
                  {/* Backdrop tint mapping */}
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(13,28,47,0.85) 0%, rgba(13,28,47,0.3) 60%, rgba(13,28,47,0) 100%)",
                      zIndex: 1,
                    }}
                  />

                  <div
                    className="position-absolute bottom-0 start-0 p-4 w-100 text-white d-flex flex-column justify-content-end h-100"
                    style={{ zIndex: 2 }}
                  >
                    <h3
                      className="fw-extrabold mb-2 text-white"
                      style={{ fontSize: "20px" }}
                    >
                      {serv.name}
                    </h3>

                    <p
                      className="text-white opacity-90 small mb-4 pr-3"
                      style={{ lineHeight: "1.4" }}
                    >
                      {serv.description}
                    </p>

                    <div className="d-flex justify-content-between align-items-end pt-3 border-top border-white border-opacity-10">
                      <div>
                        <div
                          className="text-uppercase text-white text-opacity-70 font-monospace mb-1"
                          style={{ fontSize: "9px", letterSpacing: "0.5px" }}
                        >
                          Chỉ từ
                        </div>
                        <div className="fw-extrabold text-warning fs-5">
                          {serv.basePrice.toLocaleString("vi-VN")} VNĐ
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          onOpenBookingWithDetails(selectedSpecies, serv.name)
                        }
                        className="btn btn-secondary-custom rounded-pill py-2 px-4 shadow-sm"
                        style={{ fontSize: "11px" }}
                      >
                        Đặt Ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. 3-step Process flow map */}
      <section
        id="process-section"
        className="py-5 bg-white border-top border-bottom"
        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
      >
        {/* Style tag for custom movement animations for transition chevrons */}
        <style>{`
          @keyframes slide-right-pulse {
            0%, 100% {
              transform: translateX(0) scale(1);
              opacity: 0.55;
              color: #cbd5e1;
            }
            50% {
              transform: translateX(8px) scale(1.15);
              opacity: 1;
              color: #F97316;
            }
          }
          .animate-arrow-transition {
            animation: slide-right-pulse 1.8s infinite ease-in-out;
          }
        `}</style>
        <div className="container" style={{ maxWidth: "1140px" }}>
          <div className="text-center mb-5">
            <h2
              className="mb-2"
              style={{
                color: "#1E3A8A",
                fontWeight: "850",
                fontSize: "calc(1.8rem + 1.2vw)",
                letterSpacing: "-0.03em",
              }}
            >
              Sử dụng PawHome Chỉ với{" "}
              <span style={{ color: "#F97316", fontWeight: "850" }}>
                3 bước
              </span>
            </h2>
            <p
              className="text-muted small mx-auto"
              style={{
                maxWidth: "420px",
                fontSize: "14.5px",
                lineHeight: "1.6",
              }}
            >
              Tiết kiệm tối đa thời gian di chuyển, quy trình chuyên nghiệp bảo
              mật thông tin.
            </p>
          </div>

          <div className="row g-4 text-center justify-content-center position-relative">
            {/* Step 1 */}
            <div className="col-12 col-md-4 position-relative">
              <div
                className="card h-100 p-4 border-0 d-flex flex-column align-items-start text-start"
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "32px",
                  boxShadow: isDarkMode
                    ? "0 10px 30px rgba(0, 0, 0, 0.2)"
                    : "0 10px 30px rgba(30, 58, 138, 0.05)",
                  transition: "all 0.3s ease",
                  minHeight: "390px",
                  position: "relative",
                  overflow: "hidden",
                  border: isDarkMode
                    ? "1px solid rgba(255, 255, 255, 0.08)"
                    : "1px solid rgba(30, 58, 138, 0.04)",
                }}
              >
                {/* Big watermark number */}
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "15px",
                    fontSize: "110px",
                    fontWeight: "900",
                    color: isDarkMode
                      ? "rgba(255, 255, 255, 0.02)"
                      : "rgba(30, 58, 138, 0.03)",
                    lineHeight: "1",
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  1
                </div>

                {/* Badge */}
                <span
                  className="badge mb-3 px-3 py-2 rounded-pill"
                  style={{
                    backgroundColor: isDarkMode
                      ? "rgba(30, 58, 138, 0.25)"
                      : "rgba(30, 58, 138, 0.08)",
                    color: isDarkMode ? "#60a5fa" : "#1E3A8A",
                    fontSize: "11px",
                    fontWeight: "800",
                    letterSpacing: "0.05em",
                  }}
                >
                  BƯỚC 1
                </span>

                {/* Simulated visual block */}
                <div
                  className="w-100 p-3 rounded-4 mb-4 d-flex flex-column gap-2"
                  style={{
                    backgroundColor: isDarkMode
                      ? "rgba(255, 255, 255, 0.02)"
                      : "#f8fafc",
                    border: isDarkMode
                      ? "1px solid rgba(255, 255, 255, 0.05)"
                      : "1px solid #f1f5f9",
                    borderRadius: "24px",
                    height: "140px",
                    justifyContent: "center",
                  }}
                >
                  {/* Search bar simulation */}
                  <div
                    className="p-2 rounded-3 d-flex align-items-center gap-2 border shadow-sm"
                    style={{
                      backgroundColor: isDarkMode
                        ? "rgba(255, 255, 255, 0.05)"
                        : "#ffffff",
                      borderColor: isDarkMode
                        ? "rgba(255, 255, 255, 0.1)"
                        : "#cbd5e1",
                    }}
                  >
                    <span
                      className="material-symbols-outlined text-muted"
                      style={{ fontSize: "15px" }}
                    >
                      search
                    </span>
                    <div
                      style={{
                        width: "40%",
                        height: "8px",
                        backgroundColor: isDarkMode
                          ? "rgba(255, 255, 255, 0.2)"
                          : "#e2e8f0",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                  {/* Info badges row */}
                  <div className="row g-2 mt-1">
                    <div className="col-6">
                      <div
                        className="py-2 px-2.5 rounded-pill d-flex align-items-center gap-1.5 border shadow-sm"
                        style={{
                          backgroundColor: isDarkMode
                            ? "rgba(255, 255, 255, 0.05)"
                            : "#ffffff",
                          borderColor: isDarkMode
                            ? "rgba(255, 255, 255, 0.1)"
                            : "#cbd5e1",
                        }}
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: "14px", color: "#1E3A8A" }}
                        >
                          location_on
                        </span>
                        <div
                          style={{
                            width: "25px",
                            height: "6px",
                            backgroundColor: isDarkMode
                              ? "rgba(255, 255, 255, 0.2)"
                              : "#cbd5e1",
                            borderRadius: "3px",
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div
                        className="py-2 px-2.5 rounded-pill d-flex align-items-center gap-1.5 border shadow-sm"
                        style={{
                          backgroundColor: isDarkMode
                            ? "rgba(255, 255, 255, 0.05)"
                            : "#ffffff",
                          borderColor: isDarkMode
                            ? "rgba(255, 255, 255, 0.1)"
                            : "#cbd5e1",
                        }}
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: "14px", color: "#F97316" }}
                        >
                          star
                        </span>
                        <div
                          style={{
                            width: "25px",
                            height: "6px",
                            backgroundColor: isDarkMode
                              ? "rgba(255, 255, 255, 0.2)"
                              : "#cbd5e1",
                            borderRadius: "3px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3
                  className="fw-bold mb-2"
                  style={{
                    color: isDarkMode ? "#ffffff" : "#1E3A8A",
                    fontSize: "18px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Chọn Chuyên Gia
                </h3>
                <p
                  className="text-muted small mb-0"
                  style={{ lineHeight: "1.5", fontSize: "13.5px" }}
                >
                  Tìm kiếm bác sĩ, chuyên gia và xem kỹ các đánh giá khách quan
                  trực tiếp để đưa ra lựa chọn hàng đầu cho bé.
                </p>
              </div>

              {/* Connector Chevron Arrow Step 1 to 2 */}
              <div
                className="d-none d-md-flex position-absolute align-items-center justify-content-center animate-arrow-transition"
                style={{
                  width: "32px",
                  height: "32px",
                  right: "-16px",
                  top: "40%",
                  zIndex: "15",
                  pointerEvents: "none",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 17L11 12L6 7M13 17L18 12L13 7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Step 2 */}
            <div className="col-12 col-md-4 position-relative">
              <div
                className="card h-100 p-4 border-0 d-flex flex-column align-items-start text-start"
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "32px",
                  boxShadow: isDarkMode
                    ? "0 10px 30px rgba(0, 0, 0, 0.2)"
                    : "0 10px 30px rgba(30, 58, 138, 0.05)",
                  transition: "all 0.3s ease",
                  minHeight: "390px",
                  position: "relative",
                  overflow: "hidden",
                  border: isDarkMode
                    ? "1px solid rgba(255, 255, 255, 0.08)"
                    : "1px solid rgba(30, 58, 138, 0.04)",
                }}
              >
                {/* Big watermark number */}
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "15px",
                    fontSize: "110px",
                    fontWeight: "900",
                    color: isDarkMode
                      ? "rgba(255, 255, 255, 0.02)"
                      : "rgba(249, 115, 22, 0.03)",
                    lineHeight: "1",
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  2
                </div>

                {/* Badge */}
                <span
                  className="badge mb-3 px-3 py-2 rounded-pill"
                  style={{
                    backgroundColor: isDarkMode
                      ? "rgba(249, 115, 22, 0.25)"
                      : "rgba(249, 115, 22, 0.08)",
                    color: isDarkMode ? "#ffedd5" : "#F97316",
                    fontSize: "11px",
                    fontWeight: "800",
                    letterSpacing: "0.05em",
                  }}
                >
                  BƯỚC 2
                </span>

                {/* Simulated visual block */}
                <div
                  className="w-100 p-3 rounded-4 mb-4 d-flex flex-column gap-2"
                  style={{
                    backgroundColor: isDarkMode
                      ? "rgba(255, 255, 255, 0.02)"
                      : "#f8fafc",
                    border: isDarkMode
                      ? "1px solid rgba(255, 255, 255, 0.05)"
                      : "1px solid #f1f5f9",
                    borderRadius: "24px",
                    height: "140px",
                    justifyContent: "center",
                  }}
                >
                  {/* Time slots simulation */}
                  <div
                    className="row g-1 mb-1"
                    style={{ fontSize: "9px", fontWeight: "800" }}
                  >
                    <div className="col-4">
                      <div
                        className="text-center py-1 rounded border shadow-sm"
                        style={{
                          backgroundColor: isDarkMode
                            ? "rgba(255, 255, 255, 0.05)"
                            : "#ffffff",
                          color: isDarkMode ? "#cbd5e1" : "#0f172a",
                          borderColor: isDarkMode
                            ? "rgba(255, 255, 255, 0.1)"
                            : "#cbd5e1",
                        }}
                      >
                        09:00
                      </div>
                    </div>
                    <div className="col-4">
                      <div
                        className="text-center py-1 rounded border shadow-sm"
                        style={{
                          backgroundColor: isDarkMode
                            ? "rgba(255, 255, 255, 0.05)"
                            : "#ffffff",
                          color: isDarkMode ? "#cbd5e1" : "#0f172a",
                          borderColor: isDarkMode
                            ? "rgba(255, 255, 255, 0.1)"
                            : "#cbd5e1",
                        }}
                      >
                        10:00
                      </div>
                    </div>
                    <div className="col-4">
                      <div
                        className="text-white text-center py-1 rounded shadow-sm"
                        style={{
                          background:
                            "linear-gradient(135deg, #F97316 0%, #fb923c 100%)",
                        }}
                      >
                        11:00
                      </div>
                    </div>
                  </div>
                  <div
                    className="row g-1 mb-1"
                    style={{ fontSize: "9px", fontWeight: "800" }}
                  >
                    <div className="col-4">
                      <div
                        className="text-center py-1 rounded border shadow-sm"
                        style={{
                          backgroundColor: isDarkMode
                            ? "rgba(255, 255, 255, 0.05)"
                            : "#ffffff",
                          color: isDarkMode ? "#cbd5e1" : "#0f172a",
                          borderColor: isDarkMode
                            ? "rgba(255, 255, 255, 0.1)"
                            : "#cbd5e1",
                        }}
                      >
                        14:00
                      </div>
                    </div>
                    <div className="col-4">
                      <div
                        className="text-center py-1 rounded border shadow-sm"
                        style={{
                          backgroundColor: isDarkMode
                            ? "rgba(255, 255, 255, 0.05)"
                            : "#ffffff",
                          color: isDarkMode ? "#cbd5e1" : "#0f172a",
                          borderColor: isDarkMode
                            ? "rgba(255, 255, 255, 0.1)"
                            : "#cbd5e1",
                        }}
                      >
                        15:00
                      </div>
                    </div>
                    <div className="col-4">
                      <div
                        className="text-center py-1 rounded border shadow-sm"
                        style={{
                          backgroundColor: isDarkMode
                            ? "rgba(255, 255, 255, 0.05)"
                            : "#ffffff",
                          color: isDarkMode ? "#cbd5e1" : "#0f172a",
                          borderColor: isDarkMode
                            ? "rgba(255, 255, 255, 0.1)"
                            : "#cbd5e1",
                        }}
                      >
                        16:00
                      </div>
                    </div>
                  </div>
                  {/* Action button simulation */}
                  <div
                    className="w-100 py-1.5 mt-1 rounded-pill text-center text-white d-flex align-items-center justify-content-center gap-1.5 shadow-sm"
                    style={{
                      backgroundColor: isDarkMode ? "#1e293b" : "#1E3A8A",
                      fontSize: "9px",
                      fontWeight: "800",
                      letterSpacing: "0.04em",
                    }}
                  >
                    <div
                      style={{
                        width: "5px",
                        height: "5px",
                        backgroundColor: "#22c55e",
                        borderRadius: "50%",
                      }}
                    ></div>
                    XÁC NHẬN LỊCH
                  </div>
                </div>

                {/* Content */}
                <h3
                  className="fw-bold mb-2"
                  style={{
                    color: isDarkMode ? "#ffffff" : "#1E3A8A",
                    fontSize: "18px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Đặt Thời Gian
                </h3>
                <p
                  className="text-muted small mb-0"
                  style={{ lineHeight: "1.5", fontSize: "13.5px" }}
                >
                  Lựa chọn khung giờ linh hoạt, đặt lịch chăm sóc tại nhà hoặc
                  gửi bé trực tiếp tại chi nhánh trung tâm gần nhất.
                </p>
              </div>

              {/* Connector Chevron Arrow Step 2 to 3 */}
              <div
                className="d-none d-md-flex position-absolute align-items-center justify-content-center animate-arrow-transition"
                style={{
                  width: "32px",
                  height: "32px",
                  right: "-16px",
                  top: "40%",
                  zIndex: "15",
                  pointerEvents: "none",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 17L11 12L6 7M13 17L18 12L13 7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Step 3 */}
            <div className="col-12 col-md-4 position-relative">
              <div
                className="card h-100 p-4 border-0 d-flex flex-column align-items-start text-start"
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "32px",
                  boxShadow: isDarkMode
                    ? "0 10px 30px rgba(0, 0, 0, 0.2)"
                    : "0 10px 30px rgba(30, 58, 138, 0.05)",
                  transition: "all 0.3s ease",
                  minHeight: "390px",
                  position: "relative",
                  overflow: "hidden",
                  border: isDarkMode
                    ? "1px solid rgba(255, 255, 255, 0.08)"
                    : "1px solid rgba(30, 58, 138, 0.04)",
                }}
              >
                {/* Big watermark number */}
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "15px",
                    fontSize: "110px",
                    fontWeight: "900",
                    color: isDarkMode
                      ? "rgba(255, 255, 255, 0.02)"
                      : "rgba(30, 58, 138, 0.03)",
                    lineHeight: "1",
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  3
                </div>

                {/* Badge */}
                <span
                  className="badge mb-3 px-3 py-2 rounded-pill"
                  style={{
                    backgroundColor: isDarkMode
                      ? "rgba(30, 58, 138, 0.25)"
                      : "rgba(30, 58, 138, 0.08)",
                    color: isDarkMode ? "#60a5fa" : "#1E3A8A",
                    fontSize: "11px",
                    fontWeight: "800",
                    letterSpacing: "0.05em",
                  }}
                >
                  BƯỚC 3
                </span>

                {/* Simulated visual block */}
                <div
                  className="w-100 p-3 rounded-4 mb-4 d-flex flex-column gap-2 align-items-center"
                  style={{
                    backgroundColor: isDarkMode
                      ? "rgba(255, 255, 255, 0.02)"
                      : "#f8fafc",
                    border: isDarkMode
                      ? "1px solid rgba(255, 255, 255, 0.05)"
                      : "1px solid #f1f5f9",
                    borderRadius: "24px",
                    height: "140px",
                    justifyContent: "center",
                  }}
                >
                  {/* Glowing stars */}
                  <div className="d-flex gap-1 mb-1 justify-content-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined"
                        style={{
                          fontVariationSettings: '"FILL" 1',
                          fontSize: "15px",
                          color: "#F97316",
                        }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  {/* Custom feedback box simulation */}
                  <div
                    className="p-2 rounded-3 d-flex gap-2 border shadow-sm w-100 align-items-center"
                    style={{
                      backgroundColor: isDarkMode
                        ? "rgba(255, 255, 255, 0.05)"
                        : "#ffffff",
                      borderColor: isDarkMode
                        ? "rgba(255, 255, 255, 0.1)"
                        : "#cbd5e1",
                    }}
                  >
                    <div
                      style={{
                        width: "22px",
                        height: "22px",
                        backgroundColor: isDarkMode
                          ? "rgba(255, 255, 255, 0.15)"
                          : "#cbd5e1",
                        borderRadius: "50%",
                      }}
                    />
                    <div className="d-flex flex-column gap-1 flex-grow-1">
                      <div
                        style={{
                          width: "40px",
                          height: "6px",
                          backgroundColor: isDarkMode ? "#94a3b8" : "#718096",
                          borderRadius: "3px",
                        }}
                      />
                      <div
                        style={{
                          width: "75px",
                          height: "4px",
                          backgroundColor: isDarkMode ? "#475569" : "#cbd5e1",
                          borderRadius: "2px",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3
                  className="fw-bold mb-2"
                  style={{
                    color: isDarkMode ? "#ffffff" : "#1E3A8A",
                    fontSize: "18px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Tận Hưởng Dịch Vụ
                </h3>
                <p
                  className="text-muted small mb-0"
                  style={{ lineHeight: "1.5", fontSize: "13.5px" }}
                >
                  Bé cưng của bạn nhận sự chăm dưỡng tỉ mỉ từ chuyên gia. Báo
                  cáo hình ảnh trực tiếp qua phần mềm kiểm tra 24/7.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Pricing Table with dynamic Session vs Monthly switcher */}
      <section id="pricing-section" className="py-5 bg-light">
        <div className="container" style={{ maxWidth: "1140px" }}>
          <div className="text-center mb-5">
            <span
              className="badge rounded-pill text-uppercase py-2 px-3 mb-2"
              style={{
                backgroundColor: "rgba(253, 118, 26, 0.1)",
                color: "var(--secondary-color)",
              }}
            >
              Bảng giá minh bạch
            </span>
            <h2 className="fs-2 fw-extrabold text-primary-custom mb-4">
              Gói Dịch Vụ Ưu Đãi
            </h2>

            {/* Switch Period button */}
            <div className="d-inline-flex bg-white p-2 border rounded-pill shadow-inner">
              <button
                onClick={() => setPricingPeriod("session")}
                className="btn btn-sm rounded-pill fw-bold py-2 px-4 shadow-none me-1"
                style={{
                  backgroundColor:
                    pricingPeriod === "session"
                      ? "var(--primary-color)"
                      : "transparent",
                  color: pricingPeriod === "session" ? "#ffffff" : "#64748b",
                }}
              >
                Theo Buổi
              </button>
              <button
                onClick={() => setPricingPeriod("monthly")}
                className="btn btn-sm rounded-pill fw-bold py-2 px-4 shadow-none"
                style={{
                  backgroundColor:
                    pricingPeriod === "monthly"
                      ? "var(--primary-color)"
                      : "transparent",
                  color: pricingPeriod === "monthly" ? "#ffffff" : "#64748b",
                }}
              >
                Gói Tháng (Tiết Kiệm)
              </button>
            </div>
          </div>

          {/* Dynamic Display cards mapping */}
          <div className="row g-4 align-items-stretch justify-content-center">
            {pricingPeriod === "session"
              ? pricingData.session.map((tier, idx) => (
                  <div key={idx} className="col-12 col-md-4">
                    <div
                      className="card h-100 p-4 rounded-32 border hover-shadow transition-all bg-white d-flex flex-column justify-content-between position-relative"
                      style={{
                        borderColor: tier.badge
                          ? "var(--secondary-color)"
                          : "rgba(0,0,0,0.06)",
                        boxShadow: tier.badge
                          ? "0 10px 25px -5px rgba(253, 118, 26, 0.15)"
                          : "none",
                        transform: tier.badge ? "scale(1.02)" : "none",
                      }}
                    >
                      {tier.badge && (
                        <span
                          className="position-absolute badge bg-danger text-uppercase font-sans font-extrabold py-2 px-3 rounded-pill shadow-sm"
                          style={{
                            top: "-14px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            fontSize: "9px",
                          }}
                        >
                          {tier.badge}
                        </span>
                      )}

                      <div>
                        <div
                          className="text-muted text-uppercase fw-bold mb-2 font-monospace"
                          style={{ fontSize: "10px" }}
                        >
                          {tier.tier}
                        </div>
                        <div className="fs-1 fw-extrabold text-primary-custom mb-4 font-monospace flex items-baseline">
                          {tier.price}
                          <span
                            className="text-muted font-sans small mb-0 font-normal"
                            style={{ fontSize: "12px" }}
                          >
                            {tier.period}
                          </span>
                        </div>

                        <ul className="list-unstyled d-flex flex-column gap-2 mb-4 text-start">
                          {tier.features.map((feat, i) => (
                            <li
                              key={i}
                              className="small d-flex align-items-center gap-2 fw-bold text-dark"
                            >
                              <Check
                                className="text-warning"
                                style={{ width: "16px", height: "16px" }}
                              />
                              <span>{feat}</span>
                            </li>
                          ))}
                          {tier.restricted.map((re, i) => (
                            <li
                              key={i}
                              className="small d-flex align-items-center gap-2 text-decoration-line-through text-muted opacity-60"
                            >
                              <span className="text-danger fw-bolder">×</span>
                              <span>{re}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() =>
                          onOpenBookingWithDetails("dog", "Cắt Tỉa Thẩm Mỹ")
                        }
                        className="btn w-100 py-3 rounded-3 fw-bold text-uppercase"
                        style={{
                          fontSize: "11px",
                          backgroundColor: tier.badge
                            ? "var(--secondary-color)"
                            : "rgba(0,35,111,0.05)",
                          color: tier.badge
                            ? "#ffffff"
                            : "var(--primary-color)",
                        }}
                      >
                        {tier.actionText}
                      </button>
                    </div>
                  </div>
                ))
              : pricingData.monthly.map((tier, idx) => (
                  <div key={idx} className="col-12 col-md-4">
                    <div
                      className="card h-100 p-4 rounded-32 border hover-shadow transition-all bg-white d-flex flex-column justify-content-between position-relative"
                      style={{
                        borderColor: tier.badge
                          ? "var(--secondary-color)"
                          : "rgba(0,0,0,0.06)",
                        boxShadow: tier.badge
                          ? "0 10px 25px -5px rgba(253, 118, 26, 0.15)"
                          : "none",
                        transform: tier.badge ? "scale(1.02)" : "none",
                      }}
                    >
                      {tier.badge && (
                        <span
                          className="position-absolute badge bg-danger text-uppercase font-sans font-extrabold py-2 px-3 rounded-pill shadow-sm"
                          style={{
                            top: "-14px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            fontSize: "9px",
                          }}
                        >
                          {tier.badge}
                        </span>
                      )}

                      <div>
                        <div
                          className="text-muted text-uppercase fw-bold mb-2 font-monospace"
                          style={{ fontSize: "10px" }}
                        >
                          {tier.tier}
                        </div>
                        <div className="fs-1 fw-extrabold text-primary-custom mb-4 font-monospace flex items-baseline">
                          {tier.price}
                          <span
                            className="text-muted font-sans small mb-0 font-normal"
                            style={{ fontSize: "12px" }}
                          >
                            {tier.period}
                          </span>
                        </div>

                        <ul className="list-unstyled d-flex flex-column gap-2 mb-4 text-start">
                          {tier.features.map((feat, i) => (
                            <li
                              key={i}
                              className="small d-flex align-items-center gap-2 fw-bold text-dark"
                            >
                              <Check
                                className="text-warning"
                                style={{ width: "16px", height: "16px" }}
                              />
                              <span>{feat}</span>
                            </li>
                          ))}
                          {tier.restricted.map((re, i) => (
                            <li
                              key={i}
                              className="small d-flex align-items-center gap-2 text-decoration-line-through text-muted opacity-60"
                            >
                              <span className="text-primary fw-bolder">×</span>
                              <span>{re}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() =>
                          onOpenBookingWithDetails("dog", "Cắt Tỉa Thẩm Mỹ")
                        }
                        className="btn w-100 py-3 rounded-3 fw-bold text-uppercase"
                        style={{
                          fontSize: "11px",
                          backgroundColor: tier.badge
                            ? "var(--secondary-color)"
                            : "rgba(0,35,111,0.05)",
                          color: tier.badge
                            ? "#ffffff"
                            : "var(--primary-color)",
                        }}
                      >
                        {tier.actionText}
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* 9. Testimonials & reviews section */}
      <section
        className="py-5 overflow-hidden"
        style={{ backgroundColor: isDarkMode ? "#0f172a" : "#f3f6fc" }}
      >
        {/* Style tag for horizontal infinite marquee text and container */}
        <style>{`
          @keyframes marquee-left {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          @keyframes marquee-right {
            0% { transform: translate3d(-50%, 0, 0); }
            100% { transform: translate3d(0, 0, 0); }
          }
          .marquee-container-custom {
            overflow: hidden;
            width: 100%;
            position: relative;
          }
          .marquee-track-left {
            display: flex;
            width: max-content;
            animation: marquee-left 32s linear infinite;
          }
          .marquee-track-right {
            display: flex;
            width: max-content;
            animation: marquee-right 36s linear infinite;
          }
          .marquee-track-left:hover, .marquee-track-right:hover {
            animation-play-state: paused;
          }
          .marquee-card-custom {
            width: 380px;
            margin-right: 20px;
            flex-shrink: 0;
            white-space: normal;
          }
        `}</style>
        <div className="container" style={{ maxWidth: "1240px" }}>
          <div className="row align-items-center g-5">
            {/* Left static text column */}
            <div className="col-12 col-lg-4 text-start">
              <div
                className="d-flex align-items-center gap-2 mb-3"
                style={{
                  color: "#1E3A8A",
                  fontWeight: "800",
                  fontSize: "12.5px",
                  letterSpacing: "0.05em",
                }}
              >
                <Star
                  className="text-primary-custom"
                  style={{ width: "15px", height: "15px", fill: "#1E3A8A" }}
                />
                <span style={{ color: isDarkMode ? "#60a5fa" : "#1E3A8A" }}>
                  ĐÁNH GIÁ NỔI BẬT
                </span>
              </div>
              <h2
                className="mb-3"
                style={{
                  color: isDarkMode ? "#ffffff" : "#1E3A8A",
                  fontWeight: "900",
                  lineHeight: "1.15",
                  fontSize: "calc(2.0rem + 1.2vw)",
                  letterSpacing: "-0.03em",
                }}
              >
                Phản hồi từ
                <br />
                người dùng
                <br />
                <span style={{ color: "#F97316" }}>PawHome</span>
              </h2>
              <p
                className="mb-4"
                style={{
                  color: isDarkMode ? "#94a3b8" : "#475569",
                  fontSize: "14.5px",
                  lineHeight: "1.6",
                  fontWeight: "500",
                }}
              >
                Kết nối yêu thương, chăm sóc tận tâm. Khám phá lý do hàng ngàn
                khách hàng luôn tin tưởng và lựa chọn PawHome.
              </p>

              {/* Connected details section */}
              <div
                className="d-flex align-items-center gap-3 bg-white bg-opacity-10 p-3 rounded-4 shadow-sm"
                style={{
                  border: isDarkMode
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid rgba(30, 58, 138, 0.05)",
                }}
              >
                {/* Visual Avatar stack */}
                <div className="d-flex align-items-center">
                  {(AVATARS || []).slice(0, 3).map((av, index) => (
                    <img
                      key={index}
                      alt="Avatar bubble"
                      src={av}
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        border: isDarkMode
                          ? "2px solid #1e293b"
                          : "2px solid #ffffff",
                        marginLeft: index > 0 ? "-10px" : "0px",
                        objectFit: "cover",
                      }}
                      referrerPolicy="no-referrer"
                    />
                  ))}
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      backgroundColor: "#1E3A8A",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: "800",
                      border: isDarkMode
                        ? "2px solid #1e293b"
                        : "2px solid #ffffff",
                      marginLeft: "-10px",
                    }}
                  >
                    +
                  </div>
                </div>
                <div>
                  <div
                    className="fw-extrabold"
                    style={{
                      fontSize: "15px",
                      color: isDarkMode ? "#ffffff" : "#1E3A8A",
                      lineHeight: "1.2",
                    }}
                  >
                    1000+
                  </div>
                  <div
                    className="text-muted small fw-semibold"
                    style={{ fontSize: "11px" }}
                  >
                    Lượt đặt lịch thành công
                  </div>
                </div>
              </div>
            </div>

            {/* Right scrolling carousel track column */}
            <div className="col-12 col-lg-8">
              <div className="d-flex flex-column gap-4">
                {/* Track Row 1: Leftward Scrolling */}
                <div className="marquee-container-custom">
                  <div className="marquee-track-left">
                    {[
                      ...EXTENDED_TESTIMONIALS_DYNAMIC,
                      ...EXTENDED_TESTIMONIALS_DYNAMIC,
                    ].map((testi, offset) => (
                      <div key={offset} className="marquee-card-custom">
                        <div
                          className="card p-4 h-100 rounded-4 border-0 shadow-sm d-flex flex-column justify-content-between text-start"
                          style={{
                            backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
                            minHeight: "220px",
                            border: isDarkMode
                              ? "1px solid rgba(255,255,255,0.05)"
                              : "1px solid rgba(30, 58, 138, 0.02)",
                          }}
                        >
                          <div>
                            {/* Card badge header */}
                            <div
                              className="d-flex align-items-center gap-1.5 mb-3 px-2.5 py-1.5 rounded-pill d-inline-flex"
                              style={{
                                backgroundColor: isDarkMode
                                  ? "rgba(30, 58, 138, 0.25)"
                                  : testi.badgeBg,
                                color: testi.badgeColor,
                                fontSize: "11px",
                                fontWeight: "800",
                                letterSpacing: "0.04em",
                                width: "fit-content",
                              }}
                            >
                              <span style={{ fontSize: "11px" }}>
                                {testi.badgeIcon}
                              </span>
                              <span>{testi.badgeText}</span>
                            </div>

                            <p
                              className="small mb-3"
                              style={{
                                color: isDarkMode ? "#cbd5e1" : "#334155",
                                lineHeight: "1.55",
                                fontStyle: "italic",
                                fontWeight: "500",
                                fontSize: "13.5px",
                              }}
                            >
                              "{testi.content}"
                            </p>
                          </div>

                          <div
                            className="d-flex align-items-center justify-content-between mt-auto pt-3 border-top"
                            style={{
                              borderColor: isDarkMode
                                ? "rgba(255, 255, 255, 0.08)"
                                : "#f1f5f9",
                            }}
                          >
                            <div className="d-flex align-items-center gap-2.5">
                              <img
                                alt={testi.name}
                                className="rounded-circle border"
                                src={testi.avatar}
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  objectFit: "cover",
                                  borderColor: isDarkMode
                                    ? "rgba(255,255,255,0.1)"
                                    : "#e2e8f0",
                                }}
                                referrerPolicy="no-referrer"
                              />
                              <div>
                                <h6
                                  className="fw-bold mb-0"
                                  style={{
                                    fontSize: "13px",
                                    color: isDarkMode ? "#ffffff" : "#1E3A8A",
                                  }}
                                >
                                  {testi.name}
                                </h6>
                                <p
                                  className="text-muted mb-0"
                                  style={{
                                    fontSize: "10px",
                                    fontWeight: "700",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.03em",
                                  }}
                                >
                                  {testi.role}
                                </p>
                              </div>
                            </div>
                            <div className="d-flex gap-0.5">
                              {[...Array(testi.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="fill-amber-400 text-amber-400"
                                  style={{ width: "12px", height: "12px" }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Track Row 2: Rightward Scrolling (Reverse) */}
                <div className="marquee-container-custom">
                  <div className="marquee-track-right">
                    {[
                      ...EXTENDED_TESTIMONIALS_DYNAMIC,
                      ...EXTENDED_TESTIMONIALS_DYNAMIC,
                    ]
                      .reverse()
                      .map((testi, offset) => (
                        <div key={offset} className="marquee-card-custom">
                          <div
                            className="card p-4 h-100 rounded-4 border-0 shadow-sm d-flex flex-column justify-content-between text-start"
                            style={{
                              backgroundColor: isDarkMode
                                ? "#1e293b"
                                : "#ffffff",
                              minHeight: "220px",
                              border: isDarkMode
                                ? "1px solid rgba(255,255,255,0.05)"
                                : "1px solid rgba(30, 58, 138, 0.02)",
                            }}
                          >
                            <div>
                              {/* Card badge header */}
                              <div
                                className="d-flex align-items-center gap-1.5 mb-3 px-2.5 py-1.5 rounded-pill d-inline-flex"
                                style={{
                                  backgroundColor: isDarkMode
                                    ? "rgba(30, 58, 138, 0.25)"
                                    : testi.badgeBg,
                                  color: testi.badgeColor,
                                  fontSize: "11px",
                                  fontWeight: "800",
                                  letterSpacing: "0.04em",
                                  width: "fit-content",
                                }}
                              >
                                <span style={{ fontSize: "11px" }}>
                                  {testi.badgeIcon}
                                </span>
                                <span>{testi.badgeText}</span>
                              </div>

                              <p
                                className="small mb-3"
                                style={{
                                  color: isDarkMode ? "#cbd5e1" : "#334155",
                                  lineHeight: "1.55",
                                  fontStyle: "italic",
                                  fontWeight: "500",
                                  fontSize: "13.5px",
                                }}
                              >
                                "{testi.content}"
                              </p>
                            </div>

                            <div
                              className="d-flex align-items-center justify-content-between mt-auto pt-3 border-top"
                              style={{
                                borderColor: isDarkMode
                                  ? "rgba(255, 255, 255, 0.08)"
                                  : "#f1f5f9",
                              }}
                            >
                              <div className="d-flex align-items-center gap-2.5">
                                <img
                                  alt={testi.name}
                                  className="rounded-circle border"
                                  src={testi.avatar}
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    objectFit: "cover",
                                    borderColor: isDarkMode
                                      ? "rgba(255,255,255,0.1)"
                                      : "#e2e8f0",
                                  }}
                                  referrerPolicy="no-referrer"
                                />
                                <div>
                                  <h6
                                    className="fw-bold mb-0"
                                    style={{
                                      fontSize: "13px",
                                      color: isDarkMode ? "#ffffff" : "#1E3A8A",
                                    }}
                                  >
                                    {testi.name}
                                  </h6>
                                  <p
                                    className="text-muted mb-0"
                                    style={{
                                      fontSize: "10px",
                                      fontWeight: "700",
                                      textTransform: "uppercase",
                                      letterSpacing: "0.03em",
                                    }}
                                  >
                                    {testi.role}
                                  </p>
                                </div>
                              </div>
                              <div className="d-flex gap-0.5">
                                {[...Array(testi.rating)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className="fill-amber-400 text-amber-400"
                                    style={{ width: "12px", height: "12px" }}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog-section" className="py-5 bg-white">
        <div className="container" style={{ maxWidth: "1140px" }}>
          <div className="text-center mb-5">
            <span
              className="badge rounded-pill text-uppercase py-2 px-3 mb-2"
              style={{
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                color: "#3b82f6",
              }}
            >
              Kinh nghiệm chăm sóc
            </span>
            <h3 className="fs-2 fw-extrabold text-primary-custom mb-1">
              Cẩm Nang Thú Cưng
            </h3>
            <p
              className="text-muted small mx-auto"
              style={{ maxWidth: "480px" }}
            >
              Nơi chia sẻ các kiến thức y khoa, dinh dưỡng và tâm lý động vật
              chuẩn xác nhất từ đội ngũ chuyên gia hàng đầu.
            </p>
          </div>

          <div className="row g-4">
            {BLOG_POSTS.map((post, idx) => (
              <div key={idx} className="col-12 col-md-4">
                <div
                  className="card h-100 border-0 rounded-32 overflow-hidden shadow-sm hover-up transition-all cursor-pointer"
                  style={{
                    backgroundColor: isDarkMode
                      ? "rgba(255,255,255,0.03)"
                      : "#ffffff",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
                    border: isDarkMode
                      ? "1px solid rgba(255,255,255,0.05)"
                      : "1px solid rgba(0,0,0,0.03)",
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => setSelectedBlogPost(post)}
                >
                  <div
                    className="position-relative overflow-hidden"
                    style={{ height: "220px" }}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-100 h-100 object-fit-cover transition-all"
                      style={{ transition: "transform 0.5s ease" }}
                      referrerPolicy="no-referrer"
                    />
                    <span
                      className="position-absolute top-0 start-0 m-3 px-3 py-1.5 rounded-pill fs-7 fw-bold shadow-sm"
                      style={{
                        backgroundColor: "var(--primary-color)",
                        color: "#ffffff",
                        fontSize: "11px",
                      }}
                    >
                      {post.category}
                    </span>
                  </div>
                  <div className="card-body p-4 d-flex flex-column justify-content-between">
                    <div>
                      <div
                        className="d-flex align-items-center gap-2 mb-2 text-muted"
                        style={{ fontSize: "11px" }}
                      >
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h5
                        className="card-title fw-bold mb-3 transition-all"
                        style={{
                          fontSize: "16px",
                          lineHeight: "1.4",
                          color: isDarkMode
                            ? "#f8f9ff"
                            : "var(--primary-color)",
                        }}
                      >
                        {post.title}
                      </h5>
                      <p
                        className="card-text text-muted small"
                        style={{ lineHeight: "1.5", fontSize: "13px" }}
                      >
                        {post.summary}
                      </p>
                    </div>
                    <div
                      className="d-flex align-items-center justify-content-between pt-3 mt-3 border-top"
                      style={{
                        borderColor: isDarkMode
                          ? "rgba(255, 255, 255, 0.08)"
                          : "rgba(0,0,0,0.05)",
                      }}
                    >
                      <span
                        className="small fw-bold text-muted text-truncate"
                        style={{ fontSize: "12px", maxWidth: "140px" }}
                      >
                        {post.author}
                      </span>
                      <span
                        className="fw-bold px-2 py-1 text-secondary-custom"
                        style={{ fontSize: "13px" }}
                      >
                        Đọc tiếp →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <button
              onClick={() => {
                onViewChange("blog");
                try {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } catch (e) {
                  // Fallback for sandboxed context
                }
              }}
              className="btn btn-primary-custom rounded-pill fw-bold px-5 py-3 shadow-sm hover-up transition-all"
              style={{ fontSize: "14px" }}
            >
              Xem tất cả bài viết cẩm nang
            </button>
          </div>
        </div>
      </section>

      {/* Blog Details Modal */}
      {selectedBlogPost && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center px-3"
          style={{
            backgroundColor: "rgba(13, 28, 47, 0.75)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            zIndex: 9999,
          }}
          onClick={() => setSelectedBlogPost(null)}
        >
          <div
            className="rounded-40 overflow-hidden w-100 shadow-2xl animate-fade-in"
            style={{
              maxWidth: "640px",
              backgroundColor: isDarkMode ? "#0d1c2f" : "#ffffff",
              border: isDarkMode
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,35,111,0.05)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="position-relative" style={{ height: "260px" }}>
              <img
                src={selectedBlogPost.image}
                alt={selectedBlogPost.title}
                className="w-100 h-100 object-fit-cover"
                referrerPolicy="no-referrer"
              />
              <div
                className="position-absolute bottom-0 start-0 w-100 p-4"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
                }}
              >
                <span className="badge bg-danger rounded-pill px-3 py-1.5 mb-2 small fw-bold">
                  {selectedBlogPost.category}
                </span>
                <h3 className="text-white fw-extrabold mb-0 leading-sm fs-5 text-wrap pr-3">
                  {selectedBlogPost.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBlogPost(null)}
                className="position-absolute top-0 end-0 m-3 btn rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "#ffffff",
                  width: "32px",
                  height: "32px",
                  border: "none",
                  fontSize: "12px",
                }}
              >
                ✕
              </button>
            </div>

            <div className="p-4 p-md-5">
              <div
                className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom"
                style={{
                  borderColor: isDarkMode
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(0,0,0,0.05)",
                }}
              >
                <div className="small text-muted" style={{ fontSize: "13px" }}>
                  Tác giả:{" "}
                  <span className="fw-bold">{selectedBlogPost.author}</span>
                </div>
                <div
                  className="small text-muted d-flex gap-2"
                  style={{ fontSize: "12px" }}
                >
                  <span>{selectedBlogPost.date}</span>
                  <span>•</span>
                  <span>{selectedBlogPost.readTime}</span>
                </div>
              </div>

              <p
                className="lead fs-6 text-muted mb-4 fw-medium"
                style={{ lineHeight: "1.6", fontSize: "14.5px" }}
              >
                {selectedBlogPost.summary}
              </p>

              <div
                className="lh-lg"
                style={{
                  color: isDarkMode ? "rgba(255,255,255,0.8)" : "#334155",
                  fontSize: "14px",
                }}
              >
                {selectedBlogPost.content}
              </div>

              <div className="text-center mt-5">
                <button
                  onClick={() => setSelectedBlogPost(null)}
                  className="btn btn-primary-custom rounded-pill px-5 fw-bold"
                >
                  Đóng bài viết
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 10. Final epic CTA section */}
      <section className="py-5 bg-light">
        <div className="container" style={{ maxWidth: "1140px" }}>
          <div
            className="p-5 p-md-5 rounded-40 text-center text-white position-relative overflow-hidden shadow-lg"
            style={{
              backgroundColor: "var(--primary-color)",
              backgroundImage:
                "radial-gradient(circle at top right, rgba(253, 118, 26, 0.15), transparent)",
            }}
          >
            <div className="position-relative" style={{ zIndex: 10 }}>
              <h2 className="fs-2 fw-extrabold text-white mb-3 tracking-tight">
                Sẵn sàng để{" "}
                <span className="text-warning">Chăm Sóc tốt nhất</span> cho bé?
              </h2>

              <p
                className="text-white text-opacity-95 mb-4 mx-auto small"
                style={{ maxWidth: "580px", lineHeight: "1.6" }}
              >
                Đăng ký tài khoản ngay hôm nay để nhận được buổi tư vấn dinh
                dưỡng và chẩn đoán tâm lý MIỄN PHÍ lần đầu tiên cùng các chuyên
                khoa hàng đầu.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <button
                  onClick={onNavigateToRegister}
                  className="btn btn-secondary-custom rounded-pill py-3 px-5 text-uppercase fw-bold shadow"
                  style={{ fontSize: "12px" }}
                >
                  Đăng Ký Ngay
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById("services-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn btn-outline-light rounded-pill py-3 px-5 text-uppercase fw-bold"
                  style={{ fontSize: "12px" }}
                >
                  Tìm Hiểu Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
