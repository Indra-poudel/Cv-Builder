import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Field, Form, Formik, FormikHelpers } from 'formik';

import { RootState } from 'src/reducers';
import LoadingIndicator from 'src/components/loading-indicator';
import * as accountProfileAction from '../account-profile.action';
import RightFloatingDialog from 'src/components/right-floating-dialog';
import RcSelect, { SelectOption as ISelectOption } from 'src/components/commons/rc-select/rc-select';

interface StateProps {
  isLoading: boolean;
  department: ISelectOption;
  isDialogOpen: boolean;
  closeDialog: () => void;
  departmentOptions: Array<ISelectOption>;
  updateDepartment: (department: string) => void;
}

interface FormValues {
  department: string;
}

const UpdateDepartmentDialog = (props: StateProps) => {
  const { t } = useTranslation();
  const { isLoading, departmentOptions } = props;

  const initialValues: FormValues = {
    department: props.department.value?.toString(),
  };

  const defaultSelectedDepartment: ISelectOption = props.department;

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <RightFloatingDialog
      isOpen={props.isDialogOpen}
      closeDialog={props.closeDialog}
      headerText={t('userDetailPage.updateDepartmentDialog.title')}>
      <Formik
        initialValues={initialValues}
        onSubmit={(formValues: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
          props.updateDepartment(formValues.department);
          setSubmitting(false);
          props.closeDialog();
        }}>
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="input-wrap">
              <label htmlFor="department" className="input__label">
                {t('userDetailPage.updateDepartmentDialog.label.department')}
              </label>
              <Field
                name="department"
                component={RcSelect}
                options={departmentOptions}
                defaultValue={defaultSelectedDepartment}
                onChange={(option: ISelectOption) => setFieldValue('department', option ? option.value : '')}
              />
            </div>

            <div className="input-wrap">
              <button type="submit" className="btn btn--secondary btn--block" disabled={isSubmitting}>
                {t('userDetailPage.updateDepartmentDialog.label.saveButton')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </RightFloatingDialog>
  );
};

const mapStateToProps = (state: RootState) => {
  const { departmentOptions, isLoading } = state.accountProfile;

  return {
    isLoading,
    departmentOptions,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  updateDepartment: (department: string) => {
    dispatch(accountProfileAction.updateUserDepartment(department));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDepartmentDialog);
