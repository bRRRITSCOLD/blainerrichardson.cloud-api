/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import { expect } from 'chai';
import * as _ from 'lodash';
import { ValidationError } from 'yup';

// models
import { User } from '../../../../../src/models/user';
import { readStaticUserData } from '../../../../data/static/user/User';

// file constants/functions
let staticUserData: any | any[];
let cachedUserData: any | any[];

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
describe('models/user/User.ts - unit tests', () => {
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
    context('User({ userId, firstName, lastName, username, passwordHash, roles })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // set data holders
            staticUserData = await readStaticUserData(3);

            cachedUserData = staticUserData.slice();

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        afterEach(async () => {
          try {
            // reset data holders
            staticUserData = undefined;
            cachedUserData = undefined;

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly validate an user instance and throw appropriate errors when found', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // set expectations
            const EXPECTED_USER_CLASS_INSTANCE = User;
            const EXPECTED_USER = _.assign({}, cachedUserData[0]);
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const user = new User(cachedUserData[0]);
            const validateResponse = user.validate();

            // run assertions
            expect(validateResponse !== undefined).to.be.true;
            expect(validateResponse.error === undefined).to.be.true;
            expect((validateResponse.value as any) !== undefined).to.be.true;
            expect((validateResponse.value as any) instanceof EXPECTED_USER_CLASS_INSTANCE).to.be.true;
            expect((validateResponse.value as any).userId !== undefined).to.be.true;
            expect((validateResponse.value as any).userId === EXPECTED_USER.userId).to.be.true;
            expect((validateResponse.value as any).firstName !== undefined).to.be.true;
            expect((validateResponse.value as any).firstName === EXPECTED_USER.firstName).to.be.true;
            expect((validateResponse.value as any).lastName !== undefined).to.be.true;
            expect((validateResponse.value as any).lastName === EXPECTED_USER.lastName).to.be.true;
            expect((validateResponse.value as any).username !== undefined).to.be.true;
            expect((validateResponse.value as any).username === EXPECTED_USER.username).to.be.true;
            expect((validateResponse.value as any).passwordHash !== undefined).to.be.true;
            expect((validateResponse.value as any).passwordHash === EXPECTED_USER.passwordHash).to.be.true;
            expect((validateResponse.value as any).roles !== undefined).to.be.true;
            expect((validateResponse.value as any).roles instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            for (const item of (validateResponse.value as any).roles) {
              expect(EXPECTED_USER.roles.map((expectedItem: any) => expectedItem === item) !== undefined).to.be.true;
            }

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it('- should correctly validate an user instance and throw appropriate errors when found (userId)', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateUser = _.assign({}, cachedUserData[0], { userId: 1 });

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
            const user = new User(updateUser);
            const validateResponse = user.validate();

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

        it('- should correctly validate an user instance and throw appropriate errors when found (userId)', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateUser = _.assign({}, cachedUserData[0], { userId: true });

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
            const user = new User(updateUser);
            const validateResponse = user.validate();

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

        it('- should correctly validate an user instance and throw appropriate errors when found (firstName)', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateUser = _.assign({}, cachedUserData[0], { firstName: 1 });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'firstName';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const user = new User(updateUser);
            const validateResponse = user.validate();

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

        it('- should correctly validate an user instance and throw appropriate errors when found (firstName)', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateUser = _.assign({}, cachedUserData[0], { firstName: true });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'firstName';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const user = new User(updateUser);
            const validateResponse = user.validate();

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

        it('- should correctly validate an user instance and throw appropriate errors when found (lastName)', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateUser = _.assign({}, cachedUserData[0], { lastName: 1 });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'lastName';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const user = new User(updateUser);
            const validateResponse = user.validate();

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

        it('- should correctly validate an user instance and throw appropriate errors when found (lastName)', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateUser = _.assign({}, cachedUserData[0], { lastName: true });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'lastName';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const user = new User(updateUser);
            const validateResponse = user.validate();

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

        it('- should correctly validate an user instance and throw appropriate errors when found (username)', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateUser = _.assign({}, cachedUserData[0], { username: 1 });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'username';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const user = new User(updateUser);
            const validateResponse = user.validate();

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

        it('- should correctly validate an user instance and throw appropriate errors when found (username)', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateUser = _.assign({}, cachedUserData[0], { username: true });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'username';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const user = new User(updateUser);
            const validateResponse = user.validate();

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

        it('- should correctly validate an user instance and throw appropriate errors when found (passwordHash)', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateUser = _.assign({}, cachedUserData[0], { passwordHash: 1 });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'passwordHash';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const user = new User(updateUser);
            const validateResponse = user.validate();

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

        it('- should correctly validate an user instance and throw appropriate errors when found (passwordHash)', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateUser = _.assign({}, cachedUserData[0], { passwordHash: true });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'passwordHash';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const user = new User(updateUser);
            const validateResponse = user.validate();

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

        it('- should correctly validate an user instance and throw appropriate errors when found (roles)', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateUser = _.assign({}, cachedUserData[0], { roles: 1 });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'roles';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const user = new User(updateUser);
            const validateResponse = user.validate();

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

        it('- should correctly validate an user instance and throw appropriate errors when found (roles)', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateUser = _.assign({}, cachedUserData[0], { roles: true });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'roles';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const user = new User(updateUser);
            const validateResponse = user.validate();

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

        it('- should correctly validate an user instance and throw appropriate errors when found (roles)', async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // update data needed for test
            const updateUser = _.assign({}, cachedUserData[0], { roles: [1] });

            // set expectations
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EPECTED_TYPE_OF_STRING = 'string';
            const EXPECTED_ERRORS_LENGTH = 1;
            const EXPECTED_ERROR_PATH = 'roles[0]';
            const EXPECTED_ERROR_TYPE = 'typeError';

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const user = new User(updateUser);
            const validateResponse = user.validate();

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
