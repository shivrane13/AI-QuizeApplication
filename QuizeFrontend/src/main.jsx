import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import QuizeContextProvider from "./context/QuizeContext";
import UserContextProvider from "./context/UserContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <QuizeContextProvider>
        <App />
      </QuizeContextProvider>
    </UserContextProvider>
  </StrictMode>
);
