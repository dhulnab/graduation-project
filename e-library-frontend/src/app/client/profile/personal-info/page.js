"use client";
import GoToLastPage from "@/components/pageTracker/GoToLastPage";

import UpdateForm from "@/components/UpdateForm";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

function PersonalInfo() {
  const [loading, setLoading] = useState(false);
  const [finalLoading, setFinalLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  let step = 1;

  useEffect(() => {
    const user = async () => {
      setLoading(true);
      const token = Cookies.get("token");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserInfo(response.data.user);
        setUpdatedUser(response.data.user);
      } catch (error) {
        const statusCode = error?.response?.status;
        if (statusCode === 401) {
          window.location.href = "/auth/login";
        }
      } finally {
        setLoading(false);
      }
    };
    user();
  }, []);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/update-user`,
        {
          email: userInfo.email,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        step = 2;
      }
    } catch (error) {
      const statusCode = error?.response?.status;
      if (statusCode === 401) {
        window.location.href = "/auth/login";
      }
    } finally {
      setLoading(false);
    }
  };
  const handleOTPChange = (value) => {
    setOTP(value);
    if (value.length === 6) {
      setTimeout(() => {
        checkOTP(value);
      }, 1000);
    }
  };
  // const checkOTP = async () => {
  //   setFinalLoading(true);
  //   try {
  //     const response = await axios.put(
  //       `${apiUrl}/verify-update-user`,
  //       {
  //         email: updatedUser.email,

  //       }
  // };

  return (
    <div>
      <div className="flex items-center py-2">
        <GoToLastPage />
        <p className="font-light ml-1 text-lg">Personal information</p>
      </div>
      {step === 1 ? (
        <UpdateForm
          updatedUser={updatedUser}
          setUpdatedUser={setUpdatedUser}
          loading={loading}
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 mt-8 w-full max-w-[300px] mx-auto">
          {loading ? (
            <LoadingModal />
          ) : (
            <>
              <div className="flex justify-center mt-4">
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  onChange={handleOTPChange}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
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
      )}

      {step === 1 && (
        <div className="h-16 w-full p-2 mt-1">
          {/* <button
            disabled={
              loading ||
              !updatedUser?.name?.trim() ||
              !updatedUser?.email?.trim() ||
              (updatedUser?.name.trim() === userInfo?.name &&
                updatedUser?.email.trim() === userInfo?.email)
            }
            className={`w-full h-full bg-green-500 rounded-lg text-white font-semibold ${
              loading ||
              !updatedUser?.name?.trim() ||
              !updatedUser?.email?.trim() ||
              (updatedUser?.name.trim() === userInfo?.name &&
                updatedUser?.email.trim() === userInfo?.email)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={() => handleClick()}
          >
            Update
          </button> */}
        </div>
      )}
    </div>
  );
}

export default PersonalInfo;
