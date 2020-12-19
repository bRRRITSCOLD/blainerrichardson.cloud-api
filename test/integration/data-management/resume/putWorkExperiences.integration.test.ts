/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import 'reflect-metadata';
import { expect } from 'chai';
import * as _ from 'lodash';

// libraries
import { integrationTestEnv } from '../../../lib/environment';
import { mongo } from '../../../../src/lib/mongo';

// models
import { WorkExperience } from '../../../../src/models/resume';

// testees
import * as resumeManager from '../../../../src/data-management/resume';
import { loadWorkExperiencesData, unloadWorkExperiencesData } from '../../../data/loaders/resume';
import { readStaticWorkExperienceData } from '../../../data/static/resume/WorkExperience';

// data

// file constants/functions
let staticWorkExperienceData: any | any[];

let cachedWorkExperienceData: any | any[];

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
describe('data-management/resume/putWorkExperiences - #putWorkExperiences - integration tests', () => {
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

  describe('#putWorkExperiences', () => {
    context('({ workExperiences: [3 do not exist...] })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // create the faked data
            staticWorkExperienceData = await readStaticWorkExperienceData(3);

            // load data into datasources
            cachedWorkExperienceData = staticWorkExperienceData.slice();

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        afterEach(async () => {
          try {
            // unload data from datasources
            cachedWorkExperienceData = await unloadWorkExperiencesData({
              workExperiences: cachedWorkExperienceData,
            });

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should replace 1...N school experience instances that exist correlated by workExperienceId or insert/create 1...N school experience instances that do not exist correlated by workExperienceId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_WORK_EXPERIENCE_CLASS_INSTANCE = WorkExperience;
            const EXPECTED_WORK_EXPERIENCES = cachedWorkExperienceData.slice();
            const EXPECTED_WORK_EXPERIENCES_LENGTH = EXPECTED_WORK_EXPERIENCES.length;

            /////////////////////////
            //////// test //////////
            /////////////////////////

            // run testee
            const putWorkExperiencesRequest = {
              workExperiences: cachedWorkExperienceData,
            };
            const putWorkExperiencesResponse = await resumeManager.putWorkExperiences(putWorkExperiencesRequest);

            // run assertions
            expect(putWorkExperiencesResponse !== undefined).to.be.true;
            expect(putWorkExperiencesResponse.workExperiences !== undefined).to.be.true;
            expect(putWorkExperiencesResponse.workExperiences instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(putWorkExperiencesResponse.workExperiences.length === EXPECTED_WORK_EXPERIENCES_LENGTH).to.be.true;
            for (const workExperience of putWorkExperiencesResponse.workExperiences) {
              expect(workExperience instanceof EXPECTED_WORK_EXPERIENCE_CLASS_INSTANCE).to.be.true;
              expect(
                EXPECTED_WORK_EXPERIENCES.find((expectedItem: any) => expectedItem.workExperienceId === workExperience.workExperienceId) !==
                  undefined,
              ).to.be.true;
            }

            // query mongo to get info
            const blainerrichardsonCloudDb = await mongo.getConnection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);
            const foundItems = await blainerrichardsonCloudDb
              .collection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_WORK_EXPERIENCES_COLLECTION_NAME)
              .find({ workExperienceId: { $in: cachedWorkExperienceData.map((item: any) => item.workExperienceId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_WORK_EXPERIENCES_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_WORK_EXPERIENCES.find((expectedItem: any) => expectedItem.workExperienceId === foundItem.workExperienceId) !==
                  undefined,
              ).to.be.true;
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

    context('({ workExperiences: [2 do not exist..., 1 does exist...] })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // create the faked data
            staticWorkExperienceData = await readStaticWorkExperienceData(3);

            // load data into datasources
            cachedWorkExperienceData = _.flatten([
              await loadWorkExperiencesData({
                workExperiences: [staticWorkExperienceData.slice()[0]],
              }),
              staticWorkExperienceData.slice(1),
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
            cachedWorkExperienceData = await unloadWorkExperiencesData({
              workExperiences: cachedWorkExperienceData,
            });

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should replace 1...N school experience instances that exist correlated by workExperienceId or insert/create 1...N school experience instances that do not exist correlated by workExperienceId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update first element to make sure
            // that things are updated if they
            // already exist in the backend datastores
            const updatedWorkExperienceData = _.flatten([
              _.assign({}, cachedWorkExperienceData.slice()[0], { schoolName: 'UPDATE' }),
              cachedWorkExperienceData.slice(1),
            ]);

            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_EXISTING_WORK_EXPERIENCES = [cachedWorkExperienceData.slice()[0]];
            const EXPECTED_EXISTING_WORK_EXPERIENCES_LENGTH = EXPECTED_EXISTING_WORK_EXPERIENCES.length;
            const EXPECTED_NONEXISTING_WORK_EXPERIENCES = cachedWorkExperienceData.slice(1);
            const EXPECTED_WORK_EXPERIENCE_CLASS_INSTANCE = WorkExperience;
            const EXPECTED_WORK_EXPERIENCES = updatedWorkExperienceData.slice();
            const EXPECTED_WORK_EXPERIENCES_LENGTH = EXPECTED_WORK_EXPERIENCES.length;

            /////////////////////////
            //////// test ///////////
            /////////////////////////
            // query mongo to get info
            const blainerrichardsonCloudDb = await mongo.getConnection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);
            let foundItems = await blainerrichardsonCloudDb
              .collection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_WORK_EXPERIENCES_COLLECTION_NAME)
              .find({ workExperienceId: { $in: cachedWorkExperienceData.map((item: any) => item.workExperienceId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_EXISTING_WORK_EXPERIENCES_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_EXISTING_WORK_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.workExperienceId === foundItem.workExperienceId,
                ) !== undefined,
              ).to.be.true;
            }
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_NONEXISTING_WORK_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.workExperienceId === foundItem.workExperienceId,
                ) === undefined,
              ).to.be.true;
            }

            // run testee
            const putWorkExperiencesRequest = {
              workExperiences: cachedWorkExperienceData,
            };
            const putWorkExperiencesResponse = await resumeManager.putWorkExperiences(putWorkExperiencesRequest);

            // run assertions
            expect(putWorkExperiencesResponse !== undefined).to.be.true;
            expect(putWorkExperiencesResponse.workExperiences !== undefined).to.be.true;
            expect(putWorkExperiencesResponse.workExperiences instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(putWorkExperiencesResponse.workExperiences.length === EXPECTED_WORK_EXPERIENCES_LENGTH).to.be.true;
            for (const workExperience of putWorkExperiencesResponse.workExperiences) {
              expect(workExperience instanceof EXPECTED_WORK_EXPERIENCE_CLASS_INSTANCE).to.be.true;
              expect(
                EXPECTED_WORK_EXPERIENCES.find((expectedItem: any) => expectedItem.workExperienceId === workExperience.workExperienceId) !==
                  undefined,
              ).to.be.true;
            }

            // query mongo to get info
            foundItems = await blainerrichardsonCloudDb
              .collection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_WORK_EXPERIENCES_COLLECTION_NAME)
              .find({ workExperienceId: { $in: cachedWorkExperienceData.map((item: any) => item.workExperienceId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_WORK_EXPERIENCES_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_WORK_EXPERIENCES.find((expectedItem: any) => expectedItem.workExperienceId === foundItem.workExperienceId) !==
                  undefined,
              ).to.be.true;
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

    context('({ workExperiences: [1 does not exist..., 2 do exist...] })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // create the faked data
            staticWorkExperienceData = await readStaticWorkExperienceData(3);

            // load data into datasources
            cachedWorkExperienceData = _.flatten([
              await loadWorkExperiencesData({
                workExperiences: staticWorkExperienceData.slice(0, 2),
              }),
              staticWorkExperienceData.slice(-1),
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
            cachedWorkExperienceData = await unloadWorkExperiencesData({
              workExperiences: cachedWorkExperienceData,
            });

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should replace 1...N school experience instances that exist correlated by workExperienceId or insert/create 1...N school experience instances that do not exist correlated by workExperienceId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update first element to make sure
            // that things are updated if they
            // already exist in the backend datastores
            const updatedWorkExperienceData = _.flatten([
              staticWorkExperienceData
                .slice(0, 2)
                .map((item: any, itemIndex: number) => _.assign({}, item, { schoolName: `UPDATE ${itemIndex}` })),
              cachedWorkExperienceData.slice(-1),
            ]);

            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_EXISTING_WORK_EXPERIENCES = staticWorkExperienceData.slice(0, 2);
            const EXPECTED_EXISTING_WORK_EXPERIENCES_LENGTH = EXPECTED_EXISTING_WORK_EXPERIENCES.length;
            const EXPECTED_NONEXISTING_WORK_EXPERIENCES = cachedWorkExperienceData.slice(-1);
            const EXPECTED_WORK_EXPERIENCE_CLASS_INSTANCE = WorkExperience;
            const EXPECTED_WORK_EXPERIENCES = updatedWorkExperienceData.slice();
            const EXPECTED_WORK_EXPERIENCES_LENGTH = EXPECTED_WORK_EXPERIENCES.length;

            /////////////////////////
            //////// test ///////////
            /////////////////////////
            // query mongo to get info
            const blainerrichardsonCloudDb = await mongo.getConnection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);
            let foundItems = await blainerrichardsonCloudDb
              .collection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_WORK_EXPERIENCES_COLLECTION_NAME)
              .find({ workExperienceId: { $in: cachedWorkExperienceData.map((item: any) => item.workExperienceId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_EXISTING_WORK_EXPERIENCES_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_EXISTING_WORK_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.workExperienceId === foundItem.workExperienceId,
                ) !== undefined,
              ).to.be.true;
            }
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_NONEXISTING_WORK_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.workExperienceId === foundItem.workExperienceId,
                ) === undefined,
              ).to.be.true;
            }

            // run testee
            const putWorkExperiencesRequest = {
              workExperiences: cachedWorkExperienceData,
            };
            const putWorkExperiencesResponse = await resumeManager.putWorkExperiences(putWorkExperiencesRequest);

            // run assertions
            expect(putWorkExperiencesResponse !== undefined).to.be.true;
            expect(putWorkExperiencesResponse.workExperiences !== undefined).to.be.true;
            expect(putWorkExperiencesResponse.workExperiences instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(putWorkExperiencesResponse.workExperiences.length === EXPECTED_WORK_EXPERIENCES_LENGTH).to.be.true;
            for (const workExperience of putWorkExperiencesResponse.workExperiences) {
              expect(workExperience instanceof EXPECTED_WORK_EXPERIENCE_CLASS_INSTANCE).to.be.true;
              expect(
                EXPECTED_WORK_EXPERIENCES.find((expectedItem: any) => expectedItem.workExperienceId === workExperience.workExperienceId) !==
                  undefined,
              ).to.be.true;
            }

            // query mongo to get info
            foundItems = await blainerrichardsonCloudDb
              .collection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_WORK_EXPERIENCES_COLLECTION_NAME)
              .find({ workExperienceId: { $in: cachedWorkExperienceData.map((item: any) => item.workExperienceId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_WORK_EXPERIENCES_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_WORK_EXPERIENCES.find((expectedItem: any) => expectedItem.workExperienceId === foundItem.workExperienceId) !==
                  undefined,
              ).to.be.true;
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

    context('({ workExperiences: [3 do exist...] })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // create the faked data
            staticWorkExperienceData = await readStaticWorkExperienceData(3);

            // load data into datasources
            cachedWorkExperienceData = await loadWorkExperiencesData({
              workExperiences: staticWorkExperienceData,
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
            cachedWorkExperienceData = await unloadWorkExperiencesData({
              workExperiences: cachedWorkExperienceData,
            });

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should replace 1...N school experience instances that exist correlated by workExperienceId or insert/create 1...N school experience instances that do not exist correlated by workExperienceId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update first element to make sure
            // that things are updated if they
            // already exist in the backend datastores
            const updatedWorkExperienceData = staticWorkExperienceData
              .slice()
              .map((item: any, itemIndex: number) => _.assign({}, item, { schoolName: `UPDATE ${itemIndex}` }));

            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_EXISTING_WORK_EXPERIENCES = staticWorkExperienceData.slice();
            const EXPECTED_EXISTING_WORK_EXPERIENCES_LENGTH = EXPECTED_EXISTING_WORK_EXPERIENCES.length;
            const EXPECTED_NONEXISTING_WORK_EXPERIENCES: any[] = [];
            const EXPECTED_WORK_EXPERIENCE_CLASS_INSTANCE = WorkExperience;
            const EXPECTED_WORK_EXPERIENCES = updatedWorkExperienceData.slice();
            const EXPECTED_WORK_EXPERIENCES_LENGTH = EXPECTED_WORK_EXPERIENCES.length;

            /////////////////////////
            //////// test ///////////
            /////////////////////////
            // query mongo to get info
            const blainerrichardsonCloudDb = await mongo.getConnection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);
            let foundItems = await blainerrichardsonCloudDb
              .collection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_WORK_EXPERIENCES_COLLECTION_NAME)
              .find({ workExperienceId: { $in: cachedWorkExperienceData.map((item: any) => item.workExperienceId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_EXISTING_WORK_EXPERIENCES_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_EXISTING_WORK_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.workExperienceId === foundItem.workExperienceId,
                ) !== undefined,
              ).to.be.true;
            }
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_NONEXISTING_WORK_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.workExperienceId === foundItem.workExperienceId,
                ) === undefined,
              ).to.be.true;
            }

            // run testee
            const putWorkExperiencesRequest = {
              workExperiences: cachedWorkExperienceData,
            };
            const putWorkExperiencesResponse = await resumeManager.putWorkExperiences(putWorkExperiencesRequest);

            // run assertions
            expect(putWorkExperiencesResponse !== undefined).to.be.true;
            expect(putWorkExperiencesResponse.workExperiences !== undefined).to.be.true;
            expect(putWorkExperiencesResponse.workExperiences instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(putWorkExperiencesResponse.workExperiences.length === EXPECTED_WORK_EXPERIENCES_LENGTH).to.be.true;
            for (const workExperience of putWorkExperiencesResponse.workExperiences) {
              expect(workExperience instanceof EXPECTED_WORK_EXPERIENCE_CLASS_INSTANCE).to.be.true;
              expect(
                EXPECTED_WORK_EXPERIENCES.find((expectedItem: any) => expectedItem.workExperienceId === workExperience.workExperienceId) !==
                  undefined,
              ).to.be.true;
            }

            // query mongo to get info
            foundItems = await blainerrichardsonCloudDb
              .collection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_WORK_EXPERIENCES_COLLECTION_NAME)
              .find({ workExperienceId: { $in: cachedWorkExperienceData.map((item: any) => item.workExperienceId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_WORK_EXPERIENCES_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_WORK_EXPERIENCES.find((expectedItem: any) => expectedItem.workExperienceId === foundItem.workExperienceId) !==
                  undefined,
              ).to.be.true;
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
