"use client";
import {
  BookText,
  Home,
  SearchIcon,
  SwatchBookIcon,
  UserCircle2,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

function Footer() {
  const list = [
    {
      icon: <BookText size={30} strokeWidth={1.75} />,
      name: "Home",
      link: "/client",
    },
    {
      icon: <SwatchBookIcon size={30} strokeWidth={1.75} />,
      name: "Categories",
      link: "/client/categories",
    },
    {
      icon: <SearchIcon size={30} strokeWidth={1.75} />,
      name: "Search",
      link: "/client/search",
    },
    {
      icon: <UserCircle2 size={30} strokeWidth={1.75} />,
      name: "Profile",
      link: "/client/profile",
    },
  ];

  const pathname = usePathname();

  return (
    <div className="border-t h-fit pt-2 pb-3 items-center justify-between flex bg-white">
      <div className="w-full md:w-3/4 bg-white md:mx-auto h-full flex items-center justify-between px-4">
        {list.map((item, index) => {
          const isActive =
            pathname === item.link || // Exact match
            (pathname.startsWith(item.link + "/") &&
              item.link !== "/client"); // Subroutes
          return (
            <Link key={index} href={item.link}>
              <div
                className={`${isActive ? "text-green-500" : "text-gray-500"}`}
              >
                {item.icon}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Footer;
