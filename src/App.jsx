import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <div className="h-[100dvh] w-full bg-white flex flex-col justify-between items-center">
        <Header />
        <div className="h-full w-full">
          <Routes>
            {/* <Route path="*" element={<NotFoundPage />} /> */}

            <Route index element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/registration" element={<Registration />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
