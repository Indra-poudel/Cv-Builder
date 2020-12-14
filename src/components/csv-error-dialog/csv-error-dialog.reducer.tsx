import { CsvRowState } from 'src/services/upload-csv';
import * as csvErrorAction from './csv-error-dialog.action';

interface csvErrorIState {
  csvErrors: Array<CsvRowState>;
}

const initialState = {
  csvErrors: [],
};

const csvErrorReducer = (state = initialState, action: csvErrorAction.CsvErrorActionTypes): csvErrorIState => {
  switch (action.type) {
    case csvErrorAction.CSV_ERROR:
      return {
        ...state,
        csvErrors: action.payload.csvErrors,
      };
    default:
      return state;
  }
};

export default csvErrorReducer;
