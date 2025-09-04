/* eslint-disable sonarjs/todo-tag */
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

import { auth, db } from './firebase.config';

export type AuthInfo = {
  email: string;
  password: string;
};

export type UserData = AuthInfo & {
  name: string;
};

const logInWithEmailAndPassword = async ({ email, password }: AuthInfo) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    //TODO implement toast
  }
};

const registerWithEmailAndPassword = async ({ name, email, password }: UserData) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), { uid: user.uid, name, authProvider: ' local ', email });
  } catch (err) {
    console.error(err);
    //TODO implement toast
  }
};

const logout = () => {
  signOut(auth);
  //TODO implement toast
};

export { logInWithEmailAndPassword, registerWithEmailAndPassword, logout };
