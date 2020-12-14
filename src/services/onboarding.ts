import { RecovoHttp } from 'src/services/axios-instance';
import { UPDATE_ONBOARDING_STEP, GET_ONBOARDING_STEP } from 'src/constants/endpoints';

export const fetchOnboardingStep = async (): Promise<string> => {
  const response = await RecovoHttp.get(GET_ONBOARDING_STEP);

  return response?.data?.data.onboardingStep;
};

export const updateOnboardingStep = async (payload: Object) => {
  const response = await RecovoHttp.post(UPDATE_ONBOARDING_STEP, payload);

  return response;
};
