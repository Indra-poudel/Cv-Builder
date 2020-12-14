import React from 'react';

interface Props {
  className?: string;
}

const ToggleSwitch: React.FC<Props> = (props: Props) => (
  <div className="switch-wrap">
    <label className={`switch ${props.className}`}>
      <input type="checkbox" />
      <span className="slider round"></span>
    </label>
  </div>
);

export default ToggleSwitch;
