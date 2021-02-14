// node_modules
import * as _ from 'lodash';
import { Field, InputType, ObjectType } from 'type-graphql';
import * as yup from 'yup';
import { v4 as uuid } from 'uuid';

// libraries
import { dateUtils } from '../../lib/utils/date';
import { SchoolExperience, SchoolExperienceInterface, schoolExperienceSchema } from './SchoolExperience';
import { WorkExperience, WorkExperienceInterface, workExperienceSchema } from './WorkExperience';
import { certficationShema, Certification, CertificationInterface } from './Certification';

export interface ResumeInterface {
  workExperiences: WorkExperienceInterface[];
  schoolExperiences: SchoolExperienceInterface[];
  certifications: CertificationInterface[];
}

export const resumeSchema = yup.object().shape({
  workExperience: yup.array().of(workExperienceSchema),
  schoolExperience: yup.array().of(schoolExperienceSchema),
  certification: yup.array().of(certficationShema),
});

export class Resume implements ResumeInterface {
  public workExperiences: WorkExperience[];
  public schoolExperiences: SchoolExperience[];
  public certifications: Certification[];

  public constructor(resume: Partial<ResumeInterface>) {
    _.assign(this, resume, {
      workExperiences: _.get(resume, 'workExperiences', [] as WorkExperienceInterface[]).map(
        (item: WorkExperienceInterface) => new WorkExperience(item),
      ),
      schoolExperiences: _.get(resume, 'schoolExperiences', [] as SchoolExperienceInterface[]).map(
        (item: SchoolExperienceInterface) => new SchoolExperience(item),
      ),
      certifications: _.get(resume, 'certifications', [] as CertificationInterface[]).map(
        (item: CertificationInterface) => new Certification(item),
      ),
    });
  }

  /**
   *
   *
   * @returns {({ value: User | undefined; error: Error | yup.ValidationError | undefined })}
   * @memberof User
   */
  public validate(): { value: Resume | undefined; error: Error | yup.ValidationError | undefined } {
    try {
      let validationError;
      let validationValue: Resume | undefined;
      try {
        const validateSyncResponse = resumeSchema.validateSync(_.assign({}, this), { strict: true }) as any;
        validationValue = new Resume(validateSyncResponse);
      } catch (err) {
        validationError = err;
      }
      return { value: validationValue, error: validationError };
    } catch (err) {
      throw err;
    }
  }

  /**
   *
   *
   * @returns {Promise<any>}
   * @memberof User
   */
  public async validateAsync(): Promise<{ value: Resume | undefined; error: Error | yup.ValidationError | undefined }> {
    try {
      let validationError;
      let validationValue: Resume | undefined;
      try {
        const validateResponse = (await resumeSchema.validate(_.assign({}, this), { strict: true })) as any;
        validationValue = new Resume(validateResponse);
      } catch (err) {
        validationError = err;
      }
      return { value: validationValue, error: validationError };
    } catch (err) {
      throw err;
    }
  }
}
