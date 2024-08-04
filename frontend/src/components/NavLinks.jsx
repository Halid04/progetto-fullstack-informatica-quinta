import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

function NavLinks() {
  const [isLogged, setIsLogged] = useState(localStorage.getItem("isLogged"));
  const [utenteIsAdmin, setUtenteIsAdmin] = useState(
    localStorage.getItem("isAdmin")
  );
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleMenuButtonClick = (event) => {
    event.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuClose = () => {
    setIsDropdownOpen(false);
  };

  const handleNavigateToAccount = () => {
    if (utenteIsAdmin) {
      navigate("/account-admin");
    } else {
      navigate("/account-cliente");
    }

    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <NavLink
        to="/camere"
        className="text-[#808080] relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-[#0B76B7] after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
      >
        Camere
      </NavLink>
      <NavLink
        to={isLogged ? "/prenotazioni" : "/not-logged"}
        className="text-[#808080] relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-[#0B76B7] after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
      >
        Prenotazioni
      </NavLink>
      {/* <NavLink
        to="/"
        className="text-[#808080] relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-[#0B76B7] after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
      >
        Contatti
      </NavLink> */}

      {isLogged ? (
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex w-full justify-center items-center gap-x-1.5 bg-[#0B76B7] px-5 py-1 rounded-md text-white hover:bg-[#085e93] transition-colors duration-300 ease-in-out"
              id="menu-button"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              onClick={handleMenuButtonClick}
              // onBlur={handleMenuClose}
            >
              {localStorage.getItem("userName")}
              <ChevronDown className="-mr-1 h-5 w-5" />
            </button>
          </div>

          {/* <!-- Dropdown menu --> */}
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="py-1" role="none">
                <button
                  type="button"
                  className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  role="menuitem"
                  tabIndex="-1"
                  onClick={handleNavigateToAccount}
                >
                  Impostazioni profilo
                </button>
                <button
                  type="button"
                  className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  role="menuitem"
                  tabIndex="-1"
                  onClick={handleLogout}
                >
                  Disconnessione
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <NavLink to="/login" className="text-[#808080]">
          <button
            type="button"
            className="bg-[#0B76B7] px-5 py-1 rounded-md text-white hover:scale-90 active:scale-105 transition-transform duration-300 ease-in-out "
          >
            Account
          </button>
        </NavLink>
      )}
    </>
  );
}

export default NavLinks;
