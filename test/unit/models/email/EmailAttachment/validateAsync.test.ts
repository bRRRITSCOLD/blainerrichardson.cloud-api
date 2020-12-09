/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import { expect } from 'chai';
import * as _ from 'lodash';
import { ValidationError } from 'yup';

// models
import { EmailAttachment } from '../../../../../src/models/email';
import { readStaticEmailAttachemntData } from '../../../../data/static/email/EmailAttachment';

// file constants/functions
let staticEmailAttachmentData: any | any[];
let cachedEmailAttachmentData: any | any[];

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
describe('models/email/EmailAttachment.ts - unit tests', () => {
  before(async () => {
    try {
      // run custom start ups
      await customStartUp();

      // return explicitly
      return;
    } catch (err) {
      // throw explicitly
      throw err;
    }
  });

  describe('#validateAsync', () => {
    context('EmailAttachement({ filename, content })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // set data holders
            staticEmailAttachmentData = await readStaticEmailAttachemntData(5);

            cachedEmailAttachmentData = staticEmailAttachmentData.slice();

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        afterEach(async () => {
          try {
            // reset data holders
            staticEmailAttachmentData = undefined;
            cachedEmailAttachmentData = undefined;

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // set expectations
            const EXPECTED_EMAIL_ATTACHEMENT_CLASS_INSTANCE = EmailAttachment;
            const EXPECTED_EMAIL_ATTACHEMENT = _.assign({}, cachedEmailAttachmentData[0]);

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(cachedEmailAttachmentData[0]);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error === undefined).to.be.true;
            expect((validateAsyncResponse.value as any) !== undefined).to.be.true;
            expect((validateAsyncResponse.value as any) instanceof EXPECTED_EMAIL_ATTACHEMENT_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.value as any).filename !== undefined).to.be.true;
            expect((validateAsyncResponse.value as any).filename === EXPECTED_EMAIL_ATTACHEMENT.filename).to.be.true;
            expect((validateAsyncResponse.value as any).content !== undefined).to.be.true;
            expect((validateAsyncResponse.value as any).content === EXPECTED_EMAIL_ATTACHEMENT.content).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAttachment = _.assign({}, cachedEmailAttachmentData[0], { filename: 1 });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'filename';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(updateEmailAttachment);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateAsyncResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateAsyncResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAttachment = _.assign({}, cachedEmailAttachmentData[0], { filename: true });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'filename';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(updateEmailAttachment);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateAsyncResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateAsyncResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAttachment = _.assign({}, cachedEmailAttachmentData[0], { content: 1 });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'content';
            const EXPECTED_ERROR_TYPE = 'bufferOrString';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(updateEmailAttachment);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateAsyncResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateAsyncResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAttachment = _.assign({}, cachedEmailAttachmentData[0], { content: false });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'content';
            const EXPECTED_ERROR_TYPE = 'bufferOrString';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(updateEmailAttachment);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateAsyncResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateAsyncResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAttachment = _.assign({}, cachedEmailAttachmentData[0], { filename: 1, content: 1 });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_POSSIBLE_ERROR_PATHS = ['filename', 'content'];
            const EXPECTED_POSSIBLE_ERROR_TYPES = ['typeError', 'bufferOrString'];

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(updateEmailAttachment);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateAsyncResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateAsyncResponse.error as ValidationError).path !== undefined).to.be.true;
            expect(EXPECTED_POSSIBLE_ERROR_PATHS.includes((validateAsyncResponse.error as ValidationError).path as string)).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type !== undefined).to.be.true;
            expect(EXPECTED_POSSIBLE_ERROR_TYPES.includes((validateAsyncResponse.error as ValidationError).type as string)).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });
      });
    });

    context('EmailAttachement({ filename, path })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // set data holders
            staticEmailAttachmentData = await readStaticEmailAttachemntData(5);

            cachedEmailAttachmentData = staticEmailAttachmentData.slice();

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        afterEach(async () => {
          try {
            // reset data holders
            staticEmailAttachmentData = undefined;
            cachedEmailAttachmentData = undefined;

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // set expectations
            const EXPECTED_EMAIL_ATTACHEMENT_CLASS_INSTANCE = EmailAttachment;
            const EXPECTED_EMAIL_ATTACHEMENT = _.assign({}, cachedEmailAttachmentData[1]);

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(cachedEmailAttachmentData[1]);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error === undefined).to.be.true;
            expect((validateAsyncResponse.value as any) !== undefined).to.be.true;
            expect((validateAsyncResponse.value as any) instanceof EXPECTED_EMAIL_ATTACHEMENT_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.value as any).filename !== undefined).to.be.true;
            expect((validateAsyncResponse.value as any).filename === EXPECTED_EMAIL_ATTACHEMENT.filename).to.be.true;
            expect((validateAsyncResponse.value as any).path !== undefined).to.be.true;
            expect((validateAsyncResponse.value as any).path === EXPECTED_EMAIL_ATTACHEMENT.path).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAttachment = _.assign({}, cachedEmailAttachmentData[1], { filename: 1 });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'filename';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(updateEmailAttachment);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateAsyncResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateAsyncResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAttachment = _.assign({}, cachedEmailAttachmentData[1], { filename: true });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'filename';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(updateEmailAttachment);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateAsyncResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateAsyncResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAttachment = _.assign({}, cachedEmailAttachmentData[1], { path: 1 });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'path';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(updateEmailAttachment);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateAsyncResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateAsyncResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAttachment = _.assign({}, cachedEmailAttachmentData[1], { path: false });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'path';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(updateEmailAttachment);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateAsyncResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateAsyncResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAttachment = _.assign({}, cachedEmailAttachmentData[1], { filename: 1, path: 1 });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_POSSIBLE_ERROR_PATHS = ['filename', 'path'];
            const EXPECTED_POSSIBLE_ERROR_TYPES = ['typeError', 'typeError'];

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(updateEmailAttachment);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateAsyncResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateAsyncResponse.error as ValidationError).path !== undefined).to.be.true;
            expect(EXPECTED_POSSIBLE_ERROR_PATHS.includes((validateAsyncResponse.error as ValidationError).path as string)).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type !== undefined).to.be.true;
            expect(EXPECTED_POSSIBLE_ERROR_TYPES.includes((validateAsyncResponse.error as ValidationError).type as string)).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });
      });
    });

    context('EmailAttachement({ path })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // set data holders
            staticEmailAttachmentData = await readStaticEmailAttachemntData(5);

            cachedEmailAttachmentData = staticEmailAttachmentData.slice();

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        afterEach(async () => {
          try {
            // reset data holders
            staticEmailAttachmentData = undefined;
            cachedEmailAttachmentData = undefined;

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // set expectations
            const EXPECTED_EMAIL_ATTACHEMENT_CLASS_INSTANCE = EmailAttachment;
            const EXPECTED_EMAIL_ATTACHEMENT = _.assign({}, cachedEmailAttachmentData[2]);

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(cachedEmailAttachmentData[2]);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error === undefined).to.be.true;
            expect((validateAsyncResponse.value as any) !== undefined).to.be.true;
            expect((validateAsyncResponse.value as any) instanceof EXPECTED_EMAIL_ATTACHEMENT_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.value as any).path !== undefined).to.be.true;
            expect((validateAsyncResponse.value as any).path === EXPECTED_EMAIL_ATTACHEMENT.path).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAttachment = _.assign({}, cachedEmailAttachmentData[2], { path: 1 });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'path';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(updateEmailAttachment);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateAsyncResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateAsyncResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAttachment = _.assign({}, cachedEmailAttachmentData[2], { path: true });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'path';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(updateEmailAttachment);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateAsyncResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateAsyncResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });
      });
    });

    context('EmailAttachement({ filename, content, contentType })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // set data holders
            staticEmailAttachmentData = await readStaticEmailAttachemntData(5);

            cachedEmailAttachmentData = staticEmailAttachmentData.slice();

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        afterEach(async () => {
          try {
            // reset data holders
            staticEmailAttachmentData = undefined;
            cachedEmailAttachmentData = undefined;

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // set expectations
            const EXPECTED_EMAIL_ATTACHEMENT_CLASS_INSTANCE = EmailAttachment;
            const EXPECTED_EMAIL_ATTACHEMENT = _.assign({}, cachedEmailAttachmentData[3]);

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(cachedEmailAttachmentData[3]);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error === undefined).to.be.true;
            expect((validateAsyncResponse.value as any) !== undefined).to.be.true;
            expect((validateAsyncResponse.value as any) instanceof EXPECTED_EMAIL_ATTACHEMENT_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.value as any).filename !== undefined).to.be.true;
            expect((validateAsyncResponse.value as any).filename === EXPECTED_EMAIL_ATTACHEMENT.filename).to.be.true;
            expect((validateAsyncResponse.value as any).content !== undefined).to.be.true;
            expect((validateAsyncResponse.value as any).content === EXPECTED_EMAIL_ATTACHEMENT.content).to.be.true;
            expect((validateAsyncResponse.value as any).contentType !== undefined).to.be.true;
            expect((validateAsyncResponse.value as any).contentType === EXPECTED_EMAIL_ATTACHEMENT.contentType).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAttachment = _.assign({}, cachedEmailAttachmentData[3], { filename: 1 });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'filename';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(updateEmailAttachment);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateAsyncResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateAsyncResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAttachment = _.assign({}, cachedEmailAttachmentData[3], { filename: true });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'filename';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(updateEmailAttachment);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateAsyncResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateAsyncResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAttachment = _.assign({}, cachedEmailAttachmentData[3], { content: 1 });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'content';
            const EXPECTED_ERROR_TYPE = 'bufferOrString';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(updateEmailAttachment);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateAsyncResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateAsyncResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAttachment = _.assign({}, cachedEmailAttachmentData[3], { content: true });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'content';
            const EXPECTED_ERROR_TYPE = 'bufferOrString';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(updateEmailAttachment);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateAsyncResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateAsyncResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAttachment = _.assign({}, cachedEmailAttachmentData[3], { contentType: 1 });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'contentType';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(updateEmailAttachment);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateAsyncResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateAsyncResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAttachment = _.assign({}, cachedEmailAttachmentData[3], { contentType: true });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'contentType';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(updateEmailAttachment);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateAsyncResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateAsyncResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAttachment = _.assign({}, cachedEmailAttachmentData[3], { filename: 1, content: 1, contentType: 1 });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_POSSIBLE_ERROR_PATHS = ['filename', 'content', 'contentType'];
            const EXPECTED_POSSIBLE_ERROR_TYPES = ['typeError', 'typeError', 'bufferOrString'];

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(updateEmailAttachment);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateAsyncResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateAsyncResponse.error as ValidationError).path !== undefined).to.be.true;
            expect(EXPECTED_POSSIBLE_ERROR_PATHS.includes((validateAsyncResponse.error as ValidationError).path as string)).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type !== undefined).to.be.true;
            expect(EXPECTED_POSSIBLE_ERROR_TYPES.includes((validateAsyncResponse.error as ValidationError).type as string)).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });
      });
    });

    context('EmailAttachement({ filename, content, encoding })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // set data holders
            staticEmailAttachmentData = await readStaticEmailAttachemntData(5);

            cachedEmailAttachmentData = staticEmailAttachmentData.slice();

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        afterEach(async () => {
          try {
            // reset data holders
            staticEmailAttachmentData = undefined;
            cachedEmailAttachmentData = undefined;

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // set expectations
            const EXPECTED_EMAIL_ATTACHEMENT_CLASS_INSTANCE = EmailAttachment;
            const EXPECTED_EMAIL_ATTACHEMENT = _.assign({}, cachedEmailAttachmentData[4]);

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(cachedEmailAttachmentData[4]);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error === undefined).to.be.true;
            expect((validateAsyncResponse.value as any) !== undefined).to.be.true;
            expect((validateAsyncResponse.value as any) instanceof EXPECTED_EMAIL_ATTACHEMENT_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.value as any).filename !== undefined).to.be.true;
            expect((validateAsyncResponse.value as any).filename === EXPECTED_EMAIL_ATTACHEMENT.filename).to.be.true;
            expect((validateAsyncResponse.value as any).content !== undefined).to.be.true;
            expect((validateAsyncResponse.value as any).content === EXPECTED_EMAIL_ATTACHEMENT.content).to.be.true;
            expect((validateAsyncResponse.value as any).encoding !== undefined).to.be.true;
            expect((validateAsyncResponse.value as any).encoding === EXPECTED_EMAIL_ATTACHEMENT.encoding).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAttachment = _.assign({}, cachedEmailAttachmentData[4], { filename: 1 });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'filename';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(updateEmailAttachment);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateAsyncResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateAsyncResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAttachment = _.assign({}, cachedEmailAttachmentData[4], { filename: true });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'filename';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(updateEmailAttachment);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateAsyncResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateAsyncResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAttachment = _.assign({}, cachedEmailAttachmentData[4], { content: 1 });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'content';
            const EXPECTED_ERROR_TYPE = 'bufferOrString';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(updateEmailAttachment);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateAsyncResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateAsyncResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAttachment = _.assign({}, cachedEmailAttachmentData[4], { content: true });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'content';
            const EXPECTED_ERROR_TYPE = 'bufferOrString';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(updateEmailAttachment);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateAsyncResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateAsyncResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAttachment = _.assign({}, cachedEmailAttachmentData[4], { encoding: 1 });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'encoding';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(updateEmailAttachment);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateAsyncResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateAsyncResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAttachment = _.assign({}, cachedEmailAttachmentData[4], { encoding: true });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'encoding';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(updateEmailAttachment);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateAsyncResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateAsyncResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly asynchronously validate an email attachment instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAttachment = _.assign({}, cachedEmailAttachmentData[4], { filename: 1, content: 1, encoding: 1 });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_POSSIBLE_ERROR_PATHS = ['filename', 'content', 'encoding'];
            const EXPECTED_POSSIBLE_ERROR_TYPES = ['typeError', 'typeError', 'bufferOrString'];

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(updateEmailAttachment);
            const validateAsyncResponse = await emailAttachment.validateAsync();

            // run assertions
            expect(validateAsyncResponse !== undefined).to.be.true;
            expect(validateAsyncResponse.error !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateAsyncResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateAsyncResponse.error as ValidationError).path !== undefined).to.be.true;
            expect(EXPECTED_POSSIBLE_ERROR_PATHS.includes((validateAsyncResponse.error as ValidationError).path as string)).to.be.true;
            expect((validateAsyncResponse.error as ValidationError).type !== undefined).to.be.true;
            expect(EXPECTED_POSSIBLE_ERROR_TYPES.includes((validateAsyncResponse.error as ValidationError).type as string)).to.be.true;

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
      // run custom tear downs
      await customTearDown();

      // return explicitly
      return;
    } catch (err) {
      // throw explicitly
      throw err;
    }
  });
});
