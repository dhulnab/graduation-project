"use client";
import GoToLastPage from "@/components/pageTracker/GoToLastPage";
import VBookList from "@/components/VBookList";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

function Borrows() {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      const token = Cookies.get("token");
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/user-requests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBooks(
          response.data.data?.map((data) => data.book_for_borrow_copy.book)
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
    fetchBooks();
  }, []);
  return (
    <div className="">
      <div className="w-full p-1 h-12 flex items-center">
        <GoToLastPage />
        <p className="text-lg font-light text-gray-700 flex items-center justify-center">
          Requested Books
        </p>
      </div>
      <VBookList loading={loading} books={books} />
    </div>
  );
}

export default Borrows;
