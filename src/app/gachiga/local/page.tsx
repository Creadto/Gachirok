"use client"
import { useEffect, useState } from "react";
import { MeetingPreviewResponse } from "../_types/MeetingPreviewResponse";

const FilteredPage = () => {
  const [meetings, setMeetings] = useState<MeetingPreviewResponse[]>([]);
  

  useEffect(() => {
    const meetingsJSON = sessionStorage.getItem('meetings');
    if (meetingsJSON) {
      setMeetings(JSON.parse(meetingsJSON));
    }
  }, []);
  return (
    <div>
      {meetings.map((meeting) => (
        <div key={meeting.meetingId}>
          <h3>Meeting ID: {meeting.meetingId}</h3>
          <p>Max Members: {meeting.maxMember}</p>
        </div>
      ))}
    </div>
  );
};

export default FilteredPage;
