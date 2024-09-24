import { Profile } from "./Profile";

export interface UserResponse{
    userId: string,
    platform: string,
    email: string,
    referralCode: string,
    profile: Profile | null
}