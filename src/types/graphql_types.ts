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

export type CreateEmployeeInput = {
  hire_date: Scalars['String']['input'];
  person: PersonInput;
  role: RoleSkillEmployeeInput;
  salary: Scalars['Float']['input'];
  skill: RoleSkillEmployeeInput;
  status: Scalars['String']['input'];
};

export type CreateEmployeeSkillInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
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

export type EmployeeRole = {
  __typename?: 'EmployeeRole';
  _id: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type EmployeeSkill = {
  __typename?: 'EmployeeSkill';
  _id: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
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
  createEmployee: Employee;
  createEmployeeSkill: EmployeeSkill;
  create_project: Scalars['String']['output'];
  deleteCategory: CategoryData;
  login: LoginResponse;
  updateCategory: CategoryData;
  updateEmployee: Employee;
  updateEmployeeSkill: EmployeeSkill;
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};


export type MutationCreateEmployeeArgs = {
  createEmployeeInput: CreateEmployeeInput;
};


export type MutationCreateEmployeeSkillArgs = {
  createEmployeeSkillInput: CreateEmployeeSkillInput;
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


export type MutationUpdateEmployeeArgs = {
  id: Scalars['String']['input'];
  updateEmployeeInput: UpdateEmployeeInput;
};


export type MutationUpdateEmployeeSkillArgs = {
  id: Scalars['String']['input'];
  updateEmployeeSkillInput: CreateEmployeeSkillInput;
};

export type Person = {
  __typename?: 'Person';
  address: Scalars['String']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone_number: Scalars['String']['output'];
};

export type PersonInput = {
  address: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone_number: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllEmployees: Array<Employee>;
  getAllRole: Array<EmployeeRole>;
  getAllSkill: Array<EmployeeSkill>;
  getCategories: Array<CategoryData>;
  getEmployeeById: Employee;
  getHello: Scalars['String']['output'];
};


export type QueryGetEmployeeByIdArgs = {
  id: Scalars['String']['input'];
};

export type RoleSkillEmployee = {
  __typename?: 'RoleSkillEmployee';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type RoleSkillEmployeeInput = {
  id: Scalars['String']['input'];
};

export type RoleSkillEmployeeUpdateInput = {
  id: Scalars['String']['input'];
};

export type UpdateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEmployeeInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  hire_date?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<RoleSkillEmployeeUpdateInput>;
  salary?: InputMaybe<Scalars['Float']['input']>;
  skills?: InputMaybe<Array<RoleSkillEmployeeUpdateInput>>;
  status?: InputMaybe<Scalars['String']['input']>;
};
