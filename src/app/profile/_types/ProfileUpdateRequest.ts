export interface ProfileUpdateRequest{
  //UI에서 변경된 값을 바탕으로 사용자 정보를 수정했을 때 필요한 type
    traveler: boolean,
    residenceYear: number
    nickname: string,
    residenceCountryCode: string,
    residenceStateCode: string,
    residenceCityCode: string,
    introduction: string,
    photo: File,
    interests: string[],
    expertises: string[]
    
  }