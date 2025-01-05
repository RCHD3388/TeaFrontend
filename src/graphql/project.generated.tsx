import * as Types from '../types/graphql_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FindAllProjectsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FindAllProjectsQuery = { __typename?: 'Query', findAllProjects: Array<{ __typename?: 'Project', _id: string, name: string, location: string, createdAt: any, status: { __typename?: 'CategoryData', _id: string, name: string }, priority: { __typename?: 'CategoryData', _id: string, name: string }, project_leader: { __typename?: 'Employee', _id: string, person: { __typename?: 'Person', name: string } } }> };

export type FindProjectByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type FindProjectByIdQuery = { __typename?: 'Query', findProjectById: { __typename?: 'Project', _id: string, name: string, location: string, description: string, target_date?: any | null, warehouse: string, createdAt: any, finished_at?: any | null, status: { __typename?: 'CategoryData', _id: string, name: string }, priority: { __typename?: 'CategoryData', _id: string, name: string }, project_leader: { __typename?: 'Employee', _id: string, person: { __typename?: 'Person', name: string, email: string } }, project_closing?: { __typename?: 'ProjectClosing', note?: string | null, document?: string | null, closed_by: { __typename?: 'Employee', _id: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string } }, material_used: Array<{ __typename?: 'MaterialTransaction', _id: string, remain: number, price: number, date: any, warehouse: string, out: number, material: { __typename?: 'Material', _id: string, id: string, name: string, description?: string | null, status: string, conversion: number, merk: { __typename?: 'Merk', _id: string, name: string }, unit_measure: { __typename?: 'UnitMeasure', _id: string, name: string }, minimum_unit_measure: { __typename?: 'UnitMeasure', _id: string, name: string } } }>, request_project_closing: { __typename?: 'RequestProjectClosing', _id: string, requested_at: any, status: string, handled_date?: any | null } } | null } };

export type CreateProjectMutationVariables = Types.Exact<{
  createProjectInput: Types.CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', _id: string, name: string, location: string, project_leader: { __typename?: 'Employee', _id: string, person: { __typename?: 'Person', name: string, address: string, email: string } } } };

export type UpdateProjectMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  updateProjectInput: Types.UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', _id: string, name: string, location: string, project_leader: { __typename?: 'Employee', _id: string, person: { __typename?: 'Person', name: string, address: string, email: string } } } };

export type GetAllProjectEmployeesQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type GetAllProjectEmployeesQuery = { __typename?: 'Query', getAllProjectEmployees: { __typename?: 'GetAllProjectEmployeeDto', registered: Array<{ __typename?: 'Employee', _id: string, status: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string }, skill: Array<{ __typename?: 'EmployeeSkill', _id: string, name: string }>, role: { __typename?: 'EmployeeRole', _id: string, name: string } }>, unregistered?: Array<{ __typename?: 'Employee', _id: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string }, role: { __typename?: 'EmployeeRole', _id: string, name: string }, skill: Array<{ __typename?: 'EmployeeSkill', _id: string, name: string }> }> | null } };

export type AddNewProjectEmployeeMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  employees: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
}>;


export type AddNewProjectEmployeeMutation = { __typename?: 'Mutation', addNewProjectEmployee: Array<{ __typename?: 'Employee', _id: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string }, role: { __typename?: 'EmployeeRole', _id: string, name: string }, skill: Array<{ __typename?: 'EmployeeSkill', _id: string, name: string }> }> };

export type RemoveProjectEmployeeMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  employee: Types.Scalars['String']['input'];
  description: Types.Scalars['String']['input'];
}>;


export type RemoveProjectEmployeeMutation = { __typename?: 'Mutation', removeProjectEmployee: { __typename?: 'Employee', _id: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string }, role: { __typename?: 'EmployeeRole', _id: string, name: string }, skill: Array<{ __typename?: 'EmployeeSkill', _id: string, name: string }> } };

export type CreateAttendanceMutationVariables = Types.Exact<{
  createAttendanceInput: Types.CreateAttendanceModuleInput;
}>;


export type CreateAttendanceMutation = { __typename?: 'Mutation', createAttendance: { __typename?: 'AttendanceModule', _id: string, start_date: any, end_date: any, submit_status: boolean, description: string } };

export type FindAllAttendanceModulesQueryVariables = Types.Exact<{
  projectId: Types.Scalars['String']['input'];
}>;


export type FindAllAttendanceModulesQuery = { __typename?: 'Query', findAllAttendanceModules: Array<{ __typename?: 'AttendanceModule', _id: string, start_date: any, end_date: any, submit_status: boolean, description: string }> };

export type FindOneAttendanceModuleQueryVariables = Types.Exact<{
  projectId: Types.Scalars['String']['input'];
  moduleId: Types.Scalars['String']['input'];
}>;


export type FindOneAttendanceModuleQuery = { __typename?: 'Query', findOneAttendanceModule: { __typename?: 'AttendanceModule', _id: string, start_date: any, end_date: any, submit_status: boolean, description: string, attendance: Array<{ __typename?: 'Attendance', date: any, attendance_detail: Array<{ __typename?: 'AttendanceDetail', check_in: boolean, check_out: boolean, employee: { __typename?: 'Employee', _id: string, hire_date: any, salary?: number | null, status: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string } } }> }> } };

export type UpdateAttendanceModuleMutationVariables = Types.Exact<{
  projectId: Types.Scalars['String']['input'];
  moduleId: Types.Scalars['String']['input'];
  updateAttendanceModuleInput: Types.UpdateAttendanceModuleInput;
}>;


export type UpdateAttendanceModuleMutation = { __typename?: 'Mutation', updateAttendanceModule: { __typename?: 'AttendanceModule', _id: string } };

export type DeleteAttendanceModuleMutationVariables = Types.Exact<{
  projectId: Types.Scalars['String']['input'];
  moduleId: Types.Scalars['String']['input'];
}>;


export type DeleteAttendanceModuleMutation = { __typename?: 'Mutation', deleteAttendanceModule: { __typename?: 'AttendanceModule', _id: string } };

export type FindAllProjectCostLogsQueryVariables = Types.Exact<{
  projectId: Types.Scalars['String']['input'];
}>;


export type FindAllProjectCostLogsQuery = { __typename?: 'Query', findAllProjectCostLogs: Array<{ __typename?: 'ProjectCostLog', _id: string, title: string, description?: string | null, date: any, price: number, category: string, request_cost?: string | null }> };


export const FindAllProjectsDocument = gql`
    query FindAllProjects {
  findAllProjects {
    _id
    name
    location
    createdAt
    status {
      _id
      name
    }
    priority {
      _id
      name
    }
    project_leader {
      _id
      person {
        name
      }
    }
  }
}
    `;

/**
 * __useFindAllProjectsQuery__
 *
 * To run a query within a React component, call `useFindAllProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllProjectsQuery(baseOptions?: Apollo.QueryHookOptions<FindAllProjectsQuery, FindAllProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllProjectsQuery, FindAllProjectsQueryVariables>(FindAllProjectsDocument, options);
      }
export function useFindAllProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllProjectsQuery, FindAllProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllProjectsQuery, FindAllProjectsQueryVariables>(FindAllProjectsDocument, options);
        }
export function useFindAllProjectsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllProjectsQuery, FindAllProjectsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllProjectsQuery, FindAllProjectsQueryVariables>(FindAllProjectsDocument, options);
        }
export type FindAllProjectsQueryHookResult = ReturnType<typeof useFindAllProjectsQuery>;
export type FindAllProjectsLazyQueryHookResult = ReturnType<typeof useFindAllProjectsLazyQuery>;
export type FindAllProjectsSuspenseQueryHookResult = ReturnType<typeof useFindAllProjectsSuspenseQuery>;
export type FindAllProjectsQueryResult = Apollo.QueryResult<FindAllProjectsQuery, FindAllProjectsQueryVariables>;
export const FindProjectByIdDocument = gql`
    query FindProjectById($id: String!) {
  findProjectById(id: $id) {
    _id
    name
    location
    description
    target_date
    status {
      _id
      name
    }
    priority {
      _id
      name
    }
    project_leader {
      _id
      person {
        name
        email
      }
    }
    warehouse
    createdAt
    finished_at
    project_closing {
      note
      document
      closed_by {
        _id
        person {
          name
          email
          phone_number
          address
        }
      }
      material_used {
        _id
        remain
        price
        date
        warehouse
        out
        material {
          _id
          id
          name
          description
          status
          conversion
          merk {
            _id
            name
          }
          unit_measure {
            _id
            name
          }
          minimum_unit_measure {
            _id
            name
          }
        }
      }
      request_project_closing {
        _id
        requested_at
        status
        handled_date
      }
    }
  }
}
    `;

/**
 * __useFindProjectByIdQuery__
 *
 * To run a query within a React component, call `useFindProjectByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProjectByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProjectByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindProjectByIdQuery(baseOptions: Apollo.QueryHookOptions<FindProjectByIdQuery, FindProjectByIdQueryVariables> & ({ variables: FindProjectByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProjectByIdQuery, FindProjectByIdQueryVariables>(FindProjectByIdDocument, options);
      }
export function useFindProjectByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProjectByIdQuery, FindProjectByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProjectByIdQuery, FindProjectByIdQueryVariables>(FindProjectByIdDocument, options);
        }
export function useFindProjectByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindProjectByIdQuery, FindProjectByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindProjectByIdQuery, FindProjectByIdQueryVariables>(FindProjectByIdDocument, options);
        }
export type FindProjectByIdQueryHookResult = ReturnType<typeof useFindProjectByIdQuery>;
export type FindProjectByIdLazyQueryHookResult = ReturnType<typeof useFindProjectByIdLazyQuery>;
export type FindProjectByIdSuspenseQueryHookResult = ReturnType<typeof useFindProjectByIdSuspenseQuery>;
export type FindProjectByIdQueryResult = Apollo.QueryResult<FindProjectByIdQuery, FindProjectByIdQueryVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($createProjectInput: CreateProjectInput!) {
  createProject(createProjectInput: $createProjectInput) {
    _id
    name
    location
    project_leader {
      _id
      person {
        name
        address
        email
      }
    }
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      createProjectInput: // value for 'createProjectInput'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation UpdateProject($id: String!, $updateProjectInput: UpdateProjectInput!) {
  updateProject(id: $id, updateProjectInput: $updateProjectInput) {
    _id
    name
    location
    project_leader {
      _id
      person {
        name
        address
        email
      }
    }
  }
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateProjectInput: // value for 'updateProjectInput'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const GetAllProjectEmployeesDocument = gql`
    query GetAllProjectEmployees($id: String!) {
  getAllProjectEmployees(id: $id) {
    registered {
      _id
      person {
        name
        email
        phone_number
        address
      }
      skill {
        _id
        name
      }
      role {
        _id
        name
      }
      status
    }
    unregistered {
      _id
      person {
        name
        email
        phone_number
        address
      }
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
}
    `;

/**
 * __useGetAllProjectEmployeesQuery__
 *
 * To run a query within a React component, call `useGetAllProjectEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProjectEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProjectEmployeesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAllProjectEmployeesQuery(baseOptions: Apollo.QueryHookOptions<GetAllProjectEmployeesQuery, GetAllProjectEmployeesQueryVariables> & ({ variables: GetAllProjectEmployeesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllProjectEmployeesQuery, GetAllProjectEmployeesQueryVariables>(GetAllProjectEmployeesDocument, options);
      }
export function useGetAllProjectEmployeesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllProjectEmployeesQuery, GetAllProjectEmployeesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllProjectEmployeesQuery, GetAllProjectEmployeesQueryVariables>(GetAllProjectEmployeesDocument, options);
        }
export function useGetAllProjectEmployeesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllProjectEmployeesQuery, GetAllProjectEmployeesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllProjectEmployeesQuery, GetAllProjectEmployeesQueryVariables>(GetAllProjectEmployeesDocument, options);
        }
export type GetAllProjectEmployeesQueryHookResult = ReturnType<typeof useGetAllProjectEmployeesQuery>;
export type GetAllProjectEmployeesLazyQueryHookResult = ReturnType<typeof useGetAllProjectEmployeesLazyQuery>;
export type GetAllProjectEmployeesSuspenseQueryHookResult = ReturnType<typeof useGetAllProjectEmployeesSuspenseQuery>;
export type GetAllProjectEmployeesQueryResult = Apollo.QueryResult<GetAllProjectEmployeesQuery, GetAllProjectEmployeesQueryVariables>;
export const AddNewProjectEmployeeDocument = gql`
    mutation AddNewProjectEmployee($id: String!, $employees: [String!]!) {
  addNewProjectEmployee(id: $id, employees: $employees) {
    _id
    person {
      name
      email
      phone_number
      address
    }
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
export type AddNewProjectEmployeeMutationFn = Apollo.MutationFunction<AddNewProjectEmployeeMutation, AddNewProjectEmployeeMutationVariables>;

/**
 * __useAddNewProjectEmployeeMutation__
 *
 * To run a mutation, you first call `useAddNewProjectEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNewProjectEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNewProjectEmployeeMutation, { data, loading, error }] = useAddNewProjectEmployeeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      employees: // value for 'employees'
 *   },
 * });
 */
export function useAddNewProjectEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<AddNewProjectEmployeeMutation, AddNewProjectEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddNewProjectEmployeeMutation, AddNewProjectEmployeeMutationVariables>(AddNewProjectEmployeeDocument, options);
      }
export type AddNewProjectEmployeeMutationHookResult = ReturnType<typeof useAddNewProjectEmployeeMutation>;
export type AddNewProjectEmployeeMutationResult = Apollo.MutationResult<AddNewProjectEmployeeMutation>;
export type AddNewProjectEmployeeMutationOptions = Apollo.BaseMutationOptions<AddNewProjectEmployeeMutation, AddNewProjectEmployeeMutationVariables>;
export const RemoveProjectEmployeeDocument = gql`
    mutation RemoveProjectEmployee($id: String!, $employee: String!, $description: String!) {
  removeProjectEmployee(id: $id, employee: $employee, description: $description) {
    _id
    person {
      name
      email
      phone_number
      address
    }
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
export type RemoveProjectEmployeeMutationFn = Apollo.MutationFunction<RemoveProjectEmployeeMutation, RemoveProjectEmployeeMutationVariables>;

/**
 * __useRemoveProjectEmployeeMutation__
 *
 * To run a mutation, you first call `useRemoveProjectEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProjectEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProjectEmployeeMutation, { data, loading, error }] = useRemoveProjectEmployeeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      employee: // value for 'employee'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useRemoveProjectEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProjectEmployeeMutation, RemoveProjectEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProjectEmployeeMutation, RemoveProjectEmployeeMutationVariables>(RemoveProjectEmployeeDocument, options);
      }
export type RemoveProjectEmployeeMutationHookResult = ReturnType<typeof useRemoveProjectEmployeeMutation>;
export type RemoveProjectEmployeeMutationResult = Apollo.MutationResult<RemoveProjectEmployeeMutation>;
export type RemoveProjectEmployeeMutationOptions = Apollo.BaseMutationOptions<RemoveProjectEmployeeMutation, RemoveProjectEmployeeMutationVariables>;
export const CreateAttendanceDocument = gql`
    mutation CreateAttendance($createAttendanceInput: CreateAttendanceModuleInput!) {
  createAttendance(createAttendanceInput: $createAttendanceInput) {
    _id
    start_date
    end_date
    submit_status
    description
  }
}
    `;
export type CreateAttendanceMutationFn = Apollo.MutationFunction<CreateAttendanceMutation, CreateAttendanceMutationVariables>;

/**
 * __useCreateAttendanceMutation__
 *
 * To run a mutation, you first call `useCreateAttendanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAttendanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAttendanceMutation, { data, loading, error }] = useCreateAttendanceMutation({
 *   variables: {
 *      createAttendanceInput: // value for 'createAttendanceInput'
 *   },
 * });
 */
export function useCreateAttendanceMutation(baseOptions?: Apollo.MutationHookOptions<CreateAttendanceMutation, CreateAttendanceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAttendanceMutation, CreateAttendanceMutationVariables>(CreateAttendanceDocument, options);
      }
export type CreateAttendanceMutationHookResult = ReturnType<typeof useCreateAttendanceMutation>;
export type CreateAttendanceMutationResult = Apollo.MutationResult<CreateAttendanceMutation>;
export type CreateAttendanceMutationOptions = Apollo.BaseMutationOptions<CreateAttendanceMutation, CreateAttendanceMutationVariables>;
export const FindAllAttendanceModulesDocument = gql`
    query FindAllAttendanceModules($projectId: String!) {
  findAllAttendanceModules(projectId: $projectId) {
    _id
    start_date
    end_date
    submit_status
    description
  }
}
    `;

/**
 * __useFindAllAttendanceModulesQuery__
 *
 * To run a query within a React component, call `useFindAllAttendanceModulesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllAttendanceModulesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllAttendanceModulesQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useFindAllAttendanceModulesQuery(baseOptions: Apollo.QueryHookOptions<FindAllAttendanceModulesQuery, FindAllAttendanceModulesQueryVariables> & ({ variables: FindAllAttendanceModulesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllAttendanceModulesQuery, FindAllAttendanceModulesQueryVariables>(FindAllAttendanceModulesDocument, options);
      }
export function useFindAllAttendanceModulesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllAttendanceModulesQuery, FindAllAttendanceModulesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllAttendanceModulesQuery, FindAllAttendanceModulesQueryVariables>(FindAllAttendanceModulesDocument, options);
        }
export function useFindAllAttendanceModulesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllAttendanceModulesQuery, FindAllAttendanceModulesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllAttendanceModulesQuery, FindAllAttendanceModulesQueryVariables>(FindAllAttendanceModulesDocument, options);
        }
export type FindAllAttendanceModulesQueryHookResult = ReturnType<typeof useFindAllAttendanceModulesQuery>;
export type FindAllAttendanceModulesLazyQueryHookResult = ReturnType<typeof useFindAllAttendanceModulesLazyQuery>;
export type FindAllAttendanceModulesSuspenseQueryHookResult = ReturnType<typeof useFindAllAttendanceModulesSuspenseQuery>;
export type FindAllAttendanceModulesQueryResult = Apollo.QueryResult<FindAllAttendanceModulesQuery, FindAllAttendanceModulesQueryVariables>;
export const FindOneAttendanceModuleDocument = gql`
    query FindOneAttendanceModule($projectId: String!, $moduleId: String!) {
  findOneAttendanceModule(projectId: $projectId, moduleId: $moduleId) {
    _id
    start_date
    end_date
    submit_status
    description
    attendance {
      date
      attendance_detail {
        check_in
        check_out
        employee {
          _id
          hire_date
          salary
          status
          person {
            name
            email
            phone_number
            address
          }
        }
      }
    }
  }
}
    `;

/**
 * __useFindOneAttendanceModuleQuery__
 *
 * To run a query within a React component, call `useFindOneAttendanceModuleQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneAttendanceModuleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneAttendanceModuleQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      moduleId: // value for 'moduleId'
 *   },
 * });
 */
export function useFindOneAttendanceModuleQuery(baseOptions: Apollo.QueryHookOptions<FindOneAttendanceModuleQuery, FindOneAttendanceModuleQueryVariables> & ({ variables: FindOneAttendanceModuleQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneAttendanceModuleQuery, FindOneAttendanceModuleQueryVariables>(FindOneAttendanceModuleDocument, options);
      }
export function useFindOneAttendanceModuleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneAttendanceModuleQuery, FindOneAttendanceModuleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneAttendanceModuleQuery, FindOneAttendanceModuleQueryVariables>(FindOneAttendanceModuleDocument, options);
        }
export function useFindOneAttendanceModuleSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindOneAttendanceModuleQuery, FindOneAttendanceModuleQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindOneAttendanceModuleQuery, FindOneAttendanceModuleQueryVariables>(FindOneAttendanceModuleDocument, options);
        }
export type FindOneAttendanceModuleQueryHookResult = ReturnType<typeof useFindOneAttendanceModuleQuery>;
export type FindOneAttendanceModuleLazyQueryHookResult = ReturnType<typeof useFindOneAttendanceModuleLazyQuery>;
export type FindOneAttendanceModuleSuspenseQueryHookResult = ReturnType<typeof useFindOneAttendanceModuleSuspenseQuery>;
export type FindOneAttendanceModuleQueryResult = Apollo.QueryResult<FindOneAttendanceModuleQuery, FindOneAttendanceModuleQueryVariables>;
export const UpdateAttendanceModuleDocument = gql`
    mutation UpdateAttendanceModule($projectId: String!, $moduleId: String!, $updateAttendanceModuleInput: UpdateAttendanceModuleInput!) {
  updateAttendanceModule(
    projectId: $projectId
    moduleId: $moduleId
    updateAttendanceModuleInput: $updateAttendanceModuleInput
  ) {
    _id
  }
}
    `;
export type UpdateAttendanceModuleMutationFn = Apollo.MutationFunction<UpdateAttendanceModuleMutation, UpdateAttendanceModuleMutationVariables>;

/**
 * __useUpdateAttendanceModuleMutation__
 *
 * To run a mutation, you first call `useUpdateAttendanceModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAttendanceModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAttendanceModuleMutation, { data, loading, error }] = useUpdateAttendanceModuleMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      moduleId: // value for 'moduleId'
 *      updateAttendanceModuleInput: // value for 'updateAttendanceModuleInput'
 *   },
 * });
 */
export function useUpdateAttendanceModuleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAttendanceModuleMutation, UpdateAttendanceModuleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAttendanceModuleMutation, UpdateAttendanceModuleMutationVariables>(UpdateAttendanceModuleDocument, options);
      }
export type UpdateAttendanceModuleMutationHookResult = ReturnType<typeof useUpdateAttendanceModuleMutation>;
export type UpdateAttendanceModuleMutationResult = Apollo.MutationResult<UpdateAttendanceModuleMutation>;
export type UpdateAttendanceModuleMutationOptions = Apollo.BaseMutationOptions<UpdateAttendanceModuleMutation, UpdateAttendanceModuleMutationVariables>;
export const DeleteAttendanceModuleDocument = gql`
    mutation DeleteAttendanceModule($projectId: String!, $moduleId: String!) {
  deleteAttendanceModule(projectId: $projectId, moduleId: $moduleId) {
    _id
  }
}
    `;
export type DeleteAttendanceModuleMutationFn = Apollo.MutationFunction<DeleteAttendanceModuleMutation, DeleteAttendanceModuleMutationVariables>;

/**
 * __useDeleteAttendanceModuleMutation__
 *
 * To run a mutation, you first call `useDeleteAttendanceModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAttendanceModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAttendanceModuleMutation, { data, loading, error }] = useDeleteAttendanceModuleMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      moduleId: // value for 'moduleId'
 *   },
 * });
 */
export function useDeleteAttendanceModuleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAttendanceModuleMutation, DeleteAttendanceModuleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAttendanceModuleMutation, DeleteAttendanceModuleMutationVariables>(DeleteAttendanceModuleDocument, options);
      }
export type DeleteAttendanceModuleMutationHookResult = ReturnType<typeof useDeleteAttendanceModuleMutation>;
export type DeleteAttendanceModuleMutationResult = Apollo.MutationResult<DeleteAttendanceModuleMutation>;
export type DeleteAttendanceModuleMutationOptions = Apollo.BaseMutationOptions<DeleteAttendanceModuleMutation, DeleteAttendanceModuleMutationVariables>;
export const FindAllProjectCostLogsDocument = gql`
    query FindAllProjectCostLogs($projectId: String!) {
  findAllProjectCostLogs(projectId: $projectId) {
    _id
    title
    description
    date
    price
    category
    request_cost
  }
}
    `;

/**
 * __useFindAllProjectCostLogsQuery__
 *
 * To run a query within a React component, call `useFindAllProjectCostLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllProjectCostLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllProjectCostLogsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useFindAllProjectCostLogsQuery(baseOptions: Apollo.QueryHookOptions<FindAllProjectCostLogsQuery, FindAllProjectCostLogsQueryVariables> & ({ variables: FindAllProjectCostLogsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllProjectCostLogsQuery, FindAllProjectCostLogsQueryVariables>(FindAllProjectCostLogsDocument, options);
      }
export function useFindAllProjectCostLogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllProjectCostLogsQuery, FindAllProjectCostLogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllProjectCostLogsQuery, FindAllProjectCostLogsQueryVariables>(FindAllProjectCostLogsDocument, options);
        }
export function useFindAllProjectCostLogsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllProjectCostLogsQuery, FindAllProjectCostLogsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllProjectCostLogsQuery, FindAllProjectCostLogsQueryVariables>(FindAllProjectCostLogsDocument, options);
        }
export type FindAllProjectCostLogsQueryHookResult = ReturnType<typeof useFindAllProjectCostLogsQuery>;
export type FindAllProjectCostLogsLazyQueryHookResult = ReturnType<typeof useFindAllProjectCostLogsLazyQuery>;
export type FindAllProjectCostLogsSuspenseQueryHookResult = ReturnType<typeof useFindAllProjectCostLogsSuspenseQuery>;
export type FindAllProjectCostLogsQueryResult = Apollo.QueryResult<FindAllProjectCostLogsQuery, FindAllProjectCostLogsQueryVariables>;