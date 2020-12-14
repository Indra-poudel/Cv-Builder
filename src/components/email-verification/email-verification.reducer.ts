import { combineReducers } from 'redux';

import * as userEmailVerification from './email-verification.action';

const initialState = {};

const verifiedUserDetailsReducer = (
  state = initialState,
  action: userEmailVerification.fetchVerifiedUserDetailsActionTypes
) => {
  switch (action.type) {
    case userEmailVerification.USER_EMAIL_VERIFICATION:
      return {
        ...state,
        ...mapVerifiedUserDetailsToState(action.payload.verifiedUserDetails),
      };
    default:
      return state;
  }
};

const mapVerifiedUserDetailsToState = (verfiedUserDetail: any) => {
  return {
    email: verfiedUserDetail.email,
    role: verfiedUserDetail.role,
    isVerifiedUser: verfiedUserDetail.isVerifiedUser,
  };
};

export default combineReducers({
  verfiedUserDetails: verifiedUserDetailsReducer,
});
