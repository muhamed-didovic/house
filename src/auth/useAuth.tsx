import React, {useState, useEffect, ReactNode, useContext, createContext} from 'react';
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/auth";
import {auth, firebaseApp} from "./initFirebase";
import { removeTokenCookie, setTokenCookie } from "./tokenCookies";
import {onAuthStateChanged, signOut, User} from "@firebase/auth";

// initFirebase();

interface IAuthContext {
  user: User | null;
  logout: () => void;
  authenticated: boolean;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  logout: () => null,
  authenticated: false,
});

interface AuthContextProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthContextProps) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const logout = async () => {
    await signOut(auth)
    await router.push("/");
    // firebase
    //   .auth()
    //   .signOut()
    //   .then(() => {
    //     router.push("/");
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
  };

  /*useEffect(() => {
    const cancelAuthListener = firebase
      .auth()
      .onIdTokenChanged(async (user) => {
        if (user) {
          const token = await user.getIdToken();
          setTokenCookie(token);
          setUser(user);
        } else {
          removeTokenCookie();
          setUser(null);
        }
      });

    return () => {
      cancelAuthListener();
    };
  }, []);*/

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(false)
      if (user) {
        const token = await user.getIdToken();
        setTokenCookie(token);
        setUser(user);
      } else {
        removeTokenCookie();
        setUser(null);
      }
    })

    return unsubscribe
  }, [auth])

  return (
      <AuthContext.Provider value={{ user, logout, authenticated: !!user }}>
        {children}
      </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
