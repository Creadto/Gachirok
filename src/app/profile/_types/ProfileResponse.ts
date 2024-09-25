import { PurchaseProfileResponse } from "./PurchaseProfileResponse";

export interface ProfileResponse{
    male: boolean;
    traveler: boolean;
    age: number;
    residenceYear: number;
    hostValue: number;
    guestValue: number;
    knowledgeValue: number;
    profilePhotoUrl: string;
    nickname: string;
    residenceCountryCode: string;
    residenceStateCode: string;
    residenceCityCode: string;
    introduction: string;
    birth: string;
    interests: string[];
    expertises: string[];
    purchaseProfile: PurchaseProfileResponse;
}