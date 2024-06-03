import { createContext, useContext, useState, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../types/userType";

interface AuthContextType {
  //   authToken: string | null;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  //   authToken: null,
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  //   const [authToken, setAuthToken] = useState<string | null>(() => {
  //     return localStorage.getItem("authToken");
  //   });
  const [user, setUser] = useState<User | null>(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });

  function login(user: User) {
    // localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    // setAuthToken(token);
    setUser(user);
  }

  function logout() {
    // localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    // setAuthToken(null);
    setUser(null);

    return <Navigate to="/" />;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
