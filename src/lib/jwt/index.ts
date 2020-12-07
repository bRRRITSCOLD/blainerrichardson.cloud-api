import * as jwt from 'jsonwebtoken';

export const verify = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
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
