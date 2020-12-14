import { format } from 'date-fns';

import { dateFormat } from 'src/constants/date';

/**
 * Convert JSON payload to object structure.
 *
 * @param {Object} userDetail
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
 * @property lastLogin
 * @property supervisors
 * @property clientDomains
 * @property clientDomainsCount
 * @property isInSuppressed
 *
 * @returns {Object}
 */
export default function fromJson({
  id,
  firstName,
  lastName,
  email,
  departmentKey,
  department,
  phoneNumbers,
  hasSignedUp,
  isSuppressed,
  isActive,
  createdby,
  lastLoginDate,
  createdAt,
  isAdmin,
  isSupervisor,
  organizationName,
  clientDomains,
  clientDomainCount,
  supervisors,
}: any = {}) {
  const encoded = {
    id,
    firstName,
    lastName,
    email,
    phoneNumbers,
    departmentKey,
    department,
    organization: organizationName,
    createdOn: createdAt,
    createdBy: createdby.trim(),
    lastLogin: hasSignedUp
      ? lastLoginDate
        ? format(new Date(lastLoginDate), dateFormat.MONTH_DAY_YEAR_TIME)
        : '-'
      : 'Not signed up',
    isSuppressed,
    supervisors:
      (supervisors &&
        supervisors.map((val: { fullName: string; email: string }) => {
          return { fullName: val.fullName, email: val.email };
        })) ||
      [],
    hasSignedUp,
    isActive,
    role: isAdmin ? 'Admin' : isSupervisor ? 'Supervisor' : 'User',
    clientDomains: !!clientDomains ? clientDomains : [],
    clientDomainCount,
  };

  return {
    ...encoded,
  };
}
