import React from 'react';
import { MdClose, MdCloudUpload } from 'react-icons/md';

const SmallModal: React.FC = () => {
  return (
    <div className="modal modal--auto">
      <div className="modal__header modal__header--border">
        <h3>Map Users</h3>
        <a href="/" className="modal__close-icon">
          <MdClose />
        </a>
      </div>
      <div className="modal__body">
        <div className="modal-block modal-block--sm">
          <h2 className="modal-block__title mt-10x">Select data source to map users to client domains</h2>
          <button className="btn btn--with-icon btn--primary mt-4x mb-4x" type="button">
            <MdCloudUpload className="mr-2x" />
            Upload CSV File
          </button>
          <p className="fs-small">
            Need help structuring your CSV? <a href="/"> Download a template</a>
          </p>
        </div>
        <div className="modal-block modal-block--sm mt-15x">
          <p className="text-light-sm">
            Do you want to map specific user to a domain? <br />
            Go to their user details page and select “Client Domains”.
          </p>
        </div>
      </div>
      <div className="modal__footer justify-content-center">
        <button className="btn btn--grey mr-2x" type="button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SmallModal;
