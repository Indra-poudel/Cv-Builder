import React from 'react';
import Modal from 'react-modal';
import { MdCheckCircle, MdError, MdInfo } from 'react-icons/md';

import { ActionType } from './action-dialog.types';
import RcButton from 'src/components/commons/rc-button/rc-button';

interface StateProps {
  isOpen: boolean;
  actionType: ActionType;
  title: string;
  confirmMessage?: string;
  description: string;
  continueButtonLabel?: string;
  onContinue: () => void;
  onClose: () => void;
}

const ActionDialog = (props: StateProps) => {
  const { actionType, title, description, onContinue, onClose, continueButtonLabel } = props;

  const ActionIcon = () => {
    switch (actionType) {
      case ActionType.SUCCESS:
        return (
          <div className="modal__body__icon--success">
            <MdCheckCircle />
          </div>
        );
      case ActionType.ERROR:
        return (
          <div className="modal__body__icon--fail">
            <MdError />
          </div>
        );
      case ActionType.CONFIRMATION:
      default:
        return <MdInfo />;
    }
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={onClose}
      className="modal modal--sm modal-container"
      overlayClassName="modal-overlay">
      <div className="modal__body">
        <div className="mt-8x">
          <div className="modal__body__icon">
            <ActionIcon />
          </div>
          <h2 className="mb-4x">{title}</h2>
          <div className="mb-8x word-break">
            <p>{description}</p>
          </div>
          <p>{props.confirmMessage}</p>
        </div>
      </div>
      <div className="modal__footer justify-content-center mb-8x">
        <div className="button-group">
          {actionType !== ActionType.SUCCESS && (
            <RcButton className="btn btn--large btn--grey m-1x" onClick={onClose} label={'Cancel'} />
          )}
          <RcButton className="btn btn--large btn--primary m-1x" onClick={onContinue} label={continueButtonLabel} />
        </div>
      </div>
    </Modal>
  );
};

ActionDialog.defaultProps = {
  continueButtonLabel: 'Continue',
};

export default ActionDialog;
