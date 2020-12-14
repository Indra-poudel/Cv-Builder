import moment from 'moment';

import { dateFormat } from 'src/constants/date';
import { EmailActivity } from 'src/services/email-activities';

export default function fromJson({
  id,
  attachmentCount,
  emails,
  isSnippetHidden,
  lastUpdatedDatetime,
  subject,
  snippet,
}: EmailActivity): EmailActivity {
  return {
    id,
    attachmentCount,
    emails,
    isSnippetHidden,
    lastUpdatedDatetime: moment(lastUpdatedDatetime).format(dateFormat.MMM_DD_YYYY_HH_MM_A),
    subject,
    snippet,
  };
}
