import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  //   google sign in
  const handleGoogleSignIn = () => {
    return signInWithPopup(auth, provider);
  };

  //   user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  //   logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  const authInfo = {
    user,
    loading,
    handleGoogleSignIn,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
