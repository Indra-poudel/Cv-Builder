import { Moment } from 'moment';

import { SortDirection } from 'react-virtualized';
import queryParamUtils from 'src/utils/query-param';
import * as endpoints from 'src/constants/endpoints';
import * as downloadFileService from './download-files';
import { RecovoHttp } from 'src/services/axios-instance';
import usageReportEntity from 'src/entities/usage-report';
import { EXTENSION_TYPES } from 'src/constants/constants';
import { UsageReportList, UsageReportPayload } from 'src/entities/usage-report/types';

const getSortField = (sortField: string, sortDirection: string) => {
  if (sortDirection === SortDirection.DESC) {
    return '-' + sortField;
  }
  return sortField;
};

export const fetchUsageReport = async (usageReportPayload: UsageReportPayload): Promise<UsageReportList> => {
  const URL = `${endpoints.USAGE_REPORT}${queryParamUtils.stringfy({
    page: usageReportPayload.pageNumber,
    pageSize: usageReportPayload.pageSize,
    createdAtSince: usageReportPayload.startDate,
    createdAtUntil: usageReportPayload.endDate,
    sort: getSortField(usageReportPayload.sortField, usageReportPayload.sortDirection),
  })}`;

  const response = await RecovoHttp.get(URL);

  return {
    data: response.data.data.map(usageReportEntity.fromJson),
    hasNextPage: response.data.hasNextPage,
    pageSize: response.data.pageSize,
    pageNumber: response.data.page,
  };
};

export const downloadUsageReports = async (startDate: Moment, endDate: Moment) => {
  const startDateOnly = startDate.format('YYYY-MM-DD');
  const endDateOnly = endDate.format('YYYY-MM-DD');

  const downloadFileParams = {
    URL: `${endpoints.DOWNLOAD_USAGE_REPORT_LIST}?createdAtSince=${startDateOnly}&createdAtUntil=${endDateOnly}`,
    fileName: `usage${startDateOnly ? '_' + startDateOnly + '_' + endDateOnly : ''}`,
    fileExtension: EXTENSION_TYPES.CSV,
  };

  downloadFileService.downloadFile(downloadFileParams);
};
