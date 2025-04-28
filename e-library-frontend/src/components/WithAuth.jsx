"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "./loader/Loader";
import Cookies from "js-cookie";

function WithAuth(Component) {
  return function WithAuth(props) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const adminAuth = Cookies.get("token");
      if (!adminAuth) {
        router.replace("/auth/login");
      } else {
        setLoading(false);
      }
    }, [router]);

    if (loading) {
      return (
        <div className="w-full max-w-[500px] min-h-screen flex items-center justify-center flex-col overflow-hidden">
          <Loader />
        </div>
      );
    }

    return <Component {...props} />;
  };
}

export default WithAuth;
