import { MeetingCreateRequest } from "../_types/MeetingCreateRequest";


/**
 * @Description  소모임 생성에서 입력받은 값들을 formData로 변환하는 함수
 * @author 김영서
 **/
export default function appendMeetingCreateRequestFromData (data: MeetingCreateRequest): FormData {
    const formData = new FormData();

    formData.append("approval", data.approval.toString());
    formData.append("costly", data.costly.toString())
    formData.append("maxMember", data.maxMember.toString());
    formData.append("startAge", data.startAge.toString());
    formData.append("endAge", data.endAge.toString());

    formData.append("title", data.title);
    formData.append("countryCode", data.countryCode);
    formData.append("countryFlagEmoji", data.countryFlagEmoji)
    formData.append("stateCode", data.stateCode);
    formData.append("cityCode", data.cityCode);
    formData.append("location", data.location);
    formData.append("question", data.question);
    formData.append("introduction", data.introduction);
    formData.append("information", data.information);
    formData.append("cost", data.cost)
    formData.append("meetingDate", data.meetingDate)
    formData.append("meetingStartTime", data.meetingStartTime)
    formData.append("meetingEndTime", data.meetingEndTime)
    formData.append("sexType", data.sexType)
    formData.append("hostType", data.hostType)
    formData.append("meetingType", data.meetingType)

    formData.append("content", data.content.toString())
    formData.append("hostTip", data.hostTip.toString())
    formData.append("rental", data.rental.toString())
    formData.append("material", data.material.toString())
    formData.append("snack", data.snack.toString())
    formData.append("admission", data.admission.toString())
    formData.append("entry", data.entry.toString())
    formData.append("customCostDescription", data.customCostDescription)


    formData.append("interests", data.interests.toString());

  if (data.photos && data.photos.length > 0) {
    for (let i = 0; i < data.photos.length; i++) {
      formData.append("photos", data.photos[i]);  // 여러 파일 추가
    }
  }
  console.log("sex", data.photos)

    formData.append("coin", data.coin.toString())
    formData.append("packageItem",data.packageItem);

    return formData
}
