import { connect } from 'react-redux';
import React, { useState } from 'react';

import UserInfo from './user-info';
import { RootState } from 'src/reducers';
import UpdateNameDialog from './update-name-dialog';
import UpdateRoleDialog from './update-role-dialog';
import UpdatePhoneDialog from './update-phone-dialog';
import MapDomainsDialog from './map-client-domain-dialog';
import AssignSupervisorDialog from './assign-supervisor-dialog';
import UpdateDepartmentDialog from './update-department-dialog';
import RcAppModal from 'src/components/commons/rc-app-modal/rc-app-modal';
import * as rcModalActions from 'src/components/commons/rc-modal/rc-modal.actions';

interface StateProps {
  userId: string;
  currentModal: string | null;
  onToggleModal: (currentModal: rcModalActions.modalIState) => void;
}

const UserDetailsUi = (props: StateProps) => {
  const [isMapDomainsDialogOpen, toggleMapDomainsDialog] = useState<boolean>(false);
  const [isEditUserDialogOpen, toggleEditUserDialog] = useState<boolean>(false);
  const [isEditPhoneDialogOpen, toggleEditPhoneDialog] = useState<boolean>(false);
  const [isEditRoleDialogOpen, toggleEditRoleDialog] = useState<boolean>(false);
  const [isAssignSupervisorDialogOpen, toggleAssignSupervisorDialog] = useState<boolean>(false);
  const [isEditDepartmentDialogOpen, toggleEditDepartmentDialog] = useState<boolean>(false);

  const _closeMapDomainsDialog = () => toggleMapDomainsDialog(false);

  const _showMapDomainsDialog = () => toggleMapDomainsDialog(true);

  const _closeEditUserDialog = () => toggleEditUserDialog(false);

  const _showEditUserDialog = () => toggleEditUserDialog(true);

  const _closeEditPhoneDialog = () => toggleEditPhoneDialog(false);

  const _showEditPhoneDialog = () => toggleEditPhoneDialog(true);

  const _closeEditRoleDialog = () => toggleEditRoleDialog(false);

  const _showEditRoleDialog = () => toggleEditRoleDialog(true);

  const _closeEditDepartmentDialog = () => toggleEditDepartmentDialog(false);

  const _showEditDepartmentDialog = () => toggleEditDepartmentDialog(true);

  const _closeAssignSupervisorDialog = () => toggleAssignSupervisorDialog(false);

  const _showAssignSupervisorDialog = () => toggleAssignSupervisorDialog(true);

  return (
    <>
      <UserInfo
        userId={props.userId}
        showEditUserDialog={_showEditUserDialog}
        showEditRoleDialog={_showEditRoleDialog}
        showEditPhoneDialog={_showEditPhoneDialog}
        showEditDepartmentDialog={_showEditDepartmentDialog}
        showMapDomainsDialog={_showMapDomainsDialog}
        showAssignSupervisorDialog={_showAssignSupervisorDialog}
      />

      {isMapDomainsDialogOpen && (
        <MapDomainsDialog closeDialog={_closeMapDomainsDialog} isDialogOpen={isMapDomainsDialogOpen} />
      )}

      {isEditUserDialogOpen && (
        <UpdateNameDialog closeDialog={_closeEditUserDialog} isDialogOpen={isEditUserDialogOpen} />
      )}

      {isEditPhoneDialogOpen && (
        <UpdatePhoneDialog closeDialog={_closeEditPhoneDialog} isDialogOpen={isEditPhoneDialogOpen} />
      )}

      {isEditRoleDialogOpen && (
        <UpdateRoleDialog closeDialog={_closeEditRoleDialog} isDialogOpen={isEditRoleDialogOpen} />
      )}

      {isEditDepartmentDialogOpen && (
        <UpdateDepartmentDialog closeDialog={_closeEditDepartmentDialog} isDialogOpen={isEditDepartmentDialogOpen} />
      )}

      {isAssignSupervisorDialogOpen && (
        <AssignSupervisorDialog
          closeDialog={_closeAssignSupervisorDialog}
          isDialogOpen={isAssignSupervisorDialogOpen}
        />
      )}

      <RcAppModal enableUploadBtn={false} {...props} />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  currentModal: state.modal.currentModal,
});

const mapDispatchToProps = (dispatch: Function) => ({
  onToggleModal: (currentModal: rcModalActions.modalIState) => dispatch(rcModalActions.toggleModal(currentModal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsUi);
