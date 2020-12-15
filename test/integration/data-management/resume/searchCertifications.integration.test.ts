/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import { expect } from 'chai';
import * as _ from 'lodash';

// libraries
import { integrationTestEnv } from '../../../lib/environment';
import { mongo } from '../../../../src/lib/mongo';

// models
import { Certification } from '../../../../src/models/resume';

// testees
import * as resumeManager from '../../../../src/data-management/resume';

// data
import { loadCertificationsData, unloadCertificationsData } from '../../../data/loaders/resume';
import { readStaticCertificationData } from '../../../data/static/resume/Certification';

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
describe('data-management/resume/searchCertifications - #searchCertifications - integration tests', () => {
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

  describe('#searchCertifications', () => {
    context('({ searchCriteria: {}, searchOptions: { pageNumber, pageSize } })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // create the faked data
            staticCertificationData = await readStaticCertificationData(3);

            // load data into datasources
            cachedCertificationData = await loadCertificationsData({
              certifications: staticCertificationData,
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
            cachedCertificationData = await unloadCertificationsData({
              certifications: cachedCertificationData,
            });

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should retrun 1...N certification instances that match a given criteria with the given options applied', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_SCHOOL_EXPERIENCE_CLASS_INSTANCE = Certification;
            const EXPECTED_SCHOOL_EXPERIENCES = cachedCertificationData.slice();
            const EXPECTED_SCHOOL_EXPERIENCES_LENGTH = EXPECTED_SCHOOL_EXPERIENCES.length;

            /////////////////////////
            //////// test //////////
            /////////////////////////

            // run testee
            const searchCertificationsRequest = {
              searchCriteria: {},
              searchOptions: { pageNumber: 1, pageSize: 500 },
            };
            const searchCertificationsResponse = await resumeManager.searchCertifications(searchCertificationsRequest);

            // run assertions
            expect(searchCertificationsResponse !== undefined).to.be.true;
            expect(searchCertificationsResponse.certifications !== undefined).to.be.true;
            expect(searchCertificationsResponse.certifications instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(searchCertificationsResponse.certifications.length === EXPECTED_SCHOOL_EXPERIENCES_LENGTH).to.be.true;
            for (const certification of searchCertificationsResponse.certifications) {
              expect(certification instanceof EXPECTED_SCHOOL_EXPERIENCE_CLASS_INSTANCE).to.be.true;
              expect(
                EXPECTED_SCHOOL_EXPERIENCES.find((expectedItem: any) => expectedItem.institution === certification.institution) !==
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

    context('({ searchCriteria: { institution }, searchOptions: { pageNumber, pageSize } })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // create the faked data
            staticCertificationData = await readStaticCertificationData(3);

            // load data into datasources
            cachedCertificationData = await loadCertificationsData({
              certifications: staticCertificationData,
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
            cachedCertificationData = await unloadCertificationsData({
              certifications: cachedCertificationData,
            });

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should retrun 1...N certification instances that match a given criteria with the given options applied', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_SCHOOL_EXPERIENCE_CLASS_INSTANCE = Certification;
            const EXPECTED_SCHOOL_EXPERIENCES = cachedCertificationData.slice(0, 1);
            const EXPECTED_SCHOOL_EXPERIENCES_LENGTH = EXPECTED_SCHOOL_EXPERIENCES.length;

            /////////////////////////
            //////// test //////////
            /////////////////////////

            // run testee
            const searchCertificationsRequest = {
              searchCriteria: { institution: cachedCertificationData[0].institution },
              searchOptions: { pageNumber: 1, pageSize: 500 },
            };
            const searchCertificationsResponse = await resumeManager.searchCertifications(searchCertificationsRequest);

            // run assertions
            expect(searchCertificationsResponse !== undefined).to.be.true;
            expect(searchCertificationsResponse.certifications !== undefined).to.be.true;
            expect(searchCertificationsResponse.certifications instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(searchCertificationsResponse.certifications.length === EXPECTED_SCHOOL_EXPERIENCES_LENGTH).to.be.true;
            for (const certification of searchCertificationsResponse.certifications) {
              expect(certification instanceof EXPECTED_SCHOOL_EXPERIENCE_CLASS_INSTANCE).to.be.true;
              expect(
                EXPECTED_SCHOOL_EXPERIENCES.find((expectedItem: any) => expectedItem.institution === certification.institution) !==
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
