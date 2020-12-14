import * as endpoints from 'src/constants/endpoints';
import { RecovoHttp } from 'src/services/axios-instance';

export const initializeEtl = async () => {
  const response = await RecovoHttp.post(endpoints.ETL_INITIAL);

  return response;
};
