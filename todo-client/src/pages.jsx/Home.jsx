import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import logo from "../assets/todo_logo.png";

const Home = () => {
  //   const {} = useContext(AuthContext);
  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <div className="flex flex-col items-center justify-center w-96 mx-auto gap-4 h-80 shadow-2xl rounded-xl">
        <h2 className="text-center font-bold">Welcome To TMS</h2>
        <img className="w-60" src={logo} alt="To Do" />
        <button className="px-3 py-2 rounded bg-purple-500 hover:cursor-pointer hover:bg-purple-600 text-white font-medium">
          Sign In With Google
        </button>
      </div>
    </div>
  );
};

export default Home;
