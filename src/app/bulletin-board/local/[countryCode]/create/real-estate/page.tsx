"use client";

import { BackButton } from "@/app/bulletin-board/_components/BackButton";
import TwoButtonForm from "@/app/create-profile/_components/profile-setup/TwoButtonForm";
import { CountryList } from "@/core/data/CountryList";
import { countryStore } from "@/core/store/country-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { CategorySelector } from "../_components/CategorySelector";
import ProvideRealEstate from "./_components/ProvideRealEstate";
import SearchRealEstate from "./_components/SearchRealEstate";

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
  const { country, setCountry } = countryStore();
  const { countryCode } = params;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    trigger,
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

  // 나라
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

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
    { label: "세탁기", value: "Laundry" },
    { label: "식기세척기", value: "Dishwash" },
    { label: "엘리베이터", value: "Elevator" },
    { label: "세탁시설", value: "Cleaning" },
  ];

  const countries = CountryList;

  //본문
  const [content, setContent] = useState("");

  //이미지 Thumbnail
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  //미리보기 Modal 열림 여부

  // 즉시 입주 클릭 logic
  const handleTodayClick = () => {
    setIsTodayDateClicked(!isTodayDateClicked);
    if (isTodayDateClicked) {
      setSelectedDate(null);
      setValue("selectedDate", selectedDate);
    } else {
      const today = new Date();
      setSelectedDate(today);
    }
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
  };

  // 보증금 없음 클릭
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
    <div className="max-w-4xl mx-auto bg-white mt-[50px] rounded-lg">
      {/* 글쓰기 HEADER */}
      <div className="flex items-center ml-[-45px] space-x-[5px]">
        <BackButton
          onClick={() => router.push(`/bulletin-board/local/${country}`)}
        />
        <h1 className="text-[22px] font-bold">글쓰기</h1>
        <div className="bg-[#DDDDDD] px-[7px] py-[3px] rounded-[4px] text-[#808080]">
          Local
        </div>
        <div className="flex items-end justify-end flex-1">
          <button className="px-[12px] py-[10px] border border-[#EEEEEE] rounded-lg">
            미리보기
          </button>
        </div>
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

      <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />

      {searchEstate === false ? <ProvideRealEstate /> : <SearchRealEstate />}

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
