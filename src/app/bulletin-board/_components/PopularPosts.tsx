import Image from "next/image";
import { useEffect, useState } from "react";
import { PostResponse } from "../_types/PostResponse";
import { TravelIcon } from "@/core/components/icons/TravelIcon";
import { ResidentIcon } from "@/core/components/icons/ResidentIcon";
import { changeTimeFormatYYMMDD } from "@/core/utils/handleTimeFormat";
import { CommentIcon, LikeIcon } from "@/core/components/icons/LikeCommentIcon";
import { useRouter } from "next/navigation";

interface PopularPostsProps {
  postData: PostResponse[];
}

export const PopularPosts = ({ postData }: PopularPostsProps) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [currentPostGroup, setCurrentPostGroup] = useState<PostResponse[]>([]);

  const handleBeforeClick = () => {
    if (currentIndex === 0) {
      setCurrentIndex(Math.floor((maxIndex - 1) / 3) * 3);
    } else {
      setCurrentIndex((prev) => prev - 3);
    }
  };
  const handleNextClick = () => {
    if (maxIndex - currentIndex > 0 && maxIndex - currentIndex < 4) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prev) => prev + 3);
    }
  };

  const removeImages = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // 모든 img 태그 제거
    const images = doc.querySelectorAll("img");
    const br = doc.querySelectorAll("br");
    images.forEach((img) => img.remove());
    br.forEach((br) => br.remove());

    return doc.body.innerHTML; // img 태그가 제거된 HTML 반환
  };

  useEffect(() => {
    setMaxIndex(postData.length);

    const currentPost = postData?.slice(currentIndex, currentIndex + 3);
    setCurrentPostGroup(currentPost);
  }, [currentIndex, postData]);
  return (
    <div className="flex flex-row relative w-full">
      <button className="flex items-center" onClick={handleBeforeClick}>
        <Image
          src="/images/interests&expertises/circle-before-logo.svg"
          alt="이전으로"
          width={30}
          height={30}
          className="hover:bg-gray-300 rounded-full absolute left-[-50.5px] top-[40%] "
        />
      </button>
      <div className="grid grid-cols-3 w-full gap-x-[20px]">
        {currentPostGroup?.map((post) => (
          <div
            key={post.postId}
            className="w-full h-[140px] flex flex-row p-[15px] cursor-pointer border rounded-[10px] bg-[#FFF]"
            onClick={() => {
              router.push(`/bulletin-board/post/${post.postId}`);
            }}
          >
            <div className="flex w-full">
              <section className="flex flex-col flex-1 gap-y-[5px] ">
                {/* 태그 */}
                <div className="bg-[#ffe9ea]  rounded-[2px] mr-auto flex">
                  <span className="text-[11px] text-[#e62a2f] inline px-[6px] py-[2px]">
                    자유게시판
                  </span>
                  <span className="text-[11px] text-[#ffffff] bg-[#e62a2f] inline-block px-[6px] py-[2px] ">
                    HOT🌟
                  </span>
                </div>
                {/* 제목 */}
                <span className="text-[15px] font-semibold">{post.title}</span>
                <p
                  className="text-[13px] text-[#808080] max-h-[36px] min-h-[36px] line-clamp-2"
                  dangerouslySetInnerHTML={{
                    __html: removeImages(post.content),
                  }}
                />
                <div className="flex mt-[5.5px] items-center">
                  {/* 유저 프로필 사진*/}
                  <div className="w-[14px] h-[14px] rounded-full">
                    <Image
                      src={post.author.profilePhotoUrl}
                      width={100}
                      height={100}
                      alt={post.author.nickname}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  {/* 유저 닉네임 */}
                  <div className="text-[11px] ml-[5px]">
                    {post.author.nickname}
                  </div>

                  {/* 유저 거주자/여행자 배지 */}
                  {post.author.traveler ? (
                    <div className="w-[14px] h-[14px] ml-[3px] flex items-center">
                      <TravelIcon />
                    </div>
                  ) : (
                    <div className="w-[14px] h-[14px] ml-[3px] flex items-center">
                      <ResidentIcon />
                    </div>
                  )}

                  <div className="h-[2px] w-[2px] rounded-full ml-[5px] bg-[#a3a3a3] flex items-center" />

                  {/* 작성 날짜 */}
                  <div className="text-[11px] text-[#a3a3a3] flex items-center ml-[5px] my-auto">
                    {changeTimeFormatYYMMDD(post.createdAt)}
                  </div>

                  <div className=" ml-auto flex gap-x-[2px] items-center">
                    <LikeIcon />
                    <p className="text-[11px] text-[#a3a3a3]">
                      {post.likeCount}
                    </p>
                  </div>
                  <div className="h-[2px] w-[2px] rounded-full mx-[5px] bg-[#a3a3a3] flex items-center" />
                  <div className="flex gap-x-[2px] items-center">
                    <CommentIcon />
                    <p className="text-[11px] text-[#a3a3a3]">
                      {post.commentCount}
                    </p>
                  </div>
                </div>
              </section>

              {post.thumbnailPhotoUrl && (
                <section className="ml-[15px] flex items-center justify-end ">
                  <Image
                    width={110}
                    height={110}
                    alt={`Image of ${post.postId}`}
                    src={post.thumbnailPhotoUrl}
                    className="w-[110px] h-[110px] object-cover rounded-lg"
                  />
                </section>
              )}
            </div>
          </div>
        ))}
      </div>
      <button className="flex items-center" onClick={handleNextClick}>
        <Image
          src="/images/interests&expertises/circle-next-logo.svg"
          alt="다음으로"
          width={30}
          height={30}
          className="hover:bg-gray-300 rounded-full absolute right-[-50.5px] top-[40%]"
        />
      </button>
    </div>
  );
};
