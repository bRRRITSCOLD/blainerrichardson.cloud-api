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
import { WorkExperience, WorkExperienceInterface } from '../../../models/resume';

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
      logger.error(`{}WorkExperienceService::#searchWorkExperiences::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw error;
    }
  }

  public async putWorkExperiences(putWorkExperienceRequest: { workExperiences: WorkExperienceInterface[] }): Promise<any> {
    try {
      // deconstruct for east and usability
      const { workExperiences } = putWorkExperienceRequest;

      // call data-management layer to search backend
      // datasources for Work experience resume data
      const putSchoolExperiencesResponse = await resumeManager.putWorkExperiences({ workExperiences });

      // return health check explicitly
      return putSchoolExperiencesResponse;
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}WorkExperienceService::#putWorkExperiences::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw error;
    }
  }
}
