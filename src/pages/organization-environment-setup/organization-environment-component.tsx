import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdHelp, MdVpnKey, MdVerifiedUser, MdBusiness, MdCloudUpload } from 'react-icons/md';

import link from 'src/constants/api';
import { logo } from 'src/assets/images';
import * as endpoint from 'src/constants/endpoints';
import RcButton from 'src/components/commons/rc-button/rc-button';
import RcDownload from 'src/components/commons/rc-csv-download/rc-csv-download';

interface OrganizationEnvironment {
  onClickLink: Function;
  onDownload: Function;
  onUpload: Function;
}

const OrganizationEnvironmentSetupUi: React.FC<OrganizationEnvironment> = (props: OrganizationEnvironment) => {
  const { onClickLink, onDownload, onUpload } = props;
  const JSON_EXTENTION = '.json';
  const { t } = useTranslation();
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
              <h1> {t('organizationEnvironmentSetup.setupLabel')}</h1>
            </div>
            <ul className="stepper stepper-vertical focused">
              <li className="completed">
                <div className="step-title">
                  <span className="circle">{t('organizationEnvironmentSetup.stepOne')}</span>
                  <span className="label">{t('organizationEnvironmentSetup.stepOneLabel')}</span>
                </div>
                <div className="step-content">
                  {t('organizationEnvironmentSetup.stepOneDescription1')}{' '}
                  <a href={link.googelConsoleAPi()} target="_blank" rel="noopener noreferrer">
                    {t('organizationEnvironmentSetup.googleAdminLabel')}
                  </a>
                  {t('organizationEnvironmentSetup.stepOneDescription2')}
                  <div className="step-content-links">
                    <RcButton
                      className="btn btn--with-icon btn--outlined-primary mr-4x"
                      onClick={() => {
                        onClickLink(link.googelConsoleAPi());
                      }}
                      label={t('organizationEnvironmentSetup.stepOneSetupAPI')}>
                      <MdVpnKey className="mr-2x" />
                    </RcButton>

                    <RcDownload
                      onClick={() => {
                        onDownload({
                          URL: endpoint.MANUAL_GOOGLE_API,
                          fileName: 'GoogleConsoleManual',
                          fileExtension: '.pdf',
                        });
                      }}
                      className="link-help"
                      label={t('organizationEnvironmentSetup.helpSettingUp')}>
                      <MdHelp className="mr-1x" />
                    </RcDownload>
                  </div>
                </div>
              </li>

              <li className="active">
                <div className="step-title">
                  <span className="circle">{t('organizationEnvironmentSetup.stepTwo')}</span>
                  <span className="label">{t('organizationEnvironmentSetup.stepTwoLabel')}</span>
                </div>

                <div className="step-content">
                  <p>{t('organizationEnvironmentSetup.stepTwoDescription')}</p>
                  <div className="step-content-links">
                    <RcButton
                      className="btn btn--with-icon btn--outlined-primary mr-4x"
                      onClick={() => {
                        onClickLink(link.googelConsoleAPi());
                      }}
                      label={t('organizationEnvironmentSetup.stepTwoSetupAPI')}>
                      <MdVerifiedUser className="mr-2x" />
                    </RcButton>
                    <RcDownload
                      onClick={() => {
                        onDownload({
                          URL: endpoint.MANUAL_IAM_ADMIN,
                          fileName: 'GoogleApiIamAdmin',
                          fileExtension: '.pdf',
                        });
                      }}
                      className="link-help"
                      label={t('organizationEnvironmentSetup.helpSettingUp')}>
                      <MdHelp className="mr-1x" />
                    </RcDownload>
                  </div>
                </div>
              </li>

              <li>
                <div className="step-title">
                  <span className="circle">{t('organizationEnvironmentSetup.stepThree')}</span>
                  <span className="label">{t('organizationEnvironmentSetup.stepThreeLabel')}</span>
                </div>
                <div className="step-content">
                  <p>{t('organizationEnvironmentSetup.stepThreeDescription')}</p>
                  <div className="step-content-links">
                    <RcButton
                      className="btn btn--with-icon btn--outlined-primary mr-4x"
                      onClick={() => {
                        onClickLink(link.googelAdminApi());
                      }}
                      label={t('organizationEnvironmentSetup.stepThreeSetupAPI')}>
                      <MdBusiness className="mr-2x" />
                    </RcButton>
                    <RcDownload
                      onClick={() => {
                        onDownload({
                          URL: endpoint.MANUAL_GOOGLE_ADMIN,
                          fileName: 'GooglePermission',
                          fileExtension: '.pdf',
                        });
                      }}
                      className="link-help"
                      label={t('organizationEnvironmentSetup.helpSettingUp')}>
                      <MdHelp className="mr-1x" />
                    </RcDownload>
                  </div>
                </div>
              </li>

              <li>
                <div className="step-title">
                  <span className="circle">{t('organizationEnvironmentSetup.stepFour')}</span>
                  <span className="label">{t('organizationEnvironmentSetup.stepFourLabel')}</span>
                </div>
                <div className="step-content">
                  <p>{t('organizationEnvironmentSetup.stepFourDescription')}</p>
                  <div className="step-content-links">
                    <RcButton
                      onClick={onUpload}
                      type="fileUpload"
                      acceptType={JSON_EXTENTION}
                      className="btn btn--with-icon btn--secondary mr-4x"
                      label={t('organizationEnvironmentSetup.stepFourBtnLabel')}>
                      <MdCloudUpload />
                    </RcButton>
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

export default OrganizationEnvironmentSetupUi;
