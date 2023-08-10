import { Routes, Route } from "react-router-dom";

import { HomePage, MyProfilePage } from "../pages/home/index";

export default function HomeRoute() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/my-profile" element={<MyProfilePage />} />
    </Routes>
  );
};