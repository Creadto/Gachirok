import { Profile } from "../store/profile-store";


export interface UserResponse{
    userId: string,
    platform: string,
    email: string,
    referralCode: string,
    profile: Profile | null
}