import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronDown, CalendarDays, Plus, Contact, Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PrenotazioneCamera() {
  const navigate = useNavigate();
  const [utenteID, setUtenteID] = useState(localStorage.getItem("userId"));
  const [checkInDate, setCheckInDate] = useState(getTodayDate());
  const [checkOutDate, setCheckOutDate] = useState(getTomorrowDate());
  const { numeroCamera } = useParams();
  const [ospiti, setOspiti] = useState([]);
  const [pasti, setPasti] = useState([]);
  const [cameraData, setCameraData] = useState([]);
  const [chevronInformazioniCameraIsOpen, setChevronInformazioniCameraIsOpen] =
    useState(true);
  const [chevronPeriodoSoggiornoIsOpen, setChevronPeriodoSoggiornoIsOpen] =
    useState(false);
  const [chevronOspitiCameraIsOpen, setChevronOspitiCameraIsOpen] =
    useState(false);
  const [chevronPastiSoggiornoIsOpen, setChevronPastiSoggiornoIsOpen] =
    useState(false);

  function getTodayDate() {
    const today = new Date();
    return today.toISOString().split("T")[0];
  }

  function getTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  }

  const handleCheckInChange = (event) => {
    const selectedDate = event.target.value;
    setCheckInDate(selectedDate);

    const nextDayDate = new Date(selectedDate);
    nextDayDate.setDate(nextDayDate.getDate() + 1);
    setCheckOutDate(nextDayDate.toISOString().split("T")[0]);
  };

  const handleCheckOutChange = (event) => {
    const selectedDate = event.target.value;
    setCheckOutDate(selectedDate);
  };

  useEffect(() => {
    getCameraImages();
  }, []);

  const getCameraImages = () => {
    fetch(
      `http://localhost/progetto-fullstack-informatica-quinta/prenotazioneCamera.php?numeroCamera=${numeroCamera}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCameraData(data);
      })
      .catch((error) =>
        console.error(
          "Errore durante il recupero dell'immagine della camera:",
          error
        )
      );
  };

  const handleAggiungiOspiteClick = () => {
    const ospideID = Date.now();
    setOspiti([...ospiti, { id: ospideID }]);
  };

  const handleAggiungiPastoClick = () => {
    const pastoID = Date.now();
    setPasti([...pasti, { id: pastoID }]);
  };

  const handleDeleteOspiteClick = (id) => {
    const updatedOspiti = ospiti.filter((ospite) => ospite.id !== id);
    setOspiti(updatedOspiti);
  };

  const handleDeletePastoClick = (id) => {
    const updatedPasti = pasti.filter((pasto) => pasto.id !== id);
    setPasti(updatedPasti);
  };

  const handleChevronInformazioniCameraClick = () => {
    setChevronInformazioniCameraIsOpen(!chevronInformazioniCameraIsOpen);
    setChevronPeriodoSoggiornoIsOpen(false);
    setChevronOspitiCameraIsOpen(false);
    setChevronPastiSoggiornoIsOpen(false);
  };

  const handleChevronPeriodoSoggiornoClick = () => {
    setChevronPeriodoSoggiornoIsOpen(!chevronPeriodoSoggiornoIsOpen);
    setChevronInformazioniCameraIsOpen(false);
    setChevronOspitiCameraIsOpen(false);
    setChevronPastiSoggiornoIsOpen(false);
  };

  const handleChevronOspitiCameraClick = () => {
    setChevronOspitiCameraIsOpen(!chevronOspitiCameraIsOpen);
    setChevronInformazioniCameraIsOpen(false);
    setChevronPeriodoSoggiornoIsOpen(false);
    setChevronPastiSoggiornoIsOpen(false);
  };

  const handleChevronPastiSoggiornoClick = () => {
    setChevronPastiSoggiornoIsOpen(!chevronPastiSoggiornoIsOpen);
    setChevronInformazioniCameraIsOpen(false);
    setChevronPeriodoSoggiornoIsOpen(false);
    setChevronOspitiCameraIsOpen(false);
  };

  const handleDateCheckInInput = () => {
    document.getElementById("dataCheckInInput").showPicker();
  };
  const handleDateCheckOutInput = () => {
    document.getElementById("dataCheckOutInput").showPicker();
  };

  const handleOspiteDataNascitaInputClick = (id) => {
    document.getElementById(`ospiteDataNascitaInput_${id}`).showPicker();
  };

  const handlePastoGiornoInputClick = (id) => {
    document.getElementById(`pastoGiorno_${id}`).showPicker();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Recupera i valori dei campi del form
    const dataInizioSoggiorno =
      document.getElementById("dataCheckInInput").value;
    const dataFineSoggiorno =
      document.getElementById("dataCheckOutInput").value;

    // Crea un array per memorizzare i pasti
    const pastiArray = pasti.map((pasto) => ({
      tipoPasto: document.getElementById(`pasto_${pasto.id}`).value,
      dataPasto: document.getElementById(`pastoGiorno_${pasto.id}`).value,
    }));

    // Verifica che non ci siano pasti duplicati per lo stesso giorno
    const pastiSet = new Set();
    let pastiDuplicati = false;
    for (const pasto of pastiArray) {
      const pastoKey = `${pasto.tipoPasto}_${pasto.dataPasto}`;
      if (pastiSet.has(pastoKey)) {
        pastiDuplicati = true;
        break;
      } else {
        pastiSet.add(pastoKey);
      }
    }

    if (pastiDuplicati) {
      toast.error(
        "Non è possibile selezionare gli stessi pasti per lo stesso giorno."
      );
      return;
    }

    // Crea un array per memorizzare gli ospiti
    const ospitiArray = ospiti.map((ospite) => ({
      nomeOspite: document.getElementById(`ospiteNomeInput_${ospite.id}`).value,
      cognomeOspite: document.getElementById(`ospiteCognomeInput_${ospite.id}`)
        .value,
      dataNascitaOspite: document.getElementById(
        `ospiteDataNascitaInput_${ospite.id}`
      ).value,
    }));

    // Crea l'oggetto con i dati del form
    const formData = {
      dataInizioSoggiorno,
      dataFineSoggiorno,
      utente_id: utenteID,
      pasti: pastiArray,
      numeroCamera,
      ospiti: ospitiArray,
    };

    let url =
      "http://localhost/progetto-fullstack-informatica-quinta/prenotazioneCamera.php";
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    let data = formData;

    toast.loading("Prenotazione in corso...", { duration: 2000 });

    setTimeout(() => {
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

          if (data.success) {
            // notify();
            toast.success("Prenotazione effettuata con successo!");
            setTimeout(() => {
              navigate("/camere");
            }, 1000);
          } else {
            alert("Errore durante la prenotazione della camera");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(
            "Prenotazione non riuscita. Controlla i dati inseriti e riprova un'altra volta."
          );
        });
    }, 2000);

    // Fai qualcosa con i dati del form, ad esempio invialo a un endpoint API o memorizzalo localmente
    console.log("Dati del form:", formData);
  };

  return (
    <div className="prenotazione-camera h-full w-full bg-white flex justify-between items-center overflow-hidden">
      {cameraData.camera && cameraData.camera.immagini && (
        <Slider {...settings} className="h-full w-1/2 overflow-hidden">
          {cameraData.camera.immagini.map((immagine, index) => (
            <img
              key={index}
              src={`src/progettoInfoImage/${immagine
                .replace(/\d+/g, "")
                .trim()}/${immagine.trim()}.jpg`}
              alt={immagine.trim()}
              className="object-cover w-full h-[87.7vh]"
            />
          ))}
        </Slider>
      )}

      {cameraData && cameraData.camera && (
        <form
          onSubmit={handleSubmit}
          className="h-full w-1/2 flex flex-col gap-2 justify-start items-start overscroll-y-auto px-5 py-3"
        >
          <h1 className="w-[95%] py-1 font-bold text-[#0B76B7] text-2xl border-b-[1.5px] border-[#01060E] ">
            Prenotazione Camera
          </h1>
          <div className=" w-[95%] py-1 flex flex-col justify-start items-start transition-transform	 border-b-[1.5px] border-[#01060E]">
            <div className=" w-full flex justify-between items-center ">
              <h2 className=" text-lg text-[#01060E]">
                Informazioni della camera
              </h2>
              <ChevronDown
                color="#01060E"
                onClick={handleChevronInformazioniCameraClick}
                className={`rotate-${
                  chevronInformazioniCameraIsOpen ? 180 : 0
                } cursor-pointer transition-all`}
              />
            </div>
            <div
              className={`${
                chevronInformazioniCameraIsOpen
                  ? "flex flex-col justify-center items-start mt-2"
                  : "hidden"
              }`}
            >
              <p className=" font-bold">
                {" "}
                <span className="text-[#808080] font-normal">
                  Nome della camera:
                </span>{" "}
                {cameraData.camera.nomeCamera}
              </p>
              <p className=" font-bold">
                <span className="text-[#808080] font-normal">
                  Numero della camera:
                </span>{" "}
                {cameraData.camera.numeroCamera}
              </p>
              <p className=" font-bold">
                <span className="text-[#808080] font-normal">
                  Tipo della camera:
                </span>{" "}
                {cameraData.camera.tipoCamera}
              </p>
              <p className=" font-bold">
                <span className="text-[#808080] font-normal">Posti letto:</span>{" "}
                {cameraData.camera.postiLetto}
              </p>
              <p className=" font-bold">
                <span className="text-[#808080] font-normal">Prezzo:</span>{" "}
                {cameraData.camera.prezzo}€/N
              </p>
              <p className=" font-bold">
                <span className="text-[#808080] font-normal">Descrizione:</span>{" "}
                {cameraData.camera.descrizione}
              </p>
            </div>
          </div>

          <div className=" w-[95%] py-1 flex flex-col justify-start items-start transition-transform	 border-b-[1.5px] border-[#01060E]">
            <div className=" w-full flex justify-between items-center">
              <h2 className=" text-lg text-[#01060E]">Periodo del soggiorno</h2>
              <ChevronDown
                color="#01060E"
                onClick={handleChevronPeriodoSoggiornoClick}
                className={`rotate-${
                  chevronPeriodoSoggiornoIsOpen ? 180 : 0
                } cursor-pointer transition-all`}
              />
            </div>
            <div
              className={`${
                chevronPeriodoSoggiornoIsOpen
                  ? "flex flex-col justify-center items-start mt-2"
                  : "hidden"
              }`}
            >
              <div className="flex justify-start items-center gap-5 py-1">
                <div className="flex flex-col gap-1 justify-center items-start">
                  <label
                    className="text-[#808080] text-sm"
                    htmlFor="dataCheckInInput"
                  >
                    Check in
                  </label>
                  <div className="flex justify-center items-center border-[1.5px] border-[#0B76B7] outline-none rounded-md px-1 py-1">
                    <input
                      type="date"
                      required
                      id="dataCheckInInput"
                      name="dataCheckInInput"
                      className=" bg-transparent border-none outline-none"
                      value={checkInDate}
                      onChange={handleCheckInChange}
                      min={getTodayDate()}
                    ></input>
                    <CalendarDays
                      color="#0B76B7"
                      className="cursor-pointer"
                      onClick={handleDateCheckInInput}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1 justify-center items-start">
                  <label
                    className="text-[#808080] text-sm"
                    htmlFor="dataCheckOutInput"
                  >
                    Check out
                  </label>
                  <div className="flex justify-center items-center border-[1.5px] border-[#0B76B7] outline-none rounded-md px-1 py-1">
                    <input
                      type="date"
                      required
                      id="dataCheckOutInput"
                      name="dataCheckOutInput"
                      className=" bg-transparent border-none outline-none"
                      value={checkOutDate}
                      onChange={handleCheckOutChange}
                      min={checkInDate}
                    ></input>
                    <CalendarDays
                      color="#0B76B7"
                      className="cursor-pointer"
                      onClick={handleDateCheckOutInput}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" w-[95%] py-1 flex flex-col justify-start items-start transition-transform	 border-b-[1.5px] border-[#01060E]">
            <div className=" w-full flex justify-between items-center ">
              <h2 className=" text-lg text-[#01060E]">Ospiti della camera</h2>
              <ChevronDown
                color="#01060E"
                onClick={handleChevronOspitiCameraClick}
                className={`rotate-${
                  chevronOspitiCameraIsOpen ? 180 : 0
                } cursor-pointer transition-all`}
              />
            </div>
            <div
              className={`${
                chevronOspitiCameraIsOpen
                  ? "flex flex-col justify-center items-start mt-2"
                  : "hidden"
              }`}
            >
              <button
                type="button"
                onClick={handleAggiungiOspiteClick}
                className="flex justify-center items-center border-none outline-none hover:scale-[.95] transition-transform duration-300 ease-in-out"
              >
                <Plus color="#7E8794" className="w-4" />
                <span className="text-sm text-[#7E8794]">
                  Aggiungi nuovo ospite
                </span>
              </button>

              {ospiti.map((ospite) => (
                <div
                  key={ospite.id}
                  className="flex gap-6 justify-start items-center"
                >
                  <div className="flex mt-2 justify-center items-center border-[1.5px] border-[#0B76B7] outline-none rounded-md px-1 py-1">
                    <input
                      type="text"
                      required
                      id={`ospiteNomeInput_${ospite.id}`}
                      name={`ospiteNomeInput_${ospite.id}`}
                      className="bg-transparent outline-none border-none w-[7rem]"
                      placeholder="Nome"
                    />
                    <Contact color="#0B76B7" className="cursor-pointer" />
                  </div>

                  <div className="flex justify-center items-center border-[1.5px] border-[#0B76B7] outline-none rounded-md px-1 py-1">
                    <input
                      type="text"
                      required
                      id={`ospiteCognomeInput_${ospite.id}`}
                      name={`ospiteCognomeInput_${ospite.id}`}
                      className="bg-transparent outline-none border-none w-[7rem]"
                      placeholder="Cognome"
                    />
                    <Contact color="#0B76B7" className="cursor-pointer" />
                  </div>

                  <div className="flex justify-center items-center border-[1.5px] border-[#0B76B7] outline-none rounded-md px-1 py-1">
                    <input
                      type="date"
                      required
                      id={`ospiteDataNascitaInput_${ospite.id}`}
                      name={`ospiteDataNascitaInput_${ospite.id}`}
                      className="ospite-data-nascita bg-transparent border-none outline-none "
                    />
                    <CalendarDays
                      color="#0B76B7"
                      className="cursor-pointer"
                      onClick={() =>
                        handleOspiteDataNascitaInputClick(ospite.id)
                      }
                    />
                  </div>

                  <Trash2
                    color="#0B76B7"
                    className=" cursor-pointer hover:scale-90 transition-transform duration-300 ease-in-out"
                    onClick={() => handleDeleteOspiteClick(ospite.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className=" w-[95%] py-1 flex flex-col justify-start items-start transition-transform	 border-b-[1.5px] border-[#01060E]">
            <div className=" w-full flex justify-between items-center ">
              <h2 className=" text-lg text-[#01060E]">
                Pasti durante il soggiorno
              </h2>
              <ChevronDown
                color="#01060E"
                onClick={handleChevronPastiSoggiornoClick}
                className={`rotate-${
                  chevronPastiSoggiornoIsOpen ? 180 : 0
                } cursor-pointer transition-all`}
              />
            </div>
            <div
              className={`${
                chevronPastiSoggiornoIsOpen
                  ? "flex flex-col justify-center items-start mt-2"
                  : "hidden"
              }`}
            >
              <button
                type="button"
                onClick={handleAggiungiPastoClick}
                className="flex justify-center items-center border-none outline-none hover:scale-[.95] transition-transform duration-300 ease-in-out"
              >
                <Plus color="#7E8794" className="w-4" />
                <span className="text-sm text-[#7E8794]">Aggiungi pasto</span>
              </button>

              {pasti.map((pasto) => (
                <div
                  key={pasto.id}
                  className="flex gap-6 justify-start items-center mt-2"
                >
                  <select
                    name={`pasto_${pasto.id}`}
                    id={`pasto_${pasto.id}`}
                    className=" flex justify-start text-left items-center border-[1.5px] border-[#0B76B7] outline-none rounded-md px-6 py-1"
                  >
                    <option value="colazione">Colazione</option>
                    <option value="pranzo">Pranzo</option>
                    <option value="cena">Cena</option>
                  </select>

                  <div className="flex justify-center items-center border-[1.5px] border-[#0B76B7] outline-none rounded-md px-1 py-1">
                    <input
                      type="date"
                      required
                      id={`pastoGiorno_${pasto.id}`}
                      name={`pastoGiorno_${pasto.id}`}
                      className="pasto-giorno bg-transparent border-none outline-none "
                      min={checkInDate}
                      max={checkOutDate}
                    />
                    <CalendarDays
                      color="#0B76B7"
                      className="cursor-pointer"
                      onClick={() => handlePastoGiornoInputClick(pasto.id)}
                    />
                  </div>

                  <Trash2
                    color="#0B76B7"
                    className=" cursor-pointer hover:scale-90 transition-transform duration-300 ease-in-out"
                    onClick={() => handleDeletePastoClick(pasto.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-1 justify-start items-center w-full">
            <button
              type="submit"
              className="bg-[#0B76B7] border-[1.5px] px-5 py-1 rounded-md text-white hover:scale-90 active:scale-105 transition-transform duration-300 ease-in-out "
            >
              Prenota
            </button>
            <button
              type="button"
              onClick={() => navigate("/camere")}
              className="bg-trasparent border-[1.5px] border-[#0B76B7] px-5 py-1 rounded-md text-[#0B76B7] hover:scale-90 active:scale-105 transition-transform duration-300 ease-in-out "
            >
              Annulla
            </button>
            <Toaster position="top-center" reverseOrder={false} />

            {/* <button onClick={notify}>Make me a toast</button> */}
          </div>
        </form>
      )}
    </div>
  );
}

export default PrenotazioneCamera;
