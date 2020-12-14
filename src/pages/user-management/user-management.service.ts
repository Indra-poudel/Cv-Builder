import { isEmptyArray } from 'formik';

import { SupervisorResponse } from '../user-details/user-details.types';

interface RemainingSupervisor {
  value: string;
  tooltipValue: string;
}

export function getFormattedSupervisor(supervisors: Array<SupervisorResponse>): [string, RemainingSupervisor | null] {
  if (!supervisors || isEmptyArray(supervisors)) return ['-', null];

  const firstSupervisiorName = supervisors[0].fullName;
  const remainingSupervisorList = supervisors.slice(1);
  const numberOfSupervisors = remainingSupervisorList.length;

  if (isEmptyArray(remainingSupervisorList)) return [firstSupervisiorName, null];

  const value = ` (${numberOfSupervisors} more) `;
  const tooltipValue = remainingSupervisorList.reduce((prevValue: string, supervisor: any, index: number) => {
    // separate names with comma if more than one supervisors are present
    return `${prevValue}${index > 0 ? ', ' : ''}${supervisor.fullName}`;
  }, '');

  return [firstSupervisiorName, { value, tooltipValue }];
}
