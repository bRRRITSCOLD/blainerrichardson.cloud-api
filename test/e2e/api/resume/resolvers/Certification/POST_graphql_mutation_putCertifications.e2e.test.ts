/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import 'reflect-metadata';
import { FastifyInstance, FastifyLoggerInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { expect } from 'chai';
import * as _ from 'lodash';

// libraries
import { e2eTestEnv } from '../../../../../lib/environment';
import { mongo } from '../../../../../../src/lib/mongo';

// models
import { Certification } from '../../../../../../src/models/resume';

// testees
import { bootstrap } from '../../../../../../src/app';
let app: FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>;

// data
import { loadCertificationsData, unloadCertificationsData } from '../../../../../data/loaders/resume';
import { readStaticCertificationData } from '../../../../../data/static/resume/Certification';

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
describe('api/resume/resolvers/Certification.resolver - POST /graphql mutation putCertifications - e2e tests', () => {
  before(async () => {
    try {
      // load out environment
      await e2eTestEnv.init();

      // initialize asynchronous tasks, connectiones, etc. here
      await Promise.all([mongo.init(require('../../../../../../src/configs/mongo').default)]);

      // initialize synchronous tasks, connectiones, etc. here
      [];

      // create and store app
      app = await bootstrap();

      // cusom start up functionality
      await customStartUp();

      // return explicitly
      return;
    } catch (err) {
      // throw explicitly
      throw err;
    }
  });

  describe('{ mutation putCertifications }', () => {
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

        it('- should replace 1...N certification instances that exist correlated by certificationId or insert/create 1...N certification instances that do not exist correlated by certificationId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // none
            const EXPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_CERTIFICATIONS = cachedCertificationData.slice();
            const EXPECTED_CERTIFICATIONS_LENGTH = EXPECTED_CERTIFICATIONS.length;

            /////////////////////////
            //////// test ///////////
            /////////////////////////
            // query mongo to get info
            const blainerrichardsonCloudDb = await mongo.getConnection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);
            let foundItems = await blainerrichardsonCloudDb
              .collection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_CERTIFICATIONS_COLLECTION_NAME)
              .find({ certificationId: { $in: cachedCertificationData.map((item: any) => item.certificationId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === 0).to.be.true;

            // run testee
            const httpRequest: any = {
              method: 'POST',
              url: '/graphql',
              headers: {
                'content-type': 'application/json',
              },
              payload: {
                query: `mutation putCertifications($data: PutCertificationsInputType!) {
                  putCertifications(data: $data) {
                    certifications {
                      certificationId,
                      institution
                    }
                  }
                }`,
                variables: {
                  data: {
                    certifications: cachedCertificationData,
                  },
                },
              },
            };
            const httResponse = await app.inject(httpRequest);

            // run assertions
            expect(httResponse !== undefined).to.be.true;
            expect(httResponse.statusCode !== undefined).to.be.true;
            expect(httResponse.statusCode === 200).to.be.true;
            expect(httResponse.body !== undefined).to.be.true;
            expect(typeof httResponse.body === EXPECTED_TYPE_OF_STRING).to.be.true;

            // parse JSON body
            const parsedBody = JSON.parse(httResponse.body);

            // validate results
            expect(parsedBody !== undefined).to.be.true;
            expect(parsedBody.data !== null).to.be.true;
            expect(parsedBody.data.putCertifications !== null).to.be.true;
            expect(parsedBody.data.putCertifications !== null).to.be.true;
            expect(parsedBody.data.putCertifications.certifications !== null).to.be.true;
            expect(parsedBody.data.putCertifications.certifications instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(parsedBody.data.putCertifications.certifications.length === EXPECTED_CERTIFICATIONS_LENGTH).to.be.true;
            for (const certification of parsedBody.data.putCertifications.certifications) {
              expect(
                EXPECTED_CERTIFICATIONS.find((expectedItem: any) => expectedItem.certificationId === certification.certificationId) !==
                  undefined,
              ).to.be.true;
            }

            // query mongo to get info
            foundItems = await blainerrichardsonCloudDb
              .collection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_CERTIFICATIONS_COLLECTION_NAME)
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

        it('- should replace 1...N certification instances that exist correlated by certificationId or insert/create 1...N certification instances that do not exist correlated by certificationId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update first element to make sure
            // that things are updated if they
            // already exist in the backend datastores
            const updatedCertificationData = _.flatten([
              _.assign({}, cachedCertificationData.slice()[0], { workName: 'UPDATE' }),
              cachedCertificationData.slice(1),
            ]);

            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_EXISTING_CERTIFICATIONS = [cachedCertificationData.slice()[0]];
            const EXPECTED_EXISTING_CERTIFICATIONS_LENGTH = EXPECTED_EXISTING_CERTIFICATIONS.length;
            const EXPECTED_NONEXISTING_CERTIFICATIONS = cachedCertificationData.slice(1);
            const EXPECTED_CERTIFICATIONS = updatedCertificationData.slice();
            const EXPECTED_CERTIFICATIONS_LENGTH = EXPECTED_CERTIFICATIONS.length;

            /////////////////////////
            //////// test ///////////
            /////////////////////////
            // query mongo to get info
            const blainerrichardsonCloudDb = await mongo.getConnection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);
            let foundItems = await blainerrichardsonCloudDb
              .collection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_CERTIFICATIONS_COLLECTION_NAME)
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
            const httpRequest: any = {
              method: 'POST',
              url: '/graphql',
              headers: {
                'content-type': 'application/json',
              },
              payload: {
                query: `mutation putCertifications($data: PutCertificationsInputType!) {
                  putCertifications(data: $data) {
                    certifications {
                      certificationId,
                      institution
                    }
                  }
                }`,
                variables: {
                  data: {
                    certifications: cachedCertificationData.map((item: any) =>
                      _.omitBy(_.assign({}, item, { _id: undefined }), _.isUndefined),
                    ),
                  },
                },
              },
            };
            const httResponse = await app.inject(httpRequest);

            // run assertions
            expect(httResponse !== undefined).to.be.true;
            expect(httResponse.statusCode !== undefined).to.be.true;
            expect(httResponse.statusCode === 200).to.be.true;
            expect(httResponse.body !== undefined).to.be.true;
            expect(typeof httResponse.body === EXPECTED_TYPE_OF_STRING).to.be.true;

            // parse JSON body
            const parsedBody = JSON.parse(httResponse.body);

            // validate results
            expect(parsedBody !== undefined).to.be.true;
            expect(parsedBody.data !== null).to.be.true;
            expect(parsedBody.data.putCertifications !== null).to.be.true;
            expect(parsedBody.data.putCertifications !== null).to.be.true;
            expect(parsedBody.data.putCertifications.certifications !== null).to.be.true;
            expect(parsedBody.data.putCertifications.certifications instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(parsedBody.data.putCertifications.certifications.length === EXPECTED_CERTIFICATIONS_LENGTH).to.be.true;
            for (const certification of parsedBody.data.putCertifications.certifications) {
              expect(
                EXPECTED_CERTIFICATIONS.find((expectedItem: any) => expectedItem.certificationId === certification.certificationId) !==
                  undefined,
              ).to.be.true;
            }

            // query mongo to get info
            foundItems = await blainerrichardsonCloudDb
              .collection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_CERTIFICATIONS_COLLECTION_NAME)
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

        it('- should replace 1...N certification instances that exist correlated by certificationId or insert/create 1...N certification instances that do not exist correlated by certificationId', async () => {
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
                .map((item: any, itemIndex: number) => _.assign({}, item, { workName: `UPDATE ${itemIndex}` })),
              cachedCertificationData.slice(-1),
            ]);

            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_EXISTING_CERTIFICATIONS = staticCertificationData.slice(0, 2);
            const EXPECTED_EXISTING_CERTIFICATIONS_LENGTH = EXPECTED_EXISTING_CERTIFICATIONS.length;
            const EXPECTED_NONEXISTING_CERTIFICATIONS = cachedCertificationData.slice(-1);
            const EXPECTED_CERTIFICATIONS = updatedCertificationData.slice();
            const EXPECTED_CERTIFICATIONS_LENGTH = EXPECTED_CERTIFICATIONS.length;

            /////////////////////////
            //////// test ///////////
            /////////////////////////
            // query mongo to get info
            const blainerrichardsonCloudDb = await mongo.getConnection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);
            let foundItems = await blainerrichardsonCloudDb
              .collection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_CERTIFICATIONS_COLLECTION_NAME)
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
            const httpRequest: any = {
              method: 'POST',
              url: '/graphql',
              headers: {
                'content-type': 'application/json',
              },
              payload: {
                query: `mutation putCertifications($data: PutCertificationsInputType!) {
                  putCertifications(data: $data) {
                    certifications {
                      certificationId,
                      institution
                    }
                  }
                }`,
                variables: {
                  data: {
                    certifications: cachedCertificationData.map((item: any) =>
                      _.omitBy(_.assign({}, item, { _id: undefined }), _.isUndefined),
                    ),
                  },
                },
              },
            };
            const httResponse = await app.inject(httpRequest);

            // run assertions
            expect(httResponse !== undefined).to.be.true;
            expect(httResponse.statusCode !== undefined).to.be.true;
            expect(httResponse.statusCode === 200).to.be.true;
            expect(httResponse.body !== undefined).to.be.true;
            expect(typeof httResponse.body === EXPECTED_TYPE_OF_STRING).to.be.true;

            // parse JSON body
            const parsedBody = JSON.parse(httResponse.body);

            // validate results
            expect(parsedBody !== undefined).to.be.true;
            expect(parsedBody.data !== null).to.be.true;
            expect(parsedBody.data.putCertifications !== null).to.be.true;
            expect(parsedBody.data.putCertifications !== null).to.be.true;
            expect(parsedBody.data.putCertifications.certifications !== null).to.be.true;
            expect(parsedBody.data.putCertifications.certifications instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(parsedBody.data.putCertifications.certifications.length === EXPECTED_CERTIFICATIONS_LENGTH).to.be.true;
            for (const certification of parsedBody.data.putCertifications.certifications) {
              expect(
                EXPECTED_CERTIFICATIONS.find((expectedItem: any) => expectedItem.certificationId === certification.certificationId) !==
                  undefined,
              ).to.be.true;
            }

            // query mongo to get info
            foundItems = await blainerrichardsonCloudDb
              .collection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_CERTIFICATIONS_COLLECTION_NAME)
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

        it('- should replace 1...N certification instances that exist correlated by certificationId or insert/create 1...N certification instances that do not exist correlated by certificationId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update first element to make sure
            // that things are updated if they
            // already exist in the backend datastores
            const updatedCertificationData = staticCertificationData
              .slice()
              .map((item: any, itemIndex: number) => _.assign({}, item, { workName: `UPDATE ${itemIndex}` }));

            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_EXISTING_CERTIFICATIONS = staticCertificationData.slice();
            const EXPECTED_EXISTING_CERTIFICATIONS_LENGTH = EXPECTED_EXISTING_CERTIFICATIONS.length;
            const EXPECTED_NONEXISTING_CERTIFICATIONS: any[] = [];
            const EXPECTED_CERTIFICATIONS = updatedCertificationData.slice();
            const EXPECTED_CERTIFICATIONS_LENGTH = EXPECTED_CERTIFICATIONS.length;

            /////////////////////////
            //////// test ///////////
            /////////////////////////
            // query mongo to get info
            const blainerrichardsonCloudDb = await mongo.getConnection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);
            let foundItems = await blainerrichardsonCloudDb
              .collection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_CERTIFICATIONS_COLLECTION_NAME)
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
            const httpRequest: any = {
              method: 'POST',
              url: '/graphql',
              headers: {
                'content-type': 'application/json',
              },
              payload: {
                query: `mutation putCertifications($data: PutCertificationsInputType!) {
                  putCertifications(data: $data) {
                    certifications {
                      certificationId,
                      institution
                    }
                  }
                }`,
                variables: {
                  data: {
                    certifications: cachedCertificationData.map((item: any) =>
                      _.omitBy(_.assign({}, item, { _id: undefined }), _.isUndefined),
                    ),
                  },
                },
              },
            };
            const httResponse = await app.inject(httpRequest);

            // run assertions
            expect(httResponse !== undefined).to.be.true;
            expect(httResponse.statusCode !== undefined).to.be.true;
            expect(httResponse.statusCode === 200).to.be.true;
            expect(httResponse.body !== undefined).to.be.true;
            expect(typeof httResponse.body === EXPECTED_TYPE_OF_STRING).to.be.true;

            // parse JSON body
            const parsedBody = JSON.parse(httResponse.body);

            // validate results
            expect(parsedBody !== undefined).to.be.true;
            expect(parsedBody.data !== null).to.be.true;
            expect(parsedBody.data.putCertifications !== null).to.be.true;
            expect(parsedBody.data.putCertifications !== null).to.be.true;
            expect(parsedBody.data.putCertifications.certifications !== null).to.be.true;
            expect(parsedBody.data.putCertifications.certifications instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(parsedBody.data.putCertifications.certifications.length === EXPECTED_CERTIFICATIONS_LENGTH).to.be.true;
            for (const certification of parsedBody.data.putCertifications.certifications) {
              expect(
                EXPECTED_CERTIFICATIONS.find((expectedItem: any) => expectedItem.certificationId === certification.certificationId) !==
                  undefined,
              ).to.be.true;
            }

            // query mongo to get info
            foundItems = await blainerrichardsonCloudDb
              .collection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_CERTIFICATIONS_COLLECTION_NAME)
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
