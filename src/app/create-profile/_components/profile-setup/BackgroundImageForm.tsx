import React from "react";
import Image from "next/image";
import { PictureIcon } from "@/core/components/icons/create-profile/PictureIcon";

interface BackgroundImageFormProps {
  image: string | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}
/**
 * @Description 프로필 신규 생성의 Background Image 생성
 * @author 김영서
 **/
const BackgroundImageForm: React.FC<BackgroundImageFormProps> = ({
  image,
  onImageUpload,
  label,
}) => {
  return (
    <div className="flex items-start flex-col">
      <label className="block mt-[40px] text-[13px] text-[#808080]">
        {label}
      </label>
      <div className="relative inline-block mt-[10px]">
        {image ? (
          <Image src={image} alt={label} width={400} height={172} />
        ) : (
          <div className="w-[400px] h-[172px] bg-[#F6F6F6]  flex items-center justify-center relative rounded-[10px]">
            <PictureIcon className="absolute top-[65px] left-[185px]"/>
            <span className="absolute top-[95px] mx-auto">배경 이미지 첨부</span>
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

export default BackgroundImageForm;
