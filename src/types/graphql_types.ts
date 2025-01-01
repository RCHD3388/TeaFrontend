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

export type AddOnlyToolTransactionInput = {
  tool: Array<CreateToolInput>;
  warehouse_to?: InputMaybe<Scalars['String']['input']>;
};

export type Attendance = {
  __typename?: 'Attendance';
  attendance_detail: Array<AttendanceDetail>;
  date: Scalars['DateTime']['output'];
};

export type AttendanceDetail = {
  __typename?: 'AttendanceDetail';
  check_in: Scalars['Boolean']['output'];
  check_out: Scalars['Boolean']['output'];
  employee: Employee;
};

export type AttendanceModule = {
  __typename?: 'AttendanceModule';
  _id: Scalars['String']['output'];
  attendance: Array<Attendance>;
  description: Scalars['String']['output'];
  end_date: Scalars['DateTime']['output'];
  start_date: Scalars['DateTime']['output'];
  submit_status: Scalars['Boolean']['output'];
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

export type CreateAttendanceModuleInput = {
  project_id: Scalars['String']['input'];
  start_date: Scalars['DateTime']['input'];
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
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateFinishingDetailInput = {
  recipient_description?: InputMaybe<Scalars['String']['input']>;
  recipient_name: Scalars['String']['input'];
  recipient_phone: Scalars['String']['input'];
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

export type CreateMaterialTransactionInput = {
  materials: Array<MaterialDetailInput>;
  warehouse_from?: InputMaybe<Scalars['String']['input']>;
  warehouse_to?: InputMaybe<Scalars['String']['input']>;
};

export type CreateNewPurchaseTransactionDetailInput = {
  input: CreatePurchaseTransactionDetailInput;
};

export type CreatePoDetailInput = {
  item: Scalars['String']['input'];
  item_type: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
};

export type CreateProcessingDetailInput = {
  police_number?: InputMaybe<Scalars['String']['input']>;
  processing_tool_detail?: InputMaybe<Array<ProcessingToolDetailInput>>;
  sender_name: Scalars['String']['input'];
  sender_phone: Scalars['String']['input'];
  vehicle_detail?: InputMaybe<Scalars['String']['input']>;
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

export type CreatePurchaseTransactionDetailInput = {
  item: Scalars['String']['input'];
  item_type: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  purchase_order: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
  tool?: InputMaybe<CreateToolInput>;
};

export type CreateRequestClosingInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  requested_from: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateRequestCostInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  price: Scalars['Float']['input'];
  project_cost_category: Scalars['String']['input'];
  requested_from: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateRequestItemDetailInput = {
  item: Scalars['String']['input'];
  item_type: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
};

export type CreateRequestItemInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  request_item_detail: Array<CreateRequestItemDetailInput>;
  requested_from: Scalars['String']['input'];
  requested_to: Scalars['String']['input'];
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type CreateRequestPoInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  purchase_order_detail: Array<CreatePoDetailInput>;
  requested_from: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateRequestPurchaseTransactionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  purchase_transaction_detail: Array<CreatePurchaseTransactionDetailInput>;
  supplier: Scalars['String']['input'];
  transaction_date: Scalars['DateTime']['input'];
  transaction_number: Scalars['String']['input'];
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

export type CreateToolInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  sku: Scalars['String']['input'];
  status: Scalars['String']['input'];
  warranty_expired_date?: InputMaybe<Scalars['DateTime']['input']>;
  warranty_number?: InputMaybe<Scalars['String']['input']>;
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
  project_leader?: InputMaybe<Scalars['String']['input']>;
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
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type FilterInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FinishingDetail = {
  __typename?: 'FinishingDetail';
  police_number?: Maybe<Scalars['String']['output']>;
  recipient_description?: Maybe<Scalars['String']['output']>;
  recipient_name?: Maybe<Scalars['String']['output']>;
  recipient_phone?: Maybe<Scalars['String']['output']>;
  sender_name?: Maybe<Scalars['String']['output']>;
  sender_phone?: Maybe<Scalars['String']['output']>;
  vehicle_detail?: Maybe<Scalars['String']['output']>;
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
  _id: Scalars['String']['output'];
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

export type MaterialDetailInput = {
  material: Scalars['String']['input'];
  price?: InputMaybe<Scalars['Float']['input']>;
  qty: Scalars['Float']['input'];
};

export type MaterialTransaction = {
  __typename?: 'MaterialTransaction';
  _id: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  in: Scalars['Float']['output'];
  material: Material;
  out: Scalars['Float']['output'];
  price: Scalars['Float']['output'];
  remain: Scalars['Float']['output'];
  transaction_category: TransactionCategory;
  transaction_code: Scalars['String']['output'];
  warehouse: Scalars['String']['output'];
};

export type Merk = {
  __typename?: 'Merk';
  _id: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addInventoryMaterial: Array<MaterialTransaction>;
  addInventoryTool: Scalars['Boolean']['output'];
  addNewDetailPT: PurchaseTransaction;
  addNewProjectEmployee: Array<Employee>;
  cancelItemRequest: RequestItemHeader;
  closingItemRequest: RequestItemHeader;
  createAttendance: AttendanceModule;
  createCategory: CategoryData;
  createEmployee: Employee;
  createEmployeeSkill: EmployeeSkill;
  createMaterial: Material;
  createMerk: Merk;
  createProject: Project;
  createPurchaseOrder: PurchaseOrder;
  createPurchaseTransaction: PurchaseTransaction;
  createRequestClosing: RequestProjectClosing;
  createRequestCost: RequestCost;
  createRequestItemTransaction: RequestItemHeader;
  createSku: Sku;
  createSupplier: Supplier;
  createUnitMeasure: UnitMeasure;
  createUser: User;
  createWarehouse: Warehouse;
  deleteAttendanceModule: AttendanceModule;
  deleteCategory: CategoryData;
  deleteEmployeeSkill: EmployeeSkill;
  deleteMerk: Merk;
  deleteUnitMeasure: UnitMeasure;
  deleteUserPassword: User;
  handleReceivedPODetail: PurchaseOrder;
  handleWaitingPO: PurchaseOrder;
  login: LoginResponse;
  processingItemRequest: RequestItemHeader;
  removeProjectEmployee: Employee;
  removePurchaseTransactionDetail: PurchaseTransaction;
  submitAttendanceModule: AttendanceModule;
  updateAttendanceModule: AttendanceModule;
  updateAvailableStatusItemRequest: RequestItemHeader;
  updateCategory: CategoryData;
  updateEmployee: Employee;
  updateEmployeeSkill: EmployeeSkill;
  updateMaterial: Material;
  updateMerk: Merk;
  updateProject: Project;
  updateProjectClosing: Project;
  updatePurchaseTransaction: PurchaseTransaction;
  updateRequestClosing: RequestProjectClosing;
  updateRequestCost: RequestCost;
  updateSku: Sku;
  updateSupplier: Supplier;
  updateTool: Tool;
  updateUnitMeasure: UnitMeasure;
  updateUser: User;
  updateUserPassword: User;
  updateWarehouse: Warehouse;
};


export type MutationAddInventoryMaterialArgs = {
  createMaterialTransactionInput: CreateMaterialTransactionInput;
};


export type MutationAddInventoryToolArgs = {
  addOnlyToolTransactionInput: AddOnlyToolTransactionInput;
};


export type MutationAddNewDetailPtArgs = {
  createPurchaseTransactionDetailInput: CreateNewPurchaseTransactionDetailInput;
  id: Scalars['String']['input'];
};


export type MutationAddNewProjectEmployeeArgs = {
  employees: Array<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationCancelItemRequestArgs = {
  id: Scalars['String']['input'];
};


export type MutationClosingItemRequestArgs = {
  createFinishingDetailInput: CreateFinishingDetailInput;
  id: Scalars['String']['input'];
};


export type MutationCreateAttendanceArgs = {
  createAttendanceInput: CreateAttendanceModuleInput;
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


export type MutationCreatePurchaseOrderArgs = {
  createPurchaseOrderInput: CreateRequestPoInput;
};


export type MutationCreatePurchaseTransactionArgs = {
  createPurchaseTransactionInput: CreateRequestPurchaseTransactionInput;
};


export type MutationCreateRequestClosingArgs = {
  createRequestClosingInput: CreateRequestClosingInput;
};


export type MutationCreateRequestCostArgs = {
  createRequestCostInput: CreateRequestCostInput;
};


export type MutationCreateRequestItemTransactionArgs = {
  createRequestItemInput: CreateRequestItemInput;
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


export type MutationDeleteAttendanceModuleArgs = {
  moduleId: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
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


export type MutationHandleReceivedPoDetailArgs = {
  id: Scalars['String']['input'];
  receiveItemInput: ReceiveItemInput;
};


export type MutationHandleWaitingPoArgs = {
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationProcessingItemRequestArgs = {
  createProcessingDetailInput: CreateProcessingDetailInput;
  id: Scalars['String']['input'];
};


export type MutationRemoveProjectEmployeeArgs = {
  description: Scalars['String']['input'];
  employee: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


export type MutationRemovePurchaseTransactionDetailArgs = {
  id: Scalars['String']['input'];
  id_detail: Scalars['String']['input'];
};


export type MutationSubmitAttendanceModuleArgs = {
  moduleId: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
};


export type MutationUpdateAttendanceModuleArgs = {
  moduleId: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
  updateAttendanceModuleInput: UpdateAttendanceModuleInput;
};


export type MutationUpdateAvailableStatusItemRequestArgs = {
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
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


export type MutationUpdateProjectClosingArgs = {
  id: Scalars['String']['input'];
  updateProjectClosingInput: UpdateProjectClosingInput;
};


export type MutationUpdatePurchaseTransactionArgs = {
  id: Scalars['String']['input'];
  updatePurchaseTransactionInput: UpdateRequestPurchaseTransactionInput;
};


export type MutationUpdateRequestClosingArgs = {
  id: Scalars['String']['input'];
  updateRequestStatusInput: UpdateRequestStatusInput;
};


export type MutationUpdateRequestCostArgs = {
  id: Scalars['String']['input'];
  updateRequestCostStatusInput: UpdateRequestCostStatusInput;
};


export type MutationUpdateSkuArgs = {
  id: Scalars['String']['input'];
  updateSkuInput: UpdateSkuInput;
};


export type MutationUpdateSupplierArgs = {
  id: Scalars['String']['input'];
  updateSupplierInput: UpdateSupplierInput;
};


export type MutationUpdateToolArgs = {
  id: Scalars['String']['input'];
  updateToolInput: UpdateToolInput;
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

export type ProcessingToolDetailInput = {
  sku: Scalars['String']['input'];
  tool: Array<Scalars['String']['input']>;
};

export type Project = {
  __typename?: 'Project';
  _id: Scalars['String']['output'];
  attendance: Array<AttendanceModule>;
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
  warehouse: Scalars['String']['output'];
  worker: Array<Employee>;
};

export type ProjectClosing = {
  __typename?: 'ProjectClosing';
  closed_by: Employee;
  document?: Maybe<Scalars['String']['output']>;
  material_used: Array<MaterialTransaction>;
  note?: Maybe<Scalars['String']['output']>;
  request_project_closing: RequestProjectClosing;
};

export type PurchaseOrder = {
  __typename?: 'PurchaseOrder';
  _id: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  purchase_order_detail: Array<PurchaseOrderDetail>;
  requested_by: Employee;
  requested_from: Warehouse;
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type PurchaseOrderDetail = {
  __typename?: 'PurchaseOrderDetail';
  _id: Scalars['String']['output'];
  completed_quantity: Scalars['Float']['output'];
  item: Scalars['String']['output'];
  item_type: Scalars['String']['output'];
  quantity: Scalars['Float']['output'];
  sub_detail: Array<PurchaseOrderSubDetail>;
};

export type PurchaseOrderSubDetail = {
  __typename?: 'PurchaseOrderSubDetail';
  purchase_transaction: Scalars['String']['output'];
  purchase_transaction_detail: Scalars['String']['output'];
  quantity: Scalars['Float']['output'];
};

export type PurchaseTransaction = {
  __typename?: 'PurchaseTransaction';
  _id: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  purchase_transaction_detail: Array<PurchaseTransactionDetail>;
  purchasing_staff: Employee;
  supplier: Supplier;
  total: Scalars['Float']['output'];
  transaction_date: Scalars['DateTime']['output'];
  transaction_number: Scalars['String']['output'];
};

export type PurchaseTransactionDetail = {
  __typename?: 'PurchaseTransactionDetail';
  _id: Scalars['String']['output'];
  item: Scalars['String']['output'];
  item_type: Scalars['String']['output'];
  original_item: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  purchase_order: PurchaseOrder;
  quantity: Scalars['Float']['output'];
  subtotal: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  findAllAttendanceModules: Array<AttendanceModule>;
  findAllProjects: Array<Project>;
  findAllRequestClosing: Array<RequestProjectClosing>;
  findAllRequestCosts: Array<RequestCost>;
  findAllRequestItemTransaction: Array<RequestItemHeader>;
  findOneAttendanceModule: AttendanceModule;
  findProjectById: Project;
  findYourApprovalItemTransaction: Array<RequestItemHeader>;
  findYourRequestItemTransaction: Array<RequestItemHeader>;
  getAllEmployees: Array<Employee>;
  getAllMaterialByIds: Array<Material>;
  getAllMaterials: Array<Material>;
  getAllMerks: Array<Merk>;
  getAllProjectEmployees: GetAllProjectEmployeeDto;
  getAllPurchaseOrders: Array<PurchaseOrder>;
  getAllPurchaseTransactions: Array<PurchaseTransaction>;
  getAllRole: Array<EmployeeRole>;
  getAllSkill: Array<EmployeeSkill>;
  getAllSkus: Array<Sku>;
  getAllSkusByIds: Array<Sku>;
  getAllSuppliers: Array<Supplier>;
  getAllTools: Array<Tool>;
  getAllUnitMeasures: Array<UnitMeasure>;
  getAllUsers: Array<User>;
  getAllWarehouses: Array<Warehouse>;
  getAllWarehousesByUser: Array<Warehouse>;
  getCategories: Array<CategoryData>;
  getEmployeeById: Employee;
  getHello: Scalars['String']['output'];
  getMaterialById: Material;
  getMerkById: Merk;
  getPurchaseOrderByID: PurchaseOrder;
  getPurchaseOrderByUser: Array<PurchaseOrder>;
  getPurchaseTransactionById: PurchaseTransaction;
  getPurchaseTransactionByUser: Array<PurchaseTransaction>;
  getRelatedPTfromPO: Array<PurchaseTransaction>;
  getSkuById: Sku;
  getSupplierById: Supplier;
  getToolById: Tool;
  getToolsByIds: Array<Tool>;
  getUnitMeasureById: UnitMeasure;
  getUserById: User;
  getWarehouseById: Warehouse;
  getWarehouseMaterials: Array<MaterialTransaction>;
  getWarehouseTools: Array<ToolTransaction>;
};


export type QueryFindAllAttendanceModulesArgs = {
  projectId: Scalars['String']['input'];
};


export type QueryFindAllRequestClosingArgs = {
  projectId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindOneAttendanceModuleArgs = {
  moduleId: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
};


export type QueryFindProjectByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetAllEmployeesArgs = {
  employeeFilter?: InputMaybe<EmployeeFilter>;
};


export type QueryGetAllMaterialByIdsArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type QueryGetAllMaterialsArgs = {
  filterInput?: InputMaybe<FilterInput>;
};


export type QueryGetAllProjectEmployeesArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetAllSkusArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetAllSkusByIdsArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type QueryGetAllToolsArgs = {
  sku?: InputMaybe<Scalars['String']['input']>;
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


export type QueryGetPurchaseOrderByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetPurchaseTransactionByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetRelatedPTfromPoArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetSkuByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetSupplierByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetToolByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetToolsByIdsArgs = {
  ids: Array<Scalars['String']['input']>;
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


export type QueryGetWarehouseMaterialsArgs = {
  warehouse_id: Scalars['String']['input'];
};


export type QueryGetWarehouseToolsArgs = {
  warehouse_id: Scalars['String']['input'];
};

export type ReceiveItemInput = {
  item_transaction: Scalars['String']['input'];
  item_transaction_detail: Scalars['String']['input'];
};

export type RequestCost = {
  __typename?: 'RequestCost';
  _id: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  handled_by?: Maybe<Employee>;
  handled_date?: Maybe<Scalars['DateTime']['output']>;
  price: Scalars['Float']['output'];
  project_cost_category: CategoryData;
  requested_at: Scalars['DateTime']['output'];
  requested_by: Employee;
  requested_from: Project;
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type RequestItemDetail = {
  __typename?: 'RequestItemDetail';
  _id: Scalars['String']['output'];
  item: Scalars['String']['output'];
  item_type: Scalars['String']['output'];
  price?: Maybe<Scalars['Float']['output']>;
  quantity: Scalars['Float']['output'];
  tool?: Maybe<Array<Tool>>;
};

export type RequestItemHeader = {
  __typename?: 'RequestItemHeader';
  _id: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  finishing_detail?: Maybe<FinishingDetail>;
  request_item_detail: Array<RequestItemDetail>;
  requested_at: Scalars['DateTime']['output'];
  requested_by: Employee;
  requested_from: Warehouse;
  requested_to: Warehouse;
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type RequestProjectClosing = {
  __typename?: 'RequestProjectClosing';
  _id: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  handled_by?: Maybe<Employee>;
  handled_date?: Maybe<Scalars['DateTime']['output']>;
  requested_at: Scalars['DateTime']['output'];
  requested_by: Employee;
  requested_from: Project;
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Sku = {
  __typename?: 'Sku';
  _id: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  item_category: CategoryData;
  merk: Merk;
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type Supplier = {
  __typename?: 'Supplier';
  _id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  person: Person;
  status: Scalars['String']['output'];
};

export type Tool = {
  __typename?: 'Tool';
  _id: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  sku: Sku;
  status: CategoryData;
  warranty_expired_date?: Maybe<Scalars['DateTime']['output']>;
  warranty_number?: Maybe<Scalars['String']['output']>;
};

export type ToolTransaction = {
  __typename?: 'ToolTransaction';
  _id: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  in: Scalars['Float']['output'];
  out: Scalars['Float']['output'];
  tool: Tool;
  transaction_category: TransactionCategory;
  transaction_code: Scalars['String']['output'];
  warehouse: Scalars['String']['output'];
};

export type TransactionCategory = {
  __typename?: 'TransactionCategory';
  _id: Scalars['ID']['output'];
  counter: Scalars['Float']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
};

export type UnitMeasure = {
  __typename?: 'UnitMeasure';
  _id: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type UpdateAttendanceDetailInput = {
  check_in?: InputMaybe<Scalars['Boolean']['input']>;
  check_out?: InputMaybe<Scalars['Boolean']['input']>;
  employee: Scalars['String']['input'];
};

export type UpdateAttendanceInput = {
  attendance_detail: Array<UpdateAttendanceDetailInput>;
  date: Scalars['DateTime']['input'];
};

export type UpdateAttendanceModuleInput = {
  attendance: Array<UpdateAttendanceInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  start_date: Scalars['DateTime']['input'];
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

export type UpdateProjectClosingInput = {
  material_left?: InputMaybe<Array<MaterialDetailInput>>;
  note?: InputMaybe<Scalars['String']['input']>;
  warehouse_to?: InputMaybe<Scalars['String']['input']>;
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

export type UpdateRequestCostStatusInput = {
  status: Scalars['String']['input'];
};

export type UpdateRequestPurchaseTransactionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  supplier?: InputMaybe<Scalars['String']['input']>;
  transaction_date?: InputMaybe<Scalars['DateTime']['input']>;
  transaction_number?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRequestStatusInput = {
  handled_warehouse: Scalars['String']['input'];
  status: Scalars['String']['input'];
};

export type UpdateSkuInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  item_category: Scalars['String']['input'];
  merk?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status: Scalars['String']['input'];
};

export type UpdateSupplierInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  company_name?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateToolInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  warranty_expired_date?: InputMaybe<Scalars['DateTime']['input']>;
  warranty_number?: InputMaybe<Scalars['String']['input']>;
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
  project_leader?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  tool_transaction: Array<ToolTransaction>;
  type: Scalars['String']['output'];
};
