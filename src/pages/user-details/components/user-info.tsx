import { connect } from 'react-redux';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdChevronRight } from 'react-icons/md';

import { RootState } from 'src/reducers';
import { getRole } from 'src/utils/role';
import routes from 'src/constants/routes';
import { formatDate } from 'src/utils/date';
import { USER_ROLE } from 'src/constants/users';
import notification from 'src/utils/notification';
import { IUserDetails } from '../user-details.types';
import ActionDialog from 'src/components/action-dialog';
import NotFoundPage from 'src/components/page-not-found';
import AccessControl from 'src/components/access-control';
import * as userDetailAction from '../user-details.action';
import LoadingIndicator from 'src/components/loading-indicator';
import { ExistingSupervisorResponse } from '../user-details.types';
import RcSuccessToast from 'src/components/commons/rc-toast/rc-success-toast';
import { ActionType } from 'src/components/action-dialog/action-dialog.types';

interface StateProps {
  userId: string;
  isLoading: boolean;
  userDetails: IUserDetails;
  isReInvitationSuccess: boolean;
  fetchDepartmentOptions: () => void;
  fetchUserDetails: (id: string) => void;
  resendInvitation: (userId: string) => void;
  showEditUserDialog: () => void;
  showEditRoleDialog: () => void;
  showEditPhoneDialog: () => void;
  showMapDomainsDialog: () => void;
  showEditDepartmentDialog: () => void;
  showAssignSupervisorDialog: () => void;
}

const UserInfo = (props: StateProps) => {
  const { t } = useTranslation();
  const { userDetails } = props;

  const [isResendInvitationDialogOpen, toggleResendInvitationDialog] = useState<boolean>(false);

  const _closeResendInvitationDialog = () => toggleResendInvitationDialog(false);

  const _showResendInvitationDialog = () => toggleResendInvitationDialog(true);

  React.useEffect(() => {
    props.fetchDepartmentOptions();
    props.fetchUserDetails(props.userId);
  }, []);

  React.useEffect(() => {
    if (props.isReInvitationSuccess) {
      notification(
        <RcSuccessToast msg={t('userDetailPage.resendInvitation.success', { userEmail: userDetails.email })} />
      );
    }
  }, [props.isReInvitationSuccess]);

  const _handleResendInvitationConfirmation = () => {
    props.resendInvitation(userDetails.id);
    _closeResendInvitationDialog();
  };

  const UserInfoRow = (props: {
    label: string;
    value: string;
    editLabel?: string;
    handleEditClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  }) => (
    <React.Fragment>
      <div className="list-block__row d-flex">
        <div className="list-block__col col-3 px-0x">{props.label}</div>
        <div className="list-block__col col-7 col-value">{props.value || '-'}</div>
        <AccessControl allowedRoles={[USER_ROLE.ADMIN, USER_ROLE.SUPERVISOR]}>
          <div className="list-block__col col-2 px-0x col-last">
            <span className="link-cursor" onClick={props.handleEditClick}>
              {props.editLabel}
            </span>
          </div>
        </AccessControl>
      </div>
    </React.Fragment>
  );

  const getAdminButtonLabel = (fieldValue: string | string[]) => {
    if (getRole() !== USER_ROLE.ADMIN) return;

    return fieldValue && fieldValue.length ? t('userDetailPage.changeLabel') : t('userDetailPage.addLabel');
  };

  const getSupervisorButtonLabel = (fieldValue: any[], label: string) => {
    if (getRole() === USER_ROLE.ADMIN)
      return fieldValue.length ? t('userDetailPage.changeLabel') : t(`userDetailPage.${label}`);

    return fieldValue.length ? t('userDetailPage.viewLabel') : '';
  };

  const formatSupervisorList = (supervisors: Array<ExistingSupervisorResponse>): string => {
    if (!supervisors?.length) return t('userDetailPage.notAssignedLabel');

    let supervisor = supervisors[0].fullName;

    if (supervisors.length > 1) {
      supervisor += ` and ${supervisors.length - 1} more`;
    }
    return supervisor;
  };

  const SideBarComponent = () => {
    const dateString = formatDate(userDetails.createdOn);

    return (
      <div className="sidebar">
        <ul className="side-list">
          <li className="side-item">
            <span className="side-item__label">{t('userDetailPage.createdOn')} </span>
            <span className="side-item__main">{userDetails.createdOn ? dateString : ''}</span>
          </li>
          <li className="side-item">
            <span className="side-item__label">{t('userDetailPage.createdBy')}</span>
            <span className="side-item__main">
              {userDetails.createdBy ? userDetails.createdBy : t('userDetailPage.notAvailable')}
            </span>
          </li>
          <li className="side-item">
            <span className="side-item__label">{t('userDetailPage.lastLogin')}</span>
            <span className="side-item__main mb-1x">{userDetails.lastLogin}</span>
            {userDetails.hasSignedUp || (
              <span onClick={_showResendInvitationDialog} className="side-item__link">
                {t('userDetailPage.invitationLink')}
              </span>
            )}
          </li>
        </ul>
      </div>
    );
  };

  const UserInfo = () => {
    const fullName = [userDetails?.firstName, userDetails?.lastName].filter(Boolean).join(' ');

    return (
      <>
        <div className="breadcrumb">
          <Link to={routes.USERS} className="breadcrumb__item">
            {t('userDetailPage.userLabel')}
          </Link>
          <span className="breadcrumb__item">
            <MdChevronRight />
            {fullName}
          </span>
        </div>
        <div className="content-list">
          <h1>{fullName}</h1>
          <h4>
            {t('userDetailPage.aboutLabel')}
            {userDetails.firstName}
          </h4>
          <div className="list-block">
            <UserInfoRow
              label={t('userDetailPage.nameLabel')}
              value={fullName}
              editLabel={getAdminButtonLabel(fullName)}
              handleEditClick={props.showEditUserDialog}
            />
            <UserInfoRow label={t('userDetailPage.emailLabel')} value={userDetails.email} />
            <UserInfoRow
              label={t('userDetailPage.phoneLabel')}
              value={userDetails.phoneNumbers ? userDetails.phoneNumbers.join(', ') : ''}
              editLabel={getAdminButtonLabel(userDetails.phoneNumbers)}
              handleEditClick={props.showEditPhoneDialog}
            />
            <UserInfoRow
              label={t('userDetailPage.departmentLabel')}
              value={userDetails.department}
              editLabel={getAdminButtonLabel(userDetails.department)}
              handleEditClick={props.showEditDepartmentDialog}
            />
          </div>
        </div>
      </>
    );
  };

  const SupervisorInfo = () => (
    <div className="content-list">
      <h4
        style={{
          textTransform: 'uppercase',
        }}>
        {`${userDetails.firstName}'s`} {t('userDetailPage.supervisorLabel')}
      </h4>
      <p>
        {t('userDetailPage.supervisorInstruction')}
        <strong>{t('userDetailPage.supervisorInstruction2')}</strong>
      </p>
      <div className="list-block">
        <UserInfoRow
          label={t('userDetailPage.supervisorLabel')}
          value={formatSupervisorList(userDetails.supervisors)}
          editLabel={getSupervisorButtonLabel(userDetails.supervisors, 'assignLabel')}
          handleEditClick={props.showAssignSupervisorDialog}
        />
      </div>
    </div>
  );

  const RoleAndDomainInfo = () => (
    <>
      <div className="content-list">
        <h4 className="text-uppercase color-grey-50">
          {`${userDetails.firstName}'s`} {t('userDetailPage.roleAndPrivilegeLabel')}
        </h4>
        <div className="list-block">
          <UserInfoRow
            label={t('userDetailPage.roleLabel')}
            value={userDetails.role}
            editLabel={getAdminButtonLabel(userDetails.role)}
            handleEditClick={props.showEditRoleDialog}
          />
          <UserInfoRow
            label={t('userDetailPage.clientDomain')}
            value={
              userDetails.clientDomains
                ? `${userDetails.clientDomains.length} ${t('userDetailPage.domainMapped')}`
                : t('userDetailPage.addDomain')
            }
            editLabel={getSupervisorButtonLabel(userDetails.clientDomains, 'mapLabel')}
            handleEditClick={props.showMapDomainsDialog}
          />
        </div>
      </div>
    </>
  );

  const UserInfoComponent = () => (
    <div className="main">
      <UserInfo />
      <SupervisorInfo />
      <RoleAndDomainInfo />
    </div>
  );

  if (!userDetails.id && userDetails.isError) {
    return <NotFoundPage />;
  }

  if (props.isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <div className="content-wrap">
        <div className="container">
          <div className="columns-leftsidbar">
            <SideBarComponent />
            <UserInfoComponent />
          </div>
        </div>
      </div>
      <ActionDialog
        actionType={ActionType.CONFIRMATION}
        title={t('userDetailPage.resendInvitation.title')}
        description={t('userDetailPage.resendInvitation.description')}
        isOpen={isResendInvitationDialogOpen}
        onClose={_closeResendInvitationDialog}
        onContinue={_handleResendInvitationConfirmation}
      />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  userDetails: state.user.userDetails,
  isLoading: state.user.isLoading,
  isReInvitationSuccess: state.user.isReInvitationSuccess,
});

const mapDispatchToProps = (dispatch: Function) => ({
  fetchUserDetails: (id: string) => dispatch(userDetailAction.fetchUserDetails(id)),
  fetchDepartmentOptions: () => dispatch(userDetailAction.fetchDepartmentOptions()),
  resendInvitation: (userId: string) => dispatch(userDetailAction.resendInvitation(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
