// node_modules
import * as yup from 'yup';
import * as _ from 'lodash';

export interface UserTokensInterface {
  jwt: string;
  refreshToken: string;
}

export const userTokensSchema = yup.object().shape({
  jwt: yup.string().required(),
  refreshToken: yup.string().required(),
});

export class UserTokens implements UserTokensInterface {
  public jwt!: string;
  public refreshToken!: string;

  public constructor(userTokens: UserTokensInterface) {
    _.assign(this, userTokens, {});
  }

  /**
   *
   *
   * @returns {({ value: UserTokens | undefined; error: Error | yup.ValidationError | undefined })}
   * @memberof UserTokens
   */
  public validate(): { value: UserTokens | undefined; error: Error | yup.ValidationError | undefined } {
    try {
      let validationError;
      let validationValue: UserTokens | undefined;
      try {
        const validateSyncResponse = userTokensSchema.validateSync(_.assign({}, this), { strict: true }) as any;
        validationValue = new UserTokens(validateSyncResponse);
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
   * @memberof UserTokens
   */
  public async validateAsync(): Promise<{ value: UserTokens | undefined; error: Error | yup.ValidationError | undefined }> {
    try {
      let validationError;
      let validationValue: UserTokens | undefined;
      try {
        const validateResponse = (await userTokensSchema.validate(_.assign({}, this), { strict: true })) as any;
        validationValue = new UserTokens(validateResponse);
      } catch (err) {
        validationError = err;
      }
      return { value: validationValue, error: validationError };
    } catch (err) {
      throw err;
    }
  }
}
