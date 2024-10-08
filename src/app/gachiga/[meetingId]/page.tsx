interface MeetingDetailsPageProps {
  params: {
    meetingId: number
  }
}

/**
 * @Description 소모임의 상세 페이지
 * @author 김영서
 **/
const MeetingDetailsPage = ({params} : MeetingDetailsPageProps) => {
  const {meetingId} = params;
  return (<div>Meeting Details of Id: {meetingId}</div>)
}

export default MeetingDetailsPage