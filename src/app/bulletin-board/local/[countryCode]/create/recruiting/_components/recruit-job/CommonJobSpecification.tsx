// import { WorkAbilityList } from "@/core/data/WorkAbilityList";

// export const CommonJobSpecification = () => {
//   const workAbilityList = WorkAbilityList;
//   return (
//     <>
//       <label className="block text-[13px] text-[#808080] mb-[10px]">공통</label>
//       {workAbilityList
//         .filter((jobGroup) => jobGroup.jobGroup === "Common")
//         .map((ability) => (
//           <button
//             type="button"
//             onClick={() => handleWorkAbilityClick(ability.workAbility)}
//             key={ability.id}
//             value={ability.workAbility}
//             className={`px-[12px] py-[9px] border border-[#eeeeee] rounded-[50px] mb-[5px] mr-[5px] text-[13px] 
//           ${
//             workAbility.includes(ability.workAbility)
//               ? "bg-black text-white"
//               : "bg-white text-black"
//           }`}
//           >
//             {ability.name}
//           </button>
//         ))}
//     </>
//   );
// };
