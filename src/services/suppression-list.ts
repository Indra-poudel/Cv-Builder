import { interpolate } from 'src/utils/string';
import queryParamUtils from 'src/utils/query-param';
import * as endpoints from 'src/constants/endpoints';
import { RecovoHttp } from 'src/services/axios-instance';

export interface FetchSuppressionListState {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
}

export const addSuppressionListManually = async (emailArr: Array<string>) => {
  const requestBody = {
    emails: emailArr,
  };
  const response = await RecovoHttp.post(endpoints.ADD_SUPPRESSION_LIST_USERS, requestBody);
  return response;
};

export const fetchSuppressionSuggestions = async (searchKey: string, maxResults: number = 20) => {
  const url = `${endpoints.GET_SUPPRESSION_LIST_SUGGESTION}${queryParamUtils.stringfy({
    search: searchKey,
    max: maxResults,
  })}`;
  const response = await RecovoHttp.get(url);

  return response?.data?.data;
};

export const fetchSuppressionList = async (searchKey: string): Promise<Array<FetchSuppressionListState>> => {
  const url = `${endpoints.GET_ALL_SUPPRESSION_LIST}${queryParamUtils.stringfy({ search: searchKey })}`;
  const response = await RecovoHttp.get(url);

  return response?.data?.data.map(formatResponse);
};

export const fetchSuppressionListStatus = async (): Promise<string> => {
  const url = endpoints.GET_SUPPRESSION_LIST_STATUS;
  const response = await RecovoHttp.get(url);

  return response?.data?.status;
};

export const removeAllSuppressionList = async () => {
  const response = await RecovoHttp.post(endpoints.REMOVE_ALL_SUPPRESSION_LIST);
  return response.data.data;
};

export const removeSuppressionListById = async (id: number) => {
  const URL = interpolate(endpoints.REMOVE_SUPPRESSION_LIST_BY_ID, { id });
  const response = await RecovoHttp.post(URL);
  return response.data.data;
};

const formatResponse = ({ id, firstName, lastName, email }: FetchSuppressionListState): FetchSuppressionListState => {
  const fullName = [firstName, lastName].filter(Boolean).join(' ');

  return {
    id,
    firstName,
    lastName,
    fullName,
    email,
  };
};
