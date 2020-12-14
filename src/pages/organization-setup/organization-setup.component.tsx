import React from 'react';
import * as Yup from 'yup';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Field, Form, Formik, FormikHelpers } from 'formik';

import RcNavBar from 'src/components/commons/rc-navbar';
import LoadingIndicator from 'src/components/loading-indicator';
import RcSelect, { SelectOption as ISelectOption } from 'src/components/commons/rc-select/rc-select';

interface StateProps {
  organizationSizeOptions: Array<ISelectOption>;
  industryTypeOptions: Array<ISelectOption>;
  departmentOptions: Array<ISelectOption>;
  saveOrganizationInfo: (formValues: FormValues) => void;
  isLoading: boolean;
}

export interface FormValues {
  website: string;
  organizationName: string;
  position: string;
  department: string;
  organizationSize: string;
  industry: string;
  gSuiteAdminEmail: string;
}

const OrganizationSetupUI = (props: StateProps) => {
  const { t } = useTranslation();
  const { organizationSizeOptions, industryTypeOptions, departmentOptions, isLoading, saveOrganizationInfo } = props;

  const field = {
    ADMIN_EMAIL: 'gSuiteAdminEmail',
  };

  const OrganizationSetupForm = () => {
    const initialFormValues = {
      website: '',
      organizationName: '',
      position: '',
      department: '',
      organizationSize: '',
      industry: '',
      gSuiteAdminEmail: '',
    };

    const validationSchema = (translate: TFunction) =>
      Yup.object().shape({
        [field.ADMIN_EMAIL]: Yup.string()
          .required(translate('organizationSetup.form.email.required'))
          .email(translate('organizationSetup.form.email.error')),
      });

    return (
      <Formik
        initialValues={initialFormValues}
        validationSchema={() => validationSchema(t)}
        onSubmit={(formValues: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
          saveOrganizationInfo(formValues);
          setSubmitting(false);
        }}>
        {({ isSubmitting, setFieldValue, errors, touched }) => (
          <Form>
            <div className="input-wrap">
              <label htmlFor="website" className="input__label">
                {t('organizationSetup.form.website.label')}
              </label>
              <Field name="website" placeholder="https://" className="input" type={'url'} />
              <p className="input__helper">{t('organizationSetup.form.website.description')}</p>
            </div>

            <div className="input-wrap">
              <label htmlFor="organizationName" className="input__label">
                {t('organizationSetup.form.organizationName.label')}
              </label>
              <Field name="organizationName" placeholder="e.g. ACME Organization" className="input" />
            </div>

            <div className="row">
              <div className="col-6">
                <div className="input-wrap">
                  <label htmlFor="position" className="input__label">
                    {t('organizationSetup.form.position.label')}
                  </label>
                  <Field name="position" placeholder="Technology Manager" className="input" />
                </div>
              </div>

              <div className="col-6">
                <div className="input-wrap">
                  <label htmlFor="department" className="input__label">
                    {t('organizationSetup.form.department.label')}
                  </label>
                  <Field
                    name="department"
                    component={RcSelect}
                    options={departmentOptions}
                    isClearable={true}
                    onChange={(option: ISelectOption) => {
                      setFieldValue('department', option ? option.value : '');
                    }}
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="input-wrap">
                  <label htmlFor="organizationSize" className="input__label">
                    {t('organizationSetup.form.organizationSize.label')}
                  </label>
                  <Field
                    name="organizationSize"
                    component={RcSelect}
                    options={organizationSizeOptions}
                    isClearable={true}
                    onChange={(option: ISelectOption) => {
                      setFieldValue('organizationSize', option ? option.value : '');
                    }}
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="input-wrap">
                  <label htmlFor="industry" className="input__label">
                    {t('organizationSetup.form.industry.label')}
                  </label>
                  <Field
                    name="industry"
                    component={RcSelect}
                    options={industryTypeOptions}
                    isClearable={true}
                    onChange={(option: ISelectOption) => {
                      setFieldValue('industry', option ? option.value : '');
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="input-wrap">
              <label htmlFor={field.ADMIN_EMAIL} className="input__label">
                {t('organizationSetup.form.email.label')}
              </label>
              <Field
                name={field.ADMIN_EMAIL}
                placeholder={t('organizationSetup.form.email.placeholder')}
                className="input"
                type={'email'}
              />
              {errors.gSuiteAdminEmail && touched.gSuiteAdminEmail && (
                <p className="input__error">{errors.gSuiteAdminEmail}</p>
              )}
            </div>

            <div className="input-wrap">
              <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
                {t('organizationSetup.form.saveButton.label')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    );
  };

  return (
    <div>
      <RcNavBar />
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <div className="content-wrap mt-8x">
          <div className="container">
            <div className="content-7x">
              <div className="content-heading">
                <h1>{t('organizationSetup.title')}</h1>
              </div>
              <OrganizationSetupForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationSetupUI;
