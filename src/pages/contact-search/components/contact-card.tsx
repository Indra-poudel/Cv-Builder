import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { MdInfo } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from 'src/constants/routes';
import ToolTip from 'src/components/tool-tip';
import { interpolate } from 'src/utils/string';
import { dateFormat } from 'src/constants/date';
import { IContactDetail } from '../contact-search.types';
import * as contactInfoAction from 'src/pages/contact-search/contact-info.action';

interface ContactCardProps {
  contact: IContactDetail;
  toggleContactDialog: (id: string) => void;
}

const ContactCard = (props: ContactCardProps) => {
  const { t } = useTranslation();
  const { contact } = props;

  const fullName = [contact?.firstName, contact?.lastName].filter(Boolean).join(' ');
  const lastContactDate =
    contact?.lastContactDate && moment(contact.lastContactDate).format(dateFormat.MMM_DD_YYYY_H_MM_A);

  return (
    <div className="col-3-xl col-4-lg col-6">
      <div className="card card--elevated contact-card">
        <div className="card__content">
          <ul className="contact-list">
            <li className="contact-info">
              <span className="c-name text-ellipsis">
                <ToolTip description={fullName || t('contactSearch.contactList.noFullName')}>
                  {fullName || t('contactSearch.contactList.noFullName')}
                </ToolTip>
              </span>
              <span className="c-email text-ellipsis">
                <ToolTip description={contact?.email}>{contact?.email}</ToolTip>
              </span>
            </li>

            <li className="contact-date">
              <span className="c-last">{t('contactSearch.contactList.label.lastContactDate')}</span>
              {lastContactDate ? (
                <span className="c-time">{lastContactDate}</span>
              ) : (
                <span className="c-time color-tertiary-red-20">{`N/A`}</span>
              )}
            </li>
          </ul>
          <div className="contact-icon">
            <ToolTip isAlwaysVisible description={t('tool-tip:showInformation')}>
              <MdInfo className="cursor-pointer" onClick={() => props.toggleContactDialog(contact.id)} />
            </ToolTip>
          </div>
        </div>
        <Link className="card__footer cursor-pointer" to={interpolate(routes.EMAIL_ACTIVITY, { id: contact.id })}>
          <ul className="contact-details">
            <li className="c-contact">
              {t('contactSearch.contactList.text.contactCount', {
                number: `${contact?.totalContactCount}`,
              })}
            </li>
            <li className="c-reply">
              {t('contactSearch.contactList.text.replyCount', {
                number: `${contact?.totalReplyCount}`,
              })}
            </li>
          </ul>
          <ToolTip isAlwaysVisible description={t('tool-tip:numberOfAttachments')}>
            <div className="contact-attachments">{contact?.totalAttachmentCount}</div>
          </ToolTip>
        </Link>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Function) => ({
  toggleContactDialog: (id: string) => dispatch(contactInfoAction.toggleContactInfoDialog(id)),
});

export default connect(null, mapDispatchToProps)(ContactCard);
