// //다른 page로 이동하는 방법
// //server component에서 해당 파일 import하면 server component에서 버튼
// //눌렀을 떄 다른 페이지로 이동할 수 있도록함.'use client';  // 클라이언트 컴포넌트로 지정
// "use client"
// import React from "react";
// import { useRouter } from "next/navigation";

// const ClientRoutingButton: React.FC = () => {
//   const router = useRouter();

//   const handleClick = () => {
//     router.push("/profile/update"); // 버튼 클릭 시 리디렉션
//   };

//   return (
//     <button
//       className="w-full px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600"
//       onClick={handleClick}
//     >
//       내 정보 수정하기
//     </button>
//   );
// };

// export default ClientRoutingButton;
