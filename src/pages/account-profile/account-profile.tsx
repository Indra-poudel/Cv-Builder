import { connect } from 'react-redux';
import React, { useEffect } from 'react';

import { RootState } from 'src/reducers';
import NotFoundPage from 'src/components/page-not-found';
import { IAccountProfile } from './account-profile.types';
import LoadingIndicator from 'src/components/loading-indicator';
import * as accountProfileAction from './account-profile.action';
import AccountProfileUi from './components.tsx/account-profile.component';

interface StateProps {
  isLoading: boolean;
  userProfile: IAccountProfile;
  fetchUserProfile: () => void;
  fetchDepartmentOptions: () => void;
}

const AccountProfile = (props: StateProps) => {
  const { fetchUserProfile, fetchDepartmentOptions, userProfile, isLoading, ...otherProps } = props;

  useEffect(() => {
    fetchUserProfile();
    fetchDepartmentOptions();
  }, []);

  if (!userProfile.id && userProfile.isError) {
    return <NotFoundPage />;
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <AccountProfileUi userProfile={userProfile} {...otherProps} />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  userProfile: state.accountProfile.accountProfile,
  isLoading: state.accountProfile.isLoading,
});

const mapDispatchToProps = (dispatch: Function) => ({
  fetchUserProfile: () => {
    dispatch(accountProfileAction.fetchUserProfile());
  },
  fetchDepartmentOptions: () => {
    dispatch(accountProfileAction.fetchDepartmentOptions());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountProfile);
