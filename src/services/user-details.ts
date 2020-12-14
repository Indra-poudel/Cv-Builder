import { RecovoHttp } from './axios-instance';
import { interpolate } from 'src/utils/string';
import queryParamUtils from '../utils/query-param';
import userDetails from '../entities/user-details';
import * as endpoints from 'src/constants/endpoints';
import { AddSupervisorResponse, SupervisorResponse } from '../pages/user-details/user-details.types';

/**
 * Get the UserDetails.
 *
 * TODO:// Here we will call api, when backend get ready.
 *
 * @returns
 */
export const getUserDetails = async (id: string) => {
  const URL = interpolate(endpoints.GET_USER_DETAILS, { id });
  const response = await RecovoHttp.get(URL);
  const data = userDetails.fromJson(response.data.data);

  return data;
};

export const updateUserDetails = async (id: string, requestBody: object) => {
  const URL = interpolate(endpoints.UPDATE_USER_DETAILS, { id });
  const response = await RecovoHttp.patch(URL, requestBody);
  return userDetails.fromJson(response?.data?.data);
};

export const resendInvitation = async (id: string) => {
  const URL = interpolate(endpoints.RESEND_INVITATION, { id });
  const response = await RecovoHttp.post(URL);

  return response?.data?.data;
};

export const fetchSupervisorSuggestions = async (
  userId: string,
  searchKey: string,
  maxResults: number = 20
): Promise<Array<SupervisorResponse>> => {
  const interpolatedUrl = interpolate(endpoints.GET_SUPERVISOR_SUGGESTIONS, { id: userId });
  const url = `${interpolatedUrl}${queryParamUtils.stringfy({ search: searchKey, max: maxResults })}`;

  const response = await RecovoHttp.get(url);

  return response?.data?.data;
};

export const fetchSupervisorRecommendations = async (
  userId: string,
  maxResults: number = 4
): Promise<Array<SupervisorResponse>> => {
  const interpolatedUrl = interpolate(endpoints.GET_SUPERVISOR_RECOMMENDATIONS, { id: userId });
  const url = `${interpolatedUrl}${queryParamUtils.stringfy({ max: maxResults })}`;

  const response = await RecovoHttp.get(url);

  return response?.data?.data;
};

export const addSupervisors = async (
  userId: string,
  supervisorEmails: Array<string>
): Promise<AddSupervisorResponse> => {
  const url = interpolate(endpoints.ADD_SUPERVISORS, { id: userId });
  const requestBody = { supervisorEmails };

  const response = await RecovoHttp.post(url, requestBody);

  return response?.data?.data;
};

/**
 * @returns Array of department options.
 */
export const fetchDepartments = async () => {
  const response = await RecovoHttp.get(endpoints.GET_DEPARTMENTS);

  return response?.data?.data;
};

/**
 * @returns null
 */
export const removeExistingSupervisorById = async (id: number, supervisorEmail: string) => {
  const URL = interpolate(endpoints.REMOVE_SUPERVISOR_EXISTING, { id });
  const requestBody = { supervisorEmail };

  const response = await RecovoHttp.post(URL, requestBody);
  return response.data.data;
};

export const deleteClientDomain = async (userId: string, clientDomainId: number) => {
  const url = interpolate(endpoints.DELETE_CLIENT_DOMAIN_OF_USER, { id: userId });
  const requestBody = { domainId: clientDomainId };

  const response = await RecovoHttp.post(url, requestBody);

  return response?.data?.data;
};
