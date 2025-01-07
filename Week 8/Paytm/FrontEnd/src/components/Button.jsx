import React from "react";

const Button = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-black text-white py-2 px-4 mt-6 rounded-md"
    >
      {label}
    </button>
  );
};

export default Button;
