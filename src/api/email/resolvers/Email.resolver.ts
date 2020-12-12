// // node modules
// // import { Resolver, Query, FieldResolver, Root, Args } from 'type-graphql';
// import { Resolver, Query, Ctx, Mutation, Arg, Args } from 'type-graphql';
// import * as _ from 'lodash';
// import { Service } from 'typedi';

// // models
// import { APIError } from '../../../models/error';
// import { AnyObject } from '../../../models/common';
// import { UtilityHealthCheckObjectType } from '../types';

// // libraries
// import { anyUtils } from '../../../lib/utils/any';
// import { logger } from '../../../lib/logger';

// // services
// import { UtilityHealthService } from '../services';

// class UtilityHealth {}

// @Service()
// @Resolver((_of: unknown) => UtilityHealth)
// export class EmailResolver {
//   public constructor(private readonly emailService: UtilityHealthService) {}

//   @Mutation((_returns: unknown) => Boolean)
//   public async twitterOAuthAccessToken(@Ctx() _context: any, @Arg('data') sendEmailInputType: SendEmailInputType): Promise<boolean> {
//     try {
//       // create params here for ease
//       const [{ userId }, { oAuthVerifier }, oAuthRequestToken, oAuthRequestTokenSecret]: any[] = [
//         authentication.jwt.decode(context.request.headers.authorization) as AnyObject,
//         twitterOAuthAccessTokenInputType,
//         cryptography.unsign(context.request.cookies.oAuthRequestToken, env.COOKIE_SECRET) as string,
//         cryptography.unsign(context.request.cookies.oAuthRequestTokenSecret, env.COOKIE_SECRET) as string,
//       ];
//       // call service to get
//       // access tokens
//       await this.twitterAccessService.oAuthAccessToken({
//         userId,
//         oAuthVerifier,
//         oAuthRequestToken,
//         oAuthRequestTokenSecret,
//       });
//       // clear oAuthRequestToken cookie if we
//       // have gotten this far - if we have we have been successful
//       context.response.clearCookie('oAuthRequestToken');
//       // clear oAuthRequestTokenSecret cookie if we
//       // have gotten this far - if we have we have been successful
//       context.response.clearCookie('oAuthRequestTokenSecret');
//       // return true indicating
//       // we have authed with twitter
//       return true;
//     } catch (err) {
//       // build error
//       const error = new APIError(err);
//       // log for debugging and run support purposes
//       logger.error(`{}TwitterAccessService::#twitterOAuthAccessToken::error executing::error=${utils.anyy.stringify(error)}`);
//       // throw error explicitly
//       throw { errors: [error] };
//     }
//   }
// }
