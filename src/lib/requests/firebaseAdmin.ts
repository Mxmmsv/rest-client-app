import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

import type { ServiceAccount } from 'firebase-admin';

const rawKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
if (!rawKey) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not defined');
}

const serviceAccount = JSON.parse(rawKey) as ServiceAccount;

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export const adminAuth = getAuth();
export const adminDb = getFirestore();
