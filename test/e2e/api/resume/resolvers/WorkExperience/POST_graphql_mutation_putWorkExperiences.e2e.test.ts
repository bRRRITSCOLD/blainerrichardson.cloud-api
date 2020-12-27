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
import * as jwt from '../../../../../../src/lib/jwt';

// models
import { WorkExperience } from '../../../../../../src/models/resume';

// testees
import { bootstrap } from '../../../../../../src/app';
let app: FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>;

// data
import { loadWorkExperiencesData, unloadWorkExperiencesData } from '../../../../../data/loaders/resume';
import { readStaticWorkExperienceData } from '../../../../../data/static/resume/WorkExperience';
import { readStaticUserData } from '../../../../../data/static/user/User';
import { loadUsersData } from '../../../../../data/loaders/user';

// file constants/functions
let staticWorkExperienceData: any | any[];
let staticUserData: any | any[];

let cachedWorkExperienceData: any | any[];
let cachedUserData: any | any[];

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
describe('api/resume/resolvers/WorkExperience.resolver - POST /graphql mutation putWorkExperiences - e2e tests', () => {
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

  describe('{ mutation putWorkExperiences }', () => {
    context('({ workExperiences: [3 do not exist...] })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // create the faked data
            staticWorkExperienceData = await readStaticWorkExperienceData(3);
            staticUserData = await readStaticUserData(3);

            // load data into datasources
            cachedWorkExperienceData = staticWorkExperienceData.slice();

            cachedUserData = await loadUsersData({
              users: staticUserData,
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
            await unloadWorkExperiencesData({
              workExperiences: cachedWorkExperienceData,
            });

            // reset data holders
            staticUserData = undefined;

            cachedUserData = undefined;

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should replace 1...N work experience instances that exist correlated by workExperienceId or insert/create 1...N work experience instances that do not exist correlated by workExperienceId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // none
            const EXPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_WORK_EXPERIENCES = cachedWorkExperienceData.slice();
            const EXPECTED_WORK_EXPERIENCES_LENGTH = EXPECTED_WORK_EXPERIENCES.length;

            /////////////////////////
            //////// test ///////////
            /////////////////////////
            // query mongo to get info
            const blainerrichardsonCloudDb = await mongo.getConnection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);
            let foundItems = await blainerrichardsonCloudDb
              .collection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_WORK_EXPERIENCES_COLLECTION_NAME)
              .find({ workExperienceId: { $in: cachedWorkExperienceData.map((item: any) => item.workExperienceId) } })
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
                authorization: jwt.sign({ userId: cachedUserData[0].userId }),
              },
              payload: {
                query: `mutation putWorkExperiences($data: PutWorkExperiencesInputType!) {
                  putWorkExperiences(data: $data) {
                    workExperiences {
                      workExperienceId,
                      companyName
                    }
                  }
                }`,
                variables: {
                  data: {
                    workExperiences: cachedWorkExperienceData,
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
            expect(parsedBody.data.putWorkExperiences !== null).to.be.true;
            expect(parsedBody.data.putWorkExperiences !== null).to.be.true;
            expect(parsedBody.data.putWorkExperiences.workExperiences !== null).to.be.true;
            expect(parsedBody.data.putWorkExperiences.workExperiences instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(parsedBody.data.putWorkExperiences.workExperiences.length === EXPECTED_WORK_EXPERIENCES_LENGTH).to.be.true;
            for (const workExperience of parsedBody.data.putWorkExperiences.workExperiences) {
              expect(
                EXPECTED_WORK_EXPERIENCES.find((expectedItem: any) => expectedItem.workExperienceId === workExperience.workExperienceId) !==
                  undefined,
              ).to.be.true;
            }

            // query mongo to get info
            foundItems = await blainerrichardsonCloudDb
              .collection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_WORK_EXPERIENCES_COLLECTION_NAME)
              .find({ workExperienceId: { $in: cachedWorkExperienceData.map((item: any) => item.workExperienceId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_WORK_EXPERIENCES_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_WORK_EXPERIENCES.find((expectedItem: any) => expectedItem.workExperienceId === foundItem.workExperienceId) !==
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

    context('({ workExperiences: [2 do not exist..., 1 does exist...] })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // create the faked data
            staticWorkExperienceData = await readStaticWorkExperienceData(3);

            staticUserData = await readStaticUserData(3);

            // load data into datasources
            cachedWorkExperienceData = _.flatten([
              await loadWorkExperiencesData({
                workExperiences: [staticWorkExperienceData.slice()[0]],
              }),
              staticWorkExperienceData.slice(1),
            ]);

            cachedUserData = await loadUsersData({
              users: staticUserData,
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
            await unloadWorkExperiencesData({
              workExperiences: cachedWorkExperienceData,
            });

            // reset data holders
            staticUserData = undefined;

            cachedUserData = undefined;

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should replace 1...N work experience instances that exist correlated by workExperienceId or insert/create 1...N work experience instances that do not exist correlated by workExperienceId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update first element to make sure
            // that things are updated if they
            // already exist in the backend datastores
            const updatedWorkExperienceData = _.flatten([
              _.assign({}, cachedWorkExperienceData.slice()[0], { workName: 'UPDATE' }),
              cachedWorkExperienceData.slice(1),
            ]);

            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_EXISTING_WORK_EXPERIENCES = [cachedWorkExperienceData.slice()[0]];
            const EXPECTED_EXISTING_WORK_EXPERIENCES_LENGTH = EXPECTED_EXISTING_WORK_EXPERIENCES.length;
            const EXPECTED_NONEXISTING_WORK_EXPERIENCES = cachedWorkExperienceData.slice(1);
            const EXPECTED_WORK_EXPERIENCES = updatedWorkExperienceData.slice();
            const EXPECTED_WORK_EXPERIENCES_LENGTH = EXPECTED_WORK_EXPERIENCES.length;

            /////////////////////////
            //////// test ///////////
            /////////////////////////
            // query mongo to get info
            const blainerrichardsonCloudDb = await mongo.getConnection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);
            let foundItems = await blainerrichardsonCloudDb
              .collection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_WORK_EXPERIENCES_COLLECTION_NAME)
              .find({ workExperienceId: { $in: cachedWorkExperienceData.map((item: any) => item.workExperienceId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_EXISTING_WORK_EXPERIENCES_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_EXISTING_WORK_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.workExperienceId === foundItem.workExperienceId,
                ) !== undefined,
              ).to.be.true;
            }
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_NONEXISTING_WORK_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.workExperienceId === foundItem.workExperienceId,
                ) === undefined,
              ).to.be.true;
            }

            // run testee
            const httpRequest: any = {
              method: 'POST',
              url: '/graphql',
              headers: {
                'content-type': 'application/json',
                authorization: jwt.sign({ userId: cachedUserData[0].userId }),
              },
              payload: {
                query: `mutation putWorkExperiences($data: PutWorkExperiencesInputType!) {
                  putWorkExperiences(data: $data) {
                    workExperiences {
                      workExperienceId,
                      companyName
                    }
                  }
                }`,
                variables: {
                  data: {
                    workExperiences: cachedWorkExperienceData.map((item: any) =>
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
            expect(parsedBody.data.putWorkExperiences !== null).to.be.true;
            expect(parsedBody.data.putWorkExperiences !== null).to.be.true;
            expect(parsedBody.data.putWorkExperiences.workExperiences !== null).to.be.true;
            expect(parsedBody.data.putWorkExperiences.workExperiences instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(parsedBody.data.putWorkExperiences.workExperiences.length === EXPECTED_WORK_EXPERIENCES_LENGTH).to.be.true;
            for (const workExperience of parsedBody.data.putWorkExperiences.workExperiences) {
              expect(
                EXPECTED_WORK_EXPERIENCES.find((expectedItem: any) => expectedItem.workExperienceId === workExperience.workExperienceId) !==
                  undefined,
              ).to.be.true;
            }

            // query mongo to get info
            foundItems = await blainerrichardsonCloudDb
              .collection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_WORK_EXPERIENCES_COLLECTION_NAME)
              .find({ workExperienceId: { $in: cachedWorkExperienceData.map((item: any) => item.workExperienceId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_WORK_EXPERIENCES_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_WORK_EXPERIENCES.find((expectedItem: any) => expectedItem.workExperienceId === foundItem.workExperienceId) !==
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

    context('({ workExperiences: [1 does not exist..., 2 do exist...] })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // create the faked data
            staticWorkExperienceData = await readStaticWorkExperienceData(3);
            staticUserData = await readStaticUserData(3);

            // load data into datasources
            cachedWorkExperienceData = _.flatten([
              await loadWorkExperiencesData({
                workExperiences: staticWorkExperienceData.slice(0, 2),
              }),
              staticWorkExperienceData.slice(-1),
            ]);

            cachedUserData = await loadUsersData({
              users: staticUserData,
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
            await unloadWorkExperiencesData({
              workExperiences: cachedWorkExperienceData,
            });

            // reset data holders
            staticUserData = undefined;

            cachedUserData = undefined;

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should replace 1...N work experience instances that exist correlated by workExperienceId or insert/create 1...N work experience instances that do not exist correlated by workExperienceId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update first element to make sure
            // that things are updated if they
            // already exist in the backend datastores
            const updatedWorkExperienceData = _.flatten([
              staticWorkExperienceData
                .slice(0, 2)
                .map((item: any, itemIndex: number) => _.assign({}, item, { workName: `UPDATE ${itemIndex}` })),
              cachedWorkExperienceData.slice(-1),
            ]);

            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_EXISTING_WORK_EXPERIENCES = staticWorkExperienceData.slice(0, 2);
            const EXPECTED_EXISTING_WORK_EXPERIENCES_LENGTH = EXPECTED_EXISTING_WORK_EXPERIENCES.length;
            const EXPECTED_NONEXISTING_WORK_EXPERIENCES = cachedWorkExperienceData.slice(-1);
            const EXPECTED_WORK_EXPERIENCES = updatedWorkExperienceData.slice();
            const EXPECTED_WORK_EXPERIENCES_LENGTH = EXPECTED_WORK_EXPERIENCES.length;

            /////////////////////////
            //////// test ///////////
            /////////////////////////
            // query mongo to get info
            const blainerrichardsonCloudDb = await mongo.getConnection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);
            let foundItems = await blainerrichardsonCloudDb
              .collection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_WORK_EXPERIENCES_COLLECTION_NAME)
              .find({ workExperienceId: { $in: cachedWorkExperienceData.map((item: any) => item.workExperienceId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_EXISTING_WORK_EXPERIENCES_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_EXISTING_WORK_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.workExperienceId === foundItem.workExperienceId,
                ) !== undefined,
              ).to.be.true;
            }
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_NONEXISTING_WORK_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.workExperienceId === foundItem.workExperienceId,
                ) === undefined,
              ).to.be.true;
            }

            // run testee
            const httpRequest: any = {
              method: 'POST',
              url: '/graphql',
              headers: {
                'content-type': 'application/json',
                authorization: jwt.sign({ userId: cachedUserData[0].userId }),
              },
              payload: {
                query: `mutation putWorkExperiences($data: PutWorkExperiencesInputType!) {
                  putWorkExperiences(data: $data) {
                    workExperiences {
                      workExperienceId,
                      companyName
                    }
                  }
                }`,
                variables: {
                  data: {
                    workExperiences: cachedWorkExperienceData.map((item: any) =>
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
            expect(parsedBody.data.putWorkExperiences !== null).to.be.true;
            expect(parsedBody.data.putWorkExperiences !== null).to.be.true;
            expect(parsedBody.data.putWorkExperiences.workExperiences !== null).to.be.true;
            expect(parsedBody.data.putWorkExperiences.workExperiences instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(parsedBody.data.putWorkExperiences.workExperiences.length === EXPECTED_WORK_EXPERIENCES_LENGTH).to.be.true;
            for (const workExperience of parsedBody.data.putWorkExperiences.workExperiences) {
              expect(
                EXPECTED_WORK_EXPERIENCES.find((expectedItem: any) => expectedItem.workExperienceId === workExperience.workExperienceId) !==
                  undefined,
              ).to.be.true;
            }

            // query mongo to get info
            foundItems = await blainerrichardsonCloudDb
              .collection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_WORK_EXPERIENCES_COLLECTION_NAME)
              .find({ workExperienceId: { $in: cachedWorkExperienceData.map((item: any) => item.workExperienceId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_WORK_EXPERIENCES_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_WORK_EXPERIENCES.find((expectedItem: any) => expectedItem.workExperienceId === foundItem.workExperienceId) !==
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

    context('({ workExperiences: [3 do exist...] })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // create the faked data
            staticWorkExperienceData = await readStaticWorkExperienceData(3);
            staticUserData = await readStaticUserData(3);

            // load data into datasources
            cachedWorkExperienceData = await loadWorkExperiencesData({
              workExperiences: staticWorkExperienceData,
            });

            cachedUserData = await loadUsersData({
              users: staticUserData,
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
            await unloadWorkExperiencesData({
              workExperiences: cachedWorkExperienceData,
            });

            // reset data holders
            staticUserData = undefined;

            cachedUserData = undefined;

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should replace 1...N work experience instances that exist correlated by workExperienceId or insert/create 1...N work experience instances that do not exist correlated by workExperienceId', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update first element to make sure
            // that things are updated if they
            // already exist in the backend datastores
            const updatedWorkExperienceData = staticWorkExperienceData
              .slice()
              .map((item: any, itemIndex: number) => _.assign({}, item, { workName: `UPDATE ${itemIndex}` }));

            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_EXISTING_WORK_EXPERIENCES = staticWorkExperienceData.slice();
            const EXPECTED_EXISTING_WORK_EXPERIENCES_LENGTH = EXPECTED_EXISTING_WORK_EXPERIENCES.length;
            const EXPECTED_NONEXISTING_WORK_EXPERIENCES: any[] = [];
            const EXPECTED_WORK_EXPERIENCES = updatedWorkExperienceData.slice();
            const EXPECTED_WORK_EXPERIENCES_LENGTH = EXPECTED_WORK_EXPERIENCES.length;

            /////////////////////////
            //////// test ///////////
            /////////////////////////
            // query mongo to get info
            const blainerrichardsonCloudDb = await mongo.getConnection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);
            let foundItems = await blainerrichardsonCloudDb
              .collection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_WORK_EXPERIENCES_COLLECTION_NAME)
              .find({ workExperienceId: { $in: cachedWorkExperienceData.map((item: any) => item.workExperienceId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_EXISTING_WORK_EXPERIENCES_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_EXISTING_WORK_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.workExperienceId === foundItem.workExperienceId,
                ) !== undefined,
              ).to.be.true;
            }
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_NONEXISTING_WORK_EXPERIENCES.find(
                  (expectedItem: any) => expectedItem.workExperienceId === foundItem.workExperienceId,
                ) === undefined,
              ).to.be.true;
            }

            // run testee
            const httpRequest: any = {
              method: 'POST',
              url: '/graphql',
              headers: {
                'content-type': 'application/json',
                authorization: jwt.sign({ userId: cachedUserData[0].userId }),
              },
              payload: {
                query: `mutation putWorkExperiences($data: PutWorkExperiencesInputType!) {
                  putWorkExperiences(data: $data) {
                    workExperiences {
                      workExperienceId,
                      companyName
                    }
                  }
                }`,
                variables: {
                  data: {
                    workExperiences: cachedWorkExperienceData.map((item: any) =>
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
            expect(parsedBody.data.putWorkExperiences !== null).to.be.true;
            expect(parsedBody.data.putWorkExperiences !== null).to.be.true;
            expect(parsedBody.data.putWorkExperiences.workExperiences !== null).to.be.true;
            expect(parsedBody.data.putWorkExperiences.workExperiences instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(parsedBody.data.putWorkExperiences.workExperiences.length === EXPECTED_WORK_EXPERIENCES_LENGTH).to.be.true;
            for (const workExperience of parsedBody.data.putWorkExperiences.workExperiences) {
              expect(
                EXPECTED_WORK_EXPERIENCES.find((expectedItem: any) => expectedItem.workExperienceId === workExperience.workExperienceId) !==
                  undefined,
              ).to.be.true;
            }

            // query mongo to get info
            foundItems = await blainerrichardsonCloudDb
              .collection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_WORK_EXPERIENCES_COLLECTION_NAME)
              .find({ workExperienceId: { $in: cachedWorkExperienceData.map((item: any) => item.workExperienceId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_WORK_EXPERIENCES_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_WORK_EXPERIENCES.find((expectedItem: any) => expectedItem.workExperienceId === foundItem.workExperienceId) !==
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
