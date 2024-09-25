import { ProfileCreateRequest } from "@/app/profile/_types/ProfileCreateRequest";
import ToggleButton from "@/core/components/ToggleButton";
import useProfileStore, { Profile } from "@/core/store/profile-store";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import TwoButtonForm from "./profile-setup/TwoButtonForm";
import ResidenceForm from "./profile-setup/ResidenceForm";
import ProfileImageForm from "./profile-setup/ProfileImageForm";
import BackgroundImageForm from "./profile-setup/BackgroundImageForm";
import NicknameForm from "./profile-setup/NicknameForm";
import { error } from "console";
import IntroductionForm from "./profile-setup/IntroductionForm";
import InterestAndExpertiseForm from "./profile-setup/InterestAndExpertiseForm";

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

  const onValid = async (data: ProfileCreateRequest) => {
    // const res = await axios.post(
    //   "/profiles",
    //   {
    //     data,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${session?.accessToken}`,
    //     },
    //   }
    // );
    // const result = await res.data;
    // const updatedProfile:Profile = {
    //     ...profile,
    //     male: result.male,
    //     traveler: result.traveler,
    //     age: result.age,
    //     residenceYear: result.residenceYear,
    //     hostValue: result.hostValue,
    //     guestValue: result.guestValue,
    //     knowledgeValue: result.knowledgeValue,
    //     profilePhotoUrl: result.profilePhotoUrl,
    //     nickname: result.nickname,
    //     residenceCountryCode: result.residenceCountryCode,
    //     introduction: result.introduction,
    //     birth: result.birth,
    //     interests: result.interests,
    //     expertises: result.expertises,
    //     purchaseProfile: result.purchaseProfile
    // }
    // setProfile(updatedProfile);
    // if(result) {
    //     router.push('/');
    // }
    console.log(data);
  };
  const onInValid = (errors: FieldErrors) => console.log(errors);
  const [male, setMale] = useState(true); // 초기값은 남자로 설정
  const [activatedMale, setActivatedMale] = useState(true);
  const [traveler, setTraveler] = useState(true); // 초기값은 남자로 설정
  const [activatedTraveler, setActivatedTraveler] = useState(true);
  const [residenceYear, setResidenceYear] = useState(1);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);
  const [birth, setBirth] = useState<string>("");
  const [formattedDate, setFormattedDate] =
    useState<string>("2024년 09월 25일");
  const [interests, setInterests] = useState<string[]>([]);
  const [expertises, setExpertises] = useState<string[]>([]);
  const interestsOptions = ["culture", "activity", "food", "self_development", "amity", "volunteer", "local"];
  const expertisesOptions = ["culture", "activity", "food", "self_development", "amity", "volunteer", "local"];


  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileFile(file);
      const profileImageUrl = URL.createObjectURL(file);
      setProfileImage(profileImageUrl);
    }
  };

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
  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === "interests") {
      if (checked) {
        setInterests((prev) => [...prev, value]);
      } else {
        setInterests((prev) => prev.filter((interest) => interest !== value));
      }
    } else if (name === "expertises") {
      if (checked) {
        setExpertises((prev) => [...prev, value]);
      } else {
        setExpertises((prev) =>
          prev.filter((expertise) => expertise !== value)
        );
      }
    }
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    console.log(dateValue);
    setBirth(dateValue);
    const date = new Date(dateValue);
    console.log(formatDate(date));
    setFormattedDate(formatDate(date));
    setValue("birth", formattedDate);
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
    setValue("photo", profileFile);
    setValue("interests", interests);
    setValue("expertises", expertises);
  }, [
    male,
    traveler,
    residenceYear,
    profileFile,
    backgroundFile,
    interests,
    expertises,
  ]);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg justify">
        <div className="flex items-center space-x-4 mb-8">
          <button className="text-gray-500" onClick={() => router.push("/")}>
            &lt; 뒤로
          </button>
          <h1 className="text-2xl font-bold">프로필 설정</h1>
        </div>

        <form onSubmit={handleSubmit(onValid, onInValid)}>
          {/* 거주국가 INPUT */}
          <ResidenceForm register={register} errors={errors} />

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
          <InterestAndExpertiseForm register={register} label="여행지 관심분야" name="interests" options={interestsOptions} errors={errors}/>

          {/* 거주지 전문분야 INPUT */}

          <InterestAndExpertiseForm register={register} label="거주지 전문분야" name="expertises" options={expertisesOptions} errors={errors}/>

          {/* 프로필 성정 완료 버튼 */}
          <input
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            value="프로필 생성"
          />
        </form>
      </div>
    </div>
  );
}
