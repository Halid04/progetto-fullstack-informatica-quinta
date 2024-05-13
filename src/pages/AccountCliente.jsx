import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  Pencil,
  Contact,
  CalendarDays,
  Eye,
  Phone,
  EyeOff,
} from "lucide-react";

function AccountCliente() {
  const [utenteID, setUtenteID] = useState(localStorage.getItem("userId"));
  const [utenteClienteData, setUtenteClienteData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [hiddePassword, setHiddePassword] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getUtenteClienteData();
  }, []);

  const getUtenteClienteData = () => {
    fetch(
      `http://localhost/progetto-fullstack-informatica-quinta/accountCliente.php?utenteID=${utenteID}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUtenteClienteData(data);
      })
      .catch((error) =>
        console.error("Errore durante il recupero deli dati", error)
      );
  };

  const handleDataDiNacitaUtenteInput = () => {
    document.getElementById("dataDiNascitaUtenteInput").showPicker();
  };

  const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById("passwordUtenteInput");
    const newPasswordType = hiddePassword ? "text" : "password";
    passwordInput.setAttribute("type", newPasswordType);
    setHiddePassword(!hiddePassword);
  };

  const salvaModifiche = (event) => {
    event.preventDefault();
    // Recupera i nuovi valori dei campi
    const nome = document.getElementById("nomeUtenteInput").value;
    const cognome = document.getElementById("cognomeUtenteInput").value;
    const dataDiNascita = document.getElementById(
      "dataDiNascitaUtenteInput"
    ).value;
    const telefono = document.getElementById("telefonoUtenteInput").value;
    const password = document.getElementById("passwordUtenteInput").value;

    // Crea il corpo della richiesta POST
    const formData = {
      utenteID: utenteID,
      nome: nome,
      cognome: cognome,
      dataDiNascita: dataDiNascita,
      telefono: telefono,
      password: password,
    };

    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    console.log(formData);
    toast.loading("Prenotazione in corso...", { duration: 2000 });

    setTimeout(() => {
      fetch(
        `http://localhost/progetto-fullstack-informatica-quinta/accountCliente.php?utenteID=${utenteID}`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(formData),
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            toast.success("Dati aggiornati con successo");
          } else {
            toast.error(
              "Errore durante l'aggiornamento dei dati, controlla i campi e riprova."
            );
          }
          console.log("Dati aggiornati con successo:", data);
          setIsEditing(false);
          setUtenteClienteData(data);
        })
        .catch((error) =>
          console.error("Errore durante l'aggiornamento dei dati:", error)
        );
    }, 2000);
  };

  return (
    <div className="h-full w-full py-8 flex flex-col justify-start items-start">
      <div className="h-[3rem] px-5 w-full flex gap-3 justify-start items-baseline">
        <h1 className="text-[#0B76B7] text-2xl font-bold">Dati personali</h1>
        <span title="Modifica i dati" onClick={() => setIsEditing(true)}>
          <Pencil color="#0B76B7" className="cursor-pointer" />
        </span>
      </div>
      {utenteClienteData && (
        <form
          onSubmit={salvaModifiche}
          className="w-full flex flex-col justify-start items-start px-5 gap-5"
        >
          <div className="w-full flex justify-start items-center flex-wrap gap-7">
            <div className="flex flex-col justify-center items-start">
              <label
                className="text-[#808080] text-md"
                htmlFor="nomeUtenteInput"
              >
                Nome
              </label>
              <div className="flex mt-2 justify-center items-center border-[1.5px] border-[#0B76B7] outline-none rounded-md px-1 py-1">
                <input
                  type="text"
                  required
                  id="nomeUtenteInput"
                  name="nomeUtenteInput"
                  className="bg-transparent outline-none border-none w-[9rem]"
                  placeholder="Nome"
                  defaultValue={utenteClienteData.nome}
                  readOnly={!isEditing}
                />
                <Contact color="#0B76B7" className="cursor-pointer" />
              </div>
            </div>

            <div className="flex flex-col justify-center items-start">
              <label
                className="text-[#808080] text-md"
                htmlFor="cognomeUtenteInput"
              >
                Cognome
              </label>
              <div className="flex mt-2 justify-center items-center border-[1.5px] border-[#0B76B7] outline-none rounded-md px-1 py-1">
                <input
                  type="text"
                  required
                  id="cognomeUtenteInput"
                  name="cognomeUtenteInput"
                  className="bg-transparent outline-none border-none w-[9rem]"
                  placeholder="Cognome"
                  defaultValue={utenteClienteData.cognome}
                  readOnly={!isEditing}
                />
                <Contact color="#0B76B7" className="cursor-pointer" />
              </div>
            </div>

            <div className="flex flex-col justify-center items-start">
              <label
                className="text-[#808080] text-md"
                htmlFor="dataDiNascitaUtenteInput"
              >
                Data di nascita
              </label>
              <div className="flex w-[11rem] justify-between items-center border-[1.5px] border-[#0B76B7] outline-none rounded-md px-1 py-1">
                <input
                  type="date"
                  required
                  id="dataDiNascitaUtenteInput"
                  name="dataDiNascitaUtenteInput"
                  className=" bg-transparent border-none outline-none"
                  defaultValue={utenteClienteData.dataDiNascita}
                  readOnly={!isEditing}
                ></input>
                <CalendarDays
                  color="#0B76B7"
                  className="cursor-pointer"
                  onClick={handleDataDiNacitaUtenteInput}
                />
              </div>
            </div>

            <div className="flex flex-col justify-center items-start">
              <label
                className="text-[#808080] text-md"
                htmlFor="telefonoUtenteInput"
              >
                Telefono
              </label>
              <div className="flex mt-2 justify-center items-center border-[1.5px] border-[#0B76B7] outline-none rounded-md px-1 py-1">
                <input
                  type="phone"
                  required
                  id="telefonoUtenteInput"
                  name="telefonoUtenteInput"
                  className="bg-transparent outline-none border-none w-[9rem]"
                  placeholder="Telefono"
                  defaultValue={utenteClienteData.telefono}
                  readOnly={!isEditing}
                />
                <Phone
                  color="#0B76B7"
                  className="cursor-pointer"
                  height={"1.4rem"}
                />
              </div>
            </div>

            <div className="flex flex-col justify-center items-start">
              <label
                className="text-[#808080] text-md"
                htmlFor="passwordUtenteInput"
              >
                Password
              </label>
              <div className="flex mt-2 justify-center items-center border-[1.5px] border-[#0B76B7] outline-none rounded-md px-1 py-1">
                <input
                  type="password"
                  required
                  id="passwordUtenteInput"
                  name="passwordUtenteInput"
                  className="bg-transparent outline-none border-none w-[9rem]"
                  placeholder="password"
                  defaultValue={utenteClienteData.password}
                  readOnly={!isEditing}
                />
                {hiddePassword ? (
                  <Eye color="#0B76B7" onClick={togglePasswordVisibility} />
                ) : (
                  <EyeOff color="#0B76B7" onClick={togglePasswordVisibility} />
                )}
              </div>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
          </div>
          {isEditing && (
            <div className="w-full flex justify-start items-center gap-5">
              <button
                type="submit"
                className="bg-[#0B76B7] border-[1.5px] px-5 py-1 rounded-md text-white hover:scale-90 active:scale-105 transition-transform duration-300 ease-in-out"
              >
                Salva modifiche
              </button>

              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-trasparent border-[1.5px] border-[#0B76B7] px-5 py-1 rounded-md text-[#0B76B7] hover:scale-90 active:scale-105 transition-transform duration-300 ease-in-out"
              >
                Annulla
              </button>
            </div>
          )}
        </form>
      )}
      <div className="h-[3rem] px-5 mt-10 w-full flex gap-3 justify-start items-baseline">
        <h1 className="text-[#0B76B7] text-2xl font-bold">Prenotazioni</h1>
      </div>
      <div className=" px-5 w-full flex gap-3 justify-start items-baseline">
        <p>
          Per vedere tutte le informazioni sulle tue prenotazioni{" "}
          <span
            onClick={() => navigate("/prenotazioni")}
            className="font-bold text-[#0B76B7] cursor-pointer"
          >
            clicca qui
          </span>
        </p>
      </div>
      <div className="h-[2rem] px-5 mt-10 w-full flex gap-3 justify-start items-baseline">
        <h1 className="text-[#0B76B7] text-2xl font-bold">
          Dati ospiti salvati in prenotazioni{" "}
        </h1>
      </div>
      {utenteClienteData &&
        utenteClienteData.ospiti &&
        utenteClienteData.ospiti.length > 0 &&
        utenteClienteData.ospiti.map((ospite, index) => {
          return (
            <div
              key={index}
              className="w-full flex flex-col justify-start items-start px-5 gap-5"
            >
              <div className="w-full flex justify-start items-center gap-7 mt-5 flex-wrap">
                <div className="flex flex-col justify-center items-start">
                  <label
                    className="text-[#808080] text-md"
                    htmlFor="nomeUtenteInput"
                  >
                    Nome
                  </label>
                  <div className="flex mt-2 justify-center items-center border-[1.5px] border-[#0B76B7] outline-none rounded-md px-1 py-1">
                    <input
                      type="text"
                      required
                      id="nomeOspiteInput"
                      name="nomeOspiteInput"
                      className="bg-transparent outline-none border-none w-[9rem]"
                      placeholder="Nome"
                      defaultValue={ospite.nomeOspite}
                      readOnly
                    />
                    <Contact color="#0B76B7" className="cursor-pointer" />
                  </div>
                </div>

                <div className="flex flex-col justify-center items-start">
                  <label
                    className="text-[#808080] text-md"
                    htmlFor="cognomeUtenteInput"
                  >
                    Cognome
                  </label>
                  <div className="flex mt-2 justify-center items-center border-[1.5px] border-[#0B76B7] outline-none rounded-md px-1 py-1">
                    <input
                      type="text"
                      required
                      id="cognomeOspiteInput"
                      name="cognomeOspiteInput"
                      className="bg-transparent outline-none border-none w-[9rem]"
                      placeholder="Cognome"
                      defaultValue={ospite.cognomeOspite}
                      readOnly
                    />
                    <Contact color="#0B76B7" className="cursor-pointer" />
                  </div>
                </div>

                <div className="flex flex-col justify-center items-start">
                  <label
                    className="text-[#808080] text-md"
                    htmlFor="dataDiNascitaOspiteInput"
                  >
                    Data di nascita
                  </label>
                  <div className="flex w-[11rem] justify-between items-center border-[1.5px] border-[#0B76B7] outline-none rounded-md px-1 py-1">
                    <input
                      type="date"
                      required
                      id="dataDiNascitaOspiteInput"
                      name="dataDiNascitaOspiteInput"
                      className=" bg-transparent border-none outline-none"
                      defaultValue={ospite.dataNascitaOspite}
                      readOnly
                    ></input>
                    <CalendarDays color="#0B76B7" className="cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      {utenteClienteData &&
        utenteClienteData.ospiti &&
        utenteClienteData.ospiti.length === 0 && (
          <div className="px-5 w-full flex gap-3 justify-start items-baseline">
            <p>
              Non ci sono ospiti salvati in prenotazioni. Per aggiungere un
              ospite.
            </p>
          </div>
        )}
    </div>
  );
}

export default AccountCliente;
