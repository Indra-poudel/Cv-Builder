import { connect } from 'react-redux';
import React, { useState } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

import { RootState } from 'src/reducers';
import { loadingWhite } from 'src/assets/images';
import notification from 'src/utils/notification';
import * as UploadCsvAction from './upload-csv.action';
import ConfirmationDialog from 'src/components/action-dialog';
import RcButton from 'src/components/commons/rc-button/rc-button';
import { EXTENSION_TYPES, MODALS_NAME } from 'src/constants/constants';
import { ActionType } from 'src/components/action-dialog/action-dialog.types';
import RcSuccessToast from 'src/components/commons/rc-toast/rc-success-toast';
import RcFailureToast from 'src/components/commons/rc-toast/rc-failure-toast';
import * as rcModalActions from 'src/components/commons/rc-modal/rc-modal.actions';

interface UploadCsvState {
  endpoint: string;
  isCsvUploading: boolean;
  isFullWidth?: boolean;
  onUpload?: (fileName: string) => void;
  toggleModal: (currentModal: rcModalActions.modalIState) => void;
  uploadCsv: (csvFile: File, endpoint: string) => Promise<boolean>;
  confirmTitle: string;
  confirmDescription?: (fileName?: string) => string;
}

const UploadCsv: React.FC<UploadCsvState> = (props: UploadCsvState) => {
  const { isCsvUploading, endpoint, isFullWidth = true } = props;

  const { t } = useTranslation(['upload-csv']);

  const [selectedCsvFile, setCsvFile] = useState<File>();

  const [isConfirmationDialogOpen, toggleConfirmationDialog] = useState<boolean>(false);

  const closeConfirmationDialog = () => toggleConfirmationDialog(false);

  const showConfirmationDialog = () => toggleConfirmationDialog(true);

  const onSelectUpload = (files: Array<File>) => {
    const selectedFile = files[0];
    setCsvFile(selectedFile);
    showConfirmationDialog();
  };

  const onConfirmUpload = () => {
    closeConfirmationDialog();
    selectedCsvFile &&
      props
        .uploadCsv(selectedCsvFile, endpoint)
        .then((isAllRowsUploaded) => {
          toastHandlerForSuccess(isAllRowsUploaded);
        })
        .catch((error) => {
          const message = (error.response && error.response.data.message) || error.message;
          notification(<RcFailureToast primaryMsg={message} />);
        })
        .finally(() => {
          props.onUpload && props.onUpload(selectedCsvFile.name);
        });
  };

  const toastHandlerForSuccess = (isAllRowsUploaded: boolean) => {
    if (!isAllRowsUploaded) {
      return notification(
        <RcFailureToast
          primaryMsg={t('upload-csv:toast.message.partialSuccess.primaryMessage')}
          secondaryMsg={t('upload-csv:toast.message.partialSuccess.secondaryMessage')}
          btnLabel={t('upload-csv:toast.buttonLabel.viewErrors')}
          onClick={showErrorDialog}
        />
      );
    }
    return notification(<RcSuccessToast msg={t('upload-csv:toast.message.success')} />);
  };

  const showErrorDialog = () => {
    props.toggleModal({
      currentModal: MODALS_NAME.CSV_ERROR_DIALOG,
    });
  };

  return (
    <>
      <ConfirmationDialog
        onClose={closeConfirmationDialog}
        onContinue={onConfirmUpload}
        actionType={ActionType.CONFIRMATION}
        title={props.confirmTitle}
        isOpen={isConfirmationDialogOpen}
        description={props.confirmDescription ? props.confirmDescription(selectedCsvFile?.name) : ''}
      />
      {!isCsvUploading ? (
        <RcButton
          className="btn btn--with-icon btn--primary btn--block my-2x"
          type="fileUpload"
          acceptType={EXTENSION_TYPES.CSV}
          onClick={onSelectUpload}
          label={t('upload-csv:UploadButton.label')}>
          <MdCloudUpload className="mr-1x" />
        </RcButton>
      ) : (
        <RcButton
          className={
            isFullWidth ? 'btn btn--with-icon btn--primary btn--block my-2x' : 'btn btn--with-icon btn--primary my-2x'
          }
          disabled
          label={t('upload-csv:UploadButton.uploading')}>
          <img src={loadingWhite} alt="Recovvo" width="20" className="mr-2x" />
        </RcButton>
      )}
    </>
  );
};

function mapStateToProps(state: RootState) {
  return {
    isCsvUploading: state.csvUpload.isUploading,
  };
}

const mapDispatchToProps = (dispatch: Function) => ({
  toggleModal: (currentModal: rcModalActions.modalIState) => dispatch(rcModalActions.toggleModal(currentModal)),
  uploadCsv: (csvFile: File, endpoint: string) => dispatch(UploadCsvAction.uploadCsv(csvFile, endpoint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadCsv);
