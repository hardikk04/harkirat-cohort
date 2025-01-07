import React from "react";

const SubHeading = ({ label }) => {
  return (
    <div className="flex justify-center text-center opacity-70 text-xl my-2">
      <p className="w-[80%]">{label}</p>
    </div>
  );
};

export default SubHeading;
