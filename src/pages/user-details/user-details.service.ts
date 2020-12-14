import { SupervisorResponse } from './user-details.types';

export const formatSupervisorSuggestions = (supervisorListResponse: Array<SupervisorResponse>): Array<string> =>
  supervisorListResponse.map((supervisor) => supervisor.email);
