"use client";

import { BackButton } from "@/app/bulletin-board/_components/BackButton";
import { QuillEditor } from "@/app/bulletin-board/_components/QuillEditor";
import { RangeSliderCustom } from "@/app/bulletin-board/local/[countryCode]/create/meetings/_components/RangeSlider";
import TwoButtonApproval from "@/app/bulletin-board/local/[countryCode]/create/meetings/_components/TwoButtonApproval";
import { LoadingSpinner } from "@/core/components/LoadingSpinner";
import { useGetMeetingsId } from "@/core/hooks/useGetMeetings";
import { sexTypes } from "@/core/types/DataForUI";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { MeetingResponse } from "../../_types/MeetingResponse";
import DisabledTwoButtonForm from "./_components/DisabledTwoButtonForm";
import EditCountryStateCitySelector from "./_components/EditCountryStateCitySelector";
import EditDoubleDateTimeSelector from "./_components/EditDoubleDateTimeSelector";
import EditInterestsSelector from "./_components/EditInterestSelector";
import TwoButtonForm from "@/app/create-profile/_components/profile-setup/TwoButtonForm";
import EditCostlyDetails from "./_components/EditCostlyDetails";

interface MeetingEditPageProps {
  params: {
    meetingId: number;
  };
}

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
    control,
    formState: { errors },
  } = useForm();

  // 모임 종류
  const meetingType = meetingData?.meetingType === "ALWAYS" ? true : false;

  //하루만 일 경우에는 날짜 및 시간 선택 가능하게끔
  const [isDateVisible, setIsDateVisible] = useState(true);

  //날짜 및 시간
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // const [selectedStartTime, setSelectedStartTime] = useState<string>("");
  // const [selectedEndTime, setSelectedEndTime] = useState<string>("");

  //시작시간
  const [startHour, setStartHour] = useState<number | null>(null);
  const [startMinute, setStartMinute] = useState<number | null>(null);

  //종료시간
  const [endHour, setEndHour] = useState<number | null>(null);
  const [endMinute, setEndMinute] = useState<number | null>(null);

  //시간 비교 오류
  const [timeError, setTimeError] = useState<string | null>(null);

  //모임 종류
  const [sexType, setSexType] = useState<string>(
    meetingData?.sexType ?? "anyone"
  );
  const originalSexType = meetingData?.sexType;

  //모집 멤버 수
  const [maxMember, setMaxMember] = useState<number>(
    meetingData?.maxMember as number
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
    meetingData?.introduction.toString()
  );

  //파일
  const [imagePreviews, setImagePreviews] = useState<string[]>(() => {
    // Initialize state with existing photo URLs from meetingData
    return meetingData?.photoUrls || [];
  }); 
  const [photoList, setPhotoList] = useState<File[]>([]);

  //필요한 비용
  const [costly, setCostly] = useState(meetingData?.costly);

  // 필요한 비용 - 있음 경우
  const [isCostlyItemOpen, setIsCostlyItemOpen] = useState(meetingData?.costly);

  //위치 정보 변경 시 form data에 넣기
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("location", value); // react-hook-form 상태 업데이트
  };

  //API의 형식에 맞게 meetingDate 수정
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`; //API로 보내는 형식
  };

  //   async function urlToFile(photoUrl: string, fileName: string, mimeType: string = "image/jpeg"): Promise<File> {
  //     const response = await fetch(photoUrl);
  //     const blob = await response.blob();
  //     const file = new File([blob], fileName, { type: mimeType });
  //     return file;
  //   }

  //   if(meetingData?.photoUrls) {
  //     const photoUrl = meetingData?.photoUrls[0]
  // urlToFile(photoUrl, "photo.jpg").then((file) => {
  //   console.log(file); // File 객체로 변환된 결과
  // });
  //   }

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

  const formatTime = (hours: number | null, minutes: number | null) => {
    return `${hours}시 ${minutes}분`;
  };

  const onRangeChange = (min: string, max: string) => {
    setStartAge(min);
    setEndAge(max);
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("question", value);
  };

  const watchImages = watch("photos"); // 최신 photos 값을 실시간으로 감지

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files; // Get the FileList from the input
    if (files) {
      const newFiles = Array.from(files); // Convert FileList to array
  
      // Update photoList state synchronously
      setPhotoList((prev) => {
        const updatedPhotoList = [...prev, ...newFiles];
        return updatedPhotoList;
      });
  
      // Create URLs for previews
      const newImageUrls = newFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newImageUrls]); // Update previews
    }
  };
  
  const handleImageRemove = (index: number) => {
    // Update photoList state by removing the selected file
    setPhotoList((prevPhotoList) => {
      // Use the same index to remove from photoList
      const updatedPhotoList = prevPhotoList.filter((_, i) => i !== index);
      return updatedPhotoList;
    });
  
    // Update image previews by removing the corresponding image preview URL
    setImagePreviews((prevPreviews) => {
      const updatedPreviews = prevPreviews.filter((_, i) => i !== index);
      return updatedPreviews;
    });
  };
  
  // Sync the updated photoList with the react-hook-form "photos" field
  useEffect(() => {
    setValue("photos", photoList);
    console.log("photoList", photoList)
    console.log("previews", imagePreviews)
  }, [photoList, setValue, imagePreviews]);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]); // Only runs on unmount

  const customFileLabel =
    watchImages && watchImages.length > 0
      ? `${photoList.length}개의 파일 선택됨`
      : "파일 선택";



  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files;
  //   if (files) {
  //     // Convert the current FileList to an array for manipulation
  //     const currentFiles = Array.from(watchImages || []);
  //     const newFiles = Array.from(files);

  //     // Update the FileList in react-hook-form
  //     const dataTransfer = new DataTransfer();
  //     currentFiles.forEach((file) => dataTransfer.items.add(file));
  //     newFiles.forEach((file) => dataTransfer.items.add(file));
  //     setValue("photos", dataTransfer.files);

  //     // Create image previews for newly selected files
  //     const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
  //     setImagePreviews((prev) => [...prev, ...newPreviews]);
  //   }
  // };

  useEffect(() => {
    if (meetingData?.location) {
      setValue("location", meetingData.location);
    }

    if (meetingData?.sexType) {
      setValue("sexType", sexType);
    }
    if (meetingData?.maxMember) {
      setValue("maxMember", meetingData.maxMember);
    }
    if (meetingData?.startAge) {
      setValue("startAge", startAge?.toString());
    }
    if (meetingData?.endAge) {
      setValue("endAge", endAge?.toString());
    }
    if (meetingData?.question) {
      setValue("question", meetingData.question, { shouldValidate: true });
    }
    if (meetingData?.title) {
      setValue("title", meetingData.title, { shouldValidate: true });
    }
    if (meetingData?.content) {
      setValue("introduction", content, { shouldValidate: true });
    }
    if (meetingData?.information) {
      setValue("information", meetingData.information, {
        shouldValidate: true,
      });
    }

    meetingType === false
      ? (setValue("meetingType", "ONCE"), setIsDateVisible(true))
      : (setValue("meetingType", "ALWAYS"), setIsDateVisible(false));

    selectedDate
      ? setValue("meetingDate", formatDate(selectedDate))
      : setValue("meetingDate", "");

    startHour !== null && startMinute !== null
      ? setValue("meetingStartTime", formatTime(startHour, startMinute))
      : setValue("meetingStartTime", "");

    endHour !== null && endMinute !== null
      ? setValue("meetingEndTime", formatTime(endHour, endMinute))
      : setValue("meetingEndTime", "");

    handleTimeCompare(startHour, startMinute, endHour, endMinute);

    setValue("startAge", parseInt(startAge ?? "", 10));
    setValue("endAge", parseInt(endAge ?? "", 10));

    if (approval === false) {
      setIsQuestionVisible(false);
      setValue("question", "", { shouldValidate: true }); // approval이 false일 때 질문을 초기화
    } else {
      setIsQuestionVisible(true); // approval이 true일 때 질문 표시
    }
    setValue("approval", approval); // approval 값을 설정\
    setValue("introduction", content)

    setValue("costly", costly);

    costly ? setIsCostlyItemOpen(true) : setIsCostlyItemOpen(false);
  }, [
    meetingData?.location,
    setValue,
    meetingType,
    isDateVisible,
    selectedDate,
    startHour,
    startMinute,
    endHour,
    endMinute,
    sexType,
    maxMember,
    startAge,
    endAge,
    approval,
    content,
    meetingData?.information,
    costly,
  ]);

  // useEffect(() => {
  //   if (watchImages && watchImages.length > 0) {
  //     const imageFiles = Array.from(watchImages); // 파일 배열로 변환
  //     const imageUrls = imageFiles.map((file) => URL.createObjectURL(file)); // 각 파일에 대한 URL 생성

  //     // 기존의 imagePreviews와 새로 선택된 이미지 URL을 합침
  //     setImagePreviews((prev) => [...prev, ...imageUrls]);

  //     // 메모리 누수 방지 위해 URL 해제
  //     return () => {
  //       imageUrls.forEach((url) => URL.revokeObjectURL(url));
  //     };
  //   }
  // }, [watchImages]);

  const onValid = (data: any) => {
    const formData = new FormData();
    console.log("Form is valid", data);
    if (data.photos && data.photos.length > 0) {
      for (let i = 0; i < data.photos.length; i++) {
        formData.append("photos", data.photos[i]); // 여러 파일 추가
      }
    }
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
            interests={meetingData.interests}
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
            className="block w-full border bg-[#F6F6F6] text-black text-sm h-[50px]
     rounded-lg p-[15px]"
            placeholder="위치를 입력해 주세요."
            onChange={handleLocationChange}
          />
          {errors.location && (
            <p className="text-red-500">위치 입력은 필수항목입니다.</p>
          )}

          {/* 하루만/언제나 */}
          <DisabledTwoButtonForm
            title="모임 종류 선택 (수정 불가)"
            options={[
              { label: "하루만", value: false },
              { label: "언제나", value: true },
            ]}
            activeValue={meetingType}
          />

          {/* 날짜 및 시간 선택 */}
          {isDateVisible && (
            <div className="flex flex-col w-full border text-black rounded-md p-2 mb-4 mt-[20px] items-center justify-center">
              <EditDoubleDateTimeSelector
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                register={register}
                errors={errors}
                meetingData={meetingData}
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

          <div>
            <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
              모집 멤버 (누구나로만 변경 가능)
            </label>
            <div className="flex space-x-[5px]">
              {sexTypes.map((type) => (
                <button
                  key={type.label}
                  type="button"
                  disabled={
                    !(type.value === "anyone" || type.value === originalSexType)
                  }
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
            </div>
            {errors.maxMember && (
              <p className="text-red-500">
                모임의 인원수 선정은 필수 항목입니다.
              </p>
            )}
            {maxMember < 2 && (
              <p className="text-red-500">모임의 최소 인원수는 2명입니다.</p>
            )}
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
            value={content as string}
            onChange={(value) => {
              setContent(value);
              setValue("introduction", value);
              // trigger("introduction");
            }}
          />
          {content === "" && (
            <p className="text-red-500">본문의 내용은 필수입니다.</p>
          )}

          {/* 파일선택 */}
          <div>
            <div className="relative w-max mt-2">
              <input
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

          {/* 제목 */}
          <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
            안내사항
          </label>
          <input
            type="text"
            {...register("information", { required: true })}
            className="block w-full border bg-[#F6F6F6] text-black text-[14px] h-[50px]
     rounded-lg p-[15px]"
            placeholder="모임의 이름을 입력해주세요 (30자 이내)"
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
            activeValue={costly as boolean}
            onChange={setCostly}
          />
          {/* 필요한 비용에 대한 세부사항 */}
          <EditCostlyDetails
            register={register}
            errors={errors}
            setValue={setValue}
            isCostlyItemOpen={costly as boolean}
            meetingData={meetingData}
          />

          <div className="flex items-center justify-center mt-[80px] mb-[150px]">
            <input
              type="submit"
              className="py-[19px] px-[124px] w-[300px] rounded-lg bg-[#E62A2F] text-white hover:cursor-pointer"
              value="수정 완료"
            />
          </div>
        </form>
      </div>
    );
  }
};

export default MeetingEditPage;
