import { Moment } from 'moment';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ContentLoader from 'react-content-loader';
import { Column, SortDirection, SortDirectionType, TableCellProps, TableHeaderProps } from 'react-virtualized';

import { RootState } from 'src/reducers';
import ToolTip from 'src/components/tool-tip';
import { dateFormat } from 'src/constants/date';
import { usageReportKey } from 'src/constants/usage-report';
import RcSortIcon from 'src/components/commons/rc-sort-icon';
import InfiniteScrollTable from 'src/components/infinite-scroll-table';
import * as usageReportAction from 'src/pages/usage-report/usage-report.action';
import { UsageReport, UsageReportPayload } from 'src/entities/usage-report/types';

interface UsageReportState {
  startDate: Moment;
  endDate: Moment;
  isError: boolean;
  pageNumber: number;
  totalCount: number;
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  isLoading: boolean;
  usageReportList: Array<UsageReport>;
  resetUsageReportState: () => void;
  fetchUsageReport: (usageReportPayload: UsageReportPayload) => Promise<void>;
  loadMoreUsageReport: (pageNumber: number, pageSize: number) => Promise<void>;
}

const PAGE_NUMBER = 1;
const PAGE_SIZE = 10;

const UsageReportTable = (props: UsageReportState) => {
  const { t } = useTranslation('usage-report');

  const [defaultSortBy, setSortBy] = useState<string>(usageReportKey.name);
  const [defaultSortDirection, setSortDirection] = useState<SortDirectionType>(SortDirection.ASC);

  React.useEffect(() => {
    props.resetUsageReportState();
    props.fetchUsageReport({
      pageNumber: PAGE_NUMBER,
      pageSize: PAGE_SIZE,
      startDate: props.startDate.format(dateFormat.YYYY_MM_DD),
      endDate: props.endDate.format(dateFormat.YYYY_MM_DD),
      sortField: defaultSortBy === usageReportKey.name ? usageReportKey.firstName : defaultSortBy,
      sortDirection: defaultSortDirection,
    });
  }, [props.startDate, props.endDate, defaultSortBy, defaultSortDirection]);

  const headerMetadata = [
    { label: t('usage-report:headerLabel.name'), key: usageReportKey.name, width: 120, sortable: true },
    { label: t('usage-report:headerLabel.email'), key: usageReportKey.email, width: 160, sortable: true },
    { label: t('usage-report:headerLabel.role'), key: usageReportKey.role, width: 50, sortable: false },
    { label: t('usage-report:headerLabel.department'), key: usageReportKey.department, width: 100, sortable: true },
    { label: t('usage-report:headerLabel.lastSearch'), key: usageReportKey.lastSearch, width: 100, sortable: true },
    { label: t('usage-report:headerLabel.searches'), key: usageReportKey.searches, width: 80, sortable: true },
    {
      label: t('usage-report:headerLabel.contactExports'),
      key: usageReportKey.contactExports,
      width: 150,
      sortable: true,
    },
    {
      label: t('usage-report:headerLabel.attachmentExports'),
      key: usageReportKey.attachmentExports,
      width: 150,
      sortable: true,
    },
  ];

  const isRowLoaded = ({ index }: { index: number }) => !props.hasNextPage || index < props.usageReportList.length;

  const handleSort = ({ sortBy, sortDirection }: { sortBy: string; sortDirection: SortDirectionType }) => {
    setSortBy(sortBy);
    setSortDirection(sortDirection);
  };

  const headerRender = (headerInfo: TableHeaderProps) => {
    if (headerInfo.sortBy === headerInfo.dataKey)
      return (
        <>
          {headerInfo.label}
          {headerInfo.sortDirection === SortDirection.DESC ? (
            <RcSortIcon sortDirection={SortDirection.DESC} />
          ) : (
            <RcSortIcon sortDirection={SortDirection.ASC} />
          )}
        </>
      );
    return (
      <>
        {headerInfo.label}
        {!headerInfo.disableSort && <RcSortIcon />}
      </>
    );
  };

  const cellRender = (cellInfo: TableCellProps) => {
    if (!isRowLoaded({ index: cellInfo.rowIndex })) {
      return (
        <ContentLoader>
          <rect x="0" y="70" rx="5" ry="5" width="100%" height="15" />
        </ContentLoader>
      );
    }

    if (
      cellInfo.dataKey === usageReportKey.name ||
      cellInfo.dataKey === usageReportKey.email ||
      cellInfo.dataKey === usageReportKey.role ||
      cellInfo.dataKey === usageReportKey.department ||
      cellInfo.dataKey === usageReportKey.lastSearch
    )
      return (
        <div>
          <ToolTip description={cellInfo.cellData}>{cellInfo.cellData}</ToolTip>
        </div>
      );

    return (
      <div className="text-center">
        <ToolTip description={cellInfo.cellData}>{cellInfo.cellData}</ToolTip>
      </div>
    );
  };

  const tableColumns = () =>
    headerMetadata.map((data) => {
      const disableSort = props.isLoading || props.isNextPageLoading ? true : !data.sortable;
      return (
        <Column
          key={data.key}
          flexGrow={1}
          width={data.width}
          label={data.label}
          disableSort={disableSort}
          dataKey={data.key}
          columnData={headerMetadata}
          headerRenderer={headerRender}
          cellRenderer={cellRender}
        />
      );
    });

  return (
    <InfiniteScrollTable
      {...props}
      pageSize={PAGE_SIZE}
      errorMessage={t('usage-report:errorMessage')}
      emptyListMessage={t('usage-report:emptyList')}
      tableColumns={tableColumns}
      loadMoreListItem={props.loadMoreUsageReport}
      list={props.usageReportList}
      defaultSortBy={defaultSortBy}
      defaultSortDirection={defaultSortDirection}
      handleSort={handleSort}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  usageReportList: state.usageReport.usageReportList,
  hasNextPage: state.usageReport.hasNextPage,
  isLoading: state.usageReport.isLoadingUsageReport,
  pageNumber: state.usageReport.pageNumber,
  totalCount: state.usageReport.totalCount,
  isError: state.usageReport.isError,
  isNextPageLoading: state.usageReport.isNextPageLoading,
});

const mapDispatchToProps = (dispatch: Function) => ({
  resetUsageReportState: () => dispatch(usageReportAction.resetUsageReportState()),
  fetchUsageReport: (usageReportPayload: UsageReportPayload) =>
    dispatch(usageReportAction.fetchUsageReport(usageReportPayload)),
  loadMoreUsageReport: (pageNumber: number, pageSize: number) =>
    dispatch(usageReportAction.loadMoreUsageReport(pageNumber, pageSize)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsageReportTable);
