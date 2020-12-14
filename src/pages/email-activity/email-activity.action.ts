import { Dispatch } from 'redux';
import { RootState } from 'src/reducers';
import { fetchEmailActivities, EmailActivity, EmailActivityPayload } from 'src/services/email-activities';

export const FETCHING_EMAIL_ACTIVITIES = '@@action/EMAIL_ACTIVITIES/FETCHING';
export const FETCH_EMAIL_ACTIVITIES_FAIL = '@@action/EMAIL_ACTIVITIES/FETCH_FAIL';
export const FETCH_EMAIL_ACTIVITIES_SUCCESS = '@@action/EMAIL_ACTIVITIES/FETCH_SUCCESS';
export const RESET_EMAIL_ACTIVITIES_STATE = '@@action/EMAIL_ACTIVITIES/RESET_STATE';
export const LOAD_MORE_EMAIL_ACTIVITIES = '@@action/EMAIL_ACTIVITIES/LOAD_MORE';
export const NEXT_PAGE_LOADING = '@@action/EMAIL_ACTIVITIES/NEXT_PAGE_LOADING';

interface EmailActivityFetchSuccess {
  type: typeof FETCH_EMAIL_ACTIVITIES_SUCCESS;
  payload: {
    emailActivityList: Array<EmailActivity>;
    hasNextPage: boolean;
    pageNumber: number;
    pageSize: number;
    email: string;
    name: string;
  };
}

interface EmailActivityFetching {
  type: typeof FETCHING_EMAIL_ACTIVITIES;
}

interface EmailActivityResetState {
  type: typeof RESET_EMAIL_ACTIVITIES_STATE;
}

interface EmailActivityFetchFail {
  type: typeof FETCH_EMAIL_ACTIVITIES_FAIL;
}

interface EmailActivityNextPageLoading {
  type: typeof NEXT_PAGE_LOADING;
}

interface LoadMoreEmailActivity {
  type: typeof LOAD_MORE_EMAIL_ACTIVITIES;
  payload: {
    emailActivityList: Array<EmailActivity>;
    hasNextPage: boolean;
    pageNumber: number;
    pageSize: number;
  };
}

export type EmailActivityActionType =
  | EmailActivityFetching
  | EmailActivityFetchSuccess
  | EmailActivityFetchFail
  | EmailActivityResetState
  | EmailActivityNextPageLoading
  | LoadMoreEmailActivity;

export const fetchEmails = (emailActivityPayload: EmailActivityPayload) => async (
  dispatch: Dispatch<EmailActivityActionType>
): Promise<void> => {
  try {
    dispatch({
      type: FETCHING_EMAIL_ACTIVITIES,
    });

    const response = await fetchEmailActivities(emailActivityPayload);

    dispatch({
      type: FETCH_EMAIL_ACTIVITIES_SUCCESS,
      payload: {
        emailActivityList: response.data,
        hasNextPage: response.hasNextPage,
        pageNumber: response.pageNumber,
        pageSize: response.pageSize,
        email: response.email,
        name: response.name,
        searchKey: emailActivityPayload.searchKey,
        contactId: emailActivityPayload.contactId,
      },
    });
  } catch (error) {
    dispatch({
      type: FETCH_EMAIL_ACTIVITIES_FAIL,
    });
  }
};

export const loadMoreEmailActivity = (pageNumber: number, pageSize: number) => async (
  dispatch: Dispatch<EmailActivityActionType>,
  getState: () => RootState
): Promise<void> => {
  try {
    dispatch({
      type: NEXT_PAGE_LOADING,
    });

    const { searchKey, emailActivityList, contactId } = getState().emailActivitySearch.emailActivity;

    const emailPayload: EmailActivityPayload = {
      contactId,
      page: pageNumber,
      pageSize: pageSize,
      searchKey,
    };

    const response = await fetchEmailActivities(emailPayload);

    dispatch({
      type: LOAD_MORE_EMAIL_ACTIVITIES,
      payload: {
        pageSize: response.pageSize,
        pageNumber: response.pageNumber,
        hasNextPage: response.hasNextPage,
        emailActivityList: [...emailActivityList, ...response.data],
      },
    });
  } catch {
    dispatch({
      type: FETCH_EMAIL_ACTIVITIES_FAIL,
    });
  }
};

export const resetUsageReportDate = () => ({
  type: RESET_EMAIL_ACTIVITIES_STATE,
});
