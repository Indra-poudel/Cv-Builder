export interface IUserDetails {
  firstName: string;
  lastName: string;
  email: string;
  clientDomainCount?: number;
  clientDomains: Array<ClientDomainResponse>;
  createdBy: string;
  createdOn: string;
  department: string;
  departmentKey: string;
  id: string;
  hasSignedUp: boolean;
  isActive: boolean;
  isError: boolean;
  isSuppressed: boolean;
  lastLogin: string;
  organization: string;
  phoneNumbers: Array<string>;
  role: UserRoles;
  supervisors: Array<ExistingSupervisorResponse>;
}

export enum UserRoles {
  User = 'User',
  Supervisor = 'Supervisor',
}

export interface SupervisorResponse {
  id: string;
  email: string;
  fullName: string;
}

interface AddSupervisorResponseStatus {
  email: string;
  fullName: string;
  message: string;
  status: number;
}

export interface AddSupervisorResponse {
  success: Array<AddSupervisorResponseStatus>;
  failure: Array<AddSupervisorResponseStatus>;
  meta: {
    total: number;
    error: number;
    mapped: number;
  };
}

export interface ClientDomainResponse {
  id: number;
  domain: string;
  mappedDate: string;
}

export interface ExistingSupervisorResponse {
  fullName: string;
  email: string;
}
