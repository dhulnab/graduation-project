"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function GoToLastPage({ className }) {
  const router = useRouter();

  const handleGoToLastPage = () => {
    const lastPage = localStorage.getItem("lastVisitedPage");
    if (lastPage) {
      router.push(lastPage);
    } else {
      alert("No last page found.");
    }
  };

  return (
    <button
      onClick={handleGoToLastPage}
      className={`bg-transparent text-[#aaa] border-none cursor-pointer ${className}`}
    >
      <ChevronLeft
        size={30}
        strokeWidth={1}
        className="w-full h-full text-gray-500"
      />
    </button>
  );
}

export default GoToLastPage;
