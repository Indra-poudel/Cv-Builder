import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import SearchBar from './search-bar';
import { RootState } from 'src/reducers';
import SearchStart from './search-start';
import ContactsList from './contacts-list';
import ContactInfoDialog from './contact-info-dialog';
import * as contactInfoActions from '../contact-info.action';
import * as contactSearchActions from '../contact-search.action';
import EmailThreadDialog from 'src/pages/email-activity/components/email-thread-dialog';
import * as emailThreadAction from 'src/pages/email-activity/components/email-thread-dialog/email-thread-dialog.action';

interface StateProps {
  closeEmailThreadDialog: () => void;
  searchContacts: (searchKey: any) => void;
  hideEmptyRecordsPage: () => void;
  toggleSearchStartScreen: (isShown: boolean) => void;
  toggleContactInfoDialog: () => void;
  isSearchStartShown: boolean;
}

const ContactSearchComponent = (props: StateProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      props.closeEmailThreadDialog();
      props.toggleContactInfoDialog();
    };
  }, []);

  const handleSearch = (searchKey: string) => {
    props.searchContacts(searchKey);
  };

  const handleSearchCancel = () => props.toggleSearchStartScreen(true);

  const ContactSearchBody = () => {
    if (props.isSearchStartShown) return <SearchStart />;

    return <ContactsList />;
  };

  return (
    <>
      <div className="content-wrap mt-8x">
        <div className="container">
          <div className="content-5x">
            <div className="content-center">
              <SearchBar
                placeholder={t('contactSearch.searchPlaceHolder')}
                onSearchSubmit={handleSearch}
                onCloseClicked={handleSearchCancel}
              />
            </div>
            <ContactSearchBody />
          </div>
        </div>
      </div>
      <ContactInfoDialog />
      <EmailThreadDialog />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  openedTab: state.contactSearch.openedTab,
  isSearchStartShown: state.contactSearch.isSearchStartShown,
});

const mapDispatchToProps = (dispatch: Function) => ({
  closeEmailThreadDialog: () => dispatch(emailThreadAction.closeEmailThreadDialog()),
  searchContacts: (searchKey: string) => dispatch(contactSearchActions.searchContacts(searchKey)),
  hideEmptyRecordsPage: () => dispatch(contactSearchActions.hideEmptyRecords()),
  toggleSearchStartScreen: (isShown: boolean) => dispatch(contactSearchActions.toggleSearchStartScreen(isShown)),
  toggleContactInfoDialog: () => dispatch(contactInfoActions.toggleContactInfoDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactSearchComponent);
