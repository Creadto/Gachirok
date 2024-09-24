//상단에 있는 topbar의 profileicon에 관련된 component
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useFetchUserResponse } from "../hooks/useGetUserResponse";
import useUserResponseStore from "../store/user-store";
import Link from "next/link";
import useUserStore from "../store/user-store";

const ProfileIcon = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { user } = useUserStore();
  const FetchUserResponseData = useFetchUserResponse(session);

  const handleOnClick = () => {
    router.replace("/signin");
  };


  return (
    <div>
      {!session?.user ? (
        <Link href="/?modal=sign-in" as="/sign-in">
        <button
          className="bg-black text-white rounded-full px-4 py-2 text-sm"
        >
          로그인/회원가입
        </button>
        </Link>
      ) : (
          <button onClick={() => router.push('/profile')} className="flex items-center bg-black text-white rounded-full px-2 py-2 text-sm">
            <img
              src={
                // FetchUserResponseData는 loading을 return값으로 받기 때문에 loading = true면 api 결과값을 받아오지 못하기 때문에  no-profile.png사용
                user === null || user.profile === null || FetchUserResponseData
                  ? "/images/no-profile.png"
                  : user.profile.profilePhotoUrl
              }
              alt="Profile Preview"
              className="object-cover w-8 h-8 border rounded-full"
            />
            <span className="my-auto ml-2">{session.user.name}</span>
          </button>
      )}
    </div>
  );
};

export default ProfileIcon;

// {
//   <img
//   src={
//     session?.accessToken && !FetchUserResponseData
//       ? userResponse === null || userResponse.profile === null
//         ? "/images/no-profile.png"
//         : userResponse?.profile.profilePhotoUrl
//       : "/images/no-profile.png"
//   }
//   alt="Profile Preview"
//   className="object-cover w-8 h-8 border rounded-full"
// />
// }
