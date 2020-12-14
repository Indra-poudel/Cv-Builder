import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useTranslation } from 'react-i18next';
import { MdCloudUpload, MdDns, MdSubject } from 'react-icons/md';

import notification from 'src/utils/notification';
import { IntegrationSites } from 'src/constants/account';
import { outlook, loadingWhite } from 'src/assets/images';
import { EXTENSION_TYPES } from 'src/constants/constants';
import ConfirmationDialog from 'src/components/action-dialog';
import RcButton from 'src/components/commons/rc-button/rc-button';
import * as organizationService from 'src/services/organization-setup';
import RightFloatingDialog from 'src/components/right-floating-dialog';
import RcFailureToast from 'src/components/commons/rc-toast/rc-failure-toast';
import RcSuccessToast from 'src/components/commons/rc-toast/rc-success-toast';
import { ActionType } from 'src/components/action-dialog/action-dialog.types';

interface IntegrationDialogState {
  isDialogOpen: boolean;
  integrationService: string;
  closeDialog: () => void;
  onIntegrationUploaded: (isUploading: boolean, fileName: string) => void;
}

const IntegrationDialog = (props: IntegrationDialogState) => {
  const { isDialogOpen, integrationService, closeDialog } = props;

  const { t } = useTranslation(['integeration-dialog', 'account-page']);

  const [credentialFile, setCredentialFile] = useState<Array<File>>([]);
  const [isConfirmationOpen, toggleConfirmationDialog] = useState<boolean>(false);
  const [isCredentialUploading, setIsCredentialUploading] = useState<boolean>(false);

  const integrationServices = (key: string) => {
    return {
      [IntegrationSites.google]: {
        title: t('account-page:google.title'),
        subtitle: t('account-page:google.subtitle'),
        icon: () => <FcGoogle size="42" />,
      },
      [IntegrationSites.outlook]: {
        title: t('account-page:outlook.title'),
        subtitle: t('account-page:google.subtitle'),
        icon: () => <img src={outlook} alt="outlook" className="outlook" />,
      },
      [IntegrationSites.crm]: {
        title: t('account-page:crm.title'),
        subtitle: t('account-page:crm.subtitle'),
        icon: () => <MdDns />,
      },
      [IntegrationSites.directory]: {
        name: IntegrationSites.directory,
        title: t('account-page:directory.title'),
        subtitle: t('account-page:directory.subtitle'),
        icon: () => <MdSubject />,
      },
    }[key];
  };

  const closeConfirmationDialog = () => toggleConfirmationDialog(false);

  const showConfirmationDialog = () => toggleConfirmationDialog(true);

  const onUploadCredentials = (file: Array<File>) => {
    if (file.length === 0) return;
    setCredentialFile(file);
    showConfirmationDialog();
  };

  const onConfirmUploadCredentials = () => {
    closeConfirmationDialog();
    setIsCredentialUploading(true);
    props.onIntegrationUploaded(true, credentialFile[0].name);
    organizationService
      .uploadCredentials(credentialFile[0])
      .then(() => {
        setIsCredentialUploading(false);
        notification(<RcSuccessToast msg={t('integeration-dialog:message.success')} />);
      })
      .catch(() => {
        setIsCredentialUploading(false);
        notification(<RcFailureToast primaryMsg={t('integeration-dialog:message.error')} />);
      })
      .finally(() => props.onIntegrationUploaded(false, credentialFile[0].name));
  };

  const Seperator = () => (
    <div className="h-seperator mt-6x mb-6x">
      <hr className="line-auto" />
    </div>
  );

  return (
    <React.Fragment>
      <RightFloatingDialog
        isOpen={isDialogOpen}
        closeDialog={closeDialog}
        headerText={t('integeration-dialog:label.header')}>
        <div className="sidebar-floating__subtitle">
          <div className="side-list">
            <div className="side-item">
              <div className="list-block list-user">
                <div className="list-block__row row">
                  <div className="list-block__col col-1 txt-primary-color mr-4x px-0x">
                    {integrationServices(integrationService).icon()}
                  </div>
                  <div className="list-block__col col-8 list-user__info text-normal mt-1x">
                    <span>{integrationServices(integrationService).title}</span>
                    <span className="text-light-sm">{integrationServices(integrationService).subtitle}</span>
                  </div>
                </div>
              </div>

              <h3 className="text-large">{t('integeration-dialog:label.instruction')}</h3>
              <p className="text-regular mt-3x mb-6x pr-10x text-normal">
                {t('integeration-dialog:label.detailInstruction')}
              </p>
              <div className="step-content-links mb-10x">
                {!isCredentialUploading ? (
                  <RcButton
                    onClick={onUploadCredentials}
                    type="fileUpload"
                    acceptType={EXTENSION_TYPES.JSON}
                    className="btn btn--with-icon btn--secondary btn--loading mr-4x d-inline-flex"
                    label={t('integeration-dialog:label.uploadButton')}>
                    <MdCloudUpload />
                  </RcButton>
                ) : (
                  <RcButton
                    className="btn btn--with-icon btn--secondary btn--loading mr-4x d-inline-flex"
                    disabled
                    label={t('integeration-dialog:label.uploadingButton')}>
                    <img src={loadingWhite} alt="Recovvo" width="20" />
                  </RcButton>
                )}
              </div>
              <Seperator />
            </div>
          </div>
        </div>
      </RightFloatingDialog>
      <ConfirmationDialog
        onClose={closeConfirmationDialog}
        onContinue={onConfirmUploadCredentials}
        actionType={ActionType.CONFIRMATION}
        title={t('integeration-dialog:confirmationDialog.title')}
        isOpen={isConfirmationOpen}
        description={t('integeration-dialog:confirmationDialog.description')}
        confirmMessage={t('integeration-dialog:confirmationDialog.confirmMessage')}
      />
    </React.Fragment>
  );
};

export default IntegrationDialog;
