/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import { expect } from 'chai';
import * as _ from 'lodash';

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

  describe('#constructor', () => {
    context('({ name, address })', () => {
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

        it('- should correctly map data to and initiate an email address instance', async () => {
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

            // run assertions
            expect(emailAddress !== undefined).to.be.true;
            expect(emailAddress instanceof EXPECTED_EMAIL_ADDRESS_CLASS_INSTANCE).to.be.true;
            expect(emailAddress.name === undefined).to.be.true;
            expect(emailAddress.address !== undefined).to.be.true;
            expect(emailAddress.address === EXPECTED_EMAIL_ADDRESS.address).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });
      });
    });

    context('({ address, name })', () => {
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

        it('- should correctly map data to and initiate an email attachment instance', async () => {
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

            // run assertions
            expect(emailAddress !== undefined).to.be.true;
            expect(emailAddress instanceof EXPECTED_EMAIL_ADDRESS_CLASS_INSTANCE).to.be.true;
            expect(emailAddress.name !== undefined).to.be.true;
            expect(emailAddress.name === EXPECTED_EMAIL_ADDRESS.name).to.be.true;
            expect(emailAddress.address !== undefined).to.be.true;
            expect(emailAddress.address === EXPECTED_EMAIL_ADDRESS.address).to.be.true;

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
