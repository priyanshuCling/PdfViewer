// src/Navbar.js
import React from "react";
import avt_img from "../assets/avt_img.jpg";

const Navbar = () => {
  return (
    <div className="flex justify-end items-center p-5 bg-gray-800 text-white fixed w-full ">
      <div className="text-xl pr-1">Admin</div>
      <div>
        <img src={avt_img} alt="avatar" className="rounded-full w-10 h-10" />
      </div>
    </div>
  );
};

export default Navbar;
