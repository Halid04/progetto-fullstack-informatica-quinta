import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import homePageBgImage from "../assets/homePageBgImage.jpg";
import wave from "../assets/wave.png";
import { Contact, Eye, EyeOff, CalendarDays, Phone } from "lucide-react";

function Registration() {
  const [hiddePassword, setHiddePassword] = useState(true);
  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [userBirthdate, setUserBirthdate] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();
  const [registrationDone, setRegistrationDone] = useState(false);

  const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById("userPasswordInput");
    const newPasswordType = hiddePassword ? "text" : "password";
    passwordInput.setAttribute("type", newPasswordType);
    setHiddePassword(!hiddePassword);
  };

  const handleDateInput = () => {
    document.getElementById("userBirthdateInput").showPicker();
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();

    if (
      userName === "" ||
      userSurname === "" ||
      userBirthdate === "" ||
      userPhoneNumber === "" ||
      userPassword === ""
    ) {
      alert("Tutti i campi sono obbligatori, per favore riempili tutti.");
    } else {
      let url =
        "http://localhost/progetto-fullstack-informatica-quinta/registration.php";
      let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      let data = {
        userName: userName,
        userSurname: userSurname,
        userBirthdate: userBirthdate,
        userPhoneNumber: userPhoneNumber,
        userPassword: userPassword,
      };

      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            setTimeout(() => {
              setRegistrationDone(true); // Imposta lo stato registrationDone su true
            }, 500);
          }
          return response.json();
        }) // Aggiungi il ritorno di chiamata then
        .then((data) => {
          // Gestisci i dati restituiti dal server
          console.log(data); // Mostra i dati restituiti dal server nella console
          // Aggiungi qui la logica per gestire la risposta dal server, ad esempio mostrare un messaggio all'utente
        })
        .catch((error) => {
          console.log(error);
          // Gestisci gli errori
        });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${homePageBgImage})`,
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

      {!registrationDone ? (
        <form
          method="POST"
          action=""
          className="z-[15] h-full w-[60%] flex flex-col justify-center items-center gap-5 md:gap-0 ml-5 md:ml-14"
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
                    required
                    id="userNameInput"
                    name="userNameInput"
                    placeholder="Inserire nome utente"
                    className="text-sm bg-transparent border-none outline-none text-white font-bold"
                    onChange={(e) => setUserName(e.target.value)}
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
                    required
                    id="userSurnameInput"
                    name="userSurnameInput"
                    placeholder="Inserire cognome utente"
                    className="text-sm bg-transparent border-none outline-none text-white font-bold"
                    onChange={(e) => setUserSurname(e.target.value)}
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
                    required
                    id="userBirthdateInput"
                    name="userBirthdateInput"
                    placeholder="Inserire data di nascita"
                    className="text-sm bg-transparent border-none outline-none text-white font-bold"
                    onChange={(e) => setUserBirthdate(e.target.value)}
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
                    required
                    id="userPhoneNumberInput"
                    name="userPhoneNumberInput"
                    placeholder="123-456-7890"
                    className="text-sm bg-transparent border-none outline-none text-white font-bold"
                    onChange={(e) => setUserPhoneNumber(e.target.value)}
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
                    required
                    id="userPasswordInput"
                    name="userPasswordInput"
                    placeholder="Inserire password"
                    className="text-sm bg-transparent border-none outline-none text-white font-bold"
                    onChange={(e) => setUserPassword(e.target.value)}
                  ></input>
                </div>
                <div className=" flex items-center justify-center cursor-pointer">
                  {hiddePassword ? (
                    <Eye color="#7e8794" onClick={togglePasswordVisibility} />
                  ) : (
                    <EyeOff
                      color="#7e8794"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="w-full md:w-[60%] flex items-center justify-between gap-3 md:gap-1">
              <button
                type="submit"
                className="w-[12.9rem] bg-[#0074CC] border-2 border-[#0074CC] px-2 py-2 rounded-full font-bold text-white hover:scale-90 active:scale-105 transition-transform duration-300 ease-in-out"
                onClick={(e) => handleRegistrationSubmit(e)}
              >
                Registrati
              </button>
              <button
                type="button"
                className="w-[12.9rem] bg-[#010E22] border-2 border-[#0074CC] px-2 py-2 rounded-full font-bold text-white hover:scale-90 active:scale-105 transition-transform duration-300 ease-in-out"
                onClick={() => navigate("/")}
              >
                Annulla
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="z-[15] flex flex-col justify-center items-center w-full h-full gap-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            Registrazione effettuata con successo
            <span className="text-[#0B76B7]">!</span>
          </h1>
          <p className="text-lg text-center md:text-xl text-[#F1F6FE]">
            Ora fai l'accesso con le tue nuove credenziali.
          </p>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="bg-[#0B76B7] px-5 py-1 rounded-md text-white hover:scale-90 active:scale-105 transition-transform duration-300 ease-in-out"
          >
            Accedi
          </button>
        </div>
      )}
    </div>
  );
}

export default Registration;
