import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const TaskBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogout = () => {
    logOut()
    .then(() => {
        console.log("User Logged out successfully")
    })
    .catch((error) => {
        console.log("Logout Failed", error.message)
    })
  }
  return (
    <div className="md:w-11/12 mx-auto bg-purple-200 rounded p-4 m-1 flex items-center justify-between">
        <div>
           <p className="text-"> Hi, {user?.displayName}</p>
        </div>

        <div>
            <button onClick={handleLogout} className="px-3 py-1 bg-purple-500 rounded text-white hover:cursor-pointer hover:scale-105 duration-75 font-semibold text-sm">Logout</button>
        </div>
    </div>
  );
};

export default TaskBar;
