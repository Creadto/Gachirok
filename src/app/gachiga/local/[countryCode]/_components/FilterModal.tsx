// "use client";
// import TimePicker from "@/core/components/TimePicker";
// import { useGetFilteredMeetings } from "@/core/hooks/useGetMeetings";
// import { sexTypes, weekdayOptions } from "@/core/types/DataForUI";
// import { interestsOptions } from "@/core/types/InterestsAndExpertisesOptions";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import DatePicker from "react-datepicker";
// import { FaCalendarAlt, FaClock } from "react-icons/fa";
// import { ko } from "date-fns/locale"; // date-fns의 한국어 로케일

// interface FilterModalProps {
//   onClose: () => void;
//   countryCode: string;
// }

// /**
//  * @Description 필터 적용하기를 눌렀을 때 등장하는 필터 모달
//  * @author 김영서
//  **/
// const FilterModal = ({ onClose, countryCode }: FilterModalProps) => {
//   const { data: session } = useSession();
//   const router = useRouter();

//   // 모임 이름 혹은 내용 검색
//   const [searchContent, setSearchContent] = useState<string | null>(null);
//   //관심 분야
//   const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
//   //지참비용
//   const [cost, setCost] = useState<boolean | null>(null);
//   //모집방식
//   const [approval, setApproval] = useState<boolean | null>(null);
//   //모집인원
//   const [sexType, setSexType] = useState<string | null>(null);
//   //잔여석 수
//   const [slot, setSlot] = useState<string | null>(null);
//   //최소연령
//   const [startAge, setStartAge] = useState<string | null>(null);
//   //최대연령
//   const [endAge, setEndAge] = useState<string | null>(null);
//   //누구나 체크버튼
//   const [isAllClicked, setIsAllClicked] = useState(false);
//   //시작날짜
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   //종료날짜
//   const [endDate, setEndDate] = useState<Date | null>(null);
//   //시작시간
//   const [startTime, setStartTime] = useState<string | null>(null);
//   //종료시간
//   const [endTime, setEndTime] = useState<string | null>(null);
//   //모집요일
//   const [weekDays, setWeekDays] = useState<string[]>([]);

//   //관심분야 선택 함수
//   const handleInterestClick = (value: string) => {
//     setSelectedInterests((prev) => {
//       const newSelectedInterests = prev.includes(value)
//         ? prev.filter((interest) => interest !== value) // 이미 선택된 경우 제거
//         : [...prev, value]; // 새로 선택된 경우 추가

//       return newSelectedInterests;
//     });
//   };

//   //모집요일을 선택 함수
//   const handleDaysOfWeek = (value: string) => {
//     setWeekDays((prev) => {
//       const newWeekDays = prev.includes(value)
//         ? prev.filter((weekDays) => weekDays !== value) // 이미 선택된 경우 제거
//         : [...prev, value]; // 새로 선택된 경우 추가

//       return newWeekDays;
//     });
//   };

//   //API Request의 형식에 맞게 날짜 format 바꾸기
//   const formatDate = (date: Date): string => {
//     const year = date.getFullYear();
//     const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
//     const day = date.getDate();
//     return `${year}년 ${month}월 ${day}일`; //API로 보내는 형식
//   };

//   //API Request의 형식에 맞게 시간 format 바꾸기
//   const formatTime = (time: string): string => {
//     let [hours, minutes] = time.split(":");
//     hours = parseInt(hours, 10).toString(); // 앞의 '0' 제거
//     minutes = parseInt(minutes, 10).toString();
//     return `${hours}시 ${minutes}분`;
//   };

//   //적용 버튼을 눌렀을 때
//   const applyFilters = async () => {
//     const params = new URLSearchParams();

//     if (countryCode) params.set("countryCode", countryCode);
//     if (searchContent !== null) params.set("title", searchContent);
//     if (weekDays.length > 0) params.set("daysOfWeek", weekDays.join(","));
//     if (selectedInterests.length > 0)
//       params.set("interests", selectedInterests.join(","));
//     if (slot !== null) params.set("slot", slot);
//     if (cost !== null) params.set("costly", cost.toString());
//     if (approval !== null) params.set("approval", approval.toString());
//     if (sexType !== null) params.set("sexType", sexType);
//     if (startAge !== null) params.set("startAge", startAge);
//     if (endAge != null) params.set("endAge", endAge);
//     if (startDate !== null)
//       params.set("meetingStartDate", formatDate(startDate));
//     if (endDate !== null) params.set("meetingEndDate", formatDate(endDate));
//     if (startTime !== null)
//       params.set("meetingStartTime", formatTime(startTime));
//     if (endTime !== null) params.set("meetingEndTime", formatTime(endTime));

//     try {
//       if (session?.accessToken) {
//         const response = await useGetFilteredMeetings(
//           session.accessToken,
//           params.toString()
//         );
//         //sessionStorage 초기화
//         sessionStorage.removeItem("meetings");
//         //sessionStorage에 새로운 데이터 넣기
//         sessionStorage.setItem("meetings", JSON.stringify(response));
//         //필터적용이 된 페이지로 이동
//         router.push(`/gachiga/local?${params.toString()}`);

//         onClose(); // 모달 닫기
//       }
//     } catch (error) {
//       console.error("ERROR", error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
//       <div className="bg-white rounded-lg shadow-lg w-[60%] h-auto p-5">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold">검색 필터</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-800"
//           >
//             X
//           </button>
//         </div>

//         <div className="space-y-4">
//           {/* 모임 이름 혹은 내용 검색 */}
//           <div>
//             <label className="w-full flex flex-row gap-x-5 font-bold items-center">
//               모임 이름 혹은 내용 검색
//               <input
//                 type="text"
//                 placeholder="모임의 제목이나 소개 내용을 검색"
//                 className="w-[70%] text-center h-8 border-hidden rounded-md bg-slate-300"
//                 value={searchContent !== null ? searchContent : ""}
//                 onChange={(e) => setSearchContent(e.target.value)}
//               />
//             </label>
//           </div>
//           <hr className="border-slate-300 mb-3 mt-3" />
//           {/* 관심분야 */}
//           <div>
//             <label className="font-bold">관심분야</label>
//             <div className="mt-2 flex flex-row w-full items-center justify-between">
//               {interestsOptions.map(({ label, value, icon }) => (
//                 <button
//                   type="button"
//                   className={`px-2 py-2 
//                   ${
//                     selectedInterests.includes(value)
//                       ? "bg-pink-500 text-white"
//                       : ""
//                   }
//                   cursor-pointer flex flex-row border rounded-xl border-black mx-1`}
//                   key={value}
//                   onClick={() => handleInterestClick(value)}
//                 >
//                   {icon && (
//                     <img
//                       src={icon}
//                       alt={`${label} icon`}
//                       className="mr-2 w-5 h-5"
//                     />
//                   )}
//                   {label}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <hr className="border-slate-300 mb-4 mt-4" />

//           <div className="flex divide-x-2">
//             {/* 지참비용 */}
//             <div className="flex-1 flex flex-col">
//               <label className="mb-2 font-bold">지참비용</label>
//               <div className="flex gap-x-2 mx-3">
//                 <button
//                   onClick={() => setCost(cost == true ? null : true)}
//                   className={` ${
//                     cost === true ? "bg-gray-200" : " "
//                   } flex-1 p-3 border border-gray-300 rounded-xl `}
//                 >
//                   있음
//                 </button>
//                 <button
//                   onClick={() => setCost(cost == false ? null : false)}
//                   className={` ${
//                     cost === false ? "bg-gray-200" : " "
//                   } flex-1 p-3 border border-gray-300 rounded-xl `}
//                 >
//                   없음
//                 </button>
//               </div>
//             </div>

//             {/* 모집방식 */}
//             <div className="flex-1 ">
//               <div className="flex-1 flex flex-col">
//                 <label className="mb-2 ml-2 font-bold">모집방식</label>
//                 <div className="flex gap-x-2 mx-3">
//                   <button
//                     onClick={() =>
//                       setApproval(approval == false ? null : false)
//                     }
//                     className={` ${
//                       approval === false ? "bg-gray-200" : " "
//                     } flex-1 p-3 border border-gray-300 rounded-xl `}
//                   >
//                     선착순
//                   </button>
//                   <button
//                     onClick={() => setApproval(approval == true ? null : true)}
//                     className={` ${
//                       approval === true ? "bg-gray-200" : " "
//                     } flex-1 p-3 border border-gray-300 rounded-xl `}
//                   >
//                     승인제
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <hr className="border-slate-300 mb-4 mt-4 " />

//           {/* 모집인원 */}
//           <div>
//             <label className="font-bold">모집인원</label>
//             <div className="flex flex-row w-full justify-between items-center text-center gap-x-4">
//               {sexTypes.map((type) => (
//                 <button
//                   key={type.label}
//                   type="button"
//                   className={`mx-auto my-2 border border-gray-300  p-3 rounded-xl w-[25%] ${
//                     sexType === type.value
//                       ? "bg-pink-500 text-white"
//                       : "bg-gray-100 text-gray-500"
//                   }`}
//                   onClick={() =>
//                     setSexType(sexType === type.value ? null : type.value)
//                   }
//                 >
//                   {type.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <hr className="border-slate-300 mb-4 mt-4 " />
//           <div className="flex divide-x-2">
//             {/* 잔여석 수 */}
//             <div className="flex-1 flex flex-col mr-2">
//               <label className="mb-2 font-bold">잔여석 수</label>
//               <input
//                 type="number"
//                 value={slot !== null ? slot : ""}
//                 onChange={(e) => setSlot(e.target.value)}
//                 placeholder="검색하고자 하는 잔여석 수를 입력해주세요"
//                 className="w-full h-8 text-center border-hidden rounded-md bg-slate-300 "
//               />
//             </div>

//             {/* 모집연령 */}
//             <div className="flex-1 ">
//               <div className="flex-1 flex flex-col">
//                 <div className="flex flex-row mb-2">
//                   <label className="flex flex-1 ml-2 font-bold">모집연령</label>
//                   <label className="flex flex-1 justify-end mr-10">
//                     누구나
//                     <input
//                       type="checkbox"
//                       className="mx-2"
//                       onClick={() => setIsAllClicked((prev) => !prev)}
//                     />
//                   </label>
//                 </div>
//                 <div className="flex flex-row mx-3 ">
//                   <div className="flex flex-row h-8 items-center justify-center">
//                     <span className="mx-2">최소연령</span>
//                     <input
//                       type="number"
//                       disabled={isAllClicked}
//                       onChange={(e) => setStartAge(e.target.value)}
//                       className="w-[40%] h-full border border-hidden bg-slate-300 rounded-xl text-center"
//                     />
//                   </div>
//                   <div className="flex flex-row h-8 items-center justify-center">
//                     <span className="mx-2">최대연령</span>
//                     <input
//                       type="number"
//                       disabled={isAllClicked}
//                       onChange={(e) => setEndAge(e.target.value)}
//                       className="w-[40%] h-full border border-hidden bg-slate-300 rounded-xl text-center"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <hr className="border-slate-300 mb-4 mt-4 " />

//           {/* 모임날짜 & 시간 */}
//           <div>
//             <label className="mb-2 font-bold">모임날짜 & 시간</label>
//             <div className="flex flex-row ">
//               <div className="flex flex-1 flex-row items-center gap-x-2 pt-2 pr-2">
//                 <span className="w-[20%]">시작날짜</span>
//                 <div className="flex items-center border border-gray-300 rounded-lg p-2">
//                   <FaCalendarAlt className="text-gray-500 mr-2" />
//                   <DatePicker
//                     selected={startDate}
//                     onChange={(date) => {
//                       setStartDate(date);
//                     }}
//                     dateFormat="yyyy-MM-dd"
//                     className="w-full border-none outline-none text-base bg-transparent"
//                     placeholderText="시작날짜"
//                     locale={ko}
//                   />
//                 </div>
//               </div>
//               <div className="flex flex-1 flex-row items-center gap-x-2 pt-2">
//                 <span className="w-[20%]">종료날짜</span>
//                 <div className="flex items-center border border-gray-300 rounded-lg p-2">
//                   <FaCalendarAlt className="text-gray-500 mr-2" />
//                   <DatePicker
//                     selected={endDate}
//                     onChange={(date) => {
//                       setEndDate(date);
//                     }}
//                     dateFormat="yyyy-MM-dd"
//                     className="w-full border-none outline-none text-base bg-transparent"
//                     placeholderText="종료날짜"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-row ">
//               <div className="flex flex-1 flex-row items-center gap-x-2 pt-2 pr-2">
//                 <span className="w-[20%]">시작시간</span>
//                 <div className="flex flex-1 items-center p-2">
//                   <FaClock className="text-gray-500 mr-2" />
//                   <TimePicker onTimeChange={setStartTime} />
//                 </div>
//               </div>
//               <div className="flex flex-1 flex-row items-center gap-x-2 pt-2">
//                 <span className="w-[20%]">종료시간</span>
//                 <div className="flex flex-1 items-center content-center p-2">
//                   <FaClock className="text-gray-500 mr-2" />
//                   <TimePicker onTimeChange={setEndTime} />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div>
//             <label className="mb-2 font-bold">모집요일</label>
//             <div className="flex flex-row mt-2">
//               {weekdayOptions.map(({ label, value }) => (
//                 <button
//                   onClick={() => handleDaysOfWeek(value)}
//                   key={value}
//                   className={`border h-8 border-black rounded-md text-center mx-2 justify-between items-stretch w-full ${
//                     weekDays.includes(value) ? "bg-pink-500 text-white" : ""
//                   }`}
//                 >
//                   {label}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="mt-5 flex justify-end">
//           <button
//             onClick={applyFilters}
//             className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
//           >
//             적용
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterModal;
