import { QuillEditor } from "@/app/bulletin-board/_components/QuillEditor";
import DropdownSelector from "@/core/components/DropdownSelector";
import { LocationIcon } from "@/core/components/icons/LocationIcon";
import { CountryList } from "@/core/data/CountryList";
import { LanguageListProps } from "@/core/data/LanguageList";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { JobCategory } from "./JobCategory";
import { JobSpecification } from "./JobSpecification";
import { AddLanguageAbility } from "./recruit-job/AddLanguageAbility";
import { AddWorkAbility } from "./recruit-job/AddWorkAbility";
import { AddWorkExperience } from "./recruit-job/AddWorkExperience";

export default function RecruitJob() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm();

  const onValid = (data: any) => {
    console.log(data);
    // 여기에서 데이터를 서버로 전송하거나 다른 작업을 수행합니다.
  };

  const watchImages: FileList | undefined = watch("images") as FileList;
  //이미지 Thumbnail
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  //직군/직무
  const [selectedJobCategory, setSelectedJobCategory] = useState<string>("");

  const [selectedJobSpecification, setSelectedJobSpecification] = useState<
    string[]
  >([]);

  //역량 - 능력
  const [workAbility, setWorkAbility] = useState<string[]>([]);

  //역량 - 회화
  const [languageAbility, setLanguageAbility] = useState<LanguageListProps[]>(
    []
  );

  //고용 형태
  const [recruitType, setRecruitType] = useState<string>("");
  const recruitOptions = ["계약직", "정규직", "인턴", "아르바이트"];

  //주급
  const [weeklySalary, setWeeklySalary] = useState<number | null>(null);

  // 근무지
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countries = CountryList;

  //채용 공고 내용(본문)
  const [content, setContent] = useState("");

  // 미리보기
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  //미리보기 Modal 열림 여부
  const handleModal = () => {
    setIsPreviewModalOpen(!isPreviewModalOpen);
  };

  const handleJobSpecificationClick = (value: string) => {
    setSelectedJobSpecification((prev) => {
      const newSelectedJobSpecification = prev.includes(value)
        ? prev.filter((category) => category !== value)
        : [...prev, value];

      setValue("jobSpecification", newSelectedJobSpecification, {
        shouldValidate: true,
      });
      return newSelectedJobSpecification;
    });
  };

  const handleWorkAbilityClick = (value: string) => {
    setWorkAbility((prev) => {
      // 선택된 능력이 이미 포함되어 있는지 확인
      const isSelected = prev.includes(value);
      const newSelectedWorkAbility = isSelected
        ? prev.filter((ability) => ability != value) // 선택 취소
        : prev.length < 10
        ? [...prev, value] // 최대 길이 이하일 때만 선택
        : prev;

      if (!isSelected && prev.length >= 10) {
        // 능력이 최대치에 도달하고 새 항목을 추가하려고 할 때만 경고
        alert("능력은 최대 10개 선택 가능합니다.");
      }

      // `setValue`는 선택 취소나 추가 모두에서 호출
      setValue("workAbility", newSelectedWorkAbility, {
        shouldValidate: true,
      });

      return newSelectedWorkAbility;
    });
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
  };

  useEffect(() => {
    if (watchImages && watchImages.length > 0) {
      const imageFiles = Array.from(watchImages); // 파일 배열로 변환
      const imageUrls = imageFiles.map((file) => URL.createObjectURL(file)); // 각 파일에 대한 URL 생성
      setImagePreviews(imageUrls); // URL 상태로 저장

      // 메모리 누수 방지 위해 URL 해제
      return () => {
        imageUrls.forEach((url) => URL.revokeObjectURL(url));
      };
    }
    console.log("jobCategory", selectedJobCategory);
  }, [watchImages, selectedJobCategory]);

  const handleImageRemove = (index: number) => {
    const updatedImages = Array.from(watchImages).filter((_, i) => i !== index);

    // react-hook-form의 setValue로 FileList 업데이트
    const dataTransfer = new DataTransfer();
    updatedImages.forEach((file) => dataTransfer.items.add(file));
    setValue("images", dataTransfer.files);

    // 미리보기 이미지 업데이트
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedPreviews);
  };

  const customFileLabel =
    watchImages && watchImages.length > 0
      ? `${watchImages.length}개의 파일 선택됨`
      : "파일 선택";

  //값이 변경될 때마다 setValue()로 useForm의 data에 저장
  useEffect(() => {
    // clearErrors(); //Submit시 오류가 뜨고, 수정하면 오류 삭제되게끔

    setValue("category", selectedJobCategory);
    console.log("sex", selectedJobSpecification);
  }, [selectedJobCategory, selectedJobSpecification]);

  return (
    <form onSubmit={handleSubmit(onValid)}>
      {/* 직군/직무*/}
      <JobCategory
        register={register}
        selectedJobCategory={selectedJobCategory}
        setSelectedJobCategory={setSelectedJobCategory}
        setSelectedJobSpecification={setSelectedJobSpecification}
        setValue={setValue}
        errors={errors}
      />

      {/* 세부 직무 표시 */}
      <JobSpecification
        selectedJobCategory={selectedJobCategory}
        handleJobSpecificationClick={handleJobSpecificationClick}
        selectedJobSpecification={selectedJobSpecification}
      />

      <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />

      {/* 역량 */}
      <label className="block mt-[40px] text-[13px] text-[#808080] mb-[5px]">
        역량
      </label>
      <span className="text-[11px] text-[#a3a3a3]">
        본인의 직무와 관련된 스킬을 추가해보세요.
      </span>

      {/* 능력추가 버튼 */}
      <AddWorkAbility
        workAbility={workAbility}
        setWorkAbility={setWorkAbility}
        selectedJobCategory={selectedJobCategory}
        handleWorkAbilityClick={handleWorkAbilityClick}
      />

      {/* 회화 추가 버튼 */}
      <AddLanguageAbility
        languageAbility={languageAbility}
        setLanguageAbility={setLanguageAbility}
      />

      {/* ---------------------------------------------------------------------------------------------- */}

      <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />
      {/* 경력 */}
      <AddWorkExperience />

      <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />

      <DropdownSelector
        selectedValue={recruitType}
        setSelectedValue={setRecruitType}
        register={register}
        errors={errors}
        options={recruitOptions}
        name="recruitType"
        errorMessage="고용형태 선택은 필수입니다."
        placeholder="고용형태를 선택해주세요."
        label="희망 고용형태"
        trigger={trigger}
        setValue={setValue}
      />

      <div className="flex flex-row gap-x-5">
        {/* 주급 */}
        <div className="flex flex-col w-full relative">
          <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
            희망 주급
          </label>
          <input
            type="number"
            value={weeklySalary?.toString()}
            onChange={(e) =>
              setWeeklySalary(Number(parseFloat(e.target.value).toFixed(1)))
            }
            placeholder="주급을 입력해주세요."
            className="block w-full border bg-[#F6F6F6] text-black text-[14px] text-start h-[50px] rounded-lg  px-[15px]"
            style={{
              WebkitAppearance: "none", // Chrome, Safari, Edge
              MozAppearance: "textfield", // Firefox
            }}
          />
          <span className="absolute right-[15px] top-[80px]">/주</span>
        </div>
      </div>

      {/* 위치 */}
      <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
        희망 근무지
      </label>
      <div className="flex gap-x-[20px]">
        {/* 국가 선택 */}
        <div className="relative flex flex-1">
          <div className="absolute left-[15px] top-[17px]">
            <LocationIcon />
          </div>
          <button
            type="button"
            {...register("countryCode", { required: true })}
            className="pl-[36px] block border w-full flex-1 text-[#A3A3A3] text-sm rounded-lg h-[50px] text-start bg-[#F6F6F6]"
            onClick={() => {
              setIsCountryDropdownOpen((prev) => !prev);
            }}
          >
            {selectedCountry ? (
              <div className="flex flex-row gap-x-[4px] items-center justify-start">
                {
                  countries.find((country) => country.code === selectedCountry)
                    ?.icon
                }
                <span>
                  {
                    countries.find(
                      (country) => country.code === selectedCountry
                    )?.name
                  }
                </span>
              </div>
            ) : (
              "국가를 선택해주세요"
            )}
          </button>

          {/* 국가 선택 드롭다운 */}
          {isCountryDropdownOpen && (
            <div className="top-[50px] absolute w-[95%] left-[24px] z-20  bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {countries.map(({ code, name, icon }) => (
                <button
                  key={code}
                  onClick={() => handleCountrySelect(code)}
                  className="w-full text-left flex items-center space-x-[10px] px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white transition-colors duration-150"
                >
                  {icon}
                  <span>{name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 우편번호 */}
        <div className="flex flex-1">
          <input
            type="number"
            {...register("zipCode", { required: true })}
            className="block border bg-[#F6F6F6] text-black text-[14px] h-[50px] rounded-lg p-[15px] w-full"
            placeholder="우편번호를 입력해주세요"
          />
        </div>
      </div>

      {/* 상세주소 */}
      <input
        type="text"
        {...register("location", { required: true })}
        className="mt-[10px] block w-full border bg-[#F6F6F6] text-black text-[14px] h-[50px] rounded-lg p-[15px]"
        placeholder="상세 주소 입력"
      />

      <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />

      {/* 채용 공고 */}
      {/* 제목 */}
      <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
        자기소개 제목
      </label>
      <input
        type="text"
        {...register("title", { required: true })}
        className="block w-full border bg-[#F6F6F6] text-black text-[14px] h-[50px]
rounded-lg p-[15px]"
        placeholder="자기소개를 입력해주세요"
      />
      {errors.title && (
        <p className="text-red-500">자기소개 제목은 필수항목입니다.</p>
      )}

      {/* 본문 */}
      <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
        자기소개
      </label>
      <QuillEditor
        register={register}
        placeholder={`간단한 자기 소개로 이력서를 돋보이게 만들어보세요.
\n\n- 본인의 업무 경험을 바탕으로 핵심역량과 업무 스킬을 간단히 작성해주세요.
\n- 3~5줄로 요약해서 작성하길 추천드립니다.`}
        trigger={trigger}
        name="introduction"
        errors={errors}
        value={content}
        onChange={(value) => {
          setContent(value);
          setValue("introduction", value);
          trigger("introduction");
        }}
      />

      {/* 이미지 업로드 */}
      <div>
        <div className="relative w-max mt-2">
          <input
            type="file"
            accept="image/*"
            {...register("images")}
            multiple
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="px-4 py-2 bg-[#E62A2F] text-white rounded-md text-center cursor-pointer">
            {customFileLabel}
          </div>
        </div>
        <p className="mt-[10px]">
          {watchImages
            ? `10개 중 ${watchImages.length}개 업로드됨`
            : "10개 중 0개 업로드"}
        </p>

        {/* 이미지 미리보기 섹션 */}
        <div className="flex flex-wrap gap-4 mt-4">
          {imagePreviews.map((src, index) => (
            <div
              key={index}
              className="w-24 h-24 border border-gray-300 rounded-md overflow-hidden"
              onClick={() => handleImageRemove(index)}
            >
              <img
                src={src}
                alt={`미리보기 ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 작성완료 버튼 */}
      <div className="flex items-center justify-center mt-[80px] mb-[150px]">
        <input
          type="submit"
          className="py-[19px] px-[124px] w-[300px] rounded-lg bg-[#E62A2F] text-white hover:cursor-pointer"
          value="작성완료"
        />
      </div>
    </form>
  );
}
