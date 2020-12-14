import { Dispatch } from 'redux';

import * as suppressionService from 'src/services/suppression-list';

export const FETCH_SUCCESS = '@@action/ACCOUNT/SUPPRESSION_LIST/FETCH/FETCH_SUCCESS';
export const SHOW_LOADER = '@@action/ACCOUNT/SUPPRESSION_LIST/FETCH/FETCH_LOADER';
export const FETCH_FAIL = '@@action/ACCOUNT/SUPPRESSION_LIST/FETCH/FETCH_FAIL';
export const FETCH_STATUS_SUCCESS = '@@action/ACCOUNT/SUPPRESSION_LIST_STATUS/FETCH_SUCCESS';
export const SHOW_STATUS_LOADER = '@@action/ACCOUNT/SUPPRESSION_LIST_STATUS/FETCH_LOADER';
export const FETCH_STATUS_FAIL = '@@action/ACCOUNT/SUPPRESSION_LIST_STATUS/FETCH_FAIL';

interface SuppressionListFetchSuccess {
  type: typeof FETCH_SUCCESS;
  payload: {
    suppressedUsers: Array<suppressionService.FetchSuppressionListState>;
  };
}

interface SuppressionListShowLoader {
  type: typeof SHOW_LOADER;
}

interface SuppressionListFetchFail {
  type: typeof FETCH_FAIL;
}

interface SuppressionListStatusFetchSuccess {
  type: typeof FETCH_STATUS_SUCCESS;
  payload: {
    status: string;
  };
}

interface SuppressionListStatusShowLoader {
  type: typeof SHOW_STATUS_LOADER;
}

interface SuppressionListStatusFetchFail {
  type: typeof FETCH_STATUS_FAIL;
}

export type FetchSuppressionListActionType =
  | SuppressionListShowLoader
  | SuppressionListFetchSuccess
  | SuppressionListFetchFail
  | SuppressionListStatusShowLoader
  | SuppressionListStatusFetchSuccess
  | SuppressionListStatusFetchFail;

export const fetchSuppressionList = (search: string) => async (
  dispatch: Dispatch<FetchSuppressionListActionType>
): Promise<void> => {
  try {
    dispatch({
      type: SHOW_LOADER,
    });

    const response = await suppressionService.fetchSuppressionList(search);

    dispatch({
      type: FETCH_SUCCESS,
      payload: {
        suppressedUsers: response,
      },
    });
  } catch {
    dispatch({
      type: FETCH_FAIL,
    });
  }
};

export const fetchSuppressionListStatus = () => async (dispatch: Dispatch<FetchSuppressionListActionType>) => {
  try {
    dispatch({
      type: SHOW_STATUS_LOADER,
    });

    const response = await suppressionService.fetchSuppressionListStatus();
    dispatch({
      type: FETCH_STATUS_SUCCESS,
      payload: {
        status: response,
      },
    });
  } catch {
    dispatch({
      type: FETCH_STATUS_FAIL,
    });
  }
};

export const deleteSingleSuppressionList = (userId: number) => async (): Promise<boolean> => {
  try {
    await suppressionService.removeSuppressionListById(userId);

    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteAllSuppressionList = () => async (): Promise<boolean> => {
  try {
    await suppressionService.removeAllSuppressionList();

    return Promise.resolve(true);
  } catch {
    return Promise.reject();
  }
};
