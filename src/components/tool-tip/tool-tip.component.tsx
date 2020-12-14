import React from 'react';
import Text from 'react-texty';
import 'react-texty/styles.css';

interface StateProps {
  className?: string;
  description: string;
  children: React.ReactElement | string;
  isAlwaysVisible?: boolean;
}

const ToolTip = (props: StateProps): React.ReactElement | null => {
  const { children, className, description, isAlwaysVisible } = props;

  return isAlwaysVisible ? (
    <span className={`tooltip ${className || ''}`}>
      <span className="cursor-hand">{children}</span>
      <span className="tooltip-text">{description}</span>
      <span className="tooltip-arrow" />
    </span>
  ) : (
    <Text tooltipClassName="text-small" tooltipMaxWidth={600} placement="bottom" tooltip={description}>
      {children}
    </Text>
  );
};

export default ToolTip;
