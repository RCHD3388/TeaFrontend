import * as Types from '../types/graphql_types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllWarehousesQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.FilterInput>;
}>;


export type GetAllWarehousesQuery = { __typename?: 'Query', getAllWarehouses: Array<{ __typename?: 'Warehouse', _id: string, name: string, description?: string | null, type: string, address: string, status: string }> };

export type GetAllWarehousesByUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllWarehousesByUserQuery = { __typename?: 'Query', getAllWarehousesByUser: Array<{ __typename?: 'Warehouse', _id: string, name: string, description?: string | null, type: string, project_leader?: string | null, address: string, status: string }> };

export type GetWarehouseByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type GetWarehouseByIdQuery = { __typename?: 'Query', getWarehouseById: { __typename?: 'Warehouse', _id: string, name: string, description?: string | null, type: string, address: string, status: string } };

export type CreateWarehouseMutationVariables = Types.Exact<{
  createWarehouseInput: Types.CreateWarehouseInput;
}>;


export type CreateWarehouseMutation = { __typename?: 'Mutation', createWarehouse: { __typename?: 'Warehouse', _id: string, name: string, description?: string | null, type: string, address: string, status: string } };

export type UpdateWarehouseMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  updateWarehouseInput: Types.UpdateWarehouseInput;
}>;


export type UpdateWarehouseMutation = { __typename?: 'Mutation', updateWarehouse: { __typename?: 'Warehouse', _id: string, name: string, description?: string | null, type: string, address: string, status: string } };

export type GetAllUnitMeasuresQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllUnitMeasuresQuery = { __typename?: 'Query', getAllUnitMeasures: Array<{ __typename?: 'UnitMeasure', _id: string, name: string, description?: string | null }> };

export type GetUnitMeasureByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type GetUnitMeasureByIdQuery = { __typename?: 'Query', getUnitMeasureById: { __typename?: 'UnitMeasure', _id: string, name: string, description?: string | null } };

export type CreateUnitMeasureMutationVariables = Types.Exact<{
  createInventoryCategoryInput: Types.CreateInventoryCategoryInput;
}>;


export type CreateUnitMeasureMutation = { __typename?: 'Mutation', createUnitMeasure: { __typename?: 'UnitMeasure', _id: string, name: string, description?: string | null } };

export type UpdateUnitMeasureMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  updateInventoryCategoryInput: Types.UpdateInventoryCategoryInput;
}>;


export type UpdateUnitMeasureMutation = { __typename?: 'Mutation', updateUnitMeasure: { __typename?: 'UnitMeasure', _id: string, name: string, description?: string | null } };

export type DeleteUnitMeasureMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type DeleteUnitMeasureMutation = { __typename?: 'Mutation', deleteUnitMeasure: { __typename?: 'UnitMeasure', _id: string, name: string, description?: string | null } };

export type GetAllMerksQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllMerksQuery = { __typename?: 'Query', getAllMerks: Array<{ __typename?: 'Merk', _id: string, name: string, description?: string | null }> };

export type GetMerkByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type GetMerkByIdQuery = { __typename?: 'Query', getMerkById: { __typename?: 'Merk', _id: string, name: string, description?: string | null } };

export type CreateMerkMutationVariables = Types.Exact<{
  createInventoryCategoryInput: Types.CreateInventoryCategoryInput;
}>;


export type CreateMerkMutation = { __typename?: 'Mutation', createMerk: { __typename?: 'Merk', _id: string, name: string, description?: string | null } };

export type UpdateMerkMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  updateInventoryCategoryInput: Types.UpdateInventoryCategoryInput;
}>;


export type UpdateMerkMutation = { __typename?: 'Mutation', updateMerk: { __typename?: 'Merk', _id: string, name: string, description?: string | null } };

export type DeleteMerkMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type DeleteMerkMutation = { __typename?: 'Mutation', deleteMerk: { __typename?: 'Merk', _id: string, name: string, description?: string | null } };

export type GetAllMaterialsQueryVariables = Types.Exact<{
  filterInput?: Types.InputMaybe<Types.FilterInput>;
}>;


export type GetAllMaterialsQuery = { __typename?: 'Query', getAllMaterials: Array<{ __typename?: 'Material', _id: string, id: string, name: string, description?: string | null, status: string, conversion: number, merk: { __typename?: 'Merk', _id: string, name: string }, unit_measure: { __typename?: 'UnitMeasure', _id: string, name: string }, minimum_unit_measure: { __typename?: 'UnitMeasure', _id: string, name: string }, item_category: { __typename?: 'CategoryData', _id: string, name: string } }> };

export type GetMaterialByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type GetMaterialByIdQuery = { __typename?: 'Query', getMaterialById: { __typename?: 'Material', _id: string, id: string, name: string, description?: string | null, status: string, conversion: number, merk: { __typename?: 'Merk', _id: string, name: string }, unit_measure: { __typename?: 'UnitMeasure', _id: string, name: string }, minimum_unit_measure: { __typename?: 'UnitMeasure', _id: string, name: string }, item_category: { __typename?: 'CategoryData', _id: string, name: string } } };

export type CreateMaterialMutationVariables = Types.Exact<{
  createMaterialInput: Types.CreateMaterialInput;
}>;


export type CreateMaterialMutation = { __typename?: 'Mutation', createMaterial: { __typename?: 'Material', _id: string, id: string, name: string, description?: string | null, status: string, conversion: number } };

export type UpdateMaterialMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  updateMaterialInput: Types.UpdateMaterialInput;
}>;


export type UpdateMaterialMutation = { __typename?: 'Mutation', updateMaterial: { __typename?: 'Material', _id: string, id: string, name: string, description?: string | null, status: string, conversion: number } };

export type GetAllSkusQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.FilterInput>;
}>;


export type GetAllSkusQuery = { __typename?: 'Query', getAllSkus: Array<{ __typename?: 'Sku', _id: string, name: string, description?: string | null, status: string, merk: { __typename?: 'Merk', _id: string, name: string }, item_category: { __typename?: 'CategoryData', _id: string, name: string } }> };

export type GetSkuByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type GetSkuByIdQuery = { __typename?: 'Query', getSkuById: { __typename?: 'Sku', _id: string, name: string, description?: string | null, status: string, merk: { __typename?: 'Merk', _id: string, name: string }, item_category: { __typename?: 'CategoryData', _id: string, name: string } } };

export type CreateSkuMutationVariables = Types.Exact<{
  createSkuInput: Types.CreateSkuInput;
}>;


export type CreateSkuMutation = { __typename?: 'Mutation', createSku: { __typename?: 'Sku', _id: string, name: string, description?: string | null } };

export type UpdateSkuMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  updateSkuInput: Types.UpdateSkuInput;
}>;


export type UpdateSkuMutation = { __typename?: 'Mutation', updateSku: { __typename?: 'Sku', _id: string, name: string, description?: string | null } };

export type GetAllToolsQueryVariables = Types.Exact<{
  sku?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetAllToolsQuery = { __typename?: 'Query', getAllTools: Array<{ __typename?: 'Tool', _id: string, id: string, description?: string | null, warranty_number?: string | null, warranty_expired_date?: any | null, price: number, status: { __typename?: 'CategoryData', _id: string, name: string, description?: string | null }, sku: { __typename?: 'Sku', _id: string, name: string } }> };


export const GetAllWarehousesDocument = gql`
    query GetAllWarehouses($filter: FilterInput) {
  getAllWarehouses(filter: $filter) {
    _id
    name
    description
    type
    address
    status
  }
}
    `;

/**
 * __useGetAllWarehousesQuery__
 *
 * To run a query within a React component, call `useGetAllWarehousesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllWarehousesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllWarehousesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetAllWarehousesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllWarehousesQuery, GetAllWarehousesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllWarehousesQuery, GetAllWarehousesQueryVariables>(GetAllWarehousesDocument, options);
      }
export function useGetAllWarehousesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllWarehousesQuery, GetAllWarehousesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllWarehousesQuery, GetAllWarehousesQueryVariables>(GetAllWarehousesDocument, options);
        }
export function useGetAllWarehousesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllWarehousesQuery, GetAllWarehousesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllWarehousesQuery, GetAllWarehousesQueryVariables>(GetAllWarehousesDocument, options);
        }
export type GetAllWarehousesQueryHookResult = ReturnType<typeof useGetAllWarehousesQuery>;
export type GetAllWarehousesLazyQueryHookResult = ReturnType<typeof useGetAllWarehousesLazyQuery>;
export type GetAllWarehousesSuspenseQueryHookResult = ReturnType<typeof useGetAllWarehousesSuspenseQuery>;
export type GetAllWarehousesQueryResult = Apollo.QueryResult<GetAllWarehousesQuery, GetAllWarehousesQueryVariables>;
export const GetAllWarehousesByUserDocument = gql`
    query GetAllWarehousesByUser {
  getAllWarehousesByUser {
    _id
    name
    description
    type
    project_leader
    address
    status
  }
}
    `;

/**
 * __useGetAllWarehousesByUserQuery__
 *
 * To run a query within a React component, call `useGetAllWarehousesByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllWarehousesByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllWarehousesByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllWarehousesByUserQuery(baseOptions?: Apollo.QueryHookOptions<GetAllWarehousesByUserQuery, GetAllWarehousesByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllWarehousesByUserQuery, GetAllWarehousesByUserQueryVariables>(GetAllWarehousesByUserDocument, options);
      }
export function useGetAllWarehousesByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllWarehousesByUserQuery, GetAllWarehousesByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllWarehousesByUserQuery, GetAllWarehousesByUserQueryVariables>(GetAllWarehousesByUserDocument, options);
        }
export function useGetAllWarehousesByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllWarehousesByUserQuery, GetAllWarehousesByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllWarehousesByUserQuery, GetAllWarehousesByUserQueryVariables>(GetAllWarehousesByUserDocument, options);
        }
export type GetAllWarehousesByUserQueryHookResult = ReturnType<typeof useGetAllWarehousesByUserQuery>;
export type GetAllWarehousesByUserLazyQueryHookResult = ReturnType<typeof useGetAllWarehousesByUserLazyQuery>;
export type GetAllWarehousesByUserSuspenseQueryHookResult = ReturnType<typeof useGetAllWarehousesByUserSuspenseQuery>;
export type GetAllWarehousesByUserQueryResult = Apollo.QueryResult<GetAllWarehousesByUserQuery, GetAllWarehousesByUserQueryVariables>;
export const GetWarehouseByIdDocument = gql`
    query GetWarehouseById($id: String!) {
  getWarehouseById(id: $id) {
    _id
    name
    description
    type
    address
    status
  }
}
    `;

/**
 * __useGetWarehouseByIdQuery__
 *
 * To run a query within a React component, call `useGetWarehouseByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWarehouseByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWarehouseByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetWarehouseByIdQuery(baseOptions: Apollo.QueryHookOptions<GetWarehouseByIdQuery, GetWarehouseByIdQueryVariables> & ({ variables: GetWarehouseByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWarehouseByIdQuery, GetWarehouseByIdQueryVariables>(GetWarehouseByIdDocument, options);
      }
export function useGetWarehouseByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWarehouseByIdQuery, GetWarehouseByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWarehouseByIdQuery, GetWarehouseByIdQueryVariables>(GetWarehouseByIdDocument, options);
        }
export function useGetWarehouseByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetWarehouseByIdQuery, GetWarehouseByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWarehouseByIdQuery, GetWarehouseByIdQueryVariables>(GetWarehouseByIdDocument, options);
        }
export type GetWarehouseByIdQueryHookResult = ReturnType<typeof useGetWarehouseByIdQuery>;
export type GetWarehouseByIdLazyQueryHookResult = ReturnType<typeof useGetWarehouseByIdLazyQuery>;
export type GetWarehouseByIdSuspenseQueryHookResult = ReturnType<typeof useGetWarehouseByIdSuspenseQuery>;
export type GetWarehouseByIdQueryResult = Apollo.QueryResult<GetWarehouseByIdQuery, GetWarehouseByIdQueryVariables>;
export const CreateWarehouseDocument = gql`
    mutation CreateWarehouse($createWarehouseInput: CreateWarehouseInput!) {
  createWarehouse(createWarehouseInput: $createWarehouseInput) {
    _id
    name
    description
    type
    address
    status
  }
}
    `;
export type CreateWarehouseMutationFn = Apollo.MutationFunction<CreateWarehouseMutation, CreateWarehouseMutationVariables>;

/**
 * __useCreateWarehouseMutation__
 *
 * To run a mutation, you first call `useCreateWarehouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWarehouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWarehouseMutation, { data, loading, error }] = useCreateWarehouseMutation({
 *   variables: {
 *      createWarehouseInput: // value for 'createWarehouseInput'
 *   },
 * });
 */
export function useCreateWarehouseMutation(baseOptions?: Apollo.MutationHookOptions<CreateWarehouseMutation, CreateWarehouseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWarehouseMutation, CreateWarehouseMutationVariables>(CreateWarehouseDocument, options);
      }
export type CreateWarehouseMutationHookResult = ReturnType<typeof useCreateWarehouseMutation>;
export type CreateWarehouseMutationResult = Apollo.MutationResult<CreateWarehouseMutation>;
export type CreateWarehouseMutationOptions = Apollo.BaseMutationOptions<CreateWarehouseMutation, CreateWarehouseMutationVariables>;
export const UpdateWarehouseDocument = gql`
    mutation UpdateWarehouse($id: String!, $updateWarehouseInput: UpdateWarehouseInput!) {
  updateWarehouse(id: $id, updateWarehouseInput: $updateWarehouseInput) {
    _id
    name
    description
    type
    address
    status
  }
}
    `;
export type UpdateWarehouseMutationFn = Apollo.MutationFunction<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>;

/**
 * __useUpdateWarehouseMutation__
 *
 * To run a mutation, you first call `useUpdateWarehouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWarehouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWarehouseMutation, { data, loading, error }] = useUpdateWarehouseMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateWarehouseInput: // value for 'updateWarehouseInput'
 *   },
 * });
 */
export function useUpdateWarehouseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>(UpdateWarehouseDocument, options);
      }
export type UpdateWarehouseMutationHookResult = ReturnType<typeof useUpdateWarehouseMutation>;
export type UpdateWarehouseMutationResult = Apollo.MutationResult<UpdateWarehouseMutation>;
export type UpdateWarehouseMutationOptions = Apollo.BaseMutationOptions<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>;
export const GetAllUnitMeasuresDocument = gql`
    query GetAllUnitMeasures {
  getAllUnitMeasures {
    _id
    name
    description
  }
}
    `;

/**
 * __useGetAllUnitMeasuresQuery__
 *
 * To run a query within a React component, call `useGetAllUnitMeasuresQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUnitMeasuresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUnitMeasuresQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUnitMeasuresQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUnitMeasuresQuery, GetAllUnitMeasuresQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUnitMeasuresQuery, GetAllUnitMeasuresQueryVariables>(GetAllUnitMeasuresDocument, options);
      }
export function useGetAllUnitMeasuresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUnitMeasuresQuery, GetAllUnitMeasuresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUnitMeasuresQuery, GetAllUnitMeasuresQueryVariables>(GetAllUnitMeasuresDocument, options);
        }
export function useGetAllUnitMeasuresSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllUnitMeasuresQuery, GetAllUnitMeasuresQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllUnitMeasuresQuery, GetAllUnitMeasuresQueryVariables>(GetAllUnitMeasuresDocument, options);
        }
export type GetAllUnitMeasuresQueryHookResult = ReturnType<typeof useGetAllUnitMeasuresQuery>;
export type GetAllUnitMeasuresLazyQueryHookResult = ReturnType<typeof useGetAllUnitMeasuresLazyQuery>;
export type GetAllUnitMeasuresSuspenseQueryHookResult = ReturnType<typeof useGetAllUnitMeasuresSuspenseQuery>;
export type GetAllUnitMeasuresQueryResult = Apollo.QueryResult<GetAllUnitMeasuresQuery, GetAllUnitMeasuresQueryVariables>;
export const GetUnitMeasureByIdDocument = gql`
    query GetUnitMeasureById($id: String!) {
  getUnitMeasureById(id: $id) {
    _id
    name
    description
  }
}
    `;

/**
 * __useGetUnitMeasureByIdQuery__
 *
 * To run a query within a React component, call `useGetUnitMeasureByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnitMeasureByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnitMeasureByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUnitMeasureByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUnitMeasureByIdQuery, GetUnitMeasureByIdQueryVariables> & ({ variables: GetUnitMeasureByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnitMeasureByIdQuery, GetUnitMeasureByIdQueryVariables>(GetUnitMeasureByIdDocument, options);
      }
export function useGetUnitMeasureByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnitMeasureByIdQuery, GetUnitMeasureByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnitMeasureByIdQuery, GetUnitMeasureByIdQueryVariables>(GetUnitMeasureByIdDocument, options);
        }
export function useGetUnitMeasureByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUnitMeasureByIdQuery, GetUnitMeasureByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUnitMeasureByIdQuery, GetUnitMeasureByIdQueryVariables>(GetUnitMeasureByIdDocument, options);
        }
export type GetUnitMeasureByIdQueryHookResult = ReturnType<typeof useGetUnitMeasureByIdQuery>;
export type GetUnitMeasureByIdLazyQueryHookResult = ReturnType<typeof useGetUnitMeasureByIdLazyQuery>;
export type GetUnitMeasureByIdSuspenseQueryHookResult = ReturnType<typeof useGetUnitMeasureByIdSuspenseQuery>;
export type GetUnitMeasureByIdQueryResult = Apollo.QueryResult<GetUnitMeasureByIdQuery, GetUnitMeasureByIdQueryVariables>;
export const CreateUnitMeasureDocument = gql`
    mutation CreateUnitMeasure($createInventoryCategoryInput: CreateInventoryCategoryInput!) {
  createUnitMeasure(createInventoryCategoryInput: $createInventoryCategoryInput) {
    _id
    name
    description
  }
}
    `;
export type CreateUnitMeasureMutationFn = Apollo.MutationFunction<CreateUnitMeasureMutation, CreateUnitMeasureMutationVariables>;

/**
 * __useCreateUnitMeasureMutation__
 *
 * To run a mutation, you first call `useCreateUnitMeasureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUnitMeasureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUnitMeasureMutation, { data, loading, error }] = useCreateUnitMeasureMutation({
 *   variables: {
 *      createInventoryCategoryInput: // value for 'createInventoryCategoryInput'
 *   },
 * });
 */
export function useCreateUnitMeasureMutation(baseOptions?: Apollo.MutationHookOptions<CreateUnitMeasureMutation, CreateUnitMeasureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUnitMeasureMutation, CreateUnitMeasureMutationVariables>(CreateUnitMeasureDocument, options);
      }
export type CreateUnitMeasureMutationHookResult = ReturnType<typeof useCreateUnitMeasureMutation>;
export type CreateUnitMeasureMutationResult = Apollo.MutationResult<CreateUnitMeasureMutation>;
export type CreateUnitMeasureMutationOptions = Apollo.BaseMutationOptions<CreateUnitMeasureMutation, CreateUnitMeasureMutationVariables>;
export const UpdateUnitMeasureDocument = gql`
    mutation UpdateUnitMeasure($id: String!, $updateInventoryCategoryInput: UpdateInventoryCategoryInput!) {
  updateUnitMeasure(
    id: $id
    updateInventoryCategoryInput: $updateInventoryCategoryInput
  ) {
    _id
    name
    description
  }
}
    `;
export type UpdateUnitMeasureMutationFn = Apollo.MutationFunction<UpdateUnitMeasureMutation, UpdateUnitMeasureMutationVariables>;

/**
 * __useUpdateUnitMeasureMutation__
 *
 * To run a mutation, you first call `useUpdateUnitMeasureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUnitMeasureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUnitMeasureMutation, { data, loading, error }] = useUpdateUnitMeasureMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateInventoryCategoryInput: // value for 'updateInventoryCategoryInput'
 *   },
 * });
 */
export function useUpdateUnitMeasureMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUnitMeasureMutation, UpdateUnitMeasureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUnitMeasureMutation, UpdateUnitMeasureMutationVariables>(UpdateUnitMeasureDocument, options);
      }
export type UpdateUnitMeasureMutationHookResult = ReturnType<typeof useUpdateUnitMeasureMutation>;
export type UpdateUnitMeasureMutationResult = Apollo.MutationResult<UpdateUnitMeasureMutation>;
export type UpdateUnitMeasureMutationOptions = Apollo.BaseMutationOptions<UpdateUnitMeasureMutation, UpdateUnitMeasureMutationVariables>;
export const DeleteUnitMeasureDocument = gql`
    mutation DeleteUnitMeasure($id: String!) {
  deleteUnitMeasure(id: $id) {
    _id
    name
    description
  }
}
    `;
export type DeleteUnitMeasureMutationFn = Apollo.MutationFunction<DeleteUnitMeasureMutation, DeleteUnitMeasureMutationVariables>;

/**
 * __useDeleteUnitMeasureMutation__
 *
 * To run a mutation, you first call `useDeleteUnitMeasureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUnitMeasureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUnitMeasureMutation, { data, loading, error }] = useDeleteUnitMeasureMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUnitMeasureMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUnitMeasureMutation, DeleteUnitMeasureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUnitMeasureMutation, DeleteUnitMeasureMutationVariables>(DeleteUnitMeasureDocument, options);
      }
export type DeleteUnitMeasureMutationHookResult = ReturnType<typeof useDeleteUnitMeasureMutation>;
export type DeleteUnitMeasureMutationResult = Apollo.MutationResult<DeleteUnitMeasureMutation>;
export type DeleteUnitMeasureMutationOptions = Apollo.BaseMutationOptions<DeleteUnitMeasureMutation, DeleteUnitMeasureMutationVariables>;
export const GetAllMerksDocument = gql`
    query GetAllMerks {
  getAllMerks {
    _id
    name
    description
  }
}
    `;

/**
 * __useGetAllMerksQuery__
 *
 * To run a query within a React component, call `useGetAllMerksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllMerksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllMerksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllMerksQuery(baseOptions?: Apollo.QueryHookOptions<GetAllMerksQuery, GetAllMerksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllMerksQuery, GetAllMerksQueryVariables>(GetAllMerksDocument, options);
      }
export function useGetAllMerksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllMerksQuery, GetAllMerksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllMerksQuery, GetAllMerksQueryVariables>(GetAllMerksDocument, options);
        }
export function useGetAllMerksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllMerksQuery, GetAllMerksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllMerksQuery, GetAllMerksQueryVariables>(GetAllMerksDocument, options);
        }
export type GetAllMerksQueryHookResult = ReturnType<typeof useGetAllMerksQuery>;
export type GetAllMerksLazyQueryHookResult = ReturnType<typeof useGetAllMerksLazyQuery>;
export type GetAllMerksSuspenseQueryHookResult = ReturnType<typeof useGetAllMerksSuspenseQuery>;
export type GetAllMerksQueryResult = Apollo.QueryResult<GetAllMerksQuery, GetAllMerksQueryVariables>;
export const GetMerkByIdDocument = gql`
    query GetMerkById($id: String!) {
  getMerkById(id: $id) {
    _id
    name
    description
  }
}
    `;

/**
 * __useGetMerkByIdQuery__
 *
 * To run a query within a React component, call `useGetMerkByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMerkByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMerkByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMerkByIdQuery(baseOptions: Apollo.QueryHookOptions<GetMerkByIdQuery, GetMerkByIdQueryVariables> & ({ variables: GetMerkByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMerkByIdQuery, GetMerkByIdQueryVariables>(GetMerkByIdDocument, options);
      }
export function useGetMerkByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMerkByIdQuery, GetMerkByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMerkByIdQuery, GetMerkByIdQueryVariables>(GetMerkByIdDocument, options);
        }
export function useGetMerkByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMerkByIdQuery, GetMerkByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMerkByIdQuery, GetMerkByIdQueryVariables>(GetMerkByIdDocument, options);
        }
export type GetMerkByIdQueryHookResult = ReturnType<typeof useGetMerkByIdQuery>;
export type GetMerkByIdLazyQueryHookResult = ReturnType<typeof useGetMerkByIdLazyQuery>;
export type GetMerkByIdSuspenseQueryHookResult = ReturnType<typeof useGetMerkByIdSuspenseQuery>;
export type GetMerkByIdQueryResult = Apollo.QueryResult<GetMerkByIdQuery, GetMerkByIdQueryVariables>;
export const CreateMerkDocument = gql`
    mutation CreateMerk($createInventoryCategoryInput: CreateInventoryCategoryInput!) {
  createMerk(createInventoryCategoryInput: $createInventoryCategoryInput) {
    _id
    name
    description
  }
}
    `;
export type CreateMerkMutationFn = Apollo.MutationFunction<CreateMerkMutation, CreateMerkMutationVariables>;

/**
 * __useCreateMerkMutation__
 *
 * To run a mutation, you first call `useCreateMerkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMerkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMerkMutation, { data, loading, error }] = useCreateMerkMutation({
 *   variables: {
 *      createInventoryCategoryInput: // value for 'createInventoryCategoryInput'
 *   },
 * });
 */
export function useCreateMerkMutation(baseOptions?: Apollo.MutationHookOptions<CreateMerkMutation, CreateMerkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMerkMutation, CreateMerkMutationVariables>(CreateMerkDocument, options);
      }
export type CreateMerkMutationHookResult = ReturnType<typeof useCreateMerkMutation>;
export type CreateMerkMutationResult = Apollo.MutationResult<CreateMerkMutation>;
export type CreateMerkMutationOptions = Apollo.BaseMutationOptions<CreateMerkMutation, CreateMerkMutationVariables>;
export const UpdateMerkDocument = gql`
    mutation UpdateMerk($id: String!, $updateInventoryCategoryInput: UpdateInventoryCategoryInput!) {
  updateMerk(id: $id, updateInventoryCategoryInput: $updateInventoryCategoryInput) {
    _id
    name
    description
  }
}
    `;
export type UpdateMerkMutationFn = Apollo.MutationFunction<UpdateMerkMutation, UpdateMerkMutationVariables>;

/**
 * __useUpdateMerkMutation__
 *
 * To run a mutation, you first call `useUpdateMerkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMerkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMerkMutation, { data, loading, error }] = useUpdateMerkMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateInventoryCategoryInput: // value for 'updateInventoryCategoryInput'
 *   },
 * });
 */
export function useUpdateMerkMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMerkMutation, UpdateMerkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMerkMutation, UpdateMerkMutationVariables>(UpdateMerkDocument, options);
      }
export type UpdateMerkMutationHookResult = ReturnType<typeof useUpdateMerkMutation>;
export type UpdateMerkMutationResult = Apollo.MutationResult<UpdateMerkMutation>;
export type UpdateMerkMutationOptions = Apollo.BaseMutationOptions<UpdateMerkMutation, UpdateMerkMutationVariables>;
export const DeleteMerkDocument = gql`
    mutation DeleteMerk($id: String!) {
  deleteMerk(id: $id) {
    _id
    name
    description
  }
}
    `;
export type DeleteMerkMutationFn = Apollo.MutationFunction<DeleteMerkMutation, DeleteMerkMutationVariables>;

/**
 * __useDeleteMerkMutation__
 *
 * To run a mutation, you first call `useDeleteMerkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMerkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMerkMutation, { data, loading, error }] = useDeleteMerkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMerkMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMerkMutation, DeleteMerkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMerkMutation, DeleteMerkMutationVariables>(DeleteMerkDocument, options);
      }
export type DeleteMerkMutationHookResult = ReturnType<typeof useDeleteMerkMutation>;
export type DeleteMerkMutationResult = Apollo.MutationResult<DeleteMerkMutation>;
export type DeleteMerkMutationOptions = Apollo.BaseMutationOptions<DeleteMerkMutation, DeleteMerkMutationVariables>;
export const GetAllMaterialsDocument = gql`
    query GetAllMaterials($filterInput: FilterInput) {
  getAllMaterials(filterInput: $filterInput) {
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
    item_category {
      _id
      name
    }
  }
}
    `;

/**
 * __useGetAllMaterialsQuery__
 *
 * To run a query within a React component, call `useGetAllMaterialsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllMaterialsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllMaterialsQuery({
 *   variables: {
 *      filterInput: // value for 'filterInput'
 *   },
 * });
 */
export function useGetAllMaterialsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllMaterialsQuery, GetAllMaterialsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllMaterialsQuery, GetAllMaterialsQueryVariables>(GetAllMaterialsDocument, options);
      }
export function useGetAllMaterialsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllMaterialsQuery, GetAllMaterialsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllMaterialsQuery, GetAllMaterialsQueryVariables>(GetAllMaterialsDocument, options);
        }
export function useGetAllMaterialsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllMaterialsQuery, GetAllMaterialsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllMaterialsQuery, GetAllMaterialsQueryVariables>(GetAllMaterialsDocument, options);
        }
export type GetAllMaterialsQueryHookResult = ReturnType<typeof useGetAllMaterialsQuery>;
export type GetAllMaterialsLazyQueryHookResult = ReturnType<typeof useGetAllMaterialsLazyQuery>;
export type GetAllMaterialsSuspenseQueryHookResult = ReturnType<typeof useGetAllMaterialsSuspenseQuery>;
export type GetAllMaterialsQueryResult = Apollo.QueryResult<GetAllMaterialsQuery, GetAllMaterialsQueryVariables>;
export const GetMaterialByIdDocument = gql`
    query GetMaterialById($id: String!) {
  getMaterialById(id: $id) {
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
    item_category {
      _id
      name
    }
  }
}
    `;

/**
 * __useGetMaterialByIdQuery__
 *
 * To run a query within a React component, call `useGetMaterialByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMaterialByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMaterialByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMaterialByIdQuery(baseOptions: Apollo.QueryHookOptions<GetMaterialByIdQuery, GetMaterialByIdQueryVariables> & ({ variables: GetMaterialByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMaterialByIdQuery, GetMaterialByIdQueryVariables>(GetMaterialByIdDocument, options);
      }
export function useGetMaterialByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMaterialByIdQuery, GetMaterialByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMaterialByIdQuery, GetMaterialByIdQueryVariables>(GetMaterialByIdDocument, options);
        }
export function useGetMaterialByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMaterialByIdQuery, GetMaterialByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMaterialByIdQuery, GetMaterialByIdQueryVariables>(GetMaterialByIdDocument, options);
        }
export type GetMaterialByIdQueryHookResult = ReturnType<typeof useGetMaterialByIdQuery>;
export type GetMaterialByIdLazyQueryHookResult = ReturnType<typeof useGetMaterialByIdLazyQuery>;
export type GetMaterialByIdSuspenseQueryHookResult = ReturnType<typeof useGetMaterialByIdSuspenseQuery>;
export type GetMaterialByIdQueryResult = Apollo.QueryResult<GetMaterialByIdQuery, GetMaterialByIdQueryVariables>;
export const CreateMaterialDocument = gql`
    mutation CreateMaterial($createMaterialInput: CreateMaterialInput!) {
  createMaterial(createMaterialInput: $createMaterialInput) {
    _id
    id
    name
    description
    status
    conversion
  }
}
    `;
export type CreateMaterialMutationFn = Apollo.MutationFunction<CreateMaterialMutation, CreateMaterialMutationVariables>;

/**
 * __useCreateMaterialMutation__
 *
 * To run a mutation, you first call `useCreateMaterialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMaterialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMaterialMutation, { data, loading, error }] = useCreateMaterialMutation({
 *   variables: {
 *      createMaterialInput: // value for 'createMaterialInput'
 *   },
 * });
 */
export function useCreateMaterialMutation(baseOptions?: Apollo.MutationHookOptions<CreateMaterialMutation, CreateMaterialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMaterialMutation, CreateMaterialMutationVariables>(CreateMaterialDocument, options);
      }
export type CreateMaterialMutationHookResult = ReturnType<typeof useCreateMaterialMutation>;
export type CreateMaterialMutationResult = Apollo.MutationResult<CreateMaterialMutation>;
export type CreateMaterialMutationOptions = Apollo.BaseMutationOptions<CreateMaterialMutation, CreateMaterialMutationVariables>;
export const UpdateMaterialDocument = gql`
    mutation UpdateMaterial($id: String!, $updateMaterialInput: UpdateMaterialInput!) {
  updateMaterial(id: $id, updateMaterialInput: $updateMaterialInput) {
    _id
    id
    name
    description
    status
    conversion
  }
}
    `;
export type UpdateMaterialMutationFn = Apollo.MutationFunction<UpdateMaterialMutation, UpdateMaterialMutationVariables>;

/**
 * __useUpdateMaterialMutation__
 *
 * To run a mutation, you first call `useUpdateMaterialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMaterialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMaterialMutation, { data, loading, error }] = useUpdateMaterialMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateMaterialInput: // value for 'updateMaterialInput'
 *   },
 * });
 */
export function useUpdateMaterialMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMaterialMutation, UpdateMaterialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMaterialMutation, UpdateMaterialMutationVariables>(UpdateMaterialDocument, options);
      }
export type UpdateMaterialMutationHookResult = ReturnType<typeof useUpdateMaterialMutation>;
export type UpdateMaterialMutationResult = Apollo.MutationResult<UpdateMaterialMutation>;
export type UpdateMaterialMutationOptions = Apollo.BaseMutationOptions<UpdateMaterialMutation, UpdateMaterialMutationVariables>;
export const GetAllSkusDocument = gql`
    query GetAllSkus($filter: FilterInput) {
  getAllSkus(filter: $filter) {
    _id
    name
    description
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
}
    `;

/**
 * __useGetAllSkusQuery__
 *
 * To run a query within a React component, call `useGetAllSkusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSkusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSkusQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetAllSkusQuery(baseOptions?: Apollo.QueryHookOptions<GetAllSkusQuery, GetAllSkusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllSkusQuery, GetAllSkusQueryVariables>(GetAllSkusDocument, options);
      }
export function useGetAllSkusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSkusQuery, GetAllSkusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllSkusQuery, GetAllSkusQueryVariables>(GetAllSkusDocument, options);
        }
export function useGetAllSkusSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllSkusQuery, GetAllSkusQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllSkusQuery, GetAllSkusQueryVariables>(GetAllSkusDocument, options);
        }
export type GetAllSkusQueryHookResult = ReturnType<typeof useGetAllSkusQuery>;
export type GetAllSkusLazyQueryHookResult = ReturnType<typeof useGetAllSkusLazyQuery>;
export type GetAllSkusSuspenseQueryHookResult = ReturnType<typeof useGetAllSkusSuspenseQuery>;
export type GetAllSkusQueryResult = Apollo.QueryResult<GetAllSkusQuery, GetAllSkusQueryVariables>;
export const GetSkuByIdDocument = gql`
    query GetSkuById($id: String!) {
  getSkuById(id: $id) {
    _id
    name
    description
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
}
    `;

/**
 * __useGetSkuByIdQuery__
 *
 * To run a query within a React component, call `useGetSkuByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSkuByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSkuByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSkuByIdQuery(baseOptions: Apollo.QueryHookOptions<GetSkuByIdQuery, GetSkuByIdQueryVariables> & ({ variables: GetSkuByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSkuByIdQuery, GetSkuByIdQueryVariables>(GetSkuByIdDocument, options);
      }
export function useGetSkuByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSkuByIdQuery, GetSkuByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSkuByIdQuery, GetSkuByIdQueryVariables>(GetSkuByIdDocument, options);
        }
export function useGetSkuByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSkuByIdQuery, GetSkuByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSkuByIdQuery, GetSkuByIdQueryVariables>(GetSkuByIdDocument, options);
        }
export type GetSkuByIdQueryHookResult = ReturnType<typeof useGetSkuByIdQuery>;
export type GetSkuByIdLazyQueryHookResult = ReturnType<typeof useGetSkuByIdLazyQuery>;
export type GetSkuByIdSuspenseQueryHookResult = ReturnType<typeof useGetSkuByIdSuspenseQuery>;
export type GetSkuByIdQueryResult = Apollo.QueryResult<GetSkuByIdQuery, GetSkuByIdQueryVariables>;
export const CreateSkuDocument = gql`
    mutation CreateSku($createSkuInput: CreateSkuInput!) {
  createSku(createSkuInput: $createSkuInput) {
    _id
    name
    description
  }
}
    `;
export type CreateSkuMutationFn = Apollo.MutationFunction<CreateSkuMutation, CreateSkuMutationVariables>;

/**
 * __useCreateSkuMutation__
 *
 * To run a mutation, you first call `useCreateSkuMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSkuMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSkuMutation, { data, loading, error }] = useCreateSkuMutation({
 *   variables: {
 *      createSkuInput: // value for 'createSkuInput'
 *   },
 * });
 */
export function useCreateSkuMutation(baseOptions?: Apollo.MutationHookOptions<CreateSkuMutation, CreateSkuMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSkuMutation, CreateSkuMutationVariables>(CreateSkuDocument, options);
      }
export type CreateSkuMutationHookResult = ReturnType<typeof useCreateSkuMutation>;
export type CreateSkuMutationResult = Apollo.MutationResult<CreateSkuMutation>;
export type CreateSkuMutationOptions = Apollo.BaseMutationOptions<CreateSkuMutation, CreateSkuMutationVariables>;
export const UpdateSkuDocument = gql`
    mutation UpdateSku($id: String!, $updateSkuInput: UpdateSkuInput!) {
  updateSku(id: $id, updateSkuInput: $updateSkuInput) {
    _id
    name
    description
  }
}
    `;
export type UpdateSkuMutationFn = Apollo.MutationFunction<UpdateSkuMutation, UpdateSkuMutationVariables>;

/**
 * __useUpdateSkuMutation__
 *
 * To run a mutation, you first call `useUpdateSkuMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSkuMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSkuMutation, { data, loading, error }] = useUpdateSkuMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateSkuInput: // value for 'updateSkuInput'
 *   },
 * });
 */
export function useUpdateSkuMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSkuMutation, UpdateSkuMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSkuMutation, UpdateSkuMutationVariables>(UpdateSkuDocument, options);
      }
export type UpdateSkuMutationHookResult = ReturnType<typeof useUpdateSkuMutation>;
export type UpdateSkuMutationResult = Apollo.MutationResult<UpdateSkuMutation>;
export type UpdateSkuMutationOptions = Apollo.BaseMutationOptions<UpdateSkuMutation, UpdateSkuMutationVariables>;
export const GetAllToolsDocument = gql`
    query GetAllTools($sku: String) {
  getAllTools(sku: $sku) {
    _id
    id
    description
    warranty_number
    warranty_expired_date
    price
    status {
      _id
      name
      description
    }
    sku {
      _id
      name
    }
  }
}
    `;

/**
 * __useGetAllToolsQuery__
 *
 * To run a query within a React component, call `useGetAllToolsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllToolsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllToolsQuery({
 *   variables: {
 *      sku: // value for 'sku'
 *   },
 * });
 */
export function useGetAllToolsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllToolsQuery, GetAllToolsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllToolsQuery, GetAllToolsQueryVariables>(GetAllToolsDocument, options);
      }
export function useGetAllToolsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllToolsQuery, GetAllToolsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllToolsQuery, GetAllToolsQueryVariables>(GetAllToolsDocument, options);
        }
export function useGetAllToolsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllToolsQuery, GetAllToolsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllToolsQuery, GetAllToolsQueryVariables>(GetAllToolsDocument, options);
        }
export type GetAllToolsQueryHookResult = ReturnType<typeof useGetAllToolsQuery>;
export type GetAllToolsLazyQueryHookResult = ReturnType<typeof useGetAllToolsLazyQuery>;
export type GetAllToolsSuspenseQueryHookResult = ReturnType<typeof useGetAllToolsSuspenseQuery>;
export type GetAllToolsQueryResult = Apollo.QueryResult<GetAllToolsQuery, GetAllToolsQueryVariables>;