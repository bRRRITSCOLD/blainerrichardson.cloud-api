// node_modules
import * as yup from 'yup';
import * as _ from 'lodash';

export interface UserInterface {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  passwordHash: string;
  roles: string[];
}

export const userSchema = yup.object().shape({
  userId: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  username: yup.string().required(),
  passwordHash: yup.string().required(),
  roles: yup.array().of(yup.string()).required(),
});

export class User implements UserInterface {
  public userId!: string;
  public firstName!: string;
  public lastName!: string;
  public username!: string;
  public passwordHash!: string;
  public roles!: string[];

  public constructor(user: UserInterface) {
    _.assign(this, user, {});
  }

  /**
   *
   *
   * @returns {({ value: User | undefined; error: Error | yup.ValidationError | undefined })}
   * @memberof User
   */
  public validate(): { value: User | undefined; error: Error | yup.ValidationError | undefined } {
    try {
      let validationError;
      let validationValue: User | undefined;
      try {
        const validateSyncResponse = userSchema.validateSync(_.assign({}, this), { strict: true }) as any;
        validationValue = new User(validateSyncResponse);
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
  public async validateAsync(): Promise<{ value: User | undefined; error: Error | yup.ValidationError | undefined }> {
    try {
      let validationError;
      let validationValue: User | undefined;
      try {
        const validateResponse = (await userSchema.validate(_.assign({}, this), { strict: true })) as any;
        validationValue = new User(validateResponse);
      } catch (err) {
        validationError = err;
      }
      return { value: validationValue, error: validationError };
    } catch (err) {
      throw err;
    }
  }
}

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const schema = new Schema({
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     username: { type: String, unique: true, required: true },
//     passwordHash: { type: String, required: true },
//     role: { type: String, required: true }
// });

// schema.set('toJSON', {
//     virtuals: true,
//     versionKey: false,
//     transform: function (doc, ret) {
//         // remove these props when object is serialized
//         delete ret._id;
//         delete ret.passwordHash;
//     }
// });

// module.exports = mongoose.model('User', schema);
