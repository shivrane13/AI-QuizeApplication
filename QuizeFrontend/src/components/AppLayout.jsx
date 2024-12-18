import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import { useQuizeContext } from "../context/QuizeContext";

function AppLayout() {
  const { questions } = useQuizeContext();

  return (
    <>
      <Header />
      <div className="app">
        <main className="main">{<Outlet />}</main>
      </div>
    </>
  );
}

export default AppLayout;
