import { Dispatch } from 'redux';

import { RootState } from 'src/reducers';
import { ClientInfo } from './components/types';
import notification from 'src/utils/notification';
import * as superAdminService from 'src/services/super-admin-client';
import { PAGE_SIZE, PAGE_NUMBER } from './super-admin-client.constant';
import { SuperAdminClient } from 'src/entities/super-admin-client/types';

export const FETCHING_SUPER_ADMIN_CLIENT = '@@action/SUPER_ADMIN_CLIENT/FETCHING';
export const FETCH_SUPER_ADMIN_CLIENT_FAIL = '@@action/SUPER_ADMIN_CLIENT/FETCH_FAIL';
export const FETCH_SUPER_ADMIN_CLIENT_SUCCESS = '@@action/SUPER_ADMIN_CLIENT/FETCH_SUCCESS';
export const RESET_SUPER_ADMIN_CLIENT_STATE = '@@action/SUPER_ADMIN_CLIENT/RESET_STATE';
export const SORT_CLIENT_LIST = '@@action/SUPER_ADMIN_CLIENT/SORT_CLIENT_LIST';
export const SORT_CLIENT_FAIL = '@@action/SUPER_ADMIN_CLIENT/SORT_CLIENT_FAIL';

export const CLIENT_ADDING = '@@action/SUPER_ADMIN_CLIENT/ADDING';
export const CLIENT_ADD_FAIL = '@@action/SUPER_ADMIN_CLIENT/ADD_FAIL';
export const CLIENT_ADD_SUCCESS = '@@action/SUPER_ADMIN_CLIENT/ADD_SUCCESS';

interface SuperAdminClientFetchSuccess {
  type: typeof FETCH_SUPER_ADMIN_CLIENT_SUCCESS;
  payload: {
    hasNextPage: boolean;
    pageNumber: number;
    superAdminClientList: Array<SuperAdminClient>;
  };
}

interface SuperAdminSortClientList {
  type: typeof SORT_CLIENT_LIST;
  payload: {
    sortField: string;
    sortDirection: string;
  };
}

interface SuperAdminSortClientFail {
  type: typeof SORT_CLIENT_FAIL;
}

interface SuperAdminClientFetching {
  type: typeof FETCHING_SUPER_ADMIN_CLIENT;
}

interface SuperAdminClientFetchFail {
  type: typeof FETCH_SUPER_ADMIN_CLIENT_FAIL;
}

interface SuperAdminClientResetState {
  type: typeof RESET_SUPER_ADMIN_CLIENT_STATE;
}

export type SuperAdminClientActionType =
  | SuperAdminClientFetching
  | SuperAdminClientFetchSuccess
  | SuperAdminClientFetchFail
  | SuperAdminClientResetState
  | SuperAdminSortClientList
  | SuperAdminSortClientFail;

export const fetchSuperAdminClient = () => async (
  dispatch: Dispatch<SuperAdminClientActionType>,
  getState: () => RootState
): Promise<void> => {
  try {
    dispatch({
      type: FETCHING_SUPER_ADMIN_CLIENT,
    });

    const { sortField, sortDirection } = getState().superAdminClient.clientList;
    const response = await superAdminService.fetchSuperAdminClientList(
      PAGE_NUMBER,
      PAGE_SIZE,
      sortField,
      sortDirection
    );

    dispatch({
      type: FETCH_SUPER_ADMIN_CLIENT_SUCCESS,
      payload: {
        hasNextPage: response.hasNextPage,
        pageNumber: response.pageNumber,
        superAdminClientList: response.data,
      },
    });
  } catch {
    dispatch({
      type: FETCH_SUPER_ADMIN_CLIENT_FAIL,
    });
  }
};

export const sortSuperAdminClientList = (sortField: string, sortDirection: string) => async (
  dispatch: Dispatch<SuperAdminClientActionType>
): Promise<void> => {
  try {
    dispatch({
      type: SORT_CLIENT_LIST,
      payload: {
        sortField,
        sortDirection,
      },
    });
  } catch {
    dispatch({
      type: SORT_CLIENT_FAIL,
    });
  }
};

export const resetSuperAdminClientState = () => ({
  type: RESET_SUPER_ADMIN_CLIENT_STATE,
});

interface ClientAdding {
  type: typeof CLIENT_ADDING;
}

interface ClientAddingFail {
  type: typeof CLIENT_ADD_FAIL;
}

interface ClientAddingSuccess {
  type: typeof CLIENT_ADD_SUCCESS;
}

export type ClientAddActionType = ClientAdding | ClientAddingFail | ClientAddingSuccess;

export const addClient = (clientInfo: ClientInfo) => async (dispatch: Dispatch<ClientAddActionType>): Promise<void> => {
  try {
    dispatch({
      type: CLIENT_ADDING,
    });

    await superAdminService.addClient(clientInfo);
    dispatch({
      type: CLIENT_ADD_SUCCESS,
    });
  } catch (error) {
    const errorMessage = (error.response && error.response.data.message) || error.message;
    dispatch({
      type: CLIENT_ADD_FAIL,
    });
    notification(errorMessage);

    return Promise.reject(error.response.data);
  }
};
