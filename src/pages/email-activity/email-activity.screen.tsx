import React from 'react';
import { connect } from 'react-redux';

import { RootState } from 'src/reducers';
import PageNotFound from 'src/components/page-not-found';
import * as emailActivityActions from './email-activity.action';
import EmailActivityList from './components/email-activity-list';
import EmailThreadDialog from './components/email-thread-dialog';
import { PAGE_NUMBER, PAGE_SIZE } from './email-activity.constants';
import EmailActivityHeader from './components/email-activity-header';
import * as emailThreadActions from './components/email-thread-dialog/email-thread-dialog.action';
import { EmailActivity as EmailActivityState, EmailActivityPayload } from 'src/services/email-activities';

interface StateProps {
  isError: boolean;
  emailActivityList: Array<EmailActivityState>;
  contactId: string;
  searchKey: string;
  match: {
    params: {
      id: string;
    };
  };
  fetchEmailActivity: (emailActivityPayload: EmailActivityPayload) => Promise<void>;
  resetEmailActivity: () => void;
  closeEmailThreadDialog: () => void;
}

const EmailActivity = (props: StateProps) => {
  const contactId = props.match.params.id;

  React.useEffect(() => {
    props.fetchEmailActivity({
      contactId: contactId,
      page: PAGE_NUMBER,
      pageSize: PAGE_SIZE,
      searchKey: props.searchKey,
    });
  }, [props.searchKey]);

  React.useEffect(() => {
    return () => {
      props.closeEmailThreadDialog();
      props.resetEmailActivity();
    };
  }, []);

  if (props.isError && props.searchKey === '') return <PageNotFound />;

  return (
    <div className="content-wrap mt-8x">
      <div className="container">
        <div className="content-5x">
          <div className="mb-4x">
            <EmailActivityHeader />
          </div>
          <EmailActivityList contactId={contactId} />
        </div>
      </div>
      <EmailThreadDialog />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  searchKey: state.emailActivitySearch.emailActivity.searchKey,
  isError: state.emailActivitySearch.emailActivity.isError,
  emailList: state.emailActivitySearch.emailActivity.emailActivityList,
});

const mapDispatchToProps = (dispatch: Function) => ({
  closeEmailThreadDialog: () => dispatch(emailThreadActions.closeEmailThreadDialog()),
  fetchEmailActivity: (emailActivityPayload: EmailActivityPayload) =>
    dispatch(emailActivityActions.fetchEmails(emailActivityPayload)),
  resetEmailActivity: () => dispatch(emailActivityActions.resetUsageReportDate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailActivity);
