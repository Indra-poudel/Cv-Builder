import { format } from 'date-fns';

import { dateFormat } from 'src/constants/date';
import { convertToString } from 'src/utils/string';

export interface UserListResponse {
  id: number;
  clientDomainCount: number;
  organizationName: string;
  email: string;
  firstName: string;
  hasSignedUp: boolean;
  isActive: boolean;
  isSuppressed: boolean;
  isSystemUser: boolean;
  lastLoginDate: string;
  lastName: string;
  phoneNumbers: Array<string>;
  roles: Array<string>;
  supervisors: Array<object>;
}

/**
 * Convert JSON payload to object structure.
 *
 * @param {Object} userList
 * @property id
 * @property firstname
 * @property lastname
 * @property email
 * @property department
 * @property roles
 * @property isSuppressed
 * @property isActive
 * @property phoneNo
 * @property createdAt
 * @property invitedById
 * @property lastLoginDate
 * @property supervisors
 * @property clientDomains
 * @property clientDomainsCount
 * @property isInSuppressed
 *
 * @returns {Object}
 */
export function fromJson({
  id,
  firstName,
  lastName,
  email,
  department,
  phoneNumbers,
  isSuppressed,
  isActive,
  invitedById,
  lastLoginDate,
  createdAt,
  isAdmin,
  isSupervisor,
  organizationName,
  clientDomains,
  clientDomainCount,
  supervisors,
  hasSignedUp,
}: any = {}) {
  const encoded = {
    id,
    firstName,
    lastName,
    // NOTE: convertToString handles null and undefined values
    user: `${convertToString(firstName)} ${convertToString(lastName)}`,
    email,
    phoneNumbers,
    department,
    organization: organizationName,
    createdOn: createdAt,
    createdBy: invitedById,
    hasSignedUp,
    lastActive: hasSignedUp
      ? lastLoginDate
        ? format(new Date(lastLoginDate), dateFormat.MONTH_DAY_YEAR_TIME)
        : '-'
      : 'Not signed up',
    isSuppressed,
    supervisors: supervisors,
    isActive,
    role: isAdmin ? 'Admin' : isSupervisor ? 'Supervisor' : 'User',
    clientDomains,
    clientDomainCount: clientDomainCount || '-',
  };

  return {
    ...encoded,
  };
}

export default function formatUserList(userResponse: any) {
  const formattedResponse: any = userResponse.reduce((previousValue: any, userData: any) => {
    const data = fromJson(userData);
    return previousValue.concat(data);
  }, []);

  return formattedResponse;
}
