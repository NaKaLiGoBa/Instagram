import { Routes, Route } from "react-router-dom";

import { HomeRoute, AuthRoute } from './index';

export default function MainRoute() {
  return (
    <Routes>
      <Route path="/*" element={<HomeRoute />} />
      <Route path="/auth/*" element={<AuthRoute />} />
    </Routes>
  );
};