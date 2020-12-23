/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import { expect } from 'chai';
import * as _ from 'lodash';

// models
import { User } from '../../../../../src/models/user';

// data
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
describe('models/email/User.ts - unit tests', () => {
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

  describe('#constructor', () => {
    context('({ userId, firstName, lastName, username, passwordHash, roles })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // set data holders
            staticUserData = await readStaticUserData(2);

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

        it('- should correctly map data to and initiate an user instance', async () => {
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

            // run assertions
            expect(user !== undefined).to.be.true;
            expect(user instanceof EXPECTED_USER_CLASS_INSTANCE).to.be.true;
            expect(user.userId !== undefined).to.be.true;
            expect(user.userId === EXPECTED_USER.userId).to.be.true;
            expect(user.firstName !== undefined).to.be.true;
            expect(user.firstName === EXPECTED_USER.firstName).to.be.true;
            expect(user.lastName !== undefined).to.be.true;
            expect(user.lastName === EXPECTED_USER.lastName).to.be.true;
            expect(user.username !== undefined).to.be.true;
            expect(user.username === EXPECTED_USER.username).to.be.true;
            expect(user.passwordHash !== undefined).to.be.true;
            expect(user.passwordHash === EXPECTED_USER.passwordHash).to.be.true;
            expect(user.roles !== undefined).to.be.true;
            expect(user.roles instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            for (const item of user.roles) {
              expect(EXPECTED_USER.roles.map((expectedItem: any) => expectedItem === item) !== undefined).to.be.true;
            }

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
