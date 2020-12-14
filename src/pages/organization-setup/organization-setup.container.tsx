import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import React, { useEffect } from 'react';

import { RootState } from 'src/reducers';
import routes from 'src/constants/routes';
import { ONBOARDING_STEP } from 'src/constants/onboarding';
import { IOrganizationInfo } from 'src/services/organization-setup';
import * as organizationSetupActions from './organiztion-setup.action';
import OrganizationSetupUI, { FormValues } from './organization-setup.component';
import { SelectOption as ISelectOption } from 'src/components/commons/rc-select/rc-select';

interface StateProps {
  organizationSizeOptions: Array<ISelectOption>;
  industryTypeOptions: Array<ISelectOption>;
  departmentOptions: Array<ISelectOption>;
  fetchOrganizationSetupOptions: () => void;
  saveOrganizationInfo: (requestBody: IOrganizationInfo) => void;
  isLoading: boolean;
  isSaveSuccessful: boolean;
  onboardingStep: string;
}

const OrganizationSetup = (props: StateProps) => {
  const {
    fetchOrganizationSetupOptions,
    saveOrganizationInfo,
    isSaveSuccessful,
    onboardingStep,
    ...otherProps
  } = props;

  useEffect(() => {
    fetchOrganizationSetupOptions();
  }, []);

  const _saveOrganizationInfo = (formValues: FormValues) => {
    const requestBody: IOrganizationInfo = {
      organizationUrl: formValues.website,
      organizationName: formValues.organizationName,
      userPosition: formValues.position,
      userDepartment: formValues.department,
      organizationSize: formValues.organizationSize,
      industry: formValues.industry,
      gsuiteAdminEmail: formValues.gSuiteAdminEmail,
    };

    saveOrganizationInfo(requestBody);
  };

  const isCurrentStepInfoSetup = () => {
    return [ONBOARDING_STEP.COMPANY_INFO, ONBOARDING_STEP.NOT_STARTED].includes(onboardingStep);
  };

  if (!isCurrentStepInfoSetup()) {
    return <Redirect to={routes.ROOT} />;
  }

  if (isSaveSuccessful) {
    return <Redirect to={routes.COMPANY_ADMIN_ENVIRONMENT} />;
  }

  return <OrganizationSetupUI saveOrganizationInfo={_saveOrganizationInfo} {...otherProps} />;
};

const mapStateToProps = (state: RootState) => {
  const {
    organizationSizeOptions,
    industryTypeOptions,
    departmentOptions,
    isLoading,
    isSaveSuccessful,
  } = state.organizationSetup;

  const onboardingStep = state.onboardingStatus.onboardingStep;

  return {
    organizationSizeOptions,
    industryTypeOptions,
    departmentOptions,
    isLoading,
    isSaveSuccessful,
    onboardingStep,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  fetchOrganizationSetupOptions: () => dispatch(organizationSetupActions.fetchOrganizationSetupOptions()),
  saveOrganizationInfo: (requestBody: IOrganizationInfo) =>
    dispatch(organizationSetupActions.saveOrganizationInfo(requestBody)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationSetup);
