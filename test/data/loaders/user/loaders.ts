// models
import { User, UserInterface, UserToken, UserTokenInterface } from '../../../../src/models/user';

// libraries
import { mongo } from '../../../../src/lib/mongo';
import { env } from '../../../../src/lib/environment';

export async function loadUserTokensData(loadUserTokensDataRequest: {
  userTokens: UserToken[] | UserTokenInterface[];
}): Promise<UserToken[] | UserTokenInterface[]> {
  try {
    // deconstruct for ease
    const { userTokens } = loadUserTokensDataRequest;

    // get out mongo connection
    const blainerrichardsonDb = await mongo.getConnection(env.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);

    // insert our data in one sweep
    await blainerrichardsonDb.collection(env.MONGO_BLAINERRICARDSON_CLOUD_USER_TOKENS_COLLECTION_NAME).insertMany(userTokens);

    // return the data for the user
    return userTokens;
  } catch (err) {
    throw err;
  }
}

export async function loadUsersData(loadUsersDataRequest: { users: User[] | UserInterface[] }): Promise<User[] | UserInterface[]> {
  try {
    // deconstruct for ease
    const { users } = loadUsersDataRequest;

    // get out mongo connection
    const blainerrichardsonDb = await mongo.getConnection(env.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);

    // insert our data in one sweep
    await blainerrichardsonDb.collection(env.MONGO_BLAINERRICARDSON_CLOUD_USERS_COLLECTION_NAME).insertMany(users);

    // return the data for the user
    return users;
  } catch (err) {
    throw err;
  }
}
