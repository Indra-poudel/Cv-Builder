import React from 'react';
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

import ToolTip from '../tool-tip';

interface StateProps {
  isOpen: boolean;
  closeDialog: () => void;
  children: React.ReactNode;
  headerText?: string;
  description?: string;
}

const RightFloatingDialog = (props: StateProps) => {
  const { t } = useTranslation();

  const { isOpen, closeDialog, headerText, description } = props;

  const DialogHeader = () => (
    <div className="sidebar-floating__title d-flex flex-column">
      <div className="modal__close-icon">
        <ToolTip isAlwaysVisible description={t('tool-tip:close')}>
          <MdClose onClick={closeDialog} />
        </ToolTip>
      </div>
      <h2>{headerText}</h2>
    </div>
  );

  return (
    <Modal
      // Reference for className usage: http://reactcommunity.org/react-modal/styles/classes/
      overlayClassName="sidebar-floating-overlay"
      className={{
        base: 'sidebar sidebar-floating sidebar-floating--right',
        afterOpen: 'sidebar-floating--after-open',
        beforeClose: 'sidebar-floating--before-close-right',
      }}
      isOpen={isOpen}
      closeTimeoutMS={400} /*The closeTimeoutMS value and the value used in CSS passed needs to be the same.*/
      onRequestClose={closeDialog}>
      <DialogHeader />
      <div className="sidebar-floating__subtitle">{description}</div>
      <div className="side-list">
        <div className="side-item">{props.children}</div>
      </div>
    </Modal>
  );
};

export default RightFloatingDialog;
