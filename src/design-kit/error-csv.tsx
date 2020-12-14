import React from 'react';

import { MdClose } from 'react-icons/md';

const ErrorCsv: React.FC = () => {
  return (
    <div className="modal modal-container modal--sm">
      <div className="modal__header modal__header--border">
        <h3>CSV file uploaded partially</h3>
        <a href="/" className="modal__close-icon">
          <MdClose></MdClose>
        </a>
      </div>
      <div className="modal__body">
        <div className="modal-block">
          <ul className="error-list">
            <li>
              <span>janecc2@youremail.com</span>
              <span>Supervisor email does not exist in system.</span>
            </li>
            <li>
              <span>janecc2@youremail.com</span>
              <span>Supervisor email does not exist in system.</span>
            </li>
            <li>
              <span>janecc2@youremail.com</span>
              <span>Supervisor email does not exist in system.</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="modal__footer justify-content-center">
        <div className="button-group">
          <button className="btn btn--grey mr-2x" type="button">
            Cancel
          </button>
          <button className="btn btn--primary mr-2x" type="button">
            Upload again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorCsv;
