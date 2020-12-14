import * as usageReportAction from './usage-report.action';
import { UsageReport } from 'src/entities/usage-report/types';

interface UsageReportInitialState {
  resetDateFilterToggle: boolean;
  usageReportList: Array<UsageReport>;
  hasNextPage: boolean;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  isLoadingUsageReport: boolean;
  isError: boolean;
  isNextPageLoading: boolean;
  sortField: string;
  sortDirection: string;
  startDate: string;
  endDate: string;
}

const initialState: UsageReportInitialState = {
  resetDateFilterToggle: false,
  usageReportList: [],
  hasNextPage: false,
  pageNumber: 1,
  pageSize: 10,
  totalCount: 0,
  isLoadingUsageReport: false,
  isError: false,
  isNextPageLoading: false,
  sortField: '',
  sortDirection: '',
  startDate: '',
  endDate: '',
};

const usageReportReducer = (
  state = initialState,
  action: usageReportAction.UsageReportActionType
): UsageReportInitialState => {
  switch (action.type) {
    case usageReportAction.FETCHING_USAGE_REPORT:
      return {
        ...state,
        isLoadingUsageReport: true,
      };

    case usageReportAction.NEXT_PAGE_LOADING:
      return {
        ...state,
        isNextPageLoading: true,
      };

    case usageReportAction.FETCH_USAGE_REPORT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoadingUsageReport: false,
        pageNumber: action.payload.pageNumber + 1,
      };

    case usageReportAction.LOAD_MORE_USAGE_REPORT:
      return {
        ...state,
        ...action.payload,
        isNextPageLoading: false,
        pageNumber: action.payload.pageNumber + 1,
      };

    case usageReportAction.FETCH_USAGE_REPORT_FAIL: {
      return {
        ...state,
        isLoadingUsageReport: false,
        isNextPageLoading: false,
        isError: true,
      };
    }

    case usageReportAction.RESET_USAGE_REPORT_DATE_FILTER: {
      return {
        ...state,
        resetDateFilterToggle: action.payload.isResetDateFilter,
      };
    }

    case usageReportAction.RESET_USAGE_REPORT_STATE: {
      return {
        ...state,
        usageReportList: [],
        hasNextPage: false,
        pageNumber: 1,
        pageSize: 10,
        totalCount: 0,
        isLoadingUsageReport: false,
        isError: false,
        isNextPageLoading: false,
      };
    }

    default:
      return { ...state };
  }
};

export default usageReportReducer;
