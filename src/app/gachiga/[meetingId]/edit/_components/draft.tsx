"use client";
import { BackButton } from "@/app/bulletin-board/_components/BackButton";
import { QuillEditor } from "@/app/bulletin-board/_components/QuillEditor";
import { RangeSliderCustom } from "@/app/bulletin-board/local/[countryCode]/create/meetings/_components/RangeSlider";
import TwoButtonApproval from "@/app/bulletin-board/local/[countryCode]/create/meetings/_components/TwoButtonApproval";
import TwoButtonForm from "@/app/create-profile/_components/profile-setup/TwoButtonForm";
import { LoadingSpinner } from "@/core/components/LoadingSpinner";
import { useGetMeetingsId } from "@/core/hooks/useGetMeetings";
import { sexTypes } from "@/core/types/DataForUI";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import EditInterestsSelector from "./EditInterestSelector";
import EditCountryStateCitySelector from "./EditCountryStateCitySelector";
import EditDoubleDateTimeSelector from "./EditDoubleDateTimeSelector";
import { MeetingResponse } from "@/app/gachiga/_types/MeetingResponse";
import EditCostlyDetails from "./EditCostlyDetails";

interface MeetingEditPageProps {
  params: {
    meetingId: number;
  };
}

/**
 * @Description 모임 수정 페이지
 * @author 김영서
 **/
export const MeetingEditPage = ({ params }: MeetingEditPageProps) => {
  const { data: session } = useSession();
  const { meetingId } = params;
  const router = useRouter();

  const {
    data: meetingData,
    isLoading: isMeetingLoading,
    isError: isMeetingError,
    error: meetingError,
  } = useQuery<MeetingResponse, Error>({
    queryKey: ["meetingID", meetingId],
    queryFn: () => useGetMeetingsId(meetingId, session?.accessToken),
    enabled: !!meetingId,
    retry: 2,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  const onValid = (updatedData: any) => {
    if (meetingData) {
      console.log("Form is valid", updatedData);
    } else {
      console.log("Meeting data is undefined");
    }
  };

  const ChangeDateFormat = (
    originalDate: string | null | undefined
  ): Date | null => {
    if (originalDate) {
      const formattedDateString = originalDate.replace(
        /(\d{4})\.(\d{2})\.(\d{2})\(.+\)/,
        "$1-$2-$3"
      );

      // Date 객체 생성
      const date = new Date(formattedDateString);

      // 유효한 날짜인지 확인
      if (!isNaN(date.getTime())) {
        return date; // 유효한 날짜 반환
      } else {
        console.error("Invalid date format:", originalDate);
        return null; // 유효하지 않은 날짜인 경우 null 반환
      }
    }

    return null; // originalDate가 null 또는 undefined인 경우
  };

  const [loading, setLoading] = useState(false);

  //모임 종류
  const [meetingType, setMeetingType] = useState(
    meetingData?.meetingType === "ALWAYS" ? true : false
  );

  const [selectedStartTime, setSelectedStartTime] = useState(
    meetingData?.meetingStartTime
  );
  const [selectedEndTime, setSelectedEndTime] = useState(
    meetingData?.meetingEndTime
  );
  const [originalDate, setOriginalDate] = useState(meetingData?.meetingDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    ChangeDateFormat(originalDate)
  );
  //하루만 일 경우에는 날짜 및 시간 선택 가능하게끔
  const [isDateVisible, setIsDateVisible] = useState(true);

  //모임 종류
  const [sexType, setSexType] = useState<string | undefined>(
    meetingData?.sexType
  );

  //모집 인원 수
  const [maxMember, setMaxMember] = useState<number | undefined>(
    meetingData?.maxMember
  );

  //최소, 최대 연령
  const [startAge, setStartAge] = useState<string | undefined>(
    meetingData?.startAge.toString()
  );
  const [endAge, setEndAge] = useState<string | undefined>(
    meetingData?.endAge.toString()
  );

  //선착순 / 승인제
  const [approval, setApproval] = useState(
    meetingData?.approval ? true : false
  );
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);

  //본문 내용
  const [content, setContent] = useState<string | undefined>(
    meetingData?.introduction
  );

  //파일
  const [imagePreviews, setImagePreviews] = useState<string[]>(() => {
    // Initialize state with existing photo URLs from meetingData
    return meetingData?.photoUrls || [];
  });

  //비용 발생
  const [costly, setCostly] = useState<boolean | undefined>(
    meetingData?.costly
  );
  const [isCostlyItemOpen, setIsCostlyItemOpen] = useState(
    meetingData?.content ||
      meetingData?.hostTip ||
      meetingData?.rental ||
      meetingData?.material ||
      meetingData?.snack ||
      meetingData?.admission ||
      meetingData?.entry ||
      meetingData?.customCostDescription
      ? true
      : false
  );

  const watchImages: FileList | undefined = watch("photos");
  const customFileLabel =
    watchImages && watchImages.length > 0
      ? `${imagePreviews.length}개의 파일 선택됨`
      : "파일 선택";

  const handleImageRemove = (index: number) => {
    const updatedImages = Array.from(watchImages || []).filter(
      (_, i) => i !== index
    );

    // Update FileList in react-hook-form
    const dataTransfer = new DataTransfer();
    updatedImages.forEach((file) => dataTransfer.items.add(file));
    setValue("photos", dataTransfer.files);

    // Update image previews
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedPreviews);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Convert the current FileList to an array for manipulation
      const currentFiles = Array.from(watchImages || []);
      const newFiles = Array.from(files);

      // Update the FileList in react-hook-form
      const dataTransfer = new DataTransfer();
      currentFiles.forEach((file) => dataTransfer.items.add(file));
      newFiles.forEach((file) => dataTransfer.items.add(file));
      setValue("photos", dataTransfer.files);

      // Create image previews for newly selected files
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };
  const formatStartTime = (time: string): string | undefined => {
    if (time) {
      let [hours, minutes] = time.split(":");
      hours = parseInt(hours, 10).toString(); // 앞의 '0' 제거
      minutes = parseInt(minutes, 10).toString();
      return `${hours}시 ${minutes}분`;
    }
  };
  const formatEndTime = (time: string): string | undefined => {
    if (time) {
      let [hours, minutes] = time.split(":");
      hours = parseInt(hours, 10).toString(); // 앞의 '0' 제거
      minutes = parseInt(minutes, 10).toString();
      return `${hours}시 ${minutes}분`;
    }
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`; //API로 보내는 형식
  };

  useEffect(() => {
    if (selectedStartTime !== "") {
      setValue(
        "meetingStartTime",
        formatStartTime(selectedStartTime as string)
      );
    }
    if (selectedEndTime !== "") {
      setValue("meetingEndTime", formatEndTime(selectedEndTime as string));
    }

    if (meetingData && !watch("location")) {
      setValue("location", meetingData.location);
    }

    if (meetingData && !watch("question")) {
      setValue("question", meetingData.question);
    }

    if (meetingData && !watch("title")) {
      setValue("title", meetingData.title);
    }

    if (meetingData && !watch("information")) {
      setValue("information", meetingData.information);
    }

    meetingType === false
      ? (setValue("meetingType", "ONCE"), setIsDateVisible(true))
      : (setValue("meetingType", "ALWAYS"), setIsDateVisible(false));

    selectedDate
      ? setValue("meetingDate", formatDate(selectedDate))
      : setValue("meetingDate", "");

    setValue("sexType", sexType);

    setValue("startAge", parseInt(startAge ?? "", 10));
    setValue("endAge", parseInt(endAge ?? "", 10));

    approval === false
      ? setIsQuestionVisible(false)
      : setIsQuestionVisible(true);

    costly === false ? setIsCostlyItemOpen(false) : setIsCostlyItemOpen(true);

    setValue("approval", approval);
    setValue("costly", costly);
    //register했지만, number타입으로 전송해야하기 때문에 setValue적용
    setValue("maxMember", maxMember);
    setValue("hostType", "normal_host");
    setValue("countryFlagEmoji", "🇰🇷");
    setValue("coin", 5);
    setValue("packageItem", "day_all");
    console.log("meetingData", meetingData);
    console.log("meetingType", meetingType);
    console.log("sexType", sexType);
    console.log("startAge", startAge);
    console.log("endAge", endAge);
    console.log("approval", approval);
    console.log("costly", costly);
    console.log("approval", approval);
    console.log("maxMember", maxMember);
  }, [
    meetingData,
    setValue,
    watch,
    meetingType,
    sexType,
    startAge,
    endAge,
    approval,
    costly,
    approval,
    costly,
    maxMember,
  ]);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("location", value); // react-hook-form 상태 업데이트
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("Question Value", value);
    setValue("question", value);
  };

  const onRangeChange = (min: string, max: string) => {
    setStartAge(min);
    setEndAge(max);
  };

  const handleInformationChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setValue("information", value); // react-hook-form 상태 업데이트
  };

  if (isMeetingLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <LoadingSpinner loading={isMeetingLoading} />
        {/* 로딩 스피너 */}
        <span className="text-3xl font-bold mt-[20px]">
          로딩중... 잠시만 기다려주세요
        </span>
      </div>
    );
  }

  if (isMeetingError) {
    return (
      <div>미팅을 가져오는데 {meetingError.message}가 발생하였습니다. </div>
    );
  }
  if (meetingData) {
    return (
      <div className="max-w-4xl mx-auto bg-white mt-[50px] rounded-lg">
        {/* 글쓰기 HEADER */}
        <div className="flex items-center ml-[-45px] space-x-[5px]">
          <BackButton onClick={() => router.back()} />
          <h1 className="text-[22px] font-bold">모임 수정</h1>
          <div className="flex items-end justify-end flex-1">
            <button className="px-[12px] py-[10px] border border-[#EEEEEE] rounded-lg">
              미리보기
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onValid)}>
          <label className="block mt-[30px] text-xs text-[#808080] mb-[10px]">
            모임 목적
          </label>
          <EditInterestsSelector
            register={register}
            errors={errors}
            setValue={setValue}
            interests={meetingData?.interests}
          />

          <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />

          {/* 장소에 대한 dropdown */}
          <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
            장소
          </label>
          <EditCountryStateCitySelector
            originalCountry={meetingData?.countryCode}
            originalState={meetingData?.stateCode}
            originalCity={meetingData?.cityCode}
            registerCountryCode="countryCode"
            registerStateCode="stateCode"
            registerCityCode="cityCode"
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
            onChange={handleLocationChange}
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
            <div className="block w-full border text-black rounded-md p-2 mb-4 mt-[20px]">
              <EditDoubleDateTimeSelector
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                selectedStartTime={selectedStartTime as string}
                selectedEndTime={selectedEndTime as string}
                onStartTimeChange={setSelectedStartTime}
                onEndTimeChange={setSelectedEndTime}
                register={register}
                errors={errors}
                meetingData={meetingData}
                setValue={setValue}
              />
            </div>
          )}

          <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />

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
                    sexType === type.value
                      ? "bg-[#E62A2F] text-white border-none"
                      : "bg-white"
                  }`}
                  onClick={() => {
                    setSexType(type.value);
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
              {}
            </div>
          </div>

          {/* 나이대 */}
          <div className="block w-full">
            <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
              나이대
            </label>
            <span className="font-bold">
              {startAge === "20" && endAge === "60"
                ? "전체"
                : `${startAge}~${endAge}세`}
            </span>
            <div>
              <RangeSliderCustom
                onRangeChange={onRangeChange}
                startAge={startAge}
                endAge={endAge}
              />
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
                onChange={handleQuestionChange}
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
            value={content ? content : ""}
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
                onChange={handleFileChange}
              />
              <div className="px-4 py-2 bg-[#E62A2F] text-white rounded-md text-center cursor-pointer">
                {customFileLabel}
              </div>
            </div>
            <p className="mt-[10px]">
              {watchImages
                ? `10개 중 ${imagePreviews.length}개 업로드됨`
                : "10개 중 0개 업로드"}
            </p>

            {/* 이미지 미리보기 섹션 */}
            <div className="flex flex-wrap gap-4 mt-4">
              {imagePreviews &&
                imagePreviews.map((src, index) => (
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

          {/* 안내사항 */}
          <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
            안내사항
          </label>
          <textarea
            {...register("information", { required: true })}
            className="block w-full border bg-[#F6F6F6] text-black text-[14px] h-[150px]
     rounded-lg p-[15px]"
            placeholder={`안내사항을 입력하세요. \n예) 타인을 배려하는 마음을 갖고 신청해주세요`}
            onChange={handleInformationChange}
          />
          {errors.information && (
            <p className="text-red-500">안내사항 입력은 필수항목입니다.</p>
          )}

          <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />

          {/* 필요한 비용 */}
          <TwoButtonForm
            title="필요한 비용"
            options={[
              { label: "없음", value: false },
              { label: "있음", value: true },
            ]}
            activeValue={costly || false}
            onChange={setCostly}
          />
          {/* 필요한 비용에 대한 세부사항 */}
          <EditCostlyDetails
            register={register}
            errors={errors}
            setValue={setValue}
            isCostlyItemOpen={isCostlyItemOpen}
            meetingData={meetingData}
            watch={watch}
          />

          {/* 작성완료 */}
          <div className="flex items-center justify-center mt-[80px] mb-[150px]">
            <input
              type="submit"
              className="py-[19px] px-[124px] w-[300px] rounded-lg bg-[#E62A2F] text-white hover:cursor-pointer"
              value="수정 완료"
            />
          </div>

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
        </form>
      </div>
    );
  }
};

export default MeetingEditPage;
