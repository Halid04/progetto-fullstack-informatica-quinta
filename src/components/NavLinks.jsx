import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";

function NavLinks() {
  const [isLogged, setIsLogged] = useState(localStorage.getItem("isLogged"));
  // Funzione per stampare i dati del localStorage nella console
  const printLocalStorageData = () => {
    console.log("Dati nel localStorage:");
    console.log("userId:", localStorage.getItem("userId"));
    console.log("userName:", localStorage.getItem("userName"));
    console.log("userSurname:", localStorage.getItem("userSurname"));
    console.log("isAdmin:", localStorage.getItem("isAdmin"));
    console.log("isLogged:", localStorage.getItem("isLogged"));
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMenuButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuItemClick = () => {
    setIsDropdownOpen(false);
  };

  const handleMenuClose = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLogged(localStorage.getItem("isLogged"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [localStorage.getItem("isLogged")]);

  // useEffect(() => {
  //   setIsLogged(localStorage.getItem("isLogged"));
  // }, [localStorage.getItem("isLogged")]);

  return (
    <>
      <NavLink
        to="/camere"
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

      {!isLogged ? (
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex w-full justify-center items-center gap-x-1.5 bg-[#0B76B7] px-5 py-1 rounded-md text-white hover:bg-[#085e93] transition-colors duration-300 ease-in-out"
              id="menu-button"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              onClick={handleMenuButtonClick}
              onBlur={handleMenuClose}
            >
              Halid
              <ChevronDown className="-mr-1 h-5 w-5" />
            </button>
          </div>

          {/* <!-- Dropdown menu --> */}
          {isDropdownOpen && (
            <div
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              onBlur={handleMenuClose}
            >
              <div className="py-1" role="none">
                <a
                  href="#"
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                  role="menuitem"
                  tabIndex="-1"
                  onClick={handleMenuItemClick}
                >
                  Impostazioni profilo
                </a>
                <form method="POST" action="#" role="none">
                  <button
                    type="submit"
                    className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                    role="menuitem"
                    tabIndex="-1"
                    onClick={handleMenuItemClick}
                  >
                    Disconnessione
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        <NavLink to="/login" className="text-[#808080]">
          <button
            type="button"
            className="bg-[#0B76B7] px-5 py-1 rounded-md text-white hover:scale-90 active:scale-105 transition-transform duration-300 ease-in-out "
            onClick={printLocalStorageData} // Chiamata alla funzione per stampare i dati del localStorage
          >
            Account
          </button>
        </NavLink>
      )}
    </>
  );
}

export default NavLinks;
