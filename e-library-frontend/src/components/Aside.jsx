"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command, CommandItem, CommandList } from "./ui/command";
import Image from "next/image";

function Aside({ menuList }) {
  const pathname = usePathname(); // Get the current pathname

  return (
    <aside className="border-r py-4 px-6 fixed flex flex-col min-h-screen gap-6 bg-white z-[999]">
      <div className=" w-full flex items-center mt-2 mb-4">
        <Image
          src="/logo2.svg"
          alt="logo"
          width={55}
          height={55}
          className=""
        />
        <div className="capitalize ml-2">
          <h1 className="text-xl font-bold text-green-500">AL-NAHRAIN</h1>
          <p className="text-xs text-gray-500">Library Management System</p>
        </div>
      </div>
      <Command>
        <CommandList>
          <div className="flex flex-col gap-4 grow">
            {menuList.map((menu, index) => {
              const isActive = pathname === menu.link;
              return (
                <div key={index}>
                  <Link href={menu.link} key={index} passHref>
                    <CommandItem
                      className={`flex min-w-[188px] flex-row gap-2 px-4 py-2 font-semibold cursor-pointer 
                    ${
                      isActive
                        ? "bg-secondary"
                        : "text-primary hover:bg-primary-foreground"
                    }`}
                    >
                      <div>{menu.icon}</div>
                      <div className="text-[#444]">{menu.name}</div>
                    </CommandItem>
                  </Link>
                </div>
              );
            })}
          </div>
        </CommandList>
      </Command>
    </aside>
  );
}

export default Aside;
