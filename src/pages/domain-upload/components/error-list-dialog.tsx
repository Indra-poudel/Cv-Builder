import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';

import { CSVLink } from 'react-csv';
import { RootState } from 'src/reducers';
import { CsvRowState } from 'src/services/upload-csv';
import { httpConstants } from 'src/constants/http-constants';
import * as domainUploadAction from '../domain-upload.action';
import RcButton from 'src/components/commons/rc-button/rc-button';
import RightFloatingDialog from 'src/components/right-floating-dialog';

interface StateProps {
  isErrorDialogOpen: boolean;
  csvRows: Array<CsvRowState>;
  closeErrorDialog: () => void;
  reUploadDomain: () => void;
}

interface CsvErrorState {
  Domain: string;
  Message: string;
}

const ErrorListDialog = (props: StateProps) => {
  const { csvRows, reUploadDomain, isErrorDialogOpen, closeErrorDialog } = props;

  const { t } = useTranslation(['onboarding-domain-upload']);

  const [csvErrorRows, setCsvErrorRows] = useState<Array<CsvErrorState>>([]);

  useEffect(() => {
    const csvErrors = getCsvErrorRows();
    setCsvErrorRows(csvErrors);
  }, [csvRows]);

  const getCsvErrorRows = () => {
    const CsvErrorData = csvRows.filter((row) => {
      return row.status !== httpConstants.statusCode.SUCCESS;
    });

    return CsvErrorData.map((row) => ({
      Domain: row.domain,
      Message: row.message,
    }));
  };

  const onClickUploadAgain = () => {
    closeErrorDialog();
    reUploadDomain();
  };

  return (
    <RightFloatingDialog
      isOpen={isErrorDialogOpen}
      closeDialog={closeErrorDialog}
      headerText={t('onboardingDomainUpload.errorCard.errorTitle')}>
      <div className="sidebar-floating__subtitle">
        <div className="side-list">
          <div className="side-item">
            <div className="text-bold color-grey-50 text-small list-block__row py-1x mb-2x">
              {csvErrorRows.length === 1
                ? t('onboardingDomainUpload.errorCard.errorFound')
                : t('onboardingDomainUpload.errorCard.errorsFound', { number: csvErrorRows.length })}
            </div>
            <table className="table table-error">
              {csvRows.map((err: CsvRowState, index) => {
                return err.status !== httpConstants.statusCode.SUCCESS ? (
                  <tr key={index} className="table__row">
                    <td className="table__col px-0x py-1x">
                      <div className="text-bold my-1x">{err.domain}</div>
                      <div className="my-1x">{err.message}</div>
                    </td>
                  </tr>
                ) : null;
              })}
            </table>
          </div>
        </div>
        <div className=" d-flex justify-content-center flex-column align-items-center">
          <div className="p-6x">
            <RcButton
              onClick={onClickUploadAgain}
              className="btn btn--primary btn--full-width justify-content-center"
              label={t('onboardingDomainUpload.errorCard.uploadAgain')}
            />
          </div>
          <CSVLink className="txt-bold" filename={'error-list.csv'} data={csvErrorRows}>
            {t('onboardingDomainUpload.errorCard.downloadErrorLabel')}
          </CSVLink>
        </div>
      </div>
    </RightFloatingDialog>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    csvRows: state.OnboardingDomainUpload.csvRows,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  reUploadDomain: () => dispatch(domainUploadAction.reUploadDomain()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorListDialog);
