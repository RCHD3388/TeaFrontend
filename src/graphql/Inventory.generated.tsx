import * as Types from '../types/graphql_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMerksQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMerksQuery = { __typename?: 'Query', merks: Array<{ __typename?: 'Merk', _id: string, name: string, description?: string | null }> };

export type GetUnitMeasuresQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUnitMeasuresQuery = { __typename?: 'Query', unitMeasures: Array<{ __typename?: 'UnitMeasure', _id: string, name: string, description?: string | null }> };

export type GetMaterialsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMaterialsQuery = { __typename?: 'Query', materials: Array<{ __typename?: 'Material', _id: string, name: string, merk: string, description: string, unit_measure: string, minimum_unit_measure: string, conversion: number, item_category: string }> };


export const GetMerksDocument = gql`
    query GetMerks {
  merks {
    _id
    name
    description
  }
}
    `;

/**
 * __useGetMerksQuery__
 *
 * To run a query within a React component, call `useGetMerksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMerksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMerksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMerksQuery(baseOptions?: Apollo.QueryHookOptions<GetMerksQuery, GetMerksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMerksQuery, GetMerksQueryVariables>(GetMerksDocument, options);
      }
export function useGetMerksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMerksQuery, GetMerksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMerksQuery, GetMerksQueryVariables>(GetMerksDocument, options);
        }
export function useGetMerksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMerksQuery, GetMerksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMerksQuery, GetMerksQueryVariables>(GetMerksDocument, options);
        }
export type GetMerksQueryHookResult = ReturnType<typeof useGetMerksQuery>;
export type GetMerksLazyQueryHookResult = ReturnType<typeof useGetMerksLazyQuery>;
export type GetMerksSuspenseQueryHookResult = ReturnType<typeof useGetMerksSuspenseQuery>;
export type GetMerksQueryResult = Apollo.QueryResult<GetMerksQuery, GetMerksQueryVariables>;
export const GetUnitMeasuresDocument = gql`
    query GetUnitMeasures {
  unitMeasures {
    _id
    name
    description
  }
}
    `;

/**
 * __useGetUnitMeasuresQuery__
 *
 * To run a query within a React component, call `useGetUnitMeasuresQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnitMeasuresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnitMeasuresQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUnitMeasuresQuery(baseOptions?: Apollo.QueryHookOptions<GetUnitMeasuresQuery, GetUnitMeasuresQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnitMeasuresQuery, GetUnitMeasuresQueryVariables>(GetUnitMeasuresDocument, options);
      }
export function useGetUnitMeasuresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnitMeasuresQuery, GetUnitMeasuresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnitMeasuresQuery, GetUnitMeasuresQueryVariables>(GetUnitMeasuresDocument, options);
        }
export function useGetUnitMeasuresSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUnitMeasuresQuery, GetUnitMeasuresQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUnitMeasuresQuery, GetUnitMeasuresQueryVariables>(GetUnitMeasuresDocument, options);
        }
export type GetUnitMeasuresQueryHookResult = ReturnType<typeof useGetUnitMeasuresQuery>;
export type GetUnitMeasuresLazyQueryHookResult = ReturnType<typeof useGetUnitMeasuresLazyQuery>;
export type GetUnitMeasuresSuspenseQueryHookResult = ReturnType<typeof useGetUnitMeasuresSuspenseQuery>;
export type GetUnitMeasuresQueryResult = Apollo.QueryResult<GetUnitMeasuresQuery, GetUnitMeasuresQueryVariables>;
export const GetMaterialsDocument = gql`
    query GetMaterials {
  materials {
    _id
    name
    merk
    description
    unit_measure
    minimum_unit_measure
    conversion
    item_category
  }
}
    `;

/**
 * __useGetMaterialsQuery__
 *
 * To run a query within a React component, call `useGetMaterialsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMaterialsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMaterialsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMaterialsQuery(baseOptions?: Apollo.QueryHookOptions<GetMaterialsQuery, GetMaterialsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMaterialsQuery, GetMaterialsQueryVariables>(GetMaterialsDocument, options);
      }
export function useGetMaterialsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMaterialsQuery, GetMaterialsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMaterialsQuery, GetMaterialsQueryVariables>(GetMaterialsDocument, options);
        }
export function useGetMaterialsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMaterialsQuery, GetMaterialsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMaterialsQuery, GetMaterialsQueryVariables>(GetMaterialsDocument, options);
        }
export type GetMaterialsQueryHookResult = ReturnType<typeof useGetMaterialsQuery>;
export type GetMaterialsLazyQueryHookResult = ReturnType<typeof useGetMaterialsLazyQuery>;
export type GetMaterialsSuspenseQueryHookResult = ReturnType<typeof useGetMaterialsSuspenseQuery>;
export type GetMaterialsQueryResult = Apollo.QueryResult<GetMaterialsQuery, GetMaterialsQueryVariables>;