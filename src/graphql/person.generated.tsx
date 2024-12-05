import * as Types from '../types/graphql_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllEmployeesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllEmployeesQuery = { __typename?: 'Query', getAllEmployees: Array<{ __typename?: 'Employee', _id: string, id: string, hire_date: any, salary: number, status: string, person: { __typename?: 'Person', name: string }, role: { __typename?: 'RoleSkillEmployee', id: string, name: string }, skill: Array<{ __typename?: 'RoleSkillEmployee', id: string, name: string }> }> };


export const GetAllEmployeesDocument = gql`
    query GetAllEmployees {
  getAllEmployees {
    _id
    id
    person {
      name
    }
    hire_date
    salary
    status
    role {
      id
      name
    }
    skill {
      id
      name
    }
  }
}
    `;

/**
 * __useGetAllEmployeesQuery__
 *
 * To run a query within a React component, call `useGetAllEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllEmployeesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllEmployeesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllEmployeesQuery, GetAllEmployeesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllEmployeesQuery, GetAllEmployeesQueryVariables>(GetAllEmployeesDocument, options);
      }
export function useGetAllEmployeesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllEmployeesQuery, GetAllEmployeesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllEmployeesQuery, GetAllEmployeesQueryVariables>(GetAllEmployeesDocument, options);
        }
export function useGetAllEmployeesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllEmployeesQuery, GetAllEmployeesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllEmployeesQuery, GetAllEmployeesQueryVariables>(GetAllEmployeesDocument, options);
        }
export type GetAllEmployeesQueryHookResult = ReturnType<typeof useGetAllEmployeesQuery>;
export type GetAllEmployeesLazyQueryHookResult = ReturnType<typeof useGetAllEmployeesLazyQuery>;
export type GetAllEmployeesSuspenseQueryHookResult = ReturnType<typeof useGetAllEmployeesSuspenseQuery>;
export type GetAllEmployeesQueryResult = Apollo.QueryResult<GetAllEmployeesQuery, GetAllEmployeesQueryVariables>;