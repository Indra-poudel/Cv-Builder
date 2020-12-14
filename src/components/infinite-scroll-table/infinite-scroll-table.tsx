import React from 'react';
import { isEmptyArray } from 'formik';
import { AutoSizer, InfiniteLoader, SortDirectionType, Table } from 'react-virtualized';

import LoadingIndicator from 'src/components/loading-indicator';

interface InfiniteScrollTableState {
  list: Array<any>;
  isError: boolean;
  pageNumber: number;
  isLoading: boolean;
  pageSize: number;
  totalCount?: number;
  hasNextPage: boolean;
  errorMessage?: string;
  defaultSortBy?: string;
  disableHeader?: boolean;
  emptyListMessage?: string;
  isNextPageLoading: boolean;
  onRowClick?: (rowData: any) => void;
  defaultSortDirection?: SortDirectionType;
  tableColumns: () => Array<React.ReactNode>;
  loadMoreListItem: (pageNumber: number, pageSize: number) => Promise<void>;
  handleSort?: (info: { sortBy: string; sortDirection: SortDirectionType }) => void;
}

interface IndexState {
  index: number;
}

const InfiniteLoadingTable = (props: InfiniteScrollTableState) => {
  const loadMoreRows = async () => {
    return props.isNextPageLoading ? () => {} : props.loadMoreListItem(props.pageNumber, props.pageSize);
  };

  const rowCount = props.hasNextPage ? props.list.length + 2 : props.list.length;

  const isRowLoaded = ({ index }: IndexState) => !props.hasNextPage || index < props.list.length;

  const handleRowClick = ({ rowData }: any) => props.onRowClick && props.onRowClick(rowData);

  const rowRenderer = ({ index }: IndexState) => {
    const content = isRowLoaded({ index }) ? props.list[index] : '';

    return content;
  };

  const tabularListContainerStyle = () => ({
    width: '100%',
    height: 'calc(100vh - 205px)',
  });

  const loader = () => {
    if (props.isError) return <div className="empty-table">{props.errorMessage}</div>;

    if (!props.isLoading && isEmptyArray(props.list))
      return <div className="empty-table">{props.emptyListMessage} </div>;

    return (
      <div className="empty-table">
        <LoadingIndicator />
      </div>
    );
  };

  return (
    <div className="table-responsive">
      <div className="table">
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMoreRows}
          threshold={2}
          rowCount={rowCount}
          style={tabularListContainerStyle()}>
          {({ onRowsRendered, registerChild }) => (
            <div style={tabularListContainerStyle()}>
              <AutoSizer>
                {({ width, height }) => (
                  <div>
                    <Table
                      ref={registerChild}
                      width={width}
                      height={height}
                      headerHeight={53}
                      disableHeader={props.disableHeader}
                      rowHeight={53}
                      rowClassName="table__row"
                      rowCount={rowCount}
                      rowStyle={{ borderBottom: '1px solid #E5E5E5' }}
                      onRowClick={handleRowClick}
                      sort={props.handleSort}
                      sortBy={props.defaultSortBy}
                      onRowsRendered={onRowsRendered}
                      sortDirection={props.defaultSortDirection}
                      noRowsRenderer={loader}
                      rowGetter={rowRenderer}>
                      {props.tableColumns()}
                    </Table>
                  </div>
                )}
              </AutoSizer>
            </div>
          )}
        </InfiniteLoader>
      </div>
    </div>
  );
};

export default InfiniteLoadingTable;
