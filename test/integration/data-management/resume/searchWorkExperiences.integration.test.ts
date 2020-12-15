/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import { expect } from 'chai';
import * as _ from 'lodash';

// libraries
import { integrationTestEnv } from '../../../lib/environment';
import { emailClients } from '../../../../src/lib/email';
import { env } from '../../../../src/lib/environment';

// models
import { Email } from '../../../../src/models/email';

// testees
import * as emailManager from '../../../../src/data-management/email';
import { mongo } from '../../../../src/lib/mongo';

// file constants/functions
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
describe('data-management/resume/searchWorkExperiences - #searchWorkExperiences - integration tests', () => {
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

  describe('#searchWorkExperiences', () => {
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
            const searchWorkExperiencesRequest = {
              email: {
                from: {
                  address: env.EMAIL_CLIENT_GMAIL_USERNAME,
                },
                to: [
                  {
                    address: integrationTestEnv.TEST_TO_EMAIL_ADDRESS,
                  },
                ],
                subject: 'TEST',
                text: 'TEST EMAIL!',
              },
            };
            const searchWorkExperiencesResponse = await emailManager.sendEmail(searchWorkExperiencesRequest);

            // run assertions
            expect(searchWorkExperiencesResponse !== undefined).to.be.true;
            expect(searchWorkExperiencesResponse.messageId !== undefined).to.be.true;
            expect(typeof searchWorkExperiencesResponse.messageId === EXPECTED_TYPE_OF_STRING).to.be.true;
            expect(searchWorkExperiencesResponse.email !== undefined).to.be.true;
            expect(searchWorkExperiencesResponse.email instanceof EXPECTED_EMAIL_CLASS_INSTANCE).to.be.true;

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
