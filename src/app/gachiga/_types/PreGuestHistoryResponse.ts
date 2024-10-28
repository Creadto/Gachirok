import { PreGuestResponse } from "./PreGuestResponse";

export interface PreGuestHistoryResponse {
    
   question: string;
   preGuests: PreGuestResponse[];
}