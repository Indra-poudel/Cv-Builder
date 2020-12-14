import { connect } from 'react-redux';
import { isEmptyArray } from 'formik';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { MdWeb, MdDelete, MdSearch } from 'react-icons/md';

import { RootState } from 'src/reducers';
import { formatDate } from 'src/utils/date';
import ToolTip from 'src/components/tool-tip';
import notification from 'src/utils/notification';
import UploadCsv from 'src/components/upload-csv';
import * as endpoints from 'src/constants/endpoints';
import * as clientDomainAction from './client-domain.action';
import ConfirmationDialog from 'src/components/action-dialog';
import RightFloatingDialog from 'src/components/right-floating-dialog';
import { ClientDomainResponseState } from 'src/services/client-domain';
import RcSuccessToast from 'src/components/commons/rc-toast/rc-success-toast';
import { ActionType } from 'src/components/action-dialog/action-dialog.types';
import { ONBOARDING_DOMAIN_UPLOAD_TEMPLATE } from 'src/constants/external-link';
import RcCsvDownload from 'src/components/commons/rc-csv-download/rc-csv-download';

interface ClientDomainDialogState {
  isDialogOpen: boolean;
  closeDialog: () => void;
  isCsvUploading: boolean;
  onDomainUploaded: (fileName: string) => void;
  clientDomains: Array<ClientDomainResponseState>;
  fetchClientDomainList: (searchText: string) => Promise<void>;
  deleteClientDomain: (id: number) => Promise<boolean>;
}

const ClientDomainDialog = (props: ClientDomainDialogState) => {
  const { t } = useTranslation(['client-domain-dialog', 'account-page']);

  const [searchText, setSearchText] = useState<string>('');

  const [selectedClientDomain, setSelectedClientDomain] = useState<ClientDomainResponseState>();

  const [isConfirmationOpen, toggleConfirmationDialog] = useState<boolean>(false);

  const closeConfirmationDialog = () => toggleConfirmationDialog(false);

  const showConfirmationDialog = () => toggleConfirmationDialog(true);

  useEffect(() => {
    props.fetchClientDomainList(searchText);
  }, []);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const clientDomainsUploaded = (fileName: string) => {
    props.onDomainUploaded(fileName);
    props.fetchClientDomainList(searchText);
  };

  const onDeleteClientDomain = (clientDomain: ClientDomainResponseState) => {
    setSelectedClientDomain(clientDomain);
    showConfirmationDialog();
  };

  const onConfirmDelete = () => {
    if (selectedClientDomain) {
      props
        .deleteClientDomain(selectedClientDomain.id)
        .then(() => {
          notification(
            <RcSuccessToast
              msg={t('client-domain-dialog:confirmationDialog.toastMessage', { name: selectedClientDomain.domain })}
            />
          );
          props.fetchClientDomainList(searchText);
        })
        .catch((err) => {
          notification(err);
        });
    }
    closeConfirmationDialog();
  };

  const { isDialogOpen, closeDialog } = props;

  const UploadSuppressionCsv = () => (
    <>
      <p className="mb-4x">{t('client-domain-dialog:instruction1')}</p>
      <UploadCsv
        confirmTitle={t('upload-csv:mapAccountSetting.confirmationDialog.title')}
        confirmDescription={(fileName) =>
          t('upload-csv:mapAccountSetting.confirmationDialog.description', { fileName })
        }
        endpoint={endpoints.ONBOARDING_DOMAIN_UPLOAD}
        onUpload={clientDomainsUploaded}
      />
      <p className="d-block text-center mt-4x">
        {t('client-domain-dialog:instruction2')}
        <RcCsvDownload
          label={t('client-domain-dialog:downloadTemplateLabel')}
          link={ONBOARDING_DOMAIN_UPLOAD_TEMPLATE}
        />
      </p>
    </>
  );

  const domainInfo = (clientDomain: ClientDomainResponseState) => {
    const fullDate = formatDate(clientDomain.updatedAt);

    return (
      <div className="list-block__row row">
        <div className="list-block__col col-1 txt-primary-color ">
          <MdWeb className="mt-1x" />
        </div>
        <div className="list-block__col col-8 list-user__info text-normal text-normal">
          <span>{clientDomain.domain}</span>
          <span className="text-light-sm">{t('client-domain-dialog:lastMapped', { date: fullDate })}</span>
        </div>
        <div className="list-block__col col-3 col-last icon-large">
          <ToolTip isAlwaysVisible description={t('tool-tip:delete')}>
            <MdDelete onClick={() => onDeleteClientDomain(clientDomain)} />
          </ToolTip>
        </div>
      </div>
    );
  };

  const DomainList = () => (
    <div>
      {props.clientDomains.map((domain) => {
        if (!domain.domain.toLowerCase().includes(searchText.toLowerCase())) {
          return;
        }
        return domainInfo(domain);
      })}
    </div>
  );

  return (
    <React.Fragment>
      <RightFloatingDialog
        isOpen={isDialogOpen}
        closeDialog={closeDialog}
        headerText={t('client-domain-dialog:header')}
        description={t('client-domain-dialog:description')}>
        <div className="side-list">
          <div className="side-item">
            <UploadSuppressionCsv />
          </div>
          <div className="side-item mt-6x">
            <h4 className="text-uppercase color-grey-50">
              {t('client-domain-dialog:existingDomains', { number: props.clientDomains.length })}
            </h4>
            <div className="list-block list-user">
              {!isEmptyArray(props.clientDomains) && (
                <div className="list-block__row row">
                  <div className="list-block__col col-9 px-0x">
                    <div className="input-wrap input-wrap--icon-left mb-0x">
                      <input
                        onChange={onInputChange}
                        onBlur={() => setSearchText('')}
                        type="text"
                        placeholder={t('client-domain-dialog:message.searchPlaceholder')}
                        className="input input--sm"
                        value={searchText}
                      />
                      <span className="form-icon">
                        <MdSearch className="mr-2x"></MdSearch>
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <DomainList />
            </div>
          </div>
        </div>
      </RightFloatingDialog>
      <ConfirmationDialog
        onClose={closeConfirmationDialog}
        onContinue={onConfirmDelete}
        actionType={ActionType.CONFIRMATION}
        title={t('client-domain-dialog:confirmationDialog.title')}
        isOpen={isConfirmationOpen}
        description={t('client-domain-dialog:confirmationDialog.singleDelete', { name: selectedClientDomain?.domain })}
        confirmMessage={t('client-domain-dialog:confirmationDialog.confirmMessage')}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isCsvUploading: state.csvUpload.isUploading,
    clientDomains: state.account.clientDomainList.domains,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  fetchClientDomainList: (searchText: string) => dispatch(clientDomainAction.fetchClientDomainList(searchText)),
  deleteClientDomain: (id: number) => dispatch(clientDomainAction.deleteClientDomain(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientDomainDialog);
