import moment from 'moment';

import { dateFormat } from 'src/constants/date';
import { EmailActivity, EmailThread, EmailThreadAttachment, EmailThreadResponse } from './email-acitivity.types';

export const formatEmailActivities = (emailActivities: Array<EmailActivity>): Array<EmailActivity> =>
  emailActivities.map((emailActivity) => {
    const formattedLastEmailDate =
      emailActivity.lastUpdatedDatetime &&
      moment(emailActivity.lastUpdatedDatetime).format(dateFormat.MMM_DD_YYYY_HH_MM_A);

    return {
      ...emailActivity,
      latestSubject: emailActivity.subject || '-',
      snippet: emailActivity.snippet || '-',
      lastUpdatedDatetime: formattedLastEmailDate || '-',
    };
  });

export const mapEmailThreadsResponse = (emailThreadsResponse: Array<EmailThreadResponse>) => {
  const emailAttachments: Array<EmailThreadAttachment> = [];
  const emailThreads: Array<EmailThread> = [];

  emailThreadsResponse.forEach((emailThreadResponse) => {
    emailAttachments.push(...emailThreadResponse.attachments);

    const formattedMessageDateTime =
      emailThreadResponse.messageDatetime &&
      moment(emailThreadResponse.messageDatetime).format(dateFormat.MMM_DD_YYYY_HH_MM_A);

    emailThreads.push({
      fullName: emailThreadResponse.fullName,
      email: emailThreadResponse.email,
      message: emailThreadResponse.bodyData,
      messageDatetime: formattedMessageDateTime,
      isSuppressed: emailThreadResponse.isSuppressed,
    });
  });

  return {
    emailAttachments,
    emailThreads,
  };
};
