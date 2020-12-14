import React from 'react';
import { connect } from 'react-redux';
import { MdPerson } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

import { RootState } from 'src/reducers';
import LoadingIndicator from 'src/components/loading-indicator';
import { ExistingSupervisorResponse } from '../account-profile.types';
import RightFloatingDialog from 'src/components/right-floating-dialog';

interface StateProps {
  isLoading: boolean;
  isDialogOpen: boolean;
  closeDialog: () => void;
  supervisors: Array<ExistingSupervisorResponse>;
}

const AssignSupervisorDialog = (props: StateProps) => {
  const { t } = useTranslation(['account-profile']);

  const ExistingSupervisors = () => {
    const supervisorInfo = (supervisor: ExistingSupervisorResponse) => {
      return (
        <div className="list-block__row row">
          <div className="list-block__col col-1 txt-primary-color ">
            <MdPerson />
          </div>
          <div className="list-block__col col-8 list-user__info text-normal">
            <span>{supervisor.fullName}</span>
          </div>
        </div>
      );
    };
    const SupervisorList = () => <div>{props.supervisors?.map((supervisor) => supervisorInfo(supervisor))}</div>;

    return (
      <div className="side-item mt-4x">
        <h4 className="text-uppercase color-grey-50">
          {t('account-profile:supervisorDialog.label.existing', { number: props.supervisors.length })}
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
        headerText={t('account-profile:supervisorDialog.title')}>
        <ExistingSupervisors />
      </RightFloatingDialog>
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLoading: state.accountProfile.isLoading,
  supervisors: state.accountProfile.accountProfile.supervisors,
});

export default connect(mapStateToProps)(AssignSupervisorDialog);
