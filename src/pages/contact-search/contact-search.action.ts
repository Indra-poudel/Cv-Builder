import { Dispatch } from 'redux';
import { toast } from 'react-toastify';

import { RootState } from 'src/reducers';
import * as contactsService from 'src/services/contacts';
import { httpConstants } from 'src/constants/http-constants';
import { ContactFilterOptions, IContactDetail } from './contact-search.types';

export const SEARCH_CONTACTS = '@@action/CONTACT_SEARCH/SEARCH_CONTACTS';
export const TOGGLE_OPEN_TAB = '@@action/CONTACT_SEARCH/TOGGLE_OPEN_TAB';
export const SHOW_LOADING = '@@action/CONTACT_SEARCH/SHOW_LOADING';
export const HIDE_LOADING = '@@action/CONTACT_SEARCH/HIDE_LOADING';
export const SHOW_CONTENT_LOADING = '@@action/CONTACT_SEARCH/SHOW_CONTENT_LOADING';
export const HIDE_CONTENT_LOADING = '@@action/CONTACT_SEARCH/HIDE_CONTENT_LOADING';

export const SHOW_EMPTY_RECORDS = '@@action/CONTACT_SEARCH/SHOW_EMPTY_RECORDS';
export const HIDE_EMPTY_RECORDS = '@@action/CONTACT_SEARCH/HIDE_EMPTY_RECORDS';
export const LOAD_MORE_CONTACTS = '@@action/CONTACT_SEARCH/LOAD_MORE_CONTACTS';
export const SET_FILTER_OPTIONS = '@@action/CONTACT_SEARCH/SET_FILTER_OPTIONS';
export const RESET_FILTER_OPTIONS = '@@action/CONTACT_SEARCH/RESET_FILTER_OPTIONS';
export const TOGGLE_CONTACT_LIST_LOADING = '@@action/CONTACT_SEARCH/TOGGLE_CONTACT_LIST_LOADING';
export const TOGGLE_SEARCH_START_SCREEN = '@@action/CONTACT_SEARCH/TOGGLE_SEARCH_START_SCREEN';
export const RESET_CONTACT_LIST = '@@action/CONTACT_SEARCH/RESET_CONTACT_LIST';

const PAGE_SIZE = 20;

interface SearchContacts {
  type: typeof SEARCH_CONTACTS;
  payload: {
    contacts: Array<IContactDetail>;
    hasNextPage: boolean;
    totalContacts: number;
    searchKey: string;
  };
}

interface LoadMoreContacts {
  type: typeof LOAD_MORE_CONTACTS;
  payload: {
    contacts: Array<IContactDetail>;
    updatedPageNumber: number;
    hasNextPage: boolean;
  };
}

interface SetFilterOptions {
  type: typeof SET_FILTER_OPTIONS;
  payload: {
    contactFilterOptions: ContactFilterOptions;
  };
}

interface ResetFilterOptions {
  type: typeof RESET_FILTER_OPTIONS;
}

interface ResetContactList {
  type: typeof RESET_CONTACT_LIST;
}

interface ToggleContactListLoading {
  type: typeof TOGGLE_CONTACT_LIST_LOADING;
  payload: {
    isLoading: boolean;
  };
}

interface ToggleSearchStartScreen {
  type: typeof TOGGLE_SEARCH_START_SCREEN;
  payload: {
    isShown: boolean;
  };
}

interface ToggleOpenTab {
  type: typeof TOGGLE_OPEN_TAB;
  payload: {
    openedTab: string;
  };
}

interface ShowLoading {
  type: typeof SHOW_LOADING;
}

interface HideLoading {
  type: typeof HIDE_LOADING;
}

interface ShowContentLoading {
  type: typeof SHOW_CONTENT_LOADING;
}

interface HideContentLoading {
  type: typeof HIDE_CONTENT_LOADING;
}

interface ShowEmptyRecords {
  type: typeof SHOW_EMPTY_RECORDS;
  payload: {
    searchKey: string;
  };
}

interface HideEmptyRecords {
  type: typeof HIDE_EMPTY_RECORDS;
}

export type ContactSearchTypes =
  | SearchContacts
  | LoadMoreContacts
  | SetFilterOptions
  | ShowEmptyRecords
  | HideEmptyRecords
  | ResetFilterOptions
  | ShowContentLoading
  | HideContentLoading
  | ShowLoading
  | HideLoading
  | ResetContactList
  | ToggleContactListLoading
  | ToggleSearchStartScreen
  | ToggleOpenTab;

export const searchContacts = (searchKey: string) => async (
  dispatch: Dispatch<ContactSearchTypes>,
  getState: () => RootState
): Promise<void> => {
  try {
    dispatch(showLoading());
    dispatch(resetFilterOptions());
    dispatch(hideEmptyRecords());
    dispatch(toggleSearchStartScreen(false));

    const { contactFilterOptions } = getState().contactSearch;

    const pageSize = PAGE_SIZE;
    const pageNumber = 1;
    const response = await contactsService.searchContacts(searchKey, contactFilterOptions, pageNumber, pageSize);
    const contacts: Array<IContactDetail> = response?.data;

    if (contacts && contacts.length <= 0) {
      dispatch(showEmptyRecords(searchKey));
    }

    dispatch({
      type: SEARCH_CONTACTS,
      payload: {
        contacts,
        hasNextPage: response?.hasNextPage,
        totalContacts: response?.total,
        searchKey: searchKey,
      },
    });
    dispatch(hideLoading());
  } catch (error) {
    dispatch(hideLoading());

    if (error?.response?.status === httpConstants.statusCode.FORBIDDEN) {
      // If the user searches for domain that exists in the system but is not mapped to the user,
      // the forbidden error is thrown
      // show empty records instead of empty message in case of forbidden error as per client's request
      dispatch(showEmptyRecords(searchKey));
      return;
    }

    dispatch(toggleSearchStartScreen(true));
    toast(error?.response?.data?.message || error.message);
  }
};

export const loadMoreContacts = () => async (
  dispatch: Dispatch<ContactSearchTypes>,
  getState: () => RootState
): Promise<void> => {
  try {
    dispatch(showContentLoading());
    dispatch(hideEmptyRecords());

    const { contactFilterOptions, searchKey, currentPageNumber } = getState().contactSearch;

    const pageSize = PAGE_SIZE;
    const nextPageNumber = currentPageNumber + 1;

    const response = await contactsService.searchContacts(searchKey, contactFilterOptions, nextPageNumber, pageSize);
    const contacts: Array<IContactDetail> = response?.data;

    dispatch({
      type: LOAD_MORE_CONTACTS,
      payload: {
        contacts,
        updatedPageNumber: currentPageNumber + 1,
        hasNextPage: response?.hasNextPage,
      },
    });

    dispatch(hideContentLoading());
  } catch (error) {
    dispatch(hideContentLoading());
    toast(error.message);
  }
};

export const searchWithFilterOptions = (contactFilterOptions: ContactFilterOptions) => async (
  dispatch: Dispatch<ContactSearchTypes>,
  getState: () => RootState
): Promise<void> => {
  dispatch(toggleContactListLoading(true));

  dispatch(setFilterOptions(contactFilterOptions));

  const { searchKey } = getState().contactSearch;
  try {
    const pageSize = PAGE_SIZE;
    const pageNumber = 1;
    const response = await contactsService.searchContacts(searchKey, contactFilterOptions, pageNumber, pageSize);
    const contacts: Array<IContactDetail> = response?.data;

    if (contacts && contacts.length <= 0) {
      dispatch(showEmptyRecords(searchKey));
    }

    dispatch({
      type: SEARCH_CONTACTS,
      payload: {
        contacts,
        hasNextPage: response?.hasNextPage,
        totalContacts: response?.total,
        searchKey: searchKey,
      },
    });
    dispatch(toggleContactListLoading(false));
  } catch (error) {
    dispatch(resetContactList());
    dispatch(toggleContactListLoading(false));
    toast(error.message);
  }
};

export const downloadContactList = () => async (
  dispatch: Dispatch<ContactSearchTypes>,
  getState: () => RootState
): Promise<void> => {
  dispatch(toggleContactListLoading(true));

  const { searchKey, contactFilterOptions } = getState().contactSearch;

  try {
    await contactsService.downloadContacts(searchKey, contactFilterOptions);

    dispatch(toggleContactListLoading(false));
  } catch (error) {
    dispatch(toggleContactListLoading(false));
    toast(error.message);
  }
};

export const setFilterOptions = (contactFilterOptions: ContactFilterOptions): SetFilterOptions => {
  return {
    type: SET_FILTER_OPTIONS,
    payload: {
      contactFilterOptions,
    },
  };
};

const showEmptyRecords = (searchKey: string): ShowEmptyRecords => ({
  type: SHOW_EMPTY_RECORDS,
  payload: {
    searchKey,
  },
});

export const hideEmptyRecords = (): HideEmptyRecords => ({
  type: HIDE_EMPTY_RECORDS,
});

const toggleContactListLoading = (isLoading: boolean): ToggleContactListLoading => ({
  type: TOGGLE_CONTACT_LIST_LOADING,
  payload: {
    isLoading,
  },
});

export const toggleSearchStartScreen = (isShown: boolean): ToggleSearchStartScreen => ({
  type: TOGGLE_SEARCH_START_SCREEN,
  payload: {
    isShown,
  },
});

export const toggleOpenedTab = (openedTab: string): ToggleOpenTab => ({
  type: TOGGLE_OPEN_TAB,
  payload: {
    openedTab,
  },
});

const showLoading = (): ShowLoading => ({
  type: SHOW_LOADING,
});

const hideLoading = (): HideLoading => ({
  type: HIDE_LOADING,
});

const showContentLoading = (): ShowContentLoading => ({
  type: SHOW_CONTENT_LOADING,
});

const hideContentLoading = (): HideContentLoading => ({
  type: HIDE_CONTENT_LOADING,
});

export const resetFilterOptions = (): ResetFilterOptions => ({
  type: RESET_FILTER_OPTIONS,
});

export const resetContactList = (): ResetContactList => ({
  type: RESET_CONTACT_LIST,
});
