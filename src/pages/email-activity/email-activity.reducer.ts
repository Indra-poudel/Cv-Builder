import { combineReducers } from 'redux';

import { EmailActivity } from 'src/services/email-activities';
import * as emailActivityAction from './email-activity.action';
import emailThreadReducer from './components/email-thread-dialog/email-thread-dialog.reducer';
import { PAGE_NUMBER, PAGE_SIZE } from './email-activity.constants';

interface EmailActivitiesInitialState {
  emailActivityList: Array<EmailActivity>;
  hasNextPage: boolean;
  pageNumber: number;
  pageSize: number;
  isLoading: boolean;
  isError: boolean;
  isNextPageLoading: boolean;
  searchKey: string;
  name: string;
  email: string;
  contactId: string;
}

const initialState: EmailActivitiesInitialState = {
  emailActivityList: [],
  hasNextPage: false,
  pageNumber: PAGE_NUMBER,
  pageSize: PAGE_SIZE,
  isLoading: false,
  isError: false,
  isNextPageLoading: false,
  searchKey: '',
  name: '',
  email: '',
  contactId: '',
};

const emailActivityReducer = (
  state = initialState,
  action: emailActivityAction.EmailActivityActionType
): EmailActivitiesInitialState => {
  switch (action.type) {
    case emailActivityAction.FETCHING_EMAIL_ACTIVITIES:
      return {
        ...state,
        isLoading: true,
      };

    case emailActivityAction.NEXT_PAGE_LOADING:
      return {
        ...state,
        isNextPageLoading: true,
      };

    case emailActivityAction.FETCH_EMAIL_ACTIVITIES_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        pageNumber: action.payload.pageNumber + 1,
      };

    case emailActivityAction.LOAD_MORE_EMAIL_ACTIVITIES:
      return {
        ...state,
        ...action.payload,
        isNextPageLoading: false,
        pageNumber: action.payload.pageNumber + 1,
      };

    case emailActivityAction.FETCH_EMAIL_ACTIVITIES_FAIL: {
      return {
        ...state,
        isLoading: false,
        isNextPageLoading: false,
        isError: true,
      };
    }

    case emailActivityAction.RESET_EMAIL_ACTIVITIES_STATE: {
      return {
        ...initialState,
      };
    }

    default:
      return { ...state };
  }
};

export default combineReducers({ emailActivity: emailActivityReducer, emailThread: emailThreadReducer });
