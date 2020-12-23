/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import { expect } from 'chai';
import * as _ from 'lodash';
import { ValidationError } from 'yup';

// models
import { Email } from '../../../../../src/models/email';
import { readStaticEmailData } from '../../../../data/static/email/Email';

// file constants/functions
let staticEmailData: any | any[];
let cachedEmailData: any | any[];

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
describe('models/email/Email.ts - unit tests', () => {
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
    context(
      'Email({ from: EmailAddress, to: EmailAddress, cc: EmailAddress, bcc: EmailAddress, subject, text, attachments: EmailAttachment[] })',
      () => {
        context('static data', () => {
          beforeEach(async () => {
            try {
              // set data holders
              staticEmailData = await readStaticEmailData(3);

              cachedEmailData = staticEmailData.slice();

              // return explicitly
            } catch (err) {
              // throw explicitly
              throw err;
            }
          });

          afterEach(async () => {
            try {
              // reset data holders
              staticEmailData = undefined;
              cachedEmailData = undefined;

              // return explicitly
            } catch (err) {
              // throw explicitly
              throw err;
            }
          });

          it('- should correctly asynchronously validate an email instance and throw appropriate errors when found', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // set expectations
              const EXPECTED_EMAIL_ADDRESS_CLASS_INSTANCE = Email;
              const EXPECTED_EMAIL_ADDRESS = _.assign({}, cachedEmailData[0]);
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const email = new Email(cachedEmailData[0]);
              const validateAsyncResponse = await email.validateAsync();

              // run assertions
              expect(validateAsyncResponse !== undefined).to.be.true;
              expect(validateAsyncResponse.error === undefined).to.be.true;
              expect((validateAsyncResponse.value as any) !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any) instanceof EXPECTED_EMAIL_ADDRESS_CLASS_INSTANCE).to.be.true;
              expect((validateAsyncResponse.value as any).from !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any).from.name !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any).from.name === EXPECTED_EMAIL_ADDRESS.from.name).to.be.true;
              expect((validateAsyncResponse.value as any).from.address !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any).from.address === EXPECTED_EMAIL_ADDRESS.from.address).to.be.true;
              for (const item of email.to as any) {
                const found = EXPECTED_EMAIL_ADDRESS.to.find((expectedItem: any) => expectedItem.address === item.address);
                expect(found !== undefined).to.be.true;
              }
              expect((email.cc as any) !== undefined).to.be.true;
              expect((email.cc as any) instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
              for (const item of email.cc as any) {
                const found = EXPECTED_EMAIL_ADDRESS.cc.find((expectedItem: any) => expectedItem.address === item.address);
                expect(found !== undefined).to.be.true;
              }
              expect((email.bcc as any) !== undefined).to.be.true;
              expect((email.bcc as any) instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
              for (const item of email.bcc as any) {
                const found = EXPECTED_EMAIL_ADDRESS.bcc.find((expectedItem: any) => expectedItem.address === item.address);
                expect(found !== undefined).to.be.true;
              }
              expect((validateAsyncResponse.value as any).subject !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any).subject === EXPECTED_EMAIL_ADDRESS.subject).to.be.true;
              expect((validateAsyncResponse.value as any).text !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any).text === EXPECTED_EMAIL_ADDRESS.text).to.be.true;
              expect((validateAsyncResponse.value as any).attachments !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any).attachments instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
              for (const item of (validateAsyncResponse.value as any).attachments) {
                const found = EXPECTED_EMAIL_ADDRESS.attachments.find((expectedItem: any) => expectedItem.path === item.path);
                expect(found !== undefined).to.be.true;
              }

              // return explicitly
              return;
            } catch (err) {
              // throw explicitly
              throw err;
            }
          });

          it('- should correctly asynchronously validate an email instance and throw appropriate errors when found (from)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateEmail = _.assign({}, cachedEmailData[0], { from: 1 });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'from.address';
              const EXPECTED_ERROR_TYPE = 'required';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const email = new Email(updateEmail);
              const validateAsyncResponse = await email.validateAsync();

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

          it('- should correctly asynchronously validate an email instance and throw appropriate errors when found (from)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateEmail = _.assign({}, cachedEmailData[0], { from: false });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'from.address';
              const EXPECTED_ERROR_TYPE = 'required';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const email = new Email(updateEmail);
              const validateAsyncResponse = await email.validateAsync();

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

          it('- should correctly asynchronously validate an email instance and throw appropriate errors when found (to)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateEmail = _.assign({}, cachedEmailData[0], { to: 1 });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'to';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const email = new Email(updateEmail);
              const validateAsyncResponse = await email.validateAsync();

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

          it('- should correctly asynchronously validate an email instance and throw appropriate errors when found (to)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateEmail = _.assign({}, cachedEmailData[0], { to: true });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'to';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const email = new Email(updateEmail);
              const validateAsyncResponse = await email.validateAsync();

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

          it('- should correctly asynchronously validate an email instance and throw appropriate errors when found (cc)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateEmail = _.assign({}, cachedEmailData[0], { cc: 1 });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'cc';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const email = new Email(updateEmail);
              const validateAsyncResponse = await email.validateAsync();

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

          it('- should correctly asynchronously validate an email instance and throw appropriate errors when found (cc)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateEmail = _.assign({}, cachedEmailData[0], { cc: true });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'cc';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const email = new Email(updateEmail);
              const validateAsyncResponse = await email.validateAsync();

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

          it('- should correctly asynchronously validate an email instance and throw appropriate errors when found (bcc)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateEmail = _.assign({}, cachedEmailData[0], { bcc: 1 });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'bcc';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const email = new Email(updateEmail);
              const validateAsyncResponse = await email.validateAsync();

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

          it('- should correctly asynchronously validate an email instance and throw appropriate errors when found (bcc)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateEmail = _.assign({}, cachedEmailData[0], { bcc: true });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'bcc';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const email = new Email(updateEmail);
              const validateAsyncResponse = await email.validateAsync();

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

          it('- should correctly asynchronously validate an email instance and throw appropriate errors when found (subject)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateEmail = _.assign({}, cachedEmailData[0], { subject: 1 });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'subject';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const email = new Email(updateEmail);
              const validateAsyncResponse = await email.validateAsync();

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

          it('- should correctly asynchronously validate an email instance and throw appropriate errors when found (subject)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateEmail = _.assign({}, cachedEmailData[0], { subject: true });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'subject';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const email = new Email(updateEmail);
              const validateAsyncResponse = await email.validateAsync();

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

          it('- should correctly asynchronously validate an email instance and throw appropriate errors when found (text)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateEmail = _.assign({}, cachedEmailData[0], { text: 1 });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'text';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const email = new Email(updateEmail);
              const validateAsyncResponse = await email.validateAsync();

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

          it('- should correctly asynchronously validate an email instance and throw appropriate errors when found (text)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateEmail = _.assign({}, cachedEmailData[0], { text: true });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'text';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const email = new Email(updateEmail);
              const validateAsyncResponse = await email.validateAsync();

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

          it('- should correctly asynchronously validate an email instance and throw appropriate errors when found (attachments)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateEmail = _.assign({}, cachedEmailData[0], { attachments: 1 });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'attachments';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const email = new Email(updateEmail);
              const validateAsyncResponse = await email.validateAsync();

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

          it('- should correctly asynchronously validate an email instance and throw appropriate errors when found (attachments)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateEmail = _.assign({}, cachedEmailData[0], { attachments: true });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'attachments';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const email = new Email(updateEmail);
              const validateAsyncResponse = await email.validateAsync();

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

          it('- should correctly asynchronously validate an email instance and throw appropriate errors when found (from, to, cc, bcc, subject, text, or attachments)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateEmail = _.assign({}, cachedEmailData[0], { to: 1, from: 1, cc: 1, bcc: 1, subject: 1, text: 1, attachments: 1 });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_POSSIBLE_ERROR_PATHS = ['from', 'to', 'cc', 'bcc', 'subject', 'text', 'attachments'];
              const EXPECTED_POSSIBLE_ERROR_TYPES = [
                'typeError',
                'typeError',
                'typeError',
                'typeError',
                'typeError',
                'typeError',
                'typeError',
              ];

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const email = new Email(updateEmail);
              const validateAsyncResponse = await email.validateAsync();

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
      },
    );

    context(
      'Email({ from: EmailAddress, to: EmailAddress[], cc: EmailAddress[], bcc: EmailAddress[], subject, text, attachments: EmailAttachment[] })',
      () => {
        context('static data', () => {
          beforeEach(async () => {
            try {
              // set data holders
              staticEmailData = await readStaticEmailData(3);

              cachedEmailData = staticEmailData.slice();

              // return explicitly
            } catch (err) {
              // throw explicitly
              throw err;
            }
          });

          afterEach(async () => {
            try {
              // reset data holders
              staticEmailData = undefined;
              cachedEmailData = undefined;

              // return explicitly
            } catch (err) {
              // throw explicitly
              throw err;
            }
          });

          it('- should correctly asynchronously validate an email instance and throw appropriate errors when found', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // set expectations
              const EXPECTED_EMAIL_ADDRESS_CLASS_INSTANCE = Email;
              const EXPECTED_EMAIL_ADDRESS = _.assign({}, cachedEmailData[1]);
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const email = new Email(cachedEmailData[1]);
              const validateAsyncResponse = await email.validateAsync();

              // run assertions
              expect(validateAsyncResponse !== undefined).to.be.true;
              expect(validateAsyncResponse.error === undefined).to.be.true;
              expect((validateAsyncResponse.value as any) !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any) instanceof EXPECTED_EMAIL_ADDRESS_CLASS_INSTANCE).to.be.true;
              expect((validateAsyncResponse.value as any).from !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any).from.name !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any).from.name === EXPECTED_EMAIL_ADDRESS.from.name).to.be.true;
              expect((validateAsyncResponse.value as any).from.address !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any).from.address === EXPECTED_EMAIL_ADDRESS.from.address).to.be.true;
              expect((validateAsyncResponse.value as any).to !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any).to instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
              for (const item of (validateAsyncResponse.value as any).to) {
                const found = EXPECTED_EMAIL_ADDRESS.to.find((expectedItem: any) => expectedItem.address === item.address);
                expect(found !== undefined).to.be.true;
              }
              expect((validateAsyncResponse.value as any).cc !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any).cc instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
              for (const item of (validateAsyncResponse.value as any).cc) {
                const found = EXPECTED_EMAIL_ADDRESS.cc.find((expectedItem: any) => expectedItem.address === item.address);
                expect(found !== undefined).to.be.true;
              }
              expect((validateAsyncResponse.value as any).bcc !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any).bcc instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
              for (const item of (validateAsyncResponse.value as any).bcc) {
                const found = EXPECTED_EMAIL_ADDRESS.bcc.find((expectedItem: any) => expectedItem.address === item.address);
                expect(found !== undefined).to.be.true;
              }
              expect((validateAsyncResponse.value as any).subject !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any).subject === EXPECTED_EMAIL_ADDRESS.subject).to.be.true;
              expect((validateAsyncResponse.value as any).text !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any).text === EXPECTED_EMAIL_ADDRESS.text).to.be.true;
              expect((validateAsyncResponse.value as any).attachments !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any).attachments instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
              for (const item of (validateAsyncResponse.value as any).attachments) {
                const found = EXPECTED_EMAIL_ADDRESS.attachments.find((expectedItem: any) => expectedItem.path === item.path);
                expect(found !== undefined).to.be.true;
              }

              // return explicitly
              return;
            } catch (err) {
              // throw explicitly
              throw err;
            }
          });

          it('- should correctly asynchronously validate an email instance and throw appropriate errors when found (to)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateEmail = _.assign({}, cachedEmailData[1], { to: 1 });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'to';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const email = new Email(updateEmail);
              const validateAsyncResponse = await email.validateAsync();

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

          it('- should correctly asynchronously validate an email instance and throw appropriate errors when found (to)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateEmail = _.assign({}, cachedEmailData[1], { to: true });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'to';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const email = new Email(updateEmail);
              const validateAsyncResponse = await email.validateAsync();

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

          it('- should correctly asynchronously validate an email instance and throw appropriate errors when found (cc)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateEmail = _.assign({}, cachedEmailData[0], { cc: 1 });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'cc';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const email = new Email(updateEmail);
              const validateAsyncResponse = await email.validateAsync();

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

          it('- should correctly asynchronously validate an email instance and throw appropriate errors when found (cc)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateEmail = _.assign({}, cachedEmailData[0], { cc: true });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'cc';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const email = new Email(updateEmail);
              const validateAsyncResponse = await email.validateAsync();

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

          it('- should correctly asynchronously validate an email instance and throw appropriate errors when found (bcc)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateEmail = _.assign({}, cachedEmailData[0], { bcc: 1 });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'bcc';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const email = new Email(updateEmail);
              const validateAsyncResponse = await email.validateAsync();

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

          it('- should correctly asynchronously validate an email instance and throw appropriate errors when found (bcc)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateEmail = _.assign({}, cachedEmailData[0], { bcc: true });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'bcc';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const email = new Email(updateEmail);
              const validateAsyncResponse = await email.validateAsync();

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
      },
    );

    context(
      'Email({ from: EmailAddress, to: EmailAddress, cc: EmailAddress, bcc: EmailAddress, subject, html, attachments: EmailAttachment[] })',
      () => {
        context('static data', () => {
          beforeEach(async () => {
            try {
              // set data holders
              staticEmailData = await readStaticEmailData(3);

              cachedEmailData = staticEmailData.slice();

              // return explicitly
            } catch (err) {
              // throw explicitly
              throw err;
            }
          });

          afterEach(async () => {
            try {
              // reset data holders
              staticEmailData = undefined;
              cachedEmailData = undefined;

              // return explicitly
            } catch (err) {
              // throw explicitly
              throw err;
            }
          });

          it('- should correctly asynchronously validate an email instance and throw appropriate errors when found', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // set expectations
              const EXPECTED_EMAIL_ADDRESS_CLASS_INSTANCE = Email;
              const EXPECTED_EMAIL_ADDRESS = _.assign({}, cachedEmailData[2]);
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const email = new Email(cachedEmailData[2]);
              const validateAsyncResponse = await email.validateAsync();

              // run assertions
              expect(validateAsyncResponse !== undefined).to.be.true;
              expect(validateAsyncResponse.error === undefined).to.be.true;
              expect((validateAsyncResponse.value as any) !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any) instanceof EXPECTED_EMAIL_ADDRESS_CLASS_INSTANCE).to.be.true;
              expect((validateAsyncResponse.value as any).from !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any).from.name !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any).from.name === EXPECTED_EMAIL_ADDRESS.from.name).to.be.true;
              expect((validateAsyncResponse.value as any).from.address !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any).from.address === EXPECTED_EMAIL_ADDRESS.from.address).to.be.true;
              expect((validateAsyncResponse.value as any).to !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any).to instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
              for (const item of (validateAsyncResponse.value as any).to) {
                const found = EXPECTED_EMAIL_ADDRESS.to.find((expectedItem: any) => expectedItem.address === item.address);
                expect(found !== undefined).to.be.true;
              }
              expect((validateAsyncResponse.value as any).cc !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any).cc instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
              for (const item of (validateAsyncResponse.value as any).cc) {
                const found = EXPECTED_EMAIL_ADDRESS.cc.find((expectedItem: any) => expectedItem.address === item.address);
                expect(found !== undefined).to.be.true;
              }
              expect((validateAsyncResponse.value as any).bcc !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any).bcc instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
              for (const item of (validateAsyncResponse.value as any).bcc) {
                const found = EXPECTED_EMAIL_ADDRESS.bcc.find((expectedItem: any) => expectedItem.address === item.address);
                expect(found !== undefined).to.be.true;
              }
              expect((validateAsyncResponse.value as any).subject !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any).subject === EXPECTED_EMAIL_ADDRESS.subject).to.be.true;
              expect((validateAsyncResponse.value as any).html !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any).html === EXPECTED_EMAIL_ADDRESS.html).to.be.true;
              expect((validateAsyncResponse.value as any).attachments !== undefined).to.be.true;
              expect((validateAsyncResponse.value as any).attachments instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
              for (const item of (validateAsyncResponse.value as any).attachments) {
                const found = EXPECTED_EMAIL_ADDRESS.attachments.find((expectedItem: any) => expectedItem.path === item.path);
                expect(found !== undefined).to.be.true;
              }

              // return explicitly
              return;
            } catch (err) {
              // throw explicitly
              throw err;
            }
          });

          it('- should correctly asynchronously validate an email instance and throw appropriate errors when found (html)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateEmail = _.assign({}, cachedEmailData[2], { html: 1 });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'html';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const email = new Email(updateEmail);
              const validateAsyncResponse = await email.validateAsync();

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

          it('- should correctly asynchronously validate an email instance and throw appropriate errors when found (html)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateEmail = _.assign({}, cachedEmailData[2], { html: true });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'html';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const email = new Email(updateEmail);
              const validateAsyncResponse = await email.validateAsync();

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
      },
    );
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
