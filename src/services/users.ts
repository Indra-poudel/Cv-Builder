import userEntity from '../entities/users';
import queryParams from 'src/utils/query-param';
import queryParamUtils from 'src/utils/query-param';
import * as downloadFileService from './download-files';
import { RecovoHttp } from 'src/services/axios-instance';
import { EXTENSION_TYPES } from 'src/constants/constants';
import {
  GET_USERS_SUGGESTIONS,
  USERS,
  VALIDATE_USER,
  DOWNLOAD_USER_LIST,
  DOWNLOAD_USER_CLIENT_DOMAIN_LIST,
} from 'src/constants/endpoints';

export const fetchUsersList = async (params: any) => {
  const url = `${USERS}${queryParams.stringfy(params)}`;
  const response = await RecovoHttp.get(url);

  return userEntity.formatUserList(response.data.data);
};

export const fetchUserSuggestions = async (searchKey: string, maxResults: number = 20) => {
  const url = `${GET_USERS_SUGGESTIONS}${queryParamUtils.stringfy({ search: searchKey, max: maxResults })}`;
  const response = await RecovoHttp.get(url);

  return response?.data?.data;
};

export const validateUsers = async (reqBody: any) => {
  const url = VALIDATE_USER;
  const response = await RecovoHttp.post(url, reqBody);

  return response?.data?.data;
};

export const postUsersManually = async (reqBody: any) => {
  const response = await RecovoHttp.post(USERS, { ...reqBody });
  return response;
};

export const downloadUserList = async () => {
  const downloadFileParams = {
    URL: DOWNLOAD_USER_LIST,
    fileName: 'user_list',
    fileExtension: EXTENSION_TYPES.CSV,
  };

  downloadFileService.downloadFile(downloadFileParams);
};

export const downloadUserClientDomainList = async () => {
  const downloadFileParams = {
    URL: DOWNLOAD_USER_CLIENT_DOMAIN_LIST,
    fileName: 'user_client_domain_list',
    fileExtension: EXTENSION_TYPES.CSV,
  };

  downloadFileService.downloadFile(downloadFileParams);
};
