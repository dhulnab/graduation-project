"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import axios from "axios";
import Loader from "./loader/Loader";
import { useGlobalStates } from "@/global";

const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

function SignupForm({ newUser, setNewUser, setStep }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { apiUrl } = useGlobalStates();

  const requestOTP = async (e) => {
    e.preventDefault();

    // Centralized password check
    if (newUser.password !== newUser.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      };

      const response = await apiClient.post(apiUrl + "/signup", payload);
      console.log("Success:", response.data);
      setStep(2);
    } catch (error) {
      console.log("Error:", error);

      if (error.response?.status === 400) {
        setError(error.response.data.message || "Invalid Email or Password.");
      } else if (error.response) {
        setError(error.response.data.message || "Signup failed.");
      } else if (error.request) {
        setError("No response from server. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={requestOTP}
        className="flex flex-col gap-4 mt-8 w-full max-w-[300px] mx-auto"
      >
        <Input
          type="text"
          placeholder="Name"
          className="w-full mb-2 placeholder:text-white placeholder:opacity-50 text-white"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <Input
          type="email"
          placeholder="Email"
          className="w-full mb-2 placeholder:text-white placeholder:opacity-50 text-white"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <Input
          type="password"
          placeholder="Password"
          minLength="8"
          className={`w-full mb-2 ${
            error ? "border-red-500" : ""
          } placeholder:text-white placeholder:opacity-50 text-white`}
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          minLength="8"
          className={`w-full mb-2 ${
            error ? "border-red-500" : ""
          } placeholder:text-white placeholder:opacity-50 text-white`}
          value={newUser.confirmPassword}
          onChange={(e) =>
            setNewUser({ ...newUser, confirmPassword: e.target.value })
          }
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <Button
          disabled={
            loading ||
            error ||
            !newUser.name ||
            !newUser.email ||
            !newUser.password ||
            !newUser.confirmPassword ||
            newUser.password !== newUser.confirmPassword
          }
          type="submit"
          className="flex items-center justify-center w-full h-12 font-bold focus:bg-white active:scale-90 border-none outline-none ring-0 text-[#00AE93] text-lg bg-white mt-4 transition-colors duration-300 ease-in-out"
        >
          <div className="relative left-[-20px]">{loading && <Loader color="#00ff00"/>}</div>
          <div>{loading ? "Processing..." : "SIGNUP"}</div>
        </Button>
      </form>
      <p className="text-white text-center mt-4 text-[12px]">
        Already have an account?{" "}
        <Link href="/auth/login" className="underline font-semibold">
          Login
        </Link>
      </p>
    </>
  );
}

export default SignupForm;
