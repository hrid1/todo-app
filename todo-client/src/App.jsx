import { useContext } from "react";
import "./App.css";
import { AuthContext } from "./provider/AuthProvider";

function App() {

  const user = useContext(AuthContext);
  // console.log(user)
  return (
    <>
      <h2 className="">Welcome to Task Management</h2>
    </>
  );
}

export default App;
