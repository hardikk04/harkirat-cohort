import React, { useEffect, useState } from "react";

const useDebounce = (value, timeout) => {
  const [debouncedValue, setDebouncedValue] = useState("");
  useEffect(() => {
    const myInterval = setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);
    return () => {
      clearInterval(myInterval);
    };
  }, [value]);
  return debouncedValue;
};

const Debounce = () => {
  const [value, setValue] = useState("");
  const debounced = useDebounce(value, 500);
  return (
    <div className="bg-gray-700 flex justify-center items-center h-screen w-full">
      The Debounce value is {debounced}
      <input
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
        type="text"
      />
    </div>
  );
};

export default Debounce;
