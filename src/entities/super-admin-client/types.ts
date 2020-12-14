export interface SuperAdminClientResponseState {
  id: number;
  slug: string;
  organizationName: string;
  organizationAdminFirstName: string;
  organizationAdminLastName: string;
  organizationAdminEmail: string;
  isActive: boolean;
  isDeleted: boolean;
  isSchemaCreated: boolean;
  addby: string;
  userCount: number;
  supervisorCount: number;
  activeUser: number;
  totalProviderUsers: number;
}

export interface SuperAdminClient {
  id: string;
  client: string;
  clientAdmin: string;
  firstName: string;
  lastName: string;
  clientEmail: string;
  users: string;
  supervisors: string;
  status: string;
  activeUsers: string;
  providerUsers: string;
}

export interface SuperAdminClientList {
  hasNextPage: boolean;
  pageNumber: number;
  pageSize: number;
  data: Array<SuperAdminClient>;
}
