/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    const error = await login(user);

    if (error) {
      console.log(error);
      setError(error.message);
    } else {
      navigate("/");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-300">
      <img
        src="../public/logo.png"
        alt="Logo"
        className="h-[200px] w-[200px] mt-5 absolute hidden lg:block lg:z-0"
      />
      <div className="flex-grow flex items-center z-50">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col border border-black p-10 rounded-md bg-slate-200 shadow-md"
        >
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              required
              name="username"
              className="border border-black rounded-md p-1 shadow-md"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              required
              name="password"
              type="password"
              className="border border-black rounded-md p-1 shadow-md"
            />
          </div>
          {error !== null && (
            <p className="text-red-500 font-semibold text-center">{error}</p>
          )}
          <button
            type="submit"
            className="mt-5 p-1 border border-black rounded-md w-fit m-auto bg-orange-300 shadow-md"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
