/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import 'reflect-metadata';
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
describe('data-management/user/putUsers - #putUsers - integration tests', () => {
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

  describe('#putUsers', () => {
    context('({ users: [3 do not exist...] })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // create the faked data
            staticUserData = await readStaticUserData(3);

            // load data into datasources
            cachedUserData = staticUserData.slice();

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

        it('- should replace 1...N user instances that exist correlated by userId or insert/create 1...N user instances that do not exist correlated by userId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_CERTIFICATION_CLASS_INSTANCE = User;
            const EXPECTED_USERS = cachedUserData.slice();
            const EXPECTED_USERS_LENGTH = EXPECTED_USERS.length;

            /////////////////////////
            //////// test //////////
            /////////////////////////

            // run testee
            const putUsersRequest = {
              users: cachedUserData,
            };
            const putUsersResponse = await userManager.putUsers(putUsersRequest);

            // run assertions
            expect(putUsersResponse !== undefined).to.be.true;
            expect(putUsersResponse.users !== undefined).to.be.true;
            expect(putUsersResponse.users instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(putUsersResponse.users.length === EXPECTED_USERS_LENGTH).to.be.true;
            for (const user of putUsersResponse.users) {
              expect(user instanceof EXPECTED_CERTIFICATION_CLASS_INSTANCE).to.be.true;
              expect(EXPECTED_USERS.find((expectedItem: any) => expectedItem.userId === user.userId) !== undefined).to.be.true;
            }

            // query mongo to get info
            const blainerrichardsonCloudDb = await mongo.getConnection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);
            const foundItems = await blainerrichardsonCloudDb
              .collection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_USERS_COLLECTION_NAME)
              .find({ userId: { $in: cachedUserData.map((item: any) => item.userId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_USERS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(EXPECTED_USERS.find((expectedItem: any) => expectedItem.userId === foundItem.userId) !== undefined).to.be.true;
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

    context('({ users: [2 do not exist..., 1 does exist...] })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // create the faked data
            staticUserData = await readStaticUserData(3);

            // load data into datasources
            cachedUserData = _.flatten([
              await loadUsersData({
                users: [staticUserData.slice()[0]],
              }),
              staticUserData.slice(1),
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
            cachedUserData = await unloadUsersData({
              users: cachedUserData,
            });

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should replace 1...N user instances that exist correlated by userId or insert/create 1...N user instances that do not exist correlated by userId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update first element to make sure
            // that things are updated if they
            // already exist in the backend datastores
            const updatedUserData = _.flatten([_.assign({}, cachedUserData.slice()[0], { firstName: 'UPDATE' }), cachedUserData.slice(1)]);

            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_EXISTING_USERS = [cachedUserData.slice()[0]];
            const EXPECTED_EXISTING_USERS_LENGTH = EXPECTED_EXISTING_USERS.length;
            const EXPECTED_NONEXISTING_USERS = cachedUserData.slice(1);
            const EXPECTED_CERTIFICATION_CLASS_INSTANCE = User;
            const EXPECTED_USERS = updatedUserData.slice();
            const EXPECTED_USERS_LENGTH = EXPECTED_USERS.length;

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
            expect(foundItems.length === EXPECTED_EXISTING_USERS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(EXPECTED_EXISTING_USERS.find((expectedItem: any) => expectedItem.userId === foundItem.userId) !== undefined).to.be
                .true;
            }
            for (const foundItem of foundItems) {
              expect(EXPECTED_NONEXISTING_USERS.find((expectedItem: any) => expectedItem.userId === foundItem.userId) === undefined).to.be
                .true;
            }

            // run testee
            const putUsersRequest = {
              users: cachedUserData,
            };
            const putUsersResponse = await userManager.putUsers(putUsersRequest);

            // run assertions
            expect(putUsersResponse !== undefined).to.be.true;
            expect(putUsersResponse.users !== undefined).to.be.true;
            expect(putUsersResponse.users instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(putUsersResponse.users.length === EXPECTED_USERS_LENGTH).to.be.true;
            for (const user of putUsersResponse.users) {
              expect(user instanceof EXPECTED_CERTIFICATION_CLASS_INSTANCE).to.be.true;
              expect(EXPECTED_USERS.find((expectedItem: any) => expectedItem.userId === user.userId) !== undefined).to.be.true;
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
            expect(foundItems.length === EXPECTED_USERS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(EXPECTED_USERS.find((expectedItem: any) => expectedItem.userId === foundItem.userId) !== undefined).to.be.true;
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

    context('({ users: [1 does not exist..., 2 do exist...] })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // create the faked data
            staticUserData = await readStaticUserData(3);

            // load data into datasources
            cachedUserData = _.flatten([
              await loadUsersData({
                users: staticUserData.slice(0, 2),
              }),
              staticUserData.slice(-1),
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
            cachedUserData = await unloadUsersData({
              users: cachedUserData,
            });

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should replace 1...N user instances that exist correlated by userId or insert/create 1...N user instances that do not exist correlated by userId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update first element to make sure
            // that things are updated if they
            // already exist in the backend datastores
            const updatedUserData = _.flatten([
              staticUserData.slice(0, 2).map((item: any, itemIndex: number) => _.assign({}, item, { firstName: `UPDATE ${itemIndex}` })),
              cachedUserData.slice(-1),
            ]);

            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_EXISTING_USERS = staticUserData.slice(0, 2);
            const EXPECTED_EXISTING_USERS_LENGTH = EXPECTED_EXISTING_USERS.length;
            const EXPECTED_NONEXISTING_USERS = cachedUserData.slice(-1);
            const EXPECTED_CERTIFICATION_CLASS_INSTANCE = User;
            const EXPECTED_USERS = updatedUserData.slice();
            const EXPECTED_USERS_LENGTH = EXPECTED_USERS.length;

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
            expect(foundItems.length === EXPECTED_EXISTING_USERS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(EXPECTED_EXISTING_USERS.find((expectedItem: any) => expectedItem.userId === foundItem.userId) !== undefined).to.be
                .true;
            }
            for (const foundItem of foundItems) {
              expect(EXPECTED_NONEXISTING_USERS.find((expectedItem: any) => expectedItem.userId === foundItem.userId) === undefined).to.be
                .true;
            }

            // run testee
            const putUsersRequest = {
              users: cachedUserData,
            };
            const putUsersResponse = await userManager.putUsers(putUsersRequest);

            // run assertions
            expect(putUsersResponse !== undefined).to.be.true;
            expect(putUsersResponse.users !== undefined).to.be.true;
            expect(putUsersResponse.users instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(putUsersResponse.users.length === EXPECTED_USERS_LENGTH).to.be.true;
            for (const user of putUsersResponse.users) {
              expect(user instanceof EXPECTED_CERTIFICATION_CLASS_INSTANCE).to.be.true;
              expect(EXPECTED_USERS.find((expectedItem: any) => expectedItem.userId === user.userId) !== undefined).to.be.true;
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
            expect(foundItems.length === EXPECTED_USERS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(EXPECTED_USERS.find((expectedItem: any) => expectedItem.userId === foundItem.userId) !== undefined).to.be.true;
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

    context('({ users: [3 do exist...] })', () => {
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

        it('- should replace 1...N user instances that exist correlated by userId or insert/create 1...N user instances that do not exist correlated by userId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update first element to make sure
            // that things are updated if they
            // already exist in the backend datastores
            const updatedUserData = staticUserData
              .slice()
              .map((item: any, itemIndex: number) => _.assign({}, item, { firstName: `UPDATE ${itemIndex}` }));

            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_EXISTING_USERS = staticUserData.slice();
            const EXPECTED_EXISTING_USERS_LENGTH = EXPECTED_EXISTING_USERS.length;
            const EXPECTED_NONEXISTING_USERS: any[] = [];
            const EXPECTED_CERTIFICATION_CLASS_INSTANCE = User;
            const EXPECTED_USERS = updatedUserData.slice();
            const EXPECTED_USERS_LENGTH = EXPECTED_USERS.length;

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
            expect(foundItems.length === EXPECTED_EXISTING_USERS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(EXPECTED_EXISTING_USERS.find((expectedItem: any) => expectedItem.userId === foundItem.userId) !== undefined).to.be
                .true;
            }
            for (const foundItem of foundItems) {
              expect(EXPECTED_NONEXISTING_USERS.find((expectedItem: any) => expectedItem.userId === foundItem.userId) === undefined).to.be
                .true;
            }

            // run testee
            const putUsersRequest = {
              users: cachedUserData,
            };
            const putUsersResponse = await userManager.putUsers(putUsersRequest);

            // run assertions
            expect(putUsersResponse !== undefined).to.be.true;
            expect(putUsersResponse.users !== undefined).to.be.true;
            expect(putUsersResponse.users instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(putUsersResponse.users.length === EXPECTED_USERS_LENGTH).to.be.true;
            for (const user of putUsersResponse.users) {
              expect(user instanceof EXPECTED_CERTIFICATION_CLASS_INSTANCE).to.be.true;
              expect(EXPECTED_USERS.find((expectedItem: any) => expectedItem.userId === user.userId) !== undefined).to.be.true;
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
            expect(foundItems.length === EXPECTED_USERS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(EXPECTED_USERS.find((expectedItem: any) => expectedItem.userId === foundItem.userId) !== undefined).to.be.true;
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
