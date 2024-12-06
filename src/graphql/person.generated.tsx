import * as Types from '../types/graphql_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllEmployeesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllEmployeesQuery = { __typename?: 'Query', getAllEmployees: Array<{ __typename?: 'Employee', _id: string, id: string, hire_date: any, salary: number, status: string, person: { __typename?: 'Person', name: string }, role: { __typename?: 'RoleSkillEmployee', id: string, name: string }, skill: Array<{ __typename?: 'RoleSkillEmployee', id: string, name: string }> }> };

export type CreateEmployeeMutationVariables = Types.Exact<{
  input: Types.CreateEmployeeInput;
}>;


export type CreateEmployeeMutation = { __typename?: 'Mutation', createEmployee: { __typename?: 'Employee', _id: string, id: string, hire_date: any, salary: number, status: string, person: { __typename?: 'Person', name: string }, role: { __typename?: 'RoleSkillEmployee', id: string, name: string }, skill: Array<{ __typename?: 'RoleSkillEmployee', id: string, name: string }> } };

export type GetAllSkillQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllSkillQuery = { __typename?: 'Query', getAllSkill: Array<{ __typename?: 'EmployeeSkill', _id: string, id: string, name: string, description: string }> };

export type GetAllRoleQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllRoleQuery = { __typename?: 'Query', getAllRole: Array<{ __typename?: 'EmployeeRole', _id: string, id: string, name: string, description: string }> };


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
export const CreateEmployeeDocument = gql`
    mutation CreateEmployee($input: CreateEmployeeInput!) {
  createEmployee(createEmployeeInput: $input) {
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
export type CreateEmployeeMutationFn = Apollo.MutationFunction<CreateEmployeeMutation, CreateEmployeeMutationVariables>;

/**
 * __useCreateEmployeeMutation__
 *
 * To run a mutation, you first call `useCreateEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEmployeeMutation, { data, loading, error }] = useCreateEmployeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<CreateEmployeeMutation, CreateEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEmployeeMutation, CreateEmployeeMutationVariables>(CreateEmployeeDocument, options);
      }
export type CreateEmployeeMutationHookResult = ReturnType<typeof useCreateEmployeeMutation>;
export type CreateEmployeeMutationResult = Apollo.MutationResult<CreateEmployeeMutation>;
export type CreateEmployeeMutationOptions = Apollo.BaseMutationOptions<CreateEmployeeMutation, CreateEmployeeMutationVariables>;
export const GetAllSkillDocument = gql`
    query GetAllSkill {
  getAllSkill {
    _id
    id
    name
    description
  }
}
    `;

/**
 * __useGetAllSkillQuery__
 *
 * To run a query within a React component, call `useGetAllSkillQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSkillQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSkillQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllSkillQuery(baseOptions?: Apollo.QueryHookOptions<GetAllSkillQuery, GetAllSkillQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllSkillQuery, GetAllSkillQueryVariables>(GetAllSkillDocument, options);
      }
export function useGetAllSkillLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSkillQuery, GetAllSkillQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllSkillQuery, GetAllSkillQueryVariables>(GetAllSkillDocument, options);
        }
export function useGetAllSkillSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllSkillQuery, GetAllSkillQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllSkillQuery, GetAllSkillQueryVariables>(GetAllSkillDocument, options);
        }
export type GetAllSkillQueryHookResult = ReturnType<typeof useGetAllSkillQuery>;
export type GetAllSkillLazyQueryHookResult = ReturnType<typeof useGetAllSkillLazyQuery>;
export type GetAllSkillSuspenseQueryHookResult = ReturnType<typeof useGetAllSkillSuspenseQuery>;
export type GetAllSkillQueryResult = Apollo.QueryResult<GetAllSkillQuery, GetAllSkillQueryVariables>;
export const GetAllRoleDocument = gql`
    query GetAllRole {
  getAllRole {
    _id
    id
    name
    description
  }
}
    `;

/**
 * __useGetAllRoleQuery__
 *
 * To run a query within a React component, call `useGetAllRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRoleQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllRoleQuery(baseOptions?: Apollo.QueryHookOptions<GetAllRoleQuery, GetAllRoleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllRoleQuery, GetAllRoleQueryVariables>(GetAllRoleDocument, options);
      }
export function useGetAllRoleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllRoleQuery, GetAllRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllRoleQuery, GetAllRoleQueryVariables>(GetAllRoleDocument, options);
        }
export function useGetAllRoleSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllRoleQuery, GetAllRoleQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllRoleQuery, GetAllRoleQueryVariables>(GetAllRoleDocument, options);
        }
export type GetAllRoleQueryHookResult = ReturnType<typeof useGetAllRoleQuery>;
export type GetAllRoleLazyQueryHookResult = ReturnType<typeof useGetAllRoleLazyQuery>;
export type GetAllRoleSuspenseQueryHookResult = ReturnType<typeof useGetAllRoleSuspenseQuery>;
export type GetAllRoleQueryResult = Apollo.QueryResult<GetAllRoleQuery, GetAllRoleQueryVariables>;