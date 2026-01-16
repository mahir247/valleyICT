import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'dev_jwt_secret';

export function signToken(payload: Record<string, any>, options?: jwt.SignOptions) {
  return jwt.sign(payload, SECRET, { expiresIn: '1h', ...(options || {}) });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as Record<string, any>;
  } catch (e) {
    return null;
  }
}
