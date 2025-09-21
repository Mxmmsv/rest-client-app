import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { adminAuth, adminDb } from '@/lib/requests/firebaseAdmin';
import type { FirestoreRequestData, RequestHistoryItem } from '@/lib/requests/types';

import EmptyHistoryPage from './EmptyHistoryPage';
import HistoryRequestsPage from './HistoryRequestsPage';

export default async function HistoryPageContent() {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get('firebase_token')?.value;

  if (!rawToken) {
    redirect('/login');
  }

  try {
    const decoded = await adminAuth.verifySessionCookie(rawToken, true);
    const uid = decoded.uid;

    const snapshot = await adminDb
      .collection('requests')
      .where('userId', '==', uid)
      .orderBy('timestamp', 'desc')
      .get();

    const history: RequestHistoryItem[] = snapshot.docs.map((doc) => {
      const data = doc.data() as FirestoreRequestData;
      return {
        id: doc.id,
        userId: data.userId,
        url: data.url,
        method: data.method,
        latency: data.latency,
        statusCode: data.statusCode,
        requestSize: data.requestSize,
        responseSize: data.responseSize,
        error: data.error ?? null,
        headers: data.headers ?? {},
        body: data.body ?? null,
        timestamp: data.timestamp.toDate(),
      };
    });

    if (history.length === 0) {
      return <EmptyHistoryPage />;
    }

    return <HistoryRequestsPage history={history} />;
  } catch (err) {
    console.error('Token validation failed:', err);
    redirect('/login');
  }
}
