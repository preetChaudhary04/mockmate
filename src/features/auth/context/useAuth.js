import { useContext, useEffect } from "react";
import { AuthContext } from "./auth.context";
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  const { user, setUser, loader, setLoader } = context;

  const handleRegister = async ({ username, email, password }) => {
    setLoader(true);
    try {
      const data = await registerUser({ username, email, password });
      if (data) setUser(data.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  const handleLogin = async ({ email, password }) => {
    setLoader(true);
    try {
      const data = await loginUser({ email, password });
      if (data) setUser(data.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  const handleLogout = async () => {
    setLoader(true);
    try {
      const data = await logoutUser();
      setUser(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  const handleGetMe = async () => {
    setLoader(true);
    try {
      const data = await getMe();
      if (data) setUser(data.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    const getAndSetUser = async () => {
      const data = await getMe();
      if (data) setUser(data.user);
      setLoader(false);
    };

    getAndSetUser();
  }, []);

  return {
    user,
    loader,
    handleRegister,
    handleLogin,
    handleLogout,
    handleGetMe,
  };
};
