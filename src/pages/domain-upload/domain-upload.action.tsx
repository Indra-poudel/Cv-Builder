import { Dispatch } from 'redux';
import { toast } from 'react-toastify';

import * as uploadCsv from 'src/services/upload-csv';
import * as onboarding from 'src/services/onboarding';
import { ONBOARDING_STEP } from 'src/constants/onboarding';

export const RE_UPLOAD = '@@action/ONBOARDING_DOMAIN_UPLOAD/RE_UPLOAD';
export const UPLOAD_FAIL = '@@action/ONBOARDING_DOMAIN_UPLOAD/UPLOAD_FAIL';
export const SHOW_LOADER = '@@action/ONBOARDING_DOMAIN_UPLOAD/SHOW_LOADER';
export const HIDE_LOADER = '@@action/ONBOARDING_DOMAIN_UPLOAD/HIDE_LOADER';
export const SAVE_SUCCESS = '@@action/ONBOARDING_DOMAIN_UPLOAD/SAVE_SUCCESS';
export const UPDATE_ONBOARDING_STEP = '@@action/ONBOARDING_DOMAIN_UPLOAD/UPDATE_ONBOARDING_STEP';

interface ShowLoader {
  type: typeof SHOW_LOADER;
}

interface HideLoader {
  type: typeof HIDE_LOADER;
}

interface UpdateOnboardingStep {
  type: typeof UPDATE_ONBOARDING_STEP;
}

interface SaveSuccess {
  type: typeof SAVE_SUCCESS;
  payload: {
    response: uploadCsv.CsvUploadState;
  };
}

interface UploadFail {
  type: typeof UPLOAD_FAIL;
}

interface ReUpload {
  type: typeof RE_UPLOAD;
}

export type UploadDomainTypes = ShowLoader | HideLoader | SaveSuccess | UploadFail | ReUpload | UpdateOnboardingStep;

export const uploadDomain = (file: Blob) => async (dispatch: Dispatch<UploadDomainTypes>): Promise<void> => {
  try {
    dispatch(showLoader());

    const response = await uploadCsv.uploadOnboardingDomainCsv(file);
    dispatch({
      type: SAVE_SUCCESS,
      payload: {
        response: response,
      },
    });
  } catch (error) {
    dispatch(setUploadFail());
  }
};

export const updateOnboardingStep = () => async (dispatch: Dispatch<UploadDomainTypes>): Promise<void> => {
  dispatch(showLoader());

  onboarding
    .updateOnboardingStep({
      currentStep: ONBOARDING_STEP.DOMAINS_UPLOAD,
    })
    .then(() => {
      dispatch({
        type: UPDATE_ONBOARDING_STEP,
      });
    })
    .catch((error) => {
      dispatch(hideLoader());
      toast(error.message);
    });
};

export const reUploadDomain = (): UploadDomainTypes => ({
  type: RE_UPLOAD,
});

const showLoader = (): ShowLoader => ({
  type: SHOW_LOADER,
});

const hideLoader = (): HideLoader => ({
  type: HIDE_LOADER,
});

const setUploadFail = (): UploadFail => ({
  type: UPLOAD_FAIL,
});
