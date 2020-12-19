/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import 'reflect-metadata';
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
describe('data-management/resume/putCertifications - #putCertifications - integration tests', () => {
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

  describe('#putCertifications', () => {
    context('({ certifications: [3 do not exist...] })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // create the faked data
            staticCertificationData = await readStaticCertificationData(3);

            // load data into datasources
            cachedCertificationData = staticCertificationData.slice();

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

        it('- should replace 1...N school experience instances that exist correlated by certificationId or insert/create 1...N school experience instances that do not exist correlated by certificationId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_CERTIFICATION_CLASS_INSTANCE = Certification;
            const EXPECTED_CERTIFICATIONS = cachedCertificationData.slice();
            const EXPECTED_CERTIFICATIONS_LENGTH = EXPECTED_CERTIFICATIONS.length;

            /////////////////////////
            //////// test //////////
            /////////////////////////

            // run testee
            const putCertificationsRequest = {
              certifications: cachedCertificationData,
            };
            const putCertificationsResponse = await resumeManager.putCertifications(putCertificationsRequest);

            // run assertions
            expect(putCertificationsResponse !== undefined).to.be.true;
            expect(putCertificationsResponse.certifications !== undefined).to.be.true;
            expect(putCertificationsResponse.certifications instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(putCertificationsResponse.certifications.length === EXPECTED_CERTIFICATIONS_LENGTH).to.be.true;
            for (const certification of putCertificationsResponse.certifications) {
              expect(certification instanceof EXPECTED_CERTIFICATION_CLASS_INSTANCE).to.be.true;
              expect(
                EXPECTED_CERTIFICATIONS.find((expectedItem: any) => expectedItem.certificationId === certification.certificationId) !==
                  undefined,
              ).to.be.true;
            }

            // query mongo to get info
            const blainerrichardsonCloudDb = await mongo.getConnection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);
            const foundItems = await blainerrichardsonCloudDb
              .collection(integrationTestEnv.MONGO_BLAINERRICARDSON_CLOUD_CERTIFICATIONS_COLLECTION_NAME)
              .find({ certificationId: { $in: cachedCertificationData.map((item: any) => item.certificationId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_CERTIFICATIONS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_CERTIFICATIONS.find((expectedItem: any) => expectedItem.certificationId === foundItem.certificationId) !==
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

    context('({ certifications: [2 do not exist..., 1 does exist...] })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // create the faked data
            staticCertificationData = await readStaticCertificationData(3);

            // load data into datasources
            cachedCertificationData = _.flatten([
              await loadCertificationsData({
                certifications: [staticCertificationData.slice()[0]],
              }),
              staticCertificationData.slice(1),
            ]);

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

        it('- should replace 1...N school experience instances that exist correlated by certificationId or insert/create 1...N school experience instances that do not exist correlated by certificationId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update first element to make sure
            // that things are updated if they
            // already exist in the backend datastores
            const updatedCertificationData = _.flatten([
              _.assign({}, cachedCertificationData.slice()[0], { schoolName: 'UPDATE' }),
              cachedCertificationData.slice(1),
            ]);

            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_EXISTING_CERTIFICATIONS = [cachedCertificationData.slice()[0]];
            const EXPECTED_EXISTING_CERTIFICATIONS_LENGTH = EXPECTED_EXISTING_CERTIFICATIONS.length;
            const EXPECTED_NONEXISTING_CERTIFICATIONS = cachedCertificationData.slice(1);
            const EXPECTED_CERTIFICATION_CLASS_INSTANCE = Certification;
            const EXPECTED_CERTIFICATIONS = updatedCertificationData.slice();
            const EXPECTED_CERTIFICATIONS_LENGTH = EXPECTED_CERTIFICATIONS.length;

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
            expect(foundItems.length === EXPECTED_EXISTING_CERTIFICATIONS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_EXISTING_CERTIFICATIONS.find((expectedItem: any) => expectedItem.certificationId === foundItem.certificationId) !==
                  undefined,
              ).to.be.true;
            }
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_NONEXISTING_CERTIFICATIONS.find(
                  (expectedItem: any) => expectedItem.certificationId === foundItem.certificationId,
                ) === undefined,
              ).to.be.true;
            }

            // run testee
            const putCertificationsRequest = {
              certifications: cachedCertificationData,
            };
            const putCertificationsResponse = await resumeManager.putCertifications(putCertificationsRequest);

            // run assertions
            expect(putCertificationsResponse !== undefined).to.be.true;
            expect(putCertificationsResponse.certifications !== undefined).to.be.true;
            expect(putCertificationsResponse.certifications instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(putCertificationsResponse.certifications.length === EXPECTED_CERTIFICATIONS_LENGTH).to.be.true;
            for (const certification of putCertificationsResponse.certifications) {
              expect(certification instanceof EXPECTED_CERTIFICATION_CLASS_INSTANCE).to.be.true;
              expect(
                EXPECTED_CERTIFICATIONS.find((expectedItem: any) => expectedItem.certificationId === certification.certificationId) !==
                  undefined,
              ).to.be.true;
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
            expect(foundItems.length === EXPECTED_CERTIFICATIONS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_CERTIFICATIONS.find((expectedItem: any) => expectedItem.certificationId === foundItem.certificationId) !==
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

    context('({ certifications: [1 does not exist..., 2 do exist...] })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // create the faked data
            staticCertificationData = await readStaticCertificationData(3);

            // load data into datasources
            cachedCertificationData = _.flatten([
              await loadCertificationsData({
                certifications: staticCertificationData.slice(0, 2),
              }),
              staticCertificationData.slice(-1),
            ]);

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

        it('- should replace 1...N school experience instances that exist correlated by certificationId or insert/create 1...N school experience instances that do not exist correlated by certificationId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update first element to make sure
            // that things are updated if they
            // already exist in the backend datastores
            const updatedCertificationData = _.flatten([
              staticCertificationData
                .slice(0, 2)
                .map((item: any, itemIndex: number) => _.assign({}, item, { schoolName: `UPDATE ${itemIndex}` })),
              cachedCertificationData.slice(-1),
            ]);

            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_EXISTING_CERTIFICATIONS = staticCertificationData.slice(0, 2);
            const EXPECTED_EXISTING_CERTIFICATIONS_LENGTH = EXPECTED_EXISTING_CERTIFICATIONS.length;
            const EXPECTED_NONEXISTING_CERTIFICATIONS = cachedCertificationData.slice(-1);
            const EXPECTED_CERTIFICATION_CLASS_INSTANCE = Certification;
            const EXPECTED_CERTIFICATIONS = updatedCertificationData.slice();
            const EXPECTED_CERTIFICATIONS_LENGTH = EXPECTED_CERTIFICATIONS.length;

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
            expect(foundItems.length === EXPECTED_EXISTING_CERTIFICATIONS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_EXISTING_CERTIFICATIONS.find((expectedItem: any) => expectedItem.certificationId === foundItem.certificationId) !==
                  undefined,
              ).to.be.true;
            }
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_NONEXISTING_CERTIFICATIONS.find(
                  (expectedItem: any) => expectedItem.certificationId === foundItem.certificationId,
                ) === undefined,
              ).to.be.true;
            }

            // run testee
            const putCertificationsRequest = {
              certifications: cachedCertificationData,
            };
            const putCertificationsResponse = await resumeManager.putCertifications(putCertificationsRequest);

            // run assertions
            expect(putCertificationsResponse !== undefined).to.be.true;
            expect(putCertificationsResponse.certifications !== undefined).to.be.true;
            expect(putCertificationsResponse.certifications instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(putCertificationsResponse.certifications.length === EXPECTED_CERTIFICATIONS_LENGTH).to.be.true;
            for (const certification of putCertificationsResponse.certifications) {
              expect(certification instanceof EXPECTED_CERTIFICATION_CLASS_INSTANCE).to.be.true;
              expect(
                EXPECTED_CERTIFICATIONS.find((expectedItem: any) => expectedItem.certificationId === certification.certificationId) !==
                  undefined,
              ).to.be.true;
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
            expect(foundItems.length === EXPECTED_CERTIFICATIONS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_CERTIFICATIONS.find((expectedItem: any) => expectedItem.certificationId === foundItem.certificationId) !==
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

    context('({ certifications: [3 do exist...] })', () => {
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

        it('- should replace 1...N school experience instances that exist correlated by certificationId or insert/create 1...N school experience instances that do not exist correlated by certificationId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update first element to make sure
            // that things are updated if they
            // already exist in the backend datastores
            const updatedCertificationData = staticCertificationData
              .slice()
              .map((item: any, itemIndex: number) => _.assign({}, item, { schoolName: `UPDATE ${itemIndex}` }));

            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_EXISTING_CERTIFICATIONS = staticCertificationData.slice();
            const EXPECTED_EXISTING_CERTIFICATIONS_LENGTH = EXPECTED_EXISTING_CERTIFICATIONS.length;
            const EXPECTED_NONEXISTING_CERTIFICATIONS: any[] = [];
            const EXPECTED_CERTIFICATION_CLASS_INSTANCE = Certification;
            const EXPECTED_CERTIFICATIONS = updatedCertificationData.slice();
            const EXPECTED_CERTIFICATIONS_LENGTH = EXPECTED_CERTIFICATIONS.length;

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
            expect(foundItems.length === EXPECTED_EXISTING_CERTIFICATIONS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_EXISTING_CERTIFICATIONS.find((expectedItem: any) => expectedItem.certificationId === foundItem.certificationId) !==
                  undefined,
              ).to.be.true;
            }
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_NONEXISTING_CERTIFICATIONS.find(
                  (expectedItem: any) => expectedItem.certificationId === foundItem.certificationId,
                ) === undefined,
              ).to.be.true;
            }

            // run testee
            const putCertificationsRequest = {
              certifications: cachedCertificationData,
            };
            const putCertificationsResponse = await resumeManager.putCertifications(putCertificationsRequest);

            // run assertions
            expect(putCertificationsResponse !== undefined).to.be.true;
            expect(putCertificationsResponse.certifications !== undefined).to.be.true;
            expect(putCertificationsResponse.certifications instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(putCertificationsResponse.certifications.length === EXPECTED_CERTIFICATIONS_LENGTH).to.be.true;
            for (const certification of putCertificationsResponse.certifications) {
              expect(certification instanceof EXPECTED_CERTIFICATION_CLASS_INSTANCE).to.be.true;
              expect(
                EXPECTED_CERTIFICATIONS.find((expectedItem: any) => expectedItem.certificationId === certification.certificationId) !==
                  undefined,
              ).to.be.true;
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
            expect(foundItems.length === EXPECTED_CERTIFICATIONS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_CERTIFICATIONS.find((expectedItem: any) => expectedItem.certificationId === foundItem.certificationId) !==
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
