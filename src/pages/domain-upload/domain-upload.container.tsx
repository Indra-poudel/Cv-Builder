import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { RootState } from 'src/reducers';
import routes from 'src/constants/routes';
import DomainUploadUI from './domain-upload.component';
import { ONBOARDING_STEP } from 'src/constants/onboarding';
import * as domainUploadAction from './domain-upload.action';

interface StateProps {
  onboardingStep: string;
  uploadDomain: (file: Blob) => void;
  updateOnboardingStep: () => void;
  isOnboardingStepUpdated: boolean;
}

const DomainUpload = (props: StateProps) => {
  const { onboardingStep, uploadDomain, isOnboardingStepUpdated } = props;

  if (onboardingStep !== ONBOARDING_STEP.DOMAINS_UPLOAD) {
    return <Redirect to={routes.ROOT} />;
  }

  if (isOnboardingStepUpdated) {
    return <Redirect to={routes.COMPANY_ADMIN_WAITING_PAGE} />;
  }

  const onSelectUpload = (files: Array<Blob>) => {
    const selectedFile = files[0];
    uploadDomain(selectedFile);
  };

  const onContinue = () => {
    props.updateOnboardingStep();
  };

  return <DomainUploadUI onContinue={onContinue} onSelectUpload={onSelectUpload} />;
};

const mapStateToProps = (state: RootState) => {
  return {
    onboardingStep: state.onboardingStatus.onboardingStep,
    isOnboardingStepUpdated: state.OnboardingDomainUpload.isOnboardingStepUpdated,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  uploadDomain: (selectedFile: Blob) => dispatch(domainUploadAction.uploadDomain(selectedFile)),
  updateOnboardingStep: () => dispatch(domainUploadAction.updateOnboardingStep()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DomainUpload);
