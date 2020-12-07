// node_modules
import { MiddlewareFn } from 'type-graphql';

// models
import { APIError } from '../../../models/error';

export const ErrorInterceptor: MiddlewareFn<any> = async (params: { context: any; info: any }, next) => {
  try {
    return await next();
  } catch (err) {
    // build error
    const error = new APIError(err);
    // set response status code
    params.context.response.statusCode = error.statusCode;
    // rethrow the error
    throw new Error(error.message);
  }
};
