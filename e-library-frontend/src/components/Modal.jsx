import React, { useEffect } from "react";

function Modal({
  open,
  setOpen,
  children,
  className,
  layer = "100",
  ...props
}) {
  if (!open) return null;
  useEffect(() => {
    // Add or remove the overflow-hidden class based on the open state
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup function to ensure the class is removed when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black/20  z-[${layer}] flex items-center justify-center  backdrop-blur-sm ${
        open ? "animate-fadeIn" : "animate-fadeOut pointer-events-none"
      }`}
      dir="ltr"
      {...props}
    >
      <div
        className={`${className}  bg-background rounded-xl p-4 shadow transform transition-transform duration-300 ${
          open ? "scale-100" : "scale-95"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
