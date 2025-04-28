"use client";
import Aside from "@/components/Aside";
import Footer from "@/components/Footer";
import WithAuth from "@/components/WithAuth";
import { Bell, BookText, SwatchBookIcon, UserCircle2 } from "lucide-react";

function RootLayout({ children }) {
  const menuList = [
    {
      link: "/client/",
      name: "Home",
      icon: (
        <BookText
          className="w-5 h-5"
          strokeWidth={2.5}
          color="#444"
          size={35}
        />
      ),
    },
    {
      link: "/client/categories",
      name: "Categories",
      icon: (
        <SwatchBookIcon
          className="w-5 h-5"
          strokeWidth={2.5}
          color="#444"
          size={35}
        />
      ),
    },

    {
      link: "/client/notifications",
      name: "Notification",
      icon: (
        <Bell className="w-5 h-5" strokeWidth={2.5} color="#444" size={35} />
      ),
    },
    {
      link: "/client/profile",
      name: "Profile",
      icon: (
        <UserCircle2
          className="w-5 h-5"
          strokeWidth={2.5}
          color="#444"
          size={35}
        />
      ),
    },
  ];



  return (
    <main className={"flex flex-row items-start justify-center"}>
      <div className="hidden lg:flex min-w-[260px] min-h-screen">
        <Aside menuList={menuList} />
      </div>
      <div className="w-full h-full overflow-hidden">
        <div className="">{children}</div>
        <div className="lg:hidden fixed bottom-0 w-full h-12">
          <Footer />
        </div>
      </div>
    </main>
  );
}

export default WithAuth(RootLayout);
