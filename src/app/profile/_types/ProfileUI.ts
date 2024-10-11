export interface ProfileUI{
    //서버에서 받아온 사용자 정보를 정보 수정하기의 화면에 필요한 Type
    //서버에 수정하기 요청을 보내는 type과는 다름 (photo)
    traveler: boolean,
    residenceYear: number
    nickname: string,
    residenceCountryCode: string,
    residenceStateCode: string,
    residenceCityCode: string,
    introduction: string,
    photo: string,
    interests: string[],
    expertises: string[]
    
  }