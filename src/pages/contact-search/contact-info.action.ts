import { Dispatch } from 'redux';

import notification from 'src/utils/notification';
import * as contactsService from 'src/services/contacts';
import { ContactInfo, UpdateContactInfo } from 'src/entities/contact-info/types';

export const CONTACT_INFO_LOADING = '@@action/CONTACT_INFO/SHOW_LOADING';
export const CONTACT_INFO_FAIL_TO_LOADED = '@@action/CONTACT_INFO/FETCH_FAIL';
export const CONTACT_INFO_LOADED_SUCCESSFULLY = '@@action/CONTACT_INFO/FETCH_SUCCESS';
export const TOGGLE_CONTACT_DIALOG = '@@action/CONTACT_INFO/TOGGLE_CONTACT_DIALOG';

export const CONTACT_INFO_UPDATING = '@@action/CONTACT_INFO/UPDATING';
export const CONTACT_INFO_UPDATE_FAIL = '@@action/CONTACT_INFO/UPDATE_FAIL';
export const CONTACT_INFO_UPDATE_SUCCESS = '@@action/CONTACT_INFO/UPDATE_SUCCESS';

interface ContactInfoLoaded {
  type: typeof CONTACT_INFO_LOADED_SUCCESSFULLY;
  payload: {
    contactInfo: ContactInfo;
  };
}
interface ContactInfoLoading {
  type: typeof CONTACT_INFO_LOADING;
}

interface ContactInfoUpdating {
  type: typeof CONTACT_INFO_UPDATING;
}

interface ContactInfoUpdateFail {
  type: typeof CONTACT_INFO_UPDATE_FAIL;
}

interface ContactInfoUpdateSuccess {
  type: typeof CONTACT_INFO_UPDATE_SUCCESS;
}

interface ContactInfoFailToLoad {
  type: typeof CONTACT_INFO_FAIL_TO_LOADED;
}
interface ToggleContactDialog {
  type: typeof TOGGLE_CONTACT_DIALOG;
  payload: {
    id: string;
  };
}

export type ContactInfoUpdateActionType = ContactInfoUpdating | ContactInfoUpdateFail | ContactInfoUpdateSuccess;

export type ContactInfoActionTypes =
  | ContactInfoLoading
  | ContactInfoFailToLoad
  | ContactInfoLoaded
  | ToggleContactDialog;

export const getContactInfo = (id: string) => async (dispatch: Dispatch<ContactInfoActionTypes>): Promise<void> => {
  try {
    dispatch({
      type: CONTACT_INFO_LOADING,
    });

    const response = await contactsService.fetchContactInfo(id);

    dispatch({
      type: CONTACT_INFO_LOADED_SUCCESSFULLY,
      payload: {
        contactInfo: response,
      },
    });
  } catch (error) {
    dispatch({
      type: CONTACT_INFO_FAIL_TO_LOADED,
    });
    notification(error.message);
  }
};

export const updateContactInfo = (id: string, contactInfo: UpdateContactInfo) => async (
  dispatch: Dispatch<ContactInfoUpdateActionType>
): Promise<void> => {
  try {
    dispatch({
      type: CONTACT_INFO_UPDATING,
    });

    await contactsService.updateContactInfo(id, contactInfo);
    dispatch({
      type: CONTACT_INFO_UPDATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CONTACT_INFO_UPDATE_FAIL,
    });
    notification(error.message);
  }
};

export const toggleContactInfoDialog = (id?: string): ToggleContactDialog => ({
  type: TOGGLE_CONTACT_DIALOG,
  payload: {
    id: id || '',
  },
});
