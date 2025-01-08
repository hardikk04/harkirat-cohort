import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const SendMoney = () => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const username = searchParams.get("name");

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6 pb-0">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <p className="text-center text-red-500">{error}</p>
          <p className="text-center text-green-500">{sucess}</p>

          <div className="p-6 pt-0">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">{username[0]}</span>
              </div>
              <h3 className="text-2xl font-semibold">{username}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Amount (in Rs)
                </label>
                <input
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  value={amount}
                  placeholder="Enter amount"
                />
              </div>
              <button
                onClick={async () => {
                  if (!(sucess && error)) {
                    setSucess("");
                    setError("");
                  }
                  try {
                    if (amount) {
                      const ans = await axios.post(
                        "http://localhost:3000/api/v1/account/tranfer",
                        {
                          to: id,
                          amount,
                          token: localStorage.getItem("token"),
                        }
                      );
                      setAmount("");
                      setSucess(ans.data.message);
                    } else {
                      setError("Enter an amount");
                    }
                  } catch (error) {
                    setError(error.response.data.message);
                  }
                }}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
              >
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
