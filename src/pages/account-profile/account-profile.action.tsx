import { toast } from 'react-toastify';

import store from 'src/store';
import { IAccountProfile } from './account-profile.types';
import * as userDetailsService from 'src/services/user-details';
import * as userProfileService from './account-profile.service';
import { SelectOption } from 'src/components/commons/rc-select/rc-select';

export const UPDATE_ROLE = '@@action/ACCOUNT_PROFILE/UPDATE_ROLE';
export const SHOW_LOADING = '@@action/ACCOUNT_PROFILE/SHOW_LOADING';
export const HIDE_LOADING = '@@action/ACCOUNT_PROFILE/HIDE_LOADING';
export const UPDATE_PHONE = '@@action/ACCOUNT_PROFILE/UPDATE_PHONE';
export const UPDATE_FULL_NAME = '@@action/ACCOUNT_PROFILE/UPDATE_FULL_NAME';
export const UPDATE_DEPARTMENT = '@@action/ACCOUNT_PROFILE/UPDATE_DEPARTMENT';
export const ASSIGN_SUPERVISORS = '@@action/ACCOUNT_PROFILE/ASSIGN_SUPERVISORS';
export const FETCH_ACCOUNT_PROFILE = '@@action/ACCOUNT_PROFILE/FETCH_ACCOUNT_PROFILE';
export const FETCH_DEPARTMENT_OPTIONS = '@@action/ACCOUNT_PROFILE/FETCH_DEPARTMENT_OPTIONS';

interface fetchUserProfile {
  type: typeof FETCH_ACCOUNT_PROFILE;
  payload: {
    accountProfile: IAccountProfile;
  };
}

interface ShowLoading {
  type: typeof SHOW_LOADING;
}

interface HideLoading {
  type: typeof HIDE_LOADING;
}

interface UpdateFullName {
  type: typeof UPDATE_FULL_NAME;
  payload: {
    firstName: string;
    lastName: string;
  };
}

interface UpdateUserPhoneNumbers {
  type: typeof UPDATE_PHONE;
  payload: {
    phoneNumbers: Array<string>;
  };
}

interface updateUserDepartment {
  type: typeof UPDATE_DEPARTMENT;
  payload: {
    department: string;
    departmentKey: string;
  };
}

interface fetchDepartmentOptions {
  type: typeof FETCH_DEPARTMENT_OPTIONS;
  payload: {
    departmentOptions: Array<SelectOption>;
  };
}

export type UserDetailsActionTypes =
  | fetchUserProfile
  | ShowLoading
  | HideLoading
  | UpdateFullName
  | UpdateUserPhoneNumbers
  | updateUserDepartment
  | fetchDepartmentOptions;

export const fetchUserProfile = () => async (dispatch: Function): Promise<void> => {
  try {
    dispatch(showLoading());

    const response = await userProfileService.fetchUserProfile();

    dispatch({
      type: FETCH_ACCOUNT_PROFILE,
      payload: {
        accountProfile: {
          isError: !!response,
          ...response,
        },
      },
    });
  } catch {
    dispatch({
      type: FETCH_ACCOUNT_PROFILE,
      payload: {
        accountProfile: {
          isError: true,
        },
      },
    });
  } finally {
    dispatch(hideLoading());
  }
};

export const fetchDepartmentOptions = () => async (dispatch: Function): Promise<void> => {
  try {
    dispatch(showLoading());

    const response = await userDetailsService.fetchDepartments();

    dispatch({
      type: FETCH_DEPARTMENT_OPTIONS,
      payload: {
        departmentOptions: response,
      },
    });
  } finally {
    dispatch(hideLoading());
  }
};

export const updateFullName = (firstName: string, lastName: string) => async (dispatch: Function): Promise<void> => {
  try {
    const requestBody = {
      firstName,
      lastName,
    };

    dispatch(showLoading());

    const userId = store.getState().accountProfile.accountProfile.id;
    const userDetailResponse = await userDetailsService.updateUserDetails(userId, requestBody);

    dispatch({
      type: UPDATE_FULL_NAME,
      payload: {
        firstName: userDetailResponse.firstName,
        lastName: userDetailResponse.lastName,
      },
    });

    dispatch(hideLoading());
  } catch (error) {
    toast(error.message);
    dispatch(hideLoading());
  }
};

export const updateUserPhoneNumbers = (phoneNumbers: Array<string>) => async (dispatch: Function): Promise<void> => {
  try {
    const requestBody = {
      phoneNumbers,
    };

    dispatch(showLoading());

    const userId = store.getState().accountProfile.accountProfile.id;
    const userDetailResponse = await userDetailsService.updateUserDetails(userId, requestBody);

    dispatch({
      type: UPDATE_PHONE,
      payload: {
        phoneNumbers: userDetailResponse.phoneNumbers,
      },
    });

    dispatch(hideLoading());
  } catch (error) {
    toast(error.message);
    dispatch(hideLoading());
  }
};

export const updateUserDepartment = (department: string) => async (dispatch: Function): Promise<void> => {
  try {
    const requestBody = {
      department,
    };

    dispatch(showLoading());

    const { accountProfile } = store.getState().accountProfile;

    const userId = accountProfile.id;
    const userDetailResponse = await userDetailsService.updateUserDetails(userId, requestBody);

    dispatch({
      type: UPDATE_DEPARTMENT,
      payload: {
        department: userDetailResponse.department,
        departmentKey: userDetailResponse.departmentKey,
      },
    });

    dispatch(hideLoading());
  } catch (error) {
    toast(error.message);
    dispatch(hideLoading());
  }
};

const showLoading = (): ShowLoading => ({
  type: SHOW_LOADING,
});

const hideLoading = (): HideLoading => ({
  type: HIDE_LOADING,
});
