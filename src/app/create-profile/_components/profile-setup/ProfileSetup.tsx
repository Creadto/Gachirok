import { BackButton } from "@/app/bulletin-board/_components/BackButton";
import CountryStateCitySelector from "@/app/bulletin-board/local/[countryCode]/create/meetings/_components/CountryStateCitySelector";
import { ProfileCreateRequest } from "@/app/profile/_types/ProfileCreateRequest";
import CustomAlert from "@/core/components/CustomAlert";
import ExpertisesSelector from "@/core/components/ExpertisesSelector";
import InterestSelector from "@/core/components/InterestsSelector";
import SingleDateSelector from "@/core/components/SingleDateSelector";
import usePostProfileCreateRequest from "@/core/hooks/usePostProfileCreateRequest";
import { mapProfileResponse } from "@/core/mapper/profile-mapper";
import useProfileStore, { Profile } from "@/core/store/profile-store";
import axios from "axios";
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
    watch,
    formState: { errors },
  } = useForm<ProfileCreateRequest>();

  //submit시 실행
  const onValid = async (data: ProfileCreateRequest) => {
    if (nicknameAvailable === null) {
      alert("닉네임 중복검사를 해주세요");
    } else if (nicknameAvailable === false) {
      alert("사용가능한 닉네임을 입력해주세요");
    }
    console.log(data);

    try {
      setLoading(true);
      const accessToken = `Bearer ${session?.accessToken}`;
      const formData = appendProfileCreateRequestFormData(data); //data를 formData로 append
      const res = await usePostProfileCreateRequest(accessToken, formData); //API로 응답 Request

      const result = await res.data;
      const updatedProfile: Profile = mapProfileResponse(result, profile); //응답으로 받은 ProfileResponse을 profile store에 Mapping
      setProfile(updatedProfile);

      if (result) {
        setAlertMessage("Profile updated successfully!");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Failed to catch profile data", error);
    } finally {
      setLoading(false);
    }
  };

  const onInValid = (errors: FieldErrors) => console.log(errors);

  const [nicknameAvailable, setNicknameAvailable] = useState<boolean | null>(
    null
  );

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

  //닉네임 체크
  const handleNicknameCheck = async (nickname: string) => {
    try {
      const response = await axios.get(`/api/profiles/check-nickname`, {
        params: { nickname },
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      const data = await response.data;

      if (data === true) {
        setNicknameAvailable(true);
      } else {
        setNicknameAvailable(false); // 중복이 없으면 에러 메시지 제거
      }
    } catch (error) {
      console.log("error", error);
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
    <div className="bg-white flex justify-center">
      <div className="w-full max-w-4xl mt-[50px]">
        <div className="flex items-center ml-[-45px] space-x-[15px]">
          <BackButton onClick={() => router.push("/")} />
          <h1 className="text-[22px] font-bold">프로필 설정</h1>
          
        </div>

        <form onSubmit={handleSubmit(onValid, onInValid)}>
          {/* 프로필 사진 선택 INPUT */}
          <ProfileImageForm
            image={profileImage}
            onImageUpload={handleProfileImageUpload}
            label="프로필"
          />

          {/* 배경이미지 선택 INPUT */}
          <BackgroundImageForm
            image={backgroundImage}
            onImageUpload={handleBackgroundImageUpload}
            label="배경이미지"
          />

          {/* 닉네임 선택 INPUT */}
          <NicknameForm
            register={register}
            label="닉네임"
            name="nickname"
            required={true}
            errors={errors}
            placeholder="닉네임을 입력하세요"
            onNicknameCheck={handleNicknameCheck}
            watch={watch}
            nicknameAvailable={nicknameAvailable}
            setNicknameAvailable={setNicknameAvailable}
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

          <div className="flex">
            <div className="flex-1">
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
            </div>

            <div className="flex-1">
              {/* 거주자 INPUT */}
              <TwoButtonForm
                title="구분"
                options={[
                  { label: "여행자", value: true },
                  { label: "거주자", value: false },
                ]}
                activeValue={traveler}
                onChange={setTraveler}
              />
            </div>
          </div>

          {/* 생일 INPUT */}
          <label className="block mt-[40px] text-[13px] text-[#808080]">
            생일
          </label>
          <SingleDateSelector
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            register={register}
            errors={errors}
            name="birth"
            placeholder="생일을 입력해주세요"
            setValue={setValue}
          />

          <hr className="w-full h-[1px] mt-[50px] mb-[68px] bg-[#EEEEEE]" />

          {/* 거주국가 INPUT */}
          {/* <ResidenceForm register={register} errors={errors} /> */}
          <label className="block text-[13px] text-[#808080]">거주 장소</label>
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

          {/* 거주년도 INPUT */}

          <label className="block mt-[40px] text-[13px] text-[#808080]">
            거주 년수
          </label>
          <div className="flex items-start mt-[5px] font-bold">
            {residenceYear}년
          </div>
          <input
            type="range"
            min={1}
            max={20}
            step={1}
            value={residenceYear}
            onChange={(e) => setResidenceYear(Number(e.target.value))}
            className="w-full"
          />
          <div className="w-full flex justify-between text-[11px] h-5 relative">
            <span className="flex-1 absolute left-0 top-1">1년</span>{" "}
            {/* Align to the left */}
            <span className="flex-1 absolute left-[21%] top-1">5년</span>{" "}
            {/* Center aligned */}
            <span className="flex-1 absolute left-[46%] top-1">10년</span>{" "}
            {/* Center aligned */}
            <span className="flex-1 absolute left-[72%] top-1">15년</span>{" "}
            {/* Center aligned */}
            <span className="flex-1 absolute right-0 top-1">20년</span>{" "}
            {/* Align to the right */}
          </div>

          <hr className="w-full h-[1px] mt-[50px] mb-[68px] bg-[#EEEEEE]" />

          {/* 여행지 관심분야 INPUT */}
          <label className="block mt-[40px] text-[13px] text-[#808080]">
            여행지 관심분야
          </label>
          <InterestSelector
            register={register}
            errors={errors}
            setValue={setValue}
          />

          {/* 거주지 전문분야 INPUT */}
          <label className="block mt-[40px] text-[13px] text-[#808080]">
            거주지 전문분야
          </label>
          <ExpertisesSelector
            register={register}
            errors={errors}
            setValue={setValue}
          />

          {/* 프로필 성정 완료 버튼 */}
          <div className="w-full flex items-center justify-center mb-[150px]">
            <input
              type="submit"
              className="mt-[80px] w-[300px] h-[60px] bg-[#E62A2F] text-white rounded-lg font-semibold"
              value="프로필 설정완료!"
            />
          </div>

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
