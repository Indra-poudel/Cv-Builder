import { SelectOption } from 'src/components/commons/rc-select/rc-select';

export const clientResponseOptions: Array<SelectOption> = [
  { value: true, label: 'Client responses' },
  { value: false, label: 'No client response' },
];

export const hasAttachmentOptions: Array<SelectOption> = [
  { value: true, label: 'Has attachments' },
  { value: false, label: 'No attachments' },
];

export const SORT_FIELD_VALUES = {
  recentlyContactedAsc: 'recentlyContactedAsc',
  recentlyContactedDsc: 'recentlyContactedDsc',
  outboundContactsAsc: 'outboundContactsAsc',
  outboundContactsDsc: 'outboundContactsDsc',
  recentDocumentAsc: 'recentDocumentAsc',
  recentDocumentDsc: 'recentDocumentDsc',
  repliesAsc: 'repliesAsc',
  repliesDsc: 'repliesDsc',
  nameAsc: 'nameAsc',
  nameDsc: 'nameDsc',
};

export const TAB_KEYS = {
  CONTACTS: 'contacts',
  DOCUMENTS: 'documents',
};
