"use client";
import Header from "@/components/Header";
import SaveLastPage from "@/components/pageTracker/SaveLastPage";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import WithAuth from "@/components/WithAuth";
import { useGlobalStates } from "@/global";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Copyright,
  DollarSign,
  File,
  Library,
  LogOut,
  Receipt,
  Tickets,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Profile() {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});

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
        console.log(response.data);
        setUserInfo(response.data.user);
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

  return (
    <div className="w-full ">
      <SaveLastPage />
      <div className="px-2">
        <Header
          notification={false}
          title={["Profile", "see your information"]}
        />
      </div>
      <div className="h-40 w-full mb-4  relative border-b border-green-300 flex flex-wrap">
        <div className="relative w-full h-full">
          <Image
            src={"/back.svg"}
            alt="background"
            fill
            className="object-cover"
          />
          <Button
            variant="destructive"
            className=" w-9 h-9 flex items-center hover:text-white hover:last:text-white hover:bg-red-600 bg-transparent border-red-600 border drop-shadow rounded-full justify-center gap-4 absolute top-3 right-2 z-50 bg-white"
            onClick={async () => {
              const res = await axios.post(
                `${process.env.NEXT_PUBLIC_NEXT_URL}/api/logout`
              );
              if (res.status === 200) {
                Cookies.remove("token");
                window.location.href = "/auth/login";
              }
            }}
          >
            <LogOut
              size={50}
              strokeWidth={2.25}
              className="rotate-180 text-red-600 hover:text-white scale-105"
            />
          </Button>
        </div>

        <div className="absolute -bottom-9 bg-white left-2 w-1/2 h-20 flex items-center gap-2 ">
          {loading ? (
            <>
              <Skeleton
                className={
                  "w-2/5  aspect-square relative rounded-full overflow-hidden border border-green-300"
                }
              />
              <div className="w-3/5 h-full flex items-center justify-center flex-col">
                <Skeleton className="w-full h-6 mb-1 rounded" />
                <Skeleton className="w-full h-6 mb-1 rounded" />
              </div>
            </>
          ) : (
            <>
              <div className="w-2/5  aspect-square relative rounded-full overflow-hidden border border-green-300">
                <Image
                  src="/back.jpg"
                  alt="logo"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="w-3/5 uppercase bg-white p-2 leading-none text-lg font-semibold ">
                {userInfo?.name}
              </p>
            </>
          )}
        </div>
      </div>
      <div className="w-full md:w-1/2 p-2 px-4 md:mx-auto rounded mt-1 flex flex-col items-start opacity-75">
        {loading ? (
          <div className="flex w-full items-center h-[60px] mt-2  ">
            <Skeleton className=" w-[40px] aspect-square rounded-full   " />
            <Skeleton className="h-6 w-full ml-2   " />
          </div>
        ) : (
          <Link
            href={"/client/profile/personal-info"}
            className="flex w-full items-center mt-3 py-2 "
          >
            <File size={30} strokeWidth={1} />
            <p className="text-base ml-2  capitalize">{"Personal Info"}</p>
          </Link>
        )}

        {loading ? (
          <div className="flex w-full items-center h-[60px] mt-2  ">
            <Skeleton className=" w-[40px] aspect-square rounded-full   " />
            <Skeleton className="h-6 w-full ml-2   " />
          </div>
        ) : (
          <Link
            href={"/client/profile/balance"}
            className="flex w-full items-center mt-3 py-2 "
          >
            <DollarSign size={30} strokeWidth={1.25} />
            <p className="text-base ml-2  capitalize">Balance</p>
          </Link>
        )}

        {loading ? (
          <div className="flex w-full items-center h-[60px] mt-2  ">
            <Skeleton className=" w-[40px] aspect-square rounded-full   " />
            <Skeleton className="h-6 w-full ml-2   " />
          </div>
        ) : (
          <Link
            href={"/client/profile/inventory"}
            className="flex w-full items-center mt-3 py-2 "
          >
            <Library size={30} strokeWidth={1.25} />
            <p className="text-base ml-2  capitalize">My Inventory</p>
          </Link>
        )}

        {loading ? (
          <div className="flex w-full items-center h-[60px] mt-2  ">
            <Skeleton className=" w-[40px] aspect-square rounded-full   " />
            <Skeleton className="h-6 w-full ml-2   " />
          </div>
        ) : (
          <Link
            href={"/client/profile/borrows"}
            className="flex w-full items-center mt-3 py-2 "
          >
            <Receipt size={30} strokeWidth={1} />
            <p className="text-base ml-2  capitalize">Requested Books</p>
          </Link>
        )}
        {loading ? (
          <div className="flex w-full items-center h-[60px] mt-2  ">
            <Skeleton className=" w-[40px] aspect-square rounded-full   " />
            <Skeleton className="h-6 w-full ml-2   " />
          </div>
        ) : (
          <Link
            href={"/client/profile/penalties"}
            className="flex w-full items-center mt-3 py-2 "
          >
            <Tickets size={30} strokeWidth={1} />
            <p className="text-base ml-2  capitalize">Penalties</p>
          </Link>
        )}
      </div>

      <div className="w-full mt-4 h-12 flex items-center justify-center text-gray-400">
        <Copyright size={14} strokeWidth={1} />
        <p className="text-s ml-2 font-thin capitalize">
          Al-Nahrain Library Management System 2025
        </p>
      </div>
    </div>
  );
}

export default WithAuth(Profile);
