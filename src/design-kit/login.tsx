import React from 'react';

import { logo } from '../assets/images';
import { FcGoogle } from 'react-icons/fc';

const Login: React.FC = () => {
  return (
    <div>
      <div className="container tile-container">
        <div className="tile">
          <div className="tile__header">
            <img src={logo} alt="logo" className="logo" />
            <span className="login-title">Sign in using your company email</span>
            <button className="btn btn--with-icon btn--outlined-white btn--shadowed-grey btn--block" type="button">
              <FcGoogle className="mr-2x"></FcGoogle>continue with google
            </button>
          </div>

          <div className="h-seperator d-flex">
            <hr className="line-auto" />
            <div className="text">OR</div>
            <hr className="line-auto" />
          </div>
          <div className="tile__form">
            <div className="input-wrap">
              <label className="input__label">Company email address</label>
              <input type="text" placeholder="Resting placeholder" className="input" />
            </div>

            <div className="input-wrap">
              <label className="input__label">Password</label>
              <input type="password" placeholder="Resting placeholder" className="input" />
            </div>
            <div className="input-wrap">
              <button className="btn btn--primary btn--block" type="button">
                Primary Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
