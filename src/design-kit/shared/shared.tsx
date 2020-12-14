import React from 'react';
import { MdClose, MdCloudUpload } from 'react-icons/md';

const Shared: React.FC = () => {
  return (
    <div className="modal modal-container">
      <div className="modal__header modal__header--border">
        <h3>Add Users</h3>
        <a href="/" className="modal__close-icon">
          <MdClose></MdClose>
        </a>
      </div>
      <div className="modal__body">
        <div className="modal-block">
          <h2 className="modal-block__title">Select data source</h2>
          <button className="btn btn--with-icon btn--primary mt-4x mb-4x" type="button">
            <MdCloudUpload className="mr-2x"></MdCloudUpload> Upload CSV File
          </button>
          <p>
            Need help structuring your CSV? <a href="/"> Download a template</a>
          </p>
        </div>
        <div className="seperator">
          <h2 className="background">
            <span>OR</span>
          </h2>
        </div>
        <div className="modal-block">
          <h3 className="modal-block__subtitle">Add email addresses manually</h3>
          <div className="input-wrap input-wrap--block mt-5x">
            <textarea className="input input--textarea"></textarea>
          </div>
          <div className="info-block">
            <div>
              <p>2/250 emails added.</p>
              <p>Users will receive an invitation to the email address you provided</p>
            </div>
            <div className="button-group">
              <button className="btn btn--grey mr-2x" type="button">
                Cancel
              </button>
              <button className="btn btn--secondary mr-2x" type="button">
                Invite Users
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal__footer">
        <p>
          Add email addresses separated by commas. All users will be invited as base users and you can change their
          previlages later. Already have a list of users? Use CSV importer instead.
        </p>
      </div>
    </div>
  );
};

export default Shared;
