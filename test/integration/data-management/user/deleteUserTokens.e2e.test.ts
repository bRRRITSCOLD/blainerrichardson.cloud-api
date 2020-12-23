/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import { expect } from 'chai';
import * as _ from 'lodash';

// libraries
import { integrationTestEnv } from '../../../lib/environment';
import { mongo } from '../../../../src/lib/mongo';

// models
import { UserToken } from '../../../../src/models/user';

// testees
import * as userManager from '../../../../src/data-management/user';

// data
import { loadUserTokensData, unloadUserTokensData } from '../../../data/loaders/user';
import { readStaticUserTokenData } from '../../../data/static/user/UserToken';

// file constants/functions
let staticUserTokenData: any | any[];

let cachedUserTokenData: any | any[];

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
describe('data-management/user/deleteUserTokens - #deleteUserTokens - integration tests', () => {
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

  describe('#deleteUserTokens', () => {
    context('({ userTokenIds })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // create the faked data
            staticUserTokenData = await readStaticUserTokenData(3);

            // load data into datasources
            cachedUserTokenData = await loadUserTokensData({
              userTokens: staticUserTokenData,
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
            cachedUserTokenData = await unloadUserTokensData({
              userTokens: cachedUserTokenData,
            });

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should delete 1...N user token instances that correlate to given userToken ids in the backend datasources', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_USER_TOKEN_IDS = cachedUserTokenData.slice().map((item: any) => item.userTokenId);
            const EXPECTED_USER_TOKEN_IDS_LENGTH = EXPECTED_USER_TOKEN_IDS.length;
            const EXPECTED_TYPE_OF_STRING = 'string';

            /////////////////////////
            //////// test ///////////
            /////////////////////////
            // query mongo to get info
            const blainerrichardsonCloudDb = await mongo.getConnection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);
            let foundItems = await blainerrichardsonCloudDb
              .collection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_USER_TOKENS_COLLECTION_NAME)
              .find({ userTokenId: { $in: cachedUserTokenData.map((item: any) => item.userTokenId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_USER_TOKEN_IDS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(EXPECTED_USER_TOKEN_IDS.find((expectedItem: any) => expectedItem === foundItem.userTokenId) !== undefined).to.be.true;
            }

            // run testee
            const deleteUserTokensRequest = {
              userTokenIds: cachedUserTokenData.map((item: any) => item.userTokenId),
            };
            const deleteUserTokensResponse = await userManager.deleteUserTokens(deleteUserTokensRequest);

            // run assertions
            expect(deleteUserTokensResponse !== undefined).to.be.true;
            expect(deleteUserTokensResponse.userTokenIds !== undefined).to.be.true;
            expect(deleteUserTokensResponse.userTokenIds instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(deleteUserTokensResponse.userTokenIds.length === EXPECTED_USER_TOKEN_IDS_LENGTH).to.be.true;
            for (const userTokenId of deleteUserTokensResponse.userTokenIds) {
              expect(typeof userTokenId === EXPECTED_TYPE_OF_STRING).to.be.true;
              expect(EXPECTED_USER_TOKEN_IDS.find((expectedItem: any) => expectedItem === userTokenId) !== undefined).to.be.true;
            }

            // query mongo to get info
            foundItems = await blainerrichardsonCloudDb
              .collection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_USER_TOKENS_COLLECTION_NAME)
              .find({ userTokenId: { $in: cachedUserTokenData.map((item: any) => item.userTokenId) } })
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
