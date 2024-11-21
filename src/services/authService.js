import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

export const loginUserFromFirebase = async (email, password) => await signInWithEmailAndPassword(auth, email, password);
export const registerUser = async (email, password) => await createUserWithEmailAndPassword(auth, email, password);
export const logoutUser = async () => await signOut(auth)