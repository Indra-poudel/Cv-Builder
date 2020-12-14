import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { MdDelete, MdPerson } from 'react-icons/md';
import { OptionTypeBase, ValueType } from 'react-select';

import { RootState } from 'src/reducers';
import { getRole } from 'src/utils/role';
import ToolTip from 'src/components/tool-tip';
import { USER_ROLE } from 'src/constants/users';
import { loadingWhite } from 'src/assets/images';
import notification from 'src/utils/notification';
import AccessControl from 'src/components/access-control';
import * as userDetailsAction from '../user-details.action';
import ManualAddInput from 'src/components/manual-add-input';
import ConfirmationDialog from 'src/components/action-dialog';
import LoadingIndicator from 'src/components/loading-indicator';
import RcButton from 'src/components/commons/rc-button/rc-button';
import { ExistingSupervisorResponse } from '../user-details.types';
import { validateSupervisorEmail } from 'src/services/validate-user';
import { formatSupervisorSuggestions } from '../user-details.service';
import { fetchSupervisorSuggestions } from 'src/services/user-details';
import RightFloatingDialog from 'src/components/right-floating-dialog';
import RcFailureToast from 'src/components/commons/rc-toast/rc-failure-toast';
import RcSuccessToast from 'src/components/commons/rc-toast/rc-success-toast';
import { ActionType } from 'src/components/action-dialog/action-dialog.types';
import ManualAddInputOptions from 'src/components/manual-add-input/manual-add-input.types';

interface StateProps {
  userId: string;
  isLoading: boolean;
  isDialogOpen: boolean;
  closeDialog: () => void;
  isAssigningSupervisor: boolean;
  fetchUserDetails: (id: string) => void;
  supervisors: Array<ExistingSupervisorResponse>;
  deleteExistingSupervisor: (id: number, supervisorEmail: string) => Promise<boolean>;
  assignSupervisors: (supervisorEmails: Array<string>, userId: string) => Promise<boolean>;
}

const AssignSupervisorDialog = (props: StateProps) => {
  const { t } = useTranslation(['assign-supervisor-dialog']);
  const [selectedEmails, setSelectedEmails] = React.useState<ValueType<OptionTypeBase>>([]);
  const [selectSupervisor, setSelectedSuperVisor] = React.useState<ExistingSupervisorResponse>();

  const [isConfirmationOpen, toggleConfirmationDialog] = React.useState<boolean>(false);
  const closeConfirmationDialog = () => toggleConfirmationDialog(false);
  const showConfirmationDialog = () => toggleConfirmationDialog(true);

  const _onSupervisorsAdded = (value: ValueType<OptionTypeBase>) => setSelectedEmails(value);

  const _getSupervisorSuggestions = async (searchKey: string) => {
    const supervisorSuggestions = await fetchSupervisorSuggestions(props.userId, searchKey);

    return formatSupervisorSuggestions(supervisorSuggestions);
  };

  const checkInvalidEmail = (email: ManualAddInputOptions) => !email.isValid;

  const resetSelectedEmails = () => setSelectedEmails([]);

  const isAdmin = () => getRole() === USER_ROLE.ADMIN;

  const isAddBtnDisabled = !!selectedEmails?.length && !selectedEmails?.some(checkInvalidEmail);

  const onClickAddToList = () => {
    const emails = selectedEmails?.map((selectedEmail: ManualAddInputOptions) => selectedEmail.value);

    props
      .assignSupervisors(emails, props.userId)
      .then(() => {
        resetSelectedEmails();
        props.fetchUserDetails(props.userId);
        notification(<RcSuccessToast msg={t('assign-supervisor-dialog:toast.assignSuccess')} />);
      })
      .catch(() => {
        resetSelectedEmails();
        notification(<RcFailureToast primaryMsg={t('assign-supervisor-dialog:toast.fail')} />);
      });
  };

  const onDeleteExistingSupervisor = (supervisor: ExistingSupervisorResponse) => {
    showConfirmationDialog();
    setSelectedSuperVisor(supervisor);
  };

  const onConfirmDelete = () => {
    closeConfirmationDialog();
    selectSupervisor &&
      props
        .deleteExistingSupervisor(Number(props.userId), selectSupervisor.email)
        .then(() => {
          notification(
            <RcSuccessToast
              msg={t('assign-supervisor-dialog:toast.unassignSuccess', {
                name: selectSupervisor.fullName,
              })}
            />
          );
          props.fetchUserDetails(props.userId);
        })
        .catch((err) => {
          notification(
            <RcFailureToast
              primaryMsg={t('assign-supervisor-dialog:confirmationDialog.failureToastMessage', {
                name: selectSupervisor.fullName,
              })}
            />
          );
        });
  };

  const ExistingSupervisors = () => {
    const supervisorInfo = (supervisor: ExistingSupervisorResponse) => {
      // TODO: add assigned date
      return (
        <div className="list-block__row row">
          <div className="list-block__col col-1 txt-primary-color ">
            <MdPerson />
          </div>
          <div className="list-block__col col-8 list-user__info text-normal">
            <span>{supervisor.fullName}</span>
          </div>
          <AccessControl allowedRoles={[USER_ROLE.ADMIN]}>
            <div className="list-block__col col-3 col-last icon-large">
              <ToolTip isAlwaysVisible description={t('tool-tip:delete')}>
                <MdDelete onClick={() => onDeleteExistingSupervisor(supervisor)} />
              </ToolTip>
            </div>
          </AccessControl>
        </div>
      );
    };
    const SupervisorList = () => <div>{props.supervisors?.map((supervisor) => supervisorInfo(supervisor))}</div>;

    return (
      <div className="side-item mt-4x">
        <h4 className="text-uppercase color-grey-50">
          {t('assign-supervisor-dialog:label.existing', { number: props.supervisors.length })}
        </h4>
        <div className="list-block list-user">
          {props.isLoading ? <LoadingIndicator width={100} /> : <SupervisorList />}
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <RightFloatingDialog
        isOpen={props.isDialogOpen}
        closeDialog={props.closeDialog}
        headerText={isAdmin() ? t('assign-supervisor-dialog:title') : t('assign-supervisor-dialog:supervisorTitle')}
        description={isAdmin() ? t('assign-supervisor-dialog:description') : ''}>
        <AccessControl allowedRoles={[USER_ROLE.ADMIN]}>
          <React.Fragment>
            <div className="title">{t('assign-supervisor-dialog:label.search')}</div>
            <div className="mt-4x mb-8x">
              <ManualAddInput
                id={props.userId}
                validateValue={validateSupervisorEmail}
                noOptionMessage={t('assign-supervisor-dialog:message.noContent')}
                selectedValue={selectedEmails}
                onAddedValue={_onSupervisorsAdded}
                getSuggestion={_getSupervisorSuggestions}
              />
            </div>
            {!props.isAssigningSupervisor ? (
              <RcButton
                className="btn btn--secondary btn--block mb-8x"
                disabled={!isAddBtnDisabled}
                onClick={onClickAddToList}
                label={t('assign-supervisor-dialog:label.assignButton')}
              />
            ) : (
              <RcButton
                className="btn btn--secondary btn--block mb-8x"
                disabled
                label={t('assign-supervisor-dialog:label.assigningButton')}>
                <img src={loadingWhite} alt="Recovvo" width="20" />
              </RcButton>
            )}
          </React.Fragment>
        </AccessControl>
        <ExistingSupervisors />
      </RightFloatingDialog>
      <ConfirmationDialog
        onClose={closeConfirmationDialog}
        onContinue={onConfirmDelete}
        actionType={ActionType.CONFIRMATION}
        title={t('assign-supervisor-dialog:confirmationDialog.removeTitle')}
        isOpen={isConfirmationOpen}
        description={t('assign-supervisor-dialog:confirmationDialog.removeDescription', {
          name: selectSupervisor?.fullName,
        })}
        confirmMessage={t('assign-supervisor-dialog:confirmationDialog.confirmMessage')}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  userId: state.user.userDetails.id,
  supervisors: state.user.userDetails.supervisors,
  isLoading: state.user.isLoading,
  isAssigningSupervisor: state.user.isAssigningSupervisor,
});

const mapDispatchToProps = (dispatch: Function) => ({
  assignSupervisors: (supervisorEmails: Array<string>, userId: string) =>
    dispatch(userDetailsAction.assignSupervisors(supervisorEmails, userId)),
  fetchUserDetails: (id: string) => dispatch(userDetailsAction.fetchUserDetails(id)),
  deleteExistingSupervisor: (id: number, supervisorEmail: string) =>
    dispatch(userDetailsAction.deleteSingleExistingSupervisor(id, supervisorEmail)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignSupervisorDialog);
