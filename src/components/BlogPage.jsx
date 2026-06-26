import React, { useState, useMemo } from 'react';
import BLOG_TOP_IMAGE from "../assets/images/top-image.jpg";
import BLOG_HEADER_IMAGE from "../assets/images/ffc820cb443352f65c329cbec2dac606.jpg";
import { 
  Search, 
  Grid, 
  List, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  User, 
  Clock, 
  BookOpen, 
  ArrowLeft,
  Mail, 
  Bookmark, 
  Heart,
  BookMarked,
  Tag,
  Star
} from 'lucide-react';

// Deep mock database of rich blog articles with interesting pet-care tips, structured paragraphs, and content
const BLOG_ARTICLES = [
  {
    id: "british-shorthair",
    title: "Bí quyết chăm sóc lông cho mèo Anh lông ngắn",
    category: "Sức khỏe",
    date: "15 Tháng 10, 2024",
    rawDate: "2024-10-15",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTooEkSWUqReEiK4zZvye2V3XPLGED3segoQdwZ1BzDOa0Sm4bCQ7hmpxT-kmNbIURVjwOp7HWjp6VWwY-XxBLvhoLLpyxIkZ9WPbiK_yWl1LNCxPtcfDM6_rEcRZfTgTssiJo6fgalxLdoqWyhB6QRuRyvEvuOFX8S25TI67sGeEERIw3MPWC9n_ugE38lk7AmpyKUIbZdWbqVLozR_S9e4MIJl6wo1blljjSiNT7QgcroBAK4R25Sg",
    summary: "Mèo Anh lông ngắn (British Shorthair) nổi tiếng với bộ lông dày, mềm mịn như nhung. Để duy trì vẻ đẹp và sức khỏe cho bộ lông này, chủ nuôi cần có những kỹ thuật chăm sóc chuyên biệt.",
    author: "BS. Thú y Minh Anh",
    readTime: "5 phút đọc",
    tags: ["#MeoAnhLongNgan", "#ChamSocThuCung"],
    content: [
      "Mèo Anh lông ngắn (British Shorthair) nổi tiếng với bộ lông dày, mềm mịn như nhung. Để duy trì vẻ đẹp và sức khỏe cho bộ lông này, chủ nuôi cần có những kỹ thuật chăm sóc chuyên biệt.",
      "Mặc dù là giống mèo lông ngắn, nhưng mật độ lông của chúng cực kỳ dày. Nếu không được chải chuốt thường xuyên, lớp lông chết sẽ tích tụ, gây xơ rối và tăng nguy cơ hình thành búi lông trong dạ dày (hairballs) khi mèo tự liếm lông.",
      "Chọn lược phù hợp: Sử dụng lược răng thưa để gỡ rối sơ bộ và lược chải lông chuyên dụng (slicker brush) để loại bỏ lông chết.",
      "Tần suất: Nên chải lông ít nhất 2-3 lần mỗi tuần. Vào mùa thay lông (xuân và thu), bạn cần thực hiện hàng ngày.",
      "Hướng chải: Luôn chải theo chiều lông mọc để tránh làm mèo bị đau hoặc tổn thương da.",
      "Kiểm tra da: Trong quá trình chải, hãy quan sát các dấu hiệu bất thường như mẩn đỏ, bọ chét hay các nốt sưng.",
      "Lông đẹp bắt đầu từ bên trong. Một chế độ ăn giàu Protein, Omega-3 và Omega-6 sẽ giúp sợi lông chắc khỏe từ gốc. Bạn có thể bổ sung thêm dầu cá hồi vào bữa ăn hàng ngày của bé."
    ],
    tips: [
      "Đừng quên tắm cho mèo khoảng 1 lần mỗi tháng bằng sữa tắm chuyên dụng dành riêng cho mèo để giữ cho lớp lông luôn thơm tho và sạch sẽ."
    ]
  },
  {
    id: "featured",
    title: "Chế độ dinh dưỡng hoàn hảo cho chó con trong 6 tháng đầu đời",
    category: "Dinh dưỡng",
    date: "24 Tháng 5, 2024",
    rawDate: "2024-05-24",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-VzOcMxDTef-eqopoFCpq3JuYUaF9XPZyrBgjOC6Vl-zcjV4IzKZZofij0H7iBSLs7lNijsadLAc-1zomUCUFGB5AXVULnZfR-MEMmcEjf11aC0qfCzzy7dt_1ArukpqiD6A1DWEPZIOMIjfSeXemTfXwI77GYMgT2cj5l119as4rHJAmi4NcAdHLOLsVfYy8RtrHIaGNstl5m8bYx8gH-KNhysWmgRaUp-XBYIl8CvqD9BCt09GjyA",
    summary: "Giai đoạn đầu đời cực kỳ quan trọng đối với sự phát triển của thú cưng. Tìm hiểu cách cân bằng protein, vitamin và các khoáng chất thiết yếu để bé lớn nhanh và khỏe mạnh.",
    author: "Bác sĩ thú y Nguyễn Văn An",
    readTime: "6 phút đọc",
    tags: ["#chamsoccho", "#thucpham", "#petcare"],
    content: [
      "Giai đoạn 6 tháng đầu đời là thời kỳ 'vàng' quyết định đến toàn bộ sự phát triển tầm vóc, thể chất và hệ miễn dịch của cún cưng sau này. Chế độ dinh dưỡng không hợp lý trong thời gian này có thể dẫn đến các dị tật xương khớp di chứng suốt đời hoặc suy giảm hệ miễn dịch nghiêm trọng.",
      "Đối với chó con dưới 2 tháng tuổi, sữa mẹ là nguồn dinh dưỡng tối ưu và duy nhất cần thiết. Từ tháng thứ 3 trở đi, bạn bắt đầu có thể tập cho bé ăn dặm với cháo loãng, sau đó chuyển dần sang hạt mềm chuyên dụng cho chó con.",
      "Một khẩu phần ăn hoàn hảo cho chó con cần đáp ứng tỷ lệ cân bằng: 25-30% Protein (từ thịt gà, thịt bò, trứng), 15-20% Chất béo lành mạnh, và các chất xơ từ rau củ để hỗ trợ tiêu hóa tốt nhất.",
      "Lời khuyên từ chuyên gia dinh dưỡng PawHome: Hãy chia nhỏ bữa ăn từ 4 - 5 lần/ngày cho chó dưới 4 tháng tuổi để giảm tải cho dạ dày non nớt của bé, sau đó giảm dần xuống 2 - 3 lần/ngày khi bé lớn hơn."
    ],
    tips: [
      "Tuyệt đối không cho chó con ăn xương ống vì dễ gây hóc hoặc thủng ruột.",
      "Luôn cung cấp nước sạch tinh khiết 24/7 bên cạnh khay thức ăn.",
      "Hạn chế các loại gia vị mặn, ngọt hoặc thức ăn thừa của người."
    ]
  },
  {
    id: "post_1",
    title: "5 Bài tập cơ bản giúp cún cưng vâng lời hơn",
    category: "Huấn luyện",
    date: "12 Tháng 5, 2024",
    rawDate: "2024-05-12",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuADDq4xMGvVligvJLPxKobqYt35Y7hClGfi28x-DMHMEFlPGtCv3hwJzOHUN2kNevEFL6Z4y36KDbc_LS2LsAB0X18r8DCvYl90OmsTbiNXLX74mSLxm_hetnwiWJTFVMBmnpGyogbkLK7yTY9QIrMGyNCrIquiclOrGtwWq3uzPjeJn0DnYqUJvfA27tSqL-qkhWtQgqoPtepo9Ve7fL3j2YTuNlBRXGbl9qut3rrwdhHX4lCbeCNOcg",
    summary: "Làm thế nào để bắt đầu huấn luyện cún cưng tại nhà một cách hiệu quả nhất? Khám phá ngay các kỹ thuật huấn luyện phản xạ tích cực cực đơn giản.",
    author: "Huấn luyện viên Lê Hoàng Nam",
    readTime: "5 phút đọc",
    tags: ["#chamsoccho", "#petcare"],
    content: [
      "Nuôi một chú chó đáng yêu là trải nghiệm tuyệt vời, nhưng nuôi một chú chó vừa đáng yêu vừa biết nghe lời lại là cả một nghệ thuật. Việc huấn luyện nên được thực hiện càng sớm càng tốt để định hình thói quen tốt từ nhỏ.",
      "Nguyên tắc cốt lõi của mọi bài huấn luyện thành công là 'Khen thưởng tích cực' (Positive Reinforcement). Thay vì trừng phạt khi bé làm sai, hãy tập trung khen ngợi, vuốt ve và thưởng thức ăn ngay lập tức khi bé hoàn thành đúng mệnh lệnh.",
      "Bài tập 1: Dạy bé ngồi (Sit). Cầm một mẩu thức ăn sát mũi bé, từ từ nâng tay lên cao hướng về phía sau đầu. Theo phản xạ, bé sẽ hạ mông xuống đất để ngước nhìn thức ăn. Ngay khi mông chạm đất, hãy hô lệnh 'Ngồi!' và thưởng ngay.",
      "Bài tập 2: Dạy bé dừng lại (Stay). Khi bé đang ở tư thế ngồi, mở lòng bàn tay hướng về phía mặt bé, hô lệnh 'Chờ!'. Lùi lại một bước, nếu bé vẫn ngồi yên, hãy tiến tới thưởng và khen ngợi. Tăng dần khoảng cách từng ngày."
    ],
    tips: [
      "Mỗi buổi tập chỉ nên kéo dài từ 5 - 10 phút để tránh làm bé bị stress hoặc chán nản.",
      "Giọng nói khi ra lệnh cần rõ ràng, dứt khoát và nhất quán.",
      "Luôn kết thúc buổi học bằng một trò chơi vui vẻ."
    ]
  },
  {
    id: "post_2",
    title: "Dấu hiệu nhận biết mèo của bạn đang gặp vấn đề sức khỏe",
    category: "Sức khỏe",
    date: "08 Tháng 5, 2024",
    rawDate: "2024-05-08",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdI7LqK0hWpoGWR6CHGXcdUJh6T7o8hBh22GwQWxvp1YTETsH6NLmfUhkh-37ZfFiYwNKgu2lj5TX-xkbpzYaHT-tAkRy8R2LOqYX-Xeec86qosQ87ss2nsDkiZbxML2QTaYNO_eOITLdaq9l06iadfv1Hisl9JXqtZiFVH0Ch2JuD61b-SHKY-voGUxQecYnc7gsqwRN5j0iC5QZUhlOFJ7G7V16bf__twp2l59e3jqUAIU5PLoqqHw",
    summary: "Đừng bỏ qua những thay đổi nhỏ trong hành vi của mèo. Loài mèo nổi tiếng là bậc thầy che giấu cơn đau, do đó chủ nuôi cần hết sức nhạy bén.",
    author: "Bác sĩ Trần Mỹ Linh",
    readTime: "7 phút đọc",
    tags: ["#meonho", "#vaccine", "#petcare"],
    content: [
      "Khác với loài chó thường bộc lộ rõ ràng khi đau đớn, mèo có bản năng sinh tồn hoang dã khiến chúng luôn tìm cách che giấu sự yếu ớt và bệnh tật của mình. Đến khi các biểu hiện rõ ràng ra ngoài thì thường bệnh đã tiến triển khá nặng.",
      "Biểu hiện đầu tiên là sự thay đổi thói quen ăn uống và đi vệ sinh. Nếu mèo bỗng dưng bỏ ăn quá 24h, hoặc đi tiểu ngoài khay cát một cách bất thường, đây có thể là dấu hiệu của bệnh viêm đường tiết niệu nguy hiểm.",
      "Một dấu hiệu quan trọng khác là mức độ hoạt động. Chú mèo vốn năng động bỗng dưng lầm lì, chỉ trốn vào các góc tối ẩm ướt và phản ứng cáu gắt khi bạn chạm vào người. Rất có thể bé đang chịu đựng một cơn đau cơ khớp hoặc sốt âm ỉ.",
      "Mắt và bộ lông cũng nói lên nhiều điều. Mắt xuất hiện màng thứ ba (mí mắt thứ 3 nhô lên che một phần mắt), lông xơ xác không còn bóng mượt do bé mệt mỏi không buồn tự chải chuốt là hồi chuông cảnh báo khẩn cấp."
    ],
    tips: [
      "Thường xuyên kiểm tra tai, mắt và nướu của mèo. Nướu khỏe mạnh phải có màu hồng nhạt.",
      "Quan sát tư thế nằm của mèo, tư thế thu mình 'bánh mì' cứng đờ thường là dấu hiệu đau bụng.",
      "Khám sức khỏe định kỳ mỗi 6 tháng tại PawHome để phát hiện sớm các bệnh nội khoa."
    ]
  },
  {
    id: "post_3",
    title: "Lên kế hoạch du lịch cùng thú cưng: Những điều cần lưu ý",
    category: "Đời sống",
    date: "02 Tháng 5, 2024",
    rawDate: "2024-05-02",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8Eg9VB4DKlsSSSleIYaTnYY77ViGhl0TfR84C4GkxVcOCLbqGHmoJuI7_ViOYcWr8gLGA8pSN-J3B1k5MHR3Xk32mrbgndPyeFpYdsySn_c5aSHQghugtL5zFIQi9DSUZ2BFLyuFW5aqRZjQmph5PEzjURXSAWquNBcj8aPde9L7S_9ME1PsW6cOTkL4GtukoLLw5daqVmSH_eE1hfWnETfyJZkQKxYSI14r-dVYZeGtH09U0CgXYSw",
    summary: "Mọi thứ bạn cần chuẩn bị cho một chuyến đi an toàn, thoải mái và tràn đầy niềm vui cùng người bạn bốn chân tinh nghịch.",
    author: "Blogger thú cưng Vy Thảo",
    readTime: "5 phút đọc",
    tags: ["#chamsoccho", "#petcare"],
    content: [
      "Kỳ nghỉ lễ đang đến gần và bạn không muốn để bé cưng bơ vơ ở nhà? Mang thú cưng đi du lịch cùng là ý tưởng tuyệt vời để thắt chặt tình cảm, nhưng cũng đòi hỏi khâu chuẩn bị vô cùng chu đáo để tránh những sự cố dở khóc dở cười.",
      "Đầu tiên, hãy đảm bảo khách sạn hoặc homestay nơi bạn đến hoàn toàn chào đón vật nuôi (Pet-friendly). Hãy gọi điện xác nhận kỹ lưỡng về các chi phí phụ thu hoặc quy định cụ thể của nơi lưu trú đối với động vật.",
      "Chuẩn bị một chiếc balo vận chuyển hoặc lồng hàng không chắc chắn, có lỗ thông hơi tốt và vừa vặn với tầm vóc của bé. Hãy đặt vào đó một chiếc áo cũ có mùi của bạn để giúp bé cảm thấy an tâm, bớt hoảng sợ khi di chuyển đường dài.",
      "Đừng quên mang theo túi y tế sơ cứu mini bao gồm: thuốc chống say xe cho thú nuôi, bông băng gạc, cồn sát trùng, và thông tin liên lạc của các phòng khám thú y gần nhất tại địa điểm du lịch."
    ],
    tips: [
      "Không cho thú cưng ăn no trong vòng 3 tiếng trước giờ khởi hành để tránh say xe, nôn mửa.",
      "Luôn đeo vòng cổ có khắc tên của bạn và số điện thoại liên hệ để phòng tránh lạc mất bé.",
      "Mang theo đồ ăn hạt quen thuộc để tránh bé bị rối loạn tiêu hóa do thay đổi nguồn nước và thức ăn mới."
    ]
  },
  {
    id: "post_4",
    title: "Top 10 thực phẩm tốt nhất giúp bộ lông mèo bóng mượt",
    category: "Dinh dưỡng",
    date: "28 Tháng 4, 2024",
    rawDate: "2024-04-28",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDu1zgkfOJHpjCoHePZ7tm8T7y-Uwv4zx2gLxSQ24l4Scuve3-FirjGvaMbvEB28afcFQq0ACWWwEcq9T7E_naoWzWiu8GeLBJblGFOrl1u4MifwAlI8smfdWq8yQjeBYRqMRyc6RyS0-3cxXzMV1u4mjWoCOJgd3Xizojw-R5zdxoXBl7Q_73NZBEzYJ3hKrS6ovl-tHshaWOgNF5tad3zkYNVWksVKOsqFans9AeFR3LCHYNlR2pNFw",
    summary: "Bí quyết từ các chuyên gia dinh dưỡng thú cưng để mèo có bộ lông khỏe mạnh, giảm thiểu xơ rối và rụng lông đáng kể.",
    author: "Bác sĩ thú y Nguyễn Văn An",
    readTime: "5 phút đọc",
    tags: ["#meonho", "#thucpham", "#petcare"],
    content: [
      "Bộ lông phản ánh chân thực trạng thái sức khỏe bên trong của chú mèo. Một bộ lông xơ xác, dễ gãy rụng thường là dấu hiệu cơ thể đang thiếu hụt các axit béo thiết yếu và dưỡng chất vi lượng.",
      "Cá hồi và dầu cá hồi đứng đầu danh sách siêu thực phẩm dành cho lông mèo. Chúng chứa hàm lượng Omega-3 và Omega-6 dồi dào, giúp nuôi dưỡng nang lông từ sâu bên trong và làm dịu vùng da khô ráp, kích ứng.",
      "Lòng đỏ trứng gà (chỉ nên cho ăn chín) là nguồn cung cấp Biotin tuyệt vời, thúc đẩy quá trình tái tạo keratin - thành phần cấu tạo chính của sợi lông. Cho mèo ăn 1 lòng đỏ trứng chín mỗi tuần sẽ thấy lông cải thiện rõ rệt.",
      "Thịt ức gà và thịt bò cung cấp nguồn protein chất lượng cao giúp sợi lông chắc khỏe từ gốc. Hãy kết hợp thêm một chút bí đỏ xay nhuyễn để bổ sung Vitamin A, C giúp làn da dưới lớp lông luôn khỏe mạnh."
    ],
    tips: [
      "Không bao giờ cho mèo ăn lòng trắng trứng sống vì chứa avidin làm cản trở hấp thu Biotin.",
      "Chải lông hàng ngày giúp kích thích tuần hoàn máu dưới da, phân phối đều dầu tự nhiên trên lông.",
      "Đảm bảo cung cấp đủ nước sạch để da mèo không bị khô nứt."
    ]
  },
  {
    id: "post_5",
    title: "Làm sao để hạn chế tình trạng rụng lông ở chó Alaska",
    category: "Sức khỏe",
    date: "25 Tháng 4, 2024",
    rawDate: "2024-04-25",
    image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=600",
    summary: "Chó Alaska sở hữu bộ lông hai lớp siêu dày, việc rụng lông diễn ra quanh năm. Học cách chải chuốt và tắm rửa đúng cách để giải cứu căn nhà của bạn.",
    author: "Chuyên viên Grooming Minh Thư",
    readTime: "6 phút đọc",
    tags: ["#chamsoccho", "#petcare"],
    content: [
      "Chó Alaska Malamute mang dòng máu kéo xe tuyết vùng cực bắc lạnh giá, do đó chúng sở hữu bộ lông 2 lớp vô cùng đặc biệt: lớp lông tơ mịn giữ ấm bên trong và lớp lông cứng chống thấm nước bên ngoài. Khi nuôi ở khí hậu nóng ẩm như Việt Nam, chúng rụng lông rất nhiều để giải nhiệt.",
      "Để kiểm soát lượng lông rụng bay khắp nhà, bạn cần trang bị lược chải lông chuyên dụng (lược cào hoặc lược lấy lông rụng hai tầng). Hãy chải lông cho bé ít nhất 1-2 lần mỗi ngày, chải ngược chiều lông mọc trước để loại bỏ lông chết dưới sâu, sau đó chải xuôi chiều lông.",
      "Tắm rửa định kỳ mỗi 1-2 tuần với sữa tắm chuyên dụng dưỡng lông. Sau khi tắm, bắt buộc phải sấy khô hoàn toàn bộ lông bằng máy sấy công suất lớn chuyên dụng. Tuyệt đối không để ẩm dưới da vì dễ gây viêm da nấm móng.",
      "Bổ sung dầu dừa hoặc dầu cá hồi vào thức ăn hàng ngày giúp củng cố lớp biểu bì da chân lông săn chắc hơn, giảm tỉ lệ rụng lông sinh lý do thời tiết lên tới 40%."
    ],
    tips: [
      "Tuyệt đối không cạo trọc lông chó Alaska trừ khi có chỉ định điều trị bệnh da liễu của bác sĩ.",
      "Giữ môi trường sống mát mẻ, lý tưởng nhất là cho bé nằm phòng điều hòa vào ban ngày nắng nóng.",
      "Hạn chế cho bé ăn thức ăn mặn vì muối làm tăng lượng lông rụng đột biến."
    ]
  },
  {
    id: "post_6",
    title: "Cách chăm sóc mèo sơ sinh mất mẹ chu đáo từ A đến Z",
    category: "Đời sống",
    date: "18 Tháng 4, 2024",
    rawDate: "2024-04-18",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600",
    summary: "Nuôi bộ mèo sơ sinh mất mẹ là một thử thách vô cùng lớn. Hướng dẫn chi tiết cách pha sữa, giữ ấm và kích thích mèo con đi vệ sinh đúng cách.",
    author: "Bác sĩ Trần Mỹ Linh",
    readTime: "8 phút đọc",
    tags: ["#meonho", "#petcare"],
    content: [
      "Mèo sơ sinh dưới 1 tháng tuổi vô cùng yếu ớt và phụ thuộc hoàn toàn vào mèo mẹ. Khi thiếu đi hơi ấm và dòng sữa mẹ, tỉ lệ tử vong của các bé rất cao nếu không được chăm sóc đúng phương pháp kỹ thuật.",
      "Nhiệt độ là yếu tố sinh tử đầu tiên. Mèo con chưa có khả năng tự điều hòa thân nhiệt. Bạn cần làm một chiếc tổ ấm bằng hộp giấy, lót khăn mềm và lắp đèn sưởi ấm hồng ngoại 25W hoặc túi sưởi ấm bọc khăn đặt dưới ổ. Duy trì nhiệt độ ổ từ 30 - 32 độ C.",
      "Dinh dưỡng: Chỉ sử dụng sữa bột chuyên dụng cho mèo con (sữa bột KMR, Bio Milk), tuyệt đối không dùng sữa bò hoặc sữa đặc có đường vì mèo con không tiêu hóa được lactose dẫn đến tiêu chảy tử vong. Cho bú bình cách mỗi 2-3 tiếng/lần kể cả ban đêm.",
      "Kích thích vệ sinh: Mèo con chưa tự đi vệ sinh được. Sau mỗi bữa ăn, bạn hãy dùng bông gòn ẩm, ấm vuốt nhẹ nhàng vùng hậu môn sinh dục của bé mô phỏng động tác liếm láp của mèo mẹ để kích thích bé tè và đi ngoài."
    ],
    tips: [
      "Luôn đun sôi tiệt trùng bình sữa trước khi pha cho bé bú.",
      "Đặt mèo con nằm sấp khi cho bú, tuyệt đối không ngửa cổ bé lên giống em bé vì dễ gây sặc sữa vào phổi.",
      "Giữ vệ sinh ổ lót khăn khô thoáng sạch sẽ hàng ngày."
    ]
  },
  {
    id: "post_7",
    title: "Lịch tiêm phòng vaccine đầy đủ nhất cho chó mèo năm 2026",
    category: "Sức khỏe",
    date: "10 Tháng 4, 2024",
    rawDate: "2024-04-10",
    image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=600",
    summary: "Đừng để các căn bệnh truyền nhiễm nguy hiểm tước đi sinh mạng của bé cưng. Tìm hiểu lịch tiêm phòng chuẩn y khoa tại PawHome.",
    author: "Bác sĩ Trần Mỹ Linh",
    readTime: "7 phút đọc",
    tags: ["#vaccine", "#chamsoccho", "#meonho"],
    content: [
      "Tiêm phòng vaccine đầy đủ là lá chắn phòng thủ kiên cố nhất giúp thú cưng của bạn chống chọi lại các virus truyền nhiễm chết chóc như Parvo, Care ở chó hay Giảm bạch cầu (FPV) ở mèo.",
      "Đối với Cún cưng: Lịch tiêm chuẩn bao gồm 3 mũi vaccine kết hợp (5-trong-1 hoặc 7-trong-1) bắt đầu từ 6-8 tuần tuổi, mỗi mũi cách nhau 3-4 tuần. Sau đó tiêm phòng dại khi bé được 3 tháng tuổi. Nhắc lại hàng năm 1 mũi kết hợp và 1 mũi dại.",
      "Đối với Mèo cưng: Bắt đầu tiêm mũi 4 bệnh kết hợp từ 8 tuần tuổi, hoàn thành lộ trình 3 mũi cách nhau 4 tuần, sau đó tiêm phòng dại. Việc nhắc lại định kỳ hàng năm là cực kỳ quan trọng để duy trì kháng thể miễn dịch.",
      "Lưu ý trước khi tiêm: Bé cưng phải hoàn toàn khỏe mạnh, không sốt, không tiêu chảy, đã được tẩy giun trước đó ít nhất 1 tuần. Sau khi tiêm cần theo dõi sát tại phòng khám 30 phút để kiểm soát phản ứng sốc thuốc nếu có."
    ],
    tips: [
      "Giữ sổ tiêm chủng cẩn thận và tuân thủ đúng ngày hẹn nhắc lịch của bác sĩ.",
      "Không tắm cho thú cưng trong vòng 7 ngày sau khi tiêm vaccine.",
      "Hạn chế cho bé tiếp xúc với chó mèo khác khi chưa hoàn thành đủ 3 mũi tiêm cơ bản."
    ]
  }
];

export default function BlogPage({ isDarkMode }) {
  // State managers
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [activeTag, setActiveTag] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null); // Inside reader modal
  const [sidebarEmail, setSidebarEmail] = useState("");
  const [bottomEmail, setBottomEmail] = useState("");
  const [signupMessage, setSignupMessage] = useState("");
  const [signupType, setSignupType] = useState("success");

  const itemsPerPage = 4;

  // Dynamic Ratings DB
  const [ratingsDB, setRatingsDB] = useState({
    "british-shorthair": [
      { id: 1, name: "Khánh Huyền", rating: 5, date: "22/10/2024", comment: "Cảm ơn bác sĩ! Bé mèo nhà mình chải lông đúng cách giờ không còn rụng vung vãi nữa.", helpful: 14, userVoted: false },
      { id: 2, name: "Minh Quân", rating: 4, date: "24/10/2024", comment: "Thông tin bổ ích, mình dùng lược slicker thấy bám lông rụng rất tốt.", helpful: 8, userVoted: false },
      { id: 3, name: "Thanh Trúc", rating: 5, date: "25/10/2024", comment: "Bác sĩ hướng dẫn siêu chi tiết, hình ảnh minh họa cũng rất trực quan.", helpful: 3, userVoted: false }
    ],
    "featured": [
      { id: 1, name: "Hoàng Long", rating: 5, date: "18/11/2024", comment: "Bài viết xuất sắc! Rất mong website ra thêm nhiều bài viết chất lượng thế này.", helpful: 9, userVoted: false },
      { id: 2, name: "Ngọc Mai", rating: 5, date: "20/11/2024", comment: "Tuyệt vời, cực kỳ hữu dụng cho người mới nuôi chó mèo như mình.", helpful: 5, userVoted: false }
    ],
    "post_1": [
      { id: 1, name: "Văn Đức", rating: 5, date: "11/09/2024", comment: "Kiến thức bổ ích! Áp dụng ngay cho bé Cún nhà mình thấy hiệu quả rõ rệt.", helpful: 11, userVoted: false },
      { id: 2, name: "Kim Chi", rating: 4, date: "15/09/2024", comment: "Bài viết viết rất tâm huyết, cảm ơn tác giả nhiều nhé.", helpful: 4, userVoted: false }
    ],
    "post_2": [
      { id: 1, name: "Quỳnh Anh", rating: 5, date: "05/10/2024", comment: "Rất hay, mình đã chia sẻ cho hội yêu chó mèo trên Facebook.", helpful: 15, userVoted: false }
    ],
    "post_3": [
      { id: 1, name: "Sơn Tùng", rating: 5, date: "19/10/2024", comment: "Cực kỳ chi tiết, súc tích và dễ áp dụng thực tế.", helpful: 7, userVoted: false }
    ],
    "post_4": [
      { id: 1, name: "Hoài An", rating: 5, date: "12/11/2024", comment: "Chất lượng bài viết quá chuẩn, cảm ơn PawHome rất nhiều.", helpful: 8, userVoted: false }
    ],
    "post_5": [
      { id: 1, name: "Anh Tuấn", rating: 5, date: "15/11/2024", comment: "Đầy đủ thông tin cần thiết, giao diện đọc bài cũng rất đẹp.", helpful: 6, userVoted: false }
    ]
  });

  const [ratingInput, setRatingInput] = useState(5);
  const [ratingHover, setRatingHover] = useState(null);
  const [reviewName, setReviewName] = useState("");
  const [reviewComment, setReviewComment] = useState("");

  // Categories metadata with item count calculated dynamically
  const categoriesList = useMemo(() => {
    const counts = {
      "Tất cả": BLOG_ARTICLES.length - 1, // Exclude featured if we want, or include. Let's include everything
      "Dinh dưỡng": 0,
      "Huấn luyện": 0,
      "Sức khỏe": 0,
      "Đời sống": 0,
    };

    BLOG_ARTICLES.forEach(art => {
      if (counts[art.category] !== undefined) {
        counts[art.category]++;
      }
    });

    counts["Tất cả"] = BLOG_ARTICLES.length; // Correct total count

    return [
      { name: "Tất cả", count: counts["Tất cả"] },
      { name: "Dinh dưỡng", count: counts["Dinh dưỡng"] },
      { name: "Huấn luyện", count: counts["Huấn luyện"] },
      { name: "Sức khỏe", count: counts["Sức khỏe"] },
      { name: "Đời sống", count: counts["Đời sống"] },
    ];
  }, []);

  // Filtered and searched articles (excluding the main featured article to prevent duplication if desired, or displaying all)
  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter(art => {
      // Search text match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = query === "" || 
        art.title.toLowerCase().includes(query) || 
        art.summary.toLowerCase().includes(query) ||
        art.category.toLowerCase().includes(query) ||
        art.tags.some(t => t.toLowerCase().includes(query));

      // Category match
      const matchesCategory = activeCategory === "Tất cả" || art.category === activeCategory;

      // Tag match
      const matchesTag = !activeTag || art.tags.includes(activeTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchQuery, activeCategory, activeTag]);

  // Featured article (always first matching, or specific one)
  const featuredArticle = useMemo(() => {
    return BLOG_ARTICLES.find(a => a.id === "featured") || BLOG_ARTICLES[0];
  }, []);

  // Pagination slicing
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage) || 1;
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredArticles.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredArticles, currentPage]);

  // Handle Search Input Change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // reset to page 1 on search
    setActiveTag(null); // clear tag filter
  };

  // Handle Category Filter
  const handleCategorySelect = (categoryName) => {
    setActiveCategory(categoryName);
    setCurrentPage(1);
    setActiveTag(null); // clear tag filter
  };

  // Handle Tag Filter
  const handleTagSelect = (tag) => {
    if (activeTag === tag) {
      setActiveTag(null); // toggle off
    } else {
      setActiveTag(tag);
      setActiveCategory("Tất cả"); // reset category to prevent empty conflict
      setCurrentPage(1);
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveCategory("Tất cả");
    setActiveTag(null);
    setCurrentPage(1);
  };

  // Newsletter submits
  const handleSidebarNewsletter = (e) => {
    e.preventDefault();
    if (!sidebarEmail || !sidebarEmail.includes("@")) {
      showToast("Vui lòng nhập địa chỉ email hợp lệ.", "error");
      return;
    }
    setSidebarEmail("");
    showToast("Cảm ơn bạn! Bản tin mẹo vặt hàng tuần đã được đăng ký thành công.", "success");
  };

  const handleBottomNewsletter = (e) => {
    e.preventDefault();
    if (!bottomEmail || !bottomEmail.includes("@")) {
      showToast("Vui lòng nhập địa chỉ email hợp lệ.", "error");
      return;
    }
    setBottomEmail("");
    showToast("Tuyệt vời! Bạn đã đăng ký và sẽ nhận được Cẩm nang chăm sóc thú cưng PDF trong ít phút.", "success");
  };

  const showToast = (msg, type = "success") => {
    setSignupMessage(msg);
    setSignupType(type);
    setTimeout(() => {
      setSignupMessage("");
    }, 5000);
  };

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      showToast("Vui lòng nhập nội dung đánh giá của bạn.", "error");
      return;
    }
    
    const articleId = selectedArticle.id;
    const authorName = reviewName.trim() || "Bạn đọc ẩn danh";
    const today = new Date();
    const formattedDate = `${today.getDate() < 10 ? '0' + today.getDate() : today.getDate()}/${(today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)}/${today.getFullYear()}`;
    
    const newRating = {
      id: Date.now(),
      name: authorName,
      rating: ratingInput,
      date: formattedDate,
      comment: reviewComment.trim(),
      helpful: 0,
      userVoted: false
    };

    setRatingsDB(prev => ({
      ...prev,
      [articleId]: [newRating, ...(prev[articleId] || [])]
    }));

    setReviewName("");
    setReviewComment("");
    setRatingInput(5);
    showToast("Cảm ơn bạn đã gửi đánh giá! Ý kiến của bạn đã được ghi nhận.", "success");
  };

  const handleHelpfulClick = (commentId) => {
    const articleId = selectedArticle.id;
    setRatingsDB(prev => {
      const updatedList = (prev[articleId] || []).map(item => {
        if (item.id === commentId) {
          if (item.userVoted) {
            return { ...item, helpful: item.helpful - 1, userVoted: false };
          } else {
            return { ...item, helpful: item.helpful + 1, userVoted: true };
          }
        }
        return item;
      });
      return {
        ...prev,
        [articleId]: updatedList
      };
    });
  };

  if (selectedArticle) {
    const relatedArticles = BLOG_ARTICLES.filter(art => art.id !== selectedArticle.id).slice(0, 3);
    
    return (
      <div 
        className={`transition-all ${isDarkMode ? 'bg-dark text-white' : 'text-slate-800'}`} 
        style={{ 
          paddingTop: '80px',
          backgroundColor: isDarkMode ? '#0d1c2f' : '#F1F5F9',
          fontFamily: '"Bricolage Grotesque", system-ui, sans-serif'
        }}
      >
        
        {/* Toast Alert overlay for dynamic signups */}
        {signupMessage && (
          <div 
            className={`position-fixed bottom-0 end-0 p-3 m-3 text-white rounded-24 border shadow-lg d-flex align-items-center gap-3 fade-in ${signupType === 'error' ? 'bg-danger border-danger' : 'bg-success border-success'}`}
            style={{ zIndex: 1050, maxWidth: '400px' }}
          >
            <span className="material-symbols-outlined fs-4">
              {signupType === 'error' ? 'error' : 'verified_user'}
            </span>
            <div>
              <p className="m-0 fw-bold small">
                {signupType === 'error' ? 'Lỗi!' : 'Thành công!'}
              </p>
              <p className="m-0 text-white-50" style={{ fontSize: '11px', fontWeight: 600 }}>{signupMessage}</p>
            </div>
          </div>
        )}

        <main className="max-w-[1440px] mx-auto px-4 md:px-12 py-12">
          
          {/* Back Button and Breadcrumb Header */}
          <div className="mb-6 text-left">
            <button 
              onClick={() => {
                setSelectedArticle(null);
                window.scrollTo({ top: 0 });
              }}
              className="text-white font-bold px-5 py-2.5 rounded-full flex items-center gap-2 transition-all border-0 text-sm shadow-md hover:scale-105"
              style={{ backgroundColor: '#F97316', borderRadius: '9999px' }}
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Quay lại danh sách
            </button>
          </div>

          {/* Hero Section */}
          <section className="mb-12">
            <div className="flex flex-col gap-6 text-left">
              <div className="flex items-center gap-4">
                <span 
                  className="text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{ backgroundColor: '#1E3A8A' }}
                >
                  {selectedArticle.category}
                </span>
                <span className="text-sm" style={{ color: isDarkMode ? '#cbd5e1' : '#334155' }}>
                  {selectedArticle.date}
                </span>
              </div>
              <h1 
                className="text-3xl md:text-5xl font-extrabold leading-tight max-w-4xl"
                style={{ color: isDarkMode ? '#ffffff' : '#1E3A8A' }}
              >
                {selectedArticle.title}
              </h1>

            </div>
          </section>

          {/* Content Area Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Article Content (8 Columns) */}
            <article className="lg:col-span-8">
              <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 rich-text text-left">
                
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div className="w-full md:w-1/3 shrink-0">
                    <img 
                      className="w-full h-full object-cover rounded-3xl shadow-md" 
                      alt={selectedArticle.title} 
                      src={selectedArticle.image}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1">
                    <p 
                      className="text-lg md:text-xl italic border-l-4 border-orange-500 pl-6 leading-relaxed"
                      style={{ color: isDarkMode ? '#f8fafc' : '#0f172a', fontWeight: '500' }}
                    >
                      {selectedArticle.summary}
                    </p>
                  </div>
                </div>

                {/* Main Content paragraphs */}
                {selectedArticle.id === "british-shorthair" ? (
                  <>
                    <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4" style={{ color: isDarkMode ? '#93c5fd' : '#1E3A8A' }}>
                      Tại sao cần chăm sóc lông định kỳ?
                    </h2>
                    <p 
                      className="leading-relaxed mb-6"
                      style={{ color: isDarkMode ? '#cbd5e1' : '#334155', fontSize: '1.05rem', fontWeight: '450' }}
                    >
                      Mặc dù là giống mèo lông ngắn, nhưng mật độ lông của chúng cực kỳ dày. Nếu không được chải chuốt thường xuyên, lớp lông chết sẽ tích tụ, gây xơ rối và tăng nguy cơ hình thành búi lông trong dạ dày (hairballs) khi mèo tự liếm lông.
                    </p>

                    <div className="my-8 rounded-2xl overflow-hidden shadow-md">
                      <img 
                        className="w-full h-auto" 
                        alt="Chải lông mèo Anh lông ngắn" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNizUONIf3Gwr27SEwCF6x7SkIoc_bXV7U6aQJrwUy2jtb66LdDCjrrL9gCEU-I7fO7AksouK9_1Y2P3rXNzq5rVg7T_jYi44i2gkxRpfyEqKCIgrCtvtVOC1DgOn4T0FK1w-FPLgWjlFMbxxwCPbjn2VAMyIgLRG-_oD7sd-_6p4OU8_8ZkG0thsz_bgt7Xry5uax7IQenxzzg9mg1tu_U0U-xAiP1sQZg5mi43jbpx-tjKaYMofClg"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4" style={{ color: isDarkMode ? '#93c5fd' : '#1E3A8A' }}>
                      Các bước chải lông đúng cách
                    </h2>
                    <ul 
                      className="list-disc pl-6 mb-6 space-y-2"
                      style={{ color: isDarkMode ? '#cbd5e1' : '#334155', fontSize: '1.05rem' }}
                    >
                      <li><strong>Chọn lược phù hợp:</strong> Sử dụng lược răng thưa để gỡ rối sơ bộ và lược chải lông chuyên dụng (slicker brush) để loại bỏ lông chết.</li>
                      <li><strong>Tần suất:</strong> Nên chải lông ít nhất 2-3 lần mỗi tuần. Vào mùa thay lông (xuân và thu), bạn cần thực hiện hàng ngày.</li>
                      <li><strong>Hướng chải:</strong> Luôn chải theo chiều lông mọc để tránh làm mèo bị đau hoặc tổn thương da.</li>
                      <li><strong>Kiểm tra da:</strong> Trong quá trình chải, hãy quan sát các dấu hiệu bất thường như mẩn đỏ, bọ chét hay các nốt sưng.</li>
                    </ul>

                    <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4" style={{ color: isDarkMode ? '#93c5fd' : '#1E3A8A' }}>
                      Chế độ dinh dưỡng cho bộ lông bóng mượt
                    </h2>
                    <p 
                      className="leading-relaxed mb-6"
                      style={{ color: isDarkMode ? '#cbd5e1' : '#334155', fontSize: '1.05rem', fontWeight: '450' }}
                    >
                      Lông đẹp bắt đầu từ bên trong. Một chế độ ăn giàu Protein, Omega-3 và Omega-6 sẽ giúp sợi lông chắc khỏe từ gốc. Bạn có thể bổ sung thêm dầu cá hồi vào bữa ăn hàng ngày của bé.
                    </p>
                  </>
                ) : (
                  <div 
                    className="space-y-4 leading-relaxed"
                    style={{ color: isDarkMode ? '#cbd5e1' : '#334155', fontSize: '1.05rem' }}
                  >
                    {selectedArticle.content.map((p, i) => (
                      <p key={i} className="mb-4" style={{ fontWeight: '450' }}>{p}</p>
                    ))}
                  </div>
                )}

                {/* Highlight/Tips Box */}
                {selectedArticle.tips && selectedArticle.tips.length > 0 && (
                  <div 
                    className="p-6 rounded-2xl border-l-4 mt-8"
                    style={{ 
                      backgroundColor: isDarkMode ? '#0f172a' : '#F1F5F9',
                      borderColor: '#1E3A8A'
                    }}
                  >
                    <h3 className="font-bold mb-2" style={{ color: isDarkMode ? '#93c5fd' : '#1E3A8A' }}>
                      Lưu ý quan trọng:
                    </h3>
                    <p 
                      className="mb-0 italic"
                      style={{ color: isDarkMode ? '#cbd5e1' : '#334155', fontWeight: '500' }}
                    >
                      {selectedArticle.tips[0]}
                    </p>
                  </div>
                )}

                {/* Social Sharing */}
                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold" style={{ color: isDarkMode ? '#cbd5e1' : '#334155' }}>Chia sẻ bài viết:</span>
                    <button 
                      onClick={() => showToast("Đã chia sẻ lên mạng xã hội!", "success")}
                      className="w-10 h-10 rounded-full flex items-center justify-center border-0 transition-all p-0 shadow-none"
                      style={{ 
                        backgroundColor: isDarkMode ? '#1e293b' : '#F1F5F9',
                        color: isDarkMode ? '#93c5fd' : '#1E3A8A'
                      }}
                    >
                      <span className="material-symbols-outlined text-xl">share</span>
                    </button>
                    <button 
                      onClick={() => showToast("Đã sao chép liên kết vào bộ nhớ tạm!", "success")}
                      className="w-10 h-10 rounded-full flex items-center justify-center border-0 transition-all p-0 shadow-none"
                      style={{ 
                        backgroundColor: isDarkMode ? '#1e293b' : '#F1F5F9',
                        color: isDarkMode ? '#93c5fd' : '#1E3A8A'
                      }}
                    >
                      <span className="material-symbols-outlined text-xl">link</span>
                    </button>
                  </div>
                  <div className="flex gap-2">
                    {selectedArticle.tags.map(t => (
                      <span 
                        key={t} 
                        className={`px-3 py-1 rounded text-xs font-semibold ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}
                        style={{ color: isDarkMode ? '#e2e8f0' : '#475569' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Author Bio */}
                <div 
                  className="mt-12 p-8 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-6"
                  style={{ backgroundColor: isDarkMode ? '#0f172a' : '#F1F5F9' }}
                >
                  <img 
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" 
                    alt={selectedArticle.author} 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAczF93ue_MRwy6kXur0eTDeGwc3D9e_InsTK_1ZgCCb9KvFFSJPQ_RtNmSx54lkl4AeqNrStPCdeXcv3XJLpm8ClJFqkfgUGmiLqsIh7WSgMxGzwbEzomnpYMLmjOtHJF-Sj5TMe5wsOndKYqZMgc_uOL8LPIkiXbdMYsFl3zqwOx68JL9jjvuVeuT94xFgDijaJ2yEsvpO0UMYMRPov6JIITPZf6l-Q5umUfQSKeQw10QR418zfG2WQ"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xl font-extrabold mb-2" style={{ color: isDarkMode ? '#93c5fd' : '#1E3A8A' }}>
                      {selectedArticle.author}
                    </h4>
                    <p 
                      className="text-sm mb-4"
                      style={{ color: isDarkMode ? '#cbd5e1' : '#334155', fontWeight: '450' }}
                    >
                      {selectedArticle.id === "british-shorthair" 
                        ? "Chuyên gia dinh dưỡng và chăm sóc thú cưng tại PawHome với hơn 10 năm kinh nghiệm trong ngành y tế thú y cao cấp."
                        : "Chuyên gia y tế và chăm sóc sức khỏe vật nuôi cao cấp tại PawHome."
                      }
                    </p>
                    <span className="font-bold text-sm hover:underline cursor-pointer" style={{ color: '#F97316' }}>
                      Xem thêm bài viết của tác giả
                    </span>
                  </div>
                </div>

                {/* Đánh giá & Nhận xét */}
                <div 
                  className="mt-12 p-6 md:p-8 rounded-3xl border text-left transition-all"
                  style={{ 
                    backgroundColor: isDarkMode ? '#11223f' : '#ffffff',
                    borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : '#e2e8f0'
                  }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500">
                      <Star className="w-6 h-6 fill-current" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold" style={{ color: isDarkMode ? '#93c5fd' : '#1E3A8A' }}>
                        Đánh giá bài viết
                      </h3>
                      <p className="text-xs" style={{ color: isDarkMode ? '#cbd5e1' : '#64748b' }}>
                        Ý kiến đóng góp từ các bạn đọc yêu thú cưng
                      </p>
                    </div>
                  </div>

                  {/* Rating Dashboard Stats & Form */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
                    
                    {/* Overall Score (5 Cols) */}
                    <div 
                      className="md:col-span-5 flex flex-col items-center md:items-start p-5 rounded-2xl border w-full transition-all"
                      style={{
                        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#ffffff',
                        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : '#e2e8f0'
                      }}
                    >
                      <div className="text-center md:text-left">
                        <span className="text-5xl font-black text-orange-500 tracking-tight block mb-1">
                          {(() => {
                            const reviews = ratingsDB[selectedArticle.id] || [];
                            const total = reviews.length;
                            return total > 0 
                              ? (reviews.reduce((sum, item) => sum + item.rating, 0) / total).toFixed(1)
                              : "5.0";
                          })()}
                        </span>
                        <div className="flex items-center gap-1 justify-center md:justify-start mb-2">
                          {(() => {
                            const reviews = ratingsDB[selectedArticle.id] || [];
                            const total = reviews.length;
                            const avg = total > 0 
                              ? Math.round(reviews.reduce((sum, item) => sum + item.rating, 0) / total)
                              : 5;
                            return Array.from({ length: 5 }).map((_, idx) => (
                              <Star 
                                key={idx} 
                                className={`w-5 h-5 ${idx < avg ? 'text-orange-500 fill-current' : 'text-slate-300 dark:text-slate-700'}`} 
                              />
                            ));
                          })()}
                        </div>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-4">
                          {(ratingsDB[selectedArticle.id] || []).length} lượt đánh giá từ độc giả
                        </span>
                      </div>

                      {/* Distribution bar chart */}
                      <div className="w-full space-y-2.5">
                        {[5, 4, 3, 2, 1].map(stars => {
                          const reviews = ratingsDB[selectedArticle.id] || [];
                          const total = reviews.length;
                          const count = reviews.filter(r => r.rating === stars).length;
                          const percent = total > 0 ? Math.round((count / total) * 100) : 0;
                          return (
                            <div key={stars} className="flex items-center text-xs font-medium w-full">
                              <span className="w-3 text-right text-slate-500 dark:text-slate-400">{stars}</span>
                              <Star className="w-3.5 h-3.5 text-orange-500 fill-current ms-1 me-3 flex-shrink-0" />
                              <div className="flex-grow bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                <div 
                                  className="bg-orange-500 h-full rounded-full transition-all duration-500"
                                  style={{ width: `${percent}%` }}
                                ></div>
                              </div>
                              <span className="w-8 text-right text-slate-500 dark:text-slate-400">{percent}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Write Review Form (7 Cols) */}
                    <form onSubmit={handleRatingSubmit} className="md:col-span-7 space-y-4 w-full">
                      <h4 className="text-sm font-bold tracking-wide uppercase" style={{ color: isDarkMode ? '#93c5fd' : '#1E3A8A' }}>
                        Gửi đánh giá của bạn
                      </h4>
                      
                      {/* Interactive Stars Selector */}
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 text-left">Chọn số sao:</label>
                        <div className="flex items-center gap-2">
                          {Array.from({ length: 5 }).map((_, idx) => {
                            const starValue = idx + 1;
                            const isHighlighted = starValue <= (ratingHover || ratingInput);
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setRatingInput(starValue)}
                                onMouseEnter={() => setRatingHover(starValue)}
                                onMouseLeave={() => setRatingHover(null)}
                                className="p-1 hover:scale-110 transition-transform bg-transparent border-0 outline-none cursor-pointer shadow-none"
                              >
                                <Star 
                                  className={`w-7 h-7 transition-colors duration-200 ${
                                    isHighlighted 
                                      ? 'text-orange-500 fill-current' 
                                      : 'text-slate-300 dark:text-slate-700'
                                  }`} 
                                />
                              </button>
                            );
                          })}
                          <span className="text-xs font-bold ms-2 px-2.5 py-1 rounded bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400">
                            {(() => {
                              const value = ratingHover || ratingInput;
                              if (value === 5) return "Rất xuất sắc!";
                              if (value === 4) return "Hữu ích & Rất hay";
                              if (value === 3) return "Tạm ổn, bình thường";
                              if (value === 2) return "Thông tin chưa chi tiết";
                              return "Không hữu ích chút nào";
                            })()}
                          </span>
                        </div>
                      </div>

                      {/* Form Fields */}
                      <div className="grid grid-cols-1 gap-3">
                        <input 
                          type="text"
                          value={reviewName}
                          onChange={(e) => setReviewName(e.target.value)}
                          placeholder="Nhập tên của bạn (tùy chọn)..."
                          className="w-full border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary text-sm outline-none"
                          style={{
                            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.85)',
                            color: isDarkMode ? '#ffffff' : '#1e293b',
                            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)'
                          }}
                        />
                        <textarea 
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          placeholder="Độc giả thấy bài viết này thế nào? Hãy chia sẻ ý kiến hoặc đóng góp tại đây..."
                          rows={3}
                          required
                          className="w-full border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary text-sm outline-none resize-none"
                          style={{
                            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.85)',
                            color: isDarkMode ? '#ffffff' : '#1e293b',
                            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)'
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        className="text-white font-bold px-6 py-2.5 flex items-center justify-center gap-2 transition-all border-0 text-xs shadow-md hover:scale-105"
                        style={{ backgroundColor: '#F97316', borderRadius: '50px' }}
                      >
                        Gửi đánh giá ngay
                        <span className="material-symbols-outlined text-sm">send</span>
                      </button>
                    </form>
                  </div>

                  {/* Reviews List Section */}
                  <div>
                    <h4 className="text-sm font-bold tracking-wide uppercase mb-4 text-left" style={{ color: isDarkMode ? '#93c5fd' : '#1E3A8A' }}>
                      Độc giả đóng góp ý kiến ({(ratingsDB[selectedArticle.id] || []).length})
                    </h4>

                    {!(ratingsDB[selectedArticle.id] || []).length ? (
                      <div className="text-center py-8 text-muted text-sm italic">
                        Chưa có đánh giá nào cho bài viết này. Hãy là người đầu tiên đóng góp ý kiến!
                      </div>
                    ) : (
                      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {(ratingsDB[selectedArticle.id] || []).map((rev) => {
                          // Simple avatar initials generator
                          const initials = rev.name
                            .split(" ")
                            .map(n => n[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase();

                          return (
                            <div 
                              key={rev.id} 
                              className="p-4 rounded-2xl border flex gap-4 text-left transition-all"
                              style={{ 
                                backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
                                borderColor: isDarkMode ? 'rgba(255,255,255,0.04)' : '#f1f5f9'
                              }}
                            >
                              {/* Avatar Initials */}
                              <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center text-sm font-bold flex-shrink-0">
                                {initials || "ĐA"}
                              </div>

                              {/* Review Content */}
                              <div className="flex-grow">
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm text-dark dark:text-white">{rev.name}</span>
                                    <span className="text-[11px] text-slate-400 font-semibold">{rev.date}</span>
                                  </div>
                                  <div className="flex items-center gap-0.5">
                                    {Array.from({ length: 5 }).map((_, sIdx) => (
                                      <Star 
                                        key={sIdx} 
                                        className={`w-3.5 h-3.5 ${sIdx < rev.rating ? 'text-orange-500 fill-current' : 'text-slate-300 dark:text-slate-800'}`} 
                                      />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2 font-medium">
                                  {rev.comment}
                                </p>

                                {/* Helpful interactive voting */}
                                <div className="flex items-center justify-start">
                                  <button
                                    onClick={() => handleHelpfulClick(rev.id)}
                                    className="p-0 border-0 bg-transparent flex items-center gap-1.5 hover:opacity-80 transition-all shadow-none"
                                    style={{ color: rev.userVoted ? '#F97316' : '#64748b' }}
                                  >
                                    <span className="material-symbols-outlined text-[16px] leading-none">
                                      {rev.userVoted ? 'thumb_up_filled' : 'thumb_up'}
                                    </span>
                                    <span className="text-xs font-bold">
                                      Hữu ích ({rev.helpful})
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Back Button */}
                <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-start">
                  <button 
                    onClick={() => {
                      setSelectedArticle(null);
                      window.scrollTo({ top: 0 });
                    }}
                    className="text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 transition-all border-0 text-sm shadow-md hover:scale-105"
                    style={{ backgroundColor: '#F97316', borderRadius: '9999px' }}
                  >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Quay lại danh sách bài viết
                  </button>
                </div>

              </div>
            </article>

            {/* Sidebar (4 Columns) */}
            <aside className="lg:col-span-4 space-y-8 text-left">
              
              {/* Related Posts */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: isDarkMode ? '#93c5fd' : '#1E3A8A' }}>
                  <span className="material-symbols-outlined">auto_stories</span>
                  Bài viết liên quan
                </h3>
                <div className="space-y-6">
                  {relatedArticles.map((art) => (
                    <div 
                      key={art.id} 
                      onClick={() => {
                        setSelectedArticle(art);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex gap-4 group cursor-pointer"
                    >
                      <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden">
                        <img 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                          alt={art.title} 
                          src={art.image}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 
                          className="text-xs font-bold transition-colors line-clamp-2 leading-snug"
                          style={{ color: isDarkMode ? '#f1f5f9' : '#334155' }}
                        >
                          {art.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 mt-1">
                          {art.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold mb-4" style={{ color: isDarkMode ? '#93c5fd' : '#1E3A8A' }}>Chuyên mục</h3>
                <ul className="space-y-2 p-0 m-0">
                  {categoriesList.map((cat) => (
                    <li key={cat.name} className="list-none">
                      <div 
                        onClick={() => {
                          setActiveCategory(cat.name);
                          setSelectedArticle(null);
                          window.scrollTo({ top: 0 });
                        }}
                        className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-400 cursor-pointer"
                      >
                        <span className="text-sm font-medium">{cat.name}</span>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-bold transition-all ${
                          isDarkMode 
                            ? 'bg-slate-800 text-slate-300 border border-slate-700' 
                            : 'bg-white text-slate-500 border border-slate-200'
                        }`}>
                          {cat.count}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter Card */}
              <div 
                className="text-white p-8 rounded-3xl shadow-lg relative overflow-hidden group text-left"
                style={{ backgroundColor: '#1E3A8A' }}
              >
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                  <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
                </div>
                <h3 className="text-xl font-bold mb-4 relative z-10 text-white">Đăng ký nhận tin</h3>
                <p className="text-xs text-blue-200 mb-6 relative z-10 leading-relaxed">
                  Nhận những bí quyết chăm sóc thú cưng mới nhất từ các chuyên gia hàng đầu.
                </p>
                <form onSubmit={handleSidebarNewsletter} className="relative z-10">
                  <input 
                    className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm" 
                    placeholder="Email của bạn" 
                    type="email"
                    required
                    value={sidebarEmail}
                    onChange={(e) => setSidebarEmail(e.target.value)}
                    style={{ borderRadius: '24px', marginBottom: '16px' }}
                  />
                  <button 
                    type="submit"
                    className="w-full text-white font-bold py-3 hover:brightness-110 transition-all shadow-md border-0 text-xs"
                    style={{ backgroundColor: '#F97316', borderRadius: '50px' }}
                  >
                    Đăng ký ngay
                  </button>
                </form>
              </div>

            </aside>
          </div>

        </main>

      </div>
    );
  }

  return (
    <div 
      className={`transition-all ${isDarkMode ? 'bg-dark text-white' : 'text-slate-800'}`}
      style={{ 
        backgroundColor: isDarkMode ? '#0d1c2f' : '#F1F5F9',
        fontFamily: '"Bricolage Grotesque", system-ui, sans-serif'
      }}
    >
      
      {/* Toast Alert overlay for dynamic signups */}
      {signupMessage && (
        <div 
          className={`position-fixed bottom-0 end-0 p-3 m-3 text-white rounded-24 border shadow-lg d-flex align-items-center gap-3 fade-in ${signupType === 'error' ? 'bg-danger border-danger' : 'bg-success border-success'}`}
          style={{ zIndex: 1050, maxWidth: '400px' }}
        >
          <span className="material-symbols-outlined fs-4">
            {signupType === 'error' ? 'error' : 'verified_user'}
          </span>
          <div>
            <p className="m-0 fw-bold small">
              {signupType === 'error' ? 'Lỗi!' : 'Thành công!'}
            </p>
            <p className="m-0 text-white-50" style={{ fontSize: '11px', fontWeight: 600 }}>{signupMessage}</p>
          </div>
        </div>
      )}

      {/* Hero Banner Section with Google Image Cover */}
      <section 
        className="relative w-full overflow-hidden text-white py-12 lg:py-24" 
        id="top"
        style={{ backgroundColor: '#1E3A8A' }}
      >
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0 z-10"
            style={{ background: 'linear-gradient(to right, #1E3A8A 0%, rgba(30, 58, 138, 0.4) 100%)' }}
          ></div>
          <img 
            className="w-full h-full object-cover" 
            alt="Cẩm nang chăm sóc thú cưng" 
            src={BLOG_TOP_IMAGE}
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-12">
          <div className="max-w-2xl text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
              Cẩm nang chăm sóc thú cưng
            </h1>
            <p className="text-lg opacity-90 font-light mb-6 leading-relaxed text-blue-100">
              Nơi chia sẻ kiến thức chuyên sâu về sức khỏe, dinh dưỡng và huấn luyện để người bạn bốn chân của bạn luôn hạnh phúc và khỏe mạnh mỗi ngày.
            </p>
            <div className="flex gap-4">
              <a 
                href="#all-posts" 
                className="text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 transition-all hover:scale-105 shadow-md no-underline text-sm"
                style={{ backgroundColor: '#F97316' }}
              >
                Xem bài mới nhất 
                <span className="material-symbols-outlined text-sm">arrow_downward</span>
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* Main Core Blog Content & Grid Layout */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 py-12" id="all-posts">
        <div className="row g-5">
          
          {/* Main Content Area (Left 3/4) */}
          <div className="col-12 col-lg-8">
            
            {/* Featured Post Highlight (Only shown when no specific tag/search query isolates list) */}
            {activeCategory === "Tất cả" && searchQuery === "" && !activeTag && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-blue-900 dark:text-blue-400 d-flex align-items-center gap-2">
                  <span className="inline-block w-2.5 h-6 bg-orange-500 rounded-full"></span>
                  Bài viết nổi bật
                </h2>
                
                <article 
                  className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border flex flex-col md:flex-row h-full md:h-[380px]"
                  style={{ 
                    backgroundColor: isDarkMode ? '#11223f' : '#f8faff', 
                    borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : '#e2e8f0' 
                  }}
                >
                  <div className="md:w-1/2 overflow-hidden h-56 md:h-full relative">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      alt={featuredArticle.title} 
                      src={featuredArticle.image}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>
                  <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-blue-900 text-white px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider">
                          {featuredArticle.category}
                        </span>
                        <span className="text-muted text-[12px] d-flex align-items-center gap-1">
                          <Calendar size={12} /> {featuredArticle.date}
                        </span>
                      </div>
                      
                      <h3 className="text-lg md:text-xl font-bold mb-3 text-dark dark:text-white leading-snug group-hover:text-orange-500 transition-colors">
                        {featuredArticle.title}
                      </h3>
                      
                      <p className="text-muted text-sm line-clamp-3 mb-4 leading-relaxed">
                        {featuredArticle.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-200 dark:border-slate-800">
                      <span className="text-xs text-muted d-flex align-items-center gap-1">
                        <User size={12} /> {featuredArticle.author}
                      </span>
                      <button 
                        onClick={() => setSelectedArticle(featuredArticle)}
                        className="text-orange-500 font-bold text-sm flex items-center gap-1 bg-transparent border-0 hover:gap-2 transition-all p-0 shadow-none"
                      >
                        Đọc thêm <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            )}

            {/* Grid & List Header */}
            <div className="d-flex justify-content-between align-items-center mb-6 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div>
                <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-400 d-flex align-items-center gap-2">
                  <span className="inline-block w-2.5 h-6 bg-orange-500 rounded-full"></span>
                  {activeCategory !== "Tất cả" ? `Chuyên mục: ${activeCategory}` : activeTag ? `Thẻ: ${activeTag}` : "Tất cả bài viết"}
                </h2>
                {filteredArticles.length === 0 ? (
                  <p className="text-muted text-xs mt-1">Không tìm thấy bài viết nào.</p>
                ) : (
                  <p className="text-muted text-xs mt-1">Hiển thị {filteredArticles.length} bài viết tương ứng.</p>
                )}
              </div>
              
              {/* Layout triggers */}
              <div className="d-flex gap-2">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`p-2 border rounded-lg transition-colors d-flex align-items-center justify-content-center ${viewMode === 'grid' ? 'bg-orange-500 text-white border-orange-500' : 'bg-transparent border-slate-300 dark:border-slate-700 text-muted hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  title="Chế độ lưới"
                >
                  <Grid size={16} />
                </button>
                <button 
                  onClick={() => setViewMode("list")}
                  className={`p-2 border rounded-lg transition-colors d-flex align-items-center justify-content-center ${viewMode === 'list' ? 'bg-orange-500 text-white border-orange-500' : 'bg-transparent border-slate-300 dark:border-slate-700 text-muted hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  title="Chế độ danh sách"
                >
                  <List size={16} />
                </button>
              </div>
            </div>

            {/* Dynamic Articles Showcase */}
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12 rounded-2xl border border-dashed dark:border-slate-800 bg-white dark:bg-slate-900">
                <span className="material-symbols-outlined text-[64px] text-muted mb-3">search_off</span>
                <p className="text-lg font-bold text-dark dark:text-white mb-2">Không tìm thấy kết quả phù hợp</p>
                <p className="text-muted text-sm mb-4">Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc hiện tại.</p>
                <button 
                  onClick={handleResetFilters}
                  className="bg-primary text-white font-bold px-5 py-2.5 rounded-full hover:bg-blue-800 transition-all text-xs"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            ) : viewMode === "grid" ? (
              /* GRID VIEW MODE */
              <div className="row g-4">
                {paginatedArticles.map((art) => (
                  <div key={art.id} className="col-12 col-md-6">
                    <article 
                      className="h-100 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all d-flex flex-col group cursor-pointer"
                      onClick={() => setSelectedArticle(art)}
                    >
                      <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                          alt={art.title} 
                          src={art.image}
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-3 left-3 bg-white/95 dark:bg-slate-900/95 shadow-sm text-orange-600 dark:text-orange-400 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md">
                          {art.category}
                        </span>
                      </div>
                      <div className="p-5 flex-grow d-flex flex-column justify-between text-left">
                        <div>
                          <div className="text-muted text-[11px] mb-2 d-flex align-items-center gap-1">
                            <Calendar size={11} /> {art.date}
                            <span className="mx-1">•</span>
                            <Clock size={11} /> {art.readTime || "5 phút đọc"}
                          </div>
                          
                          <h4 className="text-base font-bold mb-2 text-dark dark:text-white leading-snug group-hover:text-orange-500 transition-colors line-clamp-2">
                            {art.title}
                          </h4>
                          
                          <p className="text-muted text-xs mb-4 line-clamp-2 leading-relaxed">
                            {art.summary}
                          </p>
                        </div>
                        
                        <div className="d-flex align-items-center justify-content-between pt-3 border-t dark:border-slate-800 mt-auto">
                          <span className="text-[11px] text-muted line-clamp-1">
                            bởi {art.author.replace("Bác sĩ thú y ", "BS. ")}
                          </span>
                          <span className="text-primary dark:text-blue-400 font-bold text-xs d-flex align-items-center gap-1 group-hover:text-orange-500 transition-colors">
                            Xem bài viết <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                          </span>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            ) : (
              /* LIST VIEW MODE */
              <div className="d-flex flex-column gap-4 text-left">
                {paginatedArticles.map((art) => (
                  <article 
                    key={art.id} 
                    className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all p-4 d-flex flex-col flex-md-row gap-4 group cursor-pointer"
                    onClick={() => setSelectedArticle(art)}
                  >
                    <div className="w-full md:w-1/3 h-44 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0 relative">
                      <img 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        alt={art.title} 
                        src={art.image}
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-2 left-2 bg-primary text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                        {art.category}
                      </span>
                    </div>
                    <div className="flex-grow d-flex flex-column justify-between">
                      <div>
                        <div className="text-muted text-[11px] mb-1.5 d-flex align-items-center gap-1.5">
                          <Calendar size={11} /> {art.date}
                          <span>•</span>
                          <User size={11} /> {art.author}
                          <span>•</span>
                          <Clock size={11} /> {art.readTime}
                        </div>
                        
                        <h4 className="text-base font-bold text-dark dark:text-white leading-snug group-hover:text-orange-500 transition-colors mb-2">
                          {art.title}
                        </h4>
                        
                        <p className="text-muted text-xs line-clamp-2 leading-relaxed mb-3">
                          {art.summary}
                        </p>
                      </div>

                      <div className="d-flex gap-2 mb-2 flex-wrap">
                        {art.tags.map(t => (
                          <span key={t} className={`text-[10px] text-muted ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'} px-2 py-0.5 rounded-full`}>
                            {t}
                          </span>
                        ))}
                      </div>

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedArticle(art);
                        }}
                        className="self-start text-primary dark:text-blue-400 font-bold text-xs p-0 bg-transparent border-0 d-flex align-items-center gap-1 hover:text-orange-500 hover:gap-2 transition-all shadow-none"
                      >
                        Đọc bài viết <ArrowRight size={12} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 d-flex justify-content-center align-items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-circle border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 d-flex align-items-center justify-content-center text-muted hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  <ChevronLeft size={16} />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`w-10 h-10 rounded-circle font-bold transition-all ${currentPage === num ? 'bg-primary text-white' : 'border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-muted hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    {num}
                  </button>
                ))}

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-circle border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 d-flex align-items-center justify-content-center text-muted hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar Widgets (Right 1/4) */}
          <div className="col-12 col-lg-4 space-y-8">
            
            {/* Widget 1: Search */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border dark:border-slate-800 text-left">
              <h5 className="text-xs font-bold text-primary dark:text-blue-400 mb-4 uppercase tracking-wider d-flex align-items-center gap-2">
                <Search size={14} /> Tìm kiếm bài viết
              </h5>
              <div className="position-relative">
                <span className="position-absolute start-0 top-50 translate-middle-y ms-3 d-flex align-items-center text-slate-400" style={{ pointerEvents: 'none' }}>
                  <Search size={18} />
                </span>
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full border border-slate-300 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary text-sm outline-none"
                  placeholder="Nhập từ khóa..."
                  style={{ backgroundColor: '#ffffff', color: '#1e293b' }}
                />
              </div>
            </div>

            {/* Widget 2: Category Filter */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border dark:border-slate-800 text-left">
              <h5 className="text-xs font-bold text-primary dark:text-blue-400 mb-4 uppercase tracking-wider d-flex align-items-center gap-2">
                <BookOpen size={14} /> Chuyên mục
              </h5>
              <ul className="list-unstyled space-y-3 m-0">
                {categoriesList.map((cat) => (
                  <li key={cat.name}>
                    <button
                      onClick={() => handleCategorySelect(cat.name)}
                      className={`w-100 d-flex justify-content-between align-items-center group text-left bg-transparent border-0 p-0 text-sm font-medium ${activeCategory === cat.name ? 'text-orange-500 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400'}`}
                    >
                      <span className="d-flex align-items-center gap-2">
                        <span className={`inline-block w-1.5 h-1.5 rounded-full ${activeCategory === cat.name ? 'bg-orange-500' : 'bg-slate-300 dark:bg-slate-700 group-hover:bg-primary'}`}></span>
                        {cat.name}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold transition-all ${
                        activeCategory === cat.name 
                          ? 'bg-orange-100 text-orange-600' 
                          : `${isDarkMode ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'bg-white text-slate-500 border border-slate-200'} group-hover:bg-primary group-hover:text-white group-hover:border-primary`
                      }`}>
                        {cat.count < 10 ? `0${cat.count}` : cat.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Widget 3: Weekly newsletter */}
            <div className="bg-orange-600 p-6 rounded-2xl text-white shadow-md relative overflow-hidden group text-left">
              <div className="absolute -right-4 -top-4 opacity-15 transition-transform group-hover:scale-110 duration-500 text-[100px] pointer-events-none">
                <Mail size={120} className="stroke-[1]" />
              </div>
              <h5 className="text-lg font-bold mb-2 relative z-10">Mẹo vặt hàng tuần</h5>
              <p className="text-xs mb-4 opacity-90 relative z-10 leading-relaxed">
                Đăng ký nhận email tin tức để không bỏ lỡ các ưu đãi dịch vụ chăm sóc và kiến thức bổ ích nhất.
              </p>
              <form onSubmit={handleSidebarNewsletter} className="relative z-10">
                <input 
                  type="email"
                  required
                  value={sidebarEmail}
                  onChange={(e) => setSidebarEmail(e.target.value)}
                  className="w-100 px-3.5 py-2 text-dark text-sm bg-white border-0 outline-none focus:ring-2 focus:ring-orange-300"
                  placeholder="Email của bạn"
                  style={{ borderRadius: '24px', marginBottom: '16px' }}
                />
                <button 
                  type="submit"
                  className="w-100 bg-white hover:bg-orange-100 text-orange-600 font-bold py-2.5 text-xs transition-colors border-0 shadow-sm"
                  style={{ borderRadius: '50px' }}
                >
                  Đăng ký ngay
                </button>
              </form>
            </div>

            {/* Widget 4: Popular Tags */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border dark:border-slate-800 text-left">
              <h5 className="text-xs font-bold text-primary dark:text-blue-400 mb-4 uppercase tracking-wider d-flex align-items-center gap-2">
                <Tag size={13} /> Thẻ phổ biến
              </h5>
              <div className="d-flex flex-wrap gap-2">
                {["#chamsoccho", "#meonho", "#petcare", "#thucpham", "#vaccine"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagSelect(tag)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${activeTag === tag ? 'bg-orange-500 text-white border-orange-500 shadow-md' : 'bg-white dark:bg-white border-slate-200 dark:border-slate-200 text-slate-700 dark:text-slate-800 hover:border-orange-400 hover:bg-orange-50'}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>





    </div>
  );
}
