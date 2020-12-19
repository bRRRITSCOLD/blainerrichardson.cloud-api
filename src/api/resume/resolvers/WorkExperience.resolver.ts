// node modules
import { Resolver, Query, Ctx, Args, Arg, Mutation } from 'type-graphql';
import * as _ from 'lodash';

// models
import { APIError } from '../../../models/error';
import { WorkExperience } from '../../../models/resume';
import { SearchWorkExperiencesArgsType } from '../types/SearchWorkExperiencesArgsType';
import { SearchWorkExperiencesObjectType } from '../types/SearchWorkExperiencesObjectType';

// libraries
import { logger } from '../../../lib/logger';
import { anyUtils } from '../../../lib/utils/any';

// services
import { WorkExperienceService } from '../services/WorkExperience.service';
import { PutWorkExperiencesObjectType } from '../types/PutWorkExperiencesObjectType';
import { PutWorkExperiencesInputType } from '../types/PutWorkExperiencesInputType';

@Resolver((_of: unknown) => WorkExperience)
export class WorkExperienceResolver {
  public constructor(private readonly workExperienceService: WorkExperienceService) {}

  @Query((_returns: unknown) => SearchWorkExperiencesObjectType)
  public async searchWorkExperiences(
    @Ctx() _context: any,
    @Args() searchWorkExperienceArgsType: SearchWorkExperiencesArgsType,
  ): Promise<SearchWorkExperiencesObjectType> {
    try {
      // create params here for ease
      const searchWorkExperiencesResponse = await this.workExperienceService.searchWorkExperiences(searchWorkExperienceArgsType);

      // return expiclitly
      return searchWorkExperiencesResponse;
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}WorkExperienceResolver::#searchWorkExperiences::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw { errors: [error] };
    }
  }

  @Mutation((_returns: unknown) => PutWorkExperiencesObjectType)
  public async putWorkExperiences(
    @Ctx() _context: any,
    @Arg('data') putWorkExperienceInputType: PutWorkExperiencesInputType,
  ): Promise<PutWorkExperiencesObjectType> {
    try {
      // create params here for ease
      const putSchoolExperiencesResponse = await this.workExperienceService.putWorkExperiences(putWorkExperienceInputType);

      // return expiclitly
      return putSchoolExperiencesResponse;
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}WorkExperienceResolver::#putSchoolExperiences::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw { errors: [error] };
    }
  }
}
