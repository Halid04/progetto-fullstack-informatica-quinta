import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { ListFilter, Eye } from "lucide-react";
import { Dialog } from "primereact/dialog";

function Camere() {
  const [camere, setCamere] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState(getTodayDate());
  const [checkOutDate, setCheckOutDate] = useState(getTomorrowDate());
  const [formData, setFormData] = useState({
    singola: true,
    doppia: true,
    suite: true,
    postiLetto: 1,
    prezzo: "centoDuecento",
    checkInDate: getTodayDate(), // Imposta la data di check-in predefinita come quella di oggi
    checkOutDate: getTomorrowDate(), // Imposta la data di check-out predefinita come quella di oggi
  });

  useEffect(() => {
    getAllCamere();
  }, []);

  const getAllCamere = () => {
    fetch("http://localhost/progetto-fullstack-informatica-quinta/camere.php")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCamere(data);
      })
      .catch((error) =>
        console.error("Errore durante il recupero delle camere:", error)
      );
  };

  const handleCancellaFiltri = () => {
    getAllCamere();
    setIsDialogOpen(false);
  };

  const handleCheckInChange = (event) => {
    const selectedDate = event.target.value;
    setCheckInDate(selectedDate);

    const nextDayDate = new Date(selectedDate);
    nextDayDate.setDate(nextDayDate.getDate() + 1);
    setCheckOutDate(nextDayDate.toISOString().split("T")[0]);

    setFormData((prevFormData) => ({
      ...prevFormData,
      checkInDate: selectedDate,
      checkOutDate: nextDayDate.toISOString().split("T")[0],
    }));
  };

  const handleCheckOutChange = (event) => {
    const selectedDate = event.target.value;
    setCheckOutDate(selectedDate);

    setFormData((prevFormData) => ({
      ...prevFormData,
      checkOutDate: selectedDate,
    }));
  };

  function getTodayDate() {
    const today = new Date();
    return today.toISOString().split("T")[0];
  }

  function getTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    if (!formData.singola && !formData.doppia && !formData.suite) {
      alert("Seleziona almeno un tipo di camera");
      return;
    }

    if (formData.postiLetto > 1) {
      formData.singola = false;
    }

    if (formData.postiLetto > 2) {
      formData.singola = false;
      formData.doppia = false;
    }

    let url =
      "http://localhost/progetto-fullstack-informatica-quinta/camere.php";
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    console.log(formData);
    let data = formData;

    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCamere(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsDialogOpen(false);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    // Gestione specifica per i radio button
    if (type === "radio") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        prezzo: value, // Imposta il valore dell'opzione prezzo
      }));
    } else {
      // Gestione generale per gli altri tipi di input
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: newValue,
      }));
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-start">
      <div className="h-[15%] w-full flex justify-start items-center">
        <button
          onClick={() => setIsDialogOpen(true)}
          className="border-none outline-none flex justify-center items-center gap-1 ml-5 hover:scale-90 transition-transform duration-300 ease-in-out"
        >
          <ListFilter color="#7E8794" />
          <span className="font-bold text-[#7E8794]">Filtri</span>
        </button>
        <Dialog
          visible={isDialogOpen}
          className="w-[45vw] h-[55vh] flex flex-col justify-center items-center gap-[200rem] bg-white shadow-[0px_0px_10px_6px_#00000024] rounded-md px-5 py-4 overflow-hidden"
          onHide={() => setIsDialogOpen(false)}
        >
          <form
            className="w-full flex flex-col justify-center items-start gap-4 overflow-hidden"
            action=""
            method="post"
            onSubmit={handleSubmit}
          >
            <button
              onClick={() => handleCancellaFiltri()}
              className=" text-sm border-none outline-none flex justify-center items-center gap-1 hover:scale-90 transition-transform duration-300 ease-in-out"
            >
              <Eye color="#7E8794" />
              <span className="font-bold text-[#7E8794]">Ripristina filti</span>
            </button>

            <div className="w-full flex justify-between items-center">
              <p className="w-[40%] font-bold">Tipo camera:</p>
              <div className="w-[60%] flex justify-start items-center gap-7">
                <div className="flex justify-center items-center gap-2">
                  <input
                    type="checkbox"
                    id="singola"
                    name="singola"
                    value={formData.singola}
                    onChange={handleChange}
                    className="accent-[#0B76B7]"
                    checked={formData.singola}
                  />
                  <label htmlFor="singola">Singola</label>
                </div>

                <div className="flex justify-center items-center gap-2">
                  <input
                    type="checkbox"
                    id="doppia"
                    name="doppia"
                    value={formData.doppia}
                    onChange={handleChange}
                    className="accent-[#0B76B7]"
                    checked={formData.doppia}
                  />
                  <label htmlFor="doppia">Doppia</label>
                </div>

                <div className="flex justify-center items-center gap-2">
                  <input
                    type="checkbox"
                    id="suite"
                    name="suite"
                    value={formData.suite}
                    onChange={handleChange}
                    className="accent-[#0B76B7]"
                    checked={formData.suite}
                  />
                  <label htmlFor="suite">Suite</label>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="w-[40%] font-bold">Posti letto:</p>
              <div className="w-[60%] flex justify-start items-center">
                <input
                  className="w-[50%] h-4 border-[1.5px] border-[#0B76B7] rounded-sm py-2"
                  type="number"
                  name="postiLetto"
                  id="postiLetto"
                  defaultValue={formData.postiLetto}
                  onChange={handleChange}
                  min={1}
                  max={5}
                />
              </div>
            </div>

            <div className="w-full flex justify-between items-center">
              <p className="w-[40%] font-bold">Prezzo:</p>
              <div className="w-[60%] flex justify-start items-center gap-7">
                <div className="flex justify-center items-center gap-2">
                  <input
                    type="radio"
                    id="zeroCento"
                    name="prezzo"
                    value="zeroCento"
                    onChange={handleChange}
                    className="accent-[#0B76B7]"
                    checked={formData.prezzo === "zeroCento"}
                  />
                  <label htmlFor="zeroCento">0 - 100</label>
                </div>

                <div className="flex justify-center items-center gap-2">
                  <input
                    type="radio"
                    id="centoDuecento"
                    name="prezzo"
                    value="centoDuecento"
                    onChange={handleChange}
                    className="accent-[#0B76B7]"
                    checked={formData.prezzo === "centoDuecento"}
                  />
                  <label htmlFor="centoDuecento">100 - 200</label>
                </div>

                <div className="flex justify-center items-center gap-2">
                  <input
                    type="radio"
                    id="duecentoTrecento"
                    name="prezzo"
                    value="duecentoTrecento"
                    onChange={handleChange}
                    className="accent-[#0B76B7]"
                    checked={formData.prezzo === "duecentoTrecento"}
                  />
                  <label htmlFor="duecentoTrecento">200 - 300</label>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-between items-center">
              <p className="w-[40%] font-bold">Periodo prenotazione:</p>
              <div className="w-[60%] flex justify-start items-center gap-4">
                <div className="flex flex-col justify-center items-start">
                  <p>Data check in</p>
                  <input
                    type="date"
                    name="checkInDate"
                    id="checkInDate"
                    value={checkInDate}
                    onChange={handleCheckInChange}
                    min={getTodayDate()}
                    placeholder="Data check in"
                    className="border-[1.5px] border-[#0B76B7] rounded-sm w-[7.7rem]"
                  />
                </div>

                <div className="flex flex-col justify-center items-start">
                  <p>Data check out</p>
                  <input
                    type="date"
                    name="checkOutDate"
                    id="checkOutDate"
                    value={checkOutDate}
                    onChange={handleCheckOutChange}
                    min={checkInDate}
                    placeholder="Data check out"
                    className="border-[1.5px] border-[#0B76B7] rounded-sm w-[7.7rem]"
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex justify-end items-center gap-5 mt-4">
              <button
                type="submit"
                className="bg-[#0B76B7] border-2 border-[#0B76B7] px-6 py-[2px]  rounded-md text-white hover:scale-90 active:scale-105 transition-transform duration-300 ease-in-out "
              >
                Salva
              </button>
              <button
                type="button"
                className="bg-trasparent border-2 border-[#0B76B7] px-6 py-[2px] rounded-md text-[#0B76B7] hover:scale-90 active:scale-105 transition-transform duration-300 ease-in-out "
                onClick={() => setIsDialogOpen(false)}
              >
                Annula
              </button>
            </div>
          </form>
        </Dialog>
      </div>
      <div className="h-[85%] ml-5 w-full flex items-start justify-start flex-wrap gap-x-20 gap-y-3">
        {camere.length > 0 &&
          camere[0].cameraTrovata &&
          camere.map((camera) => (
            <Card
              key={camera.numeroCamera}
              nomeCamera={camera.nomeCamera}
              tipoCamera={camera.tipoCamera}
              postiLetto={`${camera.postiLetto} letto`}
              prezzo={`${camera.prezzo}€/N`}
              descrizione={camera.descrizione}
              nomeImmagineCamera={camera.nomeImmagineCamera}
              numeroCamera={camera.numeroCamera}
            />
          ))}

        {camere.message == "Nessuna camera trovata" &&
          !camere.cameraTrovata && (
            <div className="z-[15] flex flex-col justify-center items-center w-full h-full gap-4">
              <h1 className="text-4xl md:text-5xl font-bold text-center">
                Nessuna camera trovata
                <span className="text-[#0B76B7]">!</span>
              </h1>
              <p className="text-lg text-center md:text-xl text-[#808080]">
                Prova a modificare i filtri per visualizzare le camere
                disponibili
              </p>
              <div className="flex justify-center items-center gap-5">
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(true)}
                  className="bg-[#0B76B7] border-[1.5px] px-5 py-1 rounded-md text-white hover:scale-90 active:scale-105 transition-transform duration-300 ease-in-out"
                >
                  Modifica filtri
                </button>

                <button
                  type="button"
                  onClick={handleCancellaFiltri}
                  className="bg-trasparent border-[1.5px] border-[#0B76B7] px-5 py-1 rounded-md text-[#0B76B7] hover:scale-90 active:scale-105 transition-transform duration-300 ease-in-out"
                >
                  Cancella filtri
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default Camere;
