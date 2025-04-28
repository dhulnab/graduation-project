"use client";
import EmailVerificationForm from "@/components/EmailVerificationForm";
import SignupForm from "@/components/SignupForm";
import Image from "next/image";
import React, { useState } from "react";

function Signup() {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [step, setStep] = useState(1);

  return (
    <div className="bg-[#00AE93] min-h-screen w-full flex flex-col justify-center p-4">
      <div className="flex justify-center items-center gap-2">
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
      {step === 1 && (
        <SignupForm
          newUser={newUser}
          setNewUser={setNewUser}
          setStep={setStep}
        />
      )}
      {step === 2 && <EmailVerificationForm user={newUser} />}
    </div>
  );
}

export default Signup;
