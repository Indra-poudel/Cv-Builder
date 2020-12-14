import { Dispatch } from 'redux';

import * as uploadCsvService from 'src/services/upload-csv';
import * as csvErrorAction from 'src/components/csv-error-dialog/csv-error-dialog.action';

export const CSV_UPLOAD_FAIL = '@@action/CSV_UPLOAD/FAIL';
export const CSV_UPLOADING = '@@action/CSV_UPLOAD/UPLOADING';
export const CSV_UPLOAD_SUCCESS = '@@action/CSV_UPLOAD/SUCCESS';

interface CsvUploadingLoader {
  type: typeof CSV_UPLOADING;
  payload: {
    fileName: string;
  };
}

interface CsvUploadSuccess {
  type: typeof CSV_UPLOAD_SUCCESS;
  payload: {
    csvRows: Array<uploadCsvService.CsvRowState>;
    isAllRowSuccess: boolean;
    fileName: string;
  };
}

interface CsvUploadFail {
  type: typeof CSV_UPLOAD_FAIL;
  payload: {
    fileName: string;
  };
}

export type UploadCsvActionTypes =
  | CsvUploadingLoader
  | CsvUploadFail
  | CsvUploadSuccess
  | csvErrorAction.CsvErrorActionTypes;

export const uploadCsv = (csvFile: File, endpoint: string) => async (
  dispatch: Dispatch<UploadCsvActionTypes>
): Promise<boolean> => {
  try {
    dispatch({
      type: CSV_UPLOADING,
      payload: {
        fileName: csvFile.name,
      },
    });

    const { data, isAllRowSuccess } = await uploadCsvService.uploadCsv(endpoint, csvFile);

    dispatch({
      type: CSV_UPLOAD_SUCCESS,
      payload: {
        csvRows: data,
        isAllRowSuccess: isAllRowSuccess,
        fileName: csvFile.name,
      },
    });

    dispatch({
      type: csvErrorAction.CSV_ERROR,
      payload: {
        csvErrors: data,
      },
    });

    return isAllRowSuccess;
  } catch (error) {
    dispatch({
      type: CSV_UPLOAD_FAIL,
      payload: {
        fileName: csvFile.name,
      },
    });
    return Promise.reject(error);
  }
};
