"use client";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axios from "axios";
import React, { useState } from "react";
import LoadingModal from "./loader/LoadingModal";
import { useGlobalStates } from "@/global";

function EmailVerificationForm({ user }) {
  const [otp, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { apiUrl } = useGlobalStates();

  const apiClient = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 30000,
  });

  const handleOTPChange = (value) => {
    setOTP(value);
    if (value.length === 6) {
      setTimeout(() => {
        checkOTP(value);
      }, 1000);
    }
  };

  const checkOTP = async (value) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post(apiUrl + "/email/verify", {
        email: user.email,
        otp: value,
      });

      console.log(response.data);
      const jwtToken = response.data.token;
      sessionStorage.setItem("token", jwtToken);
      if (sessionStorage.getItem("token")) {
        window.location.href = "/client";
      }
    } catch (error) {
      console.log("Error:", error);

      if (error.response) {
        setError(error.response.data.message || "Verification Failed.");
      } else {
        setError("Server error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-8 w-full max-w-[300px] mx-auto">
      {loading ? (
        <LoadingModal />
      ) : (
        <>
          {" "}
          <div className="flex justify-center h-12 mt-3">
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              onChange={handleOTPChange}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className={"h-12 focus:border-green-300 focus:ring-0"} />
                <InputOTPSlot index={1} className={"h-12 focus:border-green-300 focus:ring-0"} />
                <InputOTPSlot index={2} className={"h-12 focus:border-green-300 focus:ring-0"} />
                <InputOTPSlot index={3} className={"h-12 focus:border-green-300 focus:ring-0"} />
                <InputOTPSlot index={4} className={"h-12 focus:border-green-300 focus:ring-0"} />
                <InputOTPSlot index={5} className={"h-12 focus:border-green-300 focus:ring-0"} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
          <p className="mt-4 text-secondary text-xs text-center">
            Please enter the 6-digit code sent to
            <br />
            your email
          </p>
        </>
      )}
    </div>
  );
}

export default EmailVerificationForm;
