export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CreateMaterialInput = {
  conversion: Scalars['Float']['input'];
  description: Scalars['String']['input'];
  item_category: Scalars['String']['input'];
  merk: Scalars['String']['input'];
  minimum_unit_measure: Scalars['String']['input'];
  name: Scalars['String']['input'];
  unit_measure: Scalars['String']['input'];
};

export type CreateMerkInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateProjectInput = {
  created_at?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  finished_at?: InputMaybe<Scalars['DateTime']['input']>;
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
  priority: Scalars['String']['input'];
  status: Scalars['String']['input'];
  target_date?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreatePurchaseOrderDetailInput = {
  item: Scalars['ID']['input'];
  item_type: Scalars['String']['input'];
  qty: Scalars['Float']['input'];
  status: Scalars['String']['input'];
};

export type CreatePurchaseOrderInput = {
  date: Scalars['DateTime']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  purchase_order_detail?: InputMaybe<Array<CreatePurchaseOrderDetailInput>>;
  requested_by?: InputMaybe<Scalars['String']['input']>;
  requested_from?: InputMaybe<Scalars['String']['input']>;
  status: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateUnitMeasureInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type Material = {
  __typename?: 'Material';
  _id: Scalars['ID']['output'];
  conversion: Scalars['Float']['output'];
  description: Scalars['String']['output'];
  item_category: Scalars['String']['output'];
  merk: Scalars['String']['output'];
  minimum_unit_measure: Scalars['String']['output'];
  name: Scalars['String']['output'];
  unit_measure: Scalars['String']['output'];
};

export type Merk = {
  __typename?: 'Merk';
  _id: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMaterial: Material;
  createMerk: Merk;
  createProject: Project;
  createPurchaseOrder: PurchaseOrder;
  createUnitMeasure: UnitMeasure;
  deleteProject: Scalars['Boolean']['output'];
  updateProject: Project;
  updateUnitMeasure: UnitMeasure;
};


export type MutationCreateMaterialArgs = {
  data: CreateMaterialInput;
};


export type MutationCreateMerkArgs = {
  merk: CreateMerkInput;
};


export type MutationCreateProjectArgs = {
  data: CreateProjectInput;
};


export type MutationCreatePurchaseOrderArgs = {
  input: CreatePurchaseOrderInput;
};


export type MutationCreateUnitMeasureArgs = {
  data: CreateUnitMeasureInput;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateProjectArgs = {
  data: UpdateProjectInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateUnitMeasureArgs = {
  data: UpdateUnitMeasureInput;
  id: Scalars['String']['input'];
};

export type Project = {
  __typename?: 'Project';
  _id: Scalars['ID']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  finished_at?: Maybe<Scalars['DateTime']['output']>;
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  priority: Scalars['String']['output'];
  status: Scalars['String']['output'];
  target_date?: Maybe<Scalars['DateTime']['output']>;
};

export type PurchaseOrder = {
  __typename?: 'PurchaseOrder';
  _id: Scalars['ID']['output'];
  date: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  handled_date?: Maybe<Scalars['DateTime']['output']>;
  purchase_order_detail?: Maybe<Array<PurchaseOrderDetail>>;
  requested_by: Scalars['ID']['output'];
  requested_from: Scalars['ID']['output'];
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type PurchaseOrderDetail = {
  __typename?: 'PurchaseOrderDetail';
  item: Scalars['ID']['output'];
  item_type: Scalars['String']['output'];
  qty: Scalars['Float']['output'];
  status: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAllPurchaseOrders: Array<PurchaseOrder>;
  getHello: Scalars['String']['output'];
  getPurchaseOrderById: PurchaseOrder;
  material: Material;
  materials: Array<Material>;
  merk: Merk;
  merks: Array<Merk>;
  project: Project;
  projects: Array<Project>;
  unitMeasure: UnitMeasure;
  unitMeasures: Array<UnitMeasure>;
};


export type QueryGetPurchaseOrderByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryMaterialArgs = {
  id: Scalars['String']['input'];
};


export type QueryMerkArgs = {
  id: Scalars['String']['input'];
};


export type QueryProjectArgs = {
  id: Scalars['String']['input'];
};


export type QueryUnitMeasureArgs = {
  id: Scalars['String']['input'];
};

export type UnitMeasure = {
  __typename?: 'UnitMeasure';
  _id: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type UpdateProjectInput = {
  created_at?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  finished_at?: InputMaybe<Scalars['DateTime']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  target_date?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateUnitMeasureInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};
