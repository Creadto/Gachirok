"use client";

import { BackButton } from "@/app/bulletin-board/_components/BackButton";
import { PreviewAndSubmitButton } from "@/app/bulletin-board/_components/PreviewAndSubmitButton";
import { QuillEditor } from "@/app/bulletin-board/_components/QuillEditor";
import TwoButtonForm from "@/app/create-profile/_components/profile-setup/TwoButtonForm";
import DoubleDateTimeSelector from "@/core/components/DoubleDateTimeSelector";
import InterestSelector from "@/core/components/InterestsSelector";
import { countryStore } from "@/core/store/country-store";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { CategorySelector } from "../_components/CategorySelector";
import CostlyDetails from "./_components/CostlyDetails";
import CountryStateCitySelector from "./_components/CountryStateCitySelector";
import RangeSlider from "./_components/RangeSlider";
import TwoButtonApproval from "./_components/TwoButtonApproval";
import appendMeetingCreateRequestFromData from "./_utils/appendMeetingCreateRequestFormData";

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
  const router = useRouter();
  //각 국가의 bulletin-page로 routing하기 위한 전역 변수 사용
  const { country, setCountry } = countryStore();
  const { countryCode } = params;
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  //URL의 param이 변화될때마다 country store update
  useEffect(() => {
    setCountry(countryCode);
    console.log("country", countryCode);
  }, [params]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onValid = async (updatedData: any) => {
    setLoading(true);
    try {
      if (!accessToken) {
        throw new Error("Access token is missing");
      }
      console.log("updatedData", updatedData);

      const formData = appendMeetingCreateRequestFromData(updatedData);
      
      console.log("formData", formData);


      if (formData !== null) {
      console.log("실행됨1")
       const response =  await axios.post("/api/meetings", formData, {
            headers: {
            "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessToken}`,
            },
          });

        console.log(response)
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while updating the profile.");
    } finally {
      setLoading(false);
    }
  };
  //Image의 변동사항을 실시간으로 체크하기 위한 watch
  const watchImages: File[] | undefined = watch("photos") as File[];

  //장소 선택 시 필요한 Country, State, City에 관한 상태
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  //모임 종류
  const [meetingType, setMeetingType] = useState(false);

  //모임 종류가 하루만일 때 날짜 선택 변수
  const [isDateVisible, setIsDateVisible] = useState(true);
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  //모집 멤버 종류
  const sexTypes = [
    { label: "누구나", value: "anyone" },
    { label: "동일성비", value: "same_sex" },
    { label: "여자만", value: "female" },
    { label: "남자만", value: "male" },
  ];
  const [activeSexType, setActiveSexType] = useState(sexTypes[0].value); //모집 멤버의 기본값은 누구나

  //모집 멤버 수
  const [maxMember, setMaxMember] = useState(2);

  // 나이대 선택하는 변수
  const [minValue, setMinValue] = useState<string>("20");
  const [maxValue, setMaxValue] = useState<string>("50");

  // 모집방식(선착순, 승인제)
  const [approval, setApproval] = useState(false);

  // 승인제-호스트에게 질문
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);

  // 본문(모임소개글)
  const [content, setContent] = useState("");

  //이미지 thumbnail
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const customFileLabel =
    watchImages && watchImages.length > 0
      ? `${watchImages.length}개의 파일 선택됨`
      : "파일 선택";

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
    setValue("photos", dataTransfer.files);

    // 미리보기 이미지 업데이트
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedPreviews);
  };

  // 미리보기
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // 필요한 비용
  const [costly, setCostly] = useState(false);

  // 필요한 비용 - 있음 경우
  const [isCostlyItemOpen, setIsCostlyItemOpen] = useState(false);

  //미리보기 Modal 열림 여부
  const handleModal = () => {
    setIsPreviewModalOpen(!isPreviewModalOpen);
  };

  const formatStartTime = (time: string): string => {
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10).toString(); // 앞의 '0' 제거
    minutes = parseInt(minutes, 10).toString();
    return `${hours}시 ${minutes}분`;
  };

  const formatEndTime = (time: string): string => {
        let [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10).toString(); // 앞의 '0' 제거
    minutes = parseInt(minutes, 10).toString();
    return `${hours}시 ${minutes}분`;
  };

  //값이 변경될 때마다 setValue()로 useForm의 data에 저장
  useEffect(() => {
    clearErrors(); //Submit시 오류가 뜨고, 수정하면 오류 삭제되게끔
    setValue("meetingStartTime", formatStartTime(selectedStartTime));
    setValue("meetingEndTime", formatEndTime(selectedEndTime));
    setValue("approval", approval);
    setValue("startAge", parseInt(minValue, 10));
    setValue("endAge", parseInt(maxValue, 10));
    setValue("sexType", activeSexType);
    setValue("costly", costly);
    //register했지만, number타입으로 전송해야하기 때문에 setValue적용
    setValue("maxMember", maxMember);
    setValue("hostType", "normal_host");
    setValue("countryFlagEmoji", "🇰🇷");
    setValue("coin", 5);
    setValue("packageItem", "day_all");

    selectedDate
      ? setValue("meetingDate", formatDate(selectedDate))
      : setValue("meetingDate", "");

    meetingType === false
      ? (setValue("meetingType", "ONCE"), setIsDateVisible(true))
      : (setValue("meetingType", "ALWAYS"), setIsDateVisible(false));

    approval === false
      ? setIsQuestionVisible(false)
      : setIsQuestionVisible(true);

    costly === false ? setIsCostlyItemOpen(false) : setIsCostlyItemOpen(true);
  }, [
    selectedStartTime,
    selectedEndTime,
    approval,
    minValue,
    maxValue,
    activeSexType,
    costly,
    maxMember,
    selectedDate,
    meetingType,
  ]);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`; //API로 보내는 형식
  };

  const onRangeChange = (min: string, max: string) => {
    setMinValue(min);
    setMaxValue(max);
  };

  const handlePreviewModal = () => {
    setIsPreviewModalOpen(!isPreviewModalOpen);
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

      <form onSubmit={handleSubmit(onValid)}>
        {/* 모임 목적*/}
        <label className="block mb-2 text-xs">모임 목적</label>
        <InterestSelector
          register={register}
          errors={errors}
          setValue={setValue}
        />

        {/* 장소에 대한 dropdown */}
        <label className="block mb-2 text-xs">장소</label>
        <CountryStateCitySelector
          registerCountryCode="countryCode"
          registerStateCode="stateCode"
          registerCityCode="cityCode"
          selectedCountry={selectedCountry}
          selectedState={selectedState}
          selectedCity={selectedCity}
          setSelectedCountry={setSelectedCountry}
          setSelectedState={setSelectedState}
          setSelectedCity={setSelectedCity}
          register={register}
          errors={errors}
          setValue={setValue}
        />

        {/* 위치 선택 */}
        <label className="block mt-2 text-xs">위치</label>
        <input
          type="text"
          {...register("location", { required: true })}
          className="block w-full border border-gray-300 rounded-md p-2 mb-4"
          placeholder="위치를 입력해 주세요."
        />
        {errors.location && (
          <p className="text-red-500">위치 입력은 필수항목입니다.</p>
        )}

        {/* 하루만/언제나 */}
        <TwoButtonForm
          title="모임 종류 선택"
          options={[
            { label: "하루만", value: false },
            { label: "언제나", value: true },
          ]}
          activeValue={meetingType}
          onChange={setMeetingType}
        />

        {/* 날짜 및 시간 선택 */}
        {isDateVisible && (
          <div className="block w-full border text-black rounded-md p-2 mb-4 mt-12">
            <label className="block mb-2 flex-1 text-xs">일시</label>
            <DoubleDateTimeSelector
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              selectedStartTime={selectedStartTime}
              selectedEndTime={selectedEndTime}
              onStartTimeChange={setSelectedStartTime}
              onEndTimeChange={setSelectedEndTime}
              register={register}
              errors={errors}
            />
          </div>
        )}

        {/* 모집 멤버 */}
        <div>
          <label className="block text-gray-700 mb-2">모집 멤버</label>
          <div className="flex space-x-4">
            {sexTypes.map((type) => (
              <button
                key={type.label}
                type="button"
                className={`px-4 py-2 rounded-lg border-2 transition-colors duration-300 ${
                  activeSexType === type.value
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
                onClick={() => {
                  setActiveSexType(type.value);
                }}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* 모집 멤버 설명 */}
          <div className="mt-2 p-4 bg-gray-100 rounded-lg text-gray-500">
            <input
              type="number"
              value={maxMember}
              {...register("maxMember", { required: true })}
              onChange={(e) => setMaxMember(parseInt(e.target.value, 10))}
              className="block w-full border bg-slate-300  rounded-md p-2 mb-4"
            />
            <span className="text-sm text-gray-500">(명) 호스트 포함</span>
            {errors.maxMember && (
              <p className="text-red-500">
                모임의 인원수 선정은 필수 항목입니다.
              </p>
            )}
          </div>
        </div>

        {/* 나이대 */}
        <div className="block w-full">
          <label className="block text-gray-700 mb-2">나이대</label>
          <span className="text-gray-700">전체</span>
          <div>
            <RangeSlider onRangeChange={onRangeChange} />
          </div>
        </div>
        {/* 나이대 */}

        <br />
        {/* 모집 방식 */}
        <TwoButtonApproval
          options={[
            {
              label: "선착순",
              value: false,
              description:
                "신청과 동시에 참여가 완료되며, \n누구나 참여할 수 있어요",
            },
            {
              label: "승인제",
              value: true,
              description:
                "호스트가 직접 멤버를 수락하거나 거절할 수 있어요. \n호스트 질문을 통해 취향을 고를 수 있어요",
            },
          ]}
          activeValue={approval}
          onChange={setApproval}
        />

        {/* 승인제-질문 */}
        {isQuestionVisible && (
          <>
            <label className="block mb-2 text-xs">질문사항</label>
            <input
              type="text"
              {...register("question", { required: true, maxLength: 30 })}
              className="block w-full border bg-slate-300  rounded-md p-2 mb-4"
              placeholder="신청자에게 할 질문을 입력하세요!"
            />
            {errors.question && (
              <p className="text-red-500">
                승인제일 경우에는 질문이 필수적입니다.
              </p>
            )}
          </>
        )}

        {/* 모임소개 */}
        {/* 제목 */}
        <label className="block mb-2 text-xs">모임 소개</label>
        <input
          type="text"
          {...register("title", { required: true, maxLength: 30 })}
          className="block w-full border bg-slate-300  rounded-md p-2 mb-4"
          placeholder="모임의 이름을 입력해주세요 (30자 이내)"
        />
        {errors.title && (
          <p className="text-red-500">모임의 이름은 필수항목입니다.</p>
        )}

        {/* 본문 */}
        <QuillEditor
          register={register}
          placeholder={`모임 소개글을 작성해주세요 \n소개글을 자세히 작성하면 참석률과 신청률이 70% 높아집니다.`}
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

        {/* 파일선택 */}
        <div>
          <div className="relative w-max mt-2">
            <input
              type="file"
              accept="image/*"
              {...register("photos")}
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
              {...register("information", { required: true })}
              className="block w-full border bg-slate-300  rounded-md p-2 mb-4 mt-2 h-[150px]"
              placeholder={`안내사항을 입력하세요. \n예) 타인을 배려하는 마음을 갖고 신청해주세요`}
            />
            {errors.information && (
              <p className="text-red-500">안내사항 입력은 필수항목입니다.</p>
            )}
          </>
        </div>

        {/* 필요한 비용 */}
        <TwoButtonForm
          title="필요한 비용"
          options={[
            { label: "없음", value: false },
            { label: "있음", value: true },
          ]}
          activeValue={costly}
          onChange={setCostly}
        />
        {/* 필요한 비용에 대한 세부사항 */}
        <CostlyDetails
          register={register}
          errors={errors}
          setValue={setValue}
          isCostlyItemOpen={isCostlyItemOpen}
        />
        {/* 미리보기와 작성완료 버튼 */}
        <PreviewAndSubmitButton onClick={handleModal} />
      </form>

      {/* 미리보기 모달창 */}
      {/* <PreviewModalMeetings
        isOpen={isPreviewModalOpen}
        onClose={handleModal}
        formData={{
          title: watch("title"),
          introduction,
          images: watchImages,
          location: watch("location"),
        }}
      /> */}
    </div>
  );
}
