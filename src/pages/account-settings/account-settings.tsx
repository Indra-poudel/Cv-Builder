import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { MdWeb, MdDns, MdList, MdCheck, MdPanTool, MdSubject, MdCloudDownload, MdClose } from 'react-icons/md';

import { RootState } from 'src/reducers';
import { outlook } from 'src/assets/images';
import notification from 'src/utils/notification';
import IntegrationDialog from './components/integration-dialog';
import ClientDomainDialog from './components/client-domain-dialog';
import { downloadClientDomainCsv } from './account-settings.service';
import SuppressionListDialog from './components/suppression-list-dialog';
import RcAppModal from 'src/components/commons/rc-app-modal/rc-app-modal';
import { FetchSuppressionListState } from 'src/services/suppression-list';
import RcLoadingToast from 'src/components/commons/rc-toast/rc-loading-toast';
import * as rcModalActions from 'src/components/commons/rc-modal/rc-modal.actions';
import * as suppressionListAction from 'src/pages/account/suppression-list.action';
import { DataPrivacy, DataPrivacyKeys, IntegrationSitesKeys, IntegrationSites } from 'src/constants/account';

interface AccountSettingsState {
  onToggleModal: (currentModal: rcModalActions.modalIState) => void;
  currentModal: string | null;
  isCsvUploading: boolean;
  uploadedCsvFileName: string;
  suppressedUsersStatus: string;
  suppressedUsers: Array<FetchSuppressionListState>;
  fetchSuppressionListStatus: () => void;
  isSuppressionStatusFetching: boolean;
}

const AccountSettings = (props: AccountSettingsState) => {
  const [isSuppressionDialogOpen, toggleSuppressionDialog] = useState<boolean>(false);

  const [integretationService, setIntegretationService] = useState<string>(IntegrationSites.google);

  const [isIntegrationDialogOpen, toggleIntegrationDialog] = useState<boolean>(false);
  const [isIntegrationUploading, setIntegrationUploading] = useState<boolean>(false);
  const [integrationFileName, setIntegrationFileName] = useState<string>('');

  const [isClientDomainDialogOpen, toggleClientDomainDialog] = useState<boolean>(false);

  const _closeSuppressionDialog = () => toggleSuppressionDialog(false);

  const _showSuppressionDialog = () => toggleSuppressionDialog(true);

  const _closeClientDomainDialog = () => toggleClientDomainDialog(false);

  const _showClientDomainDialog = () => toggleClientDomainDialog(true);

  const _handleGsuiteIntegretationManagerClick = (integrationSite: string) => {
    toggleIntegrationDialog(true);
    setIntegretationService(integrationSite);
  };

  const _closeGsuiteIntegrationDialog = () => toggleIntegrationDialog(false);

  const { t } = useTranslation(['account-page']);

  useEffect(() => {
    props.fetchSuppressionListStatus();
  }, [props.suppressedUsers]);

  const dataPrivacyDivBuilder = () => {
    return {
      [DataPrivacy.email]: {
        name: DataPrivacy.email,
        title: t('account-page:emailLog.title'),
        subtitle: t('account-page:emailLog.subtitle'),
        icon: () => <MdList className="mr-4x integration-icon" />,
        isEnable: false,
      },
      [DataPrivacy.suppression]: {
        name: DataPrivacy.suppression,
        title: t('account-page:suppression.title'),
        subtitle: t('account-page:suppression.subtitle'),
        icon: () => <MdPanTool className="mr-4x integration-icon" />,
        isEnable: true,
        onClick: _showSuppressionDialog,
      },
      [DataPrivacy.domain]: {
        name: DataPrivacy.domain,
        title: t('account-page:clientDomain.title'),
        subtitle: t('account-page:clientDomain.subtitle'),
        icon: () => <MdWeb className="mr-4x integration-icon" />,
        isEnable: true,
        onClick: _showClientDomainDialog,
        onClickSecondary: downloadClientDomainCsv,
      },
    };
  };

  const integrationDivBuilder = () => {
    return {
      [IntegrationSites.google]: {
        name: IntegrationSites.google,
        title: t('account-page:google.title'),
        subtitle: t('account-page:google.subtitle'),
        icon: () => <FcGoogle className="mr-4x integration-icon" />,
        onClick: () => _handleGsuiteIntegretationManagerClick(IntegrationSites.google),
        isEnable: true,
      },
      [IntegrationSites.outlook]: {
        name: IntegrationSites.outlook,
        title: t('account-page:outlook.title'),
        subtitle: t('account-page:google.subtitle'),
        icon: () => <img src={outlook} alt="outlook" className="mr-4x integration-icon outlook" />,
        isEnable: false,
      },
      [IntegrationSites.crm]: {
        name: IntegrationSites.crm,
        title: t('account-page:crm.title'),
        subtitle: t('account-page:crm.subtitle'),
        icon: () => <MdDns className="mr-4x integration-icon" />,
        isEnable: false,
      },
      [IntegrationSites.directory]: {
        name: IntegrationSites.directory,
        title: t('account-page:directory.title'),
        subtitle: t('account-page:directory.subtitle'),
        icon: () => <MdSubject className="mr-4x integration-icon" />,
        isEnable: false,
      },
    };
  };

  const dataPrivacyDivMap = dataPrivacyDivBuilder();
  const integrationSiteDivMap = integrationDivBuilder();

  const dataPrivacyDivGroup = DataPrivacyKeys.map((key: string) => dataPrivacyDivMap[key]);
  const integrationSiteDivGroup = IntegrationSitesKeys.map((key: string) => integrationSiteDivMap[key]);

  const DataPrivacyDivGroup = () => {
    return (
      <div className="list-block account-block account-setting">
        {dataPrivacyDivGroup.map((dataPrivacyDiv) => {
          return (
            <div
              key={dataPrivacyDiv.name}
              className={dataPrivacyDiv.isEnable ? 'list-block__row row' : 'list-block__row row row-disabled'}>
              <div className="list-block__col col-8-xl col-6 col-value">
                <div className="d-flex">
                  <div>{dataPrivacyDiv.icon()}</div>
                  <div>
                    <span>{dataPrivacyDiv.title}</span>
                    <span className="text-light-sm d-block">{dataPrivacyDiv.subtitle}</span>
                  </div>
                </div>
              </div>
              <div className="d-flex list-block__col col-4-xl col-6 col-last">
                <button onClick={dataPrivacyDiv.onClick} className="btn btn--outlined-secondary mr-10x-xl mr-5x">
                  {t('account-page:buttonLabel:manage')}
                </button>
                {dataPrivacyDiv.name === DataPrivacy.domain ? (
                  <button
                    className="btn btn--with-icon btn--primary d-flex align-items-center"
                    onClick={dataPrivacyDiv.onClickSecondary}>
                    <MdCloudDownload className="mr-2x" />
                    {t('account-page:buttonLabel.download')}
                  </button>
                ) : dataPrivacyDiv.isEnable ? (
                  props.suppressedUsersStatus === 'active' ? (
                    <span className="d-flex align-items-center txt-bold txt-primary-color">
                      <MdCheck className="mr-2x" />
                      {t(`account-page:textLabel:${props.suppressedUsersStatus}`)}
                    </span>
                  ) : (
                    <span className="d-flex align-items-center">
                      <MdClose className="mr-2x" />
                      {props.suppressedUsersStatus && !props.isSuppressionStatusFetching
                        ? t(`account-page:textLabel:${props.suppressedUsersStatus}`)
                        : t(`account-page:textLabel:loading`)}
                    </span>
                  )
                ) : (
                  <span className="d-flex align-items-center"> {t('account-page:buttonLabel:comingSoon')}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const IntegrationSiteDivGroup = () => {
    return (
      <div className="list-block account-block account-setting">
        {integrationSiteDivGroup.map((integrationSite) => {
          return (
            <div
              key={integrationSite.name}
              className={integrationSite.isEnable ? 'list-block__row row' : 'list-block__row row row-disabled'}>
              <div className="list-block__col col-8-xl col-6 col-value">
                <div className="d-flex">
                  <div> {integrationSite.icon()}</div>
                  <div>
                    <span>{integrationSite.title}</span>
                    <span className="text-light-sm d-block">{integrationSite.subtitle}</span>
                  </div>
                </div>
              </div>
              <div className="d-flex list-block__col col-4-xl col-6 col-last">
                <button onClick={integrationSite.onClick} className="btn btn--outlined-secondary mr-10x-xl mr-5x">
                  {t('account-page:buttonLabel:manage')}
                </button>
                {integrationSite.isEnable ? (
                  <span className="txt-bold txt-primary-color d-flex align-items-center">
                    <MdCheck className="mr-2x" />
                    {t('account-page:textLabel.connected')}
                  </span>
                ) : (
                  <span className="d-flex align-items-center">{t('account-page:buttonLabel:comingSoon')}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const showUploadingToast = (toastId: string) => {
    notification(<RcLoadingToast message={t('account-page:textLabel.toastUploading')} />, {
      autoClose: false,
      toastId,
    });
  };

  const onUploadComplete = (toastId: string) => toast.dismiss(toastId);

  const onIntegrationUpload = (uploadingStatus: boolean, fileName: string) => {
    setIntegrationFileName(fileName);
    if (!uploadingStatus) onUploadComplete(fileName);
    setIntegrationUploading(uploadingStatus);
  };

  return (
    <>
      <div className="content-list w-100">
        <h2> {t('account-page:integrations')}</h2>
        <IntegrationSiteDivGroup />
      </div>
      <div className="content-list w-100">
        <h2>{t('account-page:dataPrivacy')}</h2>
        <DataPrivacyDivGroup />
      </div>
      {isSuppressionDialogOpen && (
        <SuppressionListDialog
          isDialogOpen={isSuppressionDialogOpen}
          closeDialog={_closeSuppressionDialog}
          onSuppressionListUploaded={onUploadComplete}
        />
      )}
      {isClientDomainDialogOpen && (
        <ClientDomainDialog
          onDomainUploaded={onUploadComplete}
          isDialogOpen={isClientDomainDialogOpen}
          closeDialog={_closeClientDomainDialog}
        />
      )}
      {isIntegrationDialogOpen && (
        <IntegrationDialog
          isDialogOpen={isIntegrationDialogOpen}
          integrationService={integretationService}
          closeDialog={_closeGsuiteIntegrationDialog}
          onIntegrationUploaded={onIntegrationUpload}
        />
      )}
      <RcAppModal enableUploadBtn={false} {...props} />
      {props.isCsvUploading &&
        !isClientDomainDialogOpen &&
        !isSuppressionDialogOpen &&
        showUploadingToast(props.uploadedCsvFileName)}
      {isIntegrationUploading && !isIntegrationDialogOpen && showUploadingToast(integrationFileName)}
    </>
  );
};

function mapStateToProps(state: RootState) {
  return {
    currentModal: state.modal.currentModal,
    isCsvUploading: state.csvUpload.isUploading,
    uploadedCsvFileName: state.csvUpload.fileName,
    suppressedUsers: state.account.suppressionList.fetchSuppressionList.suppressedUsers,
    suppressedUsersStatus: state.account.suppressionList.fetchSuppressionList.suppressedUsersStatus,
    isSuppressionStatusFetching: state.account.suppressionList.fetchSuppressionList.isStatusFetching,
  };
}

const mapDispatchToProps = (dispatch: Function) => ({
  onToggleModal: (currentModal: rcModalActions.modalIState) => {
    dispatch(rcModalActions.toggleModal(currentModal));
  },
  fetchSuppressionListStatus: () => {
    dispatch(suppressionListAction.fetchSuppressionListStatus());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);
