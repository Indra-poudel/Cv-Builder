import React from 'react';
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

import ToolTip from '../tool-tip';
import { ModalType } from './modal-types';

type ModalTypeProps = ModalType.AUTO | ModalType.SMALL;

interface StateProps {
  modalType?: ModalTypeProps;
  isOpen: boolean;
  onCloseDialog: () => void;
  headerText: string;
  children: React.ReactNode;
  footer?: () => React.ReactNode;
}

Modal.setAppElement('#root');

const ModalDialog = (props: StateProps) => {
  const { t } = useTranslation();

  const { isOpen, onCloseDialog, headerText } = props;

  const modalClassName = props.modalType ? 'modal modal-container' : `modal${'--' + props.modalType} modal-container`;

  return (
    <Modal isOpen={isOpen} onRequestClose={onCloseDialog} className={modalClassName} overlayClassName="modal-overlay">
      <div className="modal__header modal__header--border">
        <h3>{headerText}</h3>
        <span className="modal__close-icon" onClick={onCloseDialog}>
          <ToolTip isAlwaysVisible description={t('tool-tip:close')}>
            <MdClose />
          </ToolTip>
        </span>
      </div>
      <div className="modal__body">{props.children}</div>
      <div className="modal__footer">{props.footer && props.footer()}</div>
    </Modal>
  );
};

export default ModalDialog;
