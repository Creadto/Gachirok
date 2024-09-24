// export interface User{
//     deviceToken: string,
//     countryCode: string,
//     noticeMarketing: boolean,
//     userId: string,
//     platform: string,
//     email: string,
//     referralCode: string,
//     purchaseProfile: PurchaseProfile
// }

import { Profile } from "./Profile";

// export interface PurchaseProfile {

// }

// export interface PurchaseItem {

// }



export interface User{
    userId: string,
    platform: string,
    email: string,
    referralCode: string,
    profile: Profile | null
}


























