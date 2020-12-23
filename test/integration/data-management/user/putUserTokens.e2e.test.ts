/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import 'reflect-metadata';
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
describe('data-management/resume/putUserTokens - #putUserTokens - integration tests', () => {
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

  describe('#putUserTokens', () => {
    context('({ userTokens: [3 do not exist...] })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // create the faked data
            staticUserTokenData = await readStaticUserTokenData(3);

            // load data into datasources
            cachedUserTokenData = staticUserTokenData.slice();

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

        it('- should replace 1...N user token instances that exist correlated by userTokenId or insert/create 1...N user token instances that do not exist correlated by userTokenId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_USER_TOKEN_CLASS_INSTANCE = UserToken;
            const EXPECTED_USER_TOKENS = cachedUserTokenData.slice();
            const EXPECTED_USER_TOKENS_LENGTH = EXPECTED_USER_TOKENS.length;

            /////////////////////////
            //////// test //////////
            /////////////////////////

            // run testee
            const putUserTokensRequest = {
              userTokens: cachedUserTokenData,
            };
            const putUserTokensResponse = await userManager.putUserTokens(putUserTokensRequest);

            // run assertions
            expect(putUserTokensResponse !== undefined).to.be.true;
            expect(putUserTokensResponse.userTokens !== undefined).to.be.true;
            expect(putUserTokensResponse.userTokens instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(putUserTokensResponse.userTokens.length === EXPECTED_USER_TOKENS_LENGTH).to.be.true;
            for (const userToken of putUserTokensResponse.userTokens) {
              expect(userToken instanceof EXPECTED_USER_TOKEN_CLASS_INSTANCE).to.be.true;
              expect(EXPECTED_USER_TOKENS.find((expectedItem: any) => expectedItem.userTokenId === userToken.userTokenId) !== undefined).to
                .be.true;
            }

            // query mongo to get info
            const blainerrichardsonCloudDb = await mongo.getConnection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);
            const foundItems = await blainerrichardsonCloudDb
              .collection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_USER_TOKENS_COLLECTION_NAME)
              .find({ userTokenId: { $in: cachedUserTokenData.map((item: any) => item.userTokenId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_USER_TOKENS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(EXPECTED_USER_TOKENS.find((expectedItem: any) => expectedItem.userTokenId === foundItem.userTokenId) !== undefined).to
                .be.true;
            }

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });
      });
    });

    context('({ userTokens: [2 do not exist..., 1 does exist...] })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // create the faked data
            staticUserTokenData = await readStaticUserTokenData(3);

            // load data into datasources
            cachedUserTokenData = _.flatten([
              await loadUserTokensData({
                userTokens: [staticUserTokenData.slice()[0]],
              }),
              staticUserTokenData.slice(1),
            ]);

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

        it('- should replace 1...N user token instances that exist correlated by userTokenId or insert/create 1...N user token instances that do not exist correlated by userTokenId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update first element to make sure
            // that things are updated if they
            // already exist in the backend datastores
            const updatedUserTokenData = _.flatten([
              _.assign({}, cachedUserTokenData.slice()[0], { revokedIp: 'UPDATE' }),
              cachedUserTokenData.slice(1),
            ]);

            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_EXISTING_USER_TOKENS = [cachedUserTokenData.slice()[0]];
            const EXPECTED_EXISTING_USER_TOKENS_LENGTH = EXPECTED_EXISTING_USER_TOKENS.length;
            const EXPECTED_NONEXISTING_USER_TOKENS = cachedUserTokenData.slice(1);
            const EXPECTED_USER_TOKEN_CLASS_INSTANCE = UserToken;
            const EXPECTED_USER_TOKENS = updatedUserTokenData.slice();
            const EXPECTED_USER_TOKENS_LENGTH = EXPECTED_USER_TOKENS.length;

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
            expect(foundItems.length === EXPECTED_EXISTING_USER_TOKENS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_EXISTING_USER_TOKENS.find((expectedItem: any) => expectedItem.userTokenId === foundItem.userTokenId) !== undefined,
              ).to.be.true;
            }
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_NONEXISTING_USER_TOKENS.find((expectedItem: any) => expectedItem.userTokenId === foundItem.userTokenId) ===
                  undefined,
              ).to.be.true;
            }

            // run testee
            const putUserTokensRequest = {
              userTokens: cachedUserTokenData,
            };
            const putUserTokensResponse = await userManager.putUserTokens(putUserTokensRequest);

            // run assertions
            expect(putUserTokensResponse !== undefined).to.be.true;
            expect(putUserTokensResponse.userTokens !== undefined).to.be.true;
            expect(putUserTokensResponse.userTokens instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(putUserTokensResponse.userTokens.length === EXPECTED_USER_TOKENS_LENGTH).to.be.true;
            for (const userToken of putUserTokensResponse.userTokens) {
              expect(userToken instanceof EXPECTED_USER_TOKEN_CLASS_INSTANCE).to.be.true;
              expect(EXPECTED_USER_TOKENS.find((expectedItem: any) => expectedItem.userTokenId === userToken.userTokenId) !== undefined).to
                .be.true;
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
            expect(foundItems.length === EXPECTED_USER_TOKENS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(EXPECTED_USER_TOKENS.find((expectedItem: any) => expectedItem.userTokenId === foundItem.userTokenId) !== undefined).to
                .be.true;
            }

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });
      });
    });

    context('({ userTokens: [1 does not exist..., 2 do exist...] })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // create the faked data
            staticUserTokenData = await readStaticUserTokenData(3);

            // load data into datasources
            cachedUserTokenData = _.flatten([
              await loadUserTokensData({
                userTokens: staticUserTokenData.slice(0, 2),
              }),
              staticUserTokenData.slice(-1),
            ]);

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

        it('- should replace 1...N user token instances that exist correlated by userTokenId or insert/create 1...N user token instances that do not exist correlated by userTokenId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update first element to make sure
            // that things are updated if they
            // already exist in the backend datastores
            const updatedUserTokenData = _.flatten([
              staticUserTokenData
                .slice(0, 2)
                .map((item: any, itemIndex: number) => _.assign({}, item, { revokedIp: `UPDATE ${itemIndex}` })),
              cachedUserTokenData.slice(-1),
            ]);

            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_EXISTING_USER_TOKENS = staticUserTokenData.slice(0, 2);
            const EXPECTED_EXISTING_USER_TOKENS_LENGTH = EXPECTED_EXISTING_USER_TOKENS.length;
            const EXPECTED_NONEXISTING_USER_TOKENS = cachedUserTokenData.slice(-1);
            const EXPECTED_USER_TOKEN_CLASS_INSTANCE = UserToken;
            const EXPECTED_USER_TOKENS = updatedUserTokenData.slice();
            const EXPECTED_USER_TOKENS_LENGTH = EXPECTED_USER_TOKENS.length;

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
            expect(foundItems.length === EXPECTED_EXISTING_USER_TOKENS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_EXISTING_USER_TOKENS.find((expectedItem: any) => expectedItem.userTokenId === foundItem.userTokenId) !== undefined,
              ).to.be.true;
            }
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_NONEXISTING_USER_TOKENS.find((expectedItem: any) => expectedItem.userTokenId === foundItem.userTokenId) ===
                  undefined,
              ).to.be.true;
            }

            // run testee
            const putUserTokensRequest = {
              userTokens: cachedUserTokenData,
            };
            const putUserTokensResponse = await userManager.putUserTokens(putUserTokensRequest);

            // run assertions
            expect(putUserTokensResponse !== undefined).to.be.true;
            expect(putUserTokensResponse.userTokens !== undefined).to.be.true;
            expect(putUserTokensResponse.userTokens instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(putUserTokensResponse.userTokens.length === EXPECTED_USER_TOKENS_LENGTH).to.be.true;
            for (const userToken of putUserTokensResponse.userTokens) {
              expect(userToken instanceof EXPECTED_USER_TOKEN_CLASS_INSTANCE).to.be.true;
              expect(EXPECTED_USER_TOKENS.find((expectedItem: any) => expectedItem.userTokenId === userToken.userTokenId) !== undefined).to
                .be.true;
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
            expect(foundItems.length === EXPECTED_USER_TOKENS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(EXPECTED_USER_TOKENS.find((expectedItem: any) => expectedItem.userTokenId === foundItem.userTokenId) !== undefined).to
                .be.true;
            }

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });
      });
    });

    context('({ userTokens: [3 do exist...] })', () => {
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

        it('- should replace 1...N user token instances that exist correlated by userTokenId or insert/create 1...N user token instances that do not exist correlated by userTokenId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update first element to make sure
            // that things are updated if they
            // already exist in the backend datastores
            const updatedUserTokenData = staticUserTokenData
              .slice()
              .map((item: any, itemIndex: number) => _.assign({}, item, { revokedIp: `UPDATE ${itemIndex}` }));

            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_EXISTING_USER_TOKENS = staticUserTokenData.slice();
            const EXPECTED_EXISTING_USER_TOKENS_LENGTH = EXPECTED_EXISTING_USER_TOKENS.length;
            const EXPECTED_NONEXISTING_USER_TOKENS: any[] = [];
            const EXPECTED_USER_TOKEN_CLASS_INSTANCE = UserToken;
            const EXPECTED_USER_TOKENS = updatedUserTokenData.slice();
            const EXPECTED_USER_TOKENS_LENGTH = EXPECTED_USER_TOKENS.length;

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
            expect(foundItems.length === EXPECTED_EXISTING_USER_TOKENS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_EXISTING_USER_TOKENS.find((expectedItem: any) => expectedItem.userTokenId === foundItem.userTokenId) !== undefined,
              ).to.be.true;
            }
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_NONEXISTING_USER_TOKENS.find((expectedItem: any) => expectedItem.userTokenId === foundItem.userTokenId) ===
                  undefined,
              ).to.be.true;
            }

            // run testee
            const putUserTokensRequest = {
              userTokens: cachedUserTokenData,
            };
            const putUserTokensResponse = await userManager.putUserTokens(putUserTokensRequest);

            // run assertions
            expect(putUserTokensResponse !== undefined).to.be.true;
            expect(putUserTokensResponse.userTokens !== undefined).to.be.true;
            expect(putUserTokensResponse.userTokens instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(putUserTokensResponse.userTokens.length === EXPECTED_USER_TOKENS_LENGTH).to.be.true;
            for (const userToken of putUserTokensResponse.userTokens) {
              expect(userToken instanceof EXPECTED_USER_TOKEN_CLASS_INSTANCE).to.be.true;
              expect(EXPECTED_USER_TOKENS.find((expectedItem: any) => expectedItem.userTokenId === userToken.userTokenId) !== undefined).to
                .be.true;
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
            expect(foundItems.length === EXPECTED_USER_TOKENS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(EXPECTED_USER_TOKENS.find((expectedItem: any) => expectedItem.userTokenId === foundItem.userTokenId) !== undefined).to
                .be.true;
            }

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
