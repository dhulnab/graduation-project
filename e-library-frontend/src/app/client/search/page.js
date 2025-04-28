"use client";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
import VBookList from "@/components/VBookList";
import SaveLastPage from "@/components/pageTracker/SaveLastPage";
import Cookies from "js-cookie";

function Search() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchBooks = async () => {
    if (search.trim() === "") return;
    setLoading(true);
    const token = Cookies.get("token");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/books/search?term=${encodeURIComponent(
          search
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      console.log(response.data);
      setBooks(response.data);
    } catch (error) {
      const statusCode = error?.response?.status;
      if (statusCode === 401) {
        window.location.href = "/auth/login";
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-1 md:p-2 ">
      <Header
        title={["Search", "what are you looking for ?"]}
        notification={false}
      />
      <Input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission if inside a form
            searchBooks();
          }
        }}
        placeholder="Search"
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className="h-12 rounded-xl w-full md:mt-2 shadow-none placeholder:text-zinc-500 text-zinc-600 focus:outline-none focus:ring-0"
      />
      {/* search results */}
      <VBookList books={books} loading={loading} />
      <div className="h-14 w-full"></div>
      <SaveLastPage />
    </div>
  );
}

export default Search;
