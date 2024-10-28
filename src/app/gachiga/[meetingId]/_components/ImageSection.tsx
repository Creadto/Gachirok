import Image from "next/image"
import { useState } from "react";
interface ImageSectionProps {
  photoUrls: string[]
}

export const ImageSection = ({photoUrls}:ImageSectionProps) => {

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const nextPhoto = () => {
    if (currentPhotoIndex < photoUrls.length - 1) {
      setCurrentPhotoIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="relative w-full mt-[30px]">
      <Image
        src={photoUrls[currentPhotoIndex]}
        width={500}
        height={423}
        layout="responsive"
        alt="Meeting Photo"
        className="w-full h-full object-fill"
      />
      <button
        onClick={prevPhoto}
        disabled={currentPhotoIndex === 0}
        className={`text-lg absolute left-0 top-8 transform -translate-y-1/2 px-8 py-4  text-white rounded-lg ${
          currentPhotoIndex === 0 ? "bg-[#a3a3a3] cursor-not-allowed" : "bg-[#e62a2f]"
        }`}
      >
        이전
      </button>
      <button
        onClick={nextPhoto}
        disabled={currentPhotoIndex === photoUrls.length - 1}
        className={`text-lg absolute right-0 top-8 transform -translate-y-1/2 px-8 py-4  text-white rounded-lg ${
          currentPhotoIndex === photoUrls.length - 1
            ? "bg-[#a3a3a3] cursor-not-allowed"
            : "bg-[#e62a2f]"
        }`}
      >
        다음
      </button>
    </div>
  );
};
