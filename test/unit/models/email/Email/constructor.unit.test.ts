// /* eslint-disable @typescript-eslint/no-unused-expressions */
// // node_modules
// import { expect } from 'chai';
// import * as _ from 'lodash';

// // models
// import { Email } from '../../../../../src/models/email';

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
// describe('models/email/Email.ts - #constructor - unit tests', () => {
//   before(async () => {
//     try {
//       // return explicitly
//       return;
//     } catch (err) {
//       // throw explicitly
//       throw err;
//     }
//   });

//   context('static data', () => {
//     describe('(email)', () => {
//       beforeEach(async () => {
//         try {
//           // set up
//           // none
//           // return explicitly
//         } catch (err) {
//           // throw explicitly
//           throw err;
//         }
//       });

//       afterEach(async () => {
//         try {
//           // tear down
//           // none
//           // return explicitly
//         } catch (err) {
//           // throw explicitly
//           throw err;
//         }
//       });

//       it('- should correctly map data to and intiatiate a valid email instance', async () => {
//         try {
//           /////////////////////////
//           //////// setup //////////
//           /////////////////////////
//           // none
//           /////////////////////////
//           //////// test //////////
//           /////////////////////////
//           // run testee
//           const httpRequest: any = {
//             method: 'POST',
//             url: '/graphql',
//             headers: {
//               'content-type': 'application/json',
//             },
//             payload: {
//               query: `{
//                 healthCheck {
//                   status
//                 }
//               }`,
//             },
//           };
//           const httResponse = await app.inject(httpRequest);
//           // run assertions
//           expect(httResponse !== undefined).to.be.true;
//           expect(httResponse.statusCode !== undefined).to.be.true;
//           expect(httResponse.statusCode === 200).to.be.true;
//           expect(httResponse.body !== undefined).to.be.true;
//           // parse JSON body
//           const parsedBody = JSON.parse(httResponse.body);
//           // validate results
//           expect(parsedBody !== undefined).to.be.true;
//           expect(parsedBody.data !== undefined).to.be.true;
//           // return explicitly
//           return;
//         } catch (err) {
//           // throw explicitly
//           throw err;
//         }
//       });
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
