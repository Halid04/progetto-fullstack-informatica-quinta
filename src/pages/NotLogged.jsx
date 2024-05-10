import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NotLogged() {
  const navigate = useNavigate();

  return (
    <div className="z-[15] flex flex-col justify-center items-center w-full h-full gap-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center">
        Accesso non effettuato
        <span className="text-[#0B76B7]">!</span>
      </h1>
      <p className="text-lg text-center md:text-xl text-[#808080]">
        Per poter prenotare una camera devi effettuare l'accesso al tuo account.
      </p>
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="bg-[#0B76B7] px-5 py-1 rounded-md text-white hover:scale-90 active:scale-105 transition-transform duration-300 ease-in-out"
      >
        Accedi
      </button>
    </div>
  );
}

export default NotLogged;
