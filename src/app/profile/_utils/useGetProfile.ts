import { ProfileResponse } from "../_types/ProfileResponse";



export async function getProfileData(accessToken: string): Promise<ProfileResponse> {
  const res = await fetch("/api/profiles", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile data");
  }

  const profileData = await res.json();
  return profileData;
}

