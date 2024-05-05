import React, { useEffect, useState } from "react";

function Card({
  nomeCamera,
  tipoCamera,
  postiLetto,
  prezzo,
  descrizione,
  nomeImmagineCamera,
}) {
  const [imgNewPath, setImgNewPath] = useState(nomeImmagineCamera);
  const [newDescrizione, setNewDescrizione] = useState(descrizione);

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

  return (
    <div className=" z-40 border-[1px] border-[#7E8794] cursor-pointer flex flex-col justify-start items-center w-[15rem] rounded-md hover:scale-[.95] transition-transform duration-300 ease-in-out ">
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
        <button
          type="button"
          className="bg-[#0B76B7] px-5 py-1 rounded-md text-white hover:scale-90 active:scale-105 transition-transform duration-300 ease-in-out "
        >
          Prenota subito
        </button>
      </div>
    </div>
  );
}

export default Card;