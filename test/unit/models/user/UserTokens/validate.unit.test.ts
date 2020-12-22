/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import { expect } from 'chai';
import * as _ from 'lodash';
import { ValidationError } from 'yup';

// models
import { UserTokens } from '../../../../../src/models/user';
import { readStaticUserTokensData } from '../../../../data/static/user/UserTokens';

// file constants/functions
let staticUserTokensData: any | any[];
let cachedUserTokensData: any | any[];

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
describe('models/userTokens/UserTokens.ts - unit tests', () => {
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
    context('UserTokens({ jwt, refreshToken })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // set data holders
            staticUserTokensData = await readStaticUserTokensData(3);

            cachedUserTokensData = staticUserTokensData.slice();

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        afterEach(async () => {
          try {
            // reset data holders
            staticUserTokensData = undefined;
            cachedUserTokensData = undefined;

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly validate an user tokens instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // set expectations
            const EXPECTED_USER_TOKENS_CLASS_INSTANCE = UserTokens;
            const EXPECTED_USER_TOKENS = _.assign({}, cachedUserTokensData[0]);

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const userTokens = new UserTokens(cachedUserTokensData[0]);
            const validateResponse = userTokens.validate();

            // run assertions
            expect(validateResponse !== undefined).to.be.true;
            expect(validateResponse.error === undefined).to.be.true;
            expect((validateResponse.value as any) !== undefined).to.be.true;
            expect((validateResponse.value as any) instanceof EXPECTED_USER_TOKENS_CLASS_INSTANCE).to.be.true;
            expect((validateResponse.value as any).jwt !== undefined).to.be.true;
            expect((validateResponse.value as any).jwt === EXPECTED_USER_TOKENS.jwt).to.be.true;
            expect((validateResponse.value as any).refreshToken !== undefined).to.be.true;
            expect((validateResponse.value as any).refreshToken === EXPECTED_USER_TOKENS.refreshToken).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly validate an user tokens instance and throw appropriate errors when found (jwt)', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateUserTokens = _.assign({}, cachedUserTokensData[0], { jwt: 1 });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'jwt';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const userTokens = new UserTokens(updateUserTokens);
            const validateResponse = userTokens.validate();

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

        it('- should correctly validate an user tokens instance and throw appropriate errors when found (jwt)', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateUserTokens = _.assign({}, cachedUserTokensData[0], { jwt: true });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'jwt';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const userTokens = new UserTokens(updateUserTokens);
            const validateResponse = userTokens.validate();

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

        it('- should correctly validate an user tokens instance and throw appropriate errors when found (refreshToken)', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateUserTokens = _.assign({}, cachedUserTokensData[0], { refreshToken: 1 });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'refreshToken';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const userTokens = new UserTokens(updateUserTokens);
            const validateResponse = userTokens.validate();

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

        it('- should correctly validate an user tokens instance and throw appropriate errors when found (refreshToken)', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateUserTokens = _.assign({}, cachedUserTokensData[0], { refreshToken: true });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'refreshToken';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const userTokens = new UserTokens(updateUserTokens);
            const validateResponse = userTokens.validate();

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
