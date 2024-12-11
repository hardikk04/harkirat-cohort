import { useEffect } from "react";

const Card = () => {

    useEffect(()=>{
        
    })
  return (
    <>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          // handle form submission
          console.log("Form submitted");
        }}
      >
        <input type="text" placeholder="Title" />
        <input type="submit" />
      </form>
      <div className="p-4 bg-gray-400 text-white w-28 rounded-xl">
        <h1 className="uppercase font-bold text-2xl">Todo</h1>
      </div>
    </>
  );
};

export default Card;
