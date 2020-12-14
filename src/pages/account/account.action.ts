import { Dispatch } from 'redux';

import * as rootReducer from 'src/reducers';
import * as authService from 'src/services/auth';
import * as endpoint from 'src/constants/endpoints';
import * as uploadCsv from 'src/services/upload-csv';
import * as suppressionService from 'src/services/suppression-list';
import * as csvErrorAction from 'src/components/csv-error-dialog/csv-error-dialog.action';

export const UPLOAD_FAIL = '@@action/ACCOUNT/SUPPRESSION_LIST/UPLOAD_FAIL';
export const SHOW_LOADER = '@@action/ACCOUNT/SUPPRESSION_LIST/SHOW_LOADER';
export const HIDE_LOADER = '@@action/ACCOUNT/SUPPRESSION_LIST/HIDE_LOADER';
export const UPLOAD_SUCCESS = '@@action/ACCOUNT/SUPPRESSION_LIST/UPLOAD_SUCCESS';

export const MANUALLY_ADD_ACTION = {
  MANUAL_ADD_SUCCESS: '@@action/ACCOUNT/SUPPRESSION_LIST/MANUAL/ADD_SUCCESS',
  SHOW_ADDING_LOADER: '@@action/ACCOUNT/SUPPRESSION_LIST/MANUAL/SHOW_LOADER',
  MANUAL_ADDING_FAIL: '@@action/ACCOUNT/SUPPRESSION_LIST/MANUAL/ADDING_FAIL',
};
export const LOGOUT_SUCCESS = '@@action/ACCOUNT/LOGOUT_SUCCESS';

interface LogoutSuccess {
  type: typeof LOGOUT_SUCCESS;
}

interface ShowLoader {
  type: typeof SHOW_LOADER;
}

interface HideLoader {
  type: typeof HIDE_LOADER;
}

interface UploadFail {
  type: typeof UPLOAD_FAIL;
}

interface UploadSuccess {
  type: typeof UPLOAD_SUCCESS;
  payload: {
    isAllRowSuccess: boolean;
  };
}

interface ManuallyAddSuccess {
  type: typeof MANUALLY_ADD_ACTION.MANUAL_ADD_SUCCESS;
}

interface ShowManuallyAddLoader {
  type: typeof MANUALLY_ADD_ACTION.SHOW_ADDING_LOADER;
}

interface ManuallyAddFail {
  type: typeof MANUALLY_ADD_ACTION.MANUAL_ADDING_FAIL;
}

export type AccountActionTypes =
  | ShowLoader
  | HideLoader
  | UploadSuccess
  | UploadFail
  | csvErrorAction.CsvErrorActionTypes;

export type ManuallyAddSuppressionActionType = ShowManuallyAddLoader | ManuallyAddFail | ManuallyAddSuccess;

export type LogoutType = LogoutSuccess;

export const uploadSuppressionList = (file: Blob) => async (
  dispatch: Dispatch<AccountActionTypes>
): Promise<boolean> => {
  try {
    dispatch({
      type: SHOW_LOADER,
    });

    const response = await uploadCsv.uploadCsv(endpoint.UPLOAD_SUPPRESSION_LIST, file);

    dispatch({
      type: UPLOAD_SUCCESS,
      payload: {
        isAllRowSuccess: response.isAllRowSuccess,
      },
    });

    dispatch({
      type: csvErrorAction.CSV_ERROR,
      payload: {
        csvErrors: response.data,
      },
    });

    return response.isAllRowSuccess;
  } catch {
    dispatch({
      type: UPLOAD_FAIL,
    });

    return Promise.reject();
  }
};

export const addSuppressionManually = (emails: Array<string>) => async (
  dispatch: Dispatch<ManuallyAddSuppressionActionType>
): Promise<boolean> => {
  try {
    dispatch({
      type: MANUALLY_ADD_ACTION.SHOW_ADDING_LOADER,
    });

    const response = await suppressionService.addSuppressionListManually(emails);

    dispatch({
      type: MANUALLY_ADD_ACTION.MANUAL_ADD_SUCCESS,
    });

    return !!response;
  } catch {
    dispatch({
      type: MANUALLY_ADD_ACTION.MANUAL_ADDING_FAIL,
    });

    return Promise.reject();
  }
};

export const logOut = () => async (dispatch: Function): Promise<void> => {
  try {
    await authService.logOut();
    dispatch({
      type: LOGOUT_SUCCESS,
    });
    dispatch({
      type: rootReducer.LOGOUT,
    });
  } catch (err) {
    throw err;
  }
};
