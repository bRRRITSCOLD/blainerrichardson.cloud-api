/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import { expect } from 'chai';
import * as _ from 'lodash';

// libraries
import { integrationTestEnv } from '../../../lib/environment';
import { mongo } from '../../../../src/lib/mongo';

// models
import { User } from '../../../../src/models/user';

// testees
import * as userManager from '../../../../src/data-management/user';

// data
import { loadUsersData, unloadUsersData } from '../../../data/loaders/user';
import { readStaticUserData } from '../../../data/static/user/User';

// file constants/functions
let staticUserData: any | any[];

let cachedUserData: any | any[];

async function customStartUp() {
  try {
    // return explicitly
    return;
  } catch (err) {
    // throw error explicitly
    throw err;
  }
}

async function customTearDown() {
  try {
    // return explicitly
    return;
  } catch (err) {
    // throw error explicitly
    throw err;
  }
}

// tests
describe('data-management/user/deleteUsers - #deleteUsers - integration tests', () => {
  before(async () => {
    try {
      // load out environment
      await integrationTestEnv.init();

      // initialize asynchronous tasks, connectiones, etc. here
      await Promise.all([mongo.init(require('../../../../src/configs/mongo').default)]);

      // initialize synchronous tasks, connectiones, etc. here
      [];

      // cusom start up functionality
      await customStartUp();

      // return explicitly
      return;
    } catch (err) {
      // throw explicitly
      throw err;
    }
  });

  describe('#deleteUsers', () => {
    context('({ userIds })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // create the faked data
            staticUserData = await readStaticUserData(3);

            // load data into datasources
            cachedUserData = await loadUsersData({
              users: staticUserData,
            });

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        afterEach(async () => {
          try {
            // unload data from datasources
            cachedUserData = await unloadUsersData({
              users: cachedUserData,
            });

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should delete 1...N user instances that correlate to given user ids in the backend datasources', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_USER_IDS = cachedUserData.slice().map((item: any) => item.userId);
            const EXPECTED_USER_IDS_LENGTH = EXPECTED_USER_IDS.length;
            const EXPECTED_TYPE_OF_STRING = 'string';

            /////////////////////////
            //////// test ///////////
            /////////////////////////
            // query mongo to get info
            const blainerrichardsonCloudDb = await mongo.getConnection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);
            let foundItems = await blainerrichardsonCloudDb
              .collection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_USERS_COLLECTION_NAME)
              .find({ userId: { $in: cachedUserData.map((item: any) => item.userId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_USER_IDS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(EXPECTED_USER_IDS.find((expectedItem: any) => expectedItem === foundItem.userId) !== undefined).to.be.true;
            }

            // run testee
            const deleteUsersRequest = {
              userIds: cachedUserData.map((item: any) => item.userId),
            };
            const deleteUsersResponse = await userManager.deleteUsers(deleteUsersRequest);

            // run assertions
            expect(deleteUsersResponse !== undefined).to.be.true;
            expect(deleteUsersResponse.userIds !== undefined).to.be.true;
            expect(deleteUsersResponse.userIds instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(deleteUsersResponse.userIds.length === EXPECTED_USER_IDS_LENGTH).to.be.true;
            for (const userId of deleteUsersResponse.userIds) {
              expect(typeof userId === EXPECTED_TYPE_OF_STRING).to.be.true;
              expect(EXPECTED_USER_IDS.find((expectedItem: any) => expectedItem === userId) !== undefined).to.be.true;
            }

            // query mongo to get info
            foundItems = await blainerrichardsonCloudDb
              .collection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_USERS_COLLECTION_NAME)
              .find({ userId: { $in: cachedUserData.map((item: any) => item.userId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === 0).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });
      });
    });
  });

  after(async () => {
    try {
      // cusom start up functionality
      await customTearDown();

      // return explicitly
      return;
    } catch (err) {
      // throw explicitly
      throw err;
    }
  });
});
