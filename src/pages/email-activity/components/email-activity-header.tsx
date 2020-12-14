import React from 'react';
import { connect } from 'react-redux';
import { MdArrowBack } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RootState } from 'src/reducers';
import routes from 'src/constants/routes';
import ToolTip from 'src/components/tool-tip';
import SearchBar from 'src/components/search-bar';
import * as emailActivityActions from '../email-activity.action';
import { EmailActivityPayload } from 'src/services/email-activities';

interface StateProps {
  contactName: string;
  contactEmail: string;
  searchEmailActivities: (emailActivityPayload: EmailActivityPayload) => void;
  page: number;
  pageSize: number;
  contactId: string;
}

const EmailActivityHeader = (props: StateProps) => {
  const { t } = useTranslation(['email-activity']);
  const history = useHistory();

  const title = t('email-activity:title') + ' ' + (props.contactName || props.contactEmail);

  const _handleSearchSubmit = (searchKey: string) =>
    props.searchEmailActivities({
      searchKey: searchKey,
      contactId: props.contactId,
      page: props.page,
      pageSize: props.pageSize,
    });

  if (props.contactEmail)
    return (
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center">
          <ToolTip isAlwaysVisible description={t('back')} className="d-flex align-items-center">
            <MdArrowBack
              onClick={() => {
                history.push({ pathname: routes.SEARCH });
              }}
              className="mr-3x cursor-hand"
              size={24}
            />
          </ToolTip>
          <h1 className="d-inline">{title}</h1>
        </span>
        <SearchBar className="col-4 col-3-lg" handleSearchSubmit={_handleSearchSubmit} />
      </div>
    );
  return null;
};

const mapStateToProps = (state: RootState) => ({
  contactName: state.emailActivitySearch.emailActivity.name,
  contactEmail: state.emailActivitySearch.emailActivity.email,
  page: state.emailActivitySearch.emailActivity.pageNumber,
  pageSize: state.emailActivitySearch.emailActivity.pageSize,
  contactId: state.emailActivitySearch.emailActivity.contactId,
});

const mapDispatchToProps = (dispatch: Function) => ({
  searchEmailActivities: (emailActivityPayload: EmailActivityPayload) =>
    dispatch(emailActivityActions.fetchEmails(emailActivityPayload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailActivityHeader);
