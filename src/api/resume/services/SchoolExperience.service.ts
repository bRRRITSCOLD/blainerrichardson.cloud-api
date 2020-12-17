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
export class SchoolExperienceService {
  public async searchSchoolExperiences(searchSchoolExperiencesRequest: {
    searchCriteria: AnyObject;
    searchOptions?: { pageNumber?: number; pageSize?: number; totalCount?: boolean };
  }): Promise<any> {
    try {
      // deconstruct for east and usability
      const { searchCriteria, searchOptions } = searchSchoolExperiencesRequest;

      // call data-management layer to search backend
      // datasources for School experience resume data
      const searchSchoolExperiencesResponse = await resumeManager.searchSchoolExperiences({
        searchCriteria,
        searchOptions: _.assign({}, searchOptions),
      });

      // return health check explicitly
      return searchSchoolExperiencesResponse;
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}searchSchoolExperiences::#sendEmail::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw error;
    }
  }
}
