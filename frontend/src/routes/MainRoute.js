import { Routes, Route } from "react-router-dom";
import HomeRoute from './HomeRoute';
import AuthRoute from './AuthRoute';

export default function MainRoute() {
  return (
    <Routes>
      <Route
        path="/*"
        element={<HomeRoute />}
      />
      <Route
        path="/auth/*"
        element={<AuthRoute />}
      />
    </Routes>
  );
};