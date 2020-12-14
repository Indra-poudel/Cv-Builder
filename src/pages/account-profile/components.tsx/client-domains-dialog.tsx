import React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { MdSearch, MdWeb } from 'react-icons/md';

import { dateFormat } from 'src/constants/date';
import { ClientDomainResponse } from '../account-profile.types';
import RightFloatingDialog from 'src/components/right-floating-dialog';

interface StateProps {
  clientDomains: Array<ClientDomainResponse>;
  closeDialog: () => void;
  isDialogOpen: boolean;
}

const ClientDomainsDialog = (props: StateProps) => {
  const { t } = useTranslation(['account-profile']);

  const [searchText, setSearchText] = React.useState<string>('');

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const ClientDomainsList = () => (
    <div>
      {props.clientDomains?.map((clientDomain: ClientDomainResponse) => {
        if (!clientDomain.domain.toLowerCase().includes(searchText.toLowerCase())) {
          return;
        }
        return (
          <div key={clientDomain.id} className="list-block__row row">
            <div className="list-block__col col-1 txt-primary-color ">
              <MdWeb className="mt-1x" />
            </div>
            <div className="list-block__col col-8 list-user__info text-normal">
              <span>{clientDomain.domain}</span>
              <span className="text-light-sm">
                {t('account-profile:clientDomainsDialog.label.mappedDate', {
                  date: moment(clientDomain.mappedDate).format(dateFormat.MMMM_DD_YYYY),
                })}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <RightFloatingDialog
      isOpen={props.isDialogOpen}
      closeDialog={props.closeDialog}
      headerText={t('account-profile:clientDomainsDialog.label.header')}>
      <div className="list-block list-user">
        <h4 className="text-uppercase color-grey-50 row">
          {t('account-profile:clientDomainsDialog.label.subHeader', { number: props.clientDomains.length })}
        </h4>
        <div className="list-block__row row">
          <div className="list-block__col col-9 px-0x">
            <div className="input-wrap input-wrap--icon-left mb-0x">
              <input
                onChange={onInputChange}
                type="text"
                placeholder={t('account-profile:clientDomainsDialog.label.search')}
                className="input input--sm"
                value={searchText}
              />
              <span className="form-icon">
                <MdSearch className="mr-2x" />
              </span>
            </div>
          </div>
        </div>
        <ClientDomainsList />
      </div>
    </RightFloatingDialog>
  );
};

export default ClientDomainsDialog;
