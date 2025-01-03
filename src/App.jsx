import React from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Register from "./components/Register";
import EmailVerification from "./components/EmailVerification";
import Login from "./components/Login";
import PasswordReset from "./components/PasswordReset";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";

const App = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <Router>
      <div>
        <Toaster position="top-center" />
        <Routes>
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/forgot-password"
            element={token ? <Navigate to="/" /> : <ForgotPassword />}
          />
          <Route
            path="/reset-password/:uid/:token"
            element={token ? <Navigate to="/" /> : <PasswordReset />}
          />
          <Route
            path="/verify-email/:uid/:token"
            element={token ? <Navigate to="/" /> : <EmailVerification />}
          />
          <Route
            path="/"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
