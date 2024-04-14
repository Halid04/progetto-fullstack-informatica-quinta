import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import NavLinks from "./NavLinks";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const color = "#0B76B7";

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="w-1/3 flex justify-end">
        <div className="hidden justify-center gap-5 items-center text-lg md:flex">
          <NavLinks />
        </div>
        <div>
          <button type="button" onClick={toggleNavbar} className="md:hidden">
            {isOpen ? <X color={color} /> : <Menu color={color} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-2 items-center basis-full md:hidden py-2 ">
          <NavLinks />
        </div>
      )}
    </>
  );
}

export default Navbar;
