
import { User } from "../store/user-store";
import { UserResponse } from "../types/UserResponse";

//User에 userResponse데이터 넣기
export function mapUserResponse(data: UserResponse) : User{
    return {
        userId: data.userId,
        platform: data.platform,
        email: data.email,
        referralCode: data.referralCode,
        profile: data.profile

    }
}