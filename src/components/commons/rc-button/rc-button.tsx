import React from 'react';

import styles from './style.module.css';
import { IconContext } from 'react-icons';

interface RcButtonProps {
  type?: string;
  onClick?: Function;
  style?: Object;
  label?: String;
  className?: String;
  acceptType?: String;
  disabled?: boolean;
}

const buttonStyle = {
  fontSize: '24px',
  paddingRight: '8px',
};

const FileUploadButton: React.FC<RcButtonProps> = (props: any) => (
  <div>
    <input
      disabled={props.disabled}
      onChange={(e) => {
        props.onClick([...e.target.files]);
        e.target.value = '';
      }}
      accept={props.acceptType}
      id="file"
      type="file"
      style={{
        display: 'none',
      }}
    />
    <label htmlFor="file" className={props.className || styles.button} style={props.style}>
      <IconContext.Provider value={{ style: buttonStyle }}>{props.children}</IconContext.Provider>
      {props.label}
    </label>
  </div>
);

const DefaultButton: React.FC<RcButtonProps> = (props: any) => {
  const { onClick, className, style, disabled, children, label } = props;

  return (
    <button onClick={onClick} className={className || styles.button} style={style} disabled={disabled}>
      <IconContext.Provider value={{ style: buttonStyle }}>{children}</IconContext.Provider>
      {label}
    </button>
  );
};

const RcButton: React.FC<RcButtonProps> = (props: any) => {
  switch (props.type) {
    case 'fileUpload':
      return <FileUploadButton {...props} />;
    default:
      return <DefaultButton {...props} />;
  }
};

export default RcButton;
