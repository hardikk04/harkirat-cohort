import { useEffect, useState } from "react";
import Debounce from "./Debounce";

const useInterval = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const myInterval = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  });
  return count;
};

const App = () => {
  const count = 0;
  return (
    <div>
      <Debounce></Debounce>
    </div>
  );
};

export default App;
