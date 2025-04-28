import React from "react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

function UpdateForm({ updatedUser, setUpdatedUser, loading }) {
  return (
    <div className="w-full p-2">
      <label className="text-zinc-600" htmlFor="name">
        Full Name
      </label>
      {loading ? (
        <Skeleton
          className={
            "w-full h-12 rounded-lg p-2 placeholder:text-zinc-500 text-zinc-600 focus:outline-none focus:ring-0"
          }
        />
      ) : (
        <Input
          type="text"
          id="name"
          readOnly
          // onChange={(e) =>
          //   setUpdatedUser({ ...updatedUser, name: e.target.value })
          // }
          value={updatedUser?.name}
          className="w-full h-12 rounded-lg p-2 placeholder:text-zinc-500 text-zinc-600 focus:outline-none focus:ring-0"
        />
      )}

      <label className="text-zinc-600" htmlFor="email">
        Email
      </label>
      {loading ? (
        <Skeleton
          className={
            "w-full h-12 rounded-lg p-2 placeholder:text-zinc-500 text-zinc-600 focus:outline-none focus:ring-0"
          }
        />
      ) : (
        <Input
          type="text"
          id="email"
          readOnly
          value={updatedUser?.email}
          // onChange={(e) =>
          //   setUpdatedUser({ ...updatedUser, email: e.target.value })
          // }
          className="w-full h-12 rounded-lg p-2 placeholder:text-zinc-500 text-zinc-600 focus:outline-none focus:ring-0"
        />
      )}
    </div>
  );
}

export default UpdateForm;
