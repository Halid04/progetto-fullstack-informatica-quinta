import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <div className="flex justify-center items-baseline">
        <h1 className=" text-4xl font-bold text-[#0B76B7]">Halid</h1>
        <p className=" text-lg font-bold text-[#CED4DA]">&co</p>
      </div>
    </Link>
  );
}

export default Logo;
