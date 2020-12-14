import { getAccessToken } from './auth';
import { getRole } from 'src/utils/role';
import { USER_ROLE } from 'src/constants/users';

/**
 * validation of access Token
 *
 */
export const isAccessTokenAndRoleValid = () => {
  const accessToken = getAccessToken();
  const role = getRole();
  const isValidRole = role ? Object.values(USER_ROLE).includes(role) : false;
  return !!(accessToken && isValidRole);
};
