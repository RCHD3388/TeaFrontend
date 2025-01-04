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

export type UpdateRequestClosingMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  updateRequestStatusInput: Types.UpdateRequestStatusInput;
}>;


export type UpdateRequestClosingMutation = { __typename?: 'Mutation', updateRequestClosing: { __typename?: 'RequestProjectClosing', _id: string, title: string, description?: string | null, requested_at: any, status: string, handled_date?: any | null } };

export type FindOneRequestClosingQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type FindOneRequestClosingQuery = { __typename?: 'Query', findOneRequestClosing: { __typename?: 'RequestProjectClosing', _id: string, title: string, description?: string | null, requested_at: any, status: string, handled_date?: any | null, handled_by?: { __typename?: 'Employee', _id: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string } } | null, requested_by: { __typename?: 'Employee', _id: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string } }, requested_from: { __typename?: 'Project', _id: string, name: string, location: string, description: string, warehouse: string } } };


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
export const UpdateRequestClosingDocument = gql`
    mutation UpdateRequestClosing($id: String!, $updateRequestStatusInput: UpdateRequestStatusInput!) {
  updateRequestClosing(
    id: $id
    updateRequestStatusInput: $updateRequestStatusInput
  ) {
    _id
    title
    description
    requested_at
    status
    handled_date
  }
}
    `;
export type UpdateRequestClosingMutationFn = Apollo.MutationFunction<UpdateRequestClosingMutation, UpdateRequestClosingMutationVariables>;

/**
 * __useUpdateRequestClosingMutation__
 *
 * To run a mutation, you first call `useUpdateRequestClosingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRequestClosingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRequestClosingMutation, { data, loading, error }] = useUpdateRequestClosingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateRequestStatusInput: // value for 'updateRequestStatusInput'
 *   },
 * });
 */
export function useUpdateRequestClosingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRequestClosingMutation, UpdateRequestClosingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRequestClosingMutation, UpdateRequestClosingMutationVariables>(UpdateRequestClosingDocument, options);
      }
export type UpdateRequestClosingMutationHookResult = ReturnType<typeof useUpdateRequestClosingMutation>;
export type UpdateRequestClosingMutationResult = Apollo.MutationResult<UpdateRequestClosingMutation>;
export type UpdateRequestClosingMutationOptions = Apollo.BaseMutationOptions<UpdateRequestClosingMutation, UpdateRequestClosingMutationVariables>;
export const FindOneRequestClosingDocument = gql`
    query FindOneRequestClosing($id: String!) {
  findOneRequestClosing(id: $id) {
    _id
    title
    description
    requested_at
    status
    handled_date
    handled_by {
      _id
      person {
        name
        email
        phone_number
        address
      }
    }
    requested_by {
      _id
      person {
        name
        email
        phone_number
        address
      }
    }
    requested_from {
      _id
      name
      location
      description
      warehouse
    }
  }
}
    `;

/**
 * __useFindOneRequestClosingQuery__
 *
 * To run a query within a React component, call `useFindOneRequestClosingQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneRequestClosingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneRequestClosingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindOneRequestClosingQuery(baseOptions: Apollo.QueryHookOptions<FindOneRequestClosingQuery, FindOneRequestClosingQueryVariables> & ({ variables: FindOneRequestClosingQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneRequestClosingQuery, FindOneRequestClosingQueryVariables>(FindOneRequestClosingDocument, options);
      }
export function useFindOneRequestClosingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneRequestClosingQuery, FindOneRequestClosingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneRequestClosingQuery, FindOneRequestClosingQueryVariables>(FindOneRequestClosingDocument, options);
        }
export function useFindOneRequestClosingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindOneRequestClosingQuery, FindOneRequestClosingQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindOneRequestClosingQuery, FindOneRequestClosingQueryVariables>(FindOneRequestClosingDocument, options);
        }
export type FindOneRequestClosingQueryHookResult = ReturnType<typeof useFindOneRequestClosingQuery>;
export type FindOneRequestClosingLazyQueryHookResult = ReturnType<typeof useFindOneRequestClosingLazyQuery>;
export type FindOneRequestClosingSuspenseQueryHookResult = ReturnType<typeof useFindOneRequestClosingSuspenseQuery>;
export type FindOneRequestClosingQueryResult = Apollo.QueryResult<FindOneRequestClosingQuery, FindOneRequestClosingQueryVariables>;