import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import AccountCliente from "./pages/AccountCliente";
import AccountAdmin from "./pages/AccountAdmin";
import Camere from "./pages/Camere";
import Prenotazioni from "./pages/Prenotazioni";
import PrenotazioneCamera from "./pages/PrenotazioneCamera";
import NotLogged from "./pages/NotLogged";
import Header from "./components/Header";
import "./App.css";

function App() {
  // localStorage.clear();
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
            <Route exact path="/account-cliente" element={<AccountCliente />} />
            <Route exact path="/account-admin" element={<AccountAdmin />} />
            <Route exact path="/camere" element={<Camere />} />
            <Route exact path="/not-logged" element={<NotLogged />} />
            <Route
              exact
              path="/prenotazione-camera/:numeroCamera"
              element={<PrenotazioneCamera />}
            />
            <Route exact path="/prenotazioni" element={<Prenotazioni />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
