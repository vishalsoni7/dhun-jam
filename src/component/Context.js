import { createContext, useEffect, useState } from "react";
import { fetchUserDetails } from "../component/utils";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [data, setData] = useState({});

  useEffect(() => {
    if (user?.data && user?.data?.id) {
      fetchUserDetails(user?.data?.id, user?.data?.token, setData);
    }
  }, [user?.data]);

  const values = { user, setUser, data, setData, fetchUserDetails };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
