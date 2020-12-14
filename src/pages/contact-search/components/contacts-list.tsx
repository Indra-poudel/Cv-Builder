import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { MdPersonOutline, MdLibraryBooks } from 'react-icons/md';

import { RootState } from 'src/reducers';
import ContactFilters from './contact-filters';
import DocumentCardList from './document-card-list';
import ContactsCardList from './contacts-card-list';
import { TAB_KEYS } from '../contact-search.constants';
import { IContactDetail } from '../contact-search.types';
import * as contactSearchActions from '../contact-search.action';
import * as documentSearchActions from '../document-search.action';
import LoadingIndicator from '../../../components/loading-indicator';

interface StateProps {
  searchKey: string;
  contacts: Array<IContactDetail>;
  isContactListLoading: boolean;
  openedTab: string;
  searchDocuments: () => void;
  searchContacts: (searchKey: string) => void;
  toggleOpenedTab: (openTab: string) => void;
  resetContactFilter: () => void;
}

const ContactsList = (props: StateProps) => {
  const { t } = useTranslation();
  const { contacts, openedTab } = props;

  const contactTabs = [
    {
      key: TAB_KEYS.CONTACTS,
      tabName: t('contactSearch.label.contacts'),
      icon: <MdPersonOutline />,
    },
    {
      key: TAB_KEYS.DOCUMENTS,
      tabName: t('contactSearch.label.documents'),
      icon: <MdLibraryBooks />,
    },
  ];

  const onSelectTab = (selectedTab: string) => {
    props.resetContactFilter();
    if (selectedTab === TAB_KEYS.DOCUMENTS && props.openedTab !== TAB_KEYS.DOCUMENTS) {
      props.searchDocuments();
    }
    if (selectedTab === TAB_KEYS.CONTACTS && props.openedTab !== TAB_KEYS.CONTACTS) {
      props.searchContacts(props.searchKey);
    }
    props.toggleOpenedTab(selectedTab);
  };

  const InfiniteScrollingList = () => {
    if (props.openedTab === TAB_KEYS.DOCUMENTS) {
      return <DocumentCardList />;
    }

    return <ContactsCardList />;
  };

  const ContactTab = () => {
    return (
      <div className="switch-container">
        {contactTabs.map((item) => (
          <div key={item.key} onClick={() => onSelectTab(item.key)} className={item.key === openedTab ? 'active' : ''}>
            {item.icon}
            <span>{item.tabName}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="content-center">
        <ContactFilters />
      </div>
      {props.isContactListLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <div className="h-seperator d-flex mb-4x mt-4x">
            <hr className="line-auto" />
            {contacts && <ContactTab />}
            <hr className="line-auto" />
          </div>
          <div className="content-card">
            <InfiniteScrollingList />
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  contacts: state.contactSearch.contacts,
  searchKey: state.contactSearch.searchKey,
  isContactListLoading: state.contactSearch.isContactListLoading,
  openedTab: state.contactSearch.openedTab,
});

const mapDispatchToProps = (dispatch: Function) => ({
  searchDocuments: () => dispatch(documentSearchActions.searchDocuments()),
  resetContactFilter: () => dispatch(contactSearchActions.resetFilterOptions()),
  searchContacts: (searchKey: string) => dispatch(contactSearchActions.searchContacts(searchKey)),
  toggleOpenedTab: (openTab: string) => dispatch(contactSearchActions.toggleOpenedTab(openTab)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
