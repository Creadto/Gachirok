import { ProfileUI } from "../../_types/ProfileUI";
import { ProfileUpdateRequest } from "../../_types/ProfileUpdateRequest";

/**
 * @Description 프로필 생성에서 입력받은 값들을 formData로 변환하는 함수
 * @author 김영서
 **/
export default function appendProfileUpdateRequestFormData(
  profileUI: ProfileUI,
  updateProfile: ProfileUpdateRequest | null
): FormData {
  const formData = new FormData();

  formData.append("traveler", String(profileUI?.traveler));
  formData.append("residenceYear", String(profileUI?.residenceYear));
  formData.append("nickname", profileUI?.nickname || "");
  formData.append(
    "residenceCountryCode",
    profileUI?.residenceCountryCode || ""
  );
  formData.append("residenceStateCode", profileUI?.residenceStateCode || "");
  formData.append("residenceCityCode", profileUI?.residenceCityCode || "");
  formData.append("introduction", profileUI?.introduction || "");

  profileUI?.interests.forEach((interest) =>
    formData.append("interests", interest)
  );
  profileUI?.expertises.forEach((expertise) =>
    formData.append("expertises", expertise)
  );

  //ProfileUI에는 File type존재하지 않기 때문에 updateProfile에 append
  if (updateProfile?.photo) {
    formData.append("photo", updateProfile?.photo);
  }

  return formData;
}
