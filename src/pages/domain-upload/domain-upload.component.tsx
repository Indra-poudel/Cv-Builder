import { connect } from 'react-redux';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdCloudUpload, MdCheckCircle, MdError } from 'react-icons/md';

import { logo } from 'src/assets/images';
import { RootState } from 'src/reducers';
import { CsvRowState } from 'src/services/upload-csv';
import { EXTENSION_TYPES } from 'src/constants/constants';
import * as domainUploadAction from './domain-upload.action';
import ErrorListDialog from './components/error-list-dialog';
import LoadingIndicator from 'src/components/loading-indicator';
import RcButton from 'src/components/commons/rc-button/rc-button';
import { ONBOARDING_DOMAIN_UPLOAD_TEMPLATE } from 'src/constants/external-link';
import RcCsvDownload from 'src/components/commons/rc-csv-download/rc-csv-download';

interface StateProps {
  onSelectUpload: (files: Array<Blob>) => void;
  isUploading: boolean;
  isUploadSuccess: boolean;
  isPartialError: boolean;
  csvRows: Array<CsvRowState>;
  isUploadFail: boolean;
  reUploadDomain: () => void;
  onContinue: () => void;
}

const DomainUploadUI = (props: StateProps) => {
  const { onSelectUpload, csvRows, reUploadDomain, onContinue } = props;

  const { t } = useTranslation(['onboarding-domain-upload']);

  const [isErrorDialogOpen, toggleErrorDialog] = useState<boolean>(false);

  const _closeErrorDialog = () => toggleErrorDialog(false);

  const _showErrorDialog = () => toggleErrorDialog(true);

  const DomainUploadCard = () => (
    <React.Fragment>
      <h3>{t('onboardingDomainUpload.domainUploadCard.instruction1')}</h3>
      <RcButton
        className="btn btn--with-icon btn--primary mt-16x mb-16x"
        type="fileUpload"
        acceptType={EXTENSION_TYPES.CSV}
        onClick={onSelectUpload}
        label={t('onboardingDomainUpload.domainUploadCard.uploadBtnLabel')}>
        <MdCloudUpload className="mr-1x" />
      </RcButton>
      <p>
        {t('onboardingDomainUpload.domainUploadCard.downloadInstruction')}{' '}
        <RcCsvDownload
          label={t('onboardingDomainUpload.domainUploadCard.downloadLabel')}
          link={ONBOARDING_DOMAIN_UPLOAD_TEMPLATE}
        />
      </p>
    </React.Fragment>
  );

  const DomainUploadingCard = () => (
    <div className="empty-page mt-4x center d-flex align-items-center  flex-column">
      <LoadingIndicator />
      <h1 className="mb-4x">{t('onboardingDomainUpload.loadingCard.title')}</h1>
      <div className="content-empty__link mb-20x">
        <p> {t('onboardingDomainUpload.loadingCard.description')}</p>
      </div>
    </div>
  );

  const DomainUploadSuccessCard = () => (
    <div className="empty-page mt-4x center d-flex align-items-center  flex-column">
      <div className="content-empty__icon content-empty__icon--success">
        <MdCheckCircle />
      </div>
      <h1 className="mb-4x">
        {csvRows.length === 1
          ? t('onboardingDomainUpload.successCard.successMsg1')
          : t('onboardingDomainUpload.successCard.successMsg')}
      </h1>
      <div className="content-empty__link">
        <p>
          {csvRows.length === 1
            ? t('onboardingDomainUpload.successCard.description1')
            : t('onboardingDomainUpload.successCard.description', { number: csvRows.length })}
        </p>
      </div>
      <RcButton
        className="btn btn--primary m-7x"
        onClick={onContinue}
        label={t('onboardingDomainUpload.successCard.btnLabel')}
      />
      <p>
        {t('onboardingDomainUpload.successCard.reUploadInstruction')}{' '}
        <RcCsvDownload label={t('onboardingDomainUpload.successCard.reUploadLabel')} onClick={reUploadDomain} />
      </p>
    </div>
  );

  const ErrorCard = () => (
    <div className="empty-page mt-4x center d-flex align-items-center  flex-column">
      <div className="content-empty__icon content-empty__icon--fail">
        <MdError />
      </div>
      <h1 className="mb-4x">
        {props.isPartialError
          ? t('onboardingDomainUpload.errorCard.title')
          : t('onboardingDomainUpload.errorCard.invalidFile')}
      </h1>
      <div className="content-empty__link">
        <p>
          {props.isPartialError
            ? t('onboardingDomainUpload.errorCard.description1')
            : t('onboardingDomainUpload.errorCard.description2')}
        </p>
      </div>
      <RcButton
        className="btn btn--primary m-6x"
        onClick={reUploadDomain}
        label={t('onboardingDomainUpload.errorCard.reUploadLabel')}
      />
      {props.isPartialError ? (
        <label className="link-primary" onClick={_showErrorDialog}>
          {t('onboardingDomainUpload.errorCard.viewErrors')}
        </label>
      ) : null}
    </div>
  );

  const DomainCard = () => {
    if (props.isUploading) return <DomainUploadingCard />;
    if (props.isUploadSuccess && !props.isPartialError) return <DomainUploadSuccessCard />;
    if (props.isUploadFail || props.isPartialError) return <ErrorCard />;
    return <DomainUploadCard />;
  };

  return (
    <React.Fragment>
      <nav className="navbar navbar--bordered-bottom">
        <div className="container">
          <div className="navbar__wrap navbar__wrap--content-spread">
            <div className="navbar__left">
              <div className="navbar__logo">
                <img src={logo} alt="logo" />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="content-wrap mt-8x">
        <div className="container">
          <div className="d-flex align-items-center  flex-column">
            <div className="content-heading">
              <h1>{t('onboardingDomainUpload.title')} </h1>
            </div>
            <div className="card card--elevated upload_domain__card p-10x">
              <DomainCard />
            </div>
          </div>
          <ErrorListDialog closeErrorDialog={_closeErrorDialog} isErrorDialogOpen={isErrorDialogOpen} />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isUploading: state.OnboardingDomainUpload.isUploading,
    isUploadSuccess: state.OnboardingDomainUpload.isUploadSuccess,
    isPartialError: state.OnboardingDomainUpload.isPartialError,
    isUploadFail: state.OnboardingDomainUpload.isUploadFail,
    csvRows: state.OnboardingDomainUpload.csvRows,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  reUploadDomain: () => dispatch(domainUploadAction.reUploadDomain()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DomainUploadUI);
