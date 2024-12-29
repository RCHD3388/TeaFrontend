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