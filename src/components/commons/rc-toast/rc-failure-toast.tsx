import React from 'react';
import { MdError } from 'react-icons/md';

const CustomFailureToast: React.FC<any> = (props: any) => (
  <div className="Toast__Failure">
    <MdError color={'#F82B60'} fontSize="20px" className="align-self-start" />{' '}
    <div>
      <span>
        {props.primaryMsg}
        <br />
        {props.secondaryMsg}
      </span>
      <label className="cursor-pointer" onClick={props.onClick}>
        {props.btnLabel}
      </label>
    </div>
  </div>
);

export default CustomFailureToast;
