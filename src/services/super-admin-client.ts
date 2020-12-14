import { interpolate } from 'src/utils/string';
import queryParamUtils from 'src/utils/query-param';
import * as endpoints from 'src/constants/endpoints';
import { RecovoHttp } from 'src/services/axios-instance';
import superAdminClientEntity from 'src/entities/super-admin-client';
import clientDetailEntity from 'src/entities/super-admin-client-details';
import { ClientInfo } from 'src/pages/super-admin-client/components/types';
import { SuperAdminClientList } from 'src/entities/super-admin-client/types';
import { IClientDetail, IClientUpdate } from 'src/entities/super-admin-client-details/types';

export const fetchSuperAdminClientList = async (
  page: number,
  pageSize: number,
  sortField?: string,
  sortDirection?: string
): Promise<SuperAdminClientList> => {
  const URL = `${endpoints.SUPER_ADMIN_CLIENT}${queryParamUtils.stringfy({
    page,
    pageSize,
    sortField: sortField,
    sortDirection: sortDirection,
  })}`;

  const response = await RecovoHttp.get(URL);

  return {
    data: response.data.data.map(superAdminClientEntity.fromJson),
    hasNextPage: response.data.hasNextPage,
    pageSize: response.data.pageSize,
    pageNumber: response.data.page,
  };
};

export const fetchSuperAdminClientDetail = async (id: string): Promise<IClientDetail> => {
  const URL = interpolate(endpoints.SUPER_ADMIN_CLIENT_DETAILS, { id });
  const response = await RecovoHttp.get(URL);

  return clientDetailEntity.fromJson(response.data.data);
};

export const addClient = async (clientInfo: ClientInfo) => {
  const response = await RecovoHttp.post(endpoints.SUPER_ADMIN_CLIENT, clientInfo);

  return response.data.data;
};

export const updateClient = async (id: string, clientInfo: IClientUpdate): Promise<IClientDetail> => {
  const URL = interpolate(endpoints.SUPER_ADMIN_CLIENT_DETAILS, { id });
  const response = await RecovoHttp.put(URL, clientInfo);

  return clientDetailEntity.fromJson(response.data.data);
};
