import * as userDetailsAction from './user-details.action';
import { IUserDetails, UserRoles } from './user-details.types';
import { SelectOption } from 'src/components/commons/rc-select/rc-select';

interface State {
  userDetails: IUserDetails;
  isLoading: boolean;
  isReInvitationSuccess: boolean;
  departmentOptions: Array<SelectOption>;
  isClientDomainMapping: boolean;
  isAssigningSupervisor: boolean;
}

const initialState: State = {
  userDetails: {
    firstName: '',
    lastName: '',
    email: '',
    clientDomainCount: undefined,
    clientDomains: [],
    createdBy: '',
    createdOn: '',
    department: '',
    departmentKey: '',
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
  isReInvitationSuccess: false,
  isClientDomainMapping: false,
  isAssigningSupervisor: false,
};

const userDetailsReducer = (state = initialState, action: userDetailsAction.UserDetailsActionTypes): State => {
  switch (action.type) {
    case userDetailsAction.FETCH_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload.userDetails,
      };

    case userDetailsAction.UPDATE_FULL_NAME:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
        },
      };

    case userDetailsAction.UPDATE_ROLE:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          role: action.payload.role,
        },
      };

    case userDetailsAction.UPDATE_PHONE:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          phoneNumbers: action.payload.phoneNumbers,
        },
      };

    case userDetailsAction.ASSIGNING_SUPERVISOR:
      return {
        ...state,
        isAssigningSupervisor: true,
      };
    case userDetailsAction.ASSIGN_SUPERVISORS_SUCCESS:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          supervisors: [...state.userDetails.supervisors, ...action.payload.supervisors],
        },
        isAssigningSupervisor: false,
      };
    case userDetailsAction.ASSIGN_SUPERVISOR_FAIL:
      return {
        ...state,
        isAssigningSupervisor: false,
      };

    case userDetailsAction.SHOW_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case userDetailsAction.HIDE_LOADING:
      return {
        ...state,
        isLoading: false,
      };

    case userDetailsAction.TOGGLE_RE_INVITATION_SUCCESS:
      return {
        ...state,
        isReInvitationSuccess: action.payload.isSuccess,
      };
    case userDetailsAction.UPDATE_DEPARTMENT:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          departmentKey: action.payload.departmentKey,
          department: action.payload.department,
        },
      };
    case userDetailsAction.FETCH_DEPARTMENT_OPTIONS:
      return {
        ...state,
        departmentOptions: action.payload.departmentOptions,
      };

    case userDetailsAction.ADDING_CLIENT_DOMAINS:
      return {
        ...state,
        isClientDomainMapping: true,
      };

    case userDetailsAction.ADDING_CLIENT_DOMAINS_SUCCESS:
      return {
        ...state,
        isClientDomainMapping: false,
      };

    case userDetailsAction.ADDING_CLIENT_DOMAINS_FAIL:
      return {
        ...state,
        isClientDomainMapping: false,
      };
    default:
      return state;
  }
};

export default userDetailsReducer;
