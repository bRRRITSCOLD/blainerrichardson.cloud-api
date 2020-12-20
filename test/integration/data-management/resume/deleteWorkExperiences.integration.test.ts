/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
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
describe('data-management/resume/deleteWorkExperiences - #deleteWorkExperiences - integration tests', () => {
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

  describe('#deleteWorkExperiences', () => {
    context('({ workExperienceIds })', () => {
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

        it('- should delete 1...N work experience instances that correlate to given work experience ids in the backend datasources', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_WORK_EXPERIENCE_IDS = cachedWorkExperienceData.slice().map((item: any) => item.workExperienceId);
            const EXPECTED_WORK_EXPERIENCE_IDS_LENGTH = EXPECTED_WORK_EXPERIENCE_IDS.length;
            const EXPECTED_TYPE_OF_STRING = 'string';

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
            expect(foundItems.length === EXPECTED_WORK_EXPERIENCE_IDS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(EXPECTED_WORK_EXPERIENCE_IDS.find((expectedItem: any) => expectedItem === foundItem.workExperienceId) !== undefined).to
                .be.true;
            }

            // run testee
            const deleteWorkExperiencesRequest = {
              workExperienceIds: cachedWorkExperienceData.map((item: any) => item.workExperienceId),
            };
            const deleteWorkExperiencesResponse = await resumeManager.deleteWorkExperiences(deleteWorkExperiencesRequest);

            // run assertions
            expect(deleteWorkExperiencesResponse !== undefined).to.be.true;
            expect(deleteWorkExperiencesResponse.workExperienceIds !== undefined).to.be.true;
            expect(deleteWorkExperiencesResponse.workExperienceIds instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(deleteWorkExperiencesResponse.workExperienceIds.length === EXPECTED_WORK_EXPERIENCE_IDS_LENGTH).to.be.true;
            for (const workExperienceId of deleteWorkExperiencesResponse.workExperienceIds) {
              expect(typeof workExperienceId === EXPECTED_TYPE_OF_STRING).to.be.true;
              expect(EXPECTED_WORK_EXPERIENCE_IDS.find((expectedItem: any) => expectedItem === workExperienceId) !== undefined).to.be.true;
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
