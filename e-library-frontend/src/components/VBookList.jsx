import React from "react";
import LoadingModal from "./loader/LoadingModal";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

function VBookList({ books = [], loading }) {
  return (
    <div className="flex flex-col gap-2 md:m-2 md:grid md:grid-cols-[auto-fit] md:[grid-template-columns:repeat(auto-fit,minmax(150px,1fr))] justify-center mt-2">
      {loading &&
        Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="w-full border-b py-2 border-zinc-200 md:border-b-0 flex md:flex-col"
          >
            <Skeleton className="aspect-[2/3] w-[90px] md:w-[100px]  overflow-hidden rounded  mb-2 md:mb-0 md:mr-0 mr-2" />
            <Skeleton className="hidden md:block w-[80px] h-5 mt-1" />
            <div className="md:hidden">
              <Skeleton className="w-[120px] h-5 mb-2 rounded" />
              <Skeleton className="w-[80px] h-4 mb-2 rounded" />
              <Skeleton className="w-[110px] h-2 mb-1 rounded-lg" />
              <Skeleton className="w-[120px] h-2 mb-1 rounded-lg" />
              <Skeleton className="w-[130px] h-2 mb-2 rounded-lg" />
              <Skeleton className="w-[60px] h-5 mb-2 rounded-md" />
              <Skeleton className="w-[80px] h-5 mb-2 rounded-md" />
            </div>
          </div>
        ))}
      {!loading && books.length !== 0
        ? books.map((book, index) => (
            <Link
              href={`/book/${book.id}`}
              key={index}
              className="w-full border-b px-2 border-zinc-200 py-2 md:border-b-0 flex md:flex-col"
            >
              <div className="aspect-[2/3] w-[90px] md:w-[100px] bg-slate-500 overflow-hidden rounded relative mb-2 md:mb-0 md:mr-0 mr-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}${book.cover}`}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="hidden md:block">
                <p className="text-zinc-700 text-sm max-w-[100px] font-semibold truncate">
                  {book.title}
                </p>
              </div>
              <div className="md:hidden">
                <p className="text-zinc-700 max-w-[170px] text-base font-bold">
                  {book.title}
                </p>
                <p className="text-zinc-600 text-sm font-medium">
                  {book.author}
                </p>
                <p className="text-zinc-500 max-w-60 text-xs line-clamp-2 truncate whitespace-normal">
                  {book.description}
                </p>
                <p className="text-green-500 bg-green-50 w-fit px-2 py-1 rounded-lg my-1 text-sm font-medium">
                  {book.first_category?.name}
                </p>
                <p className="text-zinc-600 text-sm font-bold">
                  {book.hard_copy_price}
                  <span className="text-green-500 ml-1">IQD</span>
                </p>
              </div>
            </Link>
          ))
        : null}
      {!loading && books.length === 0 && (
        <div className="min-h-44 w-full flex items-center justify-center font-semibold opacity-50">
          No Results
        </div>
      )}
    </div>
  );
}

export default VBookList;
