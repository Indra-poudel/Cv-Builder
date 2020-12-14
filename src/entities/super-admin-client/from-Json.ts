import { SuperAdminClient, SuperAdminClientResponseState } from './types';

export default function fromJson({
  id,
  slug,
  organizationName,
  organizationAdminFirstName,
  organizationAdminLastName,
  organizationAdminEmail,
  isActive,
  isDeleted,
  isSchemaCreated,
  activeUser,
  totalProviderUsers,
  addby,
  userCount,
  supervisorCount,
}: SuperAdminClientResponseState): SuperAdminClient {
  const fullName = [organizationAdminFirstName, organizationAdminLastName].filter(Boolean).join(' ');

  return {
    id: id.toString(),
    client: organizationName,
    clientAdmin: fullName,
    firstName: organizationAdminFirstName,
    lastName: organizationAdminLastName,
    clientEmail: organizationAdminEmail,
    users: userCount ? userCount.toString() : '-',
    supervisors: supervisorCount ? supervisorCount.toString() : '-',
    status: isActive ? 'Active' : 'Inactive',
    activeUsers: activeUser ? activeUser.toString() : '-',
    providerUsers: totalProviderUsers ? totalProviderUsers.toString() : '-',
  };
}
