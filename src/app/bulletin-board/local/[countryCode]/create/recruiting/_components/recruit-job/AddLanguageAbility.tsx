import CloseIcon from "@/core/components/icons/CloseIcon";
import {
  LanguageList,
  LanguageListProps,
  LanguageTypeList,
} from "@/core/data/LanguageList";
import Image from "next/image";
import { useState } from "react";

interface AddLanguageAbilityProps {
  languageAbility: LanguageListProps[];
  setLanguageAbility: React.Dispatch<React.SetStateAction<LanguageListProps[]>>;
}

export const AddLanguageAbility = ({
  languageAbility,
  setLanguageAbility,
}: AddLanguageAbilityProps) => {
  const [isLanguageTypeDown, setIsLanguageTypeDown] = useState(false); //언어 선택 드롭다운
  const [isLanguageLevelDown, setIsLanguageLevelDown] = useState(false); //언어 능력 드롭다운
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false); //회화 추가 모달
  const [languageType, setLanguageType] = useState(""); //회화 언어 종류
  const [languageLevel, setLanguageLevel] = useState(""); //회화 능력 수준
  const languageList = LanguageList;
  const languageTypeList = LanguageTypeList;

  return (
    <>
      {/* 회화 추가 버튼 */}
      {languageAbility.length !== 0 ? (
        <div className="w-full flex-col border rounded-lg bg-[#f6f6f6] mt-[15px]">
          <div className="w-full py-[15px] shadow-sm flex ">
            <span className="block pl-[15px] text-sm font-semibold">회화</span>
            <button
              type="button"
              className="ml-auto mr-[15px]"
              onClick={() => setIsLanguageModalOpen(true)}
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
            {languageAbility
              .filter((language) => languageAbility.includes(language))
              .map((language) => (
                <button
                  onClick={() =>
                    setLanguageAbility((prev) =>
                      prev.filter((item) => item !== language)
                    )
                  }
                  key={language.id}
                  value={language.language_level}
                  className="text-[13px] py-[9px] px-[12px] border bg-white border-[#eeeeee] mb-[5px] mr-[5px] flex flex-row items-center justify-center rounded-[50px]"
                >
                  <span>{language.language_level_name}</span>
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
            onClick={() => setIsLanguageModalOpen(true)}
            className="w-full"
            type="button"
          >
            + 회화 추가
          </button>
        </div>
      )}

      {/* 회화 추가 모달 */}
      {isLanguageModalOpen && (
        <div className="fixed inset-0  z-50 bg-black bg-opacity-50 items-center justify-center flex">
          <div className="w-[550px] h-[322px] rounded-[15px] bg-white relative overflow-y-auto">
            {/* 모달 HEADER */}
            <div className="flex flex-row">
              <div className="w-full h-[60px] flex items-start justify-start shadow-sm">
                <span className="font-bold text-lg pl-[15px] py-[17px]">
                  회화
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsLanguageModalOpen(false)}
                className="absolute top-[15px] right-[15px] text-black hover:text-gray-800"
              >
                <CloseIcon />
              </button>
            </div>

            {/* 외국어명 선택 */}
            <div className="mx-[15px] ">
              <input
                type="text"
                readOnly
                placeholder="외국어명을 선택해주세요"
                value={
                  languageType
                    ? languageTypeList.find(
                        (language) => language.languageType === languageType
                      )?.languageTypeName
                    : ""
                }
                onClick={() => setIsLanguageTypeDown((prev) => !prev)}
                className="w-full h-[50px] p-[15px] mt-[20px] bg-[#f6f6f6] border border-[#eeeeee] rounded-lg text-black"
              />
              {isLanguageTypeDown && (
                <div className="absolute w-[505px] z-60 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-y-auto">
                  <div className="py-1" role="none">
                    {languageTypeList.map((option, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => {
                          setLanguageType(option.languageType);
                          setIsLanguageTypeDown(false);
                        }}
                        className="block p-[10px] text-[13px] text-black hover:bg-gray-100 w-full text-left shadow-sm"
                      >
                        {option.languageTypeName}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <input
                type="text"
                readOnly
                placeholder="회화 능력을 선택해주세요"
                value={
                  languageLevel
                    ? languageList.find(
                        (language) => language.language_level === languageLevel
                      )?.levelDescription
                    : ""
                }
                onClick={() => setIsLanguageLevelDown((prev) => !prev)}
                className="w-full h-[50px] p-[15px] mt-[20px] bg-[#f6f6f6] border border-[#eeeeee] rounded-lg text-black"
              />
              {isLanguageLevelDown && (
                <div className="absolute w-[505px] z-60 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-y-auto">
                  <div className="py-1" role="none">
                    {languageList
                      .filter((language) => language.language === languageType)
                      .map((level) => (
                        <button
                          type="button"
                          key={level.id}
                          onClick={() => {
                            setLanguageLevel(level.language_level);
                            setIsLanguageLevelDown(false);
                          }}
                          className="block p-[10px] text-[13px] text-black hover:bg-gray-100 w-full text-left shadow-sm"
                        >
                          {level.levelDescription}
                        </button>
                      ))}
                  </div>
                </div>
              )}

              <button
                className={`bg-black text-white rounded-lg
               flex items-center justify-center w-full py-[16px] mb-[15px] mt-[50px] ${
                 languageType === "" || languageLevel === ""
                   ? "bg-[#a3a3a3]"
                   : "bg-black"
               }`}
                type="button"
                disabled={languageType === "" || languageLevel=== ""}
                onClick={() => {
                  setIsLanguageModalOpen(false);
                  const selectedLanguageAbility = LanguageList.find(
                    (entry) => entry.language_level === languageLevel
                  );
                  if (selectedLanguageAbility) {
                    setLanguageAbility((prevList) => {
                      // Check if the selected language ability already exists
                      if (
                        !prevList.some(
                          (ability) =>
                            ability.language_level ===
                            selectedLanguageAbility.language_level
                        )
                      ) {
                        return [...prevList, selectedLanguageAbility];
                      }
                      return prevList; // No change if it's already in the list
                    });
                  }
                  setIsLanguageModalOpen(false);
                  setLanguageLevel("");
                  setLanguageType("");
                }}
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
