import { SelectOption } from 'src/components/commons/rc-select/rc-select';

export const userFiltersKeys = {
  IS_ACTIVE: 'isActive',
  SEARCH: 'search',
  IS_SUPPRESSED: 'isSuppressed',
  HAS_SIGNUP: 'hasSignedUp',
  WITH_SUPERVISORS: 'withSupervisors',
};

export const activeStatusOptions: Array<SelectOption> = [
  { value: true, label: 'Active user' },
  { value: false, label: 'Inactive user' },
];

export const suppressedStatusOptions: Array<SelectOption> = [
  { value: true, label: 'Suppressed user' },
  { value: false, label: 'Unsuppressed user' },
];

export const userSignupOptions: Array<SelectOption> = [
  { value: true, label: 'Signup complete' },
  { value: false, label: 'Signup incomplete' },
];

export const supervisorStatusOptions: Array<SelectOption> = [
  { value: true, label: 'Supervisor assigned' },
  { value: false, label: 'Supervisor unassigned' },
];
