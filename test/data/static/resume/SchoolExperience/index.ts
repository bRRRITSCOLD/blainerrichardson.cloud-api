// libraries
import { promiseUtils } from '../../../../../src/lib/utils/promise';
import { fileTestUtils } from '../../../../lib/utils';

// models
import { SchoolExperienceInterface } from '../../../../../src/models/resume';

const staticDataFolder = `${process.cwd()}/test/data/static/resume/SchoolExperience`;

const files = [`${staticDataFolder}/001.json`];

export async function readStaticSchoolExperienceData(amountOfObjs: number): Promise<SchoolExperienceInterface[]> {
  try {
    const readFiles = await promiseUtils.concurrentLimit(files.slice(0, amountOfObjs), 5, async (file: string) => {
      return JSON.parse((await fileTestUtils.readFile(file)).toString());
    });

    return readFiles;
  } catch (err) {
    throw err;
  }
}
