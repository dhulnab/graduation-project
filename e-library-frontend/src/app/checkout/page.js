"use client";
import Header from "@/components/Header";
import Loader from "@/components/loader/Loader";
import SuccessModal from "@/components/SuccessModal";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalStates } from "@/global";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function Checkout() {
  const router = useRouter();
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Client-only state variables
  const [book, setBook] = useState(null);
  const [bookType, setBookType] = useState(null);
  const [token, setToken] = useState(null);
  const [hasHydrated, setHasHydrated] = useState(false);

  // Other component states
  const [loading, setLoading] = useState(false);
  const [finalLoading, setFinalLoading] = useState(false);
  const [details, setDetails] = useState({});
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  // Load browser-only values after the component mounts
  useEffect(() => {
    const storedBook = localStorage.getItem("book");
    const parsedBook = storedBook ? JSON.parse(storedBook) : null;
    const storedBookType = localStorage.getItem("bookType");
    const storedToken = Cookies.get("token");

    setBook(parsedBook);
    setBookType(storedBookType);
    setToken(storedToken);
    setHasHydrated(true); // Mark hydration complete
  }, []);

  // Redirect if the required data isn't available once hydration is complete
  useEffect(() => {
    if (hasHydrated && (!book || !bookType)) {
      const lastVisited = localStorage.getItem("lastVisitedPage") || "/client";
      router.push(lastVisited);
    }
  }, [hasHydrated, book, bookType, router]);

  // Fetch checkout details once book and token are available
  useEffect(() => {
    if (book && token) {
      const fetchDetails = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_URL}/book/checkout/${book.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setDetails({
            ...response.data.data,
            success: response.data.data.success,
          });
        } catch (error) {
          const statusCode = error?.response?.status;
          if (statusCode === 401) {
            window.location.href = "/auth/login";
          }
        } finally {
          setLoading(false);
        }
      };
      fetchDetails();
    }
  }, [book, token]);

  const handleCheckout = async () => {
    setFinalLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/book/purchase-hard-copy/${details?.sold_copy_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setOpenSuccessModal(true);
      }
    } catch (error) {
      const statusCode = error?.response?.status;
      if (statusCode === 401) {
        window.location.href = "/auth/login";
      }
    } finally {
      setFinalLoading(false);
    }
  };

  // Render a fallback until all client data is available
  if (!hasHydrated || !book || !bookType || !token) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {openSuccessModal && (
        <SuccessModal
          open={openSuccessModal}
          setOpen={setOpenSuccessModal}
          details={details}
        />
      )}
      <div className="w-full px-2">
        <Header notification={false} title={["Checkout", "last step to buy"]} />
      </div>
      <div className="w-full px-2 mb-6">
        <div className="w-full aspect-[3/2] p-2 rounded-xl border flex justify-between">
          <div className="relative h-full aspect-[2/3] overflow-hidden rounded-lg bg-slate-100">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMG_URL}${book?.cover}`}
              alt={book?.title || "alt"}
              fill
              className="object-cover"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-between m-w-[180px]">
            <p className="text-xl font-bold truncate">{book?.title}</p>
            <p className="text-md font-medium text-zinc-600 truncate">
              {book?.author}
            </p>
            <p className="text-md font-medium text-zinc-600 truncate">
              {book?.first_category?.name}
            </p>
            <p className="text-md font-medium text-zinc-600 truncate">
              {book?.publisher}
            </p>
            <p className="text-md font-medium text-zinc-600 truncate">
              {book?.published_year}
            </p>
            <p className="text-md font-medium text-zinc-600 truncate">
              {book?.isbn}
            </p>
            <p className="text-md font-medium text-zinc-600 truncate">
              {bookType === "hard-copy"
                ? `${formatter.format(book?.hard_copy_price)} IQD`
                : bookType === "e-copy"
                ? `${formatter.format(book?.electronic_copy_price)} IQD`
                : null}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full min-h-screen rounded-t-2xl bg-gray-100">
        <h1 className="text-xl font-light pt-4 px-4">Copy Details</h1>
        <div className="w-full p-4 grid grid-cols-2">
          <p className="font-light text-base text-zinc-600">Copy Type</p>
          <p className="text-right text-base text-zinc-600 capitalize">
            {bookType}
          </p>
          <p className="font-light text-base text-zinc-600">Copy ID</p>
          {loading ? (
            <Skeleton className="w-full h-3 rounded-full my-1" />
          ) : (
            <p className="text-right text-base text-zinc-600">
              {details?.sold_copy_id}
            </p>
          )}
          <p className="font-light text-base text-zinc-600">Copy Condition</p>
          {loading ? (
            <Skeleton className="w-full h-3 rounded-full my-1" />
          ) : (
            <p className="text-right text-base capitalize text-zinc-600">
              {details?.copy_condition}
            </p>
          )}
          <p className="font-light text-base text-zinc-600">Copy Serial</p>
          {loading ? (
            <Skeleton className="w-full h-3 rounded-full my-1" />
          ) : (
            <p className="text-right text-base text-zinc-600">
              {details?.copy_serial_number}
            </p>
          )}
          <p className="font-light text-base text-zinc-600">Your balance</p>
          {loading ? (
            <Skeleton className="w-full h-3 rounded-full my-1" />
          ) : (
            <p className="text-right text-base text-zinc-600">
              <p className="text-right text-base text-zinc-600">
                {details?.user_balance >= details?.amount
                  ? formatter.format(details?.user_balance) + " IQD"
                  : "Insufficient Balance"}
              </p>
            </p>
          )}
          <p className="font-light text-base text-zinc-600">Total Price</p>
          {loading ? (
            <Skeleton className="w-full h-3 rounded-full my-1" />
          ) : (
            <p className="text-right text-base text-zinc-600">
              {formatter.format(details?.amount)} IQD
            </p>
          )}
        </div>
        <div className="fixed bottom-0 right-0 left-0 w-full bg-transparent h-24 flex items-center justify-center p-4">
          {loading ? (
            <Skeleton className="w-full h-12 rounded-xl" />
          ) : (
            <button
              onClick={handleCheckout}
              className={`w-full bg-green-500 text-white h-12 rounded-xl active:scale-95 font-bold transition-all flex items-center justify-center ${
                finalLoading
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-pointer"
              }`}
            >
              {finalLoading && (
                <div className="relative -left-6">
                  <Loader color="#fff" />
                </div>
              )}
              <p>Done</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
