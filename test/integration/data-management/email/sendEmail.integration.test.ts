/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import { FastifyInstance, FastifyLoggerInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { expect } from 'chai';
import * as _ from 'lodash';

// libraries
import { integrationTestEnv } from '../../../lib/environment';
import { emailClients } from '../../../../src/lib/email';

// testees
import * as emailManager from '../../../../src/data-management/email';
import { env } from '../../../../src/lib/environment';
import { Email } from '../../../../src/models/email';

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
describe('data-management/email/sendEmail - #sendEmail - integration tests', () => {
  before(async () => {
    try {
      // load out environment
      await integrationTestEnv.init();

      // initialize asynchronous tasks, connectiones, etc. here
      await Promise.all([]);

      // initialize synchronous tasks, connectiones, etc. here
      [emailClients.init(require('../../../../src/configs/email-clients').default)];

      // cusom start up functionality
      await customStartUp();

      // return explicitly
      return;
    } catch (err) {
      // throw explicitly
      throw err;
    }
  });

  describe('#sendEmail', () => {
    context('({ from: EmailAddress, to: EmailAddress, subject, text })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // set up
            // none
            // return explicitly
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
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should send 1 email to a given address(es) with given attachments and options', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // none
            const EXPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_EMAIL_CLASS_INSTANCE = Email;

            /////////////////////////
            //////// test //////////
            /////////////////////////

            // run testee
            const sendEmailRequest = {
              email: {
                from: {
                  address: env.EMAIL_CLIENT_GMAIL_USERNAME,
                },
                to: {
                  address: integrationTestEnv.EMAIL_ADDRESS,
                },
                subject: 'TEST',
                text: 'TEST EMAIL!',
              } as any,
            };
            const sendEmailResponse = await emailManager.sendEmail(sendEmailRequest);

            // run assertions
            expect(sendEmailResponse !== undefined).to.be.true;
            expect(sendEmailResponse.messageId !== undefined).to.be.true;
            expect(typeof sendEmailResponse.messageId === EXPECTED_TYPE_OF_STRING).to.be.true;
            expect(sendEmailResponse.email !== undefined).to.be.true;
            expect(sendEmailResponse.email instanceof EXPECTED_EMAIL_CLASS_INSTANCE).to.be.true;

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
