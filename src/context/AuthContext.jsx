import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext();
const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("docappoint_user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const saveUser = (userData) => {
    setUser(userData);
    localStorage.setItem("docappoint_user", JSON.stringify(userData));
  };

  const register = async (name, email, password, photoURL) => {
    await axios.post(`${API}/auth/register`, { name, email, password, photoURL }, { withCredentials: true });
  };

  const login = async (email, password) => {
    const res = await axios.post(`${API}/auth/login`, { email, password }, { withCredentials: true });
    saveUser(res.data.user);
    return res.data;
  };

  const googleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const { displayName, email, photoURL } = result.user;
    const res = await axios.post(`${API}/auth/social-login`, { name: displayName, email, photoURL }, { withCredentials: true });
    saveUser(res.data.user);
    return res.data;
  };

  const logout = async () => {
    await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("docappoint_user");
  };

  const updateProfile = async (name, photoURL) => {
    const res = await axios.put(`${API}/auth/update-profile`, { email: user.email, name, photoURL }, { withCredentials: true });
    saveUser(res.data.user);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, googleLogin, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
