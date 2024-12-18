import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Prompt from "./pages/Prompt";
import Quize from "./pages/Quize";
import History from "./pages/History";
import Profile from "./pages/Profile";
import AppLayout from "./components/AppLayout";
import LoginOrSignUp from "./pages/LoginOrSignUp";
import LoginForm from "./features/Authentication/Login";
import SignupForm from "./features/Authentication/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="prompt" />} />
          <Route path="prompt" element={<Prompt />} />
          <Route path="quize" element={<Quize />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route element={<LoginOrSignUp />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<SignupForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
