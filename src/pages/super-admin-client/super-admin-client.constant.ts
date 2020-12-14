export const superAdminClientKey = {
  slug: 'slug',
  users: 'users',
  client: 'client',
  status: 'status',
  clientAdmin: 'clientAdmin',
  clientEmail: 'clientEmail',
  supervisors: 'supervisors',
  activeUsers: 'activeUsers',
  providerUsers: 'providerUsers',
};

export const sortFieldKey: { [key: string]: string } = {
  users: 'user_count',
  status: 'is_active',
  client: 'organization_name',
  supervisors: 'supervisor_count',
  clientEmail: 'organization_admin_email',
  clientAdmin: 'organization_admin_first_name',
  activeUsers: 'active_user',
  providerUsers: 'total_provider_users',
};

export const PAGE_SIZE = 10;
export const PAGE_NUMBER = 1;

export const DEFAULT_SORT_FIELD = 'organization_name';
