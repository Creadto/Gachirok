import React from "react";
import Image from "next/image";
import { NoProfileIcon } from "@/core/components/icons/NoProfileIcon";
import { EditProfileIcon } from "@/core/components/icons/create-profile/EditProfileIcon";

interface ProfileImageFormProps {
  image: string | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

/**
 * @Description 프로필 신규 생성의 Profile Image 생성
 * @author 김영서
 **/
const ProfileImageForm: React.FC<ProfileImageFormProps> = ({
  image,
  onImageUpload,
  label,
}) => {
  return (
    <div className="flex items-start flex-col">
      <label className="block mt-[40px] text-[13px] text-[#808080]">
        {label}
      </label>
      <div className="flex flex-row">
        <div className="relative inline-block mt-[10px]">
          {/* 입력된 파일을 바탕으로 이미지 미리보기 표시 */}
          {image ? (
            <Image
              src={image}
              alt={label}
              width={90}
              height={90}
              className="rounded-full"
            />
          ) : (
            <div className="w-[90px] h-[90px] flex relative">
              <NoProfileIcon className="w-full h-full border-none" />
              <EditProfileIcon className="absolute bottom-0 right-0" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={onImageUpload}
          />
        </div>
        <div className="ml-[20px] flex items-center justify-center w-[212px] h-[32px] my-auto">
        <span className="text-[12px] text-[#A3A3A3]" style={{ wordBreak: "keep-all"}}>* 가치락 커뮤니티 및 채팅 등에서 사용할 나를 대표하는 프로필 이미지를 설정해주세요. </span>
        </div>
        
      </div>
    </div>
  );
};

export default ProfileImageForm;
