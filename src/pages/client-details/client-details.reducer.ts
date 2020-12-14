import * as clientDetailAction from './client-details.action';
import { IClientDetail } from 'src/entities/super-admin-client-details/types';

interface State {
  isError: boolean;
  isLoading: boolean;
  isUpdatingDetail: boolean;
  clientDetail: IClientDetail;
  isUpdatingDetailFail: boolean;
}

const initialState: State = {
  clientDetail: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    client: '',
    addedOn: '',
    addedBy: '',
    clientStatus: 'inactive',
    supervisorCount: '',
    userCount: '',
  },
  isError: false,
  isLoading: false,
  isUpdatingDetail: false,
  isUpdatingDetailFail: false,
};

const clientDetailReducer = (state = initialState, action: clientDetailAction.ClientDetailActionType): State => {
  switch (action.type) {
    case clientDetailAction.FETCHING_CLIENT_DETAIL:
      return {
        ...state,
        isLoading: true,
      };

    case clientDetailAction.FETCH_CLIENT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isError: false,
      };

    case clientDetailAction.FETCH_CLIENT_FAIL: {
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    }

    case clientDetailAction.TOGGLE_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case clientDetailAction.CLIENT_UPDATING: {
      return {
        ...state,
        isUpdatingDetail: true,
      };
    }

    case clientDetailAction.UPDATE_CLIENT_SUCCESS: {
      return {
        ...state,
        isUpdatingDetail: false,
        isLoading: false,
        clientDetail: {
          ...state.clientDetail,
          ...action.payload,
        },
      };
    }
    case clientDetailAction.UPDATE_CLIENT_FAIL: {
      return {
        ...state,
        isUpdatingDetail: false,
        isUpdatingDetailFail: true,
      };
    }

    case clientDetailAction.RESET_CLIENT_DETAIL: {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
};

export default clientDetailReducer;
