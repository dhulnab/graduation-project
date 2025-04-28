"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

function SaveLastPage() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      localStorage.setItem("lastVisitedPage", pathname);
    }
  }, [pathname]);

  return null; 
}

export default SaveLastPage;
