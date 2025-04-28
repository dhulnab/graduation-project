// src/app/auth/login/page.js
"use client";

import Loader from "@/components/loader/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalStates } from "@/global";
import Cookies from "js-cookie";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // On mount, check if token exists and if it is still valid.
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      axios
        .get(`${process.env.NEXT_PUBLIC_URL}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // If valid, redirect to the client page.
          if (res.status === 200) {
            window.location.href = "/client";
          }
        })
        .catch((err) => {
          // If invalid, remove the token from cookies.
          Cookies.remove("token");
        });
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      email: user.email,
      password: user.password,
    };

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/login`, payload);
      const jwtToken = response.data.token;

      // Store token in cookies (expires in 7 days)
      Cookies.set("token", jwtToken, { path: "/", expires: 7 });

      // Redirect after successful login
      window.location.href = "/client";
    } catch (error) {
      setError(error.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#00AE93] min-h-screen w-full flex flex-col justify-center items-center p-4">
      <div className="flex justify-center items-center gap-2 ">
        <div className="flex justify-center items-center relative bottom-1.5">
          <Image src="/logo.svg" alt="logo" width={85} height={85} />
        </div>
        <div>
          <h1 className="text-secondary font-extrabold text-2xl text-center">
            Al-NAHRAIN
          </h1>
          <h1 className="text-secondary font-extrabold tracking-widest text-3xl text-center">
            LIBRARY
          </h1>
        </div>
      </div>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 mt-8 w-full max-w-[300px]"
      >
        <Input
          type="email"
          placeholder="Email"
          className="w-full mb-2 placeholder:text-white placeholder:opacity-50 text-white"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <Input
          type="password"
          placeholder="Password"
          minLength="8"
          className="w-full mb-2 placeholder:text-white placeholder:opacity-50 text-white focus:shadow-none"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <Button
          disabled={loading || !user.email || !user.password}
          type="submit"
          className="flex items-center justify-center w-full h-12 font-bold focus:opacity-100 focus:bg-white active:scale-90 border-none outline-none ring-0 text-[#00AE93] text-lg bg-white mt-4 transition-colors duration-300 ease-in-out"
        >
          <div className="relative left-[-20px]">
            {loading && <Loader color="#00ff00" />}
          </div>
          <div>{loading ? "Processing..." : "LOGIN"}</div>
        </Button>
      </form>
      {error && <p className="text-white text-center mt-4 text-sm">{error}</p>}
      <p className="text-white text-center mt-4 text-[12px]">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="underline font-semibold">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Login;
