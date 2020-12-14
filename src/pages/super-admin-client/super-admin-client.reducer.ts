import { combineReducers } from 'redux';
import { SortDirection } from 'react-virtualized';

import { DEFAULT_SORT_FIELD } from './super-admin-client.constant';
import * as superAdminClientAction from './super-admin-client.action';
import { SuperAdminClient } from 'src/entities/super-admin-client/types';

interface SuperAdminClientListInitialState {
  superAdminClientList: Array<SuperAdminClient>;
  isLoadingSuperAdminClient: boolean;
  isError: boolean;
  sortField: string;
  sortDirection: string;
}

const initialState: SuperAdminClientListInitialState = {
  superAdminClientList: [],
  isLoadingSuperAdminClient: false,
  isError: false,
  sortField: DEFAULT_SORT_FIELD,
  sortDirection: SortDirection.ASC,
};

interface AddClientState {
  isClientAdding: boolean;
  isClientAddFail: boolean;
}

const AddClientInitialState: AddClientState = {
  isClientAdding: false,
  isClientAddFail: false,
};

const superAdminClientReducer = (
  state = initialState,
  action: superAdminClientAction.SuperAdminClientActionType
): SuperAdminClientListInitialState => {
  switch (action.type) {
    case superAdminClientAction.FETCHING_SUPER_ADMIN_CLIENT:
      return {
        ...state,
        isError: false,
        superAdminClientList: [],
        isLoadingSuperAdminClient: true,
      };

    case superAdminClientAction.FETCH_SUPER_ADMIN_CLIENT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoadingSuperAdminClient: false,
      };

    case superAdminClientAction.FETCH_SUPER_ADMIN_CLIENT_FAIL: {
      return {
        ...state,
        isLoadingSuperAdminClient: false,
        isError: true,
      };
    }

    case superAdminClientAction.SORT_CLIENT_LIST: {
      return {
        ...state,
        sortField: action.payload.sortField,
        sortDirection: action.payload.sortDirection,
      };
    }

    case superAdminClientAction.SORT_CLIENT_FAIL: {
      return {
        ...state,
        sortField: DEFAULT_SORT_FIELD,
        sortDirection: SortDirection.ASC,
      };
    }

    case superAdminClientAction.RESET_SUPER_ADMIN_CLIENT_STATE: {
      return {
        ...state,
        superAdminClientList: [],
        isLoadingSuperAdminClient: false,
        isError: false,
      };
    }

    default:
      return { ...state };
  }
};

const addClientReducer = (
  state = AddClientInitialState,
  action: superAdminClientAction.ClientAddActionType
): AddClientState => {
  switch (action.type) {
    case superAdminClientAction.CLIENT_ADDING:
      return {
        ...state,
        isClientAdding: true,
      };

    case superAdminClientAction.CLIENT_ADD_SUCCESS:
      return {
        ...state,
        isClientAdding: false,
        isClientAddFail: false,
      };

    case superAdminClientAction.CLIENT_ADD_FAIL: {
      return {
        ...state,
        isClientAdding: false,
        isClientAddFail: true,
      };
    }

    default:
      return state;
  }
};

export default combineReducers({
  clientList: superAdminClientReducer,
  addClient: addClientReducer,
});
