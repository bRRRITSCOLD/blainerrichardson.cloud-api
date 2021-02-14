// node modules
import { Resolver, Query, Ctx, Args, Arg, Mutation } from 'type-graphql';
import * as _ from 'lodash';

// models
import { APIError } from '../../../models/error';
import { Resume } from '../../../models/resume';
import { DownloadResumeObjectType } from '../types/DownloadResumeObjectType';

// libraries
import { logger } from '../../../lib/logger';
import { anyUtils } from '../../../lib/utils/any';

// decorators
import { CurrentUser, JWTAuthorization } from '../../../decorators/security';

// services
import { ResumeService } from '../services/Resume.service';

@Resolver((_of: unknown) => Resume)
export class ResumelineResolver {
  public constructor(private readonly resumeService: ResumeService) {}

  @Query((_returns: unknown) => DownloadResumeObjectType)
  public async downloadResume(@Ctx() _context: any): Promise<DownloadResumeObjectType> {
    try {
      // create params here for ease
      const downloadResumeResponse = await this.resumeService.downloadResume();

      // return expiclitly
      return downloadResumeResponse;
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}ResumelineResolver::#downloadResume::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw { errors: [error] };
    }
  }
}
