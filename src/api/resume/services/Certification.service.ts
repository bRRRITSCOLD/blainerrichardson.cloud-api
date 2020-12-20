// node_modules
import { Service } from 'typedi';
import * as _ from 'lodash';

// libraries
import { anyUtils } from '../../../lib/utils/any';
import { logger } from '../../../lib/logger';

// models
import { APIError } from '../../../models/error';
import { AnyObject } from 'yup/lib/types';

// data-management
import * as resumeManager from '../../../data-management/resume';
import { Certification, CertificationInterface } from '../../../models/resume';

@Service()
export class CertificationService {
  public async searchCertifications(searchCertificationsRequest: {
    searchCriteria: AnyObject;
    searchOptions?: { pageNumber?: number; pageSize?: number; totalCount?: boolean };
  }): Promise<any> {
    try {
      // deconstruct for east and usability
      const { searchCriteria, searchOptions } = searchCertificationsRequest;

      // call data-management layer to search backend
      // datasources for School experience resume data
      const searchCertificationsResponse = await resumeManager.searchCertifications({
        searchCriteria,
        searchOptions: _.assign({}, searchOptions),
      });

      // return health check explicitly
      return searchCertificationsResponse;
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}searchCertifications::#sendEmail::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw error;
    }
  }

  public async putCertifications(putCertificationsRequest: { certifications: CertificationInterface[] }): Promise<any> {
    try {
      // deconstruct for east and usability
      const { certifications } = putCertificationsRequest;

      // call data-management layer to search backend
      // datasources for School experience resume data
      const putCertificationsResponse = await resumeManager.putCertifications({ certifications });

      // return health check explicitly
      return putCertificationsResponse;
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}CertificationService::#putCertifications::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw error;
    }
  }

  public async deleteCertifications(deleteCertificationsRequest: { certificationIds: string[] }): Promise<any> {
    try {
      // deconstruct for east and usability
      const { certificationIds } = deleteCertificationsRequest;

      // call data-management layer to search backend
      // datasources for School experience resume data
      const deleteCertificationsResponse = await resumeManager.deleteCertifications({ certificationIds });

      // return health check explicitly
      return deleteCertificationsResponse;
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}CertificationService::#deleteCertifications::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw error;
    }
  }
}
