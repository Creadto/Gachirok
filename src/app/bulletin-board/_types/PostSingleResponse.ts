export interface PostSingleResponse {
 postId:  number;
 category: string;
 title: string;
 content: string;
 place?: {
  formattedAddress: string;
  detail: string;
  latitude: number;
  longtitude: number;
 }
 createdAt: string; //yyyy-MM-dd’T’HH:mm:ss
 modifiedAt: string;
 reactions: string[]
 likeCount: number;
 unlikeCount: number;
 commentCount: number;
 author: {
  userId: number;
  nickname: string;
  profilePhotoUrl: string;
  traveler: boolean
 }

}