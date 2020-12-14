export interface ContactInfo {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  contactOrganizationName: string;
  email: string;
  workPhoneNumber: string;
  cellPhoneNumber: string;
  address: string;
}

export interface UpdateContactInfo {
  [key: string]: string;
}
