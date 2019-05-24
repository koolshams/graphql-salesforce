/// <reference types="node" />

declare module 'nforce' {
  export interface SFConnection {
    authenticate: (
      args: {
        username: string;
        password: string;
      },
      errorHandler: (error: any) => void
    ) => Promise<any>;
    query: (args: {
      query: string;
      raw: boolean;
    }) => Promise<{ records: any[] }>;
  }
  export function createConnection(settings: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    environment: string;
    autoRefresh: boolean;
    mode: string;
    apiVersion: string;
  }): SFConnection;
}
