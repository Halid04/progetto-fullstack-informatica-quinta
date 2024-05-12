import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import homePageBgImage from "../assets/homePageBgImage.jpg";
import wave from "../assets/wave.png";
import { Contact, Eye, EyeOff } from "lucide-react";

function Login() {
  const [hiddePassword, setHiddePassword] = useState(true);
  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById("userPasswordInput");
    const newPasswordType = hiddePassword ? "text" : "password";
    passwordInput.setAttribute("type", newPasswordType);
    setHiddePassword(!hiddePassword);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (userName === "" || userSurname === "" || userPassword === "") {
      alert("Tutti i campi sono obbligatori, per favore riempili tutti.");
    } else {
      let url =
        "http://localhost/progetto-fullstack-informatica-quinta/login.php";
      let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      let data = {
        userName: userName,
        userSurname: userSurname,
        userPassword: userPassword,
      };

      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data.login) {
            localStorage.setItem("userId", data.id);
            localStorage.setItem("userName", data.nome);
            localStorage.setItem("userSurname", data.cognome);
            if (data.admin) {
              localStorage.setItem("isAdmin", data.admin);
            }
            localStorage.setItem("isLogged", data.login);

            setTimeout(() => {
              navigate("/account");
              window.location.reload();
            }, 500);
          }

          setLoginStatus(data.login);
          setLoginMessage(data.message);
        })
        .catch((error) => {
          console.log(error);
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

      <form
        method="POST"
        action=""
        className="z-[20] h-full w-[60%] md:h-[80%] xl:w-[45%] flex flex-col justify-center items-center ml-5 md:ml-14"
      >
        <div className="w-full h-1/4 flex flex-col items-start justify-center gap-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Accedi al tuo account<span className="text-[#0B76B7]">.</span>
          </h1>
          <h2 className="text-xs md:text-sm">
            Non sei ancora registrato?{" "}
            <span className="italic text-[#0074CC] cursor-pointer">
              <Link to="/registration">Registrati</Link>
            </span>
          </h2>
          {loginMessage !== "" && !loginStatus ? (
            <p className="text-xs text-red-500 md:text-sm font-bold">
              {" "}
              {loginMessage}{" "}
            </p>
          ) : (
            <p className="text-xs text-green-500 md:text-sm font-bold">
              {" "}
              {loginMessage}{" "}
            </p>
          )}
        </div>
        <div className="w-full h-[60%] flex flex-col items-start justify-center gap-5">
          <div className="w-[60%] flex-wrap lg:w-[65%] xl:w-[75%] 2xl:w-[65%] xl:flex-nowrap flex items-center justify-between gap-4">
            <div className="md:w-[12.9rem] 2xl:w-1/2 flex items-center justify-between bg-[#010E22] px-2 py-2 rounded-md">
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

            <div className="md:w-[12.9rem] 2xl:w-1/2 flex items-center justify-between bg-[#010E22] px-2 py-2 rounded-md">
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
          <div className="w-[60%] lg:w-[65%] xl:w-[75%] 2xl:w-[65%] flex-wrap md:flex-nowrap flex items-center justify-start">
            <div className="w-[12.9rem] lg:w-[100vw] flex items-center justify-between bg-[#010E22] px-2 py-2 rounded-md">
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
                  <EyeOff color="#7e8794" onClick={togglePasswordVisibility} />
                )}
              </div>
            </div>
          </div>
          <div className="w-[60%] flex-wrap lg:w-[65%] xl:w-[75%] 2xl:w-[65%]  xl:flex-nowrap flex items-center justify-between gap-4">
            <button
              type="submit"
              className="w-[12.9rem] 2xl:w-1/2 bg-[#0074CC] border-2 border-[#0074CC] px-2 py-2 rounded-full font-bold text-white hover:scale-90 active:scale-105 transition-transform duration-300 ease-in-out"
              onClick={(e) => handleLoginSubmit(e)}
            >
              Accedi
            </button>
            <button
              type="button"
              className="w-[12.9rem] 2xl:w-1/2 bg-[#010E22] border-2 border-[#0074CC] px-2 py-2 rounded-full font-bold text-white hover:scale-90 active:scale-105 transition-transform duration-300 ease-in-out"
              onClick={() => navigate("/")}
            >
              Annulla
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
