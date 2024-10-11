"use client"
import { useRouter } from "next/navigation";
import { categoryMap, Post } from "../_types/Posts";
interface PostListProps {
  filteredPosts: Post[]
}

const PostList = ({filteredPosts}: PostListProps) => {
  const router = useRouter();
  return (
    <div className="w-full px-4 py-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="border rounded-lg p-4 hover:bg-gray-100 transition"
          >
            <button onClick={() => router.push(`/bulletin-board/${post.id}`)}>
            <div className="flex justify-start items-center flex-row gap-x-2">
              <span className="text-sm text-black border border-solid bg-slate-300">
                {/* 한글에 해당하는 category 제목을 찾아서 출력 */}
               {Object.keys(categoryMap).find(key => categoryMap[key] === post.category)}
              </span>
              {post.trending === true ? (
                <span className="text-sm text-white border border-solid bg-pink-500">
                  인기글
                </span>
              ) : (
                <></>
              )}
            </div>
            <h3 className="mt-2 font-bold text-lg">{post.title}</h3>
            <div className="flex justify-between items-center mt-4">
              <div className="items-start flex flex-row gap-x-5">
                <div className="text-sm text-gray-700">{post.author}</div>
                <span className="text-sm text-gray-500">{post.date}</span>
              </div>
              <div className="flex space-x-4 text-sm text-gray-600">
                <span>조회 {post.views}</span>
                <span>추천 {post.likes}</span>
                <span>댓글 {post.comments}</span>
              </div>
            </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
