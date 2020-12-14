import { interpolate } from 'src/utils/string';
import * as endpoints from 'src/constants/endpoints';
import { RecovoHttp } from 'src/services/axios-instance';
import { httpConstants } from 'src/constants/http-constants';

interface ValidateEmailResponse {
  success: boolean;
  status: number;
  email: string;
}

interface ValidateDomainResponse {
  status: number;
  domain: string;
}

export interface ValidateState {
  validateValue: string;
  isValid: boolean;
}

export const validateUsersEmail = async (emails: Array<string>) => {
  const response = await RecovoHttp.post(endpoints.VALIDATE_USER, { emails });

  return response.data.data.map(formatEmailResponse);
};

export const validateSuppressionEmail = async (emailArr: Array<string>): Promise<Array<ValidateState>> => {
  const requestBody = {
    emails: emailArr,
  };
  const response = await RecovoHttp.post(endpoints.VALIDATE_SUPPRESSION_LIST, requestBody);

  return response?.data?.data.map(formatEmailResponse);
};

export const validateClientDomain = async (domains: Array<string>): Promise<Array<ValidateState>> => {
  const requestBody = {
    domainUrls: domains,
  };
  const response = await RecovoHttp.post(endpoints.CLIENT_DOMAIN_VALIDATE, requestBody);

  return response?.data?.data.map(formatDomainResponse);
};

export const validateSupervisorEmail = async (emails: Array<string>, id?: string) => {
  const URL = interpolate(endpoints.VALIDATE_SUPERVISOR, { id });
  const response = await RecovoHttp.post(URL, { emails });

  return response.data.data.map(formatEmailResponse);
};

const formatDomainResponse = ({ status, domain }: ValidateDomainResponse): ValidateState => {
  return {
    validateValue: domain,
    isValid: status === httpConstants.statusCode.SUCCESS,
  };
};

const formatEmailResponse = ({ success, status, email }: ValidateEmailResponse): ValidateState => {
  return {
    validateValue: email,
    isValid: !!success || status === httpConstants.statusCode.SUCCESS,
  };
};
