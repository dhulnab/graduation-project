import React from "react";
import Modal from "./Modal";
import { X } from "lucide-react";
import { redirect } from "next/navigation";

function BuyModal({ open, setOpen, book }) {
  return (
    <Modal open={open} setOpen={setOpen} layer="200" className={"w-[300px] z-[200]"}>
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl  font-bold ">Book Type</h1>
        <button onClick={() => setOpen(false)}>
          <X strokeWidth={1.25} size={20} />
        </button>
      </div>

      <p className="capitalize  text-center mt-4 ">
        choose the type of book you want to buy
      </p>
      <div className="flex justify-between items-center mt-2 gap-1.5">
        <button
          onClick={() => {
            localStorage.setItem("bookType", "hard-copy");
            localStorage.setItem("book", JSON.stringify(book));
            redirect("/checkout");
          }}
          className="w-6/12 h-10 bg-green-500 font-bold capitalize text-white rounded-lg flex items-center justify-center"
        >
          hard-copy
        </button>
        <button
          onClick={() => {
            // localStorage.setItem("bookType", "e-copy");
            // localStorage.setItem("book", JSON.stringify(book));
            // redirect("/checkout");
          }}
          className="w-6/12 h-10 font-bold capitalize text-green-500 border border-green-500 bg-white rounded-lg flex items-center justify-center"
        >
          e-copy
        </button>
      </div>
    </Modal>
  );
}

export default BuyModal;
