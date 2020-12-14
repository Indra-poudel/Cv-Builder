import React from 'react';
import { CSVLink } from 'react-csv';
import { connect } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

import ToolTip from '../tool-tip';
import { RootState } from 'src/reducers';
import { CsvRowState } from 'src/services/upload-csv';
import { httpConstants } from 'src/constants/http-constants';
import RcButton from 'src/components/commons/rc-button/rc-button';

interface CsvErrorDialogProps {
  csvError: {
    csvErrors: Array<CsvRowState>;
  };
  enableUploadBtn?: boolean;
  onToggleModal: () => void;
  style: {
    closeIcon: Object;
  };
  onUploadAgain?: () => void;
}

const CsvErrorDialog: React.FC<CsvErrorDialogProps> = (props: CsvErrorDialogProps) => {
  const { t } = useTranslation();

  const { csvError, onToggleModal, onUploadAgain, enableUploadBtn = true } = props;

  const errorRows = () => {
    return csvError.csvErrors.filter((err: CsvRowState) => err.status !== httpConstants.statusCode.SUCCESS);
  };

  const downloadErrors = () => {
    return errorRows().map((err: CsvRowState) => {
      const firstColumn = err.domain ? 'Domain' : 'Email';
      return {
        [firstColumn]: err.domain || err.email,
        Message: err.message.replace(/(")/gm, `'`),
      };
    });
  };

  return (
    <div className="modal--sm">
      <div className="modal__header modal__header--border d-block pb-1x">
        <div className="modal__close-icon">
          <ToolTip isAlwaysVisible description={t('tool-tip:close')}>
            <MdClose onClick={onToggleModal} />
          </ToolTip>
        </div>
        <h2 className="mb-4x">{t('csvErrorDialog.headerLabel')}</h2>
        <div className="text-bold color-grey-50 text-small">
          {errorRows().length === 1
            ? t('csvErrorDialog.errorFound')
            : t('csvErrorDialog.errorsFound', { number: errorRows().length })}
        </div>
      </div>
      <div className="modal__body modal-body-scroll py-2x">
        <div className="modal-block">
          <table className="table table-error">
            {errorRows().map((err: CsvRowState, index) => (
              <tr key={index} className="table__row">
                <td className="table__col text-bold">{err.domain || err.email}</td>
                <td className="table__col">{err.message}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      <div className="modal__footer justify-content-center">
        <div className="button-group d-block">
          {enableUploadBtn ? (
            <RcButton
              className="btn btn--primary btn--block  mb-4x"
              onClick={onUploadAgain}
              label={t('csvErrorDialog.uploadLabel')}
            />
          ) : null}
          <div className="d-flex justify-content-center">
            <CSVLink className="txt-bold text-center" filename={'error-list.csv'} data={downloadErrors()}>
              {t('csvErrorDialog.downloadErrorFile')}
            </CSVLink>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state: RootState) {
  return {
    csvError: state.csvError,
  };
}

export default connect(mapStateToProps)(CsvErrorDialog);
