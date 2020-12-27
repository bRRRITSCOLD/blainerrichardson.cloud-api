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
describe('data-management/user/searchUsers - #searchUsers - integration tests', () => {
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

  describe('#searchUsers', () => {
    context('({ searchCriteria: {}, searchOptions: { pageNumber, pageSize } })', () => {
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

        it('- should retrun 1...N user instances that match a given criteria with the given options applied', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_USER_CLASS_INSTANCE = User;
            const EXPECTED_USERS = cachedUserData.slice();
            const EXPECTED_USERS_LENGTH = EXPECTED_USERS.length;

            /////////////////////////
            //////// test //////////
            /////////////////////////

            // run testee
            const searchUsersRequest = {
              searchCriteria: {},
              searchOptions: { pageNumber: 1, pageSize: 500 },
            };
            const searchUsersResponse = await userManager.searchUsers(searchUsersRequest);

            // run assertions
            expect(searchUsersResponse !== undefined).to.be.true;
            expect(searchUsersResponse.users !== undefined).to.be.true;
            expect(searchUsersResponse.users instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(searchUsersResponse.users.length >= EXPECTED_USERS_LENGTH).to.be.true;
            let foundCount = 0;
            for (const user of searchUsersResponse.users) {
              expect(user instanceof EXPECTED_USER_CLASS_INSTANCE).to.be.true;
              const found = EXPECTED_USERS.find((expectedItem: any) => expectedItem.userId === user.userId);
              if (found) foundCount++;
            }
            expect(foundCount === EXPECTED_USERS_LENGTH).to.be.true;
            expect(searchUsersResponse.moreUsers !== undefined).to.be.true;
            expect(searchUsersResponse.moreUsers).to.be.false;
            expect(searchUsersResponse.totalUsers === undefined).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });
      });
    });

    context('({ searchCriteria: { firstName }, searchOptions: { pageNumber, pageSize } })', () => {
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

        it('- should retrun 1...N user instances that match a given criteria with the given options applied', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_USER_CLASS_INSTANCE = User;
            const EXPECTED_USERS = cachedUserData.slice(0, 1);
            const EXPECTED_USERS_LENGTH = EXPECTED_USERS.length;

            /////////////////////////
            //////// test //////////
            /////////////////////////

            // run testee
            const searchUsersRequest = {
              searchCriteria: { firstName: cachedUserData[0].firstName },
              searchOptions: { pageNumber: 1, pageSize: 500 },
            };
            const searchUsersResponse = await userManager.searchUsers(searchUsersRequest);

            // run assertions
            expect(searchUsersResponse !== undefined).to.be.true;
            expect(searchUsersResponse.users !== undefined).to.be.true;
            expect(searchUsersResponse.users instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(searchUsersResponse.users.length === EXPECTED_USERS_LENGTH).to.be.true;
            for (const user of searchUsersResponse.users) {
              expect(user instanceof EXPECTED_USER_CLASS_INSTANCE).to.be.true;
              expect(EXPECTED_USERS.find((expectedItem: any) => expectedItem.userId === user.userId) !== undefined).to.be.true;
            }
            expect(searchUsersResponse.moreUsers !== undefined).to.be.true;
            expect(searchUsersResponse.moreUsers).to.be.false;
            expect(searchUsersResponse.totalUsers === undefined).to.be.true;

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
