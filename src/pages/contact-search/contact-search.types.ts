export interface IContactDetail {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  lastContactDate: number;
  totalReplyCount: number;
  totalContactCount: number;
  totalAttachmentCount: number;
  domain: string;
}

export interface ReceiverEmail {
  fullName: string;
  email: string;
}
export interface IDocumentDetail {
  id: string;
  fileName: string;
  mimeType: string;
  bodySize: number;
  domain: string;
  senderEmail: string;
  partTo: string;
  senderFullName: string;
  messageDateTime: string;
  providerUserThreadId: string;
  receiverEmails: Array<ReceiverEmail>;
}

export interface ContactFilterOptions {
  hasAttachments: boolean | null;
  hasClientResponses: boolean | null;
  startDate: string | null;
  endDate: string | null;
  sortOption: SortFieldObject;
}

export interface SortFieldObject {
  sortField: SortFieldRequest | null;
  sortDirection: SortDirectionType | null;
}

export interface DocumentSortOptions {
  sortField: DocumentSortFieldRequest | null;
  sortDirection: SortDirectionType | null;
}

type SortDirectionType = 'asc' | 'desc';

export enum SortFieldRequest {
  RECENTLY_CONTACTED = 'RECENTLY_CONTACTED',
  OUTBOUND_CONTACTS = 'OUTBOUND_CONTACTS',
  CLIENT_REPLIES = 'CLIENT_REPLIES',
  CLIENT_NAME = 'CLIENT_NAME',
}

export enum DocumentSortFieldRequest {
  RECENT_DOCUMENTS = 'RECENT_DOCUMENTS',
  FILE_NAME = 'FILE_NAME',
}

export type DocumentSortFieldValue = 'recentDocumentAsc' | 'recentDocumentDsc' | 'nameAsc' | 'nameDsc';
