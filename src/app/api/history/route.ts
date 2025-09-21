import { Timestamp } from 'firebase-admin/firestore';
import { NextResponse } from 'next/server';

import type { Header } from '@/components/restClient/types';
import { adminDb } from '@/lib/requests/firebaseAdmin';
import { getUser } from '@/lib/requests/getUserFromRequest';
import type { FirestoreRequestData, RequestHistoryItem } from '@/lib/requests/types';

import type { NextRequest } from 'next/server';

type RequestBody = Omit<RequestHistoryItem, 'id' | 'userId' | 'timestamp'>;

export async function POST(req: NextRequest) {
  const user = await getUser(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = (await req.json()) as RequestBody;

  let headersObject: Record<string, string> = {};

  if (Array.isArray(data.headers)) {
    (data.headers as Header[]).forEach((header) => {
      if (header.key) {
        headersObject[header.key] = header.value;
      }
    });
  } else if (data.headers) {
    headersObject = data.headers;
  }

  const ref = await adminDb.collection('requests').add({
    ...data,
    headers: headersObject,
    body: data.body ?? '',
    userId: user.uid,
    timestamp: Timestamp.now(),
  });

  return NextResponse.json({ id: ref.id });
}

export async function GET(req: NextRequest) {
  const user = await getUser(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const snapshot = await adminDb
    .collection('requests')
    .where('userId', '==', user.uid)
    .orderBy('timestamp', 'desc')
    .get();

  const requests: RequestHistoryItem[] = snapshot.docs.map((doc) => {
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

  return NextResponse.json(requests);
}
