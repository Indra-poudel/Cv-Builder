import { Dispatch } from 'redux';

import * as onboardingService from 'src/services/onboarding';

export const SHOW_LOADING = '@@action/ONBOARDING/SHOW_LOADING';
export const HIDE_LOADING = '@@action/ONBOARDING/HIDE_LOADING';
export const ERROR_ONBOARDING = '@@action/ONBOARDING/ERROR_ONBOARDING';
export const FETCH_ONBOARDING_STEPS = '@@action/ONBOARDING/FETCH_ONBOARDING_STEPS';

interface FetchOnboardingSteps {
  type: typeof FETCH_ONBOARDING_STEPS;
  payload: {
    onboardingStep: string;
  };
}

interface ShowLoading {
  type: typeof SHOW_LOADING;
}

interface HideLoading {
  type: typeof HIDE_LOADING;
}

interface ErrorOnboarding {
  type: typeof ERROR_ONBOARDING;
}

export type OnboardingStepsTypes = FetchOnboardingSteps | ErrorOnboarding | ShowLoading | HideLoading;

export const fetchOnboardingStep = () => async (dispatch: Dispatch<OnboardingStepsTypes>): Promise<void> => {
  dispatch(showLoading());
  try {
    const response = await onboardingService.fetchOnboardingStep();
    dispatch(hideLoading());
    dispatch({
      type: FETCH_ONBOARDING_STEPS,
      payload: {
        onboardingStep: response,
      },
    });
  } catch (error) {
    dispatch(hideLoading());
    dispatch({
      type: ERROR_ONBOARDING,
    });
  }
};

const showLoading = (): ShowLoading => ({
  type: SHOW_LOADING,
});

const hideLoading = (): HideLoading => ({
  type: HIDE_LOADING,
});
