import * as Types from '../types/graphql_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllPurchaseOrdersQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.FilterInput>;
}>;


export type GetAllPurchaseOrdersQuery = { __typename?: 'Query', getAllPurchaseOrders: Array<{ __typename?: 'PurchaseOrder', _id: string, title: string, description?: string | null, date: any, status: string, createdAt?: any | null, updatedAt?: any | null, requested_from: { __typename?: 'Warehouse', _id: string, name: string, description?: string | null, type: string, address: string, status: string }, requested_by: { __typename?: 'Employee', _id: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string } } }> };

export type GetPurchaseOrderByUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetPurchaseOrderByUserQuery = { __typename?: 'Query', getPurchaseOrderByUser: Array<{ __typename?: 'PurchaseOrder', _id: string, title: string, description?: string | null, date: any, status: string, createdAt?: any | null, updatedAt?: any | null, requested_by: { __typename?: 'Employee', _id: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string } }, requested_from: { __typename?: 'Warehouse', _id: string, name: string, description?: string | null, type: string, address: string } }> };

export type CreatePurchaseOrderMutationVariables = Types.Exact<{
  createPurchaseOrderInput: Types.CreateRequestPoInput;
}>;


export type CreatePurchaseOrderMutation = { __typename?: 'Mutation', createPurchaseOrder: { __typename?: 'PurchaseOrder', _id: string, title: string, description?: string | null, date: any, status: string } };

export type GetPurchaseOrderByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type GetPurchaseOrderByIdQuery = { __typename?: 'Query', getPurchaseOrderByID: { __typename?: 'CustomOneRequestPO', purchase_order: { __typename?: 'PurchaseOrder', _id: string, title: string, description?: string | null, date: any, status: string, requested_from: { __typename?: 'Warehouse', _id: string, name: string, description?: string | null, type: string, address: string }, requested_by: { __typename?: 'Employee', _id: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string } }, purchase_order_detail: Array<{ __typename?: 'PurchaseOrderDetail', _id: string, item: string, item_type: string, quantity: number, completed_quantity: number, sub_detail: Array<{ __typename?: 'PurchaseOrderSubDetail', purchase_transaction: string, purchase_transaction_detail: string, quantity: number }> }> }, skus: Array<{ __typename?: 'Sku', _id: string, name: string, description?: string | null, status: string, merk: { __typename?: 'Merk', _id: string, name: string } }>, materials: Array<{ __typename?: 'Material', _id: string, id: string, name: string, description?: string | null, status: string, conversion: number, minimum_unit_measure: { __typename?: 'UnitMeasure', _id: string, name: string }, unit_measure: { __typename?: 'UnitMeasure', _id: string, name: string }, merk: { __typename?: 'Merk', _id: string, name: string } }> } };

export type HandleWaitingPoMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  status: Types.Scalars['String']['input'];
}>;


export type HandleWaitingPoMutation = { __typename?: 'Mutation', handleWaitingPO: { __typename?: 'PurchaseOrder', _id: string, title: string, description?: string | null, date: any, status: string, createdAt?: any | null, updatedAt?: any | null } };

export type CancelPurchaseOrderMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type CancelPurchaseOrderMutation = { __typename?: 'Mutation', cancelPurchaseOrder: { __typename?: 'PurchaseOrder', _id: string, title: string, description?: string | null, date: any, status: string } };

export type GetAllPurchaseTransactionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllPurchaseTransactionsQuery = { __typename?: 'Query', getAllPurchaseTransactions: Array<{ __typename?: 'PurchaseTransaction', _id: string, transaction_number: string, description?: string | null, transaction_date: any, total: number, supplier: { __typename?: 'Supplier', _id: string, name: string, status: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string } }, purchasing_staff: { __typename?: 'Employee', _id: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string } } }> };

export type GetPurchaseTransactionByUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetPurchaseTransactionByUserQuery = { __typename?: 'Query', getPurchaseTransactionByUser: Array<{ __typename?: 'PurchaseTransaction', _id: string, transaction_number: string, description?: string | null, transaction_date: any, total: number, supplier: { __typename?: 'Supplier', _id: string, name: string, status: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string } }, purchasing_staff: { __typename?: 'Employee', _id: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string } } }> };

export type GetPurchaseTransactionByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type GetPurchaseTransactionByIdQuery = { __typename?: 'Query', getPurchaseTransactionById: { __typename?: 'PurchaseTransaction', _id: string, transaction_number: string, description?: string | null, transaction_date: any, total: number, purchasing_staff: { __typename?: 'Employee', _id: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string } }, supplier: { __typename?: 'Supplier', _id: string, name: string, status: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string } }, purchase_transaction_detail: Array<{ __typename?: 'PurchaseTransactionDetail', _id: string, item: string, original_item: string, item_type: string, quantity: number, price: number, subtotal: number, purchase_order: { __typename?: 'PurchaseOrder', _id: string, title: string, description?: string | null, date: any, status: string, createdAt?: any | null, updatedAt?: any | null, requested_by: { __typename?: 'Employee', _id: string, person: { __typename?: 'Person', name: string, email: string, phone_number: string, address: string } }, requested_from: { __typename?: 'Warehouse', _id: string, name: string, description?: string | null, type: string, address: string } } }> } };


export const GetAllPurchaseOrdersDocument = gql`
    query GetAllPurchaseOrders($filter: FilterInput) {
  getAllPurchaseOrders(filter: $filter) {
    _id
    title
    description
    date
    status
    createdAt
    updatedAt
    requested_from {
      _id
      name
      description
      type
      address
      status
    }
    requested_by {
      _id
      person {
        name
        email
        phone_number
        address
      }
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
 *      filter: // value for 'filter'
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
export const GetPurchaseOrderByUserDocument = gql`
    query GetPurchaseOrderByUser {
  getPurchaseOrderByUser {
    _id
    title
    description
    date
    status
    requested_by {
      _id
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
      address
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetPurchaseOrderByUserQuery__
 *
 * To run a query within a React component, call `useGetPurchaseOrderByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchaseOrderByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchaseOrderByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPurchaseOrderByUserQuery(baseOptions?: Apollo.QueryHookOptions<GetPurchaseOrderByUserQuery, GetPurchaseOrderByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPurchaseOrderByUserQuery, GetPurchaseOrderByUserQueryVariables>(GetPurchaseOrderByUserDocument, options);
      }
export function useGetPurchaseOrderByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPurchaseOrderByUserQuery, GetPurchaseOrderByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPurchaseOrderByUserQuery, GetPurchaseOrderByUserQueryVariables>(GetPurchaseOrderByUserDocument, options);
        }
export function useGetPurchaseOrderByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPurchaseOrderByUserQuery, GetPurchaseOrderByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPurchaseOrderByUserQuery, GetPurchaseOrderByUserQueryVariables>(GetPurchaseOrderByUserDocument, options);
        }
export type GetPurchaseOrderByUserQueryHookResult = ReturnType<typeof useGetPurchaseOrderByUserQuery>;
export type GetPurchaseOrderByUserLazyQueryHookResult = ReturnType<typeof useGetPurchaseOrderByUserLazyQuery>;
export type GetPurchaseOrderByUserSuspenseQueryHookResult = ReturnType<typeof useGetPurchaseOrderByUserSuspenseQuery>;
export type GetPurchaseOrderByUserQueryResult = Apollo.QueryResult<GetPurchaseOrderByUserQuery, GetPurchaseOrderByUserQueryVariables>;
export const CreatePurchaseOrderDocument = gql`
    mutation CreatePurchaseOrder($createPurchaseOrderInput: CreateRequestPOInput!) {
  createPurchaseOrder(createPurchaseOrderInput: $createPurchaseOrderInput) {
    _id
    title
    description
    date
    status
  }
}
    `;
export type CreatePurchaseOrderMutationFn = Apollo.MutationFunction<CreatePurchaseOrderMutation, CreatePurchaseOrderMutationVariables>;

/**
 * __useCreatePurchaseOrderMutation__
 *
 * To run a mutation, you first call `useCreatePurchaseOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePurchaseOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPurchaseOrderMutation, { data, loading, error }] = useCreatePurchaseOrderMutation({
 *   variables: {
 *      createPurchaseOrderInput: // value for 'createPurchaseOrderInput'
 *   },
 * });
 */
export function useCreatePurchaseOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreatePurchaseOrderMutation, CreatePurchaseOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePurchaseOrderMutation, CreatePurchaseOrderMutationVariables>(CreatePurchaseOrderDocument, options);
      }
export type CreatePurchaseOrderMutationHookResult = ReturnType<typeof useCreatePurchaseOrderMutation>;
export type CreatePurchaseOrderMutationResult = Apollo.MutationResult<CreatePurchaseOrderMutation>;
export type CreatePurchaseOrderMutationOptions = Apollo.BaseMutationOptions<CreatePurchaseOrderMutation, CreatePurchaseOrderMutationVariables>;
export const GetPurchaseOrderByIdDocument = gql`
    query GetPurchaseOrderByID($id: String!) {
  getPurchaseOrderByID(id: $id) {
    purchase_order {
      _id
      title
      description
      date
      status
      requested_from {
        _id
        name
        description
        type
        address
      }
      requested_by {
        _id
        person {
          name
          email
          phone_number
          address
        }
      }
      purchase_order_detail {
        _id
        item
        item_type
        quantity
        completed_quantity
        sub_detail {
          purchase_transaction
          purchase_transaction_detail
          quantity
        }
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
 * __useGetPurchaseOrderByIdQuery__
 *
 * To run a query within a React component, call `useGetPurchaseOrderByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchaseOrderByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchaseOrderByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPurchaseOrderByIdQuery(baseOptions: Apollo.QueryHookOptions<GetPurchaseOrderByIdQuery, GetPurchaseOrderByIdQueryVariables> & ({ variables: GetPurchaseOrderByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPurchaseOrderByIdQuery, GetPurchaseOrderByIdQueryVariables>(GetPurchaseOrderByIdDocument, options);
      }
export function useGetPurchaseOrderByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPurchaseOrderByIdQuery, GetPurchaseOrderByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPurchaseOrderByIdQuery, GetPurchaseOrderByIdQueryVariables>(GetPurchaseOrderByIdDocument, options);
        }
export function useGetPurchaseOrderByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPurchaseOrderByIdQuery, GetPurchaseOrderByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPurchaseOrderByIdQuery, GetPurchaseOrderByIdQueryVariables>(GetPurchaseOrderByIdDocument, options);
        }
export type GetPurchaseOrderByIdQueryHookResult = ReturnType<typeof useGetPurchaseOrderByIdQuery>;
export type GetPurchaseOrderByIdLazyQueryHookResult = ReturnType<typeof useGetPurchaseOrderByIdLazyQuery>;
export type GetPurchaseOrderByIdSuspenseQueryHookResult = ReturnType<typeof useGetPurchaseOrderByIdSuspenseQuery>;
export type GetPurchaseOrderByIdQueryResult = Apollo.QueryResult<GetPurchaseOrderByIdQuery, GetPurchaseOrderByIdQueryVariables>;
export const HandleWaitingPoDocument = gql`
    mutation HandleWaitingPO($id: String!, $status: String!) {
  handleWaitingPO(id: $id, status: $status) {
    _id
    title
    description
    date
    status
    createdAt
    updatedAt
  }
}
    `;
export type HandleWaitingPoMutationFn = Apollo.MutationFunction<HandleWaitingPoMutation, HandleWaitingPoMutationVariables>;

/**
 * __useHandleWaitingPoMutation__
 *
 * To run a mutation, you first call `useHandleWaitingPoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHandleWaitingPoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [handleWaitingPoMutation, { data, loading, error }] = useHandleWaitingPoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useHandleWaitingPoMutation(baseOptions?: Apollo.MutationHookOptions<HandleWaitingPoMutation, HandleWaitingPoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HandleWaitingPoMutation, HandleWaitingPoMutationVariables>(HandleWaitingPoDocument, options);
      }
export type HandleWaitingPoMutationHookResult = ReturnType<typeof useHandleWaitingPoMutation>;
export type HandleWaitingPoMutationResult = Apollo.MutationResult<HandleWaitingPoMutation>;
export type HandleWaitingPoMutationOptions = Apollo.BaseMutationOptions<HandleWaitingPoMutation, HandleWaitingPoMutationVariables>;
export const CancelPurchaseOrderDocument = gql`
    mutation CancelPurchaseOrder($id: String!) {
  cancelPurchaseOrder(id: $id) {
    _id
    title
    description
    date
    status
  }
}
    `;
export type CancelPurchaseOrderMutationFn = Apollo.MutationFunction<CancelPurchaseOrderMutation, CancelPurchaseOrderMutationVariables>;

/**
 * __useCancelPurchaseOrderMutation__
 *
 * To run a mutation, you first call `useCancelPurchaseOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelPurchaseOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelPurchaseOrderMutation, { data, loading, error }] = useCancelPurchaseOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCancelPurchaseOrderMutation(baseOptions?: Apollo.MutationHookOptions<CancelPurchaseOrderMutation, CancelPurchaseOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelPurchaseOrderMutation, CancelPurchaseOrderMutationVariables>(CancelPurchaseOrderDocument, options);
      }
export type CancelPurchaseOrderMutationHookResult = ReturnType<typeof useCancelPurchaseOrderMutation>;
export type CancelPurchaseOrderMutationResult = Apollo.MutationResult<CancelPurchaseOrderMutation>;
export type CancelPurchaseOrderMutationOptions = Apollo.BaseMutationOptions<CancelPurchaseOrderMutation, CancelPurchaseOrderMutationVariables>;
export const GetAllPurchaseTransactionsDocument = gql`
    query GetAllPurchaseTransactions {
  getAllPurchaseTransactions {
    _id
    transaction_number
    description
    transaction_date
    total
    supplier {
      _id
      name
      status
      person {
        name
        email
        phone_number
        address
      }
    }
    purchasing_staff {
      _id
      person {
        name
        email
        phone_number
        address
      }
    }
  }
}
    `;

/**
 * __useGetAllPurchaseTransactionsQuery__
 *
 * To run a query within a React component, call `useGetAllPurchaseTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPurchaseTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPurchaseTransactionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPurchaseTransactionsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPurchaseTransactionsQuery, GetAllPurchaseTransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPurchaseTransactionsQuery, GetAllPurchaseTransactionsQueryVariables>(GetAllPurchaseTransactionsDocument, options);
      }
export function useGetAllPurchaseTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPurchaseTransactionsQuery, GetAllPurchaseTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPurchaseTransactionsQuery, GetAllPurchaseTransactionsQueryVariables>(GetAllPurchaseTransactionsDocument, options);
        }
export function useGetAllPurchaseTransactionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllPurchaseTransactionsQuery, GetAllPurchaseTransactionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllPurchaseTransactionsQuery, GetAllPurchaseTransactionsQueryVariables>(GetAllPurchaseTransactionsDocument, options);
        }
export type GetAllPurchaseTransactionsQueryHookResult = ReturnType<typeof useGetAllPurchaseTransactionsQuery>;
export type GetAllPurchaseTransactionsLazyQueryHookResult = ReturnType<typeof useGetAllPurchaseTransactionsLazyQuery>;
export type GetAllPurchaseTransactionsSuspenseQueryHookResult = ReturnType<typeof useGetAllPurchaseTransactionsSuspenseQuery>;
export type GetAllPurchaseTransactionsQueryResult = Apollo.QueryResult<GetAllPurchaseTransactionsQuery, GetAllPurchaseTransactionsQueryVariables>;
export const GetPurchaseTransactionByUserDocument = gql`
    query GetPurchaseTransactionByUser {
  getPurchaseTransactionByUser {
    _id
    transaction_number
    description
    transaction_date
    total
    supplier {
      _id
      name
      status
      person {
        name
        email
        phone_number
        address
      }
    }
    purchasing_staff {
      _id
      person {
        name
        email
        phone_number
        address
      }
    }
  }
}
    `;

/**
 * __useGetPurchaseTransactionByUserQuery__
 *
 * To run a query within a React component, call `useGetPurchaseTransactionByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchaseTransactionByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchaseTransactionByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPurchaseTransactionByUserQuery(baseOptions?: Apollo.QueryHookOptions<GetPurchaseTransactionByUserQuery, GetPurchaseTransactionByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPurchaseTransactionByUserQuery, GetPurchaseTransactionByUserQueryVariables>(GetPurchaseTransactionByUserDocument, options);
      }
export function useGetPurchaseTransactionByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPurchaseTransactionByUserQuery, GetPurchaseTransactionByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPurchaseTransactionByUserQuery, GetPurchaseTransactionByUserQueryVariables>(GetPurchaseTransactionByUserDocument, options);
        }
export function useGetPurchaseTransactionByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPurchaseTransactionByUserQuery, GetPurchaseTransactionByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPurchaseTransactionByUserQuery, GetPurchaseTransactionByUserQueryVariables>(GetPurchaseTransactionByUserDocument, options);
        }
export type GetPurchaseTransactionByUserQueryHookResult = ReturnType<typeof useGetPurchaseTransactionByUserQuery>;
export type GetPurchaseTransactionByUserLazyQueryHookResult = ReturnType<typeof useGetPurchaseTransactionByUserLazyQuery>;
export type GetPurchaseTransactionByUserSuspenseQueryHookResult = ReturnType<typeof useGetPurchaseTransactionByUserSuspenseQuery>;
export type GetPurchaseTransactionByUserQueryResult = Apollo.QueryResult<GetPurchaseTransactionByUserQuery, GetPurchaseTransactionByUserQueryVariables>;
export const GetPurchaseTransactionByIdDocument = gql`
    query GetPurchaseTransactionById($id: String!) {
  getPurchaseTransactionById(id: $id) {
    _id
    transaction_number
    description
    transaction_date
    total
    purchasing_staff {
      _id
      person {
        name
        email
        phone_number
        address
      }
    }
    supplier {
      _id
      name
      status
      person {
        name
        email
        phone_number
        address
      }
    }
    purchase_transaction_detail {
      _id
      item
      original_item
      item_type
      quantity
      price
      subtotal
      purchase_order {
        _id
        title
        description
        date
        status
        createdAt
        updatedAt
        requested_by {
          _id
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
          address
        }
      }
    }
  }
}
    `;

/**
 * __useGetPurchaseTransactionByIdQuery__
 *
 * To run a query within a React component, call `useGetPurchaseTransactionByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchaseTransactionByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchaseTransactionByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPurchaseTransactionByIdQuery(baseOptions: Apollo.QueryHookOptions<GetPurchaseTransactionByIdQuery, GetPurchaseTransactionByIdQueryVariables> & ({ variables: GetPurchaseTransactionByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPurchaseTransactionByIdQuery, GetPurchaseTransactionByIdQueryVariables>(GetPurchaseTransactionByIdDocument, options);
      }
export function useGetPurchaseTransactionByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPurchaseTransactionByIdQuery, GetPurchaseTransactionByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPurchaseTransactionByIdQuery, GetPurchaseTransactionByIdQueryVariables>(GetPurchaseTransactionByIdDocument, options);
        }
export function useGetPurchaseTransactionByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPurchaseTransactionByIdQuery, GetPurchaseTransactionByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPurchaseTransactionByIdQuery, GetPurchaseTransactionByIdQueryVariables>(GetPurchaseTransactionByIdDocument, options);
        }
export type GetPurchaseTransactionByIdQueryHookResult = ReturnType<typeof useGetPurchaseTransactionByIdQuery>;
export type GetPurchaseTransactionByIdLazyQueryHookResult = ReturnType<typeof useGetPurchaseTransactionByIdLazyQuery>;
export type GetPurchaseTransactionByIdSuspenseQueryHookResult = ReturnType<typeof useGetPurchaseTransactionByIdSuspenseQuery>;
export type GetPurchaseTransactionByIdQueryResult = Apollo.QueryResult<GetPurchaseTransactionByIdQuery, GetPurchaseTransactionByIdQueryVariables>;