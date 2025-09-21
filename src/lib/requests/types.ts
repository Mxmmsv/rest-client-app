export type RequestHistoryItem = {
  id: string;
  userId: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
  latency: number | null;
  statusCode: number | null;
  requestSize: number;
  responseSize: number;
  error?: string | null;
  headers?: Record<string, string>;
  body?: string | null;
  timestamp: Date;
};

export type FirestoreRequestData = {
  userId: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
  latency: number | null;
  statusCode: number | null;
  requestSize: number;
  responseSize: number;
  error?: string | null;
  headers?: Record<string, string>;
  body?: string | null;
  timestamp: FirebaseFirestore.Timestamp;
};
