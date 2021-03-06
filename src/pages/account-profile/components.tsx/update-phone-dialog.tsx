import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Field, Form, Formik, FormikHelpers } from 'formik';

import { isObjectEmpty } from 'src/utils/object';
import { validatePhoneNumber } from 'src/utils/validation';
import * as accountProfileAction from '../account-profile.action';
import RightFloatingDialog from 'src/components/right-floating-dialog';

interface StateProps {
  phoneNumbers: Array<string>;
  closeDialog: () => void;
  isDialogOpen: boolean;
  updatePhoneNumbers: (phoneNumbers: Array<string>) => void;
}

interface FormValues {
  phoneNumbers: Array<string>;
}

const UpdatePhoneDialog = (props: StateProps) => {
  const { t } = useTranslation();

  const initialValues: FormValues = {
    phoneNumbers: props.phoneNumbers,
  };

  const submitPhoneNumber = (formValues: FormValues) => {
    // Remove empty phone numbers before submitting
    const phoneNumbers = formValues.phoneNumbers.filter(Boolean);
    props.updatePhoneNumbers(phoneNumbers);
  };

  return (
    <RightFloatingDialog
      isOpen={props.isDialogOpen}
      closeDialog={props.closeDialog}
      headerText={t('userDetailPage.updatePhoneDialog.title')}>
      <Formik
        initialValues={initialValues}
        onSubmit={(formValues: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
          submitPhoneNumber(formValues);
          setSubmitting(false);
          props.closeDialog();
        }}
        render={({ errors, values, isSubmitting }) => (
          <Form>
            <div>
              <div className="input-wrap">
                <div className="d-flex justify-content-between">
                  <Field
                    name={`phoneNumbers.0`}
                    className="input"
                    type="tel"
                    placeholder={t('userDetailPage.updatePhoneDialog.placeHolder.phone')}
                    validate={(phoneNumber: string) => validatePhoneNumber(phoneNumber, t('validation.isPhoneNumber'))}
                  />
                </div>
                <p className="input__error">{errors.phoneNumbers && errors.phoneNumbers[0]}</p>
              </div>
              <div className="input-wrap">
                <div className="d-flex justify-content-between">
                  <Field
                    name={`phoneNumbers.1`}
                    className="input"
                    type="tel"
                    placeholder={t('userDetailPage.updatePhoneDialog.placeHolder.phone')}
                    validate={(phoneNumber: string) => validatePhoneNumber(phoneNumber, t('validation.isPhoneNumber'))}
                  />
                </div>
                <p className="input__error">{errors.phoneNumbers && errors.phoneNumbers[1]}</p>
              </div>
              <div className="input-wrap">
                <button
                  type="submit"
                  className="btn btn--secondary btn--block"
                  disabled={isSubmitting || !isObjectEmpty(errors)}>
                  {t('userDetailPage.updatePhoneDialog.label.saveButton')}
                </button>
              </div>
            </div>
          </Form>
        )}
      />
    </RightFloatingDialog>
  );
};

const mapDispatchToProps = (dispatch: Function) => ({
  updatePhoneNumbers: (phoneNumbers: Array<string>) => {
    dispatch(accountProfileAction.updateUserPhoneNumbers(phoneNumbers));
  },
});

export default connect(null, mapDispatchToProps)(UpdatePhoneDialog);
