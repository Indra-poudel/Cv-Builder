import { combineReducers } from 'redux';

import * as accountAction from './account.action';
import * as suppressionListAction from './suppression-list.action';
import { ClientDomainResponseState } from 'src/services/client-domain';
import { FetchSuppressionListState } from 'src/services/suppression-list';
import * as clientDomainAction from 'src/pages/account-settings/components/client-domain.action';

interface UploadSuppressionListState {
  isUploading: boolean;
  isUploadSuccess: boolean;
  uploadCsvState: {
    isAllRowSuccess: boolean;
  };
}

interface ClientDomainState {
  isFetching: boolean;
  isFetchSuccess: boolean;
  domains: Array<ClientDomainResponseState>;
  isError: boolean;
}

interface ManuallyAddedSuppressionState {
  isAdding: boolean;
  isAddingSuccess: boolean;
  isError: boolean;
}

interface FetchSuppressionList {
  isFetching: boolean;
  isFetchSuccess: boolean;
  suppressedUsers: Array<FetchSuppressionListState>;
  isError: boolean;
  isStatusFetching: boolean;
  isStatusFetchSuccess: boolean;
  suppressedUsersStatus: string;
  isStatusError: boolean;
}

interface LogoutState {
  isLogoutSuccessful: boolean;
}

const logoutInitialState: LogoutState = {
  isLogoutSuccessful: false,
};

const clientDomainInitialState: ClientDomainState = {
  isFetchSuccess: false,
  isFetching: false,
  domains: [],
  isError: false,
};

const manuallyAddSuppressionInitialState: ManuallyAddedSuppressionState = {
  isAdding: false,
  isAddingSuccess: false,
  isError: false,
};

const suppressionUploadInitialState: UploadSuppressionListState = {
  isUploading: false,
  isUploadSuccess: false,
  uploadCsvState: {
    isAllRowSuccess: false,
  },
};

const initialState: FetchSuppressionList = {
  isFetchSuccess: false,
  isFetching: false,
  suppressedUsers: [],
  isError: false,
  isStatusFetching: false,
  isStatusFetchSuccess: false,
  suppressedUsersStatus: '',
  isStatusError: false,
};

const logoutReducer = (state = logoutInitialState, action: accountAction.LogoutType) => {
  switch (action.type) {
    case accountAction.LOGOUT_SUCCESS:
      return {
        ...state,
        isLogoutSuccessful: true,
      };
    default:
      return { ...state };
  }
};

const suppressionListUploadReducer = (
  state = suppressionUploadInitialState,
  action: accountAction.AccountActionTypes
): UploadSuppressionListState => {
  switch (action.type) {
    case accountAction.SHOW_LOADER:
      return {
        ...state,
        isUploading: true,
      };

    case accountAction.HIDE_LOADER:
      return {
        ...state,
        isUploading: false,
      };

    case accountAction.UPLOAD_SUCCESS: {
      return {
        ...state,
        isUploading: false,
        isUploadSuccess: true,
        uploadCsvState: {
          ...state.uploadCsvState,
          isAllRowSuccess: action.payload.isAllRowSuccess,
        },
      };
    }

    case accountAction.UPLOAD_FAIL: {
      return {
        ...state,
        isUploading: false,
        isUploadSuccess: false,
        uploadCsvState: {
          isAllRowSuccess: false,
        },
      };
    }

    default:
      return { ...state };
  }
};

const manuallyAddSuppressionReducer = (
  state = manuallyAddSuppressionInitialState,
  action: accountAction.ManuallyAddSuppressionActionType
): ManuallyAddedSuppressionState => {
  switch (action.type) {
    case accountAction.MANUALLY_ADD_ACTION.SHOW_ADDING_LOADER:
      return {
        ...state,
        isAdding: true,
      };

    case accountAction.MANUALLY_ADD_ACTION.MANUAL_ADD_SUCCESS: {
      return {
        ...state,
        isAdding: false,
        isAddingSuccess: true,
      };
    }

    case accountAction.MANUALLY_ADD_ACTION.MANUAL_ADDING_FAIL: {
      return {
        ...state,
        isAdding: false,
        isError: true,
      };
    }

    default:
      return { ...state };
  }
};

const fetchSuppressionListReducer = (
  state = initialState,
  action: suppressionListAction.FetchSuppressionListActionType
): FetchSuppressionList => {
  switch (action.type) {
    case suppressionListAction.SHOW_LOADER:
      return {
        ...state,
        isFetching: true,
      };

    case suppressionListAction.SHOW_STATUS_LOADER:
      return {
        ...state,
        isStatusFetching: true,
      };

    case suppressionListAction.FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFetchSuccess: true,
        suppressedUsers: action.payload.suppressedUsers,
      };

    case suppressionListAction.FETCH_STATUS_SUCCESS:
      return {
        ...state,
        isStatusFetching: false,
        isStatusFetchSuccess: true,
        suppressedUsersStatus: action.payload.status,
      };

    case suppressionListAction.FETCH_FAIL: {
      return {
        ...state,
        isFetching: false,
        isError: true,
      };
    }

    case suppressionListAction.FETCH_STATUS_FAIL: {
      return {
        ...state,
        isStatusFetching: false,
        isStatusError: true,
      };
    }

    default:
      return { ...state };
  }
};

const fetchClientDomainListReducer = (
  state = clientDomainInitialState,
  action: clientDomainAction.FetchClientDomainListActionType
): ClientDomainState => {
  switch (action.type) {
    case clientDomainAction.SHOW_LOADER:
      return {
        ...state,
        isFetching: true,
      };

    case clientDomainAction.FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFetchSuccess: true,
        domains: action.payload.clientDomains,
      };

    case clientDomainAction.FETCH_FAIL: {
      return {
        ...state,
        isFetching: false,
        isError: true,
      };
    }

    default:
      return { ...state };
  }
};

export default combineReducers({
  suppressionList: combineReducers({
    upload: suppressionListUploadReducer,
    manuallyAdd: manuallyAddSuppressionReducer,
    fetchSuppressionList: fetchSuppressionListReducer,
  }),
  clientDomainList: fetchClientDomainListReducer,
  logout: logoutReducer,
});
