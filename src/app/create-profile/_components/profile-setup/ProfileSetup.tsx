import { BackButton } from "@/app/bulletin-board/_components/BackButton";
import CountryStateCitySelector from "@/app/bulletin-board/local/[countryCode]/create/meetings/_components/CountryStateCitySelector";
import { ProfileCreateRequest } from "@/app/profile/_types/ProfileCreateRequest";
import CustomAlert from "@/core/components/CustomAlert";
import ExpertisesSelector from "@/core/components/ExpertisesSelector";
import InterestSelector from "@/core/components/InterestsSelector";
import usePostProfileCreateRequest from "@/core/hooks/usePostProfileCreateRequest";
import { mapProfileResponse } from "@/core/mapper/profile-mapper";
import useProfileStore, { Profile } from "@/core/store/profile-store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import appendProfileCreateRequestFormData from "../../_utils/appendProfileCreateRequestFormData";
import BackgroundImageForm from "./BackgroundImageForm";
import IntroductionForm from "./IntroductionForm";
import NicknameForm from "./NicknameForm";
import ProfileImageForm from "./ProfileImageForm";
import TwoButtonForm from "./TwoButtonForm";
import SingleDateSelector from "@/core/components/SingleDateSelector";

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
    clearErrors,
    formState: { errors },
  } = useForm<ProfileCreateRequest>();

  //submit시 실행
  const onValid = async (data: ProfileCreateRequest) => {

    console.log(data);

    try{
      setLoading(true);
      const accessToken = `Bearer ${session?.accessToken}`
      const formData = appendProfileCreateRequestFormData(data); //data를 formData로 append
      const res = await usePostProfileCreateRequest(accessToken, formData); //API로 응답 Request
  
      const result = await res.data;
      const updatedProfile: Profile = mapProfileResponse(result, profile); //응답으로 받은 ProfileResponse을 profile store에 Mapping
      setProfile(updatedProfile);

      if (result) {
        setAlertMessage("Profile updated successfully!");
        setShowAlert(true);
      }
    } catch(error) {
      console.error("Failed to catch profile data", error)
    } finally{
      setLoading(false);
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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

  // 프로필 업데이트되었다는 알림창 닫기
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    setValue("male", male);
    setValue("traveler", traveler);
    setValue("residenceYear", residenceYear);
    setValue("photo", profileFile);
  }, [male, traveler, residenceYear, profileFile]);

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
            registerCountryCode="residenceCountryCode"
            registerStateCode="residenceStateCode"
            registerCityCode="residenceCityCode"
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
          <label className="block mb-4 text-gray-700">생일</label>
          <SingleDateSelector
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            register={register}
            errors={errors}
            name="birth"
            placeholder="생일을 입력해주세요"
            setValue={setValue}
          />

          {/* 여행지 관심분야 INPUT */}
          <span className="text-gray-700">여행지 관심분야</span>
          <InterestSelector
            register={register}
            errors={errors}
            setValue={setValue}
          />

          {/* 거주지 전문분야 INPUT */}
          <span className="text-gray-700">거주지 전문분야</span>
          <ExpertisesSelector
            register={register}
            errors={errors}
            setValue={setValue}
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
