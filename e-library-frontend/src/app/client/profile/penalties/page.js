"use client";
import GoToLastPage from "@/components/pageTracker/GoToLastPage";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function Penalties() {
  const [penalties, setPenalties] = useState([]);
  const [loading, setLoading] = useState(false);
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  useEffect(() => {
    const fetchPenalties = async () => {
      const token = Cookies.get("token");
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/user-penalties`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.data);
        setPenalties(
          Array.isArray(response.data.data) ? response.data.data : []
        );
      } catch (error) {
        const status = error?.response?.status;
        if (status === 401) {
          window.location.href = "/auth/login";
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPenalties();
  }, []);
  return (
    <div className="">
      <div className="w-full p-1 h-12 flex items-center">
        <GoToLastPage />
        <p className="text-lg font-light text-gray-700 flex items-center justify-center">
          Penalties
        </p>
      </div>
      <div className="p-2 w-full flex flex-col items-center">
        {loading
          ? Array.from({ length: 10 }).map((_, i) => (
              <div
                className="h-40 border-b w-full flex items-start py-2"
                key={i}
              >
                <Skeleton
                  className={
                    "h-full aspect-[2/3] relative overflow-hidden rounded mr-2 bg-slate-200"
                  }
                />
                <div className="h-full flex flex-col justify-between">
                  <Skeleton className={"h-5 w-[190px]"} />
                  <Skeleton className={"h-4 w-[160px]"} />
                  <Skeleton className={"h-4 w-[160px]"} />
                  <Skeleton className={"h-4 w-[120px]"} />
                  <Skeleton className={"h-4 w-[150px]"} />
                  <Skeleton className={"h-6 w-[75px]"} />
                </div>
              </div>
            ))
          : penalties !== null &&
            penalties.map((penalty, i) => (
              <div
                className="h-40 border-b w-full flex items-start py-2"
                key={i}
              >
                {loading ? (
                  <Skeleton
                    className={
                      "h-full aspect-[2/3] relative overflow-hidden rounded mr-2 bg-slate-200"
                    }
                  />
                ) : (
                  <div className="h-full aspect-[2/3] relative overflow-hidden rounded mr-2 bg-slate-200">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMG_URL}${penalty.book_borrowing.book_for_borrow_copy.book.cover}`}
                      alt="book image"
                      fill
                    />
                  </div>
                )}

                <div className="h-full flex flex-col justify-between">
                  {loading ? (
                    <Skeleton className={"h-5 w-[190px]"} />
                  ) : (
                    <p className="font-semibold text-lg leading-none capitalize w-[190px] truncate">
                      {penalty.book_borrowing.book_for_borrow_copy.book.title}
                    </p>
                  )}
                  {loading ? (
                    <Skeleton className={"h-4 w-[160px]"} />
                  ) : (
                    <p className="font-light text-sm capitalize">
                      end date:
                      <span className="font-medium ml-1">
                        {new Date(
                          penalty.book_borrowing.borrow_end
                        ).toLocaleDateString("en-CA")}
                      </span>
                    </p>
                  )}
                  {loading ? (
                    <Skeleton className={"h-4 w-[160px]"} />
                  ) : (
                    <p className="font-light text-sm capitalize">
                      return date:
                      <span className="font-medium ml-1">
                        {new Date(
                          penalty.book_borrowing.return_date
                        ).toLocaleDateString("en-CA")}
                      </span>
                    </p>
                  )}
                  {loading ? (
                    <Skeleton className={"h-4 w-[120px]"} />
                  ) : (
                    <p className="font-light text-sm capitalize">
                      penalty per day:
                      <span className="font-normal ml-1">
                        {formatter.format(penalty.penalty_per_day)}
                      </span>
                      <span className="text-green-500 text-xs ml-1 ">IQD</span>
                    </p>
                  )}
                  {loading ? (
                    <Skeleton className={"h-4 w-[150px]"} />
                  ) : (
                    <p className="font-light text-sm capitalize">
                      total penalty:
                      <span className="font-normal ml-1">
                        {formatter.format(penalty.penalty_amount)}
                      </span>
                      <span className="text-green-500 text-xs ml-1 ">IQD</span>
                    </p>
                  )}
                  {loading ? (
                    <Skeleton className={"h-6 w-[75px]"} />
                  ) : (
                    <p className="leading-none font-semibold text-sm px-2 py-1 pb-1.5 bg-green-400 w-fit rounded-lg text-white ">
                      {penalty.penalty_status}
                    </p>
                  )}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Penalties;
