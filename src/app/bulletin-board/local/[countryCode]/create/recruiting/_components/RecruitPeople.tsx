import { QuillEditor } from "@/app/bulletin-board/_components/QuillEditor";
import DropdownSelector from "@/core/components/DropdownSelector";
import { LocationIcon } from "@/core/components/icons/LocationIcon";
import SingleDateSelector from "@/core/components/SingleDateSelector";
import { CountryList } from "@/core/data/CountryList";
import { JobCategoryList, JobGroupList } from "@/core/data/JobCategoryList";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { JobCategory } from "./JobCategory";
import { JobSpecification } from "./JobSpecification";

export default function RecruitPeople() {
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

  //소 카테고리
  const [recruitJob, setRecruitJob] = useState(false);

  //직군/직무
  const [selectedJobCategory, setSelectedJobCategory] = useState<string>("");
  const jobGroupOptions = JobGroupList;
  const jobCategoryOptions = JobCategoryList;

  const [selectedJobSpecification, setSelectedJobSpecification] = useState<
    string[]
  >([]);

  // 직업 카테고리 드롭다운
  const [isJobSelectOpen, setIsJobSelectOpen] = useState(false);

  //고용 형태
  const [recruitType, setRecruitType] = useState<string>("");
  const recruitOptions = ["계약직", "정규직", "인턴", "아르바이트"];

  //경력
  const [workExperience, setWorkExperience] = useState<string>("");
  const workExperienceOptions = ["1년 미만", "1년", "2년", "3년", "5년이상"];

  //주급
  const [weeklySalary, setWeeklySalary] = useState<number | null>(null);

  // 근무지
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countries = CountryList;

  //채용 마감일
  const [recruitEndDate, setRecruitEndDate] = useState<Date | null>(null);

  //근무 기간
  const [workPeriod, setWorkPeriod] = useState<string>("");
  const workPeriodOptions = ["1년 미만", "1년", "2년", "3년", "5년이상"];

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

      <div className="flex flex-row gap-x-5">
        {/* 고용 형태 */}
        <div className="flex flex-1 flex-col">
          <DropdownSelector
            selectedValue={recruitType}
            setSelectedValue={setRecruitType}
            register={register}
            errors={errors}
            options={recruitOptions}
            name="recruitType"
            errorMessage="고용형태 선택은 필수입니다."
            placeholder="고용형태를 선택해주세요."
            label="고용형태"
            trigger={trigger}
            setValue={setValue}
          />
        </div>
        {/* 경력 */}
        <div className="flex flex-1 flex-col">
          <DropdownSelector
            selectedValue={workExperience}
            setSelectedValue={setWorkExperience}
            register={register}
            errors={errors}
            options={workExperienceOptions}
            name="workExperience"
            errorMessage="경력 선택은 필수입니다."
            placeholder="경력을 선택해주세요."
            label="경력"
            trigger={trigger}
            setValue={setValue}
          />
        </div>
      </div>

      <div className="flex flex-row gap-x-5">
        {/* 주급 */}
        <div className="flex flex-col w-full relative">
          <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
            주급
          </label>
          <input
            type="number"
            value={weeklySalary?.toString()}
            onChange={(e) =>
              setWeeklySalary(Number(parseFloat(e.target.value).toFixed(1)))
            }
            placeholder="주급을 입력해주세요."
            className="block w-full border bg-[#F6F6F6] text-black text-[14px] text-start h-[50px]
rounded-lg  px-[15px]"
            style={{
              WebkitAppearance: "none", // Chrome, Safari, Edge
              MozAppearance: "textfield", // Firefox
            }}
          />
          <span className="absolute right-[15px] top-[80px]">/주</span>
        </div>
      </div>

      <div className="flex flex-row gap-x-[20px] mt-[40px]">
        {/* 채용 마감일 */}
        <div className="block flex-1 text-xs mb-2">
          <label className="block mb-2 flex-1 text-xs">채용 마감일</label>
          <SingleDateSelector
            errors={errors}
            name="recruitEndDate"
            selectedDate={recruitEndDate}
            onDateChange={setRecruitEndDate}
            register={register}
            placeholder="채용 마감일을 선택해주세요"
            setValue={setValue}
          />
        </div>
        {/* 근무 기간 */}
        <div className="flex flex-1 flex-col">
          <DropdownSelector
            selectedValue={workPeriod}
            setSelectedValue={setWorkExperience}
            register={register}
            errors={errors}
            options={workPeriodOptions}
            name="workPeriod"
            errorMessage="근무 기간 선택은 필수입니다."
            placeholder="근무기간을 선택해주세요."
            label="근무 기간"
            trigger={trigger}
            setValue={setValue}
          />
        </div>
      </div>

      {/* 위치 */}
      <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
        위치
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

      <div className="flex  h-[150px] w-full  mt-[20px] rounded-lg">
        {/* 매물 위치 */}
        <div className="rounded-md flex flex-1 bg-[#F6F6F6] text-sm text-[#0676FC] items-center justify-center ">
          등록하실 근무지의 위치를 표시합니다.
        </div>
      </div>

      <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />

      {/* 채용 공고 */}
      {/* 제목 */}
      <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
        공고 제목
      </label>
      <input
        type="text"
        {...register("title", { required: true })}
        className="block w-full border bg-[#F6F6F6] text-black text-[14px] h-[50px]
rounded-lg p-[15px]"
        placeholder="채용 공고명을 입력해주세요"
      />
      {errors.title && (
        <p className="text-red-500">공고의 제목은 필수항목입니다.</p>
      )}

      {/* 본문 */}
      <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
        공고 내용
      </label>
      <QuillEditor
        register={register}
        placeholder={"채용 공고 및 상세 내용을 입력해주세요"}
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
