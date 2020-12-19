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
describe('data-management/resume/searchSchoolExperiences - #searchSchoolExperiences - integration tests', () => {
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

  describe('#searchSchoolExperiences', () => {
    context('({ searchCriteria: {}, searchOptions: { pageNumber, pageSize } })', () => {
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

        it('- should retrun 1...N school experience instances that match a given criteria with the given options applied', async () => {
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
            const searchSchoolExperiencesRequest = {
              searchCriteria: {},
              searchOptions: { pageNumber: 1, pageSize: 500 },
            };
            const searchSchoolExperiencesResponse = await resumeManager.searchSchoolExperiences(searchSchoolExperiencesRequest);

            // run assertions
            expect(searchSchoolExperiencesResponse !== undefined).to.be.true;
            expect(searchSchoolExperiencesResponse.schoolExperiences !== undefined).to.be.true;
            expect(searchSchoolExperiencesResponse.schoolExperiences instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(searchSchoolExperiencesResponse.schoolExperiences.length === EXPECTED_SCHOOL_EXPERIENCES_LENGTH).to.be.true;
            for (const schoolExperience of searchSchoolExperiencesResponse.schoolExperiences) {
              expect(schoolExperience instanceof EXPECTED_SCHOOL_EXPERIENCE_CLASS_INSTANCE).to.be.true;
              expect(
                EXPECTED_SCHOOL_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.schoolExperienceId === schoolExperience.schoolExperienceId,
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

    context('({ searchCriteria: { schoolName }, searchOptions: { pageNumber, pageSize } })', () => {
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

        it('- should retrun 1...N school experience instances that match a given criteria with the given options applied', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_SCHOOL_EXPERIENCE_CLASS_INSTANCE = SchoolExperience;
            const EXPECTED_SCHOOL_EXPERIENCES = cachedSchoolExperienceData
              .slice()
              .filter((item: any) => item.schoolName === cachedSchoolExperienceData[0].schoolName);
            const EXPECTED_SCHOOL_EXPERIENCES_LENGTH = EXPECTED_SCHOOL_EXPERIENCES.length;

            /////////////////////////
            //////// test //////////
            /////////////////////////

            // run testee
            const searchSchoolExperiencesRequest = {
              searchCriteria: { schoolName: cachedSchoolExperienceData[0].schoolName },
              searchOptions: { pageNumber: 1, pageSize: 500 },
            };
            const searchSchoolExperiencesResponse = await resumeManager.searchSchoolExperiences(searchSchoolExperiencesRequest);

            // run assertions
            expect(searchSchoolExperiencesResponse !== undefined).to.be.true;
            expect(searchSchoolExperiencesResponse.schoolExperiences !== undefined).to.be.true;
            expect(searchSchoolExperiencesResponse.schoolExperiences instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(searchSchoolExperiencesResponse.schoolExperiences.length === EXPECTED_SCHOOL_EXPERIENCES_LENGTH).to.be.true;
            for (const schoolExperience of searchSchoolExperiencesResponse.schoolExperiences) {
              expect(schoolExperience instanceof EXPECTED_SCHOOL_EXPERIENCE_CLASS_INSTANCE).to.be.true;
              expect(
                EXPECTED_SCHOOL_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.schoolExperienceId === schoolExperience.schoolExperienceId,
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
