import { ArrowLeftIcon } from "@/core/components/icons/ArrowLeftIcon";
import {
  ArrowRightIcon,
  ArrowRightIconExtraLarge,
} from "@/core/components/icons/ArrowRightIcon";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageSectionProps {
  photoUrls: string[];
}

export const ImageSection = ({ photoUrls }: ImageSectionProps) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPhotoModalIndex, setCurrentPhotoModalIndex] = useState(0);

  // 5초마다 이미지 전환
  useEffect(() => {
    if (photoUrls.length > 1) {
      const interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentPhotoIndex((prevIndex) =>
            prevIndex === photoUrls.length - 1 ? 0 : prevIndex + 1
          );
          setIsAnimating(false);
        }, 500); // 페이드 아웃/인 시간과 맞춤
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [photoUrls.length]);

  const handleViewFullImage = () => {
    // 새로운 창에서 전체 사진을 보여줌

    window.open(photoUrls[currentPhotoIndex], "_blank");
  };

  const handleDotClick = (index: number) => {
    setCurrentPhotoIndex(index);
  };

  const handleModalNextButton = () => {
    setCurrentPhotoModalIndex((prevIndex) =>
      prevIndex === photoUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleModalPrevButton = () => {
    setCurrentPhotoModalIndex((currentIndex) =>
      currentIndex === 0 ? photoUrls.length - 1 : currentIndex - 1
    );
  };

  const toggleModal = () => {
    setCurrentPhotoModalIndex(currentPhotoIndex);
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="relative w-full mt-[30px] flex-col items-center">
      <button
        onClick={handleViewFullImage}
        className="absolute top-4 right-4 z-10 px-3 py-1 text-sm text-white bg-gray-800 bg-opacity-75 rounded-md hover:bg-opacity-90"
      >
        전체사진보기
      </button>
      {/* 페이지네이션 점 */}
      <div className="flex mt-4 space-x-4 mb-[15px] items-center justify-center">
        {photoUrls.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-4 h-4 rounded-full ${
              currentPhotoIndex === index ? "bg-[#e62a2f]" : "bg-[#a3a3a3]"
            }`}
          />
        ))}
      </div>

      {/* 이미지 표시 */}
      <div
        onClick={toggleModal} // 클릭으로 모달 제어
        className={`relative w-full h-[523px] rounded-lg mb-[10px] transition-opacity duration-500 ease-in-out ${
          isAnimating ? "opacity-0 scale-105" : "opacity-100 scale-100"
        }`}
      >
        <Image
          src={photoUrls[currentPhotoIndex]}
          fill
          alt="Meeting Photo"
          className="hover:cursor-pointer  w-full max-h-[523px] min-h-[523px] object-cover rounded-lg transition-transform duration-700 ease-in-out"
        />
      </div>

      {/* 모달 표시 */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={toggleModal} // 모달 닫기
        >
          <div className="relative w-4/5 h-4/5 max-w-3xl">
            <Image
              src={photoUrls[currentPhotoModalIndex]}
              alt="Meeting Photo Enlarged"
              fill
              className="object-contain rounded-lg"
            />
            <button
              className="absolute left-[-100px] top-[500px] bg-white rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                handleModalPrevButton();
              }}
            >
              <ArrowLeftIcon />
            </button>
            <button
              className="absolute right-[-100px] top-[500px] bg-white rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                handleModalNextButton();
              }}
            >
              <ArrowRightIconExtraLarge />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
