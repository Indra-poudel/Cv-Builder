import React from 'react';

import RcButton from '../rc-button/rc-button';

interface ButtonGroupProps {
  buttons: RcButtonProps[];
}

interface RcButtonProps {
  name: string;
  buttonTitle: string;
  buttonIcon?: () => React.ReactElement;
  buttonType: string;
  onClick?: Function;
}

const ButtonGroup: React.FC<ButtonGroupProps> = (props: any) => {
  const { buttons } = props;

  return (
    <div className="button-group">
      {buttons.map((filterButton: RcButtonProps, index: number) => (
        <RcButton
          onClick={filterButton.onClick}
          className={`btn btn--with-icon btn--outlined-${filterButton.buttonType} btn--small ml-2x`}
          key={`${index}-${filterButton.name}`}
          label={filterButton.buttonTitle}>
          {filterButton.buttonIcon && filterButton.buttonIcon()}
        </RcButton>
      ))}
    </div>
  );
};

export default ButtonGroup;
