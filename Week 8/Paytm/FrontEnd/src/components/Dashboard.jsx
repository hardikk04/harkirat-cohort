import Appbar from "./Appbar";
import Balance from "./Balance";
import Users from "./Users";

const Dashboard = () => {
  return (
    <div className="w-full h-screen p-[2vw]">
      <Appbar></Appbar>
      <Balance></Balance>
      <Users></Users>
    </div>
  );
};

export default Dashboard;
