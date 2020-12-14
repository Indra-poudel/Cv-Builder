export interface UsageReportResponseState {
  firstName: string;
  lastName: string;
  email: string;
  isSupervisor: boolean;
  isAdmin: boolean;
  department: string;
  lastSearch: string;
  searches: string;
  contactExports: string;
  attachmentExports: string;
}

export interface UsageReport {
  email: string;
  role: string;
  name: string;
  lastSearch: string;
  searches: string;
  department: string;
  contactExports: string;
  attachmentExports: string;
}

export interface UsageReportList {
  hasNextPage: boolean;
  pageNumber: number;
  pageSize: number;
  data: Array<UsageReport>;
}

export interface UsageReportPayload {
  pageNumber: number;
  pageSize: number;
  startDate: string;
  endDate: string;
  sortField: string;
  sortDirection: string;
}
