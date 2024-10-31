import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import CostlyDetailsButton from "./CostlyDetailsButton";
import { useEffect, useState } from "react";

interface CostlyDetailsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  setValue: UseFormSetValue<any>;
  isCostlyItemOpen: boolean;
}

/**
 * @Description 필요한 비용이 '있음'일 경우 세부 비용 선택하는 Component
 * @author 김영서
 **/
const CostlyDetails = ({
  register,
  errors,
  setValue,
  isCostlyItemOpen,
}: CostlyDetailsProps) => {
  const [contentCost, setContentCost] = useState(false);
  const [hostTipCost, setHostTipCost] = useState(false);
  const [rentalCost, setRentalCost] = useState(false);
  const [materialCost, setMaterialCost] = useState(false);
  const [snackCost, setSnackCost] = useState(false);
  const [admissionCost, setAdmissionCost] = useState(false);
  const [entryCost, setEntryCost] = useState(false);
  const [isCustomCostDescriptionOpen, setIsCustomCostDescriptionOpen] =
    useState(false);

  useEffect(() => {
    if (isCostlyItemOpen === false) {
      setValue("cost", "");
      setValue("customCostDescription", "");
      setContentCost(false);
      setHostTipCost(false);
      setRentalCost(false);
      setMaterialCost(false);
      setSnackCost(false);
      setAdmissionCost(false);
      setEntryCost(false);
      setIsCustomCostDescriptionOpen(false);
    }
    contentCost === true
      ? setValue("content", contentCost)
      : setValue("content", false);
    hostTipCost === true
      ? setValue("hostTip", hostTipCost)
      : setValue("hostTip", false);
    rentalCost === true
      ? setValue("rental", rentalCost)
      : setValue("rental", false);
    materialCost === true
      ? setValue("material", materialCost)
      : setValue("material", false);
    snackCost === true
      ? setValue("snack", snackCost)
      : setValue("snack", false);
    admissionCost === true
      ? setValue("admission", admissionCost)
      : setValue("admission", false);
    entryCost === true
      ? setValue("entry", entryCost)
      : setValue("entry", false);
  }, [
    contentCost,
    hostTipCost,
    rentalCost,
    materialCost,
    snackCost,
    admissionCost,
    entryCost,
    setValue,
    isCostlyItemOpen,
  ]);

  if (isCostlyItemOpen === false) return null;
  else {
    return (
      <>
        <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
          예상 비용 입력
        </label>
        <input
          type="text"
          {...register("cost", { required: true })}
          className="block w-full border bg-[#F6F6F6] text-black text-[14px] h-[50px]
   rounded-lg p-[15px]"
          placeholder="예상 필요 비용을 입력하세요. 예) 10,000 KRW, 20 USD"
        />
        {errors.cost && (
          <p className="text-red-500">예상 필요 비용은 필수 항목입니다..</p>
        )}

        {/* 비용 정보 */}
        <div className="w-full h-full pb-[20px] mt-[18px] border border-[#EEEEEE] rounded-lg">
          <label className="block mt-[15px] ml-[15px] text-[#E62A2F] font-semibold text-sm">
            비용 정보
          </label>
          <span className="text-xs text-[#A3A3A3] ml-[15px] mt-[5px] block">
            예상 필요 비용은 호스트와 개인적으로 만나서 결제하는 지침비용입니다.
          </span>
          <span className="text-xs text-[#A3A3A3] ml-[15px] mt-[5px] block">
            예상되는 비용 항목을 모두 선택해주세요.
          </span>

          {/* 운영비 */}
          <div className="mt-5 ml-[15px]">
            <label className="text-xs text-[#808080]">운영비</label>
            <div className="flex flex-row gap-x-[5px]">
              <CostlyDetailsButton
                value={contentCost}
                title="컨텐츠 제작비"
                onClick={() => setContentCost((prev) => !prev)}
              />
              <CostlyDetailsButton
                value={hostTipCost}
                title="호스트 수고비"
                onClick={() => setHostTipCost((prev) => !prev)}
              />
            </div>
          </div>

          {/* 모임비 */}
          <div className="mt-5 ml-[15px]">
            <label className="text-xs text-[#808080]">모임비</label>
            <div className="flex flex-row gap-x-[5px]">
              <CostlyDetailsButton
                value={rentalCost}
                title="대여료"
                onClick={() => setRentalCost((prev) => !prev)}
              />
              <CostlyDetailsButton
                value={materialCost}
                title="재료비"
                onClick={() => setMaterialCost((prev) => !prev)}
              />
              <CostlyDetailsButton
                value={snackCost}
                title="다과비"
                onClick={() => setSnackCost((prev) => !prev)}
              />
            </div>
          </div>

          {/* 기타 */}
          <div className="mt-5 ml-[15px]">
            <label className="text-xs text-[#808080]">기타</label>
            <div className="flex flex-row gap-x-[5px]">
              <CostlyDetailsButton
                value={admissionCost}
                title="입장료"
                onClick={() => setAdmissionCost((prev) => !prev)}
              />
              <CostlyDetailsButton
                value={entryCost}
                title="참가비"
                onClick={() => setEntryCost((prev) => !prev)}
              />
              <button
                type="button"
                className={`border border-[#EEEEEE] rounded-[50px] px-[12px] py-[9px] ${
                  isCustomCostDescriptionOpen
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
                onClick={() =>
                  setIsCustomCostDescriptionOpen((prev: boolean) => !prev)
                }
              >
                기타 (직접 입력)
              </button>
            </div>
            {isCustomCostDescriptionOpen && (
              <>
                <input
                  type="text"
                  {...register("customCostDescription", { required: true })}
                  className="block w-full border bg-[#F6F6F6] text-black text-[14px] h-[50px]
   rounded-lg p-[15px] mt-[10px]"
                  placeholder="비용의 용도를 직접 입력하세요. 예) 맥주 한 병 및 안주 비용"
                />
                {errors.customCostDescription && (
                  <p className="text-red-500">
                    직접 입력 선택 시 내용은 필수항목입니다.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </>
    );
  }
};

export default CostlyDetails;
