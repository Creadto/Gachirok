import { useEffect, useState } from "react";
import Image from "next/image";
import CloseIcon from "@/core/components/icons/CloseIcon";
import { WorkExperience } from "../../_types/WorkExperience";

export const AddWorkExperience = () => {
  const [isWorkExperienceModalOpen, setIsWorkExperienceModalOpen] =
    useState(false); //경력 추가 모달

  const [totalExperience, setTotalExperience] = useState<{
    years: number;
    months: number;
  }>({ years: 0, months: 0 });
  const [companyName, setCompanyName] = useState("");
  const [duty, setDuty] = useState("");

  const [employmentStartDate, setEmploymentStartDate] = useState<string>("");
  const [employmentEndDate, setEmploymentEndDate] = useState<string>("");

  const [dateError, setDateError] = useState<string | null>(null); // 날짜 오류 상태

  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmploymentStartDate(e.target.value);
  };
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmploymentEndDate(e.target.value);
  };

  const handleSubmit = () => {
    console.log(new Date(employmentStartDate), new Date(employmentEndDate));
    if (new Date(employmentStartDate) > new Date(employmentEndDate)) {
      setDateError("종료일은 시작일보다 빠를 수 없습니다.");
    } else {
      setDateError(null);
      const { years, months } = calculateDifferenceInYearsAndMonths(
        employmentStartDate,
        employmentEndDate
      );
      setTotalExperience({ years, months });

      const newWorkExperience: WorkExperience = {
        companyName,
        duty,
        years,
        months,
      };
      // 경력 정보 배열에 추가
      setWorkExperience((prev) => [...prev, newWorkExperience]);

      // 입력 필드 초기화
      setCompanyName("");
      setDuty("");
      setEmploymentStartDate("");
      setEmploymentEndDate("");
      setIsWorkExperienceModalOpen(false); // 모달 닫기
      console.log("sex", workExperience);
    }
  };

  const handleDeleteWorkExperience = (companyName: string, duty: string) => {
    setWorkExperience((prevExperience) =>
      prevExperience.filter(
        (experience) =>
          experience.companyName !== companyName && experience.duty !== duty
      )
    );
  };

  const calculateDifferenceInYearsAndMonths = (
    startDate: string,
    endDate: string
  ) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let yearDiff = end.getFullYear() - start.getFullYear();
    let monthDiff = end.getMonth() - start.getMonth();

    // 월 차이가 음수이면 년도 조정
    if (monthDiff < 0) {
      yearDiff -= 1;
      monthDiff += 12;
    }

    return { years: yearDiff, months: monthDiff };
  };

  useEffect(() => {
    if (new Date(employmentStartDate) > new Date(employmentEndDate)) {
      setDateError("종료일은 시작일보다 빠를 수 없습니다.");
    } else {
      setDateError(null);
      const { years, months } = calculateDifferenceInYearsAndMonths(
        employmentStartDate,
        employmentEndDate
      );
      setTotalExperience({ years, months });
    }
  }, [employmentStartDate, employmentEndDate]);

  return (
    <>
      {workExperience.length !== 0 ? (
        <>
        {/* 입력된 경력 출력 */}
          {workExperience.map((experience) => (
            <div className="w-full mt-[15px] rounded-lg bg-[#f6f6f6] flex flex-row">
              <div className=" w-full flex flex-col p-[15px]  gap-y-[5px]">
                <span className="text-[#a3a3a3] text-xs">
                  {experience.years ? `${experience.years}년` : ""}
                  {experience.months ? `${experience.months}개월` : ""}
                </span>
                <span className="text-sm font-semibold">
                  [{experience.companyName}] {experience.duty}
                </span>
              </div>
              <button
                className="ml-auto mr-[15px] flex items-center justify-center"
                key={`${experience.companyName} + ${experience.duty}`}
                onClick={() =>
                  handleDeleteWorkExperience(
                    experience.companyName,
                    experience.duty
                  )
                }
              >
                <Image
                  src="/images/icons/delete-x@2x.webp"
                  width={20}
                  height={20}
                  alt="Close"
                />
              </button>
            </div>
          ))}
          {/* 경력 추가 버튼 */}
          <div className="mt-[15px] w-full h-[50px] flex items-center justify-center border-[##dddddd] border rounded-lg text-sm">
            <button
              onClick={() => setIsWorkExperienceModalOpen(true)}
              className="w-full"
              type="button"
            >
              + 경력 추가
            </button>
          </div>
        </>
      ) : (
        // 경력 버튼 추가
        <>
          <label className="block mt-[40px] text-[13px] text-[#808080] mb-[5px]">
            경력
          </label>
          <span className="text-[11px] text-[#a3a3a3]">
            회사 정보와 근무정보를 입력해주세요.
          </span>
          <div className="mt-[15px] w-full h-[50px] flex items-center justify-center border-[##dddddd] border rounded-lg text-sm">
            <button
              onClick={() => setIsWorkExperienceModalOpen(true)}
              className="w-full"
              type="button"
            >
              + 경력 추가
            </button>
          </div>
        </>
      )}

      {/* 경력 추가 모달 */}
      {isWorkExperienceModalOpen && (
        <div className="fixed inset-0  z-50 bg-black bg-opacity-50 items-center justify-center flex">
          <div className="w-[550px] h-[544px] rounded-[15px] bg-white relative overflow-y-auto">
            {/* 모달 HEADER */}
            <div className="flex flex-row">
              <div className="w-full h-[60px] flex items-start justify-start shadow-sm">
                <span className="font-bold text-lg px-[15px] py-[17px]">
                  경력
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsWorkExperienceModalOpen(false)}
                className="absolute top-[15px] right-[15px] text-black hover:text-gray-800"
              >
                <CloseIcon />
              </button>
            </div>

            {/* 경력 */}
            <div className="w-full bg-[#ffe9ea]">
              <div className="px-[10px] py-[15px] flex items-center justify-center gap-x-[5px]">
                <span className="text-[#e62a2f] font-semibold flex">경력</span>
                <span className="font-semibold flex">
                  {dateError ? (
                    "0년 0개월"
                  ) : (
                    <>
                      {isNaN(totalExperience.years) ? 0 : totalExperience.years}
                      년{" "}
                      {isNaN(totalExperience.months)
                        ? 0
                        : totalExperience.months}
                      개월
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* 근무회사 */}
            <div className="mx-[15px]">
              <span className="mt-[20px] font-semibold text-sm block">
                근무회사
              </span>
              <label className="mt-[20px] text-[13px] text-[#808080] block">
                회사 정보
              </label>

              {/* 회사명 */}
              <input
                type="text"
                placeholder="회사명을 입력해주세요."
                value={companyName ? companyName : ""}
                className="w-full h-[50px] p-[15px] mt-[10px] bg-[#f6f6f6] border border-[#eeeeee] rounded-lg text-black"
                onChange={(e) => setCompanyName(e.target.value)}
              />

              {/* 업무 */}
              <input
                type="text"
                placeholder="업무를 입력해주세요."
                value={duty ? duty : ""}
                className="w-full h-[50px] p-[15px] mt-[10px] bg-[#f6f6f6] border border-[#eeeeee] rounded-lg text-black"
                onChange={(e) => setDuty(e.target.value)}
              />

              {/* 근무정보 */}
              <label className="mt-[30px] text-[13px] text-[#808080] block">
                근무 정보
              </label>
              <div className="flex">
                <input
                  type="month"
                  value={employmentStartDate}
                  onChange={handleStartDateChange}
                  className="border border-gray-300 rounded-md p-2 text-sm flex-1 mr-[15px]"
                />
                <p className="flex items-center justify-center text-[13px] text-[#808080] w-[9px]">
                  ~
                </p>
                <input
                  type="month"
                  value={employmentEndDate}
                  onChange={handleEndDateChange}
                  className="border border-gray-300 rounded-md p-2 text-sm flex-1 ml-[15px]"
                />

                {/* <div className="mt-4">
                  <p className="text-sm">
                    선택한 날짜:{" "}
                    {employmentDate
                      ? employmentDate.replace("-", "년 ") + "월"
                      : "선택되지 않음"}
                  </p>
                </div> */}
              </div>
              {dateError !== null && (
                <p className="flex items-center justify-center text-red-500 text-sm pt-[10px]">
                  {dateError}
                </p>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={
                  companyName === "" ||
                  duty === "" ||
                  employmentStartDate === "" ||
                  employmentEndDate === ""
                }
                className={`bg-black text-white rounded-lg
               flex items-center justify-center w-full py-[16px] mb-[15px] mt-[41px] ${
                 companyName === "" ||
                 duty === "" ||
                 employmentStartDate === "" ||
                 employmentEndDate === ""
                   ? "bg-[#a3a3a3]"
                   : "bg-black"
               }`}
              >
                등록완료
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
