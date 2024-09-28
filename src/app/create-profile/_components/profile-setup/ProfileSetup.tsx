import { ProfileCreateRequest } from "@/app/profile/_types/ProfileCreateRequest";
import useProfileStore, { Profile } from "@/core/store/profile-store";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import BackgroundImageForm from "./BackgroundImageForm";
import InterestAndExpertiseForm from "./InterestAndExpertiseForm";
import IntroductionForm from "./IntroductionForm";
import NicknameForm from "./NicknameForm";
import ProfileImageForm from "./ProfileImageForm";
import TwoButtonForm from "./TwoButtonForm";
import CountryStateCitySelector from "@/app/bulletin-board/local/[countryCode]/create/meetings/_components/CountryStateCitySelector";
import {
  expertisesOptions,
  interestsOptions,
} from "@/core/types/InterestsAndExpertisesOptions";
import usePostProfileCreateRequest from "@/core/hooks/usePostProfileCreateRequest";
import appendProfileCreateRequestFormData from "../../_utils/appendProfileCreateRequestFormData";
import { mapProfileResponse } from "@/core/mapper/profile-mapper";
import { BackButton } from "@/app/bulletin-board/_components/BackButton";
import CustomAlert from "@/core/components/CustomAlert";

/**
 * @Description 프로필 신규 생성의 메인 페이지
 * @author 김영서
 **/
export default function CreateProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { profile, setProfile } = useProfileStore();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileCreateRequest>();

  //submit시 실행
  const onValid = async (data: ProfileCreateRequest) => {
    const accessToken = `Bearer ${session?.accessToken}`;
    console.log(data);
    const formData = appendProfileCreateRequestFormData(data); //data를 formData로 append
    const res = await usePostProfileCreateRequest(accessToken, formData); //API로 응답 Request
    const result = await res.data;
    const updatedProfile: Profile = mapProfileResponse(result, profile); //응답으로 받은 ProfileResponse을 profile store에 Mapping
    setProfile(updatedProfile);
    if (result) {
      setAlertMessage("Profile updated successfully!");
      setShowAlert(true); 
    }
  };

  const onInValid = (errors: FieldErrors) => console.log(errors);

  const [male, setMale] = useState(true); // 초기값은 남자로 설정
  const [traveler, setTraveler] = useState(true); // 초기값은 여행자로 설정
  const [residenceYear, setResidenceYear] = useState(1); //초기값은 1년으로 설정
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null); //프로필 사진 미리보기를 위한 상태
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);
  const [birth, setBirth] = useState<string>("");
  const [formattedDate, setFormattedDate] =
    useState<string>("2000년 01월 01일"); //한글로 변환된 생일의 초기값
  const [interests, setInterests] = useState<string[]>([]);
  const [expertises, setExpertises] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("")

  //프로필 사진을 파일로부터 선택
  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileFile(file);
      const profileImageUrl = URL.createObjectURL(file); //파일을 URL로 변환
      setProfileImage(profileImageUrl); //미리보기 사진 업데이트
    }
  };

  //배경 화면 사진을 파일로부터 선택
  const handleBackgroundImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setBackgroundFile(file);
      const backgroundImageUrl = URL.createObjectURL(file);
      setBackgroundImage(backgroundImageUrl);
    }
  };

  //입력받은 날짜를 API로 보내기 위한 데이터로 변환
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`; //API로 보내는 형식
  };

  //변경되는 날짜에 대한 로직
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    setBirth(dateValue);
    const date = new Date(dateValue);
    setFormattedDate(formatDate(date)); //API로 보내는 형식으로 날짜를 변환한 뒤 업데이트
  };

  // 프로필 업데이트되었다는 알림창 닫기
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    console.log("male", male);
    console.log("traveler", traveler);
    console.log("residenceYear", residenceYear);
    console.log("profile file", profileFile);
    console.log("background file", backgroundFile);
    console.log("interests", interests);
    console.log("expertises", expertises);
    setValue("male", male);
    setValue("traveler", traveler);
    setValue("residenceYear", residenceYear);
    setValue("interests", interests);
    setValue("expertises", expertises);
    setValue("photo", profileFile);
    setValue("residenceCountryCode", selectedCountry);
    setValue("residenceStateCode", selectedState);
    setValue("residenceCityCode", selectedCity);
    setValue("birth", formattedDate);
  }, [
    male,
    traveler,
    residenceYear,
    interests,
    expertises,
    profileFile,
    formattedDate,
    selectedCity,
    selectedCountry,
    selectedState,
  ]);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg justify">
        <div className="flex items-center space-x-4 mb-8">
          <BackButton onClick={() => router.push("/")} />
          <h1 className="text-2xl font-bold">프로필 설정</h1>
        </div>

        <form onSubmit={handleSubmit(onValid, onInValid)}>
          {/* 거주국가 INPUT */}
          {/* <ResidenceForm register={register} errors={errors} /> */}
          <label className="block mb-2">장소</label>
          <CountryStateCitySelector
            selectedCountry={selectedCountry}
            selectedState={selectedState}
            selectedCity={selectedCity}
            setSelectedCountry={setSelectedCountry}
            setSelectedState={setSelectedState}
            setSelectedCity={setSelectedCity}
            register={register}
            errors={errors}
          />

          {/* 여행자/거주자 INPUT */}
          <TwoButtonForm
            title="구분"
            options={[
              { label: "여행자", value: true },
              { label: "거주자", value: false },
            ]}
            activeValue={traveler}
            onChange={setTraveler}
          />

          {/* 거주년도 INPUT */}
          <div className="mb-6">
            <label className="block mb-2 text-gray-700">거주 년수</label>
            <input
              type="range"
              min={1}
              max={20}
              value={residenceYear}
              onChange={(e) => setResidenceYear(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-center mt-2">{residenceYear}년</div>
          </div>

          {/* 프로필 사진 선택 INPUT */}
          <ProfileImageForm
            image={profileImage}
            onImageUpload={handleProfileImageUpload}
            label="프로필 이미지 업로드"
          />

          {/* 배경이미지 선택 INPUT */}
          <BackgroundImageForm
            image={backgroundImage}
            onImageUpload={handleBackgroundImageUpload}
            label="배경 사진 업로드"
          />

          {/* 닉네임 선택 INPUT */}
          <NicknameForm
            register={register}
            label="닉네임"
            name="nickname"
            required={true}
            errors={errors}
            placeholder="닉네임을 입력하세요"
          />

          {/* 자기소개 INPUT */}
          <IntroductionForm
            register={register}
            label="소개"
            name="introduction"
            required={true}
            errors={errors}
            maxLength={100}
          />

          {/* 성별 INPUT */}
          <TwoButtonForm
            title="성별"
            options={[
              { label: "남자", value: true },
              { label: "여자", value: false },
            ]}
            activeValue={male}
            onChange={setMale}
          />

          {/* 생일 INPUT */}
          <span className="text-gray-700">생일</span>
          <label className="block mb-4">
            <input
              type="date"
              value={birth}
              onChange={handleDateChange}
              className="border border-gray-300 rounded-lg p-2"
            />
            {birth && (
              <p className="mt-4 text-md">선택한 날짜: {formattedDate}</p>
            )}
          </label>

          {/* 여행지 관심분야 INPUT */}
          <InterestAndExpertiseForm
            register={register}
            label="여행지 관심분야"
            name="interests"
            options={interestsOptions}
            errors={errors}
          />

          {/* 거주지 전문분야 INPUT */}
          <InterestAndExpertiseForm
            register={register}
            label="거주지 전문분야"
            name="expertises"
            options={expertisesOptions}
            errors={errors}
          />

          {/* 프로필 성정 완료 버튼 */}
          <input
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            value="프로필 생성"
          />
           {showAlert && (
        <CustomAlert
          message={alertMessage}
          onClose={handleCloseAlert}
          route="/"
        />
      )}
        </form>
      </div>
    </div>
  );
}
