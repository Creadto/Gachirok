export interface Post {
    id: number;
    category: string;
    title: string;
    author: string;
    date: string;
    views: number;
    likes: number;
    comments: number;
    trending: boolean;
    dislikes: number;
    content: string;
    imageUrl: string;
  }

  export const categoryMap: { [key: string]: string } = {
    "전체": "all",
    "일상토크": "dailyTalk",
    "정보공유": "infoShare",
    "질문답변": "qAndA",
    "자유토론": "freeDebate",
    "고민상담": "advice",
  };

  export interface PostResponse {
    postId: number,
    category: number,
    title: string,
    content: string,
    thumbnailPhotoUrl: string,
    createdAt: string,
    modifiedAt: string,
    likeCount: number,
    commentCount: number,
    author: {
      userId: number,
      nickname: string,
      profilePhotoUrl: string,
      traveler: boolean
    },


  }