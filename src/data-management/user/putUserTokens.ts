// node_modules
import * as _ from 'lodash';

// libraries
import { env } from '../../lib/environment';
import { mongo } from '../../lib/mongo';

// models
import { APIError } from '../../models/error';
import { UserToken, UserTokenInterface } from '../../models/user';

export interface PutUserTokensRequestInterface {
  userTokens: UserTokenInterface[];
}

export interface PutUserTokensResponseInterface {
  userTokens: UserToken[];
}

export async function putUserTokens(putUserTokensRequest: PutUserTokensRequestInterface): Promise<PutUserTokensResponseInterface> {
  try {
    // deconstruct for ease
    const { userTokens } = putUserTokensRequest;

    // build and validate the incoming data
    const newUserTokens = await Promise.all(
      userTokens.map(async (userToken) => {
        const newUserToken = new UserToken(userToken);
        const newUserTokenValidation = await newUserToken.validateAsync();
        if (newUserTokenValidation.error) throw newUserTokenValidation.error;
        else return newUserToken;
      }),
    );

    // get mongo connection
    const blainerrichardsonCloudMongoDb = await mongo.getConnection(env.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);

    // initialize a bulk operation in mongo
    const bulkOperation = blainerrichardsonCloudMongoDb
      .collection(env.MONGO_BLAINERRICARDSON_CLOUD_USER_TOKENS_COLLECTION_NAME)
      .initializeUnorderedBulkOp();

    // loop through each item and replace a school experience
    /// if a correlating one exists and insert/upert a new
    // school experience if a correlating one does not exist
    for (const newUserToken of newUserTokens) {
      bulkOperation.find({ userTokenId: newUserToken.userTokenId }).upsert().replaceOne(_.assign({}, newUserToken));
    }

    // execute out bulk operation with the transaction we started
    const bulkOperationResponse = await bulkOperation.execute();
    bulkOperationResponse;
    // return explicitly
    return {
      userTokens: newUserTokens,
    };
  } catch (err) {
    // build error
    const error = new APIError(err);

    // throw error explicitly
    throw error;
  }
}
