// node_modules
import * as _ from 'lodash';

// models
import { AnyObject } from '../common';

export interface APIErrorInterface extends AnyObject {
  message: string;
  stack?: string;
  statusCode?: number;
}

export class APIError implements APIErrorInterface {
  public message!: string;
  public stack?: string;
  public statusCode?: number;
  [key: string]: unknown;

  public constructor(error: any, custom: AnyObject = {}) {
    _.assign(this, {
      ...error,
      message: _.get(error, 'message', 'Undetermined Error'),
      stack: _.get(error, 'stack'),
      statusCode: _.get(error, 'statusCode', 500),
      ...custom,
    });
  }
}
