import React from "react";
import { Link } from "react-router-dom";
import kbalogo from "../assets/images/kbalogo.png";
import getUserType from "../utils/Auth";
import Logout from "./Logout";

const Navbar = () => {
  const userType = getUserType();
  return (
    <div classNameName="bg-purple-100 text-purple-950 grid grid-cols-1 md:grid-cols-2 p-3 shadow-md">
      <div classNameName="flex items-center">
        <Link to="/">
          <img classNameName="m-1p-2 size-12" src={kbalogo} alt="logo" />
        </Link>
      </div>
      <div classNameName="flex justify-center md:justify-end items-center mt-2 md:mt-0 space-x-5 md:space-x-10">
        <Link to="/" classNameName="ml-20">
          Home
        </Link>
        <Link to="/courses" classNameName="ml-20">
          Courses
        </Link>
        <Link to="/contact" classNameName="ml-20">
          Contact Us
        </Link>
        {userType === "admin" && (
          <Link to="/add-course" classNameName="ml-20">
            Add Course
          </Link>
        )}
        <Logout />
      </div>
    </div>
  );
};

export default Navbar;
