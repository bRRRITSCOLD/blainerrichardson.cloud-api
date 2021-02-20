// node_modules
import * as _ from 'lodash';
import ejs from 'ejs';
import { promises as fs } from 'fs';
import chromium from 'chrome-aws-lambda';

// models
import { APIError } from '../../models/error';
import {
  Certification,
  CertificationInterface,
  SchoolExperience,
  SchoolExperienceInterface,
  WorkExperience,
  WorkExperienceInterface,
} from '../../models/resume';
import { env } from '../../lib/environment';
import { address } from 'faker';
import { addressUtils } from '../../lib/utils/address';

export interface CreateResumePDFRequestInterface {
  workExperiences: WorkExperienceInterface[];
  schoolExperiences: SchoolExperienceInterface[];
  certifications: CertificationInterface[];
}

export interface CreateResumePDFResponseInterface {
  resume: Buffer | string;
}

export async function createResumePDF(createResumePDFRequest: CreateResumePDFRequestInterface): Promise<CreateResumePDFResponseInterface> {
  try {
    // deconstruct for ease
    const { workExperiences, schoolExperiences, certifications } = createResumePDFRequest;

    // read and compile html
    const htmlTemplate = await fs.readFile(`${process.cwd()}/${env.isLocal ? 'src/templates/resume.ejs' : 'templates/resume.ejs'}`, {
      encoding: 'utf-8',
    });
    const compileTemplate = await ejs.compile(htmlTemplate, { async: true });
    const compiledTemplate = await compileTemplate({
      workExperiences: workExperiences.map((workExperience) =>
        _.assign({}, workExperience, { companyAddress: addressUtils.format(workExperience.companyAddress) }),
      ),
      schoolExperiences: schoolExperiences.map((schoolExperience) =>
        _.assign({}, schoolExperience, { schoolAddress: addressUtils.format(schoolExperience.schoolAddress) }),
      ),
      certifications,
    });

    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    });

    console.log('Opening new page...');
    // 👇 create a new headless chrome pag
    const page = await browser.newPage();

    console.log('Generating PDF file from HTML template...');

    // 👇 Ignore this line for right now
    await page.setContent(compiledTemplate, { waitUntil: 'networkidle2' });

    // 👇 this tells puppeteer to save the webpage as a pdf file
    const pdf = await page.pdf({ format: 'a4' });

    // TODO: delete below lines when working
    // debugging purposes
    await fs.writeFile('test.html', compiledTemplate);
    await fs.writeFile('test.pdf', pdf);

    // return explicitly
    return {
      resume: pdf,
    };
  } catch (err) {
    // build error
    const error = new APIError(err);

    // throw error explicitly
    throw error;
  }
}
