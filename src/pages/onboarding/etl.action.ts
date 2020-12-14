import { Dispatch } from 'redux';

import * as etlService from 'src/services/etl';

export const ETL_INITIALIZING = '@@action/ONBOARDING/ETL_INITIALIZING';
export const ETL_INITIALIZE_SUCCESS = '@@action/ONBOARDING/ETL_INITIALIZE_SUCCESS';
export const ETL_INITIALIZE_FAIL = '@@action/ONBOARDING/ETL_INITIALIZE_FAIL';

interface EtlInitializing {
  type: typeof ETL_INITIALIZING;
}

interface EtlInitializeSuccess {
  type: typeof ETL_INITIALIZE_SUCCESS;
}

interface EtlInitializeFail {
  type: typeof ETL_INITIALIZE_FAIL;
}

export type EtlActionType = EtlInitializeSuccess | EtlInitializeFail | EtlInitializing;

export const initializeEtlProcess = () => async (dispatch: Dispatch<EtlActionType>): Promise<void> => {
  try {
    dispatch({
      type: ETL_INITIALIZING,
    });

    await etlService.initializeEtl();

    dispatch({
      type: ETL_INITIALIZE_SUCCESS,
    });
  } catch {
    dispatch({
      type: ETL_INITIALIZE_FAIL,
    });
  }
};
