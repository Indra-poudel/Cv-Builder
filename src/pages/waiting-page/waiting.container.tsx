import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { RootState } from 'src/reducers';
import routes from 'src/constants/routes';
import ServerError from 'src/pages/server-error';
import WaitingPageUI from './waiting.component';
import { ONBOARDING_STEP } from 'src/constants/onboarding';
import * as etlAction from 'src/pages/onboarding/etl.action';
import LoadingIndicator from 'src/components/loading-indicator';

interface StateProps {
  onboardingStep: string;
  initializeEtlProcess: () => void;
  isEtlInitalizing: boolean;
  isEtlInitializeSuccess: boolean;
  isEtlInitializeFail: boolean;
}

const WaitingPage = (props: StateProps) => {
  const { onboardingStep } = props;

  useEffect(() => {
    props.initializeEtlProcess();
  }, []);

  if (onboardingStep !== ONBOARDING_STEP.AWAITING_FETCH) {
    return <Redirect to={routes.ROOT} />;
  }

  if (props.isEtlInitalizing) return <LoadingIndicator />;

  if (props.isEtlInitializeFail) return <ServerError />;

  return <WaitingPageUI />;
};

function mapStateToProps(state: RootState) {
  return {
    onboardingStep: state.onboardingStatus.onboardingStep,
    isEtlInitalizing: state.etl.isEtlInitializing,
    isEtlInitializeSuccess: state.etl.isEltInitializeSuccess,
    isEtlInitializeFail: state.etl.isEtlInitializeFail,
  };
}

const mapDispatchToProps = (dispatch: Function) => ({
  initializeEtlProcess: () => dispatch(etlAction.initializeEtlProcess()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WaitingPage);
