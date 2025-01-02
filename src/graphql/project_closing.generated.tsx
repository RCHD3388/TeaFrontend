import * as Types from '../types/graphql_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FindAllRequestClosingQueryVariables = Types.Exact<{
  projectId?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type FindAllRequestClosingQuery = { __typename?: 'Query', findAllRequestClosing: Array<{ __typename?: 'RequestProjectClosing', _id: string, title: string, description?: string | null, requested_at: any, status: string, handled_date?: any | null }> };

export type CreateRequestClosingMutationVariables = Types.Exact<{
  createRequestClosingInput: Types.CreateRequestClosingInput;
}>;


export type CreateRequestClosingMutation = { __typename?: 'Mutation', createRequestClosing: { __typename?: 'RequestProjectClosing', _id: string, title: string, description?: string | null, requested_at: any, status: string, handled_date?: any | null } };


export const FindAllRequestClosingDocument = gql`
    query FindAllRequestClosing($projectId: String) {
  findAllRequestClosing(projectId: $projectId) {
    _id
    title
    description
    requested_at
    status
    handled_date
  }
}
    `;

/**
 * __useFindAllRequestClosingQuery__
 *
 * To run a query within a React component, call `useFindAllRequestClosingQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllRequestClosingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllRequestClosingQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useFindAllRequestClosingQuery(baseOptions?: Apollo.QueryHookOptions<FindAllRequestClosingQuery, FindAllRequestClosingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllRequestClosingQuery, FindAllRequestClosingQueryVariables>(FindAllRequestClosingDocument, options);
      }
export function useFindAllRequestClosingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllRequestClosingQuery, FindAllRequestClosingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllRequestClosingQuery, FindAllRequestClosingQueryVariables>(FindAllRequestClosingDocument, options);
        }
export function useFindAllRequestClosingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllRequestClosingQuery, FindAllRequestClosingQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllRequestClosingQuery, FindAllRequestClosingQueryVariables>(FindAllRequestClosingDocument, options);
        }
export type FindAllRequestClosingQueryHookResult = ReturnType<typeof useFindAllRequestClosingQuery>;
export type FindAllRequestClosingLazyQueryHookResult = ReturnType<typeof useFindAllRequestClosingLazyQuery>;
export type FindAllRequestClosingSuspenseQueryHookResult = ReturnType<typeof useFindAllRequestClosingSuspenseQuery>;
export type FindAllRequestClosingQueryResult = Apollo.QueryResult<FindAllRequestClosingQuery, FindAllRequestClosingQueryVariables>;
export const CreateRequestClosingDocument = gql`
    mutation CreateRequestClosing($createRequestClosingInput: CreateRequestClosingInput!) {
  createRequestClosing(createRequestClosingInput: $createRequestClosingInput) {
    _id
    title
    description
    requested_at
    status
    handled_date
  }
}
    `;
export type CreateRequestClosingMutationFn = Apollo.MutationFunction<CreateRequestClosingMutation, CreateRequestClosingMutationVariables>;

/**
 * __useCreateRequestClosingMutation__
 *
 * To run a mutation, you first call `useCreateRequestClosingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRequestClosingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRequestClosingMutation, { data, loading, error }] = useCreateRequestClosingMutation({
 *   variables: {
 *      createRequestClosingInput: // value for 'createRequestClosingInput'
 *   },
 * });
 */
export function useCreateRequestClosingMutation(baseOptions?: Apollo.MutationHookOptions<CreateRequestClosingMutation, CreateRequestClosingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRequestClosingMutation, CreateRequestClosingMutationVariables>(CreateRequestClosingDocument, options);
      }
export type CreateRequestClosingMutationHookResult = ReturnType<typeof useCreateRequestClosingMutation>;
export type CreateRequestClosingMutationResult = Apollo.MutationResult<CreateRequestClosingMutation>;
export type CreateRequestClosingMutationOptions = Apollo.BaseMutationOptions<CreateRequestClosingMutation, CreateRequestClosingMutationVariables>;