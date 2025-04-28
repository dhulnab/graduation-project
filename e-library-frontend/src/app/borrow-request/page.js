"use client";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import Header from "@/components/Header";
import Loader from "@/components/loader/Loader";
import SuccessModal from "@/components/SuccessModal";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalStates } from "@/global";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

function BorrowRequest() {
  const [loading, setLoading] = useState(false);
  const [finalLoading, setFinalLoading] = useState(false);
  const [details, setDetails] = useState({});
  const [borrowRequest, setBorrowRequest] = useState({
    from: null,
    until: null,
    copyId: null,
    copy_serial_number: null,
  });
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [disableDates, setDisableDates] = useState({
    disable_from: [],
    disable_until: [],
  });
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  let book =
    typeof window !== "undefined" ? localStorage.getItem("book") : null;
  book = book ? JSON.parse(book) : null;

  const token = Cookies.get("token");
  const bookType =
    typeof window !== "undefined" ? sessionStorage.getItem("bookType") : null;

  useEffect(() => {
    !book &&
      redirect(
        localStorage.getItem("lastVisitedPage")
          ? localStorage.getItem("lastVisitedPage")
          : "/client"
      );
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/find-borrow-copy/${book?.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setDetails(response.data.best_copy);
        setBorrowRequest({
          ...borrowRequest,
          copyId: response.data.best_copy.copy.id,
          copy_serial_number: response.data.best_copy.copy.serial_number,
        });

        if (response.data.best_copy?.unavailable_dates?.length > 0) {
          setDisableDates({
            disable_from: response.data.best_copy.unavailable_dates.map(
              (date) => date.unavailable_from
            ),
            disable_until: response.data.best_copy.unavailable_dates.map(
              (date) => date.unavailable_until
            ),
          });
        } else {
          console.log("no unavailable dates");
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
    fetchDetails();
  }, []);

  const handleClick = async () => {
    setFinalLoading(true);
    if (borrowRequest.from && borrowRequest.until) {
      // Use functional form to update state
      setBorrowRequest((prev) => ({
        ...prev,
        borrow_start_date: prev.from.toLocaleDateString("en-CA"),
        borrow_end_date: prev.until.toLocaleDateString("en-CA"),
      }));
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/create-borrow-request`,
          {
            copy_id: borrowRequest.copyId,
            borrow_start_date: borrowRequest.from.toLocaleDateString("en-CA"),
            borrow_end_date: borrowRequest.until.toLocaleDateString("en-CA"),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        const statusCode = error?.response?.status;
        if (statusCode === 401) {
          window.location.href = "/auth/login";
        }
      } finally {
        setFinalLoading(false);
        setOpenSuccessModal(true);
      }
    }
  };

  return (
    <div>
      {openSuccessModal && (
        <SuccessModal
          open={openSuccessModal}
          setOpen={setOpenSuccessModal}
          details={{
            book_title: book.title,
            copy_serial_number: borrowRequest.copy_serial_number,
          }}
        />
      )}
      <div className="px-2">
        <Header
          title={["Almost Yours", "Finalize Your Borrow"]}
          notification={false}
        />
      </div>
      <div className="w-full flex items-center justify-center pb-4 px-2 h-14">
        {loading ? (
          <Skeleton className="h-12 w-full" />
        ) : (
          <DatePickerWithRange
            disable_from={disableDates.disable_from}
            disable_until={disableDates.disable_until}
            borrowRequest={borrowRequest}
            setBorrowRequest={setBorrowRequest}
          />
        )}
      </div>
      <div className="w-full px-2 mb-6">
        {loading ? (
          <Skeleton
            className={
              "w-full aspect-[3/2] p-2 rounded-xl border flex justify-between"
            }
          />
        ) : (
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
        )}
      </div>
      <div className="fixed bottom-0 right-0 left-0 w-full bg-transparent h-24 flex items-center justify-center p-4 ">
        {loading ? (
          <Skeleton className={"w-full h-12 rounded-xl"} />
        ) : (
          <button
            onClick={() => {
              handleClick();
            }}
            disabled={
              finalLoading ||
              loading ||
              borrowRequest?.from === null ||
              borrowRequest?.until === null
            }
            className={`w-full bg-green-500 disabled:opacity-55 text-white h-12 rounded-xl active:scale-95 font-bold transition-all flex items-center justify-center ${
              finalLoading ? "cursor-not-allowed opacity-60" : "cursor-pointer"
            }`}
          >
            {finalLoading ? (
              <div className="relative -left-6">
                <Loader color="#fff" />
              </div>
            ) : null}
            <p>Done</p>
          </button>
        )}
      </div>
    </div>
  );
}

export default BorrowRequest;
