import React from 'react';

import { logo } from '../assets/images';
import { MdHelp, MdVpnKey, MdVerifiedUser, MdBusiness, MdCloudUpload } from 'react-icons/md';

const OrganizationProgress: React.FC = () => {
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
              <h1>Set up your environment</h1>
            </div>
            <ul className="stepper stepper-vertical focused">
              <li className="completed">
                <div className="step-title">
                  <span className="circle">1</span>
                  <span className="label">Create a Google API project</span>
                </div>
                <div className="step-content">
                  The next step for you is to head over to <a href="/">console.developers.google.com</a> and set up a
                  project that will allow Recovo to communicate with your email server. A full-fledged help is available
                  in Google API Console should you ever need it to set up the project.
                  <div className="step-content-links">
                    <button className="btn btn--with-icon btn--outlined-primary mr-4x">
                      <MdVpnKey className="mr-2x"></MdVpnKey>Set up project in Google API
                    </button>
                    <a href="/" className="link-help">
                      <MdHelp className="mr-2x"></MdHelp>Get help setting up
                    </a>
                  </div>
                </div>
              </li>

              <li className="active">
                <div className="step-title">
                  <span className="circle">2</span>
                  <span className="label">Set up IAM & Admin</span>
                </div>

                <div className="step-content">
                  <p>
                    You need to set up an IAM & Admin project and invite sales compliance dev. This is a necessary step
                    to create a working service account.
                  </p>
                  <div className="step-content-links">
                    <button className="btn btn--with-icon btn--outlined-primary mr-4x">
                      <MdVerifiedUser className="mr-2x"></MdVerifiedUser>Set up IAM & Admin
                    </button>
                    <a href="/" className="link-help">
                      <MdHelp className="mr-2x"></MdHelp>Get help setting up
                    </a>
                  </div>
                </div>
              </li>

              <li>
                <div className="step-title">
                  <span className="circle">3</span>
                  <span className="label">Set up Permissions in Google Admin</span>
                </div>
                <div className="step-content">
                  <p>
                    Once you have created a service account and connected the API to communicate between your API
                    project and IAM & Admin, the next step is to create domain-wide delegation permission.
                  </p>
                  <div className="step-content-links">
                    <button className="btn btn--with-icon btn--outlined-primary mr-4x">
                      <MdBusiness className="mr-2x"></MdBusiness>Set up Permissions
                    </button>
                    <a href="/" className="link-help">
                      <MdHelp className="mr-2x"></MdHelp>Get help setting up
                    </a>
                  </div>
                </div>
              </li>

              <li>
                <div className="step-title">
                  <span className="circle">4</span>
                  <span className="label">Upload the credentials file into your Recovo app</span>
                </div>
                <div className="step-content">
                  <p>
                    You will receive the credentials in a json file once you’re done setting up your permissions in
                    Google Admin. Simply download that file and upload it using the button below.
                  </p>
                  <div className="step-content-links">
                    <button className="btn btn--with-icon btn--secondary mr-4x">
                      <MdCloudUpload className="mr-2x"></MdCloudUpload>Upload Credentials File
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationProgress;
