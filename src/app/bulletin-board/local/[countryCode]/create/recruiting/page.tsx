"use client";

import { BackButton } from "@/app/bulletin-board/_components/BackButton";
import PreviewModal from "@/app/bulletin-board/_components/PreviewModal";
import TwoButtonForm from "@/app/create-profile/_components/profile-setup/TwoButtonForm";
import DropdownSelector from "@/core/components/DropdownSelector";
import SingleDateSelector from "@/core/components/SingleDateSelector";
import { countryStore } from "@/core/store/country-store";
import { formats } from "@/core/types/Quill";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CategorySelector } from "../_components/CategorySelector";

const QuillWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  // loading: () => <p>Loading ...</p>,
});

Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

interface AddFleaMarketLocalBulletinBoardPageProps {
  params: {
    countryCode: string;
  };
}

/**
 * @Description Local의 Bulletin Board에 구인구직을 작성하는 Page
 * @author 김영서
 **/
export default function AddRecruitingLocalBulletinBoardPage({
  params,
}: AddFleaMarketLocalBulletinBoardPageProps) {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
      ],
      clipboard: {
        matchVisual: false,
      },
      imageDrop: true,
      imageResize: {
        modules: ["Resize", "DisplaySize"],
      },
    }),
    []
  );

  const { country, setCountry } = countryStore();
  const { countryCode } = params;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  //URL의 param이 변화될때마다 country store update
  useEffect(() => {
    setCountry(countryCode);
    console.log("country", countryCode);
  }, [params]);

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
  const jobCategoryOptions = ["IT", "제조업", "농업", "요식업", "사무직"];

  //고용 형태
  const [recruitType, setRecruitType] = useState<string>("");
  const recruitOptions = ["계약직", "정규직", "인턴", "아르바이트"];

  //경력
  const [workExperience, setWorkExperience] = useState<string>("");
  const workExperienceOptions = ["1년 미만", "1년", "2년", "3년", "5년이상"];

  //주급
  const [weeklySalary, setWeeklySalary] = useState<number | null>(null);

  //근무지
  const [location, setLocation] = useState<string>("");
  const locationOptions = ["수내", "정자", "서현", "미금", "야탑"];

  //채용 마감일
  const [recruitEndDate, setRecruitEndDate] = useState<Date | null>(null);

  //근무 기간
  const [workPeriod, setWorkPeriod] = useState<string>("");
  const workPeriodOptions = ["1년 미만", "1년", "2년", "3년", "5년이상"];

  //채용 공고 내용
  const [introduction, setIntroduction] = useState("");

  // 미리보기
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  //미리보기 Modal 열림 여부
  const handleModal = () => {
    setIsPreviewModalOpen(!isPreviewModalOpen);
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
  }, [watchImages]);

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
    clearErrors(); //Submit시 오류가 뜨고, 수정하면 오류 삭제되게끔
    setValue("introduction", introduction);

    setValue("category", selectedJobCategory);
  }, [introduction, selectedJobCategory]);

  return (
    <div className="min-w-xl mx-auto bg-white p-6 rounded-lg">
      <BackButton
        onClick={() => router.push(`/bulletin-board/local/${country}`)}
      />
      <div className="flex flex-row items-center my-auto">
        <h1 className="text-2xl font-bold">글쓰기</h1>
        <div className="bg-slate-400 ml-2 rounded-md">Local</div>
      </div>

      <div className="flex flex-row gap-x-7">
        {/* 카테고리-자유게시판, 소모임, 부동산, 벼룩시장, 구인구직*/}
        {/* 별도의 카테고리 별로 URL주소 할당 */}
        <CategorySelector
          onClickDefaultCategory={() => {
            router.push(`/bulletin-board/local/${country}/create`);
          }}
          onClickFleaMarketCategory={() =>
            router.push(`/bulletin-board/local/${country}/create/flea-market`)
          }
          onClickMeetingsCategory={() =>
            router.push(`/bulletin-board/local/${country}/create/meetings`)
          }
          onClickRealEstateCategory={() =>
            router.push(`/bulletin-board/local/${country}/create/real-estate`)
          }
          onClickRecruitingCategory={() =>
            router.push(`/bulletin-board/local/${country}/create/recruiting`)
          }
        />

        <div className="flex flex-col mt-8 h-full">
          {/* 구인/구직 */}
          <TwoButtonForm
            title="소 카테고리"
            options={[
              { label: "구인", value: false },
              { label: "구직", value: true },
            ]}
            activeValue={recruitJob}
            onChange={setRecruitJob}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onValid)}>
        {/* 직군/직무*/}
        <DropdownSelector
          selectedValue={selectedJobCategory}
          setSelectedValue={setSelectedJobCategory}
          register={register}
          errors={errors}
          options={jobCategoryOptions}
          name="jobCategory"
          errorMessage="직군/직무 선택은 필수입니다."
          placeholder="직군/직무를 선택해주세요."
          label="직군/직무"
        />

        <hr className="border-slate-300 mb-3 mt-3" />

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
            />
          </div>
        </div>

        <div className="flex flex-row gap-x-5">
          {/* 주급 */}
          <div className="flex flex-col flex-1 w-full relative">
            <label className="block mb-2 text-xs">주급</label>
            <input
              type="number"
              value={weeklySalary?.toString()}
              onChange={(e) =>
                setWeeklySalary(Number(parseFloat(e.target.value).toFixed(1)))
              }
              placeholder="주급을 입력해주세요."
              className="block border border-gray-300 rounded-md p-2 mb-4"
              style={{
                WebkitAppearance: "none", // Chrome, Safari, Edge
                MozAppearance: "textfield", // Firefox
              }}
            />
            <span className="absolute right-3 top-[55%] transform -translate-y-1/2 text-gray-500">
              원 / 1주
            </span>
          </div>
          {/* 근무지 */}
          <div className="flex flex-1 flex-col">
            <DropdownSelector
              selectedValue={location}
              setSelectedValue={setLocation}
              register={register}
              errors={errors}
              options={locationOptions}
              name="location"
              errorMessage="근무지 선택은 필수입니다."
              placeholder="근무지를 선택해주세요."
              label="근무지"
            />
          </div>
        </div>

        <div className="flex flex-row gap-x-5">
          {/* 채용 마감일 */}
          <div className="block flex-1 text-xs mb-2">
            <label className="block mb-2 flex-1 text-xs">채용 마감일</label>
            <SingleDateSelector
              errors={errors}
              name="recruitEndDate"
              selectedDate={recruitEndDate}
              onDateChange={setRecruitEndDate}
              register={register}
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
            />
          </div>
        </div>

        <hr className="border-slate-300 mb-3 mt-3" />

        {/* 채용 공고 */}
        {/* 제목 */}
        <label className="block mb-2 text-xs">모임 소개</label>
        <input
          type="text"
          {...register("title", { required: true, maxLength: 30 })}
          className="block w-full border bg-slate-300  rounded-md p-2 mb-4"
          placeholder="채용 공고명을 입력해주세요"
        />
        {errors.title && (
          <p className="text-red-500">모임의 이름은 필수항목입니다.</p>
        )}

        {/* 본문 */}
        <QuillWrapper
          theme={"snow"}
          id={"content"}
          placeholder={"채용공고 및 근무 상세 내용을 입력해주세요"}
          value={introduction}
          modules={modules}
          formats={formats}
          onChange={setIntroduction}
        />

        {/* 이미지 업로드 */}
        <div>
          <label className="block mb-2 text-xs">이미지 업로드</label>
          <div className="relative w-max">
            <input
              type="file"
              accept="image/*"
              {...register("images")}
              multiple
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="px-4 py-2 bg-blue-500 text-white rounded-md text-center cursor-pointer">
              {customFileLabel}
            </div>
          </div>
          <p>
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

        {/* 미리보기 버튼 */}
        <div className="flex justify-between gap-x-5">
          <button
            type="button"
            className="py-2 px-4 rounded bg-gray-300 hover:bg-gray-400 ml-auto"
            // onClick={handleModal}
          >
            미리보기
          </button>

          {/* 작성 완료 버튼 */}
          <input
            type="submit"
            className="py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 text-white mr-auto"
            value="작성 완료"
          />
        </div>
      </form>

      {/* 미리보기 모달창 */}
      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={handleModal}
        formData={{
          interests: selectedJobCategory,
          title: watch("title"),
          introduction,
          images: watchImages,
          location: watch("location"),
        }}
      />
    </div>
  );
}
