/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import { expect } from 'chai';
import * as _ from 'lodash';
import { ValidationError } from 'yup';

// models
import { UserToken } from '../../../../../src/models/user';
import { readStaticUserTokenData } from '../../../../data/static/user/UserToken';

// file constants/functions
let staticUserTokenData: any | any[];
let cachedUserTokenData: any | any[];

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
describe('models/userToken/UserToken.ts - unit tests', () => {
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
    context(
      'UserToken({ userId, tokenType, userTokenId, token, relatedTokenIds, expireDate, createdDate, createdIp, revokedDate, revokedIp })',
      () => {
        context('static data', () => {
          beforeEach(async () => {
            try {
              // set data holders
              staticUserTokenData = await readStaticUserTokenData(3);

              cachedUserTokenData = staticUserTokenData.slice();

              // return explicitly
            } catch (err) {
              // throw explicitly
              throw err;
            }
          });

          afterEach(async () => {
            try {
              // reset data holders
              staticUserTokenData = undefined;
              cachedUserTokenData = undefined;

              // return explicitly
            } catch (err) {
              // throw explicitly
              throw err;
            }
          });

          it('- should correctly asynchronously validate an user token instance and throw appropriate errors when found', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // set expectations
              const EXPECTED_USER_TOKEN_CLASS_INSTANCE = UserToken;
              const EXPECTED_USER_TOKEN = _.assign({}, cachedUserTokenData[0]);
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const userToken = new UserToken(cachedUserTokenData[0]);
              const validateResponse = await userToken.validateAsync();

              // run assertions
              expect(validateResponse !== undefined).to.be.true;
              expect(validateResponse.error === undefined).to.be.true;
              expect((validateResponse.value as any) !== undefined).to.be.true;
              expect((validateResponse.value as any) instanceof EXPECTED_USER_TOKEN_CLASS_INSTANCE).to.be.true;
              expect(userToken.userId !== undefined).to.be.true;
              expect(userToken.userId === EXPECTED_USER_TOKEN.userId).to.be.true;
              expect(userToken.tokenType !== undefined).to.be.true;
              expect(userToken.tokenType === EXPECTED_USER_TOKEN.tokenType).to.be.true;
              expect(userToken.userTokenId !== undefined).to.be.true;
              expect(userToken.userTokenId === EXPECTED_USER_TOKEN.userTokenId).to.be.true;
              expect(userToken.token !== undefined).to.be.true;
              expect(userToken.token === EXPECTED_USER_TOKEN.token).to.be.true;
              expect(userToken.relatedTokenIds !== undefined).to.be.true;
              expect(userToken.relatedTokenIds instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
              expect(userToken.relatedTokenIds.length === EXPECTED_USER_TOKEN.relatedTokenIds.length).to.be.true;
              for (const item of userToken.relatedTokenIds) {
                expect(EXPECTED_USER_TOKEN.relatedTokenIds.find((expectedItem: any) => expectedItem === item) !== undefined).to.be.true;
              }

              // return explicitly
              return;
            } catch (err) {
              // throw explicitly
              throw err;
            }
          });

          it('- should correctly asynchronously validate an user token instance and throw appropriate errors when found (userId)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateUserToken = _.assign({}, cachedUserTokenData[0], { userId: 1 });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'userId';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const userToken = new UserToken(updateUserToken);
              const validateResponse = await userToken.validateAsync();

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

          it('- should correctly asynchronously validate an user token instance and throw appropriate errors when found (userId)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateUserToken = _.assign({}, cachedUserTokenData[0], { userId: true });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'userId';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const userToken = new UserToken(updateUserToken);
              const validateResponse = await userToken.validateAsync();

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

          it('- should correctly asynchronously validate an user token instance and throw appropriate errors when found (tokenType)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateUserToken = _.assign({}, cachedUserTokenData[0], { tokenType: 1 });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'tokenType';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const userToken = new UserToken(updateUserToken);
              const validateResponse = await userToken.validateAsync();

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

          it('- should correctly asynchronously validate an user token instance and throw appropriate errors when found (tokenType)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateUserToken = _.assign({}, cachedUserTokenData[0], { tokenType: true });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'tokenType';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const userToken = new UserToken(updateUserToken);
              const validateResponse = await userToken.validateAsync();

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

          it('- should correctly asynchronously validate an user token instance and throw appropriate errors when found (userTokenId)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateUserToken = _.assign({}, cachedUserTokenData[0], { userTokenId: 1 });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'userTokenId';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const userToken = new UserToken(updateUserToken);
              const validateResponse = await userToken.validateAsync();

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

          it('- should correctly asynchronously validate an user token instance and throw appropriate errors when found (userTokenId)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateUserToken = _.assign({}, cachedUserTokenData[0], { userTokenId: true });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'userTokenId';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const userToken = new UserToken(updateUserToken);
              const validateResponse = await userToken.validateAsync();

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

          it('- should correctly asynchronously validate an user token instance and throw appropriate errors when found (token)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateUserToken = _.assign({}, cachedUserTokenData[0], { token: 1 });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'token';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const userToken = new UserToken(updateUserToken);
              const validateResponse = await userToken.validateAsync();

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

          it('- should correctly asynchronously validate an user token instance and throw appropriate errors when found (token)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateUserToken = _.assign({}, cachedUserTokenData[0], { token: true });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'token';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const userToken = new UserToken(updateUserToken);
              const validateResponse = await userToken.validateAsync();

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

          it('- should correctly asynchronously validate an user token instance and throw appropriate errors when found (relatedTokenIds)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateUserToken = _.assign({}, cachedUserTokenData[0], { relatedTokenIds: 1 });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'relatedTokenIds';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const userToken = new UserToken(updateUserToken);
              const validateResponse = await userToken.validateAsync();

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

          it('- should correctly asynchronously validate an user token instance and throw appropriate errors when found (relatedTokenIds)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateUserToken = _.assign({}, cachedUserTokenData[0], { relatedTokenIds: true });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'relatedTokenIds';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const userToken = new UserToken(updateUserToken);
              const validateResponse = await userToken.validateAsync();

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

          it('- should correctly asynchronously validate an user token instance and throw appropriate errors when found (expireDate)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateUserToken = _.assign({}, cachedUserTokenData[0], { expireDate: '' });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'expireDate';
              const EXPECTED_ERROR_TYPE = 'is-date';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const userToken = new UserToken(updateUserToken);
              const validateResponse = await userToken.validateAsync();

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

          it('- should correctly asynchronously validate an user token instance and throw appropriate errors when found (expireDate)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateUserToken = _.assign({}, cachedUserTokenData[0], { expireDate: true });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'expireDate';
              const EXPECTED_ERROR_TYPE = 'is-date';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const userToken = new UserToken(updateUserToken);
              const validateResponse = await userToken.validateAsync();

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

          it('- should correctly asynchronously validate an user token instance and throw appropriate errors when found (createdDate)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateUserToken = _.assign({}, cachedUserTokenData[0], { createdDate: '' });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'createdDate';
              const EXPECTED_ERROR_TYPE = 'is-date';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const userToken = new UserToken(updateUserToken);
              const validateResponse = await userToken.validateAsync();

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

          it('- should correctly asynchronously validate an user token instance and throw appropriate errors when found (createdDate)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateUserToken = _.assign({}, cachedUserTokenData[0], { createdDate: true });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'createdDate';
              const EXPECTED_ERROR_TYPE = 'is-date';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const userToken = new UserToken(updateUserToken);
              const validateResponse = await userToken.validateAsync();

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

          it('- should correctly asynchronously validate an user token instance and throw appropriate errors when found (createdIp)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateUserToken = _.assign({}, cachedUserTokenData[0], { createdIp: 1 });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'createdIp';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const userToken = new UserToken(updateUserToken);
              const validateResponse = await userToken.validateAsync();

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

          it('- should correctly asynchronously validate an user token instance and throw appropriate errors when found (createdIp)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateUserToken = _.assign({}, cachedUserTokenData[0], { createdIp: true });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'createdIp';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const userToken = new UserToken(updateUserToken);
              const validateResponse = await userToken.validateAsync();

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

          it('- should correctly asynchronously validate an user token instance and throw appropriate errors when found (revokedDate)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateUserToken = _.assign({}, cachedUserTokenData[0], { revokedDate: '' });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'revokedDate';
              const EXPECTED_ERROR_TYPE = 'is-date';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const userToken = new UserToken(updateUserToken);
              const validateResponse = await userToken.validateAsync();

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

          it('- should correctly asynchronously validate an user token instance and throw appropriate errors when found (revokedDate)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateUserToken = _.assign({}, cachedUserTokenData[0], { revokedDate: true });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'revokedDate';
              const EXPECTED_ERROR_TYPE = 'is-date';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const userToken = new UserToken(updateUserToken);
              const validateResponse = await userToken.validateAsync();

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

          it('- should correctly asynchronously validate an user token instance and throw appropriate errors when found (revokedIp)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateUserToken = _.assign({}, cachedUserTokenData[0], { revokedIp: 1 });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'revokedIp';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const userToken = new UserToken(updateUserToken);
              const validateResponse = await userToken.validateAsync();

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

          it('- should correctly asynchronously validate an user token instance and throw appropriate errors when found (revokedIp)', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // update data needed for test
              const updateUserToken = _.assign({}, cachedUserTokenData[0], { revokedIp: true });

              // set expectations
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
              const EPECTED_TYPE_OF_STRING = 'string';
              const EXPECTED_ERRORS_LENGTH = 1;
              const EXPECTED_ERROR_PATH = 'revokedIp';
              const EXPECTED_ERROR_TYPE = 'typeError';

              /////////////////////////
              //////// test //////////
              /////////////////////////
              // run testee
              const userToken = new UserToken(updateUserToken);
              const validateResponse = await userToken.validateAsync();

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
