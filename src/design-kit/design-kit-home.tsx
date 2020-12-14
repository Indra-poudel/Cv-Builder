import React from 'react';
import { Link } from 'react-router-dom';
import { loadingWhite } from './../assets/images';

import routes from './constants/routes';
import { FcGoogle } from 'react-icons/fc';
import { MdSearch, MdChevronRight, MdFilterList, MdCloudDownload } from 'react-icons/md';

const DesignKitHome: React.FC = () => {
  return (
    <div className="page-content">
      <div className="container design-kit-container">
        <div className="design-kit">Design Kit </div>
        <div className="kit-block">
          <div className="kit-title">
            <h3>Colors</h3>
          </div>
          <div className="kit-content">
            <ul>
              <li>
                <div className="color">
                  <div className="swatch swatch-01"></div>
                  <div className="title">Primary color light</div>
                  <div className="hex-value">#F7F2FF</div>
                </div>
              </li>
              <li>
                <div className="color">
                  <div className="swatch swatch-02"></div>
                  <div className="title">Primary color</div>
                  <div className="hex-value">#8B46FF</div>
                </div>
              </li>
              <li>
                <div className="color">
                  <div className="swatch swatch-03"></div>
                  <div className="title">Primary color dark</div>
                  <div className="hex-value">#462380</div>
                </div>
              </li>
            </ul>
            <ul>
              <li>
                <div className="color">
                  <div className="swatch swatch-04"></div>
                  <div className="title">Red</div>
                  <div className="hex-value">#F82B60</div>
                </div>
              </li>
              <li>
                <div className="color">
                  <div className="swatch swatch-05"></div>
                  <div className="title">Green</div>
                  <div className="hex-value">#20C933</div>
                </div>
              </li>
              <li>
                <div className="color">
                  <div className="swatch swatch-06"></div>
                  <div className="title">Yellow</div>
                  <div className="hex-value">#FCB400 </div>
                </div>
              </li>
              <li>
                <div className="color">
                  <div className="swatch swatch-07"></div>
                  <div className="title">Blue</div>
                  <div className="hex-value">#2D7FF9</div>
                </div>
              </li>
            </ul>
            <ul>
              <li>
                <div className="color">
                  <div className="swatch swatch-08"></div>
                  <div className="title">Dark Gray</div>
                  <div className="hex-value">#2B2D36</div>
                </div>
              </li>
              <li>
                <div className="color">
                  <div className="swatch swatch-09"></div>
                  <div className="title">Gray</div>
                  <div className="hex-value">#9194A1</div>
                </div>
              </li>
              <li>
                <div className="color">
                  <div className="swatch swatch-10"></div>
                  <div className="title">Light Gray</div>
                  <div className="hex-value">#D3D4D9</div>
                </div>
              </li>
              <li>
                <div className="color">
                  <div className="swatch swatch-11"></div>
                  <div className="title">Lighter gray</div>
                  <div className="hex-value">#FAFAFA</div>
                </div>
              </li>
              <li>
                <div className="color">
                  <div className="swatch swatch-12"></div>
                  <div className="title">White</div>
                  <div className="hex-value">#FFFFFF</div>
                </div>
              </li>
              <li>
                <div className="color">
                  <div className="swatch swatch-13"></div>
                  <div className="title">Light Yellow</div>
                  <div className="hex-value">#FEFBEE</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="kit-block">
          <div className="kit-title">
            <h3>Typography</h3>
          </div>
          <div className="kit-content">
            <ul>
              <li>
                <h1>Heading 1</h1>
              </li>
              <li>Bold/text/heading-size24</li>
            </ul>
            <ul>
              <li>
                <h2>Heading 2</h2>
              </li>
              <li>Bold/text/large-size18</li>
            </ul>
            <ul>
              <li>
                <h3>Heading 3</h3>
              </li>
              <li>Bold/text/body-size16</li>
            </ul>
            <ul>
              <li>
                <h4>Heading 4</h4>
              </li>
              <li>Bold/text/small-size13</li>
            </ul>
            <ul>
              <li>
                <p className="text-large">Paragraph regular large</p>
              </li>
              <li>Regular/text/large-size18</li>
            </ul>
            <ul>
              <li>
                <p className="text-regular">Paragraph regular body</p>
              </li>
              <li>Regular/text/body-size16</li>
            </ul>
            <ul>
              <li>
                <p className="text-small">Paragraph regular small</p>
              </li>
              <li>Regular/text/small-size13</li>
            </ul>
          </div>
        </div>
        <div className="kit-block">
          <div className="kit-title">
            <h3>Navigation</h3>
          </div>
          <div className="kit-content">
            <ul className="nav">
              <li className="nav__node">
                <a href="/" className="nav__link--active">
                  Navigation menu
                </a>
              </li>
              <li className="nav__node">
                <a href="/" className="nav__link">
                  Navigation menu
                </a>
              </li>
              <li className="nav__node">
                <a href="/" className="nav__link">
                  Navigation menu
                </a>
              </li>
              <li className="nav__node">
                <a href="/" className="nav__link">
                  Navigation menu
                </a>
              </li>
              <li className="nav__node">
                <a href="/" className="nav__link">
                  Navigation menu
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="kit-block">
          <div className="kit-title">
            <h3>Form elements</h3>
          </div>
          <div className="kit-content">
            <ul>
              <li>
                <div className="input-wrap">
                  <label className="input__label">Resting label</label>
                  <input type="text" placeholder="Resting placeholder" className="input" />
                </div>
              </li>
              <li>
                <div className="input-wrap">
                  <label className="input__label">Error label</label>
                  <input type="text" placeholder="Resting placeholder" className="input input--error" />
                  <p className="input__error">There seems to be some error with this.</p>
                </div>
              </li>
              <li>
                <div className="input-wrap">
                  <label className="input__label">Resting label</label>
                  <input type="text" placeholder="Resting placeholder" className="input" />
                  <p className="input__helper">Input with some description</p>
                </div>
              </li>
            </ul>
            <ul>
              <li>
                <div className="input-wrap">
                  <input type="text" placeholder="Resting placeholder" className="input" />
                </div>
              </li>
              <li>
                <div className="input-wrap input-wrap--icon-left">
                  <input type="text" placeholder="Search user by name or email address" className="input" />
                  <span className="form-icon">
                    <MdSearch className="mr-2x icon-24"></MdSearch>
                  </span>
                </div>
              </li>
              <li>
                <div className="input-wrap input-wrap--icon-right">
                  <input type="text" placeholder="Resting placeholder" className="input" />
                  <span className="form-icon">
                    <MdSearch className="mr-2x icon-24"></MdSearch>
                  </span>
                </div>
              </li>
            </ul>
            <ul>
              <li>
                <label className="input__label">Input big</label>
                <div className="input-wrap">
                  <input type="text" placeholder="Resting placeholder" className="input" />
                </div>
              </li>
              <li>
                <label className="input__label">Input small</label>
                <div className="input-wrap input-wrap--icon-left">
                  <input type="text" placeholder="Search user by name or email address" className="input input--sm" />
                  <span className="form-icon icon-24">
                    <MdSearch className="mr-2x"></MdSearch>
                  </span>
                </div>
              </li>
              <li>
                <label className="input__label">Input mini</label>
                <div className="input-wrap input-wrap--icon-right">
                  <input type="text" placeholder="Resting placeholder" className="input input--xs" />
                  <span className="form-icon icon-16">
                    <MdSearch className="mr-2x"></MdSearch>
                  </span>
                </div>
              </li>
            </ul>
            <div className="input-wrap">
              <input type="radio" id="radio1" name="hello" className="box-links__nodes" />
              <label htmlFor="radio1" className="input__label">
                Radio 1
              </label>
            </div>
            <div className="input-wrap">
              <input type="radio" id="radio2" name="hello" className="box-links__nodes" />
              <label htmlFor="radio2" className="input__label">
                Radio 2
              </label>
            </div>
            <div className="input-wrap">
              <input
                type="checkbox"
                name="checkbox"
                value="Checkbox Inline 2"
                id="check2"
                className="form-group__radio mr-10"
              />
              <label htmlFor="check2" className="box-links__nodes">
                Checkbox Inline 2
              </label>
            </div>
            <div className="switch-wrap">
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
        <div className="kit-block">
          <div className="kit-title">
            <h3>Buttons</h3>
          </div>
          <div className="kit-content">
            <ul>
              <li>
                <button className="btn btn--with-icon btn--primary mr-2x">
                  <MdSearch className="mr-2x"></MdSearch>Primary Button with icon
                </button>
              </li>
              <li>
                <button className="btn btn--primary mr-2x" type="button">
                  Primary Button
                </button>
              </li>
              <li>
                <button className="btn btn--outlined-primary">Primary Outline Button</button>
              </li>
              <li>
                <button className="btn btn--primary" disabled>
                  Primary Disabled Button
                </button>
              </li>
            </ul>
            <ul>
              <li>
                <button className="btn btn--with-icon btn--secondary mr-2x">
                  Secondary Button with icon<MdSearch className="ml-2x"></MdSearch>
                </button>
              </li>
              <li>
                <button className="btn btn--secondary mr-2x" type="button">
                  Secondary button
                </button>
              </li>
              <li>
                <button className="btn btn--outlined-secondary">Secondary Outline Button</button>
              </li>
              <li>
                <button className="btn btn--secondary" disabled>
                  Secondary Disabled Button
                </button>
              </li>
            </ul>
            <ul>
              <li>
                <button className="btn btn--with-icon btn--blue mr-2x">
                  <MdSearch className="mr-2x"></MdSearch>Blue Button with icon
                </button>
              </li>
              <li>
                <button className="btn btn--blue mr-2x" type="button">
                  Blue Button
                </button>
              </li>
              <li>
                <button className="btn btn--outlined-blue">Blue Outline Button</button>
              </li>
              <li>
                <button className="btn btn--blue" disabled>
                  Blue Disabled Button
                </button>
              </li>
            </ul>
            <ul>
              <li>
                <button className="btn btn--with-icon btn--grey mr-2x">
                  Tertiary Button with icon<MdSearch className="ml-2x"></MdSearch>
                </button>
              </li>
              <li>
                <button className="btn btn--grey mr-2x" type="button">
                  Tertiary Button
                </button>
              </li>
              <li>
                <button className="btn btn--outlined-grey">Tertiary Outline Button</button>
              </li>
              <li>
                <button className="btn btn--grey" disabled>
                  Grey Disabled Button
                </button>
              </li>
            </ul>
            <ul>
              <li>
                <button className="btn btn--with-icon btn--light-purple mr-2x">
                  Light purple Button with icon<MdSearch className="ml-2x"></MdSearch>
                </button>
              </li>
              <li>
                <button className="btn btn--light-purple mr-2x" type="button">
                  Light purple Button
                </button>
              </li>
              <li>
                <button className="btn btn--outlined-light-purple">Light purple Outline Button</button>
              </li>
            </ul>
            <ul>
              <li>
                <button className="btn btn--with-icon btn--outlined-white btn--shadowed-grey pl-8x pr-8x">
                  <FcGoogle className="mr-2x"></FcGoogle>Continue with Google
                </button>
              </li>
            </ul>
            <ul>
              <li>
                <button className="btn btn--with-icon btn--primary btn--loading pl-4x pr-4x">
                  <img src={loadingWhite} alt="Recovvo" />
                  Loading...
                </button>
              </li>
              <li>
                <button className="btn btn--with-icon btn--secondary btn--loading pl-4x pr-4x">
                  <img src={loadingWhite} alt="Recovvo" />
                  Loading...
                </button>
              </li>
              <li>
                <button className="btn btn--with-icon btn--blue btn--loading pl-4x pr-4x">
                  <img src={loadingWhite} alt="Recovvo" />
                  Loading...
                </button>
              </li>
              <li>
                <button className="btn btn--with-icon btn--grey btn--loading pl-4x pr-4x">
                  <img src={loadingWhite} alt="Recovvo" />
                  Loading...
                </button>
              </li>
            </ul>
            <ul>
              <li>
                <button className="btn btn__with-icon btn__with-icon--sm btn--outlined-grey">
                  <MdFilterList />
                </button>
              </li>
              <li>
                <button className="btn btn__with-icon btn__with-icon--lg btn--outlined-grey">
                  <MdCloudDownload />
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="kit-block">
          <div className="kit-title">
            <h3>Seperator</h3>
          </div>
          <div className="kit-content">
            <div className="h-seperator d-flex">
              <hr className="line-auto" />
              <div className="text">SOME TEXT HERE</div>
              <hr className="line-auto" />
            </div>
            <div className="seperator">
              <h2 className="background">
                <span>Line-behind title</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="kit-block">
          <div className="kit-title">
            <h3>Beadcrumb</h3>
          </div>
          <div className="kit-content">
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
          </div>
        </div>
        <div className="kit-block">
          <div className="kit-title">
            <h3>Card block</h3>
          </div>
          <div className="kit-content">
            <div className="row">
              <div className="col-3">
                <div className="card card--elevated">
                  <div className="card__content">asdfsad</div>
                  <div className="card__footer">asdfsad</div>
                </div>
              </div>
              <div className="col-3">
                <div className="card card--elevated">
                  <div className="card__content">asdfsad</div>
                  <div className="card__footer">asdfsad</div>
                </div>
              </div>
              <div className="col-3">
                <div className="card card--elevated">
                  <div className="card__content">asdfsad</div>
                  <div className="card__footer">asdfsad</div>
                </div>
              </div>
              <div className="col-3">
                <div className="card card--elevated">
                  <div className="card__content">asdfsad</div>
                  <div className="card__footer">asdfsad</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="kit-block">
          <div className="kit-title">
            <h3>Pages</h3>
          </div>
          <div className="kit-content">
            <ul className="nav">
              <li className="nav__node">
                <Link to={routes.SHARED}>Shared Components</Link>
              </li>
              <li className="nav__node">
                <Link to={routes.LAYOUT_USER}>User layout</Link>
              </li>
              <li className="nav__node">
                <Link to={routes.LAYOUT_USERDETAIL}>User layout details</Link>
              </li>
              <li className="nav__node">
                <Link to={routes.ORGANIZATION_SETUP}>Organization Setup</Link>
              </li>
              <li className="nav__node">
                <Link to={routes.ORGANIZATION_PROGRESS}>Organization Progress</Link>
              </li>
              <li className="nav__node">
                <Link to={routes.SEARCH_PAGE}>Search page</Link>
              </li>
              <li className="nav__node">
                <Link to={routes.SEARCH_EMPTY}>Search Empty page</Link>
              </li>
              <li className="nav__node">
                <Link to={routes.LOGIN}>Login</Link>
              </li>
              <li className="nav__node">
                <Link to={routes.LOADING}>Loading</Link>
              </li>
              <li className="nav__node">
                <Link to={routes.ERROR_CSV}>Error CSV</Link>
              </li>
              <li className="nav__node">
                <Link to={routes.SMALLMODAL}>Small Modal</Link>
              </li>
              <li className="nav__node">
                <Link to={routes.EMAILSEARCH}>Search Email</Link>
              </li>
              <li className="nav__node">
                <Link to={routes.EMAILTHREAD}>Email Thread</Link>
              </li>
              <li className="nav__node">
                <Link to={routes.SUCCESS_DIALOG}>Success Dialog box</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignKitHome;
