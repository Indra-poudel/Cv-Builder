import { combineReducers } from 'redux';

import * as contactInfoAction from './contact-info.action';
import { ContactInfo } from 'src/entities/contact-info/types';

interface ContactInfoFetchingState {
  contactInfo: ContactInfo;
  isLoading: boolean;
  isFail: boolean;
  isDialogOpen: boolean;
}

interface ContactInfoUpdateState {
  isUpdating: boolean;
  isUpdateFail: boolean;
}

const contactInfoInitialState: ContactInfoFetchingState = {
  isLoading: false,
  isFail: false,
  isDialogOpen: false,
  contactInfo: {
    id: '',
    firstName: '',
    lastName: '',
    position: '',
    contactOrganizationName: '',
    email: '',
    workPhoneNumber: '',
    cellPhoneNumber: '',
    address: '',
  },
};

const contactUpdateInitialState: ContactInfoUpdateState = {
  isUpdating: false,
  isUpdateFail: false,
};

const contactInfoReducer = (
  state = contactInfoInitialState,
  action: contactInfoAction.ContactInfoActionTypes
): ContactInfoFetchingState => {
  switch (action.type) {
    case contactInfoAction.CONTACT_INFO_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case contactInfoAction.CONTACT_INFO_LOADED_SUCCESSFULLY:
      return {
        ...state,
        contactInfo: {
          ...action.payload.contactInfo,
        },
        isLoading: false,
        isFail: false,
      };

    case contactInfoAction.CONTACT_INFO_FAIL_TO_LOADED: {
      return {
        ...state,
        isLoading: false,
        isFail: true,
      };
    }

    case contactInfoAction.TOGGLE_CONTACT_DIALOG: {
      return {
        ...state,
        isDialogOpen: !!action.payload.id,
        contactInfo: {
          ...state.contactInfo,
          id: action.payload.id,
        },
      };
    }

    default:
      return state;
  }
};

const contactInfoUpdateReducer = (
  state = contactUpdateInitialState,
  action: contactInfoAction.ContactInfoUpdateActionType
): ContactInfoUpdateState => {
  switch (action.type) {
    case contactInfoAction.CONTACT_INFO_UPDATING:
      return {
        ...state,
        isUpdating: true,
      };

    case contactInfoAction.CONTACT_INFO_UPDATE_SUCCESS: {
      return {
        ...state,
        isUpdating: false,
        isUpdateFail: false,
      };
    }

    case contactInfoAction.CONTACT_INFO_UPDATE_FAIL: {
      return {
        ...state,
        isUpdating: false,
        isUpdateFail: true,
      };
    }

    default:
      return state;
  }
};

export default combineReducers({
  contactInfo: contactInfoReducer,
  contactInfoUpdate: contactInfoUpdateReducer,
});
