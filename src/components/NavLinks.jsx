import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function NavLinks() {
  return (
    <>
      <NavLink
        to="/"
        className="text-[#808080] relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-[#0B76B7] after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
      >
        Camere
      </NavLink>
      <NavLink
        to="/"
        className="text-[#808080] relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-[#0B76B7] after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
      >
        Prenotazioni
      </NavLink>
      <NavLink
        to="/"
        className="text-[#808080] relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-[#0B76B7] after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
      >
        Contatti
      </NavLink>
      <NavLink to="/login" className="text-[#808080]">
        <button
          type="button"
          className="bg-[#0B76B7] px-5 py-1 rounded-md text-white hover:scale-90 active:scale-105 transition-transform duration-300 ease-in-out "
        >
          Account
        </button>
      </NavLink>
    </>
  );
}

export default NavLinks;
