import * as etlAction from './etl.action';

interface EtlState {
  isEtlInitializing: boolean;
  isEltInitializeSuccess: boolean;
  isEtlInitializeFail: boolean;
}

const EtlInitialState: EtlState = {
  isEtlInitializing: false,
  isEtlInitializeFail: false,
  isEltInitializeSuccess: false,
};

const etlReducer = (state = EtlInitialState, action: etlAction.EtlActionType): EtlState => {
  switch (action.type) {
    case etlAction.ETL_INITIALIZING:
      return {
        ...state,
        isEtlInitializing: true,
      };

    case etlAction.ETL_INITIALIZE_SUCCESS:
      return {
        ...state,
        isEtlInitializing: false,
        isEltInitializeSuccess: true,
      };

    case etlAction.ETL_INITIALIZE_FAIL:
      return {
        ...state,
        isEtlInitializing: false,
        isEtlInitializeFail: true,
      };

    default:
      return state;
  }
};

export default etlReducer;
