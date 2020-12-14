import React from 'react';

import { MdSearch, MdClose, MdAccountCircle, MdPictureAsPdf, MdGetApp, MdAttachment, MdSend } from 'react-icons/md';

const EmailThread: React.FC = () => {
  return (
    <div>
      <div className="modal modal-container">
        <div className="modal__header modal__header--border">
          <h3>Communication Activity: UX Documents</h3>
          <a href="/" className="modal__close-icon">
            <MdClose></MdClose>
          </a>
        </div>
        <div className="modal__body p-0x overflow-hidden">
          <div className="emailthread">
            <div className="emailthread__subject">
              <ul className="subject-list">
                <li>
                  <a href="/" className="subject">
                    <span className="icon">
                      <MdAccountCircle />
                    </span>
                    <span>curtis.weaver@example.com</span>
                  </a>
                </li>
                <li>
                  <a href="/" className="subject">
                    <span className="icon">
                      <MdSend />
                    </span>
                    <span>himal@yourco.com</span>
                  </a>
                </li>
                <li>
                  <a href="/" className="subject">
                    <span className="icon">
                      <MdSend />
                    </span>
                    <span>himal@yourco.com</span>
                  </a>
                </li>
                <li>
                  <a href="/" className="subject">
                    <span className="icon">
                      <MdSend />
                    </span>
                    <span>himal@yourco.com</span>
                  </a>
                </li>
                <li>
                  <a href="/" className="subject">
                    <span className="icon">
                      <MdSend />
                    </span>
                    <span>himal@yourco.com</span>
                  </a>
                </li>
                <li>
                  <a href="/" className="subject">
                    <span className="icon">
                      <MdSend />
                    </span>
                    <span>himal@yourco.com</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="emailthread__content">
              <div className="col-left">
                <div className="search-bar">
                  <div className="input-wrap input-wrap--icon-right mb-0x mr-2x">
                    <input type="text" placeholder="Search user by name or email address" className="input" />
                    <span className="form-icon">
                      <MdSearch className="mr-2x"></MdSearch>
                    </span>
                  </div>
                </div>
                <div className="email-list">
                  <div className="email-block">
                    <div className="email-profile">
                      <span className="profile-icon">
                        <MdAccountCircle />
                      </span>
                    </div>
                    <div className="email-message">
                      <div className="email-message__header">
                        <span className="email-name">Himal Karmacharya</span>
                        <span className="email-date">16 May 2020, 4:50 pm</span>
                      </div>
                      <div className="email-message__content">
                        <p>
                          Occaecattemporelitadipisicingcupidatat.Nostrudlaboreeiusmodoccaecatnullanisi.Adsiteuidduis
                          utquiuxdocumentmollitdeserunteufugiatLoremautelaborum.IrurelaboreeaLoremexercitationvelitauteelitminimqui.Occaecattemporelitadipisicingcupidatat.Nostrudlaboreeiusmodoccaecatnullanisi.Adsiteuidduis
                          utquiuxdocumentmollitdeserunteufugiatLoremautelaborum.IrurelaboreeaLoremexercitationvelitauteelitminimqui.Occaecattemporelitadipisicingcupidatat.Nostrudlaboreeiusmodoccaecatnullanisi.Adsiteuidduis
                          utquiuxdocumentmollitdeserunteufugiatLoremautelaborum.IrurelaboreeaLoremexercitationvelitauteelitminimqui.Occaecattemporelitadipisicingcupidatat.Nostrudlaboreeiusmodoccaecatnullanisi.Adsiteuidduis
                          utquiuxdocumentmollitdeserunteufugiatLoremautelaborum.IrurelaboreeaLoremexercitationvelitauteelitminimqui
                        </p>
                        <p>
                          Aliquip ipsum veniam incididunt culpa consequat ipsum anim exercitation. Aliqua voluptate do
                          pariatur adipisicing mollit dolore labore aute irure dolore et aute. Laboris laborum consequat
                          incididunt et do exercitation consectetur in elit laborum Lorem.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="email-block">
                    <div className="email-profile">
                      <span className="profile-icon">
                        <MdAccountCircle />
                      </span>
                    </div>
                    <div className="email-message">
                      <div className="email-message__header">
                        <span className="email-name">Himal Karmacharya</span>
                        <span className="email-date">16 May 2020, 4:50 pm</span>
                      </div>
                      <div className="email-message__content">
                        <p>
                          Occaecat tempor elit adipisicing cupidatat. Nostrud labore eiusmod occaecat nulla nisi. Ad sit
                          eu id duis ut qui ux document mollit deserunt eu fugiat Lorem aute laborum. Irure labore ea
                          Lorem exercitation velit aute elit minim qui.
                        </p>
                        <p>
                          Aliquip ipsum veniam incididunt culpa consequat ipsum anim exercitation. Aliqua voluptate do
                          pariatur adipisicing mollit dolore labore aute irure dolore et aute. Laboris laborum consequat
                          incididunt et do exercitation consectetur in elit laborum Lorem.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="email-block">
                    <div className="email-profile">
                      <span className="profile-icon">
                        <MdAccountCircle />
                      </span>
                    </div>
                    <div className="email-message">
                      <div className="email-message__header">
                        <span className="email-name">Himal Karmacharya</span>
                        <span className="email-date">16 May 2020, 4:50 pm</span>
                      </div>
                      <div className="email-message__content">
                        <p>
                          Occaecat tempor elit adipisicing cupidatat. Nostrud labore eiusmod occaecat nulla nisi. Ad sit
                          eu id duis ut qui ux document mollit deserunt eu fugiat Lorem aute laborum. Irure labore ea
                          Lorem exercitation velit aute elit minim qui.
                        </p>
                        <p>
                          Aliquip ipsum veniam incididunt culpa consequat ipsum anim exercitation. Aliqua voluptate do
                          pariatur adipisicing mollit dolore labore aute irure dolore et aute. Laboris laborum consequat
                          incididunt et do exercitation consectetur in elit laborum Lorem.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-right">
                <div className="attachment-block">
                  <div className="attachment-header">
                    <span className="attachment-icon">
                      <MdAttachment />
                    </span>
                    <h3>4 Attachments</h3>
                  </div>
                  <div className="attachment-list">
                    <ul>
                      <li className="document-pdf">
                        <div className="attachment-icon">
                          <MdPictureAsPdf />
                        </div>
                        <div className="attachment-content">
                          Document name <span className="document-type">PDF 21kb</span>
                        </div>
                        <div className="attachment-actions">
                          <a href="/">
                            <MdGetApp />
                          </a>
                        </div>
                      </li>
                      <li className="document-word">
                        <div className="attachment-icon">
                          <MdPictureAsPdf />
                        </div>
                        <div className="attachment-content">
                          Document name <span className="document-type">Word 81kb</span>
                        </div>
                        <div className="attachment-actions">
                          <a href="/">
                            <MdGetApp />
                          </a>
                        </div>
                      </li>
                      <li className="document-powerpoint">
                        <div className="attachment-icon">
                          <MdPictureAsPdf />
                        </div>
                        <div className="attachment-content">
                          Document name <span className="document-type">Powerpoint 424kb</span>
                        </div>
                        <div className="attachment-actions">
                          <a href="/">
                            <MdGetApp />
                          </a>
                        </div>
                      </li>
                      <li className="document-excel">
                        <div className="attachment-icon">
                          <MdPictureAsPdf />
                        </div>
                        <div className="attachment-content">
                          Document name <span className="document-type">Excel 33kb</span>
                        </div>
                        <div className="attachment-actions">
                          <a href="/">
                            <MdGetApp />
                          </a>
                        </div>
                      </li>
                    </ul>
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

export default EmailThread;
