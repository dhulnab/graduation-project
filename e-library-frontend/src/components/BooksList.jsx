import Image from "next/image";
import Link from "next/link";
import React from "react";

function BooksList({ books, title }) {
  return (
    <div className="w-full p-0 mt-6">
      <p className="w-full text-lg lg:text-xl font-semibold capitalize flex items-center text-gray-700 mb-4">
        {title}
      </p>
      <div className="w-full flex items-center gap-4 overflow-x-auto overflow-y-hidden navbar flex-nowrap scrollbar-hide">
        {books !== null
          ? books.map((book, index) => (
              <Link
                href={`/book/${book.id}`}
                key={index}
                className="w-[124px] p-1 lg:w-[170px] flex-shrink-0 h-auto cursor-pointer"
              >
                <div className="w-full aspect-[2/3] relative rounded-xl overflow-hidden shadow">
                  <Image
                    src={
                      `${process.env.NEXT_PUBLIC_IMG_URL}${book.cover}` ||
                      "/book_cover.jpg"
                    }
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="w-full mt-2 text-sm lg:text-base capitalize font-medium text-gray-700 truncate">
                  {book.title}
                </p>
              </Link>
            ))
          : null}
      </div>
    </div>
  );
}

export default BooksList;
