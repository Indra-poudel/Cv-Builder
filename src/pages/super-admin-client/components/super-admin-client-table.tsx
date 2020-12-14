import {
  Table,
  Column,
  AutoSizer,
  SortDirection,
  TableCellProps,
  TableHeaderProps,
  SortDirectionType,
} from 'react-virtualized';
import { connect } from 'react-redux';
import { isEmptyArray } from 'formik';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ContentLoader from 'react-content-loader';

import { RootState } from 'src/reducers';
import routes from 'src/constants/routes';
import ToolTip from 'src/components/tool-tip';
import { interpolate } from 'src/utils/string';
import RcSortIcon from 'src/components/commons/rc-sort-icon';
import LoadingIndicator from 'src/components/loading-indicator';
import * as superAdminClientAction from '../super-admin-client.action';
import { SuperAdminClient } from 'src/entities/super-admin-client/types';
import { superAdminClientKey, sortFieldKey } from '../super-admin-client.constant';

interface SuperAdminClientState {
  isError: boolean;
  isLoading: boolean;
  superAdminClientList: Array<SuperAdminClient>;
  resetSuperAdminClientState: () => void;
  fetchSuperAdminClient: () => Promise<void>;
  sortClientList: (sortField: string, sortDirection: string) => Promise<void>;
}

const SuperAdminClientTable = (props: SuperAdminClientState) => {
  const history = useHistory();
  const { t } = useTranslation();

  const [defaultSortBy, setSortBy] = useState<string>(superAdminClientKey.client);
  const [defaultSortDirection, setSortDirection] = useState<SortDirectionType>(SortDirection.ASC);

  React.useEffect(() => {
    props.resetSuperAdminClientState();
    props.fetchSuperAdminClient();
  }, [defaultSortBy, defaultSortDirection]);

  const headerMetadata = [
    { label: t('super-admin-client:headerLabel.client'), key: superAdminClientKey.client, width: 120 },
    {
      label: t('super-admin-client:headerLabel.clientAdmin'),
      key: superAdminClientKey.clientAdmin,
      width: 120,
    },
    {
      label: t('super-admin-client:headerLabel.clientEmail'),
      key: superAdminClientKey.clientEmail,
      width: 150,
    },
    { label: t('super-admin-client:headerLabel.status'), key: superAdminClientKey.status, width: 80, sortable: true },
    {
      label: t('super-admin-client:headerLabel.supervisors'),
      key: superAdminClientKey.supervisors,
      width: 80,
    },
    { label: t('super-admin-client:headerLabel.users'), key: superAdminClientKey.users, width: 80, sortable: true },
    {
      label: t('super-admin-client:headerLabel.activeUsers'),
      key: superAdminClientKey.activeUsers,
      width: 120,
    },
    {
      label: t('super-admin-client:headerLabel.totalProviderUsers'),
      key: superAdminClientKey.providerUsers,
      width: 120,
    },
  ];

  const handleSort = ({ sortBy, sortDirection }: { sortBy: string; sortDirection: SortDirectionType }) => {
    setSortBy(sortBy);
    setSortDirection(sortDirection);

    const sortField = sortFieldKey[sortBy];
    props.sortClientList(sortField, sortDirection);
  };

  const handleRowClick = ({ rowData }: { rowData: SuperAdminClient }) => {
    history.push(interpolate(routes.SUPER_ADMIN_CLIENT_DETAILS, { id: rowData.id }));
  };

  const isRowLoaded = ({ index }: { index: number }) => index < props.superAdminClientList.length;

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
        <RcSortIcon />
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

    if (cellInfo.dataKey === superAdminClientKey.client)
      return (
        <div>
          <ToolTip description={cellInfo.cellData}>{cellInfo.cellData}</ToolTip>
        </div>
      );

    if (cellInfo.dataKey === superAdminClientKey.status) {
      let className = cellInfo.cellData === 'Active' ? 'color-secondary-base' : 'color-grey-50';
      return (
        <div>
          <span className={className}>
            <ToolTip description={cellInfo.cellData}>{cellInfo.cellData}</ToolTip>
          </span>
        </div>
      );
    }

    return (
      <div>
        <ToolTip description={cellInfo.cellData}>{cellInfo.cellData}</ToolTip>
      </div>
    );
  };

  const tableColumns = () =>
    headerMetadata.map((data) => {
      return (
        <Column
          key={data.key}
          flexGrow={1}
          width={data.width}
          label={data.label}
          dataKey={data.key}
          columnData={headerMetadata}
          headerRenderer={headerRender}
          cellRenderer={cellRender}
        />
      );
    });

  const loader = () => {
    if (props.isError) return <div className="empty-table">{t('usage-report:errorMessage')}</div>;

    if (!props.isLoading && isEmptyArray(props.superAdminClientList))
      return <div className="empty-table">{t('usage-report:emptyList')} </div>;

    return (
      <div className="empty-table">
        <LoadingIndicator />
      </div>
    );
  };

  const tabularListContainerStyle = () => ({
    width: '100%',
    height: 'calc(100vh - 205px)',
  });

  return (
    <div style={tabularListContainerStyle()}>
      <AutoSizer>
        {({ width, height }) => (
          <div>
            <Table
              width={width}
              height={height}
              headerHeight={53}
              rowHeight={53}
              rowClassName="table__row"
              rowCount={props.superAdminClientList.length}
              rowStyle={{ borderBottom: '1px solid #E5E5E5' }}
              onRowClick={handleRowClick}
              sort={handleSort}
              sortBy={defaultSortBy}
              sortDirection={defaultSortDirection}
              noRowsRenderer={loader}
              rowGetter={({ index }) => props.superAdminClientList[index]}>
              {tableColumns()}
            </Table>
          </div>
        )}
      </AutoSizer>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  superAdminClientList: state.superAdminClient.clientList.superAdminClientList,
  isLoading: state.superAdminClient.clientList.isLoadingSuperAdminClient,
  isError: state.superAdminClient.clientList.isError,
});

const mapDispatchToProps = (dispatch: Function) => ({
  resetSuperAdminClientState: () => dispatch(superAdminClientAction.resetSuperAdminClientState()),
  fetchSuperAdminClient: () => dispatch(superAdminClientAction.fetchSuperAdminClient()),
  sortClientList: (sortField: string, sortDirection: string) =>
    dispatch(superAdminClientAction.sortSuperAdminClientList(sortField, sortDirection)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SuperAdminClientTable);
