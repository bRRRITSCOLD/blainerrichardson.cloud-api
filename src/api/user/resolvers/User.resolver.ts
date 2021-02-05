// node modules
import { Resolver, Query, Ctx, Args, Arg, Mutation } from 'type-graphql';
import * as _ from 'lodash';

// models
import { APIError } from '../../../models/error';
import { User, UserToken, UserTokenTypeEnum } from '../../../models/user';
import { AuthenticateUserInputType } from '../types/AuthenticateUserInputType';
import { AuthenticateUserObjectType } from '../types/AuthenticateUserObjectType';
import { UnauthenticateUserObjectType } from '../types/UnauthenticateUserObjectType';

// libraries
import { logger } from '../../../lib/logger';
import { anyUtils } from '../../../lib/utils/any';

// services
import { UserService } from '../services/User.service';

@Resolver((_of: unknown) => User)
export class UserResolver {
  public constructor(private readonly userService: UserService) {}

  @Mutation((_returns: unknown) => AuthenticateUserObjectType)
  public async authenticateUser(
    @Ctx() context: any,
    @Arg('data') authenticateUserInputType: AuthenticateUserInputType,
  ): Promise<AuthenticateUserObjectType> {
    try {
      // create params here for ease
      const authenticateUserResponse = await this.userService.authenticateUser(
        _.assign({}, authenticateUserInputType, { ipAddress: context.request.ip }),
      );
      console.log('authenticateUserResponse=', authenticateUserResponse);
      // set cookies needed
      const userRefreshToken = authenticateUserResponse.userTokens.find(
        (userToken: UserToken) => userToken.tokenType === UserTokenTypeEnum.REFRESH_TOKEN,
      );
      context.response.clearCookie('refreshToken');
      context.response.setCookie('refreshToken', _.get(userRefreshToken, 'token', ''), {
        path: '/',
        httpOnly: true,
        // expires in 7 days if expire date does not exist
        expires: new Date(userRefreshToken?.expireDate || Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      // return expiclitly
      return {
        user: authenticateUserResponse.user,
        userToken: authenticateUserResponse.userTokens.find(
          (userToken: UserToken) => userToken.tokenType === UserTokenTypeEnum.JWT,
        ) as UserToken,
      };
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}UserResolver::#putUsers::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw error;
    }
  }

  @Mutation((_returns: unknown) => UnauthenticateUserObjectType)
  public async unauthenticateUser(@Ctx() context: any): Promise<UnauthenticateUserObjectType> {
    try {
      // clear cookies
      context.response.clearCookie('refreshToken');

      // return expiclitly
      return {
        success: true,
      };
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}UserResolver::#putUsers::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw error;
    }
  }
}
