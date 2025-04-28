import React from "react";
import Modal from "./Modal";
import { redirect } from "next/navigation";

function SuccessModal({ open, setOpen, details }) {
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      layer="200"
      className={"w-[320px] z-[200]"}
    >
      <div className="w-full px-2">
        <h1 className="text-xl font-bold w-full text-center text-green-500 mb-4">
          Purchased Successfully
        </h1>
        <p className="">
          Book:
          <span className="font-bold"> {details?.book_title}</span>
        </p>
        <p className="">
          copy:
          <span className="font-bold"> {details?.copy_serial_number}</span>
        </p>
        <p className="text-red-400 text-xs capitalize mt-4 font-medium">
          * don't forget to save this information by taking a screenshot
        </p>
        <button
          onClick={() => {
            localStorage.removeItem("bookType");
            localStorage.removeItem("book");
            redirect("/client");
          }}
          className="mt-4 w-full font-bold h-10 bg-green-500 text-white rounded-xl"
        >
          Finish
        </button>
      </div>
    </Modal>
  );
}

export default SuccessModal;
