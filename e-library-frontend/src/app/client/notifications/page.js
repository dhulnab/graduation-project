"use client";
import Header from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalStates } from "@/global";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const { apiUrl } = useGlobalStates();
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/notifications`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        const transformed = response.data.data.map((notification) => ({
          data: JSON.parse(notification.data),
          creation_date: new Date(notification.created_at),
        }));
        setNotifications(transformed);
      } catch (error) {
        console.log(error);
        const statusCode = error?.response?.status;
        if (statusCode === 401) {
          sessionStorage.removeItem("token");
          window.location.href = "/auth/login";
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="">
      <div className="p-2">
        <Header title={["Notifications", "catch up"]} notification={false} />
      </div>
      <div className="flex flex-col -mt-4">
        {notifications.map((notification, i) => (
          <div
            key={i}
            className="w-full  lg:w-1/2 md:w-3/4 md:mx-auto h-24 flex items-center border-b last:border-b-0 md:first:border-t-0 first:border-t-0"
          >
            <div className="w-full px-3 h-full flex justify-between">
              <div className="w-4/5 flex flex-col justify-center h-full gap-2">
                {loading ? (
                  <Skeleton className={"w-[160px] h-7 mb-1"} />
                ) : (
                  <p className="font-medium truncate text-zinc-700 text-xl capitalize">
                    {notification.data.title}
                  </p>
                )}
                {loading ? (
                  <Skeleton className={"w-full h-4 rounded-3xl"} />
                ) : (
                  <p className="font-light text-xs truncate text-zinc-600 capitalize">
                    {notification.data.message}
                  </p>
                )}
              </div>
              {loading ? (
                <div className="w-1/5 text-xs text-zinc-600  h-full flex justify-end items-center font-light">
                  <Skeleton className={"w-[50px] h-3"} />
                </div>
              ) : (
                <p className="w-1/5 text-xs text-zinc-600  h-full flex justify-end items-center font-light">
                  {notification.creation_date.toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        ))}
        {loading &&
          Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="w-full  lg:w-1/2 md:w-3/4 md:mx-auto h-24 flex items-center border-b last:border-b-0 md:first:border-t-0 first:border-t-0"
            >
              <div className="w-full px-3 h-full flex justify-between">
                <div className="w-4/5 flex flex-col justify-center h-full gap-2">
                  {loading ? (
                    <Skeleton className={"w-[160px] h-7 mb-1"} />
                  ) : (
                    <p className="font-medium truncate text-zinc-700 text-xl capitalize">
                      Notification title
                    </p>
                  )}
                  {loading ? (
                    <Skeleton className={"w-full h-4 rounded-3xl"} />
                  ) : (
                    <p className="font-light text-xs truncate text-zinc-600 capitalize">
                      Notification description lke lorem ipsum dolor sit amet
                      consectetur adipiscing elit
                    </p>
                  )}
                </div>
                {loading ? (
                  <div className="w-1/5 text-xs text-zinc-600  h-full flex justify-end items-center font-light">
                    <Skeleton className={"w-[50px] h-3"} />
                  </div>
                ) : (
                  <p className="w-1/5 text-xs text-zinc-600  h-full flex justify-end items-center font-light">
                    oct-26
                  </p>
                )}
              </div>
            </div>
          ))}
      </div>
      <div className="h-16 w-full"></div>
    </div>
  );
}

export default Notifications;
