import React from 'react';
import { useTranslation } from 'react-i18next';

import './cv_buttons.css';
import { CV_BUTTON_TYPES } from 'src/constants/cv-buttons-box';

interface CvButtonProps {
  label: string;
  type?: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

const CvButtonBox: React.FC<CvButtonProps> = (props: CvButtonProps) => {
  const { t } = useTranslation(['cv_buttons']);

  const onButtonClicked = () => {
    props.onClick();
  };

  function ButtonField() {
    switch (props.type) {
      case CV_BUTTON_TYPES.SECONDARY:
        return (
          <button className="normal-btn btn-secondary" onClick={onButtonClicked}>
            {props.icon && <span style={{ marginRight: '24px' }}>{props.icon}</span>}
            {props.label}
          </button>
        );
      case CV_BUTTON_TYPES.WARNING:
        return (
          <button className="normal-btn btn-warning" onClick={onButtonClicked}>
            {props.icon && <span style={{ marginRight: '24px' }}>{props.icon}</span>}
            {props.label}
          </button>
        );

      default:
        return (
          <button className="normal-btn normal" onClick={onButtonClicked}>
            {props.icon && <span style={{ marginRight: '24px' }}>{props.icon}</span>}
            {props.label}
          </button>
        );
    }
  }

  return (
    <div className="buttons-wrapper">
      <ButtonField />
    </div>
  );
};

export default CvButtonBox;
