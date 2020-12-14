import { RecovoHttpWithoutToken } from './axios-instance';
import { httpConstants } from '../constants/http-constants';
import { EMAIL_VERIFICATION } from 'src/constants/endpoints';

export const userEmailVerification = async (tokenId: string, schemaName: string) => {
  const header = {
    headers: {
      [httpConstants.invitationHeader]: tokenId,
    },
  };

  const URL = `tenant/${schemaName}/${EMAIL_VERIFICATION}`;

  const response = await RecovoHttpWithoutToken.post(URL, null, header);
  return response;
};
