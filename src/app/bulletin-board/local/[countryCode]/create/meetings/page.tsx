"use client";

import PreviewModal from "@/app/bulletin-board/_components/PreviewModal";
import DateTimeSelector from "@/core/components/DateTimeSelector";
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
import CountryStateCitySelector from "./_components/CountryStateCitySelector";
import PurposeSelector from "./_components/PurposeSelector";
import { BackButton } from "@/app/bulletin-board/_components/BackButton";
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
 * @Description Local의 Bulletin Board에 소모임을 작성하는 Page
 * @author 김영서
 **/
export default function AddMeetingsLocalBulletinBoardPage({
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

  const watchImages = watch("images");

  const [selectedPurpose, setSelectedPurpose] = useState<string>("");

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

//미리보기 Modal 열림 여부
  const handleModal = () => {
    setIsPreviewModalOpen(!isPreviewModalOpen);
  };

  //값이 변경될 때마다 setValue()로 useForm의 data에 저장
  useEffect(() => {
    clearErrors() //Submit시 오류가 뜨고, 수정하면 오류 삭제되게끔
    setValue("purpose", selectedPurpose);
    setValue("content", content);
    setValue("residenceCountryCode", selectedCountry)
    setValue("residenceStateCode", selectedState);
    setValue("residenceCityCode", selectedCity);
    console.log("purpose", selectedPurpose)
    console.log("content", content);
    console.log("country", selectedCountry);
    console.log("state", selectedState), console.log("city", selectedCity);
  }, [
    selectedPurpose,
    title,
    content,
    selectedCountry,
    selectedState,
    selectedCity,
  ]);

  return (
    <form
      className="min-w-xl max-w-3xl mx-auto bg-white p-6 rounded-lg"
      onSubmit={handleSubmit(onValid)}
    >
      <BackButton onClick={() => router.push(`/bulletin-board/local/${country}`)} />
      <div className="flex flex-row items-center my-auto">
        <h1 className="text-2xl font-bold">글쓰기</h1>
        <div className="bg-slate-400 ml-2 rounded-md">Local</div>
      </div>

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

      {/* 모임 목적*/}
      <PurposeSelector
        selectedPurpose={selectedPurpose}
        setSelectedPurpose={setSelectedPurpose}
        register={register}
        errors={errors}
      />

      {/* 장소에 대한 dropdown */}
      <label className="block mb-2">장소</label>
      <CountryStateCitySelector
        selectedCountry={selectedCountry}
        selectedState={selectedState}
        selectedCity={selectedCity}
        setSelectedCountry={setSelectedCountry}
        setSelectedState={setSelectedState}
        setSelectedCity={setSelectedCity}
        register={register}
        errors={errors}
      />

      {/* 날짜 및 시간 선택 */}
      <div className="block w-full border text-black rounded-md p-2 mb-4 mt-12">
        <label className="block mb-2 flex-1">일시</label>
        <DateTimeSelector
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          selectedTime={selectedTime}
          onTimeChange={setSelectedTime}
        />
      </div>

      {/* 글 내용 */}
      {/* 제목 */}
      <label className="block mb-2">글 내용</label>
      <input
        type="text"
        {...register("title", { required: true })}
        className="block w-full border bg-slate-300  rounded-md p-2 mb-4"
        placeholder="제목을 입력해 주세요."
      />
      {errors.title && <p className="text-red-500">제목은 필수항목입니다.</p>}

      {/* 본문 */}
      <QuillWrapper
        theme={"snow"}
        id={"content"}
        placeholder={"설명을 입력해주세요"}
        value={content}
        modules={modules}
        formats={formats}
        onChange={setContent}
      />

      {/* 이미지 업로드 */}
      <label className="block mb-2">이미지 업로드 (0/10)</label>
      <input
        type="file"
        accept="image/*"
        {...register("images")}
        multiple
        className="block w-full mb-4"
      />
      <p>{watchImages ? `${watchImages.length}개 업로드됨` : "0개 업로드"}</p>

      {/* 위치 입력 */}
      <label className="block mb-2">위치</label>
      <input
        type="text"
        {...register("location")}
        className="block w-full border border-gray-300 rounded-md p-2 mb-4"
        placeholder="위치를 입력해 주세요."
      />

      {/* 미리보기 버튼 */}
      <div className="flex justify-between">
        <button
          type="button"
          className="py-2 px-4 rounded bg-gray-300 hover:bg-gray-400"
          onClick={handleModal}
        >
          미리보기
        </button>

        {/* 작성 완료 버튼 */}
        <input
          type="submit"
          className="py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 text-white"
          value="작성 완료"
        />
      </div>

      {/* 미리보기 모달창 */}
      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={handleModal}
        formData={{
          purpose: selectedPurpose,
          title: watch("title"),
          content,
          images: watchImages,
          location: watch("location"),
        }}
      />
    </form>
  );
}
