import { TAB_KEYS } from './contact-search.constants';
import * as contactSearchAction from './contact-search.action';
import { ContactFilterOptions, IContactDetail } from './contact-search.types';

interface ContactSearchState {
  contacts: Array<IContactDetail>;
  searchKey: string;
  isRecordEmpty: boolean;
  isLoading: boolean;
  isContentLoading: boolean;
  hasNextPage: boolean;
  currentPageNumber: number;
  totalContacts: number;
  contactFilterOptions: ContactFilterOptions;
  isContactListLoading: boolean;
  isSearchStartShown: boolean;
  openedTab: string;
}

const initialState: ContactSearchState = {
  contacts: [],
  openedTab: TAB_KEYS.CONTACTS,
  searchKey: '',
  isRecordEmpty: false,
  isLoading: false,
  isContentLoading: false,
  hasNextPage: true,
  currentPageNumber: 1,
  totalContacts: 0,
  contactFilterOptions: {
    hasAttachments: null,
    hasClientResponses: null,
    startDate: null,
    endDate: null,
    sortOption: {
      sortField: null,
      sortDirection: null,
    },
  },
  isContactListLoading: false,
  isSearchStartShown: true,
};

const contactSearchReducer = (
  state = initialState,
  action: contactSearchAction.ContactSearchTypes
): ContactSearchState => {
  switch (action.type) {
    case contactSearchAction.SEARCH_CONTACTS:
      return {
        ...state,
        currentPageNumber: 1,
        isRecordEmpty: action.payload.contacts.length === 0,
        searchKey: action.payload.searchKey,
        hasNextPage: action.payload.hasNextPage,
        contacts: action.payload.contacts,
        totalContacts: action.payload.totalContacts,
        openedTab: TAB_KEYS.CONTACTS,
      };

    case contactSearchAction.LOAD_MORE_CONTACTS:
      return {
        ...state,
        contacts: [...state.contacts, ...action.payload.contacts],
        currentPageNumber: action.payload.updatedPageNumber,
        hasNextPage: action.payload.hasNextPage,
      };

    case contactSearchAction.SET_FILTER_OPTIONS:
      return {
        ...state,
        contactFilterOptions: action.payload.contactFilterOptions,
      };

    case contactSearchAction.RESET_FILTER_OPTIONS:
      return {
        ...state,
        contactFilterOptions: {
          hasAttachments: null,
          hasClientResponses: null,
          startDate: null,
          endDate: null,
          sortOption: {
            sortField: null,
            sortDirection: null,
          },
        },
      };

    case contactSearchAction.TOGGLE_CONTACT_LIST_LOADING:
      return {
        ...state,
        isContactListLoading: action.payload.isLoading,
      };

    case contactSearchAction.TOGGLE_SEARCH_START_SCREEN:
      return {
        ...state,
        isSearchStartShown: action.payload.isShown,
      };
    case contactSearchAction.TOGGLE_OPEN_TAB:
      return {
        ...state,
        openedTab: action.payload.openedTab,
      };

    case contactSearchAction.SHOW_EMPTY_RECORDS:
      return {
        ...state,
        isRecordEmpty: true,
      };

    case contactSearchAction.HIDE_EMPTY_RECORDS:
      return {
        ...state,
        isRecordEmpty: false,
      };

    case contactSearchAction.SHOW_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case contactSearchAction.HIDE_LOADING:
      return {
        ...state,
        isLoading: false,
      };

    case contactSearchAction.SHOW_CONTENT_LOADING:
      return {
        ...state,
        isContentLoading: true,
      };

    case contactSearchAction.HIDE_CONTENT_LOADING:
      return {
        ...state,
        isContentLoading: false,
      };

    case contactSearchAction.RESET_CONTACT_LIST:
      return {
        ...state,
        contacts: [],
        totalContacts: 0,
        currentPageNumber: 1,
        isSearchStartShown: true,
      };

    default:
      return state;
  }
};

export default contactSearchReducer;
