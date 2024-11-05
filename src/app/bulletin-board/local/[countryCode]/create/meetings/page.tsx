"use client";

import { BackButton } from "@/app/bulletin-board/_components/BackButton";
import { QuillEditor } from "@/app/bulletin-board/_components/QuillEditor";
import TwoButtonForm from "@/app/create-profile/_components/profile-setup/TwoButtonForm";
import CustomAlert from "@/core/components/CustomAlert";
import DoubleDateTimeSelector from "@/core/components/DoubleDateTimeSelector";
import InterestSelector from "@/core/components/InterestsSelector";
import { useGetProfileResponse } from "@/core/hooks/useGetProfileResponse";
import { countryStore } from "@/core/store/country-store";
import { sexTypes } from "@/core/types/DataForUI";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { CategorySelector } from "../_components/CategorySelector";
import CostlyDetails from "./_components/CostlyDetails";
import CountryStateCitySelector from "./_components/CountryStateCitySelector";
import { HostTypeButton } from "./_components/HostTypeButton";
import { RangeSlider } from "./_components/RangeSlider";
import TwoButtonApproval from "./_components/TwoButtonApproval";
import axios from "axios";
import { HandleMediaUpload } from "@/core/utils/handleMediaUpload";
import CloseIcon from "@/core/components/icons/CloseIcon";
import SearchIcon from "@/core/components/icons/top-bar/SearchIcon";
import { LocationIcon } from "@/core/components/icons/LocationIcon";
import { LocationSelectModal } from "@/core/components/LocationSelectModal";

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

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => useGetProfileResponse(session?.accessToken), //meeting을 가져오는 react query가 실행된 후에 실시
    enabled: !!session?.accessToken,
    retry: 2,
  });

  //URL의 param이 변화될때마다 country store update
  useEffect(() => {
    setCountry(countryCode);
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

  //개설 완료되었을 때 등장하는 팝업
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const onValid = async (data: any) => {
    console.log("new data", data);
    setLoading(true);
    try {
      if (!accessToken) {
        throw new Error("Access token is missing");
      }
      data.photoUrls = await HandleMediaUpload({
        photoURL,
        accessToken: session?.accessToken,
        targetPrefix: "MEETING",
      });
      const response = await axios.post("/api/meetings2", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response) {
        setAlertMessage("미팅이 성공적으로 개설되었습니다!");
        setShowAlert(true);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("미팅을 생성하는데 오류가 발생하였습니다.");
    } finally {
      setLoading(false);
    }
  };
  //Image의 변동사항을 실시간으로 체크하기 위한 watch
  // const watchImages: FileList | undefined = watch("photos") as FileList;

  //장소 선택 시 필요한 Country, State, City에 관한 상태
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  //모임 종류
  const [meetingType, setMeetingType] = useState(false);

  //모임 종류가 하루만일 때 날짜 선택 변수
  const [isDateVisible, setIsDateVisible] = useState(true);
  //시작시간
  const [startHour, setStartHour] = useState<number | null>(null);
  const [startMinute, setStartMinute] = useState<number | null>(null);

  //종료시간
  const [endHour, setEndHour] = useState<number | null>(null);
  const [endMinute, setEndMinute] = useState<number | null>(null);

  //시간 비교 오류
  const [timeError, setTimeError] = useState<string | null>(null);

  // const [selectedStartTime, setSelectedStartTime] = useState("");
  // const [selectedEndTime, setSelectedEndTime] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [activeSexType, setActiveSexType] = useState(sexTypes[0].value); //모집 멤버의 기본값은 누구나

  //모집 멤버 수
  const [maxMember, setMaxMember] = useState(2);

  // 나이대 선택하는 변수
  const [minValue, setMinValue] = useState<string>("20");
  const [maxValue, setMaxValue] = useState<string>("60");

  // 모집방식(선착순, 승인제)
  const [approval, setApproval] = useState(false);

  // 승인제-호스트에게 질문
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);

  // 본문(모임소개글)
  const [content, setContent] = useState("");

  //이미지 thumbnail
  const [photoURL, setPhotoURL] = useState<string[]>([]);

  const watchImages = watch("photos"); // 최신 photos 값을 실시간으로 감

  //위치 입력 모달
  const [isLocationModalOpen, setIsLocationModlOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);

      // Create a FileReader for each file
      newFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          setPhotoURL((prev) => [...prev, reader.result as string]); // Store data URL
        };

        reader.readAsDataURL(file); // Read the file as a data URL
      });
    }
  };

  const handleImageRemove = (index: number) => {
    // Update photoList state by removing the selected file
    setPhotoURL((prevPhotoList) => {
      // Use the same index to remove from photoList
      const updatedPhotoList = prevPhotoList.filter((_, i) => i !== index);
      return updatedPhotoList;
    });
  };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files; // Get the FileList from the input
  //   if (files) {
  //     const newFiles = Array.from(files); // Convert FileList to array
  //     setPhotoList((prev) => [...prev, ...newFiles]); // Append new files to existing

  //     // Create URLs for previews
  //     const newImageUrls = newFiles.map((file) => URL.createObjectURL(file));
  //     setImagePreviews((prev) => [...prev, ...newImageUrls]); // Update previews

  //     // Update the photos field in react-hook-form
  //     setValue("photos", [...photoList, ...newFiles]); // Update the form state
  //   }
  // };

  const customFileLabel =
    watchImages && watchImages.length > 0
      ? `${watchImages.length}개의 파일 선택됨`
      : "파일 선택";

  // 미리보기
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // 필요한 비용
  const [costly, setCostly] = useState(false);

  // 필요한 비용 - 있음 경우
  const [isCostlyItemOpen, setIsCostlyItemOpen] = useState(false);

  const formatTime = (hours: number | null, minutes: number | null) => {
    return `${hours}시 ${minutes}분`;
  };

  const handleTimeCompare = (
    startHour: number | null,
    startMinute: number | null,
    endHour: number | null,
    endMinute: number | null
  ) => {
    // 모든 값이 유효한지 확인
    if (
      startHour !== null &&
      startMinute !== null &&
      endHour !== null &&
      endMinute !== null
    ) {
      const startTime = new Date().setHours(startHour, startMinute);
      const endTime = new Date().setHours(endHour, endMinute);

      if (endTime <= startTime) {
        setTimeError("종료 시간은 시작 시간보다 늦어야 합니다.");
      } else {
        setTimeError(null); // 정상적일 경우 에러를 null로 설정
      }
    }
  };

  //값이 변경될 때마다 setValue()로 useForm의 data에 저장
  useEffect(() => {
    clearErrors(); //Submit시 오류가 뜨고, 수정하면 오류 삭제되게끔
    selectedDate
      ? setValue("meetingDate", formatDate(selectedDate))
      : setValue("meetingDate", "");

    startHour !== null && startMinute !== null
      ? setValue("meetingStartTime", formatTime(startHour, startMinute))
      : setValue("meetingStartTime", "");

    endHour !== null && endMinute !== null
      ? setValue("meetingEndTime", formatTime(endHour, endMinute))
      : setValue("meetingEndTime", "");
    setValue("approval", approval);
    setValue("startAge", parseInt(minValue, 10));
    setValue("endAge", parseInt(maxValue, 10));
    setValue("sexType", activeSexType);
    setValue("costly", costly);
    //register했지만, number타입으로 전송해야하기 때문에 setValue적용
    setValue("maxMember", maxMember);
    setValue("countryFlagEmoji", "");

    selectedDate
      ? setValue("meetingDate", formatDate(selectedDate))
      : setValue("meetingDate", "");

    handleTimeCompare(startHour, startMinute, endHour, endMinute);

    meetingType === false
      ? (setValue("meetingType", "ONCE"), setIsDateVisible(true))
      : (setValue("meetingType", "ALWAYS"), setIsDateVisible(false));

    approval === false
      ? (setIsQuestionVisible(false), setValue("question", ""))
      : setIsQuestionVisible(true);

    costly === false ? setIsCostlyItemOpen(false) : setIsCostlyItemOpen(true);
    setValue("photoUrls", photoURL);

    console.log("introduction", content);
  }, [
    approval,
    minValue,
    maxValue,
    activeSexType,
    costly,
    maxMember,
    selectedDate,
    meetingType,
    startHour,
    startMinute,
    endHour,
    endMinute,
    photoURL,
    content,
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
        {/* <div className="flex items-end justify-end flex-1">
          <button className="px-[12px] py-[10px] border border-[#EEEEEE] rounded-lg">
            미리보기
          </button>
        </div> */}
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

      <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />

      <form onSubmit={handleSubmit(onValid)}>
        {/* 모임 목적*/}
        <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
          모임 목적
        </label>
        <InterestSelector
          register={register}
          errors={errors}
          setValue={setValue}
        />
        <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />

        {/* 장소에 대한 dropdown */}
        <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
          장소
        </label>
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
        <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
          위치
        </label>
        <input
          type="text"
          {...register("location", { required: true })}
          className="block w-full border bg-[#F6F6F6] text-black text-[14px] h-[50px]
   rounded-lg p-[15px]"
          placeholder="위치를 입력해 주세요."
        />
        {errors.location && (
          <p className="text-red-500">위치 입력은 필수항목입니다.</p>
        )}

        {/* 위치 입력 */}
        <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
          위치
        </label>
        <div className="flex relative">
          <div className="absolute left-[15px] top-[17px]">
            <LocationIcon />
          </div>
          <button
            type="button"
            className="block w-full border bg-[#F6F6F6] text-black text-[14px] text-start h-[50px]
   rounded-lg pl-[36px] px-[15px]"
            onClick={() => setIsLocationModlOpen(true)}
          >
            {/* {location ? location : "위치를 설정해주세요."} */}
          </button>
        </div>

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
          <div className="flex flex-col w-full border text-black rounded-md p-2 mb-4 mt-[20px] items-center justify-center">
            <DoubleDateTimeSelector
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              register={register}
              errors={errors}
              setValue={setValue}
              startHour={startHour}
              startMinute={startMinute}
              setStartHour={setStartHour}
              setStartMinute={setStartMinute}
              endHour={endHour}
              endMinute={endMinute}
              setEndHour={setEndHour}
              setEndMinute={setEndMinute}
            />
            {timeError && (
              <p className="text-red-500 block mt-[10px] text-sm">
                {timeError}
              </p>
            )}
          </div>
        )}

        <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />

        {/* 모집 멤버 */}
        <div>
          <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
            모집 멤버
          </label>
          <div className="flex space-x-[5px]">
            {sexTypes.map((type) => (
              <button
                key={type.label}
                type="button"
                className={`w-[100px] h-[50px] text-[14px] border border-[#EEEEEE] flex items-center justify-center rounded-lg ${
                  activeSexType === type.value
                    ? "bg-[#E62A2F] text-white border-none"
                    : "bg-white"
                }`}
                onClick={() => {
                  setActiveSexType(type.value);
                }}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* 모집 멤버 인원수 */}
          <div className="relative">
            <input
              type="number"
              value={maxMember}
              {...register("maxMember", { required: true })}
              className="mt-[10px] block w-full border bg-[#F6F6F6] text-black text-[14px] h-[50px] rounded-lg p-[15px]"
              placeholder="모집 멤버를 입력해주세요."
              onChange={(e) => setMaxMember(parseInt(e.target.value, 10))}
            />
            <span className="block absolute text-[14px] bottom-[14px] text-[#808080] left-[200px]">
              (명) 호스트 포함
            </span>
            {errors.maxMember && (
              <p className="text-red-500">
                모임의 인원수 선정은 필수 항목입니다.
              </p>
            )}
          </div>
        </div>

        {/* 나이대 */}
        <div className="block w-full">
          <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
            나이대
          </label>
          <span className="font-bold">
            {minValue === "20" && maxValue === "60"
              ? "전체"
              : `${minValue}~${maxValue}세`}
          </span>
          <div>
            <RangeSlider onRangeChange={onRangeChange} />
          </div>
        </div>

        <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />

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
            <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
              질문사항 (선택)
            </label>
            <input
              type="text"
              {...register("question", { required: true, maxLength: 30 })}
              className="block w-full border bg-[#F6F6F6] text-black text-[14px] h-[50px]
   rounded-lg p-[15px]"
              placeholder="신청자에게 할 질문을 입력하세요!"
            />
            {errors.question && (
              <p className="text-red-500">
                승인제일 경우에는 질문이 필수적입니다.
              </p>
            )}
          </>
        )}

        <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />

        {/* 모임소개 */}
        {/* 제목 */}
        <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
          모임 소개
        </label>
        <input
          type="text"
          {...register("title", { required: true, maxLength: 30 })}
          className="block w-full border bg-[#F6F6F6] text-black text-[14px] h-[50px]
   rounded-lg p-[15px]"
          placeholder="모임의 이름을 입력해주세요 (30자 이내)"
        />
        {errors.title && (
          <p className="text-red-500">모임의 이름은 필수항목입니다.</p>
        )}

        {/* 본문 */}
        <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
          내용
        </label>
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
              id="file-input"
              type="file"
              accept="image/*"
              multiple
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            <div className="px-4 py-2 bg-[#E62A2F] text-white rounded-md text-center cursor-pointer">
              {customFileLabel}
            </div>
          </div>
          <p className="mt-[10px]">10개 중 {photoURL.length}개 업로드됨</p>

          {/* 이미지 미리보기 섹션 */}
          <div className="flex flex-wrap gap-4 mt-4">
            {photoURL &&
              photoURL.map((src, index) => (
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
        <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
          안내사항
        </label>
        <textarea
          {...register("information", { required: true })}
          className="block w-full border bg-[#F6F6F6] text-black text-[14px] h-[150px]
   rounded-lg p-[15px]"
          placeholder={`안내사항을 입력하세요. \n예) 타인을 배려하는 마음을 갖고 신청해주세요`}
        />
        {errors.information && (
          <p className="text-red-500">안내사항 입력은 필수항목입니다.</p>
        )}

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

        <div className="mb-4">
          <label className="block mt-[40px] text-xs text-[#808080] mb-[5px]">
            노출 방법
          </label>
          <span className="text-sm">
            호스팅 방식에 따라 모임의 참석률과 신청률이 달라집니다.
          </span>
          {isUserLoading ? (
            <div>회원 정보 로딩 중...</div>
          ) : (
            <HostTypeButton userData={userData?.data} setValue={setValue} />
          )}
        </div>

        {/* 작성완료 */}
        <div className="flex items-center justify-center mt-[80px] mb-[150px]">
          <input
            type="submit"
            className="py-[19px] px-[124px] w-[300px] rounded-lg bg-[#E62A2F] text-white hover:cursor-pointer"
            value="개설하기"
          />
        </div>
      </form>

      {showAlert && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
          route={`/gachiga/local/${countryCode}`}
        />
      )}

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
