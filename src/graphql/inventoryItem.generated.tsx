import * as Types from '../types/graphql_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetWarehouseMaterialsQueryVariables = Types.Exact<{
  warehouse_id: Types.Scalars['String']['input'];
}>;


export type GetWarehouseMaterialsQuery = { __typename?: 'Query', getWarehouseMaterials: Array<{ __typename?: 'MaterialTransaction', _id: string, remain: number, price: number, date: any, material: { __typename?: 'Material', _id: string, name: string, description?: string | null, conversion: number, status: string, id: string, merk: { __typename?: 'Merk', _id: string, name: string }, minimum_unit_measure: { __typename?: 'UnitMeasure', _id: string, name: string }, unit_measure: { __typename?: 'UnitMeasure', _id: string, name: string }, item_category: { __typename?: 'CategoryData', _id: string, name: string } } }> };

export type GetWarehouseToolsQueryVariables = Types.Exact<{
  warehouse_id: Types.Scalars['String']['input'];
}>;


export type GetWarehouseToolsQuery = { __typename?: 'Query', getWarehouseTools: Array<{ __typename?: 'ToolTransaction', _id: string, date: any, tool: { __typename?: 'Tool', _id: string, id: string, sku: { __typename?: 'Sku', _id: string, name: string, status: string, merk: { __typename?: 'Merk', _id: string, name: string }, item_category: { __typename?: 'CategoryData', _id: string, name: string } }, status: { __typename?: 'CategoryData', _id: string, name: string } } }> };

export type AddInventoryMaterialMutationVariables = Types.Exact<{
  createMaterialTransactionInput: Types.CreateMaterialTransactionInput;
}>;


export type AddInventoryMaterialMutation = { __typename?: 'Mutation', addInventoryMaterial: Array<{ __typename?: 'MaterialTransaction', _id: string, in: number, out: number, remain: number, price: number, transaction_code: string, date: any }> };

export type AddInventoryToolMutationVariables = Types.Exact<{
  addOnlyToolTransactionInput: Types.AddOnlyToolTransactionInput;
}>;


export type AddInventoryToolMutation = { __typename?: 'Mutation', addInventoryTool: boolean };


export const GetWarehouseMaterialsDocument = gql`
    query GetWarehouseMaterials($warehouse_id: String!) {
  getWarehouseMaterials(warehouse_id: $warehouse_id) {
    _id
    remain
    price
    date
    material {
      _id
      name
      description
      conversion
      status
      merk {
        _id
        name
      }
      minimum_unit_measure {
        _id
        name
      }
      unit_measure {
        _id
        name
      }
      item_category {
        _id
        name
      }
      id
    }
  }
}
    `;

/**
 * __useGetWarehouseMaterialsQuery__
 *
 * To run a query within a React component, call `useGetWarehouseMaterialsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWarehouseMaterialsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWarehouseMaterialsQuery({
 *   variables: {
 *      warehouse_id: // value for 'warehouse_id'
 *   },
 * });
 */
export function useGetWarehouseMaterialsQuery(baseOptions: Apollo.QueryHookOptions<GetWarehouseMaterialsQuery, GetWarehouseMaterialsQueryVariables> & ({ variables: GetWarehouseMaterialsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWarehouseMaterialsQuery, GetWarehouseMaterialsQueryVariables>(GetWarehouseMaterialsDocument, options);
      }
export function useGetWarehouseMaterialsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWarehouseMaterialsQuery, GetWarehouseMaterialsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWarehouseMaterialsQuery, GetWarehouseMaterialsQueryVariables>(GetWarehouseMaterialsDocument, options);
        }
export function useGetWarehouseMaterialsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetWarehouseMaterialsQuery, GetWarehouseMaterialsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWarehouseMaterialsQuery, GetWarehouseMaterialsQueryVariables>(GetWarehouseMaterialsDocument, options);
        }
export type GetWarehouseMaterialsQueryHookResult = ReturnType<typeof useGetWarehouseMaterialsQuery>;
export type GetWarehouseMaterialsLazyQueryHookResult = ReturnType<typeof useGetWarehouseMaterialsLazyQuery>;
export type GetWarehouseMaterialsSuspenseQueryHookResult = ReturnType<typeof useGetWarehouseMaterialsSuspenseQuery>;
export type GetWarehouseMaterialsQueryResult = Apollo.QueryResult<GetWarehouseMaterialsQuery, GetWarehouseMaterialsQueryVariables>;
export const GetWarehouseToolsDocument = gql`
    query GetWarehouseTools($warehouse_id: String!) {
  getWarehouseTools(warehouse_id: $warehouse_id) {
    _id
    date
    tool {
      _id
      id
      sku {
        _id
        name
        status
        merk {
          _id
          name
        }
        item_category {
          _id
          name
        }
      }
      status {
        _id
        name
      }
    }
  }
}
    `;

/**
 * __useGetWarehouseToolsQuery__
 *
 * To run a query within a React component, call `useGetWarehouseToolsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWarehouseToolsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWarehouseToolsQuery({
 *   variables: {
 *      warehouse_id: // value for 'warehouse_id'
 *   },
 * });
 */
export function useGetWarehouseToolsQuery(baseOptions: Apollo.QueryHookOptions<GetWarehouseToolsQuery, GetWarehouseToolsQueryVariables> & ({ variables: GetWarehouseToolsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWarehouseToolsQuery, GetWarehouseToolsQueryVariables>(GetWarehouseToolsDocument, options);
      }
export function useGetWarehouseToolsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWarehouseToolsQuery, GetWarehouseToolsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWarehouseToolsQuery, GetWarehouseToolsQueryVariables>(GetWarehouseToolsDocument, options);
        }
export function useGetWarehouseToolsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetWarehouseToolsQuery, GetWarehouseToolsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWarehouseToolsQuery, GetWarehouseToolsQueryVariables>(GetWarehouseToolsDocument, options);
        }
export type GetWarehouseToolsQueryHookResult = ReturnType<typeof useGetWarehouseToolsQuery>;
export type GetWarehouseToolsLazyQueryHookResult = ReturnType<typeof useGetWarehouseToolsLazyQuery>;
export type GetWarehouseToolsSuspenseQueryHookResult = ReturnType<typeof useGetWarehouseToolsSuspenseQuery>;
export type GetWarehouseToolsQueryResult = Apollo.QueryResult<GetWarehouseToolsQuery, GetWarehouseToolsQueryVariables>;
export const AddInventoryMaterialDocument = gql`
    mutation AddInventoryMaterial($createMaterialTransactionInput: CreateMaterialTransactionInput!) {
  addInventoryMaterial(
    createMaterialTransactionInput: $createMaterialTransactionInput
  ) {
    _id
    in
    out
    remain
    price
    transaction_code
    date
  }
}
    `;
export type AddInventoryMaterialMutationFn = Apollo.MutationFunction<AddInventoryMaterialMutation, AddInventoryMaterialMutationVariables>;

/**
 * __useAddInventoryMaterialMutation__
 *
 * To run a mutation, you first call `useAddInventoryMaterialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddInventoryMaterialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addInventoryMaterialMutation, { data, loading, error }] = useAddInventoryMaterialMutation({
 *   variables: {
 *      createMaterialTransactionInput: // value for 'createMaterialTransactionInput'
 *   },
 * });
 */
export function useAddInventoryMaterialMutation(baseOptions?: Apollo.MutationHookOptions<AddInventoryMaterialMutation, AddInventoryMaterialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddInventoryMaterialMutation, AddInventoryMaterialMutationVariables>(AddInventoryMaterialDocument, options);
      }
export type AddInventoryMaterialMutationHookResult = ReturnType<typeof useAddInventoryMaterialMutation>;
export type AddInventoryMaterialMutationResult = Apollo.MutationResult<AddInventoryMaterialMutation>;
export type AddInventoryMaterialMutationOptions = Apollo.BaseMutationOptions<AddInventoryMaterialMutation, AddInventoryMaterialMutationVariables>;
export const AddInventoryToolDocument = gql`
    mutation AddInventoryTool($addOnlyToolTransactionInput: AddOnlyToolTransactionInput!) {
  addInventoryTool(addOnlyToolTransactionInput: $addOnlyToolTransactionInput)
}
    `;
export type AddInventoryToolMutationFn = Apollo.MutationFunction<AddInventoryToolMutation, AddInventoryToolMutationVariables>;

/**
 * __useAddInventoryToolMutation__
 *
 * To run a mutation, you first call `useAddInventoryToolMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddInventoryToolMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addInventoryToolMutation, { data, loading, error }] = useAddInventoryToolMutation({
 *   variables: {
 *      addOnlyToolTransactionInput: // value for 'addOnlyToolTransactionInput'
 *   },
 * });
 */
export function useAddInventoryToolMutation(baseOptions?: Apollo.MutationHookOptions<AddInventoryToolMutation, AddInventoryToolMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddInventoryToolMutation, AddInventoryToolMutationVariables>(AddInventoryToolDocument, options);
      }
export type AddInventoryToolMutationHookResult = ReturnType<typeof useAddInventoryToolMutation>;
export type AddInventoryToolMutationResult = Apollo.MutationResult<AddInventoryToolMutation>;
export type AddInventoryToolMutationOptions = Apollo.BaseMutationOptions<AddInventoryToolMutation, AddInventoryToolMutationVariables>;