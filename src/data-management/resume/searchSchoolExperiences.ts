// node_modules
import * as _ from 'lodash';

// libraries
import { env } from '../../lib/environment';
import { mongo } from '../../lib/mongo';

// models
import { AnyObject } from '../../models/common';
import { APIError } from '../../models/error';
import { SchoolExperience, SchoolExperienceInterface } from '../../models/resume';

export interface SearchSchoolExperiencesRequestInterface {
  searchCriteria: AnyObject;
  searchOptions: {
    pageNumber?: number;
    pageSize?: number;
    totalCount?: boolean;
  };
}

export interface SearchSchoolExperiencesResponseInterface {
  schoolExperiences: SchoolExperience[];
  moreSchoolExperiences: boolean;
  totalSchoolExperiences: number | undefined;
}

export async function searchSchoolExperiences(
  searchSchoolExperiencesRequest: SearchSchoolExperiencesRequestInterface,
): Promise<SearchSchoolExperiencesResponseInterface> {
  try {
    // deconstruct for ease
    const { searchCriteria, searchOptions } = searchSchoolExperiencesRequest;
    let { pageNumber, pageSize, totalCount } = searchOptions;

    // default options if not passed in
    if (!pageNumber) pageNumber = 1;
    if (!pageSize) pageSize = 500;
    if (!totalCount) totalCount = false;

    // create holder for data computations
    let totalSchoolExperiences: number | undefined;

    // get mongo connection
    const socialMediaHubMongoDb = await mongo.getConnection(env.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);

    // get cursor
    const cursor = await socialMediaHubMongoDb
      .collection(env.MONGO_BLAINERRICARDSON_CLOUD_SCHOOL_EXPERIENCES_COLLECTION_NAME)
      .find({ ...searchCriteria });

    // get count if wanted by user
    if (totalCount) totalSchoolExperiences = await cursor.count();

    // skip the number of pages times the page size
    cursor.skip(pageSize * (pageNumber - 1));

    // limit to only the page size
    cursor.limit(pageSize + 1);

    // turn cursor into array of data/objects
    const fountItems: SchoolExperienceInterface[] = await cursor.toArray();

    // return explicitly
    return {
      schoolExperiences: fountItems.slice(0, pageSize).map((foundItem: SchoolExperienceInterface) => new SchoolExperience(foundItem)),
      moreSchoolExperiences: fountItems.length > pageSize,
      totalSchoolExperiences,
    };
  } catch (err) {
    // build error
    const error = new APIError(err);

    // throw error explicitly
    throw error;
  }
}
