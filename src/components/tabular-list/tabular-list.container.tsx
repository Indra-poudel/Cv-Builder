import { useTranslation } from 'react-i18next';
import React, { ReactNode, useEffect, useState } from 'react';
import { SortDirection, SortDirectionType, TableCellProps } from 'react-virtualized';

import config from 'src/config';
import TabularListUI from './tabular-list.component';

export interface TabularListItem {
  id: number;
  [key: string]: any;
}

// Metadata for column header's label to be displayed and key from which the value is taken
export interface TableHeader {
  label: string;
  isPrimaryColumn?: boolean;
  key: string;
  disableSort?: boolean;
  width?: number;
}

interface StateProps {
  headerMetadata: Array<TableHeader>;
  fetchItems: (params: any) => Promise<any>;
  onRowClick?: (rowData: TabularListItem) => void;
  noContentMessage: string;
  triggerReloadItems: Boolean;
  filterQuery: Object;
  defaultSortBy?: string;
  defaultSortDirection?: SortDirectionType;
  sortableColumns: Array<String>;
  customCellRenderer?: (tableCellProps: TableCellProps) => ReactNode;
}

const TabularList = (props: StateProps) => {
  const { fetchItems, triggerReloadItems, ...otherProps } = props;
  const { t } = useTranslation();

  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
  const [isNextPageLoading, setNextPageLoading] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>(props.defaultSortBy || '');
  const [sortDirection, setSortDirection] = useState<SortDirectionType>(
    props.defaultSortDirection || SortDirection.ASC
  );
  const [listItems, setListItems] = useState<Array<TabularListItem>>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);

  useEffect(() => {
    setListItems([]);
    setHasNextPage(true);
    setCurrentPageNumber(0);
    _loadItems();
  }, [triggerReloadItems]);

  useEffect(() => {
    if (isNextPageLoading) {
      _setListItems();
    }
  }, [isNextPageLoading]);

  useEffect(() => {
    setListItems([]);
    setHasNextPage(true);
    setCurrentPageNumber(0);
    _loadItems();
  }, [props.filterQuery]);

  const _setListItems = async () => {
    const nextPageNumber = currentPageNumber + 1;
    // For handling infinite loading when sorting is present
    let newListItems: any = [];
    try {
      newListItems = !!sortBy
        ? await fetchItems({
            page: nextPageNumber,
            sortDirection: sortDirection,
            sortField: sortBy,
            ...props.filterQuery,
          })
        : await fetchItems({ page: nextPageNumber, ...props.filterQuery });
      setError(false);
    } catch {
      setError(true);
    }
    const updatedListItems = listItems.concat(newListItems);

    newListItems.length < config.listSize && setHasNextPage(false);
    setCurrentPageNumber(nextPageNumber);
    setNextPageLoading(false);
    setListItems(updatedListItems);
  };

  const _loadItems = async () => {
    if (isNextPageLoading) {
      return;
    }
    setNextPageLoading(true);
  };

  const _handleSort = async ({ sortBy, sortDirection }: { sortBy: string; sortDirection: SortDirectionType }) => {
    !hasNextPage && setHasNextPage(true);
    const pageNumber = 1;
    const newListItems = await fetchItems({
      page: pageNumber,
      sortDirection: sortDirection,
      sortField: sortBy,
      ...props.filterQuery,
    });

    setNextPageLoading(false);
    setCurrentPageNumber(pageNumber);
    setSortBy(sortBy);
    setSortDirection(sortDirection);
    setListItems(newListItems);
    _loadItems();
  };

  if (isError)
    return (
      <div className="content-center text-center">
        <h3 className="sub-header">{t('errorMessage.error')}</h3>
      </div>
    );

  return (
    <TabularListUI
      hasNextPage={hasNextPage}
      sort={_handleSort}
      sortBy={sortBy}
      listItems={listItems}
      sortDirection={sortDirection}
      loadMoreRows={_loadItems}
      isDataLoading={isNextPageLoading}
      {...otherProps}
    />
  );
};

export default TabularList;
