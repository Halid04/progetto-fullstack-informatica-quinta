import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function Prenotazioni() {
  const [utenteID, setUtenteID] = useState(localStorage.getItem("userId"));
  const [utenteIsAdmin, setUtenteIsAdmin] = useState(
    localStorage.getItem("isAdmin")
  );
  const [riepilogoPrenotazioni, setRiepilogoPrenotazioni] = useState([]);
  const [tooltipVisibility, setTooltipVisibility] = useState([]);

  useEffect(() => {
    getUtentePrenotazioniData();
  }, []);

  const getUtentePrenotazioniData = () => {
    fetch(
      `http://localhost/progetto-fullstack-informatica-quinta/prenotazioni.php?utenteID=${utenteID}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Ordina le prenotazioni in base alla data di inizio soggiorno
        data.sort((a, b) => {
          const dateA = new Date(a.dataInizioSoggiorno);
          const dateB = new Date(b.dataInizioSoggiorno);
          return dateA - dateB;
        });

        // Aggiungi la logica per gestire lo stato delle prenotazioni
        const currentDate = new Date();
        const updatedData = data.map((prenotazione) => {
          const dataInizio = new Date(prenotazione.dataInizioSoggiorno);
          const dataFine = new Date(prenotazione.dataFineSoggiorno);
          let newStato;
          if (currentDate < dataInizio) {
            newStato = 0; // La prenotazione non è ancora iniziata
          } else if (currentDate > dataFine) {
            newStato = 2; // La prenotazione è già terminata
          } else {
            newStato = 1; // La prenotazione è in corso
          }
          return { ...prenotazione, newStato }; // Aggiungi lo stato alla prenotazione
        });
        setRiepilogoPrenotazioni(updatedData);
        setTooltipVisibility(new Array(updatedData.length).fill(false));
        console.log(updatedData);
      })
      .catch((error) =>
        console.error(
          "Errore durante il recupero dell'immagine della camera:",
          error
        )
      );
  };

  const handleMouseEnter = (index) => {
    // Imposta il tooltip come visibile solo per la riga corrente
    setTooltipVisibility((prevState) =>
      prevState.map((value, i) => (i === index ? true : value))
    );
  };

  const handleMouseLeave = () => {
    // Nascondi tutti i tooltip quando il mouse esce dalla tabella
    setTooltipVisibility(new Array(riepilogoPrenotazioni.length).fill(false));
  };

  const deletePrenotazione = (event, prenotazioneID) => {
    event.preventDefault();

    // Crea il corpo della richiesta POST
    const formData = {
      prenotazioneID: prenotazioneID,
    };

    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    console.log(formData);
    toast.loading("Eliminazione prenotazione in corso...", { duration: 2000 });

    setTimeout(() => {
      fetch(
        `http://localhost/progetto-fullstack-informatica-quinta/prenotazioni.php?prenotazioneID=${prenotazioneID}&action=eliminaPrenotazione`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(formData),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            toast.success("Prenotazione eliminata con successo");
            getUtentePrenotazioniData();
          } else if (data.error) {
            toast.error(data.error);
            console.log(
              "Errore durante l'eliminazione della prenotazione:",
              data.error
            );
          }
          console.log("Risposta eliminazione prenotazione:", data);
        })
        .catch((error) =>
          console.error(
            "Errore durante l'eliminazione della prenotazione:",
            error
          )
        );
    }, 2000);
  };

  return (
    <div className="h-full w-full py-8 flex flex-col justify-start items-start">
      <div className="h-[5rem] w-full flex justify-start items-center">
        <h1 className="text-[#0B76B7] text-xl font-bold ml-5 mb-5">
          Riepilogo delle prenotazioni dell’utente
        </h1>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full px-5 flex justify-start items-center">
        <div className="w-full px-5 py-3 flex justify-start items-center shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] border-[1.5px] border-[#EEEEEE]">
          <table className="prenotazioni-table w-full border-collapse ">
            <tbody>
              <tr>
                {utenteIsAdmin && <th>Utente</th>}
                <th>Nome camera</th>
                <th>Tipo camera</th>
                <th>Posti letto</th>
                <th>Data Check in</th>
                <th>Data Check out</th>
                <th>Pasti</th>
                <th>Ospiti</th>
                <th>Stato</th>
              </tr>
              {riepilogoPrenotazioni &&
                riepilogoPrenotazioni.length > 0 &&
                riepilogoPrenotazioni.map((prenotazione, index) => {
                  return (
                    <tr key={index}>
                      {utenteIsAdmin && (
                        <td>
                          {prenotazione.cognome} {""} {prenotazione.nome}
                        </td>
                      )}
                      <td>{prenotazione.nomeCamera}</td>
                      <td>{prenotazione.tipoCamera}</td>
                      <td>{prenotazione.postiLetto}</td>
                      <td>
                        {new Date(
                          prenotazione.dataInizioSoggiorno
                        ).toLocaleDateString("it-IT", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </td>
                      <td>
                        {new Date(
                          prenotazione.dataFineSoggiorno
                        ).toLocaleDateString("it-IT", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </td>
                      <td>
                        {prenotazione.pasti &&
                          prenotazione.pasti.length > 1 && (
                            <div
                              onMouseEnter={() => handleMouseEnter(index)}
                              onMouseLeave={handleMouseLeave}
                              className="relative"
                            >
                              <button
                                data-tooltip-target={`tooltip-right-${index}`}
                                data-tooltip-placement="right"
                                type="button"
                                className="border-none outline-none bg-transparent"
                              >
                                {prenotazione.pasti[0].tipoPasto} -{" "}
                                {new Date(
                                  prenotazione.pasti[0].dataPasto
                                ).toLocaleDateString("it-IT", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })}
                              </button>

                              {tooltipVisibility[index] && (
                                <div
                                  id={`tooltip-right-${index}`}
                                  role="tooltip"
                                  className="absolute z-10 px-3 py-2 text-sm font-medium text-white bg-[#050316] rounded-lg shadow-sm opacity-100 tooltip "
                                >
                                  {prenotazione.pasti
                                    .slice(1)
                                    .map((pasto, index) => (
                                      <div key={index}>
                                        {pasto.tipoPasto} -{" "}
                                        {new Date(
                                          pasto.dataPasto
                                        ).toLocaleDateString("it-IT", {
                                          day: "2-digit",
                                          month: "2-digit",
                                          year: "numeric",
                                        })}
                                      </div>
                                    ))}
                                </div>
                              )}
                            </div>
                          )}
                        {prenotazione.pasti &&
                          prenotazione.pasti.length === 1 && (
                            <div>
                              {prenotazione.pasti[0].tipoPasto} -{" "}
                              {new Date(
                                prenotazione.pasti[0].dataPasto
                              ).toLocaleDateString("it-IT", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })}
                            </div>
                          )}
                        {prenotazione.pasti &&
                          prenotazione.pasti == 0 &&
                          "Nessun pasto"}
                      </td>
                      <td>
                        {prenotazione.ospiti &&
                          prenotazione.ospiti.length > 1 && (
                            <div
                              onMouseEnter={() =>
                                handleMouseEnter(`ospiti-${index}`)
                              }
                              onMouseLeave={handleMouseLeave}
                              className="relative"
                            >
                              <button
                                data-tooltip-target={`tooltip-right-ospiti-${index}`}
                                data-tooltip-placement="right"
                                type="button"
                                className="border-none outline-none bg-transparent"
                              >
                                {prenotazione.ospiti[0].nomeOspite}{" "}
                                {prenotazione.ospiti[0].cognomeOspite}
                              </button>

                              {tooltipVisibility[`ospiti-${index}`] && (
                                <div
                                  id={`tooltip-right-ospiti-${index}`}
                                  role="tooltip"
                                  className="absolute z-10 px-3 py-2 text-sm font-medium text-white bg-[#050316] rounded-lg shadow-sm opacity-100 tooltip "
                                >
                                  {prenotazione.ospiti
                                    .slice(1)
                                    .map((ospite, index) => (
                                      <div key={index}>
                                        {ospite.nomeOspite}{" "}
                                        {ospite.cognomeOspite}
                                      </div>
                                    ))}
                                </div>
                              )}
                            </div>
                          )}
                        {prenotazione.ospiti &&
                          prenotazione.ospiti.length === 1 && (
                            <div>
                              {prenotazione.ospiti[0].nomeOspite}{" "}
                              {prenotazione.ospiti[0].cognomeOspite}
                            </div>
                          )}
                        {prenotazione.ospiti &&
                          prenotazione.ospiti == 0 &&
                          "Nessun ospite"}
                      </td>
                      <td>
                        {prenotazione.newStato == 0 && (
                          <div
                            title="Non iniziata"
                            className=" w-2 h-2 rounded-full bg-gray-500 ml-3"
                          ></div>
                        )}
                        {prenotazione.newStato == 1 && (
                          <div
                            title="In corso"
                            className=" w-2 h-2 rounded-full bg-[#43D011] ml-3"
                          ></div>
                        )}
                        {prenotazione.newStato == 2 && (
                          <div
                            title="Terminata"
                            className=" w-2 h-2 rounded-full bg-[#D11717] ml-3"
                          ></div>
                        )}
                      </td>
                      {prenotazione.newStato == 0 && (
                        <td className="flex justify-start items-center mr-10 gap-2">
                          <form
                            onSubmit={(event) =>
                              deletePrenotazione(
                                event,
                                prenotazione.prenotazione_id
                              )
                            }
                            method="post"
                            className=" mt-4"
                          >
                            <button
                              type="submit"
                              className="outline-none border-none bg-transparent"
                              title="Elimina prenotazione"
                            >
                              <Trash2
                                color="#0B76B7"
                                className="cursor-pointer "
                                height={"1.3rem"}
                              />
                            </button>
                          </form>
                        </td>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Prenotazioni;
