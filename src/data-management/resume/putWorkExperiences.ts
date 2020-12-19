// node_modules
import * as _ from 'lodash';

// libraries
import { env } from '../../lib/environment';
import { mongo } from '../../lib/mongo';

// models
import { APIError } from '../../models/error';
import { WorkExperience } from '../../models/resume';

export interface PutWorkExperiencesRequestInterface {
  workExperiences: WorkExperience[];
}

export interface PutWorkExperiencesResponseInterface {
  workExperiences: WorkExperience[];
}

export async function putWorkExperiences(
  putWorkExperiencesRequest: PutWorkExperiencesRequestInterface,
): Promise<PutWorkExperiencesResponseInterface> {
  try {
    // deconstruct for ease
    const { workExperiences } = putWorkExperiencesRequest;

    // build and validate the incoming data
    const newWorkExperiences = await Promise.all(
      workExperiences.map(async (workExperience) => {
        const newWorkExperience = new WorkExperience(workExperience);
        const newWorkExperienceValidation = await newWorkExperience.validateAsync();
        if (newWorkExperienceValidation.error) throw newWorkExperienceValidation.error;
        else return newWorkExperience;
      }),
    );

    // get mongo connection
    const blainerrichardsonCloudMongoDb = await mongo.getConnection(env.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);

    // initialize a bulk operation in mongo
    const bulkOperation = blainerrichardsonCloudMongoDb
      .collection(env.MONGO_BLAINERRICARDSON_CLOUD_WORK_EXPERIENCES_COLLECTION_NAME)
      .initializeUnorderedBulkOp();

    // loop through each item and replace a school experience
    /// if a correlating one exists and insert/upert a new
    // school experience if a correlating one does not exist
    for (const newWorkExperience of newWorkExperiences) {
      bulkOperation.find({ workExperienceId: newWorkExperience.workExperienceId }).upsert().replaceOne(_.assign({}, newWorkExperience));
    }

    // execute out bulk operation with the transaction we started
    const bulkOperationResponse = await bulkOperation.execute();
    bulkOperationResponse;
    // return explicitly
    return {
      workExperiences: newWorkExperiences,
    };
  } catch (err) {
    // build error
    const error = new APIError(err);

    // throw error explicitly
    throw error;
  }
}
