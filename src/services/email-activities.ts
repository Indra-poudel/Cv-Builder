import queryParamUtils from 'src/utils/query-param';
import * as endpoints from 'src/constants/endpoints';
import { RecovoHttp } from 'src/services/axios-instance';
import emailActivityEntity from 'src/entities/email-activities';
import { interpolate } from 'src/utils/string';

export interface EmailActivityPayload {
  contactId: string;
  page: number;
  pageSize: number;
  searchKey?: string;
}

export interface EmailActivity {
  id: string;
  attachmentCount: number;
  emails: Array<string>;
  isSnippetHidden: boolean;
  lastUpdatedDatetime: string;
  subject: string;
  snippet: string;
}

export interface EmailActivityResponse {
  data: Array<EmailActivity>;
  hasNextPage: boolean;
  pageNumber: number;
  pageSize: number;
  email: string;
  name: string;
}

export const fetchEmailActivities = async (
  emailActivityPayload: EmailActivityPayload
): Promise<EmailActivityResponse> => {
  const emailActivitiesEndpoint = interpolate(endpoints.GET_EMAIL_ACTIVITIES, {
    contactId: emailActivityPayload.contactId,
  });

  const URL = `${emailActivitiesEndpoint}${queryParamUtils.stringfy({
    page: emailActivityPayload.page,
    pageSize: emailActivityPayload.pageSize,
    search: emailActivityPayload.searchKey,
  })}`;

  const response = await RecovoHttp.get(URL);

  const name = [response.data.firstName, response.data.lastName].filter(Boolean).join(' ');

  return {
    data: response.data.data.data.map(emailActivityEntity.fromJson),
    hasNextPage: response.data.data.hasNextPage,
    pageSize: response.data.data.pageSize,
    pageNumber: response.data.data.page,
    email: response.data.data.email,
    name,
  };
};
