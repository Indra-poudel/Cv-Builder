import React from 'react';
import Modal from 'react-modal';

interface RcModalProps {
  currentModal?: String;
  isModalOpen: Boolean;
  onToggleModal?: Function;
  onAfterOpen?: Function;
  contentLabel?: String;
  style?: Object;
}

Modal.setAppElement('#root');

const RcModal: React.FC<RcModalProps> = (props: any) => {
  const { isModalOpen, onToggleModal, contentLabel, onAfterOpen, style } = props;

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onToggleModal}
      contentLabel={contentLabel}
      onAfterOpen={onAfterOpen}
      style={style}>
      {props.children}
    </Modal>
  );
};

export default RcModal;
