import React from "react";

const Spinner = () => {
  return (
    <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center opacity-40">
      <div
        className="w-16 h-16 border-4 border-dashed border-white 
        border-t-transparent rounded-full animate-spin"
      ></div>
    </div>
  );
};

export default Spinner;
