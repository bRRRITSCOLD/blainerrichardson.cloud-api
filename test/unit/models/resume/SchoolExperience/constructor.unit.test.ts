/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import { expect } from 'chai';
import * as _ from 'lodash';

// models
import { SchoolExperience } from '../../../../../src/models/resume';

// data
import { readStaticSchoolExperienceData } from '../../../../data/static/resume/SchoolExperience';

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
describe('models/email/SchoolExperience.ts - unit tests', () => {
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
    context('({ startDate, endDate, schoolName, schoolAddress, degree, classes })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // set data holders
            staticSchoolExperienceData = await readStaticSchoolExperienceData(2);

            cachedSchoolExperienceData = staticSchoolExperienceData.slice();

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        afterEach(async () => {
          try {
            // reset data holders
            staticSchoolExperienceData = undefined;
            cachedSchoolExperienceData = undefined;

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly map data to and initiate an school experience instance', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // set expectations
            const EXPECTED_SCHOOL_EXPERIENCE_CLASS_INSTANCE = SchoolExperience;
            const EXPECTED_SCHOOL_EXPERIENCE = _.assign({}, cachedSchoolExperienceData[0]);
            const EXPECTED_ARRAY_CLASS_NSTANCE = Array;

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const schoolExperience = new SchoolExperience(cachedSchoolExperienceData[0]);

            // run assertions
            expect(schoolExperience !== undefined).to.be.true;
            expect(schoolExperience instanceof EXPECTED_SCHOOL_EXPERIENCE_CLASS_INSTANCE).to.be.true;
            expect(schoolExperience.startDate !== undefined).to.be.true;
            expect(schoolExperience.startDate === EXPECTED_SCHOOL_EXPERIENCE.startDate).to.be.true;
            expect(schoolExperience.endDate !== undefined).to.be.true;
            expect(schoolExperience.endDate === EXPECTED_SCHOOL_EXPERIENCE.endDate).to.be.true;
            expect(schoolExperience.schoolName !== undefined).to.be.true;
            expect(schoolExperience.schoolName === EXPECTED_SCHOOL_EXPERIENCE.schoolName).to.be.true;
            expect(schoolExperience.schoolAddress !== undefined).to.be.true;
            expect(schoolExperience.schoolAddress.addressLine1 !== undefined).to.be.true;
            expect(schoolExperience.schoolAddress.addressLine1 === EXPECTED_SCHOOL_EXPERIENCE.schoolAddress.addressLine1).to.be.true;
            expect(schoolExperience.schoolAddress.addressLine2 === undefined).to.be.true;
            expect(schoolExperience.schoolAddress.city !== undefined).to.be.true;
            expect(schoolExperience.schoolAddress.city === EXPECTED_SCHOOL_EXPERIENCE.schoolAddress.city).to.be.true;
            expect(schoolExperience.schoolAddress.state !== undefined).to.be.true;
            expect(schoolExperience.schoolAddress.state === EXPECTED_SCHOOL_EXPERIENCE.schoolAddress.state).to.be.true;
            expect(schoolExperience.schoolAddress.zipCode !== undefined).to.be.true;
            expect(schoolExperience.schoolAddress.zipCode === EXPECTED_SCHOOL_EXPERIENCE.schoolAddress.zipCode).to.be.true;
            expect(schoolExperience.degree !== undefined).to.be.true;
            expect(schoolExperience.degree === EXPECTED_SCHOOL_EXPERIENCE.degree).to.be.true;
            expect(schoolExperience.classes !== undefined).to.be.true;
            expect(schoolExperience.classes instanceof EXPECTED_ARRAY_CLASS_NSTANCE).to.be.true;
            expect(schoolExperience.classes.length === EXPECTED_SCHOOL_EXPERIENCE.classes.length).to.be.true;
            for (const item of schoolExperience.classes) {
              const found = EXPECTED_SCHOOL_EXPERIENCE.classes.find((expectedClass: any) => expectedClass === item);
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
