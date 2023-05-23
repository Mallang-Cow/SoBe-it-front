import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./@pages/Login";
import Service from "./@pages/Service";
import Register from "./@pages/Register";
import FindId from "./@pages/FindId";
import FindPassword from "./@pages/FindPassword";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/find-id" element={<FindId />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/home" element={<Service />} />
      </Routes>
    </BrowserRouter>
  );
}
