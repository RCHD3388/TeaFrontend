import { GraphQLFormattedError } from 'graphql';

export interface CustomGraphQLError extends GraphQLFormattedError {
  code?: string;
  original?: any;
  details?: {
    path?: string[];
    stacktrace?: string[] | null;
  };
}
