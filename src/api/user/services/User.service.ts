// node_modules
import { Service } from 'typedi';
import * as _ from 'lodash';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

// libraries
import { anyUtils } from '../../../lib/utils/any';
import { logger } from '../../../lib/logger';

// models
import { APIError } from '../../../models/error';
import { AnyObject } from 'yup/lib/types';

// data-management
import * as userManager from '../../../data-management/user';
import { User, UserInterface, UserToken, UserTokenTypeEnum } from '../../../models/user';
import { env } from '../../../lib/environment';
import { dateUtils } from '../../../lib/utils/date';

@Service()
export class UserService {
  public async authenticateUser(authenticateUserRequest: {
    username: string;
    password: string;
    ipAddress: string;
  }): Promise<{ user: User; userTokens: UserToken[] }> {
    try {
      // deconstruct for east and usability
      const { username, password, ipAddress } = authenticateUserRequest;

      // search and find user
      const searchUsersResponse = await userManager.searchUsers({
        searchCriteria: { username },
        searchOptions: { pageNumber: 1, pageSize: 1 },
      });

      // validate a user was found
      const user = searchUsersResponse.users[0];
      console.log(`user`, user);
      if (!user || !(await bcrypt.compare(password, user.passwordHash as string))) {
        throw new Error('username or password is incorrect');
      }

      // create new refresh token and save in back end data stores
      const userRefreshToken = new UserToken({
        userId: user.userId,
        tokenType: UserTokenTypeEnum.REFRESH_TOKEN,
        token: crypto.randomBytes(40).toString('hex'),
        userTokenId: uuid(),
        relatedTokenIds: [],
        expireDate: dateUtils.dateTime(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
        createdDate: dateUtils.dateTime(new Date(Date.now())),
        createdIp: ipAddress,
      });
      const putUserTokensResponse = await userManager.putUserTokens({
        userTokens: [userRefreshToken],
      });

      // create jwt for user
      const userJwtToken = new UserToken({
        userId: user.userId,
        tokenType: UserTokenTypeEnum.JWT,
        token: jwt.sign({ sub: user.userId, userId: user.userId }, env.JWT_SECRET, { expiresIn: '15m' }),
        userTokenId: uuid(),
        relatedTokenIds: [userRefreshToken.userTokenId],
        expireDate: dateUtils.dateTime(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
        createdDate: dateUtils.dateTime(new Date(Date.now())),
        createdIp: ipAddress,
      });

      // create first user tokens for user after successful
      // registration/ storage of user data so that the end user
      // can access items that are guarded by auth and tokens

      // return health check explicitly
      return {
        user: _.assign({}, user, { passwordHash: undefined }),
        userTokens: [putUserTokensResponse.userTokens[0], userJwtToken],
      };
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}UserService::#authenticateUser::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw error;
    }
  }
}

// function generateJwtToken(user: User) {
//   // create a jwt token containing the user id that expires in 15 minutes
//   return jwt.sign({ sub: user.userId, id: user.userId }, env.JWT_SECRET, { expiresIn: '15m' });
// }

// function generateRefreshToken(user, ipAddress) {
//   // create a refresh token that expires in 7 days
//   return new db.RefreshToken({
//     user: user.id,
//     token: randomTokenString(),
//     expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//     createdByIp: ipAddress,
//   });
// }

// function randomTokenString() {
//   return crypto.randomBytes(40).toString('hex');
// }
