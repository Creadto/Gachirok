//user관련 response를 api를 통해 호출하는 custom hook

import axios from "axios";
import { useEffect, useState } from "react";
import { mapUserResponse } from "../mapper/user-mapper";
import useUserStore from "../store/user-store";

export const useFetchUserResponse = (session: any) => {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useUserStore();

  useEffect(() => {
    const fetchUserResponseData = async () => {
      if (session?.accessToken) {
        try {
          const response = await axios.get("/api/users", {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          });
         setUser(mapUserResponse(response.data));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    };

    fetchUserResponseData();
  }, [session, setUser]);

  return loading;
};