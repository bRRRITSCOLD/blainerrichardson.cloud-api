// libraries
import { promiseUtils } from '../../../../../src/lib/utils/promise';
import { fileTestUtils } from '../../../../lib/utils';

// models
import { UserInterface } from '../../../../../src/models/user';

const staticDataFolder = `${process.cwd()}/test/data/static/user/User`;

const files = [`${staticDataFolder}/001.json`, `${staticDataFolder}/002.json`, `${staticDataFolder}/003.json`];

export async function readStaticUserData(amountOfObjs: number): Promise<UserInterface[]> {
  try {
    const readFiles = await promiseUtils.concurrentLimit(files.slice(0, amountOfObjs), 5, async (file: string) => {
      return JSON.parse((await fileTestUtils.readFile(file)).toString());
    });

    return readFiles;
  } catch (err) {
    throw err;
  }
}

const passwordFiles = [
  `${staticDataFolder}/001-password.json`,
  `${staticDataFolder}/002-password.json`,
  `${staticDataFolder}/003-password.json`,
];

export async function readStaticUserPasswordData(amountOfObjs: number): Promise<UserInterface[]> {
  try {
    const readFiles = await promiseUtils.concurrentLimit(passwordFiles.slice(0, amountOfObjs), 5, async (file: string) => {
      return JSON.parse((await fileTestUtils.readFile(file)).toString());
    });

    return readFiles;
  } catch (err) {
    throw err;
  }
}
