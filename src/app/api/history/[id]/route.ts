import { NextResponse } from 'next/server';

import { adminDb } from '@/lib/requests/firebaseAdmin';
import { getUser } from '@/lib/requests/getUserFromRequest';
import type { RequestHistoryItem } from '@/lib/requests/types';

import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const user = await getUser(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = req.nextUrl.pathname.split('/').pop();
  if (!id) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  const docSnap = await adminDb.collection('requests').doc(id).get();
  if (!docSnap.exists) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const data = docSnap.data() as Omit<RequestHistoryItem, 'id'>;

  if (data.userId !== user.uid) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return NextResponse.json({ id: docSnap.id, ...data });
}
