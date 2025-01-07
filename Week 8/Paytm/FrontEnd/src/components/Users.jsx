import { useEffect, useState } from "react";
import User from "./user";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/user/bulk");
    console.log(response.data.user);

    setUsers(response.data.user);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <div className="font-semibold mt-6 text-xl">Users</div>
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border-2 mt-2"
          placeholder="Search Users"
        />
      </div>
      <div>
        {users.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </>
  );
};

export default Users;
