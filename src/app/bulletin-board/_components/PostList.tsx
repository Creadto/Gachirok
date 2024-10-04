interface Post {
  id: number;
  category: string;
  title: string;
  author: string;
  date: string;
  views: number;
  likes: number;
  comments: number;
  trending: boolean;
}

const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="w-full px-4 py-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border rounded-lg p-4 hover:bg-gray-100 transition"
          >
            <div className="flex justify-start items-center flex-row gap-x-2">
              <span className="text-sm text-black border border-solid bg-slate-300">
                {post.category}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
