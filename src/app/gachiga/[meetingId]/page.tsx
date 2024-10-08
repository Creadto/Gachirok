interface MeetingDetailsPageProps {
  params: {
    meetingId: number
  }
}
const MeetingDetailsPage = ({params} : MeetingDetailsPageProps) => {
  const {meetingId} = params;
  return (<div>Meeting Details of Id: {meetingId}</div>)
}

export default MeetingDetailsPage