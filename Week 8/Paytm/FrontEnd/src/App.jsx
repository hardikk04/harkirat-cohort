import React from "react";
import { Routes, Route } from "react-router";

import Dashboard from "./components/Dashboard";
import SendMoney from "./components/SendMoney";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/signin" element={<Signin></Signin>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="/send" element={<SendMoney></SendMoney>}></Route>
      </Routes>
    </>
  );
};

export default App;
