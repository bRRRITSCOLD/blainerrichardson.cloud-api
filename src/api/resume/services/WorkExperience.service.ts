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

@Service()
export class WorkExperienceService {
  public async searchWorkExperiences(searchWorkExperiencesRequest: {
    searchCriteria: AnyObject;
    searchOptions?: { pageNumber?: number; pageSize?: number; totalCount?: boolean };
  }): Promise<any> {
    try {
      // deconstruct for east and usability
      const { searchCriteria, searchOptions } = searchWorkExperiencesRequest;

      // call data-management layer to search backend
      // datasources for work experience resume data
      const searchWorkExperiencesResponse = await resumeManager.searchWorkExperiences({
        searchCriteria,
        searchOptions: _.assign({}, searchOptions),
      });

      // return health check explicitly
      return searchWorkExperiencesResponse;
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}EmailService::#sendEmail::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw error;
    }
  }
}
