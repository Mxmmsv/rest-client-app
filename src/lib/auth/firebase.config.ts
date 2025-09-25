import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD1TbKtH8lTfwQqhIKDD9zdSKIqQ2O0hFE',
  authDomain: 'rest-client-22734.firebaseapp.com',
  projectId: 'rest-client-22734',
  storageBucket: 'rest-client-22734.firebasestorage.app',
  messagingSenderId: '622207028119',
  appId: '1:622207028119:web:8a818c4e0ca5e8c14b52d2',
  measurementId: 'G-B1V015HYL2',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
