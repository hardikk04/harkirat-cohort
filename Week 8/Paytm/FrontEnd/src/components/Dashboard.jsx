import axios from "axios";
import Appbar from "./Appbar";
import Balance from "./Balance";
import Users from "./Users";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen p-[2vw]">
      <Appbar></Appbar>
      <Balance></Balance>
      <Users></Users>
      <button
        onClick={async () => {
          await axios("http://localhost:3000/api/v1/user/logout");
          localStorage.removeItem("token");
          navigate("/signin");
        }}
        className="bg-red-500 text-white px-4 py-2 mt-5"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
