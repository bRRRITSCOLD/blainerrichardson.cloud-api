// node_modules
import * as _ from 'lodash';

// libraries
import { env } from '../../lib/environment';
import { mongo } from '../../lib/mongo';

// models
import { APIError } from '../../models/error';
import { User, UserInterface } from '../../models/user';

export interface PutUsersRequestInterface {
  users: UserInterface[];
}

export interface PutUsersResponseInterface {
  users: User[];
}

export async function putUsers(putUsersRequest: PutUsersRequestInterface): Promise<PutUsersResponseInterface> {
  try {
    // deconstruct for ease
    const { users } = putUsersRequest;

    // build and validate the incoming data
    const newUsers = await Promise.all(
      users.map(async (user) => {
        const newUser = new User(user);
        const newUserValidation = await newUser.validateAsync();
        if (newUserValidation.error) throw newUserValidation.error;
        else return newUser;
      }),
    );

    // get mongo connection
    const blainerrichardsonCloudMongoDb = await mongo.getConnection(env.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);

    // initialize a bulk operation in mongo
    const bulkOperation = blainerrichardsonCloudMongoDb
      .collection(env.MONGO_BLAINERRICARDSON_CLOUD_USERS_COLLECTION_NAME)
      .initializeUnorderedBulkOp();

    // loop through each item and replace a school experience
    /// if a correlating one exists and insert/upert a new
    // school experience if a correlating one does not exist
    for (const newUser of newUsers) {
      bulkOperation.find({ userId: newUser.userId }).upsert().replaceOne(_.assign({}, newUser));
    }

    // execute out bulk operation with the transaction we started
    const bulkOperationResponse = await bulkOperation.execute();
    bulkOperationResponse;
    // return explicitly
    return {
      users: newUsers,
    };
  } catch (err) {
    // build error
    const error = new APIError(err);

    // throw error explicitly
    throw error;
  }
}
