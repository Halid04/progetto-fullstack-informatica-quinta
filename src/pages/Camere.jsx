import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { ListFilter } from "lucide-react";
import { Dialog } from "primereact/dialog";

function Camere() {
  const [camere, setCamere] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        <button
          onClick={() => setIsDialogOpen(true)}
          className="border-none outline-none flex justify-center items-center gap-1 ml-5"
        >
          <ListFilter color="#7E8794" />
          <span className="font-bold text-[#7E8794]">Filtri</span>
        </button>
        <Dialog
          visible={isDialogOpen}
          className="w-[40vw] h-[50vh] flex flex-col justify-center items-center bg-white shadow-[0px_0px_10px_6px_#00000024] rounded-md px-5"
          onHide={() => setIsDialogOpen}
        >
          <form className="w-full" action="" method="post">
            <div className="w-full flex justify-between items-center">
              <p className="w-[40%] font-bold">Tipo camera:</p>
              <div className="w-[60%] flex justify-start items-center gap-7">
                <div className="flex justify-center items-center gap-2">
                  <input
                    type="checkbox"
                    id="singola"
                    name="singola"
                    value="1"
                  />
                  <label for="singola">Singola</label>
                </div>

                <div className="flex justify-center items-center gap-2">
                  <input type="checkbox" id="doppia" name="doppia" value="1" />
                  <label for="doppia">Doppia</label>
                </div>

                <div className="flex justify-center items-center gap-2">
                  <input type="checkbox" id="suite" name="suite" value="1" />
                  <label for="suite">Suite</label>
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
                  min={1}
                  max={7}
                />
              </div>
            </div>

            <button type="button" onClick={() => setIsDialogOpen(false)}>
              Chiudi
            </button>
          </form>
        </Dialog>
      </div>
      <div className="h-[85%] ml-5 w-full flex items-start justify-start flex-wrap gap-x-20 gap-y-3">
        {camere.map((camera) => (
          <Card
            key={camera.numeroCamera}
            nomeCamera={camera.nomeCamera}
            tipoCamera={camera.tipoCamera}
            postiLetto={`${camera.postiLetto} letto`}
            prezzo={`${camera.prezzo}€/N`}
            descrizione={camera.descrizione}
            nomeImmagineCamera={camera.nomeImmagineCamera}
          />
        ))}
      </div>
    </div>
  );
}

export default Camere;
