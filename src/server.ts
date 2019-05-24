import { ApolloServer, gql } from 'apollo-server';
import { readFileSync } from 'fs';

import { AccountService } from './account/account.service';
import { logger } from './logger';
import { getSFConnection } from './salesforce';

const query = readFileSync(__dirname + '/../graphql/schema.graphql').toString();
const typeDefs = gql(query);

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const accountService = new AccountService(getSFConnection);
const resolvers = {
  Query: {
    getAccount: (parent: any, { id }: { id: string }, context: any, info: any) => {
      return accountService.getAccount(id);
    }
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }: { url: string }) => {
  logger.info(`🚀  Server ready at ${url}`);
});
