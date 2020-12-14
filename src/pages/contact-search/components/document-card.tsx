import { connect } from 'react-redux';
import { isEmptyArray } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GoPrimitiveDot } from 'react-icons/go';
import { MdEmail, MdFileDownload, MdPerson, MdSend, MdDomain } from 'react-icons/md';

import { formatBytes } from 'src/utils/file';
import ToolTip from 'src/components/tool-tip';
import ExtensionIcon from 'src/components/extension-icon';
import { IDocumentDetail } from '../contact-search.types';
import { downloadAttachment } from 'src/services/contacts';
import * as emailThreadActions from 'src/pages/email-activity/components/email-thread-dialog/email-thread-dialog.action';

interface DocumentCardProps {
  document: IDocumentDetail;
  openEmailThreadDialog: () => void;
  loadEmailThread: (emailActivityId: string) => void;
}

const DocumentCard = (props: DocumentCardProps) => {
  const { t } = useTranslation(['contact-search', 'translation']);
  const { document } = props;
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const toggleDropDown = () => setShowDropDown((showDropDown) => !showDropDown);

  const fullFileName = document.fileName;
  const fileName = fullFileName.substring(0, fullFileName.lastIndexOf('.'));
  const extension = fullFileName.substr(fullFileName.lastIndexOf('.') + 1);
  const fileSize = formatBytes(document.bodySize);

  const [firstRecevier, ...otherReceiver] = document.receiverEmails;

  const renderRowDocumentInfo = () => (
    <li className="document-info">
      <div className="document-info-icon">
        <ExtensionIcon extension={'.' + extension} />
      </div>
      <span className="c-name">
        <ToolTip description={fileName}>{fileName}</ToolTip>
      </span>
      <span className="c-sub">
        {extension.toUpperCase()}
        <span className="color-grey-60 m-1x">
          <GoPrimitiveDot size={8} />
        </span>
        {fileSize}
      </span>
    </li>
  );

  const renderRowDocumentSender = () => {
    const sender =
      (document.senderFullName && document.senderFullName.trim()) ||
      document.senderEmail ||
      t('translation:contactSearch.contactList.noFullName');
    return (
      <li className="document-person row">
        <div className="col-2 document-item-icon">
          <ToolTip isAlwaysVisible description={t('tool-tip:sender')}>
            <MdPerson />
          </ToolTip>
        </div>
        <div className="col-9 text-small text-medium">
          <ToolTip description={sender}>{sender}</ToolTip>
        </div>
      </li>
    );
  };

  const renderRowDocumentDomain = () => (
    <li className="document-domain row">
      <div className="col-2 document-item-icon">
        <ToolTip isAlwaysVisible description={t('tool-tip:domain')}>
          <MdDomain />
        </ToolTip>
      </div>
      <div className="col-9 text-small text-medium">
        <a
          target="_blank"
          rel="noreferrer noopener"
          href={`https://${document.domain}`}
          className="c-last"
          title={`https://${document.domain}`}>
          <ToolTip description={document.domain}>{document.domain}</ToolTip>
        </a>
      </div>
    </li>
  );

  const renderRowDocumentReceiver = () => (
    <li className="document-reciever row">
      <div className="col-2 document-item-icon">
        <ToolTip isAlwaysVisible description={t('tool-tip:recipient')}>
          <MdSend />
        </ToolTip>
      </div>
      <div className="col-9 text-small">
        <span className="c-last text-ellipsis">
          <ToolTip description={firstRecevier.fullName || firstRecevier.email}>
            {firstRecevier.fullName || firstRecevier.email}
          </ToolTip>
        </span>
        {!isEmptyArray(otherReceiver) && (
          <button className="btn btn-dropdown c-time" onClick={toggleDropDown} onBlur={() => setShowDropDown(false)}>
            {`${t('contact-search:documentList.additionalRecipient', { number: otherReceiver.length })}`}
            {showDropDown && (
              <ul className="btn-dropdown__submenu">
                {otherReceiver.map((item) => (
                  <li key={item.email}>
                    <span className="submenu-link">
                      <ToolTip isAlwaysVisible description={item.fullName || firstRecevier.email}>
                        {item.fullName || firstRecevier.email}
                      </ToolTip>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </button>
        )}
      </div>
    </li>
  );

  const onClickEmailIcon = () => {
    props.loadEmailThread(document.providerUserThreadId);
    props.openEmailThreadDialog();
  };

  return (
    <div className="col-3-xl col-4-lg col-6">
      <div className="card card--elevated document-card">
        <div className="card__content">
          <ul className="document-list">
            {renderRowDocumentInfo()}
            {renderRowDocumentSender()}
            {renderRowDocumentReceiver()}
            {renderRowDocumentDomain()}
          </ul>

          <div className="document-icon">
            <ToolTip isAlwaysVisible description={t('tool-tip:download')}>
              <MdFileDownload className="mr-2x" onClick={() => downloadAttachment(document.id, fileName, extension)} />
            </ToolTip>
            <ToolTip isAlwaysVisible description={t('tool-tip:showEmailThread')}>
              <MdEmail onClick={onClickEmailIcon} />
            </ToolTip>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Function) => ({
  openEmailThreadDialog: () => dispatch(emailThreadActions.openEmailThreadDialog()),
  loadEmailThread: (emailActivityId: string) => dispatch(emailThreadActions.loadEmailThread(emailActivityId)),
});

export default connect(null, mapDispatchToProps)(DocumentCard);
