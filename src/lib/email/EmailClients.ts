// node_modules
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import * as _ from 'lodash';
// import { promisify } from 'util';

export interface EmailClientConfigurationInterface {
  name: string;
  service: string;
  auth: {
    user: string;
    pass: string;
  };
}

export interface EmailClientsInterface {
  clients: {
    [key: string]: {
      configuration?: EmailClientConfigurationInterface;
      client?: Mail;
    };
  };
}

export class EmailClients implements EmailClientsInterface {
  public clients!: {
    [key: string]: {
      configuration?: EmailClientConfigurationInterface;
      client?: Mail;
    };
  };

  public constructor() {
    this.clients = {};
  }

  public setClient(clientName: string, client: Mail): void {
    if (!this.clients[clientName]) this.clients[clientName] = {};

    this.clients[clientName].client = _.cloneDeep(client);

    return;
  }

  public getClient(clientName: string): Mail {
    return this.clients[clientName].client as Mail;
  }

  public setConfiguration(clientName: string, configuration: EmailClientConfigurationInterface): void {
    if (!this.clients[clientName]) this.clients[clientName] = {};

    this.clients[clientName].configuration = _.cloneDeep(configuration);

    return;
  }

  public getConfiguration(clientName: string): EmailClientConfigurationInterface {
    return this.clients[clientName].configuration as EmailClientConfigurationInterface;
  }

  public init(configurations: EmailClientConfigurationInterface[]): void {
    for (const configuration of configurations) {
      // create an email client firs
      const emailClient = nodemailer.createTransport({
        service: configuration.service,
        auth: {
          user: configuration.auth.user,
          pass: configuration.auth.pass,
        },
      });

      // // promisify any func we will need -
      // // we do not want to deal with callbacks
      // emailClient.sendMail = promisify(emailClient.sendMail);

      // store the clients and
      // configuration for later usage
      this.setConfiguration(configuration.name, configuration);
      this.setClient(configuration.name, emailClient);

      // return explicitly
      return;
    }
  }
}
