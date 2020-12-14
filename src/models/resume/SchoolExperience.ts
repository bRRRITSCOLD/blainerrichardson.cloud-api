// node_modules
import * as _ from 'lodash';

export interface SchoolExperienceInterface {
  startDate: string | Date;
  endDate?: string | Date;
  schoolName: string;
  schoolAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  degree?: string;
  classes: string[];
}

export class SchoolExperience implements SchoolExperienceInterface {
  public startDate!: string | Date;
  public endDate?: string | Date;
  public schoolName!: string;
  public schoolAddress!: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  public degree?: string;
  public classes!: string[];

  public constructor(schoolExperience: Partial<SchoolExperienceInterface>) {
    _.assign(this, schoolExperience, {
      startDate: new Date(_.get(schoolExperience, 'startDate', new Date())),
      endDate: _.get(schoolExperience, 'endDate') ? new Date(_.get(schoolExperience, 'endDate') as any) : undefined,
      schoolName: _.get(schoolExperience, 'schoolName'),
      schoolAddress: _.get(schoolExperience, 'schoolAddress'),
      degree: _.get(schoolExperience, 'degree'),
      classes: _.get(schoolExperience, 'classes', []),
    });
  }
}
