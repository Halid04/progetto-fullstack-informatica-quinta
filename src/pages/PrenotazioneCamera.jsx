import React from "react";
import { useParams } from "react-router-dom";

function PrenotazioneCamera() {
  const { numeroCamera } = useParams();

  return (
    <div className="h-[100vh] w-full bg-white flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-[#0B76B7]">
        Prenotazione Camera {numeroCamera}
      </h1>
    </div>
  );
}

export default PrenotazioneCamera;
