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
import { readStaticSchoolExperienceData } from '../../../data/static/resume/SchoolExperience';
import { readStaticCertificationData } from '../../../data/static/resume/Certification';

// data

// file constants/functions
let staticWorkExperienceData: any | any[];
let staticSchoolExperienceData: any | any[];
let staticCertificationData: any | any[];

let cachedWorkExperienceData: any | any[];
let cachedSchoolExperienceData: any | any[];
let cachedCertificationData: any | any[];

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
describe('data-management/resume/createResumePDF - #createResumePDF - integration tests', () => {
  before(async () => {
    try {
      // load out environment
      await integrationTestEnv.init();

      // initialize asynchronous tasks, connectiones, etc. here
      await Promise.all([]);

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

  describe('#createResumePDF', () => {
    context('({ workExperiences, schoolExperiences, certifications })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // read static data
            staticWorkExperienceData = await readStaticWorkExperienceData(3);
            staticSchoolExperienceData = await readStaticSchoolExperienceData(3);
            staticCertificationData = await readStaticCertificationData(3);

            // load data into datasources
            cachedWorkExperienceData = staticWorkExperienceData.slice();
            cachedSchoolExperienceData = staticSchoolExperienceData.slice();
            cachedCertificationData = staticCertificationData.slice();

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        afterEach(async () => {
          try {
            // reset data holders
            staticWorkExperienceData = undefined;
            staticSchoolExperienceData = undefined;
            staticCertificationData = undefined;

            cachedWorkExperienceData = undefined;
            cachedSchoolExperienceData = undefined;
            cachedCertificationData = undefined;

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it(`- should create a pdf representing the passed in resume data and then return said pdf's buffer`, async () => {
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
            const createResumePDFRequest = {
              workExperiences: cachedWorkExperienceData,
              schoolExperiences: cachedSchoolExperienceData,
              certifications: cachedCertificationData,
            };
            const createResumePDFResponse = await resumeManager.createResumePDF(createResumePDFRequest);

            // run assertions
            expect(createResumePDFResponse !== undefined).to.be.true;
            // expect(searchWorkExperiencesResponse.workExperiences !== undefined).to.be.true;
            // expect(searchWorkExperiencesResponse.workExperiences instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            // expect(searchWorkExperiencesResponse.workExperiences.length === EXPECTED_WORK_EXPERIENCES_LENGTH).to.be.true;
            // for (const workExperience of searchWorkExperiencesResponse.workExperiences) {
            //   expect(workExperience instanceof EXPECTED_WORK_EXPERIENCE_CLASS_INSTANCE).to.be.true;
            //   expect(
            //     EXPECTED_WORK_EXPERIENCES.find((expectedItem: any) => expectedItem.companyName === workExperience.companyName) !==
            //       undefined,
            //   ).to.be.true;
            // }

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
