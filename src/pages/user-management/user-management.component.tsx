import { connect } from 'react-redux';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TableCellProps } from 'react-virtualized';
import { MdWeb, MdGetApp, MdPanTool, MdControlPoint, MdCloudDownload, MdArrowDropDown } from 'react-icons/md';

import { RootState } from 'src/reducers';
import routes from 'src/constants/routes';
import ToolTip from 'src/components/tool-tip';
import { interpolate } from 'src/utils/string';
import { USER_ROLE } from 'src/constants/users';
import AccessControl from 'src/components/access-control';
import * as UserManagementAction from './user-management.action';
import { getFormattedSupervisor } from './user-management.service';
import RcButtonGroup from 'src/components/commons/rc-button-group';
import RcPageContainer from 'src/components/commons/rc-page-container';
import UserListFilter, { ChangedInput, FilterFields } from './components/user-list-filter';
import TabularList, { TableHeader } from 'src/components/tabular-list/tabular-list.container';

interface StateProps {
  resetUserFilter: boolean;
  fetchUsersList: (params: any) => Promise<any>;
  extraFunctions?: any;
  downloadUserList: () => void;
  downloadUserClientDomainList: () => void;
  headerMetadata: Array<TableHeader>;
  triggerReloadItems: Boolean;
}

const filterButtons = {
  filterBtn: 'filterBtn',
  searchByEmailBtn: 'search',
  bulkMapBtn: 'bulkMapBtn',
  addUserBtn: 'addUserBtn',
};

const filterButtonKeys = [filterButtons.addUserBtn, filterButtons.bulkMapBtn];

function filterButtonBuilder(props: any) {
  return {
    [filterButtons.addUserBtn]: {
      name: filterButtons.addUserBtn,
      buttonTitle: 'Add Users',
      buttonIcon: () => <MdControlPoint />,
      buttonType: 'primary btn--light-purple',
      onClick: props.extraFunctions.onClickAddUser,
    },
    [filterButtons.bulkMapBtn]: {
      name: filterButtons.bulkMapBtn,
      buttonTitle: 'Bulk Map',
      buttonIcon: () => <MdWeb />,
      buttonType: 'grey',
      onClick: props.extraFunctions.onClickBlukMap,
    },
  };
}

const sortableColumns = ['user', 'email', 'clientDomainCount', 'lastActive'];

const UserManagement: React.FC<StateProps> = (props: any) => {
  const history = useHistory();
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [filterQuery, setFilterQuery] = useState<FilterFields>({});

  const { t } = useTranslation();

  const _handleRowClick = (rowData: any) => {
    history.push(interpolate(routes.USER_DETAILS, { id: rowData.id }));
  };

  const toggleDropDown = () => setShowDropDown((showDropDown) => !showDropDown);

  React.useEffect(() => {
    setFilterQuery({});
  }, [props.resetUserFilter]);

  const _tableCellRenderer = ({ cellData, dataKey, rowData }: TableCellProps) => {
    const { isSuppressed, isActive, hasSignedUp } = rowData;

    const UserCell = () => (
      <div>
        <span className="td-username text-ellipsis">
          <ToolTip description={cellData}>{cellData}</ToolTip>
        </span>
        {isSuppressed && (
          <span className="ml-1x color-tertiary-yellow-40">
            <ToolTip isAlwaysVisible description={t('tool-tip:suppressedUser')}>
              <MdPanTool />
            </ToolTip>
          </span>
        )}
        {!isActive && <span className="ml-1x color-grey-50">{'(inactive)'}</span>}
      </div>
    );

    const LastActiveCell = () => <div className={hasSignedUp ? '' : 'error-text'}>{cellData}</div>;

    const SupervisorCell = () => {
      const [firstSupervisor, remainingSupervisor] = getFormattedSupervisor(cellData);

      return (
        <div>
          {firstSupervisor !== '-' ? (
            <span className="td-supervisor text-ellipsis">
              <ToolTip description={firstSupervisor}>{firstSupervisor}</ToolTip>
            </span>
          ) : (
            <span className="td-supervisor text-ellipsis">{firstSupervisor}</span>
          )}
          {remainingSupervisor && (
            <div className="ml-1x">
              <ToolTip isAlwaysVisible description={remainingSupervisor.tooltipValue}>
                {remainingSupervisor.value}
              </ToolTip>
            </div>
          )}
        </div>
      );
    };

    switch (dataKey) {
      case 'user':
        return <UserCell />;
      case 'lastActive':
        return <LastActiveCell />;
      case 'supervisors':
        return <SupervisorCell />;
      default:
        return <ToolTip description={cellData}>{cellData}</ToolTip>;
    }
  };

  const onChangeFilterInput = (event: ChangedInput) => {
    setFilterQuery({
      ...filterQuery,
      [event.key]: event.value,
    });
  };

  const onClearFilter = () => {
    setFilterQuery({});
  };

  const filterButtonMap = filterButtonBuilder(props);
  const filterButtons = filterButtonKeys.map((key: string) => filterButtonMap[key]);
  const { fetchUsersList, headerMetadata, triggerReloadItems } = props;
  return (
    <RcPageContainer>
      <div className="page-heading">
        <h2>{t('userManagement.userManagement')}</h2>
        <AccessControl allowedRoles={[USER_ROLE.ADMIN]}>
          <div className="page-heading__right">
            <RcButtonGroup buttons={filterButtons} />

            <button
              onBlur={() => setShowDropDown(false)}
              className="btn btn--with-icon btn--primary btn--small ml-2x btn-dropdown btn-user-download"
              onClick={toggleDropDown}>
              <MdCloudDownload className="mr-2x icon-download" /> {t('userManagement.download')}
              <MdArrowDropDown className="ml-2x icon-caret-down" />
              {showDropDown && (
                <ul className="btn-dropdown__submenu">
                  <li onMouseDown={props.downloadUserList}>
                    <span className="submenu-link">{t('userManagement.userList')} </span>
                    <MdGetApp className="mr-2x" />
                  </li>
                  <li onMouseDown={props.downloadUserClientDomainList}>
                    <span className="submenu-link">{t('userManagement.clientDomainsMapping')}</span>
                    <MdGetApp className="mr-2x" />
                  </li>
                </ul>
              )}
            </button>
          </div>
        </AccessControl>
      </div>

      <UserListFilter
        handleOnInputChange={onChangeFilterInput}
        handleOnClear={onClearFilter}
        filterQuery={filterQuery}
      />
      <TabularList
        filterQuery={filterQuery}
        fetchItems={fetchUsersList}
        headerMetadata={headerMetadata}
        onRowClick={_handleRowClick}
        noContentMessage={t('userManagement.noUsersAvailable')}
        triggerReloadItems={triggerReloadItems}
        customCellRenderer={_tableCellRenderer}
        sortableColumns={sortableColumns}
      />
    </RcPageContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
  resetUserFilter: state.userManagement.isResetUserFilter,
});

const mapDispatchToProps = (dispatch: Function) => ({
  downloadUserList: () => dispatch(UserManagementAction.downloadUserList()),
  downloadUserClientDomainList: () => dispatch(UserManagementAction.downloadUserClientDomainList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
