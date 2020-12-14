import React from 'react';

import { logo, outlook } from '../assets/images';
import { FcGoogle } from 'react-icons/fc';
import {
  MdSearch,
  MdAssessment,
  MdPeople,
  MdPerson,
  MdSettings,
  MdPowerSettingsNew,
  MdDns,
  MdSubject,
  MdCheck,
  MdCloudDownload,
  MdList,
  MdPanTool,
  MdWeb,
} from 'react-icons/md';

const Account: React.FC = () => {
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

            <div className="navbar__right">
              <div className="nav">
                <ul className="nav">
                  <li className="nav__node">
                    <a href="/" className="nav__link nav__link--active">
                      <MdSearch></MdSearch>Search
                    </a>
                  </li>
                  <li className="nav__node">
                    <a href="/" className="nav__link">
                      <MdAssessment></MdAssessment>Usage
                    </a>
                  </li>
                  <li className="nav__node">
                    <a href="/" className="nav__link">
                      <MdPeople></MdPeople>Users
                    </a>
                  </li>
                  <li className="nav__node">
                    <a href="/" className="nav__link">
                      <MdPerson></MdPerson>Account
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="content-wrap">
        <div className="container">
          <div className="columns-leftsidbar">
            <div className="sidebar">
              <h2>Account</h2>
              <ul className="side-list">
                <li className="side-item active">
                  <MdSettings className="mr-2x" />
                  Settings
                </li>
                <li className="side-item">
                  <MdPerson className="mr-2x" />
                  Edit Profile
                </li>
                <li className="side-item">
                  <MdPowerSettingsNew className="mr-2x" />
                  Logout
                </li>
              </ul>
            </div>
            <div className="main">
              <div className="content-list">
                <h2>Integrations</h2>
                <div className="list-block account-block">
                  <div className="list-block__row row">
                    <div className="list-block__col col-8 col-value">
                      <div>
                        <FcGoogle className="mr-3x" />
                        <span>GSuit Integration</span>
                      </div>
                      <span className="text-light-sm">Integrate with G Suit</span>
                    </div>
                    <div className="list-block__col col-2">
                      <button className="btn btn--outlined-secondary btn--small">Manage</button>
                    </div>
                    <div className="list-block__col col-2 col-last">
                      <span className="txt-bold txt-primary-color btn-status">
                        <MdCheck className="mr-1x" />
                        Connected
                      </span>
                    </div>
                  </div>
                  <div className="list-block__row row row-disabled">
                    <div className="list-block__col col-8 col-value">
                      <div>
                        <img src={outlook} alt="outlook" className="mr-3x outlook" />
                        <span>Outlook Integraion</span>
                      </div>
                      <span className="text-light-sm">Integrate with Outlook client</span>
                    </div>
                    <div className="list-block__col col-2">
                      <button className="btn btn--outlined-secondary btn--small">Manage</button>
                    </div>
                    <div className="list-block__col col-2 col-last">
                      <span className="">Coming soon</span>
                    </div>
                  </div>
                  <div className="list-block__row row row-disabled">
                    <div className="list-block__col col-8 col-value">
                      <div>
                        <MdDns className="mr-3x" />
                        <span>CRM Integration</span>
                      </div>
                      <span className="text-light-sm"> Integrate with your existing CRM</span>
                    </div>
                    <div className="list-block__col col-2">
                      <button className="btn btn--outlined-secondary btn--small">Manage</button>
                    </div>
                    <div className="list-block__col col-2 col-last">
                      <span className="">Coming soon</span>
                    </div>
                  </div>
                  <div className="list-block__row row row-disabled">
                    <div className="list-block__col col-8 col-value">
                      <div>
                        <MdSubject className="mr-3x" />
                        <span>Directory Integraion</span>
                      </div>
                      <span className="text-light-sm">CRM Integraion Integrate with your existing CRM</span>
                    </div>
                    <div className="list-block__col col-2">
                      <button className="btn btn--outlined-secondary btn--small">Manage</button>
                    </div>
                    <div className="list-block__col col-2 col-last">
                      <span className="">Coming soon</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-list">
                <h2>Data Privacy</h2>
                <div className="list-block account-block">
                  <div className="list-block__row row row-disabled">
                    <div className="list-block__col col-8 col-value">
                      <div>
                        <MdList className="mr-3x" />
                        <span>Email log to CRM</span>
                      </div>
                      <span className="text-light-sm font-normal">Send your email logs to CRM</span>
                    </div>
                    <div className="list-block__col col-2">
                      <button className="btn btn--outlined-secondary btn--small">Manage</button>
                    </div>
                    <div className="list-block__col col-2 col-last">
                      <span className="">Coming soon</span>
                    </div>
                  </div>
                  <div className="list-block__row row">
                    <div className="list-block__col col-8 col-value">
                      <div>
                        <MdPanTool className="mr-3x" />
                        <span>Suppression List</span>
                      </div>
                      <span className="text-light-sm">View and manage your suppression list</span>
                    </div>
                    <div className="list-block__col col-2">
                      <button className="btn btn--outlined-secondary btn--small">Manage</button>
                    </div>
                    <div className="list-block__col col-2 col-last">
                      <span className="">
                        <MdCheck />
                        Active
                      </span>
                    </div>
                  </div>
                  <div className="list-block__row row">
                    <div className="list-block__col col-8 col-value">
                      <div>
                        <MdWeb className="mr-3x" />
                        <span>Client Domain List</span>
                      </div>
                      <span className="text-light-sm">View and manage your client domain list</span>
                    </div>
                    <div className="list-block__col col-2">
                      <button className="btn btn--outlined-secondary btn--small">Manage</button>
                    </div>
                    <div className="list-block__col col-2 col-last">
                      <button className="btn btn--with-icon btn--primary btn--small">
                        <MdCloudDownload className="mr-1x" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
