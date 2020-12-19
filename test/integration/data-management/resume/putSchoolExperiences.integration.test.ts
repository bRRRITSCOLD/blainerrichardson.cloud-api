/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import 'reflect-metadata';
import { expect } from 'chai';
import * as _ from 'lodash';

// libraries
import { integrationTestEnv } from '../../../lib/environment';
import { mongo } from '../../../../src/lib/mongo';

// models
import { SchoolExperience } from '../../../../src/models/resume';

// testees
import * as resumeManager from '../../../../src/data-management/resume';
import { loadSchoolExperiencesData, unloadSchoolExperiencesData } from '../../../data/loaders/resume';
import { readStaticSchoolExperienceData } from '../../../data/static/resume/SchoolExperience';

// data

// file constants/functions
let staticSchoolExperienceData: any | any[];

let cachedSchoolExperienceData: any | any[];

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
describe('data-management/resume/putSchoolExperiences - #putSchoolExperiences - integration tests', () => {
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

  describe('#putSchoolExperiences', () => {
    context('({ schoolExperiences: [3 do not exist...] })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // create the faked data
            staticSchoolExperienceData = await readStaticSchoolExperienceData(3);

            // load data into datasources
            cachedSchoolExperienceData = staticSchoolExperienceData.slice();

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        afterEach(async () => {
          try {
            // unload data from datasources
            cachedSchoolExperienceData = await unloadSchoolExperiencesData({
              schoolExperiences: cachedSchoolExperienceData,
            });

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should replace 1...N school experience instances that exist correlated by schoolExperienceId or insert/create 1...N school experience instances that do not exist correlated by schoolExperienceId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_SCHOOL_EXPERIENCE_CLASS_INSTANCE = SchoolExperience;
            const EXPECTED_SCHOOL_EXPERIENCES = cachedSchoolExperienceData.slice();
            const EXPECTED_SCHOOL_EXPERIENCES_LENGTH = EXPECTED_SCHOOL_EXPERIENCES.length;

            /////////////////////////
            //////// test //////////
            /////////////////////////

            // run testee
            const putSchoolExperiencesRequest = {
              schoolExperiences: cachedSchoolExperienceData,
            };
            const putSchoolExperiencesResponse = await resumeManager.putSchoolExperiences(putSchoolExperiencesRequest);

            // run assertions
            expect(putSchoolExperiencesResponse !== undefined).to.be.true;
            expect(putSchoolExperiencesResponse.schoolExperiences !== undefined).to.be.true;
            expect(putSchoolExperiencesResponse.schoolExperiences instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(putSchoolExperiencesResponse.schoolExperiences.length === EXPECTED_SCHOOL_EXPERIENCES_LENGTH).to.be.true;
            for (const schoolExperience of putSchoolExperiencesResponse.schoolExperiences) {
              expect(schoolExperience instanceof EXPECTED_SCHOOL_EXPERIENCE_CLASS_INSTANCE).to.be.true;
              expect(
                EXPECTED_SCHOOL_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.schoolExperienceId === schoolExperience.schoolExperienceId,
                ) !== undefined,
              ).to.be.true;
            }

            // query mongo to get info
            const blainerrichardsonCloudDb = await mongo.getConnection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);
            const foundItems = await blainerrichardsonCloudDb
              .collection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_SCHOOL_EXPERIENCES_COLLECTION_NAME)
              .find({ schoolExperienceId: { $in: cachedSchoolExperienceData.map((item: any) => item.schoolExperienceId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_SCHOOL_EXPERIENCES_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_SCHOOL_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.schoolExperienceId === foundItem.schoolExperienceId,
                ) !== undefined,
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

    context('({ schoolExperiences: [2 do not exist..., 1 does exist...] })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // create the faked data
            staticSchoolExperienceData = await readStaticSchoolExperienceData(3);

            // load data into datasources
            cachedSchoolExperienceData = _.flatten([
              await loadSchoolExperiencesData({
                schoolExperiences: [staticSchoolExperienceData.slice()[0]],
              }),
              staticSchoolExperienceData.slice(1),
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
            cachedSchoolExperienceData = await unloadSchoolExperiencesData({
              schoolExperiences: cachedSchoolExperienceData,
            });

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should replace 1...N school experience instances that exist correlated by schoolExperienceId or insert/create 1...N school experience instances that do not exist correlated by schoolExperienceId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update first element to make sure
            // that things are updated if they
            // already exist in the backend datastores
            const updatedSchoolExperienceData = _.flatten([
              _.assign({}, cachedSchoolExperienceData.slice()[0], { schoolName: 'UPDATE' }),
              cachedSchoolExperienceData.slice(1),
            ]);

            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_EXISTING_SCHOOL_EXPERIENCES = [cachedSchoolExperienceData.slice()[0]];
            const EXPECTED_EXISTING_SCHOOL_EXPERIENCES_LENGTH = EXPECTED_EXISTING_SCHOOL_EXPERIENCES.length;
            const EXPECTED_NONEXISTING_SCHOOL_EXPERIENCES = cachedSchoolExperienceData.slice(1);
            const EXPECTED_SCHOOL_EXPERIENCE_CLASS_INSTANCE = SchoolExperience;
            const EXPECTED_SCHOOL_EXPERIENCES = updatedSchoolExperienceData.slice();
            const EXPECTED_SCHOOL_EXPERIENCES_LENGTH = EXPECTED_SCHOOL_EXPERIENCES.length;

            /////////////////////////
            //////// test ///////////
            /////////////////////////
            // query mongo to get info
            const blainerrichardsonCloudDb = await mongo.getConnection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);
            let foundItems = await blainerrichardsonCloudDb
              .collection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_SCHOOL_EXPERIENCES_COLLECTION_NAME)
              .find({ schoolExperienceId: { $in: cachedSchoolExperienceData.map((item: any) => item.schoolExperienceId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_EXISTING_SCHOOL_EXPERIENCES_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_EXISTING_SCHOOL_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.schoolExperienceId === foundItem.schoolExperienceId,
                ) !== undefined,
              ).to.be.true;
            }
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_NONEXISTING_SCHOOL_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.schoolExperienceId === foundItem.schoolExperienceId,
                ) === undefined,
              ).to.be.true;
            }

            // run testee
            const putSchoolExperiencesRequest = {
              schoolExperiences: cachedSchoolExperienceData,
            };
            const putSchoolExperiencesResponse = await resumeManager.putSchoolExperiences(putSchoolExperiencesRequest);

            // run assertions
            expect(putSchoolExperiencesResponse !== undefined).to.be.true;
            expect(putSchoolExperiencesResponse.schoolExperiences !== undefined).to.be.true;
            expect(putSchoolExperiencesResponse.schoolExperiences instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(putSchoolExperiencesResponse.schoolExperiences.length === EXPECTED_SCHOOL_EXPERIENCES_LENGTH).to.be.true;
            for (const schoolExperience of putSchoolExperiencesResponse.schoolExperiences) {
              expect(schoolExperience instanceof EXPECTED_SCHOOL_EXPERIENCE_CLASS_INSTANCE).to.be.true;
              expect(
                EXPECTED_SCHOOL_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.schoolExperienceId === schoolExperience.schoolExperienceId,
                ) !== undefined,
              ).to.be.true;
            }

            // query mongo to get info
            foundItems = await blainerrichardsonCloudDb
              .collection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_SCHOOL_EXPERIENCES_COLLECTION_NAME)
              .find({ schoolExperienceId: { $in: cachedSchoolExperienceData.map((item: any) => item.schoolExperienceId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_SCHOOL_EXPERIENCES_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_SCHOOL_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.schoolExperienceId === foundItem.schoolExperienceId,
                ) !== undefined,
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

    context('({ schoolExperiences: [1 does not exist..., 2 do exist...] })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // create the faked data
            staticSchoolExperienceData = await readStaticSchoolExperienceData(3);

            // load data into datasources
            cachedSchoolExperienceData = _.flatten([
              await loadSchoolExperiencesData({
                schoolExperiences: staticSchoolExperienceData.slice(0, 2),
              }),
              staticSchoolExperienceData.slice(-1),
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
            cachedSchoolExperienceData = await unloadSchoolExperiencesData({
              schoolExperiences: cachedSchoolExperienceData,
            });

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should replace 1...N school experience instances that exist correlated by schoolExperienceId or insert/create 1...N school experience instances that do not exist correlated by schoolExperienceId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update first element to make sure
            // that things are updated if they
            // already exist in the backend datastores
            const updatedSchoolExperienceData = _.flatten([
              staticSchoolExperienceData
                .slice(0, 2)
                .map((item: any, itemIndex: number) => _.assign({}, item, { schoolName: `UPDATE ${itemIndex}` })),
              cachedSchoolExperienceData.slice(-1),
            ]);

            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_EXISTING_SCHOOL_EXPERIENCES = staticSchoolExperienceData.slice(0, 2);
            const EXPECTED_EXISTING_SCHOOL_EXPERIENCES_LENGTH = EXPECTED_EXISTING_SCHOOL_EXPERIENCES.length;
            const EXPECTED_NONEXISTING_SCHOOL_EXPERIENCES = cachedSchoolExperienceData.slice(-1);
            const EXPECTED_SCHOOL_EXPERIENCE_CLASS_INSTANCE = SchoolExperience;
            const EXPECTED_SCHOOL_EXPERIENCES = updatedSchoolExperienceData.slice();
            const EXPECTED_SCHOOL_EXPERIENCES_LENGTH = EXPECTED_SCHOOL_EXPERIENCES.length;

            /////////////////////////
            //////// test ///////////
            /////////////////////////
            // query mongo to get info
            const blainerrichardsonCloudDb = await mongo.getConnection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);
            let foundItems = await blainerrichardsonCloudDb
              .collection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_SCHOOL_EXPERIENCES_COLLECTION_NAME)
              .find({ schoolExperienceId: { $in: cachedSchoolExperienceData.map((item: any) => item.schoolExperienceId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_EXISTING_SCHOOL_EXPERIENCES_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_EXISTING_SCHOOL_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.schoolExperienceId === foundItem.schoolExperienceId,
                ) !== undefined,
              ).to.be.true;
            }
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_NONEXISTING_SCHOOL_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.schoolExperienceId === foundItem.schoolExperienceId,
                ) === undefined,
              ).to.be.true;
            }

            // run testee
            const putSchoolExperiencesRequest = {
              schoolExperiences: cachedSchoolExperienceData,
            };
            const putSchoolExperiencesResponse = await resumeManager.putSchoolExperiences(putSchoolExperiencesRequest);

            // run assertions
            expect(putSchoolExperiencesResponse !== undefined).to.be.true;
            expect(putSchoolExperiencesResponse.schoolExperiences !== undefined).to.be.true;
            expect(putSchoolExperiencesResponse.schoolExperiences instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(putSchoolExperiencesResponse.schoolExperiences.length === EXPECTED_SCHOOL_EXPERIENCES_LENGTH).to.be.true;
            for (const schoolExperience of putSchoolExperiencesResponse.schoolExperiences) {
              expect(schoolExperience instanceof EXPECTED_SCHOOL_EXPERIENCE_CLASS_INSTANCE).to.be.true;
              expect(
                EXPECTED_SCHOOL_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.schoolExperienceId === schoolExperience.schoolExperienceId,
                ) !== undefined,
              ).to.be.true;
            }

            // query mongo to get info
            foundItems = await blainerrichardsonCloudDb
              .collection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_SCHOOL_EXPERIENCES_COLLECTION_NAME)
              .find({ schoolExperienceId: { $in: cachedSchoolExperienceData.map((item: any) => item.schoolExperienceId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_SCHOOL_EXPERIENCES_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_SCHOOL_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.schoolExperienceId === foundItem.schoolExperienceId,
                ) !== undefined,
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

    context('({ schoolExperiences: [3 do exist...] })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // create the faked data
            staticSchoolExperienceData = await readStaticSchoolExperienceData(3);

            // load data into datasources
            cachedSchoolExperienceData = await loadSchoolExperiencesData({
              schoolExperiences: staticSchoolExperienceData,
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
            cachedSchoolExperienceData = await unloadSchoolExperiencesData({
              schoolExperiences: cachedSchoolExperienceData,
            });

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should replace 1...N school experience instances that exist correlated by schoolExperienceId or insert/create 1...N school experience instances that do not exist correlated by schoolExperienceId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update first element to make sure
            // that things are updated if they
            // already exist in the backend datastores
            const updatedSchoolExperienceData = staticSchoolExperienceData
              .slice()
              .map((item: any, itemIndex: number) => _.assign({}, item, { schoolName: `UPDATE ${itemIndex}` }));

            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_EXISTING_SCHOOL_EXPERIENCES = staticSchoolExperienceData.slice();
            const EXPECTED_EXISTING_SCHOOL_EXPERIENCES_LENGTH = EXPECTED_EXISTING_SCHOOL_EXPERIENCES.length;
            const EXPECTED_NONEXISTING_SCHOOL_EXPERIENCES: any[] = [];
            const EXPECTED_SCHOOL_EXPERIENCE_CLASS_INSTANCE = SchoolExperience;
            const EXPECTED_SCHOOL_EXPERIENCES = updatedSchoolExperienceData.slice();
            const EXPECTED_SCHOOL_EXPERIENCES_LENGTH = EXPECTED_SCHOOL_EXPERIENCES.length;

            /////////////////////////
            //////// test ///////////
            /////////////////////////
            // query mongo to get info
            const blainerrichardsonCloudDb = await mongo.getConnection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);
            let foundItems = await blainerrichardsonCloudDb
              .collection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_SCHOOL_EXPERIENCES_COLLECTION_NAME)
              .find({ schoolExperienceId: { $in: cachedSchoolExperienceData.map((item: any) => item.schoolExperienceId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_EXISTING_SCHOOL_EXPERIENCES_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_EXISTING_SCHOOL_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.schoolExperienceId === foundItem.schoolExperienceId,
                ) !== undefined,
              ).to.be.true;
            }
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_NONEXISTING_SCHOOL_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.schoolExperienceId === foundItem.schoolExperienceId,
                ) === undefined,
              ).to.be.true;
            }

            // run testee
            const putSchoolExperiencesRequest = {
              schoolExperiences: cachedSchoolExperienceData,
            };
            const putSchoolExperiencesResponse = await resumeManager.putSchoolExperiences(putSchoolExperiencesRequest);

            // run assertions
            expect(putSchoolExperiencesResponse !== undefined).to.be.true;
            expect(putSchoolExperiencesResponse.schoolExperiences !== undefined).to.be.true;
            expect(putSchoolExperiencesResponse.schoolExperiences instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(putSchoolExperiencesResponse.schoolExperiences.length === EXPECTED_SCHOOL_EXPERIENCES_LENGTH).to.be.true;
            for (const schoolExperience of putSchoolExperiencesResponse.schoolExperiences) {
              expect(schoolExperience instanceof EXPECTED_SCHOOL_EXPERIENCE_CLASS_INSTANCE).to.be.true;
              expect(
                EXPECTED_SCHOOL_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.schoolExperienceId === schoolExperience.schoolExperienceId,
                ) !== undefined,
              ).to.be.true;
            }

            // query mongo to get info
            foundItems = await blainerrichardsonCloudDb
              .collection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_SCHOOL_EXPERIENCES_COLLECTION_NAME)
              .find({ schoolExperienceId: { $in: cachedSchoolExperienceData.map((item: any) => item.schoolExperienceId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_SCHOOL_EXPERIENCES_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_SCHOOL_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.schoolExperienceId === foundItem.schoolExperienceId,
                ) !== undefined,
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
