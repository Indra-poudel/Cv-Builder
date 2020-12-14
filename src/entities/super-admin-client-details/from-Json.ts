import { IClientDetail } from './types';
import { formatDate } from 'src/utils/date';
import { IClientDetailResponse } from './types';

export default function fromJson(response: IClientDetailResponse): IClientDetail {
  const addedOn = formatDate(response.createdAt);

  return {
    id: response.id ? response.id.toString() : '',
    firstName: response.organizationAdminFirstName,
    lastName: response.organizationAdminLastName,
    email: response.organizationAdminEmail,
    client: response.organizationName,
    addedOn,
    addedBy: response.addedBy,
    clientStatus: response.isActive ? 'active' : 'inactive',
    userCount: response.userCount ? response.userCount.toString() : '-', // TODO: userCount is N/A from backend
    supervisorCount: response.supervisorCount ? response.supervisorCount.toString() : '-', // TODO: supervisorCount is N/A from backend
  };
}
