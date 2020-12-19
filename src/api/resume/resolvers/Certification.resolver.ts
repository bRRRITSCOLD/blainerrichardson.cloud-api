// node modules
import { Resolver, Query, Ctx, Args } from 'type-graphql';
import * as _ from 'lodash';

// models
import { APIError } from '../../../models/error';
import { Certification } from '../../../models/resume';
import { SearchCertificationsArgsType } from '../types/SearchCertificationsArgsType';
import { SearchCertificationsObjectType } from '../types/SearchCertificationsObjectType';

// libraries
import { logger } from '../../../lib/logger';
import { anyUtils } from '../../../lib/utils/any';

// services
import { CertificationService } from '../services/Certification.service';

@Resolver((_of: unknown) => Certification)
export class CertificationlineResolver {
  public constructor(private readonly CertificationService: CertificationService) {}

  @Query((_returns: unknown) => SearchCertificationsObjectType)
  public async searchCertifications(
    @Ctx() _context: any,
    @Args() searchCertificationArgsType: SearchCertificationsArgsType,
  ): Promise<SearchCertificationsObjectType> {
    try {
      // create params here for ease
      const searchCertificationsResponse = await this.CertificationService.searchCertifications(searchCertificationArgsType);

      // return expiclitly
      return searchCertificationsResponse;
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}CertificationlineResolver::#searchCertifications::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw { errors: [error] };
    }
  }
}
