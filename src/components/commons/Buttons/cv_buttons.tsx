import React from 'react';
import { useTranslation } from 'react-i18next';

import './cv_buttons.css';
import { CV_BUTTON_TYPES } from 'src/constants/cv-buttons-box';
import CV_Buttons from '.';

interface CvButtonProps {
  text?: string;
  type?: string;
  color?: string;
  iconType?: string;
}

const CvButtonBox: React.FC<CvButtonProps> = (props: CvButtonProps) => {
  const { t } = useTranslation(['cv_buttons']);

  const ButtonField = () => {
    switch (props.type) {
      case CV_BUTTON_TYPES.ICON:
        switch (props.color) {
          case CV_BUTTON_TYPES.COLOR:
            return (
              <div className="icon-btn-wrapper white-btn-icon">
                <div className="icon-white">{props.iconType}</div>
                <label className="label-white">{props.text}</label>
              </div>
            );
          default:
            return (
              <div className="icon-btn-wrapper">
                <div className="btn-icon"> +</div>
                <label className="btn-label">{props.text}</label>
              </div>
            );
        }

      default:
        switch (props.color) {
          case CV_BUTTON_TYPES.RED:
            return <div className="btn-wrapper">{myBtn('btn-red', '')}</div>;
          case CV_BUTTON_TYPES.WHITE:
            return <div className="btn-wrapper">{myBtn('btn-white', '#000')}</div>;

          default:
            return <div className="btn-wrapper">{myBtn('normal', '')}</div>;
        }
    }
  };

  const myBtn = (class1: string, color1: string) => {
    return (
      <button className={'normal-btn '.concat(class1)} style={{ background: props.color, color: color1 }}>
        {props.text}
      </button>
    );
  };

  return <div className="buttons-wrapper">{ButtonField()}</div>;
};

export default CvButtonBox;
