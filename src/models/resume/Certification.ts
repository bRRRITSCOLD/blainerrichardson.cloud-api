// node_modules
import * as _ from 'lodash';

export interface CertificationInterface {
  startDate: string | Date;
  endDate?: string | Date;
  name: string;
  institution: string;
}

export class Certification implements CertificationInterface {
  public startDate!: string | Date;
  public endDate?: string | Date;
  public name!: string;
  public institution!: string;

  public constructor(certification: Partial<CertificationInterface>) {
    _.assign(this, certification, {
      startDate: new Date(_.get(certification, 'startDate', new Date())),
      endDate: _.get(certification, 'endDate') ? new Date(_.get(certification, 'endDate') as any) : undefined,
      name: _.get(certification, 'name'),
      institution: _.get(certification, 'institution'),
    });
  }
}
