import React from 'react';

import { logo } from '../assets/images';
import { MdSearch, MdAssessment, MdPeople, MdPerson, MdChevronRight } from 'react-icons/md';

const LayoutUserDetail: React.FC = () => {
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
              <ul className="side-list side-list--bordered-bottom">
                <li className="side-item">
                  User at <span className="side-item__main">ACME Organization</span>
                </li>
                <li className="side-item">
                  Created on <span className="side-item__main">May 11, 2020</span> Imported from GSuite
                </li>
                <li className="side-item">
                  Created by<span className="side-item__main">John Hammond</span>
                </li>
                <li className="side-item">
                  Last Login <span className="side-item__main">Never</span>
                  <a href="/" className="side-item__link">
                    Resend invitation link
                  </a>
                </li>
              </ul>
              <ul className="side-list">
                <li className="side-item">
                  <a href="/" className="side-item__linklight">
                    Deactivate user
                  </a>
                </li>
                <li className="side-item">
                  <a href="/" className="side-item__linklight">
                    Add to suppression list
                  </a>
                </li>
              </ul>
            </div>
            <div className="main">
              <div className="breadcrumb">
                <a href="/" className="breadcrumb__item">
                  home
                </a>
                <a href="/" className="breadcrumb__item">
                  <MdChevronRight></MdChevronRight>Second level
                </a>
                <span className="breadcrumb__item">
                  <MdChevronRight></MdChevronRight>Page name
                </span>
              </div>
              <div className="content-list">
                <h1>Wade Warren</h1>
                <h4>ABOUT WADE</h4>
                <div className="list-block">
                  <div className="list-block__row row">
                    <div className="list-block__col col-3">Name</div>
                    <div className="list-block__col col-7 col-value">Wade Warren</div>
                    <div className="list-block__col col-2 col-last">
                      <a href="/">Change</a>
                    </div>
                  </div>
                  <div className="list-block__row row">
                    <div className="list-block__col col-3">Email</div>
                    <div className="list-block__col col-7 col-value">wade@yoursite.com</div>
                    <div className="list-block__col col-2 col-last"></div>
                  </div>
                  <div className="list-block__row row">
                    <div className="list-block__col col-3">Phone (Cell)</div>
                    <div className="list-block__col col-7 col-value">-</div>
                    <div className="list-block__col col-2 col-last">
                      <a href="/">Add</a>
                    </div>
                  </div>
                  <div className="list-block__row row">
                    <div className="list-block__col col-3">Depatment</div>
                    <div className="list-block__col col-7 col-value">-</div>
                    <div className="list-block__col col-2 col-last">
                      <a href="/">Add</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-list">
                <h4>WADE'S SUPERVISOR</h4>
                <p>
                  If disignated, a Supervisor has the same search capability and content visibility of the users they
                  are mapped to. This is an optional feature.
                </p>
                <div className="list-block">
                  <div className="list-block__row row">
                    <div className="list-block__col col-3">Supervisor</div>
                    <div className="list-block__col col-7 col-value">Not Assigned</div>
                    <div className="list-block__col col-2 col-last">
                      <a href="/">Assign</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-list">
                <h4>WADE'S ROLE AND PREVILLEGES</h4>
                <div className="list-block">
                  <div className="list-block__row row">
                    <div className="list-block__col col-3">Supervisor</div>
                    <div className="list-block__col col-7 col-value">Not Assigned</div>
                    <div className="list-block__col col-2 col-last">
                      <a href="/">Assign</a>
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

export default LayoutUserDetail;
