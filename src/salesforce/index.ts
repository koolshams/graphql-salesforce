import config from 'config';
import { createConnection, SFConnection } from 'nforce';
import { logger } from '../logger';

interface SalesForceConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  environment: string;
  username: string;
  password: string;
}

let connectionPromise: Promise<SFConnection> | null = null;

export function getOne<T>(
  result: { records: any[] },
  mapResult: (result: any) => T
) {
  if (result.records.length === 0) {
    return null;
  }

  return mapResult(result.records[0]);
}

export async function getSFConnection() {
  const {
    clientId,
    clientSecret,
    redirectUri,
    environment,
    username,
    password
  } = config.get<SalesForceConfig>('salesforce');
  if (!connectionPromise) {
    connectionPromise = new Promise<SFConnection>((resolve, reject) => {
      const sfConnection = createConnection({
        clientId,
        clientSecret,
        redirectUri,
        environment,
        autoRefresh: true,
        mode: 'single',
        apiVersion: 'v38.0'
      });
      sfConnection.authenticate(
        {
          username,
          password
        },
        err => {
          if (err) {
            logger.error('Error occured while salesforce auth', err);
            reject(err);
          } else {
            logger.info('Salesforce Auth completed');
            resolve(sfConnection);
          }
        }
      );
    });
  }
  return connectionPromise;
}
