export interface IClientDetailResponse {
  addedBy: string;
  createdAt: string;
  id: number;
  isActive: boolean;
  isDeleted: boolean;
  isSchemaCreated: boolean;
  organizationAdminEmail: string;
  organizationAdminFirstName: string;
  organizationAdminLastName: string;
  organizationName: string;
  slug: string;
  supervisorCount: number;
  updatedAt: string;
  userCount: number;
}

export interface IClientDetail {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  client: string;
  addedOn: string;
  addedBy: string;
  clientStatus: string;
  supervisorCount: string;
  userCount: string;
}

export interface IClientUpdate {
  organizationName?: string;
  organizationAdminFirstName?: string;
  organizationAdminLastName?: string;
  organizationAdminEmail: string;
  isActive?: boolean;
}
