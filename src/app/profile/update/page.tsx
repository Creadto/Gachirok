"use client";

import CustomAlert from "@/core/components/CustomAlert";
import useStore from "@/core/store/user-store";
import { ProfileResponse } from "@/core/types/Profile";
import { ProfileUI } from "@/core/types/ProfileUI";
import { ProfileUpdateRequest } from "@/core/types/Profile";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import { getProfileData } from "../_utils/useGetProfile";
import UpdateProfileForm from "./_components/UpdateProfileForm";
import UpdateProfileImageForm from "./_components/UpdateProfileImageForm";
import useUserStore from "@/core/store/user-store";

export default function ProfilePage() {
  //해당 파일에서 사용되는 변수들
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const accessToken = session?.accessToken;
  const [profileUI, setProfileUI] = useState<ProfileUI | null>(null);
  const [profileUrl, setProfileUrl] = useState<string>("");
  const [updateProfile, setUpdateProfile] =
    useState<ProfileUpdateRequest | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewURL, setImagePreviewURL] = useState<string | null>(null);
  //전역변수 사용
  const { user, setUser } = useUserStore();

  useEffect(() => {
    async function loadProfile() {
      try {
        if (accessToken) {
          const initialData: ProfileResponse = await getProfileData(
            accessToken
          );
          if (initialData) {
            setProfileUI({
              traveler: initialData.traveler,
              residenceYear: initialData.residenceYear,
              nickname: initialData.nickname,
              residenceCountryCode: initialData.residenceCountryCode,
              residenceStateCode: initialData.residenceStateCode,
              residenceCityCode: initialData.residenceCityCode,
              introduction: initialData.introduction,
              photo: initialData.profilePhotoUrl,
              interests: initialData.interests,
              expertises: initialData.expertises,
            });
            setImagePreviewURL(initialData.profilePhotoUrl);
          }
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    }
    loadProfile();
  }, [session]);


  useEffect(() => {
    if (profileUI && selectedFile) {
      setUpdateProfile({
        traveler: profileUI.traveler,
        residenceYear: profileUI.residenceYear,
        nickname: profileUI.nickname,
        residenceCountryCode: profileUI.residenceCountryCode,
        residenceStateCode: profileUI.residenceStateCode,
        residenceCityCode: profileUI.residenceCityCode,
        introduction: profileUI.introduction,
        photo: selectedFile,
        interests: profileUI.interests,
        expertises: profileUI.expertises,
      });
    }
    console.log("effect");
  }, [selectedFile]);

  // useEffect(() => { //유저가 파일 선택을 통해서 이미지를 변경할 때 상단 topbar에 이를 반영
  //   if (profileUrl && userResponse?.profile) {
  //     setUserResponse({
  //       ...userResponse,
  //       profile: {
  //         ...userResponse?.profile,
  //         profilePhotoUrl: profileUrl,
  //       },
  //     });
  //   }
  // }, [profileUrl]);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

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

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
    const fileProfileUrl = URL.createObjectURL(file);
    console.log("사진링크1", fileProfileUrl);
    setProfileUrl(fileProfileUrl);

    // Update the updateProfile state if needed
    if (selectedFile) {
      setUpdateProfile((prevUpdateProfile) => {
        if (!prevUpdateProfile) return prevUpdateProfile;
        return {
          ...prevUpdateProfile,
          photo: file,
        };
      });
    }
    console.log("사진링크", profileUrl);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (!accessToken) {
        throw new Error("Access token is missing");
      }

      const formData = new FormData();
      formData.append("traveler", String(profileUI?.traveler));
      formData.append("residenceYear", String(profileUI?.residenceYear));
      formData.append("nickname", profileUI?.nickname || "");
      formData.append(
        "residenceCountryCode",
        profileUI?.residenceCountryCode || ""
      );
      formData.append("residenceStateCode", profileUI?.residenceStateCode || "");
      formData.append("residenceCityCode", profileUI?.residenceCityCode || "");
      formData.append("introduction", profileUI?.introduction || "");

      profileUI?.interests.forEach((interest) =>
        formData.append("interests", interest)
      );
      profileUI?.expertises.forEach((expertise) =>
        formData.append("expertises", expertise)
      );

      if (updateProfile?.photo) {
        formData.append("photo", updateProfile?.photo);
      }

      const res = await fetch("/api/profiles", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (res.ok) {
        setAlertMessage("Profile updated successfully!");
        setShowAlert(true); // Show the alert if the response is OK
        if (profileUrl && user?.profile) {
          //최종적으로 upload하는 이미지는 변경하고자 하는 이미지이기 때문에
          //useState으로 정의한 local변수 profileUrl에 해당 이미지 링크를 담은 후, 이를 userResponse에 넣기
          setUser({
            ...user,
            profile: {
              ...user?.profile,
              profilePhotoUrl: profileUrl,
            },
          });
        }
      } else {
        alert("Failed to update prof1ile");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while updating the profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl p-6 mx-auto mt-6 bg-white rounded-lg shadow-md">
      <h1 className="mb-4 text-2xl font-semibold text-center">Profile</h1>

      <UpdateProfileImageForm
        imagePreviewURL={imagePreviewURL}
        onFileChange={handleFileChange}
      />
      <div className="h-8"></div>

      <UpdateProfileForm
        profile={profileUI}
        onInputChange={handleInputChange}
        onCheckboxChange={handleCheckboxChange}
      />

      <button
        onClick={handleSave}
        disabled={loading}
        className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md shadow-md hover:bg-indigo-600 disabled:bg-gray-400"
      >
        {loading ? "Saving..." : "Save"}
      </button>
      {showAlert && (
        <CustomAlert
          message={alertMessage}
          onClose={handleCloseAlert}
          route="/profile"
        />
      )}
    </div>
  );
}
