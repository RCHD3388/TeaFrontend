import * as Types from '../types/graphql_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FindAllRequestCostsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FindAllRequestCostsQuery = { __typename?: 'Query', findAllRequestCosts: Array<{ __typename?: 'RequestCost', _id: string, title: string, description?: string | null, requested_at: any, status: string, price: number, handled_date?: any | null, requested_from: { __typename?: 'Project', _id: string, name: string, location: string, description: string, createdAt: any, finished_at?: any | null, target_date?: any | null, warehouse: string }, project_cost_category: { __typename?: 'CategoryData', _id: string, name: string, description?: string | null, type: string }, requested_by: { __typename?: 'Employee', _id: string, hire_date: any, salary?: number | null, status: string }, handled_by?: { __typename?: 'Employee', _id: string, hire_date: any, salary?: number | null, status: string } | null }> };

export type CreateRequestCostMutationVariables = Types.Exact<{
  createRequestCostInput: Types.CreateRequestCostInput;
}>;


export type CreateRequestCostMutation = { __typename?: 'Mutation', createRequestCost: { __typename?: 'RequestCost', _id: string, title: string, description?: string | null, requested_at: any, status: string, price: number, handled_date?: any | null } };

export type UpdateRequestCostMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  updateRequestCostStatusInput: Types.UpdateRequestCostStatusInput;
}>;


export type UpdateRequestCostMutation = { __typename?: 'Mutation', updateRequestCost: { __typename?: 'RequestCost', _id: string, title: string, description?: string | null, requested_at: any, status: string, price: number, handled_date?: any | null } };

export type UpdateRequestCostDetailMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  updateRequestInput: Types.UpdateRequestInput;
}>;


export type UpdateRequestCostDetailMutation = { __typename?: 'Mutation', updateRequestCostDetail: { __typename?: 'RequestCost', _id: string, title: string, description?: string | null, requested_at: any, status: string, price: number, handled_date?: any | null } };

export type FindOneRequestCostQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type FindOneRequestCostQuery = { __typename?: 'Query', findOneRequestCost: { __typename?: 'RequestCost', _id: string, title: string, description?: string | null, requested_at: any, status: string, price: number, handled_date?: any | null, createdAt?: any | null, updatedAt?: any | null, project_cost_category: { __typename?: 'CategoryData', _id: string, name: string, type: string, description?: string | null }, requested_from: { __typename?: 'Project', _id: string, name: string, location: string, description: string, warehouse: string }, requested_by: { __typename?: 'Employee', _id: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string } }, handled_by?: { __typename?: 'Employee', _id: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string } } | null } };


export const FindAllRequestCostsDocument = gql`
    query FindAllRequestCosts {
  findAllRequestCosts {
    _id
    title
    description
    requested_at
    status
    price
    handled_date
    requested_from {
      _id
      name
      location
      description
      createdAt
      finished_at
      target_date
      warehouse
    }
    project_cost_category {
      _id
      name
      description
      type
    }
    requested_by {
      _id
      hire_date
      salary
      status
    }
    handled_by {
      _id
      hire_date
      salary
      status
    }
  }
}
    `;

/**
 * __useFindAllRequestCostsQuery__
 *
 * To run a query within a React component, call `useFindAllRequestCostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllRequestCostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllRequestCostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllRequestCostsQuery(baseOptions?: Apollo.QueryHookOptions<FindAllRequestCostsQuery, FindAllRequestCostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllRequestCostsQuery, FindAllRequestCostsQueryVariables>(FindAllRequestCostsDocument, options);
      }
export function useFindAllRequestCostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllRequestCostsQuery, FindAllRequestCostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllRequestCostsQuery, FindAllRequestCostsQueryVariables>(FindAllRequestCostsDocument, options);
        }
export function useFindAllRequestCostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllRequestCostsQuery, FindAllRequestCostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllRequestCostsQuery, FindAllRequestCostsQueryVariables>(FindAllRequestCostsDocument, options);
        }
export type FindAllRequestCostsQueryHookResult = ReturnType<typeof useFindAllRequestCostsQuery>;
export type FindAllRequestCostsLazyQueryHookResult = ReturnType<typeof useFindAllRequestCostsLazyQuery>;
export type FindAllRequestCostsSuspenseQueryHookResult = ReturnType<typeof useFindAllRequestCostsSuspenseQuery>;
export type FindAllRequestCostsQueryResult = Apollo.QueryResult<FindAllRequestCostsQuery, FindAllRequestCostsQueryVariables>;
export const CreateRequestCostDocument = gql`
    mutation CreateRequestCost($createRequestCostInput: CreateRequestCostInput!) {
  createRequestCost(createRequestCostInput: $createRequestCostInput) {
    _id
    title
    description
    requested_at
    status
    price
    handled_date
  }
}
    `;
export type CreateRequestCostMutationFn = Apollo.MutationFunction<CreateRequestCostMutation, CreateRequestCostMutationVariables>;

/**
 * __useCreateRequestCostMutation__
 *
 * To run a mutation, you first call `useCreateRequestCostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRequestCostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRequestCostMutation, { data, loading, error }] = useCreateRequestCostMutation({
 *   variables: {
 *      createRequestCostInput: // value for 'createRequestCostInput'
 *   },
 * });
 */
export function useCreateRequestCostMutation(baseOptions?: Apollo.MutationHookOptions<CreateRequestCostMutation, CreateRequestCostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRequestCostMutation, CreateRequestCostMutationVariables>(CreateRequestCostDocument, options);
      }
export type CreateRequestCostMutationHookResult = ReturnType<typeof useCreateRequestCostMutation>;
export type CreateRequestCostMutationResult = Apollo.MutationResult<CreateRequestCostMutation>;
export type CreateRequestCostMutationOptions = Apollo.BaseMutationOptions<CreateRequestCostMutation, CreateRequestCostMutationVariables>;
export const UpdateRequestCostDocument = gql`
    mutation UpdateRequestCost($id: String!, $updateRequestCostStatusInput: UpdateRequestCostStatusInput!) {
  updateRequestCost(
    id: $id
    updateRequestCostStatusInput: $updateRequestCostStatusInput
  ) {
    _id
    title
    description
    requested_at
    status
    price
    handled_date
  }
}
    `;
export type UpdateRequestCostMutationFn = Apollo.MutationFunction<UpdateRequestCostMutation, UpdateRequestCostMutationVariables>;

/**
 * __useUpdateRequestCostMutation__
 *
 * To run a mutation, you first call `useUpdateRequestCostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRequestCostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRequestCostMutation, { data, loading, error }] = useUpdateRequestCostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateRequestCostStatusInput: // value for 'updateRequestCostStatusInput'
 *   },
 * });
 */
export function useUpdateRequestCostMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRequestCostMutation, UpdateRequestCostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRequestCostMutation, UpdateRequestCostMutationVariables>(UpdateRequestCostDocument, options);
      }
export type UpdateRequestCostMutationHookResult = ReturnType<typeof useUpdateRequestCostMutation>;
export type UpdateRequestCostMutationResult = Apollo.MutationResult<UpdateRequestCostMutation>;
export type UpdateRequestCostMutationOptions = Apollo.BaseMutationOptions<UpdateRequestCostMutation, UpdateRequestCostMutationVariables>;
export const UpdateRequestCostDetailDocument = gql`
    mutation UpdateRequestCostDetail($id: String!, $updateRequestInput: UpdateRequestInput!) {
  updateRequestCostDetail(id: $id, updateRequestInput: $updateRequestInput) {
    _id
    title
    description
    requested_at
    status
    price
    handled_date
  }
}
    `;
export type UpdateRequestCostDetailMutationFn = Apollo.MutationFunction<UpdateRequestCostDetailMutation, UpdateRequestCostDetailMutationVariables>;

/**
 * __useUpdateRequestCostDetailMutation__
 *
 * To run a mutation, you first call `useUpdateRequestCostDetailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRequestCostDetailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRequestCostDetailMutation, { data, loading, error }] = useUpdateRequestCostDetailMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateRequestInput: // value for 'updateRequestInput'
 *   },
 * });
 */
export function useUpdateRequestCostDetailMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRequestCostDetailMutation, UpdateRequestCostDetailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRequestCostDetailMutation, UpdateRequestCostDetailMutationVariables>(UpdateRequestCostDetailDocument, options);
      }
export type UpdateRequestCostDetailMutationHookResult = ReturnType<typeof useUpdateRequestCostDetailMutation>;
export type UpdateRequestCostDetailMutationResult = Apollo.MutationResult<UpdateRequestCostDetailMutation>;
export type UpdateRequestCostDetailMutationOptions = Apollo.BaseMutationOptions<UpdateRequestCostDetailMutation, UpdateRequestCostDetailMutationVariables>;
export const FindOneRequestCostDocument = gql`
    query FindOneRequestCost($id: String!) {
  findOneRequestCost(id: $id) {
    _id
    title
    description
    requested_at
    status
    price
    handled_date
    createdAt
    updatedAt
    project_cost_category {
      _id
      name
      type
      description
    }
    requested_from {
      _id
      name
      location
      description
      warehouse
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
    handled_by {
      _id
      person {
        name
        email
        phone_number
        address
      }
    }
  }
}
    `;

/**
 * __useFindOneRequestCostQuery__
 *
 * To run a query within a React component, call `useFindOneRequestCostQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneRequestCostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneRequestCostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindOneRequestCostQuery(baseOptions: Apollo.QueryHookOptions<FindOneRequestCostQuery, FindOneRequestCostQueryVariables> & ({ variables: FindOneRequestCostQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneRequestCostQuery, FindOneRequestCostQueryVariables>(FindOneRequestCostDocument, options);
      }
export function useFindOneRequestCostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneRequestCostQuery, FindOneRequestCostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneRequestCostQuery, FindOneRequestCostQueryVariables>(FindOneRequestCostDocument, options);
        }
export function useFindOneRequestCostSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindOneRequestCostQuery, FindOneRequestCostQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindOneRequestCostQuery, FindOneRequestCostQueryVariables>(FindOneRequestCostDocument, options);
        }
export type FindOneRequestCostQueryHookResult = ReturnType<typeof useFindOneRequestCostQuery>;
export type FindOneRequestCostLazyQueryHookResult = ReturnType<typeof useFindOneRequestCostLazyQuery>;
export type FindOneRequestCostSuspenseQueryHookResult = ReturnType<typeof useFindOneRequestCostSuspenseQuery>;
export type FindOneRequestCostQueryResult = Apollo.QueryResult<FindOneRequestCostQuery, FindOneRequestCostQueryVariables>;