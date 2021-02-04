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
import { env } from '../../../lib/environment';
import { dateUtils } from '../../../lib/utils/date';

// models
import { APIError } from '../../../models/error';
import { UserToken, UserTokenInterface, UserTokenTypeEnum, User } from '../../../models/user';

// data-management
import * as userManager from '../../../data-management/user';

@Service()
export class UserTokenService {
  public async refreshUserToken(refreshUserTokenRequest: {
    refreshToken: string;
    ipAddress: string;
  }): Promise<{ user: User; userTokens: UserToken[] }> {
    try {
      // deconstruct for east and usability
      const { refreshToken, ipAddress } = refreshUserTokenRequest;
      console.log(`refreshToken`, refreshToken);

      // search and find userToken
      const searchUserTokensResponse = await userManager.searchUserTokens({
        searchCriteria: { token: refreshToken },
        searchOptions: { pageNumber: 1, pageSize: 1 },
      });

      // validate a userToken was found
      const userToken = searchUserTokensResponse.userTokens[0];
      if (!userToken || !userToken.isActive) {
        throw new Error('User token not found.');
      }

      // search and get user info to return
      const searchUsersResponse = await userManager.searchUsers({
        searchCriteria: { userId: userToken.userId },
        searchOptions: { pageNumber: 1, pageSize: 1 },
      });

      // validate a user was found
      const user = searchUsersResponse.users[0];
      if (!user) {
        throw new Error('User not found.');
      }

      // create new refresh token and save in back end data stores
      const newUserTokenRefreshToken = new UserToken({
        userId: user.userId,
        tokenType: UserTokenTypeEnum.REFRESH_TOKEN,
        token: crypto.randomBytes(40).toString('hex'),
        userTokenId: uuid(),
        relatedTokenIds: [userToken.userTokenId],
        expireDate: dateUtils.dateTime(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
        createdDate: dateUtils.dateTime(new Date(Date.now())),
        createdIp: ipAddress,
      });
      const updatedOldUserRefreshToken = new UserToken(
        _.assign(
          {},
          userToken,
          _.omitBy(
            {
              _id: undefined,
              revokedDate: dateUtils.dateTime(new Date(Date.now())),
              revokedIp: ipAddress,
            },
            _.isUndefined,
          ),
        ),
      );
      const putUserTokensResponse = await userManager.putUserTokens({
        userTokens: [newUserTokenRefreshToken, updatedOldUserRefreshToken],
      });

      // create jwt for userToken
      const userTokenJwtToken = new UserToken({
        userId: user.userId,
        tokenType: UserTokenTypeEnum.JWT,
        token: jwt.sign({ sub: user.userId, userId: user.userId }, env.JWT_SECRET, { expiresIn: '15m' }),
        userTokenId: uuid(),
        relatedTokenIds: [newUserTokenRefreshToken.userTokenId],
        expireDate: dateUtils.dateTime(new Date(Date.now() + 900000)),
        createdDate: dateUtils.dateTime(new Date(Date.now())),
        createdIp: ipAddress,
      });

      // return health check explicitly
      return {
        user: _.assign({}, user, { passwordHash: undefined }),
        userTokens: [putUserTokensResponse.userTokens[0], userTokenJwtToken],
      };
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}UserTokenService::#refreshUserToken::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw error;
    }
  }
}
