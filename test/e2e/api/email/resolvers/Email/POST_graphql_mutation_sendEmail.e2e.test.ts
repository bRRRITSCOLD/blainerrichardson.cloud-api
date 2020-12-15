/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import { FastifyInstance, FastifyLoggerInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { expect } from 'chai';
import * as _ from 'lodash';

// libraries
import { e2eTestEnv } from '../../../../../lib/environment';
import { emailClients } from '../../../../../../src/lib/email';

// testees
import { bootstrap } from '../../../../../../src/app';

// file constants/functions

let app: FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>;

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
describe('api/email/resolvers/Email.resolver - POST /graphql mutation sendEmail - e2e tests', () => {
  before(async () => {
    try {
      // load out environment
      await e2eTestEnv.init();

      // initialize asynchronous tasks, connectiones, etc. here
      await Promise.all([]);

      // initialize synchronous tasks, connectiones, etc. here
      [emailClients.init(require('../../../../../../src/configs/email-clients').default)];

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

  describe('{ query: { twitterUserTimeline(twitterScreenName, count) { createdAt, text, source, user { name, screenName } } } }', () => {
    beforeEach(async () => {
      try {
        // set up
        // none

        // return explicitly
        return;
      } catch (err) {
        // throw explicitly
        throw err;
      }
    });

    afterEach(async () => {
      try {
        // tear down
        // none

        // return explicitly
        return;
      } catch (err) {
        // throw explicitly
        throw err;
      }
    });

    it('- shoud send a new email to the given recipients with the given options', async () => {
      try {
        /////////////////////////
        //////// setup //////////
        /////////////////////////
        // set up data for test
        const email = {
          from: {
            address: e2eTestEnv.EMAIL_CLIENT_GMAIL_USERNAME,
          },
          to: [
            {
              address: e2eTestEnv.TEST_TO_EMAIL_ADDRESS,
            },
          ],
          subject: 'TEST',
          text: 'TEST EMAIL!',
        };

        // set up expectations
        const EXPECTED_TYPE_OF_STRING = 'string';

        /////////////////////////
        //////// test //////////
        /////////////////////////

        // run testee
        const httpRequest: any = {
          method: 'POST',
          url: '/graphql',
          headers: {
            'content-type': 'application/json',
          },
          payload: {
            query: `mutation sendEmail($data: SendEmailInputType!) {
              sendEmail(data: $data) {
                messageId
              }
            }`,
            variables: {
              data: {
                email,
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
        expect(parsedBody.data !== undefined).to.be.true;
        expect(parsedBody.data.sendEmail !== undefined).to.be.true;
        expect(parsedBody.data.sendEmail.messageId !== undefined).to.be.true;
        expect(typeof parsedBody.data.sendEmail.messageId === EXPECTED_TYPE_OF_STRING).to.be.true;

        // return explicitly
        return;
      } catch (err) {
        // throw explicitly
        throw err;
      }
    });

    it('- shoud send a new email to the given recipients with the given options', async () => {
      try {
        /////////////////////////
        //////// setup //////////
        /////////////////////////
        // set up data for test
        const email = {
          from: {
            address: e2eTestEnv.EMAIL_CLIENT_GMAIL_USERNAME,
          },
          to: [
            {
              address: e2eTestEnv.TEST_TO_EMAIL_ADDRESS,
            },
          ],
          subject: 'TEST',
          text: 'TEST EMAIL!',
        };

        // set up expectations
        const EXPECTED_TYPE_OF_STRING = 'string';
        const EXPECTED_EMAIL = [email].slice()[0];
        const EXPECTED_ARRAY_CLASS_INSTANCE = Array;

        /////////////////////////
        //////// test //////////
        /////////////////////////

        // run testee
        const httpRequest: any = {
          method: 'POST',
          url: '/graphql',
          headers: {
            'content-type': 'application/json',
          },
          payload: {
            query: `mutation sendEmail($data: SendEmailInputType!) {
              sendEmail(data: $data) {
                messageId,
                email {
                  from {
                    name,
                    address
                  },
                  to {
                    name,
                    address
                  },
                  subject,
                  text
                }
              }
            }`,
            variables: {
              data: {
                email,
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
        expect(parsedBody.data !== undefined).to.be.true;
        expect(parsedBody.data.sendEmail !== undefined).to.be.true;
        expect(parsedBody.data.sendEmail.messageId !== undefined).to.be.true;
        expect(typeof parsedBody.data.sendEmail.messageId === EXPECTED_TYPE_OF_STRING).to.be.true;
        expect(parsedBody.data.sendEmail.email !== undefined).to.be.true;
        expect(parsedBody.data.sendEmail.email.from !== undefined).to.be.true;
        expect(parsedBody.data.sendEmail.email.from.name === '').to.be.true;
        expect(parsedBody.data.sendEmail.email.from.address !== undefined).to.be.true;
        expect(parsedBody.data.sendEmail.email.from.address === EXPECTED_EMAIL.from.address).to.be.true;
        expect(parsedBody.data.sendEmail.email.to !== undefined).to.be.true;
        expect(parsedBody.data.sendEmail.email.to instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
        for (const item of parsedBody.data.sendEmail.email.to) {
          const found = EXPECTED_EMAIL.to.find((expecetedEmailToItem: any) => expecetedEmailToItem.address === item.address);
          expect(found !== undefined).to.be.true;
          expect(item.name === '').to.be.true;
        }
        expect(parsedBody.data.sendEmail.email.subject !== undefined).to.be.true;
        expect(parsedBody.data.sendEmail.email.subject === EXPECTED_EMAIL.subject).to.be.true;
        expect(parsedBody.data.sendEmail.email.text !== undefined).to.be.true;
        expect(parsedBody.data.sendEmail.email.text === EXPECTED_EMAIL.text).to.be.true;

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
