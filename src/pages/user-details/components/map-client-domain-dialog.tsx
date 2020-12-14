import { connect } from 'react-redux';
import { isEmptyArray } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OptionTypeBase, ValueType } from 'react-select';

import { RootState } from 'src/reducers';
import { getRole } from 'src/utils/role';
import { formatDate } from 'src/utils/date';
import ToolTip from 'src/components/tool-tip';
import { interpolate } from 'src/utils/string';
import { USER_ROLE } from 'src/constants/users';
import { loadingWhite } from 'src/assets/images';
import UploadCsv from 'src/components/upload-csv';
import notification from 'src/utils/notification';
import { IUserDetails } from '../user-details.types';
import * as endpoints from 'src/constants/endpoints';
import AccessControl from 'src/components/access-control';
import * as userDetailAction from '../user-details.action';
import { MdDelete, MdSearch, MdWeb } from 'react-icons/md';
import { ClientDomainResponse } from '../user-details.types';
import ManualAddInput from 'src/components/manual-add-input';
import ConfirmationDialog from 'src/components/action-dialog';
import * as validationService from 'src/services/validate-user';
import RcButton from 'src/components/commons/rc-button/rc-button';
import * as clientDomainService from 'src/services/client-domain';
import RightFloatingDialog from 'src/components/right-floating-dialog';
import RcFailureToast from 'src/components/commons/rc-toast/rc-failure-toast';
import RcSuccessToast from 'src/components/commons/rc-toast/rc-success-toast';
import { ActionType } from 'src/components/action-dialog/action-dialog.types';
import { ONBOARDING_DOMAIN_UPLOAD_TEMPLATE } from 'src/constants/external-link';
import RcCsvDownload from 'src/components/commons/rc-csv-download/rc-csv-download';
import ManualAddInputOptions from 'src/components/manual-add-input/manual-add-input.types';

interface MapClientDomainDialogState {
  userId: string;
  isDialogOpen: boolean;
  userDetails: IUserDetails;
  clientDomains: Array<ClientDomainResponse>;
  closeDialog: () => void;
  fetchUserDetails: (id: string) => void;
  deleteClientDomain: (userId: string, clientDomainId: number) => Promise<boolean>;
  isClientDomainMapping: boolean;
  manuallyMapClientDomains: (id: string, domains: Array<string>) => Promise<boolean>;
}

const MapClientDomainDialog = (props: MapClientDomainDialogState) => {
  const { isDialogOpen, closeDialog, userId } = props;

  const { t } = useTranslation(['map-client-domain-dialog']);

  const [selectedDomains, setSelectedDomains] = useState<ValueType<OptionTypeBase>>([]);

  const onAddedValue = (value: ValueType<OptionTypeBase>) => setSelectedDomains(value);

  const resetSelectedDomains = () => setSelectedDomains([]);

  const checkInvalidDomain = (domain: ManualAddInputOptions) => domain.isValid === false;

  const isAddBtnDisable = !!selectedDomains?.length && !selectedDomains?.some(checkInvalidDomain);

  const [searchText, setSearchText] = useState<string>('');

  const [isDeleteConfirmationOpen, toggleDeleteConfirmationDialog] = useState<boolean>(false);

  const [selectedClientDomain, setSelectedClientDomain] = useState<ClientDomainResponse>();

  const closeDeleteConfirmationDialog = () => toggleDeleteConfirmationDialog(false);

  const showDeleteConfirmationDialog = () => toggleDeleteConfirmationDialog(true);

  const isAdmin = () => getRole() === USER_ROLE.ADMIN;

  const onDeleteDomainClicked = (clientDomain: ClientDomainResponse) => {
    setSelectedClientDomain(clientDomain);
    showDeleteConfirmationDialog();
  };

  const onConfirmDelete = () => {
    closeDeleteConfirmationDialog();

    if (selectedClientDomain) {
      const fullName = [props.userDetails?.firstName, props.userDetails?.lastName].filter(Boolean).join(' ');
      props
        .deleteClientDomain(userId, selectedClientDomain.id)
        .then(() => {
          notification(
            <RcSuccessToast
              msg={t('map-client-domain-dialog:deleteConfirmationDialog.toastMessage', {
                domain: selectedClientDomain.domain,
                user: fullName,
              })}
            />
          );
        })
        .catch((error) => {
          const message = (error.response && error.response.data.message) || error.message;
          notification(<RcFailureToast primaryMsg={message} />);
        });
    }
  };

  const UPLOAD_URL = interpolate(endpoints.DOMAIN_MAP_TO_USER, { id: userId });

  const onUploadClientDomain = (fileName: string) => {
    props.fetchUserDetails(userId);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const _getClientDomainsSuggestions = async (searchKey: string) => {
    const clientDomain = await clientDomainService.fetchClientDomainList(searchKey, userId);

    return clientDomain.map((domain) => domain.domain);
  };

  const onClickAddToList = () => {
    const domains = selectedDomains?.map((selectedDomains: ManualAddInputOptions) => selectedDomains.value);

    props
      .manuallyMapClientDomains(userId, domains)
      .then(() => {
        resetSelectedDomains();
        props.fetchUserDetails(userId);
        notification(<RcSuccessToast msg={t('map-client-domain-dialog:message.success')} />);
      })
      .catch(() => {
        resetSelectedDomains();
        notification(<RcFailureToast primaryMsg={t('map-client-domain-dialog:message.error')} />);
      });
  };

  const UploadClientMapCsv = () => (
    <>
      <p>{t('map-client-domain-dialog:instruction1')}</p>
      <UploadCsv
        confirmTitle={t('upload-csv:mapUserDetails.confirmationDialog.title')}
        confirmDescription={(fileName) => t('upload-csv:mapUserDetails.confirmationDialog.description', { fileName })}
        endpoint={UPLOAD_URL}
        onUpload={onUploadClientDomain}
      />
      <p className="d-block text-center">
        {t('map-client-domain-dialog:instruction2')}
        <RcCsvDownload
          label={t('map-client-domain-dialog:downloadTemplateLabel')}
          link={ONBOARDING_DOMAIN_UPLOAD_TEMPLATE}
        />
      </p>
    </>
  );

  const domainInfo = (clientDomain: ClientDomainResponse) => {
    const dateString = formatDate(clientDomain.mappedDate);

    return (
      <div className="list-block__row row">
        <div className="list-block__col col-1 txt-primary-color ">
          <MdWeb className="mt-1x" />
        </div>
        <div className="list-block__col col-8 list-user__info text-normal text-normal">
          <span>{clientDomain.domain}</span>
          <span className="text-light-sm">{t('map-client-domain-dialog:lastMapped', { date: dateString })}</span>
        </div>
        <AccessControl allowedRoles={[USER_ROLE.ADMIN]}>
          <div className="list-block__col col-3 col-last icon-large">
            <ToolTip isAlwaysVisible description={t('tool-tip:delete')}>
              <MdDelete onClick={() => onDeleteDomainClicked(clientDomain)} />
            </ToolTip>
          </div>
        </AccessControl>
      </div>
    );
  };

  const DomainList = () => (
    <div>
      {props.clientDomains.map((domain) => {
        if (!domain.domain.toLowerCase().includes(searchText.toLowerCase())) {
          return null;
        }
        return domainInfo(domain);
      })}
    </div>
  );

  const Seperator = () => (
    <div className="h-seperator d-flex mt-6x mb-6x">
      <hr className="line-auto" />
      <div className="text">{t('map-client-domain-dialog:seperatorLabel')}</div>
      <hr className="line-auto" />
    </div>
  );

  return (
    <>
      <RightFloatingDialog
        isOpen={isDialogOpen}
        closeDialog={closeDialog}
        headerText={isAdmin() ? t('map-client-domain-dialog:header') : t('map-client-domain-dialog:supervisorHeader')}
        description={isAdmin() ? t('map-client-domain-dialog:description') : ''}>
        <div className="side-list">
          <AccessControl allowedRoles={[USER_ROLE.ADMIN]}>
            <div className="side-item">
              <UploadClientMapCsv />
              <Seperator />
              <p>{t('map-client-domain-dialog:manuallyAddInstruction')}</p>
              <div className="input-wrap input-wrap--block mt-5x">
                <ManualAddInput
                  onAddedValue={onAddedValue}
                  getSuggestion={_getClientDomainsSuggestions}
                  validateValue={validationService.validateClientDomain}
                  selectedValue={selectedDomains}
                  noOptionMessage={t('map-client-domain-dialog:message.noOption')}
                />
              </div>
              {!props.isClientDomainMapping ? (
                <RcButton
                  className="btn btn--secondary btn--block mt-1x mb-4x"
                  disabled={!isAddBtnDisable}
                  onClick={onClickAddToList}
                  label={t('map-client-domain-dialog:addBtn')}
                />
              ) : (
                <RcButton
                  className="btn btn--secondary btn--block mt-1x mb-4x"
                  disabled
                  label={t('map-client-domain-dialog:addingBtn')}>
                  <img src={loadingWhite} alt="Recovvo" width="20" />
                </RcButton>
              )}
            </div>
          </AccessControl>
          <div className="side-item mt-6x">
            <h4 className="text-uppercase color-grey-50">
              {t('map-client-domain-dialog:existingDomains', { number: props.clientDomains.length })}
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
                        placeholder={t('map-client-domain-dialog:message.searchPlaceholder')}
                        className="input input--sm"
                        value={searchText}
                      />
                      <span className="form-icon">
                        <MdSearch className="mr-2x" />
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
        onClose={closeDeleteConfirmationDialog}
        onContinue={onConfirmDelete}
        actionType={ActionType.CONFIRMATION}
        title={t('map-client-domain-dialog:deleteConfirmationDialog.title')}
        isOpen={isDeleteConfirmationOpen}
        description={t('map-client-domain-dialog:deleteConfirmationDialog.singleDelete', {
          name: selectedClientDomain?.domain,
        })}
        confirmMessage={t('map-client-domain-dialog:deleteConfirmationDialog.confirmMessage')}
      />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  userId: state.user.userDetails.id,
  userDetails: state.user.userDetails,
  clientDomains: state.user.userDetails.clientDomains,
  isClientDomainMapping: state.user.isClientDomainMapping,
});

const mapDispatchToProps = (dispatch: Function) => ({
  fetchUserDetails: (id: string) => dispatch(userDetailAction.fetchUserDetails(id)),
  deleteClientDomain: (userId: string, clientDomainId: number) =>
    dispatch(userDetailAction.deleteClientDomain(userId, clientDomainId)),
  manuallyMapClientDomains: (id: string, domains: Array<string>) =>
    dispatch(userDetailAction.mapClientDomainsManually(id, domains)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapClientDomainDialog);
