import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./@pages/Login";
import Home from "./@components/Home/Home";
import Register from "./@pages/Register";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
