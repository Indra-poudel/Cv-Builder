import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ContentLoader from 'react-content-loader';
import { MdAttachFile, MdPanTool } from 'react-icons/md';
import { Column, TableCellProps } from 'react-virtualized';

import { RootState } from 'src/reducers';
import ToolTip from 'src/components/tool-tip';
import { emailActivityColumnKeys } from '../email-activity.constants';
import InfiniteScrollTable from 'src/components/infinite-scroll-table';
import { EmailActivity, EmailActivityPayload } from 'src/services/email-activities';
import * as emailActivityAction from 'src/pages/email-activity/email-activity.action';
import * as emailThreadActions from './email-thread-dialog/email-thread-dialog.action';

interface EmailActivityState {
  contactId: string;
  searchKey: string;
  isError: boolean;
  pageNumber: number;
  hasNextPage: boolean;
  isLoading: boolean;
  isNextPageLoading: boolean;
  emailActivityList: Array<EmailActivity>;
  openEmailThreadDialog: () => void;
  loadEmailThread: (emailActivityId: string) => void;
  fetchEmailActivity: (emailActivityPayload: EmailActivityPayload) => Promise<void>;
  loadMoreEmailActivity: (pageNumber: number, pageSize: number) => Promise<void>;
}

const PAGE_SIZE = 10;

const EmailActivityList = (props: EmailActivityState) => {
  const { t } = useTranslation(['email-activity', 'tool-tip']);

  const headerMetadata = [
    { label: 'Emails', key: emailActivityColumnKeys.emails, width: 200 },
    { label: 'Subject', key: emailActivityColumnKeys.latestSubject, width: 150 },
    { label: 'Snippet', key: emailActivityColumnKeys.snippet, width: 200, sortable: false },
    {
      label: 'Attachment Count',
      key: emailActivityColumnKeys.attachmentCount,
      width: 30,
      sortable: true,
    },
    {
      label: 'Last Updated Date',
      key: emailActivityColumnKeys.lastUpdatedDatetime,
      width: 150,
      sortable: true,
    },
  ];

  const isRowLoaded = ({ index }: { index: number }) => !props.hasNextPage || index < props.emailActivityList.length;

  const cellLoader = () => (
    <ContentLoader>
      <rect x="0" y="70" rx="5" ry="5" width="100%" height="15" />
    </ContentLoader>
  );

  const attachmentCellRender = (attachmentCount: number) => (
    <>
      {attachmentCount > 0 ? (
        <div className="color-primary-base">
          <MdAttachFile size={24} />
        </div>
      ) : null}
    </>
  );

  const emailCellRender = (email: string, isSnippetHidden: boolean) => {
    return (
      <>
        <span className="td-username">
          <ToolTip description={email}>{email}</ToolTip>
        </span>
        {isSnippetHidden && (
          <span className="ml-1x color-tertiary-yellow-40">
            <ToolTip isAlwaysVisible description={t('tool-tip:suppressedConversation')}>
              <MdPanTool />
            </ToolTip>
          </span>
        )}
      </>
    );
  };

  const subjectCellRender = (subject: string, isSnippetHidden: boolean) => {
    return (
      <div className="text-bold text-ellipsis">
        {isSnippetHidden ? (
          <span>{t('email-activity:hiddenSubject')}</span>
        ) : (
          <ToolTip description={subject}>{subject}</ToolTip>
        )}
      </div>
    );
  };

  const bodyCellRender = (body: string, isSnippetHidden: boolean) => {
    return (
      <div className="text-ellipsis">
        {isSnippetHidden ? (
          <span>{t('email-activity:hiddenContent')}</span>
        ) : (
          <ToolTip description={body}>{body}</ToolTip>
        )}
      </div>
    );
  };

  const cellRender = (cellInfo: TableCellProps) => {
    if (!isRowLoaded({ index: cellInfo.rowIndex })) return cellLoader();

    if (cellInfo.dataKey === emailActivityColumnKeys.attachmentCount) {
      return attachmentCellRender(cellInfo.cellData);
    }

    if (cellInfo.dataKey === emailActivityColumnKeys.emails) {
      const email = cellInfo.cellData.join(' ');
      return emailCellRender(email, cellInfo.rowData.isSnippetHidden);
    }

    if (cellInfo.dataKey === emailActivityColumnKeys.latestSubject) {
      return subjectCellRender(cellInfo.cellData, cellInfo.rowData.isSnippetHidden);
    }

    if (cellInfo.dataKey === emailActivityColumnKeys.snippet) {
      return bodyCellRender(cellInfo.cellData, cellInfo.rowData.isSnippetHidden);
    }

    return (
      <div>
        <ToolTip description={cellInfo.cellData}>{cellInfo.cellData}</ToolTip>
      </div>
    );
  };

  const onRowClick = (rowData: EmailActivity) => {
    props.openEmailThreadDialog();
    props.loadEmailThread(rowData.id);
  };

  const tableColumns = () =>
    headerMetadata.map((data) => {
      return (
        <Column
          className={data.key === emailActivityColumnKeys.emails ? 'primary' : ''}
          key={data.key}
          flexGrow={1}
          width={data.width}
          label={data.label}
          dataKey={data.key}
          columnData={headerMetadata}
          cellRenderer={cellRender}
        />
      );
    });

  return (
    <InfiniteScrollTable
      {...props}
      pageSize={PAGE_SIZE}
      errorMessage={'Not Found'}
      emptyListMessage={'Not Found'}
      disableHeader={true}
      onRowClick={onRowClick}
      tableColumns={tableColumns}
      loadMoreListItem={props.loadMoreEmailActivity}
      list={props.emailActivityList}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  searchKey: state.emailActivitySearch.emailActivity.searchKey,
  emailActivityList: state.emailActivitySearch.emailActivity.emailActivityList,
  hasNextPage: state.emailActivitySearch.emailActivity.hasNextPage,
  isLoading: state.emailActivitySearch.emailActivity.isLoading,
  pageNumber: state.emailActivitySearch.emailActivity.pageNumber,
  isError: state.emailActivitySearch.emailActivity.isError,
  isNextPageLoading: state.emailActivitySearch.emailActivity.isNextPageLoading,
});

const mapDispatchToProps = (dispatch: Function) => ({
  openEmailThreadDialog: () => dispatch(emailThreadActions.openEmailThreadDialog()),
  loadEmailThread: (emailActivityId: string) => dispatch(emailThreadActions.loadEmailThread(emailActivityId)),
  fetchEmailActivity: (emailActivityPayload: EmailActivityPayload) =>
    dispatch(emailActivityAction.fetchEmails(emailActivityPayload)),
  loadMoreEmailActivity: (pageNumber: number, pageSize: number) =>
    dispatch(emailActivityAction.loadMoreEmailActivity(pageNumber, pageSize)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailActivityList);
