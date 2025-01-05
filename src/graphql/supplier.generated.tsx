import * as Types from '../types/graphql_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllSuppliersQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.FilterInput>;
}>;


export type GetAllSuppliersQuery = { __typename?: 'Query', getAllSuppliers: Array<{ __typename?: 'Supplier', _id: string, name: string, status: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string } }> };

export type CreateSupplierMutationVariables = Types.Exact<{
  input: Types.CreateSupplierInput;
}>;


export type CreateSupplierMutation = { __typename?: 'Mutation', createSupplier: { __typename?: 'Supplier', _id: string, name: string, status: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string } } };

export type UpdateSupplierMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  updateSupplierInput: Types.UpdateSupplierInput;
}>;


export type UpdateSupplierMutation = { __typename?: 'Mutation', updateSupplier: { __typename?: 'Supplier', _id: string, name: string, status: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string } } };

export type GetSupplierByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type GetSupplierByIdQuery = { __typename?: 'Query', getSupplierById: { __typename?: 'Supplier', _id: string, name: string, status: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string } } };


export const GetAllSuppliersDocument = gql`
    query getAllSuppliers($filter: FilterInput) {
  getAllSuppliers(filter: $filter) {
    _id
    name
    person {
      name
      email
      phone_number
      address
    }
    status
  }
}
    `;

/**
 * __useGetAllSuppliersQuery__
 *
 * To run a query within a React component, call `useGetAllSuppliersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSuppliersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSuppliersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetAllSuppliersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllSuppliersQuery, GetAllSuppliersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllSuppliersQuery, GetAllSuppliersQueryVariables>(GetAllSuppliersDocument, options);
      }
export function useGetAllSuppliersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSuppliersQuery, GetAllSuppliersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllSuppliersQuery, GetAllSuppliersQueryVariables>(GetAllSuppliersDocument, options);
        }
export function useGetAllSuppliersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllSuppliersQuery, GetAllSuppliersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllSuppliersQuery, GetAllSuppliersQueryVariables>(GetAllSuppliersDocument, options);
        }
export type GetAllSuppliersQueryHookResult = ReturnType<typeof useGetAllSuppliersQuery>;
export type GetAllSuppliersLazyQueryHookResult = ReturnType<typeof useGetAllSuppliersLazyQuery>;
export type GetAllSuppliersSuspenseQueryHookResult = ReturnType<typeof useGetAllSuppliersSuspenseQuery>;
export type GetAllSuppliersQueryResult = Apollo.QueryResult<GetAllSuppliersQuery, GetAllSuppliersQueryVariables>;
export const CreateSupplierDocument = gql`
    mutation createSupplier($input: CreateSupplierInput!) {
  createSupplier(createSupplierInput: $input) {
    _id
    name
    person {
      name
      email
      phone_number
      address
    }
    status
  }
}
    `;
export type CreateSupplierMutationFn = Apollo.MutationFunction<CreateSupplierMutation, CreateSupplierMutationVariables>;

/**
 * __useCreateSupplierMutation__
 *
 * To run a mutation, you first call `useCreateSupplierMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSupplierMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSupplierMutation, { data, loading, error }] = useCreateSupplierMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSupplierMutation(baseOptions?: Apollo.MutationHookOptions<CreateSupplierMutation, CreateSupplierMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSupplierMutation, CreateSupplierMutationVariables>(CreateSupplierDocument, options);
      }
export type CreateSupplierMutationHookResult = ReturnType<typeof useCreateSupplierMutation>;
export type CreateSupplierMutationResult = Apollo.MutationResult<CreateSupplierMutation>;
export type CreateSupplierMutationOptions = Apollo.BaseMutationOptions<CreateSupplierMutation, CreateSupplierMutationVariables>;
export const UpdateSupplierDocument = gql`
    mutation updateSupplier($id: String!, $updateSupplierInput: UpdateSupplierInput!) {
  updateSupplier(id: $id, updateSupplierInput: $updateSupplierInput) {
    _id
    name
    person {
      name
      email
      phone_number
      address
    }
    status
  }
}
    `;
export type UpdateSupplierMutationFn = Apollo.MutationFunction<UpdateSupplierMutation, UpdateSupplierMutationVariables>;

/**
 * __useUpdateSupplierMutation__
 *
 * To run a mutation, you first call `useUpdateSupplierMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSupplierMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSupplierMutation, { data, loading, error }] = useUpdateSupplierMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateSupplierInput: // value for 'updateSupplierInput'
 *   },
 * });
 */
export function useUpdateSupplierMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSupplierMutation, UpdateSupplierMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSupplierMutation, UpdateSupplierMutationVariables>(UpdateSupplierDocument, options);
      }
export type UpdateSupplierMutationHookResult = ReturnType<typeof useUpdateSupplierMutation>;
export type UpdateSupplierMutationResult = Apollo.MutationResult<UpdateSupplierMutation>;
export type UpdateSupplierMutationOptions = Apollo.BaseMutationOptions<UpdateSupplierMutation, UpdateSupplierMutationVariables>;
export const GetSupplierByIdDocument = gql`
    query GetSupplierById($id: String!) {
  getSupplierById(id: $id) {
    _id
    name
    person {
      name
      email
      phone_number
      address
    }
    status
  }
}
    `;

/**
 * __useGetSupplierByIdQuery__
 *
 * To run a query within a React component, call `useGetSupplierByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSupplierByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSupplierByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSupplierByIdQuery(baseOptions: Apollo.QueryHookOptions<GetSupplierByIdQuery, GetSupplierByIdQueryVariables> & ({ variables: GetSupplierByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSupplierByIdQuery, GetSupplierByIdQueryVariables>(GetSupplierByIdDocument, options);
      }
export function useGetSupplierByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSupplierByIdQuery, GetSupplierByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSupplierByIdQuery, GetSupplierByIdQueryVariables>(GetSupplierByIdDocument, options);
        }
export function useGetSupplierByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSupplierByIdQuery, GetSupplierByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSupplierByIdQuery, GetSupplierByIdQueryVariables>(GetSupplierByIdDocument, options);
        }
export type GetSupplierByIdQueryHookResult = ReturnType<typeof useGetSupplierByIdQuery>;
export type GetSupplierByIdLazyQueryHookResult = ReturnType<typeof useGetSupplierByIdLazyQuery>;
export type GetSupplierByIdSuspenseQueryHookResult = ReturnType<typeof useGetSupplierByIdSuspenseQuery>;
export type GetSupplierByIdQueryResult = Apollo.QueryResult<GetSupplierByIdQuery, GetSupplierByIdQueryVariables>;