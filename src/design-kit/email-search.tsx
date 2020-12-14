import React from 'react';

import { logo } from '../assets/images';
import { MdSearch, MdAssessment, MdPeople, MdPerson, MdAttachFile } from 'react-icons/md';

const EmailSearch: React.FC = () => {
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
          <div className="page-heading">
            <h2>Email Activity for Curtis Weaver</h2>
            <div className="page-heading__right">
              <div className="filter-group">
                <div className="input-wrap input-wrap--icon-left mb-0x">
                  <input type="text" placeholder="Search email address" className="input input--sm" />
                  <span className="form-icon">
                    <MdSearch className="mr-2x"></MdSearch>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table">
              <tr className="table__row">
                <td className="table__col">
                  <a href="/">himal@yourco.com</a>
                </td>
                <td className="table__col">
                  <strong>UX Documents</strong> Got it, yea thanks for the email...
                </td>
                <td className="table__col">
                  <a href="/">
                    <MdAttachFile />
                  </a>
                </td>
                <td className="table__col">May 11, 2020, 3:40 pm</td>
              </tr>
              <tr className="table__row">
                <td className="table__col">
                  <a href="/">himal@yourco.com</a>
                </td>
                <td className="table__col">
                  <strong>UX Documents</strong> Got it, yea thanks for the email...
                </td>
                <td className="table__col">
                  <a href="/">
                    <MdAttachFile />
                  </a>
                </td>
                <td className="table__col">May 11, 2020, 3:40 pm</td>
              </tr>
              <tr className="table__row">
                <td className="table__col">
                  <a href="/">himal@yourco.com</a>
                </td>
                <td className="table__col">
                  <strong>UX Documents</strong> Got it, yea thanks for the email...
                </td>
                <td className="table__col">
                  <a href="/">
                    <MdAttachFile />
                  </a>
                </td>
                <td className="table__col">May 11, 2020, 3:40 pm</td>
              </tr>
              <tr className="table__row">
                <td className="table__col">
                  <a href="/">himal@yourco.com</a>
                </td>
                <td className="table__col">
                  <strong>UX Documents</strong> Got it, yea thanks for the email...
                </td>
                <td className="table__col">
                  <a href="/">
                    <MdAttachFile />
                  </a>
                </td>
                <td className="table__col">May 11, 2020, 3:40 pm</td>
              </tr>
              <tr className="table__row">
                <td className="table__col">
                  <a href="/">himal@yourco.com</a>
                </td>
                <td className="table__col">
                  <strong>UX Documents</strong> Got it, yea thanks for the email...
                </td>
                <td className="table__col">
                  <a href="/">
                    <MdAttachFile />
                  </a>
                </td>
                <td className="table__col">May 11, 2020, 3:40 pm</td>
              </tr>
              <tr className="table__row">
                <td className="table__col">
                  <a href="/">himal@yourco.com</a>
                </td>
                <td className="table__col">
                  <strong>UX Documents</strong> Got it, yea thanks for the email...
                </td>
                <td className="table__col">
                  <a href="/">
                    <MdAttachFile />
                  </a>
                </td>
                <td className="table__col">May 11, 2020, 3:40 pm</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSearch;
