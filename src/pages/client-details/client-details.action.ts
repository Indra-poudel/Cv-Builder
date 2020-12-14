import { Dispatch } from 'redux';

import { RootState } from 'src/reducers';
import notification from 'src/utils/notification';
import { ACTIVE } from './client-details.constant';
import { ClientInfo } from '../super-admin-client/components/types';
import * as superAdminClientService from 'src/services/super-admin-client';
import { IClientDetail } from 'src/entities/super-admin-client-details/types';

export const TOGGLE_LOADING = '@@action/CLIENT_DETAIL/TOGGLE_LOADING';
export const CLIENT_UPDATING = '@@action/CLIENT_DETAIL/CLIENT_UPDATING';
export const FETCH_CLIENT_FAIL = '@@action/CLIENT_DETAIL/FETCH_CLIENT_FAIL';
export const UPDATE_CLIENT_FAIL = '@@action/CLIENT_DETAIL/UPDATE_CLIENT_FAIL';
export const RESET_CLIENT_DETAIL = '@@action/CLIENT_DETAIL/RESET_CLIENT_DETAIL';
export const FETCH_CLIENT_SUCCESS = '@@action/CLIENT_DETAIL/FETCH_CLIENT_SUCCESS';
export const UPDATE_CLIENT_SUCCESS = '@@action/CLIENT_DETAIL/UPDATE_CLIENT_SUCCESS';
export const FETCHING_CLIENT_DETAIL = '@@action/CLIENT_DETAIL/FETCHING_CLIENT_DETAIL';

interface FetchingClient {
  type: typeof FETCHING_CLIENT_DETAIL;
}

interface ToggleLoading {
  type: typeof TOGGLE_LOADING;
  payload: boolean;
}

interface FetchClientSuccess {
  type: typeof FETCH_CLIENT_SUCCESS;
  payload: {
    clientDetail: IClientDetail;
  };
}

interface FetchClientFail {
  type: typeof FETCH_CLIENT_FAIL;
}

interface ResetClientDetail {
  type: typeof RESET_CLIENT_DETAIL;
}

interface UpdateClientFail {
  type: typeof UPDATE_CLIENT_FAIL;
}

interface ClientUpdating {
  type: typeof CLIENT_UPDATING;
}

interface UpdateClientDetails {
  type: typeof UPDATE_CLIENT_SUCCESS;
  payload: {
    firstName: string;
    lastName: string;
    email: string;
    client: string;
  };
}

const toggleLoading = (status: boolean): ToggleLoading => ({
  type: TOGGLE_LOADING,
  payload: status,
});

export type ClientDetailActionType =
  | FetchingClient
  | FetchClientSuccess
  | FetchClientFail
  | ResetClientDetail
  | UpdateClientDetails
  | ToggleLoading
  | UpdateClientFail
  | ClientUpdating;

export const fetchClientDetail = (id: string) => async (dispatch: Dispatch<ClientDetailActionType>): Promise<void> => {
  try {
    dispatch({
      type: FETCHING_CLIENT_DETAIL,
    });

    const response = await superAdminClientService.fetchSuperAdminClientDetail(id);

    dispatch({
      type: FETCH_CLIENT_SUCCESS,
      payload: { clientDetail: response },
    });
  } catch {
    dispatch({
      type: FETCH_CLIENT_FAIL,
    });
  }
};

export const updateClientDetails = (clientInfo: ClientInfo) => async (
  dispatch: Dispatch<ClientDetailActionType>,
  getState: () => RootState
): Promise<void> => {
  try {
    dispatch({
      type: CLIENT_UPDATING,
    });

    const { id } = getState().clientDetail.clientDetail;

    const response = await superAdminClientService.updateClient(id, clientInfo);

    dispatch({
      type: UPDATE_CLIENT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    const message = error?.response?.data?.message || error.message;

    dispatch({
      type: UPDATE_CLIENT_FAIL,
    });
    notification(message);
  }
};

export const updateClientStatus = () => async (
  dispatch: Dispatch<ClientDetailActionType>,
  getState: () => RootState
): Promise<void> => {
  try {
    dispatch(toggleLoading(true));

    const { id, clientStatus, email } = getState().clientDetail.clientDetail;

    const isActive = clientStatus === ACTIVE;
    const requestBody = { organizationAdminEmail: email, isActive: !isActive };

    const response = await superAdminClientService.updateClient(id, requestBody);

    dispatch({
      type: UPDATE_CLIENT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    const message = error?.response?.data?.message || error.message;

    dispatch(toggleLoading(false));
    notification(message);
  }
};

export const resetSuperAdminClientState = () => ({
  type: RESET_CLIENT_DETAIL,
});
