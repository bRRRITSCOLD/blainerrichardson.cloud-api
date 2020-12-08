// node modules
// import { Resolver, Query, FieldResolver, Root, Args } from 'type-graphql';
import { Resolver, Query, Ctx, Mutation, Arg, Args } from 'type-graphql';
import * as _ from 'lodash';
import { Service } from 'typedi';

// models
import { APIError } from '../../../models/error';
import { AnyObject } from '../../../models/common';
import { UtilityHealthCheckObjectType } from '../types';

// libraries
import { anyUtils } from '../../../lib/utils';
import { logger } from '../../../lib/logger';

// services
import { UtilityHealthService } from '../services';

class UtilityHealth {}

@Service()
@Resolver((_of: unknown) => UtilityHealth)
export class UtilityHealthResolver {
  public constructor(private readonly utilityHealthService: UtilityHealthService) {}

  @Query((_returns: unknown) => UtilityHealthCheckObjectType)
  public async healthCheck(@Ctx() _context: any): Promise<UtilityHealthCheckObjectType> {
    try {
      // call service to get
      // a user timeline that
      // matches the given
      // criteria
      const response = await this.utilityHealthService.healthCheck();
      // return explicitly
      return response;
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}TwitterTimelineResolver::#twitterUserTimeline::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw { errors: [error] };
    }
  }
}
