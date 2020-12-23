import * as fs from 'fs';
import { promisify } from 'util';

export const fileTestUtils = {
  readFile: promisify(fs.readFile),
};

export const enumeration = {
  enumerate(enumm: any): any[] {
    return Object.keys(enumm).map((key: string) => enumm[key]);
  },
};
