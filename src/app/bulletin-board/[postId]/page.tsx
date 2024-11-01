"use client";

import { useEffect, useState } from "react";
import { categoryMap, Post } from "../_types/PostResponse";
import { posts } from "../_data/mock_post";
import Image from "next/image";
import LikeButton from "../_components/LikeButton";
import HateButton from "../_components/HateButton";

interface PostPageProps {
  params: {
    postId: string;
  };
}
const PostPage = ({ params }: PostPageProps) => {
  const { postId } = params;
  const [postData, setPostData] = useState<Post | undefined>();

  useEffect(() => {
    const getPost =  () => { 
      const numericPostId = Number(postId)
      const matchPost = posts.find((post) => post.id === numericPostId);
      setPostData(matchPost);
      console.log(matchPost)
    }

    getPost();
  }, [postId,]);

  if(!postData){
    return(<div>Loading</div>)
  }

  return (
    <>
        <section className=" py-5 w-full mx-auto">
          {/* 뉴스 카테고리와 제목 표시 */}
          <h4 className="text-xs text-gray-500">
            Post &gt;                {Object.keys(categoryMap).find(key => categoryMap[key] === postData.category)}
          </h4>
          <div className="py-5">
            <h1 className="font-bold text-3xl">{postData.title}</h1>
            <p className="text-xs text-gray-500 py-2">
              {postData.date} | 조회3 추천3 댓글{postData.likes}
            </p>
          </div>
          <hr />
          <div>
            {/* 뉴스 이미지 및 설명 표시 */}
            <img src={postData.imageUrl} alt={postData.title} height={400} width={600} className="object-cover py-5 mx-auto" />
            <p className="py-5">{postData.content}</p>
          </div>
          <hr />
          <div className="flex justify-center items-center p-4">
            <p>이 기사를 추천합니다.</p>
          </div>
          {/* 추천 및 비추천 버튼 */}
          <div className="flex justify-center items-center p-4">
            <LikeButton likeCount={postData.likes}/>
                <HateButton disLikeCount={postData.dislikes}/>
          </div>
          <hr />
          <div className="py-4">
            {/* 댓글 수 및 댓글 입력 */}
            <p className="font-bold py-4">댓글 {postData.comments}</p>
            {/* <ReplyInput/>
                <Reply reply={repliesData}/> */}
          </div>
          {/* 이전 뉴스 및 다음 뉴스로 이동하는 버튼 */}
          <div>
            {/* <ToBeforeNews/>
                <hr/>
                <ToNextNews/> */}
          </div>
        </section>
    </>
  );
};

export default PostPage;
