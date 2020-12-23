// node_modules
import * as _ from 'lodash';

// libraries
import { env } from '../../lib/environment';
import { mongo } from '../../lib/mongo';

// models
import { APIError } from '../../models/error';

export interface DeleteUserTokensRequestInterface {
  userTokenIds: string[];
}

export interface DeleteUserTokensResponseInterface {
  userTokenIds: string[];
}

export async function deleteUserTokens(
  deleteUserTokensRequest: DeleteUserTokensRequestInterface,
): Promise<DeleteUserTokensResponseInterface> {
  try {
    // deconstruct for ease
    const { userTokenIds } = deleteUserTokensRequest;

    // get mongo connection
    const blainerrichardsonCloudMongoDb = await mongo.getConnection(env.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);

    // initialize a bulk operation in mongo
    const bulkOperation = blainerrichardsonCloudMongoDb
      .collection(env.MONGO_BLAINERRICARDSON_CLOUD_USER_TOKENS_COLLECTION_NAME)
      .initializeUnorderedBulkOp();

    // loop through each item and replace a school experience
    /// if a correlating one exists and insert/upert a new
    // school experience if a correlating one does not exist
    for (const userTokenId of userTokenIds) {
      bulkOperation.find({ userTokenId }).removeOne();
    }

    // execute out bulk operation with the transaction we started
    const bulkOperationResponse = await bulkOperation.execute();
    bulkOperationResponse;
    // return explicitly
    return {
      userTokenIds,
    };
  } catch (err) {
    // build error
    const error = new APIError(err);

    // throw error explicitly
    throw error;
  }
}
