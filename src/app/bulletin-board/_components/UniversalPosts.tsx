import { LoadingSpinner } from "@/core/components/LoadingSpinner";
import { useGetPost } from "@/core/hooks/useGetPost";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { PostResponse } from "../_types/PostResponse";
import Image from "next/image";
import { TravelIcon } from "@/core/components/icons/TravelIcon";
import { ResidentIcon } from "@/core/components/icons/ResidentIcon";
import { CommentIcon, LikeIcon } from "@/core/components/icons/LikeCommentIcon";
import PageNavigation from "@/app/gachiga/local/[countryCode]/_components/PageNavigation";
import PageNavigationPost from "./PageNavigationPost";
import { HotIcon } from "@/core/components/icons/HotIcon";
import { PopularPosts } from "./PopularPosts";
import { changeTimeFormatYYMMDD } from "@/core/utils/handleTimeFormat";
import { useRouter } from "next/navigation";

interface UniversalPostsProps {
  page: number;
  size: number;
  setPage: (page: number) => void;
}

export const UniversalPosts = ({
  page,
  size,
  setPage,
}: UniversalPostsProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  const {
    data: postData,
    isLoading: isPostLoading,
    isError: isPostError,
    error: PostError,
  } = useQuery({
    queryKey: ["post", page, size],
    queryFn: () =>
      useGetPost(
        session?.accessToken,
        "region.countryCode=UNIVERSAL&category=BULLETIN",
        page,
        size
      ), //meeting을 가져오는 react query가 실행된 후에 실시
    enabled: !!session?.accessToken,
    retry: 2,
  });

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

  if (isPostLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <LoadingSpinner loading={isPostLoading} /> {/* 로딩 스피너 */}
        <span className="text-3xl font-bold mt-[20px]">
          로딩중... 잠시만 기다려주세요
        </span>
      </div>
    );
  }

  if (isPostError) {
    return (
      <div>게시글을 가져오는데 {PostError.message}가 발생하였습니다. </div>
    );
  }

  if (postData) {
    return (
      <>
        {/* 인기글 */}
        {/* 인기글 헤더 */}
        <header className="mt-[55px] flex gap-x-[5px] items-center ">
          <HotIcon />
          <span className="font-semibold text-lg">인기글</span>
        </header>
        <div className="mt-[15px]">
          <PopularPosts postData={postData.content} />
        </div>
        {/* 게시글 개수 */}
        <label className="flex text-lg font-semibold mt-[40px] mb-[15px]">
          {postData?.totalElements}개의 게시글
        </label>
        <div className="grid grid-cols-2 gap-x-5 mt-[15px] flex-wrap gap-y-5 w-full justify-center">
          {postData.content.map((post: PostResponse, index: number) => (
            <div
              className="bg-white p-[15px] rounded-[10px] flex cursor-pointer "
              key={index}
              onClick={() => router.push(`/bulletin-board/post/${post.postId}`)}
            >
              <section className="flex flex-col flex-1 gap-y-[5px]">
                {/* 태그 */}
                <div className="bg-[#ffe9ea] px-[6px] py-[2px] rounded-[2px] mr-auto">
                  <span className="text-[11px] text-[#e62a2f] flex my-auto">
                    자유게시판
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
                <section className="ml-[15px] flex items-center justify-center">
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
          ))}
        </div>
        <div className="mt-[18px]">
          <PageNavigationPost
            page={page + 1}
            totalPages={postData.totalPages}
            setPage={setPage}
          />
        </div>
      </>
    );
  }
};
