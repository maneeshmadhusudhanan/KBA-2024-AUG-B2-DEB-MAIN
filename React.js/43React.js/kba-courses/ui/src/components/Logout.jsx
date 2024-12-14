import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("/logout", {
      method: "GET",
      credentials: "include",
    });
    document.cookie = "Authtoken=; Max-Age=0";
    navigate("/");
  };

  return (
    <>
      <button
        onClick={handleLogout}
        classNameName="text-purple-700 hover:underline"
      >
        LOGOUT
      </button>
    </>
  );
};

export default Logout;
