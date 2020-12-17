// node modules
import { Resolver, Query, Ctx, Args } from 'type-graphql';
import * as _ from 'lodash';

// models
import { APIError } from '../../../models/error';
import { SchoolExperience } from '../../../models/resume';
import { SearchSchoolExperiencesArgsType } from '../types/SearchSchoolExperiencesArgsType';
import { SearchSchoolExperiencesResponseObjectType } from '../types/SearchSchoolExperiencesResponseObjectType';

// libraries
import { logger } from '../../../lib/logger';
import { anyUtils } from '../../../lib/utils/any';

// services
import { SchoolExperienceService } from '../services/SchoolExperience.service';

@Resolver((_of: unknown) => SchoolExperience)
export class SchoolExperiencelineResolver {
  public constructor(private readonly SchoolExperienceService: SchoolExperienceService) {}

  @Query((_returns: unknown) => SearchSchoolExperiencesResponseObjectType)
  public async searchSchoolExperiences(
    @Ctx() _context: any,
    @Args() searchSchoolExperienceArgsType: SearchSchoolExperiencesArgsType,
  ): Promise<SearchSchoolExperiencesResponseObjectType> {
    try {
      // create params here for ease
      const searchSchoolExperiencesResponse = await this.SchoolExperienceService.searchSchoolExperiences(searchSchoolExperienceArgsType);

      // return expiclitly
      return searchSchoolExperiencesResponse;
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}SchoolExperiencelineResolver::#searchSchoolExperiences::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw { errors: [error] };
    }
  }
}
