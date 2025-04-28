"use client";
import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";

function Carousel({ booksData }) {
  const [books, setBooks] = useState(booksData);

  const options = {
    loop: true,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  // Custom autoplay effect to reverse scroll direction
  useEffect(() => {
    if (!emblaApi) return;

    const scrollPrev = () => {
      emblaApi.scrollNext(); // scroll backward
    };

    const intervalId = setInterval(scrollPrev, 5000); // every 5 seconds

    return () => clearInterval(intervalId); // cleanup on unmount
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    setBooks(booksData);
  }, [booksData]);

  return (
    <div className="relative w-full  max-w-[1202px] mx-auto">
      <div className="w-full overflow-hidden h-full mt-2" ref={emblaRef}>
        <div className="flex flex-nowrap gap-4">
          {books !== null
            ? books.map((book, i) => (
                <Link
                  href={`/book/${book.id}`}
                  key={i}
                  className="cursor-pointer w-full flex-shrink-0 lg:w-[1202px] h-[220px] lg:h-[420px] mx-auto"
                >
                  <div className="border border-green-300 flex items-center justify-center gap-4 w-full h-full rounded-2xl px-3 py-0">
                    <div className="border border-green-300 relative rounded-lg overflow-hidden w-[130px] lg:w-[230px] aspect-[2/3] bg-orange-100">
                      <Image
                        src={
                          `${process.env.NEXT_PUBLIC_IMG_URL}${book.cover}` ||
                          "/book_cover.jpg"
                        }
                        alt="book"
                        fill
                      />
                    </div>
                    <div className="flex flex-col justify-between w-[180px] lg:w-[400px] h-[170px] lg:h-[340px] bg-white rounded-2xl">
                      {/* Title */}
                      <h1 className="font-bold capitalize text-xl lg:text-3xl text-green-600 truncate">
                        {book.title}
                      </h1>

                      {/* Author */}
                      <h2 className="capitalize font-medium text-sm lg:text-[20px] text-gray-700 truncate">
                        {book.author}
                      </h2>

                      {/* Description */}
                      <p className="text-[12px] lg:text-base text-gray-600 leading-snug line-clamp-2">
                        {book.description}
                      </p>

                      {/* Categories */}
                      <div className="flex items-start gap-1 my-1">
                        {book.first_category && (
                          <p className="text-xs lg:text-sm font-medium bg-green-100 text-green-500 px-2 py-1 rounded-full capitalize">
                            {book.first_category.name}
                          </p>
                        )}
                        {book.second_category && (
                          <p className="text-xs  lg:text-sm font-medium bg-green-100 text-green-500 px-2 py-1 rounded-full capitalize truncate">
                            {book.second_category.name}
                          </p>
                        )}
                      </div>

                      {/* Availability */}
                      {book.electronic_available && (
                        <p className="text-xs lg:text-base my-1 font-medium text-green-500">
                          Electronic copy available
                        </p>
                      )}

                      {/* Prices */}
                      <div className="flex justify-start gap-2 lg:gap-4 mt-0">
                        {book.hard_copy_price && (
                          <p className=" py-1 h-fit flex items-center  font-semibold text-lg lg:text-base rounded-lg">
                            {formatter.format(book.hard_copy_price)}
                            <span className="ml-1 relative -bottom-0.5 text-xs font-light text-green-500">
                              IQD
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            : null}
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-1">
        {books !== null
          ? books.map((book, i) => (
              <button
                key={i}
                className={`w-3 h-[3px] mt-2 rounded-xl transition-colors duration-300 ${
                  i === selectedIndex ? "bg-green-400" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => emblaApi && emblaApi.scrollTo(i)}
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default Carousel;
