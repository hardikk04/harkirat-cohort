import Heading from "./Heading";
import SubHeading from "./SubHeading";
import InputBox from "./InputBox";
import Button from "./Button";
import BottomWarning from "./BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="signup-card w-[22%]  rounded-lg bg-[#CCD5E2] p-5 py-[2vw]">
        <div>
          <Heading label={"Sign In"}></Heading>
          <SubHeading
            label={"Enter your credentials to access your account"}
          ></SubHeading>
        </div>
        <p className="text-center text-red-500">{error}</p>
        <div className="flex flex-col gap-[.5vw]">
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
            if (username && password) {
              try {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signin",
                  {
                    username,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              } catch (error) {
                setUsername("");
                setPassword("");
                setError(error.response.data.message);
                console.log(error.response.data.message);
              }
            } else {
              setError("Please all Details");
            }
          }}
          label={"Sign in"}
        ></Button>
        <BottomWarning
          label={"Already have an account?"}
          to={"/signup"}
          buttonText={"Sign Up"}
        ></BottomWarning>
      </div>
    </div>
  );
};

export default Signin;
