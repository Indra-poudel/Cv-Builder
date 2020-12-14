import * as modalAction from './rc-modal.actions';

interface modalIState {
  currentModal: string | null;
}

const initialState: modalIState = {
  currentModal: null,
};

const modalReducer = (state = initialState, action: modalAction.ToggleModalActionTypes): modalIState => {
  switch (action.type) {
    case modalAction.TOGGLE_MODAL:
      return {
        ...state,
        currentModal: action.payload ? action.payload.currentModal : null,
      };
    default:
      return state;
  }
};

export default modalReducer;
