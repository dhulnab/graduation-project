// src/app/client/page.js
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Carousel from "@/components/Carousel";
import Header from "@/components/Header";
import BooksList from "@/components/BooksList";
import SaveLastPage from "@/components/pageTracker/SaveLastPage";
import axios from "axios";

async function getHomeData() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/auth/login");
  }

  try {
    // Attempt to fetch data with the token
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/home`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);

    // If unauthorized, simply redirect to login.
    if (error.response?.status === 401) {
      redirect("/auth/login");
    }
    throw error;
  }
}

export default async function Home() {
  const homeData = await getHomeData();

  return (
    <div className="w-full p-2">
      <Header title={["Welcome", "to our inventory"]} />
      <Carousel booksData={homeData.newRelease} />
      <BooksList books={homeData.newRelease} title="New Releases" />
      <BooksList books={homeData.bestSellerBooks} title="Most Popular" />
      <SaveLastPage />
    </div>
  );
}
