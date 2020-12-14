import jwt_decode from 'jwt-decode';

import { USER_ROLE } from 'src/constants/users';
import { getAccessToken } from 'src/services/auth';

export const getRole = (): string => {
  let token: string | null = getAccessToken();

  try {
    let user: any = token && jwt_decode(token);
    return user?.data?.role || USER_ROLE.USER;
  } catch (err) {
    return USER_ROLE.USER;
  }
};
