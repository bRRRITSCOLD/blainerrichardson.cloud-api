import { Environment, EnvironmentInterface } from './environment';

export interface EnvInterface extends EnvironmentInterface {
  // user supplied env vars
  PORT: number;
  ALLOWED_ORIGINS: string;
  JWT_SECRET: string;
  COOKIE_SECRET: string;
  CRYPTOGRAPHY_KEY: string;

  // computed env vars
  isLocal: boolean;
}

export class Env extends Environment implements EnvInterface {
  // user supplied env vars
  public get PORT(): number {
    return +(process.env.PORT as string);
  }
  public set PORT(value: number) {
    process.env.PORT = `${value}`;
  }
  public get ALLOWED_ORIGINS(): string {
    return process.env.ALLOWED_ORIGINS as string;
  }
  public set ALLOWED_ORIGINS(value: string) {
    process.env.ALLOWED_ORIGINS = `${value}`;
  }
  public get JWT_SECRET(): string {
    return process.env.JWT_SECRET as string;
  }
  public set JWT_SECRET(value: string) {
    process.env.JWT_SECRET = `${value}`;
  }
  public get COOKIE_SECRET(): string {
    return process.env.COOKIE_SECRET as string;
  }
  public set COOKIE_SECRET(value: string) {
    process.env.COOKIE_SECRET = `${value}`;
  }
  public get CRYPTOGRAPHY_KEY(): string {
    return process.env.CRYPTOGRAPHY_KEY as string;
  }
  public set CRYPTOGRAPHY_KEY(value: string) {
    process.env.CRYPTOGRAPHY_KEY = `${value}`;
  }

  // computed values
  public get isLocal(): boolean {
    return this.NODE_ENV.toUpperCase() === 'LOCAL';
  }
}

const env = new Env();

export { env };
