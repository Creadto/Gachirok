"use client";

import { BackButton } from "@/app/bulletin-board/_components/BackButton";
import TwoButtonForm from "@/app/create-profile/_components/profile-setup/TwoButtonForm";
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
import DropdownSelector from "../../../../../../core/components/DropdownSelector";
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
 * @Description Local의 Bulletin Board에 벼룩시장을 작성하는 Page
 * @author 김영서
 **/
export default function AddFleaMarketLocalBulletinBoardPage({
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

  // 판매/구매 소 카테고리
  const [buy, setBuy] = useState(false);

  // 물건 종류
  const [selectedObjectType, setSelectedObjectType] = useState<string>("");
  const objectOptions = ["장난감", "주방용품", "가전제품", "신발", "학습도서"];

  //가격
  const [price, setPrice] = useState<number | null>(null);


  //본문
  const [information, setInformation] = useState("");

  //이미지 Thumbnail
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  //미리보기 Modal 열림 여부


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

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`; //API로 보내는 형식
  };

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
          {/* 방있어요/방구해요 */}
          <TwoButtonForm
            title="소 카테고리"
            options={[
              { label: "판매", value: false },
              { label: "구매", value: true },
            ]}
            activeValue={buy}
            onChange={setBuy}
          />
        </div>
      </div>
      <form onSubmit={handleSubmit(onValid)}>
        {/* 물건 종류*/}
        <DropdownSelector
          selectedValue={selectedObjectType}
          setSelectedValue={setSelectedObjectType}
          register={register}
          errors={errors}
          options={objectOptions}
          name="objectType"
          errorMessage="물건 종류는 필수항목입니다."
          placeholder="종류를 선택해주세요."
          label="종류"
        />
        <hr className="border-slate-300 mb-3 mt-3" />

        <div className="flex flex-row gap-x-5">
          {/* 거래 위치 */}
          <div className="flex flex-1 flex-col">
            <label className="block mb-2 text-xs">거래 위치</label>
            <input
              type="text"
              {...register("location", { required: true })}
              className="block w-full border border-gray-300 rounded-md p-2 mb-4"
              placeholder="거래 위치를 선택해주세요"
            />
          </div>
          {/* 가격 */}
          <div className="flex flex-1 flex-col">
            <label className="block mb-2 text-xs">가격</label>
            <input
              type="number"
              value={price?.toString()}
              onChange={(e) => setPrice(parseInt(e.target.value, 10))}
              placeholder="가격을 입력해주세요. (무료 나눔일 경우 '0' 입력)"
              className="block border w-full border-gray-300 rounded-md p-2 mb-4"
              style={{
                WebkitAppearance: "none", // Chrome, Safari, Edge
                MozAppearance: "textfield", // Firefox
              }}
            />
          </div>
        </div>

        <hr className="border-slate-300 mb-3 mt-3" />

        {/* 글 내용 */}
        {/* 제목 */}
        <label className="block mb-2 text-xs">글 내용</label>
        <input
          type="text"
          {...register("title", { required: true })}
          className="block w-full border bg-slate-300  rounded-md p-2 mb-4"
          placeholder="제목을 입력해주세요"
        />
        {/* {errors.title && (
          <p className="text-red-500">모임의 이름은 필수항목입니다.</p>
        )} */}

        {/* 본문 */}
        <QuillWrapper
          theme={"snow"}
          id={"content"}
          placeholder={"해당 집 내용을 자세히 작성해주세요 \n\nex ) \n거래 방법 : 직거래 / 택배\n구매시기 : 1년전 \n제품상태 : 생활흠집이 있습니다. 새제품(미개봉)입니다."}
          value={information}
          modules={modules}
          formats={formats}
          onChange={setInformation}
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
      {/* <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={handleModal}
        formData={{
          interests: selectedEstateType,
          title: watch("title"),
          introduction,
          images: watchImages,
          location: watch("location"),
        }}
      /> */}
    </div>
  );
}
