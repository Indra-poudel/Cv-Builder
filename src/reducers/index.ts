import store from 'src/store';
import { combineReducers, Action } from 'redux';

import etlReducer from 'src/pages/onboarding/etl.reducer';
import homeReducer from 'src/components/home/home.reducer';
import accountReducer from 'src/pages/account/account.reducer';
import onboardingReducer from 'src/pages/onboarding/onboarding.reducer';
import csvUploadReducer from 'src/components/upload-csv/upload-csv.reducer';
import modalReducer from 'src/components/commons/rc-modal/rc-modal.reducer';
import usageReportReducer from 'src/pages/usage-report/usage-report.reducer';
import userDetailsReducer from 'src/pages/user-details/user-details.reducer';
import contactInfoReducer from 'src/pages/contact-search/contact-info.reducer';
import csvReducer from 'src/components/csv-error-dialog/csv-error-dialog.reducer';
import clientDetailReducer from 'src/pages/client-details/client-details.reducer';
import contactSearchReducer from 'src/pages/contact-search/contact-search.reducer';
import emailActivityReducer from 'src/pages/email-activity/email-activity.reducer';
import documentSearchReducer from 'src/pages/contact-search/document-search.reducer';
import loginReducer from 'src/pages/company-admin-login/company-admin-login.reducer';
import accountProfileReducer from 'src/pages/account-profile/account-profile.reducer';
import userManagementReducer from 'src/pages/user-management/user-management.reducer';
import onboardingDomainUploadReducer from 'src/pages/domain-upload/domain-upload.reducer';
import superAdminLoginReducer from 'src/pages/super-admin-login/super-admin-login.reducer';
import superAdminClientReducer from 'src/pages/super-admin-client/super-admin-client.reducer';
import organizationSetupReducer from 'src/pages/organization-setup/organization-setup.reducer';
import emailVerificationReducer from 'src/components/email-verification/email-verification.reducer';

export const LOGOUT = '@@action/ROOT_ACTION/LOGOUT';

const appReducer = combineReducers({
  superAdminLogin: superAdminLoginReducer,
  usageReport: usageReportReducer,
  etl: etlReducer,
  contact: contactInfoReducer,
  csvUpload: csvUploadReducer,
  csvError: csvReducer,
  home: homeReducer,
  onboardingStatus: onboardingReducer,
  modal: modalReducer,
  user: userDetailsReducer,
  login: loginReducer,
  userManagement: userManagementReducer,
  emailVerifiedUser: emailVerificationReducer,
  organizationSetup: organizationSetupReducer,
  contactSearch: contactSearchReducer,
  documentSearch: documentSearchReducer,
  OnboardingDomainUpload: onboardingDomainUploadReducer,
  emailActivitySearch: emailActivityReducer,
  account: accountReducer,
  accountProfile: accountProfileReducer,
  superAdminClient: superAdminClientReducer,
  clientDetail: clientDetailReducer,
});

export type RootState = ReturnType<typeof appReducer>;

// Find the explanation for reseting the redux store here:
// https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store/51831112
const rootReducer = (state: RootState | undefined, action: Action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export type AppDispatch = typeof store.dispatch;

export default rootReducer;
