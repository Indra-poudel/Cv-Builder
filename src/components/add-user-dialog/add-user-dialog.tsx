import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OptionTypeBase, ValueType } from 'react-select';

import { loadingWhite } from 'src/assets/images';
import notification from 'src/utils/notification';
import UploadCsv from 'src/components/upload-csv';
import * as endpoints from 'src/constants/endpoints';
import ModalDialog from 'src/components/modal-dialog';
import RcButton from '../commons/rc-button/rc-button';
import { postUsersManually } from 'src/services/users';
import { fetchUserSuggestions } from 'src/services/users';
import ManualAddInput from 'src/components/manual-add-input';
import RcSeperator from '../commons/rc-seperator/rc-seperator';
import { validateUsersEmail } from 'src/services/validate-user';
import { ADD_USER_TEMPLATE } from 'src/constants/external-link';
import RcCsvDownload from '../commons/rc-csv-download/rc-csv-download';
import RcSuccessToast from 'src/components/commons/rc-toast/rc-success-toast';
import RcFailureToast from 'src/components/commons/rc-toast/rc-failure-toast';
import ManualAddInputOptions from '../manual-add-input/manual-add-input.types';

interface AddUserProps {
  onToggleModal: () => void;
  onUploadComplete: () => void;
}

const AddUserDialog: React.FC<AddUserProps> = (props: AddUserProps) => {
  const { t } = useTranslation();
  const { onToggleModal, onUploadComplete } = props;

  const [selectedEmails, setSelectedEmails] = useState<ValueType<OptionTypeBase>>([]);

  const [isUserInviting, setInviteUser] = useState<boolean>(false);

  const onAddedValue = (value: ValueType<OptionTypeBase>) => {
    setSelectedEmails(value);
  };

  const resetSelectedEmails = () => setSelectedEmails([]);

  const checkInvalidEmail = (email: ManualAddInputOptions) => email.isValid === false;

  const isInviteButtonDisable = !!selectedEmails?.length && !selectedEmails?.some(checkInvalidEmail);

  const manualUserInvite = () => {
    setInviteUser(true);
    const emails = selectedEmails?.map((selectedEmail: ManualAddInputOptions) => selectedEmail.value);
    postUsersManually({ emails })
      .then(() => {
        onUploadComplete();
        notification(<RcSuccessToast msg={t('manualAddUserNotification.successMsg')} />);
      })
      .catch((error) => {
        notification(<RcFailureToast primaryMsg={error.message} />);
      })
      .finally(() => {
        setInviteUser(false);
        resetSelectedEmails();
      });
  };

  const CenterContent = () => (
    <>
      <div className="modal-block">
        <h2 className="modal-block__title mb-3x">{t('addUserDialog.uploadLabel')}</h2>
        <UploadCsv
          confirmTitle={t('upload-csv:addUser.confirmationDialog.title')}
          confirmDescription={(fileName) => t('upload-csv:addUser.confirmationDialog.description', { fileName })}
          endpoint={endpoints.ADD_USER_UPLOAD_CSV}
          isFullWidth={false}
          onUpload={onUploadComplete}
        />
        <div className="mt-3x text-small">
          {t('addUserDialog.downloadInstruction')}
          <RcCsvDownload label={t('addUserDialog.downloadLabel')} link={ADD_USER_TEMPLATE} className="text-bold" />
        </div>
      </div>
      <RcSeperator width="617px" label={t('addUserDialog.separatorLabel')} />
    </>
  );

  const ButtonContent = () => (
    <div className="info-block">
      <div>
        <p>{t('addUserDialog.invitationInstruction')}</p>
      </div>
      <div className="button-group">
        <RcButton className="btn btn--grey mr-2x" onClick={onToggleModal} label={t('addUserDialog.cancelBtnLabel')} />
        {isUserInviting ? (
          <RcButton
            className="btn btn--with-icon btn--secondary btn--loading"
            disabled
            label={t('addUserDialog.inviting')}>
            <img src={loadingWhite} alt="Recovvo" width="20" />
          </RcButton>
        ) : (
          <RcButton
            className="btn btn--secondary mr-2x"
            label={t('addUserDialog.inviteBtnLabel')}
            disabled={!isInviteButtonDisable}
            onClick={manualUserInvite}
          />
        )}
      </div>
    </div>
  );

  const footer = () => <p>{t('addUserDialog.emailInstruction')}</p>;

  const closeDialog = () => {
    !isUserInviting && onToggleModal();
  };

  return (
    <ModalDialog footer={footer} isOpen={true} onCloseDialog={closeDialog} headerText={t('addUserDialog.headerLabel')}>
      <CenterContent />
      <div className="modal-block px-8x">
        <h3 className="modal-block__subtitle">{t('addUserDialog.emailManually')}</h3>
        <div className="input-wrap input-wrap--block mt-5x">
          <ManualAddInput
            onAddedValue={onAddedValue}
            getSuggestion={fetchUserSuggestions}
            selectedValue={selectedEmails}
            validateValue={validateUsersEmail}
            noOptionMessage={t('addUserDialog.noOptionMsg')}
            placeholder={t('addUserDialog.placeholder')}
          />
        </div>
        <ButtonContent />
      </div>
    </ModalDialog>
  );
};

export default AddUserDialog;
