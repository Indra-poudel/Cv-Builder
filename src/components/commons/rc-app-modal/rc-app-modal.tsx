import React from 'react';
import modals from 'src/constants/modals/modal-map';
import RcModal from 'src/components/commons/rc-modal/rc-modal';
import { modalStyle } from 'src/components/commons/rc-modal/rc-modal-style';

const RcAppModal: React.FC<any> = (props: any) => {
  const ModalView = modals[props.currentModal];
  if (!ModalView) return null;
  return (
    <>
      <RcModal style={modalStyle(props.style)} isModalOpen={!!props.currentModal} onToggleModal={props.onToggleModal}>
        <ModalView onToggleModal={props.onToggleModal} {...props} />
      </RcModal>
    </>
  );
};

export default RcAppModal;
