import { NotificationInstance } from 'antd/es/notification/interface';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

import { auth, db } from './firebase.config';

export type AuthInfo = {
  email: string;
  password: string;
};

export type UserData = AuthInfo & {
  name: string;
};

export function useAuth() {
  const logInWithEmailAndPassword = async ({
    email,
    password,
    api,
  }: AuthInfo & { api: NotificationInstance }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      api.success({ message: 'Success login!' });
    } catch (err) {
      api.error({
        message: 'Login failed',
        description: (err as Error).message,
      });
    }
  };

  const registerWithEmailAndPassword = async ({
    name,
    email,
    password,
    api,
  }: UserData & { api: NotificationInstance }) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name,
        authProvider: ' local ',
        email,
      });
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
        await auth.currentUser.reload();
      }
      api.success({ message: 'Success register!' });
    } catch (err) {
      api.error({
        message: 'register failed',
        description: (err as Error).message,
      });
    }
  };

  const logout = ({ api }: { api: NotificationInstance }) => {
    try {
      signOut(auth);
      api.success({ message: 'Success logout!' });
    } catch (err) {
      api.error({
        message: 'Logout failed',
        description: (err as Error).message,
      });
    }
  };

  return { logInWithEmailAndPassword, registerWithEmailAndPassword, logout };
}
