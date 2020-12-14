import Config from 'src/config';
import loginEntity from '../entities/google-login';
import { RecovoHttpWithoutToken } from 'src/services/axios-instance';
import { saveAccessToken, saveRefreshToken, saveTenantName } from './auth';
import { LOGIN_WITH_GOOGLE, SUPER_ADMIN_LOGIN_WITH_GOOGLE } from 'src/constants/endpoints';

/**
 * Get and Set access token and refresh token.
 *
 * @param { Object } googleLoginResponse
 *
 */
export const googleLogin = async (googleLoginResponse: any) => {
  const { tokenId } = googleLoginResponse;
  return RecovoHttpWithoutToken.post(LOGIN_WITH_GOOGLE, { tokenId }).then((response) => {
    const responseData = response.data.data;
    const { accessToken, refreshToken, schema } = responseData;
    saveAccessToken(accessToken);
    saveRefreshToken(refreshToken);
    saveTenantName(schema);
    return responseData;
  });
};

export const getGoogleClientId = () => {
  return Config.googleOauthClientId || '';
};

export const superAdminGoogleLogin = async (googleLoginResponse: any) => {
  const { tokenId } = googleLoginResponse;
  const response = await RecovoHttpWithoutToken.post(SUPER_ADMIN_LOGIN_WITH_GOOGLE, { tokenId });

  return loginEntity.fromJson(response.data.data);
};
