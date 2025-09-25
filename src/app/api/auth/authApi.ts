export async function createSession(idToken: string) {
  return fetch('/api/auth/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
    credentials: 'include',
  });
}

export async function destroySession() {
  return fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });
}
