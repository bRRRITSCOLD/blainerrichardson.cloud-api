// node modules
import { Resolver, Query, Ctx, Args, Arg, Mutation, UseMiddleware } from 'type-graphql';
import * as _ from 'lodash';

// models
import { APIError } from '../../../models/error';
import { UserToken, UserTokenTypeEnum } from '../../../models/user';
import { RefreshUserTokenObjectType } from '../types/RefreshUserTokenObjectType';

// libraries
import { logger } from '../../../lib/logger';
import { anyUtils } from '../../../lib/utils/any';

// decorators
import { JWTAuthorization, CurrentUser } from '../../../decorators/security';

// services
import { UserTokenService } from '../services/UserToken.service';

@Resolver((_of: unknown) => UserToken)
export class UserTokenResolver {
  public constructor(private readonly userTokenService: UserTokenService) {}

  @Mutation((_returns: unknown) => RefreshUserTokenObjectType)
  @JWTAuthorization()
  @CurrentUser()
  public async refreshUserToken(@Ctx() context: any): Promise<RefreshUserTokenObjectType> {
    try {
      // create params here for ease
      const refreshUserTokenResponse = await this.userTokenService.refreshUserToken({
        refreshToken: context.request.cookies.refreshToken,
        ipAddress: context.request.ip,
      });

      // set cookies needed
      const userTokenRefreshToken = refreshUserTokenResponse.userTokens.find(
        (userToken: UserToken) => userToken.tokenType === UserTokenTypeEnum.REFRESH_TOKEN,
      );
      context.response.clearCookie('refreshToken');
      context.response.setCookie('refreshToken', _.get(userTokenRefreshToken, 'token', ''), {
        path: '/',
        httpOnly: true,
        // expires in 7 days if expire date does not exist
        expires: new Date(userTokenRefreshToken?.expireDate || Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      // return expiclitly
      return {
        user: refreshUserTokenResponse.user,
        userToken: refreshUserTokenResponse.userTokens.find(
          (userToken: UserToken) => userToken.tokenType === UserTokenTypeEnum.JWT,
        ) as UserToken,
      };
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}UserTokenResolver::#putUserTokens::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw { errors: [error] };
    }
  }
}
