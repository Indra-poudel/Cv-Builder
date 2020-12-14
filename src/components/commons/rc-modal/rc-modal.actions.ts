export const TOGGLE_MODAL = '@@action/TOGGLE_MODAL';

export interface ToggleModal {
  type: typeof TOGGLE_MODAL;
  payload?: {
    currentModal: string;
  };
}

export interface modalIState {
  currentModal: string;
}

export type ToggleModalActionTypes = ToggleModal;

export const toggleModal = (payload?: modalIState): ToggleModal => ({
  type: TOGGLE_MODAL,
  payload,
});
