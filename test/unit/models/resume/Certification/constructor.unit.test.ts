/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import { expect } from 'chai';
import * as _ from 'lodash';

// models
import { Certification } from '../../../../../src/models/resume';

// data
import { readStaticCertificationData } from '../../../../data/static/resume/Certification';

// file constants/functions
let staticCertificationData: any | any[];
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
describe('models/email/Certification.ts - unit tests', () => {
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
    context('({ startDate, endDate, institution, name })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // set data holders
            staticCertificationData = await readStaticCertificationData(2);

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
            staticCertificationData = undefined;
            cachedCertificationData = undefined;

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly map data to and initiate an certification instance', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // set expectations
            const EXPECTED_CERTIFICATION_CLASS_INSTANCE = Certification;
            const EXPECTED_CERTIFICATION = _.assign({}, cachedCertificationData[0]);

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const certification = new Certification(cachedCertificationData[0]);

            // run assertions
            expect(certification !== undefined).to.be.true;
            expect(certification instanceof EXPECTED_CERTIFICATION_CLASS_INSTANCE).to.be.true;
            expect(certification.startDate !== undefined).to.be.true;
            expect(certification.startDate === EXPECTED_CERTIFICATION.startDate).to.be.true;
            expect(certification.endDate !== undefined).to.be.true;
            expect(certification.endDate === EXPECTED_CERTIFICATION.endDate).to.be.true;
            expect(certification.name !== undefined).to.be.true;
            expect(certification.name === EXPECTED_CERTIFICATION.name).to.be.true;
            expect(certification.institution !== undefined).to.be.true;
            expect(certification.institution === EXPECTED_CERTIFICATION.institution).to.be.true;

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
