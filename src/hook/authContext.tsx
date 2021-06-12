import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Auth from "../services/sessionSingIn";
import { api } from "../services/api";

interface UserData {
  email: string;
  password: string;
}

interface TokenData {
  token: string;
}

interface ResponseApiDataSession {
  user: object;
  token: object;
}

interface AuthContextData {
  userEmail: string | null;
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
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAsyncStorageData = async () => {
      const token = await AsyncStorage.getItem("@tgl-labluby-devthiago");
      const userEmail = await AsyncStorage.getItem(
        "@tgl-labluby-devthiago-user"
      );

      //Tempo de loading da informacao
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (token && userEmail) {
        setUserEmail(JSON.parse(userEmail));
        setLoading(false);
      }
      setLoading(false);
    };

    loadAsyncStorageData();
  }, []);

  // useEffect(() => {
  //   const loadDataWhenTokenExist = async () => {
  //     const token = await AsyncStorage.getItem("@tgl-labluby-devthiago");

  //     if (token) {
  //       setFindToken({ token });
  //       api.defaults.headers.Authorization = `Bearer ${token}`;
  //     }

  //     setLoading(false);
  //   };

  //   loadDataWhenTokenExist();
  // }, []);

  const signIn = async ({ email, password }: UserData) => {
    const { data } = await Auth.singIn({ email, password });

    //verificar se teve sucesso

    const {
      token: { token },
      user,
    } = data;

    api.defaults.headers.Authorization = `Bearer ${token}`;
    await AsyncStorage.setItem("@tgl-labluby-devthiago", token);
    await AsyncStorage.setItem(
      "@tgl-labluby-devthiago-user",
      JSON.stringify(user)
    );

    setUserEmail(user.email);

    // setLoading(true);
    // try {
    //   const response = await api.post("/sessions", {
    //     email,
    //     password,
    //   });

    //   const { token } = response.data.token;
    //   const user = response.data.user;

    //   await AsyncStorage.setItem("@tgl-labluby-devthiago", token);
    //   await AsyncStorage.setItem("@tgl-labluby-devthiago-user", user);

    //   setUserEmail(user.email);
    //   setFindToken(token);
    //   setSigned(true);
    //   setLoading(false);

    //   api.defaults.headers.Authorization = `Bearer ${token}`;
    // } catch (error) {
    //   console.log(error.response);
    //   setLoading(false);
    // }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("@tgl-labluby-devthiago");
    await AsyncStorage.removeItem("@tgl-labluby-devthiago-user");

    setUserEmail(null);
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
        loading,
        signed: !!userEmail,
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
