import { ONLY_PHONE_REGEX } from 'src/constants/regex';

export const validatePhoneNumber = (phoneNumber: string, errorMessage: string) => {
  if (!phoneNumber) return null;

  if (!ONLY_PHONE_REGEX.test(phoneNumber)) return errorMessage;

  return null;
};
