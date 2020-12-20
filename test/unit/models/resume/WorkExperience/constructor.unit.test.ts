/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import 'reflect-metadata';
import { expect } from 'chai';
import * as _ from 'lodash';

// models
import { WorkExperience } from '../../../../../src/models/resume';

// data
import { readStaticWorkExperienceData } from '../../../../data/static/resume/WorkExperience';

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
describe('models/email/WorkExperience.ts - unit tests', () => {
  before(async () => {
    try {
      // run custom start ups
      await customStartUp();

      // return explicitly
      return;
    } catch (err) {
      // throw explicitly
      throw err;
    }
  });

  describe('#constructor', () => {
    context('({ startDate, endDate, companyName, companyAddress, position, accomplishments, duties })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // set data holders
            staticWorkExperienceData = await readStaticWorkExperienceData(2);

            cachedWorkExperienceData = staticWorkExperienceData.slice();

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
            cachedWorkExperienceData = undefined;

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly map data to and initiate an work experience instance', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // set expectations
            const EXPECTED_WORK_EXPERIENCE_CLASS_INSTANCE = WorkExperience;
            const EXPECTED_WORK_EXPERIENCE = _.assign({}, cachedWorkExperienceData[0]);
            const EXPECTED_ARRAY_CLASS_NSTANCE = Array;

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const workExperience = new WorkExperience(cachedWorkExperienceData[0]);

            // run assertions
            expect(workExperience !== undefined).to.be.true;
            expect(workExperience instanceof EXPECTED_WORK_EXPERIENCE_CLASS_INSTANCE).to.be.true;
            expect(workExperience.startDate !== undefined).to.be.true;
            expect(workExperience.startDate === EXPECTED_WORK_EXPERIENCE.startDate).to.be.true;
            expect(workExperience.endDate !== undefined).to.be.true;
            expect(workExperience.endDate === EXPECTED_WORK_EXPERIENCE.endDate).to.be.true;
            expect(workExperience.companyName !== undefined).to.be.true;
            expect(workExperience.companyName === EXPECTED_WORK_EXPERIENCE.companyName).to.be.true;
            expect(workExperience.companyAddress !== undefined).to.be.true;
            expect(workExperience.companyAddress.addressLine1 !== undefined).to.be.true;
            expect(workExperience.companyAddress.addressLine1 === EXPECTED_WORK_EXPERIENCE.companyAddress.addressLine1).to.be.true;
            expect(workExperience.companyAddress.addressLine2 === undefined).to.be.true;
            expect(workExperience.companyAddress.city !== undefined).to.be.true;
            expect(workExperience.companyAddress.city === EXPECTED_WORK_EXPERIENCE.companyAddress.city).to.be.true;
            expect(workExperience.companyAddress.state !== undefined).to.be.true;
            expect(workExperience.companyAddress.state === EXPECTED_WORK_EXPERIENCE.companyAddress.state).to.be.true;
            expect(workExperience.companyAddress.zipCode !== undefined).to.be.true;
            expect(workExperience.companyAddress.zipCode === EXPECTED_WORK_EXPERIENCE.companyAddress.zipCode).to.be.true;
            expect(workExperience.position !== undefined).to.be.true;
            expect(workExperience.position === EXPECTED_WORK_EXPERIENCE.position).to.be.true;
            expect(workExperience.accomplishments !== undefined).to.be.true;
            expect(workExperience.accomplishments instanceof EXPECTED_ARRAY_CLASS_NSTANCE).to.be.true;
            expect(workExperience.accomplishments.length === EXPECTED_WORK_EXPERIENCE.accomplishments.length).to.be.true;
            for (const item of workExperience.accomplishments) {
              const found = EXPECTED_WORK_EXPERIENCE.accomplishments.find((expectedAccomplishment: any) => expectedAccomplishment === item);
              expect(found !== undefined).to.be.true;
            }
            expect(workExperience.duties !== undefined).to.be.true;
            expect(workExperience.duties instanceof EXPECTED_ARRAY_CLASS_NSTANCE).to.be.true;
            expect(workExperience.duties.length === EXPECTED_WORK_EXPERIENCE.duties.length).to.be.true;
            for (const item of workExperience.duties) {
              const found = EXPECTED_WORK_EXPERIENCE.duties.find((expectedDuty: any) => expectedDuty === item);
              expect(found !== undefined).to.be.true;
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
      // run custom tear downs
      await customTearDown();

      // return explicitly
      return;
    } catch (err) {
      // throw explicitly
      throw err;
    }
  });
});
