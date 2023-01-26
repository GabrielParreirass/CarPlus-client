import React from "react";

const Header = () => {
  return (
    <nav className="flex justify-between p-5 bg-indigo-600 rounded-b-xl">
      <ul className=" hidden  sm:flex ml-10 text-white font-semibold sm:w-1/3 justify-around text-lg">
        <li className="cursor-pointer duration-300  hover:text-slate-300">
          Sobre nós
        </li>
        <li className="cursor-pointer duration-300  hover:text-slate-300">
          Suporte
        </li>
      </ul>
      <h2 className="mr-10 text-2xl text-white">CarPlus+</h2>
    </nav>
  );
};


export default Header;
