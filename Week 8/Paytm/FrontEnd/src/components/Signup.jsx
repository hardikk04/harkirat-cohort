import Heading from "./Heading";
import SubHeading from "./SubHeading";
import InputBox from "./InputBox";
import Button from "./Button";
import BottomWarning from "./BottomWarning";
import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="signup-card w-[22%]  rounded-lg bg-[#CCD5E2] p-5 py-[2vw]">
        <div>
          <Heading label={"Sign Up"}></Heading>
          <SubHeading
            label={"Enter your information to create an account"}
          ></SubHeading>
        </div>
        <p className="text-center text-red-500">{error}</p>
        <div className="flex flex-col gap-[.5vw]">
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            text={firstName}
            label={"First Name"}
            placeholder={"Hardik"}
            type={"text"}
          ></InputBox>
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            text={lastName}
            label={"Last Name"}
            placeholder={"Sisodiya"}
            type={"text"}
          ></InputBox>
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            text={username}
            label={"Username"}
            placeholder={"hardikk04"}
            type={"email"}
          ></InputBox>
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            text={password}
            label={"Password"}
            placeholder={"hardik123"}
            type={"password"}
          ></InputBox>
        </div>
        <Button
          onClick={async () => {
            if (firstName && lastName && username && password) {
              try {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    firstName,
                    lastName,
                    username,
                    password,
                  }
                );

                localStorage.setItem("token", response.data.token);

                navigate("/dashboard");
              } catch (error) {
                setFirstName("");
                setLastName("");
                setUsername("");
                setPassword("");
                setError(error.response.data.message);
              }
            } else {
              setError("Please All Valid Details");
            }
          }}
          label={"Sign up"}
        ></Button>
        <BottomWarning
          label={"Already have an account?"}
          to={"/signin"}
          buttonText={"Sign in"}
        ></BottomWarning>
      </div>
    </div>
  );
};

export default Signup;
