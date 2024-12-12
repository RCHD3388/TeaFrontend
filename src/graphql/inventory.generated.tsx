import * as Types from '../types/graphql_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllWarehousesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllWarehousesQuery = { __typename?: 'Query', getAllWarehouses: Array<{ __typename?: 'Warehouse', _id: string, name: string, description?: string | null, type: string, address: string, status: string }> };

export type GetWarehouseByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type GetWarehouseByIdQuery = { __typename?: 'Query', getWarehouseById: { __typename?: 'Warehouse', _id: string, name: string, description?: string | null, type: string, address: string, status: string } };

export type CreateWarehouseMutationVariables = Types.Exact<{
  createWarehouseInput: Types.CreateWarehouseInput;
}>;


export type CreateWarehouseMutation = { __typename?: 'Mutation', createWarehouse: { __typename?: 'Warehouse', _id: string, name: string, description?: string | null, type: string, address: string, status: string } };

export type UpdateWarehouseMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  updateWarehouseInput: Types.UpdateWarehouseInput;
}>;


export type UpdateWarehouseMutation = { __typename?: 'Mutation', updateWarehouse: { __typename?: 'Warehouse', _id: string, name: string, description?: string | null, type: string, address: string, status: string } };


export const GetAllWarehousesDocument = gql`
    query GetAllWarehouses {
  getAllWarehouses {
    _id
    name
    description
    type
    address
    status
  }
}
    `;

/**
 * __useGetAllWarehousesQuery__
 *
 * To run a query within a React component, call `useGetAllWarehousesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllWarehousesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllWarehousesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllWarehousesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllWarehousesQuery, GetAllWarehousesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllWarehousesQuery, GetAllWarehousesQueryVariables>(GetAllWarehousesDocument, options);
      }
export function useGetAllWarehousesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllWarehousesQuery, GetAllWarehousesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllWarehousesQuery, GetAllWarehousesQueryVariables>(GetAllWarehousesDocument, options);
        }
export function useGetAllWarehousesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllWarehousesQuery, GetAllWarehousesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllWarehousesQuery, GetAllWarehousesQueryVariables>(GetAllWarehousesDocument, options);
        }
export type GetAllWarehousesQueryHookResult = ReturnType<typeof useGetAllWarehousesQuery>;
export type GetAllWarehousesLazyQueryHookResult = ReturnType<typeof useGetAllWarehousesLazyQuery>;
export type GetAllWarehousesSuspenseQueryHookResult = ReturnType<typeof useGetAllWarehousesSuspenseQuery>;
export type GetAllWarehousesQueryResult = Apollo.QueryResult<GetAllWarehousesQuery, GetAllWarehousesQueryVariables>;
export const GetWarehouseByIdDocument = gql`
    query GetWarehouseById($id: String!) {
  getWarehouseById(id: $id) {
    _id
    name
    description
    type
    address
    status
  }
}
    `;

/**
 * __useGetWarehouseByIdQuery__
 *
 * To run a query within a React component, call `useGetWarehouseByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWarehouseByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWarehouseByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetWarehouseByIdQuery(baseOptions: Apollo.QueryHookOptions<GetWarehouseByIdQuery, GetWarehouseByIdQueryVariables> & ({ variables: GetWarehouseByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWarehouseByIdQuery, GetWarehouseByIdQueryVariables>(GetWarehouseByIdDocument, options);
      }
export function useGetWarehouseByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWarehouseByIdQuery, GetWarehouseByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWarehouseByIdQuery, GetWarehouseByIdQueryVariables>(GetWarehouseByIdDocument, options);
        }
export function useGetWarehouseByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetWarehouseByIdQuery, GetWarehouseByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWarehouseByIdQuery, GetWarehouseByIdQueryVariables>(GetWarehouseByIdDocument, options);
        }
export type GetWarehouseByIdQueryHookResult = ReturnType<typeof useGetWarehouseByIdQuery>;
export type GetWarehouseByIdLazyQueryHookResult = ReturnType<typeof useGetWarehouseByIdLazyQuery>;
export type GetWarehouseByIdSuspenseQueryHookResult = ReturnType<typeof useGetWarehouseByIdSuspenseQuery>;
export type GetWarehouseByIdQueryResult = Apollo.QueryResult<GetWarehouseByIdQuery, GetWarehouseByIdQueryVariables>;
export const CreateWarehouseDocument = gql`
    mutation CreateWarehouse($createWarehouseInput: CreateWarehouseInput!) {
  createWarehouse(createWarehouseInput: $createWarehouseInput) {
    _id
    name
    description
    type
    address
    status
  }
}
    `;
export type CreateWarehouseMutationFn = Apollo.MutationFunction<CreateWarehouseMutation, CreateWarehouseMutationVariables>;

/**
 * __useCreateWarehouseMutation__
 *
 * To run a mutation, you first call `useCreateWarehouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWarehouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWarehouseMutation, { data, loading, error }] = useCreateWarehouseMutation({
 *   variables: {
 *      createWarehouseInput: // value for 'createWarehouseInput'
 *   },
 * });
 */
export function useCreateWarehouseMutation(baseOptions?: Apollo.MutationHookOptions<CreateWarehouseMutation, CreateWarehouseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWarehouseMutation, CreateWarehouseMutationVariables>(CreateWarehouseDocument, options);
      }
export type CreateWarehouseMutationHookResult = ReturnType<typeof useCreateWarehouseMutation>;
export type CreateWarehouseMutationResult = Apollo.MutationResult<CreateWarehouseMutation>;
export type CreateWarehouseMutationOptions = Apollo.BaseMutationOptions<CreateWarehouseMutation, CreateWarehouseMutationVariables>;
export const UpdateWarehouseDocument = gql`
    mutation UpdateWarehouse($id: String!, $updateWarehouseInput: UpdateWarehouseInput!) {
  updateWarehouse(id: $id, updateWarehouseInput: $updateWarehouseInput) {
    _id
    name
    description
    type
    address
    status
  }
}
    `;
export type UpdateWarehouseMutationFn = Apollo.MutationFunction<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>;

/**
 * __useUpdateWarehouseMutation__
 *
 * To run a mutation, you first call `useUpdateWarehouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWarehouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWarehouseMutation, { data, loading, error }] = useUpdateWarehouseMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateWarehouseInput: // value for 'updateWarehouseInput'
 *   },
 * });
 */
export function useUpdateWarehouseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>(UpdateWarehouseDocument, options);
      }
export type UpdateWarehouseMutationHookResult = ReturnType<typeof useUpdateWarehouseMutation>;
export type UpdateWarehouseMutationResult = Apollo.MutationResult<UpdateWarehouseMutation>;
export type UpdateWarehouseMutationOptions = Apollo.BaseMutationOptions<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>;