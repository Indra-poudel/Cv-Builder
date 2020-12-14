import { Dispatch } from 'redux';
import { Moment } from 'moment';
import { RootState } from 'src/reducers';
import { UsageReport, UsageReportPayload } from 'src/entities/usage-report/types';
import { fetchUsageReport as getUsageReport, downloadUsageReports } from 'src/services/usage-report';

export const FETCHING_USAGE_REPORT = '@@action/USAGE_REPORT/FETCHING';
export const FETCH_USAGE_REPORT_FAIL = '@@action/USAGE_REPORT/FETCH_FAIL';
export const FETCH_USAGE_REPORT_SUCCESS = '@@action/USAGE_REPORT/FETCH_SUCCESS';
export const RESET_USAGE_REPORT_STATE = '@@action/USAGE_REPORT/RESET_STATE';
export const RESET_USAGE_REPORT_DATE_FILTER = '@@action/USAGE_REPORT/RESET_DATE';
export const LOAD_MORE_USAGE_REPORT = '@@action/USAGE_REPORT/LOAD_MORE';
export const NEXT_PAGE_LOADING = '@@action/USAGE_REPORT/NEXT_PAGE_LOADING';

interface UsageReportFetchSuccess {
  type: typeof FETCH_USAGE_REPORT_SUCCESS;
  payload: {
    hasNextPage: boolean;
    pageNumber: number;
    usageReportList: Array<UsageReport>;
  };
}

interface UsageReportFetching {
  type: typeof FETCHING_USAGE_REPORT;
}

interface UsageReportFetchFail {
  type: typeof FETCH_USAGE_REPORT_FAIL;
}

interface UsageReportResetState {
  type: typeof RESET_USAGE_REPORT_STATE;
}

interface UsageReportResetDateFilter {
  type: typeof RESET_USAGE_REPORT_DATE_FILTER;
  payload: {
    isResetDateFilter: boolean;
  };
}

interface UsageReportNextPageLoading {
  type: typeof NEXT_PAGE_LOADING;
}

interface LoadMoreUsageReport {
  type: typeof LOAD_MORE_USAGE_REPORT;
  payload: {
    hasNextPage: boolean;
    pageNumber: number;
    usageReportList: Array<UsageReport>;
  };
}

export type UsageReportActionType =
  | UsageReportFetching
  | UsageReportFetchSuccess
  | UsageReportFetchFail
  | UsageReportResetState
  | UsageReportResetDateFilter
  | UsageReportNextPageLoading
  | LoadMoreUsageReport;

export const fetchUsageReport = (usageReportPayload: UsageReportPayload) => async (
  dispatch: Dispatch<UsageReportActionType>
): Promise<void> => {
  try {
    dispatch({
      type: FETCHING_USAGE_REPORT,
    });

    const response = await getUsageReport(usageReportPayload);

    dispatch({
      type: FETCH_USAGE_REPORT_SUCCESS,
      payload: {
        hasNextPage: response.hasNextPage,
        pageNumber: response.pageNumber,
        usageReportList: response.data,
      },
    });
  } catch {
    dispatch({
      type: FETCH_USAGE_REPORT_FAIL,
    });
  }
};

export const loadMoreUsageReport = (pageNumber: number, pageSize: number) => async (
  dispatch: Dispatch<UsageReportActionType>,
  getState: () => RootState
): Promise<void> => {
  try {
    dispatch({
      type: NEXT_PAGE_LOADING,
    });

    const { usageReportList, startDate, endDate, sortField, sortDirection } = getState().usageReport;
    const usageReportPayload: UsageReportPayload = {
      pageNumber: pageNumber,
      pageSize: pageSize,
      startDate,
      endDate,
      sortField,
      sortDirection,
    };
    const response = await getUsageReport(usageReportPayload);

    dispatch({
      type: LOAD_MORE_USAGE_REPORT,
      payload: {
        hasNextPage: response.hasNextPage,
        pageNumber: response.pageNumber,
        usageReportList: [...usageReportList, ...response.data],
      },
    });
  } catch {
    dispatch({
      type: FETCH_USAGE_REPORT_FAIL,
    });
  }
};

export const resetUsageReportState = () => ({
  type: RESET_USAGE_REPORT_STATE,
});

export const downloadUsageReportList = (startDate: Moment, endDate: Moment) => async (): Promise<void> => {
  try {
    await downloadUsageReports(startDate, endDate);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const resetUsageReportDate = (isResetDateFilter: boolean) => ({
  type: RESET_USAGE_REPORT_DATE_FILTER,
  payload: {
    isResetDateFilter: isResetDateFilter,
  },
});
