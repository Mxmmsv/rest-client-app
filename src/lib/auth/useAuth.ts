import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { auth, db } from './firebase.config';

export type AuthInfo = {
  email: string;
  password: string;
};

export type UserData = AuthInfo & {
  name: string;
};

export function useAuth() {
  const logInWithEmailAndPassword = async ({ email, password }: AuthInfo) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Success login!');
    } catch (err) {
      toast.error(`Login failed ${(err as Error).message}`);
    }
  };

  const registerWithEmailAndPassword = async ({ name, email, password }: UserData) => {
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
      toast.success('Success register!');
    } catch (err) {
      toast.error(`Register failed ${(err as Error).message}`);
    }
  };

  const logout = () => {
    try {
      signOut(auth);
      toast.success('Success logout! We will miss you!');
    } catch (err) {
      toast.error(`Logout failed ${(err as Error).message}`);
    }
  };

  return { logInWithEmailAndPassword, registerWithEmailAndPassword, logout };
}
