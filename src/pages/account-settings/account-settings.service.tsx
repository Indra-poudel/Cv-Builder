import * as endpoints from 'src/constants/endpoints';
import { EXTENSION_TYPES } from 'src/constants/constants';
import * as downloadFileService from 'src/services/download-files';

/**
 * @returns Data of currently logged in user.
 */
export const downloadClientDomainCsv = async () => {
  const url = endpoints.DOWNLOAD_CLIENT_DOMAIN;

  const downloadFileParams = {
    URL: url,
    fileName: `client-domain`,
    fileExtension: EXTENSION_TYPES.CSV,
  };

  downloadFileService.downloadFile(downloadFileParams);
};
