import * as organizationSetupAction from './organiztion-setup.action';
import { SelectOption } from 'src/components/commons/rc-select/rc-select';

interface IState {
  organizationSizeOptions: Array<SelectOption>;
  industryTypeOptions: Array<SelectOption>;
  departmentOptions: Array<SelectOption>;
  isLoading: boolean;
  isSaveSuccessful: boolean;
}

const initialState = {
  organizationSizeOptions: [],
  industryTypeOptions: [],
  departmentOptions: [],
  isLoading: false,
  isSaveSuccessful: false,
};

const organizationSetupReducer = (
  state = initialState,
  action: organizationSetupAction.OrganizationSetupTypes
): IState => {
  switch (action.type) {
    case organizationSetupAction.FETCH_ORGANIZATION_SETUP_OPTIONS:
      return {
        ...state,
        organizationSizeOptions: action.payload.organizationSizeOptions,
        industryTypeOptions: action.payload.industryTypeOptions,
        departmentOptions: action.payload.departmentOptions,
      };

    case organizationSetupAction.SHOW_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case organizationSetupAction.HIDE_LOADING: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case organizationSetupAction.SAVE_SUCCESS: {
      return {
        ...state,
        isSaveSuccessful: true,
      };
    }

    default:
      return state;
  }
};

export default organizationSetupReducer;
