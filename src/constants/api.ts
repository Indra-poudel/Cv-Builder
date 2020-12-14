import Config from 'src/config';

export default {
  csvLink: () => `${Config.baseURL}/users/download-csv-template`,
  googelAdminApi: () => `https://admin.google.com/`,
  googelConsoleAPi: () => ` https://console.developers.google.com/`,
};
