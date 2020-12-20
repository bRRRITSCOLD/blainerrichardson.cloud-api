// node modules
import { Resolver, Query, Ctx, Args, Arg, Mutation } from 'type-graphql';
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
import { PutCertificationsInputType } from '../types/PutCertificationsInputType';
import { PutCertificationsObjectType } from '../types/PutCertificationsObjectType';
import { DeleteCertificationsInputType } from '../types/DeleteCertificationsInputType';
import { DeleteCertificationsObjectType } from '../types/DeleteCertificationsObjectType';

@Resolver((_of: unknown) => Certification)
export class CertificationlineResolver {
  public constructor(private readonly certificationService: CertificationService) {}

  @Query((_returns: unknown) => SearchCertificationsObjectType)
  public async searchCertifications(
    @Ctx() _context: any,
    @Args() searchCertificationArgsType: SearchCertificationsArgsType,
  ): Promise<SearchCertificationsObjectType> {
    try {
      // create params here for ease
      const searchCertificationsResponse = await this.certificationService.searchCertifications(searchCertificationArgsType);

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

  @Mutation((_returns: unknown) => PutCertificationsObjectType)
  public async putCertifications(
    @Ctx() _context: any,
    @Arg('data') putCertificationsInputType: PutCertificationsInputType,
  ): Promise<PutCertificationsObjectType> {
    try {
      // create params here for ease
      const putCertificationsResponse = await this.certificationService.putCertifications(putCertificationsInputType);

      // return expiclitly
      return putCertificationsResponse;
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}CertificationResolver::#putCertifications::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw { errors: [error] };
    }
  }

  @Mutation((_returns: unknown) => DeleteCertificationsObjectType)
  public async deleteCertifications(
    @Ctx() _context: any,
    @Arg('data') deleteCertificationsInputType: DeleteCertificationsInputType,
  ): Promise<DeleteCertificationsObjectType> {
    try {
      // create params here for ease
      const deleteCertificationsResponse = await this.certificationService.deleteCertifications(deleteCertificationsInputType);

      // return expiclitly
      return deleteCertificationsResponse;
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}CertificationResolver::#deleteCertifications::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw { errors: [error] };
    }
  }
}
