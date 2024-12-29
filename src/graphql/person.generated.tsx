import * as Types from '../types/graphql_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllEmployeesQueryVariables = Types.Exact<{
  employeeFilter?: Types.InputMaybe<Types.EmployeeFilter>;
}>;


export type GetAllEmployeesQuery = { __typename?: 'Query', getAllEmployees: Array<{ __typename?: 'Employee', _id: string, hire_date: any, salary?: number | null, status: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string }, role: { __typename?: 'EmployeeRole', _id: string, name: string }, skill: Array<{ __typename?: 'EmployeeSkill', _id: string, name: string }> }> };

export type CreateEmployeeMutationVariables = Types.Exact<{
  input: Types.CreateEmployeeInput;
}>;


export type CreateEmployeeMutation = { __typename?: 'Mutation', createEmployee: { __typename?: 'Employee', _id: string, hire_date: any, salary?: number | null, status: string, person: { __typename?: 'Person', name: string }, role: { __typename?: 'EmployeeRole', _id: string, name: string }, skill: Array<{ __typename?: 'EmployeeSkill', _id: string, name: string }> } };

export type UpdateEmployeeMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  updateEmployeeInput: Types.UpdateEmployeeInput;
}>;


export type UpdateEmployeeMutation = { __typename?: 'Mutation', updateEmployee: { __typename?: 'Employee', _id: string, hire_date: any, salary?: number | null, status: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string }, role: { __typename?: 'EmployeeRole', _id: string, name: string, description: string }, skill: Array<{ __typename?: 'EmployeeSkill', _id: string, name: string, description?: string | null }> } };

export type GetEmployeeByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type GetEmployeeByIdQuery = { __typename?: 'Query', getEmployeeById: { __typename?: 'Employee', _id: string, hire_date: any, salary?: number | null, status: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string }, role: { __typename?: 'EmployeeRole', _id: string, name: string, description: string }, skill: Array<{ __typename?: 'EmployeeSkill', _id: string, name: string, description?: string | null }> } };

export type GetAllSkillQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllSkillQuery = { __typename?: 'Query', getAllSkill: Array<{ __typename?: 'EmployeeSkill', _id: string, name: string, description?: string | null }> };

export type GetAllRoleQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllRoleQuery = { __typename?: 'Query', getAllRole: Array<{ __typename?: 'EmployeeRole', _id: string, name: string, description: string }> };

export type CreateEmployeeSkillMutationVariables = Types.Exact<{
  input: Types.CreateEmployeeSkillInput;
}>;


export type CreateEmployeeSkillMutation = { __typename?: 'Mutation', createEmployeeSkill: { __typename?: 'EmployeeSkill', _id: string, name: string, description?: string | null } };

export type UpdateEmployeeSkillMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  updateEmployeeSkillInput: Types.CreateEmployeeSkillInput;
}>;


export type UpdateEmployeeSkillMutation = { __typename?: 'Mutation', updateEmployeeSkill: { __typename?: 'EmployeeSkill', _id: string, name: string, description?: string | null } };

export type DeleteEmployeeSkillMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type DeleteEmployeeSkillMutation = { __typename?: 'Mutation', deleteEmployeeSkill: { __typename?: 'EmployeeSkill', _id: string, name: string, description?: string | null } };


export const GetAllEmployeesDocument = gql`
    query GetAllEmployees($employeeFilter: EmployeeFilter) {
  getAllEmployees(employeeFilter: $employeeFilter) {
    _id
    person {
      name
      email
      phone_number
    }
    hire_date
    salary
    status
    role {
      _id
      name
    }
    skill {
      _id
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
 *      employeeFilter: // value for 'employeeFilter'
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
    person {
      name
    }
    hire_date
    salary
    status
    role {
      _id
      name
    }
    skill {
      _id
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
export const UpdateEmployeeDocument = gql`
    mutation updateEmployee($id: String!, $updateEmployeeInput: UpdateEmployeeInput!) {
  updateEmployee(id: $id, updateEmployeeInput: $updateEmployeeInput) {
    _id
    person {
      name
      email
      phone_number
      address
    }
    hire_date
    salary
    status
    role {
      _id
      name
      description
    }
    skill {
      _id
      name
      description
    }
  }
}
    `;
export type UpdateEmployeeMutationFn = Apollo.MutationFunction<UpdateEmployeeMutation, UpdateEmployeeMutationVariables>;

/**
 * __useUpdateEmployeeMutation__
 *
 * To run a mutation, you first call `useUpdateEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEmployeeMutation, { data, loading, error }] = useUpdateEmployeeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateEmployeeInput: // value for 'updateEmployeeInput'
 *   },
 * });
 */
export function useUpdateEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEmployeeMutation, UpdateEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEmployeeMutation, UpdateEmployeeMutationVariables>(UpdateEmployeeDocument, options);
      }
export type UpdateEmployeeMutationHookResult = ReturnType<typeof useUpdateEmployeeMutation>;
export type UpdateEmployeeMutationResult = Apollo.MutationResult<UpdateEmployeeMutation>;
export type UpdateEmployeeMutationOptions = Apollo.BaseMutationOptions<UpdateEmployeeMutation, UpdateEmployeeMutationVariables>;
export const GetEmployeeByIdDocument = gql`
    query GetEmployeeById($id: String!) {
  getEmployeeById(id: $id) {
    _id
    person {
      name
      email
      phone_number
      address
    }
    hire_date
    salary
    status
    role {
      _id
      name
      description
    }
    skill {
      _id
      name
      description
    }
  }
}
    `;

/**
 * __useGetEmployeeByIdQuery__
 *
 * To run a query within a React component, call `useGetEmployeeByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmployeeByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmployeeByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEmployeeByIdQuery(baseOptions: Apollo.QueryHookOptions<GetEmployeeByIdQuery, GetEmployeeByIdQueryVariables> & ({ variables: GetEmployeeByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEmployeeByIdQuery, GetEmployeeByIdQueryVariables>(GetEmployeeByIdDocument, options);
      }
export function useGetEmployeeByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEmployeeByIdQuery, GetEmployeeByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEmployeeByIdQuery, GetEmployeeByIdQueryVariables>(GetEmployeeByIdDocument, options);
        }
export function useGetEmployeeByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEmployeeByIdQuery, GetEmployeeByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEmployeeByIdQuery, GetEmployeeByIdQueryVariables>(GetEmployeeByIdDocument, options);
        }
export type GetEmployeeByIdQueryHookResult = ReturnType<typeof useGetEmployeeByIdQuery>;
export type GetEmployeeByIdLazyQueryHookResult = ReturnType<typeof useGetEmployeeByIdLazyQuery>;
export type GetEmployeeByIdSuspenseQueryHookResult = ReturnType<typeof useGetEmployeeByIdSuspenseQuery>;
export type GetEmployeeByIdQueryResult = Apollo.QueryResult<GetEmployeeByIdQuery, GetEmployeeByIdQueryVariables>;
export const GetAllSkillDocument = gql`
    query GetAllSkill {
  getAllSkill {
    _id
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
export const CreateEmployeeSkillDocument = gql`
    mutation CreateEmployeeSkill($input: CreateEmployeeSkillInput!) {
  createEmployeeSkill(createEmployeeSkillInput: $input) {
    _id
    name
    description
  }
}
    `;
export type CreateEmployeeSkillMutationFn = Apollo.MutationFunction<CreateEmployeeSkillMutation, CreateEmployeeSkillMutationVariables>;

/**
 * __useCreateEmployeeSkillMutation__
 *
 * To run a mutation, you first call `useCreateEmployeeSkillMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEmployeeSkillMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEmployeeSkillMutation, { data, loading, error }] = useCreateEmployeeSkillMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEmployeeSkillMutation(baseOptions?: Apollo.MutationHookOptions<CreateEmployeeSkillMutation, CreateEmployeeSkillMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEmployeeSkillMutation, CreateEmployeeSkillMutationVariables>(CreateEmployeeSkillDocument, options);
      }
export type CreateEmployeeSkillMutationHookResult = ReturnType<typeof useCreateEmployeeSkillMutation>;
export type CreateEmployeeSkillMutationResult = Apollo.MutationResult<CreateEmployeeSkillMutation>;
export type CreateEmployeeSkillMutationOptions = Apollo.BaseMutationOptions<CreateEmployeeSkillMutation, CreateEmployeeSkillMutationVariables>;
export const UpdateEmployeeSkillDocument = gql`
    mutation UpdateEmployeeSkill($id: String!, $updateEmployeeSkillInput: CreateEmployeeSkillInput!) {
  updateEmployeeSkill(
    id: $id
    updateEmployeeSkillInput: $updateEmployeeSkillInput
  ) {
    _id
    name
    description
  }
}
    `;
export type UpdateEmployeeSkillMutationFn = Apollo.MutationFunction<UpdateEmployeeSkillMutation, UpdateEmployeeSkillMutationVariables>;

/**
 * __useUpdateEmployeeSkillMutation__
 *
 * To run a mutation, you first call `useUpdateEmployeeSkillMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEmployeeSkillMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEmployeeSkillMutation, { data, loading, error }] = useUpdateEmployeeSkillMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateEmployeeSkillInput: // value for 'updateEmployeeSkillInput'
 *   },
 * });
 */
export function useUpdateEmployeeSkillMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEmployeeSkillMutation, UpdateEmployeeSkillMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEmployeeSkillMutation, UpdateEmployeeSkillMutationVariables>(UpdateEmployeeSkillDocument, options);
      }
export type UpdateEmployeeSkillMutationHookResult = ReturnType<typeof useUpdateEmployeeSkillMutation>;
export type UpdateEmployeeSkillMutationResult = Apollo.MutationResult<UpdateEmployeeSkillMutation>;
export type UpdateEmployeeSkillMutationOptions = Apollo.BaseMutationOptions<UpdateEmployeeSkillMutation, UpdateEmployeeSkillMutationVariables>;
export const DeleteEmployeeSkillDocument = gql`
    mutation DeleteEmployeeSkill($id: String!) {
  deleteEmployeeSkill(id: $id) {
    _id
    name
    description
  }
}
    `;
export type DeleteEmployeeSkillMutationFn = Apollo.MutationFunction<DeleteEmployeeSkillMutation, DeleteEmployeeSkillMutationVariables>;

/**
 * __useDeleteEmployeeSkillMutation__
 *
 * To run a mutation, you first call `useDeleteEmployeeSkillMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEmployeeSkillMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEmployeeSkillMutation, { data, loading, error }] = useDeleteEmployeeSkillMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEmployeeSkillMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEmployeeSkillMutation, DeleteEmployeeSkillMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEmployeeSkillMutation, DeleteEmployeeSkillMutationVariables>(DeleteEmployeeSkillDocument, options);
      }
export type DeleteEmployeeSkillMutationHookResult = ReturnType<typeof useDeleteEmployeeSkillMutation>;
export type DeleteEmployeeSkillMutationResult = Apollo.MutationResult<DeleteEmployeeSkillMutation>;
export type DeleteEmployeeSkillMutationOptions = Apollo.BaseMutationOptions<DeleteEmployeeSkillMutation, DeleteEmployeeSkillMutationVariables>;