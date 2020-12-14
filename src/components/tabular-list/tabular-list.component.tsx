import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import ContentLoader from 'react-content-loader';
import {
  AutoSizer,
  Column,
  Index,
  InfiniteLoader,
  SortDirection,
  SortDirectionType,
  SortIndicator,
  Table,
  TableCellProps,
  TableHeaderProps,
} from 'react-virtualized';
import { FaSort } from 'react-icons/fa';

import LoadingIndicator from '../loading-indicator';
import RcSortIcon from 'src/components/commons/rc-sort-icon';
import { TabularListItem, TableHeader } from './tabular-list.container';

interface StateProps {
  listItems: Array<TabularListItem>;
  headerMetadata: Array<TableHeader>;
  sort: ({ sortBy, sortDirection }: { sortBy: string; sortDirection: SortDirectionType }) => void;
  sortBy: string;
  sortDirection: SortDirectionType;
  loadMoreRows: () => any;
  isDataLoading: boolean;
  hasNextPage: boolean;
  onRowClick?: (rowData: TabularListItem) => void;
  noContentMessage?: string;
  sortableColumns: Array<String>;
  customCellRenderer?: (tableCellProps: TableCellProps) => ReactNode;
}

const TabularListUI = (props: StateProps) => {
  const { t } = useTranslation();
  const _headerRenderer = ({ label, dataKey, sortBy, sortDirection, columnData, disableSort }: TableHeaderProps) => {
    if (sortBy === dataKey)
      return (
        <>
          {label}
          {sortDirection === SortDirection.DESC ? (
            <RcSortIcon sortDirection={SortDirection.DESC} />
          ) : (
            <RcSortIcon sortDirection={SortDirection.ASC} />
          )}
        </>
      );
    return (
      <>
        {label}
        {!disableSort && <RcSortIcon />}
      </>
    );
  };

  const _handleRowClick = ({ rowData }: any) => props.onRowClick && props.onRowClick(rowData);

  const _getNoContentRenderer = () => {
    return (
      <div className="empty-table">
        <h3>{props.noContentMessage || t('tabularList.noRecordsAvailable')}</h3>
      </div>
    );
  };

  const _getTableColumns = (headerMetadata: Array<TableHeader>) =>
    headerMetadata.map((data: TableHeader, index) => {
      return (
        <Column
          key={index}
          width={data.width || 100}
          flexGrow={2}
          label={data.label}
          dataKey={data.key}
          columnData={headerMetadata}
          headerRenderer={_headerRenderer}
          disableSort={!!data.disableSort}
          className={data.isPrimaryColumn ? 'primary' : 'default'}
          cellRenderer={_tableCellRenderer}
        />
      );
    });

  const _tableCellRenderer = (tableCellProps: TableCellProps) =>
    props.customCellRenderer ? props.customCellRenderer(tableCellProps) : <div>{tableCellProps.cellData}</div>;

  const _getContentLoader = (isLoading: boolean) => {
    if (isLoading) {
      return (
        <ContentLoader>
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="15" />
          <rect x="0" y="30" rx="5" ry="5" width="100%" height="15" />
        </ContentLoader>
      );
    }
  };

  const _isRowLoaded = ({ index }: Index): boolean => !props.hasNextPage || !!props.listItems[index];

  const _tabularListContainerStyle = () => ({
    width: '100%',
    height: 'calc(100vh - 250px)',
  });

  // Total Number of rows in the list
  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const rowCount = props.hasNextPage ? props.listItems.length + 1 : props.listItems.length;

  return (
    <div className="table-responsive">
      <div className="table">
        {!!props.listItems && props.listItems.length <= 0 && props.isDataLoading ? (
          <LoadingIndicator />
        ) : (
          <InfiniteLoader
            isRowLoaded={_isRowLoaded}
            loadMoreRows={props.loadMoreRows}
            rowCount={rowCount}
            style={_tabularListContainerStyle()}>
            {({ onRowsRendered, registerChild }) => (
              <div style={_tabularListContainerStyle()}>
                <AutoSizer>
                  {({ width, height }) => (
                    <div>
                      <Table
                        ref={registerChild}
                        width={width}
                        height={height}
                        headerHeight={53}
                        rowHeight={53}
                        rowClassName="table__row"
                        rowCount={props.listItems.length}
                        rowStyle={{ borderBottom: '1px solid #E5E5E5' }}
                        sort={props.sort}
                        sortBy={props.sortBy}
                        onRowsRendered={onRowsRendered}
                        sortDirection={props.sortDirection}
                        onRowClick={_handleRowClick}
                        noRowsRenderer={_getNoContentRenderer}
                        rowGetter={({ index }) => props.listItems[index]}>
                        {_getTableColumns(props.headerMetadata)}
                      </Table>
                      {_getContentLoader(props.isDataLoading)}
                    </div>
                  )}
                </AutoSizer>
              </div>
            )}
          </InfiniteLoader>
        )}
      </div>
    </div>
  );
};

export default TabularListUI;
