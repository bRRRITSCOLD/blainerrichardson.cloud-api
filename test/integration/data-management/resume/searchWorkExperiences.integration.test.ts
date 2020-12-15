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
describe('data-management/resume/searchWorkExperiences - #searchWorkExperiences - integration tests', () => {
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

  describe('#searchWorkExperiences', () => {
    context('({ searchCriteria: {}, searchOptions: { pageNumber, pageSize } })', () => {
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

        it('- should retrun 1...N work experience instances that match a given criteria with the given options applied', async () => {
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
            const searchWorkExperiencesRequest = {
              searchCriteria: {},
              searchOptions: { pageNumber: 1, pageSize: 500 },
            };
            const searchWorkExperiencesResponse = await resumeManager.searchWorkExperiences(searchWorkExperiencesRequest);

            // run assertions
            expect(searchWorkExperiencesResponse !== undefined).to.be.true;
            expect(searchWorkExperiencesResponse.workExperiences !== undefined).to.be.true;
            expect(searchWorkExperiencesResponse.workExperiences instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(searchWorkExperiencesResponse.workExperiences.length === EXPECTED_WORK_EXPERIENCES_LENGTH).to.be.true;
            for (const workExperience of searchWorkExperiencesResponse.workExperiences) {
              expect(workExperience instanceof EXPECTED_WORK_EXPERIENCE_CLASS_INSTANCE).to.be.true;
              expect(
                EXPECTED_WORK_EXPERIENCES.find((expectedItem: any) => expectedItem.companyName === workExperience.companyName) !==
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

    context('({ searchCriteria: { companyName }, searchOptions: { pageNumber, pageSize } })', () => {
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

        it('- should retrun 1...N work experience instances that match a given criteria with the given options applied', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_WORK_EXPERIENCE_CLASS_INSTANCE = WorkExperience;
            const EXPECTED_WORK_EXPERIENCES = cachedWorkExperienceData.slice(0, 1);
            const EXPECTED_WORK_EXPERIENCES_LENGTH = EXPECTED_WORK_EXPERIENCES.length;

            /////////////////////////
            //////// test //////////
            /////////////////////////

            // run testee
            const searchWorkExperiencesRequest = {
              searchCriteria: { companyName: cachedWorkExperienceData[0].companyName },
              searchOptions: { pageNumber: 1, pageSize: 500 },
            };
            const searchWorkExperiencesResponse = await resumeManager.searchWorkExperiences(searchWorkExperiencesRequest);

            // run assertions
            expect(searchWorkExperiencesResponse !== undefined).to.be.true;
            expect(searchWorkExperiencesResponse.workExperiences !== undefined).to.be.true;
            expect(searchWorkExperiencesResponse.workExperiences instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(searchWorkExperiencesResponse.workExperiences.length === EXPECTED_WORK_EXPERIENCES_LENGTH).to.be.true;
            for (const workExperience of searchWorkExperiencesResponse.workExperiences) {
              expect(workExperience instanceof EXPECTED_WORK_EXPERIENCE_CLASS_INSTANCE).to.be.true;
              expect(
                EXPECTED_WORK_EXPERIENCES.find((expectedItem: any) => expectedItem.companyName === workExperience.companyName) !==
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
