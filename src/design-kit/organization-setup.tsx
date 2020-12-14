import Modal from 'react-modal';
import React, { useState } from 'react';

import { logo } from '../assets/images';
import { MdClose } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';

const OrganizationSetup: React.FC = () => {
  const [isDialogOpen, toggleDialogOpen] = useState(false);

  const _openDialog = () => toggleDialogOpen(true);

  const _closeDialog = () => toggleDialogOpen(false);
  return (
    <div>
      <nav className="navbar navbar--bordered-bottom">
        <div className="container">
          <div className="navbar__wrap navbar__wrap--content-spread">
            <div className="navbar__left">
              <div className="navbar__logo">
                <img src={logo} alt="logo" />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="content-wrap mt-8x">
        <div className="container">
          <div className="content-7x">
            <div className="content-heading">
              <h1>So happy to have you here!</h1>
            </div>
            <div className="block-setup">
              <p className="fs-small-light">Lets begin with some basic introduction</p>
              <p className="fs-small">
                You will use <a href="/">a****@s******.com</a> to sign up. This cannot be changed
              </p>
              <button
                className="btn btn--with-icon btn--outlined-grey btn--shadowed-grey"
                type="button"
                onClick={_openDialog}>
                <FcGoogle className="mr-2x"></FcGoogle>continue with google
              </button>
            </div>
            <div className="h-seperator d-flex mb-8x">
              <hr className="line-auto" />
              <div className="text">OR</div>
              <hr className="line-auto" />
            </div>
            <div className="row">
              <div className="col-6">
                <div className="input-wrap">
                  <label className="input__label">Your first name</label>
                  <input type="text" placeholder="11-50 employees" className="input" />
                </div>
              </div>
              <div className="col-6">
                <div className="input-wrap">
                  <label className="input__label">Your last name</label>
                  <input type="text" placeholder="Technology & Internet" className="input" />
                </div>
              </div>
            </div>
            <h3 className="mb-3x">Set up your password</h3>
            <div className="row">
              <div className="col-6">
                <div className="input-wrap">
                  <label className="input__label">Choose a password</label>
                  <input type="text" placeholder="11-50 employees" className="input" />
                </div>
              </div>
              <div className="col-6">
                <div className="input-wrap">
                  <label className="input__label">Repeat the passwrod</label>
                  <input type="text" placeholder="Technology & Internet" className="input" />
                </div>
              </div>
            </div>
            <div className="input-wrap">
              <button className="btn btn--primary">Save and Continue</button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="content-7x">
            <div className="content-heading">
              <h1>Basic information about your organization</h1>
            </div>
            <div className="input-wrap">
              <label className="input__label">Please enter the website of your organization</label>
              <input type="text" placeholder="https://" className="input" />
            </div>
            <div className="input-wrap">
              <label className="input__label">Name of your organization</label>
              <input type="text" placeholder="e.g. ACME Organization" className="input" />
            </div>
            <div className="row">
              <div className="col-6">
                <div className="input-wrap">
                  <label className="input__label">Your position</label>
                  <input type="text" placeholder="Technology Manage" className="input" />
                </div>
              </div>
              <div className="col-6">
                <div className="input-wrap">
                  <label className="input__label">Your department</label>
                  <input type="text" placeholder="IT" className="input" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="input-wrap">
                  <label className="input__label">Organization size</label>
                  <input type="text" placeholder="11-50 employees" className="input" />
                </div>
              </div>
              <div className="col-6">
                <div className="input-wrap">
                  <label className="input__label">Industry or Vertical</label>
                  <input type="text" placeholder="Technology & Internet" className="input" />
                </div>
              </div>
            </div>
            <div className="input-wrap">
              <button className="btn btn--primary">Save and Continue</button>
            </div>
          </div>
        </div>
      </div>
      <RightFloatingDialog isOpen={isDialogOpen} closeDialog={_closeDialog} />
    </div>
  );
};

const RightFloatingDialog = (props: any) => {
  const { isOpen, closeDialog } = props;

  const DialogHeader = () => (
    <div className="sidebar-floating__title d-flex justify-content-between">
      <h2>CSV file uploaded partially</h2>
      <span className="modal__close-icon">
        <MdClose onClick={closeDialog} />
      </span>
    </div>
  );

  return (
    <Modal
      // Reference for className usage: http://reactcommunity.org/react-modal/styles/classes/
      overlayClassName="sidebar-floating-overlay"
      className={{
        base: 'sidebar sidebar-floating sidebar-floating--right',
        afterOpen: 'sidebar-floating--after-open',
        beforeClose: 'sidebar-floating--before-close-right',
      }}
      isOpen={isOpen}
      closeTimeoutMS={400} /*The closeTimeoutMS value and the value used in CSS passed needs to be the same.*/
      onRequestClose={closeDialog}>
      <DialogHeader />
      <div className="sidebar-floating__subtitle sidebar-floating__subtitle--bordered-bottom fs-small txt-bold sidebar-floating__subtitle--nospace">
        12 error(s) found
      </div>
      <div className="side-list">
        <ul className="error-list">
          <li>
            <span className="mb-2x txt-bold">janecc2@youremail.com</span>
            <span>Supervisor email does not exist in system.</span>
          </li>
          <li>
            <span className="mb-2x txt-bold">janecc2@youremail.com</span>
            <span>Supervisor email does not exist in system.</span>
          </li>
          <li>
            <span className="mb-2x txt-bold">janecc2@youremail.com</span>
            <span>Supervisor email does not exist in system.</span>
          </li>
        </ul>
        <p>
          <button className="btn btn--with-icon btn--primary btn--block mt-2x mb-2x">Upload again</button>
        </p>
        <p className="d-block text-center fs-small txt-bold">
          <a href="/">Download Error file</a>
        </p>
      </div>
    </Modal>
  );
};

export default OrganizationSetup;
