import React from 'react';
import * as Yup from 'yup';
import { TFunction } from 'i18next';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Field, Form, Formik, FormikHelpers } from 'formik';

import { RootState } from 'src/reducers';
import { isObjectEmpty } from 'src/utils/object';
import { ONLY_TEXT_REGEX } from 'src/constants/regex';
import * as userDetailsAction from '../user-details.action';
import RightFloatingDialog from 'src/components/right-floating-dialog';

interface StateProps {
  firstName: string;
  lastName: string;
  userId: string;
  closeDialog: () => void;
  isDialogOpen: boolean;
  updateFullName: (firstName: string, lastName: string, userId: string) => void;
}

interface FormValues {
  firstName: string;
  lastName: string;
}

const validationSchema = (translate: TFunction) =>
  Yup.object().shape({
    firstName: Yup.string()
      .required(translate('validation.isRequired'))
      .matches(ONLY_TEXT_REGEX, translate('validation.isName')),
    middleName: Yup.string().nullable().matches(ONLY_TEXT_REGEX, translate('validation.isName')),
    lastName: Yup.string()
      .required(translate('validation.isRequired'))
      .matches(ONLY_TEXT_REGEX, translate('validation.isName')),
  });

const UpdateNameDialog = (props: StateProps) => {
  const { t } = useTranslation();

  const initialValues: FormValues = {
    firstName: props.firstName,
    lastName: props.lastName,
  };

  return (
    <RightFloatingDialog
      isOpen={props.isDialogOpen}
      closeDialog={props.closeDialog}
      headerText={t('userDetailPage.updateNameDialog.title')}>
      <Formik
        initialValues={initialValues}
        validationSchema={() => validationSchema(t)}
        onSubmit={(formValues: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
          props.updateFullName(formValues.firstName, formValues.lastName, props.userId);
          setSubmitting(false);
          props.closeDialog();
        }}>
        {({ errors, isSubmitting }) => (
          <Form>
            <div className="input-wrap">
              <label htmlFor="firstName" className="input__label">
                {t('userDetailPage.updateNameDialog.label.firstName')}
              </label>
              <Field name="firstName" className="input" />
              <p className="input__error">{errors.firstName}</p>
            </div>
            <div className="input-wrap">
              <label htmlFor="lastName" className="input__label">
                {t('userDetailPage.updateNameDialog.label.lastName')}
              </label>
              <Field name="lastName" className="input" />
              <p className="input__error">{errors.lastName}</p>
            </div>
            <div className="input-wrap">
              <button
                type="submit"
                className="btn btn--secondary btn--block"
                disabled={isSubmitting || !isObjectEmpty(errors)}>
                {t('userDetailPage.updateNameDialog.label.saveButton')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </RightFloatingDialog>
  );
};

const mapStateToProps = (state: RootState) => ({
  userId: state.user.userDetails.id,
  firstName: state.user.userDetails.firstName,
  lastName: state.user.userDetails.lastName,
});

const mapDispatchToProps = (dispatch: Function) => ({
  updateFullName: (firstName: string, lastName: string, userId: string) => {
    dispatch(userDetailsAction.updateFullName(firstName, lastName, userId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateNameDialog);
