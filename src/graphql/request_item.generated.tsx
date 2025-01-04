import * as Types from '../types/graphql_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateRequestItemTransactionMutationVariables = Types.Exact<{
  createRequestItemInput: Types.CreateRequestItemInput;
}>;


export type CreateRequestItemTransactionMutation = { __typename?: 'Mutation', createRequestItemTransaction: { __typename?: 'RequestItemHeader', _id: string, title: string, type: string, description?: string | null, requested_at: any, status: string } };

export type CancelItemRequestMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type CancelItemRequestMutation = { __typename?: 'Mutation', cancelItemRequest: { __typename?: 'RequestItemHeader', _id: string } };

export type UpdateAvailableStatusItemRequestMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  status: Types.Scalars['String']['input'];
}>;


export type UpdateAvailableStatusItemRequestMutation = { __typename?: 'Mutation', updateAvailableStatusItemRequest: { __typename?: 'RequestItemHeader', _id: string } };

export type ProcessingItemRequestMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  createProcessingDetailInput: Types.CreateProcessingDetailInput;
}>;


export type ProcessingItemRequestMutation = { __typename?: 'Mutation', processingItemRequest: { __typename?: 'RequestItemHeader', _id: string } };

export type ClosingItemRequestMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  createFinishingDetailInput: Types.CreateFinishingDetailInput;
}>;


export type ClosingItemRequestMutation = { __typename?: 'Mutation', closingItemRequest: { __typename?: 'RequestItemHeader', _id: string } };

export type FindYourRequestItemTransactionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FindYourRequestItemTransactionQuery = { __typename?: 'Query', findYourRequestItemTransaction: Array<{ __typename?: 'RequestItemHeader', _id: string, title: string, type: string, description?: string | null, requested_at: any, status: string, requested_from: { __typename?: 'Warehouse', _id: string, name: string, description?: string | null, address: string }, requested_by: { __typename?: 'Employee', _id: string, person: { __typename?: 'Person', name: string, email: string } }, requested_to: { __typename?: 'Warehouse', _id: string, name: string, description?: string | null, type: string, address: string } }> };

export type FindYourApprovalItemTransactionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FindYourApprovalItemTransactionQuery = { __typename?: 'Query', findYourApprovalItemTransaction: Array<{ __typename?: 'RequestItemHeader', _id: string, title: string, type: string, description?: string | null, requested_at: any, status: string, requested_from: { __typename?: 'Warehouse', _id: string, name: string, description?: string | null, address: string }, requested_by: { __typename?: 'Employee', _id: string, person: { __typename?: 'Person', name: string, email: string } }, requested_to: { __typename?: 'Warehouse', _id: string, name: string, description?: string | null, type: string, address: string } }> };

export type FindOneRequestItemTransactionQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type FindOneRequestItemTransactionQuery = { __typename?: 'Query', findOneRequestItemTransaction: { __typename?: 'CustomOneRequestItem', request_item_header: { __typename?: 'RequestItemHeader', _id: string, title: string, type: string, description?: string | null, requested_at: any, status: string, request_item_detail: Array<{ __typename?: 'RequestItemDetail', _id: string, item: string, price?: number | null, item_type: string, quantity: number, tool?: Array<{ __typename?: 'Tool', _id: string, id: string, description?: string | null, warranty_number?: string | null, warranty_expired_date?: any | null, price: number, sku: { __typename?: 'Sku', _id: string, name: string } }> | null }>, finishing_detail?: { __typename?: 'FinishingDetail', sender_name?: string | null, sender_phone?: string | null, police_number?: string | null, vehicle_detail?: string | null, recipient_name?: string | null, recipient_phone?: string | null, recipient_description?: string | null } | null, requested_to: { __typename?: 'Warehouse', _id: string, name: string, description?: string | null, type: string, project_leader?: string | null, address: string, status: string }, requested_by: { __typename?: 'Employee', _id: string, hire_date: any, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string } }, requested_from: { __typename?: 'Warehouse', _id: string, name: string, description?: string | null, type: string, project_leader?: string | null, address: string, status: string } }, skus: Array<{ __typename?: 'Sku', _id: string, name: string, description?: string | null, status: string, merk: { __typename?: 'Merk', _id: string, name: string } }>, materials: Array<{ __typename?: 'Material', _id: string, id: string, name: string, description?: string | null, status: string, conversion: number, minimum_unit_measure: { __typename?: 'UnitMeasure', _id: string, name: string }, unit_measure: { __typename?: 'UnitMeasure', _id: string, name: string }, merk: { __typename?: 'Merk', _id: string, name: string } }> } };


export const CreateRequestItemTransactionDocument = gql`
    mutation CreateRequestItemTransaction($createRequestItemInput: CreateRequestItemInput!) {
  createRequestItemTransaction(createRequestItemInput: $createRequestItemInput) {
    _id
    title
    type
    description
    requested_at
    status
  }
}
    `;
export type CreateRequestItemTransactionMutationFn = Apollo.MutationFunction<CreateRequestItemTransactionMutation, CreateRequestItemTransactionMutationVariables>;

/**
 * __useCreateRequestItemTransactionMutation__
 *
 * To run a mutation, you first call `useCreateRequestItemTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRequestItemTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRequestItemTransactionMutation, { data, loading, error }] = useCreateRequestItemTransactionMutation({
 *   variables: {
 *      createRequestItemInput: // value for 'createRequestItemInput'
 *   },
 * });
 */
export function useCreateRequestItemTransactionMutation(baseOptions?: Apollo.MutationHookOptions<CreateRequestItemTransactionMutation, CreateRequestItemTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRequestItemTransactionMutation, CreateRequestItemTransactionMutationVariables>(CreateRequestItemTransactionDocument, options);
      }
export type CreateRequestItemTransactionMutationHookResult = ReturnType<typeof useCreateRequestItemTransactionMutation>;
export type CreateRequestItemTransactionMutationResult = Apollo.MutationResult<CreateRequestItemTransactionMutation>;
export type CreateRequestItemTransactionMutationOptions = Apollo.BaseMutationOptions<CreateRequestItemTransactionMutation, CreateRequestItemTransactionMutationVariables>;
export const CancelItemRequestDocument = gql`
    mutation CancelItemRequest($id: String!) {
  cancelItemRequest(id: $id) {
    _id
  }
}
    `;
export type CancelItemRequestMutationFn = Apollo.MutationFunction<CancelItemRequestMutation, CancelItemRequestMutationVariables>;

/**
 * __useCancelItemRequestMutation__
 *
 * To run a mutation, you first call `useCancelItemRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelItemRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelItemRequestMutation, { data, loading, error }] = useCancelItemRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCancelItemRequestMutation(baseOptions?: Apollo.MutationHookOptions<CancelItemRequestMutation, CancelItemRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelItemRequestMutation, CancelItemRequestMutationVariables>(CancelItemRequestDocument, options);
      }
export type CancelItemRequestMutationHookResult = ReturnType<typeof useCancelItemRequestMutation>;
export type CancelItemRequestMutationResult = Apollo.MutationResult<CancelItemRequestMutation>;
export type CancelItemRequestMutationOptions = Apollo.BaseMutationOptions<CancelItemRequestMutation, CancelItemRequestMutationVariables>;
export const UpdateAvailableStatusItemRequestDocument = gql`
    mutation UpdateAvailableStatusItemRequest($id: String!, $status: String!) {
  updateAvailableStatusItemRequest(id: $id, status: $status) {
    _id
  }
}
    `;
export type UpdateAvailableStatusItemRequestMutationFn = Apollo.MutationFunction<UpdateAvailableStatusItemRequestMutation, UpdateAvailableStatusItemRequestMutationVariables>;

/**
 * __useUpdateAvailableStatusItemRequestMutation__
 *
 * To run a mutation, you first call `useUpdateAvailableStatusItemRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAvailableStatusItemRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAvailableStatusItemRequestMutation, { data, loading, error }] = useUpdateAvailableStatusItemRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateAvailableStatusItemRequestMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAvailableStatusItemRequestMutation, UpdateAvailableStatusItemRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAvailableStatusItemRequestMutation, UpdateAvailableStatusItemRequestMutationVariables>(UpdateAvailableStatusItemRequestDocument, options);
      }
export type UpdateAvailableStatusItemRequestMutationHookResult = ReturnType<typeof useUpdateAvailableStatusItemRequestMutation>;
export type UpdateAvailableStatusItemRequestMutationResult = Apollo.MutationResult<UpdateAvailableStatusItemRequestMutation>;
export type UpdateAvailableStatusItemRequestMutationOptions = Apollo.BaseMutationOptions<UpdateAvailableStatusItemRequestMutation, UpdateAvailableStatusItemRequestMutationVariables>;
export const ProcessingItemRequestDocument = gql`
    mutation ProcessingItemRequest($id: String!, $createProcessingDetailInput: CreateProcessingDetailInput!) {
  processingItemRequest(
    id: $id
    createProcessingDetailInput: $createProcessingDetailInput
  ) {
    _id
  }
}
    `;
export type ProcessingItemRequestMutationFn = Apollo.MutationFunction<ProcessingItemRequestMutation, ProcessingItemRequestMutationVariables>;

/**
 * __useProcessingItemRequestMutation__
 *
 * To run a mutation, you first call `useProcessingItemRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProcessingItemRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [processingItemRequestMutation, { data, loading, error }] = useProcessingItemRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *      createProcessingDetailInput: // value for 'createProcessingDetailInput'
 *   },
 * });
 */
export function useProcessingItemRequestMutation(baseOptions?: Apollo.MutationHookOptions<ProcessingItemRequestMutation, ProcessingItemRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProcessingItemRequestMutation, ProcessingItemRequestMutationVariables>(ProcessingItemRequestDocument, options);
      }
export type ProcessingItemRequestMutationHookResult = ReturnType<typeof useProcessingItemRequestMutation>;
export type ProcessingItemRequestMutationResult = Apollo.MutationResult<ProcessingItemRequestMutation>;
export type ProcessingItemRequestMutationOptions = Apollo.BaseMutationOptions<ProcessingItemRequestMutation, ProcessingItemRequestMutationVariables>;
export const ClosingItemRequestDocument = gql`
    mutation ClosingItemRequest($id: String!, $createFinishingDetailInput: CreateFinishingDetailInput!) {
  closingItemRequest(
    id: $id
    createFinishingDetailInput: $createFinishingDetailInput
  ) {
    _id
  }
}
    `;
export type ClosingItemRequestMutationFn = Apollo.MutationFunction<ClosingItemRequestMutation, ClosingItemRequestMutationVariables>;

/**
 * __useClosingItemRequestMutation__
 *
 * To run a mutation, you first call `useClosingItemRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClosingItemRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closingItemRequestMutation, { data, loading, error }] = useClosingItemRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *      createFinishingDetailInput: // value for 'createFinishingDetailInput'
 *   },
 * });
 */
export function useClosingItemRequestMutation(baseOptions?: Apollo.MutationHookOptions<ClosingItemRequestMutation, ClosingItemRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClosingItemRequestMutation, ClosingItemRequestMutationVariables>(ClosingItemRequestDocument, options);
      }
export type ClosingItemRequestMutationHookResult = ReturnType<typeof useClosingItemRequestMutation>;
export type ClosingItemRequestMutationResult = Apollo.MutationResult<ClosingItemRequestMutation>;
export type ClosingItemRequestMutationOptions = Apollo.BaseMutationOptions<ClosingItemRequestMutation, ClosingItemRequestMutationVariables>;
export const FindYourRequestItemTransactionDocument = gql`
    query FindYourRequestItemTransaction {
  findYourRequestItemTransaction {
    _id
    title
    type
    description
    requested_at
    status
    requested_from {
      _id
      name
      description
      address
    }
    requested_by {
      _id
      person {
        name
        email
      }
    }
    requested_to {
      _id
      name
      description
      type
      address
    }
  }
}
    `;

/**
 * __useFindYourRequestItemTransactionQuery__
 *
 * To run a query within a React component, call `useFindYourRequestItemTransactionQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindYourRequestItemTransactionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindYourRequestItemTransactionQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindYourRequestItemTransactionQuery(baseOptions?: Apollo.QueryHookOptions<FindYourRequestItemTransactionQuery, FindYourRequestItemTransactionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindYourRequestItemTransactionQuery, FindYourRequestItemTransactionQueryVariables>(FindYourRequestItemTransactionDocument, options);
      }
export function useFindYourRequestItemTransactionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindYourRequestItemTransactionQuery, FindYourRequestItemTransactionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindYourRequestItemTransactionQuery, FindYourRequestItemTransactionQueryVariables>(FindYourRequestItemTransactionDocument, options);
        }
export function useFindYourRequestItemTransactionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindYourRequestItemTransactionQuery, FindYourRequestItemTransactionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindYourRequestItemTransactionQuery, FindYourRequestItemTransactionQueryVariables>(FindYourRequestItemTransactionDocument, options);
        }
export type FindYourRequestItemTransactionQueryHookResult = ReturnType<typeof useFindYourRequestItemTransactionQuery>;
export type FindYourRequestItemTransactionLazyQueryHookResult = ReturnType<typeof useFindYourRequestItemTransactionLazyQuery>;
export type FindYourRequestItemTransactionSuspenseQueryHookResult = ReturnType<typeof useFindYourRequestItemTransactionSuspenseQuery>;
export type FindYourRequestItemTransactionQueryResult = Apollo.QueryResult<FindYourRequestItemTransactionQuery, FindYourRequestItemTransactionQueryVariables>;
export const FindYourApprovalItemTransactionDocument = gql`
    query FindYourApprovalItemTransaction {
  findYourApprovalItemTransaction {
    _id
    title
    type
    description
    requested_at
    status
    requested_from {
      _id
      name
      description
      address
    }
    requested_by {
      _id
      person {
        name
        email
      }
    }
    requested_to {
      _id
      name
      description
      type
      address
    }
  }
}
    `;

/**
 * __useFindYourApprovalItemTransactionQuery__
 *
 * To run a query within a React component, call `useFindYourApprovalItemTransactionQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindYourApprovalItemTransactionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindYourApprovalItemTransactionQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindYourApprovalItemTransactionQuery(baseOptions?: Apollo.QueryHookOptions<FindYourApprovalItemTransactionQuery, FindYourApprovalItemTransactionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindYourApprovalItemTransactionQuery, FindYourApprovalItemTransactionQueryVariables>(FindYourApprovalItemTransactionDocument, options);
      }
export function useFindYourApprovalItemTransactionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindYourApprovalItemTransactionQuery, FindYourApprovalItemTransactionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindYourApprovalItemTransactionQuery, FindYourApprovalItemTransactionQueryVariables>(FindYourApprovalItemTransactionDocument, options);
        }
export function useFindYourApprovalItemTransactionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindYourApprovalItemTransactionQuery, FindYourApprovalItemTransactionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindYourApprovalItemTransactionQuery, FindYourApprovalItemTransactionQueryVariables>(FindYourApprovalItemTransactionDocument, options);
        }
export type FindYourApprovalItemTransactionQueryHookResult = ReturnType<typeof useFindYourApprovalItemTransactionQuery>;
export type FindYourApprovalItemTransactionLazyQueryHookResult = ReturnType<typeof useFindYourApprovalItemTransactionLazyQuery>;
export type FindYourApprovalItemTransactionSuspenseQueryHookResult = ReturnType<typeof useFindYourApprovalItemTransactionSuspenseQuery>;
export type FindYourApprovalItemTransactionQueryResult = Apollo.QueryResult<FindYourApprovalItemTransactionQuery, FindYourApprovalItemTransactionQueryVariables>;
export const FindOneRequestItemTransactionDocument = gql`
    query FindOneRequestItemTransaction($id: String!) {
  findOneRequestItemTransaction(id: $id) {
    request_item_header {
      _id
      title
      type
      description
      requested_at
      status
      request_item_detail {
        tool {
          _id
          id
          description
          warranty_number
          warranty_expired_date
          price
          sku {
            _id
            name
          }
        }
        _id
        item
        price
        item_type
        quantity
      }
      finishing_detail {
        sender_name
        sender_phone
        police_number
        vehicle_detail
        recipient_name
        recipient_phone
        recipient_description
      }
      requested_to {
        _id
        name
        description
        type
        project_leader
        address
        status
      }
      requested_by {
        _id
        hire_date
        person {
          name
          email
          phone_number
          address
        }
      }
      requested_from {
        _id
        name
        description
        type
        project_leader
        address
        status
      }
    }
    skus {
      _id
      name
      description
      status
      merk {
        _id
        name
      }
    }
    materials {
      _id
      id
      name
      description
      status
      conversion
      minimum_unit_measure {
        _id
        name
      }
      unit_measure {
        _id
        name
      }
      merk {
        _id
        name
      }
    }
  }
}
    `;

/**
 * __useFindOneRequestItemTransactionQuery__
 *
 * To run a query within a React component, call `useFindOneRequestItemTransactionQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneRequestItemTransactionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneRequestItemTransactionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindOneRequestItemTransactionQuery(baseOptions: Apollo.QueryHookOptions<FindOneRequestItemTransactionQuery, FindOneRequestItemTransactionQueryVariables> & ({ variables: FindOneRequestItemTransactionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneRequestItemTransactionQuery, FindOneRequestItemTransactionQueryVariables>(FindOneRequestItemTransactionDocument, options);
      }
export function useFindOneRequestItemTransactionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneRequestItemTransactionQuery, FindOneRequestItemTransactionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneRequestItemTransactionQuery, FindOneRequestItemTransactionQueryVariables>(FindOneRequestItemTransactionDocument, options);
        }
export function useFindOneRequestItemTransactionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindOneRequestItemTransactionQuery, FindOneRequestItemTransactionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindOneRequestItemTransactionQuery, FindOneRequestItemTransactionQueryVariables>(FindOneRequestItemTransactionDocument, options);
        }
export type FindOneRequestItemTransactionQueryHookResult = ReturnType<typeof useFindOneRequestItemTransactionQuery>;
export type FindOneRequestItemTransactionLazyQueryHookResult = ReturnType<typeof useFindOneRequestItemTransactionLazyQuery>;
export type FindOneRequestItemTransactionSuspenseQueryHookResult = ReturnType<typeof useFindOneRequestItemTransactionSuspenseQuery>;
export type FindOneRequestItemTransactionQueryResult = Apollo.QueryResult<FindOneRequestItemTransactionQuery, FindOneRequestItemTransactionQueryVariables>;