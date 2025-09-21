import { toast } from 'react-toastify';

import { adminAuth } from './firebaseAdmin';

import type { NextRequest } from 'next/server';

export async function getUser(req: NextRequest) {
  const token = req.cookies.get('firebase_token')?.value;
  if (!token) return null;

  try {
    const decoded = await adminAuth.verifySessionCookie(token, true);
    return decoded;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    toast.error(`[getUser] verifySessionCookie failed: ${errorMessage}`);
    return null;
  }
}
