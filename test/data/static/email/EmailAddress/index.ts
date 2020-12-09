// libraries
import { promiseUtils } from '../../../../../src/lib/utils/promise';
import { fileTestUtils } from '../../../../lib/utils';

// models
import { EmailAddressInterface } from '../../../../../src/models/email';

const staticDataFolder = `${process.cwd()}/test/data/static/email/EmailAddress`;

const files = [`${staticDataFolder}/001.json`, `${staticDataFolder}/002.json`];

export async function readStaticEmailAddressData(amountOfObjs: number): Promise<EmailAddressInterface[]> {
  try {
    const readFiles = await promiseUtils.concurrentLimit(files.slice(0, amountOfObjs), 5, async (file: string) => {
      return JSON.parse((await fileTestUtils.readFile(file)).toString());
    });

    return readFiles;
  } catch (err) {
    throw err;
  }
}
