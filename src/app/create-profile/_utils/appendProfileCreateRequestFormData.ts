import { ProfileCreateRequest } from "@/app/profile/_types/ProfileCreateRequest"


/**
 * @Description 프로필 생성에서 입력받은 값들을 formData로 변환하는 함수
 * @author 김영서
 **/
export default function appendProfileCreateRequestFormData (data: ProfileCreateRequest): FormData {
    const formData = new FormData();

    formData.append("male", data.male.toString());
    formData.append("traveler", data.traveler.toString());
    formData.append("residenceYear", data.residenceYear.toString());
    formData.append("interests", data.interests.toString());
    formData.append("expertises", data.expertises.toString());
    if (data.photo) {
      formData.append("photo", data.photo);
    }
    formData.append("residenceCountryCode", data.residenceCityCode);
    formData.append("residenceStateCode", data.residenceStateCode);
    formData.append("residenceCityCode", data.residenceCityCode);
    formData.append("birth", data.birth);
    formData.append("introduction", data.introduction);
    formData.append("nickname", data.nickname);

    return formData
}
