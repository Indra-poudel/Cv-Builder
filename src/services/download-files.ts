import { RecovoHttp, RecovoHttpWithoutToken } from 'src/services/axios-instance';

interface DownloadFileParams {
  URL: string;
  fileName: string;
  fileExtension: string;
}

export const downloadFile = async ({ URL, fileName, fileExtension }: DownloadFileParams) => {
  const fileNameWithExtension = fileName + fileExtension;
  await RecovoHttp.get(URL, {
    responseType: 'blob',
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileNameWithExtension);
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * Call API without authorization token.
 * Needed when file is downloaded from S3.
 *
 * @param param0 {Object} DownloadFile Params
 */
export const downloadFileWithoutToken = async ({ URL, fileName, fileExtension }: DownloadFileParams) => {
  const fileNameWithExtension = fileName + fileExtension;

  await RecovoHttpWithoutToken.get(URL, {
    responseType: 'blob',
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileNameWithExtension);
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch((err) => {
      throw err;
    });
};
