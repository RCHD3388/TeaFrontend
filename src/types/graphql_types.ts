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

export type CategoryData = {
  __typename?: 'CategoryData';
  _id: Scalars['ID']['output'];
  already_used: Scalars['Boolean']['output'];
  description: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type CreateCategoryInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type Employee = {
  __typename?: 'Employee';
  _id: Scalars['String']['output'];
  hire_date: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  person: Person;
  project_history: Array<EmployeeProjectHistory>;
  role: RoleSkillEmployee;
  salary: Scalars['Float']['output'];
  skill: Array<RoleSkillEmployee>;
  status: Scalars['String']['output'];
};

export type EmployeeProjectHistory = {
  __typename?: 'EmployeeProjectHistory';
  join_at: Scalars['DateTime']['output'];
  project: Scalars['String']['output'];
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  access_token: Scalars['String']['output'];
  role: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: CategoryData;
  create_project: Scalars['String']['output'];
  deleteCategory: CategoryData;
  login: LoginResponse;
  updateCategory: CategoryData;
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['String']['input'];
  updateCategoryInput: UpdateCategoryInput;
};

export type Person = {
  __typename?: 'Person';
  address: Scalars['String']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone_number: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAllEmployees: Array<Employee>;
  getCategories: Array<CategoryData>;
  getHello: Scalars['String']['output'];
};

export type RoleSkillEmployee = {
  __typename?: 'RoleSkillEmployee';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type UpdateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};
