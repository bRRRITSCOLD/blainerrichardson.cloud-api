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
import { loadCertificationsData, unloadCertificationsData } from '../../../data/loaders/resume';
import { readStaticCertificationData } from '../../../data/static/resume/Certification';

// data

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
describe('data-management/resume/deleteCertifications - #deleteCertifications - integration tests', () => {
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

  describe('#deleteCertifications', () => {
    context('({ certificationIds })', () => {
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

        it('- should delete 1...N certification instances that correlate to given certification ids in the backend datasources', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_CERTIFICATION_IDS = cachedCertificationData.slice().map((item: any) => item.certificationId);
            const EXPECTED_CERTIFICATION_IDS_LENGTH = EXPECTED_CERTIFICATION_IDS.length;
            const EXPECTED_TYPE_OF_STRING = 'string';

            /////////////////////////
            //////// test ///////////
            /////////////////////////
            // query mongo to get info
            const blainerrichardsonCloudDb = await mongo.getConnection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);
            let foundItems = await blainerrichardsonCloudDb
              .collection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_CERTIFICATIONS_COLLECTION_NAME)
              .find({ certificationId: { $in: cachedCertificationData.map((item: any) => item.certificationId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_CERTIFICATION_IDS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(EXPECTED_CERTIFICATION_IDS.find((expectedItem: any) => expectedItem === foundItem.certificationId) !== undefined).to.be
                .true;
            }

            // run testee
            const deleteCertificationsRequest = {
              certificationIds: cachedCertificationData.map((item: any) => item.certificationId),
            };
            const deleteCertificationsResponse = await resumeManager.deleteCertifications(deleteCertificationsRequest);

            // run assertions
            expect(deleteCertificationsResponse !== undefined).to.be.true;
            expect(deleteCertificationsResponse.certificationIds !== undefined).to.be.true;
            expect(deleteCertificationsResponse.certificationIds instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(deleteCertificationsResponse.certificationIds.length === EXPECTED_CERTIFICATION_IDS_LENGTH).to.be.true;
            for (const certificationId of deleteCertificationsResponse.certificationIds) {
              expect(typeof certificationId === EXPECTED_TYPE_OF_STRING).to.be.true;
              expect(EXPECTED_CERTIFICATION_IDS.find((expectedItem: any) => expectedItem === certificationId) !== undefined).to.be.true;
            }

            // query mongo to get info
            foundItems = await blainerrichardsonCloudDb
              .collection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_CERTIFICATIONS_COLLECTION_NAME)
              .find({ certificationId: { $in: cachedCertificationData.map((item: any) => item.certificationId) } })
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
