import { CsvRowState } from 'src/services/upload-csv';
import * as domainUploadAction from './domain-upload.action';

interface UploadDomainState {
  isUploading: boolean;
  isUploadSuccess: boolean;
  isPartialError: boolean;
  csvRows: Array<CsvRowState>;
  isUploadFail: boolean;
  isOnboardingStepUpdated: boolean;
}

const initialState: UploadDomainState = {
  isUploading: false,
  isUploadSuccess: false,
  isPartialError: false,
  isUploadFail: false,
  csvRows: [],
  isOnboardingStepUpdated: false,
};

const domainUploadReducer = (state = initialState, action: domainUploadAction.UploadDomainTypes): UploadDomainState => {
  switch (action.type) {
    case domainUploadAction.SHOW_LOADER:
      return {
        ...state,
        isUploading: true,
      };

    case domainUploadAction.HIDE_LOADER:
      return {
        ...state,
        isUploading: false,
      };

    case domainUploadAction.SAVE_SUCCESS: {
      return {
        ...state,
        isUploading: false,
        isUploadSuccess: action.payload.response.isAllRowSuccess,
        csvRows: action.payload.response.data,
        isPartialError: !action.payload.response.isAllRowSuccess,
      };
    }

    case domainUploadAction.UPLOAD_FAIL: {
      return {
        ...state,
        isUploading: false,
        isUploadFail: true,
      };
    }

    case domainUploadAction.UPDATE_ONBOARDING_STEP: {
      return {
        ...state,
        isOnboardingStepUpdated: true,
      };
    }

    case domainUploadAction.RE_UPLOAD: {
      return {
        ...state,
        isUploading: false,
        isUploadSuccess: false,
        isPartialError: false,
        isUploadFail: false,
      };
    }

    default:
      return { ...state };
  }
};

export default domainUploadReducer;
