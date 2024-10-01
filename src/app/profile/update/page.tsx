"use client";

import { ProfileUI } from "@/app/profile/_types/ProfileUI";
import CustomAlert from "@/core/components/CustomAlert";

import useGetProfileResponse from "@/core/hooks/useGetProfileResponse";
import usePutProfileUpdateRequest from "@/core/hooks/usePutProfileUpdateRequest";
import {
  mapProfileResponse,
  mapProfileUI,
  mapProfileUpdateRequest,
} from "@/core/mapper/profile-mapper";
import useProfileStore, { Profile } from "@/core/store/profile-store";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProfileUpdateRequest } from "../_types/ProfileUpdateRequest";
import UpdateProfileForm from "./_components/UpdateProfileForm";
import UpdateProfileImageForm from "./_components/UpdateProfileImageForm";
import appendProfileUpdateRequestFormData from "./_utils/appendProfileUpdateRequestFormData";

/**
 * @Description 프로필을 업데이트 하는 메인 페이지
 * @author 김영서
 **/

export default function ProfilePage() {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  //해당 파일에서 사용되는 변수들
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const accessToken = session?.accessToken;

  const [profileUI, setProfileUI] = useState<ProfileUI | null>(null); //사용자가 볼 수 있는 기존 프로필 정보를 출력하는  Type
  const [profileUrl, setProfileUrl] = useState<string>("");
  const [updateProfile, setUpdateProfile] =
    useState<ProfileUpdateRequest | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewURL, setImagePreviewURL] = useState<string | null>(null);
  //전역변수 사용
  const { profile, setProfile } = useProfileStore();

  //화면에 그리는 초기 정보 불러오기
  async function loadProfile() {
    try {
      if (accessToken) {
        const initialData = await useGetProfileResponse(accessToken);
        if (initialData) {
          setProfileUI(mapProfileUI(initialData.data));
          setImagePreviewURL(initialData.data.profilePhotoUrl);
        }
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  }

  useEffect(() => {
    loadProfile();
  }, [session]);

  useEffect(() => {
    console.log("profileUI", profileUI);
    setValue("traveler", profileUI?.traveler);
    setValue("residenceYear", profileUI?.residenceYear);
    setValue("nickname", profileUI?.nickname);
    setValue("introduction", profileUI?.introduction);
    setValue("interests", profileUI?.interests);
    setValue("expertises", profileUI?.expertises);
    setValue("photo", selectedFile);
  }, [profileUI, selectedFile]);

  //File이 변경될 때마다 setUpdateProfile을 update함
  useEffect(() => {
    if (profileUI && selectedFile) {
      setUpdateProfile(mapProfileUpdateRequest(profileUI, selectedFile));
      console.log("effect");
    }
  }, [selectedFile]);

  //프로필 업데이트가 성공되었다는 알림창 닫기
  const handleCloseAlert = () => setShowAlert(false);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    setProfileUI((prevProfile) => {
      if (!prevProfile) return null;
      let updatedArray: string[] = [];
      if (name === "interests" || name === "expertises") {
        updatedArray = checked
          ? [
              ...(prevProfile[name as keyof ProfileUpdateRequest] as string[]),
              value,
            ]
          : (
              prevProfile[name as keyof ProfileUpdateRequest] as string[]
            ).filter((item: string) => item !== value);

        return { ...prevProfile, [name]: updatedArray };
      }
      return prevProfile;
    });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileUI((updateProfile) =>
      updateProfile ? { ...updateProfile, [name]: value } : null
    );
  };

  //파일 변경 시 실행
  const handleFileChange = (file: File) => {
    setSelectedFile(file);
    const fileProfileUrl = URL.createObjectURL(file);
    console.log("사진링크1", fileProfileUrl);
    setProfileUrl(fileProfileUrl);
  };

  //프로필 업데이트 버튼 누를 때 실행
  const onValid = async (updatedData: any) => {
    setLoading(true);
    try {
      if (!accessToken) {
        throw new Error("Access token is missing");
      }
      if (profileUI !== null) {
        const formData = appendProfileUpdateRequestFormData(
          updatedData,
          updateProfile //사진이 바뀌지 않았으면 updateProfile은 null
        );
        const response = await usePutProfileUpdateRequest(
          `Bearer ${accessToken}`,
          formData
        );
        const data = response.data;
        if (data) {
          const updatedProfile: Profile = mapProfileResponse(data, profile);
          setProfile(updatedProfile);
          setAlertMessage("Profile updated successfully!");
          setShowAlert(true);
        } else {
          alert("Failed to update prof1ile");
        }
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while updating the profile.");
    } finally {
      setLoading(false);
    }
  };


  if (profileUI) {
    return (
      <form
        className="max-w-3xl p-6 mx-auto mt-6 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit(onValid)}
      >
        <h1 className="mb-4 text-2xl font-semibold text-center">Profile</h1>

        {/* 프로필 업데이트 Form(이미지 only) */}
        <UpdateProfileImageForm
          imagePreviewURL={imagePreviewURL}
          onFileChange={handleFileChange}
          register={register}
        />
        <div className="h-8"></div>

        {/* 프로필 업데이트 Form(이미지 제외) */}
        <UpdateProfileForm
          profile={profileUI}
          onInputChange={handleInputChange}
          onCheckboxChange={handleCheckboxChange}
          register={register}
          errors={errors}
          setValue={setValue}
        />

        {/* 프로필 업데이트 버튼 */}
        <input
          type="submit"
          className="py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 text-white"
          value="프로필 업데이트"
        />
        {showAlert && (
          <CustomAlert
            message={alertMessage}
            onClose={handleCloseAlert}
            route="/profile"
          />
        )}
      </form>
    );
  }
}
