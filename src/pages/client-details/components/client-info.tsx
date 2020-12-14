import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { RootState } from 'src/reducers';
import routes from 'src/constants/routes';
import notification from 'src/utils/notification';
import ToggleSwitch from 'src/components/toggle-switch';
import ActionDialog from 'src/components/action-dialog';
import NotFoundPage from 'src/components/page-not-found';
import * as clientDetailsAction from '../client-details.action';
import LoadingIndicator from 'src/components/loading-indicator';
import { ActionType } from 'src/components/action-dialog/action-dialog.types';
import { IClientDetail } from 'src/entities/super-admin-client-details/types';
import RcSuccessToast from 'src/components/commons/rc-toast/rc-success-toast';

interface StateProps {
  isLoading: boolean;
  isError: boolean;
  clientDetails: IClientDetail;
  showEditClientDialog: () => void;
  updateClientStatus: () => Promise<void>;
}

const ClientInfo = (props: StateProps) => {
  const { t } = useTranslation('super-admin-client');
  const { clientDetails } = props;

  const [isClientConfirmationDialogOpen, toggleClientStatusDialog] = React.useState<boolean>(false);

  const closeClientConfirmationDialog = () => toggleClientStatusDialog(false);

  const showClientConfirmationDialog = () => toggleClientStatusDialog(true);

  const handleConfirmation = () => {
    props.updateClientStatus().then(() => {
      notification(<RcSuccessToast msg={t('clientDialog.toast.updateSuccess')} />);
      closeClientConfirmationDialog();
    });
  };

  const ClientInfoRow = (props: {
    label: string;
    value: string;
    editLabel?: string;
    handleEditClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  }) => (
    <React.Fragment>
      <div className="list-block__row d-flex">
        <div className="list-block__col col-4 px-0x">{props.label}</div>
        <div className="list-block__col col-6 col-value">{props.value || '-'}</div>
      </div>
    </React.Fragment>
  );

  const SideBarRow = (props: { label: string; value: string }) => (
    <li className="side-item">
      <span className="side-item__label">{props.label}</span>
      <span className="side-item__main">{props.value}</span>
    </li>
  );

  const SideBarComponent = () => {
    return (
      <div className="sidebar">
        <ul className="side-list">
          <SideBarRow label={t('details.addedOn')} value={clientDetails.addedOn} />
          <SideBarRow label={t('details.addedBy')} value={clientDetails.addedBy} />
          <li className="side-item">
            <span className="side-item__label">{t('details.clientStatus')} </span>
            <span className="side-item__main d-flex aligin-items-center">
              <span className="pr-2x">{t(`details.${clientDetails.clientStatus}`)} </span>
              <span onClick={showClientConfirmationDialog}>
                <ToggleSwitch className={clientDetails.clientStatus} />
              </span>
            </span>
          </li>
          <SideBarRow label={t('details.totalSupervisors')} value={clientDetails.supervisorCount} />
          <SideBarRow label={t('details.totalUsers')} value={clientDetails.userCount} />
        </ul>
      </div>
    );
  };

  const ClientInfo = () => {
    const fullName = [clientDetails?.firstName, clientDetails?.lastName].filter(Boolean).join(' ');

    return (
      <>
        <div className="content-list">
          <h1>{clientDetails.client}</h1>
          <div className="d-flex">
            <div className="list-block__col col-11 px-0x">
              <h4>{t('details.header')}</h4>
            </div>
            <div className="list-block__col col-2 px-0x col-last">
              <span className="link-primary" onClick={props.showEditClientDialog}>
                {t('details.change')}
              </span>
            </div>
          </div>
          <div className="list-block">
            <ClientInfoRow label={t('details.companyName')} value={clientDetails.client} />
            <ClientInfoRow label={t('details.companyAdmin')} value={fullName} />
            <ClientInfoRow label={t('details.companyAdminEmail')} value={clientDetails.email} />
          </div>
        </div>
      </>
    );
  };

  const ClientInfoComponent = () => (
    <div className="main">
      <ClientInfo />
    </div>
  );

  if (!clientDetails.id && props.isError) {
    return <NotFoundPage redirectTo={routes.SUPER_ADMIN_CLIENT} />;
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
            <ClientInfoComponent />
          </div>
        </div>
      </div>
      {isClientConfirmationDialogOpen && (
        <ActionDialog
          actionType={ActionType.CONFIRMATION}
          title={t('confirmationDialog.title')}
          description={t('confirmationDialog.body', { status: clientDetails.clientStatus })}
          isOpen={isClientConfirmationDialogOpen}
          onClose={closeClientConfirmationDialog}
          onContinue={handleConfirmation}
        />
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  clientDetails: state.clientDetail.clientDetail,
  isLoading: state.clientDetail.isLoading,
  isError: state.clientDetail.isError,
});

const mapDispatchToProps = (dispatch: Function) => ({
  updateClientStatus: () => dispatch(clientDetailsAction.updateClientStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientInfo);
