import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";

interface UserData {
  email: string;
  password: string;
}

interface TokenData {
  token: string;
}

interface AuthContextData {
  userEmail: string;
  findToken: TokenData;
  logged: boolean;
  loading: boolean;
  signIn: ({ email, password }: UserData) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser(userData: UserData): Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userEmail, setUserEmail] = useState("");
  const [logged, setLogged] = useState<boolean>(false);
  const [findToken, setFindToken] = useState({} as TokenData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDataWhenUserExist = async () => {
      const isLogged = await AsyncStorage.getItem("@tgl-labluby-devthiago");
      setLogged(!!isLogged);

      setLoading(false);
    };
    loadDataWhenUserExist();
  }, []);

  useEffect(() => {
    const loadDataWhenTokenExist = async () => {
      const token = await AsyncStorage.getItem("@tgl-labluby-devthiago");

      if (token) {
        setFindToken({ token });
        api.defaults.headers.Authorization = `Bearer ${token}`;
      }

      setLoading(false);
    };

    loadDataWhenTokenExist();
  }, []);

  const signIn = async ({ email, password }: UserData) => {
    setLoading(true);
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });

      const { token } = response.data.token;
      const user = response.data.user;

      await AsyncStorage.setItem("@tgl-labluby-devthiago", token);
      await AsyncStorage.setItem("@tgl-labluby-devthiago-user", user);

      setUserEmail(user.email);
      setFindToken(token);
      setLogged(true);
      setLoading(false);

      api.defaults.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    await AsyncStorage.removeItem("@tgl-labluby-devthiago");
    await AsyncStorage.removeItem("@tgl-labluby-devthiago-user");
    setFindToken({} as TokenData);
    setLogged(false);
    setLoading(false);
  };

  const updateUser = async (userData: any) => {
    setLoading(true);
    try {
      await api.put("/users ", {
        name: userData.username,
        email: userData.email,
        password: userData.password,
      });
      setLoading(false);
    } catch (err) {
      alert("Erro ao atualizar perfil!");
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userEmail,
        findToken,
        loading,
        logged,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
