import { User } from "../store/user-store";
import { UserResponse } from "../types/UserResponse";

/**
 * @Description User에 userResponse데이터 넣기, UserResponse를 받으면 회원가입이 완료된 이후이기 때문에 signedUpUser은 true로 고정
 * @author 김영서
 **/
export function mapUserResponse(data: UserResponse): User {
  return {
    signedUpUser: true,
    userId: data.userId,
    platform: data.platform,
    email: data.email,
    referralCode: data.referralCode,
    profile: data.profile,
  };
}
