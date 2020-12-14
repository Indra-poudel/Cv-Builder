import React from 'react';
import DOMPurify from 'dompurify';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { GoPrimitiveDot } from 'react-icons/go';
import ReactHtmlParser from 'react-html-parser';
import { MdAccountCircle, MdAttachment, MdGetApp, MdSend } from 'react-icons/md';

import { RootState } from 'src/reducers';
import notify from 'src/utils/notification';
import { formatBytes } from 'src/utils/file';
import ToolTip from 'src/components/tool-tip';
import SearchBar from 'src/components/search-bar';
import ModalDialog from 'src/components/modal-dialog';
import ServerError from 'src/pages/server-error/index';
import { extractContentFromHtml } from 'src/utils/string';
import ExtensionIcon from 'src/components/extension-icon';
import { downloadAttachment } from 'src/services/contacts';
import LoadingIndicator from 'src/components/loading-indicator';
import * as emailThreadAction from './email-thread-dialog.action';
import RcFailureToast from 'src/components/commons/rc-toast/rc-failure-toast';
import { EmailThread, EmailThreadAttachment } from '../../email-acitivity.types';

interface StateProps {
  threadSubject: string;
  fromEmail: string;
  toEmails: Array<string>;
  isDialogOpen: boolean;
  closeEmailThreadDialog: () => void;
  emailThreads: Array<EmailThread>;
  emailAttachments: Array<EmailThreadAttachment>;
  isLoading: boolean;
  downloadAttachment: (id: string, fileName: string, fileExtenstion: string) => void;
  isErrorLoading: boolean;
}

const EmailThreadDialog = (props: StateProps) => {
  const { isDialogOpen, closeEmailThreadDialog } = props;
  const [searchText, setSearchText] = React.useState<string>('');
  const { t } = useTranslation(['email-activity']);

  const isSubjectHidden = props.emailThreads.find((thread) => thread.isSuppressed === true);

  const EmailThreadSubject = () => (
    <div className="emailthread__subject">
      <ul className="subject-list">
        <li>
          <span className="subject">
            <span className="icon">
              <MdAccountCircle />
            </span>
            <span>{props.fromEmail}</span>
          </span>
        </li>
        {props.toEmails.map((email, index) => (
          <li key={index}>
            <span className="subject">
              <span className="icon">
                <MdSend />
              </span>
              <span>{email}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  const EmailThreadList = () => (
    <div className="email-list">
      {props.emailThreads.map((emailThread, index) => {
        const threadMessageContent = extractContentFromHtml(emailThread.message);
        const regex = new RegExp(searchText.toLowerCase(), 'ig');

        if (!regex.test(threadMessageContent)) {
          return null;
        }

        return (
          <div className="email-block" key={index}>
            <div className="email-profile">
              <span className="profile-icon">
                <MdAccountCircle />
              </span>
            </div>
            <div className="email-message">
              <div className="email-message__header">
                <span className="email-name">{emailThread.fullName || emailThread.email}</span>
                <span className="email-date">{emailThread.messageDatetime}</span>
              </div>
              <div className="email-message__content">
                {emailThread.isSuppressed && <span>{t('email-activity:hiddenContent')}</span>}
                <p>{textHighLightWithSearchText(emailThread.message, searchText)}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const textHighLightWithSearchText = (htmlContent: string, searchText: string) => {
    if (!searchText) return ReactHtmlParser(htmlContent);

    const regex = new RegExp(searchText.toLowerCase(), 'ig');

    return ReactHtmlParser(htmlContent, {
      transform: (node: any) => {
        const data = node.data;
        if (node.type === 'text' && regex.test(data)) {
          const replacedData = data.replaceAll(regex, (match: string) => {
            return `<span class='highlight'>${match}</span>`;
          });

          return <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(replacedData) }} />;
        }
      },
    });
  };

  const handleOnDownloadAttachment = async (id: string, fileName: string, extension: string) => {
    try {
      await props.downloadAttachment(id, fileName, extension);
    } catch (error) {
      if (!error.status) return;
      const errorMessage = (error.response && error.response.data.message) || error.message;
      notify(errorMessage);
    }
  };

  const EmailThreadAttachments = () => (
    <div className="attachment-block">
      <div className="attachment-header">
        <span className="attachment-icon">
          <MdAttachment />
        </span>
        <h3>{`${props.emailAttachments?.length} Attachments`}</h3>
      </div>
      <div className="attachment-list">
        <ul>
          {props.emailAttachments.map((emailAttachment, index) => {
            const fullFileName = emailAttachment.fileName;
            const fileName = fullFileName.substring(0, fullFileName.lastIndexOf('.'));
            const extension = fullFileName.substr(fullFileName.lastIndexOf('.') + 1);
            const fileSize = formatBytes(emailAttachment.bodySize);

            return (
              <li className="document-pdf" key={index}>
                <div className="attachment-icon">
                  <ExtensionIcon extension={'.' + extension} size={16} />
                </div>
                <div className="attachment-content">
                  {fileName}
                  <span className="document-type">
                    {extension.toUpperCase()}
                    <span className="color-grey-60 m-1x">
                      <GoPrimitiveDot size={8} />
                    </span>
                    {fileSize}
                  </span>
                </div>
                <div className="attachment-actions">
                  {!isSubjectHidden && (
                    <ToolTip className="tooltip-left" isAlwaysVisible description={t('tool-tip:download')}>
                      <span
                        className="action"
                        onClick={() => handleOnDownloadAttachment(emailAttachment.id, fileName, extension)}>
                        <MdGetApp size={16} />
                      </span>
                    </ToolTip>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );

  const handleSearchSubmit = (searchKey: string) => {
    setSearchText(searchKey);
  };

  const headerText = () => {
    if (props.isErrorLoading || props.isLoading) return '';

    return t('email-activity:threadDialog.title', {
      threadSubject: isSubjectHidden ? t('email-activity:hiddenSubject') : props.threadSubject,
    });
  };

  return (
    <ModalDialog isOpen={isDialogOpen} onCloseDialog={closeEmailThreadDialog} headerText={headerText()}>
      {props.isLoading ? (
        <LoadingIndicator />
      ) : props.isErrorLoading ? (
        <ServerError disableHeader />
      ) : (
        <div className="emailthread">
          <EmailThreadSubject />

          <div className="emailthread__content">
            <div className="col-left">
              <SearchBar handleSearchSubmit={handleSearchSubmit} />
              <EmailThreadList />
            </div>
            <div className="col-right">
              <EmailThreadAttachments />
            </div>
          </div>
        </div>
      )}
    </ModalDialog>
  );
};

const mapStateToProps = (state: RootState) => ({
  emailThreads: state.emailActivitySearch.emailThread.emailThreads,
  emailAttachments: state.emailActivitySearch.emailThread.emailAttachments,
  isLoading: state.emailActivitySearch.emailThread.isLoading,
  isDialogOpen: state.emailActivitySearch.emailThread.isDialogOpen,
  fromEmail: state.emailActivitySearch.emailThread.fromEmail,
  toEmails: state.emailActivitySearch.emailThread.toEmails,
  threadSubject: state.emailActivitySearch.emailThread.threadSubject,
  isErrorLoading: state.emailActivitySearch.emailThread.isErrorLoading,
});

const mapDispatchToProps = (dispatch: Function) => ({
  downloadAttachment: downloadAttachment,
  closeEmailThreadDialog: () => dispatch(emailThreadAction.closeEmailThreadDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailThreadDialog);
