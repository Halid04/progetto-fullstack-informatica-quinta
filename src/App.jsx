import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Account from "./pages/Account";
import Camere from "./pages/Camere";
import Header from "./components/Header";
import "./App.css";

function App() {
  // localStorage.setItem("isLogged", false);

  return (
    <HashRouter>
      <div className="h-[100vh] w-full bg-white flex flex-col justify-between items-center">
        <Header />
        <div className="h-full w-full">
          <Routes>
            {/* <Route path="*" element={<NotFoundPage />} /> */}

            <Route index element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/registration" element={<Registration />} />
            <Route exact path="/account" element={<Account />} />
            <Route exact path="/camere" element={<Camere />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
