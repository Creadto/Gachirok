"use client";

import DropdownSelector from "@/core/components/DropdownSelector";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { BackButton } from "../../_components/BackButton";
import PreviewModalFree from "../../_components/PreviewModalFree";
import { QuillEditor } from "../../_components/QuillEditor";
import { PreviewAndSubmitButton } from "../../_components/PreviewAndSubmitButton";
import { LocationIcon } from "@/core/components/icons/LocationIcon";
import CloseIcon from "@/core/components/icons/CloseIcon";
import SearchIcon from "@/core/components/icons/top-bar/SearchIcon";

/**
 * @Description Universal의 Bulletin Board에 자유게시판을 작성하는 Page
 * @author 김영서
 **/
const AddUniversalBulletinBoardPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onValid = (data: any) => {
    console.log(data);
    // 여기에서 데이터를 서버로 전송하거나 다른 작업을 수행합니다.
  };

  //Image의 변동사항을 실시간으로 체크하기 위한 watch
  const watchImages: FileList | undefined = watch("images") as FileList;

  //주제
  const categoryOptions = [
    "일상토크",
    "정보공유",
    "질문답변",
    "자유토론",
    "고민상담",
  ];
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  //본문
  const [content, setContent] = useState("");

  //미리보기 모달 열림 여부
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  //위치 선택 모달 열림 여부
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  //이미지 thumbnail
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const customFileLabel =
    watchImages && watchImages.length > 0
      ? `${watchImages.length}개의 파일 선택됨`
      : "파일 선택";

  const [location, setLocation] = useState<string>("");

  const handlePreviewModal = () => {
    setIsPreviewModalOpen(!isPreviewModalOpen);
  };

  const handleLocationModal = () => {
    setIsLocationModalOpen(!isLocationModalOpen);
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

  return (
    <div className="max-w-4xl mx-auto bg-white mt-[50px] rounded-lg">
      {/* 글쓰기 HEADER */}
      <div className="flex items-center ml-[-45px] space-x-[5px]">
        <BackButton onClick={() => router.push("/bulletin-board")} />
        <h1 className="text-[22px] font-bold">글쓰기</h1>
        <div className="bg-[#DDDDDD] px-[7px] py-[3px] rounded-[4px] text-[#808080]">
          Universal
        </div>
        <div className="flex items-end justify-end flex-1">
          <button className="px-[12px] py-[10px] border border-[#EEEEEE] rounded-lg">
            미리보기
          </button>
        </div>
      </div>

      {/* 카테고리-자유게시판 */}
      <div className="flex flex-col">
        <p className="text-[13px] text-[#808080] mt-[50px]">카테고리</p>
        <div className=" mt-[10px] w-[100px] h-[50px] text-sm text-white bg-[#E62A2F] rounded-md px-[19.5px] py-[15px]">
          자유게시판
        </div>
      </div>

      <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />

      <form onSubmit={handleSubmit(onValid)}>
        {/* 주제 선택 */}
        <div className="relative block text-left">
          <DropdownSelector
            selectedValue={selectedCategory}
            setSelectedValue={setSelectedCategory}
            register={register}
            errors={errors}
            options={categoryOptions}
            name="category"
            errorMessage="주제 선택은 필수항목입니다."
            placeholder="주제를 선택해주세요."
            label="주제"
            trigger={trigger}
            setValue={setValue}
          />
        </div>

        {/* 글 내용 */}
        {/* 제목 */}
        <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
          제목
        </label>
        <input
          type="text"
          {...register("title", { required: true })}
          className="block w-full border bg-[#F6F6F6] text-black text-[14px] h-[50px]
         rounded-lg p-[15px]"
          placeholder="제목을 입력해 주세요."
        />
        {errors.title && <p className="text-red-500">제목은 필수항목입니다.</p>}

        {/* 본문 */}
        <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
          내용
        </label>
        <QuillEditor
          register={register}
          trigger={trigger}
          name="content"
          errors={errors}
          placeholder={`가치가에서 여러분의 소중한 경험 및 자유로운 얘기를 하며 서로 도움을 주고 받아보세요! \n광고 및 홍보, 스팸냐용, 개인정보 유출, 명예훼손, 욕설, 유사 글 도배, 부적절한 내용 입력 시 사전 통보 없이 삭제될 수 있습니다.`}
          value={content}
          onChange={(value) => {
            setContent(value);
            setValue("content", value);
            trigger("content");
          }}
        />

        {/* 파일선택 */}
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

        <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />

        {/* 위치 입력 */}
        <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
          위치 (선택)
        </label>
        <div className="flex relative">
          <div className="absolute left-[15px] top-[17px]">
            <LocationIcon />
          </div>
          <button
            type="button"
            className="block w-full border bg-[#F6F6F6] text-black text-[14px] text-start h-[50px]
         rounded-lg pl-[36px] px-[15px]"
            onClick={handleLocationModal}
          >
            {location ? location : "위치를 설정해주세요."}
          </button>
        </div>

        {/* 미리보기 버튼 및 작성완료 */}
        <div className="flex items-center justify-center mt-[80px] mb-[150px]">
          <input
            type="submit"
            className="py-[19px] px-[124px] w-[300px] rounded-lg bg-[#E62A2F] text-white"
            value="작성 완료"
          />
        </div>
      </form>

      {/* 미리보기 모달창 */}
      <PreviewModalFree
        isOpen={isPreviewModalOpen}
        onClose={handlePreviewModal}
        formData={{
          category: watch("category"),
          title: watch("title"),
          content: watch("content"),
          images: watchImages,
          location: watch("location"),
        }}
      />

      {isLocationModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-[15px]  w-[550px] h-[600px] relative ">
            {/* 모달 HEADER */}
            <div className="flex flex-row">
              <div className="w-full h-[60px] flex items-start justify-start shadow-sm">
                <span className="font-bold text-lg pl-[15px] py-[17px]">
                  위치 설정
                </span>
              </div>
              <button
                onClick={handleLocationModal}
                className="absolute top-[15px] right-[15px] text-black hover:text-gray-800"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="w-[520px] mx-auto flex h-[40px] mt-[20px] bg-[#F6F6F6] relative border rounded-[5px]">
              <div className="absolute top-[20px] left-[5px]">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="지역, 도로명, 건물명 검색"
                className="w-full ml-[40px] bg-[#F6F6F6] pl-2"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUniversalBulletinBoardPage;
