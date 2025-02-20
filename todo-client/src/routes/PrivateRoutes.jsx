import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <h2>Loading...</h2>;
  return user ? children : <Navigate to="/" replace />;
};

export default PrivateRoutes;
