/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import { expect } from 'chai';
import * as _ from 'lodash';

// models
import { UserTokens } from '../../../../../src/models/user';

// data
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
describe('models/email/UserTokens.ts - unit tests', () => {
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
    context('({ userTokensId, firstName, lastName, userTokensname, passwordHash, roles })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // set data holders
            staticUserTokensData = await readStaticUserTokensData(2);

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

        it('- should correctly map data to and initiate an user tokens instance', async () => {
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

            // run assertions
            expect(userTokens !== undefined).to.be.true;
            expect(userTokens instanceof EXPECTED_USER_TOKENS_CLASS_INSTANCE).to.be.true;
            expect(userTokens.jwt !== undefined).to.be.true;
            expect(userTokens.jwt === EXPECTED_USER_TOKENS.jwt).to.be.true;
            expect(userTokens.refreshToken !== undefined).to.be.true;
            expect(userTokens.refreshToken === EXPECTED_USER_TOKENS.refreshToken).to.be.true;

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
