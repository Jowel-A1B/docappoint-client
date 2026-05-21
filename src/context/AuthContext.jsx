import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

const AuthContext = createContext();
const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Axios interceptor — সব request-এ token automatically যাবে
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("docappoint_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("docappoint_user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const saveUser = (userData, token) => {
    setUser(userData);
    localStorage.setItem("docappoint_user", JSON.stringify(userData));
    if (token) localStorage.setItem("docappoint_token", token);
  };

  const register = async (name, email, password, photoURL) => {
    await axios.post(`${API}/auth/register`, { name, email, password, photoURL });
  };

  const login = async (email, password) => {
    const res = await axios.post(`${API}/auth/login`, { email, password });
    saveUser(res.data.user, res.data.token);
    return res.data;
  };

  const googleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const { displayName, email, photoURL } = result.user;
    const res = await axios.post(`${API}/auth/social-login`, { name: displayName, email, photoURL });
    saveUser(res.data.user, res.data.token);
    return res.data;
  };

  const logout = async () => {
    await axios.post(`${API}/auth/logout`);
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("docappoint_user");
    localStorage.removeItem("docappoint_token");
  };

  const updateProfile = async (name, photoURL) => {
    const res = await axios.put(`${API}/auth/update-profile`, { email: user.email, name, photoURL });
    saveUser(res.data.user);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, googleLogin, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);