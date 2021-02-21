// node_modules
import { Service } from 'typedi';
import * as _ from 'lodash';

// libraries
import { anyUtils } from '../../../lib/utils/any';
import { logger } from '../../../lib/logger';

// models
import { APIError } from '../../../models/error';

// data-management
import * as resumeManager from '../../../data-management/resume';

@Service()
export class ResumeService {
  public async downloadResume(): Promise<any> {
    try {
      // search all resume items
      const [{ workExperiences }, { schoolExperiences }, { certifications }] = await Promise.all([
        resumeManager.searchWorkExperiences({
          searchCriteria: {},
          searchOptions: _.assign({}, { pageSize: Number.MAX_SAFE_INTEGER, pageNumber: 1 }),
        }),
        resumeManager.searchSchoolExperiences({
          searchCriteria: {},
          searchOptions: _.assign({}, { pageSize: Number.MAX_SAFE_INTEGER, pageNumber: 1 }),
        }),
        resumeManager.searchCertifications({
          searchCriteria: {},
          searchOptions: _.assign({}, { pageSize: Number.MAX_SAFE_INTEGER, pageNumber: 1 }),
        }),
      ]);

      // create the resume pdf based on the queried data
      const searchResumeResponse = await resumeManager.createResumePDF({
        workExperiences,
        schoolExperiences,
        certifications,
      });

      // return health check explicitly
      return {
        bytes: searchResumeResponse.resume.toString('base64'),
      };
    } catch (err) {
      // build error
      const error = new APIError(err);

      // log for debugging and run support purposes
      logger.error(`{}ResumeService::#searchResume::error executing::error=${anyUtils.stringify(error)}`);

      // throw error explicitly
      throw error;
    }
  }
}
