import React from 'react';

import { logo } from '../assets/images';
import { MdSearch, MdAssessment, MdPeople, MdPerson, MdClose, MdInfo } from 'react-icons/md';

const SearchPage: React.FC = () => {
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
        <div className="container">
          <div className="content-center">
            <div className="search-bar">
              <div className="input-wrap input-wrap--icon-left mb-0x mr-2x">
                <input type="text" placeholder="Search user by name or email address" className="input" />
                <span className="form-icon icon-24">
                  <MdSearch className="mr-2x"></MdSearch>
                </span>
                <button className="btn search-close">
                  <MdClose></MdClose>
                </button>
              </div>
              <button className="btn btn--primary mr-2x">Search</button>
            </div>
          </div>
          <div className="h-seperator d-flex mb-4x">
            <hr className="line-auto" />
            <div className="text">4 CLIENT CONTACTS FOUND</div>
            <hr className="line-auto" />
          </div>
          <div className="content-card">
            <div className="row">
              <div className="col-4">
                <div className="card card--elevated contact-card">
                  <div className="card__content">
                    <ul className="contact-list">
                      <li className="contact-info">
                        <span className="c-name text-ellipsis">Grikshmi Manandhar Curtis weaver</span>
                        <span className="c-email text-ellipsis">grikshmimanandharcurtis@salesforce.com</span>
                      </li>
                      <li className="contact-date">
                        <span className="c-last">Last contacted</span>
                        <span className="c-time">May 11, 2020, 3:40pm</span>
                      </li>
                    </ul>
                    <div className="contact-icon">
                      <MdInfo></MdInfo>
                    </div>
                  </div>
                  <div className="card__footer">
                    <ul className="contact-details">
                      <li className="c-contact">5 contacts</li>
                      <li className="c-reply">11 replies</li>
                    </ul>
                    <div className="contact-attachments">4</div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="card card--elevated contact-card">
                  <div className="card__content">
                    <ul className="contact-list">
                      <li className="contact-info">
                        <span className="c-name text-ellipsis">Grikshmi Manandhar Curtis weaver</span>
                        <span className="c-email text-ellipsis">grikshmimanandharcurtis@salesforce.com</span>
                      </li>
                      <li className="contact-date">
                        <span className="c-last">Last contacted</span>
                        <span className="c-time">May 11, 2020, 3:40pm</span>
                      </li>
                    </ul>
                    <div className="contact-icon">
                      <MdInfo></MdInfo>
                    </div>
                  </div>
                  <div className="card__footer">
                    <ul className="contact-details">
                      <li className="c-contact">5 contacts</li>
                      <li className="c-reply">11 replies</li>
                    </ul>
                    <div className="contact-attachments">4</div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="card card--elevated contact-card">
                  <div className="card__content">
                    <ul className="contact-list">
                      <li className="contact-info">
                        <span className="c-name text-ellipsis">Grikshmi Manandhar Curtis weaver</span>
                        <span className="c-email text-ellipsis">grikshmimanandharcurtis@salesforce.com</span>
                      </li>
                      <li className="contact-date">
                        <span className="c-last">Last contacted</span>
                        <span className="c-time">May 11, 2020, 3:40pm</span>
                      </li>
                    </ul>
                    <div className="contact-icon">
                      <MdInfo></MdInfo>
                    </div>
                  </div>
                  <div className="card__footer">
                    <ul className="contact-details">
                      <li className="c-contact">5 contacts</li>
                      <li className="c-reply">11 replies</li>
                    </ul>
                    <div className="contact-attachments">4</div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="card card--elevated contact-card">
                  <div className="card__content">
                    <ul className="contact-list">
                      <li className="contact-info">
                        <span className="c-name text-ellipsis">Grikshmi Manandhar Curtis weaver</span>
                        <span className="c-email text-ellipsis">grikshmimanandharcurtis@salesforce.com</span>
                      </li>
                      <li className="contact-date">
                        <span className="c-last">Last contacted</span>
                        <span className="c-time">May 11, 2020, 3:40pm</span>
                      </li>
                    </ul>
                    <div className="contact-icon">
                      <MdInfo></MdInfo>
                    </div>
                  </div>
                  <div className="card__footer">
                    <ul className="contact-details">
                      <li className="c-contact">5 contacts</li>
                      <li className="c-reply">11 replies</li>
                    </ul>
                    <div className="contact-attachments">4</div>
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

export default SearchPage;
