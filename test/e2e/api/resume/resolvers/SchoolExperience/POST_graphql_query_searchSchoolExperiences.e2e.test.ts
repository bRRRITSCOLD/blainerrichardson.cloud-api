// /* eslint-disable @typescript-eslint/no-unused-expressions */
// // node_modules
// import { FastifyInstance, FastifyLoggerInstance } from 'fastify';
// import { IncomingMessage, Server, ServerResponse } from 'http';
// import { expect } from 'chai';
// import * as _ from 'lodash';

// // libraries
// import { e2eTestEnv } from '../../../../../lib/environment';
// import { mongo } from '../../../../../../src/lib/mongo';

// // models
// // import { SchoolExperience } from '../../../../../../src/models/resume';

// // testees
// import { bootstrap } from '../../../../../../src/app';
// let app: FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>;

// // data
// import { readStaticSchoolExperienceData } from '../../../../../data/static/resume/SchoolExperience';
// import { loadSchoolExperiencesData, unloadSchoolExperiencesData } from '../../../../../data/loaders/resume';

// // file constants/functions
// let staticSchoolExperienceData: any | any[];
// let cachedSchoolExperienceData: any | any[];

// async function customStartUp() {
//   try {
//     // return explicitly
//     return;
//   } catch (err) {
//     // throw error explicitly
//     throw err;
//   }
// }

// // tests
// describe('api/resume/resolvers/SchoolExperience.resolver - POST /graphql query searchSchoolExperiences - e2e tests', () => {
//   before(async () => {
//     try {
//       // load out environment
//       await e2eTestEnv.init();

//       // initialize asynchronous tasks, connectiones, etc. here
//       await Promise.all([mongo.init(require('../../../../../../src/configs/mongo').default)]);

//       // initialize synchronous tasks, connectiones, etc. here
//       [];

//       // create and store app
//       app = await bootstrap();

//       // cusom start up functionality
//       await customStartUp();

//       // return explicitly
//       return;
//     } catch (err) {
//       // throw explicitly
//       throw err;
//     }
//   });

//   describe('{ query: { searchSchoolExperiences(searchCriteria: {}) { } } }', () => {
//     beforeEach(async () => {
//       try {
//         // create the faked data
//         staticSchoolExperienceData = await readStaticSchoolExperienceData(3);

//         // load data into datasources
//         cachedSchoolExperienceData = await loadSchoolExperiencesData({
//           schoolExperiences: staticSchoolExperienceData,
//         });

//         // return explicitly
//       } catch (err) {
//         // throw explicitly
//         throw err;
//       }
//     });

//     afterEach(async () => {
//       try {
//         // unload data from datasources
//         cachedSchoolExperienceData = await unloadSchoolExperiencesData({
//           schoolExperiences: cachedSchoolExperienceData,
//         });

//         // return explicitly
//       } catch (err) {
//         // throw explicitly
//         throw err;
//       }
//     });

//     it('- should retrun 1...N school experience instances that match a given criteria with the given options applied', async () => {
//       try {
//         /////////////////////////
//         ///////// setup /////////
//         /////////////////////////
//         // set up expectations
//         const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
//         const EXPECTED_TYPE_OF_STRING = 'string';
//         const EXPECTED_WORK_EXPERIENCES = cachedSchoolExperienceData.slice();
//         const EXPECTED_WORK_EXPERIENCES_LENGTH = EXPECTED_WORK_EXPERIENCES.length;

//         /////////////////////////
//         //////// test ///////////
//         /////////////////////////

//         // run testee
//         const httpRequest: any = {
//           method: 'POST',
//           url: '/graphql',
//           headers: {
//             'content-type': 'application/json',
//           },
//           payload: {
//             query: `{
//               searchSchoolExperiences(
//                 searchCriteria: {},
//                 searchOptions: {}
//               ) {
//                 schoolExperiences {
//                   schoolName
//                 },
//                 moreSchoolExperiences,
//                 totalSchoolExperiences
//               }
//             }`,
//           },
//         };
//         const httResponse = await app.inject(httpRequest);

//         // run assertions
//         expect(httResponse !== undefined).to.be.true;
//         expect(httResponse.statusCode !== undefined).to.be.true;
//         expect(httResponse.statusCode === 200).to.be.true;
//         expect(httResponse.body !== undefined).to.be.true;
//         expect(typeof httResponse.body === EXPECTED_TYPE_OF_STRING).to.be.true;

//         // parse JSON body
//         const parsedBody = JSON.parse(httResponse.body);

//         // validate results
//         expect(parsedBody !== undefined).to.be.true;
//         expect(parsedBody.data !== null).to.be.true;
//         expect(parsedBody.data.searchSchoolExperiences !== null).to.be.true;
//         expect(parsedBody.data.searchSchoolExperiences.schoolExperiences !== null).to.be.true;
//         expect(parsedBody.data.searchSchoolExperiences.schoolExperiences instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
//         expect(parsedBody.data.searchSchoolExperiences.schoolExperiences.length === EXPECTED_WORK_EXPERIENCES_LENGTH).to.be.true;
//         for (const item of parsedBody.data.searchSchoolExperiences.schoolExperiences) {
//           expect(EXPECTED_WORK_EXPERIENCES.find((expectedItem: any) => expectedItem.companyName === item.companyName) !== undefined).to.be
//             .true;
//         }
//         expect(parsedBody.data.searchSchoolExperiences.moreSchoolExperiences !== null).to.be.true;
//         expect(parsedBody.data.searchSchoolExperiences.moreSchoolExperiences).to.be.false;
//         expect(parsedBody.data.searchSchoolExperiences.totalSchoolExperiences === null).to.be.true;
//         // return explicitly
//         return;
//       } catch (err) {
//         // throw explicitly
//         throw err;
//       }
//     });
//   });

//   after(async () => {
//     try {
//       // shutdown app/server
//       await app.close();

//       // return explicitly
//       return;
//     } catch (err) {
//       // throw explicitly
//       throw err;
//     }
//   });
// });
