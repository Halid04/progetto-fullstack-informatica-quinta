import React, { useState, useEffect } from "react";

function Prenotazioni() {
  const [utenteID, setUtenteID] = useState(localStorage.getItem("userId"));
  const [riepilogoPrenotazioni, setRiepilogoPrenotazioni] = useState([]);

  useEffect(() => {
    getUtentePrenotazioniData();
  }, []);

  const getUtentePrenotazioniData = () => {
    fetch(
      `http://localhost/progetto-fullstack-informatica-quinta/prenotazioni.php?utenteID=${utenteID}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRiepilogoPrenotazioni(data);
      })
      .catch((error) =>
        console.error(
          "Errore durante il recupero dell'immagine della camera:",
          error
        )
      );
  };
  return (
    <div className="h-full w-full overflow-auto flex flex-col justify-start items-start">
      <div className="h-[5rem] w-full flex justify-start items-center">
        <h1 className="text-[#0B76B7] text-xl font-bold ml-5">
          Riepilogo delle prenotazioni dell’utente
        </h1>
      </div>

      <table>
        <tr></tr>
      </table>
    </div>
  );
}

export default Prenotazioni;
