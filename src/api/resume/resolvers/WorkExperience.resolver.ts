// node modules
import { Resolver, Query, Ctx, Args } from 'type-graphql';
import * as _ from 'lodash';

// models
import { APIError } from '../../../models/error';
import { WorkExperience } from '../../../models/resume';
import { SearchWorkExperienceArgsType } from '../types/SearchWorkExperienceArgsType';
import { SearchWorkExperienceResponseObjectType } from '../types/SearchWorkExperienceResponseObjectType';

// libraries
import { logger } from '../../../lib/logger';
import { anyUtils } from '../../../lib/utils/any';

// services
import { WorkExperienceService } from '../services/WorkExperience.service';

@Resolver((_of: unknown) => WorkExperience)
export class WorkExperiencelineResolver {
  public constructor(private readonly workExperienceService: WorkExperienceService) {}

  @Query((_returns: unknown) => SearchWorkExperienceResponseObjectType)
  public async searchWorkExperiences(
    @Ctx() _context: any,
    @Args() searchWorkExperienceArgsType: SearchWorkExperienceArgsType,
  ): Promise<SearchWorkExperienceResponseObjectType> {
    try {
      // create params here for ease
      const searchWorkExperiencesResponse = await this.workExperienceService.searchWorkExperiences(searchWorkExperienceArgsType);

      // return expiclitly
      return searchWorkExperiencesResponse;
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}WorkExperiencelineResolver::#searchWorkExperiences::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw { errors: [error] };
    }
  }
}
