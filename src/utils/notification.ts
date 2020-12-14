import React from 'react';
import { toast, ToastOptions } from 'react-toastify';

const notify = (customToast: React.ReactNode, props?: ToastOptions) => {
  toast(customToast, {
    toastId: 'notify',
    position: 'bottom-right',
    ...props,
  });
};

export default notify;
