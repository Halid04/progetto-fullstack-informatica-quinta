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
  Trash2,
  Check,
  UsersRound,
  BedDouble,
  CalendarCheck2,
  File,
  Plus,
} from "lucide-react";

function AccountAdmin() {
  const [utenteID, setUtenteID] = useState(localStorage.getItem("userId"));
  const [utenteClienteData, setUtenteClienteData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [hiddePassword, setHiddePassword] = useState(true);
  const [leMieCamereIsActive, setLeMieCamereIsActive] = useState(true);
  const [iMieiUtentiIsActive, setIMieiUtentiIsActive] = useState(false);
  const [dashboardIsActive, setDashboardIsActive] = useState(false);
  const [aggiungiCameraIsActive, setAggiungiCameraIsActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUtenteClienteData();
  }, []);

  const getUtenteClienteData = () => {
    fetch(
      `http://localhost/progetto-fullstack-informatica-quinta/accountAdmin.php?utenteID=${utenteID}`
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

  // Aggiungi questa funzione per inizializzare gli stati per ciascuna riga
  // useEffect(() => {
  //   const initialEditingStates =
  //     utenteClienteData &&
  //     utenteClienteData.camere &&
  //     utenteClienteData.camere.map(() => false);
  //   setEditingCameraRows(initialEditingStates);
  // }, [utenteClienteData.camere]);

  const handleLeMieCamereIsActive = () => {
    setLeMieCamereIsActive(true);
    setIMieiUtentiIsActive(false);
    setDashboardIsActive(false);
    setAggiungiCameraIsActive(false);

    const leMieCamereElement = document.getElementById("container");
    leMieCamereElement.style.transform = "translateX(0vw)";
  };

  const handleIMieiUtentiIsActive = (e) => {
    setLeMieCamereIsActive(false);
    setIMieiUtentiIsActive(true);
    setDashboardIsActive(false);
    setAggiungiCameraIsActive(false);

    // e.preventDefault();
    const iMieiUtentiElement = document.getElementById("container");
    iMieiUtentiElement.style.transform = "translateX(-100vw)";
  };

  const handleAggiungiCameraIsActive = () => {
    setLeMieCamereIsActive(false);
    setIMieiUtentiIsActive(false);
    setDashboardIsActive(false);
    setAggiungiCameraIsActive(true);

    const dashboardElement = document.getElementById("container");
    dashboardElement.style.transform = "translateX(-200vw)";
  };

  const handleDashboardIsActive = () => {
    setLeMieCamereIsActive(false);
    setIMieiUtentiIsActive(false);
    setDashboardIsActive(true);
    setAggiungiCameraIsActive(false);

    const dashboardElement = document.getElementById("container");
    dashboardElement.style.transform = "translateX(-300vw)";
  };

  // const handleHorizontalElementScroll = (e) => {
  //   e.preventDefault();
  //   const horizontal = document.getElementById("container"); // Sostituisci ".container" con il selettore appropriato per il tuo contenitore
  //   horizontal.scrollLeft += e.deltaY;
  // };

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
    toast.loading("Aggiornamento dei dati in corso...", { duration: 2000 });

    setTimeout(() => {
      fetch(
        `http://localhost/progetto-fullstack-informatica-quinta/accountAdmin.php?utenteID=${utenteID}&action=updateDatiUtente`,
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
            getUtenteClienteData();
          } else if (data.error) {
            toast.error(data.error);
            console.log("Errore durante l'aggiornamento dei dati:", data.error);
          }
          console.log("Dati aggiornati con successo:", data);
          setIsEditing(false);
        })
        .catch((error) =>
          console.error("Errore durante l'aggiornamento dei dati:", error)
        );
    }, 2000);
  };

  const deleteUtente = (index) => {
    const utenteRowID = index;

    // Crea il corpo della richiesta POST
    const formData = {
      utenteID: utenteRowID,
    };

    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    console.log(formData);
    toast.loading("Prenotazione in corso...", { duration: 2000 });

    setTimeout(() => {
      fetch(
        `http://localhost/progetto-fullstack-informatica-quinta/accountAdmin.php?utenteID=${utenteRowID}&action=eliminaUtente`,
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
            toast.success("Utente eliminato con successo");
            getUtenteClienteData();
          } else if (data.error) {
            toast.error(data.error);
            console.log(
              "Errore durante l'eliminazione dell'utente:",
              data.error
            );
          }
          console.log("Utente eliminato con successo", data);
        })
        .catch((error) =>
          console.error("Errore durante l'eliminazione dell'utente:", error)
        );
    }, 2000);
  };

  return (
    <div className="account-admin h-full w-full py-8 flex flex-col justify-start items-start overflow-x-hidden">
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
          Per vedere tutte le informazioni sulle prenotazioni{" "}
          <span
            onClick={() => navigate("/prenotazioni")}
            className="font-bold text-[#0B76B7] cursor-pointer"
          >
            clicca qui
          </span>
        </p>
      </div>
      <div className="flex flex-col justify-start items-start w-full mt-10">
        <div className="w-full flex justify-between items-center px-5 text-lg border-b-[1.5px] border-[#808080]">
          <button
            type="button"
            onClick={handleLeMieCamereIsActive}
            className={`text-[${
              !leMieCamereIsActive ? "#808080" : "#0B76B7"
            }] bg-trasparent border-none outline-none font-bold cursor-pointer`}
          >
            Le mie camere
          </button>
          <button
            type="button"
            onClick={handleIMieiUtentiIsActive}
            className={`text-[${
              !iMieiUtentiIsActive ? "#808080" : "#0B76B7"
            }] bg-trasparent border-none outline-none font-bold cursor-pointer`}
          >
            I miei utenti
          </button>
          <button
            type="button"
            onClick={handleAggiungiCameraIsActive}
            className={`text-[${
              !aggiungiCameraIsActive ? "#808080" : "#0B76B7"
            }] bg-trasparent border-none outline-none font-bold cursor-pointer`}
          >
            Aggiungi camera
          </button>
          <button
            type="button"
            onClick={handleDashboardIsActive}
            className={`text-[${
              !dashboardIsActive ? "#808080" : "#0B76B7"
            }] bg-trasparent border-none outline-none font-bold cursor-pointer`}
          >
            Dashboard
          </button>
        </div>
        <div
          className="flex overflow-x-auto transition-transform duration-700"
          id="container"
        >
          <div className="w-[100vw]" id="leMieCamereElement">
            <div className="w-full flex justify-start items-center">
              <div className="w-full px-5 py-3 flex justify-start items-center shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] border-[1.5px] border-[#EEEEEE]">
                <table className="camere-admin-table w-full border-collapse ">
                  <tbody>
                    <tr>
                      <th>Nome camera</th>
                      <th>Tipo camera</th>
                      <th>Posti letto</th>
                      <th>Prezzo</th>
                      <th>Numero camera</th>
                      <th>Descrizione</th>
                      <th>Disponibilità</th>
                    </tr>

                    {utenteClienteData &&
                      utenteClienteData.camere &&
                      utenteClienteData.camere.length > 0 &&
                      utenteClienteData.camere.map((camera, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <input
                                type="text"
                                className="border-none outline-none bg-transparent"
                                name={camera.nomeCamera}
                                id={camera.nomeCamera}
                                defaultValue={camera.nomeCamera}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="border-none outline-none bg-transparent"
                                name={camera.tipoCamera}
                                id={camera.tipoCamera}
                                defaultValue={camera.tipoCamera}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                step={1}
                                className="border-none outline-none bg-transparent"
                                name={camera.postiLetto}
                                id={camera.postiLetto}
                                defaultValue={camera.postiLetto}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                step={0.01}
                                min={20}
                                max={2000}
                                className="border-none outline-none bg-transparent"
                                name={camera.prezzo}
                                id={camera.prezzo}
                                defaultValue={camera.prezzo}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="border-none outline-none bg-transparent"
                                name={camera.numeroCamera}
                                id={camera.numeroCamera}
                                defaultValue={camera.numeroCamera}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                title={camera.descrizioneCamera}
                                type="text"
                                className="border-none outline-none bg-transparent"
                                name={camera.descrizioneCamera}
                                id={camera.descrizioneCamera}
                                defaultValue={
                                  camera.descrizioneCamera &&
                                  camera.descrizioneCamera.length > 15
                                    ? camera.descrizioneCamera.slice(0, 15) +
                                      "..."
                                    : camera.descrizioneCamera
                                }
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="border-none outline-none bg-transparent"
                                name={camera.disponibilita}
                                id={camera.disponibilita}
                                defaultValue={camera.disponibilita}
                                readOnly
                              />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="w-[100vw]" id="iMieiUtentiElement">
            <div className="w-full flex justify-start items-center">
              <div className="w-full px-5 py-3 flex justify-start items-center shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] border-[1.5px] border-[#EEEEEE]">
                <table className="camere-admin-table w-full border-collapse ">
                  <tbody>
                    <tr>
                      <th>Nome</th>
                      <th>Cognome</th>
                      <th>ID Utente</th>
                      <th>Ruolo</th>
                      <th>Data di nascita</th>
                      <th>Telefono</th>
                      <th>Password</th>
                    </tr>

                    {utenteClienteData &&
                      utenteClienteData.utenti &&
                      utenteClienteData.utenti.length > 0 &&
                      utenteClienteData.utenti.map((utente, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <input
                                type="text"
                                className="border-none outline-none bg-transparent"
                                name={utente.nomeUtente}
                                id={utente.nomeUtente}
                                defaultValue={utente.nomeUtente}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="border-none outline-none bg-transparent"
                                name={utente.cognomeUtente}
                                id={utente.cognomeUtente}
                                defaultValue={utente.cognomeUtente}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                step={1}
                                className="border-none outline-none bg-transparent"
                                name={utente.IDUtente}
                                id={utente.IDUtente}
                                defaultValue={utente.IDUtente}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="border-none outline-none bg-transparent"
                                name={utente.ruoloUtente}
                                id={utente.ruoloUtente}
                                defaultValue={utente.ruoloUtente}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                type="date"
                                className="utenti-date border-none outline-none bg-transparent"
                                name={utente.dataNascitaUtente}
                                id={utente.dataNascitaUtente}
                                value={utente.dataNascitaUtente}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="border-none outline-none bg-transparent"
                                name={utente.telefonoUtente}
                                id={utente.telefonoUtente}
                                defaultValue={utente.telefonoUtente}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                type="password"
                                className="border-none outline-none bg-transparent"
                                name={utente.passwordUtente}
                                id={utente.passwordUtente}
                                defaultValue={utente.passwordUtente}
                                readOnly
                              />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="w-[100vw]" id="aggiungiCameraElement">
            <form className="w-full flex flex-col justify-start items-start px-5 py-5 gap-5">
              <button
                type="button"
                className="flex justify-center items-center border-none outline-none hover:scale-[.95] transition-transform duration-300 ease-in-out"
              >
                <Plus color="#7E8794" />
                <span className=" text-[#7E8794]">
                  Aggiungi immagine camera
                </span>
              </button>
              <div className="w-full flex justify-start items-center flex-wrap gap-7">
                <div className="flex flex-col justify-center items-start">
                  <label
                    className="text-[#808080] text-md"
                    htmlFor="nomeCameraInput"
                  >
                    Nome camera
                  </label>
                  <div className="flex mt-2 justify-center items-center border-[1.5px] border-[#0B76B7] outline-none rounded-md px-1 py-1">
                    <input
                      type="text"
                      required
                      id="nomeCameraInput"
                      name="nomeCameraInput"
                      className="bg-transparent outline-none border-none w-[9rem]"
                      placeholder="Nome camera"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-center items-start">
                  <label
                    className="text-[#808080] text-md"
                    htmlFor="tipoCamera"
                  >
                    Tipo camera
                  </label>
                  <div className="flex mt-2 justify-center items-center border-[1.5px] border-[#0B76B7] outline-none rounded-md px-1 py-1">
                    <select
                      name="tipoCamera"
                      id="tipoCamera"
                      className="bg-transparent outline-none border-none w-[9rem]"
                    >
                      <option value="singola">Singola</option>
                      <option value="doppia">Doppia</option>
                      <option value="suite">Suite</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-start">
                  <label
                    className="text-[#808080] text-md"
                    htmlFor="postiLettoInput"
                  >
                    Posti letto
                  </label>
                  <div className="flex mt-2 justify-center items-center border-[1.5px] border-[#0B76B7] outline-none rounded-md px-1 py-1">
                    <input
                      type="number"
                      required
                      id="postiLettoInput"
                      name="postiLettoInput"
                      className="bg-transparent outline-none border-none w-[9rem]"
                      placeholder="Posti letto"
                      min={1}
                      max={6}
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-center items-start">
                  <label
                    className="text-[#808080] text-md"
                    htmlFor="prezzoInput"
                  >
                    Prezzo
                  </label>
                  <div className="flex mt-2 justify-center items-center border-[1.5px] border-[#0B76B7] outline-none rounded-md px-1 py-1">
                    <input
                      type="number"
                      step={0.01}
                      required
                      id="prezzoInput"
                      name="prezzoInput"
                      className="bg-transparent outline-none border-none w-[9rem]"
                      placeholder="Prezzo"
                      min={20}
                      max={500}
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-center items-start">
                  <label
                    className="text-[#808080] text-md"
                    htmlFor="descrizioneCameraInput"
                  >
                    Descrizione
                  </label>
                  <div className="flex mt-2 justify-center items-center border-[1.5px] border-[#0B76B7] outline-none rounded-md px-1 py-1">
                    <input
                      type="text"
                      required
                      id="descrizioneCameraInput"
                      name="descrizioneCameraInput"
                      className="bg-transparent outline-none border-none w-[30rem]"
                      placeholder="Descrizione"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-center items-start">
                  <label
                    className="text-[#808080] text-md"
                    htmlFor="immagineCameraInput"
                  >
                    Immagine camera
                  </label>
                  <div className="flex mt-2 justify-center items-center border-[1.5px] border-[#0B76B7] outline-none rounded-md px-1 py-1">
                    <input
                      type="file"
                      accept="image/jpg"
                      required
                      id="immagineCameraInput"
                      name="immagineCameraInput"
                      className="bg-transparent outline-none border-none w-[12rem]"
                      placeholder="Immagine camera"
                    />
                    <label for="immagineCameraInput" className="cursor-pointer">
                      <File color="#0B76B7" />
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#0B76B7] border-[1.5px] px-5 py-2 rounded-md text-white hover:scale-90 active:scale-105 transition-transform duration-300 ease-in-out "
              >
                Aggiungi camera
              </button>
            </form>
          </div>
          <div className="w-[100vw]" id="dashboardElement">
            <div className="w-full px-5 py-10 flex flex-col justify-start items-start gap-y-3">
              <div className="w-full flex justify-between items-center flex-wrap">
                <div className="card-dashboard py-2 flex flex-col justify-center items-center w-[18rem] h-[10rem] rounded-2xl bg-[#F1F6FE] hover:scale-[1.03] transition-transform">
                  <div className="w-full text-xl text-[#0B76B7] h-[15%] flex justify-center items-center">
                    <h2>Utenti</h2>
                  </div>
                  <div className="w-full h-[75%] flex justify-evenly items-center">
                    <UsersRound
                      strokeWidth={1}
                      color="#0B76B7"
                      className="w-1/2 h-[5rem]"
                    />
                    {utenteClienteData &&
                    utenteClienteData.dashboard &&
                    utenteClienteData.dashboard.numUtenti ? (
                      <h1 className="w-1/2 font-bold text-[#0B76B7] text-[5rem]">
                        {utenteClienteData.dashboard.numUtenti < 10
                          ? `0${utenteClienteData.dashboard.numUtenti}`
                          : utenteClienteData.dashboard.numUtenti}
                      </h1>
                    ) : (
                      <h1 className="w-1/2 font-bold text-[#0B76B7] text-[5rem]">
                        00
                      </h1>
                    )}
                  </div>
                </div>
                <div className="card-dashboard py-2 flex flex-col justify-center items-center w-[18rem] h-[10rem] rounded-2xl bg-[#F1F6FE] hover:scale-[1.03] transition-transform">
                  <div className="w-full text-xl text-[#0B76B7] h-[15%] flex justify-center items-center">
                    <h2>Camere</h2>
                  </div>
                  <div className="w-full h-[75%] flex justify-evenly items-center">
                    <BedDouble
                      strokeWidth={1}
                      color="#0B76B7"
                      className="w-1/2 h-[5rem]"
                    />
                    {utenteClienteData &&
                    utenteClienteData.dashboard &&
                    utenteClienteData.dashboard.numCamere ? (
                      <h1 className="w-1/2 font-bold text-[#0B76B7] text-[5rem]">
                        {utenteClienteData.dashboard.numCamere < 10
                          ? `0${utenteClienteData.dashboard.numCamere}`
                          : utenteClienteData.dashboard.numCamere}
                      </h1>
                    ) : (
                      <h1 className="w-1/2 font-bold text-[#0B76B7] text-[5rem]">
                        00
                      </h1>
                    )}
                  </div>
                </div>
                <div className="card-dashboard py-2 flex flex-col justify-center items-center w-[18rem] h-[10rem] rounded-2xl bg-[#F1F6FE] hover:scale-[1.03] transition-transform">
                  <div className="w-full text-xl text-[#0B76B7] h-[15%] flex justify-center items-center">
                    <h2>Prenotazioni</h2>
                  </div>
                  <div className="w-full h-[75%] flex justify-evenly items-center">
                    <CalendarCheck2
                      strokeWidth={1}
                      color="#0B76B7"
                      className="w-1/2 h-[5rem]"
                    />
                    {utenteClienteData &&
                    utenteClienteData.dashboard &&
                    utenteClienteData.dashboard.numPrenotazioni ? (
                      <h1 className="w-1/2 font-bold text-[#0B76B7] text-[5rem]">
                        {utenteClienteData.dashboard.numPrenotazioni < 10
                          ? `0${utenteClienteData.dashboard.numPrenotazioni}`
                          : `${utenteClienteData.dashboard.numPrenotazioni}`}
                      </h1>
                    ) : (
                      <h1 className="w-1/2 font-bold text-[#0B76B7] text-[5rem]">
                        00
                      </h1>
                    )}
                  </div>
                </div>
                <div className="card-dashboard py-2 flex flex-col justify-center items-center w-[18rem] h-[10rem] rounded-2xl bg-[#F1F6FE] hover:scale-[1.03] transition-transform">
                  <div className="w-full text-xl text-[#0B76B7] h-[15%] flex justify-center items-center">
                    <h2>Incassi totali</h2>
                  </div>
                  <div className="w-full h-[75%] flex justify-center items-center">
                    {utenteClienteData &&
                    utenteClienteData.dashboard &&
                    utenteClienteData.dashboard.incassiTotali ? (
                      <h1 className="font-bold text-[#0B76B7] text-[5rem]">
                        {Math.round(utenteClienteData.dashboard.incassiTotali)}€
                      </h1>
                    ) : (
                      <h1 className="w-1/2 font-bold text-[#0B76B7] text-[5rem]">
                        00
                      </h1>
                    )}
                  </div>
                </div>
              </div>
              <div>Grafico</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountAdmin;
