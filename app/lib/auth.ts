import { verifyToken } from './jwt';

export function getTokenFromRequest(req: Request) {
  const auth = req.headers.get('authorization');
  if (auth?.startsWith('Bearer ')) return auth.split(' ')[1];
  const cookie = req.headers.get('cookie');
  if (!cookie) return null;
  const match = cookie.split(';').map(c => c.trim()).find(c => c.startsWith('token='));
  if (!match) return null;
  return match.split('=')[1];
}

export function requireAuth(req: Request) {
  const token = getTokenFromRequest(req);
  const payload = token ? verifyToken(token) : null;
  if (!payload || !payload.id) {
    throw new Error('Unauthorized');
  }
  return payload;
}
