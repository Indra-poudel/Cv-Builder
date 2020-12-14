import React, { useState } from 'react';
import Modal from 'react-modal';

import { logo } from '../assets/images';
import {
  MdWeb,
  MdClose,
  MdGetApp,
  MdSearch,
  MdPeople,
  MdPerson,
  MdDelete,
  MdFilterList,
  MdAssessment,
  MdCloudUpload,
  MdDeleteSweep,
  MdControlPoint,
  MdCloudDownload,
  MdArrowDropDown,
} from 'react-icons/md';

const LayoutUser: React.FC = () => {
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
            <h2>User Management</h2>
            <div className="page-heading__right">
              <div className="button-group">
                <button className="btn btn--with-icon btn--light-purple btn--small ml-2x" onClick={_openDialog}>
                  <MdControlPoint className="mr-2x"></MdControlPoint> Add Users
                </button>
                <button className="btn btn--with-icon btn--outlined-grey btn--small ml-2x">
                  <MdWeb className="mr-2x"></MdWeb> Bulk Map
                </button>

                <a href="/" className="btn btn--with-icon btn--primary btn--small ml-2x btn-dropdown">
                  <MdCloudDownload className="mr-2x" style={{ fontSize: '16px' }} /> Download
                  <MdArrowDropDown className="ml-2x" />
                  <ul className="btn-dropdown__submenu">
                    <li>
                      <span className="submenu-link">User list </span>
                      <MdGetApp className="mr-2x" />
                    </li>
                    <li>
                      <span className="submenu-link">Client domains mapping</span>
                      <MdGetApp className="mr-2x" />
                    </li>
                  </ul>
                </a>
              </div>
            </div>
          </div>
          <div className="filter-block">
            <div className="filter-group user-filter">
              <div className="input-wrap input-wrap--icon-left mb-0x mr-2x">
                <input type="text" placeholder="Search user by name or email address" className="input input--sm" />
                <span className="form-icon">
                  <MdSearch className="mr-2x"></MdSearch>
                </span>
              </div>
              <button className="btn btn--with-icon btn--outlined-grey btn--small mr-2x">
                Filter <MdFilterList className="ml-2x"></MdFilterList>
              </button>
              <button className="btn btn--with-icon btn--outlined-grey btn--small mr-2x">
                Filter <MdFilterList className="ml-2x"></MdFilterList>
              </button>
              <button className="btn btn--with-icon btn--outlined-grey btn--small mr-2x">
                Filter <MdFilterList className="ml-2x"></MdFilterList>
              </button>
              <button className="btn btn--with-icon btn--outlined-grey btn--small mr-2x">
                Filter <MdFilterList className="ml-2x"></MdFilterList>
              </button>
              <button className="btn btn--with-icon btn--outlined-grey btn--small mr-2x">
                Filter <MdFilterList className="ml-2x"></MdFilterList>
              </button>
              <button className="btn btn--with-icon btn--outlined-grey btn--small mr-2x">
                Filter <MdFilterList className="ml-2x"></MdFilterList>
              </button>
              <button className="btn btn--with-icon btn--outlined-primary btn--small mr-2x">Clear filters</button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table">
              <tr className="table__head-row">
                <th className="table__col">User</th>
                <th className="table__col">Email Address</th>
                <th className="table__col">Role</th>
                <th className="table__col">Supervisor</th>
                <th className="table__col">Client Domains</th>
                <th className="table__col">Last active</th>
              </tr>
              <tr className="table__row">
                <td className="table__col">
                  <span className="suppressed">Jane Coopprt</span>
                </td>
                <td className="table__col">janec@yoursite.com</td>
                <td className="table__col">User</td>
                <td className="table__col">Esther Howard</td>
                <td className="table__col">1</td>
                <td className="table__col">May 11, 2020, 3:40 pm</td>
              </tr>
              <tr className="table__row">
                <td className="table__col">Jane Coopprt</td>
                <td className="table__col">janec@yoursite.com</td>
                <td className="table__col">User</td>
                <td className="table__col">Esther Howard</td>
                <td className="table__col">1</td>
                <td className="table__col">May 11, 2020, 3:40 pm</td>
              </tr>
              <tr className="table__row">
                <td className="table__col">Jane Coopprt</td>
                <td className="table__col">janec@yoursite.com</td>
                <td className="table__col">User</td>
                <td className="table__col">Esther Howard</td>
                <td className="table__col">1</td>
                <td className="table__col">May 11, 2020, 3:40 pm</td>
              </tr>
              <tr className="table__row">
                <td className="table__col">
                  <span className="both">Jane Coopprt</span>
                </td>
                <td className="table__col">janec@yoursite.com</td>
                <td className="table__col">User</td>
                <td className="table__col">Esther Howard</td>
                <td className="table__col">1</td>
                <td className="table__col">May 11, 2020, 3:40 pm</td>
              </tr>
              <tr className="table__row">
                <td className="table__col">
                  <span className="inactive">Jane Coopprt</span>
                </td>
                <td className="table__col">janec@yoursite.com</td>
                <td className="table__col">User</td>
                <td className="table__col">Esther Howard</td>
                <td className="table__col">1</td>
                <td className="table__col">May 11, 2020, 3:40 pm</td>
              </tr>
              <tr className="table__row ">
                <td className="table__col">&nbsp;</td>
                <td className="table__col">janec@yoursite.com</td>
                <td className="table__col">User</td>
                <td className="table__col">-</td>
                <td className="table__col">-</td>
                <td className="table__col">
                  <span className="error">Not signed up</span>
                </td>
              </tr>
            </table>
          </div>
          <h2 className="mt-4x mb-4x">Empty table state</h2>
          <div className="table-responsive">
            <table className="table">
              <tr className="table__head-row">
                <th className="table__col">&nbsp;</th>
                <th className="table__col">User</th>
                <th className="table__col">Email Address</th>
                <th className="table__col">Role</th>
                <th className="table__col">Supervisor</th>
                <th className="table__col">Client Domain</th>
                <th className="table__col">Last active</th>
              </tr>
              <tr className="table__row">
                <td className="table__col" colSpan={7}>
                  <div className="empty-table">
                    <h3>Currently users are not available</h3>
                    <p>Our recovery ninjas are working hard to find and collect all the relevant users.</p>
                    <p>We will send you an email when it’s done.</p>
                  </div>
                </td>
              </tr>
            </table>
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
    <div className="sidebar-floating__title d-flex flex-column">
      <div className="modal__close-icon">
        <MdClose onClick={closeDialog} />
      </div>
      <h2>Add User to Client Domain</h2>
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
      <div className="sidebar-floating__subtitle">
        Add client domains you would like to map the user or users to. They will be able to search and view email to and
        from these client domains.
      </div>
      <div className="side-list">
        <div className="side-item">
          <p>Upload a CSV file to add multiple emails at once</p>
          <p>
            <button className="btn btn--with-icon btn--primary btn--block mt-2x mb-2x">
              <MdCloudUpload className="mr-2x" />
              Upload CSV file
            </button>
          </p>
          <p className="d-block text-center">
            Need help formatting? <a href="/">Download a template</a>
          </p>
          <div className="h-seperator d-flex mt-6x mb-6x">
            <hr className="line-auto" />
            <div className="text">OR</div>
            <hr className="line-auto" />
          </div>
          <p>Manually add users to suppression list</p>
          <div className="input-wrap input-wrap--block mt-5x">
            <textarea className="input input--textarea-sm"></textarea>
          </div>
          <p>
            <button className="btn btn--secondary btn--block mt-1x mb-4x">Add to list</button>
          </p>
          <h4 className="text-uppercase color-grey-50">Exisiting email accounts (3)</h4>
          <div className="list-block list-user">
            <div className="list-block__row row">
              <div className="list-block__col col-9">
                <div className="input-wrap input-wrap--icon-left mb-0x">
                  <input type="text" placeholder="Find user in your suppression list" className="input input--sm" />
                  <span className="form-icon">
                    <MdSearch className="mr-2x"></MdSearch>
                  </span>
                </div>
              </div>
              <div className="list-block__col col-3 col-last icon-large">
                <MdDeleteSweep />
              </div>
            </div>
            <div className="list-block__row row">
              <div className="list-block__col col-1 txt-primary-color ">
                <MdWeb className="mt-1x" />
              </div>
              <div className="list-block__col col-8 list-user__info text-normal">
                <span>Ryan Wiser</span>
                <span className="text-light-sm">ryan@leapfrog.com</span>
              </div>
              <div className="list-block__col col-3 col-last icon-large">
                <MdDelete />
              </div>
            </div>
            <div className="list-block__row row">
              <div className="list-block__col col-1 txt-primary-color ">
                <MdWeb className="mt-1x" />
              </div>
              <div className="list-block__col col-8 list-user__info text-normal">
                <span>Ryan Wiser</span>
                <span className="text-light-sm">ryan@leapfrog.com</span>
              </div>
              <div className="list-block__col col-3 col-last icon-large">
                <MdDelete />
              </div>
            </div>
          </div>
          <div>
            <label className="btn btn--with-icon btn--secondary mr-4x d-inline-flex">
              <MdDelete />
              Upload New Credentials File
            </label>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LayoutUser;
