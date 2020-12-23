// node_modules
import * as _ from 'lodash';

// libraries
import { env } from '../../lib/environment';
import { mongo } from '../../lib/mongo';

// models
import { AnyObject } from '../../models/common';
import { APIError } from '../../models/error';
import { User, UserInterface } from '../../models/user';

export interface SearchUsersRequestInterface {
  searchCriteria: AnyObject;
  searchOptions: {
    pageNumber?: number;
    pageSize?: number;
    totalCount?: boolean;
  };
}

export interface SearchUsersResponseInterface {
  users: User[];
  moreUsers: boolean;
  totalUsers: number | undefined;
}

export async function searchUsers(searchUsersRequest: SearchUsersRequestInterface): Promise<SearchUsersResponseInterface> {
  try {
    // deconstruct for ease
    const { searchCriteria, searchOptions } = searchUsersRequest;
    let { pageNumber, pageSize, totalCount } = searchOptions;

    // default options if not passed in
    if (!pageNumber) pageNumber = 1;
    if (!pageSize) pageSize = 500;
    if (!totalCount) totalCount = false;

    // create holder for data computations
    let totalUsers: number | undefined;

    // get mongo connection
    const socialMediaHubMongoDb = await mongo.getConnection(env.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);

    // get cursor
    const cursor = await socialMediaHubMongoDb
      .collection(env.MONGO_BLAINERRICARDSON_CLOUD_USERS_COLLECTION_NAME)
      .find({ ...searchCriteria });

    // get count if wanted by user
    if (totalCount) totalUsers = await cursor.count();

    // skip the number of pages times the page size
    cursor.skip(pageSize * (pageNumber - 1));

    // limit to only the page size
    cursor.limit(pageSize + 1);

    // turn cursor into array of data/objects
    const fountItems: UserInterface[] = await cursor.toArray();

    // return explicitly
    return {
      users: fountItems.slice(0, pageSize).map((foundItem: UserInterface) => new User(foundItem)),
      moreUsers: fountItems.length > pageSize,
      totalUsers,
    };
  } catch (err) {
    // build error
    const error = new APIError(err);

    // throw error explicitly
    throw error;
  }
}
