"use client";
import GoToLastPage from "@/components/pageTracker/GoToLastPage";
import VBookList from "@/components/VBookList";
import WithAuth from "@/components/WithAuth";
import { useGlobalStates } from "@/global";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

function ThirdCategoryBooks({ params }) {
  const unwrappedParams = React.use(params);
  const cat_id = unwrappedParams.id;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      const token = Cookies.get("token");
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/category-books/${cat_id}?type=3`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBooks(response.data.data);
        console.log(response.data);
      } catch (error) {
        const statusCode = error?.response?.status;
        if (statusCode === 401) {
          sessionStorage.removeItem("token");
          window.location.href = "/auth/login";
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [cat_id]);
  return (
    <div>
      <div className="w-full p-1">
        <div className="flex items-center justify-center h-14 sticky top-0 bg-white pb-2 z-10">
          <GoToLastPage className={"relative top-1.5"} />
          <p className="w-full h-16 mt-3 text-xl font-bold opacity-70 flex items-center">
            Categories
          </p>
        </div>
        <VBookList books={books} loading={loading} />
        <div className="h-16 w-full"></div>
      </div>
    </div>
  );
}

export default WithAuth(ThirdCategoryBooks);
