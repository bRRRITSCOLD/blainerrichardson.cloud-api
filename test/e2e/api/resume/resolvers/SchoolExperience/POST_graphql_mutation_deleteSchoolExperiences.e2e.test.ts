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
import { SchoolExperience } from '../../../../../../src/models/resume';

// testees
import { bootstrap } from '../../../../../../src/app';
let app: FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>;

// data
import { loadSchoolExperiencesData, unloadSchoolExperiencesData } from '../../../../../data/loaders/resume';
import { readStaticSchoolExperienceData } from '../../../../../data/static/resume/SchoolExperience';
import { readStaticUserData } from '../../../../../data/static/user/User';
import { loadUsersData } from '../../../../../data/loaders/user';

// file constants/functions
let staticSchoolExperienceData: any | any[];
let staticUserData: any | any[];

let cachedSchoolExperienceData: any | any[];
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
describe('api/resume/resolvers/SchoolExperience.resolver - POST /graphql mutation deleteSchoolExperiences - e2e tests', () => {
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

  describe('{ mutation deleteSchoolExperiences }', () => {
    context('({ schoolExperienceIds })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // create the faked data
            staticSchoolExperienceData = await readStaticSchoolExperienceData(3);
            staticUserData = await readStaticUserData(3);

            // load data into datasources
            cachedSchoolExperienceData = await loadSchoolExperiencesData({
              schoolExperiences: staticSchoolExperienceData,
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
            await unloadSchoolExperiencesData({
              schoolExperiences: cachedSchoolExperienceData,
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

        it('- should delete 1...N school experience instances that correlate to given school experience ids in the backend datasources', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_SCHOOL_EXPERIENCE_IDS = cachedSchoolExperienceData.slice().map((item: any) => item.schoolExperienceId);
            const EXPECTED_SCHOOL_EXPERIENCE_IDS_LENGTH = EXPECTED_SCHOOL_EXPERIENCE_IDS.length;
            const EXPECTED_TYPE_OF_STRING = 'string';

            /////////////////////////
            //////// test ///////////
            /////////////////////////
            // query mongo to get info
            const blainerrichardsonCloudDb = await mongo.getConnection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_DB_NAME);
            let foundItems = await blainerrichardsonCloudDb
              .collection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_SCHOOL_EXPERIENCES_COLLECTION_NAME)
              .find({ schoolExperienceId: { $in: cachedSchoolExperienceData.map((item: any) => item.schoolExperienceId) } })
              .toArray();

            // run assertions
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems !== undefined).to.be.true;
            expect(foundItems instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(foundItems.length === EXPECTED_SCHOOL_EXPERIENCE_IDS_LENGTH).to.be.true;
            for (const foundItem of foundItems) {
              expect(
                EXPECTED_SCHOOL_EXPERIENCE_IDS.find((expectedItem: any) => expectedItem === foundItem.schoolExperienceId) !== undefined,
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
                query: `mutation deleteSchoolExperiences($data: DeleteSchoolExperiencesInputType!) {
                  deleteSchoolExperiences(data: $data) {
                    schoolExperienceIds
                  }
                }`,
                variables: {
                  data: {
                    schoolExperienceIds: cachedSchoolExperienceData.map((item: any) => item.schoolExperienceId),
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
            expect(parsedBody.data.deleteSchoolExperiences !== null).to.be.true;
            expect(parsedBody.data.deleteSchoolExperiences !== null).to.be.true;
            expect(parsedBody.data.deleteSchoolExperiences.schoolExperienceIds !== null).to.be.true;
            expect(parsedBody.data.deleteSchoolExperiences.schoolExperienceIds instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(parsedBody.data.deleteSchoolExperiences.schoolExperienceIds.length === EXPECTED_SCHOOL_EXPERIENCE_IDS_LENGTH).to.be.true;
            for (const schoolExperienceId of parsedBody.data.deleteSchoolExperiences.schoolExperienceIds) {
              expect(typeof schoolExperienceId === EXPECTED_TYPE_OF_STRING).to.be.true;
              expect(EXPECTED_SCHOOL_EXPERIENCE_IDS.find((expectedItem: any) => expectedItem === schoolExperienceId) !== undefined).to.be
                .true;
            }

            // query mongo to get info
            foundItems = await blainerrichardsonCloudDb
              .collection(e2eTestEnv.MONGO_BLAINERRICARDSON_CLOUD_SCHOOL_EXPERIENCES_COLLECTION_NAME)
              .find({ schoolExperienceId: { $in: cachedSchoolExperienceData.map((item: any) => item.schoolExperienceId) } })
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
