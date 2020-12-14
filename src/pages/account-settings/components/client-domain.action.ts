import { Dispatch } from 'redux';

import * as clientDomainService from 'src/services/client-domain';

export const FETCH_SUCCESS = '@@action/ACCOUNT/ClIENT_DOMAIN_LIST/FETCH/FETCH_SUCCESS';
export const SHOW_LOADER = '@@action/ACCOUNT/ClIENT_DOMAIN_LIST/FETCH/FETCH_LOADER';
export const FETCH_FAIL = '@@action/ACCOUNT/ClIENT_DOMAIN_LIST/FETCH/FETCH_FAIL';

interface ClientDomainListFetchSuccess {
  type: typeof FETCH_SUCCESS;
  payload: {
    clientDomains: Array<clientDomainService.ClientDomainResponseState>;
  };
}

interface ClientDomainListShowLoader {
  type: typeof SHOW_LOADER;
}

interface ClientDomainListFetchFail {
  type: typeof FETCH_FAIL;
}

export type FetchClientDomainListActionType =
  | ClientDomainListShowLoader
  | ClientDomainListFetchSuccess
  | ClientDomainListFetchFail;

export const fetchClientDomainList = (search: string) => async (
  dispatch: Dispatch<FetchClientDomainListActionType>
): Promise<void> => {
  try {
    dispatch({
      type: SHOW_LOADER,
    });

    const response = await clientDomainService.fetchClientDomainList(search);

    dispatch({
      type: FETCH_SUCCESS,
      payload: {
        clientDomains: response,
      },
    });
  } catch {
    dispatch({
      type: FETCH_FAIL,
    });
  }
};

export const deleteClientDomain = (id: number) => async (): Promise<boolean> => {
  try {
    await clientDomainService.deleteClientDomainById(id);

    return Promise.resolve(true);
  } catch {
    return Promise.reject();
  }
};
