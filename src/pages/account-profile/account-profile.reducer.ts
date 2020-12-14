import * as accountProfileAction from './account-profile.action';
import { IAccountProfile, UserRoles } from './account-profile.types';
import { SelectOption } from 'src/components/commons/rc-select/rc-select';

interface State {
  accountProfile: IAccountProfile;
  isLoading: boolean;
  departmentOptions: Array<SelectOption>;
}

const initialState: State = {
  accountProfile: {
    firstName: '',
    lastName: '',
    email: '',
    departmentKey: '',
    clientDomainCount: undefined,
    clientDomains: undefined,
    createdBy: '',
    createdOn: '',
    department: '',
    id: '',
    hasSignedUp: false,
    isActive: false,
    isError: false,
    isSuppressed: false,
    lastLogin: '',
    organization: '',
    phoneNumbers: [],
    role: UserRoles.User,
    supervisors: [],
  },
  isLoading: false,
  departmentOptions: [],
};

const accountProfileReducer = (state = initialState, action: accountProfileAction.UserDetailsActionTypes): State => {
  switch (action.type) {
    case accountProfileAction.FETCH_ACCOUNT_PROFILE:
      return {
        ...state,
        accountProfile: action.payload.accountProfile,
      };

    case accountProfileAction.SHOW_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case accountProfileAction.HIDE_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case accountProfileAction.UPDATE_FULL_NAME:
      return {
        ...state,
        accountProfile: {
          ...state.accountProfile,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
        },
      };

    case accountProfileAction.UPDATE_PHONE:
      return {
        ...state,
        accountProfile: {
          ...state.accountProfile,
          phoneNumbers: action.payload.phoneNumbers,
        },
      };

    case accountProfileAction.UPDATE_DEPARTMENT:
      return {
        ...state,
        accountProfile: {
          ...state.accountProfile,
          departmentKey: action.payload.departmentKey,
          department: action.payload.department,
        },
      };
    case accountProfileAction.FETCH_DEPARTMENT_OPTIONS:
      return {
        ...state,
        departmentOptions: action.payload.departmentOptions,
      };

    default:
      return state;
  }
};

export default accountProfileReducer;
