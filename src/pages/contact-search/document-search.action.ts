import { Dispatch } from 'redux';
import { isEmptyArray } from 'formik';

import { RootState } from 'src/reducers';
import notification from 'src/utils/notification';
import * as contactsService from 'src/services/contacts';
import { IDocumentDetail, DocumentSortOptions } from './contact-search.types';

export const SEARCH_DOCUMENTS = '@@action/CONTACT_SEARCH/SEARCH_DOCUMENTS';

export const SHOW_DOCUMENT_LOADING = '@@action/DOCUMENT_SEARCH/SHOW_DOCUMENT_LOADING';
export const HIDE_DOCUMENT_LOADING = '@@action/DOCUMENT_SEARCH/HIDE_DOCUMENT_LOADING';
export const SHOW_EMPTY_DOCUMENTS = '@@action/DOCUMENT_SEARCH/SHOW_EMPTY_DOCUMENTS';
export const HIDE_EMPTY_DOCUMENTS = '@@action/DOCUMENT_SEARCH/HIDE_EMPTY_DOCUMENTS';
export const LOAD_MORE_DOCUMENTS = '@@action/DOCUMENT_SEARCH/LOAD_MORE_DOCUMENTS';
export const SET_FILTER_OPTIONS = '@@action/DOCUMENT_SEARCH/SET_FILTER_OPTIONS';
export const RESET_FILTER_OPTIONS = '@@action/DOCUMENT_SEARCH/RESET_FILTER_OPTIONS';
export const RESET_DOCUMENT_LIST = '@@action/DOCUMENT_SEARCH/RESET_DOCUMENT_LIST';
export const SET_DOCUMENT_SORT_OPTIONS = '@@action/CONTACT_SEARCH/SET_DOCUMENT_SORT_OPTIONS';

export const SHOW_CONTENT_LOADING = '@@action/DOCUMENT_SEARCH/SHOW_CONTENT_LOADING';
export const HIDE_CONTENT_LOADING = '@@action/DOCUMENT_SEARCH/HIDE_CONTENT_LOADING';

const PAGE_SIZE = 20;

interface SearchDocuments {
  type: typeof SEARCH_DOCUMENTS;
  payload: {
    documents: Array<IDocumentDetail>;
    hasNextPage: boolean;
    totalDocuments: number;
    secondarySearchKey: string;
  };
}

interface LoadMoreDocuments {
  type: typeof LOAD_MORE_DOCUMENTS;
  payload: {
    documents: Array<IDocumentDetail>;
    updatedPageNumber: number;
    hasNextPage: boolean;
  };
}

interface SetFilterOptions {
  type: typeof SET_FILTER_OPTIONS;
  payload: {
    sortOptions: DocumentSortOptions;
  };
}

interface ResetSetFilterOptions {
  type: typeof RESET_FILTER_OPTIONS;
}

interface ShowDocumentLoading {
  type: typeof SHOW_DOCUMENT_LOADING;
}

interface HideDocumentLoading {
  type: typeof HIDE_DOCUMENT_LOADING;
}

interface ShowEmptyDocuments {
  type: typeof SHOW_EMPTY_DOCUMENTS;
  payload: {
    secondarySearchKey: string;
  };
}

interface HideEmptyDocuments {
  type: typeof HIDE_EMPTY_DOCUMENTS;
}

interface ResetDocumentList {
  type: typeof RESET_DOCUMENT_LIST;
}

interface ShowContentLoading {
  type: typeof SHOW_CONTENT_LOADING;
}

interface HideContentLoading {
  type: typeof HIDE_CONTENT_LOADING;
}

export type DocumentSearchTypes =
  | LoadMoreDocuments
  | SetFilterOptions
  | ResetSetFilterOptions
  | SearchDocuments
  | ShowContentLoading
  | HideContentLoading
  | ShowEmptyDocuments
  | HideEmptyDocuments
  | ShowDocumentLoading
  | HideDocumentLoading
  | ResetDocumentList;

export const setFilterOptions = (sortOptions: DocumentSortOptions): SetFilterOptions => {
  return {
    type: SET_FILTER_OPTIONS,
    payload: {
      sortOptions,
    },
  };
};

const showEmptyDocuments = (secondarySearchKey: string): ShowEmptyDocuments => ({
  type: SHOW_EMPTY_DOCUMENTS,
  payload: {
    secondarySearchKey,
  },
});

export const hideDocumentLoading = (): HideDocumentLoading => ({
  type: HIDE_DOCUMENT_LOADING,
});

const showDocumentLoading = (): ShowDocumentLoading => ({
  type: SHOW_DOCUMENT_LOADING,
});

export const hideEmptyDocuments = (): HideEmptyDocuments => ({
  type: HIDE_EMPTY_DOCUMENTS,
});

const showContentLoading = (): ShowContentLoading => ({
  type: SHOW_CONTENT_LOADING,
});

const hideContentLoading = (): HideContentLoading => ({
  type: HIDE_CONTENT_LOADING,
});

export const searchDocuments = (documentSearchKey?: string) => async (
  dispatch: Dispatch<DocumentSearchTypes>,
  getState: () => RootState
): Promise<void> => {
  try {
    dispatch(showDocumentLoading());
    dispatch(hideEmptyDocuments());

    const secondarySearchKey = documentSearchKey || '';
    const { searchKey } = getState().contactSearch;
    const { documentFilterOptions } = getState().documentSearch;

    const pageSize = PAGE_SIZE;
    const pageNumber = 1;

    const response = await contactsService.searchDocuments(
      searchKey,
      secondarySearchKey,
      documentFilterOptions,
      pageNumber,
      pageSize
    );

    const documents: Array<IDocumentDetail> = response?.data;

    if (documents && isEmptyArray(documents)) {
      dispatch(showEmptyDocuments(secondarySearchKey));
    }

    dispatch({
      type: SEARCH_DOCUMENTS,
      payload: {
        documents,
        hasNextPage: response?.hasNextPage,
        totalDocuments: response?.total,
        secondarySearchKey: secondarySearchKey,
      },
    });
    dispatch(hideDocumentLoading());
  } catch (error) {
    dispatch(hideDocumentLoading());
    notification(error?.response?.data?.message || error.message);
  }
};

export const loadMoreDocuments = () => async (
  dispatch: Dispatch<DocumentSearchTypes>,
  getState: () => RootState
): Promise<void> => {
  try {
    dispatch(showContentLoading());
    dispatch(hideEmptyDocuments());

    const { searchKey } = getState().contactSearch;
    const { secondarySearchKey, documentFilterOptions, currentPageNumber } = getState().documentSearch;
    const pageSize = PAGE_SIZE;
    const nextPageNumber = currentPageNumber + 1;

    const response = await contactsService.searchDocuments(
      searchKey,
      secondarySearchKey,
      documentFilterOptions,
      nextPageNumber,
      pageSize
    );
    const documents: Array<IDocumentDetail> = response?.data;

    dispatch({
      type: LOAD_MORE_DOCUMENTS,
      payload: {
        documents,
        updatedPageNumber: currentPageNumber + 1,
        hasNextPage: response?.hasNextPage,
      },
    });

    dispatch(hideContentLoading());
  } catch (error) {
    dispatch(hideContentLoading());
    notification(error?.response?.data?.message || error.message);
  }
};

export const documentSearchWithSortOptions = (documentSortOptions: DocumentSortOptions) => async (
  dispatch: Dispatch<DocumentSearchTypes>,
  getState: () => RootState
): Promise<void> => {
  dispatch(showDocumentLoading());
  dispatch(hideEmptyDocuments());
  dispatch(setFilterOptions(documentSortOptions));

  const { searchKey } = getState().contactSearch;
  const { secondarySearchKey } = getState().documentSearch;
  try {
    const pageSize = 20;
    const pageNumber = 1;
    const response = await contactsService.searchDocuments(
      searchKey,
      secondarySearchKey,
      documentSortOptions,
      pageNumber,
      pageSize
    );
    const documents: Array<IDocumentDetail> = response?.data;

    if (documents && isEmptyArray(documents)) {
      dispatch(showEmptyDocuments(secondarySearchKey));
    }

    dispatch({
      type: SEARCH_DOCUMENTS,
      payload: {
        documents,
        hasNextPage: response?.hasNextPage,
        totalDocuments: response?.total,
        secondarySearchKey,
      },
    });
    dispatch(hideDocumentLoading());
  } catch (error) {
    dispatch(hideDocumentLoading());
    notification(error?.response?.data?.message || error.message);
  }
};
