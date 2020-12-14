import { connect } from 'react-redux';
import { isEmptyArray } from 'formik';
import { useTranslation } from 'react-i18next';
import { OptionTypeBase, ValueType } from 'react-select';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { MdSearch, MdDeleteSweep, MdWeb, MdDelete } from 'react-icons/md';

import { RootState } from 'src/reducers';
import ToolTip from 'src/components/tool-tip';
import { loadingWhite } from 'src/assets/images';
import notification from 'src/utils/notification';
import UploadCsv from 'src/components/upload-csv';
import * as endpoints from 'src/constants/endpoints';
import * as accountAction from '../../account/account.action';
import ConfirmationDialog from 'src/components/action-dialog';
import * as validationService from 'src/services/validate-user';
import RcButton from 'src/components/commons/rc-button/rc-button';
import * as suppressionService from 'src/services/suppression-list';
import RightFloatingDialog from 'src/components/right-floating-dialog';
import { SUPPRESSION_LIST_TEMPLATE } from 'src/constants/external-link';
import RcFailureToast from 'src/components/commons/rc-toast/rc-failure-toast';
import RcSuccessToast from 'src/components/commons/rc-toast/rc-success-toast';
import { ActionType } from 'src/components/action-dialog/action-dialog.types';
import * as suppressionListAction from '../../account/suppression-list.action';
import RcCsvDownload from 'src/components/commons/rc-csv-download/rc-csv-download';
import ManualAddInput from 'src/components/manual-add-input/manual-add-email-input';
import ManualAddInputOptions from 'src/components/manual-add-input/manual-add-input.types';

interface SuppressionListDialogState {
  isDialogOpen: boolean;
  closeDialog: () => void;
  isSuppressionListAdding: boolean;
  fetchSuppressionList: (searchText: string) => Promise<void>;
  suppressedUsers: Array<suppressionService.FetchSuppressionListState>;
  addSuppressionListManually: (emails: Array<string>) => Promise<boolean>;
  deleteAllSuppressionList: () => Promise<boolean>;
  deleteSuppressedUser: (userId: number) => Promise<boolean>;
  onSuppressionListUploaded: (fileName: string) => void;
  fetchSuppressionListStatus: () => void;
}

const SuppressionListDialog = (props: SuppressionListDialogState) => {
  const { isDialogOpen, closeDialog } = props;

  const { t } = useTranslation(['suppression-dialog', 'account-page']);

  const [selectedUser, setSelectedUser] = useState<suppressionService.FetchSuppressionListState>();

  const [isDeleteAll, setDeleteAllState] = useState<boolean>(false);

  const [isConfirmationOpen, toggleConfirmationDialog] = useState<boolean>(false);

  const closeConfirmationDialog = () => toggleConfirmationDialog(false);

  const showConfirmationDialog = () => toggleConfirmationDialog(true);

  const [selectedEmails, setSelectedEmails] = useState<ValueType<OptionTypeBase>>([]);

  const [searchText, setSearchText] = useState<string>('');

  const onAddedValue = (value: ValueType<OptionTypeBase>) => setSelectedEmails(value);

  const resetSelectedEmails = () => setSelectedEmails([]);

  const checkInvalidEmail = (email: ManualAddInputOptions) => email.isValid === false;

  const isAddBtnDisable = !!selectedEmails?.length && !selectedEmails?.some(checkInvalidEmail);

  useEffect(() => {
    props.fetchSuppressionList(searchText);
  }, []);

  const onClickAddToList = () => {
    const emails = selectedEmails?.map((selectedEmail: ManualAddInputOptions) => selectedEmail.value);

    props
      .addSuppressionListManually(emails)
      .then(() => {
        resetSelectedEmails();
        props.fetchSuppressionList(searchText);
        notification(<RcSuccessToast msg={t('suppression-dialog:message.success')} />);
      })
      .catch(() => {
        resetSelectedEmails();
        notification(<RcFailureToast primaryMsg={t('suppression-dialog:message.error')} />);
      });
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const onDeleteAllSuppressionList = () => {
    setDeleteAllState(true);
    showConfirmationDialog();
  };

  const onDeleteSingleSuppressedUser = (user: suppressionService.FetchSuppressionListState) => {
    setDeleteAllState(false);
    setSelectedUser(user);
    showConfirmationDialog();
  };

  const suppressionListUploaded = (fileName: string) => {
    props.onSuppressionListUploaded(fileName);
    props.fetchSuppressionList(searchText);
  };

  const onConfirmDelete = async () => {
    closeConfirmationDialog();
    if (isDeleteAll) {
      props
        .deleteAllSuppressionList()
        .then(() => {
          notification(<RcSuccessToast msg={t('suppression-dialog:confirmationDialog.removeAll')} />);
          props.fetchSuppressionList(searchText);
        })
        .catch((error) => {
          const message = (error.response && error.response.data.message) || error.message;
          notification(<RcFailureToast primaryMsg={message} />);
        });
    } else {
      selectedUser &&
        props
          .deleteSuppressedUser(selectedUser.id)
          .then(() => {
            notification(
              <RcSuccessToast
                msg={t('suppression-dialog:confirmationDialog.toastMessage', { name: selectedUser?.fullName })}
              />
            );
            props.fetchSuppressionList(searchText);
          })
          .catch((error) => {
            const message = (error.response && error.response.data.message) || error.message;
            notification(<RcFailureToast primaryMsg={message} />);
          });
    }
  };

  const UploadSuppressionCsv = () => (
    <>
      <p className="mb-4x">{t('suppression-dialog:instruction1')}</p>
      <UploadCsv
        confirmTitle={t('upload-csv:suppressionAccountSetting.confirmationDialog.title')}
        confirmDescription={(fileName) =>
          t('upload-csv:suppressionAccountSetting.confirmationDialog.description', { fileName })
        }
        endpoint={endpoints.UPLOAD_SUPPRESSION_LIST}
        onUpload={suppressionListUploaded}
      />
      <p className="d-block text-center mt-4x">
        {t('suppression-dialog:instruction2')}
        <RcCsvDownload label={t('suppression-dialog:downloadTemplateLabel')} link={SUPPRESSION_LIST_TEMPLATE} />
      </p>
    </>
  );

  const Seperator = () => (
    <div className="h-seperator d-flex mt-6x mb-6x">
      <hr className="line-auto" />
      <div className="text">{t('suppression-dialog:seperatorLabel')}</div>
      <hr className="line-auto" />
    </div>
  );

  const userInfo = (user: suppressionService.FetchSuppressionListState) => (
    <div className="list-block__row row">
      <div className="list-block__col col-1 txt-primary-color ">
        <MdWeb className="mt-1x" />
      </div>
      <div className="list-block__col col-8 list-user__info text-normal text-normal">
        <span>{user.fullName}</span>
        <span className="text-light-sm">{user.email}</span>
      </div>
      <div className="list-block__col col-3 col-last icon-large">
        <ToolTip isAlwaysVisible description={t('tool-tip:delete')}>
          <MdDelete onClick={() => onDeleteSingleSuppressedUser(user)} />
        </ToolTip>
      </div>
    </div>
  );

  const UserList = () => (
    <div>
      {props.suppressedUsers.map((user) => {
        if (
          !user.email.toLowerCase().includes(searchText.toLowerCase()) &&
          !user.fullName.toLowerCase().includes(searchText.toLowerCase())
        ) {
          return null;
        }
        return userInfo(user);
      })}
    </div>
  );

  return (
    <React.Fragment>
      <RightFloatingDialog
        isOpen={isDialogOpen}
        closeDialog={closeDialog}
        headerText={t('suppression-dialog:headerLabel')}
        description={t('suppression-dialog:description')}>
        <div className="side-list">
          <div className="side-item">
            <UploadSuppressionCsv />
            <Seperator />
            <p>{t('suppression-dialog:manuallyAddInstruction')}</p>
            <div className="input-wrap input-wrap--block mt-5x">
              <ManualAddInput
                onAddedValue={onAddedValue}
                getSuggestion={suppressionService.fetchSuppressionSuggestions}
                selectedValue={selectedEmails}
                validateValue={validationService.validateSuppressionEmail}
                noOptionMessage={t('suppression-dialog:message.noOption')}
              />
            </div>
            {!props.isSuppressionListAdding ? (
              <RcButton
                className="btn btn--secondary btn--block mt-1x mb-6x"
                disabled={!isAddBtnDisable}
                onClick={onClickAddToList}
                label={t('suppression-dialog:addBtn')}
              />
            ) : (
              <RcButton
                className="btn btn--secondary btn--block mt-1x mb-6x"
                disabled
                label={t('suppression-dialog:addingBtn')}>
                <img src={loadingWhite} alt="Recovvo" width="20" />
              </RcButton>
            )}

            <h4 className="text-uppercase color-grey-50">
              {t('suppression-dialog:existingSuppressedUser', { number: props.suppressedUsers.length })}
            </h4>
            <div className="list-block list-user">
              {!isEmptyArray(props.suppressedUsers) && (
                <div className="list-block__row row">
                  <div className="list-block__col col-9 px-0x">
                    <div className="input-wrap input-wrap--icon-left mb-0x">
                      <input
                        onChange={onInputChange}
                        onBlur={() => setSearchText('')}
                        type="text"
                        placeholder={t('suppression-dialog:message.searchPlaceholder')}
                        className="input input--sm"
                        value={searchText}
                      />
                      <span className="form-icon">
                        <MdSearch className="mr-2x"></MdSearch>
                      </span>
                    </div>
                  </div>
                  <div className="list-block__col col-3 col-last icon-large">
                    <ToolTip isAlwaysVisible description={t('tool-tip:deleteAll')}>
                      <MdDeleteSweep className="cursor-hand" onClick={onDeleteAllSuppressionList} />
                    </ToolTip>
                  </div>
                </div>
              )}
              <UserList />
            </div>
          </div>
        </div>
      </RightFloatingDialog>
      <ConfirmationDialog
        onClose={closeConfirmationDialog}
        onContinue={onConfirmDelete}
        actionType={ActionType.CONFIRMATION}
        title={
          isDeleteAll
            ? t('suppression-dialog:confirmationDialog.deleteAllTitle')
            : t('suppression-dialog:confirmationDialog.singleDeleteTitle')
        }
        isOpen={isConfirmationOpen}
        description={
          isDeleteAll
            ? t('suppression-dialog:confirmationDialog.deleteAll')
            : t('suppression-dialog:confirmationDialog.singleDelete', { name: selectedUser?.fullName })
        }
        confirmMessage={t('suppression-dialog:confirmationDialog.confirmMessage')}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isSuppressionListAdding: state.account.suppressionList.manuallyAdd.isAdding,
    suppressedUsers: state.account.suppressionList.fetchSuppressionList.suppressedUsers,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  addSuppressionListManually: (emails: Array<string>) => dispatch(accountAction.addSuppressionManually(emails)),
  fetchSuppressionList: (searchText: string) => dispatch(suppressionListAction.fetchSuppressionList(searchText)),
  deleteAllSuppressionList: () => dispatch(suppressionListAction.deleteAllSuppressionList()),
  deleteSuppressedUser: (userId: number) => dispatch(suppressionListAction.deleteSingleSuppressionList(userId)),
  fetchSuppressionListStatus: () => {
    dispatch(suppressionListAction.fetchSuppressionListStatus());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SuppressionListDialog);
