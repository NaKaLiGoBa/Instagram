import React from "react";
import { HashRouter } from "react-router-dom";

import MainRoute from "./routes/MainRoute";

function App() {
  return (
    <HashRouter>
      <MainRoute />
    </HashRouter>
  );
};

export default App;
