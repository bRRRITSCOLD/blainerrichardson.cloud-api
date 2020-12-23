// node_modules
import * as _ from 'lodash';

// libraries
import { env } from '../../lib/environment';
import { mongo } from '../../lib/mongo';

// models
import { AnyObject } from '../../models/common';
import { APIError } from '../../models/error';
import { UserToken, UserTokenInterface } from '../../models/user';

export interface SearchUserTokensRequestInterface {
  searchCriteria: AnyObject;
  searchOptions: {
    pageNumber?: number;
    pageSize?: number;
    totalCount?: boolean;
  };
}

export interface SearchUserTokensResponseInterface {
  userTokens: UserToken[];
  moreUserTokens: boolean;
  totalUserTokens: number | undefined;
}

export async function searchUserTokens(
  searchUserTokensRequest: SearchUserTokensRequestInterface,
): Promise<SearchUserTokensResponseInterface> {
  try {
    // deconstruct for ease
    const { searchCriteria, searchOptions } = searchUserTokensRequest;
    let { pageNumber, pageSize, totalCount } = searchOptions;

    // default options if not passed in
    if (!pageNumber) pageNumber = 1;
    if (!pageSize) pageSize = 500;
    if (!totalCount) totalCount = false;

    // create holder for data computations
    let totalUserTokens: number | undefined;

    // get mongo connection
    const socialMediaHubMongoDb = await mongo.getConnection(env.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);

    // get cursor
    const cursor = await socialMediaHubMongoDb
      .collection(env.MONGO_BLAINERRICARDSON_CLOUD_USER_TOKENS_COLLECTION_NAME)
      .find({ ...searchCriteria });

    // get count if wanted by userToken
    if (totalCount) totalUserTokens = await cursor.count();

    // skip the number of pages times the page size
    cursor.skip(pageSize * (pageNumber - 1));

    // limit to only the page size
    cursor.limit(pageSize + 1);

    // turn cursor into array of data/objects
    const fountItems: UserTokenInterface[] = await cursor.toArray();

    // return explicitly
    return {
      userTokens: fountItems.slice(0, pageSize).map((foundItem: UserTokenInterface) => new UserToken(foundItem)),
      moreUserTokens: fountItems.length > pageSize,
      totalUserTokens,
    };
  } catch (err) {
    // build error
    const error = new APIError(err);

    // throw error explicitly
    throw error;
  }
}
