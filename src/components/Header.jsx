import React from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";

function Header() {
  return (
    <header className="bg-white text-black sticky top-0 flex-wrap z-[20] mx-auto flex w-full items-center justify-between p-4">
      <Logo />
      <Navbar />
    </header>
  );
}

export default Header;
