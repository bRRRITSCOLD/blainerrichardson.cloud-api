// node_modules
import * as _ from 'lodash';

// libraries
import { env } from '../../lib/environment';
import { mongo } from '../../lib/mongo';

// models
import { APIError } from '../../models/error';

export interface DeleteUsersRequestInterface {
  userIds: string[];
}

export interface DeleteUsersResponseInterface {
  userIds: string[];
}

export async function deleteUsers(deleteUsersRequest: DeleteUsersRequestInterface): Promise<DeleteUsersResponseInterface> {
  try {
    // deconstruct for ease
    const { userIds } = deleteUsersRequest;

    // get mongo connection
    const blainerrichardsonCloudMongoDb = await mongo.getConnection(env.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);

    // initialize a bulk operation in mongo
    const bulkOperation = blainerrichardsonCloudMongoDb
      .collection(env.MONGO_BLAINERRICARDSON_CLOUD_USERS_COLLECTION_NAME)
      .initializeUnorderedBulkOp();

    // loop through each item and replace a school experience
    /// if a correlating one exists and insert/upert a new
    // school experience if a correlating one does not exist
    for (const userId of userIds) {
      bulkOperation.find({ userId }).removeOne();
    }

    // execute out bulk operation with the transaction we started
    const bulkOperationResponse = await bulkOperation.execute();
    bulkOperationResponse;
    // return explicitly
    return {
      userIds,
    };
  } catch (err) {
    // build error
    const error = new APIError(err);

    // throw error explicitly
    throw error;
  }
}
