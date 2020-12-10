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

  describe('#constructor', () => {
    context(
      '({ from: EmailAddress, to: EmailAddress, cc: EmailAddress, bcc: EmailAddress, subject, text, attachments: EmailAttachment[] })',
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

          it('- should correctly map data to and initiate an email instance', async () => {
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

              // run assertions
              expect(email !== undefined).to.be.true;
              expect(email instanceof EXPECTED_EMAIL_ADDRESS_CLASS_INSTANCE).to.be.true;
              expect(email.from !== undefined).to.be.true;
              expect(email.from.name !== undefined).to.be.true;
              expect(email.from.name === EXPECTED_EMAIL_ADDRESS.from.name).to.be.true;
              expect(email.from.address !== undefined).to.be.true;
              expect(email.from.address === EXPECTED_EMAIL_ADDRESS.from.address).to.be.true;
              expect((email.to as any) !== undefined).to.be.true;
              expect((email.to as any).name !== undefined).to.be.true;
              expect((email.to as any).name === EXPECTED_EMAIL_ADDRESS.to.name).to.be.true;
              expect((email.to as any).address !== undefined).to.be.true;
              expect((email.to as any).address === EXPECTED_EMAIL_ADDRESS.to.address).to.be.true;
              expect((email.cc as any) !== undefined).to.be.true;
              expect((email.cc as any).name !== undefined).to.be.true;
              expect((email.cc as any).name === EXPECTED_EMAIL_ADDRESS.cc.name).to.be.true;
              expect((email.cc as any).address !== undefined).to.be.true;
              expect((email.cc as any).address === EXPECTED_EMAIL_ADDRESS.cc.address).to.be.true;
              expect((email.bcc as any) !== undefined).to.be.true;
              expect((email.bcc as any).name !== undefined).to.be.true;
              expect((email.bcc as any).name === EXPECTED_EMAIL_ADDRESS.bcc.name).to.be.true;
              expect((email.bcc as any).address !== undefined).to.be.true;
              expect((email.bcc as any).address === EXPECTED_EMAIL_ADDRESS.bcc.address).to.be.true;
              expect(email.subject !== undefined).to.be.true;
              expect(email.subject === EXPECTED_EMAIL_ADDRESS.subject).to.be.true;
              expect(email.text !== undefined).to.be.true;
              expect(email.text === EXPECTED_EMAIL_ADDRESS.text).to.be.true;
              expect((email.attachments as any) !== undefined).to.be.true;
              expect((email.attachments as any) instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
              for (const item of email.attachments as any) {
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
        });
      },
    );

    context(
      '({ from: EmailAddress, to: EmailAddress[], cc: EmailAddress[], bcc: EmailAddress[], subject, text, attachments: EmailAttachment[] })',
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

          it('- should correctly map data to and initiate an email instance', async () => {
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

              // run assertions
              expect(email !== undefined).to.be.true;
              expect(email instanceof EXPECTED_EMAIL_ADDRESS_CLASS_INSTANCE).to.be.true;
              expect(email.from !== undefined).to.be.true;
              expect(email.from.name !== undefined).to.be.true;
              expect(email.from.name === EXPECTED_EMAIL_ADDRESS.from.name).to.be.true;
              expect(email.from.address !== undefined).to.be.true;
              expect(email.from.address === EXPECTED_EMAIL_ADDRESS.from.address).to.be.true;
              expect((email.to as any) !== undefined).to.be.true;
              expect((email.to as any) instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
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
              expect(email.subject !== undefined).to.be.true;
              expect(email.subject === EXPECTED_EMAIL_ADDRESS.subject).to.be.true;
              expect(email.text !== undefined).to.be.true;
              expect(email.text === EXPECTED_EMAIL_ADDRESS.text).to.be.true;
              expect((email.attachments as any) !== undefined).to.be.true;
              expect((email.attachments as any) instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
              for (const item of email.attachments as any) {
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
        });
      },
    );

    context(
      '({ from: EmailAddress, to: EmailAddress, cc: EmailAddress, bcc: EmailAddress, subject, html, attachments: EmailAttachment[] })',
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

          it('- should correctly map data to and initiate an email instance', async () => {
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

              // run assertions
              expect(email !== undefined).to.be.true;
              expect(email instanceof EXPECTED_EMAIL_ADDRESS_CLASS_INSTANCE).to.be.true;
              expect(email.from !== undefined).to.be.true;
              expect(email.from.name !== undefined).to.be.true;
              expect(email.from.name === EXPECTED_EMAIL_ADDRESS.from.name).to.be.true;
              expect(email.from.address !== undefined).to.be.true;
              expect(email.from.address === EXPECTED_EMAIL_ADDRESS.from.address).to.be.true;
              expect((email.to as any) !== undefined).to.be.true;
              expect((email.to as any) instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
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
              expect(email.subject !== undefined).to.be.true;
              expect(email.subject === EXPECTED_EMAIL_ADDRESS.subject).to.be.true;
              expect(email.html !== undefined).to.be.true;
              expect(email.html === EXPECTED_EMAIL_ADDRESS.html).to.be.true;
              expect((email.attachments as any) !== undefined).to.be.true;
              expect((email.attachments as any) instanceof EXPECTED_ARRAY_CLASS_INSTANCE).to.be.true;
              for (const item of email.attachments as any) {
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
