import { Routes, Route } from "react-router-dom";

import LoginPage from '../pages/auth/LoginPage';

export default function AuthRoute() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/register" element={< />} /> */}
    </Routes>
  );
};