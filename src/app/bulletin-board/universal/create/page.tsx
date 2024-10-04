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
  const categoryOptions = ["주제1", "주제 2", "주제 3"];
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  //본문
  const [content, setContent] = useState("");

  //미리보기 모달 열림 여부
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  //이미지 thumbnail
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const customFileLabel =
    watchImages && watchImages.length > 0
      ? `${watchImages.length}개의 파일 선택됨`
      : "파일 선택";

  const handlePreviewModal = () => {
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

  return (
    <div className="min-w-xl mx-auto bg-white p-6 rounded-lg">
      <BackButton onClick={() => router.push("/")} />
      <div className="flex flex-row items-center my-auto">
        <h1 className="text-2xl font-bold">글쓰기</h1>
        <div className="bg-slate-400 ml-2 rounded-md">Universal</div>
      </div>

      {/* 카테고리-자유게시판 */}
      <div className="flex flex-col mt-5">
        <p className="text-xs text-slate-300">카테고리</p>
        <div className=" flex items-center justify-centertext-white bg-pink-400 w-fit h-12 text-white rounded-md mb-10">
          자유게시판
        </div>
      </div>

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
          placeholder="종류를 선택해주세요."
          label="종류"
          trigger={trigger}
          setValue={setValue}
        />
      </div>

      <form onSubmit={handleSubmit(onValid)}>
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
        {/* <QuillWrapper
          {...register("content", { required: true })}
          theme={"snow"}
          placeholder={"설명을 입력해주세요"}
          value={content}
          modules={modules}
          // formats={quillFormats}
          onChange={(value) => {
            setContent(value);
            setValue("content", value);
            trigger("content");
          }}
          onBlur={() => {
            trigger("content"); // Trigger validation on blur
          }}
        />
        {errors.content && (
          <p className="text-red-500">본문내용은 필수항목입니다.</p>
        )} */}

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

        <hr className="border-slate-300 mb-3 mt-3" />

        {/* 위치 입력 */}
        <label className="block mb-2">위치</label>
        <input
          type="text"
          {...register("location")}
          className="block w-full border border-gray-300 rounded-md p-2 mb-4"
          placeholder="위치를 입력해 주세요."
        />

        {/* 미리보기 버튼 및 작성완료 */}
        <PreviewAndSubmitButton onClick={() => setIsPreviewModalOpen(true)} />
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
    </div>
  );
};

export default AddUniversalBulletinBoardPage;
