/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
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
describe('data-management/resume/deleteSchoolExperiences - #deleteSchoolExperiences - integration tests', () => {
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

  describe('#deleteSchoolExperiences', () => {
    context('({ schoolExperienceIds })', () => {
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

        it('- should delete 1...N school experience instances that correlate to given school experience ids in the backend datasources', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_SCHOOL_EXPERIENCE_IDS = cachedSchoolExperienceData.slice().map((item: any) => item.schoolExperienceId);
            const EXPECTED_SCHOOL_EXPERIENCE_IDS_LENGTH = EXPECTED_SCHOOL_EXPERIENCE_IDS.length;
            const EXPECTED_TYPE_OF_STRING = 'string';

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
            expect(foundItems.length === EXPECTED_SCHOOL_EXPERIENCE_IDS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_SCHOOL_EXPERIENCE_IDS.find((expectedItem: any) => expectedItem === foundItem.schoolExperienceId) !== undefined,
              ).to.be.true;
            }

            // run testee
            const deleteSchoolExperiencesRequest = {
              schoolExperienceIds: cachedSchoolExperienceData.map((item: any) => item.schoolExperienceId),
            };
            const deleteSchoolExperiencesResponse = await resumeManager.deleteSchoolExperiences(deleteSchoolExperiencesRequest);

            // run assertions
            expect(deleteSchoolExperiencesResponse !== undefined).to.be.true;
            expect(deleteSchoolExperiencesResponse.schoolExperienceIds !== undefined).to.be.true;
            expect(deleteSchoolExperiencesResponse.schoolExperienceIds instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(deleteSchoolExperiencesResponse.schoolExperienceIds.length === EXPECTED_SCHOOL_EXPERIENCE_IDS_LENGTH).to.be.true;
            for (const schoolExperienceId of deleteSchoolExperiencesResponse.schoolExperienceIds) {
              expect(typeof schoolExperienceId === EXPECTED_TYPE_OF_STRING).to.be.true;
              expect(EXPECTED_SCHOOL_EXPERIENCE_IDS.find((expectedItem: any) => expectedItem === schoolExperienceId) !== undefined).to.be
                .true;
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
