// node_modules
import { SSM } from 'aws-sdk';
import dotEnvSafe from 'dotenv-safe';
import * as _ from 'lodash';
import { promisify } from 'util';

// models
import { AnyObject } from '../../models/common';

/* libraries */
export interface EnvironmentInterface extends AnyObject {
  name?: string;
  NODE_ENV: string;
  DATACENTER_ENV: string;
}

export class Environment implements EnvironmentInterface {
  public name!: string;

  public constructor(wellmarkEnvironment: { name?: string } = {}) {
    _.assign(this, {
      ...wellmarkEnvironment,
    });
  }
  [key: string]: unknown;

  public get NODE_ENV(): string {
    return process.env.NODE_ENV as string;
  }
  public get DATACENTER_ENV(): string {
    return process.env.DATACENTER_ENV as string;
  }

  public async load(options: { ssm?: boolean; example?: string; path?: string; awsConfig?: any } = {}) {
    try {
      const examplePath: string = options.example ? options.example : './.env.example';
      const envPath: string = options.path ? options.path : './.env';
      if (options.ssm) {
        let found: AWS.SSM.GetParametersByPathResult | any = {};
        let initial = true;
        let completed = false;
        const ssm = options.awsConfig ? new SSM(options.awsConfig) : new SSM();
        // @ts-ignore
        ssm.getParametersByPath = promisify(ssm.getParametersByPath);
        const env = (() => {
          try {
            dotEnvSafe.config({
              sample: examplePath,
            });
          } catch (err) {
            if (err.name === 'MissingEnvVarsError') {
              return err.missing;
            }
            throw err;
          }
        })();
        while (!completed) {
          if (!found.NextToken) {
            if (initial) {
              const prms = {
                Path: this.name && this.name !== '' ? `/${process.env.NODE_ENV}/${this.name}/` : `/${process.env.NODE_ENV}/`,
                WithDecryption: true,
              };

              found = await ssm.getParametersByPath(prms);

              for (let i = 0; i < found.Parameters.length; i++) {
                const paramaterFound = env.find(
                  (e: unknown) => found.Parameters[i].Name.split('/')[found.Parameters[i].Name.split('/').length - 1] === e,
                );
                if (paramaterFound) {
                  process.env[found.Parameters[i].Name.split('/')[found.Parameters[i].Name.split('/').length - 1]] =
                    found.Parameters[i].Value;
                }
              }
              initial = false;
            } else {
              dotEnvSafe.config({
                sample: examplePath,
              });
              completed = true;
            }
          } else {
            const prms = {
              Path: this.name && this.name !== '' ? `/${process.env.NODE_ENV}/${this.name}/` : `/${process.env.NODE_ENV}/`,
              WithDecryption: true,
              NextToken: found.NextToken,
            };
            found = await ssm.getParametersByPath(prms);
            for (let i = 0; i < found.Parameters.length; i++) {
              const paramaterFound = env.find(
                (e: unknown) => found.Parameters[i].Name.split('/')[found.Parameters[i].Name.split('/').length - 1] === e,
              );
              if (paramaterFound) {
                process.env[found.Parameters[i].Name.split('/')[found.Parameters[i].Name.split('/').length - 1]] =
                  found.Parameters[i].Value;
              }
            }
          }
        }
      } else {
        dotEnvSafe.config({
          sample: examplePath,
          path: envPath,
        });
      }
      return;
    } catch (err) {
      throw err;
    }
  }

  public async init(environmentConfig: {
    name: string;
    options?: { ssm?: boolean; example?: string; path?: string; awsConfig?: unknown };
  }) {
    try {
      // set internals from config
      _.assign(this, {
        name: environmentConfig.name,
      });
      // now load environment
      await this.load(_.get(environmentConfig, 'options', {}));
      // return explicitly
      return;
    } catch (err) {
      throw err;
    }
  }
}
