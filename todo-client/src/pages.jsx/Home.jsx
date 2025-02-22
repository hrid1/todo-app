import { useContext, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import logo from "../assets/todo_logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../assets/lotido.json";

const Home = () => {
  const { user, handleGoogleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(user?.displayName);
  // redirected from a protected route
  const from = location.state?.from?.pathname || "/task";

  // prevent login again after already login user
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);
  // handle login

  const handleGooleLogin = async () => {
    try {
      const result = await handleGoogleSignIn();
      if (result) {
        navigate(from, { replace: true });
        const data = result?.user?.providerData[0];
        const userInfo = {
          uid: data.uid,
          name: data.displayName,
          email: data.email,
        };
        // console.log(userInfo)
        const respose = await axios.post(
          `https://todo-task-pi-lyart.vercel.app/user/${userInfo.email}`,
          userInfo
        );
        // console.log(respose.data);
      }
    } catch (error) {
      console.error("Google Sign-In Failed:", error.message);
    }
  };
  return (
    <div className="flex flex-col-reverse md:flex-row  items-center justify-center min-h-[100vh] gap-2 bg-gradient-to-r from-purple-300 to-indigo-300">
      <div className="flex items-center justify-center md:justify-end w-full md:w-1/3 ">
        <Lottie
          className="w-60"
          animationData={groovyWalkAnimation}
          loop={true}
        />
        ;
      </div>

      <div className="w-full md:w-1/2">
        <div className="flex flex-col items-center justify-center w-96 mx-auto gap-4 h-80 shadow-2xl rounded-xl bg-gray-100/80">
          <h2 className="text-center font-bold text-xl md:text-3xl">
            Welcome To <span className="text-purple-600">TaskMS</span>
          </h2>
          <img className="w-60" src={logo} alt="To Do" />
          <button
            onClick={handleGooleLogin}
            className="px-3 py-2 rounded bg-purple-500 hover:cursor-pointer hover:bg-purple-600 text-white font-medium"
          >
            Sign In With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
