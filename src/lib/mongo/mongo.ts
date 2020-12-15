// node_modules
import _ from 'lodash';
import { ClientSession as MongoClientSession, Db as MongoDb, MongoClient, MongoClientOptions, MongoError } from 'mongodb';

// libraries
import { logger } from '../logger';
import { anyUtils } from '../utils/any';

// models
import { APIError } from '../../models/error';

/**
 * This is a basic wrapper function
 * arroun the MongoClient.connect function
 * that turns it from a callback into a Promise
 * @param {string} uri
 * @param {MongoClientOptions} options
 * @returns {Promise<MongoClient>}
 */
function mongoClientConnect(uri: string, options: MongoClientOptions): Promise<MongoClient> {
  return new Promise((res, rej) =>
    MongoClient.connect(uri, options, (err: MongoError, mongoClient: MongoClient) => {
      if (err) {
        return rej(err);
      }
      return res(mongoClient);
    }),
  );
}

/// ///////////////////////////////////////////////////
/// ///////////////////////////////////////////////////
/// /////////////// Mongo Datasource //////////////////
/// ///////////////////////////////////////////////////
/// ///////////////////////////////////////////////////

/**
 * This interface lays out the contrat/shape
 * of a MongoDatasource entity
 * @export
 * @interface MongoDatasourceInterface
 */
export interface MongoDatasourceInterface {
  config?: MongoConnectionConfigInterface;
  client?: MongoClient;
  database?: MongoDb;
  connectionInitTime?: Date | string | number;
}

/**
 * The class for MongoDatasources - MongoDatasources
 * house everything needed to engage with mongo and
 * the desired mongo connection of the user - includes
 * the original MongoConnectionConfig, a Mongoclient,
 * a Mongo Db, and internal metada around the datasource
 * (i.e. connectionInitTime, etc.)
 * @export
 * @class MongoDatasource
 * @implements {MongoDatasourceInterface}
 */
export class MongoDatasource implements MongoDatasourceInterface {
  public config?: MongoConnectionConfig;
  public client?: MongoClient;
  public database?: MongoDb;
  public connectionInitTime?: Date;

  /**
   * Creates an instance of MongoDatasource.
   * @param {MongoDatasourceInterface} params
   * @memberof MongoDatasource
   */
  public constructor(params: MongoDatasourceInterface) {
    Object.assign(this, {
      ...params,
      config: _.get(params, 'config'),
      client: _.get(params, 'client'),
      database: _.get(params, 'database'),
      connectionInitTime: new Date(),
      // connectionInitTime: new Date(_.get(params, 'connectionInitTime', new Date()), new Date())
    });
  }

  /**
   * Allows user to check if the MongoDatasource's connection
   * has been connected past the user's desired connection stale timeframe -
   * defined in the config they used to intialize this instance -
   * if no connectionStaleTimeframe was given in the config then false
   * is returned and it is assumed the user can handle any repercussions
   * of not ensuring a good fresh connection
   * @readonly
   * @memberof MongoDatasource
   */
  public get hasStaleConnection(): boolean {
    // initiate flag for staleConnection
    let staleConnection = false;
    // if the config used for the initial connection
    // had a specified window of time that they wanted
    // used for detecting a "stale" connection, then enter block
    if (_.get(this, 'config.connectionStaleTimeframe')) {
      // reference to the original time of connection
      const beginningConnectionNotStaleTimeframe = this.connectionInitTime as Date;
      // reference to the end of the window of time
      const endingConnectionNotStaleTimeframe = new Date(
        beginningConnectionNotStaleTimeframe.getTime() + (this.config as MongoConnectionConfig).connectionStaleTimeframe * 60000,
      );
      // get the hr difference netween now and the reference
      // to the end of the stale conenction window of time
      const hrDiff = (endingConnectionNotStaleTimeframe.getTime() - new Date().getTime()) / 1000;
      // get minute difference
      const minDiff = hrDiff / 60;
      // if the diff is negetaive then
      // the current connection is considered
      // "stale" as it was instantiated too long ago
      staleConnection = minDiff < 0;
    }
    return staleConnection;
  }

  /**
   * Allows the user to check if the MongoDatasource that is
   * currently initiated is still connected and that connection
   * is still healthy to the desired mongo server and database
   * @readonly
   * @memberof MongoDatasource
   */
  public get isConnected(): boolean {
    return (
      // this checks the client's internal isConnected function -
      // the internal mongodb source code uses this to determine
      // if it needs to throw a TransientTransactionError or
      // MongoNetworkError - we check it ahead of the drivers in an
      // attempt to control bad connections, followed by reconnects
      (this.client as MongoClient).isConnected({ returnNonCachedInstance: false }) &&
      (this.client as MongoClient).isConnected({ returnNonCachedInstance: true }) &&
      // this checks the db's internal topology domain, along
      // with its own isConnected and isDestroyed functionality -
      // the internal mongodb source code uses this to determine
      // if it needs to throw a TransientTransactionError or
      // MongoNetworkError - we check it ahead of the drivers in an
      // attempt to control bad connections, followed by reconnects
      (this.database as MongoDb | any).topology &&
      (this.database as MongoDb | any).topology.isConnected({ returnNonCachedInstance: true }) &&
      (this.database as MongoDb | any).topology.isConnected({ returnNonCachedInstance: false }) &&
      (this.database as MongoDb | any).topology.isDestroyed({ returnNonCachedInstance: true }) !== true &&
      (this.database as MongoDb | any).topology.isDestroyed({ returnNonCachedInstance: false }) !== true &&
      // this checks the db's internal serverConfig domain, along
      // with its own isConnected and isDestroyed functionality -
      // the internal mongodb source code uses this to determine
      // if it needs to throw a TransientTransactionError or
      // MongoNetworkError - we check it ahead of the drivers in an
      // attempt to control bad connections, followed by reconnects
      (this.database as MongoDb | any).serverConfig &&
      (this.database as MongoDb | any).serverConfig.isConnected({ returnNonCachedInstance: true }) &&
      (this.database as MongoDb | any).serverConfig.isConnected({ returnNonCachedInstance: false }) &&
      (this.database as MongoDb | any).serverConfig.isDestroyed({ returnNonCachedInstance: true }) !== true &&
      (this.database as MongoDb | any).serverConfig.isDestroyed({ returnNonCachedInstance: false }) !== true &&
      // this is a custom implementation that allows a user to
      // determine a window of time in which a connection is deemed
      // "fresh" - and if outside of said window of time then it is
      // deemed "stale" and should be reconnected just to be safe
      this.hasStaleConnection !== true
    );
  }
}

/// ///////////////////////////////////////////////////
/// ///////////////////////////////////////////////////
/// //////////// Mongo Connection Config //////////////
/// ///////////////////////////////////////////////////
/// ///////////////////////////////////////////////////

/**
 * This interface lays out the contrat/shape
 * of a MongoConnectionConfig entity
 * @export
 * @interface MongoConnectionConfigInterface
 */
export interface MongoConnectionConfigInterface {
  name: string;
  database: string;
  options?: MongoClientOptions;
  connectionStaleTimeframe?: number;
  host: string;
  port?: number;
}

/**
 * The class for MongoConnectionConfig - MongoConnectionConfigs
 * house everything needed to engage build a connection with/connect
 * with a desired mongo server and database
 * @export
 * @class MongoConnectionConfig
 * @implements {MongoConnectionConfigInterface}
 */
export class MongoConnectionConfig implements MongoConnectionConfigInterface {
  public name!: string;
  public database!: string;
  public options!: MongoClientOptions;
  public connectionStaleTimeframe!: number;
  public host!: string;
  public port?: number;

  /**
   * Creates an instance of MongoConnectionConfig.
   * @param {MongoConnectionConfigInterface} params
   * @memberof MongoConnectionConfig
   */
  public constructor(params: MongoConnectionConfigInterface) {
    Object.assign(this, {
      ...params,
      name: _.get(params, 'name'),
      database: _.get(params, 'database'),
      options: _.get(params, 'options'),
      connectionStaleTimeframe: _.get(params, 'connectionStaleTimeframe'),
      host: _.get(params, 'host'),
      port: _.get(params, 'port'),
    });
  }

  /**
   * simple getter to return correct uri
   * for connecting purposes
   * @readonly
   * @memberof MongoConnectionConfig
   */
  public get uri(): string {
    return this.port ? `${this.host}:${this.port}/` : `${this.host}/`;
  }
}

/// ///////////////////////////////////////////////////
/// ///////////////////////////////////////////////////
/// ///////////////////// Mongo ///////////////////////
/// ///////////////////////////////////////////////////
/// ///////////////////////////////////////////////////

/**
 *
 *
 * @export
 * @interface MongoInterface
 */
export interface MongoInterface {
  datasources: { [key: string]: MongoDatasourceInterface[] };
}

/**
 *
 *
 * @export
 * @class Mongo
 * @implements {MongoInterface}
 *
 * @example
 * // src/configs/mongo-datasources.ts
 * export default [
 *  {
 *    name: 'TEST',
 *    database: 'testDb',
 *    options: {
 *      poolSize: 20,
 *      authMechanism: 'DEFAULT',
 *      authSource: 'admin',
 *      auth: {
 *        user: process.env.TEST_DB_MONGO_USER,
 *        password: process.env.TEST_DB_MONGO_PWD
 *      },
 *      keepAlive: true,
 *      connectTimeoutMS: 500000,
 *      socketTimeoutMS: 500000,
 *      reconnectTries: 3,
 *      reconnectInterval: 500,
 *      replicaSet: process.env.NODE_ENV === 'PROD' ? 'rs_prod' : process.env.NODE_ENV === 'PREP' ? 'rs_prep' : undefined
 *    },
 *    connectionStaleTimeframe: 15,
 *    host: process.env.TEST_DB_MONGO_HOST,
 *    port: process.env.TEST_DB_MONGO_PORT
 *  }
 * ];
 *
 * // lib/mongo/index.ts
 * import { Mongo } from 'wm-lib-mongo-connector';
 *
 * const mongo = new Mongo({ logger? });
 *
 * export {
 *  mongo
 * }
 *
 * // lambda.ts or index.local.ts
 * import { mongo } from './lib/mongo';
 *
 * (async () => {
 *  try {
 *    // load environment
 *    loadEnv();
 *
 *    await mongo.init(require('./configs/datasources').default);
 *
 *    // listen on sever or awsServerlessExpress
 *    server.listen() or awsServerlessExpress()
 *  } catch (error) {
 *    await mongo.shutdown().catch((err: unknown) => {
 *      // log error possibly,
 *      // but continue - do not
 *      // allow shutdown error
 *      // to derail all other
 *      // exit processes
 *    });
 *    process.exit(1);
 *  }
 * })()
 */
export class Mongo implements MongoInterface {
  public datasources: { [key: string]: MongoDatasource[] };

  /**
   * Creates an instance of Mongo.
   * @memberof Mongo
   */
  public constructor() {
    // initiate the internal datasources
    // library as an empty object
    this.datasources = {};
  }

  /**
   * functionality used for connecting a specfic mongo
   * connection based on a given mongo connection config
   * @param {MongoConnectionConfigInterface} params - reference the MongoConnectionConfigInterface for information
   * @returns {Promise<void>}
   * @memberof Mongo
   */
  public async connect(params: MongoConnectionConfigInterface): Promise<void> {
    try {
      // create instance of the MongoConnectionConfig class
      const mongoConnectionConfig = new MongoConnectionConfig({ ...params });
      // use the previous conenction config to return a mongo client
      const mongoClient: MongoClient = await mongoClientConnect(mongoConnectionConfig.uri, mongoConnectionConfig.options);
      // use previous mongo client to get a reference to a specific database
      const mongoDb: MongoDb = mongoClient.db(mongoConnectionConfig.database);
      // store the original mongo connection config,
      // mongo client, mongo db, and time at which
      // they were connected in a new internal
      // MongoDatasource instance
      if (!this.datasources[params.name] || !this.datasources[params.name].length) this.datasources[params.name] = [];
      this.datasources[params.name].push(
        new MongoDatasource({
          config: mongoConnectionConfig,
          client: mongoClient,
          database: mongoDb,
          connectionInitTime: new Date(),
        }),
      );
      // return explicitly
      return;
    } catch (err) {
      // throw explicitly
      throw err;
    }
  }

  /**
   * functionality used to instantiate connections to mongo
   * databases and efficiently/safely house global singleton references
   * @param {MongoConnectionConfigInterface[]} params - reference the MongoConnectionConfigInterface for information
   * @returns {Promise<void>}
   * @memberof Mongo
   */
  public async init(params: MongoConnectionConfigInterface[]): Promise<void> {
    try {
      // chunk the given configs as to control/throttle the amount of
      // of concurrently executing connection functions
      const chunkedMongoConnectionConfigs = _.chunk(params, 5);
      // loop through each batched chunk
      for (let i = 0; i < chunkedMongoConnectionConfigs.length; i++) {
        // initiate a holder for the connection tasks
        const connectTasks = [];
        // loop through each item in the current batched chunk
        for (let j = 0; j < chunkedMongoConnectionConfigs[i].length; j++) {
          // push a call to the internal connect function into the connectTasks array for conecurrent execution
          connectTasks.push(this.connect(chunkedMongoConnectionConfigs[i][j]));
        }
        // await all concurrent connect tasks
        // until each is completed
        await Promise.all(connectTasks);
      }
      // return explicitly
      return;
    } catch (err) {
      // throw explicitly
      throw err;
    }
  }

  /**
   * functionality used to verify a conenction and reconnect
   * said connection if the connection is deemed as "bad"
   * @param {string} connectionName - name of the internal connection dictionary key
   * @returns {Promise<void>}
   * @memberof Mongo
   */
  public async verifyConnection(connectionName: string): Promise<void> {
    try {
      // throw error if connection does not exist
      if (!this.datasources[connectionName] || !this.datasources[connectionName].length) {
        throw new Error(`Mongo connection ${connectionName} does no exist`);
      }
      // create reference for ease
      const mongoDatasource = this.datasources[connectionName][this.datasources[connectionName].length - 1];
      // check to see if the current internal datasource is
      // deemed as "connect" and if not then reconnect
      if (!mongoDatasource.isConnected) {
        await this.connect(mongoDatasource.config as MongoConnectionConfig);
        // release any previous old conenction explicitly -
        // is length is greater than three, that way we make
        // sure the reference is old enough - as to not interrupt
        // any ongoing transactions, queries, etc
        if (this.datasources[connectionName].length >= 3) {
          const [oldMongoDatasource] = this.datasources[connectionName].splice(0, 1);
          // try catch incase it is undefined by now
          try {
            (oldMongoDatasource.client as MongoClient).close().catch((err: unknown) => {
              // build error
              const error = new APIError(err);
              // log for debugging and run support purposes
              logger.error(
                `{}App::#verifyConnection#::error closing mongo connection ${connectionName}::error=${anyUtils.stringify(error)}`,
              );
              // return explicitly
              return;
            });
          } catch (e) {
            // build error
            const error = new APIError(e);
            // log for debugging and run support purposes
            logger.error(
              `{}App::#verifyConnection#::error attempting to close mongo connection ${connectionName}::error=${anyUtils.stringify(error)}`,
            );
            // return explicitly
            return;
          }
        }
      }
      // return explicitly
      return;
    } catch (err) {
      // build error
      const error = new APIError(err);
      // log for debugging and run support purposes
      logger.error(`{}App::#verifyConnection#::error executing::error=${anyUtils.stringify(error)}`);
      // throw explicitly
      throw err;
    }
  }

  /**
   * functionality to grab a reference to an
   * internal connection's database
   * @param {string} connectionName - name of the internal connection dictionary key
   * @returns {Promise<Db>}
   * @memberof Mongo
   */
  public async getConnection(connectionName: string): Promise<MongoDb> {
    try {
      // verify the connection and reconenct if necessary
      await this.verifyConnection(connectionName);
      // return the desired connection
      return this.datasources[connectionName][this.datasources[connectionName].length - 1].database as MongoDb;
    } catch (error) {
      // throw explicilty
      throw error;
    }
  }

  /**
   * functionality to grab a reference to an
   * internal connection's client
   * @param {string} connectionName - name of the internal connection dictionary key
   * @returns {Promise<MongoClient>}
   * @memberof Mongo
   */
  public async getClient(connectionName: string): Promise<MongoClient> {
    try {
      // verify the connection and reconenct if necessary
      await this.verifyConnection(connectionName);
      // return the desired connection
      return this.datasources[connectionName][this.datasources[connectionName].length - 1].client as MongoClient;
    } catch (error) {
      // throw explicilty
      throw error;
    }
  }

  /**
   * functionality to "gracefully" (lawl) shutdown
   * or close all internal connections
   * @returns {Promise<void>}
   * @memberof Mongo
   */
  public async shutdown(): Promise<void> {
    try {
      // get the keys of the internal
      // datasources properties - this allows
      // us to get references to all internal
      // connections - we will be using these
      // to loop through and shutdown connections
      // in a controlled/throttled fashion
      const connectionNames = Object.keys(this.datasources);
      // chunk the connection names - this allows us
      // to control the limit of concurrency/throttle
      // async connection closing operations
      const chunkedConnectionNames = _.chunk(connectionNames, 5);
      // loop through each of the chunked batches
      for (let i = 0; i < chunkedConnectionNames.length; i++) {
        // initiate a holder for the dhutdown/close tasks
        const connectionShutdownTasks = [];
        // loop through each item in the current chunked batch
        for (let j = 0; j < chunkedConnectionNames[i].length; j++) {
          // loop through all versions of the connection
          for (let k = 0; k < this.datasources[chunkedConnectionNames[i][j]].length; k++) {
            // execute the close() method on the connection's internal mongo client
            connectionShutdownTasks.push(
              (this.datasources[chunkedConnectionNames[i][j]][k].client as MongoClient).close().catch((err: unknown) => {
                // build error
                const error = new APIError(err);
                // log for debugging and run support purposes
                logger.error(
                  `{}App::#shutdown#::error shutting down mongo connection ${
                    this.datasources[chunkedConnectionNames[i][j]][k].config?.name
                  }::error=${anyUtils.stringify(error)}`,
                );
                // return explicitly - we do this
                // because we do not want to interrupt
                // any other shutdown flows going on
                // as this is usually used in a shutdown process
                return;
              }),
            );
          }
        }
        // await the current back of connection shutdown tasks
        await Promise.all(connectionShutdownTasks);
      }
      // return explicitly
      return;
    } catch (error) {
      // throw explicitly
      throw error;
    }
  }
}

/// ///////////////////////////////////////////////////
/// ///////////////////////////////////////////////////
/// ///////////////////// Misc ////////////////////////
/// ///////////////////////////////////////////////////
/// ///////////////////////////////////////////////////

export { MongoClientSession, MongoClient, MongoClientOptions, MongoDb, MongoError };
