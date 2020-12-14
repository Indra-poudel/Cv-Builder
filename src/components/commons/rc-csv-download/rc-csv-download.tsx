import React, { ReactNode } from 'react';
import { IconContext } from 'react-icons';

interface StateProps {
  onClick?: Function;
  className?: string;
  link?: string;
  style?: Object;
  label: string;
  iconStyle?: Object;
  children?: ReactNode;
}

const RcCsvDownload: React.FC<StateProps> = (props: StateProps) => {
  return (
    <a
      onClick={() => {
        if (typeof props.onClick !== 'undefined') {
          props.onClick();
        }
      }}
      className={props.className}
      style={props.style}
      href={props.link}
      download>
      <IconContext.Provider value={{ style: props.iconStyle }}>{props.children}</IconContext.Provider> {props.label}
    </a>
  );
};

export default RcCsvDownload;
