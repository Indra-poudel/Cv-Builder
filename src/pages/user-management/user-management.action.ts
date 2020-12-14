import { toast } from 'react-toastify';

import * as userService from 'src/services/users';

export const RESET_USER_FILTER = '@@action/RESET/USER/FILTER';
export const FETCH_DOMAIN_USERS = '@@action/FETCH_DOMAIN_USERS';
export const SHOW_ADD_DIALOG_LOADING = '@@action/USER_MANAGEMENT/SHOW_LOADING';
export const HIDE_ADD_DIALOG_LOADING = '@@action/USER_MANAGEMENT/HIDE_LOADING';

export interface FetchDomainUsers {
  type: typeof FETCH_DOMAIN_USERS;
  payload: {
    domainUsers: Array<string>;
  };
}

export const downloadUserList = () => async (): Promise<void> => {
  try {
    await userService.downloadUserList();
  } catch (err) {
    return Promise.reject(err);
  }
};

export const downloadUserClientDomainList = () => async (): Promise<void> => {
  try {
    await userService.downloadUserClientDomainList();
  } catch (err) {
    return Promise.reject(err);
  }
};

interface ShowAddDialogLoading {
  type: typeof SHOW_ADD_DIALOG_LOADING;
}

interface HideAddDialogLoading {
  type: typeof HIDE_ADD_DIALOG_LOADING;
}

interface ResetUserFilter {
  type: typeof RESET_USER_FILTER;
}

export type fetchDomainUsersActionTypes =
  | FetchDomainUsers
  | ShowAddDialogLoading
  | HideAddDialogLoading
  | ResetUserFilter;

export const fetchDomainUsers = (searchKey: string) => async (dispatch: Function): Promise<void> => {
  try {
    dispatch(showAddDialogLoading());
    const response = await userService.fetchUserSuggestions(searchKey);

    dispatch({
      type: FETCH_DOMAIN_USERS,
      payload: {
        domainUsers: response,
      },
    });
    dispatch(hideAddDialogLoading());
  } catch (err) {
    dispatch(hideAddDialogLoading());
    toast(err.message);
  }
};

export const resetUserFilter = () => ({
  type: RESET_USER_FILTER,
});

const showAddDialogLoading = () => ({
  type: SHOW_ADD_DIALOG_LOADING,
});

const hideAddDialogLoading = () => ({
  type: HIDE_ADD_DIALOG_LOADING,
});
