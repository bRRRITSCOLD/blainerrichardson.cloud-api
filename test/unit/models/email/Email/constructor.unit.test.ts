// /* eslint-disable @typescript-eslint/no-unused-expressions */
// // node_modules
// import { expect } from 'chai';
// import * as _ from 'lodash';

// // libraries
// import { e2eTestEnv } from '../../../../../lib/environment';

// // models
// import { APIError } from '../../../../../../src/models/error';
// import { AnyObject } from '../../../../../../src/models/common';

// // services
// import { UtilityHealthService } from '../../../../../../src/api/utility/services/UtilityHealth.service';

// // testees
// import { bootstrap } from '../../../../../../src/app';

// // file constants/functions

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
// describe('api/utility/resolvers/UtilityHealth.resolver - POST /graphql query healthCheck - e2e tests', () => {
//   before(async () => {
//     try {
//       // load out environment
//       await e2eTestEnv.init();
//       // initialize asynchronous tasks, connectiones, etc. here
//       await Promise.all([]);
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

//   describe('{ query: { twitterUserTimeline(twitterScreenName, count) { createdAt, text, source, user { name, screenName } } } }', () => {
//     beforeEach(async () => {
//       try {
//         // set up
//         // none
//         // return explicitly
//       } catch (err) {
//         // throw explicitly
//         throw err;
//       }
//     });

//     afterEach(async () => {
//       try {
//         // tear down
//         // none
//         // return explicitly
//       } catch (err) {
//         // throw explicitly
//         throw err;
//       }
//     });

//     it('- shoud return the health status of the api and any subsequent service connections that it deems necessary to track', async () => {
//       try {
//         /////////////////////////
//         //////// setup //////////
//         /////////////////////////
//         // none
//         /////////////////////////
//         //////// test //////////
//         /////////////////////////
//         // run testee
//         const httpRequest: any = {
//           method: 'POST',
//           url: '/graphql',
//           headers: {
//             'content-type': 'application/json'
//           },
//           payload: {
//             query: `{
//               healthCheck {
//                 status
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
//         // parse JSON body
//         const parsedBody = JSON.parse(httResponse.body);
//         // validate results
//         expect(parsedBody !== undefined).to.be.true;
//         expect(parsedBody.data !== undefined).to.be.true;
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
//       // return explicitly
//       return;
//     } catch (err) {
//       // throw explicitly
//       throw err;
//     }
//   });
// });
