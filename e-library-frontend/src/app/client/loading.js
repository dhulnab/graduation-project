"use client";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Loading() {
  return (
    <div className="min-h-screen w-full p-2 flex items-center flex-col">
      <div className="hidden lg:flex w-full h-24 border-b items-center justify-center mb-2">
        <Skeleton className="hidden lg:block h-12 rounded-lg w-1/3"></Skeleton>
      </div>
      <div className="lg:py-6  lg:relative lg:right-2 mb-0 w-full lg:w-1/2 md:w-3/4 md:mx-auto lg:hidden flex items-center justify-between lg:justify-center">
        <Link
          href="/client"
          className="lg:hidden w-full flex items-center  mt-2 mb-4"
        >
          <Image
            src="/logo2.svg"
            alt="logo"
            width={55}
            height={55}
            className=""
          />
          <div className="capitalize ml-2">
            <h1 className="text-xl font-bold text-green-500">{"loading.."}</h1>
            <p className="text-xs text-gray-500">{"just a moment"}</p>
          </div>
        </Link>
      </div>
      <Skeleton className="w-full lg:h-[420px] h-[224px] rounded-2xl mb-2"></Skeleton>

      <div className="w-full h-[260px] lg:h-[320px] mt-6 p-1">
        <div className="h-[14%] w-full flex items-center mb-1">
          <Skeleton className="w-[70px] rounded-xl h-[20px]" />
        </div>
        <div className="w-full h-[86%] flex items-center overflow-x-scroll overflow-y-hidden navbar gap-2 flex-nowrap">
          {Array.from({ length: 15 }).map((_, index) => (
            <div
              key={index}
              className="w-[120px] lg:w-[170px] h-full  shrink-0"
            >
              <Skeleton className="w-full aspect-[2/3] relative rounded-lg" />
              <div className="w-full h-4 flex items-center">
                <Skeleton className="h-[10px] w-[70px] rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-[260px] lg:h-[320px] mt-2 p-1">
        <div className="h-[14%] w-full flex items-center mb-1">
          <Skeleton className="w-[70px] rounded-xl h-[20px]" />
        </div>
        <div className="w-full h-[86%] flex items-center overflow-x-scroll overflow-y-hidden navbar gap-2 flex-nowrap">
          {Array.from({ length: 15 }).map((_, index) => (
            <div
              key={index}
              className="w-[120px] lg:w-[170px] h-full  shrink-0"
            >
              <Skeleton className="w-full aspect-[2/3] relative rounded-lg" />
              <div className="w-full h-4 flex items-center">
                <Skeleton className="h-[10px] w-[70px] rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Loading;
