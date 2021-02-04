/* eslint-disable prettier/prettier */
// node_modules
import * as yup from 'yup';
import * as _ from 'lodash';
import { v4 as uuid } from 'uuid';

// libraries
import { dateUtils } from '../../lib/utils/date';
import { enumeration } from '../../../test/lib/utils';

export enum UserTokenTypeEnum {
  JWT = 'JWT',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export interface UserTokenInterface {
  userId: string;
  tokenType: UserTokenTypeEnum;
  userTokenId: string;
  token: string;
  relatedTokenIds: string[];
  expireDate: string;
  createdDate: string;
  createdIp: string;
  revokedDate?: string;
  revokedIp?: string;
}

export const userTokenSchema = yup.object().shape({
  userId: yup.string().required(),
  tokenType: yup.string().oneOf(enumeration.enumerate(UserTokenTypeEnum)),
  userTokenId: yup.string().required(),
  token: yup.string().required(),
  relatedTokenIds: yup.array().of(yup.string()).required(),
  expireDate: yup
    .mixed()
    .test('is-date', '${path} is not a valid date', (value, _context) => dateUtils.isValid(value))
    .optional(),
  createdDate: yup
    .mixed()
    .test('is-date', '${path} is not a valid date', (value, _context) => dateUtils.isValid(value))
    .required(),
  createdIp: yup.string().optional(),
  revokedDate: yup
    .mixed()
    .test(
      'is-date-optional',
      '${path} is not a valid date',
      (value, _context) => {
        return dateUtils.isValid(value) || value === undefined || value !== ''
      },
    )
    .optional(),
  revokedIp: yup.string().optional(),
});

export class UserToken implements UserTokenInterface {
  public userId!: string;
  public tokenType!: UserTokenTypeEnum;
  public userTokenId!: string;
  public token!: string;
  public relatedTokenIds!: string[];
  public expireDate!: string;
  public createdDate!: string;
  public createdIp!: string;
  public revokedDate!: string;
  public revokedIp!: string;

  public constructor(userToken: UserTokenInterface) {
    _.assign(this, userToken, {
      userId: _.get(userToken, 'userId', uuid()),
      tokenType: _.get(userToken, 'tokenType'),
      userTokenId: _.get(userToken, 'userTokenId', uuid()),
      token: _.get(userToken, 'token'),
      relatedTokenIds: _.get(userToken, 'relatedTokenIds', [] as string[]),
      expireDate:
        _.get(userToken, 'expireDate') && !isNaN(Date.parse(_.get(userToken, 'expireDate', '')))
          ? dateUtils.dateTime(new Date(_.get(userToken, 'expireDate') as any))
          : undefined,
      createdDate:
        _.get(userToken, 'createdDate') && !isNaN(Date.parse(_.get(userToken, 'createdDate', '')))
          ? dateUtils.dateTime(new Date(_.get(userToken, 'createdDate') as any))
          : undefined,
      createdIp: _.get(userToken, 'createdIp'),
      revokedDate:
        _.get(userToken, 'revokedDate') && !isNaN(Date.parse(_.get(userToken, 'revokedDate', '')))
          ? dateUtils.dateTime(new Date(_.get(userToken, 'revokedDate') as any))
          : undefined,
      revokedIp: _.get(userToken, 'revokedIp'),
    });
  }

  public get isExpired(): boolean {
    return Date.now() >= new Date(this.expireDate).getTime();
  }

  public get hasRevokedDate(): boolean {
    return this.revokedDate !== undefined && this.revokedDate !== null;
  }

  public get hasRevokedIp(): boolean {
    return this.revokedIp !== undefined && this.revokedIp !== null;
  }

  public get isActive(): boolean {
    return !this.isExpired && !this.hasRevokedDate && !this.hasRevokedIp;
  }

  /**
   *
   *
   * @returns {({ value: UserToken | undefined; error: Error | yup.ValidationError | undefined })}
   * @memberof UserToken
   */
  public validate(): { value: UserToken | undefined; error: Error | yup.ValidationError | undefined } {
    try {
      let validationError;
      let validationValue: UserToken | undefined;
      try {
        const validateSyncResponse = userTokenSchema.validateSync(_.assign({}, this), { strict: true }) as any;
        validationValue = new UserToken(validateSyncResponse);
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
   * @memberof UserToken
   */
  public async validateAsync(): Promise<{ value: UserToken | undefined; error: Error | yup.ValidationError | undefined }> {
    try {
      let validationError;
      let validationValue: UserToken | undefined;
      try {
        const validateResponse = (await userTokenSchema.validate(_.assign({}, this), { strict: true })) as any;
        validationValue = new UserToken(validateResponse);
      } catch (err) {
        validationError = err;
      }
      return { value: validationValue, error: validationError };
    } catch (err) {
      throw err;
    }
  }
}
