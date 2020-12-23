// node_modules
import * as _ from 'lodash';

// models
import { User, UserInterface, UserToken, UserTokenInterface } from '../../../../src/models/user';

// libraries
import { mongo } from '../../../../src/lib/mongo';
import { env } from '../../../../src/lib/environment';

export async function unloadUserTokensData(unloadUserTokensDataRequest: { userTokens: UserTokenInterface[] }): Promise<boolean> {
  try {
    // deconstruct for ease
    const { userTokens } = unloadUserTokensDataRequest;

    // get out mongo connection
    const blainerrichardsonDb = await mongo.getConnection(env.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);

    // delete our data in one sweep
    await blainerrichardsonDb.collection(env.MONGO_BLAINERRICARDSON_CLOUD_USER_TOKENS_COLLECTION_NAME).deleteMany({
      userTokenId: {
        $in: _.uniq(userTokens.map((userToken: UserToken | UserTokenInterface) => userToken.userTokenId)),
      },
    });

    // return the data for the user
    return true;
  } catch (err) {
    throw err;
  }
}

export async function unloadUsersData(unloadUsersDataRequest: { users: UserInterface[] }): Promise<boolean> {
  try {
    // deconstruct for ease
    const { users } = unloadUsersDataRequest;

    // get out mongo connection
    const blainerrichardsonDb = await mongo.getConnection(env.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);

    // delete our data in one sweep
    await blainerrichardsonDb.collection(env.MONGO_BLAINERRICARDSON_CLOUD_USERS_COLLECTION_NAME).deleteMany({
      userId: {
        $in: _.uniq(users.map((user: User | UserInterface) => user.userId)),
      },
    });

    // return the data for the user
    return true;
  } catch (err) {
    throw err;
  }
}
