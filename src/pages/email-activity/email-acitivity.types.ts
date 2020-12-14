export interface EmailActivity {
  id: string;
  subject: string;
  attachmentCount: number;
  snippet: string;
  isSnippetHidden: boolean;
  lastUpdatedDatetime: string;
  emails: Array<string>;
}

export interface EmailActivityResponse {
  data: Array<EmailActivity>;
  firstName: string;
  lastName: string;
  email: string;
  total: number;
  hasNextPage: boolean;
  page: number;
  pageSize: number;
}

export interface EmailThread {
  isSuppressed: boolean;
  message: string;
  messageDatetime: string;
  fullName: string;
  email: string;
}

export interface EmailThreadAttachment {
  id: string;
  fileName: string;
  mimeType: string;
  bodySize: number;
  messageId: number;
}

export interface EmailActivityThreadResponse {
  id: string;
  subject: string;
  from: string;
  to: Array<string>;
  cc: Array<string>;
  bcc: null;
  data: Array<EmailThreadResponse>;
}

export interface EmailThreadResponse {
  id: string;
  isSuppressed: boolean;
  subject: string;
  bodyData: string;
  messageDatetime: string;
  fullName: string;
  email: string;
  attachments: Array<EmailThreadAttachment>;
}
