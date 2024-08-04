import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import homePageBgImage from "../assets/homePageBgImage.jpg";
import { MoveRight } from "lucide-react";

function Home() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), url(${homePageBgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
      className="h-full text-black flex flex-col justify-center items-center gap-2 px-1 md:px-0"
    >
      <h1 className="text-7xl md:text-8xl text-[#0074CC] font-bold">
        Halid&co
      </h1>
      <p className="text-lg text-center md:text-xl text-[#F1F6FE] font-bold">
        Esperienza unica, comfort senza paragoni: Benvenuti da Halid&Co B&B!
      </p>
      <button
        type="button"
        onClick={() => navigate("/camere")}
        className="flex justify-center items-center gap-1 bg-[#0B76B7] px-5 py-1 rounded-md text-white hover:scale-90 active:scale-105 transition-transform duration-300 ease-in-out"
      >
        <p className="md:text-lg">Vedere camere</p>
        <MoveRight color="white" />
      </button>
    </div>
  );
}

export default Home;
