import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Panel from "./pages/Panel";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/panel" element={<Panel />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
