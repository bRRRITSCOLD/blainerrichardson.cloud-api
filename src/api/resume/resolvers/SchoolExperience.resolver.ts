// node modules
import { Resolver, Query, Ctx, Args, Arg, Mutation } from 'type-graphql';
import * as _ from 'lodash';

// models
import { APIError } from '../../../models/error';
import { SchoolExperience } from '../../../models/resume';
import { SearchSchoolExperiencesArgsType } from '../types/SearchSchoolExperiencesArgsType';
import { SearchSchoolExperiencesObjectType } from '../types/SearchSchoolExperiencesObjectType';

// libraries
import { logger } from '../../../lib/logger';
import { anyUtils } from '../../../lib/utils/any';

// services
import { SchoolExperienceService } from '../services/SchoolExperience.service';
import { PutSchoolExperienceInputType } from '../types/PutSchoolExperiencesInputType';

@Resolver((_of: unknown) => SchoolExperience)
export class SchoolExperienceResolver {
  public constructor(private readonly schoolExperienceService: SchoolExperienceService) {}

  @Query((_returns: unknown) => SearchSchoolExperiencesObjectType)
  public async searchSchoolExperiences(
    @Ctx() _context: any,
    @Args() searchSchoolExperienceArgsType: SearchSchoolExperiencesArgsType,
  ): Promise<SearchSchoolExperiencesObjectType> {
    try {
      // create params here for ease
      const searchSchoolExperiencesResponse = await this.schoolExperienceService.searchSchoolExperiences(searchSchoolExperienceArgsType);

      // return expiclitly
      return searchSchoolExperiencesResponse;
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}SchoolExperienceResolver::#searchSchoolExperiences::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw { errors: [error] };
    }
  }

  @Mutation((_returns: unknown) => SearchSchoolExperiencesObjectType)
  public async putSchoolExperiences(
    @Ctx() _context: any,
    @Arg('data') putSchoolExperienceInputType: PutSchoolExperienceInputType,
  ): Promise<SearchSchoolExperiencesObjectType> {
    try {
      // create params here for ease
      const searchSchoolExperiencesResponse = await this.schoolExperienceService.putSchoolExperience(putSchoolExperienceInputType);

      // return expiclitly
      return searchSchoolExperiencesResponse;
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}SchoolExperienceResolver::#searchSchoolExperiences::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw { errors: [error] };
    }
  }
}
