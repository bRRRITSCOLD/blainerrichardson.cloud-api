// node_modules
import * as _ from 'lodash';
import { promisify } from 'util';
import ejs from 'ejs';
import { promises as fs } from 'fs';

// libraries
const htmlToPDF = require('html-pdf-node');

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

// file constants
const generatePDF = promisify(htmlToPDF.generatePdf);

export interface CreateResumePDFRequestInterface {
  workExperiences: WorkExperienceInterface[];
  schoolExperiences: SchoolExperienceInterface[];
  certifications: CertificationInterface[];
}

export interface CreateResumePDFResponseInterface {
  resume: Buffer | string;
}

// let options = { format: 'A4' };
// // Example of options with args //
// // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

// let file = { content: "<h1>Welcome to html-pdf-node</h1>" };
// // or //
// let file = { url: "https://example.com" };
// html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
//   console.log("PDF Buffer:-", pdfBuffer);
// });

export async function createResumePDF(createResumePDFRequest: CreateResumePDFRequestInterface): Promise<CreateResumePDFResponseInterface> {
  try {
    // deconstruct for ease
    const { workExperiences, schoolExperiences, certifications } = createResumePDFRequest;

    // read and compile html
    const htmlTemplate = await fs.readFile(`${process.cwd()}/${env.isLocal ? 'src/templates/resume.ejs' : 'templates/resume.ejs'}`, {
      encoding: 'utf-8',
    });
    const compiledTemplate = await ejs.compile(htmlTemplate, { async: true });
    const compiledHtml = await compiledTemplate({ workExperiences });

    // create the pdf file
    const generatePDFRequestParameters = {
      content: compiledHtml,
    };
    const generatePDFRequestOptions = { options: 'A4' };
    const generatePDFResponse = await generatePDF(generatePDFRequestParameters, generatePDFRequestOptions);

    // TODO: delete below lines when working
    // debugging purposes
    await fs.writeFile('test.pdf', generatePDFResponse);

    // return explicitly
    return {
      resume: generatePDFResponse,
    };
  } catch (err) {
    // build error
    const error = new APIError(err);

    // throw error explicitly
    throw error;
  }
}
