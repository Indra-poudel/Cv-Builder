import { CsvRowState } from 'src/services/upload-csv';
import * as uploadCsvAction from './upload-csv.action';

interface UploadCsvState {
  isUploading: boolean;
  isUploadSuccess: boolean;
  csvRows: Array<CsvRowState>;
  isAllRowSuccess: boolean;
  isUploadFail: boolean;
  fileName: string;
}

const initialState: UploadCsvState = {
  isUploading: false,
  isUploadSuccess: false,
  csvRows: [],
  isAllRowSuccess: false,
  isUploadFail: false,
  fileName: '',
};

const csvUploadReducer = (state = initialState, action: uploadCsvAction.UploadCsvActionTypes): UploadCsvState => {
  switch (action.type) {
    case uploadCsvAction.CSV_UPLOADING:
      return {
        ...state,
        ...action.payload,
        isUploading: true,
      };

    case uploadCsvAction.CSV_UPLOAD_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isUploading: false,
        isUploadSuccess: true,
      };

    case uploadCsvAction.CSV_UPLOAD_FAIL: {
      return {
        ...state,
        ...action.payload,
        isUploading: false,
        isUploadFail: true,
      };
    }

    default:
      return { ...state };
  }
};

export default csvUploadReducer;
