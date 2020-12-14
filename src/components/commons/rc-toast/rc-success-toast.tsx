import React from 'react';
import { MdCheckCircle } from 'react-icons/md';

const CustomSuccessToast: React.FC<any> = (props: any) => (
  <div className="Toast__Success">
    <MdCheckCircle color={'#20c933'} fontSize="20px" className="align-self-start" />
    <span>{props.msg}</span>
  </div>
);

export default CustomSuccessToast;
