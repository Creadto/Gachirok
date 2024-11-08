interface WorkAbilityListProps {
  jobGroup: string; //직군
  workAbility: string; // 능력
  id: number;
  name: string;
}

export const WorkAbilityList: WorkAbilityListProps[] = [
  // Common
  { id: 1, jobGroup: "Common", workAbility: "Word", name: "워드" },
  { id: 2, jobGroup: "Common", workAbility: "Excel", name: "엑셀" },
  { id: 3, jobGroup: "Common", workAbility: "PowerPoint", name: "파워포인트" },
  {
    id: 4,
    jobGroup: "Common",
    workAbility: "Presentation",
    name: "프레젠테이션",
  },
  {
    id: 5,
    jobGroup: "Common",
    workAbility: "Communication",
    name: "커뮤니케이션",
  },
  { id: 6, jobGroup: "Common", workAbility: "Email", name: "이메일 작성" },
  {
    id: 7,
    jobGroup: "Common",
    workAbility: "Time Management",
    name: "시간 관리",
  },
  { id: 8, jobGroup: "Common", workAbility: "Teamwork", name: "팀워크" },
  {
    id: 9,
    jobGroup: "Common",
    workAbility: "Decision Making",
    name: "의사결정",
  },
  {
    id: 10,
    jobGroup: "Common",
    workAbility: "Data Entry",
    name: "데이터 입력",
  },
  { id: 11, jobGroup: "Common", workAbility: "Negotiation", name: "협상" },
  {
    id: 12,
    jobGroup: "Common",
    workAbility: "Customer Service",
    name: "고객 서비스",
  },
  { id: 13, jobGroup: "Common", workAbility: "Leadership", name: "리더십" },
  {
    id: 14,
    jobGroup: "Common",
    workAbility: "Problem Solving",
    name: "문제 해결",
  },
  { id: 15, jobGroup: "Common", workAbility: "Planning", name: "기획" },
  {
    id: 16,
    jobGroup: "Common",
    workAbility: "Project Management",
    name: "프로젝트 관리",
  },
  {
    id: 17,
    jobGroup: "Common",
    workAbility: "Critical Thinking",
    name: "비판적 사고",
  },
  {
    id: 18,
    jobGroup: "Common",
    workAbility: "Multitasking",
    name: "멀티태스킹",
  },
  { id: 19, jobGroup: "Common", workAbility: "Adaptability", name: "적응력" },
  { id: 20, jobGroup: "Common", workAbility: "Collaboration", name: "협업" },

  // IT
  { id: 21, jobGroup: "IT", workAbility: "Programming", name: "프로그래밍" },
  { id: 22, jobGroup: "IT", workAbility: "Data Analysis", name: "데이터 분석" },
  {
    id: 23,
    jobGroup: "IT",
    workAbility: "Cyber Security",
    name: "사이버 보안",
  },
  {
    id: 24,
    jobGroup: "IT",
    workAbility: "Cloud Computing",
    name: "클라우드 컴퓨팅",
  },
  { id: 25, jobGroup: "IT", workAbility: "Networking", name: "네트워킹" },
  {
    id: 26,
    jobGroup: "IT",
    workAbility: "Database Management",
    name: "데이터베이스 관리",
  },
  {
    id: 27,
    jobGroup: "IT",
    workAbility: "System Administration",
    name: "시스템 관리",
  },
  {
    id: 28,
    jobGroup: "IT",
    workAbility: "Software Development",
    name: "소프트웨어 개발",
  },
  { id: 29, jobGroup: "IT", workAbility: "Machine Learning", name: "머신러닝" },
  {
    id: 30,
    jobGroup: "IT",
    workAbility: "Artificial Intelligence",
    name: "인공지능",
  },
  { id: 31, jobGroup: "IT", workAbility: "Blockchain", name: "블록체인" },
  { id: 32, jobGroup: "IT", workAbility: "DevOps", name: "데브옵스" },
  { id: 33, jobGroup: "IT", workAbility: "UI/UX Design", name: "UI/UX 디자인" },
  { id: 34, jobGroup: "IT", workAbility: "Web Development", name: "웹 개발" },
  {
    id: 35,
    jobGroup: "IT",
    workAbility: "Mobile App Development",
    name: "모바일 앱 개발",
  },
  { id: 36, jobGroup: "IT", workAbility: "Virtualization", name: "가상화" },
  { id: 37, jobGroup: "IT", workAbility: "IT Support", name: "IT 지원" },
  {
    id: 38,
    jobGroup: "IT",
    workAbility: "Penetration Testing",
    name: "침투 테스트",
  },
  {
    id: 39,
    jobGroup: "IT",
    workAbility: "Technical Writing",
    name: "기술 문서 작성",
  },
  { id: 40, jobGroup: "IT", workAbility: "Data Mining", name: "데이터 마이닝" },

  // Manufacturing
  {
    id: 41,
    jobGroup: "Manufacturing",
    workAbility: "Quality Control",
    name: "품질 관리",
  },
  {
    id: 42,
    jobGroup: "Manufacturing",
    workAbility: "Inventory Management",
    name: "재고 관리",
  },
  {
    id: 43,
    jobGroup: "Manufacturing",
    workAbility: "Process Optimization",
    name: "프로세스 최적화",
  },
  {
    id: 44,
    jobGroup: "Manufacturing",
    workAbility: "Machinery Operation",
    name: "기계 운영",
  },
  {
    id: 45,
    jobGroup: "Manufacturing",
    workAbility: "Lean Manufacturing",
    name: "린 제조",
  },
  {
    id: 46,
    jobGroup: "Manufacturing",
    workAbility: "Six Sigma",
    name: "식스 시그마",
  },
  {
    id: 47,
    jobGroup: "Manufacturing",
    workAbility: "Assembly Line Management",
    name: "조립 라인 관리",
  },
  {
    id: 48,
    jobGroup: "Manufacturing",
    workAbility: "Production Scheduling",
    name: "생산 일정",
  },
  { id: 49, jobGroup: "Manufacturing", workAbility: "Welding", name: "용접" },
  {
    id: 50,
    jobGroup: "Manufacturing",
    workAbility: "Product Design",
    name: "제품 디자인",
  },
  {
    id: 51,
    jobGroup: "Manufacturing",
    workAbility: "CAD Design",
    name: "CAD 디자인",
  },
  {
    id: 52,
    jobGroup: "Manufacturing",
    workAbility: "Safety Management",
    name: "안전 관리",
  },
  {
    id: 53,
    jobGroup: "Manufacturing",
    workAbility: "Material Handling",
    name: "자재 취급",
  },
  {
    id: 54,
    jobGroup: "Manufacturing",
    workAbility: "Automation",
    name: "자동화",
  },
  {
    id: 55,
    jobGroup: "Manufacturing",
    workAbility: "CNC Programming",
    name: "CNC 프로그래밍",
  },
  {
    id: 56,
    jobGroup: "Manufacturing",
    workAbility: "3D Printing",
    name: "3D 프린팅",
  },
  { id: 57, jobGroup: "Manufacturing", workAbility: "Logistics", name: "물류" },
  {
    id: 58,
    jobGroup: "Manufacturing",
    workAbility: "Maintenance",
    name: "정비",
  },
  {
    id: 59,
    jobGroup: "Manufacturing",
    workAbility: "Troubleshooting",
    name: "문제 해결",
  },
  {
    id: 60,
    jobGroup: "Manufacturing",
    workAbility: "Robotics",
    name: "로봇 공학",
  },

  // Healthcare
  { id: 61, jobGroup: "Healthcare", workAbility: "Nursing", name: "간호" },
  {
    id: 62,
    jobGroup: "Healthcare",
    workAbility: "Patient Care",
    name: "환자 돌봄",
  },
  {
    id: 63,
    jobGroup: "Healthcare",
    workAbility: "Medical Billing",
    name: "의료 청구",
  },
  {
    id: 64,
    jobGroup: "Healthcare",
    workAbility: "Clinical Research",
    name: "임상 연구",
  },
  {
    id: 65,
    jobGroup: "Healthcare",
    workAbility: "Medical Coding",
    name: "의료 코딩",
  },
  { id: 66, jobGroup: "Healthcare", workAbility: "Phlebotomy", name: "채혈" },
  {
    id: 67,
    jobGroup: "Healthcare",
    workAbility: "EMR Management",
    name: "전자 의료 기록 관리",
  },
  { id: 68, jobGroup: "Healthcare", workAbility: "Pharmacy", name: "약국" },
  {
    id: 69,
    jobGroup: "Healthcare",
    workAbility: "Surgery Assistance",
    name: "수술 보조",
  },
  {
    id: 70,
    jobGroup: "Healthcare",
    workAbility: "First Aid",
    name: "응급 처치",
  },
  {
    id: 71,
    jobGroup: "Healthcare",
    workAbility: "Health Education",
    name: "건강 교육",
  },
  {
    id: 72,
    jobGroup: "Healthcare",
    workAbility: "Home Care",
    name: "재가 요양",
  },
  {
    id: 73,
    jobGroup: "Healthcare",
    workAbility: "Medical Imaging",
    name: "의료 영상",
  },
  { id: 74, jobGroup: "Healthcare", workAbility: "Nutrition", name: "영양" },
  {
    id: 75,
    jobGroup: "Healthcare",
    workAbility: "Rehabilitation",
    name: "재활",
  },
  {
    id: 76,
    jobGroup: "Healthcare",
    workAbility: "Emergency Care",
    name: "응급 치료",
  },
  {
    id: 77,
    jobGroup: "Healthcare",
    workAbility: "Occupational Therapy",
    name: "작업 치료",
  },
  {
    id: 78,
    jobGroup: "Healthcare",
    workAbility: "Physical Therapy",
    name: "물리 치료",
  },
  {
    id: 79,
    jobGroup: "Healthcare",
    workAbility: "Mental Health Support",
    name: "정신 건강 지원",
  },
  {
    id: 80,
    jobGroup: "Healthcare",
    workAbility: "Laboratory Analysis",
    name: "실험실 분석",
  },

  // Finance
  {
    id: 81,
    jobGroup: "Finance",
    workAbility: "Financial Analysis",
    name: "재무 분석",
  },
  { id: 82, jobGroup: "Finance", workAbility: "Accounting", name: "회계" },
  {
    id: 83,
    jobGroup: "Finance",
    workAbility: "Tax Preparation",
    name: "세금 준비",
  },
  {
    id: 84,
    jobGroup: "Finance",
    workAbility: "Investment Management",
    name: "투자 관리",
  },
  { id: 85, jobGroup: "Finance", workAbility: "Budgeting", name: "예산 관리" },
  { id: 86, jobGroup: "Finance", workAbility: "Auditing", name: "감사" },
  {
    id: 87,
    jobGroup: "Finance",
    workAbility: "Financial Reporting",
    name: "재무 보고",
  },
  {
    id: 88,
    jobGroup: "Finance",
    workAbility: "Corporate Finance",
    name: "기업 재무",
  },
  {
    id: 89,
    jobGroup: "Finance",
    workAbility: "Risk Management",
    name: "위험 관리",
  },
  {
    id: 90,
    jobGroup: "Finance",
    workAbility: "Payroll Management",
    name: "급여 관리",
  },
  { id: 91, jobGroup: "Finance", workAbility: "Taxation", name: "세금" },
  {
    id: 92,
    jobGroup: "Finance",
    workAbility: "Wealth Management",
    name: "자산 관리",
  },
  {
    id: 93,
    jobGroup: "Finance",
    workAbility: "Financial Planning",
    name: "재정 계획",
  },
  { id: 94, jobGroup: "Finance", workAbility: "Banking", name: "은행 업무" },
  { id: 95, jobGroup: "Finance", workAbility: "Insurance", name: "보험" },
  {
    id: 96,
    jobGroup: "Finance",
    workAbility: "Credit Analysis",
    name: "신용 분석",
  },
  {
    id: 97,
    jobGroup: "Finance",
    workAbility: "Mergers & Acquisitions",
    name: "인수 합병",
  },
  {
    id: 98,
    jobGroup: "Finance",
    workAbility: "Financial Modeling",
    name: "재무 모델링",
  },
  {
    id: 99,
    jobGroup: "Finance",
    workAbility: "Cost Accounting",
    name: "원가 회계",
  },
  {
    id: 100,
    jobGroup: "Finance",
    workAbility: "Portfolio Management",
    name: "포트폴리오 관리",
  },

  // Education
  { id: 101, jobGroup: "Education", workAbility: "Teaching", name: "교수" },
  {
    id: 102,
    jobGroup: "Education",
    workAbility: "Curriculum Design",
    name: "교육과정 설계",
  },
  {
    id: 103,
    jobGroup: "Education",
    workAbility: "Student Assessment",
    name: "학생 평가",
  },
  {
    id: 104,
    jobGroup: "Education",
    workAbility: "Lesson Planning",
    name: "수업 계획",
  },
  {
    id: 105,
    jobGroup: "Education",
    workAbility: "Classroom Management",
    name: "교실 관리",
  },
  {
    id: 106,
    jobGroup: "Education",
    workAbility: "Online Teaching",
    name: "온라인 교수",
  },
  {
    id: 107,
    jobGroup: "Education",
    workAbility: "Special Education",
    name: "특수 교육",
  },
  {
    id: 108,
    jobGroup: "Education",
    workAbility: "Early Childhood Education",
    name: "유아 교육",
  },
  {
    id: 109,
    jobGroup: "Education",
    workAbility: "Educational Technology",
    name: "교육 기술",
  },
  {
    id: 110,
    jobGroup: "Education",
    workAbility: "Training Development",
    name: "훈련 개발",
  },
  {
    id: 111,
    jobGroup: "Education",
    workAbility: "Adult Education",
    name: "성인 교육",
  },
  {
    id: 112,
    jobGroup: "Education",
    workAbility: "Educational Leadership",
    name: "교육 리더십",
  },
  {
    id: 113,
    jobGroup: "Education",
    workAbility: "Teaching English",
    name: "영어 교수",
  },
  {
    id: 114,
    jobGroup: "Education",
    workAbility: "Student Engagement",
    name: "학생 참여",
  },
  {
    id: 115,
    jobGroup: "Education",
    workAbility: "Academic Advising",
    name: "학업 상담",
  },
  {
    id: 116,
    jobGroup: "Education",
    workAbility: "Curriculum Evaluation",
    name: "교육과정 평가",
  },
  {
    id: 117,
    jobGroup: "Education",
    workAbility: "Classroom Technology",
    name: "교실 기술",
  },
  {
    id: 118,
    jobGroup: "Education",
    workAbility: "Multicultural Education",
    name: "다문화 교육",
  },
  {
    id: 119,
    jobGroup: "Education",
    workAbility: "Subject Mastery",
    name: "과목 숙련",
  },
  {
    id: 120,
    jobGroup: "Education",
    workAbility: "Student Counseling",
    name: "학생 상담",
  },

  // Retail
  {
    id: 121,
    jobGroup: "Retail",
    workAbility: "Customer Service",
    name: "고객 서비스",
  },
  { id: 122, jobGroup: "Retail", workAbility: "Sales", name: "판매" },
  {
    id: 123,
    jobGroup: "Retail",
    workAbility: "Inventory Management",
    name: "재고 관리",
  },
  {
    id: 124,
    jobGroup: "Retail",
    workAbility: "Merchandising",
    name: "상품 진열",
  },
  {
    id: 125,
    jobGroup: "Retail",
    workAbility: "Cash Handling",
    name: "현금 취급",
  },
  {
    id: 126,
    jobGroup: "Retail",
    workAbility: "POS Operation",
    name: "POS 운영",
  },
  {
    id: 127,
    jobGroup: "Retail",
    workAbility: "Product Knowledge",
    name: "제품 지식",
  },
  {
    id: 128,
    jobGroup: "Retail",
    workAbility: "Visual Merchandising",
    name: "비주얼 머천다이징",
  },
  {
    id: 129,
    jobGroup: "Retail",
    workAbility: "Loss Prevention",
    name: "손실 방지",
  },
  {
    id: 130,
    jobGroup: "Retail",
    workAbility: "Customer Interaction",
    name: "고객 상호작용",
  },
  {
    id: 131,
    jobGroup: "Retail",
    workAbility: "Pricing Strategy",
    name: "가격 전략",
  },
  {
    id: 132,
    jobGroup: "Retail",
    workAbility: "Product Display",
    name: "제품 디스플레이",
  },
  {
    id: 133,
    jobGroup: "Retail",
    workAbility: "Stock Replenishment",
    name: "재고 보충",
  },
  {
    id: 134,
    jobGroup: "Retail",
    workAbility: "Sales Reporting",
    name: "판매 보고",
  },
  {
    id: 135,
    jobGroup: "Retail",
    workAbility: "Order Fulfillment",
    name: "주문 처리",
  },
  {
    id: 136,
    jobGroup: "Retail",
    workAbility: "Sales Forecasting",
    name: "판매 예측",
  },
  {
    id: 137,
    jobGroup: "Retail",
    workAbility: "Online Sales",
    name: "온라인 판매",
  },
  {
    id: 138,
    jobGroup: "Retail",
    workAbility: "Brand Management",
    name: "브랜드 관리",
  },
  {
    id: 139,
    jobGroup: "Retail",
    workAbility: "Customer Retention",
    name: "고객 유지",
  },
  {
    id: 140,
    jobGroup: "Retail",
    workAbility: "Store Management",
    name: "매장 관리",
  },
];
