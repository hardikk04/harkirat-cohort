import React from "react";

const InputBox = ({ label, type, placeholder, onChange, text }) => {
  return (
    <div className="flex flex-col">
      <label className="font-semibold text-lg">{label}</label>
      <input
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="w-full border-2 py-2 px-2"
        value={text}
      />
    </div>
  );
};

export default InputBox;
