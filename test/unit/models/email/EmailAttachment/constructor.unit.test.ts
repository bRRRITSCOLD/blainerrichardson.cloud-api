/* eslint-disable @typescript-eslint/no-unused-expressions */
// node_modules
import { expect } from 'chai';
import * as _ from 'lodash';

// models
import { EmailAttachment } from '../../../../../src/models/email';
import { readStaticEmailAttachemntData } from '../../../../data/static/email/EmailAttachment';

// file constants/functions
let staticEmailAttachmentData: any | any[];
let cachedEmailAttachmentData: any | any[];

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
describe('models/email/EmailAttachment.ts - unit tests', () => {
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
    context('({ filename, content })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // set data holders
            staticEmailAttachmentData = await readStaticEmailAttachemntData(5);

            cachedEmailAttachmentData = staticEmailAttachmentData.slice();

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        afterEach(async () => {
          try {
            // reset data holders
            staticEmailAttachmentData = undefined;
            cachedEmailAttachmentData = undefined;

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
            const EXPECTED_EMAIL_ATTACHEMENT_CLASS_INSTANCE = EmailAttachment;
            const EXPECTED_EMAIL_ATTACHEMENT = _.assign({}, cachedEmailAttachmentData[0]);

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(cachedEmailAttachmentData[0]);

            // run assertions
            expect(emailAttachment !== undefined).to.be.true;
            expect(emailAttachment instanceof EXPECTED_EMAIL_ATTACHEMENT_CLASS_INSTANCE).to.be.true;
            expect(emailAttachment.filename !== undefined).to.be.true;
            expect(emailAttachment.filename === EXPECTED_EMAIL_ATTACHEMENT.filename).to.be.true;
            expect(emailAttachment.content !== undefined).to.be.true;
            expect(emailAttachment.content === EXPECTED_EMAIL_ATTACHEMENT.content).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });
      });
    });

    context('({ filename, path })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // set data holders
            staticEmailAttachmentData = await readStaticEmailAttachemntData(5);

            cachedEmailAttachmentData = staticEmailAttachmentData.slice();

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        afterEach(async () => {
          try {
            // reset data holders
            staticEmailAttachmentData = undefined;
            cachedEmailAttachmentData = undefined;

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
            const EXPECTED_EMAIL_ATTACHEMENT_CLASS_INSTANCE = EmailAttachment;
            const EXPECTED_EMAIL_ATTACHEMENT = _.assign({}, cachedEmailAttachmentData[1]);

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(cachedEmailAttachmentData[1]);

            // run assertions
            expect(emailAttachment !== undefined).to.be.true;
            expect(emailAttachment instanceof EXPECTED_EMAIL_ATTACHEMENT_CLASS_INSTANCE).to.be.true;
            expect(emailAttachment.filename !== undefined).to.be.true;
            expect(emailAttachment.filename === EXPECTED_EMAIL_ATTACHEMENT.filename).to.be.true;
            expect(emailAttachment.path !== undefined).to.be.true;
            expect(emailAttachment.path === EXPECTED_EMAIL_ATTACHEMENT.path).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });
      });
    });

    context('({ path })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // set data holders
            staticEmailAttachmentData = await readStaticEmailAttachemntData(5);

            cachedEmailAttachmentData = staticEmailAttachmentData.slice();

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        afterEach(async () => {
          try {
            // reset data holders
            staticEmailAttachmentData = undefined;
            cachedEmailAttachmentData = undefined;

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
            const EXPECTED_EMAIL_ATTACHEMENT_CLASS_INSTANCE = EmailAttachment;
            const EXPECTED_EMAIL_ATTACHEMENT = _.assign({}, cachedEmailAttachmentData[2]);

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(cachedEmailAttachmentData[2]);

            // run assertions
            expect(emailAttachment !== undefined).to.be.true;
            expect(emailAttachment instanceof EXPECTED_EMAIL_ATTACHEMENT_CLASS_INSTANCE).to.be.true;
            expect(emailAttachment.path !== undefined).to.be.true;
            expect(emailAttachment.path === EXPECTED_EMAIL_ATTACHEMENT.path).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });
      });
    });

    context('({ filename, content, contentType })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // set data holders
            staticEmailAttachmentData = await readStaticEmailAttachemntData(5);

            cachedEmailAttachmentData = staticEmailAttachmentData.slice();

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        afterEach(async () => {
          try {
            // reset data holders
            staticEmailAttachmentData = undefined;
            cachedEmailAttachmentData = undefined;

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
            const EXPECTED_EMAIL_ATTACHEMENT_CLASS_INSTANCE = EmailAttachment;
            const EXPECTED_EMAIL_ATTACHEMENT = _.assign({}, cachedEmailAttachmentData[3]);

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(cachedEmailAttachmentData[3]);

            // run assertions
            expect(emailAttachment !== undefined).to.be.true;
            expect(emailAttachment instanceof EXPECTED_EMAIL_ATTACHEMENT_CLASS_INSTANCE).to.be.true;
            expect(emailAttachment.filename !== undefined).to.be.true;
            expect(emailAttachment.filename === EXPECTED_EMAIL_ATTACHEMENT.filename).to.be.true;
            expect(emailAttachment.content !== undefined).to.be.true;
            expect(emailAttachment.content === EXPECTED_EMAIL_ATTACHEMENT.content).to.be.true;
            expect(emailAttachment.contentType !== undefined).to.be.true;
            expect(emailAttachment.contentType === EXPECTED_EMAIL_ATTACHEMENT.contentType).to.be.true;

            // return explicitly
            return;
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });
      });
    });

    context('({ filename, content, encoding })', () => {
      context('static data', () => {
        beforeEach(async () => {
          try {
            // set data holders
            staticEmailAttachmentData = await readStaticEmailAttachemntData(5);

            cachedEmailAttachmentData = staticEmailAttachmentData.slice();

            // return explicitly
          } catch (err) {
            // throw explicitly
            throw err;
          }
        });

        afterEach(async () => {
          try {
            // reset data holders
            staticEmailAttachmentData = undefined;
            cachedEmailAttachmentData = undefined;

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
            const EXPECTED_EMAIL_ATTACHEMENT_CLASS_INSTANCE = EmailAttachment;
            const EXPECTED_EMAIL_ATTACHEMENT = _.assign({}, cachedEmailAttachmentData[4]);

            /////////////////////////
            //////// test //////////
            /////////////////////////
            // run testee
            const emailAttachment = new EmailAttachment(cachedEmailAttachmentData[4]);

            // run assertions
            expect(emailAttachment !== undefined).to.be.true;
            expect(emailAttachment instanceof EXPECTED_EMAIL_ATTACHEMENT_CLASS_INSTANCE).to.be.true;
            expect(emailAttachment.filename !== undefined).to.be.true;
            expect(emailAttachment.filename === EXPECTED_EMAIL_ATTACHEMENT.filename).to.be.true;
            expect(emailAttachment.content !== undefined).to.be.true;
            expect(emailAttachment.content === EXPECTED_EMAIL_ATTACHEMENT.content).to.be.true;
            expect(emailAttachment.encoding !== undefined).to.be.true;
            expect(emailAttachment.encoding === EXPECTED_EMAIL_ATTACHEMENT.encoding).to.be.true;

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
