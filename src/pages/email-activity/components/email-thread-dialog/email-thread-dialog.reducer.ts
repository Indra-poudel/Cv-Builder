import * as emailThreadAction from './email-thread-dialog.action';
import { EmailThread, EmailThreadAttachment } from '../../email-acitivity.types';

interface EmailThreadState {
  emailThreads: Array<EmailThread>;
  emailAttachments: Array<EmailThreadAttachment>;
  isLoading: boolean;
  isDialogOpen: boolean;
  threadSubject: string;
  toEmails: Array<string>;
  fromEmail: string;
  isErrorLoading: boolean;
}

const initialState: EmailThreadState = {
  emailThreads: [],
  emailAttachments: [],
  isLoading: false,
  toEmails: [],
  fromEmail: '',
  isDialogOpen: false,
  threadSubject: '',
  isErrorLoading: false,
};

const emailThreadReducer = (state = initialState, action: emailThreadAction.EmailThreadTypes): EmailThreadState => {
  switch (action.type) {
    case emailThreadAction.LOAD_EMAIL_THREAD:
      return {
        ...state,
        emailThreads: action.payload.emailThreads,
        emailAttachments: action.payload.emailAttachments,
        toEmails: action.payload.toEmails,
        fromEmail: action.payload.fromEmail,
        threadSubject: action.payload.threadSubject,
      };

    case emailThreadAction.OPEN_THREAD_DIALOG: {
      return {
        ...state,
        isDialogOpen: true,
      };
    }

    case emailThreadAction.CLOSE_THREAD_DIALOG: {
      return {
        ...state,
        isDialogOpen: false,
        threadSubject: '',
        toEmails: [],
        fromEmail: '',
      };
    }

    case emailThreadAction.TOGGLE_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        isErrorLoading: false,
      };

    case emailThreadAction.LOAD_EMAIL_THREAD_FAIL:
      return {
        ...state,
        isErrorLoading: true,
      };

    default:
      return state;
  }
};

export default emailThreadReducer;
