import * as Types from '../types/graphql_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllPurchaseOrdersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllPurchaseOrdersQuery = { __typename?: 'Query', getAllPurchaseOrders: Array<{ __typename?: 'PurchaseOrder', _id: string, title: string, description?: string | null, requested_from: string, requested_by: string, date: any, status: string, purchase_order_detail?: Array<{ __typename?: 'PurchaseOrderDetail', item: string, item_type: string, qty: number, status: string }> | null }> };


export const GetAllPurchaseOrdersDocument = gql`
    query GetAllPurchaseOrders {
  getAllPurchaseOrders {
    _id
    title
    description
    requested_from
    requested_by
    date
    status
    purchase_order_detail {
      item
      item_type
      qty
      status
    }
  }
}
    `;

/**
 * __useGetAllPurchaseOrdersQuery__
 *
 * To run a query within a React component, call `useGetAllPurchaseOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPurchaseOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPurchaseOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPurchaseOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPurchaseOrdersQuery, GetAllPurchaseOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPurchaseOrdersQuery, GetAllPurchaseOrdersQueryVariables>(GetAllPurchaseOrdersDocument, options);
      }
export function useGetAllPurchaseOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPurchaseOrdersQuery, GetAllPurchaseOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPurchaseOrdersQuery, GetAllPurchaseOrdersQueryVariables>(GetAllPurchaseOrdersDocument, options);
        }
export function useGetAllPurchaseOrdersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllPurchaseOrdersQuery, GetAllPurchaseOrdersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllPurchaseOrdersQuery, GetAllPurchaseOrdersQueryVariables>(GetAllPurchaseOrdersDocument, options);
        }
export type GetAllPurchaseOrdersQueryHookResult = ReturnType<typeof useGetAllPurchaseOrdersQuery>;
export type GetAllPurchaseOrdersLazyQueryHookResult = ReturnType<typeof useGetAllPurchaseOrdersLazyQuery>;
export type GetAllPurchaseOrdersSuspenseQueryHookResult = ReturnType<typeof useGetAllPurchaseOrdersSuspenseQuery>;
export type GetAllPurchaseOrdersQueryResult = Apollo.QueryResult<GetAllPurchaseOrdersQuery, GetAllPurchaseOrdersQueryVariables>;