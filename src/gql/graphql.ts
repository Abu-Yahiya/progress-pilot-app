/* eslint-disable */
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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type ActivityListQueryDto = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortType>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<CommonMatchInput>>;
  whereOperator?: InputMaybe<Where_Operator>;
};

export type ActivitySettings = {
  __typename?: 'ActivitySettings';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  ebadahTarget?: Maybe<EbadahTargetInput>;
  exerciseTarget?: Maybe<ExerciseTargetInput>;
  jikirAjkarTarget?: Maybe<JikirTargetInput>;
  orgUID: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type ActivitySettingsListQueryDto = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortType>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<CommonMatchInput>>;
  whereOperator?: InputMaybe<Where_Operator>;
};

export type ActivitySettingsPagination = {
  __typename?: 'ActivitySettingsPagination';
  meta?: Maybe<PaginationMeta>;
  nodes?: Maybe<Array<ActivitySettings>>;
};

export type ApiCommonActionOutput = {
  __typename?: 'ApiCommonActionOutput';
  data?: Maybe<Scalars['JSON']['output']>;
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type CommonMatchInput = {
  key: Scalars['String']['input'];
  operator: MatchOperator;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type CreateActivitySettingsDto = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  ebadahTarget?: InputMaybe<EbadahTargetInputDto>;
  exerciseTarget?: InputMaybe<ExerciseTargetInputDto>;
  jikirAjkarTarget?: InputMaybe<JikirTargetInputDto>;
  orgUID: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type CreateDailyActivityDto = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  ebadah?: InputMaybe<EbadahInputDto>;
  exercise?: InputMaybe<ExerciseInputDto>;
  it_task?: InputMaybe<Array<ItTaskInputDto>>;
  jikirAjkar?: InputMaybe<JikirInputDto>;
  orgUID: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOrganizationInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  address: Scalars['String']['input'];
  businessEmail: Scalars['String']['input'];
  businessPhone: Scalars['String']['input'];
  cover?: InputMaybe<ServerFileInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  employees?: InputMaybe<Array<Scalars['String']['input']>>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  metaSetupData?: InputMaybe<MetaSetupDataInput>;
  name: Scalars['String']['input'];
  orgUID?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  settings?: InputMaybe<OrganizationSettingsInput>;
  socialLinks?: InputMaybe<SocialLinksInput>;
  status?: InputMaybe<Organization_Status>;
  tagline?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateTaskManagementInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  client: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  deadLine: Scalars['DateTime']['input'];
  dueAmount: Scalars['Int']['input'];
  files?: InputMaybe<Array<ServerFileReferenceInput>>;
  paidBillAmount: Scalars['Int']['input'];
  paymentStatus?: Payment_Status;
  progressStatus?: InputMaybe<Task_Progress_Status>;
  taskCreatedBy: Scalars['String']['input'];
  taskDetails: TaskDetails;
  taskId: Scalars['String']['input'];
  totalBillAmount: Scalars['Int']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DailyActivity = {
  __typename?: 'DailyActivity';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  ebadah?: Maybe<EbadahInput>;
  exercise?: Maybe<ExerciseInput>;
  it_task?: Maybe<Array<ItTaskInput>>;
  jikirAjkar?: Maybe<JikirInput>;
  orgUID: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type DailyActivityPagination = {
  __typename?: 'DailyActivityPagination';
  meta?: Maybe<PaginationMeta>;
  nodes?: Maybe<Array<DailyActivity>>;
};

export type EbadahInput = {
  __typename?: 'EbadahInput';
  extraNamaj?: Maybe<Scalars['Float']['output']>;
  hadith?: Maybe<Scalars['Float']['output']>;
  ishraq?: Maybe<Scalars['Boolean']['output']>;
  kahf?: Maybe<Scalars['Boolean']['output']>;
  mulk?: Maybe<Scalars['Boolean']['output']>;
  namajWithJamath?: Maybe<Scalars['Float']['output']>;
  readingBook?: Maybe<TilwatTranslationInput>;
  tafsir?: Maybe<TilwatTranslationInput>;
  tahajjud?: Maybe<Scalars['Boolean']['output']>;
  tilwat?: Maybe<TilwatTranslationInput>;
  translation?: Maybe<TilwatTranslationInput>;
  waqiyah?: Maybe<Scalars['Boolean']['output']>;
};

export type EbadahInputDto = {
  extraNamaj?: InputMaybe<Scalars['Float']['input']>;
  hadith?: InputMaybe<Scalars['Float']['input']>;
  ishraq?: InputMaybe<Scalars['Boolean']['input']>;
  kahf?: InputMaybe<Scalars['Boolean']['input']>;
  mulk?: InputMaybe<Scalars['Boolean']['input']>;
  namajWithJamath?: InputMaybe<Scalars['Float']['input']>;
  readingBook?: InputMaybe<TilwatTranslationInputDto>;
  tafsir?: InputMaybe<TilwatTranslationInputDto>;
  tahajjud?: InputMaybe<Scalars['Boolean']['input']>;
  tilwat?: InputMaybe<TilwatTranslationInputDto>;
  translation?: InputMaybe<TilwatTranslationInputDto>;
  waqiyah?: InputMaybe<Scalars['Boolean']['input']>;
};

export type EbadahTargetInput = {
  __typename?: 'EbadahTargetInput';
  extraNamaj?: Maybe<Scalars['Float']['output']>;
  hadith?: Maybe<Scalars['Float']['output']>;
  ishraq?: Maybe<Scalars['Boolean']['output']>;
  kahf?: Maybe<Scalars['Boolean']['output']>;
  mulk?: Maybe<Scalars['Boolean']['output']>;
  namajWithJamath?: Maybe<Scalars['Float']['output']>;
  readingBook?: Maybe<TilwatTranslationTargetInput>;
  tafsir?: Maybe<TilwatTranslationTargetInput>;
  tahajjud?: Maybe<Scalars['Boolean']['output']>;
  tilwat?: Maybe<TilwatTranslationTargetInput>;
  translation?: Maybe<TilwatTranslationTargetInput>;
  waqiyah?: Maybe<Scalars['Boolean']['output']>;
};

export type EbadahTargetInputDto = {
  extraNamaj?: InputMaybe<Scalars['Float']['input']>;
  hadith?: InputMaybe<Scalars['Float']['input']>;
  ishraq?: InputMaybe<Scalars['Boolean']['input']>;
  kahf?: InputMaybe<Scalars['Boolean']['input']>;
  mulk?: InputMaybe<Scalars['Boolean']['input']>;
  namajWithJamath?: InputMaybe<Scalars['Float']['input']>;
  readingBook?: InputMaybe<TilwatTranslationTargetInputDto>;
  tafsir?: InputMaybe<TilwatTranslationTargetInputDto>;
  tahajjud?: InputMaybe<Scalars['Boolean']['input']>;
  tilwat?: InputMaybe<TilwatTranslationTargetInputDto>;
  translation?: InputMaybe<TilwatTranslationTargetInputDto>;
  waqiyah?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ExerciseInput = {
  __typename?: 'ExerciseInput';
  dumbbleCurl?: Maybe<Scalars['Float']['output']>;
  jumpingJack?: Maybe<Scalars['Float']['output']>;
  others?: Maybe<Scalars['String']['output']>;
  plank?: Maybe<Scalars['Float']['output']>;
  pushUp?: Maybe<Scalars['Float']['output']>;
  running?: Maybe<Scalars['Float']['output']>;
  seatUp?: Maybe<Scalars['Float']['output']>;
  squats?: Maybe<Scalars['Float']['output']>;
};

export type ExerciseInputDto = {
  dumbbleCurl?: InputMaybe<Scalars['Float']['input']>;
  jumpingJack?: InputMaybe<Scalars['Float']['input']>;
  others?: InputMaybe<Scalars['String']['input']>;
  plank?: InputMaybe<Scalars['Float']['input']>;
  pushUp?: InputMaybe<Scalars['Float']['input']>;
  running?: InputMaybe<Scalars['Float']['input']>;
  seatUp?: InputMaybe<Scalars['Float']['input']>;
  squats?: InputMaybe<Scalars['Float']['input']>;
};

export type ExerciseTargetInput = {
  __typename?: 'ExerciseTargetInput';
  dumbbleCurl?: Maybe<Scalars['Float']['output']>;
  jumpingJack?: Maybe<Scalars['Float']['output']>;
  plank?: Maybe<Scalars['Float']['output']>;
  pushUp?: Maybe<Scalars['Float']['output']>;
  running?: Maybe<Scalars['Float']['output']>;
  seatUp?: Maybe<Scalars['Float']['output']>;
  squats?: Maybe<Scalars['Float']['output']>;
};

export type ExerciseTargetInputDto = {
  dumbbleCurl?: InputMaybe<Scalars['Float']['input']>;
  jumpingJack?: InputMaybe<Scalars['Float']['input']>;
  plank?: InputMaybe<Scalars['Float']['input']>;
  pushUp?: InputMaybe<Scalars['Float']['input']>;
  running?: InputMaybe<Scalars['Float']['input']>;
  seatUp?: InputMaybe<Scalars['Float']['input']>;
  squats?: InputMaybe<Scalars['Float']['input']>;
};

export type ItTaskInput = {
  __typename?: 'ITTaskInput';
  description?: Maybe<Scalars['String']['output']>;
  progressScore?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Task_Status>;
  title: Scalars['String']['output'];
};

export type ItTaskInputDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  progressScore?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<Task_Status>;
  title: Scalars['String']['input'];
};

export type InviteMemberToOrganizationInput = {
  email: Scalars['String']['input'];
  orgId: Scalars['String']['input'];
};

export type JikirInput = {
  __typename?: 'JikirInput';
  doaTawhid?: Maybe<Scalars['Float']['output']>;
  durud?: Maybe<Scalars['Float']['output']>;
  durudYunus?: Maybe<Scalars['Float']['output']>;
  istigfar?: Maybe<Scalars['Float']['output']>;
};

export type JikirInputDto = {
  doaTawhid?: InputMaybe<Scalars['Float']['input']>;
  durud?: InputMaybe<Scalars['Float']['input']>;
  durudYunus?: InputMaybe<Scalars['Float']['input']>;
  istigfar?: InputMaybe<Scalars['Float']['input']>;
};

export type JikirTargetInput = {
  __typename?: 'JikirTargetInput';
  doaTawhid?: Maybe<Scalars['Float']['output']>;
  durud?: Maybe<Scalars['Float']['output']>;
  durudYunus?: Maybe<Scalars['Float']['output']>;
  istigfar?: Maybe<Scalars['Float']['output']>;
};

export type JikirTargetInputDto = {
  doaTawhid?: InputMaybe<Scalars['Float']['input']>;
  durud?: InputMaybe<Scalars['Float']['input']>;
  durudYunus?: InputMaybe<Scalars['Float']['input']>;
  istigfar?: InputMaybe<Scalars['Float']['input']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MagicLinkAuthenticationInput = {
  email: Scalars['String']['input'];
};

export enum MatchOperator {
  Contains = 'contains',
  Eq = 'eq',
  Exists = 'exists',
  Gt = 'gt',
  Gte = 'gte',
  In = 'in',
  Lt = 'lt',
  Lte = 'lte',
  Ne = 'ne',
  Nin = 'nin'
}

export type MetaSetupDataInput = {
  pixelId?: InputMaybe<Scalars['String']['input']>;
};

export type MetaSetupDataSchema = {
  __typename?: 'MetaSetupDataSchema';
  pixelId?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createActivity: DailyActivity;
  createActivitySettings: ActivitySettings;
  createOrganization: Organization;
  createTask: TaskManagement;
  disableOrganization: Scalars['Boolean']['output'];
  generateApiKey: Scalars['Boolean']['output'];
  generateApiToken: Scalars['Boolean']['output'];
  login: ApiCommonActionOutput;
  registration: ApiCommonActionOutput;
  removeActivity: DailyActivity;
  removeActivitySetting: ActivitySettings;
  removeTask?: Maybe<Scalars['Boolean']['output']>;
  removeUser?: Maybe<Scalars['Boolean']['output']>;
  sendInviteToMember: ApiCommonActionOutput;
  sendMagicLink: ApiCommonActionOutput;
  updateActivity: Scalars['Boolean']['output'];
  updateActivitySetting: Scalars['Boolean']['output'];
  updateOrganization: Organization;
  updateTask: Scalars['Boolean']['output'];
  updateUser: User;
  verifyMemberInvitation: ApiCommonActionOutput;
};


export type MutationCreateActivityArgs = {
  payload: CreateDailyActivityDto;
};


export type MutationCreateActivitySettingsArgs = {
  payload: CreateActivitySettingsDto;
};


export type MutationCreateOrganizationArgs = {
  payload: CreateOrganizationInput;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskManagementInput;
};


export type MutationDisableOrganizationArgs = {
  _id: Scalars['String']['input'];
  orgUID: Scalars['String']['input'];
};


export type MutationGenerateApiKeyArgs = {
  _id: Scalars['String']['input'];
  orgUID: Scalars['String']['input'];
};


export type MutationGenerateApiTokenArgs = {
  _id: Scalars['String']['input'];
  orgUID: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  payload: LoginInput;
};


export type MutationRegistrationArgs = {
  input: RegistrationUserInput;
};


export type MutationRemoveActivityArgs = {
  _id: Scalars['String']['input'];
};


export type MutationRemoveActivitySettingArgs = {
  _id: Scalars['String']['input'];
};


export type MutationRemoveTaskArgs = {
  input: CommonMatchInput;
};


export type MutationRemoveUserArgs = {
  input: CommonMatchInput;
};


export type MutationSendInviteToMemberArgs = {
  payload: InviteMemberToOrganizationInput;
};


export type MutationSendMagicLinkArgs = {
  payload: MagicLinkAuthenticationInput;
};


export type MutationUpdateActivityArgs = {
  orgUID: Scalars['String']['input'];
  payload: UpdateDailyActivityInputDto;
  userId: Scalars['String']['input'];
};


export type MutationUpdateActivitySettingArgs = {
  orgUID: Scalars['String']['input'];
  payload: UpdateActivitySettingsInputDto;
  userId: Scalars['String']['input'];
};


export type MutationUpdateOrganizationArgs = {
  orgUID: Scalars['String']['input'];
  updatePayload: UpdateOrganizationInput;
};


export type MutationUpdateTaskArgs = {
  input: UpdateTaskManagementInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationVerifyMemberInvitationArgs = {
  payload: VerifyInviteMemberToOrganizationInput;
};

export type Organization = {
  __typename?: 'Organization';
  Logo?: Maybe<ServerFileEntity>;
  _id?: Maybe<Scalars['ID']['output']>;
  address: Scalars['String']['output'];
  businessEmail: Scalars['String']['output'];
  businessPhone: Scalars['String']['output'];
  cover?: Maybe<ServerFileEntity>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  isVerified?: Maybe<Scalars['Boolean']['output']>;
  metaSetupData?: Maybe<MetaSetupDataSchema>;
  name: Scalars['String']['output'];
  orgUID?: Maybe<Scalars['String']['output']>;
  settings?: Maybe<OrganizationSettingsSchema>;
  socialLinks?: Maybe<SocialLinksSchema>;
  status?: Maybe<Organization_Status>;
  tagline?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type OrganizationListQueryInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortType>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<CommonMatchInput>>;
  whereOperator?: InputMaybe<Where_Operator>;
};

export type OrganizationSettingsInput = {
  apiKey?: InputMaybe<Scalars['String']['input']>;
  apiToken?: InputMaybe<Scalars['String']['input']>;
};

export type OrganizationSettingsSchema = {
  __typename?: 'OrganizationSettingsSchema';
  apiKey?: Maybe<Scalars['String']['output']>;
  apiToken?: Maybe<Scalars['String']['output']>;
};

export type OrganizationWithPagination = {
  __typename?: 'OrganizationWithPagination';
  meta?: Maybe<PaginationMeta>;
  nodes?: Maybe<Array<Organization>>;
};

export enum Organization_Status {
  Active = 'Active',
  Disable = 'Disable',
  InActive = 'InActive',
  Pending = 'Pending'
}

export type PaginationMeta = {
  __typename?: 'PaginationMeta';
  currentPage: Scalars['Float']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  totalCount: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

export enum Payment_Status {
  Cancelled = 'CANCELLED',
  Due = 'DUE',
  Paid = 'PAID',
  PartiallyPaid = 'PARTIALLY_PAID',
  Refunded = 'REFUNDED'
}

export type Query = {
  __typename?: 'Query';
  activitiesByOrgAndUser: DailyActivityPagination;
  activityByOrgAndUser: DailyActivity;
  allActivitySettings: ActivitySettingsPagination;
  myActivitySetting: ActivitySettings;
  myOrganizations: OrganizationWithPagination;
  organization: Organization;
  organizationByUID: Organization;
  organizations: OrganizationWithPagination;
  task: TaskManagement;
  taskList: TaskManagementPagination;
  user: User;
  users: UserPagination;
};


export type QueryActivitiesByOrgAndUserArgs = {
  input?: InputMaybe<ActivityListQueryDto>;
  orgUID: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type QueryActivityByOrgAndUserArgs = {
  _id: Scalars['String']['input'];
  orgUID: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type QueryAllActivitySettingsArgs = {
  input?: InputMaybe<ActivitySettingsListQueryDto>;
  orgUID: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type QueryMyActivitySettingArgs = {
  orgUID: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type QueryMyOrganizationsArgs = {
  _id: Scalars['String']['input'];
  input?: InputMaybe<OrganizationListQueryInput>;
};


export type QueryOrganizationArgs = {
  _id: Scalars['String']['input'];
};


export type QueryOrganizationByUidArgs = {
  orgUID: Scalars['String']['input'];
};


export type QueryOrganizationsArgs = {
  input?: InputMaybe<OrganizationListQueryInput>;
};


export type QueryTaskArgs = {
  input: CommonMatchInput;
};


export type QueryTaskListArgs = {
  input?: InputMaybe<TaskListQueryDto>;
};


export type QueryUserArgs = {
  input: CommonMatchInput;
};


export type QueryUsersArgs = {
  input?: InputMaybe<UserListQueryDto>;
};

export type RegistrationUserInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  /** User avatar */
  avatar?: InputMaybe<Scalars['String']['input']>;
  /** User email */
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  /** User role */
  role?: InputMaybe<User_Role>;
};

export type ServerFileEntity = {
  __typename?: 'ServerFileEntity';
  bucket?: Maybe<Scalars['String']['output']>;
  externalUrl?: Maybe<Scalars['String']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
};

export type ServerFileInput = {
  bucket?: InputMaybe<Scalars['String']['input']>;
  externalUrl?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
};

export type ServerFileReference = {
  __typename?: 'ServerFileReference';
  fileUrl: Scalars['String']['output'];
};

export type ServerFileReferenceInput = {
  fileUrl: Scalars['String']['input'];
};

export type SocialLinksInput = {
  daraz?: InputMaybe<Scalars['String']['input']>;
  facebook?: InputMaybe<Scalars['String']['input']>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  x?: InputMaybe<Scalars['String']['input']>;
  youtube?: InputMaybe<Scalars['String']['input']>;
};

export type SocialLinksSchema = {
  __typename?: 'SocialLinksSchema';
  daraz?: Maybe<Scalars['String']['output']>;
  facebook?: Maybe<Scalars['String']['output']>;
  instagram?: Maybe<Scalars['String']['output']>;
  x?: Maybe<Scalars['String']['output']>;
  youtube?: Maybe<Scalars['String']['output']>;
};

export enum SortType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type TaskDetails = {
  issuesDescription?: InputMaybe<Scalars['String']['input']>;
  taskAssignTo: Scalars['String']['input'];
  taskDescription?: InputMaybe<Scalars['String']['input']>;
  taskName: Scalars['String']['input'];
};

export type TaskListQueryDto = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortType>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<CommonMatchInput>>;
  whereOperator?: InputMaybe<Where_Operator>;
};

export type TaskManagement = {
  __typename?: 'TaskManagement';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deadLine: Scalars['DateTime']['output'];
  dueAmount: Scalars['Int']['output'];
  files?: Maybe<Array<ServerFileReference>>;
  paidBillAmount: Scalars['Int']['output'];
  paymentStatus: Payment_Status;
  progressStatus?: Maybe<Task_Progress_Status>;
  taskCreatedBy: User;
  taskDetails: TaskManagement_TaskDetails;
  taskId: Scalars['String']['output'];
  totalBillAmount: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TaskManagementPagination = {
  __typename?: 'TaskManagementPagination';
  meta?: Maybe<PaginationMeta>;
  nodes?: Maybe<Array<TaskManagement>>;
};

export type TaskManagement_TaskDetails = {
  __typename?: 'TaskManagement_TaskDetails';
  issuesDescription?: Maybe<Scalars['String']['output']>;
  taskDescription?: Maybe<Scalars['String']['output']>;
  taskName: Scalars['String']['output'];
};

export enum Task_Progress_Status {
  Archived = 'ARCHIVED',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING',
  Revision = 'REVISION',
  WorkDone = 'WORK_DONE'
}

export enum Task_Status {
  Cancelled = 'Cancelled',
  Completed = 'Completed',
  InProgress = 'InProgress',
  Pending = 'Pending'
}

export type TilwatTranslationInput = {
  __typename?: 'TilwatTranslationInput';
  count?: Maybe<Scalars['Float']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type TilwatTranslationInputDto = {
  count?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type TilwatTranslationTargetInput = {
  __typename?: 'TilwatTranslationTargetInput';
  count?: Maybe<Scalars['Float']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type TilwatTranslationTargetInputDto = {
  count?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export enum User_Role {
  Admin = 'ADMIN',
  Learner = 'LEARNER'
}

export type UpdateActivitySettingsInputDto = {
  _id: Scalars['ID']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  ebadahTarget?: InputMaybe<EbadahTargetInputDto>;
  exerciseTarget?: InputMaybe<ExerciseTargetInputDto>;
  jikirAjkarTarget?: InputMaybe<JikirTargetInputDto>;
  orgUID?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDailyActivityInputDto = {
  _id: Scalars['ID']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  ebadah?: InputMaybe<EbadahInputDto>;
  exercise?: InputMaybe<ExerciseInputDto>;
  it_task?: InputMaybe<Array<ItTaskInputDto>>;
  jikirAjkar?: InputMaybe<JikirInputDto>;
  orgUID?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOrganizationInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  businessEmail?: InputMaybe<Scalars['String']['input']>;
  businessPhone?: InputMaybe<Scalars['String']['input']>;
  cover?: InputMaybe<ServerFileInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  employees?: InputMaybe<Array<Scalars['String']['input']>>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  metaSetupData?: InputMaybe<MetaSetupDataInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  orgUID?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  settings?: InputMaybe<OrganizationSettingsInput>;
  socialLinks?: InputMaybe<SocialLinksInput>;
  status?: InputMaybe<Organization_Status>;
  tagline?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateTaskManagementInput = {
  _id: Scalars['String']['input'];
  client?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  deadLine?: InputMaybe<Scalars['DateTime']['input']>;
  dueAmount?: InputMaybe<Scalars['Int']['input']>;
  files?: InputMaybe<Array<ServerFileReferenceInput>>;
  paidBillAmount?: InputMaybe<Scalars['Int']['input']>;
  paymentStatus?: InputMaybe<Payment_Status>;
  progressStatus?: InputMaybe<Task_Progress_Status>;
  taskCreatedBy?: InputMaybe<Scalars['String']['input']>;
  taskDetails?: InputMaybe<TaskDetails>;
  taskId?: InputMaybe<Scalars['String']['input']>;
  totalBillAmount?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateUserInput = {
  _id?: InputMaybe<Scalars['String']['input']>;
  /** User avatar */
  avatar?: InputMaybe<Scalars['String']['input']>;
  /** User email */
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  /** User role */
  role?: InputMaybe<User_Role>;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  role: User_Role;
};

export type UserListQueryDto = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortType>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<CommonMatchInput>>;
  whereOperator?: InputMaybe<Where_Operator>;
};

export type UserPagination = {
  __typename?: 'UserPagination';
  meta?: Maybe<PaginationMeta>;
  nodes?: Maybe<Array<User>>;
};

export type VerifyInviteMemberToOrganizationInput = {
  token: Scalars['String']['input'];
};

export enum Where_Operator {
  And = 'and',
  Or = 'or'
}
