import csvEntity from '../entities/csv-upload';
import { RecovoHttp } from 'src/services/axios-instance';
import { httpConstants } from 'src/constants/http-constants';
import { ONBOARDING_DOMAIN_UPLOAD } from 'src/constants/endpoints';

export interface CsvRowState {
  csvRow: string;
  message: string;
  status: number;
  email: string;
  domain: string;
}

export interface CsvUploadState {
  data: Array<CsvRowState>;
  isAllRowSuccess: boolean;
}

export const uploadCsv = async (endpoint: string, fileData: Blob) => {
  const file = new FormData();
  file.append('file', fileData);

  const response = await RecovoHttp.post(endpoint, file);

  return {
    data: response?.data?.data.map(csvEntity.fromJson),
    isAllRowSuccess: isAllRowSuccess(response.data.data),
  };
};

export const uploadBulkDomainCsv = async (endpoint: string, fileData: Blob) => {
  const file = new FormData();
  file.append('file', fileData);

  const response = await RecovoHttp.post(endpoint, file);

  return {
    data: response?.data?.data.map(csvEntity.fromJson),
    isAllRowSuccess: isAllRowSuccess(response.data.data),
  };
};

const isAllRowSuccess = (rows: Array<CsvRowState>): boolean => {
  return rows.every(isRowSuccess);
};
const isRowSuccess = (row: CsvRowState): Boolean => {
  return row.status === httpConstants.statusCode.SUCCESS;
};

export const uploadOnboardingDomainCsv = async (fileData: Blob): Promise<CsvUploadState> => {
  const file = new FormData();
  file.append('file', fileData);

  const response = await RecovoHttp.post(ONBOARDING_DOMAIN_UPLOAD, file);

  return {
    data: response?.data?.data.map(csvEntity.fromJson),
    isAllRowSuccess: isAllRowSuccess(response.data.data),
  };
};
