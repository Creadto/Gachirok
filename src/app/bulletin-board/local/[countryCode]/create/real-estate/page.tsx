"use client";

import { BackButton } from "@/app/bulletin-board/_components/BackButton";
import TwoButtonForm from "@/app/create-profile/_components/profile-setup/TwoButtonForm";
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
import DropdownSelector from "../../../../../../core/components/DropdownSelector";
import { CategorySelector } from "../_components/CategorySelector";

const QuillWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  // loading: () => <p>Loading ...</p>,
});

Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

interface AddRealEstateLocalBulletinBoardPageProps {
  params: {
    countryCode: string;
  };
}

/**
 * @Description Local의 Bulletin Board에 부동산을 작성하는 Page
 * @author 김영서
 **/
export default function AddRealEstateLocalBulletinBoardPage({
  params,
}: AddRealEstateLocalBulletinBoardPageProps) {
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

  // 방있어요/방구해요
  const [searchEstate, setSearchEstate] = useState(false);

  // 부동산 종류
  const [selectedEstateType, setSelectedEstateType] = useState<string>("");
  const estateOptions = ["원룸", "투룸", "빌라", "아파트", "복층"];

  // 입주날짜
  const [isDateVisible, setIsDateVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const timePeriodOptions = ["1달", "3달", "6달", "1년", "2년", "3년", "5년"];
  const [isTodayDateClicked, setIsTodayDateClicked] = useState(false);

  //기간
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("");

  //가격
  const [price, setPrice] = useState<number | null>(null);

  //보증금
  const [deposit, setDeposit] = useState<number | null>(null);
  const [isNoDepositChecked, setIsNoDepositChecked] = useState(true); //"보증금 없어요" 버튼 체크 여부

  //침실
  const [bedroomNumber, setBedroomNumber] = useState("");
  const bedroomOptions = ["1", "2", "3", "4"];
  //욕실
  const [bathroomNumber, setBathroomNumber] = useState("");
  const bathroomOptions = ["1", "2", "3"];

  //면적
  const [area, setArea] = useState<number | null>(null);

  //성별
  const [sexType, setSexType] = useState<string>("NONE");
  const sexOptions = [
    { label: "상관없음", value: "NONE" },
    { label: "남자만", value: "MALE" },
    { label: "여자만", value: "FEMALE" },
  ];

  //조건/편의
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const conditionsOptions = [
    { label: "반려동물", value: "Animal" },
    { label: "흡연가능", value: "Smoking" },
    { label: "취사가능", value: "Cooking" },
    { label: "TV", value: "Television" },
    { label: "인터넷", value: "Internet" },
    { label: "주차가능", value: "Parking" },
    { label: "세탁기/건조기", value: "Laundry" },
    { label: "식기세척기", value: "Dishwash" },
    { label: "엘리베이터", value: "Elevator" },
    { label: "세탁시설", value: "Cleaning" },
  ];

  //본문
  const [information, setInformation] = useState("");

  //이미지 Thumbnail
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  //미리보기 Modal 열림 여부

  // 즉시 입주 클릭 logic
  const handleTodayClick = () => {
    setIsTodayDateClicked(!isTodayDateClicked);
    if (isTodayDateClicked) {
      setSelectedDate(null);
    } else {
      const today = new Date();
      setSelectedDate(today);
    }
  };

  const handleNoDepositClick = () => {
    setIsNoDepositChecked(!isNoDepositChecked);
    setDeposit(null);
  };

  const handleConditionsClick = (options: string) => {
    setSelectedConditions((prevSelected) =>
      prevSelected?.includes(options)
        ? prevSelected.filter((condition) => condition !== options)
        : [...prevSelected, options]
    );
  };

  //값이 변경될 때마다 setValue()로 useForm의 data에 저장
  useEffect(() => {
    console.log("조건/편의 ", selectedConditions);
    selectedDate
      ? setValue("meetingDate", formatDate(selectedDate))
      : setValue("meetingDate", "");
  }, [selectedEstateType, selectedDate, selectedConditions]);

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
            { label: "방있어요", value: false },
            { label: "방구해요", value: true },
          ]}
          activeValue={searchEstate}
          onChange={setSearchEstate}
        />
        </div>
      </div>
      <form onSubmit={handleSubmit(onValid)}>
        {/* 부동산 종류*/}
        <DropdownSelector
          selectedValue={selectedEstateType}
          setSelectedValue={setSelectedEstateType}
          register={register}
          errors={errors}
          options={estateOptions}
          name="estateType"
          errorMessage="부동산 종류는 필수항목입니다."
          placeholder="종류를 선택해주세요."
          label="종류"
        />

        <hr className="border-slate-300 mb-3 mt-3" />
        {/* 위치 */}
        <label className="block mb-2 text-xs">위치</label>
        {/* 우편번호 */}
        <input
          type="number"
          {...register("location", { required: true })}
          className="block w-1/2 border border-gray-300 rounded-md p-2 mb-4"
          placeholder="우편번호를 입력해주세요"
        />
        {/* 상세주소 */}
        <input
          type="text"
          {...register("location", { required: true })}
          className="block w-full border border-gray-300 rounded-md p-2 mb-4"
          placeholder="상세 주소 입력"
        />
        <div className="flex flex-row h-48 gap-x-3">
          {/* 매물 위치 */}
          <div className="rounded-md flex flex-1 bg-slate-200 text-center justify-center items-center">
            등록하실 매물의 위치를 표시합니다.
          </div>
          {/* 상세주소 유의사항 */}
          <div className="flex flex-1 flex-col">
            <span>상세주소 유의사항</span>
            <p className="text-xs text-slate-300">
              상세주소가 정확하지 않으면 등기부등본 조회시 등록이 취소됩니다.
              주소 및 면적 불일치로 검증이 실패될 경우 별도의 소명 기회 없이
              수정, 환불이 불가합니다.
            </p>
          </div>
        </div>
        <hr className="border-slate-300 mb-3 mt-3" />

        {/* 입주날짜 */}
        <div className="h-24 flex flex-row mt-5 gap-x-5">
          <div className="flex flex-col flex-1">
            <label className="block mb-2 text-xs">입주날짜</label>
            <SingleDateSelector
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              register={register}
              errors={errors}
              name="selectedDate"
            />
            {/* 즉시입주 버튼 */}
            <div className="flex flex-row cn ml-1">
              <button
                type="button"
                onClick={handleTodayClick}
                className={`${
                  isTodayDateClicked ? "text-blue-400" : "text-slate-300"
                }`}
              >
                V 즉시입주
              </button>
            </div>
          </div>

          {/* 기간 */}
          <div className="flex flex-row flex-1 pl-2">
            <DropdownSelector
              selectedValue={selectedTimePeriod}
              setSelectedValue={setSelectedTimePeriod}
              register={register}
              errors={errors}
              options={timePeriodOptions}
              name="estateType"
              errorMessage="입주 기간은 필수항목입니다."
              placeholder="기간을 선택해주세요."
              label="기간"
            />
          </div>
        </div>

        {/* 가격 */}
        <div className="h-24 flex flex-row mt-6 gap-x-5">
          <div className="flex flex-col flex-1 w-full relative pt-1">
            <label className="block mb-2 text-xs">가격</label>
            <input
              type="number"
              value={price?.toString()}
              onChange={(e) => setPrice(parseInt(e.target.value, 10))}
              placeholder="가격을 입력해주세요."
              className="block border border-gray-300 rounded-md p-2 mb-4"
              style={{
                WebkitAppearance: "none", // Chrome, Safari, Edge
                MozAppearance: "textfield", // Firefox
              }}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              원 / 월
            </span>
          </div>

          {/* 보증금 */}
          <div className="flex flex-row flex-1 pl-2">
            <div className="flex flex-col flex-1 w-full pt-1">
              <label className="block mb-2 text-xs">보증금</label>
              <input
                type="number"
                value={isNoDepositChecked ? "" : deposit || ""}
                disabled={isNoDepositChecked}
                onChange={(e) => setDeposit(parseInt(e.target.value, 10))}
                placeholder="보증금을 입력해주세요"
                className="block border border-gray-300 rounded-md p-2 mb-1"
              />
              <div className="ml-1">
                <button
                  onClick={handleNoDepositClick}
                  type="button"
                  className={`${
                    isNoDepositChecked ? "text-black" : "text-slate-300"
                  }`}
                >
                  V 보증금 없어요.
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 침실 수 */}
        <div className="h-24 flex flex-row mt-6 gap-x-5">
          <div className="flex flex-col flex-1 w-full relative pt-1">
            <DropdownSelector
              selectedValue={bedroomNumber}
              setSelectedValue={setBedroomNumber}
              register={register}
              errors={errors}
              options={bedroomOptions}
              name="bedroomNumber"
              errorMessage="침실 수는 필수항목입니다."
              placeholder="침실 수를 선택해주세요."
              label="침실 수"
            />
          </div>

          {/* 욕실 수 */}
          <div className="flex flex-row flex-1 pl-2">
            <div className="flex flex-col flex-1 w-full pt-1">
              <DropdownSelector
                selectedValue={bathroomNumber}
                setSelectedValue={setBathroomNumber}
                register={register}
                errors={errors}
                options={bathroomOptions}
                name="bathroomNumber"
                errorMessage="욕실 수는 필수항목입니다."
                placeholder="욕실 수를 선택해주세요."
                label="욕실 수"
              />
            </div>
          </div>
        </div>

        {/* 면적 */}
        <div className="h-24 flex flex-row mt-6 gap-x-5">
          <div className="flex flex-col flex-1 w-full relative pt-1">
            <label className="block mb-2 text-xs">면적</label>
            <input
              type="number"
              value={area?.toString()}
              onChange={(e) =>
                setArea(Number(parseFloat(e.target.value).toFixed(1)))
              }
              placeholder="면적을 입력해주세요."
              className="block border border-gray-300 rounded-md p-2 mb-4"
              style={{
                WebkitAppearance: "none", // Chrome, Safari, Edge
                MozAppearance: "textfield", // Firefox
              }}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              ft²
            </span>
          </div>

          {/* 성별 */}
          <div className="flex flex-row flex-1 pl-2">
            <div className="flex flex-col flex-1 w-full pt-1">
              <label className="block mb-2 text-xs">성별</label>
              <div className="flex flex-row gap-x-3">
                {sexOptions.map((option, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => setSexType(option.value)}
                    className={`block border border-gray-300 rounded-md p-2 mb-4 w-24 ${
                      sexType === option.value ? "bg-pink-500 text-white" : ""
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 조건/편의 */}
        <div className="flex flex-row flex-1">
          <div className="flex flex-col flex-1 w-full pt-1">
            <label className="block mb-2 text-xs">조건/편의</label>
            <div className="flex flex-row gap-x-2">
              {conditionsOptions.map((option, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => handleConditionsClick(option.value)}
                  className={`w-[10%] block border border-gray-300 rounded-md px-2 py-4 mb-4 text-xs ${
                    selectedConditions.includes(option.value)
                      ? "bg-pink-500 text-white"
                      : ""
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 기타 */}
        <label className="block mb-2 text-xs">기타</label>
        <input
          type="text"
          // {...register("title", { required: true })}
          className="block w-full border bg-slate-300  rounded-md p-2 mb-4"
          placeholder="기타사항을 입력해주세요"
        />
        {/* {errors.title && (
          <p className="text-red-500">모임의 이름은 필수항목입니다.</p>
        )} */}

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
          placeholder={"해당 집 내용을 자세히 작성해주세요"}
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
        {/* 안내사항 */}
        <div className="mt-5">
          <label className="block mb-2 text-xs">안내사항</label>
          <>
            <textarea
              // {...register("information", { required: true })}
              className="block w-full border bg-slate-300  rounded-md p-2 mb-4 mt-2 h-[150px]"
              placeholder={`안내사항을 입력하세요. \n예) 크리토부동산으로 오시면 친절한 상담 가능합니다`}
            />
            {/* {errors.information && (
              <p className="text-red-500">안내사항 입력은 필수항목입니다.</p>
            )} */}
          </>
        </div>

        {/* 미리보기 버튼 */}
        <div className="flex justify-between">
          <button
            type="button"
            className="py-2 px-4 rounded bg-gray-300 hover:bg-gray-400 mt-6"
            // onClick={handleModal}
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
