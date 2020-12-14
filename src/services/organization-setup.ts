import { RecovoHttp } from './axios-instance';

import * as endpoints from 'src/constants/endpoints';
import { ONBOARDING_STEP } from 'src/constants/onboarding';
import { updateOnboardingStep, fetchOnboardingStep } from './onboarding';

export interface IOrganizationInfo {
  organizationUrl: string;
  organizationName: string;
  userPosition: string;
  userDepartment: string;
  organizationSize: string;
  industry: string;
  gsuiteAdminEmail: string;
}

export const fetchOrganizationSizes = async () => {
  const response = await RecovoHttp.get(endpoints.GET_ORGANIZATION_SIZES);

  return response?.data?.data;
};

export const fetchIndustryTypes = async () => {
  const response = await RecovoHttp.get(endpoints.GET_INDUSTRY_TYPES);

  return response?.data?.data;
};

export const fetchDepartments = async () => {
  const response = await RecovoHttp.get(endpoints.GET_DEPARTMENTS);

  return response?.data?.data;
};

export const saveOrganizationInfo = async (requestBody: IOrganizationInfo) => {
  return fetchOnboardingStep().then(async (currentStep) => {
    if (currentStep === ONBOARDING_STEP.NOT_STARTED) {
      await updateOnboardingStep({
        currentStep: ONBOARDING_STEP.NOT_STARTED,
      });
    }
    return await RecovoHttp.post(endpoints.SAVE_ORGANIZATION_INFO, {
      ...requestBody,
    }).then(async () => {
      await updateOnboardingStep({
        currentStep: ONBOARDING_STEP.COMPANY_INFO,
      });
    });
  });
};

export const uploadJson = async (fileData: any) => {
  const response = await uploadCredentials(fileData);
  await updateOnboardingStep({
    currentStep: ONBOARDING_STEP.CREDENTIAL_UPLOAD,
  });

  return response;
};

export const uploadCredentials = async (fileData: Blob) => {
  const file = new FormData();
  file.append('file', fileData);
  file.append('service_type', 'GOOGLE');

  const response = await RecovoHttp.post(endpoints.UPLOAD_JSON, file);

  return response;
};
