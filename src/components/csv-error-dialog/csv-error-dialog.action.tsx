import { CsvRowState } from 'src/services/upload-csv';

export const CSV_ERROR = '@@action/CSV_ERROR';

export interface CsvError {
  type: typeof CSV_ERROR;
  payload: {
    csvErrors: Array<CsvRowState>;
  };
}

export type CsvErrorActionTypes = CsvError;

export const setCsvError = (errors: Array<CsvRowState>): CsvError => ({
  type: CSV_ERROR,
  payload: {
    csvErrors: errors,
  },
});
