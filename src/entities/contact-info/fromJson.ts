import { ContactInfo } from './types';

export default function fromJson({
  id,
  firstName,
  lastName,
  position,
  contactOrganizationName,
  email,
  workPhoneNumber,
  cellPhoneNumber,
  address,
}: ContactInfo): ContactInfo {
  const encoded = {
    id,
    firstName,
    lastName,
    position,
    contactOrganizationName,
    email,
    workPhoneNumber: workPhoneNumber ? workPhoneNumber.replace(/"/g, '') : '',
    cellPhoneNumber: cellPhoneNumber ? cellPhoneNumber.replace(/"/g, '') : '',
    address,
  };

  return {
    ...encoded,
  };
}
