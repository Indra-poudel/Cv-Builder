import { interpolate } from 'src/utils/string';
import queryParamUtils from 'src/utils/query-param';
import * as endpoints from 'src/constants/endpoints';
import { RecovoHttp } from 'src/services/axios-instance';

export interface ClientDomainResponseState {
  id: number;
  domain: string;
  createdAt: string;
  updatedAt: string;
}

export const manuallyMapClientDomains = async (id: string, domains: Array<string>) => {
  const URL = interpolate(endpoints.MANUALLY_MAP_DOMAIN_TO_USER, { id });
  const requestBody = {
    domainUrls: domains,
  };
  const response = await RecovoHttp.post(URL, requestBody);

  return response.data.data;
};

export const fetchClientDomainList = async (
  searchKey: string,
  userId?: string
): Promise<Array<ClientDomainResponseState>> => {
  const url = `${endpoints.GET_CLIENT_DOMAINS}${queryParamUtils.stringfy({ search: searchKey, userId })}`;
  const response = await RecovoHttp.get(url);

  return response.data.data.map(formatResponse);
};

export const deleteClientDomainById = async (id: number) => {
  const URL = interpolate(endpoints.DELETE_CLIENT_DOMAIN_BY_ID, { id });
  const response = await RecovoHttp.delete(URL);
  return response.data.data;
};

const formatResponse = ({ id, domain, updatedAt, createdAt }: ClientDomainResponseState): ClientDomainResponseState => {
  return {
    id,
    domain,
    updatedAt,
    createdAt,
  };
};
