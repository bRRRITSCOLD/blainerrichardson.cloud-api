// libraries
import { promiseUtils } from '../../../../../src/lib/utils/promise';
import { fileTestUtils } from '../../../../lib/utils';

// models
import { CertificationInterface } from '../../../../../src/models/resume';

const staticDataFolder = `${process.cwd()}/test/data/static/resume/Certification`;

const files = [`${staticDataFolder}/001.json`, `${staticDataFolder}/002.json`, `${staticDataFolder}/003.json`];

export async function readStaticCertificationData(amountOfObjs: number): Promise<CertificationInterface[]> {
  try {
    const readFiles = await promiseUtils.concurrentLimit(files.slice(0, amountOfObjs), 5, async (file: string) => {
      return JSON.parse((await fileTestUtils.readFile(file)).toString());
    });

    return readFiles;
  } catch (err) {
    throw err;
  }
}
