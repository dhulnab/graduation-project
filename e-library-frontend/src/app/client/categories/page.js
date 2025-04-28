"use client";
import Header from "@/components/Header";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SaveLastPage from "@/components/pageTracker/SaveLastPage";
import { Skeleton } from "@/components/ui/skeleton";
import WithAuth from "@/components/WithAuth";
import axios from "axios";
import { useGlobalStates } from "@/global";
import Cookies from "js-cookie";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { apiUrl } = useGlobalStates();

  useEffect(() => {
    const fetchCategories = async () => {
      const token = Cookies.get("token");
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/categories?type=1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setCategories(response.data.data);
      } catch (error) {
        const statusCode = error?.response?.status;
        if (statusCode === 401) {
          window.location.href = "/auth/login";
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);
  return (
    <div className="w-full p-2 min-h-screen">
      <Header
        title={["Categories", "covers your interests"]}
        notification={false}
      />
      <div className="w-full md:w-1/2 md:mx-auto grid grid-cols-2 gap-2 mt-2">
        {loading &&
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="aspect-square rounded-lg overflow-hidden text-center font-semibold flex items-center flex-col justify-center border"
            >
              <div className="w-full h-4/5 flex items-center justify-center">
                <Skeleton className="w-1/2 h-1/4 flex items-center justify-center" />
              </div>
              <div className="w-full flex items-center justify-center text-[10px] py-2 h-1/5 text-gray-600 border-t">
                <Skeleton className="w-1/2 h-full flex items-center justify-center" />
              </div>
            </div>
          ))}
        {!loading &&
          categories.map((category, index) => (
            <div
              className="aspect-square rounded-lg overflow-hidden text-center font-semibold flex items-center flex-col justify-center border"
              key={index}
            >
              <Link
                href={`/client/categories/${category.id}/first-category-books`}
                className="w-full h-4/5 flex items-center justify-center"
              >
                {category.name}
              </Link>
              <div className="w-full flex items-center justify-center text-[10px] p-1 h-1/5 text-gray-600 border-t">
                <div className="flex items-center">
                  <Link
                    href={`/client/categories/${category.id}/second-categories`}
                    className="underline"
                  >
                    {"Subcategories"}
                  </Link>
                  {/* {category.subcategories ? (
                    <Link
                      href={`/client/home/categories/${category.id}/category`}
                      className="underline"
                    >
                      {"Subcategories"}
                    </Link>
                  ) : null} */}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="w-full h-16 mt-3"></div>
      <SaveLastPage />
    </div>
  );
}

export default WithAuth(Categories);
