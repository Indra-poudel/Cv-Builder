import * as userManagementAction from './user-management.action';

interface State {
  isResetUserFilter: boolean;
  domainUsers: Array<string>;
  isAddDialogLoading: boolean;
}

const initialState: State = {
  isResetUserFilter: false,
  domainUsers: [],
  isAddDialogLoading: false,
};

const userManagementReducer = (state = initialState, action: userManagementAction.fetchDomainUsersActionTypes) => {
  switch (action.type) {
    case userManagementAction.RESET_USER_FILTER:
      return {
        ...state,
        isResetUserFilter: !state.isResetUserFilter,
      };
    case userManagementAction.FETCH_DOMAIN_USERS:
      return {
        ...state,
        domainUsers: action.payload.domainUsers,
      };
    case userManagementAction.SHOW_ADD_DIALOG_LOADING:
      return {
        ...state,
        isAddDialogLoading: true,
      };

    case userManagementAction.HIDE_ADD_DIALOG_LOADING:
      return {
        ...state,
        isAddDialogLoading: false,
      };
    default:
      return state;
  }
};

export default userManagementReducer;
