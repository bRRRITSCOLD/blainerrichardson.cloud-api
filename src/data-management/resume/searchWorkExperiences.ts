// node_modules
import * as _ from 'lodash';

// libraries
import { env } from '../../lib/environment';
import { mongo } from '../../lib/mongo';

// models
import { AnyObject } from '../../models/common';
import { APIError } from '../../models/error';
import { WorkExperience, WorkExperienceInterface } from '../../models/resume';

export interface SearchWorkExperiencesRequestInterface {
  searchCriteria: AnyObject;
  searchOptions: {
    pageNumber?: number;
    pageSize?: number;
    totalCount?: boolean;
  };
}

export interface SearchWorkExperiencesResponseInterface {
  workExperiences: WorkExperience[];
  moreWorkExperiences: boolean;
  totalWorkExperiences: number | undefined;
}

export async function searchWorkExperiences(
  searchWorkExperiencesRequest: SearchWorkExperiencesRequestInterface,
): Promise<SearchWorkExperiencesResponseInterface> {
  try {
    // deconstruct for ease
    const { searchCriteria, searchOptions } = searchWorkExperiencesRequest;
    let { pageNumber, pageSize, totalCount } = searchOptions;

    // default options if not passed in
    if (!pageNumber) pageNumber = 1;
    if (!pageSize) pageSize = 500;
    if (!totalCount) totalCount = false;

    // create holder for data computations
    let totalWorkExperiences: number | undefined;

    // get mongo connection
    const socialMediaHubMongoDb = await mongo.getConnection(env.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);

    // get cursor
    const cursor = await socialMediaHubMongoDb
      .collection(env.MONGO_BLAINERRICARDSON_CLOUD_WORK_EXPERIENCES_COLLECTION_NAME)
      .find({ ...searchCriteria });

    // get count if wanted by user
    if (totalCount) totalWorkExperiences = await cursor.count();

    // skip the number of pages times the page size
    cursor.skip(pageSize * (pageNumber - 1));

    // limit to only the page size
    cursor.limit(pageSize + 1);

    // turn cursor into array of data/objects
    const fountItems: WorkExperienceInterface[] = await cursor.toArray();

    // return explicitly
    return {
      workExperiences: fountItems.slice(0, pageSize).map((foundItem: WorkExperienceInterface) => new WorkExperience(foundItem)),
      moreWorkExperiences: fountItems.length > pageSize,
      totalWorkExperiences,
    };
  } catch (err) {
    // build error
    const error = new APIError(err);

    // throw error explicitly
    throw error;
  }
}
