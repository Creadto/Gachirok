import { useDeletePostReactions } from "@/core/hooks/useDeletePost";
import { usePostPostReactions } from "@/core/hooks/usePostPost";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ReactionButtonProps {
  postId: number;
  likeCount: number;
  unlikeCount: number;
  accessToken: string | undefined;
  reactions: string[];
}

export const ReactionButton = ({
  postId,
  likeCount,
  unlikeCount,
  accessToken,
  reactions,
}: ReactionButtonProps) => {
  const [isLikeClicked, setIsLikeClicked] = useState<boolean | undefined>(
    undefined
  );
  const [isUnLikeClicked, setIsUnLikeClicked] = useState<boolean | undefined>(
    undefined
  );
  const [like, setLike] = useState<number>(likeCount);
  const [unLike, setUnLike] = useState<number>(unlikeCount);

  const onClickLike = async() => {
    try{
      if (isUnLikeClicked) {
        setIsUnLikeClicked(false);
        setUnLike((prev) => prev - 1);
        await usePostPostReactions(accessToken, "POST", postId, "LIKE");
        setLike((prev) => prev+1)
        setIsLikeClicked(true);
      } else if(!isUnLikeClicked) {
        if (isLikeClicked) {
          setIsLikeClicked(false);
          setLike((prev) => prev - 1);
          await useDeletePostReactions(accessToken, "POST", postId, "LIKE");
        } else if (!isLikeClicked) {
          setIsLikeClicked(true);
          setLike((prev) => prev + 1);
          await usePostPostReactions(accessToken, "POST", postId, "LIKE");
        }
      }
    }catch(error) {
      console.error(error);
    }
  }

  const onClickUnlike = async() => {
    try{
      if (isLikeClicked) {
        setIsLikeClicked(false);
        setLike((prev) => prev - 1);
        await usePostPostReactions(accessToken, "POST", postId, "UNLIKE");
        setUnLike((prev) => prev + 1)
        setIsUnLikeClicked(true);
      } else if(!isLikeClicked) {
        if (isUnLikeClicked) {
          setIsUnLikeClicked(false)
          setUnLike((prev) => prev - 1);
          await useDeletePostReactions(accessToken, "POST", postId, "UNLIKE");
        } else if (!isUnLikeClicked) {
          setIsUnLikeClicked(true);
          setUnLike((prev) => prev + 1);
          await usePostPostReactions(accessToken, "POST", postId, "UNLIKE");
        }
      }
    }catch(error) {
      console.error(error);
    }
  }

  // const onClickLike = async () => {
  //   if (isUnLikeClicked) {
  //     setIsUnLikeClicked(false);
  //     setUnLike((prev) => prev - 1);
  //   }
  //   setIsLikeClicked((prev) => !prev);
  //   try {
  //     if (isLikeClicked) {
  //       setLike((prev) => prev - 1);
  //       await useDeletePostReactions(accessToken, "POST", postId, "LIKE");
  //     } else if (!isLikeClicked) {
  //       setLike((prev) => prev + 1);
  //       await usePostPostReactions(accessToken, "POST", postId, "LIKE");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const onClickUnlike = async () => {
  //   if (isLikeClicked) {
  //     setIsLikeClicked(false);
  //     setLike((prev) => prev - 1);
  //   }
  //   setIsUnLikeClicked((prev) => !prev);
  //   try {
  //     if (isUnLikeClicked) {
  //       setUnLike((prev) => prev - 1);
  //       await useDeletePostReactions(accessToken, "POST", postId, "UNLIKE");
  //     } else if (!isUnLikeClicked) {
  //       setUnLike((prev) => prev + 1);
  //       await usePostPostReactions(accessToken, "POST", postId, "UNLIKE");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    setIsLikeClicked(reactions.includes("LIKE"));
    setIsUnLikeClicked(reactions.includes("UNLIKE"));
    setLike(likeCount);
    setUnLike(unlikeCount);
  }, []);
  return (
    <div className="flex justify-center items-center my-[50px]">
      <button
        className={`w-[90px] h-[90px] rounded-[8px] border-solid border-[#eee] border-[1px] ${
          isLikeClicked ? "bg-blue-100" : ""
        } mr-[5px]`}
        onClick={onClickLike}
      >
        <div className="px-[26px] py-[11px] flex flex-col items-center justify-between ">
          <Image
            src="/images/interests&expertises/like-logo.svg"
            alt="like"
            width={30}
            height={30}
          />
          <p className="w-[38px] h-[14px] text-[10px] text-[#0676fc] mb-[8px]">
            추천해요!
          </p>
          <p className="text-[10px]">{like}</p>
        </div>
      </button>
      <button
        className={`w-[90px] h-[90px] rounded-[8px] border-solid border-[#eee] border-[1px] ${
          isUnLikeClicked ? "bg-red-100" : ""
        } ml-[5px]`}
        onClick={onClickUnlike}
      >
        <div className="px-[20.5px] py-[11px] flex flex-col items-center justify-between ">
          <Image
            src="/images/interests&expertises/dislike-logo.svg"
            alt="unlike"
            width={30}
            height={30}
          />
          <p className="text-[10px] w-[49px] h-[14px] text-[#ff006f] mb-[8px]">
            그냥 그래요.
          </p>
          <p className="text-[10px]">{unLike}</p>
        </div>
      </button>
    </div>
  );
};
