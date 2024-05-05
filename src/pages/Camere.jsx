import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { ListFilter } from "lucide-react";

function Camere() {
  const [camere, setCamere] = useState([]);

  useEffect(() => {
    fetch("http://localhost/progetto-fullstack-informatica-quinta/camere.php")
      .then((response) => response.json())
      .then((data) => setCamere(data))
      .catch((error) =>
        console.error("Errore durante il recupero delle camere:", error)
      );
  }, []);

  return (
    <div className="h-full w-full">
      <div className="h-[15%] w-full flex justify-start items-center">
        <button className="border-none outline-none flex justify-center items-center gap-1 ml-5">
          <ListFilter color="#7E8794" />
          <span className="font-bold text-[#7E8794]">Filtri</span>
        </button>
      </div>
      <div className="h-[85%] ml-5 w-full flex items-start justify-start flex-wrap gap-x-20 gap-y-3">
        {camere.map((camera) => (
          <Card
            key={camera.numeroCamera}
            nomeCamera={camera.nomeCamera}
            tipoCamera={camera.tipoCamera}
            postiLetto={`${camera.postiLetto} letto`}
            prezzo={`${camera.prezzo}$/N`}
            descrizione={camera.descrizione}
            nomeImmagineCamera={camera.nomeImmagineCamera}
          />
        ))}
      </div>
    </div>
  );
}

export default Camere;
