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
describe('data-management/user/searchUserTokens - #searchUserTokens - integration tests', () => {
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

  describe('#searchUserTokens', () => {
    context('({ searchCriteria: {}, searchOptions: { pageNumber, pageSize } })', () => {
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

        it('- should retrun 1...N user token instances that match a given criteria with the given options applied', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_USER_CLASS_INSTANCE = UserToken;
            const EXPECTED_USERS = cachedUserTokenData.slice();
            const EXPECTED_USERS_LENGTH = EXPECTED_USERS.length;

            /////////////////////////
            //////// test //////////
            /////////////////////////

            // run testee
            const searchUserTokensRequest = {
              searchCriteria: {},
              searchOptions: { pageNumber: 1, pageSize: 500 },
            };
            const searchUserTokensResponse = await userManager.searchUserTokens(searchUserTokensRequest);

            // run assertions
            expect(searchUserTokensResponse !== undefined).to.be.true;
            expect(searchUserTokensResponse.userTokens !== undefined).to.be.true;
            expect(searchUserTokensResponse.userTokens instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(searchUserTokensResponse.userTokens.length === EXPECTED_USERS_LENGTH).to.be.true;
            for (const userToken of searchUserTokensResponse.userTokens) {
              expect(userToken instanceof EXPECTED_USER_CLASS_INSTANCE).to.be.true;
              expect(EXPECTED_USERS.find((expectedItem: any) => expectedItem.userTokenId === userToken.userTokenId) !== undefined).to.be
                .true;
            }
            expect(searchUserTokensResponse.moreUserTokens !== undefined).to.be.true;
            expect(searchUserTokensResponse.moreUserTokens).to.be.false;
            expect(searchUserTokensResponse.totalUserTokens === undefined).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });
      });
    });

    context('({ searchCriteria: { userTokenId }, searchOptions: { pageNumber, pageSize } })', () => {
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

        it('- should retrun 1...N user token instances that match a given criteria with the given options applied', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_USER_CLASS_INSTANCE = UserToken;
            const EXPECTED_USERS = cachedUserTokenData.slice(0, 1);
            const EXPECTED_USERS_LENGTH = EXPECTED_USERS.length;

            /////////////////////////
            //////// test //////////
            /////////////////////////

            // run testee
            const searchUserTokensRequest = {
              searchCriteria: { userTokenId: cachedUserTokenData[0].userTokenId },
              searchOptions: { pageNumber: 1, pageSize: 500 },
            };
            const searchUserTokensResponse = await userManager.searchUserTokens(searchUserTokensRequest);

            // run assertions
            expect(searchUserTokensResponse !== undefined).to.be.true;
            expect(searchUserTokensResponse.userTokens !== undefined).to.be.true;
            expect(searchUserTokensResponse.userTokens instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(searchUserTokensResponse.userTokens.length === EXPECTED_USERS_LENGTH).to.be.true;
            for (const userToken of searchUserTokensResponse.userTokens) {
              expect(userToken instanceof EXPECTED_USER_CLASS_INSTANCE).to.be.true;
              expect(EXPECTED_USERS.find((expectedItem: any) => expectedItem.userTokenId === userToken.userTokenId) !== undefined).to.be
                .true;
            }
            expect(searchUserTokensResponse.moreUserTokens !== undefined).to.be.true;
            expect(searchUserTokensResponse.moreUserTokens).to.be.false;
            expect(searchUserTokensResponse.totalUserTokens === undefined).to.be.true;

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
