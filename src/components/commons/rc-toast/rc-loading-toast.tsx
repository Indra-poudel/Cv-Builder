import React from 'react';

import { loading } from 'src/assets/images';

interface LoadingToastState {
  message: string;
}

const LoadingToast = (props: LoadingToastState) => (
  <div className="Toast__Success">
    <img src={loading} alt="Recovvo" width="20" className="mx-2x" />
    <span>{props.message}</span>
  </div>
);

export default LoadingToast;
