import React from 'react';

import { logo, searchStart } from 'src/assets/images';
import { MdSearch, MdAssessment, MdPeople, MdPerson } from 'react-icons/md';

const SearchEmpty: React.FC = () => {
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
      <div className="content-wrap mt-8x">
        <div className="container empty-page">
          <div className="content-center">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search contact emails, client domains, or users"
                className="input mr-2x"
              />
              <button className="btn btn--primary mr-2x">Search</button>
            </div>
            <div className="content-empty">
              <div className="content-empty__image">
                <img src={searchStart} alt="search empty" />
              </div>
              <div className="content-empty__text">
                <p>
                  Start by searching a specific domain (e.g. salesforce.com) <br />
                  or client contact (sandy@salesforce.com)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchEmpty;
