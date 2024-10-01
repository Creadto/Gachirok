import React, { ChangeEvent, useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface UpdateProfileImageFormProps {
  imagePreviewURL: string | null;
  onFileChange: (file: File) => void;
  register: UseFormRegister<any>;
}

/**
 * @Description 프로필을 업데이트 하는 Form(이미지 only)
 * @author 김영서
 **/
const UpdateProfileImageForm: React.FC<UpdateProfileImageFormProps> = ({
  imagePreviewURL,
  onFileChange,
  register
}) => {
  const [localImageURL, setLocalImageURL] = useState<string | null>(
    imagePreviewURL
  );
  

  useEffect(() => { //파일을 변경하였을 때 미리보여주는 사진을 변경
    setLocalImageURL(imagePreviewURL);
  }, [imagePreviewURL]);


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setLocalImageURL(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      onFileChange(file);
    }
  };

  return (
    <label className="block">
      <span className="text-gray-700"></span>
      <div>
        {localImageURL ? (
          <img
            src={localImageURL}
            alt="Profile Preview"
            className="object-cover w-32 h-32 border rounded-full"
          />
        ) : (
          <p>No image available</p>
        )}
        <div>
          <label>Upload New Image:</label>
          <input
          {...register("photo")}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="p-2 border"
          />
        </div>
      </div>
    </label>
  );
};

export default UpdateProfileImageForm;
