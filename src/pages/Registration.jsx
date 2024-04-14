import React, { useState } from "react";
import { Link } from "react-router-dom";
import homePageBgImage from "../assets/homePageBgImage.jpg";
import wave from "../assets/wave.png";
import { Contact, Eye, EyeOff, CalendarDays, Phone } from "lucide-react";

function Registration() {
  const [hiddePassword, setHiddePassword] = useState(true);

  const togglePasswordVisibility = () => {
    setHiddePassword(!hiddePassword);

    if (!hiddePassword) {
      document.getElementById("userPasswordInput").setAttribute("type", "text");
    } else {
      document
        .getElementById("userPasswordInput")
        .setAttribute("type", "password");
    }
  };

  const handleDateInput = () => {
    document.getElementById("userBirthdateInput").showPicker();
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), url(${homePageBgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
      className="h-full text-white flex justify-start items-center gap-2 px-1 md:px-0"
    >
      <div
        style={{
          backgroundImage: `url(${wave})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
        className="h-full w-full absolute top-0 left-0"
      ></div>

      <form
        action=""
        className="z-[20] h-full w-[60%] flex flex-col justify-center items-center gap-5 md:gap-0 ml-5 md:ml-14"
      >
        <div className="w-full h-1/2 md:h-1/4 flex flex-col items-start justify-center gap-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Crea un nuovo account<span className="text-[#0B76B7]">.</span>
          </h1>
          <h2 className="text-xs md:text-sm">
            Sei già registrato?{" "}
            <span className="italic text-[#0074CC] cursor-pointer">
              <Link to="/login">Accedi</Link>
            </span>
          </h2>
        </div>
        <div className="w-full h-1/2 md:h-[60%] flex flex-col items-start justify-center gap-5">
          <div className="w-[60%] flex-wrap flex items-center justify-between gap-4">
            <div className="md:w-[12.9rem] flex items-center justify-between bg-[#010E22] px-2 py-2 rounded-md">
              <div className="flex flex-col items-start justify-center ">
                <label
                  htmlFor="userNameInput"
                  className="text-[#7E8794] text-xs"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="userNameInput"
                  placeholder="Inserire nome utente"
                  className="text-sm bg-transparent border-none outline-none text-white font-bold"
                ></input>
              </div>
              <div className="flex items-center justify-center">
                <Contact color="#7e8794" />
              </div>
            </div>

            <div className="md:w-[12.9rem] flex items-center justify-between bg-[#010E22] px-2 py-2 rounded-md">
              <div className="flex flex-col items-start justify-center ">
                <label
                  htmlFor="userSurnameInput"
                  className="text-[#7E8794] text-xs"
                >
                  Cognome
                </label>
                <input
                  type="text"
                  id="userSurnameInput"
                  placeholder="Inserire cognome utente"
                  className="text-sm bg-transparent border-none outline-none text-white font-bold"
                ></input>
              </div>
              <div className="flex items-center justify-center">
                <Contact color="#7e8794" />
              </div>
            </div>
          </div>

          <div className="w-[60%] flex-wrap flex items-center justify-between gap-4">
            <div className="md:w-[12.9rem] flex items-center justify-between bg-[#010E22] px-2 py-2 rounded-md">
              <div className="flex flex-col items-start justify-center ">
                <label
                  htmlFor="userBirthdateInput"
                  className="text-[#7E8794] text-xs"
                >
                  Data di nascita
                </label>
                <input
                  type="date"
                  id="userBirthdateInput"
                  placeholder="Inserire data di nascita"
                  className="text-sm bg-transparent border-none outline-none text-white font-bold"
                ></input>
              </div>
              <div className="flex items-center justify-center cursor-pointer">
                <CalendarDays color="#7e8794" onClick={handleDateInput} />
              </div>
            </div>

            <div className="md:w-[12.9rem] flex items-center justify-between bg-[#010E22] px-2 py-2 rounded-md">
              <div className="flex flex-col items-start justify-center ">
                <label
                  htmlFor="userPhoneNumberInput"
                  className="text-[#7E8794] text-xs"
                >
                  Telefono
                </label>
                <input
                  type="tel"
                  id="userPhoneNumberInput"
                  placeholder="Numero di telefono"
                  className="text-sm bg-transparent border-none outline-none text-white font-bold"
                ></input>
              </div>
              <div className="flex items-center justify-center">
                <Phone color="#7e8794" />
              </div>
            </div>
          </div>

          <div className="w-[60%] flex-wrap flex items-center justify-start">
            <div className="w-[100vw] flex items-center justify-between bg-[#010E22] px-2 py-2 rounded-md">
              <div className="flex flex-col items-start justify-center ">
                <label
                  htmlFor="userPasswordInput"
                  className="text-[#7E8794] text-xs"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="userPasswordInput"
                  placeholder="Inserire password"
                  className="text-sm bg-transparent border-none outline-none text-white font-bold"
                ></input>
              </div>
              <div className=" flex items-center justify-center cursor-pointer">
                {hiddePassword ? (
                  <EyeOff color="#7e8794" onClick={togglePasswordVisibility} />
                ) : (
                  <Eye color="#7e8794" onClick={togglePasswordVisibility} />
                )}
              </div>
            </div>
          </div>
          <div className="w-full md:w-[60%] flex items-center justify-between gap-3 md:gap-1">
            <button
              type="submit"
              className="w-[12.9rem] bg-[#0074CC] border-2 border-[#0074CC] px-2 py-2 rounded-full font-bold text-white hover:scale-90 active:scale-105 transition-transform duration-300 ease-in-out"
            >
              Registrati
            </button>
            <button
              type="button"
              className="w-[12.9rem] bg-[#010E22] border-2 border-[#0074CC] px-2 py-2 rounded-full font-bold text-white hover:scale-90 active:scale-105 transition-transform duration-300 ease-in-out"
            >
              Annulla
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Registration;
