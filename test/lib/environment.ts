import { Env, EnvInterface } from '../../src/lib/environment';

export interface IntegrationTestEnvInterface extends EnvInterface {
  TEST_TO_EMAIL_ADDRESS: string;
}

export class IntegrationTestEnv extends Env implements IntegrationTestEnvInterface {
  // non-computed values
  public get TEST_TO_EMAIL_ADDRESS(): string {
    return process.env.TEST_TO_EMAIL_ADDRESS as string;
  }
  public set EMAIL_ADDRESS(value: string) {
    process.env.TEST_TO_EMAIL_ADDRESS = `${value}`;
  }

  public async init(): Promise<void> {
    await super.init({
      ...require('../../src/configs/environment').default,
      options: {
        example: './.env.integration.test.example',
        path: './.env.integration.test',
      },
    });
  }
}

export interface E2ETestEnvInterface extends EnvInterface {
  TEST_TO_EMAIL_ADDRESS: string;
}

export class E2ETestEnv extends Env implements E2ETestEnvInterface {
  // non-computed values
  public get TEST_TO_EMAIL_ADDRESS(): string {
    return process.env.TEST_TO_EMAIL_ADDRESS as string;
  }
  public set EMAIL_ADDRESS(value: string) {
    process.env.TEST_TO_EMAIL_ADDRESS = `${value}`;
  }

  public async init(): Promise<void> {
    await super.init({
      ...require('../../src/configs/environment').default,
      options: {
        example: './.env.e2e.test.example',
        path: './.env.e2e.test',
      },
    });
  }
}

const integrationTestEnv = new IntegrationTestEnv();
const e2eTestEnv = new E2ETestEnv();

export { integrationTestEnv, e2eTestEnv };
