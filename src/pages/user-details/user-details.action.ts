import i18n from 'src/i18n';

import notification from 'src/utils/notification';
import * as userDetailsService from 'src/services/user-details';
import * as clientDomainService from 'src/services/client-domain';
import { SelectOption } from 'src/components/commons/rc-select/rc-select';
import { ExistingSupervisorResponse, IUserDetails, UserRoles } from './user-details.types';

export const UPDATE_ROLE = '@@action/USER_DETAILS/UPDATE_ROLE';
export const FETCH_USER_DETAILS = '@@action/FETCH_USER_DETAILS';
export const UPDATE_PHONE = '@@action/USER_DETAILS/UPDATE_PHONE';
export const SHOW_LOADING = '@@action/USER_DETAILS/SHOW_LOADING';
export const HIDE_LOADING = '@@action/USER_DETAILS/HIDE_LOADING';
export const UPDATE_FULL_NAME = '@@action/USER_DETAILS/UPDATE_FULL_NAME';
export const UPDATE_DEPARTMENT = '@@action/USER_DETAILS/UPDATE_DEPARTMENT';
export const ASSIGN_SUPERVISORS_SUCCESS = '@@action/USER_DETAILS/ASSIGN_SUPERVISORS_SUCCESS';
export const FETCH_DEPARTMENT_OPTIONS = '@@action/USER_DETAILS/FETCH_DEPARTMENT_OPTIONS';
export const TOGGLE_RE_INVITATION_SUCCESS = '@@action/USER_DETAILS/RE_INVITATION_SUCCESS';
export const ADDING_CLIENT_DOMAINS = '@@action/USER_DETAILS/ADDING_DOMAINS';
export const ADDING_CLIENT_DOMAINS_FAIL = '@@action/USER_DETAILS/ADDING_DOMAINS_FAIL';
export const ADDING_CLIENT_DOMAINS_SUCCESS = '@@action/USER_DETAILS/ADDING_DOMAINS_SUCCESS';
export const ASSIGNING_SUPERVISOR = '@@action/USER_DETAILS/ASSIGNING_SUPERVISOR';
export const ASSIGN_SUPERVISOR_FAIL = '@@action/USER_DETAILS/ASSIGN_SUPERVISOR_FAIL';

interface AddingClientDomains {
  type: typeof ADDING_CLIENT_DOMAINS;
}

interface AddingClientDomainsSuccess {
  type: typeof ADDING_CLIENT_DOMAINS_SUCCESS;
}

interface AddingClientDomainsFail {
  type: typeof ADDING_CLIENT_DOMAINS_FAIL;
}
interface FetchUserDetails {
  type: typeof FETCH_USER_DETAILS;
  payload: {
    userDetails: IUserDetails;
  };
}

interface UpdateFullName {
  type: typeof UPDATE_FULL_NAME;
  payload: {
    firstName: string;
    lastName: string;
  };
}

interface UpdateUserRole {
  type: typeof UPDATE_ROLE;
  payload: {
    role: UserRoles;
  };
}

interface UpdateUserPhoneNumbers {
  type: typeof UPDATE_PHONE;
  payload: {
    phoneNumbers: Array<string>;
  };
}

interface AssignSupervisorsSuccess {
  type: typeof ASSIGN_SUPERVISORS_SUCCESS;
  payload: {
    supervisors: Array<ExistingSupervisorResponse>;
  };
}

interface AssigningSupervisor {
  type: typeof ASSIGNING_SUPERVISOR;
  payload: {
    isAssigningSupervisor: boolean;
  };
}

interface AssignSupervisorFail {
  type: typeof ASSIGN_SUPERVISOR_FAIL;
  payload: {
    isAssigningSupervisor: boolean;
  };
}

interface ToggleReInvitation {
  type: typeof TOGGLE_RE_INVITATION_SUCCESS;
  payload: {
    isSuccess: boolean;
  };
}

interface ShowLoading {
  type: typeof SHOW_LOADING;
}

interface HideLoading {
  type: typeof HIDE_LOADING;
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
  | FetchUserDetails
  | UpdateFullName
  | UpdateUserRole
  | UpdateUserPhoneNumbers
  | AssignSupervisorsSuccess
  | ToggleReInvitation
  | ShowLoading
  | HideLoading
  | fetchDepartmentOptions
  | updateUserDepartment
  | AddingClientDomains
  | AddingClientDomainsSuccess
  | AddingClientDomainsFail
  | AssignSupervisorFail
  | AssigningSupervisor;

export const fetchUserDetails = (id: string) => async (dispatch: Function): Promise<void> => {
  try {
    dispatch(showLoading());

    const response = await userDetailsService.getUserDetails(id);

    dispatch({
      type: FETCH_USER_DETAILS,
      payload: {
        userDetails: {
          isError: !!response,
          ...response,
        },
      },
    });

    dispatch(hideLoading());
  } catch {
    dispatch({
      type: FETCH_USER_DETAILS,
      payload: {
        userDetails: {
          isError: true,
        },
      },
    });

    dispatch(hideLoading());
  }
};

export const updateFullName = (firstName: string, lastName: string, userId: string) => async (
  dispatch: Function
): Promise<void> => {
  try {
    const requestBody = {
      firstName,
      lastName,
    };

    dispatch(showLoading());

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
    const message = (error.response && error.response.data.message) || error.message;
    notification(message);
    dispatch(hideLoading());
  }
};

export const updateUserRole = (role: UserRoles, userId: string) => async (dispatch: Function): Promise<void> => {
  try {
    const requestBody = {
      role,
    };

    dispatch(showLoading());

    const userDetailResponse = await userDetailsService.updateUserDetails(userId, requestBody);

    dispatch({
      type: UPDATE_ROLE,
      payload: {
        role: userDetailResponse.role,
      },
    });

    dispatch(hideLoading());
  } catch (error) {
    const message = (error.response && error.response.data.message) || error.message;
    notification(message);
    dispatch(hideLoading());
  }
};

export const updateUserPhoneNumbers = (phoneNumbers: Array<string>, userId: string) => async (
  dispatch: Function
): Promise<void> => {
  try {
    const requestBody = {
      phoneNumbers,
    };

    dispatch(showLoading());

    const userDetailResponse = await userDetailsService.updateUserDetails(userId, requestBody);

    dispatch({
      type: UPDATE_PHONE,
      payload: {
        phoneNumbers: userDetailResponse.phoneNumbers,
      },
    });

    dispatch(hideLoading());
  } catch (error) {
    const message = (error.response && error.response.data.message) || error.message;
    notification(message);
    dispatch(hideLoading());
  }
};

export const assignSupervisors = (supervisorEmails: Array<string>, userId: string) => {
  return async (dispatch: Function): Promise<boolean> => {
    try {
      dispatch({ type: ASSIGNING_SUPERVISOR });

      const assignSupervisorResponse = await userDetailsService.addSupervisors(userId, supervisorEmails);

      if (assignSupervisorResponse.failure.length > 0) {
        notification(i18n.t('userDetailPage.assignSupervisorDialog.message.someErrorSaveResponse'));
      }

      const supervisors: Array<ExistingSupervisorResponse> = assignSupervisorResponse.success.map((success) => {
        return { fullName: success.fullName, email: success.email };
      });

      dispatch({
        type: ASSIGN_SUPERVISORS_SUCCESS,
        payload: {
          supervisors: supervisors,
        },
      });

      dispatch(hideLoading());

      return Promise.resolve(true);
    } catch (error) {
      const message = (error.response && error.response.data.message) || error.message;
      notification(message);
      dispatch({ type: ASSIGN_SUPERVISOR_FAIL });
      return Promise.reject(true);
    }
  };
};

export const resendInvitation = (userId: string) => async (dispatch: Function): Promise<void> => {
  dispatch(showLoading());
  try {
    await userDetailsService.resendInvitation(userId);

    dispatch(toggleReInvitationSuccess(true));
  } catch (error) {
    const message = (error.response && error.response.data.message) || error.message;
    notification(message);
  } finally {
    dispatch(hideLoading());
    dispatch(toggleReInvitationSuccess(false));
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

export const updateUserDepartment = (department: string, userId: string) => async (
  dispatch: Function
): Promise<void> => {
  try {
    const requestBody = {
      department,
    };

    dispatch(showLoading());

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
    const message = (error.response && error.response.data.message) || error.message;
    notification(message);
    dispatch(hideLoading());
  }
};

export const mapClientDomainsManually = (id: string, domains: Array<string>) => async (
  dispatch: Function
): Promise<boolean> => {
  try {
    dispatch({
      type: ADDING_CLIENT_DOMAINS,
    });

    const response = await clientDomainService.manuallyMapClientDomains(id, domains);

    dispatch({
      type: ADDING_CLIENT_DOMAINS_SUCCESS,
    });

    return !!response;
  } catch (err) {
    dispatch({
      type: ADDING_CLIENT_DOMAINS_FAIL,
    });

    return Promise.reject(err);
  }
};

const toggleReInvitationSuccess = (isSuccess: boolean): ToggleReInvitation => ({
  type: TOGGLE_RE_INVITATION_SUCCESS,
  payload: {
    isSuccess,
  },
});

export const deleteClientDomain = (userId: string, clientDomainId: number) => async (
  dispatch: Function
): Promise<boolean> => {
  try {
    dispatch(showLoading());

    await userDetailsService.deleteClientDomain(userId, clientDomainId);

    dispatch(fetchUserDetails(userId));

    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(error);
  } finally {
    dispatch(hideLoading());
  }
};

const showLoading = (): ShowLoading => ({
  type: SHOW_LOADING,
});

const hideLoading = (): HideLoading => ({
  type: HIDE_LOADING,
});

export const deleteSingleExistingSupervisor = (id: number, supervisorEmail: string) => async (): Promise<boolean> => {
  try {
    await userDetailsService.removeExistingSupervisorById(id, supervisorEmail);

    return Promise.resolve(true);
  } catch {
    return Promise.reject();
  }
};
