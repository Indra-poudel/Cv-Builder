import { RecovoHttp } from './axios-instance';
import { interpolate } from 'src/utils/string';
import notification from 'src/utils/notification';
import queryParamUtils from 'src/utils/query-param';
import * as endpoints from 'src/constants/endpoints';
import * as downloadFileService from './download-files';
import { EXTENSION_TYPES } from 'src/constants/constants';
import contactInfoEntity from 'src/entities/contact-info';
import { UpdateContactInfo } from 'src/entities/contact-info/types';
import { ContactFilterOptions, DocumentSortOptions } from 'src/pages/contact-search/contact-search.types';

export const searchContacts = async (
  searchKey: string,
  contactFilterOptions: ContactFilterOptions,
  pageNumber: number = 1,
  pageSize: number = 10
) => {
  const { hasAttachments, hasClientResponses, startDate, endDate, sortOption } = contactFilterOptions;
  const { sortField, sortDirection } = sortOption;

  const url = `${endpoints.SEARCH_CONTACTS}${queryParamUtils.stringfy({
    primarySearch: searchKey,
    page: pageNumber,
    pageSize,
    hasAttachments,
    hasClientResponses,
    startDate,
    endDate,
    sortField,
    sortDirection,
  })}`;
  const response = await RecovoHttp.get(url);

  return response?.data;
};

export const downloadContacts = async (searchKey: string, contactFilterOptions: ContactFilterOptions) => {
  const { hasAttachments, hasClientResponses, startDate, endDate, sortOption } = contactFilterOptions;
  const { sortField, sortDirection } = sortOption;

  const url = `${endpoints.DOWNLOAD_CONTACTS}${queryParamUtils.stringfy({
    primarySearch: searchKey,
    hasAttachments,
    hasClientResponses,
    startDate,
    endDate,
    sortField,
    sortDirection,
  })}`;

  const downloadFileParams = {
    URL: url,
    fileName: `contacts${searchKey ? '_' + searchKey : ''}`,
    fileExtension: EXTENSION_TYPES.CSV,
  };

  downloadFileService.downloadFile(downloadFileParams);
};

export const getEmailActivityThread = async (emailActivityId: string) => {
  const url = interpolate(endpoints.GET_EMAIL_ACTIVITY_THREAD, { emailActivityId });

  const response = await RecovoHttp.get(url);

  return response?.data?.data;
};

export const downloadAttachment = async (id: string, fileName: string, fileExtension: string) => {
  const url = interpolate(endpoints.DOWNLOAD_MESSAGE_PART, { id });

  const response = await RecovoHttp.get(url);

  const downloadFileParams = {
    URL: response.data.data,
    fileName: fileName,
    fileExtension: '.' + fileExtension,
  };

  try {
    await downloadFileService.downloadFileWithoutToken(downloadFileParams);
  } catch (error) {
    if (!error.status) return;
    const errorMessage = (error.response && error.response.data.message) || error.message;
    notification(errorMessage);
  }
};

export const fetchContactInfo = async (id: string) => {
  const url = interpolate(endpoints.GET_CONTACT_INFO, { id });

  const response = await RecovoHttp.get(url);

  return contactInfoEntity.fromJson(response.data.data);
};

export const updateContactInfo = async (id: string, contactInfo: UpdateContactInfo) => {
  const url = interpolate(endpoints.GET_CONTACT_INFO, { id });

  await RecovoHttp.put(url, contactInfo);
};

export const searchDocuments = async (
  primarySearchKey: string,
  secondarySearchKey: string | undefined,
  sortFilterOptions: DocumentSortOptions,
  pageNumber: number = 1,
  pageSize: number = 10
) => {
  const { sortField, sortDirection } = sortFilterOptions;

  const url = `${endpoints.SEARCH_DOCUMENTS}${queryParamUtils.stringfy({
    primarySearch: primarySearchKey,
    secondarySearch: secondarySearchKey,
    page: pageNumber,
    pageSize,
    sortField,
    sortDirection,
  })}`;
  const response = await RecovoHttp.get(url);

  return response?.data;
};
