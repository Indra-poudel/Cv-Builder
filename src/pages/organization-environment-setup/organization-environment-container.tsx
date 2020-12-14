import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, Redirect } from 'react-router-dom';

import { RootState } from 'src/reducers';
import Route from 'src/constants/routes';
import { MODALS_NAME } from 'src/constants/constants';
import * as download from 'src/services/download-files';
import { ONBOARDING_STEP } from 'src/constants/onboarding';
import * as organizationService from 'src/services/organization-setup';
import RcAppModal from 'src/components/commons/rc-app-modal/rc-app-modal';
import RcFailureToast from 'src/components/commons/rc-toast/rc-failure-toast';
import OrganizationEnvironmentSetupUi from './organization-environment-component';
import * as rcModalActions from 'src/components/commons/rc-modal/rc-modal.actions';

interface StateProps {
  onToggleModal: (payload?: rcModalActions.modalIState) => void;
  currentModal: string | null;
  onboardingStep: string;
}

const OrganizationEnvironmentSetup: React.FC<StateProps> = (props: StateProps) => {
  const onClickLink = (url: string) => {
    window.open(url, '_blank');
  };

  const { onToggleModal, currentModal, onboardingStep } = props;

  const { t } = useTranslation();
  const history = useHistory();

  interface DownLoadFileProps {
    URL: string;
    fileName: string;
    fileExtension: string;
  }

  const onUpload = (file: any) => {
    const selectedFile = file[0];
    organizationService
      .uploadJson(selectedFile)
      .then(() => {
        onToggleModal({
          currentModal: MODALS_NAME.SUCCESS_MODAL,
        });
      })
      .catch(() => {
        const primaryMsg = t('csvUploadNotification.invalidFile');
        notify(<RcFailureToast primaryMsg={primaryMsg} />);
      });
  };

  const onDownload = (downloadInfo: DownLoadFileProps) => {
    download.downloadFile(downloadInfo);
  };

  if (onboardingStep !== ONBOARDING_STEP.CREDENTIAL_UPLOAD) {
    return <Redirect to={Route.ROOT} />;
  }

  return (
    <>
      <OrganizationEnvironmentSetupUi onUpload={onUpload} onClickLink={onClickLink} onDownload={onDownload} />
      <RcAppModal
        onContinue={() => {
          onToggleModal();
          history.push(Route.COMPANY_ADMIN_DOMAIN_UPLOAD);
        }}
        currentModal={currentModal}
        onToggleModal={onToggleModal}
      />
    </>
  );
};

const notify = (customToast: ReactNode) =>
  toast(customToast, {
    toastId: 'notify',
    position: 'bottom-right',
  });

function mapStateToProps(state: RootState) {
  return {
    currentModal: state.modal.currentModal,
    onboardingStep: state.onboardingStatus.onboardingStep,
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {
    onToggleModal: (currentModal?: rcModalActions.modalIState) => {
      dispatch(rcModalActions.toggleModal(currentModal));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationEnvironmentSetup);
