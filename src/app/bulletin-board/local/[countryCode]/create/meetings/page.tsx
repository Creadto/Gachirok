"use client";

import { BackButton } from "@/app/bulletin-board/_components/BackButton";
import PreviewModal from "@/app/bulletin-board/_components/PreviewModal";
import TwoButtonForm from "@/app/create-profile/_components/profile-setup/TwoButtonForm";
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
import { CategorySelector } from "../_components/CategorySelector";
import CountryStateCitySelector from "./_components/CountryStateCitySelector";
import RangeSlider from "./_components/RangeSlider";
import TwoButtonApproval from "./_components/TwoButtonApproval";
import CostlyDetailsButton from "./_components/CostlyDetailsButton";
import DoubleDateTimeSelector from "@/core/components/DoubleDateTimeSelector";
import { interestsOptions } from "@/core/types/InterestsAndExpertisesOptions";
import InterestSelector from "@/core/components/InterestsSelector";

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
 * @Description Local의 Bulletin Board에 소모임을 작성하는 Page
 * @author 김영서
 **/
export default function AddMeetingsLocalBulletinBoardPage({
  params,
}: AddFleaMarketLocalBulletinBoardPageProps) {
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

  const watchImages = watch("images");

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const [meetingType, setMeetingType] = useState(false);

  const [isDateVisible, setIsDateVisible] = useState(true);
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const sexTypes = [
    { label: "누구나", value: "anyone" },
    { label: "동일성비", value: "same_sex" },
    { label: "여자만", value: "female" },
    { label: "남자만", value: "male" },
  ];
  const [activeSexType, setActiveSexType] = useState(sexTypes[0].value);
  const [maxMember, setMaxMember] = useState(2);

  // 나이대 선택하는 변수
  const [minValue, setMinValue] = useState<string>("20");
  const [maxValue, setMaxValue] = useState<string>("50");

  // 모집방식
  const [approval, setApproval] = useState(false);

  // 승인제-호스트에게 질문
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);

  // 모임소개
  const [introduction, setIntroduction] = useState("");

  // 미리보기
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // 필요한 비용
  const [costly, setCostly] = useState(false);

  // 필요한 비용 - 있음 경우
  const [isCostlyItemOpen, setIsCostlyItemOpen] = useState(false);
  const [contentCost, setContentCost] = useState(false);
  const [hostTipCost, setHostTipCost] = useState(false);
  const [rentalCost, setRentalCost] = useState(false);
  const [materialCost, setMaterialCost] = useState(false);
  const [snackCost, setSnackCost] = useState(false);
  const [admissionCost, setAdmissionCost] = useState(false);
  const [entryCost, setEntryCost] = useState(false);
  const [isCustomCostDescriptionOpen, setIsCustomCostDescriptionOpen] =
    useState(false);

  //미리보기 Modal 열림 여부
  const handleModal = () => {
    setIsPreviewModalOpen(!isPreviewModalOpen);
  };



  //값이 변경될 때마다 setValue()로 useForm의 data에 저장
  useEffect(() => {
    clearErrors(); //Submit시 오류가 뜨고, 수정하면 오류 삭제되게끔
    setValue("introduction", introduction);
    setValue("countryCode", selectedCountry);
    setValue("stateCode", selectedState);
    setValue("cityCode", selectedCity);
    setValue("meetingStartTime", selectedStartTime);
    setValue("meetingEndTime", selectedEndTime);
    setValue("approval", approval);
    setValue("startAge", parseInt(minValue, 10));
    setValue("endAge", parseInt(maxValue, 10));
    setValue("sexType", activeSexType);
    setValue("content", contentCost);
    setValue("hostTip", hostTipCost);
    setValue("rental", rentalCost);
    setValue("material", materialCost);
    setValue("snack", snackCost);
    setValue("admission", admissionCost);
    setValue("entry", entryCost);
    setValue("costly", costly);
    //register했지만, number타입으로 전송해야하기 때문에 setValue적용
    setValue("maxMember", maxMember);

    selectedDate
      ? setValue("meetingDate", formatDate(selectedDate))
      : setValue("meetingDate", "");

    meetingType === false
      ? setValue("meetingType", "ONCE")
      : setValue("meetingType", "ALWAYS");
    meetingType === false ? setIsDateVisible(true) : setIsDateVisible(false);

    approval === false
      ? setIsQuestionVisible(false)
      : setIsQuestionVisible(true);

    costly === false ? setIsCostlyItemOpen(false) : setIsCostlyItemOpen(true);
  }, [
    introduction,
    selectedCity,
    selectedCountry,
    selectedState,
    selectedStartTime,
    selectedEndTime,
    approval,
    minValue,
    maxValue,
    activeSexType,
    contentCost,
    hostTipCost,
    rentalCost,
    materialCost,
    snackCost,
    admissionCost,
    entryCost,
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
        <InterestSelector register={register} errors={errors} setValue={setValue}/>


        {/* 장소에 대한 dropdown */}
        <label className="block mb-2 text-xs">장소</label>
        <CountryStateCitySelector
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

        <label className="block mb-2 text-xs">위치</label>
        <input
          type="text"
          {...register("location", { required: true })}
          className="block w-full border border-gray-300 rounded-md p-2 mb-4"
          placeholder="위치를 입력해 주세요."
        />

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
            {" "}
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
        <QuillWrapper
          theme={"snow"}
          id={"content"}
          placeholder={
            "모임 소개글을 작성해주세요 \n소개글을 자세히 작성하면 참석률과 신청률이 70% 높아집니다."
          }
          value={introduction}
          modules={modules}
          formats={formats}
          onChange={setIntroduction}
        />

        {/* 이미지 업로드 */}
        <label className="block mb-2 text-xs">이미지 업로드 (0/10)</label>
        <input
          type="file"
          accept="image/*"
          {...register("images")}
          multiple
          className="block w-full mb-4"
        />
        <p>{watchImages ? `${watchImages.length}개 업로드됨` : "0개 업로드"}</p>

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
        {isCostlyItemOpen && (
          <>
            <label>예상 비용 입력</label>
            <input
              type="text"
              {...register("cost", { required: true })}
              className="block w-full border bg-slate-300  rounded-md p-2 mb-4 mt-5"
              placeholder="예상 필요 비용을 입력하세요. 예) 10,000 KRW, 20 USD"
            />
            {errors.cost && (
              <p className="text-red-500">예상 필요 비용은 필수 항목입니다..</p>
            )}
            <label className="block">비용 정보</label>
            <span className="text-xs">
              예상 필요 비용은 호스트와 개인적으로 만나서 결제하는
              지침비용입니다.
            </span>
            <br />
            <div className="mt-5">
              <span className="mt-4 text-sm">운영비</span>
              <div className="flex flex-row gap-x-6">
                <CostlyDetailsButton
                  value={contentCost}
                  title="컨텐츠 제작비"
                  onClick={() => setContentCost((prev) => !prev)}
                />
                <CostlyDetailsButton
                  value={hostTipCost}
                  title="호스트 수고비"
                  onClick={() => setHostTipCost((prev) => !prev)}
                />
              </div>
            </div>
            {/* 모임비 */}
            <div className="mt-5">
              <span className="mt-4 text-sm">모임비</span>
              <div className="flex flex-row gap-x-6">
                <CostlyDetailsButton
                  value={rentalCost}
                  title="대여료"
                  onClick={() => setRentalCost((prev) => !prev)}
                />
                <CostlyDetailsButton
                  value={materialCost}
                  title="재료비"
                  onClick={() => setMaterialCost((prev) => !prev)}
                />
                <CostlyDetailsButton
                  value={snackCost}
                  title="다과비"
                  onClick={() => setSnackCost((prev) => !prev)}
                />
              </div>
            </div>
            {/* 기타 */}
            <div className="mt-5">
              <span className="mt-4 text-sm">기타</span>
              <div className="flex flex-row gap-x-6">
                <CostlyDetailsButton
                  value={admissionCost}
                  title="입장료"
                  onClick={() => setAdmissionCost((prev) => !prev)}
                />
                <CostlyDetailsButton
                  value={entryCost}
                  title="참가비"
                  onClick={() => setEntryCost((prev) => !prev)}
                />
                <button
                  type="button"
                  className={`border border-slate-500 rounded-md border-solid ${
                    isCustomCostDescriptionOpen
                      ? "bg-black text-white"
                      : "bg-white text-slate-500"
                  }`}
                  onClick={() =>
                    setIsCustomCostDescriptionOpen((prev) => !prev)
                  }
                >
                  기타
                </button>
              </div>
              {isCustomCostDescriptionOpen && (
                <>
                  <input
                    type="text"
                    {...register("customCostDescription", { required: true })}
                    className="block w-full border bg-slate-300  rounded-md p-2 mb-4 mt-5"
                    placeholder="비용의 용도를 직접 입력하세요. 예) 맥주 한 병 및 안주 비용"
                  />
                  {errors.customCostDescription && (
                    <p className="text-red-500">
                      직접 입력 선택 시 내용은 필수항목입니다.
                    </p>
                  )}
                </>
              )}
            </div>
          </>
        )}

        {/* 미리보기 버튼 */}
        <div className="flex justify-between gap-x-5">
          <button
            type="button"
            className="py-2 px-4 rounded bg-gray-300 hover:bg-gray-400 ml-auto"
            // onClick={handleModal}
          >
            미리보기
          </button>

          {/* 작성 완료 버튼 */}
          <input
            type="submit"
            className="py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 text-white mr-auto"
            value="작성 완료"
          />
        </div>
      </form>

      {/* 미리보기 모달창 */}
      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={handleModal}
        formData={{
          title: watch("title"),
          introduction,
          images: watchImages,
          location: watch("location"),
        }}
      />
    </div>
  );
}
