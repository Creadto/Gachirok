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
      setValue("customCostDescription", "")
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
        <label>예상 비용 입력</label>
        <input
          type="text"
          {...register("cost", { required: true })}
          className="block w-full border bg-slate-300  rounded-md p-2 mb-4 mt-5"
          placeholder="예상 필요 비용을 입력하세요. 예) 10,000 KRW, 20 USD"
        />
        {errors.cost && (
          <p className="text-red-500">예상 필요 비용은 필수 항목입니다..</p>
        )}
        <label className="block">비용 정보</label>
        <span className="text-xs">
          예상 필요 비용은 호스트와 개인적으로 만나서 결제하는 지침비용입니다.
        </span>
        <br />
        <div className="mt-5">
          <span className="mt-4 text-sm">운영비</span>
          <div className="flex flex-row gap-x-6">
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
        <div className="mt-5">
          <span className="mt-4 text-sm">모임비</span>
          <div className="flex flex-row gap-x-6">
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
        <div className="mt-5">
          <span className="mt-4 text-sm">기타</span>
          <div className="flex flex-row gap-x-6">
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
              className={`border border-slate-500 rounded-md border-solid ${
                isCustomCostDescriptionOpen
                  ? "bg-black text-white"
                  : "bg-white text-slate-500"
              }`}
              onClick={() =>
                setIsCustomCostDescriptionOpen((prev: boolean) => !prev)
              }
            >
              기타
            </button>
          </div>
          {isCustomCostDescriptionOpen && (
            <>
              <input
                type="text"
                {...register("customCostDescription", { required: true })}
                className="block w-full border bg-slate-300  rounded-md p-2 mb-4 mt-5"
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
      </>
    );
  }
};

export default CostlyDetails;
