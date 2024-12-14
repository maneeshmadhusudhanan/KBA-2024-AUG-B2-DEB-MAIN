/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginSubmit = async (e) => {
        e.preventDefault();
        const loginDetails = {
            email,
            password,
        };

        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginDetails),
        });
        console.log(res, "login res from /login");
        if (res.ok) {
            toast.success(`Logged in Sucessfully`);
            return navigate("/home");

        } else {
            toast.error(`Please check your credentials`);
            return navigate("/");
        }

    }
    return (
        <>
            <div className="bg-gray-100 flex items-center justify-center min-h-screen">

                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md ">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>
                    <form onSubmit={loginSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 mb-2">email</label>
                            <input type="text" id="email" name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                            <input type="password" id="password" name="password"
                                onChange={(e) => setPassword(e.target.value)}

                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Login</button>
                    </form>
                    <p className="mt-6 text-center text-gray-600">Dont have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a></p>
                </div>
            </div>

        </>)
}

const getUserType = () => {
    const authToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("Authtoken"))
      ?.split("=")[1];
    console.log("documemnt.cookie vslue", authToken);
  
    const decoded = jwtDecode(authToken);
    console.log("decoded", decoded);
return decoded
  };
  
  // eslint-disable-next-line react-refresh/only-export-components
  export {LoginPage as default, getUserType};