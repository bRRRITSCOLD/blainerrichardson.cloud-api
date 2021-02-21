/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import { FastifyInstance, FastifyLoggerInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { expect } from 'chai';
import * as _ from 'lodash';

// libraries
import { e2eTestEnv } from '../../../../../lib/environment';
import { mongo } from '../../../../../../src/lib/mongo';

// models
// import { SchoolExperience } from '../../../../../../src/models/resume';

// testees
import { bootstrap } from '../../../../../../src/app';
let app: FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>;

// data
import { readStaticSchoolExperienceData } from '../../../../../data/static/resume/SchoolExperience';
import {
  loadCertificationsData,
  loadSchoolExperiencesData,
  loadWorkExperiencesData,
  unloadCertificationsData,
  unloadSchoolExperiencesData,
  unloadWorkExperiencesData,
} from '../../../../../data/loaders/resume';
import { readStaticCertificationData } from '../../../../../data/static/resume/Certification';
import { readStaticWorkExperienceData } from '../../../../../data/static/resume/WorkExperience';

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

// tests
describe('api/resume/resolvers/Resume.resolver - POST /graphql query downloadResume - e2e tests', () => {
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

  describe('{ query: { downloadResume { bytes } } }', () => {
    beforeEach(async () => {
      try {
        // load static data
        staticWorkExperienceData = await readStaticWorkExperienceData(3);
        staticSchoolExperienceData = await readStaticSchoolExperienceData(3);
        staticCertificationData = await readStaticCertificationData(3);

        // load data into datasources
        cachedWorkExperienceData = await loadWorkExperiencesData({
          workExperiences: staticWorkExperienceData,
        });
        cachedSchoolExperienceData = await loadSchoolExperiencesData({
          schoolExperiences: staticSchoolExperienceData,
        });
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
        await unloadWorkExperiencesData({
          workExperiences: cachedWorkExperienceData,
        });
        await unloadSchoolExperiencesData({
          schoolExperiences: cachedSchoolExperienceData,
        });
        await unloadCertificationsData({
          certifications: cachedCertificationData,
        });

        // reset data holders
        staticSchoolExperienceData = undefined;
        staticSchoolExperienceData = undefined;
        staticSchoolExperienceData = undefined;

        // return explicitly
      } catch (err) {
        // throw explicitly
        throw err;
      }
    });

    it(`- should create a pdf representing the passed in resume data and then return said pdf's buffer`, async () => {
      try {
        /////////////////////////
        ///////// setup /////////
        /////////////////////////
        // set up expectations
        const EXPECTED_TYPE_OF_STRING = 'string';

        /////////////////////////
        //////// test ///////////
        /////////////////////////

        // run testee
        const httpRequest: any = {
          method: 'POST',
          url: '/graphql',
          headers: {
            'content-type': 'application/json',
          },
          payload: {
            query: `{
              downloadResume {
                bytes
              }
            }`,
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
        expect(parsedBody.data.downloadResume !== null).to.be.true;
        expect(parsedBody.data.downloadResume.bytes !== null).to.be.true;
        expect(typeof parsedBody.data.downloadResume.bytes === EXPECTED_TYPE_OF_STRING).to.be.true;

        // return explicitly
        return;
      } catch (err) {
        // throw explicitly
        throw err;
      }
    });
  });

  after(async () => {
    try {
      // shutdown app/server
      await app.close();

      // return explicitly
      return;
    } catch (err) {
      // throw explicitly
      throw err;
    }
  });
});
