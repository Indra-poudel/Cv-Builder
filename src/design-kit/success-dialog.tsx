import React from 'react';

import { MdCheckCircle } from 'react-icons/md';

const SuccessDialog: React.FC = () => {
  return (
    <div className="modal modal--auto">
      <div className="modal__body">
        <div className="modal-block empty-page">
          <div className="content-empty content-empty--small mt-8x">
            <div className="content-empty__icon content-empty__icon--success">
              <MdCheckCircle />
            </div>
            <h2 className="mb-4x">Successfully Uploaded</h2>
            <div className="content-empty__link mb-12x">
              <p>You have successfully uploaded the credentials and we have applied it to your Recovo app.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="modal__footer justify-content-center mb-8x">
        <div className="button-group">
          <button className="btn btn--primary mr-2x" type="button">
            Continue to Setup
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessDialog;
