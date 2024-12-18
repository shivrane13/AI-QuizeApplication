import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { getLogedInUserData } from "../service/UserApiCall";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(function () {
    setLoading(true);
    async function getUserData() {
      try {
        const res = await getLogedInUserData();
        setUser(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, history, setHistory }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Used outside the context");
  }
  return context;
}
