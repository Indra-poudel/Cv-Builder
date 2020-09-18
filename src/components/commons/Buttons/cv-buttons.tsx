import React from 'react';
import './cv_buttons.css';
import { useTranslation } from 'react-i18next';
import { CV_BUTTON_TYPES } from 'src/constants/cv-buttons-box';
import { FaBug, FaCoffee, FaExternalLinkAlt, FaFileExport, FaFileImport, FaPlus } from 'react-icons/fa';

interface CvButtonProps {
  label?: string;
  type?: string;
  onClick: (textboxText: string) => void;
}

const CvButtonBox: React.FC<CvButtonProps> = (props: CvButtonProps) => {
  const { t } = useTranslation(['cv_buttons']);

  const onButtonClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick(e.currentTarget.tagName);
  };

  function ButtonField() {
    switch (props.type) {
      case CV_BUTTON_TYPES.SECONDARY:
        return (
          <button className="normal-btn btn-secondary" onClick={onButtonClicked}>
            {props.label}
          </button>
        );
      case CV_BUTTON_TYPES.WARNING:
        return (
          <button className="normal-btn btn-warning" onClick={onButtonClicked}>
            {props.label}
          </button>
        );
      case CV_BUTTON_TYPES.ADD_NEW:
        return (
          <button className="normal-btn normal" onClick={onButtonClicked}>
            <span style={{ marginRight: '24px' }}>
              <FaPlus />
            </span>
            {props.label}
          </button>
        );
      case CV_BUTTON_TYPES.IMPORT:
        return (
          <button className="normal-btn btn-secondary" onClick={onButtonClicked}>
            <span>
              <FaFileImport />
            </span>
            {props.label}
          </button>
        );
      case CV_BUTTON_TYPES.EXPORT:
        return (
          <button className="normal-btn btn-secondary" onClick={onButtonClicked}>
            <span>
              <FaFileExport />
            </span>
            {props.label}
          </button>
        );
      case CV_BUTTON_TYPES.BUY_COFFEE:
        return (
          <button className="normal-btn btn-secondary" onClick={onButtonClicked}>
            <span>
              <FaCoffee />
            </span>
            {props.label}
          </button>
        );
      case CV_BUTTON_TYPES.BUGS:
        return (
          <button className="normal-btn btn-secondary" onClick={onButtonClicked}>
            <span>
              <FaBug />
            </span>
            {props.label}
          </button>
        );
      case CV_BUTTON_TYPES.REACH_ME:
        return (
          <button className="normal-btn btn-secondary" onClick={onButtonClicked}>
            <span>
              <FaExternalLinkAlt />
            </span>
            {props.label}
          </button>
        );
      case CV_BUTTON_TYPES.GITHUB:
        return (
          <button className="normal-btn btn-secondary" onClick={onButtonClicked}>
            <span className="github-icon">&lt;&gt;</span>
            {props.label}
          </button>
        );
      default:
        return (
          <button className="normal-btn normal" onClick={onButtonClicked}>
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
