import React from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";

function Header() {
  return (
    <header className="bg-white text-black sticky shadow-md top-0 flex-wrap z-[100] mx-auto flex w-full items-center justify-between p-4">
      <Logo />
      <Navbar />
    </header>
  );
}

export default Header;
