import { connect } from 'react-redux';
import React, { useState } from 'react';

import { RootState } from 'src/reducers';
import { fetchUsersList } from 'src/services/users';
import { MODALS_NAME } from 'src/constants/constants';
import UserManagementUI from './user-management.component';
import RcAppModal from 'src/components/commons/rc-app-modal/rc-app-modal';
import * as rcModalActions from 'src/components/commons/rc-modal/rc-modal.actions';

const headerMetadata = [
  { label: 'User', key: 'user', isPrimaryColumn: true, width: 130 },
  { label: 'Email Address', key: 'email', width: 130 },
  { label: 'Role', key: 'role', disableSort: true },
  { label: 'Supervisor', key: 'supervisors', isPrimaryColumn: true, disableSort: true },
  { label: 'Client Domains', key: 'clientDomainCount' },
  { label: 'Last active', key: 'lastActive' },
];

interface UserManagement {
  currentModal: string;
  onToggleModal: (currentModal: rcModalActions.modalIState) => void;
}

const UserManagement = (props: any) => {
  const { onToggleModal, currentModal } = props;

  const [triggerReload, setTriggerReload] = useState<Boolean>(false);
  const [previousDialog, setPreviousDialog] = useState<string>();

  const onUploadComplete = () => {
    onToggleModal();
    setTriggerReload((prevState) => !prevState);
  };

  const extraFunctions = {
    onClickAddUser: () => {
      setPreviousDialog(MODALS_NAME.ADD_USER_MODAL);
      onToggleModal({
        currentModal: MODALS_NAME.ADD_USER_MODAL,
      });
    },
    onClickBlukMap: () => {
      setPreviousDialog(MODALS_NAME.BULK_DOMAIN_DIALOG);
      onToggleModal({
        currentModal: MODALS_NAME.BULK_DOMAIN_DIALOG,
      });
    },
  };

  const onUploadAgain = () => {
    onToggleModal({
      currentModal: previousDialog,
    });
  };

  return (
    <div className="content-wrap mt-8x">
      <UserManagementUI
        extraFunctions={extraFunctions}
        fetchUsersList={fetchUsersList}
        headerMetadata={headerMetadata}
        triggerReloadItems={triggerReload}
      />
      <RcAppModal
        currentModal={currentModal}
        onToggleModal={onToggleModal}
        onUploadComplete={onUploadComplete}
        onUploadAgain={onUploadAgain}
      />
    </div>
  );
};

function mapStateToProps(state: RootState) {
  return {
    currentModal: state.modal.currentModal,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    onToggleModal: (currentModal: rcModalActions.modalIState) => {
      dispatch(rcModalActions.toggleModal(currentModal));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
