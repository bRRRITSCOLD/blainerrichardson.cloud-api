// libraries
import { promiseUtils } from '../../../../../src/lib/utils/promise';
import { fileTestUtils } from '../../../../lib/utils';

// models
import { WorkExperienceInterface } from '../../../../../src/models/resume';

const staticDataFolder = `${process.cwd()}/test/data/static/resume/WorkExperience`;

const files = [`${staticDataFolder}/001.json`];

export async function readStaticWorkExperienceData(amountOfObjs: number): Promise<WorkExperienceInterface[]> {
  try {
    const readFiles = await promiseUtils.concurrentLimit(files.slice(0, amountOfObjs), 5, async (file: string) => {
      return JSON.parse((await fileTestUtils.readFile(file)).toString());
    });

    return readFiles;
  } catch (err) {
    throw err;
  }
}
