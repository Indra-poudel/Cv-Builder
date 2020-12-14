import { formatDate } from 'src/utils/date';
import { USER_ROLE } from 'src/constants/users';
import { UsageReport, UsageReportResponseState } from './types';

export default function fromJson({
  firstName,
  lastName,
  email,
  isSupervisor,
  isAdmin,
  department,
  lastSearch,
  searches,
  contactExports,
  attachmentExports,
}: UsageReportResponseState): UsageReport {
  const fullName = [firstName, lastName].filter(Boolean).join(' ');
  const role = isAdmin ? USER_ROLE.ADMIN : isSupervisor ? USER_ROLE.SUPERVISOR : USER_ROLE.USER;
  const date = formatDate(lastSearch);

  return {
    email,
    role,
    name: fullName,
    lastSearch: date,
    searches: searches || '-',
    department: department || '-',
    contactExports: contactExports || '-',
    attachmentExports: attachmentExports || '-',
  };
}
