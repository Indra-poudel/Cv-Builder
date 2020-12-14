import { Dispatch } from 'redux';

import * as contactsService from 'src/services/contacts';
import { mapEmailThreadsResponse } from '../../email-activity.service';
import {
  EmailActivityThreadResponse,
  EmailThread,
  EmailThreadAttachment,
  EmailThreadResponse,
} from '../../email-acitivity.types';
import notification from 'src/utils/notification';

export const LOAD_EMAIL_THREAD = '@@actions/EMAIL_THREAD/LOAD_EMAIL_THREAD';
export const LOAD_EMAIL_THREAD_FAIL = '@@actions/EMAIL_THREAD/LOAD_EMAIL_THREAD_FAIL';
export const OPEN_THREAD_DIALOG = '@@actions/EMAIL_THREAD/OPEN_THREAD_DIALOG';
export const CLOSE_THREAD_DIALOG = '@@actions/EMAIL_THREAD/CLOSE_THREAD_DIALOG';
export const TOGGLE_LOADING = '@@actions/EMAIL_THREAD/TOGGLE_LOADING';

interface LoadEmailThread {
  type: typeof LOAD_EMAIL_THREAD;
  payload: {
    emailThreads: Array<EmailThread>;
    emailAttachments: Array<EmailThreadAttachment>;
    threadSubject: string;
    toEmails: Array<string>;
    fromEmail: string;
  };
}

interface ToggleLoading {
  type: typeof TOGGLE_LOADING;
  payload: {
    isLoading: boolean;
  };
}

interface OpenThreadDialog {
  type: typeof OPEN_THREAD_DIALOG;
}

interface LoadEmailThreadFail {
  type: typeof LOAD_EMAIL_THREAD_FAIL;
}

interface CloseThreadDialog {
  type: typeof CLOSE_THREAD_DIALOG;
}

export type EmailThreadTypes =
  | LoadEmailThread
  | OpenThreadDialog
  | CloseThreadDialog
  | ToggleLoading
  | LoadEmailThreadFail;

export const loadEmailThread = (emailActivityId: string) => async (
  dispatch: Dispatch<EmailThreadTypes>
): Promise<void> => {
  try {
    dispatch(toggleLoading(true));

    const emailActivityThreadResponse: EmailActivityThreadResponse = await contactsService.getEmailActivityThread(
      emailActivityId
    );

    const emailThreadsResponse: Array<EmailThreadResponse> = emailActivityThreadResponse.data;

    const { emailAttachments, emailThreads } = mapEmailThreadsResponse(emailThreadsResponse);

    dispatch({
      type: LOAD_EMAIL_THREAD,
      payload: {
        emailThreads,
        emailAttachments,
        threadSubject: emailActivityThreadResponse.subject,
        toEmails: emailActivityThreadResponse.to,
        fromEmail: emailActivityThreadResponse.from,
      },
    });

    dispatch(toggleLoading(false));
  } catch (error) {
    const errorMessage = (error.response && error.response.data.message) || error.message;
    notification(errorMessage);
    dispatch(toggleLoading(false));
    dispatch(loadEmailThreadFail());
  }
};

export const openEmailThreadDialog = (): OpenThreadDialog => ({
  type: OPEN_THREAD_DIALOG,
});

export const loadEmailThreadFail = (): LoadEmailThreadFail => ({
  type: LOAD_EMAIL_THREAD_FAIL,
});

export const closeEmailThreadDialog = (): CloseThreadDialog => ({
  type: CLOSE_THREAD_DIALOG,
});

const toggleLoading = (isLoading: boolean): ToggleLoading => ({
  type: TOGGLE_LOADING,
  payload: {
    isLoading,
  },
});
