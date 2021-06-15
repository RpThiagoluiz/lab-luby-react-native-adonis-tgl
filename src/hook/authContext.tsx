import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Auth from "../services/sessionSingIn";
import { userData as AsyncUserData } from "../@types";
import { api } from "../services/api";

interface UserData {
  email: string;
  password: string;
}

interface AuthContextData {
  user: AsyncUserData | null;
  signed: boolean;
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
  const [user, setUser] = useState<AsyncUserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAsyncStorageData = async () => {
      const token = await AsyncStorage.getItem("@tgl-labluby-devthiago");
      const user = await AsyncStorage.getItem("@tgl-labluby-devthiago-user");

      if (token && user) {
        setUser(JSON.parse(user));
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
        setLoading(false);
      }
      setLoading(false);
    };

    loadAsyncStorageData();
  }, []);

  const signIn = async ({ email, password }: UserData) => {
    const { data } = await Auth.singIn({ email, password });

    //verificar se teve sucesso

    const {
      token: { token },
      user,
    } = data;

    await AsyncStorage.setItem("@tgl-labluby-devthiago", token);
    await AsyncStorage.setItem(
      "@tgl-labluby-devthiago-user",
      JSON.stringify(user)
    );

    const { username, created_at, updated_at } = user;

    const userDataResponse: AsyncUserData = {
      username,
      email: user.email,
      created_at,
      updated_at,
    };

    api.defaults.headers["Authorization"] = `Bearer ${token}`;
    setUser(userDataResponse);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("@tgl-labluby-devthiago");
    await AsyncStorage.removeItem("@tgl-labluby-devthiago-user");

    setUser(null);
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
        user,
        loading,
        signed: !!user,
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
