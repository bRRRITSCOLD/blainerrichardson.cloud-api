/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import 'reflect-metadata';
import { FastifyInstance, FastifyLoggerInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { expect } from 'chai';
import * as _ from 'lodash';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// libraries
import { e2eTestEnv } from '../../../../../lib/environment';
import { mongo } from '../../../../../../src/lib/mongo';

// testees
import { bootstrap } from '../../../../../../src/app';
let app: FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>;

// data
import { loadUsersData, loadUserTokensData, unloadUsersData, unloadUserTokensData } from '../../../../../data/loaders/user';
import { readStaticUserData, readStaticUserPasswordData } from '../../../../../data/static/user/User';
import { UserTokenTypeEnum } from '../../../../../../src/models/user';
import { readStaticUserTokenData } from '../../../../../data/static/user/UserToken';
import { dateUtils } from '../../../../../../src/lib/utils/date';

// file constants/functions
let staticUserData: any | any[];
let staticUserPasswordData: any | any[];
let staticUserTokenData: any | any[];

let cachedUserData: any | any[];
let cachedUserPasswordData: any | any[];
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
describe('api/user/resolvers/UserToken.resolver - POST /graphql mutation refreshUserToken - e2e tests', () => {
  before(async () => {
    try {
      // load out environment
      await e2eTestEnv.init();

      // initialize asynchronous tasks, connectiones, etc. here
      await Promise.all([mongo.init(require('../../../../../../src/configs/mongo').default)]);

      // initialize synchronous tasks, connectiones, etc. here
      [];

      // create and store app
      app = await bootstrap();

      // cusom start up functionality
      await customStartUp();

      // return explicitly
      return;
    } catch (err) {
      // throw explicitly
      throw err;
    }
  });

  describe('{ mutation refreshtoken }', () => {
    context('()', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // read static data
            staticUserData = await readStaticUserData(3);
            staticUserTokenData = await readStaticUserTokenData(3);

            // load data into datasources
            cachedUserData = await loadUsersData({
              users: staticUserData,
            });

            cachedUserTokenData = await loadUserTokensData({
              userTokens: staticUserTokenData.map((userTokenData: any, userTokenDataIndex: number) =>
                _.assign({}, userTokenData, {
                  userId: cachedUserData[userTokenDataIndex].userId,
                  tokenType: UserTokenTypeEnum.REFRESH_TOKEN,
                  relatedTokenIds: [],
                  expireDate: dateUtils.dateTime(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
                  createdDate: dateUtils.dateTime(new Date(Date.now())),
                  createdIp: '127.0.0.1',
                  revokedDate: undefined,
                  revokedIp: undefined,
                }),
              ),
            });

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        afterEach(async () => {
          try {
            // unload data from datasources
            await unloadUsersData({
              users: cachedUserData,
            });
            await unloadUserTokensData({
              unloadCriteria: { userId: { $in: cachedUserData.map((item: any) => item.userId) } },
            });

            // reset data holders
            staticUserData = undefined;
            staticUserTokenData = undefined;

            cachedUserData = undefined;
            cachedUserTokenData = undefined;

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        it(`- should refresh a user jwt when passed a valid refresh token from a user's cookies`, async () => {
          try {
            /////////////////////////
            //////// setup //////////
            /////////////////////////
            // none
            const EXPECTED_ARRAY_CLASS_INSTANCE = Array;
            const EXPECTED_USER = cachedUserData.slice()[0];
            const EXPECTED_TYPE_OF_STRING = 'string';

            /////////////////////////
            //////// test ///////////
            /////////////////////////
            // run testee
            const httpRequest: any = {
              method: 'POST',
              url: '/graphql',
              headers: {
                'content-type': 'application/json',
              },
              cookies: {
                refreshToken: cachedUserTokenData[0].token,
              },
              payload: {
                query: `mutation { refreshUserToken {
                    user {
                      firstName
                    },
                    userToken {
                      userTokenId,
                      token
                    }
                  }
                }`,
              },
            };
            const httResponse = await app.inject(httpRequest);

            // run assertions
            expect(httResponse !== undefined).to.be.true;
            expect(httResponse.statusCode !== undefined).to.be.true;
            expect(httResponse.statusCode === 200).to.be.true;
            expect(httResponse.body !== undefined).to.be.true;
            expect(typeof httResponse.body === EXPECTED_TYPE_OF_STRING).to.be.true;
            expect(httResponse.cookies !== undefined).to.be.true;
            expect(httResponse.cookies instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
            expect(httResponse.cookies.length === 2).to.be.true;
            expect(httResponse.cookies.every((item: any) => item.name === 'refreshToken')).to.be.true;
            expect(
              httResponse.cookies.every((item: any) => typeof item.value === EXPECTED_TYPE_OF_STRING) &&
                httResponse.cookies.some((item: any) => item.value.length > 1),
            ).to.be.true;

            // parse JSON body
            const parsedBody = JSON.parse(httResponse.body);

            // run assertions
            expect(parsedBody !== undefined).to.be.true;
            expect(parsedBody.data !== null).to.be.true;
            expect(parsedBody.data.refreshUserToken !== null).to.be.true;
            expect(parsedBody.data.refreshUserToken !== null).to.be.true;
            expect(parsedBody.data.refreshUserToken.user !== null).to.be.true;
            expect(parsedBody.data.refreshUserToken.user.firstName !== null).to.be.true;
            expect(parsedBody.data.refreshUserToken.user.firstName === EXPECTED_USER.firstName).to.be.true;
            expect(parsedBody.data.refreshUserToken.userToken !== null).to.be.true;
            expect(parsedBody.data.refreshUserToken.userToken.token !== null).to.be.true;
            expect(typeof parsedBody.data.refreshUserToken.userToken.token === EXPECTED_TYPE_OF_STRING).to.be.true;

            // decode token returned to check
            // if it is a correct jwt
            const decodedToken = jwt.decode(parsedBody.data.refreshUserToken.userToken.token);

            // run assertions
            expect(decodedToken !== undefined).to.be.true;
            expect((decodedToken as any).userId !== undefined).to.be.true;
            expect((decodedToken as any).userId === EXPECTED_USER.userId).to.be.true;
            expect((decodedToken as any).sub !== undefined).to.be.true;
            expect((decodedToken as any).sub === EXPECTED_USER.userId).to.be.true;
            expect((decodedToken as any).userId === (decodedToken as any).sub).to.be.true;

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
