export interface ReportCreateRequest {
  targetType: 'POST' | 'MEETING' | 'USER'; 
  targetId: number; 
  type: 'ADVERTISING' | 'PROFANITY' | 'SLANDER' | 'SPAMMING' | 'ETC'; // ADVERTISING, PROFANITY, SLANDER, SPAMMING, ETC
  content: string;
  photoUrls: string[] ; 
}
