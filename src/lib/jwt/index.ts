import * as jwt from 'jsonwebtoken';

// libraries
import { env } from '../environment';

export const verify = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET);
};

export const decode = (token: string) => {
  return jwt.decode(token);
};

export const roles = (token: string, roles: string[]) => {
  const decodedToken: any = jwt.decode(token);
  const authorized: boolean[] = roles
    .map((role: string) => {
      if ((decodedToken.roles as string).split(';').includes('*') || (decodedToken.roles as string).split(';').includes(role)) {
        return true;
      } else {
        return false;
      }
    })
    .filter((result: boolean) => result !== true);
  if (authorized.length === 0) throw new Error('unauthorized');
  return;
};

export const sign = (payload: { userId: string }) => {
  return jwt.sign({ sub: payload.userId, userId: payload.userId }, env.JWT_SECRET, { expiresIn: '15m' });
};
