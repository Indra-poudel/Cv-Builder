import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { USER_ROLE } from 'src/constants/users';
import UpdateNameDialog from './update-name-dialog';
import UpdatePhoneDialog from './update-phone-dialog';
import ClientDomainsDialog from './client-domains-dialog';
import { IAccountProfile } from '../account-profile.types';
import UpdateDepartmentDialog from './update-department-dialog';
import AssignSupervisorDialog from './assign-supervisor-dialog';
import { ExistingSupervisorResponse } from '../account-profile.types';

interface StateProps {
  userProfile: IAccountProfile;
}

const AccountProfileUi = (props: StateProps) => {
  const { t } = useTranslation(['account-page']);

  const { userProfile } = props;

  const [isEditUserDialogOpen, toggleEditUserDialog] = useState<boolean>(false);
  const [isEditPhoneDialogOpen, toggleEditPhoneDialog] = useState<boolean>(false);
  const [isEditDepartmentDialogOpen, toggleEditDepartmentDialog] = useState<boolean>(false);
  const [isClientDomainsDialogOpen, toggleClientDomainsDialog] = useState<boolean>(false);
  const [isAssignSupervisorDialogOpen, toggleAssignSupervisorDialog] = useState<boolean>(false);

  const _closeEditUserDialog = () => toggleEditUserDialog(false);

  const _showEditUserDialog = () => toggleEditUserDialog(true);

  const _closeEditPhoneDialog = () => toggleEditPhoneDialog(false);

  const _showEditPhoneDialog = () => toggleEditPhoneDialog(true);

  const _closeEditDepartmentDialog = () => toggleEditDepartmentDialog(false);

  const _showEditDepartmentDialog = () => toggleEditDepartmentDialog(true);

  const _closeClientDomainsDialog = () => toggleClientDomainsDialog(false);

  const _showClientDomainsDialog = () => toggleClientDomainsDialog(true);

  const _closeAssignSupervisorDialog = () => toggleAssignSupervisorDialog(false);

  const _showAssignSupervisorDialog = () => toggleAssignSupervisorDialog(true);

  const formatSupervisorList = (supervisors: Array<ExistingSupervisorResponse>): string => {
    if (!supervisors?.length) return t('account-page:profile.supervisor.label.notAssigned');

    let supervisor = supervisors[0].fullName;

    if (supervisors.length > 1) {
      supervisor += ` and ${supervisors.length - 1} more`;
    }
    return supervisor;
  };

  const getButtonLabel = (fieldValue: string | string[]): string => {
    if (userProfile.role !== USER_ROLE.ADMIN) return '';

    return fieldValue && fieldValue.length
      ? t('account-page:profile.label.change')
      : t('account-page:profile.label.add');
  };

  const RenderInfoRow = (props: {
    label: string;
    value: string;
    buttonLabel?: string;
    buttonClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  }) => (
    <React.Fragment>
      <div className="list-block__row d-flex">
        <div className="list-block__col col-3 px-0x">{props.label}</div>
        <div className="list-block__col col-7 col-value">{props.value || '-'}</div>
        <div className="list-block__col col-2 col-last px-0x">
          <span className="link-cursor" onClick={props.buttonClick}>
            {props.buttonLabel}
          </span>
        </div>
      </div>
    </React.Fragment>
  );

  const UserInfo = () => {
    const fullName = [userProfile?.firstName, userProfile?.lastName].filter(Boolean).join(' ');

    return (
      <>
        <div className="content-list">
          <h2>{fullName}</h2>
          <h4 className="sub-header">{t('account-page:profile.basicInformation.title')}</h4>
          <div className="list-block">
            <RenderInfoRow
              label={t('account-page:profile.basicInformation.label.name')}
              value={fullName}
              buttonLabel={userProfile.role === USER_ROLE.ADMIN ? t('account-page:profile.label.change') : ''}
              buttonClick={_showEditUserDialog}
            />
            <RenderInfoRow label={t('account-page:profile.basicInformation.label.email')} value={userProfile.email} />
            <RenderInfoRow
              label={t('account-page:profile.basicInformation.label.phone')}
              value={userProfile.phoneNumbers ? userProfile.phoneNumbers.join(', ') : ''}
              buttonLabel={getButtonLabel(userProfile.phoneNumbers)}
              buttonClick={_showEditPhoneDialog}
            />
            <RenderInfoRow
              label={t('account-page:profile.basicInformation.label.department')}
              value={userProfile.department}
              buttonLabel={getButtonLabel(userProfile.department)}
              buttonClick={_showEditDepartmentDialog}
            />
            <RenderInfoRow label={t('account-page:profile.basicInformation.label.role')} value={userProfile.role} />
          </div>
        </div>
      </>
    );
  };

  const SupervisorInfo = () => (
    <div className="content-list">
      <h4 className="sub-header">{t('account-page:profile.supervisor.title')}</h4>

      <div className="list-block">
        <RenderInfoRow
          label={t('account-page:profile.supervisor.label.supervisor')}
          value={formatSupervisorList(userProfile.supervisors)}
          buttonLabel={userProfile.supervisors?.length ? t('account-page:profile.label.view') : undefined}
          buttonClick={_showAssignSupervisorDialog}
        />
      </div>
    </div>
  );

  const ClientDomainInfo = () => (
    <>
      <div className="content-list">
        <h4 className="sub-header">{t('account-page:profile.clientDomain.title')}</h4>
        <div className="list-block">
          <RenderInfoRow
            label={t('account-page:profile.clientDomain.label.clientDomain')}
            value={t('account-page:profile.clientDomain.domainMapped', {
              number: userProfile.clientDomains ? userProfile.clientDomains.length : 0,
            })}
            buttonLabel={userProfile.clientDomains?.length ? t('account-page:profile.label.view') : undefined}
            buttonClick={_showClientDomainsDialog}
          />
        </div>
      </div>
    </>
  );

  return (
    <>
      <UserInfo />
      <SupervisorInfo />
      <ClientDomainInfo />
      <UpdateNameDialog
        closeDialog={_closeEditUserDialog}
        firstName={userProfile.firstName}
        isDialogOpen={isEditUserDialogOpen}
        lastName={userProfile.lastName}
      />
      <UpdatePhoneDialog
        closeDialog={_closeEditPhoneDialog}
        isDialogOpen={isEditPhoneDialogOpen}
        phoneNumbers={userProfile.phoneNumbers}
      />
      <UpdateDepartmentDialog
        closeDialog={_closeEditDepartmentDialog}
        isDialogOpen={isEditDepartmentDialogOpen}
        department={{ value: userProfile.departmentKey, label: userProfile.department }}
      />
      <ClientDomainsDialog
        clientDomains={userProfile.clientDomains ? userProfile.clientDomains : []}
        closeDialog={_closeClientDomainsDialog}
        isDialogOpen={isClientDomainsDialogOpen}
      />
      <AssignSupervisorDialog closeDialog={_closeAssignSupervisorDialog} isDialogOpen={isAssignSupervisorDialogOpen} />
    </>
  );
};

export default AccountProfileUi;
