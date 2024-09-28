"use client";

import { countryStore } from "@/core/store/country-store";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import PreviewModal from "@/app/bulletin-board/_components/PreviewModal";
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
  const { country, setCountry } = countryStore();
  const { countryCode } = params;

  useEffect(() => {
    setCountry(countryCode);
    console.log("country", countryCode);
  }, [params]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onValid = (data: any) => {
    console.log(data);
    // 여기에서 데이터를 서버로 전송하거나 다른 작업을 수행합니다.
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

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
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
      imageDrop: true,
      imageResize: {
        modules: ["Resize", "DisplaySize"],
      },
    }),
    []
  );

  const watchImages = watch("images");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const categories = ["주제1", "주제 2", "주제 3"]; // 드롭다운 옵션 목록
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleCategoryDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setIsOpen(false); // 메뉴 선택 후 드롭다운 닫기
  };

  useEffect(() => {
    setValue("category", selectedCategory);
    setValue("content", content);
    console.log("content", content);
  }, [selectedCategory, title, content]);

  return (
    <form
      className="min-w-xl max-w-3xl mx-auto bg-white p-6 rounded-lg"
      onSubmit={handleSubmit(onValid)}
    >
      <button
        className="text-gray-500"
        onClick={() => router.push(`/bulletin-board/local/${country}`)}
      >
        &lt; 뒤로
      </button>
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

      {/* 주제 선택 */}
      <div className="relative block text-left">
        <label className="block mb-2">주제</label>
        <input
          type="text"
          {...register("category", { required: true })}
          value={selectedCategory}
          onClick={toggleCategoryDropdown}
          readOnly
          className="block w-full border bg-slate-300 text-black 
         rounded-md p-2 mb-4"
          placeholder="주제를 선택해 주세요."
        />

        {isOpen && (
          <div className="absolute right-0 z-10 mt-1 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="none">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryClick(category)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
        {errors.title && <p className="text-red-500">주제는 필수항목입니다.</p>}
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

      <PreviewModal
        isOpen={isModalOpen}
        onClose={handleModal}
        formData={{
          category: selectedCategory,
          title: watch("title"),
          content,
          images: watchImages,
          location: watch("location"),
        }}
      />
    </form>
  );
}
