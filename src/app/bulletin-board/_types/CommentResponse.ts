export interface CommentResponse {
  comments: SingleCommentResponse[];
  commentCount: number;
}

export interface SingleCommentResponse {
  commentId: number;
  content: string;
  author: {
    userId: number;
    nickname: string;
    profilePhotoUrl: string;
    traveler: boolean;
  };
  createdAt: string;
  modifiedAt: string;
  deleted: boolean;
  replies: ReplyResponse[];
}

export interface ReplyResponse {
  commentId: number;
  content: string;
  author: {
    userId: number;
    nickname: string;
    profilePhotoUrl: string;
    traveler: boolean;
  };
  createdAt: string;
  modifiedAt: string;
  deleted: boolean;
}
