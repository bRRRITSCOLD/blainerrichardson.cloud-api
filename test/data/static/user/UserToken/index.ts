// libraries
import { promiseUtils } from '../../../../../src/lib/utils/promise';
import { fileTestUtils } from '../../../../lib/utils';

// models
import { UserTokenInterface } from '../../../../../src/models/user';

const staticDataFolder = `${process.cwd()}/test/data/static/user/UserToken`;

const files = [`${staticDataFolder}/001.json`, `${staticDataFolder}/002.json`, `${staticDataFolder}/003.json`];

export async function readStaticUserTokenData(amountOfObjs: number): Promise<UserTokenInterface[]> {
  try {
    const readFiles = await promiseUtils.concurrentLimit(files.slice(0, amountOfObjs), 5, async (file: string) => {
      return JSON.parse((await fileTestUtils.readFile(file)).toString());
    });

    return readFiles;
  } catch (err) {
    throw err;
  }
}
