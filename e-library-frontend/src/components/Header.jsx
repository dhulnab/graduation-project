import Image from "next/image";
import React from "react";
import { Bell, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function Header({ title = [], notification = true }) {
  return (
    <div className="bg-white lg:border-b items-center flex">
      <div className="lg:py-6  lg:relative lg:right-2 mb-0 w-full lg:w-1/2 md:w-3/4 md:mx-auto flex items-center justify-between lg:justify-center">
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
            <h1 className="text-xl font-bold text-green-500">{title[0]}</h1>
            <p className="text-xs text-gray-500">{title[1]}</p>
          </div>
        </Link>
        <div className="hidden lg:flex ml-4 justify-between items-center rounded border h-12 w-3/4">
          <Input
            placeholder="Search"
            type="text"
            className="h-full placeholder:text-zinc-500 text-zinc-600 rounded border-none w-5/6 focus:outline-none focus:ring-0"
          />
          <Button className="h-full w-1/6 flex items-center bg-transparent shadow-none hover:bg-transparent rounded-none border-l justify-center">
            <Search strokeWidth={1.25} color="#aaa" />
          </Button>
        </div>
        {notification && (
          <div className="h-full lg:hidden rounded-full -right-1 flex items-center relative bottom-1">
            <Link
              href="/client/notifications"
              className="flex items-center justify-center h-11 aspect-square rounded-full"
            >
              <Bell className="w-6 h-6" strokeWidth={1.25} color="#aaa" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
