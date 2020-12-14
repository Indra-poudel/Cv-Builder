import * as documentSearchAction from './document-search.action';
import { IDocumentDetail, DocumentSortOptions } from './contact-search.types';

interface DocumentSearchState {
  isContentLoading: boolean;
  documents: Array<IDocumentDetail>;
  secondarySearchKey: string;
  isDocumentEmpty: boolean;
  hasNextPage: boolean;
  currentPageNumber: number;
  totalDocuments: number;
  documentFilterOptions: DocumentSortOptions;
  isDocumentLoading: boolean;
}

const initialState: DocumentSearchState = {
  isContentLoading: false,
  documents: [],
  secondarySearchKey: '',
  isDocumentEmpty: false,
  hasNextPage: true,
  currentPageNumber: 1,
  totalDocuments: 0,
  documentFilterOptions: {
    sortField: null,
    sortDirection: null,
  },
  isDocumentLoading: false,
};

const contactSearchReducer = (
  state = initialState,
  action: documentSearchAction.DocumentSearchTypes
): DocumentSearchState => {
  switch (action.type) {
    case documentSearchAction.SEARCH_DOCUMENTS:
      return {
        ...state,
        currentPageNumber: 1,
        secondarySearchKey: action.payload.secondarySearchKey,
        hasNextPage: action.payload.hasNextPage,
        documents: action.payload.documents,
        totalDocuments: action.payload.totalDocuments,
      };

    case documentSearchAction.LOAD_MORE_DOCUMENTS:
      return {
        ...state,
        documents: [...state.documents, ...action.payload.documents],
        currentPageNumber: action.payload.updatedPageNumber,
        hasNextPage: action.payload.hasNextPage,
      };

    case documentSearchAction.SET_FILTER_OPTIONS:
      return {
        ...state,
        documentFilterOptions: action.payload.sortOptions,
      };

    case documentSearchAction.RESET_FILTER_OPTIONS:
      return {
        ...state,
        documentFilterOptions: {
          sortField: null,
          sortDirection: null,
        },
      };

    case documentSearchAction.SHOW_EMPTY_DOCUMENTS:
      return {
        ...state,
        isDocumentEmpty: true,
        secondarySearchKey: action.payload.secondarySearchKey,
      };

    case documentSearchAction.HIDE_EMPTY_DOCUMENTS:
      return {
        ...state,
        isDocumentEmpty: false,
      };

    case documentSearchAction.SHOW_DOCUMENT_LOADING:
      return {
        ...state,
        isDocumentLoading: true,
      };

    case documentSearchAction.HIDE_DOCUMENT_LOADING:
      return {
        ...state,
        isDocumentLoading: false,
      };

    case documentSearchAction.RESET_DOCUMENT_LIST:
      return {
        ...state,
        documents: [],
        totalDocuments: 0,
        currentPageNumber: 1,
      };
    case documentSearchAction.SHOW_CONTENT_LOADING:
      return {
        ...state,
        isContentLoading: true,
      };

    case documentSearchAction.HIDE_CONTENT_LOADING:
      return {
        ...state,
        isContentLoading: false,
      };

    default:
      return state;
  }
};

export default contactSearchReducer;
