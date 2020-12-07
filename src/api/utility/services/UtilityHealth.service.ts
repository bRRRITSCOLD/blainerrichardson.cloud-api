// node_modules
import { Service } from 'typedi';
import * as _ from 'lodash';

// libraries
import { anyUtils } from '../../../lib/utils';
import { logger } from '../../../lib/logger';

// models
import { APIError } from '../../../models/error';

@Service()
export class UtilityHealthService {
  public async healthCheck(): Promise<any> {
    try {
      // return health check explicitly
      return { status: 'HELATHY' };
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}UtilityHealthService::#healthCheck::error executing::error=${anyUtils.stringify(error)}`);
      // throw error explicitly
      throw error;
    }
  }
}
