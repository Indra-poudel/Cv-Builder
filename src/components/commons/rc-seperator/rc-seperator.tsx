import React from 'react';

interface RcSeperator {
  label?: string;
  width: string;
}

const RcSeperator: React.FC<RcSeperator> = (props: RcSeperator) => {
  return (
    <div style={{ width: props.width }} className="h-seperator d-flex mt-6x mb-6x margin-auto">
      <hr className="line-auto" />
      <div className="text">{props.label}</div>
      <hr className="line-auto" />
    </div>
  );
};

export default RcSeperator;
