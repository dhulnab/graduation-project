import React from "react";
import Modal from "../Modal";
import Loader from "./Loader";

function LoadingModal() {
  return (
    <Modal
      open={true}
      className="w-[60px] opacity-75 backdrop-blur-sm h-[60px] flex items-center justify-center scale-110"
    >
      <div className="w-full h-full flex items-center justify-center relative left-[-19px] scale-125">
        <Loader color="#00ff00"/>
      </div>
    </Modal>
  );
}

export default LoadingModal;
