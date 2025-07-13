import { use, useEffect, useState } from "react";
import { useAxiosSecure } from "./useAxiosSecure";
import { AuthContext } from "../Context/AuthContext";

export const useRoleSecure = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  const [userData, setUserData] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosSecure.get(`user?email=${user?.email}`);
        setUserData(data);
      } catch (error) {
        console.log(error)
      } finally {
        setUserLoading(false);
      }
    };
    fetchUser()
  }, [user]);

  return { userData, userLoading };
};
