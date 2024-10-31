import { PreviewAndSubmitButton } from "@/app/bulletin-board/_components/PreviewAndSubmitButton";
import { QuillEditor } from "@/app/bulletin-board/_components/QuillEditor";
import DropdownSelector from "@/core/components/DropdownSelector";
import { LocationIcon } from "@/core/components/icons/LocationIcon";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

/**
 * @Description 벼룩시장 - 구매에 해당하는 컴포넌트
 * @author 김영서
 **/
export default function BuyFleaMarket() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onValid = (data: any) => {
    console.log(data);
    // 여기에서 데이터를 서버로 전송하거나 다른 작업을 수행합니다.
  };

  const watchImages: FileList | undefined = watch("images") as FileList;

  //위치
  const [location, setLocation] = useState<string>("");
  //위치 선택 모달 열림 여부
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // 물건 종류
  const [selectedObjectType, setSelectedObjectType] = useState<string>("");
  const objectOptions = ["장난감", "주방용품", "가전제품", "신발", "학습도서"];

  //가격
  const [price, setPrice] = useState<number | null>(null);

  //본문
  const [content, setContent] = useState("");

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

  //위치 선택 모달 열림 여부
  const handleLocationModal = () => {
    setIsLocationModalOpen(!isLocationModalOpen);
  };

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
        trigger={trigger}
        setValue={setValue}
      />

      <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />

      {/* 위치 입력 */}
      <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
        거래 위치
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

      {/* 가격 */}
      <div className="flex flex-1 flex-col relative">
        <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
          가격
        </label>
        <input
          type="number"
          value={price?.toString()}
          onChange={(e) => setPrice(parseInt(e.target.value, 10))}
          placeholder="가격을 입력해주세요. (무료 나눔일 경우 '0' 입력)"
          className="block w-full border bg-[#F6F6F6] text-black text-[14px] text-start h-[50px]
   rounded-lg px-[15px]"
          style={{
            WebkitAppearance: "none", // Chrome, Safari, Edge
            MozAppearance: "textfield", // Firefox
          }}
        />
        <span className="absolute right-[15px] top-[80px]">원</span>
      </div>

      <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />

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
        placeholder="제목을 입력해주세요"
      />

      {/* 본문 */}
      <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
        내용
      </label>
      <QuillEditor
        register={register}
        placeholder="거래 내용을 입력해주세요"
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
