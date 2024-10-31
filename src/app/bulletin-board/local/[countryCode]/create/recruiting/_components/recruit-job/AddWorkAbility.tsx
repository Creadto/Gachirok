import CloseIcon from "@/core/components/icons/CloseIcon";
import { JobGroupList } from "@/core/data/JobCategoryList";
import { WorkAbilityList } from "@/core/data/WorkAbilityList";
import Image from "next/image";
import { useState } from "react";

interface WorkAbilityProps {
  workAbility: string[];
  setWorkAbility: React.Dispatch<React.SetStateAction<string[]>>;
  selectedJobCategory: string;
  handleWorkAbilityClick: (value: string) => void;
}

export const AddWorkAbility = ({
  workAbility,
  setWorkAbility,
  selectedJobCategory,
  handleWorkAbilityClick,
}: WorkAbilityProps) => {
  const workAbilityList = WorkAbilityList;
  const jobGroupOptions = JobGroupList;
  const [isAbilityModalOpen, setIsAbilityModalOpen] = useState(false);

  return (
    <>
      {workAbility.length !== 0 ? (
        <div className="w-full flex-col border rounded-lg bg-[#f6f6f6] mt-[15px]">
          <div className="w-full py-[15px] shadow-sm flex ">
            <span className="block pl-[15px] text-sm font-semibold">능력</span>
            <button
              type="button"
              className="ml-auto mr-[15px]"
              onClick={() => setIsAbilityModalOpen(true)}
            >
              <Image
                src="/images/icons/plus-red.webp"
                width={20}
                height={20}
                alt="Add"
              />
            </button>
          </div>
          <div className="ml-[15px] mt-[15px] mb-[20px] flex flex-wrap">
            {workAbilityList
              .filter((ability) => workAbility.includes(ability.workAbility))
              .map((ability) => (
                <button
                  onClick={() =>
                    setWorkAbility((prev) =>
                      prev.filter((item) => item !== ability.workAbility)
                    )
                  }
                  key={ability.id}
                  value={ability.workAbility}
                  className="text-[13px] py-[9px] px-[12px] border bg-white border-[#eeeeee] mb-[5px] mr-[5px] flex flex-row items-center justify-center rounded-[50px]"
                >
                  <span>{ability.name}</span>
                  <Image
                    src="/images/icons/delete-x.webp"
                    width={14}
                    height={14}
                    alt="Close"
                  />
                </button>
              ))}
          </div>
        </div>
      ) : (
        <div className="mt-[15px] w-full h-[50px] flex items-center justify-center border-[##dddddd] border rounded-lg text-sm">
          <button
            onClick={() => setIsAbilityModalOpen(true)}
            className="w-full"
            type="button"
          >
            + 능력 추가
          </button>
        </div>
      )}

      {/* 능력 추가 모달 */}
      {isAbilityModalOpen && (
        <div className="fixed inset-0  z-50 bg-black bg-opacity-50 items-center justify-center flex">
          <div className="w-[550px] h-[405px] rounded-[15px] bg-white relative overflow-y-auto">
            {/* 모달 HEADER */}
            <div className="flex flex-row">
              <div className="w-full h-[60px] flex items-start justify-start shadow-sm">
                <span className="font-bold text-lg pl-[15px] py-[17px]">
                  능력
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsAbilityModalOpen(false)}
                className="absolute top-[15px] right-[15px] text-black hover:text-gray-800"
              >
                <CloseIcon />
              </button>
            </div>

            {/* 선택한 능력 */}
            <div className="mt-[20px] ml-[15px] flex flex-col gap-y-[5px]">
              <div className="flex gap-x-[10px]">
                <span className="font-bold">
                  선택한 능력(
                  {selectedJobCategory
                    ? jobGroupOptions.find(
                        (jobGroup) => jobGroup.jobGroup === selectedJobCategory
                      )?.name
                    : "직군/직무 선택안됨"}
                  )
                </span>
                <p className="font-bold">
                  <span className="text-[#e62a2f]">{workAbility.length}</span> /
                  10
                </p>
              </div>
              <span className="text-[13px] text-[#808080]">
                5개 이상 선택하면 제안 확률 2배 UP!
              </span>

              {/* 선택된 능력들 출력 */}
              <div className="mt-[20px] flex flex-wrap">
                {workAbilityList
                  .filter((ability) =>
                    workAbility.includes(ability.workAbility)
                  )
                  .map((ability) => (
                    <button
                      onClick={() =>
                        setWorkAbility((prev) =>
                          prev.filter((item) => item !== ability.workAbility)
                        )
                      }
                      key={ability.id}
                      value={ability.workAbility}
                      className="text-[13px] py-[9px] px-[12px] border border-[#eeeeee] mb-[5px] mr-[5px] flex flex-row items-center justify-center rounded-[50px]"
                    >
                      <span>{ability.name}</span>
                      <Image
                        src="/images/icons/delete-x.webp"
                        width={14}
                        height={14}
                        alt="Close"
                      />
                    </button>
                  ))}
              </div>
            </div>

            <hr className="w-full px-[15px] h-[1px] bg-[#eeeeee] my-[20px]" />

            {/* 능력 추가 버튼들 */}
            <div className="mx-[15px] ">
              {/* 공통 능력들 */}
              <label className="block text-[13px] text-[#808080] mb-[10px]">
                공통
              </label>
              {workAbilityList
                .filter((jobGroup) => jobGroup.jobGroup === "Common")
                .map((ability) => (
                  <button
                    type="button"
                    onClick={() => handleWorkAbilityClick(ability.workAbility)}
                    key={ability.id}
                    value={ability.workAbility}
                    className={`px-[12px] py-[9px] border border-[#eeeeee] rounded-[50px] mb-[5px] mr-[5px] text-[13px] 
                      ${
                        workAbility.includes(ability.workAbility)
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      }`}
                  >
                    {ability.name}
                  </button>
                ))}

              {/* 직군관련 능력들 */}
              <label className="block text-[13px] text-[#808080] mb-[10px] mt-[10px]">
                {
                  jobGroupOptions.find(
                    (jobGroup) => jobGroup.jobGroup === selectedJobCategory
                  )?.name
                }
              </label>
              <div className="mb-[50px]">
                {workAbilityList
                  .filter(
                    (jobGroup) => selectedJobCategory === jobGroup.jobGroup
                  )
                  .map((ability) => (
                    <button
                      type="button"
                      key={ability.id}
                      value={ability.workAbility}
                      onClick={() =>
                        handleWorkAbilityClick(ability.workAbility)
                      }
                      className={`px-[12px] py-[9px] border border-[#eeeeee] rounded-[50px] mb-[5px] mr-[5px] text-[13px] 
                      ${
                        workAbility.includes(ability.workAbility)
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {ability.name}
                    </button>
                  ))}
              </div>
              <button
                className={` text-white rounded-lg
               flex items-center justify-center w-full py-[16px] mb-[15px]  ${
                 workAbility.length === 0 ? "bg-[#a3a3a3]" : "bg-black"
               }`}
               disabled={workAbility.length === 0}
                onClick={() => setIsAbilityModalOpen(false)}
              >
                선택완료
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
