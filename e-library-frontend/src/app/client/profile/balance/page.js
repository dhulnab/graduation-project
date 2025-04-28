"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Cookies from "js-cookie";
import GoToLastPage from "@/components/pageTracker/GoToLastPage";
import { Skeleton } from "@/components/ui/skeleton";
import Loader from "@/components/loader/Loader";
import { set } from "date-fns";

function Balance() {
  const [cardNumber, setCardNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [finalLoading, setFinalLoading] = useState(false);
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
  });

  const handleChange = (e) => {
    const { value } = e.target;
    // Allow only numeric characters
    if (/^\d*$/.test(value)) {
      setCardNumber(value);
      // Check if the input length exceeds 16 digits
      if (value.length > 16) {
        setError("Card number cannot exceed 16 digits.");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Final validation before submission
    if (cardNumber.length !== 16) {
      setError("Card number must be exactly 16 digits.");
    } else {
      setError("");
      setFinalLoading(true);
      const token = Cookies.get("token");
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/update-balance`,
          {
            code: cardNumber,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          window.location.reload();
        }
      } catch (error) {
        setError("Invalid card number.");
        const status = error?.response?.status;
        if (status === 401) {
          window.location.href = "/auth/login";
        }
      } finally {
        setFinalLoading(false);
      }
      console.log("Card Number Submitted:", cardNumber);
    }
  };

  useEffect(() => {
    const getBalance = async () => {
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
        setAmount(response.data.user.balance);
      } catch (error) {
        const status = error?.response?.status;
        if (status === 401) {
          window.location.href = "/auth/login";
        }
      } finally {
        setLoading(false);
      }
    };
    getBalance();
  }, []);

  return (
    <div className="p-2 max-w-md mx-auto min-h-screen">
      <div className="w-full h-12 flex p-0 items-center border-b">
        <GoToLastPage />
        <h2 className="text-xl text-center font-light">Balance</h2>
      </div>
      <p className="p-2 text-xl font-light text-gray-700 flex items-center justify-center mt-6">
        Your Current Balance
      </p>
      {loading ? (
        <Skeleton className={"w-[60%] mx-auto h-8 my-1"} />
      ) : (
        <p className="mb-2 w-full flex items-center justify-center text-xl font-medium text-gray-800">
          {formatter.format(amount)}
          <span className="text-sm text-green-500 ml-2 relative -bottom-0.5 font-medium">
            IQD
          </span>
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <Input
          type="text"
          value={cardNumber}
          onChange={handleChange}
          maxLength={16}
          inputMode="numeric"
          pattern="\d{16}"
          placeholder="Enter 16-digit card number"
          className={`w-full h-12 rounded-lg p-2 text-gray-700 border ${
            error ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-green-400`}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button
          type="submit"
          className="w-full h-12 bg-green-400 text-white font-bold rounded-lg hover:bg-green-500 transition-colors"
          disabled={cardNumber.length !== 16}
        >
          {finalLoading && (
            <div className="relative left-[-12px]">
              <Loader className="" color="#fff" />
            </div>
          )}
          <p>Add Balance</p>
        </Button>
      </form>
    </div>
  );
}

export default Balance;
