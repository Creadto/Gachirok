import React from "react";
import Image from "next/image";

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
    <div className="mb-6 text-center">
      <label className="block mb-2 text-gray-700">{label}</label>
      <div className="relative inline-block">
        {/* 입력된 파일을 바탕으로 이미지 미리보기 표시 */}
        {image ? (
          <Image
            src={image}
            alt={label}
            width={100}
            height={100}
            className="rounded-full"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-500">이미지 없음</span>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={onImageUpload}
        />
      </div>
    </div>
  );
};

export default ProfileImageForm;