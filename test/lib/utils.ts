import * as fs from 'fs';
import { promisify } from 'util';

export const fileTestUtils = {
  readFile: promisify(fs.readFile),
};
