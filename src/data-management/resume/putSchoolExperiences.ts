// node_modules
import * as _ from 'lodash';

// libraries
import { env } from '../../lib/environment';
import { mongo } from '../../lib/mongo';

// models
import { APIError } from '../../models/error';
import { SchoolExperience } from '../../models/resume';

export interface PutSchoolExperiencesRequestInterface {
  schoolExperiences: SchoolExperience[];
}

export interface PutSchoolExperiencesResponseInterface {
  schoolExperiences: SchoolExperience[];
}

export async function putSchoolExperiences(
  putSchoolExperiencesRequest: PutSchoolExperiencesRequestInterface,
): Promise<PutSchoolExperiencesResponseInterface> {
  try {
    // deconstruct for ease
    const { schoolExperiences } = putSchoolExperiencesRequest;

    // build and validate the incoming data
    const newSchoolExperiences = await Promise.all(
      schoolExperiences.map(async (schoolExperience) => {
        const newSchoolExperience = new SchoolExperience(schoolExperience);
        const newSchoolExperienceValidation = await newSchoolExperience.validateAsync();
        if (newSchoolExperienceValidation.error) throw newSchoolExperienceValidation.error;
        else return newSchoolExperience;
      }),
    );

    // get mongo connection
    const blainerrichardsonCloudMongoDb = await mongo.getConnection(env.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);

    // initialize a bulk operation in mongo
    const bulkOperation = blainerrichardsonCloudMongoDb
      .collection(env.MONGO_BLAINERRICARDSON_CLOUD_SCHOOL_EXPERIENCES_COLLECTION_NAME)
      .initializeUnorderedBulkOp();

    // loop through each item and replace a school experience
    /// if a correlating one exists and insert/upert a new
    // school experience if a correlating one does not exist
    for (const newSchoolExperience of newSchoolExperiences) {
      bulkOperation
        .find({ schoolExperienceId: newSchoolExperience.schoolExperienceId })
        .upsert()
        .replaceOne(_.assign({}, newSchoolExperience));
    }

    // execute out bulk operation with the transaction we started
    const bulkOperationResponse = await bulkOperation.execute();
    bulkOperationResponse;
    // return explicitly
    return {
      schoolExperiences: newSchoolExperiences,
    };
  } catch (err) {
    // build error
    const error = new APIError(err);

    // throw error explicitly
    throw error;
  }
}
