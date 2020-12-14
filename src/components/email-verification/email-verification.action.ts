import * as emailVerificationService from 'src/services/email-verification';

export const USER_EMAIL_VERIFICATION = '@@action/USER_EMAIL_VERIFICATION';

export interface FetchVerifiedUserDetails {
  type: typeof USER_EMAIL_VERIFICATION;
  payload: {
    verifiedUserDetails: Object;
  };
}

export type fetchVerifiedUserDetailsActionTypes = FetchVerifiedUserDetails;

export const fetchVerifiedUserDetails = (id: string, schemaName: string) => async (
  dispatch: Function
): Promise<void> => {
  try {
    const response = await emailVerificationService.userEmailVerification(id, schemaName);
    dispatch({
      type: USER_EMAIL_VERIFICATION,
      payload: {
        verifiedUserDetails: {
          ...response.data.data,
          isVerifiedUser: !!response.data,
        },
      },
    });
  } catch (err) {
    dispatch({
      type: USER_EMAIL_VERIFICATION,
      payload: {
        verifiedUserDetails: {
          ...err.response,
          isVerifiedUser: false,
        },
      },
    });
  }
};
