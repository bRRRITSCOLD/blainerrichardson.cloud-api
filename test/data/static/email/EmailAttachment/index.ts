// libraries
import { promiseUtils } from '../../../../../src/lib/utils/promise';
import { fileTestUtils } from '../../../../lib/utils';

// models
import { EmailAttachmentInterface } from '../../../../../src/models/email';

const staticDataFolder = `${process.cwd()}/test/data/static/email/EmailAttachment`;

const files = [
  `${staticDataFolder}/001.json`,
  `${staticDataFolder}/002.json`,
  `${staticDataFolder}/003.json`,
  `${staticDataFolder}/004.json`,
  `${staticDataFolder}/005.json`,
];

export async function readStaticEmailAttachemntData(amountOfObjs: number): Promise<EmailAttachmentInterface[]> {
  try {
    const readFiles = await promiseUtils.concurrentLimit(files.slice(0, amountOfObjs), 5, async (file: string) => {
      return JSON.parse((await fileTestUtils.readFile(file)).toString());
    });

    return readFiles;
  } catch (err) {
    throw err;
  }
}
