import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const TaskBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogout = () => {
    logOut()
      .then(() => {
        // console.log("User Logged out successfully");
      })
      .catch((error) => {
        // console.log("Logout Failed", error.message);
      });
  };
  return (
    <section className="bg-purple-200 rounded p-2.5">
      <div className="max-w-7xl mx-auto m-1 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold"> Hi, {user?.displayName}</p>
        </div>
        <div className="hidden md:block">
          <h2 className="font-semibold">Welcome To Task-Treak</h2>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-purple-500 rounded text-white hover:cursor-pointer hover:scale-105 duration-75 font-semibold text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default TaskBar;
