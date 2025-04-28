"use client";
import GoToLastPage from "@/components/pageTracker/GoToLastPage";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalStates } from "@/global";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import BuyModal from "@/components/BuyModal";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";

function Book({ params }) {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const unwrappedParams = React.use(params);
  const book_id = unwrappedParams.id;
  const [loading, setLoading] = useState(false);
  const [fetchedBook, setFetchedBook] = useState({});
  const [open, setOpen] = useState(false);
  const [haveCopies, setHaveCopies] = useState({
    sellCopies: false,
    borrowCopies: false,
  });
  const { setBook } = useGlobalStates();

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      const token = Cookies.get("token");
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/book/${book_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const haveCopiesReq = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/book/check/${book_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        let check = haveCopiesReq.data.data;

        setHaveCopies({
          sellCopies: check.have_sell_copies != 0,
          borrowCopies: check.have_borrow_copies != 0,
        });
        console.log(response.data.data);
        setFetchedBook(response.data.data);
      } catch (error) {
        const statusCode = error?.response?.status;
        if (statusCode === 401) {
          window.location.href = "/auth/login";
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [book_id]);
  console.log(haveCopies);

  return (
    <div className="py-2">
      {open && <BuyModal open={open} setOpen={setOpen} book={fetchedBook} />}
      <div className="flex max-w-[500px] mx-auto items-center gap-1 pt-2 pb-0 ">
        <GoToLastPage />
        <p className="font-light text-xl opacity-80 capitalize">
          {"book Info"}
        </p>
      </div>
      <div className="pt-4 px-2 max-w-[500px] mx-auto min-h-screen">
        <div className="w-full h-[250px] p-0.5 overflow-hidden flex items-start  gap-2">
          {loading ? (
            <Skeleton
              className={"h-full rounded overflow-hidden  aspect-[2/3] "}
            />
          ) : (
            <div className="h-full shadow-sm rounded overflow-hidden relative aspect-[2/3] bg-slate-300">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMG_URL}${fetchedBook.cover}`}
                alt={fetchedBook.title || "book cover"}
                className="object-cover"
                fill
              />
            </div>
          )}
          <div className="flex-1 flex items-start justify-between flex-col gap-1.5">
            {loading ? (
              <Skeleton className="w-[100px] h-6 mb-1 rounded-lg" />
            ) : (
              <p className="font-semibold text-xl capitalize opacity-80 leading-none">
                {fetchedBook.title}
              </p>
            )}
            {loading ? (
              <Skeleton className="w-[80px] h-5 mb-1 rounded-lg" />
            ) : (
              <p className="font-medium text-base capitalize opacity-60 leading-none py-1">
                {fetchedBook.author}
              </p>
            )}
            {loading ? (
              <Skeleton className="w-[50px] h-3 mb-1 rounded-lg" />
            ) : (
              <p className="font-medium text-xs capitalize opacity-60 leading-none">
                {fetchedBook.publisher}
              </p>
            )}
            {loading ? (
              <Skeleton className="w-[30px] h-3 mb-1 rounded-lg" />
            ) : (
              <p className="font-semibold text-xs capitalize opacity-60 leading-none pb-1">
                {fetchedBook.published_year}
              </p>
            )}
            {loading ? (
              <div className="flex flex-col items-center my-1 justify-start gap-1 flex-wrap">
                <Skeleton className="w-[70px] h-4  rounded-lg" />
                <Skeleton className="w-[70px] h-4  rounded-lg" />
                <Skeleton className="w-[70px] h-4  rounded-lg" />
              </div>
            ) : (
              <div className="flex flex-col items-start my-1 justify-start gap-1 flex-wrap">
                <p className="px-2 rounded bg-green-100 text-green-500 text-xs font-semibold capitalize opacity-60 whitespace-nowrap">
                  {fetchedBook.first_category?.name}
                </p>
                <p className="px-2 rounded bg-green-100 text-green-500 text-xs font-semibold capitalize opacity-60 whitespace-nowrap">
                  {fetchedBook.second_category?.name}
                </p>
                <p className="px-2 rounded bg-green-100 text-green-500 text-xs font-semibold capitalize opacity-60 whitespace-nowrap">
                  {fetchedBook.third_category?.name}
                </p>
              </div>
            )}
            {loading ? (
              <Skeleton className="w-[50px] h-3 my-1 rounded-lg" />
            ) : (
              <p className="font-medium leading-none text-sm mt-0 capitalize opacity-60">
                {fetchedBook.language}
              </p>
            )}
            {loading ? (
              <Skeleton className="w-[90px] h-4 my-1 rounded-lg" />
            ) : (
              <p
                className={`font-medium text-sm capitalize ${
                  fetchedBook.electronic_available
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {fetchedBook.electronic_available
                  ? "Digitally available"
                  : "Digitally Unavailable"}
              </p>
            )}
            {loading ? (
              <Skeleton className="w-[99px] h-4 my-1 rounded-lg" />
            ) : (
              <p className="font-medium text-sm capitalize opacity-60">
                {fetchedBook.isbn}
              </p>
            )}
          </div>
        </div>
        {loading ? (
          <div className="flex mt-4 flex-col">
            <Skeleton className="w-[90%] h-3 my-1 rounded-full" />
            <Skeleton className="w-full h-3 my-1 rounded-full" />
            <Skeleton className="w-[95%] h-3 my-1 rounded-full" />
            <Skeleton className="w-[90%] h-3 my-1 rounded-full" />
            <Skeleton className="w-[60%] h-3 my-1 rounded-full" />
            <Skeleton className="w-[99%] h-3 my-1 rounded-full" />
            <Skeleton className="w-[90%] h-3 my-1 rounded-full" />
            <Skeleton className="w-[90%] h-3 my-1 rounded-full" />
            <Skeleton className="w-[100%] h-3 my-1 rounded-full" />
            <Skeleton className="w-[90%] h-3 my-1 rounded-full" />
            <Skeleton className="w-[100%] h-3 my-1 rounded-full" />
            <Skeleton className="w-[91%] h-3 my-1 rounded-full" />
            <Skeleton className="w-[80%] h-3 my-1 rounded-full" />
            <Skeleton className="w-[90%] h-3 my-1 rounded-full" />
            <Skeleton className="w-[50%] h-3 my-1 rounded-full" />
          </div>
        ) : (
          <p className="text-sm mt-4 text-zinc-800 opacity-60">
            {fetchedBook.description}
          </p>
        )}
      </div>
      <div className="h-24 w-full"></div>
      <div className="fixed bottom-0 left-0 right-0 z-50 h-16 border-t bg-white">
        <div className="w-full h-full max-w-[500px] mx-auto flex items-center justify-between px-2">
          <div className="flex py-2 items-start justify-center flex-col h-full">
            {loading ? (
              <Skeleton className="w-[85px] h-[20px] mb-1 rounded" />
            ) : fetchedBook.hard_copy_available && haveCopies.sellCopies ? (
              <p
                className={`font-semibold leading-none text-zinc-600 ${
                  fetchedBook.electronic_available ? "text-lg" : "text-2xl"
                }`}
              >
                {formatter.format(parseFloat(fetchedBook.hard_copy_price))}
                <span className="uppercase text-xs text-green-500 font-semibold ml-1">
                  IQD
                </span>
              </p>
            ) : null}
            {loading ? (
              <Skeleton className="w-[120px] h-4 rounded" />
            ) : fetchedBook.electronic_available ? (
              <p
                className={`font-medium text-slate-400 leading-none ${
                  fetchedBook.hard_copy_available ? "text-xs" : "text-sm"
                }`}
              >
                {"Digital:"}
                <span
                  className={`font-semibold ml-2  text-zinc-600 ${
                    fetchedBook.hard_copy_available ? "text-sm" : "text-2xl"
                  }`}
                >
                  {formatter.format(
                    parseFloat(fetchedBook.electronic_copy_price)
                  )}
                </span>
                <span className="uppercase text-xs text-green-500 font-semibold ml-1">
                  IQD
                </span>
              </p>
            ) : null}
            {!haveCopies.sellCopies &&
            !fetchedBook.electronic_available &&
            !loading ? (
              <p className="text-[13px] font-medium text-red-400">
                <span className="font-semibold text-red-400 text-base">
                  This book <br />
                </span>
                is not available for sale
              </p>
            ) : null}
          </div>
          <div className="flex items-center justify-between gap-2">
            {loading ? (
              <Skeleton className="w-[85px] h-10 rounded" />
            ) : (
              haveCopies.borrowCopies && (
                <button
                  className="bg-white text-green-500 border border-green-500 font-semibold px-4 py-2 rounded"
                  onClick={() => {
                    localStorage.setItem("book", JSON.stringify(fetchedBook));
                    redirect("/borrow-request");
                  }}
                >
                  Borrow
                </button>
              )
            )}
            {loading ? (
              <Skeleton className="w-[60px] h-10 rounded" />
            ) : (
              haveCopies.sellCopies && (
                <button
                  className="bg-green-500 text-white font-semibold px-4 py-2 rounded"
                  onClick={() => {
                    setBook(fetchedBook);
                    setOpen(true);
                  }}
                >
                  Buy
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
