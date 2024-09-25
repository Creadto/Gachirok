"use client"
import ProfileModal from "@/core/components/ProfileCreateModal";
import useUserStore from "@/core/store/user-store";
import { useSession } from "next-auth/react";

export default function Page() {
  const {user} = useUserStore();
  const {data: session} = useSession();
  return(<>
    <div>Homepage</div>
    {(user.signedUpUser === true || session?.signedUpUser === true) && user.profile === null ?     <ProfileModal /> : <div></div> }

  </>)

}
