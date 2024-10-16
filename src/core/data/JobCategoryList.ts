interface JobCategoryListProps {
  jobGroup: string, //직군
  jobSpecification: string //직무
  id: number;
  name: string;
}

interface JobCategoryListProps {
  jobGroup: string; // 직군
  jobSpecification: string; // 직무
  id: number;
  name: string;
}

export const JobCategoryList: JobCategoryListProps[] = [
  // IT
  { id: 1, jobGroup: 'IT', jobSpecification: 'Frontend', name: '프론트엔드' },
  { id: 2, jobGroup: 'IT', jobSpecification: 'Backend', name: '백엔드' },
  { id: 3, jobGroup: 'IT', jobSpecification: 'DevOps', name: '데브옵스' },
  { id: 4, jobGroup: 'IT', jobSpecification: 'Data Scientist', name: '데이터 사이언티스트' },
  { id: 5, jobGroup: 'IT', jobSpecification: 'Mobile Developer', name: '모바일 개발자' },
  { id: 6, jobGroup: 'IT', jobSpecification: 'AI Engineer', name: 'AI 엔지니어' },
  { id: 7, jobGroup: 'IT', jobSpecification: 'Cloud Engineer', name: '클라우드 엔지니어' },
  { id: 8, jobGroup: 'IT', jobSpecification: 'Cybersecurity', name: '사이버 보안' },
  { id: 9, jobGroup: 'IT', jobSpecification: 'Full Stack', name: '풀스택 개발자' },
  { id: 10, jobGroup: 'IT', jobSpecification: 'Game Developer', name: '게임 개발자' },
  { id: 11, jobGroup: 'IT', jobSpecification: 'QA Engineer', name: 'QA 엔지니어' },
  { id: 12, jobGroup: 'IT', jobSpecification: 'System Architect', name: '시스템 아키텍트' },
  { id: 13, jobGroup: 'IT', jobSpecification: 'UX/UI Designer', name: 'UX/UI 디자이너' },
  { id: 14, jobGroup: 'IT', jobSpecification: 'Network Engineer', name: '네트워크 엔지니어' },
  { id: 15, jobGroup: 'IT', jobSpecification: 'Blockchain Developer', name: '블록체인 개발자' },
  { id: 16, jobGroup: 'IT', jobSpecification: 'Database Administrator', name: 'DB 관리자' },
  { id: 17, jobGroup: 'IT', jobSpecification: 'Machine Learning Engineer', name: '머신러닝 엔지니어' },
  { id: 18, jobGroup: 'IT', jobSpecification: 'Software Engineer', name: '소프트웨어 엔지니어' },
  { id: 19, jobGroup: 'IT', jobSpecification: 'Security Engineer', name: '보안 엔지니어' },
  { id: 20, jobGroup: 'IT', jobSpecification: 'Technical Support', name: '기술 지원' },

  // Manufacturing
  { id: 21, jobGroup: 'Manufacturing', jobSpecification: 'Mechanical Engineer', name: '기계 엔지니어' },
  { id: 22, jobGroup: 'Manufacturing', jobSpecification: 'Production Manager', name: '생산 관리자' },
  { id: 23, jobGroup: 'Manufacturing', jobSpecification: 'Quality Control', name: '품질 관리' },
  { id: 24, jobGroup: 'Manufacturing', jobSpecification: 'Industrial Engineer', name: '산업 엔지니어' },
  { id: 25, jobGroup: 'Manufacturing', jobSpecification: 'Manufacturing Engineer', name: '제조 엔지니어' },
  { id: 26, jobGroup: 'Manufacturing', jobSpecification: 'Assembly Line Worker', name: '조립 라인 직원' },
  { id: 27, jobGroup: 'Manufacturing', jobSpecification: 'Maintenance Technician', name: '유지보수 기술자' },
  { id: 28, jobGroup: 'Manufacturing', jobSpecification: 'Plant Manager', name: '공장 관리자' },
  { id: 29, jobGroup: 'Manufacturing', jobSpecification: 'Production Planner', name: '생산 계획자' },
  { id: 30, jobGroup: 'Manufacturing', jobSpecification: 'Process Engineer', name: '프로세스 엔지니어' },
  { id: 31, jobGroup: 'Manufacturing', jobSpecification: 'R&D Engineer', name: '연구 개발 엔지니어' },
  { id: 32, jobGroup: 'Manufacturing', jobSpecification: 'Logistics Coordinator', name: '물류 코디네이터' },
  { id: 33, jobGroup: 'Manufacturing', jobSpecification: 'Tool and Die Maker', name: '도구 및 금형 제작자' },
  { id: 34, jobGroup: 'Manufacturing', jobSpecification: 'Material Handler', name: '자재 처리자' },
  { id: 35, jobGroup: 'Manufacturing', jobSpecification: 'CNC Machinist', name: 'CNC 기계 공작자' },
  { id: 36, jobGroup: 'Manufacturing', jobSpecification: 'Automation Engineer', name: '자동화 엔지니어' },
  { id: 37, jobGroup: 'Manufacturing', jobSpecification: 'Production Supervisor', name: '생산 감독' },
  { id: 38, jobGroup: 'Manufacturing', jobSpecification: 'Quality Assurance', name: '품질 보증' },
  { id: 39, jobGroup: 'Manufacturing', jobSpecification: 'Safety Engineer', name: '안전 엔지니어' },
  { id: 40, jobGroup: 'Manufacturing', jobSpecification: 'Operations Manager', name: '운영 관리자' },

  // Healthcare
  { id: 41, jobGroup: 'Healthcare', jobSpecification: 'Doctor', name: '의사' },
  { id: 42, jobGroup: 'Healthcare', jobSpecification: 'Nurse', name: '간호사' },
  { id: 43, jobGroup: 'Healthcare', jobSpecification: 'Pharmacist', name: '약사' },
  { id: 44, jobGroup: 'Healthcare', jobSpecification: 'Radiologist', name: '방사선사' },
  { id: 45, jobGroup: 'Healthcare', jobSpecification: 'Physiotherapist', name: '물리치료사' },
  { id: 46, jobGroup: 'Healthcare', jobSpecification: 'Lab Technician', name: '실험실 기술자' },
  { id: 47, jobGroup: 'Healthcare', jobSpecification: 'Surgeon', name: '외과 의사' },
  { id: 48, jobGroup: 'Healthcare', jobSpecification: 'Psychologist', name: '심리학자' },
  { id: 49, jobGroup: 'Healthcare', jobSpecification: 'Occupational Therapist', name: '작업 치료사' },
  { id: 50, jobGroup: 'Healthcare', jobSpecification: 'Dentist', name: '치과 의사' },
  { id: 51, jobGroup: 'Healthcare', jobSpecification: 'Dietitian', name: '영양사' },
  { id: 52, jobGroup: 'Healthcare', jobSpecification: 'Pediatrician', name: '소아과 의사' },
  { id: 53, jobGroup: 'Healthcare', jobSpecification: 'Medical Assistant', name: '의료 보조' },
  { id: 54, jobGroup: 'Healthcare', jobSpecification: 'Anesthesiologist', name: '마취과 의사' },
  { id: 55, jobGroup: 'Healthcare', jobSpecification: 'Cardiologist', name: '심장 전문의' },
  { id: 56, jobGroup: 'Healthcare', jobSpecification: 'Paramedic', name: '응급 구조사' },
  { id: 57, jobGroup: 'Healthcare', jobSpecification: 'Veterinarian', name: '수의사' },
  { id: 58, jobGroup: 'Healthcare', jobSpecification: 'Dermatologist', name: '피부과 의사' },
  { id: 59, jobGroup: 'Healthcare', jobSpecification: 'Neurosurgeon', name: '신경외과 의사' },
  { id: 60, jobGroup: 'Healthcare', jobSpecification: 'Optometrist', name: '검안사' },

  // Finance
  { id: 61, jobGroup: 'Finance', jobSpecification: 'Accountant', name: '회계사' },
  { id: 62, jobGroup: 'Finance', jobSpecification: 'Financial Analyst', name: '재무 분석가' },
  { id: 63, jobGroup: 'Finance', jobSpecification: 'Investment Banker', name: '투자 은행가' },
  { id: 64, jobGroup: 'Finance', jobSpecification: 'Auditor', name: '감사관' },
  { id: 65, jobGroup: 'Finance', jobSpecification: 'Credit Analyst', name: '신용 분석가' },
  { id: 66, jobGroup: 'Finance', jobSpecification: 'Tax Advisor', name: '세무사' },
  { id: 67, jobGroup: 'Finance', jobSpecification: 'Financial Planner', name: '재무 계획사' },
  { id: 68, jobGroup: 'Finance', jobSpecification: 'Insurance Broker', name: '보험 중개인' },
  { id: 69, jobGroup: 'Finance', jobSpecification: 'Loan Officer', name: '대출 관리자' },
  { id: 70, jobGroup: 'Finance', jobSpecification: 'Risk Manager', name: '위험 관리자' },
  { id: 71, jobGroup: 'Finance', jobSpecification: 'Wealth Manager', name: '자산 관리자' },
  { id: 72, jobGroup: 'Finance', jobSpecification: 'Stockbroker', name: '주식 중개인' },
  { id: 73, jobGroup: 'Finance', jobSpecification: 'Investment Manager', name: '투자 관리자' },
  { id: 74, jobGroup: 'Finance', jobSpecification: 'Corporate Treasurer', name: '기업 재무 관리자' },
  { id: 75, jobGroup: 'Finance', jobSpecification: 'Underwriter', name: '보험 인수인' },
  { id: 76, jobGroup: 'Finance', jobSpecification: 'Portfolio Manager', name: '포트폴리오 관리자' },
  { id: 77, jobGroup: 'Finance', jobSpecification: 'Commodities Trader', name: '상품 거래자' },
  { id: 78, jobGroup: 'Finance', jobSpecification: 'Hedge Fund Manager', name: '헤지펀드 관리자' },
  { id: 79, jobGroup: 'Finance', jobSpecification: 'Private Equity Manager', name: '사모펀드 관리자' },
  { id: 80, jobGroup: 'Finance', jobSpecification: 'Budget Analyst', name: '예산 분석가' },

  // Education
  { id: 81, jobGroup: 'Education', jobSpecification: 'Teacher', name: '교사' },
  { id: 82, jobGroup: 'Education', jobSpecification: 'Professor', name: '교수' },
  { id: 83, jobGroup: 'Education', jobSpecification: 'Tutor', name: '과외 교사' },
  { id: 84, jobGroup: 'Education', jobSpecification: 'School Administrator', name: '학교 관리자' },
  { id: 85, jobGroup: 'Education', jobSpecification: 'Education Consultant', name: '교육 컨설턴트' },
  { id: 86, jobGroup: 'Education', jobSpecification: 'Special Education Teacher', name: '특수 교육 교사' },
  { id: 87, jobGroup: 'Education', jobSpecification: 'Curriculum Developer', name: '교육 과정 개발자' },
  { id: 88, jobGroup: 'Education', jobSpecification: 'Librarian', name: '사서' },
  { id: 89, jobGroup: 'Education', jobSpecification: 'School Counselor', name: '학교 상담사' },
  { id: 90, jobGroup: 'Education', jobSpecification: 'Principal', name: '교장' },
  { id: 91, jobGroup: 'Education', jobSpecification: 'Academic Advisor', name: '학업 상담사' },
  { id: 92, jobGroup: 'Education', jobSpecification: 'ESL Teacher', name: '영어 교사' },
  { id: 93, jobGroup: 'Education', jobSpecification: 'Instructional Coordinator', name: '교육 코디네이터' },
  { id: 94, jobGroup: 'Education', jobSpecification: 'Online Instructor', name: '온라인 강사' },
  { id: 95, jobGroup: 'Education', jobSpecification: 'Substitute Teacher', name: '대체 교사' },
  { id: 96, jobGroup: 'Education', jobSpecification: 'Researcher', name: '연구원' },
  { id: 97, jobGroup: 'Education', jobSpecification: 'Teaching Assistant', name: '교수 보조' },
  { id: 98, jobGroup: 'Education', jobSpecification: 'Academic Dean', name: '학장' },
  { id: 99, jobGroup: 'Education', jobSpecification: 'Head of Department', name: '부서장' },
  { id: 100, jobGroup: 'Education', jobSpecification: 'Lecturer', name: '강사' },

  // Retail
  { id: 101, jobGroup: 'Retail', jobSpecification: 'Cashier', name: '계산원' },
  { id: 102, jobGroup: 'Retail', jobSpecification: 'Store Manager', name: '매장 관리자' },
  { id: 103, jobGroup: 'Retail', jobSpecification: 'Sales Associate', name: '판매원' },
  { id: 104, jobGroup: 'Retail', jobSpecification: 'Merchandiser', name: '상품 기획자' },
  { id: 105, jobGroup: 'Retail', jobSpecification: 'Inventory Manager', name: '재고 관리자' },
  { id: 106, jobGroup: 'Retail', jobSpecification: 'Customer Service', name: '고객 서비스' },
  { id: 107, jobGroup: 'Retail', jobSpecification: 'Store Clerk', name: '매장 직원' },
  { id: 108, jobGroup: 'Retail', jobSpecification: 'Visual Merchandiser', name: '비주얼 상품 기획자' },
  { id: 109, jobGroup: 'Retail', jobSpecification: 'Product Specialist', name: '제품 전문가' },
  { id: 110, jobGroup: 'Retail', jobSpecification: 'Retail Buyer', name: '리테일 구매자' },
  { id: 111, jobGroup: 'Retail', jobSpecification: 'Loss Prevention Officer', name: '손실 방지 담당자' },
  { id: 112, jobGroup: 'Retail', jobSpecification: 'Store Supervisor', name: '매장 감독' },
  { id: 113, jobGroup: 'Retail', jobSpecification: 'Floor Manager', name: '플로어 매니저' },
  { id: 114, jobGroup: 'Retail', jobSpecification: 'Display Designer', name: '디스플레이 디자이너' },
  { id: 115, jobGroup: 'Retail', jobSpecification: 'Online Sales Manager', name: '온라인 판매 관리자' },
  { id: 116, jobGroup: 'Retail', jobSpecification: 'Logistics Manager', name: '물류 관리자' },
  { id: 117, jobGroup: 'Retail', jobSpecification: 'Supply Chain Manager', name: '공급망 관리자' },
  { id: 118, jobGroup: 'Retail', jobSpecification: 'Stockroom Manager', name: '재고실 관리자' },
  { id: 119, jobGroup: 'Retail', jobSpecification: 'Warehouse Worker', name: '창고 작업자' },
  { id: 120, jobGroup: 'Retail', jobSpecification: 'Product Manager', name: '제품 관리자' }
];


interface JobGroupListProps {
  jobGroup : string;
  id: number,
  name: string
}
export const JobGroupList: JobGroupListProps[] = [
  { id: 1, jobGroup: "IT", name: "IT" },
  { id: 2, jobGroup: "Manufacturing", name: "제조업" },
  { id: 3, jobGroup: "Healthcare", name: "의료" },
  { id: 4, jobGroup: "Finance", name: "금융" },
  { id: 5, jobGroup: "Education", name: "교육" },
  { id: 6, jobGroup: "Retail", name: "소매" }
];