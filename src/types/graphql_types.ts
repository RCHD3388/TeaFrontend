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

export type Attendance = {
  __typename?: 'Attendance';
  attendance_detail: Array<AttendanceDetail>;
  created_by: Employee;
  date: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
};

export type AttendanceDetail = {
  __typename?: 'AttendanceDetail';
  check_in: Scalars['Boolean']['output'];
  check_out: Scalars['Boolean']['output'];
  employee: Employee;
  note: Scalars['String']['output'];
};

export type CategoryData = {
  __typename?: 'CategoryData';
  _id: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type CategoryFilter = {
  filter?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type CreateEmployeeInput = {
  hire_date: Scalars['String']['input'];
  person: PersonInput;
  role: Scalars['String']['input'];
  salary: Scalars['Float']['input'];
  skill: Scalars['String']['input'];
  status: Scalars['String']['input'];
};

export type CreateEmployeeSkillInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateInventoryCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateMaterialInput = {
  conversion: Scalars['Float']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  item_category: Scalars['String']['input'];
  merk: Scalars['String']['input'];
  minimum_unit_measure: Scalars['String']['input'];
  name: Scalars['String']['input'];
  status: Scalars['String']['input'];
  unit_measure: Scalars['String']['input'];
};

export type CreateProjectInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
  priority: Scalars['String']['input'];
  project_leader: Scalars['String']['input'];
  status: Scalars['String']['input'];
  target_date?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateSkuInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  item_category: Scalars['String']['input'];
  merk: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateSupplierInput = {
  name: Scalars['String']['input'];
  person: PersonInput;
  status: Scalars['String']['input'];
};

export type CreateUserInput = {
  employee: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateWarehouseInput = {
  address: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  project?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type Employee = {
  __typename?: 'Employee';
  _id: Scalars['String']['output'];
  hire_date: Scalars['DateTime']['output'];
  person: Person;
  project_history: Array<EmployeeProjectHistory>;
  role: EmployeeRole;
  salary?: Maybe<Scalars['Float']['output']>;
  skill: Array<EmployeeSkill>;
  status: Scalars['String']['output'];
};

export type EmployeeFilter = {
  filter?: InputMaybe<Array<Scalars['String']['input']>>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
};

export type EmployeeProjectHistory = {
  __typename?: 'EmployeeProjectHistory';
  description: Scalars['String']['output'];
  join_at: Scalars['DateTime']['output'];
  left_at?: Maybe<Scalars['DateTime']['output']>;
  project: Scalars['String']['output'];
};

export type EmployeeRole = {
  __typename?: 'EmployeeRole';
  _id: Scalars['String']['output'];
  description: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type EmployeeSkill = {
  __typename?: 'EmployeeSkill';
  _id: Scalars['String']['output'];
  description: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type GetAllProjectEmployeeDto = {
  __typename?: 'GetAllProjectEmployeeDto';
  registered: Array<Employee>;
  unregistered?: Maybe<Array<Employee>>;
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  access_token: Scalars['String']['output'];
  name: Scalars['String']['output'];
  role: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Material = {
  __typename?: 'Material';
  _id: Scalars['ID']['output'];
  conversion: Scalars['Float']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  item_category: CategoryData;
  merk: Merk;
  minimum_unit_measure: UnitMeasure;
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
  unit_measure: UnitMeasure;
};

export type MaterialTransaction = {
  __typename?: 'MaterialTransaction';
  name: Scalars['String']['output'];
};

export type Merk = {
  __typename?: 'Merk';
  _id: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addNewProjectEmployee: Array<Employee>;
  createCategory: CategoryData;
  createEmployee: Employee;
  createEmployeeSkill: EmployeeSkill;
  createMaterial: Material;
  createMerk: Merk;
  createProject: Project;
  createSku: Sku;
  createSupplier: Supplier;
  createUnitMeasure: UnitMeasure;
  createUser: User;
  createWarehouse: Warehouse;
  deleteCategory: CategoryData;
  deleteEmployeeSkill: EmployeeSkill;
  deleteMerk: Merk;
  deleteUnitMeasure: UnitMeasure;
  deleteUserPassword: User;
  login: LoginResponse;
  removeProjectEmployee: Employee;
  updateCategory: CategoryData;
  updateEmployee: Employee;
  updateEmployeeSkill: EmployeeSkill;
  updateMaterial: Material;
  updateMerk: Merk;
  updateProject: Project;
  updateSku: Sku;
  updateSupplier: Supplier;
  updateUnitMeasure: UnitMeasure;
  updateUser: User;
  updateUserPassword: User;
  updateWarehouse: Warehouse;
};


export type MutationAddNewProjectEmployeeArgs = {
  employees: Array<Scalars['String']['input']>;
  id: Scalars['String']['input'];
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


export type MutationCreateMaterialArgs = {
  createMaterialInput: CreateMaterialInput;
};


export type MutationCreateMerkArgs = {
  createInventoryCategoryInput: CreateInventoryCategoryInput;
};


export type MutationCreateProjectArgs = {
  createProjectInput: CreateProjectInput;
};


export type MutationCreateSkuArgs = {
  createSkuInput: CreateSkuInput;
};


export type MutationCreateSupplierArgs = {
  createSupplierInput: CreateSupplierInput;
};


export type MutationCreateUnitMeasureArgs = {
  createInventoryCategoryInput: CreateInventoryCategoryInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationCreateWarehouseArgs = {
  createWarehouseInput: CreateWarehouseInput;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteEmployeeSkillArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteMerkArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUnitMeasureArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserPasswordArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationRemoveProjectEmployeeArgs = {
  description: Scalars['String']['input'];
  employee: Scalars['String']['input'];
  id: Scalars['String']['input'];
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


export type MutationUpdateMaterialArgs = {
  id: Scalars['String']['input'];
  updateMaterialInput: UpdateMaterialInput;
};


export type MutationUpdateMerkArgs = {
  id: Scalars['String']['input'];
  updateInventoryCategoryInput: UpdateInventoryCategoryInput;
};


export type MutationUpdateProjectArgs = {
  id: Scalars['String']['input'];
  updateProjectInput: UpdateProjectInput;
};


export type MutationUpdateSkuArgs = {
  id: Scalars['String']['input'];
  updateSkuInput: UpdateSkuInput;
};


export type MutationUpdateSupplierArgs = {
  id: Scalars['String']['input'];
  updateSupplierInput: UpdateSupplierInput;
};


export type MutationUpdateUnitMeasureArgs = {
  id: Scalars['String']['input'];
  updateInventoryCategoryInput: UpdateInventoryCategoryInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  updateUserInput: UpdateUserInput;
};


export type MutationUpdateUserPasswordArgs = {
  id: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateWarehouseArgs = {
  id: Scalars['String']['input'];
  updateWarehouseInput: UpdateWarehouseInput;
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

export type Project = {
  __typename?: 'Project';
  _id: Scalars['String']['output'];
  attendace: Array<Attendance>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  finished_at?: Maybe<Scalars['DateTime']['output']>;
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  priority: CategoryData;
  project_closing?: Maybe<ProjectClosing>;
  project_leader: Employee;
  status: CategoryData;
  target_date?: Maybe<Scalars['DateTime']['output']>;
  worker: Array<Employee>;
};

export type ProjectClosing = {
  __typename?: 'ProjectClosing';
  closed_by: Employee;
  document?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  status: CategoryData;
};

export type Query = {
  __typename?: 'Query';
  findAllProjects: Array<Project>;
  findProjectById: Project;
  getAllEmployees: Array<Employee>;
  getAllMaterials: Array<Material>;
  getAllMerks: Array<Merk>;
  getAllProjectEmployees: GetAllProjectEmployeeDto;
  getAllRole: Array<EmployeeRole>;
  getAllSkill: Array<EmployeeSkill>;
  getAllSkus: Array<Sku>;
  getAllSuppliers: Array<Supplier>;
  getAllUnitMeasures: Array<UnitMeasure>;
  getAllUsers: Array<User>;
  getAllWarehouses: Array<Warehouse>;
  getCategories: Array<CategoryData>;
  getEmployeeById: Employee;
  getHello: Scalars['String']['output'];
  getMaterialById: Material;
  getMerkById: Merk;
  getSkuById: Sku;
  getSupplierById: Supplier;
  getUnitMeasureById: UnitMeasure;
  getUserById: User;
  getWarehouseById: Warehouse;
};


export type QueryFindProjectByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetAllEmployeesArgs = {
  employeeFilter?: InputMaybe<EmployeeFilter>;
};


export type QueryGetAllProjectEmployeesArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetCategoriesArgs = {
  categoryFilter?: InputMaybe<CategoryFilter>;
};


export type QueryGetEmployeeByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetMaterialByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetMerkByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetSkuByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetSupplierByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUnitMeasureByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetWarehouseByIdArgs = {
  id: Scalars['String']['input'];
};

export type Sku = {
  __typename?: 'Sku';
  _id: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  item_category: CategoryData;
  merk: Merk;
  name: Scalars['String']['output'];
};

export type Supplier = {
  __typename?: 'Supplier';
  _id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  person: Person;
  status: Scalars['String']['output'];
};

export type ToolTransaction = {
  __typename?: 'ToolTransaction';
  name: Scalars['String']['output'];
};

export type UnitMeasure = {
  __typename?: 'UnitMeasure';
  _id: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
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
  role?: InputMaybe<Scalars['String']['input']>;
  salary?: InputMaybe<Scalars['Float']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateInventoryCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMaterialInput = {
  conversion: Scalars['Float']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  item_category: Scalars['String']['input'];
  merk: Scalars['String']['input'];
  minimum_unit_measure: Scalars['String']['input'];
  name: Scalars['String']['input'];
  status: Scalars['String']['input'];
  unit_measure: Scalars['String']['input'];
};

export type UpdateProjectInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['String']['input']>;
  project_leader?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  target_date?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateSkuInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  item_category: Scalars['String']['input'];
  merk?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSupplierInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  company_name?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  status?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWarehouseInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String']['output'];
  employee: Employee;
  status: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Warehouse = {
  __typename?: 'Warehouse';
  _id: Scalars['String']['output'];
  address: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  material_transaction: Array<MaterialTransaction>;
  name: Scalars['String']['output'];
  project?: Maybe<Project>;
  status: Scalars['String']['output'];
  tool_transaction: Array<ToolTransaction>;
  type: Scalars['String']['output'];
};
