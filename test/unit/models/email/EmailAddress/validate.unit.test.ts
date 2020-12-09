/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import { expect } from 'chai';
import * as _ from 'lodash';
import { ValidationError } from 'yup';

// models
import { EmailAddress } from '../../../../../src/models/email';
import { readStaticEmailAddressData } from '../../../../data/static/email/EmailAddress';

// file constants/functions
let staticEmailAddressData: any | any[];
let cachedEmailAddressData: any | any[];

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
describe('models/email/EmailAddress.ts - unit tests', () => {
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

  describe('#validate', () => {
    context('EmailAddress({ name, address })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // set data holders
            staticEmailAddressData = await readStaticEmailAddressData(2);

            cachedEmailAddressData = staticEmailAddressData.slice();

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        afterEach(async () => {
          try {
            // reset data holders
            staticEmailAddressData = undefined;
            cachedEmailAddressData = undefined;

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly validate an email address instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // set expectations
            const EXPECTED_EMAIL_ADDRESS_CLASS_INSTANCE = EmailAddress;
            const EXPECTED_EMAIL_ADDRESS = _.assign({}, cachedEmailAddressData[0]);

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAddress = new EmailAddress(cachedEmailAddressData[0]);
            const validateResponse = emailAddress.validate();

            // run assertions
            expect(validateResponse !== undefined).to.be.true;
            expect(validateResponse.error === undefined).to.be.true;
            expect((validateResponse.value as any) !== undefined).to.be.true;
            expect((validateResponse.value as any) instanceof EXPECTED_EMAIL_ADDRESS_CLASS_INSTANCE).to.be.true;
            expect((validateResponse.value as any).name !== undefined).to.be.true;
            expect((validateResponse.value as any).name === EXPECTED_EMAIL_ADDRESS.name).to.be.true;
            expect((validateResponse.value as any).address !== undefined).to.be.true;
            expect((validateResponse.value as any).address === EXPECTED_EMAIL_ADDRESS.address).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly validate an email address instance and throw appropriate errors when found (name)', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAddress = _.assign({}, cachedEmailAddressData[0], { name: 1 });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'name';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAddress = new EmailAddress(updateEmailAddress);
            const validateResponse = emailAddress.validate();

            // run assertions
            expect(validateResponse !== undefined).to.be.true;
            expect(validateResponse.error !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly validate an email address instance and throw appropriate errors when found (name)', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAddress = _.assign({}, cachedEmailAddressData[0], { name: true });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'name';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAddress = new EmailAddress(updateEmailAddress);
            const validateResponse = emailAddress.validate();

            // run assertions
            expect(validateResponse !== undefined).to.be.true;
            expect(validateResponse.error !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly validate an email address instance and throw appropriate errors when found (address)', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAddress = _.assign({}, cachedEmailAddressData[0], { address: 1 });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'address';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAddress = new EmailAddress(updateEmailAddress);
            const validateResponse = emailAddress.validate();

            // run assertions
            expect(validateResponse !== undefined).to.be.true;
            expect(validateResponse.error !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly validate an email address instance and throw appropriate errors when found (address)', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAddress = _.assign({}, cachedEmailAddressData[0], { address: false });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'address';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAddress = new EmailAddress(updateEmailAddress);
            const validateResponse = emailAddress.validate();

            // run assertions
            expect(validateResponse !== undefined).to.be.true;
            expect(validateResponse.error !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly validate an email address instance and throw appropriate errors when found (address)', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAddress = _.assign({}, cachedEmailAddressData[0], { address: undefined });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'address';
            const EXPECTED_ERROR_TYPE = 'required';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAddress = new EmailAddress(updateEmailAddress);
            const validateResponse = emailAddress.validate();

            // run assertions
            expect(validateResponse !== undefined).to.be.true;
            expect(validateResponse.error !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly validate an email address instance and throw appropriate errors when found (name or address)', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAddress = _.assign({}, cachedEmailAddressData[0], { name: 1, address: 1 });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_POSSIBLE_ERROR_PATHS = ['name', 'address'];
            const EXPECTED_POSSIBLE_ERROR_TYPES = ['typeError', 'typeError'];

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAddress = new EmailAddress(updateEmailAddress);
            const validateResponse = emailAddress.validate();

            // run assertions
            expect(validateResponse !== undefined).to.be.true;
            expect(validateResponse.error !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateResponse.error as ValidationError).path !== undefined).to.be.true;
            expect(EXPECTED_POSSIBLE_ERROR_PATHS.includes((validateResponse.error as ValidationError).path as string)).to.be.true;
            expect((validateResponse.error as ValidationError).type !== undefined).to.be.true;
            expect(EXPECTED_POSSIBLE_ERROR_TYPES.includes((validateResponse.error as ValidationError).type as string)).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });
      });
    });

    context('EmailAddress({ address })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // set data holders
            staticEmailAddressData = await readStaticEmailAddressData(2);

            cachedEmailAddressData = staticEmailAddressData.slice();

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        afterEach(async () => {
          try {
            // reset data holders
            staticEmailAddressData = undefined;
            cachedEmailAddressData = undefined;

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly validate an email address instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // set expectations
            const EXPECTED_EMAIL_ADDRESS_CLASS_INSTANCE = EmailAddress;
            const EXPECTED_EMAIL_ADDRESS = _.assign({}, cachedEmailAddressData[1]);

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAddress = new EmailAddress(cachedEmailAddressData[1]);
            const validateResponse = emailAddress.validate();

            // run assertions
            expect(validateResponse !== undefined).to.be.true;
            expect(validateResponse.error === undefined).to.be.true;
            expect((validateResponse.value as any) !== undefined).to.be.true;
            expect((validateResponse.value as any) instanceof EXPECTED_EMAIL_ADDRESS_CLASS_INSTANCE).to.be.true;
            expect((validateResponse.value as any).address !== undefined).to.be.true;
            expect((validateResponse.value as any).address === EXPECTED_EMAIL_ADDRESS.address).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly validate an email address instance and throw appropriate errors when found (address)', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAddress = _.assign({}, cachedEmailAddressData[1], { address: 1 });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'address';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAddress = new EmailAddress(updateEmailAddress);
            const validateResponse = emailAddress.validate();

            // run assertions
            expect(validateResponse !== undefined).to.be.true;
            expect(validateResponse.error !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly validate an email address instance and throw appropriate errors when found (address)', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAddress = _.assign({}, cachedEmailAddressData[1], { address: false });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'address';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAddress = new EmailAddress(updateEmailAddress);
            const validateResponse = emailAddress.validate();

            // run assertions
            expect(validateResponse !== undefined).to.be.true;
            expect(validateResponse.error !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly validate an email address instance and throw appropriate errors when found (address)', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateEmailAddress = _.assign({}, cachedEmailAddressData[1], { address: undefined });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'address';
            const EXPECTED_ERROR_TYPE = 'required';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAddress = new EmailAddress(updateEmailAddress);
            const validateResponse = emailAddress.validate();

            // run assertions
            expect(validateResponse !== undefined).to.be.true;
            expect(validateResponse.error !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).errors !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).errors instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect((validateResponse.error as ValidationError).errors.length === EXPECTED_ERRORS_LENGTH).to.be.true;
            for (const error of (validateResponse.error as ValidationError).errors) {
              expect(typeof error === EPECTED_TYPE_OF_STRING).to.be.true;
            }
            expect((validateResponse.error as ValidationError).path !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).path === EXPECTED_ERROR_PATH).to.be.true;
            expect((validateResponse.error as ValidationError).type !== undefined).to.be.true;
            expect((validateResponse.error as ValidationError).type === EXPECTED_ERROR_TYPE).to.be.true;

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
