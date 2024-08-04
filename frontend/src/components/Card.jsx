import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Card({
  nomeCamera,
  tipoCamera,
  postiLetto,
  prezzo,
  descrizione,
  nomeImmagineCamera,
  numeroCamera,
}) {
  const [imgNewPath, setImgNewPath] = useState(nomeImmagineCamera);
  const [newDescrizione, setNewDescrizione] = useState(descrizione);
  const [isLogged, setIsLogged] = useState(localStorage.getItem("isLogged"));
  const navigate = useNavigate();

  useEffect(() => {
    const stringWithoutNumbers = nomeImmagineCamera.replace(/\d+/g, "");
    setImgNewPath(stringWithoutNumbers);

    if (descrizione.length > 70) {
      const lastSpaceIndex = descrizione.lastIndexOf(" ", 70);
      const newDescrizione =
        lastSpaceIndex === -1
          ? descrizione.slice(0, 70)
          : descrizione.slice(0, lastSpaceIndex);
      setNewDescrizione(newDescrizione + "...");
    } else {
      setNewDescrizione(descrizione);
    }
  }, [nomeImmagineCamera]);

  const handleNavigateToPrenotazioneCamera = (numeroCamera) => {
    if (isLogged) {
      navigate(`/prenotazione-camera/${numeroCamera}`);
    } else {
      navigate("/not-logged");
    }
  };

  return (
    <div
      onClick={() => handleNavigateToPrenotazioneCamera(numeroCamera)}
      className=" z-40 border-[1px] border-[#7E8794] cursor-pointer flex flex-col justify-start items-center w-[15rem] rounded-md hover:scale-[.95] transition-transform duration-300 ease-in-out "
    >
      <img
        src={`src/progettoInfoImage/${imgNewPath.trim()}/${nomeImmagineCamera.trim()}.jpg`}
        className="rounded-t-md w-full h-[10rem] object-cover"
        loading="lazy"
        alt={nomeImmagineCamera.trim()}
      />

      <div className="p-2 px flex flex-col justify-center items-start gap-2">
        <p className=" text-xl font-bold text-[#0B76B7]">{nomeCamera}</p>
        <p>
          {tipoCamera} - {postiLetto} -{" "}
          <span className="font-bold text-[#0B76B7]">{prezzo}</span>
        </p>
        <p>{newDescrizione}</p>
      </div>
    </div>
  );
}

export default Card;
