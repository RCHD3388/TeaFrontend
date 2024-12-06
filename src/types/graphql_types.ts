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
  attendance_detail?: Maybe<Array<AttendanceDetail>>;
  created_by: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
};

export type AttendanceDetail = {
  __typename?: 'AttendanceDetail';
  check_in: Scalars['Boolean']['output'];
  check_out: Scalars['Boolean']['output'];
  employee: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
};

export type CreateAttendanceDetailDto = {
  check_in: Scalars['Boolean']['input'];
  check_out: Scalars['Boolean']['input'];
  employee: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
};

export type CreateAttendanceDto = {
  created_by?: InputMaybe<Scalars['String']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
};

export type CreateEmployeeInput = {
  hire_date: Scalars['DateTime']['input'];
  person: CreatePersonInput;
  role: RoleInput;
  salary: Scalars['Float']['input'];
  skill?: InputMaybe<Array<SkillInput>>;
  status: Scalars['String']['input'];
};

export type CreatePersonInput = {
  address: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
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

export type Employee = {
  __typename?: 'Employee';
  hire_date: Scalars['DateTime']['output'];
  person: Person;
  role: EmployeeRole;
  salary: Scalars['Float']['output'];
  skill: Array<EmployeeSkill>;
  status: Scalars['String']['output'];
};

export type EmployeeRole = {
  __typename?: 'EmployeeRole';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type EmployeeSkill = {
  __typename?: 'EmployeeSkill';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAttendance: Attendance;
  createAttendanceDetail: AttendanceDetail;
  createEmployee: Employee;
  createProject: Project;
  deleteAttendance: Scalars['Boolean']['output'];
  deleteAttendanceDetail: Scalars['Boolean']['output'];
  deleteEmployee: Scalars['Boolean']['output'];
  deleteProject: Scalars['Boolean']['output'];
  updateAttendance: Attendance;
  updateAttendanceDetail: AttendanceDetail;
  updateProject: Project;
};


export type MutationCreateAttendanceArgs = {
  createAttendanceInput: CreateAttendanceDto;
};


export type MutationCreateAttendanceDetailArgs = {
  attendanceId: Scalars['String']['input'];
  createAttendanceDetailInput: CreateAttendanceDetailDto;
};


export type MutationCreateEmployeeArgs = {
  data: CreateEmployeeInput;
};


export type MutationCreateProjectArgs = {
  data: CreateProjectInput;
};


export type MutationDeleteAttendanceArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteAttendanceDetailArgs = {
  attendanceDetailId: Scalars['String']['input'];
  attendanceId: Scalars['String']['input'];
};


export type MutationDeleteEmployeeArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateAttendanceArgs = {
  id: Scalars['String']['input'];
  updateAttendanceInput: CreateAttendanceDto;
};


export type MutationUpdateAttendanceDetailArgs = {
  attendanceDetailId: Scalars['String']['input'];
  updateAttendanceDetailInput: CreateAttendanceDetailDto;
};


export type MutationUpdateProjectArgs = {
  data: UpdateProjectInput;
  id: Scalars['String']['input'];
};

export type Person = {
  __typename?: 'Person';
  address: Scalars['String']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone_number: Scalars['String']['output'];
};

export type Project = {
  __typename?: 'Project';
  _id: Scalars['ID']['output'];
  attendance?: Maybe<Array<Scalars['String']['output']>>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  finished_at?: Maybe<Scalars['DateTime']['output']>;
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  priority: Scalars['String']['output'];
  status: Scalars['String']['output'];
  target_date?: Maybe<Scalars['DateTime']['output']>;
};

export type Query = {
  __typename?: 'Query';
  employee: Employee;
  employees: Array<Employee>;
  findAllAttendance: Array<Attendance>;
  findAttendanceById: Attendance;
  findAttendanceDetails: Array<AttendanceDetail>;
  getHello: Scalars['String']['output'];
  project: Project;
  projects: Array<Project>;
};


export type QueryEmployeeArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindAttendanceByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindAttendanceDetailsArgs = {
  attendanceId: Scalars['String']['input'];
};


export type QueryProjectArgs = {
  id: Scalars['String']['input'];
};

export type RoleInput = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type SkillInput = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
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
