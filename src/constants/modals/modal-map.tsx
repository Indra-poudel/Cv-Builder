import { MODALS_NAME } from 'src/constants/constants';
import SuccessDialog from 'src/components/success-dialog';
import AddUserDialog from 'src/components/add-user-dialog';
import CsvErrorDialog from 'src/components/csv-error-dialog';
import BulkDomainDialog from 'src/components/bulk-map-domain-dialog';

export default {
  [MODALS_NAME.SUCCESS_MODAL]: SuccessDialog,
  [MODALS_NAME.ADD_USER_MODAL]: AddUserDialog,
  [MODALS_NAME.CSV_ERROR_DIALOG]: CsvErrorDialog,
  [MODALS_NAME.BULK_DOMAIN_DIALOG]: BulkDomainDialog,
};
