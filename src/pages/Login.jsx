import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("John Doe");
  const [username, setUsername] = useState("johndoe@12");
  const [password, setPassword] = useState("john@123");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify({ name, username, password }));
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-6 sm:gap-10 lg:gap-16 px-4">
      <div className="flex justify-center">
        <h1 className="text-3xl sm:text-5xl lg:text-7xl text-third-color font-semibold">
          Sign In
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center w-full gap-4 sm:gap-6 lg:gap-9 sm:w-3/4 lg:w-3/4 xl:w-1/2">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-gray-200 px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-lg lg:text-xl rounded-xl w-full"
          type="text"
          placeholder="Username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-200 px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-lg lg:text-xl rounded-xl w-full"
          type="password"
          placeholder="Password"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-green-900 hover:bg-green-800 px-4 py-3 sm:px-5 sm:py-4 text-sm sm:text-base lg:text-lg text-white rounded-xl"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
