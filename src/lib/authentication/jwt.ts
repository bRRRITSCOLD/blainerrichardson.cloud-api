// node_modules
import * as jsonwebtoken from 'jsonwebtoken';

export const jwt = {
  verify(token: string, secret: string): string | any {
    return jsonwebtoken.verify(token, secret);
  },
  decode(
    token: string,
  ):
    | string
    | {
        [key: string]: any;
      }
    | null {
    return jsonwebtoken.decode(token);
  },
  sign(
    payload: any,
    secret: string,
  ):
    | string
    | {
        [key: string]: any;
      }
    | null {
    return jsonwebtoken.sign(payload, secret);
  },
};
