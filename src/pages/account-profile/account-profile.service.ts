import * as endpoints from 'src/constants/endpoints';
import userDetails from '../../entities/user-details';
import { RecovoHttp } from 'src/services/axios-instance';

/**
 * @returns Data of currently logged in user.
 */
export const fetchUserProfile = async () => {
  const URL = endpoints.GET_USER_PROFILE;
  const response = await RecovoHttp.get(URL);
  const data = userDetails.fromJson(response.data.data);

  return data;
};
