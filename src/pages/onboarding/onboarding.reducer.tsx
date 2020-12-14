import * as onboardingStepAction from './onboarding.action';

interface OnboardingState {
  isLoading: boolean;
  onboardingStep: string;
  isError: boolean;
}

const initialState: OnboardingState = {
  isLoading: false,
  onboardingStep: '',
  isError: false,
};

const onboardingStepsReducer = (state = initialState, action: onboardingStepAction.OnboardingStepsTypes) => {
  switch (action.type) {
    case onboardingStepAction.FETCH_ONBOARDING_STEPS:
      return {
        ...state,
        isLoading: false,
        onboardingStep: action.payload.onboardingStep,
      };

    case onboardingStepAction.SHOW_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case onboardingStepAction.HIDE_LOADING: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case onboardingStepAction.ERROR_ONBOARDING: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    default:
      return state;
  }
};

export default onboardingStepsReducer;
