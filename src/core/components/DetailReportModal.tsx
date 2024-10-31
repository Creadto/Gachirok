import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "./icons/ArrowLeftIcon";
import CloseIcon from "./icons/CloseIcon";
import { usePostReports } from "../hooks/usePostReports";
import { HandleMediaUpload } from "../utils/handleMediaUpload";

interface DetailReportModalProps {
  setIsDetailReportModalOpen: (value: boolean) => void;
  setIsReportModalOpen: (value: boolean) => void;
  targetType: string;
  targetId: number;
  type: string;
  accessToken: string | undefined;
}
export const DetailReportModal = ({
  setIsDetailReportModalOpen,
  setIsReportModalOpen,
  targetId,
  targetType,
  type,
  accessToken,
}: DetailReportModalProps) => {
  const [reportContent, setReportContent] = useState("");
  const [photoUrl, setPhotoURL] = useState<string[]>([]);

  const handleClickReport = async () => {
    try {
      const newPhotourl = await HandleMediaUpload({photoURL: photoUrl, accessToken, targetPrefix: "REPORT"})
      const result = await usePostReports(
        targetType,
        targetId,
        type,
        reportContent,
        newPhotourl,
        accessToken
      );
      if (result) {
        alert("신고가 정상적으로 완료되었습니다.");
        setIsReportModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files).slice(0, 5 - photoUrl.length); // 남은 공간만큼만 선택

    // Create a FileReader for each file
    newFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPhotoURL((prev) => {
          const updatedPhotos = [...prev, reader.result as string];
          return updatedPhotos.slice(0, 5); // 최대 5개 유지
        });
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    });
  };

  const handleImageRemove = (index: number) => {
    // Update photoList state by removing the selected file
    setPhotoURL((prevPhotoList) => {
      // Use the same index to remove from photoList
      const updatedPhotoList = prevPhotoList.filter((_, i) => i !== index);
      return updatedPhotoList;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 스페이스바 눌렀을 때 textarea가 아닌 경우 동작 방지
      if (e.key === " " && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 cursor-default"
      onClick={(e) => {
        e.stopPropagation();
        setIsDetailReportModalOpen(false);
      }}
    >
      <div
        className="bg-white rounded-[15px] shadow-lg w-[375px] h-[470px] relative cursor-default px-[15px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 HEADER */}
        <div className="flex flex-row relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsDetailReportModalOpen(false);
            }}
            className="absolute top-[15px]"
          >
            <ArrowLeftIcon />
          </button>
          <div className="w-full h-[60px] flex items-start justify-start shadow-sm">
            <span className="font-bold text-lg flex mx-auto items-center justify-center my-auto">
              신고하기
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsReportModalOpen(false);
            }}
            className="absolute top-[15px] right-0 text-black hover:text-gray-800"
          >
            <CloseIcon />
          </button>
        </div>

        {/* 상세 신고 사유 */}
        <div className=" flex flex-col mt-[20px]" onClick={(e) => e.stopPropagation()}>
          <textarea
            value={reportContent}
            onChange={(e) => {
              setReportContent(e.target.value);
            }}
            placeholder="상세 신고 사유를 입력해주세요. (5자 이상)"
            className="rounded-lg p-[15px] text-sm bg-[#f6f6f6] h-[150px]"
            maxLength={200}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key !== ' ') {
                e.stopPropagation(); // 스페이스바 외의 다른 키는 전파를 막음
              }
            }}
          />
          <span className="flex  items-end justify-end text-xs text-[#a3a3a3] mt-[5px]">
            <span className="text-[#e62a2f]">{reportContent.length}</span>
            /250
          </span>
        </div>

        {/* 사진 추가 */}
        <div className="w-full mt-[15px]">
          {/* 파일 업로드 버튼 */}
          <label
            htmlFor="file-upload"
            className="border border-[#dddddd] py-[15px] rounded-lg text-center cursor-pointer flex gap-x-[5px] items-center justify-center my-auto"
          >
            <Image
              src="/images/icons/plus-black.webp"
              width={14}
              height={14}
              alt="Add"
            />
            <span className="text-sm">사진 추가</span>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden" // 화면에서 숨기기
            onClick={(e) => e.stopPropagation()}
            onChange={handleFileChange}
          />
          <p className="mt-[5px] text-xs text-start flex">
            5개 중 {photoUrl.length}개 업로드됨{" "}
            {photoUrl.length > 5 && (
              <p className="font-semibold text-[#e62a2f]">
                {" "}
                (이미지는 최대 5개까지만 가능합니다.){" "}
              </p>
            )}
          </p>
        </div>

        {/* 이미지 미리보기 */}
        <div className="flex flex-wrap gap-4 mt-2 justify-start">
          {photoUrl &&
            photoUrl.map((src, index) => (
              <div
                key={index}
                className="w-12 h-12 border border-gray-300 rounded-md overflow-hidden"
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageRemove(index);
                }}
              >
                <img
                  src={src}
                  alt={`미리보기 ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
        </div>

        {/* 접수하기 버튼 */}
        <button
          className={` left-[15px]  right-[15px] absolute bottom-[15px] mt-[10px] rounded-lg flex items-center justify-center py-[16px] ${
            reportContent.length >= 5 ? "bg-[#e62a2f]" : "bg-[#a3a3a3]"
          }`}
          disabled={reportContent.length < 5}
          onClick={handleClickReport}
        >
          <span className="text-[15px] font-semibold text-white">접수하기</span>
        </button>
      </div>
    </div>
  );
};
