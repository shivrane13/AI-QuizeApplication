import { useEffect } from "react";
import { getLogedInUser } from "../service/UserApiCall";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  useEffect(function () {
    async function getUser() {
      const res = await getLogedInUser();
      if (!res.isAuth) {
        navigate("/login");
      }
    }
    getUser();
  }, []);

  return children;
}

export default ProtectedRoute;
