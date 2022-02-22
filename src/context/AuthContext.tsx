import { createContext } from "react";
import firebase from "firebase/auth";

export const AuthContext = createContext<firebase.User | null>(null);