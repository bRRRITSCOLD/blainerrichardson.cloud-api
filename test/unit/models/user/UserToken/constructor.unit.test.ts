/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import { expect } from 'chai';
import * as _ from 'lodash';

// models
import { UserToken } from '../../../../../src/models/user';

// data
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
describe('models/email/UserToken.ts - unit tests', () => {
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
    context(
      '({ userId, tokenType, userTokenId, token, relatedTokenIds, expireDate, createdDate, createdIp, revokedDate, revokedIp })',
      () => {
        context('static data', () => {
          beforeEach(async () => {
            try {
              // set data holders
              staticUserTokenData = await readStaticUserTokenData(2);

              // cache the read static data for use
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

          it('- should correctly map data to and initiate an user token instance', async () => {
            try {
              /////////////////////////
              //////// setup //////////
              /////////////////////////
              // set expectations
              const EXPECTED_USER_TOKEN_CLASS_INSTANCE = UserToken;
              const EXPECTED_USER_TOKEN = _.assign({}, cachedUserTokenData[0]);
              const EXPECTED_ARRAY_CLASS_INSTANCE = Array;

              /////////////////////////
              //////// test ///////////
              /////////////////////////
              // run testee
              const userToken = new UserToken(cachedUserTokenData[0]);

              // run assertions
              expect(userToken !== undefined).to.be.true;
              expect(userToken instanceof EXPECTED_USER_TOKEN_CLASS_INSTANCE).to.be.true;
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
