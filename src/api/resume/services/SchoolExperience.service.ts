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
import { SchoolExperience } from '../../../models/resume';

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
      logger.error(`{}SchoolExperienceService::#searchSchoolExperiences::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw error;
    }
  }

  public async putSchoolExperiences(putSchoolExperiencesRequest: { schoolExperiences: SchoolExperience[] }): Promise<any> {
    try {
      // deconstruct for east and usability
      const { schoolExperiences } = putSchoolExperiencesRequest;

      // call data-management layer to search backend
      // datasources for School experience resume data
      const putSchoolExperiencesResponse = await resumeManager.putSchoolExperiences({ schoolExperiences });

      // return health check explicitly
      return putSchoolExperiencesResponse;
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}SchoolExperienceService::#putSchoolExperiences::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw error;
    }
  }

  public async deleteSchoolExperiences(deleteSchoolExperiencesRequest: { schoolExperienceIds: string[] }): Promise<any> {
    try {
      // deconstruct for east and usability
      const { schoolExperienceIds } = deleteSchoolExperiencesRequest;

      // call data-management layer to search backend
      // datasources for School experience resume data
      const deleteSchoolExperiencesResponse = await resumeManager.deleteSchoolExperiences({ schoolExperienceIds });

      // return health check explicitly
      return deleteSchoolExperiencesResponse;
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}SchoolExperienceService::#deleteSchoolExperiences::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw error;
    }
  }
}
