import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdCheckCircle } from 'react-icons/md';

import RcButton from 'src/components/commons/rc-button/rc-button';

interface SuccessDialogProps {
  onContinue: () => void;
}

const SuccessDialog: React.FC<SuccessDialogProps> = (props: SuccessDialogProps) => {
  const { onContinue } = props;

  const { t } = useTranslation();

  return (
    <div className="modal modal--auto">
      <div className="modal__body">
        <div className="modal-block empty-page">
          <div className="content-empty content-empty--small mt-8x">
            <div className="content-empty__icon content-empty__icon--success">
              <MdCheckCircle />
            </div>
            <h2 className="mb-4x">{t('successDialog.label')}</h2>
            <div className="content-empty__link mb-12x">
              <p>{t('successDialog.description1')}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="modal__footer justify-content-center mb-8x">
        <div className="button-group">
          <RcButton className="btn btn--primary mr-2x" onClick={onContinue} label={t('successDialog.btnLabel')} />
        </div>
      </div>
    </div>
  );
};

export default SuccessDialog;
